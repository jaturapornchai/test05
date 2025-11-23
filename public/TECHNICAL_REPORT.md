# รายงานระบบเทคนิค - ระบบจัดการคิวร้านอาหาร
## Technical System Report - Queue Management System

---

## 📊 ข้อมูลระบบ

### เทคโนโลยีที่ใช้ (Technology Stack)
- **Framework**: Next.js 16.0.3 (App Router)
- **ภาษาโปรแกรม**: TypeScript
- **UI Library**: Tailwind CSS + Custom Components
- **ฐานข้อมูล**: MongoDB (ผ่าน SMLGo API)
- **UI Components**: Radix UI + Custom Components
- **Icons**: Lucide React

### โครงสร้างโปรเจกต์ (Project Structure)
```
queue-system/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # หน้าแรก
│   │   ├── admin/page.tsx           # หน้าจัดการแอดมิน
│   │   ├── customer/
│   │   │   ├── page.tsx            # หน้าจองคิว
│   │   │   └── queue/[id]/page.tsx # หน้าติดตามคิว
│   │   ├── monitor/page.tsx         # หน้าจอแสดงผล
│   │   ├── api/queue/
│   │   │   ├── route.ts            # API สำหรับ CRUD คิว
│   │   │   ├── [id]/route.ts       # API สำหรับจัดการคิวเฉพาะ
│   │   │   └── clear/route.ts      # API สำหรับลบข้อมูลทั้งหมด
│   │   └── layout.tsx              # Layout หลัก
│   ├── components/
│   │   └── ui/                     # UI Components
│   └── lib/
│       ├── sml-api.ts              # API wrapper
│       └── utils.ts                # Utility functions
├── public/                         # Static files
└── documentation files
```

---

## 🏗️ สถาปัตยกรรมระบบ (System Architecture)

### หลักการทำงาน
1. **Frontend**: React + Next.js App Router
2. **API**: Next.js API Routes
3. **Database**: MongoDB ผ่าน SMLGo API
4. **Real-time Updates**: Client-side polling

### การไหลของข้อมูล (Data Flow)
```
ลูกค้า → หน้าจองคิว → API → SML API → MongoDB
    ↓
ผู้จัดการ → หน้าแอดมิน → API → SML API → MongoDB
    ↓
จอแสดงผล → ดึงข้อมูล → API → SML API → MongoDB
```

---

## 📋 API Endpoints

### 1. `/api/queue`
**POST** - สร้างคิวใหม่
```typescript
Request: { name: string, phone: string, pax: number }
Response: Queue object
```

**GET** - ดึงข้อมูลคิวทั้งหมด
```typescript
Query: ?status=waiting (optional)
Response: Queue[]
```

### 2. `/api/queue/[id]`
**GET** - ดึงข้อมูลคิวเฉพาะ
```typescript
Response: Queue
```

**PATCH** - อัปเดตสถานะคิว
```typescript
Request: { status: 'called'|'completed'|'cancelled' }
Response: Queue
```

**DELETE** - ลบคิว
```typescript
Response: { message: string }
```

### 3. `/api/queue/clear`
**DELETE** - ลบข้อมูลทั้งหมด
```typescript
Response: { message: string, queues_deleted: number, counter_reset: boolean }
```

---

## 🗄️ โครงสร้างฐานข้อมูล (Database Schema)

### Collection: `queue`
```typescript
{
  _id: string;           // UUID
  name: string;          // ชื่อลูกค้า
  phone: string;         // เบอร์โทรศัพท์
  pax: number;           // จำนวนคน
  queueNumber: string;   // หมายเลขคิว (เช่น A001)
  status: 'waiting'|'called'|'completed'|'cancelled';
  createdAt: string;     // ISO timestamp
}
```

### Collection: `counters`
```typescript
{
  name: string;          // ชื่อ counter (เช่น 'queue')
  seq: number;           // ค่าตัวนัดปัจจุบัน
}
```

---

## 🔄 การจัดการสถานะคิว (Queue Status Management)

### Workflow
1. **waiting** → **called** (เมื่อถึงคิว)
2. **called** → **completed** (เสร็จสิ้น)
3. **called** → **waiting** (ส่งกลับไปรอใหม่)
4. **waiting** → **cancelled** (ยกเลิก)

### หมายเลขคิว
- รูปแบบ: `A` + เลข 3 หลัก
- เริ่มต้นที่ A001
- เพิ่มขึ้นทีละ 1 เมื่อมีคิวใหม่

---

## 💻 Frontend Components

