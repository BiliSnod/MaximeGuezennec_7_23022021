import axios from "axios";  // importing Axios to set HTTP base URL and headers

export default axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-type": "application/json"
    }
});
