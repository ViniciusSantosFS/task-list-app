import { faker } from '@faker-js/faker'
import { createTask } from 'src/redux/sagas/create-task/watch-create-task'
import { AnyAction, Saga, runSaga } from 'redux-saga'
import { CreateTaskActionTypes } from 'src/redux/sagas/create-task/action-types'
import { CreateTask } from 'src/dto/create-task'

describe('#createTask', () => {
    it('Should fail when task has begin date bigger than end date or delivery date', async () => {
        const dispatchedActions: AnyAction[] = []

        const mockTask = new CreateTask(
            faker.lorem.words(),
            faker.lorem.words(),
            faker.lorem.words(),
            faker.lorem.words(),
            faker.date.future(),
            faker.date.past(),
            faker.date.past()
        )

        const fakeStore = {
            getState: () => ({}),
            dispatch: (action: AnyAction) => dispatchedActions.push(action),
            context: {},
        }

        await runSaga(fakeStore, createTask as Saga, {
            payload: mockTask,
        }).toPromise()

        expect(dispatchedActions).toEqual([
            { type: CreateTaskActionTypes.CREATE_TASK_FAILURE, payload: {} },
        ])
    })
})
