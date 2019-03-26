<template>
    <div id="content">
        <div id="info">
            <img src="../assets/image/doctor.jpg" alt="">
            <!--<a href="#" class="tag">{{doctor.DocSepciality}}</a>-->
            <div class="warp">
                <span class="name">{{doctor.DocName}}</span>
                <span class="info">
            <span class="sex">{{doctor.DocSex}} </span>
            <span class="career">从业{{doctor.DocCareer}}年 </span>
            <span class="location">{{doctor.DocCity}} </span>
                <span class="speciality">擅长: {{doctor.DocSepciality}}</span>
            </span>
                <p class="introduction">{{doctor.DocIntro}}</p>
                <span class="phone">TEL:{{doctor.DocPhone}}</span>
            </div>
        </div>
        <div id="ask" v-show="ask">
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item prop="title" label="问题标题" >
                    <el-input  v-model="form.title" placeholder="例：请问我最近总是失眠有什么办法解决吗？"></el-input>
                </el-form-item>
                <el-form-item prop="content" label="具体描述">
                    <el-input v-model="form.content" type="textarea" style="height: 140px; overflow: auto;" ></el-input>
                </el-form-item>
                <p class="hint" v-show="showTishi">{{tishi}}</p>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')">提 交</el-button>
                    <!--<el-button>取消</el-button>-->
                </el-form-item>
            </el-form>
        </div>
        <div id="answer" v-show="answer">

        </div>
    </div>
</template>

<style scoped>
    #content {
        width: 80%;
        margin: 20px auto;
    }
    /*医生信息*/
    #info {
        background: #eee;
        /*height: 140px;*/
        height: auto;
        width: 100%;
        border-radius: 5px;
        text-align: left;
    }

    .warp {
        padding: 10px 20px;
    }

    img {
        width: 100px;
        height: 100px;
        border-radius: 50px;
        line-height: 100%;
        margin: 20px;
        float: left;
    }

    .name {
        /*display: block;*/
        font-size: 20px;
        font-weight: bold;
        /*padding: 10px;*/
    }

    .info {
        font-size: 13px;
        color: #666;
        font-weight: lighter;
        padding: 5px;
    }

    .introduction {
        font-size: 0.8em;
        /*padding-bottom: 5px;*/
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .phone {
        color: #666;
        font-weight: lighter;
        text-align: right;
        font-size: 14px;
    }
    /*提问*/
    #ask {
        margin-top: 40px;
    }

    .hint {
        text-align: center;
        color: red;
        font-size: 0.8em;
    }
</style>

<script>
    import {setCookie, getCookie} from '../assets/js/cookie'

    export default {
        data () {
            return {
                ask: true,
                answer: false,
                showTishi: false,
                tishi: '',
                userId: '',
                username: '',
                docId: '',
                doctor: {},
                form: {
                    title: '',
                    content: '',
                },
                rules: {
                    title: [
                        {required: true, message: '请输入您想咨询的问题', trigger: 'blur'}
                    ],
                }
            }
        },
        created: function() {
            this.username = getCookie('username');
            this.getDoctor();
            this.getUserId();
        },
        methods: {
            formatterDateTime() {
                var date = new Date();
                var month = date.getMonth() + 1;
                var datetime = date.getFullYear()
                    + ""// "年"
                    + (month >= 10 ? month : "0" + month)
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
            getDoctor: function () {
                const self = this;
                console.log(this.$route.query.docName);
                self.$http.get('http://127.0.0.1:3000/api/doctor/selectByName', {
                    params: {
                        docName: this.$route.query.docName
                    }
                }).then((res) => {
                    console.log(res);
                    self.doctor = res.data[0];
                })
            },
            getUserId: function () {
              const self = this;
                self.$http.get('http://127.0.0.1:3000/api/user/getId', {
                    params: {
                        username: this.username
                    }
                }).then((res) => {
                    console.log(res);
                    self.userId = res.data[0].UserId;
                })
            },
            onSubmit: function (formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        var params = new URLSearchParams();
                        params.append('userId', self.userId);
                        params.append('questionTitle', this.form.title);
                        params.append('questionContent', this.form.content);
                        params.append('time', this.formatterDateTime());
                        params.append('docId', this.doctor.DocId);
                        self.$http.post('http://127.0.0.1:3000/api/question/addQuestion', params).then((res) => {
                            console.log(res);
                            this.form.title = '';
                            this.form.content = '';
                            this.tishi = '提交成功，请耐心等待解答！';
                            this.showTishi = true;
                        })
                    }
                })
            }
        }
    }
</script>