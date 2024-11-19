import Link from "next/link";

const AdminDashComponent: React.FC = () => {

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link href="/semester">
                    <div className="bg-blue-600 p-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
                        <p className="text-white text-xl font-semibold text-center">Manage Semesters</p>
                    </div>
                </Link>
                {/* Add more admin functionalities here */}
                <Link href="/users">
                    <div className="bg-blue-600 p-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
                        <p className="text-white text-xl font-semibold text-center">Manage Users</p>
                    </div>
                </Link>
                <Link href="/reports">
                    <div className="bg-blue-600 p-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
                        <p className="text-white text-xl font-semibold text-center">View Reports</p>
                    </div>
                </Link>
                {/* Continue adding additional admin functionalities here */}
            </div>
        </div>
    );
};

export default AdminDashComponent;
