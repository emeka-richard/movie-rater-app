import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layouts/AppLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import HeroPage from '@/views/HeroPage.vue';
import Dashboard from '@/views/Dashboard.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
// import MovieList from '@/views/MovieList.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
          // meta: { requiresAuth: true },
          // children: [
          //   {
          //     path: '',
          //     name: 'views',
          //     component: MovieList,
          //   }
          // ]
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
