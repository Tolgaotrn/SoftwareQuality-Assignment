const getAllPlayers = () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/players", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
}

const PlayerService = {
    getAllPlayers,
}

export default PlayerService