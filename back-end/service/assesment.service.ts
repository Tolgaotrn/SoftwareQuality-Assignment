import { Assessment } from '../domain/model/assesment'
import assessmentDB from '../domain/data-access/assesment.db'
import { AssessmentType } from '../domain/model/enums'

const getAllAssessments = async (): Promise<Assessment[]> => assessmentDB.getAllAssessments()

const getAssessmentById = async ({ id }: { id: number }): Promise<Assessment> => {
    const assessment = await assessmentDB.getAssessmentById({ id })
    if (!assessment) {
        throw new Error(`Assessment with ID: ${id} does not exist.`)
    }
    return assessment
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
    const assessment = new Assessment({ courseId, type, weight, date, roomId, requiresComputer })
    return await assessmentDB.createAssessment(assessment)
}

export default {
    getAllAssessments,
    getAssessmentById,
    createAssessment,
}