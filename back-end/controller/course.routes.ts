import express from 'express'
import courseService from '../service/course.service'

const courseRouter = express.Router()

// GET all courses
courseRouter.get('/', async (req, res) => {
    try {
        const courses = await courseService.getAllCourses()
        res.json(courses)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// GET course by ID
courseRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const course = await courseService.getCourseById({ id: Number(id) })
        if (!course) {
            return res.status(404).json({ error: 'Course not found' })
        }
        res.json(course)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// POST create a new course
courseRouter.post('/', async (req, res) => {
    try {
        const { name, code, coordinatorId } = req.body
        const newCourse = await courseService.createCourse({
            name,
            code,
            coordinatorId: Number(coordinatorId),
        })
        res.status(201).json(newCourse)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default courseRouter