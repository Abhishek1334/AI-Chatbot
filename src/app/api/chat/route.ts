// app/api/chat/route.ts
import { type NextRequest } from 'next/server';
import { Message } from '@/types/types';

export async function POST(req: NextRequest) {
    try {
        // Validate API key
        const apiKey = process.env.OPENROUTER_API_KEY;
        if (!apiKey) {
            return new Response(JSON.stringify({ error: 'Missing API Key' }), {
                status: 500,
            });
        }

        const body = await req.json();
        const messages: Message[] = body.messages;

        const res = await fetch(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'qwen/qwen3-coder:free',
                    messages,
                }),
            }
        );

        const data = await res.json();

        const reply = data?.choices?.[0]?.message?.content;

        if (!reply) {
            return new Response(
                JSON.stringify({ error: 'No reply from model.' }),
                { status: 500 }
            );
        }

        return Response.json({ reply });
    } catch (err: unknown) {
        const message =
            err instanceof Error ? err.message : 'Unknown server error';
        console.error('[API Route Error]', message);
        return new Response(JSON.stringify({ error: message }), {
            status: 500,
        });
    }
}
