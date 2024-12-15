import { Assessment } from '../model/assessment'
import database from '../../util/database'
import { AssessmentType } from '../model/enums'

const getAllAssessments = async (): Promise<Assessment[]> => {
    try {
        const assessmentsPrisma = await database.assessment.findMany()
        return assessmentsPrisma.map((assessmentPrisma) => Assessment.from(assessmentPrisma))
    } catch (error) {
        throw new Error('Database error. See server log for details.')
    }
}

const getAssessmentById = async ({ id }: { id: number }): Promise<Assessment | null> => {
    try {
        const assessmentPrisma = await database.assessment.findUnique({
            where: { id },
        })
        return assessmentPrisma ? Assessment.from(assessmentPrisma) : null
    } catch (error) {
        throw new Error('Database error. See server log for details.')
    }
}

const createAssessment = async ({
                                    courseId,
                                    type,
                                    weight,
                                    date,
                                    roomId,
                                    requiresComputer,
                                }: {
    courseId: number
    type: AssessmentType
    weight: number
    date: Date
    roomId: number | null
    requiresComputer: boolean
}): Promise<Assessment> => {
    try {
        const assessmentPrisma = await database.assessment.create({
            data: {
                courseId,
                type,
                weight,
                date,
                roomId,
                requiresComputer,
            } as any,
        })
        return Assessment.from(assessmentPrisma)
    } catch (error) {
        throw new Error('Database error. See server log for details.')
    }
}

export default {
    getAllAssessments,
    getAssessmentById,
    createAssessment,
}