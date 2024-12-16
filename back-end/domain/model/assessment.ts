import { Assessment as PrismaAssessment } from '@prisma/client';
import { AssessmentType } from '../model/enums';

/**
 * Represents an academic assessment entity with properties for course ID, type,
 * weight, date, room information, and computer requirements.
 */
export class Assessment {
    /**
     * The unique identifier for the assessment (optional).
     */
    readonly id?: number;

    /**
     * The ID of the associated course.
     */
    readonly courseId: number;

    /**
     * The type of the assessment (e.g., EXAM, QUIZ, ASSIGNMENT).
     */
    readonly type: AssessmentType;

    /**
     * The weight of the assessment as a percentage (1-100).
     */
    readonly weight: number;

    /**
     * The date of the assessment.
     */
    readonly date: Date;

    /**
     * The ID of the room where the assessment takes place (optional).
     */
    readonly roomId: number | null;

    /**
     * Indicates whether a computer is required for the assessment.
     */
    readonly requiresComputer: boolean;

    /**
     * Constructs an instance of the `Assessment` class and validates the provided data.
     *
     * @param assessment - The assessment data.
     * @param assessment.id - The unique identifier for the assessment (optional).
     * @param assessment.courseId - The ID of the associated course.
     * @param assessment.type - The type of the assessment.
     * @param assessment.weight - The weight of the assessment (1-100).
     * @param assessment.date - The date of the assessment.
     * @param assessment.roomId - The ID of the room where the assessment takes place (optional).
     * @param assessment.requiresComputer - Indicates whether a computer is required.
     *
     * @throws {Error} If required fields are missing or invalid.
     */
    constructor(assessment: {
        id?: number;
        courseId: number;
        type: AssessmentType;
        weight: number;
        date: Date;
        roomId?: number | null;
        requiresComputer: boolean;
    }) {
        this.validate(assessment);

        this.id = assessment.id;
        this.courseId = assessment.courseId;
        this.type = assessment.type;
        this.weight = assessment.weight;
        this.date = assessment.date;
        this.roomId = assessment.roomId || null;
        this.requiresComputer = assessment.requiresComputer;
    }

    /**
     * Validates the assessment data to ensure all required fields are present and valid.
     *
     * @param assessment - The assessment data to validate.
     * @param assessment.courseId - The ID of the associated course.
     * @param assessment.type - The type of the assessment.
     * @param assessment.weight - The weight of the assessment (must be between 1 and 100).
     * @param assessment.date - The date of the assessment.
     * @param assessment.requiresComputer - Indicates whether a computer is required.
     *
     * @throws {Error} If any required fields are missing or invalid.
     */
    private validate(assessment: {
        courseId: number;
        type: AssessmentType;
        weight: number;
        date: Date;
        requiresComputer: boolean;
    }) {
        if (!assessment.courseId) {
            throw new Error('Course ID is required.');
        }
        if (!assessment.type) {
            throw new Error('Assessment type is required.');
        }
        if (assessment.weight <= 0 || assessment.weight > 100) {
            throw new Error('Weight must be between 1 and 100.');
        }
        if (!assessment.date) {
            throw new Error('Date is required.');
        }
    }

    /**
     * Converts a Prisma `Assessment` object into an `Assessment` instance.
     *
     * @param prismaData - The Prisma `Assessment` object to convert.
     * @returns A new `Assessment` instance based on the Prisma data.
     */
    static from(prismaData: PrismaAssessment): Assessment {
        return new Assessment({
            id: prismaData.id,
            courseId: prismaData.courseId,
            type: prismaData.type as AssessmentType,
            weight: prismaData.weight,
            date: prismaData.date,
            roomId: prismaData.roomId,
            requiresComputer: prismaData.requiresComputer,
        });
    }
}
