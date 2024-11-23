import Header from "@components/header";
import React from "react";
import Head from "next/head";
import AddCourseComponent from "@components/course/AddCourseCompoenent";
const AddCourse: React.FC = () => {
    return (
        <>
            <Head>
                <title>Add Course</title>
            </Head>
            <Header />
            <main>
                <section className="flex flex-col justify-center">
                    < AddCourseComponent/>
                </section>
            </main>
        </>
    )
}

export default AddCourse;