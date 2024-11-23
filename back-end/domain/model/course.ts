import { Course as CoursePrisma } from '@prisma/client'

export class Course {
    readonly id?: number;
    readonly name: string;
    readonly code: string;
    readonly coordinatorId?: number;

    constructor(course: { id?: number; name: string; code: string; coordinatorId?: number }) {
        this.validate(course);

        this.id = course.id;
        this.name = course.name;
        this.code = course.code;
        this.coordinatorId = course.coordinatorId;
    }

    validate(course: { name: string; code: string }) {
        if (!course.name?.trim()) {
            throw new Error('Course name is required');
        }
        if (!course.code?.trim()) {
            throw new Error('Course code is required');
        }
    }

    static from({ id, name, code, coordinatorId }: CoursePrisma) {
        return new Course({ id, name, code, coordinatorId });
    }
}
