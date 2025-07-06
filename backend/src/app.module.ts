import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration available globally
      envFilePath: '.env', // Path to your .env file
      ignoreEnvFile: false, // Do not ignore the .env file
    }),
    MongooseModule.forRoot(process.env.DB_URI || 'mongodb://localhost:27017/todo'),
    TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
