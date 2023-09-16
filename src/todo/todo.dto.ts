import { Types } from 'mongoose';


export class CreateTodoDTO {
    title: string;
    date: Date;
    createdOn: Date;
    tasks: string[];
}

export class TodoDTO extends CreateTodoDTO {
    id: Types.ObjectId;
    color?: 'solid' | 'red' | 'amber' | 'green' | 'transparent' | null;
}