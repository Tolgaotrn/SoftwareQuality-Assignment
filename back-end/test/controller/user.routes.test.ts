import request from 'supertest';
import express, { Express } from 'express';
import { userRouter } from '../../controller/user.routes';
import userService from '../../service/user.service';

jest.mock('../../service/user.service');

const app: Express = express();
app.use(express.json());
app.use('/users', userRouter);

describe('User Routes', () => {
    const mockUsers = [
        {
            id: 1,
            username: 'testuser1',
            firstName: 'Test',
            lastName: 'User',
            email: 'testuser1@example.com',
            role: 'player',
        },
        {
            id: 2,
            username: 'testuser2',
            firstName: 'Test',
            lastName: 'User2',
            email: 'testuser2@example.com',
            role: 'coach',
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /users', () => {
        it('should return a list of users', async () => {
            (userService.getAllUsers as jest.Mock).mockResolvedValue(mockUsers);

            const response = await request(app).get('/users');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUsers);
            expect(userService.getAllUsers).toHaveBeenCalledTimes(1);
        });

        it('should handle errors gracefully', async () => {
            (userService.getAllUsers as jest.Mock).mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/users');

            expect(response.status).toBe(500);
        });
    });

    describe('POST /users/login', () => {
        it('should authenticate a user and return a JWT token', async () => {
            const mockAuthResponse = {
                token: 'mock-jwt-token',
                username: 'testuser1',
                fullname: 'Test User',
            };

            (userService.authenticate as jest.Mock).mockResolvedValue(mockAuthResponse);

            const response = await request(app)
                .post('/users/login')
                .send({ username: 'testuser1', password: 'password' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                message: 'Authentication succesful',
                ...mockAuthResponse,
            });
            expect(userService.authenticate).toHaveBeenCalledWith({ username: 'testuser1', password: 'password' });
        });

        it('should return an error for invalid login credentials', async () => {
            (userService.authenticate as jest.Mock).mockRejectedValue(new Error('Invalid credentials'));

            const response = await request(app)
                .post('/users/login')
                .send({ username: 'testuser1', password: 'wrongpassword' });

            expect(response.status).toBe(500);
        });
    });

    describe('POST /users/register', () => {
        it('should register a new user and return the created user object', async () => {
            const newUser = {
                id: 3,
                username: 'newuser',
                firstName: 'New',
                lastName: 'User',
                email: 'newuser@example.com',
                role: 'player',
            };

            (userService.createUser as jest.Mock).mockResolvedValue(newUser);

            const response = await request(app)
                .post('/users/register')
                .send({
                    username: 'newuser',
                    password: 'password123',
                    firstName: 'New',
                    lastName: 'User',
                    email: 'newuser@example.com',
                    role: 'player',
                });

            expect(response.status).toBe(200);
            expect(response.body).toEqual(newUser);
            expect(userService.createUser).toHaveBeenCalledWith({
                username: 'newuser',
                password: 'password123',
                firstName: 'New',
                lastName: 'User',
                email: 'newuser@example.com',
                role: 'player',
            });
        });
    });

    describe('GET /users/:username', () => {
        it('should return user details for the given username', async () => {
            const mockUser = mockUsers[0];

            (userService.getUserByUsername as jest.Mock).mockResolvedValue(mockUser);

            const response = await request(app).get(`/users/${mockUser.username}`);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUser);
            expect(userService.getUserByUsername).toHaveBeenCalledWith({ username: mockUser.username });
        });

        it('should return an error if the user does not exist', async () => {
            (userService.getUserByUsername as jest.Mock).mockRejectedValue(new Error('User not found'));

            const response = await request(app).get('/users/nonexistentuser');

            expect(response.status).toBe(500);
        });
    });
});
