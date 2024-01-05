/*
 * @Description:
 * @Date: 2021-06-28 11:40:41
 * @LastEditTime: 2023-12-01 11:30:48
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\router\index.js
 */

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/d3',
    redirect: '/dataBases',
    component: () => import('../views/index.vue'),
    children: [
      {
        path: '/flow',
        name: 'Flow',
        redirect: '/flow',
        icon: 'icon-apps-line',
        component: () => import('../views/flow/index.vue'),
        children: [
          {
            path: '/flow/jsplumb',
            name: 'jsplumb',
            component: () => import('../views/flow/jsplumb/index.vue')
          },
        ]
      },
      {
        path: '/others',
        name: 'others',
        icon: 'icon-dashboard-line',
        component: () => import('../views/others/index.vue'),
        children: [
          {
            path: '/others/formula',
            name: '公式',
            component: () => import('../views/others/formula/index.vue')
            // component: () => import('../views/flow/index.vue')
          },
          {
            path: '/others/nodeItem',
            name: 'nodeItem',
            component: () => import('../views/others/nodeItem/index.vue')
          },
          {
            path: '/others/linkage',
            name: 'linkage',
            component: () => import('../views/others/linkage/index.vue')
          },
          {
            path: '/others/tailwindcss',
            name: 'tailwindcss',
            component: () => import('../views/others/tailwindcss/index.vue')
          }
        ]
      },
      {
        path: '/d3',
        name: 'D3',
        icon: 'icon-dashboard-line',
        component: () => import('../views/D3/index.vue'),
        children: [
          {
            path: '/d3/chart',
            name: 'D3Chart',
            component: () => import('../views/D3/chart/index.vue')
          },
          {
            path: '/d3/table',
            name: 'D3Table',
            component: () => import('../views/D3/table/index.vue')
          },
          // {
          //   path: '/d3/gantt',
          //   name: 'D3Gantt',
          //   component: () => import('../views/D3/gantt/index.vue')
          // },
          {
            path: '/d3/combineChart',
            name: 'combineChart',
            component: () => import('../views/D3/combineChart/index.vue')
          }
        ]
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
            path: '/echarts/tableLine',
            name: '表格连线',
            component: () => import('../views/echarts/tableLine/index.vue')
          },
          {
            path: '/echarts/sankeyChart',
            name: '桑基图',
            component: () => import('../views/echarts/sankeyChart/index.vue')
          },
          {
            path: '/echarts/ganttChart',
            name: '甘特图',
            component: () => import('../views/echarts/ganttChart/index.vue')
          }
        ]
      },
      {
        path: '/gatt',
        name: 'gatt',
        icon: 'icon-settings-2-line',
        redirect: '/gatt/VGT',
        component: () => import('../views/gantt/index.vue'),
        children: [
          {
            path: '/gatt/GSTC',
            name: 'GSTC',
            component: () => import('../views/gantt/GSTC/index.vue')
          },
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
            path: '/antv/routerPath',
            name: 'RouterPath',
            component: () => import('../views/antv/routerPath/index.vue')
          },
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
          },
          {
            path: '/antV/nodeTree',
            name: 'nodeTree',
            component: () => import('../views/antv/nodeTree/index.vue')
          },
          {
            path: '/antV/department',
            name: '事业部treeDemo',
            component: () => import('../views/antv/department/index.vue')
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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 生成菜单树
export const menuList = counterList(routes[0].children)

function counterList(data) {
  return data.map(item => {
    return {
      index: item.path,
      title: item.name,
      icon: item.icon,
      access: item?.meta?.access,
      children:
        item.children?.length > 0 ? counterList(item.children) : undefined
    }
  })
}

export default router
