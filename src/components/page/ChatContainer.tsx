import React, { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';
import { Menu } from 'lucide-react';

interface ChatContainerProps {
    children: ReactNode;
}

export function ChatContainer({ children }: ChatContainerProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <div className="h-screen w-full flex flex-col sm:flex-row bg-gray-900">
            {/* Mobile menu button */}
            <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="sm:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 focus:outline-none"
                aria-label="Toggle menu"
            >
                <Menu className="h-5 w-5" />
            </button>

            {/* Sidebar */}
            <div className={`${isSidebarOpen ? 'block' : 'hidden'} sm:block`}>
                <Sidebar onItemClick={() => setIsSidebarOpen(false)} />
            </div>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-10 sm:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0">
                <div className="flex-1 overflow-y-auto bg-gray-900 pb-24 sm:pb-4 pt-16 sm:pt-0">
                    {children}
                </div>
            </div>
        </div>
    );
}
