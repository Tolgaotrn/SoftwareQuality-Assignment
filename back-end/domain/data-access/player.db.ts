import database from '../../util/database'
import { Player } from '../model/player'

const getAllPlayers = async (): Promise<Player[]> => {
    try {
        const playersPrisma = await database.player.findMany({
            include: { user: true },
        })
        return playersPrisma.map((playerPrisma) => Player.from(playerPrisma))
    } catch (error) {
        throw new Error('Database error. See server log for details.')
    }
}

const getPlayerById = async ({ id }: { id: number }): Promise<Player | null> => {
    try {
        const playerPrisma = await database.player.findUnique({
            where: { id },
            include: { user: true },
        })
        return playerPrisma ? Player.from(playerPrisma) : null
    } catch (error) {
        throw new Error('Database error. See server log for details.')
    }
};

export default {
    getAllPlayers,
    getPlayerById,
}
