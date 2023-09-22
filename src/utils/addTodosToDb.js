import fs from 'fs';
import mongoose from 'mongoose';
const { Schema } = mongoose;


const DB_URI = 'mongodb://127.0.0.1:27017/todo';

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: false
    },
    createdOn: {
        type: Date,
        default: new Date,
        required: true
    },
    tasks: {
        type: [String],
        default: undefined,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: true
    }
});

// Create model.
const TodoModel = mongoose.model('Todo', todoSchema);
const jsonPath = './mockTodos.json';

// Read in json and create todo docs.
function addCreatedDocs() {
    // Connect to local db.
    mongoose.connect(DB_URI);

    fs.readFile(jsonPath, async(err, json) => {
        if (err) throw "File read failed.";
        const todos = JSON.parse(json);
        
        for (let todo of todos) {        
            const todoDoc = createTodo(todo);
            // Add to db.
            await todoDoc.save();
        }

        console.log(`Todo docs generated and added to db at (${DB_URI}).`);
        return;
    });
}


function createTodo(todo) {
    let { id, title, date, tasks, color } = todo;
    if (!date) {
        date = undefined;
    }
        
    const todoDoc = new TodoModel({
        title: title,
        date: date,
        createdOn: new Date,
        tasks: tasks,
        completed: false
    });

    return todoDoc;
}

addCreatedDocs();