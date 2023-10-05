import User from "../../interfaces/User"

export const createUser = async (user: Partial<User>): Promise<User> => {
    const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    const createdUser: User = await response.json();
    return createdUser;
}

export const logoutUser = async () => {
    await fetch("http://localhost:3000/users/logout", {method: "DELETE", credentials: "include"});

}