export class CreateTodoDTO {
    title: string;
    date: string;
    createdOn: string;
    tasks: string[];
}

export class TodoDTO extends CreateTodoDTO {
    id: string;
    color?: 'solid' | 'red' | 'amber' | 'green' | 'transparent' | null;
}