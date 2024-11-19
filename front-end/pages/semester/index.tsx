// pages/index.tsx
import Header from "@components/header";
import React from "react";
import SemesterManagement from "../../components/semester/SemesterManagment";
import Head from "next/head";
import SemesterManagment from "../../components/semester/SemesterManagment";
const semester: React.FC = () => {
    return (
        <>
            <Head>
                <title>Semester</title>
            </Head>
            <Header />
            <main>
                <section className="flex flex-col justify-center">
                    < SemesterManagement/>
                </section>
            </main>
        </>
    )
}

export default semester;
