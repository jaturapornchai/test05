'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function CustomerPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        pax: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/queue', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    pax: parseInt(formData.pax),
                }),
            });

            if (res.ok) {
                const data = await res.json();
                router.push(`/customer/queue/${data._id}`);
            } else {
                alert('เกิดข้อผิดพลาดในการจองคิว กรุณาลองใหม่อีกครั้ง');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-lg border-orange-200">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-3xl font-bold text-orange-600">จองคิวร้านอาหาร</CardTitle>
                    <CardDescription className="text-gray-600">กรอกข้อมูลเพื่อรับบัตรคิว</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-lg">ชื่อลูกค้า</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="เช่น คุณสมชาย"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="text-lg py-6"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-lg">เบอร์โทรศัพท์</Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="08x-xxx-xxxx"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="text-lg py-6"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="pax" className="text-lg">จำนวนคน</Label>
                            <Input
                                id="pax"
                                name="pax"
                                type="number"
                                min="1"
                                placeholder="เช่น 2"
                                required
                                value={formData.pax}
                                onChange={handleChange}
                                className="text-lg py-6"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full text-xl py-6 bg-orange-500 hover:bg-orange-600 transition-colors"
                            disabled={loading}
                        >
                            {loading ? 'กำลังบันทึก...' : 'รับบัตรคิว'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
