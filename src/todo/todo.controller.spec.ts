import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { TodoModule } from './todo.module';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { getModelToken } from '@nestjs/mongoose';
import { Todo } from './todo.schema';
import mockTodos from '../../src/utils/mockTodos.json';
import { TodoDTO } from './todo.dto';


describe("TodoController", () => {
    let controller: TodoController;
    let service: TodoService;

    const newId: string = "650cbdcbcfa8c6d039dbd4bc";
    const newTodo: TodoDTO = {
        "title": "New todo",
        "date": "2023-09-22T07:00:00.000Z",
        "tasks": [ "Add me please" ],
        "completed": false
    };
    
    const deleteId = "650923396d4e4712df326ac2";
    const deleteRequest = { "id": "650923396d4e4712df326ac2" };
    const deleteResponse: TodoDTO = {
        id: '650923396d4e4712df326ac2',
        title: 'Garbage day',
        tasks: [ 'trash', 'organics' ],
        completed: false
    };

    beforeEach(async () => {
        const todoApp: TestingModule = await Test.createTestingModule({
            controllers: [TodoController],
            providers: [{
                provide: TodoService,
                useValue: {
                    create: jest.fn().mockResolvedValue(newTodo),
                    getAll: jest.fn().mockResolvedValue(mockTodos),
                    update: jest.fn().mockResolvedValue(mockTodos),
                    delete: jest.fn().mockResolvedValue(deleteResponse)
                }
            }]
        }).compile();

        controller = todoApp.get<TodoController>(TodoController);
        service = todoApp.get<TodoService>(TodoService);
    });

    describe("CRUD routes and services", () => {    

        it("/create should return array of todos", async() => {
            const createSpy = jest
                .spyOn(service, 'create')
                .mockResolvedValueOnce(mockTodos as TodoDTO[]);
            
            await controller.create(newTodo);
            expect(createSpy).toHaveBeenCalledWith(newTodo);
        });

        it("/getAll should return array of todos", () => {
            expect(controller.getAll()).resolves.toEqual(mockTodos);
            expect(service.getAll).toHaveBeenCalled();
        });

        it("/update should return array of todos", async() => {
            const updateSpy = jest
                .spyOn(service, 'update')
                .mockResolvedValueOnce(mockTodos as TodoDTO[]);
            
            await controller.update(newId, newTodo);
            expect(updateSpy).toHaveBeenCalledWith(newId, newTodo);
        });
        
        it("/delete should return the deleted todo", async() => {
            const deleteSpy = jest
                .spyOn(service, 'delete')
                .mockResolvedValueOnce(deleteResponse);
            
            await controller.delete(deleteId);
            expect(deleteSpy).toHaveBeenCalledWith(deleteId);
        });
    });
});
