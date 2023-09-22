import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';


describe("TodoController (e2e)", () => {
    let app: INestApplication;

    const newId: string = "650cbdcbcfa8c6d039dbd4bc";
    const newTodo = {
        "title": "New todo",
        "date": "2023-09-22T07:00:00.000Z",
        "tasks": "Add me please"
    };
    const deleteId = "650923396d4e4712df326ac2";
    const deleteRequest = { "id": "650923396d4e4712df326ac2" };
    const deleteResponse = {
        id: '650923396d4e4712df326ac2',
        title: 'Garbage day',
        tasks: [ 'trash', 'organics' ],
        completed: false
    };


    beforeEach(async() => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it("todo/create (POST) with expected 201 code, response", async() => {
        const response = await request(app.getHttpServer())
            .post('/todo/create')
            .set("Accept", "application/json")
            .send(newTodo)
            .expect(201)
        return response;
    });

    it("todo/getAll (GET) with expected 200 code, response", async() => {
        const response = await request(app.getHttpServer())
            .get('/todo/getAll')
            .expect(200)
        return response;
    });

    it("todo/update (PATCH) with expected 200 code, response", () => {
        const response = request(app.getHttpServer())
            .patch(`/todo/update/${newId}`)
            .set("Accept", "application/json")
            .send(newTodo)
            .expect(200)
        return response;
    });

    it("todo/delete (DELETE) with correct 200 code, response", () => {
        const response = request(app.getHttpServer())
            .delete(`/todo/delete/${deleteId}`)
            .set("Accept", "application/json")
            .send(deleteRequest)
            .expect(200)
            .expect(deleteResponse);
        return response;
    });

    afterAll(async() => {
        await app.close();
    });
});
