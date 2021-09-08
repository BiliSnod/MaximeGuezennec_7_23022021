import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"


/* --- Defining routes for each linked page [o] --- */
const routes = [
    {
        path: "/",
        name: "accueil",
        component: Home
    },
    {
        path: "/signup",
        name: "inscription",
        component: () => import(/* webpackChunkName: "signup" */ "../views/Signup.vue")
    },
    {
        path: "/login",
        name: "connexion",
        component: () => import(/* webpackChunkName: "login" */ "../views/Login.vue")
    },

    {
        path: "/notes",  // "/",
        // alias: "/notes",
        name: "notes",
        component: () => import("../components/AllNotes")
    },
    {
        path: "/notes/:id",
        name: "note",
        component: () => import("../components/ViewNote")
    },
    {
        path: "/new",
        name: "new-note",
        component: () => import("../components/NewNote")
    }

];
/* --- Defining routes for each linked page [x] --- */


const router = createRouter({  // switching from hash mode to history mode inside browser with HTML5 "History API"
history: createWebHistory(),  // (process.env.BASE_URL),
routes
})

export default router
