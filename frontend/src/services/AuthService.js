    import axios from "axios";  // importing Axios package

    const API_URL = "http://localhost:3000/api/auth/";

    class AuthService {
        signup(user) {
            return axios.post(API_URL + "signup", {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                password: user.password
            });
        }
        
        login(user) {
            return axios
            .post(API_URL + "login", {
                email: user.email,
                password: user.password
            })
            .then(response => {

                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

            return response.data;
            });
        }

        logout() {
            localStorage.removeItem("user");
        }

    }

    export default new AuthService();
