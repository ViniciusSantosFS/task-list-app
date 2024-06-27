import { faker } from '@faker-js/faker'
import { AnyAction, Saga, runSaga } from 'redux-saga'
import { CreateUser } from 'src/dto/create-user'
import { ApplicationError } from 'src/errors/application-error'
import { CreateUserActionTypes } from 'src/redux/sagas/create-user/action-types'
import { createUser } from 'src/redux/sagas/create-user/watch-create-user'
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
            {
                type: SetApplicationErrorActionTypes.SET_APPLICATION_ERROR,
                payload: new ApplicationError(
                    'createUser.errors.emailAlreadyRegistered'
                ),
            },
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
