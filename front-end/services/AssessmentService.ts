const API_URL = "http://localhost:3000/assessment"; // Base API endpoint for assessments

const AssessmentService = {
    // Fetch assessments for a specific course
    getAssessmentsByCourse: async (courseId: number) => {
        const response = await fetch(`${API_URL}?courseId=${courseId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch assessments");
        }
        return response.json();
    },

    // Add a new assessment to a course
    addAssessment: async (courseId: number, newAssessment: any) => {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ courseId, ...newAssessment }),
        });
        if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(errorDetails.message || "Failed to add assessment");
        }
        return response.json();
    },
};

export default AssessmentService;
