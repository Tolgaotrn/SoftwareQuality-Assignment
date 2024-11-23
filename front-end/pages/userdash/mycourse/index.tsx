// pages/index.tsx
import Header from "@components/header";
import React from "react";
import Head from "next/head";
import MyCoursesComponent from "@components/course/MyCoursesComponent";
const mycourse: React.FC = () => {
    return (
        <>
            <Head>
                <title>Course</title>
            </Head>
            <Header />
            <main>
                <section className="flex flex-col justify-center">
                    < MyCoursesComponent/>
                </section>
            </main>
        </>
    )
}

export default mycourse;
