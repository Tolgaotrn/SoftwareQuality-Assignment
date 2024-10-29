import { Team } from "./team"
import { User } from "./user"
import { Player as PlayerPrisma, User as UserPrisma , Team as TeamPrisma} from '@prisma/client'

export class Player {
    readonly id?: number
    readonly user: User
    readonly createdAt?: Date
    readonly updatedAt?: Date
    readonly position: String

    constructor(player: {
        id?: number,
        user: User,
        createdAt?: Date,
        updatedAt?: Date,
        position: String
    }) {
        this.id = player.id
        this.user = player.user
        this.createdAt = player.createdAt
        this.updatedAt = player.updatedAt
        this.position = player.position
    }

    static from({
        id,
        user,
        createdAt,
        updatedAt,
        position,
    }: PlayerPrisma & ({user : UserPrisma})) {
        return new Player({
            id,
            user: User.from(user),
            createdAt,
            updatedAt,
            position,
        })
    }

}
