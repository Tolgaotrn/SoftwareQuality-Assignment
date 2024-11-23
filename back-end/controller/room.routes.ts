import express from 'express'
import roomService from '../service/room.service'
import RoomService from "../service/room.service";

const roomRouter = express.Router()

// GET all rooms
roomRouter.get('/', async (req, res) => {
    try {
        const rooms = await roomService.getAllRooms()
        res.json(rooms)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// GET room by ID
roomRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const room = await roomService.getRoomById({ id: Number(id) })
        if (!room) {
            return res.status(404).json({ error: 'Room not found' })
        }
        res.json(room)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// POST create a new room
roomRouter.post('/', async (req, res) => {
    try {
        const { name, capacity, hasComputers } = req.body
        const newRoom = await roomService.createRoom({
            name,
            capacity: Number(capacity),
            hasComputers: Boolean(hasComputers),
        })
        res.status(201).json(newRoom)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

roomRouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const room = await RoomService.getRoomById({ id: Number(id) })
        RoomService.deleteRoomById({ id: Number(id)});
        res.json(room)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

export default roomRouter