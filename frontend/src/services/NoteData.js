import http from "../http-common";

class NoteData {

    create(data) {
        return http.post("/notes", data);
    }
/*
    create(id) {
        return http.post(`/notes/${id}/comments`);
    }
*/

    update(id, data) {
        return http.put(`/notes/${id}`, data);
    }

/*
    update(id, data) {
        return http.put(`/notes/comments/${id}`, data);
    }
*/

    delete(id) {
        return http.delete(`/notes/${id}`);
    }
/*
    delete(id) {
        return http.delete(`/notes/comments/${id}`);
    }
*/
    get(id) {
        return http.get(`/notes/${id}`);
    }
/*

    get(id) {
        return http.get(`/notes/comments/${id}`);
    }
*/

    getAll(params) {
        return http.get("/notes", { params });
    }
}

export default new NoteData();
