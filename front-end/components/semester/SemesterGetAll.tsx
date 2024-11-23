import React, { useEffect, useState } from "react";
import SemesterService from "../../services/SemesterService";
import Link from "next/link";

interface Semester {
    id: number;
    startDate: string;
    endDate: string;
}

const SemesterGetAll: React.FC = () => {
    const [semesters, setSemesters] = useState<Semester[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSemesters = async () => {
            try {
                const data = await SemesterService.getAllSemesters();
                setSemesters(data);
            } catch (error) {
                setError("Failed to fetch semesters.");
            }
        };

        fetchSemesters();
    }, []);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="max-w-2xl m-auto">
            <h2 className="text-xl font-semibold mb-4">All Semesters</h2>

            {error && <p className="text-red-800">{error}</p>}

            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    <th className="py-2">ID</th>
                    <th className="py-2">Start Date</th>
                    <th className="py-2">End Date</th>
                    <th className="py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {semesters.map((semester) => (
                    <tr key={semester.id}>
                        <td className="border px-4 py-2">{semester.id}</td>
                        <td className="border px-4 py-2">{formatDate(semester.startDate)}</td>
                        <td className="border px-4 py-2">{formatDate(semester.endDate)}</td>
                        <td className="border px-4 py-2">
                            <Link href='asd'>
                                <p className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                                    Manage Semester
                                </p>
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SemesterGetAll;