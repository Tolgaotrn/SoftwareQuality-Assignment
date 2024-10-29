import { Coach } from "./coach"
import { Team as TeamPrisma, Coach as CoachPrisma, User as UserPrisma, Player as PlayerPrisma } from '@prisma/client'
import { Player } from "./player"

export class Team {
    readonly id?: number
    readonly name: string
    readonly coach: Coach
    readonly players: Player[]
    readonly createdAt?: Date
    readonly updatedAt?: Date

    constructor(team: {name: string, coach: Coach, players: Player[], createdAt?: Date, updatedAt?: Date, id?: number}) {
        this.validate(team)
        this.name = team.name
        this.coach = team.coach
        this.players = team.players
        this.createdAt = team.createdAt
        this.updatedAt = team.updatedAt
        this.id = team.id
    }

    validate(team: { name: string; coach: Coach }) {
        if (!team.name) {
            throw new Error('Name is required')
        }
        if (!team.coach) {
            throw new Error('Coach is required')
        }
    }

    static from({ id, name, coach, players, createdAt, updatedAt }: TeamPrisma & { coach: CoachPrisma & { user: UserPrisma }, players: (PlayerPrisma & { user: UserPrisma })[] }) {
        return new Team({
            id,
            name,
            coach: Coach.from(coach),
            players: players ? players.map((player) => Player.from(player)) : [],
            createdAt,
            updatedAt,
        })
    }
}
