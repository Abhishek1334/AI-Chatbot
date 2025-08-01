import type { Message } from '@/types/types';
import { fetchLLMReply } from './fetchLLMReply';

export async function summarizeMessages(history: Message[]): Promise<string> {
    const system: Message = {
        role: 'system',
        content:
            'You are a smart assistant that summarizes chat conversations.',
    };

    const user: Message = {
        role: 'user',
        content: `Summarize this conversation in under 150 words:\n\n${history
            .map(m => `${m.role}: ${m.content}`)
            .join('\n')}`,
    };

    try {
        const summary = await fetchLLMReply([system, user]);
        return summary;
    } catch (err) {
        if (err instanceof Error) {
            console.error('[Summarizer Error]', err.message);
            return 'Unable to summarize conversation at the moment.';
        } else {
            console.error('[Summarizer Unknown Error]', err);
            return 'An unknown error occurred while summarizing.';
        }
    }
}
