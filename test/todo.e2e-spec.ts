import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TodoModule } from './../src/todo/todo.module';
import { TodoController } from './../src/todo/todo.controller';
import { TodoService } from './../src/todo/todo.service';

describe("TodoController (e2e)", () => {
    let app: INestApplication;
    const testTodoId: string = 'testId';
    const testTodo = {
        id: testTodoId,
        title: 'Test todo',
        date: null,
        tasks: ['test']
    };

    beforeEach(async() => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [TodoModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it("todo/create (POST) with expected 201 code, response", async() => {
        const response = await request(app.getHttpServer())
            .post('/todo/create')
            // .send(testTodo)
            .expect(201)
            .expect('collection with new todo');
        return response;
    });

    it("todo/getAll (GET) with expected 200 code, response", async() => {
        const response = await request(app.getHttpServer())
            .get('/todo/getAll')
            .expect(200)
            .expect('entire collection');
        return response;
    });

    it("todo/update (PATCH) with expected 200 code, response", () => {
        const response = request(app.getHttpServer())
            .patch(`/todo/update/${testTodo.id}`)
            // .send(testTodo)
            .expect(200)
            .expect(`collection with updated todo ${testTodo.id}`);
        return response;
    });

    it("todo/delete (DELETE) with correct 204 code, response", () => {
        const response = request(app.getHttpServer())
            .delete(`/todo/delete/${testTodo.id}`)
            .expect(204)
            .expect('');
        return response;
    });

    afterAll(async() => {
        await app.close();
    });
});
