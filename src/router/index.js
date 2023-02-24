import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/admin',
    component: () => import('../views/DashBoardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/ProductsView.vue')
      },
      {
        path: 'posts',
        component: () => import('../views/PostsView.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/OrdersView.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/CouponsView.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('../views/FrontLayout.vue'),
    children: [
      {
        path: 'login',
        component: () => import('../views/LoginView.vue')
      },
      {
        path: 'blog',
        component: () => import('../views/BlogView.vue')
      },
      {
        path: 'post/:id',
        component: () => import('../views/PostView.vue')
      },
      {
        path: 'carts',
        component: () => import('../views/CartsView.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/ProductView.vue')
      },
      {
        path: 'checkout/:id',
        component: () => import('../views/UserCheckout.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
