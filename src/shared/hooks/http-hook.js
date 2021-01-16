import {useState, useCallback, useRef, useEffect} from 'react';

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

      // Clear this request now it is complete
      activeHttpRequests.current = activeHttpRequests.current.filter(
          reqCtrl => reqCtrl !== httpAbortCtrl
      )

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setIsLoading(false);
      return responseData;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      throw err; // Pause execution to give hint to component(s) using this hook
    }
  }, [
    //No dependencies
  ]);

  const clearError = () => {
    setError(null)
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
    clearError
  };
};
