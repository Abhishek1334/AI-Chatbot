'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectTrigger,
    SelectItem,
    SelectValue,
    SelectContent,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

import { Message } from '@/types/types';
import { fetchLLMReply } from '@/utils/fetchLLMReply';
import { summarizeMessages } from '@/utils/summarizeMessage';

const Roles = {
    'You are a helpful assistant.': 'Default',
    'You are a strict computer science teacher.': 'Tutor',
    'You are a JavaScript coding expert.': 'Coder',
    'You are a professional technical writer.': 'Writer',
};

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

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = async () => {
        if (!input.trim()) return;
        setLoading(true);
        setError('');

        try {
            const updatedMessages: Message[] =
                messages.length > 10
                    ? [
                          {
                              role: 'system' as const,
                              content: `Summary: ${await summarizeMessages(
                                  messages.slice(-20)
                              )}`,
                          },
                          ...messages.slice(-5),
                          { role: 'user' as const, content: input },
                      ]
                    : [
                          { role: 'system' as const, content: systemPrompt },
                          ...messages,
                          { role: 'user' as const, content: input },
                      ];

            const response = await fetchLLMReply([
                ...updatedMessages.slice(0, -1),
                {
                    role: 'user' as const,
                    content: `${input}\n\nPlease reply in ${format} format.`,
                },
            ]);

            setMessages([
                ...updatedMessages,
                { role: 'assistant' as const, content: response },
            ]);

            setInput('');
        } catch (err: unknown) {
            if (err instanceof Error) setError(err.message);
            else setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen max-w-2xl mx-auto px-4 py-2">
            <h1 className="text-xl font-semibold mb-4">GenAI Chat</h1>

            <ScrollArea className="flex-1 overflow-y-auto space-y-2 pr-2 mb-4">
                {messages
                    .filter(m => m.role !== 'system')
                    .map((msg, idx) => (
                        <Card
                            key={idx}
                            className={`p-3 ${
                                msg.role === 'user' ? 'bg-muted' : 'bg-card'
                            }`}
                        >
                            <div className="text-xs font-medium mb-1">
                                {msg.role === 'user'
                                    ? '🧑 You'
                                    : '🤖 Assistant'}
                            </div>
                            <div className="text-sm text-foreground whitespace-pre-wrap">
                                {format === 'markdown' ? (
                                    <ReactMarkdown
                                        rehypePlugins={[rehypeHighlight]}
                                    >
                                        {msg.content}
                                    </ReactMarkdown>
                                ) : format === 'json' ? (
                                    <pre className="overflow-auto">
                                        {JSON.stringify(
                                            JSON.parse(msg.content),
                                            null,
                                            2
                                        )}
                                    </pre>
                                ) : (
                                    msg.content
                                )}
                            </div>
                        </Card>
                    ))}
                {loading && (
                    <div className="p-3 bg-muted rounded">
                        <div className="text-xs font-medium mb-1">
                            🤖 Assistant
                        </div>
                        <div className="dot-pulse" />
                    </div>
                )}
                <div ref={messagesEndRef} />
            </ScrollArea>

            {error && <div className="text-sm text-red-500 mb-2">{error}</div>}

            <div className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                    <Select
                        value={systemPrompt}
                        onValueChange={setSystemPrompt}
                    >
                        <SelectTrigger className="w-full sm:w-1/2">
                            <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.entries(Roles).map(([value, label]) => (
                                <SelectItem key={value} value={value}>
                                    {label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={format} onValueChange={setFormat}>
                        <SelectTrigger className="w-full sm:w-1/2">
                            <SelectValue placeholder="Format" />
                        </SelectTrigger>
                        <SelectContent>
                            {['plain', 'markdown', 'json', 'table'].map(f => (
                                <SelectItem key={f} value={f}>
                                    {f}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Textarea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit();
                        }
                    }}
                    placeholder="Type your message..."
                />
                <Button
                    onClick={handleSubmit}
                    disabled={loading || !input.trim()}
                >
                    {loading ? 'Sending...' : 'Send'}
                </Button>
            </div>
        </div>
    );
}
