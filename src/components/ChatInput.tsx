'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { useEffect, useRef } from 'react';

interface ChatInputProps {
    input: string;
    setInput: (value: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    loading: boolean;
    children?: React.ReactNode;
}

export function ChatInput({ 
    input, 
    setInput, 
    handleSubmit, 
    loading, 
    children 
}: ChatInputProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const formEvent = new Event('submit', { cancelable: true, bubbles: true }) as unknown as React.FormEvent;
            handleSubmit(formEvent);
        }
    };

    // Auto-resize textarea
    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        // Reset height to get the correct scrollHeight
        textarea.style.height = 'auto';
        // Set the height to scrollHeight, but not more than maxHeight (200px)
        const newHeight = Math.min(textarea.scrollHeight, 200);
        textarea.style.height = `${Math.max(newHeight, 60)}px`; // 60px is minHeight
    }, [input]);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto px-2 sm:px-4">
            <div className="relative">
                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    placeholder="Message ChatGPT..."
                    className="w-full min-h-[60px] max-h-[200px] px-4 py-3 pr-10 sm:pr-12 text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden text-sm sm:text-base"
                    style={{
                        height: 'auto',
                        minHeight: '60px',
                        maxHeight: '200px',
                    }}
                />
            </div>
            
            <div className="flex items-center justify-between mt-2 px-1">
                <div className="flex space-x-1 sm:space-x-2">
                    {children}
                </div>
                <Button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="bg-green-600 hover:bg-green-700 text-white rounded-full p-1.5 sm:p-2 h-9 w-9 sm:w-auto"
                >
                    {loading ? (
                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                        <span className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className="w-4 h-4 sm:mr-1" strokeWidth="2">
                                <path d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 5.653A1 1 0 0 1 .5 4.67V1.163Z" fill="#ffffff"></path>
                            </svg>
                            <span className="hidden sm:inline">Send</span>
                        </span>
                    )}
                </Button>
            </div>
        </form>
    );
}
