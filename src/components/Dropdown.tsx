'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, ChevronDown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

type Role = {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
};

const AGENT_ROLES: Role[] = [
    {
        id: 'default',
        name: 'Assistant',
        description: 'Helpful, creative, clever, and very friendly',
        icon: <Sparkles className="w-4 h-4 text-yellow-500" />,
    },
    {
        id: 'tutor',
        name: 'Tutor',
        description: 'Strict computer science teacher',
        icon: <span className="w-4 h-4 flex items-center justify-center">🎓</span>,
    },
    {
        id: 'coder',
        name: 'Code Expert',
        description: 'JavaScript and TypeScript specialist',
        icon: <span className="w-4 h-4 flex items-center justify-center">💻</span>,
    },
    {
        id: 'writer',
        name: 'Technical Writer',
        description: 'Professional documentation expert',
        icon: <span className="w-4 h-4 flex items-center justify-center">✍️</span>,
    },
];

const ROLE_PROMPTS: Record<string, string> = {
    default: 'You are a helpful assistant.',
    tutor: 'You are a strict computer science teacher.',
    coder: 'You are a JavaScript coding expert.',
    writer: 'You are a professional technical writer.',
};

export function Dropdown({
    systemPrompt,
    setSystemPrompt,
}: {
    systemPrompt: string;
    setSystemPrompt: (value: string) => void;
}) {
    const currentRoleId = Object.entries(ROLE_PROMPTS).find(
        ([_, prompt]) => prompt === systemPrompt
    )?.[0] || 'default';

    const currentRole = AGENT_ROLES.find(role => role.id === currentRoleId) || AGENT_ROLES[0];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    variant="ghost"
                    className="h-9 px-3 text-sm font-medium text-gray-400 hover:bg-gray-100 rounded-md flex items-center gap-2"
                >
                    <span className="flex items-center gap-2">
                        {currentRole.icon}
                        <span>{currentRole.name}</span>
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                className="w-64 p-2 rounded-lg shadow-lg border border-gray-200 bg-white"
                align="start"
            >
                <div className="px-2 py-1.5 text-xs font-medium text-gray-500">
                    Agent Role
                </div>
                {AGENT_ROLES.map((role) => (
                    <DropdownMenuItem
                        key={role.id}
                        onClick={() => setSystemPrompt(ROLE_PROMPTS[role.id])}
                        className={cn(
                            'flex flex-col items-start gap-1 p-2 rounded-md text-sm',
                            'hover:bg-gray-100 cursor-pointer',
                            'transition-colors duration-200',
                            currentRoleId === role.id && 'bg-gray-50'
                        )}
                    >
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                                {role.icon}
                                <span className="font-medium">{role.name}</span>
                            </div>
                            {currentRoleId === role.id && (
                                <Check className="h-4 w-4 text-blue-500" />
                            )}
                        </div>
                        <div className="text-xs text-gray-500 ml-6">
                            {role.description}
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
