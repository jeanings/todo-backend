import { Types } from 'mongoose';


export class TodoDTO {
    id?: Types.ObjectId | string;
    title: string;
    date?: string;
    tasks: string[];
    color?: 'grey' | 'solid' | 'red' | 'amber' | 'green' | 'transparent' | null;
    completed: boolean;
}