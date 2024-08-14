import { useEffect, useState } from "react";

export const FetchData = (apiCall, handleError, name) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = () => {
      apiCall().then((res) => {
        const message = res.message;
        if (res.success) {
          setData(res.data);
        } else {
          handleError(name, message);
          setError(message);
          console.error(`Error fetching ${name}:`, message);
        }
      });
    };

    if (!data.length) fetchData();
  }, [apiCall, handleError, name, data]);

  return { data, error };
};
