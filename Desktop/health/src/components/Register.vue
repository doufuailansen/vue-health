<template>
    <div id="warp">
        <router-link to="/" class="close">x</router-link>
        <div id="warp-inside">
            <el-form class="group" ref="form" :model="form" :rules="rules"  label-width="80px">
                <el-form-item prop="username" label="用户名">
                    <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="设置密码">
                    <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item prop="checkpassword" label="确认密码">
                    <el-input  v-model="form.checkpassword" type="password" placeholder="请重复密码"></el-input>
                </el-form-item>
                <el-form-item prop="name" label="姓名">
                    <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item prop="sex" label="性别">
                    <el-select class="select-sex" v-model="form.sex" placeholder="请选择性别" @change="setValue($event)">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item prop="city" label="所在地">-->
                    <!--<el-cascader-->
                            <!--:options="options"-->
                            <!--v-model="form.city"-->
                            <!--@change="handleChange">-->
                    <!--</el-cascader>-->
                <!--</el-form-item>-->
                <el-form-item prop="phone" label="手机号">
                    <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <p class="hint" v-show="showTishi">{{tishi}}</p>
                <el-button type = "success" style="width:34%; margin-left: 33%;" v-on:click="register('form')">注册</el-button>

            </el-form>
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
    }

    .close {
        font-weight: bold;
        font-size: 20px;
        color: #333;
        padding-right: 10px;
        padding-top: 5px;
    }

    .group {
        margin: 0 20px;
    }

    .hint {
        text-align: center;
        color: red;
        font-size: 0.8em;
    }

    label {
        text-align: right;
        width: 65px;
        color: #666;
    }

    input {
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    .el-form-item {
        margin-bottom: 18px;
    }

</style>

<script>
    import Util from '../../utils/utils'
    export default {
        data () {
            var validatePass = (rule, value, callback) => {
                if(value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if(this.form.checkpassword !== '') {
                        this.$refs.form.validateField('checkpassword');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if(value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入的密码不一致'));
                } else {
                    callback();
                }
            };
            var validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else if (!Util.phoneReg.test(this.form.phone)){
                    callback(new Error('请输入正确的手机号'));
                } else {
                    callback();
                }
            };
            return {
                showTishi: false,
                tishi: '',
                form: {
                    username: '',
                    password: '',
                    checkpassword: '',
                    name: '',
                    sex: '',
                    phone: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkpassword: [
                        { required: true, message: '请确认密码', trigger: 'blur' },
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { validator: validatePhone, trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: '请输入性别', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            setValue(value) {
                this.form.sex = value;
            },
            register(formName)
            {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var params = new URLSearchParams();
                        params.append('username', this.form.username);
                        params.append('password', this.form.password);
                        params.append('name', this.form.name);
                        params.append('sex', this.form.sex);
                        params.append('phone', this.form.phone);
                        this.$http.post('http://127.0.0.1:3000/api/user/addUser',params).then((res)=>{
                            console.log(res);
                            /*接口的传值是(-1,该用户已存在)*/
                            if(res.data == -1) {
                                this.tishi = "该用户已存在";
                                this.showTishi = true;
                                this.form.username = '';
                                this.form.checkpassword = '';
                                this.form.password = '';
                                this.form.name = '';
                                this.form.phone = '';
                            }
                            else if(res.status == 200){
                                this.tishi = "注册成功";
                                this.showTishi = true;
                                this.form.username = '';
                                this.form.checkpassword = '';
                                this.form.password = '';
                                this.form.name = '';
                                this.form.phone = '';
                                /*注册成功之后再跳回登录页*/
                                setTimeout(function(){
                                    this.$router.push('/index');
                                }.bind(this),1000)
                            }
                        })
                    }
                })
            }
        }
    }
</script>