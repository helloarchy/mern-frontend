export {useState, useCallback, useRef, useEffect} from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  /**
   * DRY send request function
   * useCallback to avoid infinite loops, avoid recreating
   */
  const sendRequest = useCallback(async (
      url,
      method = 'GET',
      body = null,
      headers = {},
  ) => {
    setIsLoading(true);

    // Abort request if user changes page
    const httpAbortCtrl = new AbortController(); // Supported by modern browsers
    activeHttpRequests.current.push(httpAbortCtrl)

    try {
      const response = await fetch(url, {
        method,
        headers,
        body,
        signal: httpAbortCtrl.signal // Link abort controller and request
      });
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      return responseData;
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [
    //No dependencies
  ]);

  const clearError = () => {
    setError(false)
  }

  useEffect(() => {
    // Function run before next, but also on cleanup
    return () => {
      activeHttpRequests.current.forEach(abortCtrl => {
        return abortCtrl.abort()
      })
    }
  }, [
      // Deps
  ]);

  return {
    isLoading,
    error,
    sendRequest,
  };
};
