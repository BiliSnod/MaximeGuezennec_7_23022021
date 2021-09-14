import { createRouter, createWebHistory } from "vue-router"  // importing "vue-router" package

import Welcome from "../views/Welcome.vue"
import UserSignup from "../components/UserSignup.vue";
import UserLogin from "../components/UserLogin.vue";
import UserProfile from "../components/UserProfile.vue";
import NotesAll from "../components/NotesAll.vue";
import NoteView from "../components/NoteView.vue";
import CommentView from "../components/CommentView.vue";
import NoteNew from "../components/NoteNew.vue";


/* --- Defining routes for each linked page [o] --- */
const routes = [

    {
        path: "/",
        name: "welcome",
        component: Welcome,
    },
    {
        path: "/signup",
        name: "signup",
        component: UserSignup,
    },
    {
        path: "/login",
        name: "login",
        component: UserLogin,
    },
    {
        path: "/profile",
        name: "profile",
        component: UserProfile,
    },
    {
        path: "/notes",
        name: "notes",
        component: NotesAll,
    },
    {
        path: "/notes/:id",
        name: "note",
        component: NoteView,
    },
    {
        path: "/notes/comments/:id",
        name: "comment",
        component: CommentView,
    },
    {
        path: "/new",
        name: "new",
        component: NoteNew,
    }

];
/* --- Defining routes for each linked page [x] --- */


const router = createRouter({ history: createWebHistory(), routes });  // switching from hash mode to history mode inside browser with HTML5 "History API"
router.beforeEach((to, from, next) => {
    
    const noAuthPages = ["/", "/signup", "/login"];  // excluding free access pages
    const authPages = !noAuthPages.includes(to.path);  // defining pages requiring authentication
    const loggedIn = localStorage.getItem('user');  // defined as logged in if a "user" object is in localStorage
 
    if (authPages && !loggedIn) {
        next('/login');  // redirect to login page
    } else {
        next();
    }

});


export default router;
