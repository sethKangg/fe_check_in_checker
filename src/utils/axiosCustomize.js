import axios from "axios";
import nProgress from "nprogress";
import { useSelector } from "react-redux";
import { AccessToken } from "../components/Auth/auth";

nProgress.configure({
   showSpinner: false,
   trickleSpeed: 100,
   color: "#e34234",
});
// const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
const instance = axios.create({
   // baseURL: "http://192.168.1.13:8080/",//hunglocal
   baseURL: "https://cts-backend-v1.azurewebsites.net/", //SethLocal
   withCredentials: false,
   headers: {
      "Content-Type": "application/json",
      // Authorization: AccessToken() ? `Bearer ${AccessToken()}` : "",
   },
});

// Add a request interceptor
instance.interceptors.request.use(
   function (config) {
      nProgress.start();
      // Do something before request is sent
      return config;
   },
   function (error) {
      // Do something with request error
      return Promise.reject(error);
   },
);

// Add a response interceptor
instance.interceptors.response.use(
   function (response) {
      nProgress.done();
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
   },
   function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return error && error.response;
   },
);

export default instance;
