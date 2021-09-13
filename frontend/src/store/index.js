import { createStore } from "vuex";  // importing createStore function from Vuex 
import { auth } from "./auth";  // importing "auth" state


const store = createStore({
    modules: {
        auth  // creating global store with "auth" state
    },
});


export default store;
