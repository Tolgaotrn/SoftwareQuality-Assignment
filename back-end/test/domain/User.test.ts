import { User } from '../../domain/model/user';
import { Role } from '../../types';
import { User as UserPrisma } from '@prisma/client';

// Mock data for testing
const mockUserData = {
    id: 1,
    username: 'john_doe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'securepassword',
    role: 'admin' as Role,
};

describe('User class', () => {
    it('should create a User instance with valid data', () => {
        const user = new User(mockUserData);
        expect(user.username).toBe(mockUserData.username);
        expect(user.firstName).toBe(mockUserData.firstName);
        expect(user.lastName).toBe(mockUserData.lastName);
        expect(user.email).toBe(mockUserData.email);
        expect(user.password).toBe(mockUserData.password);
        expect(user.role).toBe(mockUserData.role);
    });

    it('should throw an error if required fields are missing', () => {
        const incompleteData = { ...mockUserData };
        delete incompleteData.username;

        expect(() => new User(incompleteData)).toThrowError('Username is required');
    });

    it('should validate the data correctly', () => {
        const invalidData = { ...mockUserData, username: '' };

        expect(() => new User(invalidData)).toThrowError('Username is required');
    });

    it('should return true when comparing identical user objects', () => {
        const user1 = new User(mockUserData);
        const user2 = new User(mockUserData); // Same data

        expect(user1.equals(user2)).toBe(true); // Compare two User instances
    });

    it('should return false when comparing different user objects', () => {
        const user1 = new User(mockUserData);
        const user2 = new User({ ...mockUserData, username: 'jane_doe' }); // Different username

        expect(user1.equals(user2)).toBe(false); // Compare two User instances
    });

    it('should correctly create a User instance from Prisma data', () => {
        const prismaUser: UserPrisma = {
            id: 1,
            username: 'jane_doe',
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane.doe@example.com',
            password: 'securepassword',
            role: 'coordinator',
        };

        const user = User.from(prismaUser);

        expect(user.username).toBe(prismaUser.username);
        expect(user.firstName).toBe(prismaUser.firstName);
        expect(user.lastName).toBe(prismaUser.lastName);
        expect(user.email).toBe(prismaUser.email);
        expect(user.password).toBe(prismaUser.password);
        expect(user.role).toBe(prismaUser.role);
    });
});
