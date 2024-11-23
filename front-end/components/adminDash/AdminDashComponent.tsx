import Link from "next/link";

const AdminDashComponent: React.FC = () => {

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link href="/semester">
                    <div className="bg-blue-600 p-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
                        <p className="text-white text-xl font-semibold text-center">Add Semester</p>
                    </div>
                </Link>
                <Link href="/semester/getSemester_index">
                    <div className="bg-blue-600 p-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
                        <p className="text-white text-xl font-semibold text-center">All Semesters</p>
                    </div>
                </Link>
                <Link href="/room">
                    <div className="bg-blue-600 p-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
                        <p className="text-white text-xl font-semibold text-center">Manage Room</p>
                    </div>
                </Link>
                <Link href="/addCourse">
                    <div className="bg-blue-600 p-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
                        <p className="text-white text-xl font-semibold text-center">Add Course</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default AdminDashComponent;
