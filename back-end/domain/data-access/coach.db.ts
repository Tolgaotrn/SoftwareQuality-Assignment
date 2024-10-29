import database from '../../util/database'
import { Coach } from "../model/coach"

const getCoachById = async ({ id }: { id: number }): Promise<Coach | null> => {
    try {
        const coachPrisma = await database.coach.findUnique({
            where: { id },
            include: { user: true },
        });

        return coachPrisma ? Coach.from(coachPrisma) : null;
    } catch (error) {
        throw new Error('Database error. See server log for details.')
    }
}

export default {
    getCoachById,
}
