import React, { useState } from "react";
import SemesterService from "../../services/SemesterService";
import classNames from "classnames";

interface SemesterData {
    startDate: string;
    endDate: string;
}

const SemesterManagement: React.FC = () => {
    const [semesterData, setSemesterData] = useState<SemesterData>({
        startDate: "",
        endDate: "",
    });

    const [statusMessages, setStatusMessages] = useState<{ message: string; type: string }[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSemesterData({ ...semesterData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Semester Data Submitted:", semesterData);
        try {
            await SemesterService.createSemester(semesterData);
            setStatusMessages([{ message: "Semester created successfully!", type: "success" }]);
        } catch (error) {
            console.error("Error creating semester:", error);
            setStatusMessages([{ message: "Failed to create semester.", type: "error" }]);
        }
    };

    return (
        <div className="max-w-sm m-auto">
            <h2 className="text-xl font-semibold mb-4">Define Semester</h2>

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
                    <label htmlFor="startDate" className="block mb-2 text-sm font-medium">
                        Semester Start Date:
                    </label>
                    <input
                        id="startDate"
                        type="date"
                        name="startDate"
                        value={semesterData.startDate}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="endDate" className="block mb-2 text-sm font-medium">
                        Semester End Date:
                    </label>
                    <input
                        id="endDate"
                        type="date"
                        name="endDate"
                        value={semesterData.endDate}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>

                <div className="row">
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Save Semester
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SemesterManagement;
