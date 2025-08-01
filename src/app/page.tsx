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
import { Send, Bot, User } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

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
        <div className="flex flex-col h-screen bg-background">
            {/* Header */}
            <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-foreground flex items-center gap-2">
                        <Bot className="h-5 w-5" />
                        GenAI Chat
                    </h1>
                    <ThemeToggle />
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 container mx-auto px-4 py-4 max-w-4xl">
                {/* Messages Area */}
                <ScrollArea className="h-[calc(100vh-280px)] pr-4 mb-4">
                    <div className="space-y-4">
                        {messages
                            .filter(m => m.role !== 'system')
                            .map((msg, idx) => (
                                <Card
                                    key={idx}
                                    className={`p-4 border ${
                                        msg.role === 'user' 
                                            ? 'bg-primary/5 border-primary/20 ml-8' 
                                            : 'bg-card border-border mr-8'
                                    }`}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        {msg.role === 'user' ? (
                                            <User className="h-4 w-4 text-primary" />
                                        ) : (
                                            <Bot className="h-4 w-4 text-muted-foreground" />
                                        )}
                                        <span className="text-xs font-medium text-muted-foreground">
                                            {msg.role === 'user' ? 'You' : 'Assistant'}
                                        </span>
                                    </div>
                                    <div className="text-sm text-foreground whitespace-pre-wrap prose prose-sm dark:prose-invert max-w-none">
                                        {format === 'markdown' ? (
                                            <div className="prose prose-sm dark:prose-invert max-w-none">
                                                <ReactMarkdown
                                                    rehypePlugins={[rehypeHighlight]}
                                                >
                                                    {msg.content}
                                                </ReactMarkdown>
                                            </div>
                                        ) : format === 'json' ? (
                                            <pre className="overflow-auto bg-muted p-2 rounded text-xs">
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
                            <Card className="p-4 border border-border mr-8 bg-card">
                                <div className="flex items-center gap-2 mb-2">
                                    <Bot className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-xs font-medium text-muted-foreground">
                                        Assistant
                                    </span>
                                </div>
                                <div className="dot-pulse" />
                            </Card>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </ScrollArea>

                {/* Error Display */}
                {error && (
                    <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <div className="text-sm text-destructive">{error}</div>
                    </div>
                )}

                {/* Controls */}
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Select
                            value={systemPrompt}
                            onValueChange={setSystemPrompt}
                        >
                            <SelectTrigger className="w-full sm:w-1/2">
                                <SelectValue placeholder="Select Role" />
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
                                <SelectValue placeholder="Select Format" />
                            </SelectTrigger>
                            <SelectContent>
                                {['plain', 'markdown', 'json', 'table'].map(f => (
                                    <SelectItem key={f} value={f}>
                                        {f.charAt(0).toUpperCase() + f.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    
                    {/* Input Area */}
                    <div className="flex gap-2">
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
                            className="flex-1 min-h-[60px] resize-none"
                            disabled={loading}
                        />
                        <Button
                            onClick={handleSubmit}
                            disabled={loading || !input.trim()}
                            size="icon"
                            className="h-[60px] w-[60px]"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
