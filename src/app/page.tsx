import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-lime-50 via-orange-50 to-yellow-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-30">
                    <Image
                        src="/somtam-bg.png"
                        alt="Background"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content */}
                <div className="relative container mx-auto px-4 py-16">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-block mb-6">
                            <div className="bg-gradient-to-r from-lime-500 to-orange-500 p-1 rounded-2xl shadow-2xl">
                                <div className="bg-white px-8 py-4 rounded-xl">
                                    <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-lime-600 to-orange-600 bg-clip-text text-transparent">
                                        ร้านส้มตำแซ่บนัว
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <p className="text-2xl md:text-3xl text-gray-700 font-bold mb-2">
                            🌶️ ระบบจัดการคิวอัจฉริยะ 🌶️
                        </p>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            ไม่ต้องรอนาน! จองคิวล่วงหน้า ตรวจสอบสถานะแบบเรียลไทม์
                        </p>
                    </div>

                    {/* Hero Image */}
                    <div className="max-w-4xl mx-auto mb-16 relative">
                        <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                            <Image
                                src="/somtam-hero.png"
                                alt="ส้มตำแซ่บนัว"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        {/* Floating Badge */}
                        <div className="absolute -top-6 -right-6 bg-gradient-to-br from-red-500 to-orange-500 text-white px-8 py-4 rounded-full shadow-2xl transform rotate-12 animate-bounce">
                            <p className="text-2xl font-black">แซ่บมาก!</p>
                        </div>
                    </div>

                    {/* Action Cards */}
                    <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {/* Customer Card */}
                        <Link href="/customer" className="group">
                            <Card className="h-full border-4 border-lime-200 hover:border-lime-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-white to-lime-50">
                                <CardContent className="p-8 text-center">
                                    <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">
                                        👥
                                    </div>
                                    <h2 className="text-3xl font-black text-lime-700 mb-3">
                                        ลูกค้า
                                    </h2>
                                    <p className="text-gray-600 mb-6 text-lg">
                                        จองคิว ติดตามสถานะ<br />รอสั่งส้มตำแซ่บๆ
                                    </p>
                                    <Button className="w-full bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white text-xl py-6 rounded-xl shadow-lg">
                                        จองคิวเลย! 🎫
                                    </Button>
                                </CardContent>
                            </Card>
                        </Link>

                        {/* QR Code Card */}
                        <Link href="/qr" className="group">
                            <Card className="h-full border-4 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-white to-purple-50">
                                <CardContent className="p-8 text-center">
                                    <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">
                                        📱
                                    </div>
                                    <h2 className="text-3xl font-black text-purple-700 mb-3">
                                        QR Code
                                    </h2>
                                    <p className="text-gray-600 mb-6 text-lg">
                                        สำหรับลูกค้า<br />สแกนเพื่อจองคิว
                                    </p>
                                    <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white text-xl py-6 rounded-xl shadow-lg">
                                        ดู QR Code 📸
                                    </Button>
                                </CardContent>
                            </Card>
                        </Link>

                        {/* Admin Card */}
                        <Link href="/admin" className="group">
                            <Card className="h-full border-4 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-white to-orange-50">
                                <CardContent className="p-8 text-center">
                                    <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">
                                        👨‍🍳
                                    </div>
                                    <h2 className="text-3xl font-black text-orange-700 mb-3">
                                        ผู้จัดการ
                                    </h2>
                                    <p className="text-gray-600 mb-6 text-lg">
                                        จัดการคิวทั้งหมด<br />เรียกลูกค้าเข้าทานส้มตำ
                                    </p>
                                    <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xl py-6 rounded-xl shadow-lg">
                                        เข้าสู่ระบบ 🔐
                                    </Button>
                                </CardContent>
                            </Card>
                        </Link>

                        {/* Monitor Card */}
                        <Link href="/monitor" className="group">
                            <Card className="h-full border-4 border-red-200 hover:border-red-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-white to-red-50">
                                <CardContent className="p-8 text-center">
                                    <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">
                                        📺
                                    </div>
                                    <h2 className="text-3xl font-black text-red-700 mb-3">
                                        จอแสดงผล
                                    </h2>
                                    <p className="text-gray-600 mb-6 text-lg">
                                        แสดงบนจอขนาดใหญ่<br />เรียกคิวแบบชัดเจน
                                    </p>
                                    <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-xl py-6 rounded-xl shadow-lg">
                                        เปิดจอแสดงผล 📢
                                    </Button>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>

                    {/* Features Section */}
                    <div className="mt-20 max-w-4xl mx-auto">
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border-4 border-yellow-200">
                            <h3 className="text-3xl font-black text-center mb-8 text-gray-800">
                                ✨ จุดเด่นของเรา ✨
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="flex items-start space-x-4">
                                    <span className="text-4xl">🚀</span>
                                    <div>
                                        <h4 className="font-black text-xl text-gray-800 mb-1">รวดเร็ว</h4>
                                        <p className="text-gray-600">จองคิวง่าย ไม่เสียเวลารอ</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <span className="text-4xl">📱</span>
                                    <div>
                                        <h4 className="font-black text-xl text-gray-800 mb-1">สะดวก</h4>
                                        <p className="text-gray-600">ตรวจสอบผ่านมือถือได้ทุกที่</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <span className="text-4xl">🔔</span>
                                    <div>
                                        <h4 className="font-black text-xl text-gray-800 mb-1">แจ้งเตือน</h4>
                                        <p className="text-gray-600">อัพเดตสถานะแบบเรียลไทม์</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <span className="text-4xl">🌟</span>
                                    <div>
                                        <h4 className="font-black text-xl text-gray-800 mb-1">ทันสมัย</h4>
                                        <p className="text-gray-600">ระบบอัจฉริยะ ใช้งานง่าย</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-16 text-gray-600">
                        <p className="text-lg">
                            🌶️ ส้มตำแซ่บนัว - ส้มตำที่แซ่บที่สุดในย่านนี้ 🌶️
                        </p>
                        <p className="text-sm mt-2 opacity-75">
                            Powered by Next.js + TypeScript + MongoDB
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
