'use client';

import { useState } from 'react';
import { ChatContainer, MessageList } from '@/components/page';
import { Dropdown } from '@/components/Dropdown';
import { FormatDropdown } from '@/components/FormatDropdown';
import { ChatInput } from '@/components/ChatInput';
import { Message } from '@/types/types';
import { fetchLLMReply } from '@/utils/fetchLLMReply';
import { summarizeMessages } from '@/utils/summarizeMessage';

export default function Home() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { role: 'system', content: 'You are a helpful assistant.' },
    ]);
    const [systemPrompt, setSystemPrompt] = useState(
        'You are a helpful assistant.'
    );
    const [format, setFormat] = useState('plain');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;
        
        const userMessage: Message = { role: 'user', content: input };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput('');
        setError('');
        setLoading(true);
        
        // Reset textarea height after submission
        const textarea = document.querySelector('textarea');
        if (textarea) {
            textarea.style.height = '60px';
        }

        try {
            const formattedInput = `${input}\n\nPlease reply in ${format} format.`;
            const updatedMessages =
                messages.length > 10
                    ? [
                          {
                              role: 'system' as const,
                              content: `Summary: ${await summarizeMessages(
                                  messages.slice(-20)
                              )}`,
                          },
                          ...messages.slice(-5),
                          { role: 'user' as const, content: formattedInput },
                      ]
                    : [
                          { role: 'system' as const, content: systemPrompt },
                          ...messages,
                          { role: 'user' as const, content: formattedInput },
                      ];
            setError('');
            const res = await fetchLLMReply(updatedMessages);
            setMessages([
                ...updatedMessages,
                { role: 'assistant', content: res },
            ]);
            setInput('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="h-screen w-full bg-gray-900">
            <ChatContainer>
                <MessageList messages={messages} format={format} />
                
                <div className="fixed bottom-0 left-0 right-0 bg-transparent z-10 bg-gray-900">
                    <div className="max-w-3xl mx-auto w-full px-4 pb-4">
                        {error && (
                            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                                {error}
                            </div>
                        )}
                        <ChatInput
                            input={input}
                            setInput={setInput}
                            handleSubmit={handleSubmit}
                            loading={loading}
                        >
                            <Dropdown
                                systemPrompt={systemPrompt}
                                setSystemPrompt={setSystemPrompt}
                            />
                            <FormatDropdown 
                                format={format}
                                setFormat={setFormat}
                            />
                        </ChatInput>
                    </div>
                </div>
            </ChatContainer>
        </main>
    );
}
