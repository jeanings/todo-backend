<h1>A Simple To-do API in NestJS</h1>

Backend for <a href="https://github.com/jeanings/todo-frontend">A Simple To-do in React</a>.
Requires a local MongoDB server to run.

JSON structure:
```json
[
  {
        "id": "650923396d4e4712df326b00",
        "title": "Return books",
        "tasks": [
            "all of them"
        ],
        "completed": false,
        "date": "Mon Oct 02 2023",
        "color": "red"
    }
]
```

<h2>Installation</h2>

1. Clone repository and install dependencies.
2. Do the same for <a href="https://github.com/jeanings/todo-frontend">A Simple To-do in React</a>.
3. Runs on local MongoDB instance on port 5000, but can be changed in the `.env` file.
4. Run `npm start` or whichever package manager you prefer.
