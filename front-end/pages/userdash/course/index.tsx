// pages/index.tsx
import Header from "@components/header";
import React from "react";
import Head from "next/head";
import CourseComponent from "@components/course/CourseComponentUser";
const semester: React.FC = () => {
    return (
        <>
            <Head>
                <title>Course</title>
            </Head>
            <Header />
            <main>
                <section className="flex flex-col justify-center">
                    < CourseComponent/>
                </section>
            </main>
        </>
    )
}

export default semester;
