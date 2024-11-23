import UserService from "@services/UserService";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAllCourse = async () => {
    const response = await fetch(`${API_URL}/course`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch rooms");
    }

    return response.json();
};

const createCourse = async (course) => {
    const response = await fetch(`${API_URL}/course`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
    });

    if (!response.ok) {
        throw new Error("Failed to create room");
    }

    return response.json();
};

const assignCoordinator = async (courseId: number, coordinatorUsername: string) => {
    try {
        const coordinator = await UserService.getUserByUsername(coordinatorUsername);
        const response = await fetch(`${API_URL}/course/${courseId}/assign`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ coordinatorId: coordinator.id }),
        });

        if (!response.ok) {
            throw new Error("Failed to assign coordinator");
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error in assignCoordinator:", error);
        throw error;
    }
};

const getAllCourseByUser = async (username: string) => {
    const response = await fetch(`${API_URL}/course/user/${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch courses");
    }

    return response.json();

}

const unassignedCourse = async (courseId: number) => {
    try {
        const url = `${API_URL}/course/${courseId}/unassign`;
        console.log("Unassign API URL:", url);
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Error in unassignCourse:", error);
        throw error;
    }
};




const CourseService = {
    getAllCourse,
    createCourse,
    assignCoordinator,
    getAllCourseByUser,
    unassignedCourse
};

export default CourseService;