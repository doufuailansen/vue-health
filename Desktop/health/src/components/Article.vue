<template>
    <div id="warp">
        <div class="contanier">
            <div class="row">
                <div id="first"  class="col-lg-5">
                    <div class="title">
                        <div></div>
                        <span class="center">心理测试</span>
                        <div></div>
                        <span class="arrow"></span>
                    </div>
                    <div class="main">
                        <ul class="test" v-show="show_test">
                            <li v-for="item in testData">
                                <img :src="item.img" alt="" class="image">
                                <a v-on:click="getQuestion(item.id)">{{item.title}}</a>
                            </li>
                        </ul>
                        <div class="question" v-show="show_question">
                            <p>{{question.title}}</p>
                            <div class="question_content" v-html="question.content"></div>
                            <a v-on:click="showTest">返回</a>
                        </div>
                    </div>
                    <div class="block" v-show="show_list">
                        <el-pagination
                                @current-change="handleCurrentChange"
                                @size-change="handleSizeChange"
                                layout="prev, pager, next"
                                :current-page="pageNo"
                                :page-size="pagesize"
                                :total="test.length">
                        </el-pagination>
                    </div>
                </div>
                <div id="second" class="col-lg-7">
                    <div class="title">
                        <div></div>
                        <span class="center">心理知识</span>
                        <div></div>
                        <span class="arrow"></span>
                    </div>
                    <div class="main">
                        <ul>
                            <li v-for="article in articleData" class="article">
                                <!--<div id="check">-->
                                <span class="time">{{article.ArticleTime}}</span>
                                <span class="article_title">{{article.ArticleTitle}}</span>
                                <!--</div>-->
                                <p v-html="article.ArticleContent" class="content">
                                    <!--{{article.ArticleContent}}-->
                                </p>
                                <!--<a class="more" href="#"> Read more...</a>-->
                            </li>
                        </ul>
                    </div>
                    <div class="block">
                        <el-pagination
                                @current-change="handleCurrentChange_"
                                @size-change="handleSizeChange_"
                                layout="prev, pager, next"
                                :current-page="pageNo_"
                                :page-size="pagesize_"
                                :total="articles.length">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <div class="top" v-show="isLogin">

        </div>
    </div>
</template>

