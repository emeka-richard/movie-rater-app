import { createRouter, createWebHistory } from 'vue-router'
import HeroPage from "@/views/HeroPage.vue"
import Dashboard from "@/views/Dashboard.vue"
import Register from "@/views/Register.vue"
import Login from "@/views/Login.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "hero-page",
      component: HeroPage,
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true}
    },
    {
      path: '/register',
      name: 'register',
      component:  Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ]
})

router.beforeEach((to, from, next)=>{
  const loggedIn = localStorage.getItem("user")

  if(to.matched.some(record => record.meta.requiresAuth) && !loggedIn){
    next("/")
  } else {
    next()
  }
})

export default router