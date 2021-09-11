import http from "../http-common";

class DataNote {

    create(data) {
        return http.post("/notes", data);
    }
    /*
    create(data, params) {
        return http.post("/notes", data, { params });  // adding "params" for adding medias
    }
    */
    update(id, data) {
        return http.put(`/notes/${id}`, data);
    }

    delete(id) {
        return http.delete(`/notes/${id}`);
    }

    get(id) {
        return http.get(`/notes/${id}`);
    }
    /*
    getAll(params) {
        return http.get("/notes", { params });
    }
    */
    getAll() {
        return http.get("/notes");
    }
    
}

export default new DataNote();
