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
            data: { name, code, coordinatorId: coordinatorId || null },
        });
        return Course.from(coursePrisma);
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
}
const updateCourse = async (course: Course): Promise<Course> => {
    try {
        const coursePrisma = await database.course.update({
            where: { id: course.id },
            data: { coordinatorId: course.coordinatorId },
        });
        return Course.from(coursePrisma);
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};


const getAllCoursesByUser = async ({ username }: { username: string }): Promise<Course[]> => {
    try {
        const user = await database.user.findUnique({
            where: { username },
        });


        const coursesPrisma = await database.course.findMany({
            where: { coordinatorId: user.id },
        });

        return coursesPrisma.map((coursePrisma) => Course.from(coursePrisma));
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};


export default {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    getAllCoursesByUser
};

