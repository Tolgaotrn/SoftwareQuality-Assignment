import { User } from "@types"

const loginUser = (user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
}

const getUserByUsername= async (username: string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/" + username, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    return response.json();

}




const UserService = {
    loginUser,
    getUserByUsername
}

export default UserService
