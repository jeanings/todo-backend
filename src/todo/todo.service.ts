import { Injectable } from '@nestjs/common';
import { CreateTodoDTO, TodoDTO } from './todo.dto';

@Injectable()
export class TodoService {
    create(receivedData: CreateTodoDTO): string {
        return `collection with new todo`;
    }

    getAll() { 
        return 'entire collection';
    }

    update(id: string, receivedData: TodoDTO): string {
        return `collection with updated todo ${id}`;
    }

    delete(id: string): string {
        // nothing returned
        return '';
    }
};