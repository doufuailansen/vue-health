<template>
  <div id="app">
    <!--头部-->
    <div id="top_nav">
      <div class="top_warp" v-show="un_login">
        <span>
          <router-link to="/index/login">登录</router-link>
        </span>
        <span>
          <router-link to="/index/register">注册</router-link>
        </span>
      </div>
      <div>
        <div class="top_warp" v-show="login">
          <span class="user_center">
            <router-link :to="{path: '/usercenter/myinfo', query: {role: this.role}}">{{username}}</router-link>
          </span>
            <a class="logout" @click="logout">注销</a>
        </div>
      </div>
    </div>
    <div id="nav">
      <h1>摆渡</h1>
      <ul>
        <li>
          <router-link to="/">首页</router-link>
          <!--<a href="#">首页</a>-->
        </li>
        <li>
          <router-link to="/consult">心理咨询</router-link>
          <!--<a href="#">心理咨询</a>-->
        </li>

        <li>
        <router-link to="/article">心理园地</router-link>
        <!--<a href="#">好文推荐</a>-->
      </li>
        <li>
          <router-link v-show="login" :to="{path: '/usercenter/myinfo', query: {role: this.role}}">个人中心</router-link>
          <!--<a href="#">好文推荐</a>-->
        </li>
      </ul>
    </div>
    <router-view/>
    <!--脚部-->
    <div id="footer">
      <div class="container">
        <div class="row">
          <div class="col-md-4 col-sm-4">
            <h5>我是用户</h5>
            <ul id="user">
              <li>
                <router-link to="/index/register">免费注册</router-link>
                <!--<a href="#">免费注册</a>-->
              </li>
              <li>
                <router-link to="/index/userprocess">咨询流程</router-link>
                <!--<a href="#">咨询流程</a>-->
              </li>
              <li>
                <router-link to="/consult">快速咨询</router-link>
                <!--<a href="">快速咨询</a>-->
              </li>
            </ul>
          </div>
          <div class="col-md-4 col-sm-4">
            <h5>我是咨询师</h5>
            <ul id="doctor">
              <li>
                <router-link to="/index/docreg">免费入驻</router-link>
                <!--<a href="#">免费入驻</a>-->
              </li>
              <li>
                <router-link to="/index/docprocess">解疑流程</router-link>
                <!--<a href="#">解疑流程</a>-->
              </li>
              <li>
                <router-link to="/index/rules">职业准则</router-link>
                <!--<a href="#">职业准则</a>-->
              </li>
            </ul>
          </div>
          <div class="col-md-4 col-sm-4">
            <h5>关于</h5>
            <ul id="about">
              <li><a href="#">介绍</a></li>
              <li><a href="#">联系我们</a></li>
            </ul>
          </div>
        </div>
      </div>
      <span class="copyright">&copy;软件1501薛宇莹</span>
    </div>
  </div>
</template>

<script>
    import {setCookie, getCookie, delCookie} from './assets/js/cookie'

  export default {
      created: function () {
          if (getCookie('username')) {
            this.showLogin();
            this.username = getCookie('username');
            this.role = getCookie('role');
            console.log(this.role);
          } else {
              this.showUnLogin();
          }
      },
      data() {
          return {
              un_login: true,
              login: false,
              username: '',
              role: '',
          }
      },
      name: 'App',
      methods: {
          showUnLogin: function ()
          {
              this.un_login = true;
              this.login = false;
          },
          showLogin: function ()
          {
              this.un_login = false;
              this.login = true;
          },
          logout: function () {
              delCookie('username');
              this.showUnLogin();
              this.$router.push('/index');
          }
      },
  }

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
  }

  /*顶部注册登录导航*/
  #top_nav {
    width: 100%;
    background-color: #377AB4;
    height: 40px;
    padding: 0 10%;
    line-height: 40px;
  }

  #top_nav a {
    color: white;
    text-decoration: none;
  }

  .top_warp {
    text-align: right;
  }

  .top_warp span {
    height: 20px;
    line-height: 20px;
    /*margin-top: 5px;*/
    /*padding-top: -5px;*/
    display: inline-block;
    text-indent: 25px;
  }

  .top_warp span:nth-child(1) {
    background-image: url("./assets/image/login.png");
    background-repeat: no-repeat;
    background-size: contain;
    margin-right: 20px;
  }

  .top_warp span:nth-child(2) {
    background-image: url("./assets/image/register.png");
    background-repeat: no-repeat;
    background-size: contain;
  }

  .logout {
    cursor: pointer;
  }
  /*顶部切换页面导航*/
  #nav {
    margin-top: 0px;
    padding: 20px 10% 0 10%;
    border-bottom: 1px solid #eeeeee;
  }

  #nav:after {
    content: "";
    clear: both;
    display: block;
  }

  #nav h1 {
    text-align: left;
    float: left;
    text-indent: -500px;
    margin-bottom: 0;
    height: 80px;
    width: 140px;
    color: #2E4975;
    line-height: 80px;
    background-image: url("./assets/image/logo2.png");
    background-repeat: no-repeat;
    background-size: cover;
  }

  #nav ul {
    list-style: none;
    text-align: right;
    line-height: 50px;
    float: right;
    min-width: 400px;
    margin-bottom: 0;
    margin-top: 30px;
  }

  #nav ul li {
    display: inline-block;
    margin: 0;
  }

  #nav a {
    display: inline-block;
    text-decoration: none;
    padding: 0 8.5px;
    color: #333;
  }

  #nav a:hover {
    background-color: #3A7BB2;
    color: white;
  }

  /*脚部*/
  #footer {
    border-radius: 5px;
    background-color: #eee;
    margin: 10px 10%;
  }

  #footer .container {
    padding-top: 20px;
  }

  #footer ul {
    list-style: none;
    padding-left: 0;
  }

  #footer ul a {
    color: #333;
    text-decoration: none;
  }

  #footer .copyright {
    font-size: 10px;
    color: #ccc;
  }


</style>
