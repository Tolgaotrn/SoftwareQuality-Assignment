// pages/index.tsx
import Header from "@components/header";
import React from "react";
import Head from "next/head";
import SemesterGetAll from "@components/semester/SemesterGetAll";
const semester: React.FC = () => {
    return (
        <>
            <Head>
                <title>All Semesters</title>
            </Head>
            <Header />
            <main>
                <section className="flex flex-col justify-center">
                    < SemesterGetAll/>
                </section>
            </main>
        </>
    )
}

export default semester;
