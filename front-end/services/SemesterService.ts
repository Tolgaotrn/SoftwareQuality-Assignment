// front-end/services/SemesterService.ts
const createSemester = async (semesterData) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/semester", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(semesterData),
    });

    if (!response.ok) {
        throw new Error("Failed to create semester");
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
    getAllSemesters
};

export default SemesterService;