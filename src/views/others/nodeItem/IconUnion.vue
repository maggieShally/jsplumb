<!--
 * @Description: 
 * @Date: 2022-06-16 14:43:53
 * @LastEditTime: 2022-07-04 14:06:46
 * @FilePath: \webpack-teste:\others\jsplumb-test\src\views\others\nodeItem\IconUnion.vue
-->
<template>
  <div :class="['imgDiv',isLast ? '' : 'hasBefore', nodeIndex === 0 ? 'isFirst' : '' ]">
    <div class="circle-item">
      <div class="leftCircle" :class="{ 'select': type === 'left'}">
      </div>
      <div class="rightCircle" :class="{ 'select': type === 'right'}">
      </div>
      <div class="oval" v-show="!type">
      </div>
    </div>
    <div class="leftLine"></div>
    <div class="rightLine"></div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  name: 'IconUnion',
  props: {
    type: {
      type: String,
      default: '',
    },
    nodeIndex: {
      type: Number,
      defalut: 0,
    },
    childrenLength: {
      type: Number,
      default: 0,
    },
    isLast: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, content) {
    const state = reactive({
      modelType: props.type,
      // height: (props.parentCount ? props.parentCount * 40 : 40) + 'px',
      width: props.nodeIndex ? '15px' : '35px',
    })

    return {
      ...toRefs(state),
    }
  },
}
</script>


<style lang="less" scoped>
@defaultColor: #ccc;
@circleR: 20px;

.imgDiv {
  position: relative;
  padding: 5px 0 0 0;
  display: flex;
  display: inline-flex;
  justify-content: center;
  width: 100%;
  height: 100%;

  &.hasBefore {
    &:before {
      content: '';
      position: absolute;
      top: 15px;
      left: 20px;
      width: 1px;
      height: 100%;
      background: @defaultColor;
    }
  }

  &.isFirst {
    .leftLine {
      left: 0;
    }
  }

  .leftCircle {
    top: @circleR;
    left: 104px;
    display: inline-block;
    width: @circleR;
    height: @circleR;
    background-color: rgba(204, 204, 204, 0.3);
    border-radius: @circleR;
    border: 1px solid #ccc;
    transform: translate(25%, 0);
    &:hover {
      cursor: pointer;
    }
  }
  .rightCircle {
    display: inline-block;
    width: @circleR;
    height: @circleR;
    background-color: rgba(204, 204, 204, 0.3);
    border-radius: @circleR;
    transform: translate(-25%, 0);
    border: 1px solid #ccc;
    &:hover {
      cursor: pointer;
    }
  }
  .oval {
    display: inline-block;
    width: @circleR;
    height: @circleR;
    background-color: @defaultColor;
    border-radius: 21px 0px;
    transform: translate(-175%, 0%) rotate(-45deg) scale(0.6);
    &:hover {
      cursor: pointer;
    }
  }

  .select {
    background-color: rgba(204, 204, 204, 1);
  }

  .rightLine {
    position: absolute;
    top: 15px;
    right: 0;
    background: @defaultColor;
    width: 35px;
    height: 1px;
  }

  .leftLine {
    position: absolute;
    top: 15px;
    left: 20%;
    background: @defaultColor;
    width: v-bind(width);
    height: 1px;
  }
}
</style>