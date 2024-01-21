import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layouts/AppLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import HeroPage from '@/views/HeroPage.vue';
const Dashboard = ()=> import('@/views/Dashboard.vue')
// import Dashboard from '@/views/Dashboard.vue';
const Register = ()=> import('@/views/Register.vue')
// import Register from '@/views/Register.vue';
const Login = ()=> import('@/views/Login.vue')
// import Login from '@/views/Login.vue';
// import MovieList from '@/views/MovieList.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition){
    if(to.hash){
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    if(savedPosition){
        return {
          savedPosition,
          behavior: 'smooth'
        }
    }
    return { top: 0, behavior: 'smooth'}
  },
  routes: [
    {
      path: '/',
      name: 'app-layout',
      component: AppLayout,
      children: [
        {
          path: '',
          name: 'hero-page',
          component: HeroPage,
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: Dashboard,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/auth',
      name: 'auth-layout',
      component: AuthLayout,
      redirect: { name: 'login'},
      children: [
        {
          path: '/login',
          name: 'login',
          component: Login,
        },
        {
          path: '/register',
          name: 'register',
          component: Register,
        },
        {
          path: 'reset',
          name: 'reset',
          component: Register,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user');

  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next('/');
  } else {
    next();
  }
});

export default router;
