<template>
    <div id="content">
        <div class="main">
            <ul v-show="user">
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
                    <div class="btn_group" >
                        <span>来自<router-link class="ask" :to="{path: '/question', query: {docName: question.DocName}}">
                            {{question.DocName}}
                            </router-link>的解答</span>
                        <el-button class="button" type="danger" @click="onDelete(question.QuestionId)">删除问题</el-button>
                        <!--<el-button class="button" type="success" @click="more">详细解答</el-button>-->
                    </div>
                </li>
            </ul>
            <ul v-show="doctor">
                <li v-for="answer in answerData" class="question">
                    <!--<div id="check">-->
                    <span class="time">{{answer.QuestionTime}}</span>

                    <span class="article_title">Q:{{answer.QuestionTitle}}</span>
                    <!--</div>-->
                    <p class="content">
                        {{answer.QuestionContent}}
                    </p>

                    <div class="answer" >
                        <span>A:</span>
                        <span>{{answer.Answer}}</span>
                    </div>
                    <div class="btn_group" >
                        <span>来自
                            {{answer.UserName}}
                            的提问</span>
                        <el-button class="button" type="danger" @click="onDelete(answer.QuestionId)">删除问题</el-button>
                        <!--<el-button class="button" type="success" @click="more">详细解答</el-button>-->
                    </div>
                </li>
            </ul>
        </div>
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

</template>

<style scoped>
    .main ul {
        list-style: none;
    }

    .time {
        float: right;
        width: 22%;
        font-weight: lighter;
        font-size: 12px;
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

    .button {
        float: right;
        margin-right: 20px;
        font-size: 0.8em;
        padding: 10px 15px;
    }

    .btn_group {
        margin-top: 10px;
    }

    .btn_group:after {
        display: block;
        clear: both;
        content: '';
    }

    .btn_group span {
        display: inline-block;
        float: left;
        color: #005cbf;
        font-size: 0.8em;
        line-height: 30px;
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

    .ask {
        cursor: pointer;
        font-size: 1em;
    }

</style>

<script>
    import {setCookie, getCookie} from '../assets/js/cookie'

    export default {
        data () {
            return {
                pageNo: 1,//当前页码
                pagesize: 6,
                pageNo1: 1,//当前页码
                pagesize1: 6,
                role: '',
                user: false,
                doctor: false,
                userId: '',
                docName: '',
                userAccount:'',
                questions: [{

                }],
                answers: [{

                }]
            }
        },
        computed: {
            questionData: function () {
                return this.questions.slice((this.pageNo - 1) * this.pagesize, this.pageNo * this.pagesize);
            },
            answerData: function () {
                return this.answers.slice((this.pageNo1 - 1) * this.pagesize1, this.pageNo1 * this.pagesize1);
            },
        },
        created: function() {
            this.userAccount = getCookie('username');
            this.role = getCookie('role');

            if(this.role == "students") {
                this.user = true;
                this.getQuestions();
            } else if (this.role == "doctors") {
                this.doctor = true;
                this.getAnswers();
            }
        },
        methods: {
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
            onDelete: function (id) {
                const self = this;

                self.$http.get('http://127.0.0.1:3000/api/question/delete', {
                    params: {
                        questionId: id
                    }
                }).then((res) => {
                    console.log(res);
                    self.questions = res.data;
                })
            },
            getQuestions: function () {
                const self = this;

                self.$http.get('http://127.0.0.1:3000/api/question/search', {
                    params: {
                        username: this.userAccount
                    }
                }).then((res) => {
                    console.log(res);
                    self.questions = res.data;
                  for(var i in self.questions) {
                    var time = self.questions[i].QuestionTime;

                    self.questions[i].QuestionTime = self.formatter(time);
//                      console.log(self.articles[0]);
                  }
                })
            },
            getAnswers: function () {
                const self = this;

                self.$http.get('http://127.0.0.1:3000/api/question/searchAnswer', {
                    params: {
                        username: this.userAccount
                    }
                }).then((res) => {
                    console.log(res);
                    self.answers = res.data;
                  for(var i in self.answers) {
                    var time = self.answers[i].QuestionTime;

                    self.answers[i].QuestionTime = self.formatter(time);
//                      console.log(self.articles[0]);
                  }
                })
            }
        }
    }
</script>
