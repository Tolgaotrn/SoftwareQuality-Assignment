import { Assessment } from '../domain/model/assessment';
import { AssessmentType } from '../domain/model/enums';

describe('Assessment class', () => {
    const mockAssessmentData = {
        id: 1,
        courseId: 101,
        type: AssessmentType.TEST,
        weight: 25,
        date: new Date('2024-12-20'),
        roomId: 10,
        requiresComputer: false,
    };

    it('should create an Assessment instance with valid data', () => {
        const assessment = new Assessment(mockAssessmentData);

        expect(assessment.id).toBe(mockAssessmentData.id);
        expect(assessment.courseId).toBe(mockAssessmentData.courseId);
        expect(assessment.type).toBe(mockAssessmentData.type);
        expect(assessment.weight).toBe(mockAssessmentData.weight);
        expect(assessment.date).toEqual(mockAssessmentData.date);
        expect(assessment.roomId).toBe(mockAssessmentData.roomId);
        expect(assessment.requiresComputer).toBe(mockAssessmentData.requiresComputer);
    });

    it('should throw an error for invalid weight', () => {
        const invalidAssessmentData = {
            ...mockAssessmentData,
            weight: -10,
        };

        // Updated to match the actual error message
        expect(() => new Assessment(invalidAssessmentData)).toThrow('Weight must be between 1 and 100.');
    });
});
