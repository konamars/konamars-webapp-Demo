import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "../App";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(async (request) => {
  let accessToken;
  if (getToken !== null) {
    try {
      accessToken = await getToken({
        audience: import.meta.env.VITE_AUTH0_API_AUDIENCE,
      });
    } catch (error) {
      console.error(error);
      toast("Something went wrong, please try later.");
    }
  }

  if (request.headers) {
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  } else {
    request.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  return request;
});

export default axiosInstance;
