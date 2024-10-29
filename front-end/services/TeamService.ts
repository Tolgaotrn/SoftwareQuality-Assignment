import { Team,Player } from "@types"

const getAllTeams = async () => {
    const loggedInUser = sessionStorage.getItem('user');
    if (!loggedInUser) {
        throw new Error('User is not logged in');
    }
    const token = JSON.parse(loggedInUser).token;
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/teams', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

        }
    })
}

const getTeamById = (id: string) => {
    const loggedInUser = sessionStorage.getItem('user');
    if (!loggedInUser) {
        throw new Error('User is not logged in');
    }
    const token = JSON.parse(loggedInUser).token;

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/teams/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

        },
    })
}

const removePlayerFromTeam = async (team: Team, player: Player) => {
    const loggedInUser = sessionStorage.getItem('user');
    if (!loggedInUser) {
        throw new Error('User is not logged in');
    }
    const token = JSON.parse(loggedInUser).token;

    return await fetch(process.env.NEXT_PUBLIC_API_URL + `/teams/leave`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

        },
        body: JSON.stringify({
            team: {id: team.id},
            player: { id: player.id }
        }),
    })
    

}

const addPlayerToTeam = async (team: Team, player: Player) => {

    const loggedInUser = sessionStorage.getItem('user');
    if (!loggedInUser) {
        throw new Error('User is not logged in');
    }
    const token = JSON.parse(loggedInUser).token;

    return await fetch(process.env.NEXT_PUBLIC_API_URL + `/teams/join`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

        },
        body: JSON.stringify({
            team: {id: team.id},
            players: [{ id: player.id }]
        }),
    })
}

const TeamService = {
    getAllTeams,
    addPlayerToTeam,
    getTeamById,
    removePlayerFromTeam,
}

export default TeamService