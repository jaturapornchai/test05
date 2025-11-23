'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import Image from 'next/image';

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
    const historyQueues = queues.filter(q => ['completed', 'cancelled'].includes(q.status)).reverse();

    const QueueTable = ({ data, showActions = false }: { data: Queue[], showActions?: boolean }) => (
        <Table>
            <TableHeader>
                <TableRow className="bg-gradient-to-r from-lime-100 to-orange-100 hover:from-lime-100 hover:to-orange-100">
                    <TableHead className="font-black text-gray-800 text-lg">คิวที่</TableHead>
                    <TableHead className="font-black text-gray-800 text-lg">ชื่อ</TableHead>
                    <TableHead className="font-black text-gray-800 text-lg">เบอร์โทร</TableHead>
                    <TableHead className="font-black text-gray-800 text-lg">จำนวน</TableHead>
                    <TableHead className="font-black text-gray-800 text-lg">สถานะ</TableHead>
                    {showActions && <TableHead className="font-black text-gray-800 text-lg">จัดการ</TableHead>}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center py-16 text-gray-400 text-xl">
                            <div className="text-6xl mb-4">📭</div>
                            ไม่มีข้อมูล
                        </TableCell>
                    </TableRow>
                ) : (
                    data.map((q) => (
                        <TableRow key={q._id} className="hover:bg-orange-50 border-b border-gray-200">
                            <TableCell className="font-black text-2xl text-orange-600">{q.queueNumber}</TableCell>
                            <TableCell className="font-bold text-lg">{q.name}</TableCell>
                            <TableCell className="text-gray-600">{q.phone}</TableCell>
                            <TableCell className="font-bold text-lg">{q.pax} ท่าน</TableCell>
                            <TableCell>
                                <Badge
                                    variant={q.status === 'waiting' ? 'secondary' : q.status === 'called' ? 'default' : 'outline'}
                                    className="text-base px-4 py-1"
                                >
                                    {q.status === 'waiting' ? '⏳ รอเรียก' :
                                        q.status === 'called' ? '🔔 เรียกแล้ว' :
                                            q.status === 'completed' ? '✅ เสร็จสิ้น' : '❌ ยกเลิก'}
                                </Badge>
                            </TableCell>
                            {showActions && (
                                <TableCell className="space-x-2">
                                    {q.status === 'waiting' && (
                                        <>
                                            <Button
                                                size="sm"
                                                onClick={() => updateStatus(q._id, 'called')}
                                                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold"
                                            >
                                                🔔 เรียกคิว
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => updateStatus(q._id, 'cancelled')}
                                                className="font-bold"
                                            >
                                                ❌ ยกเลิก
                                            </Button>
                                        </>
                                    )}
                                    {q.status === 'called' && (
                                        <>
                                            <Button
                                                size="sm"
                                                onClick={() => updateStatus(q._id, 'completed')}
                                                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold"
                                            >
                                                ✅ เสร็จสิ้น
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => updateStatus(q._id, 'waiting')}
                                                className="font-bold"
                                            >
                                                ⏰ รอใหม่
                                            </Button>
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
        <div className="min-h-screen bg-gradient-to-br from-lime-50 via-orange-50 to-yellow-50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <Image
                    src="/somtam-bg.png"
                    alt="Background"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="relative p-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <Link href="/" className="inline-block">
                            <div className="bg-gradient-to-r from-lime-500 to-orange-500 p-1 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
                                <div className="bg-white px-6 py-3 rounded-xl">
                                    <h1 className="text-3xl font-black bg-gradient-to-r from-lime-600 to-orange-600 bg-clip-text text-transparent">
                                        👨‍🍳 จัดการคิว ร้านส้มตำแซ่บนัว
                                    </h1>
                                </div>
                            </div>
                        </Link>

                        <div className="flex items-center gap-4">
                            <div className="text-right bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg border-2 border-lime-200">
                                <p className="text-sm text-gray-600">สถิติวันนี้</p>
                                <p className="text-lg font-bold text-orange-600">
                                    ⏳ รอ: {waitingQueues.length} | 🔔 เรียก: {calledQueues.length}
                                </p>
                            </div>
                            <Button
                                variant="destructive"
                                onClick={clearAllData}
                                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 font-bold text-lg px-6 py-6 shadow-lg"
                            >
                                🗑️ ลบทั้งหมด
                            </Button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <Tabs defaultValue="waiting" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/80 backdrop-blur-sm p-2 rounded-xl shadow-lg border-2 border-lime-200">
                            <TabsTrigger
                                value="waiting"
                                className="text-xl font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-orange-400 data-[state=active]:text-white rounded-lg"
                            >
                                ⏳ รอเรียก ({waitingQueues.length})
                            </TabsTrigger>
                            <TabsTrigger
                                value="called"
                                className="text-xl font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white rounded-lg"
                            >
                                🔔 กำลังเรียก ({calledQueues.length})
                            </TabsTrigger>
                            <TabsTrigger
                                value="history"
                                className="text-xl font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-500 data-[state=active]:to-gray-600 data-[state=active]:text-white rounded-lg"
                            >
                                📋 ประวัติ
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="waiting">
                            <Card className="border-4 border-yellow-300 shadow-2xl bg-white/95 backdrop-blur-sm">
                                <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-t-lg">
                                    <CardTitle className="text-2xl">⏳ รายการคิวรอเรียก</CardTitle>
                                    <CardDescription className="text-white/90 text-lg">จัดการเรียกคิวลูกค้าตามลำดับ</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <QueueTable data={waitingQueues} showActions={true} />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="called">
                            <Card className="border-4 border-green-300 shadow-2xl bg-white/95 backdrop-blur-sm">
                                <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                                    <CardTitle className="text-2xl">🔔 รายการคิวที่กำลังเรียก</CardTitle>
                                    <CardDescription className="text-white/90 text-lg">ยืนยันลูกค้าเข้าร้าน หรือเรียกซ้ำ</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <QueueTable data={calledQueues} showActions={true} />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="history">
                            <Card className="border-4 border-gray-300 shadow-2xl bg-white/95 backdrop-blur-sm">
                                <CardHeader className="bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-t-lg">
                                    <CardTitle className="text-2xl">📋 ประวัติคิว</CardTitle>
                                    <CardDescription className="text-white/90 text-lg">รายการคิวที่เสร็จสิ้นหรือยกเลิกแล้ว</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <QueueTable data={historyQueues} showActions={false} />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    {/* Footer Info */}
                    <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-4 border-2 border-lime-200 shadow-lg">
                        <p className="text-sm text-gray-600">
                            ⚡ อัพเดตอัตโนมัติทุก 5 วินาที | 🌶️ ร้านส้มตำแซ่บนัว
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
