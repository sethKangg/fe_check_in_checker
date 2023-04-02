import axios from "axios";
import nProgress from "nprogress";
import { useSelector } from "react-redux";
import { AccessToken } from "../components/Auth/auth";
import { store } from "../redux/store";
nProgress.configure({
   showSpinner: false,
   trickleSpeed: 100,
   color: "#e34234",
});
// const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
const instance = axios.create({
   // baseURL: "http://192.168.1.13:8080/",//hunglocal
   // baseURL: "https://cts-backend.azurewebsites.net/", //SethLocal
   baseURL: "http://192.168.198.16:8080/", //BaoLocal
   // baseURL: "http://172.20.10.4:8080/", //BaoLocalFPT
   withCredentials: false,
   headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "X-Requested-With",
   },
});

// Add a request interceptor
instance.interceptors.request.use(
   function (config) {
      config.headers["Access-Control-Allow-Origin"] = "*";
      config.headers["Content-Type"] = "application/json";
      //get token redux
      const accessToken = store?.getState()?.user?.account?.accessToken;
      //add header
      // console.log(accessToken.length);
      if (accessToken.length > 0) {
         config.headers["Authorization"] = "Bearer " + accessToken;
      }
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
      nProgress.done();
      return error && error.response;
   },
);

export default instance;
