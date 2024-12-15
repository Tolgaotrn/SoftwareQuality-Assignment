import { useRouter } from "next/router";
import ViewAssessmentsComponent from "@components/course/ViewAssessmentsComponent";

const CourseDetails: React.FC = () => {
    const router = useRouter();
    const { courseId } = router.query; // Extract courseId from the URL

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Course Assessments</h1>
            {courseId ? (
                <ViewAssessmentsComponent courseId={Number(courseId)} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default CourseDetails;