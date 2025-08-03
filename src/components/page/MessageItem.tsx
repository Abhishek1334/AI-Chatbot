import React from 'react';
import { Message } from '@/types/types';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface MessageItemProps {
    msg: Message;
    format: string;
}

export function MessageItem({ msg, format }: MessageItemProps) {
    const renderContent = () => {
        if (format === 'markdown') {
            return (
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {msg.content}
                </ReactMarkdown>
            );
        }
        
        if (format === 'json') {
            try {
                const parsed = JSON.parse(msg.content);
                return (
                    <pre className="bg-gray-700 p-3 rounded text-sm overflow-auto text-gray-100">
                        {JSON.stringify(parsed, null, 2)}
                    </pre>
                );
            } catch {
                return msg.content;
            }
        }
        
        return msg.content;
    };

    return (
        <div className={`w-full flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} px-4 sm:px-8 md:px-16 lg:px-32 xl:px-60`}>
            <div className={`w-full max-w-3xl ${msg.role === 'user' ? 'bg-gray-800 rounded-lg w-fit' : 'bg-transparent'} px-4 sm:px-6 md:px-10`}>
                <div className="py-3 sm:py-4">
                    <div className={`flex items-start gap-3 sm:gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role !== 'user' && (
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-600">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white">
                                    <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM5.5 18.5v-13h13v13h-13Z" fill="currentColor"></path>
                                </svg>
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-300 mb-1">
                                {msg.role === 'user' ? 'You' : 'Assistant'}
                            </div>
                            <div className="text-gray-100 leading-relaxed whitespace-pre-wrap text-sm">
                                {renderContent()}
                            </div>
                        </div>
                        {msg.role === 'user' && (
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-green-600">
                                <span className="text-white text-xs sm:text-sm font-medium">U</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {msg.role === 'user' && <hr className="w-full border-gray-700 my-3 sm:my-4" />}
        </div>
    );
}
