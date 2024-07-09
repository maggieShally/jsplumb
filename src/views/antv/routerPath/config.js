

export const lineStyle = {
  defaultColor: '#A2B1C3',
  activeColor: '#DB7093',
  hiddenColor: 'rgba(162,177,195,.3)'
}


export const processConfig = [
  {
    key: 'E174B3291AE5DCADE0534D0A10AC9300',
    label: '流片',
    color: 'rgb(230, 25, 75)'
  },
  {
    key: 'E174B3291AA4DCADE0534D0A10AC4F81',
    label: 'CP',
    color: 'rgb(60, 180, 75)'
  },
  {
    key: 'E174B3291AA5DCADE0534D0A10AC4F82',
    label: '封装',
    color: 'rgb(255, 225, 25)'
  },
  {
    key: 'E174B3291AC1DCADE0534D0A10AC4F84',
    label: '封装后测试',
    color: 'rgb(245, 130, 49)'
  },
  {
    key: 'E174B3291AC1DCADE0534D0A10AC4F83',
    label: '筛选测试',
    color: 'rgb(66, 212, 244)'
  },
  {
    key: 'E174B3291ADCDCADE0534D0A10AC4F85',
    label: '移印',
    color: 'rgb(240, 50, 230)'
  },
  {
    key: 'E174B3291AE5DCADE0534D0A10AC4F86',
    label: '贴片',
    color: 'rgb(191, 239, 69)'
  },
  {
    key: 'E174B3291AE5DCADE0534D0A10AC4F87',
    label: '工包测试',
    color: 'rgb(250, 190, 212)'
  },
  {
    key: 'E174B3291AE5DCADE0534D0A10AC4F88',
    label: '组包',
    color: 'rgb(220, 190, 255)'
  },
  {
    key: 'E174B3291AE5DCADE0534D0A10AC4F89',
    label: '未定义',
    color: 'rgb(170, 255, 195)'
  }
]



export const processEdges = processConfig.reduce((total, item, index, arr) => {
  let nextNodes = arr.slice(index+1)
  const edges = nextNodes.map(i => {
    return {
      source: item.key,
      target: i.key
    }
  })
  total.push(...edges)
  return total
}, []) 

console.log(processEdges)
