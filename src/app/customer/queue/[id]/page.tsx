'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Queue {
    _id: string;
    name: string;
    queueNumber: string;
    status: string;
    pax: number;
}

export default function QueueStatusPage() {
    const params = useParams();
    const id = params.id as string;
    const [queue, setQueue] = useState<Queue | null>(null);
    const [loading, setLoading] = useState(true);
    const [queuesAhead, setQueuesAhead] = useState<number>(0);

    const fetchData = async () => {
        try {
            // Fetch current queue
            const resQueue = await fetch(`/api/queue/${id}`);
            if (!resQueue.ok) throw new Error('Failed to fetch queue');
            const queueData = await resQueue.json();
            setQueue(queueData);

            // Fetch all waiting queues to calculate position
            if (queueData.status === 'waiting') {
                const resAll = await fetch('/api/queue?status=waiting');
                if (resAll.ok) {
                    const allQueues: Queue[] = await resAll.json();
                    // Assuming queues are sorted by creation time (which they are in API)
                    const index = allQueues.findIndex((q) => q._id === id);
                    setQueuesAhead(index !== -1 ? index : 0);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000); // Poll every 5 seconds
        return () => clearInterval(interval);
    }, [id]);

    if (loading) return <div className="text-center p-10">กำลังโหลด...</div>;
    if (!queue) return <div className="text-center p-10 text-red-500">ไม่พบข้อมูลคิว</div>;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'waiting': return 'bg-yellow-500 hover:bg-yellow-600';
            case 'called': return 'bg-green-500 hover:bg-green-600 animate-pulse';
            case 'completed': return 'bg-gray-500 hover:bg-gray-600';
            case 'cancelled': return 'bg-red-500 hover:bg-red-600';
            default: return 'bg-blue-500';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'waiting': return 'รอเรียก';
            case 'called': return 'ถึงคิวแล้ว!';
            case 'completed': return 'เสร็จสิ้น';
            case 'cancelled': return 'ยกเลิก';
            default: return status;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-lg border-orange-200 text-center">
                <CardHeader>
                    <CardTitle className="text-2xl text-gray-700">หมายเลขคิวของคุณ</CardTitle>
                    <CardDescription>คุณ {queue.name} ({queue.pax} ท่าน)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="py-8 bg-orange-50 rounded-lg border border-orange-100">
                        <span className="text-6xl font-black text-orange-600 tracking-widest">
                            {queue.queueNumber}
                        </span>
                    </div>

                    <div className="space-y-2">
                        <p className="text-gray-500">สถานะ</p>
                        <Badge className={`text-xl px-6 py-2 ${getStatusColor(queue.status)}`}>
                            {getStatusText(queue.status)}
                        </Badge>
                    </div>

                    {queue.status === 'waiting' && (
                        <div className="p-4 bg-blue-50 rounded-lg text-blue-800">
                            <p className="text-lg">มีคิวรออีก <span className="font-bold text-2xl">{queuesAhead}</span> คิว</p>
                            <p className="text-sm opacity-75">กรุณารอเรียกพนักงาน</p>
                        </div>
                    )}

                    {queue.status === 'called' && (
                        <div className="p-4 bg-green-50 rounded-lg text-green-800 border border-green-200">
                            <p className="text-xl font-bold">เชิญที่หน้าร้านได้เลยครับ</p>
                        </div>
                    )}

                    <div className="pt-4">
                        <Link href="/customer">
                            <Button variant="outline" className="w-full">กลับหน้าหลัก</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
