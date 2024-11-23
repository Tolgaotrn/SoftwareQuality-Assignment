import React, { useEffect, useState } from "react";
import CourseService from "@services/CourseService";

interface Course {
    id: number;
    name: string;
    code: string;
    coordinatorId: number | null;
}

const CourseGetAll: React.FC = () => {
    const [Courses, setCourses] = useState<Course[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loggedInUser, setLoggedInUser] = useState<{ username: string } | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await CourseService.getAllCourse();
                setCourses(data.filter((course: Course) => course.coordinatorId === null));
            } catch (error) {
                setError("Failed to fetch courses.");
            }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        const user = sessionStorage.getItem("user");
        if (user) {
            setLoggedInUser(JSON.parse(user));
        }
    }, []);

    const handleAssign = async (courseId: number) => {
        if (!loggedInUser) {
            setError("User not logged in.");
            return;
        }

        try {
            await CourseService.assignCoordinator(courseId, loggedInUser.username);
            const updatedCourses = Courses.map(course =>
                course.id === courseId ? { ...course, coordinatorId: Number(loggedInUser.username) } : course
            );
            setCourses(updatedCourses);
            window.location.reload();
        } catch (error) {
            console.error("Error in handleAssign:", error);
            setError("Failed to assign coordinator.");
        }
    };

    return (
        <div className="max-w-2xl m-auto">
            <h2 className="text-xl font-semibold mb-4">All Available Courses</h2>

            {error && <p className="text-red-800">{error}</p>}

            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    <th className="py-2">ID</th>
                    <th className="py-2">Name</th>
                    <th className="py-2">Code</th>
                    <th className="py-2">CoordinatorId</th>
                    <th className="py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {Courses.map((course) => (
                    <tr key={course.id}>
                        <td className="border px-4 py-2">{course.id}</td>
                        <td className="border px-4 py-2">{course.name}</td>
                        <td className="border px-4 py-2">{course.code}</td>
                        <td className="border px-4 py-2">Not Assigned</td>
                        <td className="border px-4 py-2">
                            <button
                                onClick={() => handleAssign(course.id)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                                Assign Yourself
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseGetAll;