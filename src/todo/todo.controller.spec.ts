import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

describe("TodoController", () => {
    let app: TodoController;

    beforeEach(async () => {
        const todoApp: TestingModule = await Test.createTestingModule({
            controllers: [TodoController],
            providers: [TodoService],
        }).compile();

        app = todoApp.get<TodoController>(TodoController);
    });

    describe("CRUD routes and services", () => {
        const testTodoId: Types.ObjectId = new Types.ObjectId();
        const testTodo = {
            id: testTodoId,
            title: 'Test todo',
            date: new Date,
            createdOn: new Date,
            tasks: ['test']
        };

        it("/create should return 'collection with new todo'", () => {
            
            expect(app.create(testTodo)).toBe('collection with new todo');
        });

        it("/getAll should return 'entire collection'", () => {
            expect(app.getAll()).toBe('entire collection');
        });

        it("/update should return 'collection with updated todo'", () => {
            expect(app.update(testTodoId.toString(), testTodo)).toBe(`collection with updated todo ${testTodoId}`);
        });
        
        it("/delete should return 'collection with deleted todo'", () => {
            expect(app.delete(testTodoId.toString())).toBe('');
        });
    });
});
