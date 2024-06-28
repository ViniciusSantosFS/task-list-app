import uuid from 'react-native-uuid'
import { faker } from '@faker-js/faker'
import { AnyAction, Saga, runSaga } from 'redux-saga'
import { CreateTask } from 'src/dto/create-task'
import { CreateUser } from 'src/dto/create-user'
import { Task } from 'src/entity/task'
import { CreateUserActionTypes } from 'src/redux/sagas/create-user/action-types'
import { GetRandomTodoListActionTypes } from 'src/redux/sagas/get-random-todo-list/action-types'
import { getRandomTodoList } from 'src/redux/sagas/get-random-todo-list/watch-get-random-todo-list'

jest.mock('src/i18n', () => ({
    __esModule: true,
    use: () => {},
    init: () => {},
    default: {
        t: (key: string) => key,
    },
}))

const getMockedTodoList = (task: CreateTask) => {
    class MockTodoListService {
        email: string
        constructor(email: string) {
            this.email = email
        }

        async getAll() {
            return [task]
        }
    }

    return new MockTodoListService(task.owner)
}

describe('#getRandomTodoList', () => {
    it('Should create users and return tasks with sucess', async () => {
        const id = '123'
        jest.spyOn(uuid, 'v4').mockReturnValue(id)
        const email = faker.internet.email()

        const mockedCreateTask = new CreateTask(
            faker.lorem.words(),
            faker.lorem.words(),
            email,
            faker.lorem.words(),
            faker.date.future().toDateString(),
            faker.date.past().toDateString(),
            faker.date.past().toDateString()
        )
        const todoListService = getMockedTodoList(mockedCreateTask)

        const dispatchedActions: AnyAction[] = []

        const fakeStore = {
            getState: () => ({
                users: [],
                tasks: [],
            }),
            dispatch: (action: AnyAction) => dispatchedActions.push(action),
        }

        await runSaga(fakeStore, getRandomTodoList as Saga, {
            payload: todoListService,
        }).toPromise()

        const [name] = email.split('@')
        const [todoListTask] = await todoListService.getAll()

        const expectedTask = new Task({
            ...todoListTask,
            id,
            ownerEmail: email,
            ownerName: name,
        })
        const expectedUser = new CreateUser(name, email)
        const expected = [
            {
                type: CreateUserActionTypes.CREATE_USER,
                payload: expectedUser,
            },
            {
                type: GetRandomTodoListActionTypes.GET_RANDOM_TODO_LIST_SUCCESS,
                payload: [expectedTask],
            },
        ]

        expect(dispatchedActions).toEqual(expected)
    })
})
