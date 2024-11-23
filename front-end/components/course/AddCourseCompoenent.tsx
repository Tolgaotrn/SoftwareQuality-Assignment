import React, { useState } from "react";
import CourseService from "../../services/CourseService";
import classNames from "classnames";

interface CourseData {
    name: string;
    code: string;
}

const AddCourseForm: React.FC = () => {
    const [courseData, setCourseData] = useState<CourseData>({
        name: "",
        code: "",
    });

    const [statusMessages, setStatusMessages] = useState<{ message: string; type: string }[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Course Data Submitted:", courseData);
        try {
            await CourseService.createCourse(courseData);
            setStatusMessages([{ message: "Course created successfully!", type: "success" }]);
        } catch (error) {
            console.error("Error creating course:", error);
            setStatusMessages([{ message: "Failed to create course.", type: "error" }]);
        }
    };

    return (
        <div className="max-w-sm m-auto">
            <h2 className="text-xl font-semibold mb-4">Add Course</h2>

            {/* Status Messages */}
            {statusMessages.length > 0 && (
                <div className="mb-4">
                    <ul className="list-none mb-3">
                        {statusMessages.map(({ message, type }, index) => (
                            <li
                                key={index}
                                className={classNames({
                                    "text-red-800": type === "error",
                                    "text-green-800": type === "success",
                                })}>
                                {message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium">
                        Course Name:
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={courseData.name}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="code" className="block mb-2 text-sm font-medium">
                        Course Code:
                    </label>
                    <input
                        id="code"
                        type="text"
                        name="code"
                        value={courseData.code}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>

                <div className="row">
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Save Course
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCourseForm;