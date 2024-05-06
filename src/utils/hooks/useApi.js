import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const BASE_URL = process.env.REACT_APP_API_URL;

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const auth = useSelector((state) => state.authReducer.value);

  const fetchData = async (url, method, data = null) => {
    setLoading(true);
    setError(null);
    setStatus(null);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.token}`,
    };

    const config = {
      method,
      url: `${BASE_URL}${url}`,
      headers,
      data:
        data && method.toLowerCase() !== "delete" ? JSON.stringify(data) : {},
    };

    try {
      const response = await axios(config);
      setLoading(false);
      setStatus(response.status);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(
        error.response
          ? error.response.data.error || error.message || "Something went wrong"
          : "Something went wrong"
      );
      setStatus(error.response ? error.response.status : null);
      throw error;
    }
  };

  const get = async (url) => {
    return await fetchData(url, "GET", null);
  };

  const post = async (url, data) => {
    return await fetchData(url, "POST", data);
  };

  const patch = async (url, data) => {
    return await fetchData(url, "PATCH", data);
  };

  const put = async (url, data) => {
    return await fetchData(url, "PUT", data);
  };

  const remove = async (url) => {
    return await fetchData(url, "DELETE", null);
  };

  return { loading, error, status, get, post, patch, remove, put };
};

export default useApi;
