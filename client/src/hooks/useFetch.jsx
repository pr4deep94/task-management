import { useState } from "react";
import { useCallback } from "react"
import { toast } from "react-toastify";
import api from "../api";

const useFetch = () => {
  const [state, setState] = useState({
    loading: false
  })
  const fetchData = useCallback(async (config, options) => {
    setState({
      loading: true
    })
    const { showSuccessToast = true, showErrorToast = true } = options || {};
    try {
      const { data } = await api.request(config);
      if (showSuccessToast) toast.success(data.msg);
      return Promise.resolve(data);
    }
    catch (error) {
      const msg = error.response?.data?.msg || error.message || "error";

      if (showErrorToast) toast.error(msg);
      return Promise.reject();
    } finally {
      setState({
        loading: false
      })
    }
  }, []);

  return [fetchData, state];
}

export default useFetch