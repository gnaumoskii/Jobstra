import { AuthResponse, ErrorResponse } from "../../interfaces/Response";
import {User, UserLogin} from "../../interfaces/User"

export const createUser = async (user: Partial<User>): Promise<User | ErrorResponse> => {

    try {
        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if(!response.ok) {
            const errorData: ErrorResponse = await response.json();
            throw new Error(errorData.message || "An error occured.");
        }
    
        const createdUser: User = await response.json();
        return createdUser; 
    } catch (error) {
        if(error instanceof Error) {
            return {message: error.message};
        }
        return {message: "An error occured."};
    }

}

export const loginUser = async(userLoginData: UserLogin): Promise<AuthResponse | ErrorResponse> => {
    try {
        const response = await fetch("http://localhost:3000/users/login", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(userLoginData)
          });

          if(!response.ok) {
            const errorData: ErrorResponse = await response.json();
            throw new Error(errorData.message || "An error occured.");
          }

          const data = await response.json();
          return data;
    } catch (error) {
        if(error instanceof Error) {
            return {message: error.message};
        }
        return {message: "An error occured."};
    }

}

export const logoutUser = async () => {
    try {
       const response = await fetch("http://localhost:3000/users/logout", {method: "DELETE", credentials: "include"});
       if(!response.ok) {
        throw new Error("An error occured while logging out.");
       }
    } catch (error) {
        console.log(error);
    }
    
}