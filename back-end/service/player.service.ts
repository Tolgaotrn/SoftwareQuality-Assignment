import playerDb from '../domain/data-access/player.db'
//hata bu olabiliyor

import { Player } from '../domain/model/player'

const getAllPlayers = async (): Promise<Player[]> => playerDb.getAllPlayers()


const getPlayerById = async ({ id }: { id: number }): Promise<Player> => {
    const player = await playerDb.getPlayerById({ id })
    if (!player) {
        throw new Error(`Player  not exist.`)
    }
    return player
}
export default { getAllPlayers, getPlayerById }
