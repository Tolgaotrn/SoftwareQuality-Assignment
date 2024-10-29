import Header from "@components/header"
import { User } from "@types"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Head from "next/head"
import { useEffect, useState } from "react"

const Coaches: React.FC = () => {

    const [loggedInUser, setLoggedInUser] = useState<User>(null)

    useEffect(() => {
        setLoggedInUser(JSON.parse(sessionStorage.getItem("user")))
      }, [])
    

    return (
        <>
            <Head>
                <title>Coaches</title>
            </Head>
            <Header />
            <main className="p-6 min-h-screen flex flex-col items-center">
                <h1>Coaches</h1>
                    {loggedInUser?.role !== "coach" && (
                        <div className="text-red-800">Only coaches can see the overview of all coaches</div>
                    )}
                    {loggedInUser?.role === 'coach'  && (
                        <section className="mt-5">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Level</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Johan Pieck</td>
                                        <td>1</td>
                                    </tr>
                                    <tr>
                                        <td>Tiebe Van Nieuwenhove</td>
                                        <td>2</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    )}
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
    
export default Coaches