export default function authHeader() {
    let user = JSON.parse(localStorage.getItem("user"));  // check "user" in Local Storage

    if (user && user.accessToken) {  // when there is a "user" with a JSON Web Token
        return user.accessToken;  // giving a X-Access-Token
    } else {  // when there isn't a "user" with a JSON Web Token
        return {};  // giving an empty object
    }
}
