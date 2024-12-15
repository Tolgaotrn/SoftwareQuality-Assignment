import express from 'express';
import assessmentService from '../service/assessment.service';

const assessmentRouter = express.Router();

// GET all assessments
assessmentRouter.get('/', async (req, res) => {
    try {
        const assessments = await assessmentService.getAllAssessments();
        res.json(assessments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET assessment by ID
assessmentRouter.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid assessment ID.' });
        }

        const assessment = await assessmentService.getAssessmentById({ id });
        if (!assessment) {
            return res.status(404).json({ error: 'Assessment not found.' });
        }
        res.json(assessment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST create a new assessment
assessmentRouter.post('/', async (req, res) => {
    try {
        const { courseId, type, weight, date, roomId, requiresComputer } = req.body;

        if (!courseId || !type || weight === undefined || !date || requiresComputer === undefined) {
            return res.status(400).json({ error: 'Missing required fields.' });
        }

        const newAssessment = await assessmentService.createAssessment({
            courseId: Number(courseId),
            type,
            weight: Number(weight),
            date: new Date(date),
            roomId: roomId ? Number(roomId) : null,
            requiresComputer: Boolean(requiresComputer),
        });

        res.status(201).json(newAssessment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default assessmentRouter;
