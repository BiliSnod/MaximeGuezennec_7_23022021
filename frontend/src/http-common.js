import axios from "axios";  // importing Axios to set HTTP base URL and headers
import authHeader from "./services/AuthHeader";  // calling authHeader function for token


/* --- Configuring headers defaults for Axios [o] --- */
    const http = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-type": "application/json",
        "X-Access-Token": authHeader()
    }
});
/* --- Configuring headers defaults for Axios [x] --- */


/* --- Configuring interceptor to redefine token in headers [o] --- */
http.CancelToken = axios.CancelToken;
http.isCancel = axios.isCancel;


http.interceptors.request.use((config) => {  // checking every time a request is made

    let token = localStorage.getItem("user.accessToken");  // checking token in localStorage

    if (!token) {
        config.headers["X-Access-Token"] = authHeader();  // adding the token to headers
    }

    return config;

},
(error) => {
    return Promise.reject(error)
});
/* --- Configuring interceptor to redefine token in headers [x] --- */


export default http;
