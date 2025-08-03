'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, ChevronDown, Code, FileText, List, Table } from 'lucide-react';
import { cn } from '@/lib/utils';

type Format = {
    id: string;
    name: string;
    icon: React.ReactNode;
};

const FORMATS: Format[] = [
    {
        id: 'plain',
        name: 'Plain Text',
        icon: <FileText className="w-4 h-4 text-gray-600" />,
    },
    {
        id: 'markdown',
        name: 'Markdown',
        icon: <span className="w-4 h-4 flex items-center justify-center">📝</span>,
    },
    {
        id: 'json',
        name: 'JSON',
        icon: <Code className="w-4 h-4 text-yellow-600" />,
    },
    {
        id: 'table',
        name: 'Table',
        icon: <Table className="w-4 h-4 text-blue-600" />,
    },
];

type FormatDropdownProps = {
    format: string;
    setFormat: (value: string) => void;
};

export function FormatDropdown({ format, setFormat }: FormatDropdownProps) {
    const currentFormat = FORMATS.find(f => f.id === format) || FORMATS[0];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    variant="ghost"
                    className="h-9 px-3 text-sm font-medium text-gray-400 hover:bg-gray-100 rounded-md flex items-center gap-2"
                >
                    <span className="flex items-center gap-2">
                        {currentFormat.icon}
                        <span>{currentFormat.name}</span>
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                className="w-56 p-2 rounded-lg shadow-lg border border-gray-200 bg-white"
                align="start"
            >
                <div className="px-2 py-1.5 text-xs font-medium text-gray-500">
                    Response Format
                </div>
                {FORMATS.map((fmt) => (
                    <DropdownMenuItem
                        key={fmt.id}
                        onClick={() => setFormat(fmt.id)}
                        className={cn(
                            'flex items-center justify-between w-full p-2 rounded-md text-sm',
                            'hover:bg-gray-100 cursor-pointer',
                            'transition-colors duration-200',
                            format === fmt.id && 'bg-gray-50'
                        )}
                    >
                        <div className="flex items-center gap-2">
                            {fmt.icon}
                            <span>{fmt.name}</span>
                        </div>
                        {format === fmt.id && (
                            <Check className="h-4 w-4 text-blue-500" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
