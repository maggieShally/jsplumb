<!--
 * @Description: 主要是通过 tanfrom来移动位置，requestAnimationFrame来控制动画，给于每一个item position位置，动运的direction方向，velocity位移基数
 当超过容器边界时就调整方向
 * @Date: 2021-09-08 14:05:37
 * @LastEditTime: 2025-07-08 16:10:48
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\wordCloud\index.vue
-->
<template>
  <div class="wordCloud" ref="wordCloud"></div>
</template>

<script>
import { ref, reactive, toRefs, onMounted } from 'vue'
export default {
  name: 'word-cloud',
  setup() {
    const wordCloud = ref(null)
    const state = reactive({
      hotWord: [
        '万事如意',
        '事事如意 ',
        '万事亨通',
        '一帆风顺',
        '万事大吉',
        '吉祥如意',
        '步步高升',
        '步步登高',
        '三羊开泰',
        '得心应手',
        '财源广进',
        '陶未媲美',
        '阖家安康',
        '龙马精神',
        '锦绣前程',
        '吉祥如意',
        '生龙活虎',
        '神采奕奕',
        '五谷丰登',
        '马到成功',
        '飞黄腾达',
        ' 步步高升',
        '福禄寿禧',
      ],
      color: [
        '#a18cd1',
        '#fad0c4',
        '#ff8177',
        '#fecfef',
        '#fda085',
        '#f5576c',
        '#fe9a8b',
        '#30cfd0',
        '#38f9d7',
      ],
      wordArr: [],
      timer: null,
      resetTime: 10,
      containerSize: '',
    })

    const dealSpan = () => {
      const wordArr = []

      state.hotWord.forEach(value => {
        const spanDom = document.createElement('span')
        spanDom.style.position = 'relative'
        spanDom.style.display = 'inline-block'
        spanDom.style.fontSize = randomNumber(15, 25) + 'px'
        spanDom.style.color = randomColor()
        spanDom.innerHTML = value
        spanDom.local = {
          position: {
            x: 0,
            y: 0,
          },
          direction: {
            x: 1,
            y: 1,
          },
          velocity: {
            x: -0.5 + Math.random(),
            y: -0.5 + Math.random(),
          },
        }

        wordArr.push(spanDom)
        wordCloud.value.appendChild(spanDom)
      })
      state.wordArr = wordArr
    }

    const wordFly = () => {
      state.wordArr.forEach(value => {
        if (
          value.local.realPos.minx + value.local.position.x <
            state.containerSize.leftPos.x ||
          value.local.realPos.maxx + value.local.position.x >
            state.containerSize.rightPos.x
        )
          value.local.direction.x = -value.local.direction.x
        if (
          value.local.realPos.miny + value.local.position.y <
            state.containerSize.leftPos.y ||
          value.local.realPos.maxy + value.local.position.y >
            state.containerSize.rightPos.y
        )
          value.local.direction.y = -value.local.direction.y

        value.local.position.x +=
          value.local.direction.x * value.local.velocity.x
        value.local.position.y +=
          value.local.direction.y * value.local.velocity.y

        value.style.transform =
          'translateX(' +
          value.local.position.x +
          'px) translateY(' +
          value.local.position.y +
          'px)'
      })
    }

    const render = () => {
      if (state.resetTime < 100) {
        state.resetTime++
        state.timer = requestAnimationFrame(render.bind(this))
        state.resetTime = 0
      }
      wordFly()
    }

    const initWordPos = () => {
      state.wordArr.forEach(value => {
        value.local.realPos = {
          minx: value.offsetLeft,
          maxx: value.offsetLeft + value.offsetWidth,
          miny: value.offsetTop,
          maxy: value.offsetTop + value.offsetHeight,
        }
      })
      state.containerSize = getContainerSize()
    }

    function randomColor() {
      const index = Math.floor(state.color.length * Math.random())
      return state.color[index]
    }

    function randomNumber(min, max) {
      const choice = max - min + 1
      return Math.floor(Math.random() * choice + min)
    }

    function getContainerSize() {
      const wRef = wordCloud.value
      return {
        leftPos: {
          x: wRef.offsetLeft,
          y: wRef.offsetTop,
        },
        rightPos: {
          x: wRef.offsetLeft + wRef.offsetWidth,
          y: wRef.offsetTop + wRef.offsetHeight,
        },
      }
    }

    onMounted(() => {
      dealSpan()
      initWordPos()
      render()
    })

    return {
      ...toRefs(state),
      wordCloud,
      wordFly,
    }
  },
}
</script>

<style lang="less" scoped>
.wordCloud {
  width: 600px;
  height: 600px;
}
</style>