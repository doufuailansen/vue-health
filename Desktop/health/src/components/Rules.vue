<template>
  <div id="warp">
    <router-link to="/" class="close">x</router-link>
    <div id="warp-inside">
      <h3>心理医生职业准则</h3>
      <p>1、心理咨询师在从事心理咨询与治疗时，应遵纪守法、遵守心理咨询师职业道德准则，在其工作中建立并执行严格的道德标准；</p>
      <p>2、心理咨询师应注意加强自身的修养，不断完善自己，提高自己的心理健康水平；</p>
      <p>3、心理咨询师应不断学习本专业以及咨询服务所需的有关知识，促进自身的专业发展，提高专业服务水平；</p>
      <p>
        4、心理咨询师应明确了解自己的能力界限和专业职能的界限，不做超越自己能力和职能范围的事情。</p>
      <a class="more" target="_blank" href="http://www.360doc.com/content/14/1112/18/2646494_424619952.shtml">查看更多</a>
    </div>
  </div>
</template>

<style scoped>
  #warp {
    position: fixed;
    overflow-y: auto;
    left: 25%;
    top: 12%;
    z-index: 1000;
    width: 50%;
    height: 75%;
    box-shadow: 2px 2px 20px #3A7BB2;
    background-color: rgba(255, 255, 255, 0.95);
    border-radius: 10px;
    min-width: 256px;
  }

  #warp-inside {
    margin: 30px auto;
    text-align: left;
    padding: 10px 30px;
  }

  .close {
    font-weight: bold;
    font-size: 20px;
    color: #333;
    padding-right: 10px;
    padding-top: 5px;
  }

  h3 {
    margin-bottom: 20px;
  }

  .more {
    float: right;
  }

</style>

<script>
    export default {
        data () {
            return {}
        },
        methods: {}
    }
</script>
