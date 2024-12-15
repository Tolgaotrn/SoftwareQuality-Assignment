import { Assessment as AssessmentPrisma } from '@prisma/client'
import { AssessmentType } from '../model/enums'

export class Assessment {
    readonly id?: number
    readonly courseId: number
    readonly type: AssessmentType
    readonly weight: number
    readonly date: Date
    readonly roomId: number | null
    readonly requiresComputer: boolean

    constructor(assessment: {
        id?: number
        courseId: number
        type: AssessmentType
        weight: number
        date: Date
        roomId?: number | null
        requiresComputer: boolean
    }) {
        this.validate(assessment)

        this.id = assessment.id
        this.courseId = assessment.courseId
        this.type = assessment.type
        this.weight = assessment.weight
        this.date = assessment.date
        this.roomId = assessment.roomId || null
        this.requiresComputer = assessment.requiresComputer
    }

    validate(assessment: { courseId: number; type: AssessmentType; weight: number; date: Date; requiresComputer: boolean }) {
        if (!assessment.courseId) {
            throw new Error('Course ID is required')
        }
        if (!assessment.type) {
            throw new Error('Assessment type is required')
        }
        if (assessment.weight <= 0 || assessment.weight > 100) {
            throw new Error('Weighting must be between 1 and 100')
        }
        if (!assessment.date) {
            throw new Error('Date is required')
        }
    }

    static from({ id, courseId, type, weight, date, roomId, requiresComputer }: AssessmentPrisma) {
        return new Assessment({
            id,
            courseId,
            type: type as AssessmentType,
            weight,
            date,
            roomId,
            requiresComputer,
        })
    }
}
