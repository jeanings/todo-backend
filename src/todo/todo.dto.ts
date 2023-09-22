import { Schema, Types } from 'mongoose';


export class TodoDTO {
    id?: Schema.Types.ObjectId | Types.ObjectId | string;
    title: string;
    date?: string;
    tasks: string[] | string;
    color?: 'grey' | 'solid' | 'red' | 'amber' | 'green' | 'transparent' | 'blank';
    completed: boolean;
}