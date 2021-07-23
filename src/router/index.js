/*
 * @Description:
 * @Date: 2021-06-28 11:40:41
 * @LastEditTime: 2021-07-21 15:52:19
 * @FilePath: \jsplumb-test\src\router\index.js
 */

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/flow',
    name: 'flow',
    component: () => import('../views/flow/index.vue')
  },
  {
    path: '/d3',
    name: 'd3',
    component: () => import('../views/D3/index.vue')
  },
  {
    path: '/scroll',
    name: 'scroll',
    component: () => import('../views/ListScroll/index.vue')
  },
  {
    path: '/canvas',
    name: 'canvas',
    component: () => import('../views/canvas/index.vue'),
    children: [
      {
        path: '/canvas/clock',
        name: 'clock',
        component: () => import('../views/canvas/clock/index.vue')
      },
      {
        path: '/canvas/guaguaka',
        name: 'guaguaka',
        component: () => import('../views/canvas/guaguaka/index.vue')
      },
      {
        path: '/canvas/canvasImg',
        name: 'canvasImg',
        component: () => import('../views/canvas/canvasImg/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
