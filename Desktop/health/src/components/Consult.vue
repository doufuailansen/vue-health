<template>
<div id="content">
    <!--<button @click="getArticle">调用后台接口</button>-->
    <!--<el-input v-model="inpContent"></el-input>-->
  <div class="user" v-show="isUser">
    <div id="nav">
      <div class="location">
        <span>按地区</span>
        <el-select class="select" v-model="choosen_city" @change="filterCity($event)" placeholder="请选择">
          <el-option
                  v-for="(item, index) in local"
                  :key="index"
                  :label="item.DocCity"
                  :value="item.DocCity">
          </el-option>
        </el-select>
      </div>
      <div class="specialty">
        <span>按专长</span>
        <el-select class="select" v-model="choosen_spe" placeholder="请选择" @change="filterSpeciality($event)">
          <el-option
                  v-for="(item, index) in speciality"
                  :key="index"
                  :label="item.DocSepciality"
                  :value="item.DocSepciality">
          </el-option>
        </el-select>
      </div>
    </div>
    <div id="main">
      <div class="title">
        <div class="hr"></div>
        <span class="center">心理专家</span>
        <div class="hr"></div>
        <span class="arrow"></span>
      </div>
      <ul>
        <li v-for="doctor in doctorData" class="col-md-4 col-sm-6">
          <a href="#" class="tag">{{doctor.DocSepciality}}</a>
          <img src="../assets/image/doctor.jpg" alt="">
          <span class="name">{{doctor.DocName}}</span>
          <span class="info">
            <span class="sex">{{doctor.DocSex}}</span>
            <span class="career">从业{{doctor.DocCareer}}年</span>
            <span class="location">{{doctor.DocCity}}</span>
          </span>
          <p class="introduction">{{doctor.DocIntro}}</p>
          <span class="phone">TEL:{{doctor.DocPhone}}</span>
          <!--<span class="welcome">欢迎来电咨询</span>-->
          <router-link class="ask" :to="{path: '/question', query: {docName: doctor.DocName}}">向TA提问</router-link>
          <!--<a class="ask" @click="routerTo"></a>-->
        </li>
      </ul>
      <div class="block">
        <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                layout="prev, pager, next"
                :current-page="pageNo"
                :page-size="pagesize"
                :total="doctors.length">
        </el-pagination>
      </div>
    </div>
  </div>
    <div class="doctor" v-show="isDoctor">
      <div class="contanier">
        <div class="row">
          <div v-show="showanswer" class="unsolve col-lg-7">
            <div class="title">
              <div class="hr"></div>
              <span class="center">待解决</span>
              <div class="hr"></div>
              <span class="arrow"></span>
              <ul>
                <li v-for="answer in answerData" class="answer_list">
                  <!--<div id="check">-->
                  <span>来自
                            {{answer.UserName}}
                            的提问</span>
                  <span class="time">{{answer.QuestionTime}}</span>

                  <span class="article_title">Q:{{answer.QuestionTitle}}</span>
                  <!--</div>-->
                  <p class="content">
                    {{answer.QuestionContent}}
                  </p>
                  <el-form ref="myform" :model="myform" :rules="rules" label-width="80px">

                    <el-form-item prop="content" label="请解答">
                      <el-input v-model="myform.content" type="textarea" :rows="4" ></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="onSubmit('myform',answer.QuestionId)">提交解答</el-button>
                      <!--<el-button>取消</el-button>-->
                    </el-form-item>
                    <!--<p class="hint" v-show="showTishi">{{tishi}}</p>-->

                  </el-form>
                    <!--<el-button class="button" type="success" @click="more">详细解答</el-button>-->
                </li>
              </ul>
              <div class="block">
                <el-pagination
                        @current-change="handleCurrentChange1"
                        @size-change="handleSizeChange1"
                        layout="prev, pager, next"
                        :current-page="pageNo1"
                        :page-size="pagesize1"
                        :total="answers.length">
                </el-pagination>
              </div>
            </div>
          </div>
          <div class="question_list col-lg-5">
            <div class="title">
            <div class="hr"></div>
            <span class="center">更多咨询</span>
            <div class="hr"></div>
            <span class="arrow"></span>
              <ul>
                <li v-for="question in questionData" class="question">
                  <!--<div id="check">-->
                  <span class="time">{{question.QuestionTime}}</span>

                  <span class="article_title">Q:{{question.QuestionTitle}}</span>
                  <!--</div>-->
                  <p class="content">
                    {{question.QuestionContent}}
                  </p>

                  <div class="answer" >
                    <span>A:</span>
                    <span>{{question.Answer}}</span>
                  </div>

                  <div class="docName">
                   <span>来自
                            {{question.DocName}}
                  的解答</span>
                  </div>


                    <!--<el-button class="button" type="success" @click="more">详细解答</el-button>-->
                </li>
              </ul>
              <div class="block">
                <el-pagination
                        @current-change="handleCurrentChange2"
                        @size-change="handleSizeChange2"
                        layout="prev, pager, next"
                        :current-page="pageNo2"
                        :page-size="pagesize2"
                        :total="questions.length">
                </el-pagination>
              </div>
          </div>
          </div>
        </div>
      </div>

    </div>

    <div class="top" v-show="isLogin">

    </div>
  </div>
