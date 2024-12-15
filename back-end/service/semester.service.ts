import { Semester } from '../domain/model/semester'
import database from '../../back-end/util/database'
import axios from 'axios';

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
                                  normalExamStart,
                                  normalExamEnd,
                                  appealExamStart,
                                  appealExamEnd,
                                  specialExamStart,
                                  specialExamEnd,
                              }: {
    startDate: Date;
    endDate: Date;
    normalExamStart: Date;
    normalExamEnd: Date;
    appealExamStart: Date;
    appealExamEnd: Date;
    specialExamStart: Date;
    specialExamEnd: Date;
}): Promise<Semester> => {
    try {
        const semesterPrisma = await database.semester.create({
            data: {
                startDate,
                endDate,
                normalStartDate: normalExamStart,
                normalEndDate: normalExamEnd,
                appealStartDate: appealExamStart,
                appealEndDate: appealExamEnd,
                specialStartDate: specialExamStart,
                specialEndDate: specialExamEnd,
            },
        });

        return Semester.from(semesterPrisma);
    } catch (error) {
        console.error("Error in createSemester:", error);
        throw new Error("Failed to create semester: " + error.message);
    }
};


export default {
    getAllSemesters,
    getSemesterById,
    createSemester,
}