'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function CustomerPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        pax: 1,
    });

    // Get current URL for QR code
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://test05-kappa.vercel.app/customer';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/queue', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const queue = await res.json();
                router.push(`/customer/queue/${queue._id}`);
            } else {
                alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
        } finally {
            setLoading(false);
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
            <div className="absolute top-10 left-10 text-6xl animate-bounce opacity-30">🌶️</div>
            <div className="absolute top-20 right-20 text-5xl animate-pulse opacity-30">🥗</div>
            <div className="absolute bottom-20 left-1/4 text-7xl animate-bounce opacity-20" style={{ animationDelay: '1s' }}>🍋</div>

            <div className="relative container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-6">
                    <Link href="/" className="inline-block mb-4">
                        <div className="bg-gradient-to-r from-lime-500 to-orange-500 p-1 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
                            <div className="bg-white px-6 py-3 rounded-xl">
                                <h1 className="text-4xl font-black bg-gradient-to-r from-lime-600 to-orange-600 bg-clip-text text-transparent">
                                    ร้านส้มตำแซ่บนัว
                                </h1>
                            </div>
                        </div>
                    </Link>
                    <p className="text-2xl font-bold text-gray-700">🎫 จองคิวทานส้มตำ 🎫</p>
                </div>

                {/* Main Grid Layout */}
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
                    {/* Left Side - Booking Form */}
                    <div className="space-y-6">
                        {/* Illustration */}
                        <div className="relative h-56 rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="/queue-illustration.png"
                                alt="Queue Illustration"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Booking Form Card */}
                        <Card className="border-4 border-lime-300 shadow-2xl bg-white/95 backdrop-blur-sm">
                            <CardHeader className="bg-gradient-to-r from-lime-500 to-orange-500 text-white rounded-t-lg">
                                <CardTitle className="text-3xl text-center font-black">
                                    📝 กรอกข้อมูลจองคิว
                                </CardTitle>
                                <CardDescription className="text-center text-white/90 text-lg">
                                    กรุณากรอกข้อมูลให้ครบถ้วน
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-8">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name Input */}
                                    <div>
                                        <Label htmlFor="name" className="text-xl font-bold text-gray-700 flex items-center mb-3">
                                            <span className="text-2xl mr-2">👤</span> ชื่อ-นามสกุล
                                        </Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="กรอกชื่อของคุณ"
                                            className="text-lg p-6 border-2 border-lime-200 focus:border-lime-500 rounded-xl"
                                        />
                                    </div>

                                    {/* Phone Input */}
                                    <div>
                                        <Label htmlFor="phone" className="text-xl font-bold text-gray-700 flex items-center mb-3">
                                            <span className="text-2xl mr-2">📱</span> เบอร์โทรศัพท์
                                        </Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="08x-xxx-xxxx"
                                            className="text-lg p-6 border-2 border-lime-200 focus:border-lime-500 rounded-xl"
                                        />
                                    </div>

                                    {/* Pax Input */}
                                    <div>
                                        <Label htmlFor="pax" className="text-xl font-bold text-gray-700 flex items-center mb-3">
                                            <span className="text-2xl mr-2">👥</span> จำนวนคน
                                        </Label>
                                        <Input
                                            id="pax"
                                            type="number"
                                            min="1"
                                            max="20"
                                            required
                                            value={formData.pax}
                                            onChange={(e) => setFormData({ ...formData, pax: parseInt(e.target.value) })}
                                            className="text-lg p-6 border-2 border-lime-200 focus:border-lime-500 rounded-xl"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-lime-500 to-orange-500 hover:from-lime-600 hover:to-orange-600 text-white text-2xl py-8 rounded-xl shadow-lg hover:shadow-2xl transition-all disabled:opacity-50 font-black"
                                    >
                                        {loading ? '⏳ กำลังจองคิว...' : '🎉 รับบัตรคิวเลย!'}
                                    </Button>

                                    {/* Back Button */}
                                    <Link href="/">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full border-2 border-gray-300 text-gray-700 text-lg py-6 rounded-xl hover:bg-gray-50"
                                        >
                                            ← กลับหน้าหลัก
                                        </Button>
                                    </Link>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Side - QR Code */}
                    <div className="space-y-6">
                        {/* QR Code Card */}
                        <Card className="border-4 border-purple-300 shadow-2xl bg-white/95 backdrop-blur-sm">
                            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                                <CardTitle className="text-3xl text-center font-black">
                                    📱 สแกน QR Code จองคิว
                                </CardTitle>
                                <CardDescription className="text-center text-white/90 text-lg">
                                    สะดวก รวดเร็ว ไม่ต้องพิมพ์ URL
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-8">
                                <div className="flex flex-col items-center space-y-6">
                                    {/* QR Code Display */}
                                    <div className="relative">
                                        <div className="bg-gradient-to-br from-purple-400 to-pink-400 p-2 rounded-3xl shadow-2xl">
                                            <div className="bg-white p-6 rounded-2xl">
                                                <img
                                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(currentUrl)}&color=000000&bgcolor=ffffff&margin=10`}
                                                    alt="QR Code สำหรับจองคิว"
                                                    className="w-64 h-64"
                                                />
                                            </div>
                                        </div>
                                        {/* Decorative Elements */}
                                        <div className="absolute -top-4 -left-4 text-5xl animate-bounce">🌶️</div>
                                        <div className="absolute -top-4 -right-4 text-5xl animate-pulse">🥗</div>
                                        <div className="absolute -bottom-4 -left-4 text-5xl animate-pulse" style={{ animationDelay: '0.3s' }}>🍋</div>
                                        <div className="absolute -bottom-4 -right-4 text-5xl animate-bounce" style={{ animationDelay: '0.6s' }}>🥜</div>
                                    </div>

                                    {/* Instructions */}
                                    <div className="text-center space-y-4 w-full">
                                        <h3 className="text-2xl font-black text-gray-800">
                                            📱 วิธีใช้งาน
                                        </h3>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border-2 border-purple-300">
                                                <div className="text-4xl mb-2">1️⃣</div>
                                                <p className="text-sm font-bold">เปิดกล้อง</p>
                                            </div>
                                            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-xl border-2 border-pink-300">
                                                <div className="text-4xl mb-2">2️⃣</div>
                                                <p className="text-sm font-bold">สแกน QR</p>
                                            </div>
                                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border-2 border-orange-300">
                                                <div className="text-4xl mb-2">3️⃣</div>
                                                <p className="text-sm font-bold">จองคิว</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Print Button */}
                                    <Button
                                        onClick={() => window.print()}
                                        variant="outline"
                                        className="w-full border-2 border-purple-500 text-purple-700 text-lg py-6 rounded-xl hover:bg-purple-50 font-bold"
                                    >
                                        🖨️ พิมพ์ QR Code
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Info Section */}
                        <div className="bg-yellow-50 border-4 border-yellow-200 rounded-2xl p-6 shadow-lg">
                            <h3 className="text-xl font-black text-yellow-800 mb-4 flex items-center">
                                <span className="text-2xl mr-2">💡</span> ข้อมูลสำคัญ
                            </h3>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-green-600 mr-2">✓</span>
                                    <span>รับหมายเลขคิวทันทีหลังจากจอง</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-600 mr-2">✓</span>
                                    <span>ตรวจสอบสถานะคิวแบบเรียลไทม์</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-600 mr-2">✓</span>
                                    <span>สแกน QR Code สะดวกกว่า</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    .print-area, .print-area * {
                        visibility: visible;
                    }
                }
            `}</style>
        </div>
    );
}