</template>

<style scoped>
  #content {
    width: 80%;
    margin: 20px auto;
  }

  ul {
    list-style: none;
  }
  /*遮罩*/
  .top {
    position:fixed;
    top: 0;
    left: 0;
    height: 600px;
    width: 100%;
    background: rgba(114, 119, 121, 0.9);
    filter:blur(100px);
    /*z-index: 9999;*/
  }
  /*导航*/
  #nav {
    background: #eee;
    height: 140px;
    width: 100%;
    border-radius: 5px;
    text-align: left;
  }

  .select {
    min-width: 120px;
    width: 30%;
  }

 .location span:nth-child(1) {
    background-image: url("../assets/image/location.png");
    background-repeat: no-repeat;
    background-size: contain;
   display: inline-block;
   height: 27px;
   /*text-align: left;*/
   font-size: 20px;
   line-height: 27px;
   text-indent: 40px;
   margin-bottom: 30px;
   margin-right: 20px;
  }

  .specialty span:nth-child(1) {
    background-image: url("../assets/image/specialty.png");
    background-repeat: no-repeat;
    background-size: contain;
    display: inline-block;
    height: 27px;
    /*text-align: left;*/
    font-size: 20px;
    line-height: 27px;
    text-indent: 40px;
    margin-bottom: 10px;
    margin-right: 20px;
  }
  /*main*/
  .title {
    display: block;
    font-size: 20px;
    text-align: center;
    margin-top: 20px;
  }

  .center {
    padding: 10px 5% 0;
  }

  .hr {
    display: inline-block;
    border-top: #ccc solid 1px;
    width: 30%;
  }

  .arrow {
    background-image: url("../assets/image/arrow-down.png");
    background-size: contain;
    background-repeat: no-repeat;
    display: block;
    margin: 5px auto;
    width: 20px;
    height: 20px;
  }

  .answer_list {
    text-align: left;
  }

  .question {
    padding-top: 10px;
    padding-bottom: 10px;
    border-top: #eee solid 1px;
  }

  .question:nth-last-child(1) {
    border-bottom: #eee solid 1px;
  }

  .question span {
    /*display: inline-block;*/
    text-align: left;
  }

  .article_title {
    /*background-image: url("../assets/image/circle2.png");*/
    /*background-repeat: no-repeat;*/
    /*background-size: contain;*/
    font-size: 1.3em;
    height: 50px;
    line-height: 50px;
    display: block;
  }

  .content {
    text-align: left;
    padding: 0 30px 0;
    font-size: 0.9em;
    color: #666;
    font-weight: 200;
  }

  #main ul {
    list-style: none;
    margin: 20px 0;
    text-align: left;
    padding-left: 0;
  }

  #main li {
    display: inline-block;
    /*border: #333 solid 2px;*/
    /*box-shadow: 1px 1px 2px #333;*/
    /*border-radius: 5px;*/
    text-align: center;
    padding: 20px;
  }

  #main li:hover {
    box-shadow: 1px 1px 20px #999;
  }

  .tag {
    display: block;
    margin: 0;
    text-align: center;
    border-radius: 5px;
    padding: 0;
    background: #FF4D35;
    height: 20px;
    width: 50px;
    line-height: 20px;
    color: white;
    font-size: 13px;
    text-decoration: none;
  }

  #main img {
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }

  .name {
    display: block;
    font-size: 20px;
    /*font-weight: bold;*/
    padding: 10px;
  }

  .info {
    font-size: 15px;
    color: #666;
    font-weight: lighter;
    padding: 5px;
  }

  .introduction {
    padding: 10px 5px 0;
    font-size: 15px;
    text-align: left;
    color: #666;
    font-weight: lighter;
    overflow: hidden;
    height: 180px;
  }

  .introduction:hover {
    overflow-x: hidden;
    overflow-y: auto;
  }

  ._btn {
    float: right;
  }

  .ask {
    display: block;
    color: white;
    font-size: 15px;
    background: #3BDA44;
    border-radius: 12px;
    width: 130px;
    height: 30px;
    line-height: 30px;
    margin: 20px auto 10px;
    text-decoration: none;
    cursor: pointer;
  }

  .answer {
    text-align: left;
  }

  .answer span:nth-child(1) {
    font-size: 1.3em;
    height: 50px;
    line-height: 50px;

  }

  .answer span:nth-child(2) {

    /*padding: 0 30px 0;*/
    font-size: 0.9em;
    color: #666;
    font-weight: 200;
  }

  .time {
    float: right;
    width: 22%;
    font-weight: lighter;
    font-size: 12px;
  }

  .docName span {
    display: inline-block;
    float: left;
    color: #005cbf;
    font-size: 0.8em;
    line-height: 30px;
  }

  .docName:after {
    content:"";
    display: block;
    clear: both;
  }

  @media screen and (max-width: 767px) {

  }

