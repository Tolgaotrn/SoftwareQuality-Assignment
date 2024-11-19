import express from 'express'
import assessmentService from '../service/assesment.service'

const assesmentRouter = express.Router()

// GET all assessments
assesmentRouter.get('/', async (req, res) => {
    try {
        const assessments = await assessmentService.getAllAssessments()
        res.json(assessments)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// GET assessment by ID
assesmentRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const assessment = await assessmentService.getAssessmentById({ id: Number(id) })
        if (!assessment) {
            return res.status(404).json({ error: 'Assessment not found' })
        }
        res.json(assessment)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// POST create a new assessment
assesmentRouter.post('/', async (req, res) => {
    try {
        const { courseId, type, weight, date, roomId, requiresComputer } = req.body
        const newAssessment = await assessmentService.createAssessment({
            courseId: Number(courseId),
            type,
            weight: Number(weight),
            date: new Date(date),
            roomId: roomId ? Number(roomId) : null,
            requiresComputer: Boolean(requiresComputer),
        })
        res.status(201).json(newAssessment)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default assesmentRouter