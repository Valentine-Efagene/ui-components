import { useEffect, useState } from 'react';

/**
 *
 * @param {string} url
 * @returns {any} data
 *
 * @reference
 * https://www.w3schools.com/react/react_customhooks.asp
 */
const useFetch = url => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setData(data));
  }, [url]);

  return data;
};

export default useFetch;
