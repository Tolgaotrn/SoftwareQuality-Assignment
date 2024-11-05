import {Room as RoomPrisma} from '@prisma/client'
export class Room {
    readonly id?: number
    readonly roomNumber: string
    readonly capacity: number
    readonly computerCount: number

    constructor(room: {
        id?: number
        roomNumber: string
        capacity: number
        computerCount: number
    }) {
        this.validate(room)

        this.id = room.id
        this.roomNumber = room.roomNumber
        this.capacity = room.capacity
        this.computerCount = room.computerCount
    }

    validate(room: {
        roomNumber: string
        capacity: number
        computerCount: number
    }) {
        if (!room.roomNumber?.trim()) {
            throw new Error('Room number is required')
        }
        if (room.capacity <= 0) {
            throw new Error('Room capacity must be positive')
        }
        if (room.computerCount < 0) {
            throw new Error('Computer count cannot be negative')
        }
    }

    static from({ id, roomNumber, capacity, computerCount }: RoomPrisma) {
        return new Room({
            id,
            roomNumber,
            capacity,
            computerCount
        })
    }
}
