var preHighLightNode = []
var preHighLightLink = []

export const getHightData = ({ options, params, preNodeInfo }) => {
  let sourceNodes = []

  let getNodes = links => {
    let empty = true
    links.forEach(link => {
      if (
        sourceNodes.includes(link.source) &&
        !sourceNodes.includes(link.target)
      ) {
        empty = false
        sourceNodes.push(link.target)
      }
    })
    if (empty) return
    else getNodes(links)
  }

  console.time()

  let links = options.series[0].links.slice()
  let nodes = options.series[0].data.slice()

  const { name } = params.data
  const parentNode = nodes.filter(item => {
    return links.filter(i => i.target === name).find(i => i.source === item.name)
  })
// console.log('parentNode',parentNode)
  const isCancelSelected = preNodeInfo?.name
    ? preNodeInfo?.name === name
    : false

  sourceNodes = [name]

  getNodes(links)

  const selectedNodes = nodes.filter(item => {
    return sourceNodes.includes(item.name)
  }).concat(parentNode)

  let selectedLinks = links.filter(item => {
    return sourceNodes.includes(item.source) || item.target === name
  })
  
  console.log(sourceNodes, selectedLinks )

  // 清除上次高亮数据
  preHighLightNode.forEach(item => {
    nodes[item.orderIndex] = {
      ...nodes[item.orderIndex],
      itemStyle: {
        opacity: 0.25
      }
    }
  })

  preHighLightLink.forEach(item => {
    links[item.orderIndex] = {
      ...links[item.orderIndex],
      lineStyle: {
        opacity: 0.25
      }
    }
  })

  // 高亮当前数据
  selectedNodes.forEach(item => {
    nodes[item.orderIndex] = {
      ...nodes[item.orderIndex],
      itemStyle: {
        opacity: 1
      }
    }
  })

  selectedLinks.forEach(item => {
    links[item.orderIndex] = {
      ...links[item.orderIndex],
      lineStyle: {
        opacity: 1
      }
    }
  })


  preHighLightNode = selectedNodes.slice()
  preHighLightLink = selectedLinks.slice()

  console.timeEnd()
  console.timeLog()


  // nodes = nodes.map(item => {
  //   return {
  //     ...item,
  //     itemStyle: {
  //       opacity: isCancelSelected
  //         ? 1
  //         : selectedNodes
  //             .map(i => [i.target, i.source])
  //             .flat()
  //             .concat([parentLink?.source, name]) // 父节点也高亮
  //             .includes(item.name)
  //         ? 1
  //         : 0.25
  //     }
  //   }
  // })

  // const selectedLinks = links.map(item => {
  //   return {
  //     ...item,
  //     lineStyle: {
  //       color: 'source',
  //       opacity: isCancelSelected
  //         ? 0.25
  //         : sourceNodes.includes(item.source) || item.target === name // 父节点也高亮
  //         ? 1
  //         : 0.2
  //     }
  //   }
  // })

  return {
    links,
    nodes
  }
}
