import { AssessmentType } from './enums'
import { Assessment as AssessmentPrisma } from '@prisma/client'

export class Assessment {
    readonly id?: number
    readonly courseId: number
    readonly type: AssessmentType
    readonly weight: number
    readonly date: Date
    readonly time: string
    readonly location: string
    readonly requiresComputer: boolean
    readonly mandatoryAttendance: boolean
    readonly deadline?: Date  // Only for submissions

    constructor(assessment: {
        id?: number
        courseId: number
        type: AssessmentType
        weight: number
        date: Date
        time: string
        location: string
        requiresComputer: boolean
        mandatoryAttendance: boolean
        deadline?: Date
    }) {
        this.validate(assessment)

        this.id = assessment.id
        this.courseId = assessment.courseId
        this.type = assessment.type
        this.weight = assessment.weight
        this.date = assessment.date
        this.time = assessment.time
        this.location = assessment.location
        this.requiresComputer = assessment.requiresComputer
        this.mandatoryAttendance = assessment.mandatoryAttendance
        this.deadline = assessment.deadline
    }

    validate(assessment: {
        courseId: number
        type: AssessmentType
        weight: number
        date: Date
        time: string
        location: string
        requiresComputer: boolean
        mandatoryAttendance: boolean
        deadline?: Date
    }) {
        if (!assessment.courseId) throw new Error('Course ID is required')
        if (!assessment.type) throw new Error('Assessment type is required')
        if (assessment.weight <= 0 || assessment.weight > 100) throw new Error('Weight must be between 1 and 100')
        if (!assessment.date) throw new Error('Assessment date is required')
        if (!assessment.location?.trim()) throw new Error('Location is required')

        // Specific checks based on assessment type
        if (assessment.type === AssessmentType.WORK_DELIVERY && !assessment.deadline) {
            throw new Error('A deadline is required for work submissions')
        }
    }

    // Additional utility method to check if 24-hour rule is respected
    static checkInterval(assessments: Assessment[]): boolean {
        // Sort assessments by date and check 24-hour intervals
        assessments.sort((a, b) => a.date.getTime() - b.date.getTime())
        for (let i = 1; i < assessments.length; i++) {
            const interval = assessments[i].date.getTime() - assessments[i - 1].date.getTime()
            if (interval < 24 * 60 * 60 * 1000) {
                throw new Error('Assessments must have a minimum interval of 24 hours')
            }
        }
        return true
    }

    // Method to ensure weightings sum to 100%
    static validateTotalWeight(assessments: Assessment[]): boolean {
        const totalWeight = assessments.reduce((sum, assessment) => sum + assessment.weight, 0)
        if (totalWeight !== 100) throw new Error('Total weighting across assessments must sum to 100%')
        return true
    }

    static from({ id, courseId, type, weight, date, time , location, requiresComputer, mandatoryAttendance, deadline }: AssessmentPrisma) {
        return new Assessment({
            id,
            courseId,
            type: type as AssessmentType,
            weight,
            date,
            time,
            location,
            requiresComputer,
            mandatoryAttendance,
            deadline
        })
    }
}
