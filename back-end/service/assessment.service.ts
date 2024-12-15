import { Assessment } from '../domain/model/assessment'
import assessmentDB from '../domain/data-access/assessment.db'
import { AssessmentType } from '../domain/model/enums'
import database from "../util/database";
import {Prisma} from "@prisma/client";
import {type} from "node:os";

const getAllAssessments = async (): Promise<Assessment[]> => {
    try {
        const assessmentsPrisma = await database.assessment.findMany({
            include: { course: true, room: true },
        });
        return assessmentsPrisma.map((assessmentPrisma) => Assessment.from(assessmentPrisma));
    } catch (error) {
        throw new Error(`Failed to fetch assessments: ${error.message}`);
    }
};

const getAssessmentById = async ({ id }: { id: number }): Promise<Assessment | null> => {
    try {
        const assessmentPrisma = await database.assessment.findUnique({
            where: { id },
            include: { course: true, room: true },
        });
        return assessmentPrisma ? Assessment.from(assessmentPrisma) : null;
    } catch (error) {
        throw new Error(`Failed to fetch assessment with ID ${id}: ${error.message}`);
    }
};

const createAssessment = async ({
                                    courseId,
                                    type,
                                    weight,
                                    date,
                                    roomId,
                                    requiresComputer,
                                }: {
    courseId: number;
    type: AssessmentType;
    weight: number;
    date: Date;
    roomId: number | null;
    requiresComputer: boolean;
}): Promise<Assessment> => {
    try {
        // Validate the course exists
        const course = await database.course.findUnique({ where: { id: courseId } });
        if (!course) {
            throw new Error(`Course with ID ${courseId} does not exist.`);
        }

        // Define required fields for Prisma
        const data: Prisma.AssessmentUncheckedCreateInput = {
            courseId,
            type,
            weight,
            date,
            roomId: roomId || null,
            requiresComputer,
            location: 'TBD', // Default value for location
            mandatoryAttendance: false, // Default value for attendance
        };

        const assessmentPrisma = await database.assessment.create({ data });
        return Assessment.from(assessmentPrisma);
    } catch (error) {
        throw new Error(`Failed to create assessment: ${error.message}`);
    }
};



export default {
    getAllAssessments,
    getAssessmentById,
    createAssessment,
};
