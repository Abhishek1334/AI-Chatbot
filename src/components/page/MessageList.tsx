import React from 'react';
import { Message } from '@/types/types';
import { MessageItem } from './MessageItem';
import { ThreeDotsLoading } from '../ui/ThreeDotsLoading';

interface MessageListProps {
    messages: Message[];
    format: string;
    loading: boolean;
}

export function MessageList({ messages, format, loading }: MessageListProps) {
    return (
        <div className="w-full h-full flex flex-col mx-auto  pt-4">
            <div className="flex-1 overflow-y-auto pb-32 space-y-4">
                {messages
                    .filter(m => m.role !== 'system')
                    .map((msg, i) => (
                        <MessageItem key={i} msg={msg} format={format} loading={loading}/>
                    ))}
                {loading && (
                    <div className="w-full flex items-start px-4 sm:px-8 md:px-16 lg:px-32 xl:px-60">
                        <div className="w-full max-w-3xl px-4 sm:px-6 md:px-10">
                            <div className="py-3 sm:py-4">
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-600">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white">
                                            <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM5.5 18.5v-13h13v13h-13Z" fill="currentColor"></path>
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-gray-300 mb-1">
                                            Assistant
                                        </div>
                                        <div className="text-gray-100 leading-relaxed whitespace-pre-wrap text-sm">
                                            <ThreeDotsLoading />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
        </div>
    );
}
