import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './schema/todo.schema';

@Injectable()
export class TodoService {

    constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

    async getTodo(): Promise<Todo[]> {
        return await this.todoModel.find().exec();
    }

    async createTodo(todo:Todo): Promise<Todo> {
        return await this.todoModel.create(todo);
    }

    async updateTodo(todo:Todo, id: string):Promise<Todo> {
        const updated =  await this.todoModel.findByIdAndUpdate(id, todo, {new: true});
        if(!updated) {
            return {message: 'Todo Empty'} as any; // Return a message if todo not found
        }
        return updated
    }

    async deleteTodo(id: string) {
        const deleted = await this.todoModel.findByIdAndDelete(id);
        if(!deleted) {
            return {message: 'Todo not found'};
        }
        return {message: 'Todo deleted successfully'};
    }


}


