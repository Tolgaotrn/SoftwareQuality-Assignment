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

const SemesterService = {
    createSemester,
};

export default SemesterService;