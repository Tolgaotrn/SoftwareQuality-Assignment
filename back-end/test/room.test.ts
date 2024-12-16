import { Room } from '../domain/model/room';

// Mock data for testing
const mockRoomData = {
    id: 1,
    name: 'Room 101',
    capacity: 30,
    hasComputers: true, // Required property
};

describe('Room class', () => {
    it('should create a Room instance with valid data', () => {
        const room = new Room(mockRoomData);

        expect(room.id).toBe(mockRoomData.id);
        expect(room.name).toBe(mockRoomData.name);
        expect(room.capacity).toBe(mockRoomData.capacity);
        expect(room.hasComputers).toBe(mockRoomData.hasComputers);
    });

    it('should throw an error if name is missing', () => {
        const incompleteData = { ...mockRoomData };
        delete incompleteData.name;

        expect(() => new Room(incompleteData)).toThrowError('Room name is required');
    });
});

