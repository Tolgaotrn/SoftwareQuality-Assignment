import express from 'express'
import semesterService from '../service/semester.service'

const semesterRouter = express.Router()

// GET all semesters
semesterRouter.get('/', async (req, res) => {
    try {
        const semesters = await semesterService.getAllSemesters()
        res.json(semesters)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// GET semester by ID
semesterRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const semester = await semesterService.getSemesterById({ id: Number(id) })
        if (!semester) {
            return res.status(404).json({ error: 'Semester not found' })
        }
        res.json(semester)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// POST create a new semester
semesterRouter.post("/", async (req, res) => {
    try {
        console.log("Request payload:", req.body);

        const {
            startDate,
            endDate,
            normalExamPeriod,
            appealExamPeriod,
            specialExamPeriod,
        } = req.body;

        if (
            !startDate ||
            !endDate ||
            !normalExamPeriod?.startDate ||
            !normalExamPeriod?.endDate ||
            !appealExamPeriod?.startDate ||
            !appealExamPeriod?.endDate ||
            !specialExamPeriod?.startDate ||
            !specialExamPeriod?.endDate
        ) {
            console.log("Validation failed:", req.body);
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Pass the fields as individual properties
        const newSemester = await semesterService.createSemester({
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            normalExamStart: new Date(normalExamPeriod.startDate),
            normalExamEnd: new Date(normalExamPeriod.endDate),
            appealExamStart: new Date(appealExamPeriod.startDate),
            appealExamEnd: new Date(appealExamPeriod.endDate),
            specialExamStart: new Date(specialExamPeriod.startDate),
            specialExamEnd: new Date(specialExamPeriod.endDate),
        });

        res.status(201).json(newSemester);
    } catch (error) {
        console.error("Error in POST /semester:", error); // Log the full error
        res.status(500).json({ message: "Internal server error" });
    }
});


export default semesterRouter;