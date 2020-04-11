import axios from "axios";
import { CORE } from "../constants";
import store from "store";

const instance = axios.create({
  baseURL: CORE.SERVER,
});

instance.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = "Bearer " + store.get("token", "");
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;
