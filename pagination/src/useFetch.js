import { useState, useEffect } from "react";
import axios from "axios";
import paginate from "./utilis";

const url = "https://api.github.com/users/john-smilga/followers?per_page=100";

export const useFetch = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getProducts = async (url) => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      const { data } = response;
      setData(paginate(data));
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts(url);
  }, [url]);

  return { loading, data };
};
