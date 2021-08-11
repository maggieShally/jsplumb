/*
 * @Description:
 * @Date: 2021-06-28 11:40:41
 * @LastEditTime: 2021-08-11 10:01:26
 * @FilePath: \jsplumb-test\src\router\index.js
 */

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/flow',
    name: 'Flow',
    icon: 'icon-apps-line',
    component: () => import('../views/flow/index.vue')
  },
  {
    path: '/d3',
    name: 'D3',
    icon: 'icon-dashboard-line',
    component: () => import('../views/D3/index.vue')
  },
  {
    path: '/scroll',
    name: 'Scroll',
    icon: 'icon-dashboard-line',
    component: () => import('../views/ListScroll/index.vue')
  },
  {
    path: '/dragResize',
    name: 'DragResize',
    icon: 'icon-list-settings-fill',
    component: () => import('../views/dragResize/index.vue')
  },
  {
    path: '/echarts',
    name: 'Echarts',
    icon: 'icon-settings-2-line',
    component: () => import('../views/echarts/index.vue')
  },
  {
    path: '/antV',
    name: 'AntV',
    icon: 'icon-settings-2-line',
    component: () => import('../views/antv/index.vue')
  },
  {
    path: '/canvas',
    name: 'Canvas',
    icon: 'icon-dashboard-line',
    component: () => import('../views/canvas/index.vue'),
    children: [
      {
        path: '/canvas/clock',
        name: 'Clock',
        component: () => import('../views/canvas/clock/index.vue')
      },
      {
        path: '/canvas/guaguaka',
        name: 'Guaguaka',
        component: () => import('../views/canvas/guaguaka/index.vue')
      },
      {
        path: '/canvas/canvasImg',
        name: 'CanvasImg',
        component: () => import('../views/canvas/canvasImg/index.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


// 生成菜单树
export const menuList = counterList(routes)

function counterList(data) {
  return data.map(item => {
    return {
      index: item.path,
      title: item.name,
      icon: item.icon,
      access: item.meta?.access,
      children:
        item.children?.length > 0
          ? counterList(item.children)
          : undefined
    }
  })
}

export default router
