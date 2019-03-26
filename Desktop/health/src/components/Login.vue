<template>
    <div id="warp" v-show="isShown">
        <router-link to="/" class="close">x</router-link>
        <div class = "loginFrame">
            <el-form ref = "account" :model = "account" :rules="rules" label-position = "left" label-width = "0px" class = "demo-ruleForm login-container">
                <!--tab标签-->
                <el-tabs v-model = "activeName"
                         @tab-click = "handleClick"
                         class = "users">
                    <el-tab-pane label = "学生" name = "students"></el-tab-pane>
                    <el-tab-pane label = "医生" name = "doctors"></el-tab-pane>
                </el-tabs>
                <p class="hint" v-show="showTishi">{{tishi}}</p>
                <el-form-item prop = "username">
                    <el-input type = "text" v-model = "account.username" auto-complete = "off" placeholder = "请输入您的账号"></el-input></el-form-item>
                <el-form-item prop = "password">
                <el-input type = "password" v-model = "account.password" auto-complete = "off" placeholder = "请输入密码"></el-input></el-form-item>
                <!--<el-checkbox v-model = "checked" checked class = "remember">记住密码</el-checkbox>-->

                <el-form-item style = "width:100%;">
                    <el-button type = "primary" style = "width:100%;" v-on:click="login('account')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style scoped>
    #warp {
        position: fixed;
        left: 33%;
        top: 26%;
        width: 33%;
        z-index: 9999;
    }

    .login-container {
        box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        /*margin: 180px auto;*/
        /*width: 350px;*/
        padding: 35px 35px 15px 35px;
        min-width: 256px;
        background-color: rgba(255, 255, 255, 0.95);
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;

    }

    .close {
        font-weight: bold;
        font-size: 20px;
        color: #333;
        padding-right: 10px;
        padding-top: 5px;
    }

    .hint {
        text-align: center;
        color: red;
        font-size: 0.8em;
    }
</style>

<script>
//    export default {
//        data () {
//            return {}
//        },
//        methods: {
//            getValue() {
//                this.$http.get('/api/reader/searchUser', {
//                    params: {userAccount: Xue}
//                }).then((res) => {
//                    console.log('res', res);
//                })
//            }
//        }
//    }
    import {setCookie, getCookie} from '../assets/js/cookie'

    export default {
        created: function() {
           if(getCookie('username')) {
               this.isShown = false;
           }
        },
        methods: {
            handleClick(role) {
                this.activeName = role.name;
                console.log(role.name);
            },
            login(formName)
            {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var params = new URLSearchParams();
                        params.append('username', this.account.username);
                        params.append('password', this.account.password);
                        if(this.activeName == 'students') {
                            /*接口请求*/
                            this.$http.post('http://127.0.0.1:3000/api/user/login', params).then((res) => {
                                console.log(res);
                                /*接口的传值是(-1,该用户不存在),(0,密码错误)，同时还会检测管理员账号的值*/
                                if (res.data == -1) {
                                    this.tishi = "该用户不存在";
                                    this.showTishi = true;
                                } else if (res.data == 0) {
                                    this.tishi = "密码输入错误";
                                    this.showTishi = true;
                                } else {
                                    this.tishi = "登录成功";
                                    this.showTishi = true;
                                    setCookie('username', this.account.username, 1000 * 60);
                                    setCookie('role', this.activeName, 1000 * 60);
                                    setTimeout(function () {
//                                        this.$router.push('/')
                                        this.$router.go(0);
//                                        window.reload();
                                    }.bind(this), 1000)
                                }
                            })
                        }
                        else if (this.activeName == 'doctors') {
                            this.$http.post('http://127.0.0.1:3000/api/doctor/login', params).then((res) => {
                                console.log(res);
                                /*接口的传值是(-1,该用户不存在),(0,密码错误)，同时还会检测管理员账号的值*/
                                if (res.data == -1) {
                                    this.tishi = "该用户不存在";
                                    this.showTishi = true;
                                } else if (res.data == 0) {
                                    this.tishi = "密码输入错误";
                                    this.showTishi = true;
                                } else {
                                    this.tishi = "登录成功";
                                    this.showTishi = true;
                                    setCookie('username', this.account.username, 1000 * 60);
                                    setCookie('role', this.activeName, 1000 * 60);
                                    setTimeout(function () {
                                        this.$router.go(0);
                                    }.bind(this), 1000)
                                }
                            })
                        }
                    }
                })
            }
        },
//        name: '登录',
        data() {
            return {
                logining : false,
                showTishi: false,
                isShown: true,
                activeName: 'students',
                tishi: '',
                account : {
                    username:'',
                    password:'',
                },
                rules: {
                    username :[
                        {required: true, message: '请输入账号',trigger: 'blur'},
                        //{ validator: validaePass }
                    ],
                    password: [
                        {required: true,message: '请输入密码', trigger: 'blur'},
                        //{ validator: validaePass2 }
                    ]
                },
                checked: false

            };

        }
    }
</script>