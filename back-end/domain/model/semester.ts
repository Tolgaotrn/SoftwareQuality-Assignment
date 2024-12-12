import { Semester as SemesterPrisma } from '@prisma/client';

export class Semester {
    readonly id?: number;
    readonly startDate: Date;
    readonly endDate: Date;
    readonly normalExamPeriod: { startDate: Date; endDate: Date };
    readonly appealExamPeriod: { startDate: Date; endDate: Date };
    readonly specialExamPeriod: { startDate: Date; endDate: Date };

    constructor(semester: {
        id?: number;
        startDate: Date;
        endDate: Date;
        normalExamPeriod: { startDate: Date; endDate: Date };
        appealExamPeriod: { startDate: Date; endDate: Date };
        specialExamPeriod: { startDate: Date; endDate: Date };
    }) {
        this.validate(semester);

        this.id = semester.id;
        this.startDate = semester.startDate;
        this.endDate = semester.endDate;
        this.normalExamPeriod = semester.normalExamPeriod;
        this.appealExamPeriod = semester.appealExamPeriod;
        this.specialExamPeriod = semester.specialExamPeriod;
    }

    validate(semester: { startDate: Date; endDate: Date }) {
        if (!semester.startDate || !semester.endDate) {
            throw new Error('Start and end dates are required');
        }
        if (semester.startDate >= semester.endDate) {
            throw new Error('Start date must be before end date');
        }
    }

    static from({
                    id,
                    startDate,
                    endDate,
                    normalStartDate,
                    normalEndDate,
                    appealStartDate,
                    appealEndDate,
                    specialStartDate,
                    specialEndDate,
                }: SemesterPrisma) {
        return new Semester({
            id,
            startDate,
            endDate,
            normalExamPeriod: { startDate: normalStartDate, endDate: normalEndDate },
            appealExamPeriod: { startDate: appealStartDate, endDate: appealEndDate },
            specialExamPeriod: { startDate: specialStartDate, endDate: specialEndDate },
        });
    }
}
