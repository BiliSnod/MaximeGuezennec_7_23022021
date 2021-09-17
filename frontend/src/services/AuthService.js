import axios from "axios";  // importing Axios package

const apiPath = "http://localhost:3000/api/auth/";  // locating API's URL for authentication


class AuthService {
    signup(user) {  // defining the object to create on sign up
        return axios.post(apiPath + "signup", {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password
        });
    }
    
    login(user) {  // defining the structure of the object to create on log in
        return axios.post(apiPath + "login", {
            email: user.email,
            password: user.password
        })
        .then(response => {

            if (response.data.accessToken) {  // if the token is present, registering user's info object to localStorage
                localStorage.setItem("user", JSON.stringify(response.data));
                
            }

        return response.data;
        });
    }

    logout() {
        localStorage.removeItem("user");  // deleting the user info object on log out
    }

}


export default new AuthService();
