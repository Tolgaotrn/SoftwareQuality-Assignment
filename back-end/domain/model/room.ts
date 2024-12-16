import { Room as RoomPrisma } from '@prisma/client';

/**
 * Represents a room entity with details such as name, capacity, and computer availability.
 */
export class Room {
    /**
     * The unique identifier for the room (optional).
     */
    readonly id?: number;

    /**
     * The name of the room.
     */
    readonly name: string;

    /**
     * The capacity of the room.
     */
    readonly capacity: number;

    /**
     * Indicates whether the room has computers available.
     */
    readonly hasComputers: boolean;

    /**
     * Constructs an instance of the `Room` class and validates the provided data.
     *
     * @param room - The room data.
     * @param room.id - The unique identifier for the room (optional).
     * @param room.name - The name of the room.
     * @param room.capacity - The capacity of the room.
     * @param room.hasComputers - Indicates whether the room has computers available.
     *
     * @throws {Error} If required fields are missing or invalid.
     */
    constructor(room: { id?: number; name: string; capacity: number; hasComputers: boolean }) {
        this.validate(room);

        this.id = room.id;
        this.name = room.name;
        this.capacity = room.capacity;
        this.hasComputers = room.hasComputers;
    }

    /**
     * Validates the room data to ensure all required fields are present and valid.
     *
     * @param room - The room data to validate.
     * @param room.name - The name of the room (required).
     * @param room.capacity - The capacity of the room (must be greater than 0).
     * @param room.hasComputers - Indicates whether the room has computers available.
     *
     * @throws {Error} If the room name is missing, empty, or the capacity is invalid.
     */
    validate(room: { name: string; capacity: number; hasComputers: boolean }) {
        if (!room.name?.trim()) {
            throw new Error('Room name is required');
        }
        if (room.capacity <= 0) {
            throw new Error('Room capacity must be greater than 0');
        }
    }

    /**
     * Converts a Prisma `Room` object into a `Room` instance.
     *
     * @param prismaData - The Prisma `Room` object to convert.
     * @returns A new `Room` instance based on the Prisma data.
     */
    static from({ id, name, capacity, hasComputers }: RoomPrisma): Room {
        return new Room({ id, name, capacity, hasComputers });
    }
}
