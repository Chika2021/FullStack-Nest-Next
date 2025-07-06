import { Module} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Todo, TodoSchema } from './schema/todo.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
  // Import any other modules needed here, e.g., MongooseModule for MongoDB
  // MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }])   
  MongooseModule.forFeature([{name: Todo.name, schema: TodoSchema}])
  ],
  providers: [TodoService],
  controllers: [TodoController]
})
export class TodoModule {}