<style scoped>
    #warp {
        width: 80%;
        margin: 20px auto;
        /*background-image: url("../assets/image/gray_background.png");*/
        /*background-size: contain;*/
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
    .center {
        text-align: left;
        font-size: 20px;
        display: block;
        margin-bottom: 20px;
    }

    /*测试*/
    .image {
        width: 30%;
        border-radius: 10%;
        display: inline-block;
    }

    .test li {
        text-align: left;
        padding: 20px;
        margin-left: 5%;
    }

    .test a {
        text-decoration: none;
        color: #4e555b;
        padding-left: 20px;
        cursor: pointer;
    }

    .question a {
        cursor: pointer;
        text-align: right;
    }

    /*主体*/
    .question {
        max-height: 900px;
        overflow: hidden;
    }

    .question:hover {
        overflow-y: auto;
    }

    .main ul {
        list-style: none;
        padding-left: 0;
    }

    .time {
        float: right;
        width: 20%;
        font-weight: lighter;
        font-size: 12px;
    }

    .article {
        padding-top: 10px;
        padding-bottom: 10px;
        border-top: #eee solid 1px;
    }

    .article:nth-last-child(1) {
        border-bottom: #eee solid 1px;
    }

    .article:hover {
        box-shadow: 1px 1px 10px #ccc;
    }

    .article span {
        display: inline-block;
        text-align: left;
    }

    .article_title {
        /*background-image: url("../assets/image/circle2.png");*/
        /*background-repeat: no-repeat;*/
        /*background-size: contain;*/
        margin-left: -50px;
        text-indent: 70px;
        font-size: 1.3em;
        height: 50px;
        line-height: 50px;
        display: block;
        width: 120%;
    }

    .content {
        text-align: left;
        padding: 0 30px 0;
        font-size: 0.9em;
        color: #666;
        font-weight: 200;
    }

    @media screen and (max-width: 992px) {
        .title {
            display: block;
            font-size: 20px;
            text-align: center;
            margin-top: 20px;
        }

        .center {
            display: inline;
            padding: 10px 5% 0;
        }

        .title div {
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
    }
</style>

<script>
    import {setCookie, getCookie, delCookie} from '../assets/js/cookie'
    export default {
        data () {
            return {
                isLogin: true,
                pageNo: 1,//当前页码
                pagesize: 6,
                pageNo_: 1,
                pagesize_: 3,
                show_test: true,
                show_question: false,
                show_list: true,
                articleTime: [],
                articles: [{

                    }],
                test: [{

                }],
                question: [{

                }]
            }
        },
        computed: {
            articleData: function () {
                return this.articles.slice((this.pageNo_ - 1) * this.pagesize_,
                    this.pageNo_ * this.pagesize_);
            },
            testData: function () {
                return this.test.slice((this.pageNo - 1) * this.pagesize, this.pageNo * this.pagesize);
            }
        },
        created: function() {
            this.getArticle();
            this.getTest();
            if(getCookie("username")) {
                this.isLogin = false;
            } else {
                this.open();
            }
        },
        methods: {
            open() {
                this.$alert('请先登录后查看，点击确定跳转登录页面！', '请先登录', {
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
            showTest: function () {
                this.show_test = true;
                this.show_question = false;
                this.show_list = true;
            },
            showQuestion: function () {
                this.show_test = false;
                this.show_question = true;
                this.show_list = false;
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
            handleSizeChange_: function (size) {
                this.pagesize_ = size;
                console.log(this.pagesize_); //每页下拉显示数据
            },
            //点击下一页和点击页码时执行
            handleCurrentChange_: function(currentPage){
                this.pageNo_ = currentPage;
                console.log(this.pageNo_); //点击第几页
            },
            getRandom(lower, upper) {
              return Math.floor(Math.random() * (upper - lower+1)) + lower;
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
            formatterDateTime() {
            var date=new Date();
            var month=date.getMonth() + 1;
            var datetime = date.getFullYear()
            + ""// "年"
            + (month >= 10 ? month : "0"+ month)
            + ""// "月"
            + (date.getDate() < 10 ? "0" + date.getDate() : date
                .getDate())
            + ""
            + (date.getHours() < 10 ? "0" + date.getHours() : date
                .getHours())
            + ""
            + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                .getMinutes())
            + ""
            + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                .getSeconds());
              return datetime;
            },
            getArticle() {
                const self=this;
                self.$http.get('http://127.0.0.1:3000/api/article/select',{ }).then((res) => {
//                    console.log(res);
                    self.articles = res.data;
                    //this.articleTime = this.formatter();
                    for(var i in self.articles) {
                        var time = self.articles[i].ArticleTime;
                        var content = self.articles[i].ArticleContent;
                      self.articles[i].ArticleTime = self.formatter(time);
                      self.articles[i].ArticleContent = content.replace(/\s+/g, '<br/><br/>');
//                      console.log(self.articles[0]);
                    }

                })


            },
            getTest() {
                const self = this;
                var params = new URLSearchParams();
                params.append('showapi_timestamp', self.formatterDateTime());
                params.append('showapi_appid', '88321');
                params.append('showapi_sign', '1900eb1ecaa24bb0859706707c1f8b8d');
                params.append('page', self.getRandom(1, 269));
                self.$http.post('http://route.showapi.com/970-1', params).then((res) => {
                    console.log(res);
                    self.test = res.data['showapi_res_body']['pagebean']['contentlist'];
                });
                this.showTest();
//                this.show_list = true;
            },
            getQuestion(url) {
                const self = this;
                console.log(url);
                var params = new URLSearchParams();
                params.append('showapi_timestamp', self.formatterDateTime());
                params.append('showapi_appid', '88321');
                params.append('showapi_sign', '1900eb1ecaa24bb0859706707c1f8b8d');
                params.append('id', url);
                self.$http.post('http://route.showapi.com/970-2', params).then((res) => {
                    console.log(res);
                    self.question = res.data['showapi_res_body']['item'];
                });
                this.showQuestion();
            },
        }
    }
</script>
