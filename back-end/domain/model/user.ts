import { User as UserPrisma } from '@prisma/client';
import { Role } from '../../types';

/**
 * Represents a user entity with details such as username, name, email, password, and role.
 */
export class User {
    /**
     * The unique identifier for the user (optional).
     */
    readonly id?: number;

    /**
     * The username of the user.
     */
    readonly username: string;

    /**
     * The first name of the user.
     */
    readonly firstName: string;

    /**
     * The last name of the user.
     */
    readonly lastName: string;

    /**
     * The email address of the user.
     */
    readonly email: string;

    /**
     * The hashed password of the user.
     */
    readonly password: string;

    /**
     * The role assigned to the user (e.g., ADMIN, USER).
     */
    readonly role?: Role;

    /**
     * Constructs an instance of the `User` class and validates the provided data.
     *
     * @param user - The user data.
     * @param user.id - The unique identifier for the user (optional).
     * @param user.username - The username of the user.
     * @param user.firstName - The first name of the user.
     * @param user.lastName - The last name of the user.
     * @param user.email - The email address of the user.
     * @param user.password - The hashed password of the user.
     * @param user.role - The role assigned to the user.
     *
     * @throws {Error} If required fields are missing or invalid.
     */
    constructor(user: {
        id?: number;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: Role;
    }) {
        this.validate(user);

        this.id = user.id;
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    /**
     * Validates the user data to ensure all required fields are present and valid.
     *
     * @param user - The user data to validate.
     * @param user.username - The username of the user (required).
     * @param user.firstName - The first name of the user (required).
     * @param user.lastName - The last name of the user (required).
     * @param user.email - The email address of the user (required).
     * @param user.password - The hashed password of the user (required).
     * @param user.role - The role assigned to the user (required).
     *
     * @throws {Error} If any required fields are missing or invalid.
     */
    validate(user: {
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: Role;
    }) {
        if (!user.username?.trim()) {
            throw new Error('Username is required');
        }
        if (!user.firstName?.trim()) {
            throw new Error('First name is required');
        }
        if (!user.lastName?.trim()) {
            throw new Error('Last name is required');
        }
        if (!user.email?.trim()) {
            throw new Error('Email is required');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }
        if (!user.role) {
            throw new Error('Role is required');
        }
    }

    /**
     * Compares the current `User` instance with another `User` instance.
     *
     * @param user - The user to compare with.
     * @returns `true` if all fields match; otherwise, `false`.
     */
    equals(user: User): boolean {
        return (
            this.id === user.id &&
            this.username === user.username &&
            this.firstName === user.firstName &&
            this.lastName === user.lastName &&
            this.email === user.email &&
            this.password === user.password &&
            this.role === user.role
        );
    }

    /**
     * Converts a Prisma `User` object into a `User` instance.
     *
     * @param prismaData - The Prisma `User` object to convert.
     * @param prismaData.id - The unique identifier for the user (optional).
     * @param prismaData.username - The username of the user.
     * @param prismaData.firstName - The first name of the user.
     * @param prismaData.lastName - The last name of the user.
     * @param prismaData.email - The email address of the user.
     * @param prismaData.password - The hashed password of the user.
     * @param prismaData.role - The role assigned to the user.
     *
     * @returns A new `User` instance based on the Prisma data.
     */
    static from({ id, username, firstName, lastName, email, password, role }: UserPrisma): User {
        return new User({
            id,
            username,
            firstName,
            lastName,
            email,
            password,
            role: role as Role,
        });
    }
}
