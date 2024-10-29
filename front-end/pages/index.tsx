import Head from "next/head"
import Image from "next/image"
import Header from "@components/header"
import styles from "@styles/home.module.css"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

const Home: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>{t("app.title")}</title>
        <meta name="description" content="Exam app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <main className="text-center md:mt-24 mx-auto md:w-3/5 lg:w-1/2">
        <span className="flex flex-row justify-center items-center">
          <Image
            src="/../public/images/courses.png"
            alt="Courses Logo"
            className={styles.vercelLogo}
            width={50}
            height={50}
          />
          <h1 className="pl-6 text-4xl text-gray-800">{t("home.title")}</h1>
        </span>

        <div className="mt-6">
          <p>{t("home.description")}</p>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  }
}

export default Home
