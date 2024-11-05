
type Role = 'admin' |  'user'

type UserInput = {
    id?: number
    username?: string
    password?: string
    firstName?: string
    lastName?: string
    email?: string
    role?: Role
}

type AuthenticationResponse = {
    token: string
    username: string
    fullname: string
    role: string
}

export {
    Role,
    UserInput,
    AuthenticationResponse,
}
