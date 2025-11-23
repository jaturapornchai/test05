import { NextResponse } from 'next/server';

const BASE_URL = 'https://smlgoapi.dedepos.com/v1';

export async function DELETE() {
    try {
        // Delete all queues
        const deleteQueuesRes = await fetch(`${BASE_URL}/mongoatlasdelete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                collection: 'queue',
                filter: {}, // Empty filter = delete all
                delete_many: true, // Delete multiple documents
            }),
        });

        const deleteQueuesResult = await deleteQueuesRes.json();

        // Reset counter
        const resetCounterRes = await fetch(`${BASE_URL}/mongoatlasdelete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                collection: 'counters',
                filter: { name: 'queue' },
                delete_many: false,
            }),
        });

        const resetCounterResult = await resetCounterRes.json();

        return NextResponse.json({
            message: 'All data cleared successfully',
            queues_deleted: deleteQueuesResult.deleted_count || 0,
            counter_reset: resetCounterResult.deleted_count > 0,
        });
    } catch (error) {
        console.error('Error clearing data:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
