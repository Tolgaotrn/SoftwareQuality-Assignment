import { Request, Response, NextFunction } from 'express';
import prisma from '../util/database';

export const validateAssessment = async (req: Request, res: Response, next: NextFunction) => {
    const { weight, date, courseId } = req.body;

    try {
        const assessments = await prisma.assessment.findMany({ where: { courseId: Number(courseId) } });

        const totalWeighting = assessments.reduce((sum, a) => sum + a.weight, 0) + Number(weight);
        if (totalWeighting > 100) {
            return res.status(400).json({ message: 'Weighting exceeds 100%.' });
        }

        const hasOverlap = assessments.some(
            (a) => new Date(a.date).toISOString() === new Date(date).toISOString()
        );
        if (hasOverlap) {
            return res.status(400).json({ message: 'Overlapping assessment dates.' });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Validation error.', error });
    }
};

export const validateSemesterDates = (req: Request, res: Response, next: NextFunction) => {
    const { startDate, endDate, normalExamPeriod, appealExamPeriod, specialExamPeriod } = req.body;

    try {
        if (new Date(startDate) >= new Date(endDate)) {
            return res.status(400).json({ message: 'Semester start date must be before end date.' });
        }

        const periods = [normalExamPeriod, appealExamPeriod, specialExamPeriod];
        for (const period of periods) {
            if (new Date(period.startDate) >= new Date(period.endDate)) {
                return res.status(400).json({ message: `Invalid period dates for ${period.type}.` });
            }
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Validation error.', error });
    }
};