</style>

<script>
    import {setCookie, getCookie, delCookie} from '../assets/js/cookie'
  export default {
      data() {
          return {
              isUser: true,
              isDoctor: false,
              userAccount: '',
              pageNo: 1,//当前页码
              pagesize: 6,
              pageNo1: 1,
              pagesize1: 3,
              pageNo2: 1,
              pagesize2: 6,
              choosen_city: '',
              choosen_spe: '',
              isLogin: true,
              showanswer: false,
              myform: {
                  content: '',
              },
              rules: {
                  content: [
                      {required: true, message: '请输入您的解答', trigger: 'blur'}
                  ],
              },
//              paginationShow: false,//是否显示分页
              local: [{

              }],
              speciality: [{

              }],
              selectedLocal: [],
              selectedSpeciality: [],
              doctors: [{

              }],
              answers:[{

              }],
              questions: [{

              }]
          }

      },
      computed: {
          doctorData: function () {
              return this.doctors.slice((this.pageNo - 1) * this.pagesize,
                  this.pageNo * this.pagesize);
          },
          answerData: function() {
              return this.answers.slice((this.pageNo1 - 1) * this.pagesize1,
                  this.pageNo1 * this.pagesize1);
          },
          questionData: function() {
              return this.questions.slice((this.pageNo2 - 1) * this.pagesize2,
                  this.pageNo2 * this.pagesize2);
          }
      },
      created: function() {

          if(getCookie("username")) {
              this.userAccount = getCookie("username");
              this.isLogin = false;
          } else {
              this.open();
          }
          if(getCookie("role") == "students") {
              this.isUser = true;
              this.isDoctor = false;
              this.getDoctor();
              this.getCity();
              this.getSpeciality();
          } else if(getCookie("role") == "doctors") {
              this.isUser = false;
              this.isDoctor = true;
              this.getAnswers();
              this.getAll();
          }

//          this.getDoctor();
//          this.getCity();
//          this.getSpeciality();
      },
        methods: {
            open() {
                this.$alert('请先登录后再咨询，点击确定跳转登录页面！', '请先登录', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                            type: 'info',
                            message: '即将跳转...'
                        });
                        setTimeout(function () {
                            this.$router.push('/index/login')

                        }.bind(this), 1000)

                    }
                });
            },
            handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize); //每页下拉显示数据
            },
            //点击下一页和点击页码时执行
            handleCurrentChange: function(currentPage){
                this.pageNo = currentPage;
                console.log(this.pageNo); //点击第几页
            },
            handleSizeChange1: function (size) {
                this.pagesize1 = size;
                console.log(this.pagesize1); //每页下拉显示数据
            },
            //点击下一页和点击页码时执行
            handleCurrentChange1: function(currentPage){
                this.pageNo1 = currentPage;
                console.log(this.pageNo1); //点击第几页
            },
            handleSizeChange2: function (size) {
                this.pagesize2 = size;
                console.log(this.pagesize2); //每页下拉显示数据
            },
            //点击下一页和点击页码时执行
            handleCurrentChange2: function(currentPage){
                this.pageNo2 = currentPage;
                console.log(this.pageNo2); //点击第几页
            },
          formatter(time) {

            var date = new Date(time);
            var month = date.getMonth() + 1;
            var datetime = date.getFullYear()
              + "年"// "年"
              + (month >= 10 ? month : "0"+ month)
              + "月"// "月"
              + (date.getDate() < 10 ? "0" + date.getDate() : date
                .getDate())
              + "日";
            return datetime;
          },
            //获取分页数据totalDataNumber
            getDoctor() {
                const self=this;
                self.$http.get('http://127.0.0.1:3000/api/doctor/select').then((res) => {
                    console.log(res);
                    self.doctors = res.data;
                })
            },
            getCity() {
                const self = this;
                self.$http.get('http://127.0.0.1:3000/api/doctor/selectCity').then((res) => {
                    console.log(res);
                    self.local = res.data;
                })
            },
            filterCity(value) {
                const self = this;
                self.$http.get('http://127.0.0.1:3000/api/doctor/searchCity', {
                    params: {
                        city: "'" + value + "'"
                    }
                }).then((res) => {
                    console.log(res);
                    self.doctors = res.data;
                })
            },
            filterSpeciality(value) {
                const self = this;
                self.$http.get('http://127.0.0.1:3000/api/doctor/searchSpeciality', {
                    params: {
                        speciality: "'" + value + "'"
                    }
                }).then((res) => {
                    console.log(res);
                    self.doctors = res.data;
                })
            },
            getSpeciality() {
                const self = this;
                self.$http.get('http://127.0.0.1:3000/api/doctor/selectSpeciality').then((res) => {
                    console.log(res);
                    self.speciality = res.data;
                })
            },
            getAnswers: function () {
                const self = this;

                self.$http.get('http://127.0.0.1:3000/api/question/searchUnsolvedAnswer', {
                    params: {
                        username: this.userAccount
                    }
                }).then((res) => {
                    //判断为空对象
                    if(JSON.stringify(data) != "{}") {
                        this.showanswer = true;
                    }
                    console.log(res);
                    self.answers = res.data;
                  for(var i in self.answers) {
                    var time = self.answers[i].QuestionTime;

                    self.answers[i].QuestionTime = self.formatter(time);
//                      console.log(self.articles[0]);
                  }
                })
            },
            getAll: function () {
                const self = this;

                self.$http.get('http://127.0.0.1:3000/api/question/selectAll').then((res) => {
                    console.log(res);
                    self.questions = res.data;
                  for(var i in self.questions) {
                    var time = self.questions[i].QuestionTime;

                    self.questions[i].QuestionTime = self.formatter(time);
//                      console.log(self.articles[0]);
                  }
                })
            },
            onSubmit: function (formName, id) {
                const self = this;
                console.log(id);
//                this.$refs.myForm.validate((valid) => {
//                    if (this.$refs[formName].validate()) {

                        var params = new URLSearchParams();
                        params.append('answer', this.myform.content);
                        params.append('id', parseInt(id));
                        self.$http.post('http://127.0.0.1:3000/api/question/addAnswer', params).then((res) => {
                            console.log(res);
                            this.$router.go(0);
                        })
//                    }
//                })
            }
        }
    }
</script>
