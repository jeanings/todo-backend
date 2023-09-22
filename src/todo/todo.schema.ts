import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type TodoDoc = HydratedDocument<Todo>;


@Schema()
export class Todo {
    @Prop({ required: true })
    title: string;

    @Prop({ required: false })
    date?: Date;

    @Prop({ required: true, default: Date.now })
    createdOn: Date;

    @Prop({ required: true, type: [String] })
    tasks: string[]

    @Prop({ required: true, default: false })
    completed: boolean
}

export const TodoSchema = SchemaFactory.createForClass(Todo);