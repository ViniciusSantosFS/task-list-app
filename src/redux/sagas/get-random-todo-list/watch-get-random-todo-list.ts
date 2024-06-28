import uuid from 'react-native-uuid'
import { ITodoListService } from 'src/services/abstractions/todo-list'
import { all, put, takeLatest } from 'redux-saga/effects'
import { GetRandomTodoListActionTypes } from './action-types'
import { CreateTask } from 'src/dto/create-task'
import { Task } from 'src/entity/task'
import { CreateUserActionTypes } from '../create-user/action-types'
import { CreateUser } from 'src/dto/create-user'

interface CreateUserAction {
    type: string
    payload: ITodoListService
}

export function* getRandomTodoList({ payload }: CreateUserAction) {
    const todoList: CreateTask[] = yield payload.getAll()

    const tasksGenerator = todoList.map(function* (task) {
        const [name] = task.owner.split('@')
        const user = new CreateUser(name, task.owner)

        yield put({
            type: CreateUserActionTypes.CREATE_USER,
            payload: user,
        })

        return new Task({
            ...task,
            id: uuid.v4().toString(),
            ownerName: user.name,
            ownerEmail: user.email,
        })
    })

    const tasks: Task[] = yield all(tasksGenerator)

    yield put({
        type: GetRandomTodoListActionTypes.GET_RANDOM_TODO_LIST_SUCCESS,
        payload: tasks,
    })
}

export function* watchGetRandomTodoList() {
    yield takeLatest(
        GetRandomTodoListActionTypes.GET_RANDOM_TODO_LIST,
        getRandomTodoList
    )
}
