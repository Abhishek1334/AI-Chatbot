export type Message = {
    id?: string; // for database or UI keys
    role: 'system' | 'user' | 'assistant';
    content: string;
    timestamp?: number; // for time-based sorting
};
