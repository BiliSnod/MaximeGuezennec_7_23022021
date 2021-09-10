import http from "../http-common";

class DataComment {
    
    create(id) {
        return http.post(`/notes/${id}/comments`);
    }
    
    update(id, data) {
        return http.put(`/notes/comments/${id}`, data);
    }
    
    delete(id) {
        return http.delete(`/notes/comments/${id}`);
    }
    
    get(id) {
        return http.get(`/notes/comments/${id}`);
    }
    
    getAll(id) {
        return http.get(`/notes/${id}/comments`);
    }
    
}

export default new DataComment();
