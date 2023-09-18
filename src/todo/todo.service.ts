import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TodoDTO } from './todo.dto';
import { Todo, TodoDoc } from './todo.schema';


@Injectable()
export class TodoService {
    constructor(@InjectModel(Todo.name) private readonly todoModel: Model<TodoDoc>) {}

    async create(request: TodoDTO): Promise<TodoDTO[]> {
        const insertRequest: Todo = {
            title: request.title,
            createdOn: new Date,
            tasks: request.tasks,
            completed: false
        };
        // Add date if exists (otherwise it's spot-type).
        this.getAndAddDate(request.date, insertRequest);

        await this.todoModel.create(insertRequest);
      
        // Gets all docs, sorted by date.
        const todoDocs = await this.todoModel.find({}).sort({date: 1}).exec();
        // Build response with list of 'colored' todos.
        const responseColoredTodos = this.getAllSortedColoredTodos(todoDocs);
        return responseColoredTodos;
    }


    async getAll(): Promise<TodoDTO[]> {
        // Gets all docs, sorted by date.
        const todoDocs = await this.todoModel.find({}).sort({date: 1}).exec();
        // Build response with list of 'colored' todos.
        const responseColoredTodos = this.getAllSortedColoredTodos(todoDocs);
        return responseColoredTodos;
    }


    async update(id: string, request: TodoDTO): Promise<TodoDTO[]> {
        const updateRequest = {
            title: request.title,
            tasks: request.tasks,
            completed: request.completed
        };
        // Add date if exists (otherwise it's spot-type).
        this.getAndAddDate(request.date, updateRequest);

        await this.todoModel.findByIdAndUpdate(id, updateRequest);

        // Gets all docs, sorted by date.
        const todoDocs = await this.todoModel.find({}).sort({date: 1}).exec();
        // Build response with list of 'colored' todos.
        const responseColoredTodos = this.getAllSortedColoredTodos(todoDocs);
        return responseColoredTodos;
    }


    async delete(id: string): Promise<TodoDTO> {
        const deletedTodo: TodoDoc = await this.todoModel.findByIdAndDelete({ _id: id }).exec();
        const responseDeletedTodo: TodoDTO = {
            id: deletedTodo._id.toString(),
            title: deletedTodo.title,
            tasks: deletedTodo.tasks,
            completed: deletedTodo.completed
        };
        
        return responseDeletedTodo;
    }


    getAllSortedColoredTodos(todoDocs: TodoDoc[]): TodoDTO[] {
    /* ==============================================================
        Helper method to return sorted and 'colored' array of todos,
        ready for serving to front end.
    ============================================================== */
        // Build response with list of 'colored' todos.
        const responseColoredTodos = todoDocs.reduce((coloredTodos, doc) => {
            const coloredTodo: TodoDTO = {
                id: doc._id,
                title: doc.title,
                tasks: doc.tasks,
                completed: doc.completed
            };
            // Add dates (non-existing equals spot todos).
            this.getAndAddDate(doc.date, coloredTodo);

            // Assign 'colors' - nulls are spot todos.
            const dateString: string | null = doc.date
                ? doc.date.toDateString()
                : null;
            coloredTodo['color'] = this.getTodoColor(dateString);

            return [...coloredTodos, coloredTodo];
        }, []);

        return responseColoredTodos;
    };


    getAndAddDate(date: string | Date | undefined, todoObj: TodoDTO | Todo): void {
    /* ===========================================================================
        Helper method to check and add dates, its type depends on what object
        is being passed in.

        date: string
            Comes from requests from front end, adding to Todo schema for querying db.
        date: Date
            Comes from Todo schema, adding to response object to front end.
        date: undefined
            Todo is of spot-type, do nothing.
    ============================================================================ */
        if (!date) {
            // No dates to add, todo is a spot-type.
            return;
        }
        else if (typeof date === 'string') {
            // Checking date from request, add to TodoDoc object.
            todoObj['date'] = new Date(date);
        }
        else {
            // Date from TodoDoc, add to response object.
            todoObj['date'] = date.toDateString();
        }
        
        return;
    }


    getTodoColor(dateString: string) {
    /* ===========================================================================
        Assigns 'color' based on how far away parameter date is from current day.
        'grey'
            Past todos.
        'solid'
            No defined due date, do asap.
        'red'
            Tasks for current day.
            Monday
        'amber'
            Tasks for tomorrow.
            Tuesday
        'green'
            Tasks for 2-3 days out.
            Wednesday ~ Thursday
        'transparent'
            Tasks for 4 days out.
            Friday
        'blank'
            Tasks more than 4 days out.
            Next weeks~.
    ============================================================================ */
        const now: Date = new Date();
        const todoDate: Date = new Date(dateString);
        const dayDifference = Math.floor(
            (todoDate.valueOf() - now.valueOf()) / (1000 * 60 * 60 * 24)
        );
    
        // Assign day-proximity color.
        let todoColor: TodoDTO['color'] = null;
        switch (true) {
            case (dateString === null):
                todoColor = 'solid';
                break;
            case (dayDifference < 0):
                todoColor = 'grey';
                break;
            case (dayDifference === 0):
                todoColor = 'red';
                break;
            case (dayDifference === 1):
                todoColor = 'amber';
                break;
            case (dayDifference >= 2 && dayDifference <= 3):
                todoColor = 'green';
                break;
            case (dayDifference === 4):
                todoColor = 'transparent';
                break;
            default:
                todoColor = 'blank';
        }
    
        return todoColor;
    };
};




