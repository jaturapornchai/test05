'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function QRCodePage() {
    const customerUrl = 'https://test05-kappa.vercel.app/customer';

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
            <div className="absolute top-10 left-10 text-6xl animate-bounce opacity-30">🌶️</div>
            <div className="absolute top-20 right-20 text-5xl animate-pulse opacity-30">🥗</div>
            <div className="absolute bottom-20 right-1/4 text-7xl animate-bounce opacity-20" style={{ animationDelay: '1s' }}>🍋</div>

            <div className="relative container mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block mb-6">
                        <div className="bg-gradient-to-r from-lime-500 to-orange-500 p-1 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
                            <div className="bg-white px-6 py-3 rounded-xl">
                                <h1 className="text-4xl font-black bg-gradient-to-r from-lime-600 to-orange-600 bg-clip-text text-transparent">
                                    ร้านส้มตำแซ่บนัว
                                </h1>
                            </div>
                        </div>
                    </Link>
                    <p className="text-3xl font-bold text-gray-700 mb-2">📱 สแกน QR Code จองคิว</p>
                    <p className="text-xl text-gray-600">สะดวก รวดเร็ว ไม่ต้องรอนาน</p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* QR Code Card */}
                    <Card className="border-4 border-lime-300 shadow-2xl bg-white/95 backdrop-blur-sm mb-8">
                        <CardHeader className="bg-gradient-to-r from-lime-500 to-orange-500 text-white rounded-t-lg">
                            <CardTitle className="text-3xl text-center font-black">
                                🎫 QR Code จองคิว
                            </CardTitle>
                            <CardDescription className="text-center text-white/90 text-lg">
                                สแกนเพื่อเข้าสู่ระบบจองคิว
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-12">
                            <div className="flex flex-col items-center space-y-8">
                                {/* QR Code Display */}
                                <div className="relative">
                                    <div className="bg-gradient-to-br from-lime-400 to-orange-400 p-2 rounded-3xl shadow-2xl">
                                        <div className="bg-white p-8 rounded-2xl">
                                            {/* Using QR Code API */}
                                            <img
                                                src={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(customerUrl)}&color=000000&bgcolor=ffffff&margin=10`}
                                                alt="QR Code สำหรับจองคิว"
                                                className="w-80 h-80"
                                            />
                                        </div>
                                    </div>
                                    {/* Decorative Elements */}
                                    <div className="absolute -top-6 -left-6 text-6xl animate-spin-slow">🌶️</div>
                                    <div className="absolute -top-6 -right-6 text-6xl animate-pulse">🥗</div>
                                    <div className="absolute -bottom-6 -left-6 text-6xl animate-bounce">🍋</div>
                                    <div className="absolute -bottom-6 -right-6 text-6xl animate-pulse" style={{ animationDelay: '0.5s' }}>🥜</div>
                                </div>

                                {/* Instructions */}
                                <div className="text-center space-y-4 w-full">
                                    <h3 className="text-2xl font-black text-gray-800">
                                        📱 วิธีใช้งาน
                                    </h3>
                                    <div className="grid md:grid-cols-3 gap-6 mt-6">
                                        <div className="bg-gradient-to-br from-lime-50 to-lime-100 p-6 rounded-2xl border-2 border-lime-300">
                                            <div className="text-5xl mb-3">1️⃣</div>
                                            <h4 className="font-bold text-lg mb-2">เปิดกล้อง</h4>
                                            <p className="text-gray-600">เปิดกล้องมือถือของคุณ</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border-2 border-orange-300">
                                            <div className="text-5xl mb-3">2️⃣</div>
                                            <h4 className="font-bold text-lg mb-2">สแกน QR</h4>
                                            <p className="text-gray-600">ส่องกล้องที่ QR Code</p>
                                        </div>
                                        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-2xl border-2 border-yellow-300">
                                            <div className="text-5xl mb-3">3️⃣</div>
                                            <h4 className="font-bold text-lg mb-2">จองคิว</h4>
                                            <p className="text-gray-600">กรอกข้อมูลและรับคิว</p>
                                        </div>
                                    </div>
                                </div>

                                {/* URL Display */}
                                <div className="w-full bg-gray-100 p-4 rounded-xl border-2 border-gray-300">
                                    <p className="text-sm text-gray-600 mb-2">หรือเข้าผ่าน URL:</p>
                                    <a
                                        href={customerUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 underline break-all text-lg font-mono"
                                    >
                                        {customerUrl}
                                    </a>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-4 w-full">
                                    <Button
                                        onClick={() => window.print()}
                                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xl py-6 rounded-xl shadow-lg font-bold"
                                    >
                                        🖨️ พิมพ์ QR Code
                                    </Button>
                                    <Link href="/" className="flex-1">
                                        <Button
                                            variant="outline"
                                            className="w-full border-2 border-lime-500 text-lime-700 text-xl py-6 rounded-xl hover:bg-lime-50 font-bold"
                                        >
                                            ← กลับหน้าหลัก
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Info Section */}
                    <div className="bg-gradient-to-r from-lime-100 to-orange-100 border-4 border-lime-300 rounded-2xl p-8 shadow-lg">
                        <h3 className="text-2xl font-black text-gray-800 mb-4 flex items-center">
                            <span className="text-3xl mr-3">💡</span> ข้อดีของการจองคิวออนไลน์
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex items-start space-x-3">
                                <span className="text-2xl">✅</span>
                                <div>
                                    <h4 className="font-bold text-lg">ประหยัดเวลา</h4>
                                    <p className="text-gray-700">ไม่ต้องรอนานที่ร้าน</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-2xl">✅</span>
                                <div>
                                    <h4 className="font-bold text-lg">ติดตามสถานะ</h4>
                                    <p className="text-gray-700">ดูสถานะคิวแบบเรียลไทม์</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-2xl">✅</span>
                                <div>
                                    <h4 className="font-bold text-lg">สะดวกสบาย</h4>
                                    <p className="text-gray-700">จองผ่านมือถือได้ทุกที่</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-2xl">✅</span>
                                <div>
                                    <h4 className="font-bold text-lg">ปลอดภัย</h4>
                                    <p className="text-gray-700">ลดการรอแออัดหน้าร้าน</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 10s linear infinite;
                }
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .print-area, .print-area * {
                        visibility: visible;
                    }
                    .print-area {
                        position: absolute;
                        left: 0;
                        top: 0;
                    }
                }
            `}</style>
        </div>
    );
}
