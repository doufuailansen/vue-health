<template>
  <div id="content">
    <router-view></router-view>
    <div id="banner">
      <div class="scale">
        <div class="leading">
          <h2>关注心理健康</h2>
          <h3>MENTAL HEALTH</h3>
          <router-link to="/consult">立即开始</router-link>
        </div>
      </div>
    </div>
    <div id="introduction">
      <div class="container">
        <div class="row">
          <div class="col-md-3 col-sm-6">
            <img src="../assets/image/professor.png" alt="">
            <span>心理专家</span>
            <p>聚集专业心理医生，您可以选择您信任的专家，TA将为您提供最专业的解答服务。</p>
          </div>
          <div class="col-md-3 col-sm-6">
            <img src="../assets/image/communicate.png" alt="">
            <span>交流平台</span>
            <p>将您的烦恼与心情分享出来，找到与您处境或经历相同的小伙伴。</p>
          </div>
          <div class="col-md-3 col-sm-6">
            <img src="../assets/image/question.png" alt="">
            <span>提问咨询</span>
            <p>随时随地发布您想咨询的心理问题，耐心等待专家的专业回复吧！</p>
          </div>
          <div class="col-md-3 col-sm-6">
            <img src="../assets/image/answer.png" alt="">
            <span>同步解决</span>
            <p>24小时为您提供解疑服务，专业简答让您摆脱烦恼。</p>
          </div>
        </div>
      </div>
    </div>
    <div id="more">
      <div class="mental">
        <div class="mental_intro">
          <h5>心理健康，受益你我他。</h5>
          <div class="break"></div>
          <p>人的心理活动和人体的生理功能之间存在着内在的相关联系。如果处在良好的情绪状态，可以使生理功能处于最佳状态，相反，则会降低或破坏这种功能，不仅影响工作和生活，还能导致各种疾病。</p>
          <span><a href="#">发布问题...</a></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  /*引导图*/
  #banner {
    width: 80%;
    margin: 0 auto;
  }

  .scale {
    padding-top: 500px;
    background-image: url("../assets/image/doctor.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  .leading {
    margin-top: -300px;
    color: #3F4344;
    text-shadow: 2px 2px 2px white;
  }

  .leading h3 {
    font-weight: bold;
  }

  .leading a {
    display: inline-block;
    margin-top: 20px;
    line-height: 50px;
    padding: 0 50px;
    text-decoration: none;
    color: white;
    background-color: #FF5438;
    border-radius: 10px;
    text-shadow: none;
  }

  /*介绍*/
  #introduction {
    margin: 30px auto 0;
    width: 80%;
  }

  #introduction img {
    /*display: block;*/
    width: 60px;
    padding: 10px;
    border-radius: 45px;
    border: #333 solid 1px;
  }

  #introduction .col-md-3:nth-child(3) img {
    padding: 15px;
  }

  #introduction span {
    display: block;
    margin-top: 15px;
  }

  #introduction p {
    margin-top: 12px;
    font-size: 12px;
    color: #999;
  }

  /*查看详情*/
  #more {
    width: 80%;
    margin: 20px auto;
  }

  .mental {
    background: url("../assets/image/mind.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 400px;
  }

  .mental_intro {
    width: 400px;
    text-align: left;
    float: right;
    background: rgba(99, 181, 100, 0.5);
    border-radius: 20px;
    padding: 20px;
  }

  .mental_intro h5 {
    color: white;
  }

  .mental_intro p {
    font-size: 14px;
    color: white;
  }

  .mental_intro span {
    background-image: url("../assets/image/arrow.png");
    background-repeat: no-repeat;
    background-size: contain;
    display: inline-block;
    line-height: 15px;
    height: 15px;
    text-indent: 15px;
  }

  .mental_intro a {
    text-decoration: none;
    color: white;
    font-size: 12px;
  }

  .break {
    width: 100px;
    height: 10px;
    border-top: white 1px solid;
  }

  @media screen and (max-width: 767px) {
    .scale {
      padding-top: 350px;
    }

    .leading {
      margin-top: -220px;
    }

    .mental {
      height: 300px;
    }

    .mental_intro {
      width: 308px;
    }

  }

</style>

<script>

    export default {
      name: 'Index',
      data () {
        return {

        }
      },
      methods: {}
    }

</script>
