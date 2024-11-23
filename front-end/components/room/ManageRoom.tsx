import React, { useEffect, useState } from "react";
import RoomService from "../../services/RoomService";

interface Room {
    id: number;
    name: string;
    capacity: number;
    hasComputers: boolean;
}

const ManageRoom: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [newRoom, setNewRoom] = useState({ name: "", capacity: 0, hasComputers: false });

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const data = await RoomService.getAllRooms();
                setRooms(data);
            } catch (error) {
                setError("Failed to fetch rooms.");
            }
        };

        fetchRooms();
    }, []);

    const handleCreateRoom = async () => {
        try {
            const createdRoom = await RoomService.createRoom(newRoom);
            setRooms([...rooms, createdRoom]);
            setNewRoom({ name: "", capacity: 0, hasComputers: false });
        } catch (error) {
            setError("Failed to create room.");
        }
    };

    const handleDeleteRoom = async (roomId: number) => {
        try {
            await RoomService.deleteRoom(roomId);
            setRooms(rooms.filter(room => room.id !== roomId));
        } catch (error) {
            setError("Failed to delete room.");
        }
    };

    return (
        <div className="max-w-2xl m-auto">
            <h2 className="text-xl font-semibold mb-4">Manage Rooms</h2>

            {error && <p className="text-red-800">{error}</p>}

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Room Name"
                    value={newRoom.name}
                    onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                    className="border px-4 py-2 mr-2"
                />
                <input
                    type="number"
                    placeholder="Computer Count"
                    value={newRoom.capacity}
                    onChange={(e) => setNewRoom({ ...newRoom, capacity: parseInt(e.target.value) })}
                    className="border px-4 py-2 mr-2"
                />
                <label className="mr-2">
                    <input
                        type="checkbox"
                        checked={newRoom.hasComputers}
                        onChange={(e) => setNewRoom({ ...newRoom, hasComputers: e.target.checked })}
                    />
                    Has Computers
                </label>
                <button onClick={handleCreateRoom} className="bg-blue-600 text-white px-4 py-2">Add Room</button>
            </div>

            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    <th className="py-2">ID</th>
                    <th className="py-2">Name</th>
                    <th className="py-2">Computer Count</th>
                    <th className="py-2">Has Computers</th>
                    <th className="py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {rooms.map((room) => (
                    <tr key={room.id}>
                        <td className="border px-4 py-2">{room.id}</td>
                        <td className="border px-4 py-2">{room.name}</td>
                        <td className="border px-4 py-2">{room.capacity}</td>
                        <td className="border px-4 py-2">{room.hasComputers ? "✔️" : "❌"}</td>
                        <td className="border px-4 py-2">
                            <button onClick={() => handleDeleteRoom(room.id)} className="bg-red-600 text-white px-4 py-2">Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageRoom;