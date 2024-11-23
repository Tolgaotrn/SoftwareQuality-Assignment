import Header from "@components/header";
import React from "react";
import Head from "next/head";
import ManageRoom from "@components/room/ManageRoom";

const ManageRoomsPage: React.FC = () => {
    return (
        <>
            <Head>
                <title>Manage Rooms</title>
            </Head>
            <Header />
            <main>
                <section className="flex flex-col justify-center">
                    < ManageRoom/>
                </section>
            </main>
        </>
    )
}

export default ManageRoomsPage;