const BASE_URL = 'https://smlgoapi.dedepos.com/v1';

interface MongoResponse<T = any> {
    status: string;
    code: number;
    data?: T[];
    count?: number;
    matched_count?: number;
    modified_count?: number;
    upserted_id?: string | null;
    deleted_count?: number;
    message?: string;
}

export const smlApi = {
    async get<T>(collection: string, filter: any = {}, sort: any = {}, limit: number = 100): Promise<T[]> {
        try {
            console.log(`[SML API] GET ${collection} filter:`, JSON.stringify(filter));
            const res = await fetch(`${BASE_URL}/mongoatlasget`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    collection,
                    filter,
                    sort,
                    limit,
                }),
            });

            const text = await res.text();
            // console.log(`[SML API] GET Response:`, text);

            let json: MongoResponse<T>;
            try {
                json = JSON.parse(text);
            } catch (e) {
                throw new Error(`Failed to parse API response: ${text}`);
            }

            if (json.status !== 'success') {
                throw new Error(json.message || 'API Error');
            }
            return json.data || [];
        } catch (error) {
            console.error('SML API Get Error:', error);
            throw error;
        }
    },

    async insert<T>(collection: string, data: T, id?: string): Promise<any> {
        try {
            const filter = id ? { _id: id } : { _id: { $exists: false } };

            const res = await fetch(`${BASE_URL}/mongoatlasupdate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    collection,
                    filter,
                    data,
                    upsert: true,
                }),
            });
            return await res.json();
        } catch (error) {
            console.error('SML API Insert Error:', error);
            throw error;
        }
    },

    async update(collection: string, filter: any, data: any): Promise<any> {
        try {
            const res = await fetch(`${BASE_URL}/mongoatlasupdate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    collection,
                    filter,
                    data, // External API expects plain object, not $set
                    upsert: false,
                    replaceone: false,
                }),
            });
            return await res.json();
        } catch (error) {
            console.error('SML API Update Error:', error);
            throw error;
        }
    },

    async delete(collection: string, filter: any): Promise<any> {
        try {
            const res = await fetch(`${BASE_URL}/mongoatlasdelete`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    collection,
                    filter,
                    delete_many: false,
                }),
            });
            return await res.json();
        } catch (error) {
            console.error('SML API Delete Error:', error);
            throw error;
        }
    },

    async getNextSequence(name: string): Promise<number> {
        const counters = await this.get<any>('counters', { name });
        let seq = 1;

        if (counters.length > 0) {
            seq = counters[0].seq + 1;
            await fetch(`${BASE_URL}/mongoatlasupdate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    collection: 'counters',
                    filter: { name },
                    data: { seq },
                    upsert: true,
                }),
            });
        } else {
            await fetch(`${BASE_URL}/mongoatlasupdate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    collection: 'counters',
                    filter: { name },
                    data: { name, seq },
                    upsert: true,
                }),
            });
        }
        return seq;
    }
};
