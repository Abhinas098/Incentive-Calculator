import { useCallback } from "react";

const useApi = () => {
  const fetchData = useCallback(async (url, method, Values) => {
    try {
      const res = await fetch(url, {
        method: method,
        body: JSON.stringify(Values),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        throw new Error(res.statusText);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }, []);

  return { fetchData };
};

export default useApi;
