import React, { useEffect, useState } from "react";

interface Assessment {
    id: number;
    type: string;
    weight: number;
    date: string;
    requiresComputer: boolean;
}

const ViewAssessmentsComponent: React.FC<{ courseId: number }> = ({ courseId }) => {
    const [assessments, setAssessments] = useState<Assessment[]>([]);
    const [newAssessment, setNewAssessment] = useState({
        type: "",
        weight: 0,
        date: "",
        requiresComputer: false,
    });

    // Fetch existing assessments
    useEffect(() => {
        fetch(`http://localhost:3000/assessment?courseId=${courseId}`)
            .then((response) => response.json())
            .then((data) => setAssessments(data))
            .catch((error) => console.error("Failed to fetch assessments:", error));
    }, [courseId]);

    // Handle form input changes with type conversion
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            setNewAssessment({
                ...newAssessment,
                [name]: (e.target as HTMLInputElement).checked,
            });
        } else {
            setNewAssessment({
                ...newAssessment,
                [name]: name === "weight" ? parseFloat(value) || 0 : value,
            });
        }
    };

    // Submit new assessment
    const handleAddAssessment = (e: React.FormEvent) => {
        e.preventDefault();
        fetch("http://localhost:3000/assessment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                courseId: Number(courseId),
                ...newAssessment,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                setAssessments([...assessments, data]);
                setNewAssessment({ type: "", weight: 0, date: "", requiresComputer: false });
            })
            .catch((error) => console.error("Failed to add assessment:", error));
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center text-blue-600">Course Assessments</h2>
            <h3 className="text-xl font-semibold mb-6 text-center">Course ID: {courseId}</h3>

            {/* Existing Assessments Table */}
            <table className="min-w-full bg-white border border-gray-300 mb-8">
                <thead className="bg-gray-200">
                <tr>
                    <th className="py-2 px-4 border">ID</th>
                    <th className="py-2 px-4 border">Type</th>
                    <th className="py-2 px-4 border">Weight</th>
                    <th className="py-2 px-4 border">Date</th>
                    <th className="py-2 px-4 border">Requires Computer</th>
                </tr>
                </thead>
                <tbody>
                {assessments.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border">{a.id}</td>
                        <td className="py-2 px-4 border">{a.type}</td>
                        <td className="py-2 px-4 border">{a.weight}%</td>
                        <td className="py-2 px-4 border">{new Date(a.date).toLocaleString()}</td>
                        <td className="py-2 px-4 border">
                            {a.requiresComputer ? "Yes" : "No"}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Add Assessment Form */}
            <div className="bg-blue-50 border border-blue-300 rounded-lg p-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-center text-blue-800">
                    Add New Assessment
                </h3>
                <form onSubmit={handleAddAssessment} className="space-y-4">
                    <div>
                        <label className="block font-semibold mb-1">Type:</label>
                        <select
                            name="type"
                            value={newAssessment.type}
                            onChange={handleInputChange}
                            required
                            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
                        >
                            <option value="">Select Type</option>
                            <option value="TEST">Test</option>
                            <option value="FINAL_TEST_AT_EXAM_TIME">Final Test at Exam Time</option>
                            <option value="WORK_DEVELOPMENT">Work Development</option>
                            <option value="WORK_DELIVERY">Work Delivery</option>
                            <option value="GROUP_WORK_SUBMISSION">Group Work Submission</option>
                            <option value="WORK_PRESENTATION">Work Presentation</option>
                            <option value="GROUP_WORK_PRESENTATION">Group Work Presentation</option>
                            <option value="MONOGRAPH">Monograph</option>
                            <option value="INDIVIDUAL_PRACTICAL_EXERCISE">Individual Practical Exercise</option>
                            <option value="PITCH">Pitch</option>
                            <option value="FINAL_EXAM">Final Exam</option>
                            <option value="ORAL_EXAM">Oral Exam</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Weight:</label>
                        <input
                            type="number"
                            name="weight"
                            value={newAssessment.weight}
                            onChange={handleInputChange}
                            min="1"
                            max="100"
                            required
                            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">Date:</label>
                        <input
                            type="datetime-local"
                            name="date"
                            value={newAssessment.date}
                            onChange={handleInputChange}
                            required
                            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div>
                        <label className="flex items-center space-x-2 font-semibold">
                            <input
                                type="checkbox"
                                name="requiresComputer"
                                checked={newAssessment.requiresComputer}
                                onChange={handleInputChange}
                                className="form-checkbox"
                            />
                            <span>Requires Computer</span>
                        </label>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded shadow-md transition-all"
                        >
                            Add Assessment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ViewAssessmentsComponent;
