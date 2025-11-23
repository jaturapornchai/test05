'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Queue {
    _id: string;
    name: string;
    phone: string;
    pax: number;
    status: string;
    queueNumber: string;
    createdAt: string;
}

export default function AdminPage() {
    const [queues, setQueues] = useState<Queue[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchQueues = async () => {
        try {
            const res = await fetch('/api/queue');
            if (res.ok) {
                const data = await res.json();
                setQueues(data);
            }
        } catch (error) {
            console.error('Error fetching queues:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQueues();
        const interval = setInterval(fetchQueues, 5000);
        return () => clearInterval(interval);
    }, []);

    const updateStatus = async (id: string, status: string) => {
        try {
            const res = await fetch(`/api/queue/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            if (res.ok) {
                fetchQueues();
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const clearAllData = async () => {
        if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลคิวทั้งหมด?\n\nการดำเนินการนี้ไม่สามารถย้อนกลับได้')) {
            return;
        }

        try {
            const res = await fetch('/api/queue/clear', {
                method: 'DELETE',
            });

            if (res.ok) {
                const result = await res.json();
                alert(`ลบข้อมูลสำเร็จ!\n\nลบคิวทั้งหมด: ${result.queues_deleted} รายการ\nรีเซ็ตตัวนับ: ${result.counter_reset ? 'สำเร็จ' : 'ไม่พบ'}`);
                fetchQueues();
            } else {
                alert('เกิดข้อผิดพลาดในการลบข้อมูล');
            }
        } catch (error) {
            console.error('Error clearing data:', error);
            alert('เกิดข้อผิดพลาดในการลบข้อมูล');
        }
    };

    const waitingQueues = queues.filter(q => q.status === 'waiting');
    const calledQueues = queues.filter(q => q.status === 'called');
    const historyQueues = queues.filter(q => ['completed', 'cancelled'].includes(q.status)).reverse(); // Newest first

    const QueueTable = ({ data, showActions = false }: { data: Queue[], showActions?: boolean }) => (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>คิวที่</TableHead>
                    <TableHead>ชื่อ</TableHead>
                    <TableHead>เบอร์โทร</TableHead>
                    <TableHead>จำนวน (คน)</TableHead>
                    <TableHead>สถานะ</TableHead>
                    {showActions && <TableHead>จัดการ</TableHead>}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center py-10 text-gray-500">ไม่มีข้อมูล</TableCell>
                    </TableRow>
                ) : (
                    data.map((q) => (
                        <TableRow key={q._id}>
                            <TableCell className="font-bold text-lg">{q.queueNumber}</TableCell>
                            <TableCell>{q.name}</TableCell>
                            <TableCell>{q.phone}</TableCell>
                            <TableCell>{q.pax}</TableCell>
                            <TableCell>
                                <Badge variant={q.status === 'waiting' ? 'secondary' : q.status === 'called' ? 'default' : 'outline'}>
                                    {q.status === 'waiting' ? 'รอเรียก' :
                                        q.status === 'called' ? 'เรียกแล้ว' :
                                            q.status === 'completed' ? 'เสร็จสิ้น' : 'ยกเลิก'}
                                </Badge>
                            </TableCell>
                            {showActions && (
                                <TableCell className="space-x-2">
                                    {q.status === 'waiting' && (
                                        <>
                                            <Button size="sm" onClick={() => updateStatus(q._id, 'called')} className="bg-blue-500 hover:bg-blue-600">เรียกคิว</Button>
                                            <Button size="sm" variant="destructive" onClick={() => updateStatus(q._id, 'cancelled')}>ยกเลิก</Button>
                                        </>
                                    )}
                                    {q.status === 'called' && (
                                        <>
                                            <Button size="sm" onClick={() => updateStatus(q._id, 'completed')} className="bg-green-500 hover:bg-green-600">เสร็จสิ้น</Button>
                                            <Button size="sm" variant="outline" onClick={() => updateStatus(q._id, 'waiting')}>รอใหม่</Button>
                                        </>
                                    )}
                                </TableCell>
                            )}
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800">จัดการคิวร้านอาหาร</h1>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm text-gray-500">รอเรียก: {waitingQueues.length} | เรียกแล้ว: {calledQueues.length}</p>
                        </div>
                        <Button
                            variant="destructive"
                            onClick={clearAllData}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            🗑️ ลบทั้งหมด
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="waiting" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                        <TabsTrigger value="waiting" className="text-lg">รอเรียก ({waitingQueues.length})</TabsTrigger>
                        <TabsTrigger value="called" className="text-lg">กำลังเรียก ({calledQueues.length})</TabsTrigger>
                        <TabsTrigger value="history" className="text-lg">ประวัติ</TabsTrigger>
                    </TabsList>

                    <TabsContent value="waiting">
                        <Card>
                            <CardHeader>
                                <CardTitle>รายการคิวรอเรียก</CardTitle>
                                <CardDescription>จัดการเรียกคิวลูกค้าตามลำดับ</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <QueueTable data={waitingQueues} showActions={true} />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="called">
                        <Card>
                            <CardHeader>
                                <CardTitle>รายการคิวที่กำลังเรียก</CardTitle>
                                <CardDescription>ยืนยันลูกค้าเข้าร้าน หรือเรียกซ้ำ</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <QueueTable data={calledQueues} showActions={true} />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="history">
                        <Card>
                            <CardHeader>
                                <CardTitle>ประวัติคิว</CardTitle>
                                <CardDescription>รายการคิวที่เสร็จสิ้นหรือยกเลิกแล้ว</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <QueueTable data={historyQueues} showActions={false} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
