import { Room } from '../domain/model/room'
import roomDB from '../domain/data-access/room.db'

const getAllRooms = async (): Promise<Room[]> => roomDB.getAllRooms()

const getRoomById = async ({ id }: { id: number }): Promise<Room> => {
    const room = await roomDB.getRoomById({ id })
    if (!room) {
        throw new Error(`Room with ID: ${id} does not exist.`)
    }
    return room
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
    const room = new Room({ name, capacity, hasComputers })
    return await roomDB.createRoom(room)
}

const deleteRoomById = async ({ id }: { id: number }): Promise<Room> => {
    const room = await getRoomById({ id })
    await roomDB.deleteRoomById({ id })
    return room

}

export default {
    getAllRooms,
    getRoomById,
    createRoom,
    deleteRoomById
}