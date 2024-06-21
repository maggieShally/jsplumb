<template>
  <!-- <div>
    <ul>
      <li>
        <input id="tab1" type="radio" name="tab" checked style="display: none">
        <label for="tab1">选项一</label>
        <div class="content">
          选项一内容
        </div>
      </li>
      <li>
        <input id="tab2" type="radio" name="tab" style="display: none">
        <label for="tab2">选项二</label>
        <div class="content">选项二内容</div>
      </li>
      <li>
        <input id="tab3" type="radio" name="tab" style="display: none">
        <label for="tab3">选项三</label>
        <div class="content">选项三内容</div>
      </li>
    </ul>
  </div> -->

  <!-- <input id="canCick" type="text" value="123"/>
  <el-button id="myBtn" type="primary" @click="handleSubmit">提交</el-button> -->

  <iframe src="http://localhost:8087/others/iframeTest" style="width: 100%;height: 500px"></iframe>
</template>

<script>
export default {
  name: 'RateTest',
  setup() {

    const handleSubmit = () => {
      // doSubmit()
    }
    return {
      // handleSubmit
    }
  }
}
</script>

<style lang="less">
ul {
  position: relative;
    width: 300px;
    margin: 100px auto;
}

ul li {
  list-style: none;
}

ul li input {
  display: none
}


ul li label {
  float: left;
  width: 100px;
  text-align: center;
  line-height: 30px;
  border: 1px solid #000;
  border-right: 0;
  box-sizing: border-box;
  cursor: pointer;
  transition: all .3s;
}

ul li input:checked+label {
  color: #fff;
  background-color: #000;
}

ul li:last-child label {
  border-right: 1px solid #000;
}

ul li .content {
  opacity: 0;
  visibility: hidden;
  position: absolute;
  left: 0;
  top: 31px;
  width: 100%;
  height: 300px;
  border: 1px solid #000;
  box-sizing: border-box;
  font-size: 24px;
  text-align: center;
  line-height: 300px;
}

ul li input:checked~.content {
  opacity: 1;
  visibility: visible;
}
</style>