import { Course } from '../domain/model/course'
import courseDB from '../domain/data-access/course.db'

const getAllCourses = async (): Promise<Course[]> => courseDB.getAllCourses()

const getCourseById = async ({ id }: { id: number }): Promise<Course> => {
    const course = await courseDB.getCourseById({ id })
    if (!course) {
        throw new Error(`Course with ID: ${id} does not exist.`)
    }
    return course
}

const createCourse = async ({
                                name,
                                code,
                                coordinatorId,
                            }: {
    name: string
    code: string
    coordinatorId: number
}): Promise<Course> => {
    const course = new Course({ name, code, coordinatorId })
    return await courseDB.createCourse(course)
}

export default {
    getAllCourses,
    getCourseById,
    createCourse,
}