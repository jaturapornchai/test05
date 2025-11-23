'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

interface Queue {
    _id: string;
    name: string;
    queueNumber: string;
    status: string;
    pax: number;
}

export default function MonitorPage() {
    const [queues, setQueues] = useState<Queue[]>([]);
    const [lastCalledQueue, setLastCalledQueue] = useState<string | null>(null);

    const fetchQueues = async () => {
        try {
            const res = await fetch('/api/queue');
            if (res.ok) {
                const data: Queue[] = await res.json();
                setQueues(data);

                const called = data.filter(q => q.status === 'called');
                if (called.length > 0) {
                    const latestCalled = called[called.length - 1];
                    if (latestCalled._id !== lastCalledQueue) {
                        setLastCalledQueue(latestCalled._id);
                        announceQueue(latestCalled.queueNumber, latestCalled.name);
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching queues:', error);
        }
    };

    const announceQueue = (queueNumber: string, name: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();

            const announcements = [
                {
                    text: `เรียนเชิญคิวต่อไป ${queueNumber} คุณ ${name}`,
                    lang: 'th-TH',
                    rate: 0.9
                },
                {
                    text: `Next queue ${queueNumber} ${name}`,
                    lang: 'en-US',
                    rate: 0.9
                },
                {
                    text: `下一位 ${queueNumber} ${name}`,
                    lang: 'zh-CN',
                    rate: 0.8
                },
                {
                    text: `次の番号 ${queueNumber} ${name}`,
                    lang: 'ja-JP',
                    rate: 0.8
                }
            ];

            let currentIndex = 0;

            const speakNext = () => {
                if (currentIndex < announcements.length) {
                    const announcement = announcements[currentIndex];
                    const utterance = new SpeechSynthesisUtterance(announcement.text);
                    utterance.lang = announcement.lang;
                    utterance.rate = announcement.rate;

                    utterance.onend = () => {
                        currentIndex++;
                        setTimeout(speakNext, 300);
                    };

                    utterance.onerror = (event) => {
                        console.error('Speech synthesis error:', event);
                        currentIndex++;
                        speakNext();
                    };

                    window.speechSynthesis.speak(utterance);
                }
            };

            speakNext();
        }
    };

    useEffect(() => {
        fetchQueues();
        const interval = setInterval(fetchQueues, 3000);
        return () => clearInterval(interval);
    }, [lastCalledQueue]);

    const waitingQueues = queues.filter(q => q.status === 'waiting');
    const calledQueues = queues.filter(q => q.status === 'called').reverse();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-900 to-red-900 text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-10">
                <Image
                    src="/somtam-bg.png"
                    alt="Background"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-lime-400 via-yellow-400 to-orange-400"></div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400"></div>

            <div className="relative p-6 h-screen flex flex-col">
                {/* Header */}
                <div className="mb-6 text-center">
                    <div className="inline-block bg-gradient-to-r from-lime-500 via-orange-500 to-red-500 p-1 rounded-3xl shadow-2xl">
                        <div className="bg-gray-900 px-12 py-4 rounded-3xl">
                            <h1 className="text-6xl font-black bg-gradient-to-r from-lime-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                                🌶️ ร้านส้มตำแซ่บนัว 🌶️
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="flex-1 grid grid-cols-12 gap-6">
                    {/* Left Panel: Called Queues (Large) */}
                    <div className="col-span-8">
                        <Card className="h-full bg-gradient-to-br from-gray-800 to-orange-900/30 border-4 border-orange-500 shadow-2xl rounded-3xl backdrop-blur-sm">
                            <div className="p-6 h-full flex flex-col">
                                <div className="mb-6">
                                    <div className="inline-block bg-gradient-to-r from-orange-500 to-red-500 px-8 py-3 rounded-2xl shadow-lg">
                                        <h2 className="text-4xl font-black text-white flex items-center">
                                            <span className="mr-4">🔔</span> เรียกคิว
                                        </h2>
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                                    {calledQueues.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                            <div className="text-9xl mb-6 opacity-30">📢</div>
                                            <p className="text-4xl font-bold">ยังไม่มีการเรียกคิว</p>
                                        </div>
                                    ) : (
                                        calledQueues.map((q, index) => (
                                            <div
                                                key={q._id}
                                                className={`relative overflow-hidden rounded-3xl ${index === 0
                                                        ? 'bg-gradient-to-r from-orange-500 to-red-500 animate-pulse border-4 border-yellow-300'
                                                        : 'bg-gradient-to-r from-gray-700 to-gray-600 border-2 border-gray-500'
                                                    } shadow-2xl`}
                                            >
                                                {index === 0 && (
                                                    <div className="absolute top-4 right-4">
                                                        <div className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-full font-black text-xl animate-bounce">
                                                            ⭐ ใหม่!
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="p-8 flex justify-between items-center">
                                                    <div className="flex flex-col">
                                                        <div className={`text-9xl font-black tracking-tighter ${index === 0 ? 'text-white drop-shadow-2xl' : 'text-gray-200'
                                                            }`}>
                                                            {q.queueNumber}
                                                        </div>
                                                        <div className={`text-3xl mt-4 ${index === 0 ? 'text-yellow-200 font-bold' : 'text-gray-300'
                                                            }`}>
                                                            คุณ {q.name}
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className={`text-5xl font-black mb-2 ${index === 0 ? 'text-yellow-200' : 'text-orange-300'
                                                            }`}>
                                                            {q.pax} ท่าน
                                                        </div>
                                                        <div className="text-2xl text-white font-bold bg-green-500 px-6 py-2 rounded-full shadow-lg">
                                                            ✨ เชิญเข้าร้าน
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Panel: Waiting List */}
                    <div className="col-span-4">
                        <Card className="h-full bg-gradient-to-br from-gray-800 to-lime-900/30 border-4 border-lime-500 shadow-2xl rounded-3xl backdrop-blur-sm">
                            <div className="p-6 h-full flex flex-col">
                                <div className="mb-6">
                                    <div className="inline-block bg-gradient-to-r from-lime-500 to-green-500 px-6 py-3 rounded-2xl shadow-lg">
                                        <h2 className="text-3xl font-black text-white flex items-center">
                                            <span className="mr-3">⏰</span> รอเรียก
                                        </h2>
                                    </div>
                                    <div className="mt-3 text-lime-300 text-xl font-bold">
                                        ทั้งหมด {waitingQueues.length} คิว
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                                    {waitingQueues.map((q, index) => (
                                        <div
                                            key={q._id}
                                            className="bg-gradient-to-r from-gray-700 to-lime-700/30 rounded-2xl p-5 border-2 border-lime-500/30 shadow-lg hover:scale-105 transition-transform"
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center space-x-4">
                                                    <div className="bg-lime-500 text-white px-4 py-2 rounded-xl font-black text-lg">
                                                        #{index + 1}
                                                    </div>
                                                    <div className="text-4xl font-black text-lime-300">
                                                        {q.queueNumber}
                                                    </div>
                                                </div>
                                                <div className="text-xl text-gray-300 font-bold">
                                                    👥 {q.pax} ท่าน
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {waitingQueues.length === 0 && (
                                        <div className="text-center text-gray-400 mt-20">
                                            <div className="text-6xl mb-4 opacity-30">📭</div>
                                            <p className="text-2xl font-bold">ไม่มีคิวรอ</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <div className="inline-block bg-gray-800/80 backdrop-blur-sm px-8 py-3 rounded-2xl border-2 border-orange-500/30">
                        <p className="text-gray-300 text-lg">
                            ⚡ อัพเดตอัตโนมัติทุก 3 วินาที | 🌶️ ส้มตำแซ่บที่สุด!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
