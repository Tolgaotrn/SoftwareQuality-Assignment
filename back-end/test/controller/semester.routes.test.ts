import request from 'supertest';
import express, { Express } from 'express';
import semesterRouter from '../../controller/semester.routes';
import semesterService from '../../service/semester.service';

jest.mock('../../service/semester.service');

const app: Express = express();
app.use(express.json());
app.use('/semesters', semesterRouter);

describe('Semester Routes', () => {
    const mockSemester = {
        id: 1,
        startDate: '2024-01-10',
        endDate: '2024-05-20',
        normalExamStart: '2024-06-01',
        normalExamEnd: '2024-06-10',
        appealExamStart: '2024-06-15',
        appealExamEnd: '2024-06-20',
        specialExamStart: '2024-06-25',
        specialExamEnd: '2024-06-30',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // GET /semesters
    describe('GET /semesters', () => {
        it('should return a list of semesters', async () => {
            (semesterService.getAllSemesters as jest.Mock).mockResolvedValue([mockSemester]);

            const response = await request(app).get('/semesters');

            expect(response.status).toBe(200);
            expect(response.body).toEqual([mockSemester]);
            expect(semesterService.getAllSemesters).toHaveBeenCalledTimes(1);
        });

        it('should handle errors gracefully', async () => {
            (semesterService.getAllSemesters as jest.Mock).mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/semesters');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Database error. See server log for details.' });
        });
    });

    // GET /semesters/:id
    describe('GET /semesters/:id', () => {
        it('should return a semester for a valid ID', async () => {
            (semesterService.getSemesterById as jest.Mock).mockResolvedValue(mockSemester);

            const response = await request(app).get('/semesters/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockSemester);
            expect(semesterService.getSemesterById).toHaveBeenCalledWith({ id: 1 });
        });

        it('should return 404 if the semester is not found', async () => {
            (semesterService.getSemesterById as jest.Mock).mockResolvedValue(null);

            const response = await request(app).get('/semesters/99');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Semester not found' });
        });

        it('should handle errors gracefully', async () => {
            (semesterService.getSemesterById as jest.Mock).mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/semesters/1');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Database error. See server log for details.' });
        });
    });

    // POST /semesters
    describe('POST /semesters', () => {
        const newSemesterPayload = {
            startDate: '2024-01-10',
            endDate: '2024-05-20',
            normalExamPeriod: { startDate: '2024-06-01', endDate: '2024-06-10' },
            appealExamPeriod: { startDate: '2024-06-15', endDate: '2024-06-20' },
            specialExamPeriod: { startDate: '2024-06-25', endDate: '2024-06-30' },
        };

        it('should create a new semester', async () => {
            (semesterService.createSemester as jest.Mock).mockResolvedValue(mockSemester);

            const response = await request(app)
                .post('/semesters')
                .send(newSemesterPayload);

            expect(response.status).toBe(201);
            expect(response.body).toEqual(mockSemester);

            expect(semesterService.createSemester).toHaveBeenCalledWith({
                startDate: new Date(newSemesterPayload.startDate),
                endDate: new Date(newSemesterPayload.endDate),
                normalExamStart: new Date(newSemesterPayload.normalExamPeriod.startDate),
                normalExamEnd: new Date(newSemesterPayload.normalExamPeriod.endDate),
                appealExamStart: new Date(newSemesterPayload.appealExamPeriod.startDate),
                appealExamEnd: new Date(newSemesterPayload.appealExamPeriod.endDate),
                specialExamStart: new Date(newSemesterPayload.specialExamPeriod.startDate),
                specialExamEnd: new Date(newSemesterPayload.specialExamPeriod.endDate),
            });
        });

        it('should return 400 if required fields are missing', async () => {
            const invalidPayload = { startDate: '2024-01-10' }; // Missing fields

            const response = await request(app)
                .post('/semesters')
                .send(invalidPayload);

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ message: 'Missing required fields' });
        });

        it('should handle errors gracefully', async () => {
            (semesterService.createSemester as jest.Mock).mockRejectedValue(new Error('Failed to create semester'));

            const response = await request(app)
                .post('/semesters')
                .send(newSemesterPayload);

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ message: 'Internal server error' });
        });
    });
});
