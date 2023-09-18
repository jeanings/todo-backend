import { 
    Body, Controller, Delete, 
    Get, HttpCode, Param, 
    Patch, Post, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDTO } from './todo.dto';


@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post('create')
    @HttpCode(201)  // 'Created'
    async create(@Body() request: TodoDTO): Promise<TodoDTO[]> {
        const response = await this.todoService.create(request);
        return response;
    }
    
    @Get('getAll')
    @HttpCode(200)  // 'OK'
    async getAll(): Promise<TodoDTO[]> {
        const response = await this.todoService.getAll();
        return response;
    }
    
    @Patch('update/:id')
    @HttpCode(200)  // 'OK'
    async update(@Param('id') id: string, @Body() request: TodoDTO): Promise<TodoDTO[]> {
        const response = await this.todoService.update(id, request);
        return response;
    }
    
    @Delete('delete/:id')
    @HttpCode(200)  // 'OK'
    async delete(@Param('id') id: string): Promise<TodoDTO> {
        const response = await this.todoService.delete(id);
        return response;
    }
};
