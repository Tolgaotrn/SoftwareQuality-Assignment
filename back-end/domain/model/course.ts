import { Course as CoursePrisma } from '@prisma/client';

/**
 * Represents a course entity with details such as name, code, and coordinator information.
 */
export class Course {
    /**
     * The unique identifier for the course (optional).
     */
    readonly id?: number;

    /**
     * The name of the course.
     */
    readonly name: string;

    /**
     * The unique code of the course.
     */
    readonly code: string;

    /**
     * The ID of the coordinator for the course (optional).
     */
    readonly coordinatorId?: number;

    /**
     * Constructs an instance of the `Course` class and validates the provided data.
     *
     * @param course - The course data.
     * @param course.id - The unique identifier for the course (optional).
     * @param course.name - The name of the course.
     * @param course.code - The unique code of the course.
     * @param course.coordinatorId - The ID of the coordinator for the course (optional).
     *
     * @throws {Error} If required fields are missing or invalid.
     */
    constructor(course: { id?: number; name: string; code: string; coordinatorId?: number }) {
        this.validate(course);

        this.id = course.id;
        this.name = course.name;
        this.code = course.code;
        this.coordinatorId = course.coordinatorId;
    }

    /**
     * Validates the course data to ensure all required fields are present and valid.
     *
     * @param course - The course data to validate.
     * @param course.name - The name of the course (required).
     * @param course.code - The unique code of the course (required).
     *
     * @throws {Error} If the course name or code is missing or empty.
     */
    validate(course: { name: string; code: string }) {
        if (!course.name?.trim()) {
            throw new Error('Course name is required');
        }
        if (!course.code?.trim()) {
            throw new Error('Course code is required');
        }
    }

    /**
     * Converts a Prisma `Course` object into a `Course` instance.
     *
     * @param prismaData - The Prisma `Course` object to convert.
     * @returns A new `Course` instance based on the Prisma data.
     */
    static from({ id, name, code, coordinatorId }: CoursePrisma): Course {
        return new Course({ id, name, code, coordinatorId });
    }
}
