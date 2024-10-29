import bcrypt from 'bcrypt'
import { User } from '../domain/model/user'
import userDB from '../domain/data-access/user.db'
import { AuthenticationResponse, UserInput } from '../types'
import { generateJwtToken } from '../util/jwt'

const getAllUsers = async (): Promise<User[]> => userDB.getAllUsers()

const getUserByUsername = async ({ username }: { username: string }): Promise<User> => {
    const user = await userDB.getUserByUsername({ username })
    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`)
    }
    return user
}

const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByUsername({ username })

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
        throw new Error('Incorrect password.')
    }
    return {
        token: generateJwtToken({ username, role: user.role }),
        username: username,
        fullname: `${user.firstName} ${user.lastName}`,
        role: user.role,
    };
};

const createUser = async ({
    username,
    password,
    firstName,
    lastName,
    email,
    role,
}: UserInput): Promise<User> => {
    const existingUser = await userDB.getUserByUsername({ username })

    if (existingUser) {
        throw new Error(`User with username ${username} is already registered.`)
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, password: hashedPassword, firstName, lastName, email, role })

    return await userDB.createUser(user)
};

export default { 
    getUserByUsername, 
    authenticate, 
    createUser, 
    getAllUsers 
}
