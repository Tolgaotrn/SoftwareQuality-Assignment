import React, { useEffect, useState } from "react";
import CourseService from "@services/CourseService";

interface Course {
    id: number;
    name: string;
    code: string;
    coordinatorId: number;
}

const MyCourses: React.FC = () => {
    const [Courses, setCourses] = useState<Course[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loggedInUser, setLoggedInUser] = useState<{ username: string } | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            if (loggedInUser) {
                try {
                    const data = await CourseService.getAllCourseByUser(loggedInUser.username);
                    setCourses(data);
                } catch (error) {
                    setError("Failed to fetch courses.");
                }
            }
        };

        fetchCourses();
    }, [loggedInUser]);

    useEffect(() => {
        const user = sessionStorage.getItem("user");
        if (user) {
            setLoggedInUser(JSON.parse(user));
        }
    }, []);

    const handleUnassign = async (courseId: number) => {
        try {
            const response = await CourseService.unassignedCourse(courseId);
            console.log("API Response:", response);
            setCourses((prevCourses) =>
                prevCourses.map((course) =>
                    course.id === courseId ? { ...course, coordinatorId: null } : course
                )
            );
            window.location.reload()
        } catch (error) {
            console.error("Error in API call:", error);
            setError("Failed to unassign course. Please try again.");
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
                    <th className="py-2">Unassign</th>

                </tr>
                </thead>
                <tbody>
                {Courses.map((course) => (
                    <tr key={course.id}>
                        <td className="border px-4 py-2">{course.id}</td>
                        <td className="border px-4 py-2">{course.name}</td>
                        <td className="border px-4 py-2">{course.code}</td>
                        {course.coordinatorId == null && (
                            <td className="border px-4 py-2">Not Assigned</td>
                        )}
                        {course.coordinatorId != null && (
                            <td className="border px-4 py-2">{course.coordinatorId}</td>
                        )}
                        <td className="border px-4 py-2">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                View
                            </button>
                        </td>
                        <td className="border px-4 py-2">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => {
                                    handleUnassign(course.id);
                                }}
                            >
                                Unassign
                            </button>
                        </td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyCourses;