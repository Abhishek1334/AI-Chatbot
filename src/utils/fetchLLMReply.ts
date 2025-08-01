import type { Message } from '@/types/types';

type ChatAPIResponse = {
    reply: string;
    error?: string;
};

export async function fetchLLMReply(messages: Message[]): Promise<string> {
    try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages }),
        });

        const data: ChatAPIResponse = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Failed to fetch from /api/chat');
        }

        return data.reply;
    } catch (err) {
        // Use 'unknown' instead of 'any'
        if (err instanceof Error) {
            console.error('[Client Fetch Error]', err);
            throw new Error(err.message);
        } else {
            throw new Error('Unknown error occurred while fetching.');
        }
    }
}
