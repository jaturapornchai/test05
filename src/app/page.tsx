import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home as HomeIcon, Info, User, Settings, Monitor } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4">
            {/* Navigation Header */}
            <div className="max-w-6xl mx-auto mb-6">
                <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center space-x-3">
                        <HomeIcon className="w-6 h-6 text-blue-600" />
                        <span className="font-bold text-lg text-gray-800">ระบบจัดการคิว</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Link href="/USER_MANUAL.md" target="_blank">
                            <Button variant="outline" size="sm">
                                <Info className="w-4 h-4 mr-2" />
                                คู่มือการใช้งาน
                            </Button>
                        </Link>
                        <Link href="/customer">
                            <Button variant="outline" size="sm">
                                <User className="w-4 h-4 mr-2" />
                                ลูกค้า
                            </Button>
                        </Link>
                        <Link href="/admin">
                            <Button variant="outline" size="sm">
                                <Settings className="w-4 h-4 mr-2" />
                                แอดมิน
                            </Button>
                        </Link>
                        <Link href="/monitor">
                            <Button variant="outline" size="sm">
                                <Monitor className="w-4 h-4 mr-2" />
                                จอแสดงผล
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="text-center mb-8 pt-8">
                <CardTitle className="text-4xl font-bold text-blue-900 mb-2">ระบบจัดการคิวร้านอาหาร</CardTitle>
                <CardDescription className="text-xl text-gray-600">Queue Management System</CardDescription>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto">
                <Tabs defaultValue="quick-start" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 mb-8">
                        <TabsTrigger value="quick-start">🚀 เริ่มต้นใช้งาน</TabsTrigger>
                        <TabsTrigger value="customer">👤 สำหรับลูกค้า</TabsTrigger>
                        <TabsTrigger value="admin">🔧 สำหรับผู้จัดการ</TabsTrigger>
                        <TabsTrigger value="monitor">📺 จอแสดงผล</TabsTrigger>
                    </TabsList>

                    <TabsContent value="quick-start">
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-2xl text-green-600">🚀 วิธีการใช้งานง่ายๆ</CardTitle>
                                <CardDescription>เริ่มต้นใช้งานระบบจัดการคิวใน 3 ขั้นตอนง่ายๆ</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                    <div className="text-center p-6 bg-orange-50 rounded-lg">
                                        <div className="text-4xl mb-3">1️⃣</div>
                                        <h3 className="font-bold text-lg mb-2">ลูกค้าจองคิว</h3>
                                        <p className="text-gray-600">กรอกชื่อ เบอร์โทร และจำนวนคน</p>
                                    </div>
                                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                                        <div className="text-4xl mb-3">2️⃣</div>
                                        <h3 className="font-bold text-lg mb-2">ผู้จัดการเรียกคิว</h3>
                                        <p className="text-gray-600">จัดการและเรียกคิวลูกค้าตามลำดับ</p>
                                    </div>
                                    <div className="text-center p-6 bg-purple-50 rounded-lg">
                                        <div className="text-4xl mb-3">3️⃣</div>
                                        <h3 className="font-bold text-lg mb-2">แสดงผลบนจอ</h3>
                                        <p className="text-gray-600">แสดงคิวที่เรียกและคิวที่รอ</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="customer">
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-2xl text-orange-600">👤 สำหรับลูกค้า</CardTitle>
                                <CardDescription>วิธีการจองคิวและติดตามสถานะ</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="bg-orange-50 p-4 rounded-lg">
                                        <h4 className="font-bold mb-2">📝 ขั้นตอนการจองคิว:</h4>
                                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                                            <li>กดปุ่ม "เข้าสู่ระบบลูกค้า" ด้านล่าง</li>
                                            <li>กรอกชื่อ เบอร์โทรศัพท์ และจำนวนคน</li>
                                            <li>กดปุ่ม "รับบัตรคิว" ระบบจะสร้างหมายเลขคิวให้</li>
                                            <li>ติดตามสถานะคิวในหน้าจอที่แสดงอัตโนมัติ</li>
                                        </ul>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h4 className="font-bold mb-2">📊 สถานะคิว:</h4>
                                        <ul className="space-y-1 text-gray-700">
                                            <li><span className="font-medium text-yellow-600">🟡 รอเรียก:</span> ยังไม่ถึงคิว ระบบจะแสดงจำนวนคิวที่รออยู่</li>
                                            <li><span className="font-medium text-green-600">🟢 ถึงคิวแล้ว:</span> เชิญเข้าร้านได้เลย</li>
                                            <li><span className="font-medium text-gray-600">⚫ เสร็จสิ้น:</span> เสร็จสิ้นการใช้บริการ</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <Link href="/customer">
                                        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-lg py-3">
                                            👤 เข้าสู่ระบบลูกค้า
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="admin">
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-2xl text-blue-600">🔧 สำหรับผู้จัดการ</CardTitle>
                                <CardDescription>การจัดการคิวและควบคุมระบบ</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <h4 className="font-bold mb-2">⚙️ ฟีเจอร์หลัก:</h4>
                                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                                            <li>ดูรายการคิวทั้งหมดแบบเรียลไทม์</li>
                                            <li>เรียกคิวลูกค้าเมื่อถึงคิว</li>
                                            <li>จัดการสถานะ: รอเรียก → เรียกแล้ว → เสร็จสิ้น</li>
                                            <li>ลบข้อมูลทั้งหมดเมื่อปิดร้าน</li>
                                        </ul>
                                    </div>
                                    <div className="bg-red-50 p-4 rounded-lg">
                                        <h4 className="font-bold mb-2 text-red-600">⚠️ คำเตือน:</h4>
                                        <ul className="space-y-1 text-gray-700">
                                            <li>• การลบข้อมูลไม่สามารถย้อนกลับได้</li>
                                            <li>• ตรวจสอบข้อมูลก่อนเรียกคิวทุกครั้ง</li>
                                            <li>• หน้าจอจะอัปเดตทุก 5 วินาที</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <Link href="/admin">
                                        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-lg py-3">
                                            🔧 เข้าสู่ระบบแอดมิน
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="monitor">
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle className="text-2xl text-purple-600">📺 จอแสดงผล</CardTitle>
                                <CardDescription>หน้าจอแสดงผลสำหรับลูกค้าและพนักงาน</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="bg-purple-50 p-4 rounded-lg">
                                        <h4 className="font-bold mb-2">🎯 การแสดงผล:</h4>
                                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                                            <li>แสดงคิวที่เรียกแล้วอย่างชัดเจน</li>
                                            <li>รายการคิวที่รอเรียกทั้งหมด</li>
                                            <li>เสียงแจ้งเตือนเมื่อมีคิวใหม่</li>
                                            <li>เหมาะสำหรับแสดงบนจอขนาดใหญ่</li>
                                        </ul>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <h4 className="font-bold mb-2 text-green-600">🎪 การใช้งาน:</h4>
                                        <ul className="space-y-1 text-gray-700">
                                            <li>• เปิดในโหมดเต็มจอ (F11)</li>
                                            <li>• เหมาะสำหรับติดตั้งในร้านอาหาร</li>
                                            <li>• อัปเดตทุก 3 วินาที</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <Link href="/monitor">
                                        <Button className="w-full bg-purple-500 hover:bg-purple-600 text-lg py-3">
                                            📺 เปิดจอแสดงผล
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <Link href="/customer" className="group">
                        <div className="h-full p-6 bg-white rounded-xl border-2 border-orange-100 hover:border-orange-500 hover:shadow-lg transition-all cursor-pointer flex flex-col items-center text-center space-y-4 group-hover:-translate-y-1">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-3xl">👤</div>
                            <h2 className="text-2xl font-bold text-gray-800 group-hover:text-orange-600">ลูกค้า</h2>
                            <p className="text-gray-500">สำหรับลูกค้าจองคิวและติดตามสถานะ</p>
                            <Button className="w-full mt-auto bg-orange-500 hover:bg-orange-600">เข้าสู่ระบบลูกค้า</Button>
                        </div>
                    </Link>

                    <Link href="/admin" className="group">
                        <div className="h-full p-6 bg-white rounded-xl border-2 border-blue-100 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer flex flex-col items-center text-center space-y-4 group-hover:-translate-y-1">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl">🔧</div>
                            <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600">ผู้จัดการ</h2>
                            <p className="text-gray-500">สำหรับเจ้าของร้านจัดการคิว</p>
                            <Button className="w-full mt-auto bg-blue-500 hover:bg-blue-600">เข้าสู่ระบบแอดมิน</Button>
                        </div>
                    </Link>

                    <Link href="/monitor" className="group">
                        <div className="h-full p-6 bg-white rounded-xl border-2 border-purple-100 hover:border-purple-500 hover:shadow-lg transition-all cursor-pointer flex flex-col items-center text-center space-y-4 group-hover:-translate-y-1">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-3xl">📺</div>
                            <h2 className="text-2xl font-bold text-gray-800 group-hover:text-purple-600">จอแสดงผล</h2>
                            <p className="text-gray-500">สำหรับแสดงผลบนจอขนาดใหญ่</p>
                            <Button className="w-full mt-auto bg-purple-500 hover:bg-purple-600">เปิดจอแสดงผล</Button>
                        </div>
                    </Link>
                </div>

                {/* Footer */}
                <div className="text-center mt-12 py-8 text-gray-500">
                    <p className="text-lg">🏪 ระบบจัดการคิวร้านอาหาร - Queue Management System</p>
                    <p className="text-sm mt-2">สร้างด้วย Next.js + TypeScript + Tailwind CSS + MongoDB</p>
                </div>
            </div>
        </div>
    );
}
