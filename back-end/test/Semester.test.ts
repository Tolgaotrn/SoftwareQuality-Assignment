import { Semester } from '../domain/model/semester';
import { Semester as SemesterPrisma } from '@prisma/client';

type PrismaData = SemesterPrisma & {
    normalStartDate: Date;
    normalEndDate: Date;
    appealStartDate: Date;
    appealEndDate: Date;
    specialStartDate: Date;
    specialEndDate: Date;
};

// Mock data for testing
const mockSemesterData = {
    id: 1,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-06-30'),
    normalExamPeriod: {
        startDate: new Date('2024-05-01'),
        endDate: new Date('2024-05-15'),
    },
    appealExamPeriod: {
        startDate: new Date('2024-06-01'),
        endDate: new Date('2024-06-05'),
    },
    specialExamPeriod: {
        startDate: new Date('2024-06-10'),
        endDate: new Date('2024-06-15'),
    },
};

describe('Semester class', () => {
    it('should create a Semester instance with valid data', () => {
        const semester = new Semester(mockSemesterData);
        expect(semester.startDate).toEqual(mockSemesterData.startDate);
        expect(semester.endDate).toEqual(mockSemesterData.endDate);
        expect(semester.normalExamPeriod).toEqual(mockSemesterData.normalExamPeriod);
        expect(semester.appealExamPeriod).toEqual(mockSemesterData.appealExamPeriod);
        expect(semester.specialExamPeriod).toEqual(mockSemesterData.specialExamPeriod);
    });

    it('should throw an error if startDate or endDate is missing', () => {
        const incompleteData = { ...mockSemesterData };
        delete incompleteData.startDate;

        expect(() => new Semester(incompleteData)).toThrowError('Start and end dates are required');
    });

    it('should throw an error if startDate is after or equal to endDate', () => {
        const invalidData = { ...mockSemesterData, startDate: new Date('2024-07-01') };

        expect(() => new Semester(invalidData)).toThrowError('Start date must be before end date');
    });

    it('should correctly create a Semester instance from Prisma data', () => {
        const prismaData: PrismaData = {
            id: 2,
            startDate: new Date('2025-01-01'),
            endDate: new Date('2025-06-30'),
            normalStartDate: new Date('2025-05-01'),
            normalEndDate: new Date('2025-05-15'),
            appealStartDate: new Date('2025-06-01'),
            appealEndDate: new Date('2025-06-05'),
            specialStartDate: new Date('2025-06-10'),
            specialEndDate: new Date('2025-06-15'),
            createdAt: new Date('2024-12-01T00:00:00Z'),
            updatedAt: new Date('2024-12-10T00:00:00Z'),
        };

        const semester = Semester.from(prismaData);

        expect(semester.id).toBe(prismaData.id);
        expect(semester.startDate).toEqual(prismaData.startDate);
        expect(semester.endDate).toEqual(prismaData.endDate);
        expect(semester.normalExamPeriod).toEqual({
            startDate: prismaData.normalStartDate,
            endDate: prismaData.normalEndDate,
        });
        expect(semester.appealExamPeriod).toEqual({
            startDate: prismaData.appealStartDate,
            endDate: prismaData.appealEndDate,
        });
        expect(semester.specialExamPeriod).toEqual({
            startDate: prismaData.specialStartDate,
            endDate: prismaData.specialEndDate,
        });
    });
});
