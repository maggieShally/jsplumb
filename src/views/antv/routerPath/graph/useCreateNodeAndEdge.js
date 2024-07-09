

import { Markup } from '@antv/x6'

import { lineStyle } from '../config.js'
import { defaultTo } from 'lodash'

export const useCreateNodeAndEdge = idKey => {
  // 创建节点
  const createNode = (id, data, index) => {
    return {
      id,
      data: {
        ...data,
        index,
      },
      shape: 'NodeCom' + idKey,
    }
  }

  // 创建边
  const createEdge = item => {
    let line = {
      stroke: lineStyle.defaultColor,
      strokeWidth: 1,
    }
    if (item.lineType === 'dashed') {
      line.strokeDasharray = '5 10'
    }

    let defaultLabel = {
      markup: Markup.getForeignObjectMarkup(),
      attrs: {
        fo: {
        },
      }
    }

    if (item.isSubPath) {
      const height = item.lineTargetValueList.filter(i => i.isShow).length / 2 * 35
      defaultLabel.attrs.fo = {
        width: 200,
        height,
        x: -100,
        y: -height * 0.45,
      }
    }

    return {
      target: item.targetId,
      source: item.sourceId,
      data: item,
      connector: { name: 'normal' },
      attrs: {
        line,
      },
      label: defaultLabel
    }
  }

  return {
    createNode,
    createEdge
  }
}
