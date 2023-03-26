import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    // meta: {
    //   requiresAuth: true
    // }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginForm.vue')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../views/SignUpForm.vue')
  },
  {
    path: '/emailConfirm',
    name: 'EmailConfirm',
    component: () => import('../views/ConfirmEmail.vue'),
    props: route => ({ token: route.query.token })
  },
  {
    path: '/reader/:id/:num',
    name: 'Reader',
    component: () => import('../views/ReaderView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
