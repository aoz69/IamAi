import { useState, useEffect } from 'react';

export default function useFetchData(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then(data => {
        setData(data);
        // console.log(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        return res.json({"Error" : "Network response was not ok"})
      });
  }, [url]);

  return data;
} 