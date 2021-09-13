import AuthService from "../services/AuthService";

const user = JSON.parse(localStorage.getItem("user"));  // getting user information from localStorage object
const initialState = user ? { status: { loggedIn: true }, user } : { status: { loggedIn: false }, user: null };  // state to know if user is logged in or not

export const auth = {
    namespaced: true,  // limiting the methods to this module
    state: initialState,
    actions: {
        login({ commit }, user) {
            return AuthService.login(user)
            .then(user => {

                commit("loginSuccess", user);
                return Promise.resolve(user);

            },
            error => {
                commit("loginFailure");
                return Promise.reject(error);
            });
        },
        logout({ commit }) {
            AuthService.logout();
            commit("logout");
        },
        signup({ commit }, user) {
            return AuthService.signup(user)
            .then(response => {
                
                commit("signupSuccess");
                return Promise.resolve(response.data);

            },
            error => {
                commit("signupFailure");
                return Promise.reject(error);
            });
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        signupSuccess(state) {
            state.status.loggedIn = false;
        },
        signupFailure(state) {
            state.status.loggedIn = false;
        }
    }
};