### UI Components
- **Button**: ปุ่มที่มีหลายรูปแบบ (default, outline, ghost, destructive)
- **Card**: การ์ดสำหรับจัดกลุ่มข้อมูล
- **Input**: ช่องกรอกข้อมูล
- **Badge**: ป้ายแสดงสถานะ
- **Tabs**: แท็บสำหรับจัดกลุ่มเนื้อหา
- **Table**: ตารางแสดงข้อมูล

### Page Components
- **CustomerPage**: หน้าจองคิว
- **QueueStatusPage**: หน้าติดตามสถานะคิว
- **AdminPage**: หน้าจัดการแอดมิน
- **MonitorPage**: หน้าจอแสดงผล

---

## 🎯 Key Features

### สำหรับลูกค้า
- จองคิวผ่านเว็บไซต์
- ติดตามสถานะแบบเรียลไทม์
- แสดงจำนวนคิวที่รออยู่

### สำหรับผู้จัดการ
- ดูรายการคิวทั้งหมด
- เรียกคิว/ยกเลิกคิว
- อัปเดตสถานะคิว
- ลบข้อมูลทั้งหมด

### สำหรับจอแสดงผล
- แสดงคิวที่เรียกแล้วแบบเด่นชัด
- แสดงรายการคิวที่รอเรียก
- เสียงแจ้งเตือนเมื่อมีคิวใหม่
- อัปเดตทุก 3 วินาที

---

## ⚡ ประสิทธิภาพ (Performance)

### Auto-refresh Intervals
- หน้าแอดมิน: ทุก 5 วินาที
- หน้าลูกค้า: ทุก 5 วินาที
- หน้าจอแสดงผล: ทุก 3 วินาที

### Optimization
- Next.js App Router
- Static generation where possible
- Client-side caching
- Minimal re-renders

---

## 🔒 ความปลอดภัย (Security)

### Data Validation
- Required fields validation
- Phone number format
- PAX number validation (minimum 1)

### API Security
- Input sanitization
- Error handling
- No authentication required (public system)

---

## 📱 Responsive Design

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### UI Adaptations
- Grid layouts adjust based on screen size
- Touch-friendly buttons on mobile
- Optimized font sizes for different devices

---

## 🐛 Error Handling

### API Errors
```typescript
{
  error: string;
  details?: string;
  status: number;
}
```

### User Experience
- Loading states for all async operations
- Error messages in Thai language
- Automatic retry mechanisms
- Fallback UI when API is unavailable

---

## 🚀 การ Deploy และ Maintenance

### Requirements
- Node.js 18+
- MongoDB connection (via SMLGo API)
- Next.js compatible hosting

### Environment Variables
- SMLGo API endpoint
- Database connection settings

### Monitoring
- Real-time queue status
- API response times
- Error rates

---

## 🔧 การพัฒนาและการขยายฟีเจอร์

### Potential Enhancements
1. **Authentication**: ระบบเข้าสู่ระบบสำหรับผู้จัดการ
2. **Multiple Counters**: รองรับหลายเคาน์เตอร์
3. **SMS Notifications**: แจ้งเตือนทาง SMS
4. **Time Estimates**: ประเมินเวลารอ
5. **Analytics**: สถิติการใช้งาน
6. **Admin Dashboard**: หน้าจัดการขั้นสูง

### Code Quality
- TypeScript for type safety
- ESLint for code standards
- Consistent component patterns
- Proper error boundaries

---

## 📊 Technical Specifications

### Dependencies
- **Core**: Next.js, React, TypeScript
- **UI**: Tailwind CSS, Radix UI, Lucide Icons
- **Forms**: React Hook Form, Zod validation
- **Database**: Mongoose (client), SMLGo API

### Build Configuration
- Next.js App Router
- TypeScript strict mode
- Tailwind CSS with custom theme
- PostCSS processing

---

## 💡 Best Practices Implemented

1. **Component Composition**: ใช้ UI components ที่ reusable
2. **State Management**: Client-side state ที่เหมาะสม
3. **Error Boundaries**: จัดการข้อผิดพลาดอย่างมีประสิทธิภาพ
4. **Loading States**: แสดงสถานะการโหลดที่ชัดเจน
5. **Responsive Design**: รองรับทุกขนาดหน้าจอ
6. **Internationalization**: พร้อมสำหรับหลายภาษา

---

**สร้างโดย**: Next.js + TypeScript + Tailwind CSS
**วันที่อัปเดต**: 2025-11-23
**เวอร์ชัน**: 0.1.0