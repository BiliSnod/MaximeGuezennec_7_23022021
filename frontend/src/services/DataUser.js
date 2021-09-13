import http from "../http-common";


class DataUser {
    
    delete(id) {
        return http.delete(`/auth/users/${id}`);
    }
    
    get(id) {
        return http.get(`/auth/users/${id}`);
    }

    getAll() {
        return http.get("/auth/users");
    }
    
}


export default new DataUser();
