import { useState } from "react";

const useLoading = () => {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  return {loading, setLoading, hasError, setHasError};
}

export default useLoading