import { Test, TestingModule } from '@nestjs/testing';
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
        const testTodoId: string = 'testId';
        const testTodo = {
            id: testTodoId,
            title: 'Test todo',
            date: null,
            tasks: ['test']
        };

        it("/create should return 'collection with new todo'", () => {
            
            expect(app.create(testTodo)).toBe('collection with new todo');
        });

        it("/getAll should return 'entire collection'", () => {
            expect(app.getAll()).toBe('entire collection');
        });

        it("/update should return 'collection with updated todo'", () => {
            expect(app.update(testTodoId, testTodo)).toBe(`collection with updated todo ${testTodoId}`);
        });
        
        it("/delete should return 'collection with deleted todo'", () => {
            expect(app.delete(testTodoId)).toBe('');
        });
    });
});
