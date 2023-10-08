import { useState } from "react";

const useLoading = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({hasError: false, message: ""});
  return {loading, setLoading, error, setError};
}

export default useLoading