import { NextResponse } from 'next/server';
import { smlApi } from '@/lib/sml-api';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, phone, pax } = body;

        if (!name || !phone || !pax) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Generate Queue Number
        const counter = await smlApi.getNextSequence('queue');
        const queueNumber = `A${counter.toString().padStart(3, '0')}`;
        const id = crypto.randomUUID();

        const newQueue = {
            _id: id,
            name,
            phone,
            pax,
            queueNumber,
            status: 'waiting',
            createdAt: new Date().toISOString(),
        };

        // Pass id to insert to use it as filter for upsert
        const res = await smlApi.insert('queue', newQueue, id);

        const createdQueue = { ...newQueue, _id: id };

        return NextResponse.json(createdQueue, { status: 201 });
    } catch (error) {
        console.error('Error creating queue:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const status = searchParams.get('status');

        const filter = status ? { status } : {};

        // Sort by createdAt ascending (1)
        const queues = await smlApi.get('queue', filter, { createdAt: 1 });

        return NextResponse.json(queues);
    } catch (error) {
        console.error('Error fetching queues:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
