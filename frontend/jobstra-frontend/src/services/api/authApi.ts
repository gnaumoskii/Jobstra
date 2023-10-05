export const refreshAccessToken = async () => {
    // Send a request to your server's /refresh-token endpoint
    try {
      const response = await fetch('http://localhost:3000/auth/token', {
        credentials: "include",
      });
      const data = await response.json();
      return {isAuthorized: data.isAuthorized, username: data.username};
    } catch (error) {
      return {isAuthorized: false};
    }
  }