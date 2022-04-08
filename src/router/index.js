/*
 * @Description:
 * @Date: 2021-06-28 11:40:41
 * @LastEditTime: 2022-04-02 10:39:00
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\router\index.js
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
  // {
  //   path: '/dragResize',
  //   name: 'DragResize',
  //   icon: 'icon-list-settings-fill',
  //   component: () => import('../views/dragResize/drag/index.vue')
  // },
  {
    path: '/dragResize',
    name: 'DragResize',
    icon: 'icon-list-settings-fill',
    redirect: '/dragResize/drag',
    component: () => import('../views/dragResize/index.vue'),
    children: [
      {
        path: '/dragResize/drag',
        name: 'dragResize',
        component: () => import('../views/dragResize/drag/index.vue')
      },
      {
        path: '/dragResize/JsDrag',
        name: '拖拽布局',
        component: () => import('../views/dragResize/JsDrag/index.vue')
      },
      {
        path: '/dragResize/posDrag',
        name: 'posDrag',
        component: () => import('../views/dragResize/posDrag/index.vue')
      }
    ]
  },

  {
    path: '/echarts',
    name: 'Echarts',
    icon: 'icon-settings-2-line',
    component: () => import('../views/echarts/index.vue'),
    children: [
      {
        path: '/echarts/list',
        name: 'echarts',
        component: () => import('../views/echarts/scatter/index.vue')
      },
      {
        path: '/echarts/barChart',
        name: 'barChart',
        component: () => import('../views/echarts/barChart/index.vue')
      },
    ]
  },
  {
    path: '/gatt',
    name: 'gatt',
    icon: 'icon-settings-2-line',
    redirect: '/gatt/VGT',
    component: () => import('../views/gantt/index.vue'),
    children: [
      // {
      //   path: '/gatt/GSTC',
      //   name: 'GSTC',
      //   component: () => import('../views/gantt/GSTC/index.vue')
      // },
      {
        path: '/gatt/VGT',
        name: 'VGT',
        component: () => import('../views/gantt/VGT/index.vue')
      }
    ]
  },
  {
    path: '/antV',
    name: 'AntV',
    icon: 'icon-settings-2-line',
    component: () => import('../views/antv/index.vue'),
    children: [
      {
        path: '/antv/autoChart',
        name: 'AutoChart',
        component: () => import('../views/antv/AutoChart/index.vue')
      },
      {
        path: '/antV/x6',
        name: 'x6TreeChart',
        component: () => import('../views/antv/x6/index.vue')
      },
      {
        path: '/antV/x6Flow',
        name: 'x6Flow',
        component: () => import('../views/antv/x6Flow/index.vue')
      },
      {
        path: '/antV/x6Tree',
        name: 'x6Tree',
        component: () => import('../views/antv/x6Tree/index.vue')
      }
    ]
  },
  {
    path: '/word-cloud',
    name: 'wordCloud',
    icon: 'icon-settings-2-line',
    component: () => import('../views/wordCloud/index.vue')
  },
  {
    path: '/canvas',
    name: 'Canvas',
    icon: 'icon-dashboard-line',
    redirect: '/canvas/clock',
    component: () => import('../views/canvas/index.vue'),
    children: [
      {
        path: '/canvas/vertify',
        name: 'vertify',
        component: () => import('../views/canvas/vertify/index.vue')
      },
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
        item.children?.length > 0 ? counterList(item.children) : undefined
    }
  })
}

export default router
