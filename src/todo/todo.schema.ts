import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, ObjectId } from 'mongoose';


export type TodoDoc = HydratedDocument<Todo>;

@Schema()
export class Todo {
    @Prop({ required: true, type: SchemaTypes.ObjectId })
    id: ObjectId;

    @Prop({ required: true })
    title: String;

    @Prop({ required: false })
    date: Date;

    @Prop({ required: true, default: Date.now })
    createdOn: Date;

    @Prop({ required: true, type: [String] })
    tasks: {
        type: [String],
        default: undefined
    };
}

export const TodoSchema = SchemaFactory.createForClass(Todo);