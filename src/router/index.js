import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'app',
      component: () => import('../views/AppView.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
          meta: {
            title: "Home"
          },
        },
        {
          path: 'ordens',
          name: 'ordens',
          component: () => import('../views/OrdensView.vue'),
          meta: {
            title: "Ordens de Serviço"
          },
        },
        {
          path: 'servicos',
          name: 'servicos',
          component: () => import('../views/HomeView.vue'),
          meta: {
            title: "Serviços"
          },
        },
        {
          path: 'automoveis',
          name: 'automoveis',
          component: () => import('../views/HomeView.vue'),
          meta: {
            title: "Automóveis"
          },
        },
        {
          path: 'clientes',
          name: 'clientes',
          component: () => import('../views/HomeView.vue'),
          meta: {
            title: "Clientes"
          },
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
  ],
})

export default router
