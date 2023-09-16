import { 
    Body, Controller, Delete, 
    Get, HttpCode, Param, 
    Patch, Post, Query } from '@nestjs/common';
import { CreateTodoDTO, TodoDTO } from './todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post('create')
    @HttpCode(201)  // 'Created'
    create(@Body() receivedData: CreateTodoDTO) {
        return this.todoService.create(receivedData);
    }
    
    @Get('getAll')
    @HttpCode(200)  // 'OK'
    getAll() {
        return this.todoService.getAll();
    }
    
    @Patch('update/:id')
    @HttpCode(200)  // 'OK'
    update(@Param('id') id: string, @Body() receivedData: TodoDTO) {
        return this.todoService.update(id, receivedData);
    }
    
    @Delete('delete/:id')
    @HttpCode(204)  // 'No content'
    delete(@Param('id') id: string) {
        return this.todoService.delete(id);
    }
};
