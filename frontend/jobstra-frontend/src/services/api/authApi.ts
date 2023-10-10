import { AuthResponse, ErrorResponse } from "../../interfaces/Response";

export const refreshAccessToken = async (): Promise<AuthResponse | ErrorResponse> => {
    // Send a request to your server's /refresh-token endpoint
    try {
      const response = await fetch('http://localhost:3000/auth/token', {
        credentials: "include",
      });

      if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message)
      }
      
      const data = await response.json();
      return {username: data.username};
    } catch (error) {
      if(error instanceof Error) {
        return {message: error.message == "Failed to fetch" ? "An error occured." : error.message};
    }
    throw new Error("An error occured.");
    }
  }