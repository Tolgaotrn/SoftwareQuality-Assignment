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
                                  normalExamPeriod,
                                  appealExamPeriod,
                                  specialExamPeriod,
                              }: {
    startDate: Date;
    endDate: Date;
    normalExamPeriod: { startDate: Date; endDate: Date };
    appealExamPeriod: { startDate: Date; endDate: Date };
    specialExamPeriod: { startDate: Date; endDate: Date };
}): Promise<Semester> => {
    try {
        console.log("Creating semester with data:", {
            startDate,
            endDate,
            normalExamPeriod,
            appealExamPeriod,
            specialExamPeriod,
        });

        const semesterPrisma = await database.semester.create({
            data: {
                startDate,
                endDate,
                normalStartDate: normalExamPeriod.startDate,
                normalEndDate: normalExamPeriod.endDate,
                appealStartDate: appealExamPeriod.startDate,
                appealEndDate: appealExamPeriod.endDate,
                specialStartDate: specialExamPeriod.startDate,
                specialEndDate: specialExamPeriod.endDate,
            },
        });
        return Semester.from(semesterPrisma);
    } catch (error) {
        console.error("Error in createSemester:", error); // Log the full error
        throw new Error("Database error");
    }
};


export default {
    getAllSemesters,
    getSemesterById,
    createSemester,
}