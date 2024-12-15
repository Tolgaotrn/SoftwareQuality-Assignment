import * as dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { userRouter } from './controller/user.routes';
import helmet from 'helmet';

import { expressjwt } from 'express-jwt';
import assessmentRoutes from "./controller/assessment.routes";
import roomRoutes from "./controller/room.routes";
import courseRoutes from "./controller/course.routes";
import semesterRoutes from "./controller/semester.routes";

const app = express();
app.use(helmet());

dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(bodyParser.json());

// app.use(
//     expressjwt({
//         secret: process.env.JWT_SECRET,
//         algorithms: ["HS256"]
//     }).unless({
//         path: [
//             '/api-docs',
//             /^\/api-docs\/.*/,
//             '/users/login',
//             '/users/signup',
//             '/status',
//             '/login',
//
//         ]
//     })
// );

app.use('/users', userRouter);
app.use('/assessment', assessmentRoutes);
app.use('/room', roomRoutes);
app.use('/course', courseRoutes);
app.use('/semester', semesterRoutes);



app.get('/status', (req, res) => {
    res.json({ message: ' API is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};
const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'unauthorized', message: err.message });
    } else if (err.name === 'DomainError') {
        res.status(400).json({ status: 'domain error', message: err.message });
    } else {
        res.status(400).json({ status: 'application error', message: err.message });
    }
});

app.listen(port || 3000, () => {
    console.log(`API is running on port ${port}.`);
});
