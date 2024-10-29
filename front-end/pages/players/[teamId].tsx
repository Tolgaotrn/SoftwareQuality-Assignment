import Header from "@components/header"
import PlayerOverview from "@components/players/PlayerOverview";
import PlayerService from "@services/PlayerService";
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import { useEffect, useState } from "react";

const Players: React.FC = () => {
    

    return (
        <>
          <Head>
            <title>Teams</title>
          </Head>
          <Header />
          <main className="p-6 min-h-screen flex flex-col items-center">
            <h1>Players</h1>
              <section>
                <PlayerOverview />
              </section>
          </main>
        </>
    )    
}

export const getServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  }
}

export default Players