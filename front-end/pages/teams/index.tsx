import Head from "next/head"
import Header from "@components/header"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import TeamsOverview from "@components/teams/TeamsOverview"

const Teams: React.FC = () => {

  return (
    <>
      <Head>
        <title>Teams</title>
      </Head>
      <Header />
      <main className="p-6 min-h-screen flex flex-col items-center">
        <h1>
          Teams        
        </h1>
        <TeamsOverview />
        <>
        </>
      </main>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  }
}

export default Teams
