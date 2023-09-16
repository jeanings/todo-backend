import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './todo.schema';
import { CreateTodoDTO, TodoDTO } from './todo.dto';


@Injectable()
export class TodoService {
    constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

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