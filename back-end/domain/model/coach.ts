import { User } from "./user"
import { Coach as CoachPrisma, User as UserPrisma } from '@prisma/client'

export class Coach {
    readonly id?: number
    readonly user: User
    readonly createdAt?: Date
    readonly updatedAt?: Date
    readonly level: number

    constructor(coach: {
        id?: number,
        user: User,
        createdAt?: Date,
        updatedAt?: Date,
        level: number
    }) {
        this.id = coach.id
        this.user = coach.user
        this.createdAt = coach.createdAt
        this.updatedAt = coach.updatedAt
        this.level = coach.level
    }

    static from({
        id,
        user,
        createdAt,
        updatedAt,
        level
    }: CoachPrisma & ({user : UserPrisma})) {
        return new Coach({
            id,
            user: User.from(user),
            createdAt,
            updatedAt,
            level
        })
    }

}
