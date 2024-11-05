import {Semester as SemsterPrisma} from '@prisma/client'
export class Semester {
    readonly id?: number
    readonly startDate: Date
    readonly endDate: Date
    readonly normalPeriod: { start: Date; end: Date }
    readonly appealPeriod: { start: Date; end: Date }
    readonly specialPeriod: { start: Date; end: Date }

    constructor(semester: {
        id?: number
        startDate: Date
        endDate: Date
        normalPeriod: { start: Date; end: Date }
        appealPeriod: { start: Date; end: Date }
        specialPeriod: { start: Date; end: Date }
    }) {
        this.validate(semester)

        this.id = semester.id
        this.startDate = semester.startDate
        this.endDate = semester.endDate
        this.normalPeriod = semester.normalPeriod
        this.appealPeriod = semester.appealPeriod
        this.specialPeriod = semester.specialPeriod
    }

    validate(semester: {
        startDate: Date
        endDate: Date
        normalPeriod: { start: Date; end: Date }
        appealPeriod: { start: Date; end: Date }
        specialPeriod: { start: Date; end: Date }
    }) {
        if (!semester.startDate || !semester.endDate) {
            throw new Error('Start and end dates are required')
        }
        if (semester.startDate >= semester.endDate) {
            throw new Error('Start date must be before end date')
        }
    }

    static from({ id, startDate, endDate, normalPeriod, appealPeriod, specialPeriod }: SemesterPrisma) {
        return new Semester({
            id,
            startDate,
            endDate,
            normalPeriod,
            appealPeriod,
            specialPeriod
        })
    }
}
