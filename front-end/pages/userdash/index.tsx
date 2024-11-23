import React from "react";
import Head from "next/head";
import Header from "@components/header";
import UserDashComponent from "@components/userDash/UserDashComponent";

const AdminDash: React.FC = () => {
    return (
        <>
            <Head>
                <title>AdminDash</title>
            </Head>
            <Header />
            <main>
                <section className="flex flex-col justify-center">
                    < UserDashComponent/>
                </section>
            </main>
        </>
    )
}

export default AdminDash;