/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      AuthenticationResponse:
 *          type: object
 *          properties:
 *            message:
 *              type: string
 *              description: Authentication response.
 *            token:
 *              type: string
 *              description: JWT access token.
 *            username:
 *              type: string
 *              description: User name.
 *            fullname:
 *             type: string
 *             description: Full name.
 *      AuthenticationRequest:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *              description: User name.
 *            password:
 *              type: string
 *              description: User password.
 *      User:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            username:
 *              type: string
 *              description: User name.
 *            password:
 *              type: string
 *              description: User password.
 *            firstName:
 *              type: string
 *              description: First name.
 *            lastName:
 *              type: string
 *              description: Last name.
 *            email:
 *              type: string
 *              description: E-mail.
 *            role:
 *               $ref: '#/components/schemas/Role'
 *      UserInput:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *              description: User name.
 *            password:
 *              type: string
 *              description: User password.
 *            firstName:
 *              type: string
 *              description: First name.
 *            lastName:
 *              type: string
 *              description: Last name.
 *            email:
 *              type: string
 *              description: E-mail.
 *            role:
 *               $ref: '#/components/schemas/Role'
 *      Role:
 *          type: string
 *          enum: [player, coach, admin]
 */
import express, { NextFunction, Request, Response } from 'express'
import userService from '../service/user.service'
import { UserInput } from '../types/index'

const userRouter = express.Router()

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get the list of users
 *     responses:
 *       200:
 *         description: The list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/User'
 */
userRouter.get('/', async (req: Request & { auth: UserInput }, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /users/login:
 *   post:
 *      summary: Login using username/password. Returns an object with JWT token and user name when succesful.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AuthenticationRequest'
 *      responses:
 *         200:
 *            description: The created user object
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/AuthenticationResponse'
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body
        const response = await userService.authenticate(userInput)
        res.status(200).json({ message: 'Authentication succesful', ...response })
    } catch (error) {
        next(error)
    }
})

userRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInput = <UserInput>req.body
        const user = await userService.createUser(userInput)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
})

export { userRouter }
