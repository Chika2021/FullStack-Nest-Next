import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema()

export class Todo extends Document {

    @Prop({required:true})
    title: string;

    @Prop({required:true})
    description: string;

    @Prop()
    completed: boolean;
    
}

export const TodoSchema = SchemaFactory.createForClass(Todo);