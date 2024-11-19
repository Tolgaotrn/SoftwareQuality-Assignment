import { Course } from '../model/course'
import database from '../../util/database'

const getAllCourses = async (): Promise<Course[]> => {
    try {
        const coursesPrisma = await database.course.findMany()
        return coursesPrisma.map((coursePrisma) => Course.from(coursePrisma))
    } catch (error) {
        throw new Error('Database error. See server log for details.')
    }
}

const getCourseById = async ({ id }: { id: number }): Promise<Course | null> => {
    try {
        const coursePrisma = await database.course.findUnique({
            where: { id },
        })
        return coursePrisma ? Course.from(coursePrisma) : null
    } catch (error) {
        throw new Error('Database error. See server log for details.')
    }
}

const createCourse = async ({
        name,
        code,
        coordinatorId,
    }: Course): Promise<Course> => {
    try {
        const coursePrisma = await database.course.create({
            data: { name, code, coordinatorId },
        })
        return Course.from(coursePrisma)
    } catch (error) {
        throw new Error('Database error. See server log for details.')
    }
}

export default {
    getAllCourses,
    getCourseById,
    createCourse,
}