import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url, method = 'GET', body = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (method === 'GET') {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(url);
          setData(response.data);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [url, method]);

  const setDataWrapper = async (newData) => {
    setLoading(true);
    try {
      const response = await axios({
        url,
        method,
        data: newData,
      });
      setData(response.data);
    } catch (err) {
      setError(err);
      throw err; // Re-lanzar el error para manejarlo en el componente
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, setData: setDataWrapper };
};

export default useFetch;