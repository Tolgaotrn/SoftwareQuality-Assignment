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
semesterRouter.post('/', async (req, res) => {
    try {
        const { startDate, endDate } = req.body
        const newSemester = await semesterService.createSemester({ startDate: new Date(startDate), endDate: new Date(endDate) })
        res.status(201).json(newSemester)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default semesterRouter;