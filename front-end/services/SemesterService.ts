const createSemester = async (semesterData) => {
    // Transform frontend flat structure into nested structure
    const formattedData = {
        startDate: semesterData.startDate,
        endDate: semesterData.endDate,
        normalExamPeriod: {
            startDate: semesterData.normalExamStart,
            endDate: semesterData.normalExamEnd,
        },
        appealExamPeriod: {
            startDate: semesterData.appealExamStart,
            endDate: semesterData.appealExamEnd,
        },
        specialExamPeriod: {
            startDate: semesterData.specialExamStart,
            endDate: semesterData.specialExamEnd,
        },
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/semester`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData), // Send the formatted payload
    });

    if (!response.ok) {
        const errorDetails = await response.json().catch(() => ({}));
        throw new Error(errorDetails.message || "Failed to create semester");
    }

    return response.json();
};

const getAllSemesters = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/semester", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch semesters");
    }

    return response.json();
};

const SemesterService = {
    createSemester,
    getAllSemesters,
};

export default SemesterService;
