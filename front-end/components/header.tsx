import UserService from "@services/UserService"
import { User } from "@types"
import { log } from "console"
import Link from "next/link"
import { useEffect, useState } from "react"

const Header: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User>(null)
  

  useEffect(() => {
    setLoggedInUser(JSON.parse(sessionStorage.getItem("user")))
  }, [])

  const handleClick = () => {
    sessionStorage.removeItem("user")
    setLoggedInUser(null)
  }

  
  return (
    <header className="p-3 mb-3 border-bottom bg-gradient-to-br from-gray-900 to-gray-600 flex flex-col items-center">
      <a className="flex  mb-2 md:mb-5 text-white-50 text-3xl text-gray-300">
        Assement Map Managment
      </a>
      <nav className="items-center flex md:flex-row flex-col">
        <Link
          href="/"
          className=" px-4 text-xl text-white  hover:bg-gray-600 rounded-lg"
        >
          Home
        </Link>
        {loggedInUser?.role == 'coordinator' && (
          <Link
            href="/userdash"
            className="px-4  text-white text-xl hover:bg-gray-600 rounded-lg"
          >
            Dashboard
          </Link>
        )}
        {loggedInUser?.role == 'admin' && (
        <Link
          href="/admindash"
          className="px-4  text-white text-xl hover:bg-gray-600 rounded-lg"
        >
          Dashboard
        </Link>
        )}
        {!loggedInUser && (
          <Link
            href="/login"
            className="px-4  text-white text-xl hover:bg-gray-600 rounded-lg"
          >
                Login
          </Link>
        )}
        {loggedInUser && (
          <a
            href="/login"
            onClick={handleClick}
            className="px-4  text-white text-xl hover:bg-gray-600 rounded-lg"
          >
            Logout
          </a>
        )}
        {loggedInUser && (
          <div className="text-white ms-5 mt-2 md:mt-0 pt-1 md:pt-0 grow">
            welcome, {loggedInUser.lastName}!
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
