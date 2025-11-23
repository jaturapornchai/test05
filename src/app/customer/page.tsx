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
                    <p className="text-2xl font-bold text-gray-700">🎫 จองคิวทานส้มตำ 🎫</p>
                </div>

                <div className="max-w-2xl mx-auto">
                    {/* Illustration */}
                    <div className="mb-8 relative h-64 rounded-2xl overflow-hidden shadow-xl">
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

                    {/* Info Section */}
                    <div className="mt-8 bg-yellow-50 border-4 border-yellow-200 rounded-2xl p-6 shadow-lg">
                        <h3 className="text-xl font-black text-yellow-800 mb-4 flex items-center">
                            <span className="text-2xl mr-2">💡</span> ข้อมูลสำคัญ
                        </h3>
                        <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start">
                                <span className="text-green-600 mr-2">✓</span>
                                <span>คุณจะได้รับหมายเลขคิวทันทีหลังจากจอง</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-600 mr-2">✓</span>
                                <span>สามารถตรวจสอบสถานะคิวแบบเรียลไทม์</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-600 mr-2">✓</span>
                                <span>จองคิวล่วงหน้า ไม่ต้องรอนาน</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
