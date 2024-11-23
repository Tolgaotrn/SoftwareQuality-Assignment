import { Room } from '../model/room'
import database from '../../util/database'

const getAllRooms = async (): Promise<Room[]> => {
    try {
        const roomsPrisma = await database.room.findMany()
        return roomsPrisma.map((roomPrisma) => Room.from(roomPrisma))
    } catch (error) {
        throw new Error('Database error. See server log for details.')
    }
}

const getRoomById = async ({ id }: { id: number }): Promise<Room | null> => {
    try {
        const roomPrisma = await database.room.findUnique({
            where: { id },
        })
        return roomPrisma ? Room.from(roomPrisma) : null
    } catch (error) {
        throw new Error('Database error. See server log for details.')
    }
}

const createRoom = async ({
                              name,
                              capacity,
                              hasComputers,
                          }: {
    name: string
    capacity: number
    hasComputers: boolean
}): Promise<Room> => {
    try {
        const roomPrisma = await database.room.create({
            data: { name, capacity, hasComputers },
        })
        return Room.from(roomPrisma)
    } catch (error) {
        throw new Error('Database error. See server log for details.')
    }
}
const deleteRoomById = async ({ id }: { id: number }): Promise<Room> => {
    const room = await getRoomById({ id })
    await database.room.delete({ where: { id } })
    return room

}
export default {
    getAllRooms,
    getRoomById,
    createRoom,
    deleteRoomById
}