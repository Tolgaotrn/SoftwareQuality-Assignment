import { Semester } from '../domain/model/semester'
import database from '../../back-end/util/database'

const getAllSemesters = async (): Promise<Semester[]> => {
    try {
        const semestersPrisma = await database.semester.findMany()
        return semestersPrisma.map((semesterPrisma) => Semester.from(semesterPrisma))
    } catch (error) {
        throw new Error('Database error. See server log for details.')
    }
}

const getSemesterById = async ({ id }: { id: number }): Promise<Semester | null> => {
    try {
        const semesterPrisma = await database.semester.findUnique({
            where: { id },
        })
        return semesterPrisma ? Semester.from(semesterPrisma) : null
    } catch (error) {
        throw new Error('Database error. See server log for details.')
    }
}

const createSemester = async ({
                                  startDate,
                                  endDate,
                              }: {
    startDate: Date
    endDate: Date
}): Promise<Semester> => {
    try {
        const semesterPrisma = await database.semester.create({
            data: { startDate, endDate },
        })
        return Semester.from(semesterPrisma)
    } catch (error) {
        throw new Error('Database error. See server log for details.')
    }
}

export default {
    getAllSemesters,
    getSemesterById,
    createSemester,
}