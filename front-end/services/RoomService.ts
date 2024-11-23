const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAllRooms = async () => {
    const response = await fetch(`${API_URL}/room`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch rooms");
    }

    return response.json();
};

const createRoom = async (room) => {
    const response = await fetch(`${API_URL}/room`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(room),
    });

    if (!response.ok) {
        throw new Error("Failed to create room");
    }

    return response.json();
};

const updateRoom = async (roomId, room) => {
    const response = await fetch(`${API_URL}/room/${roomId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(room),
    });

    if (!response.ok) {
        throw new Error("Failed to update room");
    }

    return response.json();
};

const deleteRoom = async (roomId) => {
    const response = await fetch(`${API_URL}/room/${roomId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to delete room");
    }

    return response.json();
};

const RoomService = {
    getAllRooms,
    createRoom,
    updateRoom,
    deleteRoom,
};

export default RoomService;