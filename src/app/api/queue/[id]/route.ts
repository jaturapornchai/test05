import { NextResponse } from 'next/server';
import { smlApi } from '@/lib/sml-api';

export const dynamic = 'force-dynamic';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Simple string ID filter (UUIDs)
        const queues = await smlApi.get<any>('queue', { _id: id });

        if (queues.length === 0) {
            return NextResponse.json(
                { error: 'Queue not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(queues[0]);
    } catch (error) {
        console.error('Error fetching queue:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { status } = body;

        if (!status) {
            return NextResponse.json(
                { error: 'Status is required' },
                { status: 400 }
            );
        }

        // Update with simple string ID filter
        const res = await smlApi.update('queue', { _id: id }, { status });

        if (res.matched_count === 0) {
            return NextResponse.json(
                { error: 'Queue not found' },
                { status: 404 }
            );
        }

        // Fetch updated queue
        const queues = await smlApi.get<any>('queue', { _id: id });

        return NextResponse.json(queues[0]);
    } catch (error) {
        console.error('Error updating queue:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Delete with simple string ID filter
        const res = await smlApi.delete('queue', { _id: id });

        if (res.deleted_count === 0) {
            return NextResponse.json(
                { error: 'Queue not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Queue deleted' });
    } catch (error) {
        console.error('Error deleting queue:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
