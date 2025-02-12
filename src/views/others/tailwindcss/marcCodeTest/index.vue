<!--
 * @Description:  MarsCode 体验
 * @Date: 2025-01-02 16:56:06
 * @LastEditTime: 2025-01-03 10:31:11
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\tailwindcss\marcCodeTest\index.vue
-->

<template>
  <div class="marc-container">
    <div class="img-con">
      <div class="cloud"></div>
      <div class="dinosaur" :class="{ 'jumping': isJumping }"></div>
      <div class="road"></div>
      <div class="road road-2"></div>
      <div class="tree" ref="treeRef"></div>
      <div class="treeBg" ref="treeBgRef"></div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, onMounted } from 'vue'
export default {
  name: 'Jumping',
  components: {

  },
  props: {
  },
  setup() {
    const state = reactive({
      isJumping: false,
    })

    const treeRef = ref(null)
    const treeBgRef = ref(null)

    onMounted(() => {
      window.addEventListener('keydown', handleKeyDown)
      setInterval(() => {

        if (checkCollision(treeRef) || checkCollision(treeBgRef)) {
          // 碰撞检测成功，游戏结束
          alert('游戏结束')
          // 重新布局游戏
          resetGame()
        }
      }, 100)
    })

    const handleKeyDown = (event) => {
      if (event.keyCode === 32 && !state.isJumping) {
        state.isJumping = true
        // 触发跳跃动画
        jump()
      }
    }

    const jump = () => {
      // 实现跳跃逻辑，例如使用CSS动画
      // 这里可以使用setTimeout或requestAnimationFrame来模拟加速度
      setTimeout(() => {
        state.isJumping = false
      }, 500) // 假设跳跃动画持续500毫秒
    }

    const checkCollision = (targetTree) => {
      if (state.isJumping) return // 如果恐龙正在跳跃，不进行碰撞检测

      const dinosaurRect = document.querySelector('.dinosaur').getBoundingClientRect()
      const treeRect = targetTree.value.getBoundingClientRect()

      return (dinosaurRect.right > treeRect.left &&
        dinosaurRect.left < treeRect.right &&
        dinosaurRect.bottom > treeRect.top &&
        dinosaurRect.top < treeRect.bottom)

    }

    const resetGame = () => {
      // 在这里实现重新布局游戏的逻辑
      // 例如，重置恐龙和树的位置
    }


    return {
      treeRef,
      treeBgRef,
      ...toRefs(state),
    }
  },
}

</script>
<style scoped lang='less'>
.marc-container {
  width: 1200px;
  height: 120px;

  .img-con {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    overflow: hidden;
  }

  .road {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 12px;
    width: 100%;
    background: url('@/assets/road.png');
    transform: translateX(-40%);
    animation: moveLeft 5s linear infinite;
    /* 应用动画 */
  }

  @keyframes moveLeft {
    0% {
      transform: translateX(0);
      /* 起始位置 */
    }

    100% {
      transform: translateX(-100%);
      /* 结束位置，向左移动100%宽度 */
    }
  }

  .road-2 {
    left: 100%;
  }

  .treeBg,
  .tree {
    position: absolute;
    left: 0;
    bottom: -5px;
    height: 30px;
    width: 50px;
  }

  .treeBg {
    height: 60px;
    left: 100%;
    bottom: -5px;
    background: url('@/assets/tree-bg.png') no-repeat;
    animation: moveTreeLeft 5s linear infinite;
    /* 应用动画 */
    animation-delay: 2s;
  }

  .tree {
    left: 100%;
    /* 初始位置在最右侧 */
    height: 40px;
    width: 18px;
    background: url('@/assets/tree.png') no-repeat;
    animation: moveTreeLeft 5s linear infinite;
    /* 应用动画 */
  }


  @keyframes moveTreeLeft {
    0% {
      transform: translateX(0);
      /* 起始位置 */
    }

    100% {
      transform: translateX(-1200px);
      /* 结束位置，向左移动150%宽度，确保移出屏幕外 */
    }
  }


  .dinosaur {
    position: absolute;
    left: 100px;
    bottom: 8px;
    height: 45px;
    width: 45px;
    background: url('@/assets/dinosaur.png') no-repeat;
    animation: dinosaurRun 0.8s steps(4) infinite;
  }


  .dinosaur.jumping {
    animation: jumpAnimation 0.5s ease-in-out;
  }

  @keyframes dinosaurRun {
    0% {
      background-position: 0 0;
    }

    100% {
      background-position: -176px 0;
    }
  }



  @keyframes jumpAnimation {
    0% {
      bottom: 8px;
    }

    50% {
      bottom: 100px; // 跳跃的最高点
    }

    100% {
      bottom: 8px;
    }
  }
}
</style>