import { Semester as SemesterPrisma } from '@prisma/client';

/**
 * Represents a semester entity with details such as start and end dates, and exam periods.
 */
export class Semester {
    /**
     * The unique identifier for the semester (optional).
     */
    readonly id?: number;

    /**
     * The start date of the semester.
     */
    readonly startDate: Date;

    /**
     * The end date of the semester.
     */
    readonly endDate: Date;

    /**
     * The normal exam period for the semester.
     * Includes the start and end dates of the period.
     */
    readonly normalExamPeriod: { startDate: Date; endDate: Date };

    /**
     * The appeal exam period for the semester.
     * Includes the start and end dates of the period.
     */
    readonly appealExamPeriod: { startDate: Date; endDate: Date };

    /**
     * The special exam period for the semester.
     * Includes the start and end dates of the period.
     */
    readonly specialExamPeriod: { startDate: Date; endDate: Date };

    /**
     * Constructs an instance of the `Semester` class and validates the provided data.
     *
     * @param semester - The semester data.
     * @param semester.id - The unique identifier for the semester (optional).
     * @param semester.startDate - The start date of the semester.
     * @param semester.endDate - The end date of the semester.
     * @param semester.normalExamPeriod - The normal exam period (start and end dates).
     * @param semester.appealExamPeriod - The appeal exam period (start and end dates).
     * @param semester.specialExamPeriod - The special exam period (start and end dates).
     *
     * @throws {Error} If required fields are missing or invalid.
     */
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

    /**
     * Validates the semester data to ensure all required fields are present and valid.
     *
     * @param semester - The semester data to validate.
     * @param semester.startDate - The start date of the semester (required).
     * @param semester.endDate - The end date of the semester (required).
     *
     * @throws {Error} If the start or end dates are missing or invalid.
     */
    validate(semester: { startDate: Date; endDate: Date }) {
        if (!semester.startDate || !semester.endDate) {
            throw new Error('Start and end dates are required');
        }
        if (semester.startDate >= semester.endDate) {
            throw new Error('Start date must be before end date');
        }
    }

    /**
     * Converts a Prisma `Semester` object into a `Semester` instance.
     *
     * @param prismaData - The Prisma `Semester` object to convert.
     * @param prismaData.id - The unique identifier for the semester (optional).
     * @param prismaData.startDate - The start date of the semester.
     * @param prismaData.endDate - The end date of the semester.
     * @param prismaData.normalStartDate - The start date of the normal exam period.
     * @param prismaData.normalEndDate - The end date of the normal exam period.
     * @param prismaData.appealStartDate - The start date of the appeal exam period.
     * @param prismaData.appealEndDate - The end date of the appeal exam period.
     * @param prismaData.specialStartDate - The start date of the special exam period.
     * @param prismaData.specialEndDate - The end date of the special exam period.
     *
     * @returns A new `Semester` instance based on the Prisma data.
     */
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
                }: SemesterPrisma): Semester {
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
