import http from "../http-common";


class DataNote {

    create(data) {
        return http.post("/notes", data);
    }
    update(id, data) {
        return http.put(`/notes/${id}`, data);
    }

    delete(id) {
        return http.delete(`/notes/${id}`);
    }

    get(id) {
        return http.get(`/notes/${id}`);
    }
    getAll() {
        return http.get("/notes");
    }
    
}


export default new DataNote();
