import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    // Define user properties here
    @Prop({ required: true})
    username: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;
    // Add other properties as needed
}

export const UserSchema = SchemaFactory.createForClass(User);
