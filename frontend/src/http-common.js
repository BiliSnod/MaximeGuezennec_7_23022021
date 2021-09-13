import axios from "axios";  // importing Axios to set HTTP base URL and headers
import authHeader from "./services/AuthHeader";  // calling authHeader function for token


/* --- Configuring headers defaults for Axios [o] --- */
export default axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-type": "application/json",
        "X-Access-Token": authHeader()
        //"Authorization": `Bearer ${authHeader}`
    }
});
/* --- Configuring headers defaults for Axios [x] --- */
