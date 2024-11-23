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
        const { name, code, coordinatorId } = req.body;
        const newCourse = await courseService.createCourse({
            name,
            code,
            coordinatorId,
        });
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
courseRouter.put('/:id/assign', async (req, res) => {
    try {
        const { id } = req.params;
        const { coordinatorId } = req.body;
        const updatedCourse = await courseService.assignCoordinator({
            id: Number(id),
            coordinatorId,
        });
        res.json(updatedCourse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
courseRouter.get('/user/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const courses = await courseService.getAllCoursesByUser({ username });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

courseRouter.put('/:id/unassign', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCourse = await courseService.unassignCourse({ id: Number(id) });
        res.json(updatedCourse); // Ensure this sends the correct response
    } catch (error) {
        console.error("Error in unassign handler:", error);
        res.status(500).json({ error: error.message });
    }
});

export default courseRouter