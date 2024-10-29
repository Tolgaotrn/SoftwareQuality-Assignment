import database from '../../util/database'
import { Team } from '../model/team'

const updateTeam = async ({team}: {team: Team}): Promise<Team | null> => {
    return null
}

const createTeam = async ({ coach, name }: Team): Promise<Team> => {
    try {
        const teamPrisma = await database.team.create({
            data: {
                coach: {
                    connect: { id: coach.id },
                },
                name: name,
            },
            include: {
                coach: { include: { user: true } },
                players: { include: { user: true } },
            },
        })
        return Team.from(teamPrisma)
    } catch (error) {
        throw new Error('Database error. See server log for details.')
    }
}

const getAllTeams = async (): Promise<Team[]> => {
    try {
        const teamsPrisma = await database.team.findMany({
            include: {
                coach: { include: { user: true } },
                players: { include: { user: true } },
            },
        })
        return teamsPrisma.map((teamPrisma) => Team.from(teamPrisma))
    } catch (error) {
        throw new Error('Database error. See server log for details.')
    }
}

const getTeamById = async ({ id }: { id: number }): Promise<Team | null> => {
    try {
        const teamPrisma = await database.team.findUnique({
            where: { id },
            include: {
                coach: { include: { user: true } },
                players: { include: { user: true } },
            },
        })
        return teamPrisma ? Team.from(teamPrisma) : null
    } catch (error) {
        throw new Error('Database error. See server log for details.')
    }
} 

const getTeamByName = async ({ name }: { name: string }): Promise<Team | null> => {
    try {
        const teamPrisma = await database.team.findFirst({
            where: { name },
            include: {
                coach: { include: { user: true } },
                players: { include: { user: true } },
            },
        })
        return teamPrisma ? Team.from(teamPrisma) : null
    } catch (error) {
        throw new Error('Database error. See server log for details.')
    }
}

const addPlayerToTeam = async ({ teamId, playerId }: { teamId: number, playerId: number }): Promise<void> => {
    try {
        await database.team.update({
            where: { id: teamId },
            data: {
                players: {
                    connect: { id: playerId },
                },
            },
            include: {
                coach: { include: { user: true } },
                players: { include: { user: true } },
            },
        });
    } catch (error) {
        throw new Error(`Failed to add player to team: ${error.message}`);
    }
};

const removePlayerFromTeam = async ({ teamId, playerId }: { teamId: number, playerId: number}): Promise<void> => {
    try {
        await database.team.update({
            where: { id: teamId },
            data: {
                players: {
                    disconnect: { id: playerId },
                },
            },
            include: {
                coach: { include: { user: true } },
                players: { include: { user: true } },
            },

        });
    } catch (error) {
        throw new Error(`Failed to add player to team: ${error.message}`);
    }
};

export default {
    createTeam,
    getAllTeams,
    getTeamById,
    updateTeam,
    getTeamByName,
    addPlayerToTeam,
    removePlayerFromTeam
}