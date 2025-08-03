import React from 'react';

interface SidebarProps {
    onItemClick?: () => void;
}

export function Sidebar({ onItemClick }: SidebarProps) {
    return (
        <div className="w-full sm:w-64 bg-gray-900 border-r border-gray-700 h-screen flex flex-col fixed sm:relative z-20">
            <div className="p-2 sm:p-4 border-b border-gray-700">
                <button 
                    onClick={onItemClick}
                    className="w-full flex items-center gap-3 rounded-md border border-gray-600 p-2 sm:p-3 text-sm text-white hover:bg-gray-800 transition-colors"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-200 flex-shrink-0">
                        <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                    </svg>
                    <span className="truncate">New chat</span>
                </button>
            </div>
            <div className="flex-1 overflow-y-auto p-1 sm:p-2">
                <div className="text-xs sm:text-sm text-gray-400 px-2 sm:px-3 py-2">Recent</div>
                <div 
                    onClick={onItemClick}
                    className="text-gray-300 text-xs sm:text-sm px-2 sm:px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer truncate"
                >
                    No recent chats
                </div>
            </div>
            <div className="p-2 sm:p-4 border-t border-gray-700">
                <div 
                    onClick={onItemClick}
                    className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-md hover:bg-gray-800 cursor-pointer text-xs sm:text-sm text-gray-300"
                >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-300 text-xs sm:text-sm">U</span>
                    </div>
                    <span className="truncate">User</span>
                </div>
            </div>
        </div>
    );
}
