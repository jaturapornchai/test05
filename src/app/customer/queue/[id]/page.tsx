'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

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
            const resQueue = await fetch(`/api/queue/${id}`);
            if (!resQueue.ok) throw new Error('Failed to fetch queue');
            const queueData = await resQueue.json();
            setQueue(queueData);

            if (queueData.status === 'waiting') {
                const resAll = await fetch('/api/queue?status=waiting');
                if (resAll.ok) {
                    const allQueues: Queue[] = await resAll.json();
                    const index = allQueues.findIndex((q) => q._id === id);
                    setQueuesAhead(index !== -1 ? index : 0);
                }
            } else {
                setQueuesAhead(0);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-gradient-to-br from-lime-50 via-orange-50 to-yellow-50 flex items-center justify-center">
            <div className="text-center">
                <div className="text-6xl mb-4 animate-bounce">🌶️</div>
                <p className="text-2xl font-bold text-gray-700">กำลังโหลด...</p>
            </div>
        </div>
    );

    if (!queue) return (
        <div className="min-h-screen bg-gradient-to-br from-lime-50 via-orange-50 to-yellow-50 flex items-center justify-center">
            <div className="text-center">
                <div className="text-6xl mb-4">❌</div>
                <p className="text-2xl font-bold text-red-500">ไม่พบข้อมูลคิว</p>
            </div>
        </div>
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'waiting': return 'bg-yellow-500';
            case 'called': return 'bg-green-500 animate-pulse';
            case 'completed': return 'bg-gray-500';
            case 'cancelled': return 'bg-red-500';
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

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'waiting': return '⏳';
            case 'called': return '🔔';
            case 'completed': return '✅';
            case 'cancelled': return '❌';
            default: return '📋';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-lime-50 via-orange-50 to-yellow-50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
                <Image
                    src="/somtam-bg.png"
                    alt="Background"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Floating Decorations */}
            <div className="absolute top-10 right-10 text-6xl animate-bounce opacity-30">🌶️</div>
            <div className="absolute bottom-20 left-10 text-7xl animate-pulse opacity-20">🥗</div>

            <div className="relative flex items-center justify-center min-h-screen p-4">
                <Card className="w-full max-w-2xl border-4 border-lime-300 shadow-2xl bg-white/95 backdrop-blur-sm">
                    <CardHeader className="bg-gradient-to-r from-lime-500 to-orange-500 text-white rounded-t-lg">
                        <CardTitle className="text-3xl text-center font-black">
                            🎫 บัตรคิวของคุณ
                        </CardTitle>
                        <CardDescription className="text-center text-white/90 text-xl">
                            คุณ {queue.name} ({queue.pax} ท่าน)
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="p-8 space-y-8">
                        {/* Queue Number Display */}
                        <div className="relative py-12 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-3xl border-4 border-orange-300 shadow-inner">
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-lime-500 to-orange-500 text-white px-8 py-2 rounded-full shadow-lg">
                                <span className="font-black text-lg">หมายเลขคิว</span>
                            </div>
                            <div className="text-center">
                                <span className="text-9xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent tracking-wider drop-shadow-lg">
                                    {queue.queueNumber}
                                </span>
                            </div>
                        </div>

                        {/* Status Badge */}
                        <div className="text-center">
                            <p className="text-gray-600 text-lg mb-3 font-bold">สถานะปัจจุบัน</p>
                            <div className="inline-block">
                                <Badge className={`${getStatusColor(queue.status)} text-white text-3xl px-10 py-4 rounded-2xl shadow-lg border-4 border-white`}>
                                    <span className="mr-3">{getStatusIcon(queue.status)}</span>
                                    {getStatusText(queue.status)}
                                </Badge>
                            </div>
                        </div>

                        {/* Waiting Info */}
                        {queue.status === 'waiting' && (
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-4 border-blue-300 rounded-3xl p-8 text-center shadow-lg">
                                <div className="text-6xl mb-4">⏰</div>
                                <p className="text-2xl text-blue-800 font-bold mb-2">
                                    มีคิวรออีก
                                </p>
                                <p className="text-7xl font-black text-blue-600 mb-4">
                                    {queuesAhead}
                                </p>
                                <p className="text-xl text-blue-700">
                                    คิว
                                </p>
                                <p className="text-sm text-blue-600 mt-4 opacity-75">
                                    กรุณารอเรียกจากพนักงาน
                                </p>
                            </div>
                        )}

                        {/* Called Info */}
                        {queue.status === 'called' && (
                            <div className="bg-gradient-to-br from-green-50 to-green-100 border-4 border-green-300 rounded-3xl p-8 text-center shadow-lg animate-pulse">
                                <div className="text-7xl mb-4">🔔</div>
                                <p className="text-4xl font-black text-green-700 mb-2">
                                    ถึงคิวแล้วครับ!
                                </p>
                                <p className="text-2xl text-green-600">
                                    เชิญที่หน้าร้านได้เลยครับ
                                </p>
                                <p className="text-lg text-green-500 mt-4">
                                    🌶️ เตรียมทานส้มตำแซ่บๆ 🌶️
                                </p>
                            </div>
                        )}

                        {/* Completed/Cancelled Info */}
                        {(queue.status === 'completed' || queue.status === 'cancelled') && (
                            <div className="bg-gray-100 border-4 border-gray-300 rounded-3xl p-8 text-center shadow-lg">
                                <div className="text-6xl mb-4">
                                    {queue.status === 'completed' ? '✅' : '❌'}
                                </div>
                                <p className="text-2xl font-bold text-gray-700">
                                    {queue.status === 'completed' ? 'ขอบคุณที่ใช้บริการ' : 'คิวถูกยกเลิก'}
                                </p>
                            </div>
                        )}

                        {/* Back Button */}
                        <Link href="/customer">
                            <Button
                                variant="outline"
                                className="w-full border-2 border-lime-500 text-lime-700 text-xl py-6 rounded-xl hover:bg-lime-50 font-bold"
                            >
                                ← กลับหน้าหลัก
                            </Button>
                        </Link>

                        {/* Auto Update Notice */}
                        <p className="text-center text-sm text-gray-500">
                            ⚡ อัพเดตอัตโนมัติทุก 5 วินาที
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
