import { Request, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo, TodoSchema } from './schema/todo.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('todo')
export class TodoController {
    constructor(private todoService: TodoService) {}

    @UseGuards(AuthGuard('jwt')) // Ensure that the user is authenticated
    @Get()
        async getTodo(@Request() req): Promise<Todo[]> {
            const id = req.user.id; // Get the user ID from the request
            // const user = req.user; // Get the user object from the request
            return await this.todoService.getTodo(id);
        }
    @UseGuards(AuthGuard('jwt')) // Ensure that the user is authenticated
    @Post()
        async createTodo(@Request() req, @Body() todo:Todo) {
            const id = req.user.id; // Get the user ID from the request
            return await this.todoService.createTodo(todo, id);
        }
    @UseGuards(AuthGuard('jwt')) // Ensure that the user is authenticated
    @Put(':id')
        async updateTodo(@Param('id') id:string, @Body() todo:Todo) {
            return await this.todoService.updateTodo(todo, id )
        }
    @UseGuards(AuthGuard('jwt')) // Ensure that the user is authenticated
    @Delete(':id')
        async delete(@Param('id') id:string) {
            return await this.todoService.deleteTodo(id)
        }
}
