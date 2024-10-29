/**
 * @swagger
 *   components:
 *    schemas:
 *      Player:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            start:
 *              type: string
 *              format: date-time
 *            end:
 *              type: string
 *              format: date-time
 *            position:
 *              type: string
 *              format: 
 *            user:
 *              $ref: '#/components/schemas/User'
 */
import express, { NextFunction, Request, Response } from 'express'
import playerService from '../service/player.service'

const playerRouter = express.Router()

/**
 * @swagger
 * /players:
 *   get:
 *     summary: Get the list of players
 *     responses:
 *       200:
 *         description: The list of players
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Player'
 */
playerRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const players = await playerService.getAllPlayers()
        res.status(200).json(players)
    } catch (error) {
        next(error)
    }
})

export { playerRouter }
