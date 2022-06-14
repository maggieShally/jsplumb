/*
 * @Description:
 * @Date: 2022-06-06 14:16:30
 * @LastEditTime: 2022-06-06 18:44:37
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\D3\combineChart\paintBar.js
 */

class PaintBar {
  constructor({ svg, dimension, quato, data }) {
    this.svg = svg
    this.dimension = dimension
    this.quato = quato
    this.data = data

    let dimensionLen = dimension.length
    var dimensionTree
    let i = 0
    while (i <= dimensionLen - 1) {
      const tempData = Array.from(
        new Set(
          data.map(item => {
            return item[dimension[i]]
          })
        )
      ).map(item => {
        return {
          [dimension[i]]: item
        }
      })

      if (i === 0) {
        dimensionTree = tempData
      } else {
        dimensionTree.forEach(item => {
          let temp = item
          let num = 0
          if (temp.children) {
            num++
            debugger
            calcTree(temp.children, tempData, num)
          } else {
            temp.children = tempData
          }
        })

        console.log(dimensionTree)
      }

      i++
    }

    function calcTree(temp, tempData, num) {
      temp.forEach(item => {
        let temp = item
        while(num < 2) {
          if(temp.children) {
            temp = item.children
          } else {
            temp.children = tempData
          }
        }
      })
    }
  }

  init() {
    const dataSet = []
  }
}

export default PaintBar
