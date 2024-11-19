import { Room as RoomPrisma } from '@prisma/client'

export class Room {
    readonly id?: number
    readonly name: string
    readonly capacity: number
    readonly hasComputers: boolean

    constructor(room: { id?: number; name: string; capacity: number; hasComputers: boolean }) {
        this.validate(room)

        this.id = room.id
        this.name = room.name
        this.capacity = room.capacity
        this.hasComputers = room.hasComputers
    }

    validate(room: { name: string; capacity: number; hasComputers: boolean }) {
        if (!room.name?.trim()) {
            throw new Error('Room name is required')
        }
        if (room.capacity <= 0) {
            throw new Error('Room capacity must be greater than 0')
        }
    }

    static from({ id, name, capacity, hasComputers }: RoomPrisma) {
        return new Room({ id, name, capacity, hasComputers })
    }
}
