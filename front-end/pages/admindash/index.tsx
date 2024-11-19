import React from "react";
import Head from "next/head";
import Header from "@components/header";
import AdminDashComponent from "@components/adminDash/AdminDashComponent";

const AdminDash: React.FC = () => {
    return (
        <>
            <Head>
                <title>AdminDash</title>
            </Head>
            <Header />
            <main>
                <section className="flex flex-col justify-center">
                    < AdminDashComponent/>
                </section>
            </main>
        </>
    )
}

export default AdminDash;