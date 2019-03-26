<template>
  <div id="warp">
    <router-link to="/" class="close">x</router-link>
    <div id="warp-inside">
      <img src="../assets/image/doctor_process.png" alt="解疑流程">
    </div>
  </div>
</template>

<style scoped>
  #warp {
    position: fixed;
    overflow-y: auto;
    left: 15%;
    top: 32%;
    z-index: 1000;
    width: 70%;
    height: 40%;
    box-shadow: 2px 2px 20px #3A7BB2;
    background-color: rgba(255, 255, 255, 0.95);
    border-radius: 10px;
    min-width: 256px;
  }

  #warp-inside {
    margin: 30px auto;
    text-align: left;
  }

  .close {
    font-weight: bold;
    font-size: 20px;
    color: #333;
    padding-right: 10px;
    padding-top: 5px;
  }

  img {
    width: 100%;
    height: auto;
    padding: 15px 30px;
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
