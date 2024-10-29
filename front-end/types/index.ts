export type Player = {
    id: number
    user: User
    position: string
    teams: Team[]
}

export type Coach = {
    id: number
    user: User
    level: number
    teams: Team[]
}

export type Team = {
    id: number
    name: string
    coach: Coach
    players: Player[]
}

export type User = {
    firstName?: string
    lastName?: string
    email?: string
    username?: string
    password?: string
    role?: string
}

export type StatusMessage = {
    message: string
    type: "error" | "success"
}
