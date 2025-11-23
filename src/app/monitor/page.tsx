'use client';

import { useEffect, useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

                // Check for newly called queue to announce
                const called = data.filter(q => q.status === 'called');
                if (called.length > 0) {
                    // Find the most recently updated/created called queue?
                    // Since we don't have updated timestamp easily here without more logic,
                    // we'll just announce if it's different from the last one we announced locally.
                    // A better way is to track "announced" state in DB, but for now client-side tracking:
                    const latestCalled = called[called.length - 1]; // Assuming last in list is latest? 
                    // Actually API sorts by createdAt. So latest created is last.
                    // But "Called" status might happen to an old queue.
                    // Let's just announce the first one in the list if it changed?
                    // Or better: announce any 'called' queue that wasn't 'called' before?
                    // For simplicity: Just announce the one at the top of the "Called" list if it's new to us.

                    if (latestCalled._id !== lastCalledQueue) {
                        setLastCalledQueue(latestCalled._id);
                        announceQueue(latestCalled.queueNumber);
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching queues:', error);
        }
    };

    const announceQueue = (queueNumber: string) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(`ขอเชิญคิว ${queueNumber} ค่ะ`);
            utterance.lang = 'th-TH';
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    };

    useEffect(() => {
        fetchQueues();
        const interval = setInterval(fetchQueues, 3000); // Fast poll for monitor
        return () => clearInterval(interval);
    }, [lastCalledQueue]);

    const waitingQueues = queues.filter(q => q.status === 'waiting');
    const calledQueues = queues.filter(q => q.status === 'called').reverse(); // Show newest called first? Or just list.

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 overflow-hidden">
            <div className="grid grid-cols-12 gap-6 h-[calc(100vh-2rem)]">

                {/* Left Panel: Current Called Queues (Large) */}
                <div className="col-span-8 bg-gray-800 rounded-xl p-6 border border-gray-700 flex flex-col">
                    <h1 className="text-4xl font-bold mb-6 text-orange-500 border-b border-gray-700 pb-4">
                        เรียกคิว / Calling
                    </h1>
                    <div className="flex-1 overflow-y-auto space-y-4">
                        {calledQueues.length === 0 ? (
                            <div className="h-full flex items-center justify-center text-gray-500 text-3xl">
                                ยังไม่มีการเรียกคิว
                            </div>
                        ) : (
                            calledQueues.map((q, index) => (
                                <div
                                    key={q._id}
                                    className={`flex justify-between items-center p-8 rounded-xl border-l-8 ${index === 0 ? 'bg-gray-700 border-orange-500 animate-pulse' : 'bg-gray-700/50 border-gray-600'}`}
                                >
                                    <div className="flex flex-col">
                                        <span className="text-8xl font-black tracking-tighter text-white">{q.queueNumber}</span>
                                        <span className="text-2xl text-gray-300 mt-2">คุณ {q.name}</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-4xl font-bold text-orange-400 block">{q.pax} ท่าน</span>
                                        <span className="text-xl text-green-400 mt-2 block">เชิญที่เคาน์เตอร์</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Right Panel: Waiting List (Smaller) */}
                <div className="col-span-4 bg-gray-800 rounded-xl p-6 border border-gray-700 flex flex-col">
                    <h2 className="text-3xl font-bold mb-6 text-blue-400 border-b border-gray-700 pb-4">
                        รอเรียก / Waiting
                    </h2>
                    <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                        {waitingQueues.map((q) => (
                            <div key={q._id} className="flex justify-between items-center p-4 bg-gray-700/30 rounded-lg border border-gray-700/50">
                                <span className="text-3xl font-bold text-gray-200">{q.queueNumber}</span>
                                <span className="text-xl text-gray-400">{q.pax} ท่าน</span>
                            </div>
                        ))}
                        {waitingQueues.length === 0 && (
                            <div className="text-center text-gray-500 mt-10 text-xl">ไม่มีคิวรอ</div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
