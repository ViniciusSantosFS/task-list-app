import { faker } from '@faker-js/faker'
import axios, { AxiosResponse } from 'axios'
import { CreateTask } from 'src/dto/create-task'

interface Todo {
    todo: string
    completed: boolean
}

interface TodoList {
    todos: Todo[]
}

export class TodoListService {
    async getAll() {
        const response: AxiosResponse<TodoList> = await axios.get(
            'https://dummyjson.com/todos'
        )

        return response.data.todos.map(
            (todo) =>
                new CreateTask(
                    todo.todo,
                    '',
                    faker.internet.email(),
                    faker.lorem.paragraph(),
                    faker.date.recent().toISOString(),
                    faker.date.future().toISOString(),
                    faker.date.future().toISOString()
                )
        )
    }
}
