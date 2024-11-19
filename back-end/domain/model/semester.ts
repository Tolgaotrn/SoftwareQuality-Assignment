import { Semester as SemesterPrisma } from '@prisma/client';

export class Semester {
    readonly id?: number;
    readonly startDate: Date;
    readonly endDate: Date;

    constructor(semester: { id?: number; startDate: Date; endDate: Date }) {
        this.validate(semester);

        this.id = semester.id;
        this.startDate = semester.startDate;
        this.endDate = semester.endDate;
    }

    validate(semester: { startDate: Date; endDate: Date }) {
        if (!semester.startDate || !semester.endDate) {
            throw new Error('Start and end dates are required');
        }
        if (semester.startDate >= semester.endDate) {
            throw new Error('Start date must be before end date');
        }
    }

    static from({ id, startDate, endDate }: SemesterPrisma) {
        return new Semester({
            id,
            startDate,
            endDate,
        });
    }
}
