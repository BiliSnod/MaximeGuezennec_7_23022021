import http from "../http-common";


class DataComment {
    
    create(id, data) {
        return http.post(`/notes/${id}/comments`, data);
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
