
type Role = 'admin' | 'player' | 'coach'

type UserInput = {
    id?: number
    username?: string
    password?: string
    firstName?: string
    lastName?: string
    email?: string
    role?: Role
}

type PlayerInput = {
    id?: number
    user?: UserInput
    position?: string
}

type CoachInput = {
    id?: number
    user?: UserInput
    level?: number
    teams?: TeamInput[]
}

type TeamInput = {
    id?: number
    name?: string
    coach?: CoachInput
    players?: PlayerInput[]
}

type AuthenticationResponse = {
    token: string
    username: string
    fullname: string
    role: string
}

export {
    Role,
    TeamInput,
    PlayerInput,
    CoachInput,
    UserInput,
    AuthenticationResponse,
}
