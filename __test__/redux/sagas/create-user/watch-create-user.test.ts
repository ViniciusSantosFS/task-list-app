import { faker } from '@faker-js/faker'
import { AnyAction, Saga, runSaga } from 'redux-saga'
import { CreateUser } from 'src/dto/create-user'
import { CreateUserActionTypes } from 'src/redux/sagas/create-user/action-types'
import { createUser } from 'src/redux/sagas/create-user/watch-create-user'

describe('#createTask', () => {
    it('Should fail when user email is already registered', async () => {
        const email = faker.internet.email()
        const dispatchedActions: AnyAction[] = []

        const mockUser = new CreateUser(faker.internet.userName(), email)

        const fakeStore = {
            getState: () => ({
                users: [
                    {
                        email,
                        name: faker.internet.userName(),
                    },
                ],
            }),
            dispatch: (action: AnyAction) => dispatchedActions.push(action),
        }

        await runSaga(fakeStore, createUser as Saga, {
            payload: mockUser,
        }).toPromise()

        expect(dispatchedActions).toEqual([
            { type: CreateUserActionTypes.CREATE_USER_FAILURE, payload: {} },
        ])
    })

    it('Should create user with success', async () => {
        const dispatchedActions: AnyAction[] = []

        const mockUser = new CreateUser(
            faker.internet.userName(),
            faker.internet.email()
        )

        const fakeStore = {
            getState: () => ({ users: [] }),
            dispatch: (action: AnyAction) => dispatchedActions.push(action),
        }

        await runSaga(fakeStore, createUser as Saga, {
            payload: mockUser,
        }).toPromise()

        expect(dispatchedActions).toEqual([
            {
                type: CreateUserActionTypes.CREATE_USER_SUCCESS,
                payload: mockUser,
            },
        ])
    })
})
