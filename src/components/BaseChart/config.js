/*
 * @Description:
 * @Date: 2022-10-09 14:41:37
 * @LastEditTime: 2023-02-27 14:14:04
 * @FilePath: \cloud-dop-web\src\components\BaseChart\config.js
 */

import dayjs from 'dayjs'

export default {
  renderGraph: function({ posArr, userInfo = {} }) {
    return [
      {
        silent: true,
        type: 'group',
        width: '100%',
        height: '100%',
        bounding: 'raw',
        z: -10,
        children: posArr.map(item => {
          return {
            type: 'text',
            z: -10,
            ...item,
            style: {
              fill: 'rgba(200, 200, 200, 0.20)',
              width: 400,
              overflow: 'break',
              text: [
                `${userInfo?.userId}`,
                dayjs(new Date()).format('YYYY/MM/DD'),
                userInfo?.ip ?? ''
              ].join('       \n \n'),
              font: '16px Microsoft YaHei',
              textVerticalAlign: 'middle'
            }
          }
        })
      }
    ]
  },

  normal: function(userInfo = {}) {
    const posArr = [
      {
        left: '0%',
        top: '10%',
        rotation: '170'
      },
      {
        left: '30%',
        top: '30%',
        rotation: '170'
      },
      {
        left: '60%',
        top: '40%',
        rotation: '170'
      },
      {
        left: '40%',
        top: '0%',
        rotation: '170'
      },
      {
        left: '70%',
        top: '5%',
        rotation: '170'
      },
      {
        left: '20%',
        top: '60%',
        rotation: '170'
      }
    ]

    return this.renderGraph({ userInfo, posArr })
  },

  squareSharp: function(userInfo) {
    const is4K = window.screen.width > 1920
    const isFullScreen = window.location.pathname === '/productInventorySales'

    const rowNum = 5
    let colNum = is4K ? (isFullScreen ? 8 : 4) : isFullScreen ? 6 : 3

    let posArr = []

    for (let r = 0; r < rowNum; r++) {
      for (let c = 0; c < colNum; c++) {
        posArr.push({
          left: 5 + Math.floor(90 / colNum).toFixed(2) * (c + 0.1) + '%',
          top:
            5 +
            Math.floor(90 / rowNum).toFixed(2) * (r + (c % 2 === 1 ? 0.5 : 0)) +
            '%',
          rotation: '170'
        })
      }
    }

    return this.renderGraph({ userInfo, posArr })
  }
}
