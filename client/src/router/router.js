import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layouts/AppLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import HeroPage from '@/views/HeroPage.vue';
const Dashboard = ()=> import('@/views/Dashboard.vue')
const Register = ()=> import('@/views/Register.vue')
const Login = ()=> import('@/views/Login.vue')
const Resetpassword = ()=> import('@/views/Resetpassword.vue')

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
      path: '/auth/',
      name: 'auth-layout',
      component: AuthLayout,
      redirect: { name: 'login'},
      children: [
        // {
        //   path:'',
        //   name: 'reset',
        //   component: ResetPassword
        // },
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
          path: '/reset',
          name: 'reset',
          component: Resetpassword,
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
