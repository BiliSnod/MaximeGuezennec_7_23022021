import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

/* --- Defining routes for each linked page --- */
const routes = [
  {
    path: '/',
    name: 'Accueil',
    component: Home
  },
  {
    path: '/signup',
    name: 'Inscription',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue')
  },
  {
    path: '/login',
    name: 'Connexion',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
