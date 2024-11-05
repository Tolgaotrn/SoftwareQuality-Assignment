import { Course as CoursePrisma } from '@prisma/client'
import { AssessmentType } from './enums'

export class Course {
    readonly id?: number
    readonly name: string
    readonly coordinatorId: number
    readonly semesterId: number
    readonly assessmentType: AssessmentType

    constructor(course: {
        id?: number
        name: string
        coordinatorId: number
        semesterId: number
        assessmentType: AssessmentType
    }) {
        this.validate(course)

        this.id = course.id
        this.name = course.name
        this.coordinatorId = course.coordinatorId
        this.semesterId = course.semesterId
        this.assessmentType = course.assessmentType
    }

    validate(course: {
        name: string
        coordinatorId: number
        assessmentType: AssessmentType
    }) {
        if (!course.name?.trim()) {
            throw new Error('Course name is required')
        }
        if (!course.coordinatorId) {
            throw new Error('Coordinator ID is required')
        }
        if (!course.assessmentType) {
            throw new Error('Assessment type is required')
        }
    }

    static from({ id, name, coordinatorId, semesterId, assessmentType }: CoursePrisma) {
        return new Course({
            id,
            name,
            coordinatorId,
            semesterId,
            assessmentType: assessmentType as AssessmentType,
        })
    }
}
