import React from 'react';
import { Message } from '@/types/types';
import { MessageItem } from './MessageItem';

interface MessageListProps {
    messages: Message[];
    format: string;
}

export function MessageList({ messages, format }: MessageListProps) {
    return (
        <div className="w-full h-full flex flex-col mx-auto  pt-4">
            <div className="flex-1 overflow-y-auto pb-32 space-y-4">
                {messages
                    .filter(m => m.role !== 'system')
                    .map((msg, i) => (
                        <MessageItem key={i} msg={msg} format={format} />
                    ))}
            </div>
        </div>
    );
}
