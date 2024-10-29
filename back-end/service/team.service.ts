import playerDb from '../domain/data-access/player.db'
import teamDb from '../domain/data-access/team.db'
import userDb from '../domain/data-access/user.db'
import { Team } from '../domain/model/team'
import { Role, TeamInput, PlayerInput } from '../types'


const getTeams = async ({username, role} : {username: string, role: Role}): Promise<Team[]> => {
    const user = await userDb.getUserByUsername({username})
    if(user.role !== 'admin') {
        throw new Error("You are not admin")
    }  
    return await teamDb.getAllTeams()
}

// const createTeam = async ({name, coach: coachInput}:TeamInput): Promise<Team> => {
//     return null
// }
// const createTeam = async ({ name, coach: coachInput, players: playersInput }: TeamInput): Promise<Team> => {
//     // Validate input
//     if (!name) {
//         throw new Error('Team name is required');
//     }
//     if (!coachInput) {
//         throw new Error('Coach is required');
//     }
//     if (!playersInput || playersInput.length === 0) {
//         throw new Error('At least one player is required');
//     }

//     // Create or get the coach
//     let coach = await userDb.getUserById({ id: coachInput.id });
//     if (!coach) {
//         throw new Error('Coach not found');
//     }

//     // Create the team
//     const newTeam = await teamDb.createTeam({ name, coachId: coach.id });

//     // Add players to the team
//     for (const playerInput of playersInput) {
//         const player = await playerDb.getPlayerById({ id: playerInput.id });
//         if (!player) {
//             throw new Error(`Player with ID ${playerInput.id} not found`);
//         }
//         await teamDb.addPlayerToTeam({ teamId: newTeam.id, playerId: player.id });
//     }

//     // Return the newly created team
//     return await teamDb.getTeamById({ id: newTeam.id });
// };

const leave = async ({team: teamInput, player: playerInput}:{team: TeamInput, player: PlayerInput}) : Promise<Team | null> => {
    const team = await teamDb.getTeamById({ id: teamInput.id })
    const player2 = await playerDb.getPlayerById({id: playerInput.id})
    if (!team ) {
        throw new Error('Team not found')
    } 
    await teamDb.removePlayerFromTeam({ teamId: team.id, playerId: playerInput.id })
    return await teamDb.getTeamById({id: team.id})
}

const join = async ({team: teamInput, players: playersInput}:{team: TeamInput, players: PlayerInput[]}) : Promise<Team | null> => {
    const team = await teamDb.getTeamById({id: teamInput.id})

    if (!team) {
        throw new Error('Team not found');
    }

    for (const playerInput of playersInput) {

        const player = await playerDb.getPlayerById({ id: playerInput.id })
        if (!player) {
            throw new Error("There is no such a user found")
        }
        // Eğer oyuncu zaten takımda varsa hata fırlat
        if (team.players.some(existingPlayer => existingPlayer.id === player.id)) {
            throw new Error(`Player with ID ${playerInput.id} is already in the team`);
        }
        await teamDb.addPlayerToTeam({ teamId: team.id, playerId: player.id })
    }
    return await teamDb.getTeamById({ id: team.id})
    
}

const getTeamById = async (id: number): Promise<Team> => {
    const team = await teamDb.getTeamById({ id })
    return team
}

export default { 
    getTeams,
    join,
    leave,
    getTeamById
}
