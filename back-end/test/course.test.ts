import { Course } from '../domain/model/course';

// Mock data for testing
const mockCourseData = {
    id: 1,
    name: 'Software Engineering',
    code: 'SE101',
    coordinatorId: 42, // Optional property
};

describe('Course class', () => {
    it('should create a Course instance with valid data', () => {
        const course = new Course(mockCourseData);

        expect(course.id).toBe(mockCourseData.id);
        expect(course.name).toBe(mockCourseData.name);
        expect(course.code).toBe(mockCourseData.code);
        expect(course.coordinatorId).toBe(mockCourseData.coordinatorId);
    });

    it('should handle missing optional properties', () => {
        const dataWithoutCoordinator = {
            ...mockCourseData,
            coordinatorId: undefined,
        };

        const course = new Course(dataWithoutCoordinator);

        expect(course.coordinatorId).toBeUndefined();
    });

    it('should throw an error for missing required properties', () => {
        const invalidCourseData = {
            ...mockCourseData,
            name: undefined, // Required property missing
        };

        expect(() => new Course(invalidCourseData)).toThrow(/name is required/);

    });
});
