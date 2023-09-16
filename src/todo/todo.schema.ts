import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';


export type TodoDoc = HydratedDocument<Todo>;

@Schema()
export class Todo {
    @Prop()
    id: ObjectId

    @Prop()
    title: String

    @Prop()
    date: String

    @Prop()
    createdOn: String

    @Prop()
    tasks: [String]
};


export const TodoSchema = SchemaFactory.createForClass(Todo);