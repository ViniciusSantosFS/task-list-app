import { faker } from '@faker-js/faker'
import { createTask } from 'src/redux/sagas/create-task/watch-create-task'
import { AnyAction, Saga, runSaga } from 'redux-saga'
import { CreateTaskActionTypes } from 'src/redux/sagas/create-task/action-types'
import { CreateTask } from 'src/dto/create-task'
import { CreateUser } from 'src/dto/create-user'
import { Task } from 'src/entity/task'
import uuid from 'react-native-uuid'
import { CreateUserActionTypes } from 'src/redux/sagas/create-user/action-types'
import { ApplicationError } from 'src/errors/application-error'
import { SetApplicationErrorActionTypes } from 'src/redux/sagas/set-application-error/action-types'

jest.mock('src/i18n', () => ({
    __esModule: true,
    use: () => {},
    init: () => {},
    default: {
        t: (key: string) => key,
    },
}))

describe('#createTask', () => {
    it('Should fail when task has begin date bigger than end date or delivery date', async () => {
        const dispatchedActions: AnyAction[] = []

        const mockTask = new CreateTask(
            faker.lorem.words(),
            faker.lorem.words(),
            faker.internet.email(),
            faker.lorem.words(),
            faker.date.future().toDateString(),
            faker.date.past().toDateString(),
            faker.date.past().toDateString()
        )

        const fakeStore = {
            getState: () => ({}),
            dispatch: (action: AnyAction) => dispatchedActions.push(action),
        }

        await runSaga(fakeStore, createTask as Saga, {
            payload: mockTask,
        }).toPromise()

        expect(dispatchedActions).toEqual([
            {
                type: SetApplicationErrorActionTypes.SET_APPLICATION_ERROR,
                payload: new ApplicationError('createTask.errors.invalidDates'),
            },
        ])
    })

    it.only('Should fail when task has the same dates as another task for the same user', async () => {
        const email = faker.internet.email()
        const dispatchedActions: AnyAction[] = []
        const navigate = jest.fn()

        const mockUser = new CreateUser(faker.internet.userName(), email)
        const mockCreateTask = new CreateTask(
            faker.lorem.words(),
            faker.lorem.words(),
            email,
            faker.lorem.words(),
            faker.date.past().toDateString(),
            faker.date.future().toDateString(),
            faker.date.future().toDateString()
        )
        const mockTask = new Task({
            ...mockCreateTask,
            id: uuid.v4().toString(),
            ownerName: mockUser.name,
            ownerEmail: mockUser.email,
        })

        const fakeStore = {
            getState: () => ({
                users: [mockUser],
                tasks: [mockTask],
            }),
            dispatch: (action: AnyAction) => dispatchedActions.push(action),
        }

        await runSaga(fakeStore, createTask as Saga, {
            payload: mockCreateTask,
            navigate,
        }).toPromise()

        expect(dispatchedActions).toEqual([
            {
                type: SetApplicationErrorActionTypes.SET_APPLICATION_ERROR,
                payload: new ApplicationError('createTask.errors.dateConflict'),
            },
        ])
    })

    it('Should create an user and task when user is not registered', async () => {
        const id = '123'
        jest.spyOn(uuid, 'v4').mockReturnValue(id)
        const navigate = jest.fn()

        const dispatchedActions: AnyAction[] = []

        const mockTask = new CreateTask(
            faker.lorem.words(),
            faker.lorem.words(),
            faker.internet.email(),
            faker.lorem.words(),
            faker.date.past().toDateString(),
            faker.date.future().toDateString(),
            faker.date.future().toDateString()
        )

        const [name] = mockTask.owner.split('@')
        const user = new CreateUser(name, mockTask.owner)

        const fakeStore = {
            getState: () => ({
                users: [],
                tasks: [],
            }),
            dispatch: (action: AnyAction) => dispatchedActions.push(action),
        }

        await runSaga(fakeStore, createTask as Saga, {
            payload: mockTask,
            navigate,
        }).toPromise()

        const expectedTask = new Task({
            ...mockTask,
            id,
            ownerName: user.name,
            ownerEmail: user.email,
        })

        expect(dispatchedActions).toEqual([
            {
                type: CreateUserActionTypes.CREATE_USER,
                payload: user,
            },
            {
                type: CreateTaskActionTypes.CREATE_TASK_SUCCESS,
                payload: expectedTask,
            },
        ])
        expect(navigate).toHaveBeenCalledWith('/')
    })

    it('Should create a task with success', async () => {
        const id = '123'
        jest.spyOn(uuid, 'v4').mockReturnValue(id)

        const navigate = jest.fn()
        const email = faker.internet.email()
        const dispatchedActions: AnyAction[] = []

        const mockUser = new CreateUser(faker.internet.userName(), email)
        const mockTask = new CreateTask(
            faker.lorem.words(),
            faker.lorem.words(),
            email,
            faker.lorem.words(),
            faker.date.past().toDateString(),
            faker.date.future().toDateString(),
            faker.date.future().toDateString()
        )

        const fakeStore = {
            getState: () => ({
                users: [mockUser],
                tasks: [],
            }),
            dispatch: (action: AnyAction) => dispatchedActions.push(action),
        }

        await runSaga(fakeStore, createTask as Saga, {
            payload: mockTask,
            navigate,
        }).toPromise()

        const expectedTask = new Task({
            ...mockTask,
            id,
            ownerName: mockUser.name,
            ownerEmail: mockUser.email,
        })

        expect(dispatchedActions).toEqual([
            {
                type: CreateTaskActionTypes.CREATE_TASK_SUCCESS,
                payload: expectedTask,
            },
        ])

        expect(navigate).toHaveBeenCalledWith('/')
    })
})
