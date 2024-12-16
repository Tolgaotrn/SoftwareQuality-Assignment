import { Assessment } from '../domain/model/assessment';
import { AssessmentType } from '../domain/model/enums'; // Import the correct AssessmentType

// Mock data for testing
const mockAssessmentData = {
    id: 1,
    courseId: 101,
    type: AssessmentType.TEST, // Use the correct enum value for 'Assignment'
    weight: 25,
    date: new Date('2024-12-20'),
    roomId: 10,
    requiresComputer: false,
};

describe('Assessment class', () => {
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
});
