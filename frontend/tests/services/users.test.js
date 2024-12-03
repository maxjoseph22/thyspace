import createFetchMock from 'vitest-fetch-mock';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { getUsers, getUserById, updateUser, deleteUser } from '../../src/services/users'

const fetchMock = createFetchMock(vi);
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

describe('userService', () => {
    beforeEach(() => {
        fetchMock.enableMocks();
        fetchMock.resetMocks();
    });

    describe('getAllUsers', () => {
        test('returns a list of users with a token', async () => {
            fetchMock.mockResponseOnce(JSON.stringify({users: {} }), { status: 200 }
        );

        const testToken = 'testToken';
        const returnedUsers = await getUsers(testToken);

        const fetchArguments = fetch.mock.lastCall;
        const url = fetchArguments[0];
        const options = fetchArguments[1];

        expect(url).toEqual(`${BACKEND_URL}/users`);
        expect(options.method).toEqual(`GET`);
        expect(options.headers['Authorization']).toEqual(`Bearer ${testToken}`);
        expect(returnedUsers).toEqual({users: {}})
        });



        test('throws an error if the response is not 200', async () => {
            fetchMock.mockResponseOnce(JSON.stringify({message: 'Something went wrong'}, {status: 400}))

            try {
                await getUsers('testToken')
            } catch (err) {
                expect(err.message).toEqual('Unable to fetch users')
            }
        });
    });

    describe('getUserByID', () => {
        test('returns a user by their id with a token', async () => {
            fetchMock.mockResponseOnce( JSON.stringify({user: {} }, {status: 200}))
            
            const testToken = 'testToken';
            const id = '123456748fht';

            const returnedUser = await getUserById(id, testToken);
            
            const fetchArguments = fetch.mock.lastCall
            const url = fetchArguments[0]
            const options = fetchArguments[1]

            expect(url).toEqual(`${BACKEND_URL}/users/${id}`)
            expect(options.method).toEqual("GET")
            expect(options.headers['Authorization']).toEqual(`Bearer ${testToken}`)
            expect(returnedUser).toEqual({user: {} })
        });

        test('returns a error message if not 200 status code', async () => {
            fetchMock.mockResponseOnce(JSON.stringify({message: 'Something went wrong'}, {status: 400}))
            
            
            try {
                await getUserById('testToken')
            } catch (err) {
                expect(err.message).toEqual('Unable to fetch user')
            }
        });
    });

    describe('updateUser', () => {
        test('updates the user with a new token', async () => {
            const updatedUser = {
                user: {id: 3, email: 'new@email.com' },
                token: 'newToken'
            }
            fetchMock.mockResponseOnce( JSON.stringify(updatedUser), {status: 200})

            const id = 3;
            const updatedData = { email: 'new@email.com' }
            console.log("updated data:", updatedData)
            const oldToken = 'oldToken';
            console.log("updated user:", updatedUser)
            const result = await updateUser(id, updatedData, oldToken);
            console.log("result:", result)

            const fetchArguments = fetch.mock.lastCall
            const url = fetchArguments[0]
            const options = fetchArguments[1]

            expect(url).toEqual(`${BACKEND_URL}/users/${id}`);
            expect(options.method).toEqual("PUT");
            expect(options.headers['Authorization']).toEqual(`Bearer ${oldToken}`);
            expect(JSON.parse(options.body)).toEqual(updatedData);
            expect(result).toEqual(updatedUser);
            expect(result.token).toEqual('newToken');
        });

        test('sends an error if the status is not 200', async () => {
            fetchMock.mockResponseOnce( JSON.stringify({mesage: "Something went wrong"}, {status: 400}))

            const id = 3;
            const updatedData = { email: 'new@email.com' }
            const oldToken = 'oldToken';

            try {
                await updateUser(id, updatedData, oldToken)
            } catch (err) {
                expect(err.message).toEqual('Unable to update user')
            }
        });
    });

    describe('deleteUser', () => {
        test('deletes a user from the database', async () => {
            const updatedUser = {
                user: {},
            }
            fetchMock.mockResponseOnce( JSON.stringify(updatedUser), {status: 200})

            const id = '123456748fht'
            const testToken = "testToken"

            const deletedUser = await deleteUser(id, testToken)

            const fetchArguments = fetch.mock.lastCall
            const url = fetchArguments[0]
            const options = fetchArguments[1]

            expect(url).toEqual(`${BACKEND_URL}/users/${id}`)
            expect(options.method).toEqual("DELETE")
            expect(options.headers['Authorization']).toEqual(`Bearer ${testToken}`)
            expect(deletedUser).toEqual({user:{}})
        });

        test('sends an error message is the status is not 200', async () => {
            fetchMock.mockResponseOnce( JSON.stringify({message: 'Something went wrong'}, {status: 400}))

            const id = 3
            const testToken = 'testToken'

            try {
                await deleteUser(id, testToken)
            } catch (err) {
                expect(err.message).toEqual('Unable to delete user')
            }
        })
    })
});