import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo, TodoSchema } from './schema/todo.schema';

@Controller('todo')
export class TodoController {
    constructor(private todoService: TodoService) {}


    @Get()
        async getTodo() {
            return await this.todoService.getTodo();
        }

    @Post()
        async createTodo(@Body() todo:Todo) {
            return await this.todoService.createTodo(todo)
        }

    @Put(':id')
        async updateTodo(@Param('id') id:string, @Body() todo:Todo) {
            return await this.todoService.updateTodo(todo, id )
        }

    @Delete(':id')
        async delete(@Param('id') id:string) {
            return await this.todoService.deleteTodo(id)
        }
}
