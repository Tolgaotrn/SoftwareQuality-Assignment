/**
 * @swagger
 *   components:
 *    schemas:
 *      Team:
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
 *            name:
 *              type: string
 *              description: team name 
 *            coach:
 *              $ref: '#/components/schemas/Coach'
 *            players:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Player'
 *      Coach:
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
 *            level:
 *              type: number
 *              format: int64 
 *            user:
 *              $ref: '#/components/schemas/User'
 *      JoinInput:
 *          type: object
 *          properties:
 *              team:
 *                type: object
 *                properties:
 *                    id:
 *                      type: number
 *                      format: int64
 *              players:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                         id:
 *                            type: number
 *                            format: int64
 *      LeaveInput:
 *          type: object
 *          properties:
 *              team:
 *                type: object
 *                properties:
 *                    id:
 *                      type: number
 *                      format: int64
 *              player:
 *                  type: object
 *                  properties:
 *                     id:
 *                       type: number
 *                       format: int64 
 */
import express, { NextFunction, Request, Response } from 'express'
import teamService from "../service/team.service"

const teamRouter = express.Router()

/**
 * @swagger
 * /teams:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get the list of teams if the user is an admin user
 *     responses:
 *       200:
 *         description: The list of teams if the user is an admin user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Team'
 */
teamRouter.get('/', async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
    try {
        const { username, role } = req.auth;
        
        const teams = await teamService.getTeams({ username, role });
        res.status(200).json(teams);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /teams/join:
 *   post:
 *      security:
 *       - bearerAuth: []
 *      summary: One or more players joining a team.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/JoinInput'
 *      responses:
 *         200:
 *            description: All the data of the team
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Team'
 */
teamRouter.post('/join', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {team, players} = req.body
        const updatedTeam = await teamService.join( { team, players } );
        res.status(200).json(updatedTeam)
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /teams/leave:
 *   post:
 *      security:
 *       - bearerAuth: []
 *      summary: One or more players leaving a team.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LeaveInput'
 *      responses:
 *         200:
 *            description: All the data of the team
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Team'
 */
teamRouter.post('/leave', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { team,player } = req.body
        const updatedTeam = await teamService.leave({team,player})
        res.status(200).json(updatedTeam)
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all data of team with id if the user is an admin user
 *     parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              required: true
 *              description: The team id.
 *     responses:
 *       200:
 *         description: Get all data of team with id if the user is an admin user
 *         content:
 *           application/json:
 *             schema: 
 *                  $ref: '#/components/schemas/Team'
 */
teamRouter.get('/:id', async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
    try {
        const { username, role } = req.auth
        const id = Number(req.params.id)
        const players = await teamService.getTeamById(id)
        res.status(200).json(players)
    } catch (error) {
        next(error)
    }
})

export { teamRouter }
