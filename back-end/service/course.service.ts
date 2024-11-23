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
    name: string;
    code: string;
    coordinatorId?: number;
}): Promise<Course> => {
    const course = new Course({ name, code, coordinatorId });
    return await courseDB.createCourse(course);
}

const assignCoordinator = async ({
                                     id,
                                     coordinatorId,
                                 }: {
    id: number;
    coordinatorId: number;
}): Promise<Course> => {
    const course = await getCourseById({ id });
    const updatedCourse = new Course({
        id: course.id,
        name: course.name,
        code: course.code,
        coordinatorId: coordinatorId,
    })
    return await courseDB.updateCourse(updatedCourse);
};
const getAllCoursesByUser = async ({ username }: { username: string }): Promise<Course[]> => {
    return await courseDB.getAllCoursesByUser({ username });

}
const unassignCourse = async ({ id }: { id: number }): Promise<Course> => {
    const course = await getCourseById({ id });
    const updatedCourse = new Course({
        id: course.id,
        name: course.name,
        code: course.code,
        coordinatorId: null, // Ensure this is set to null
    });
    return await courseDB.updateCourse(updatedCourse);
};


export default {
    getAllCourses,
    getCourseById,
    createCourse,
    assignCoordinator,
    getAllCoursesByUser,
    unassignCourse
}