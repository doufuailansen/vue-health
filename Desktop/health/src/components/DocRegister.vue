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
                    <el-select class="select-sex" v-model="form.sex" placeholder="请选择性别" @change="setSexValue($event)">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="career" label="从业时间">
                    <el-input v-model="form.career" placeholder="例：7"></el-input>
                </el-form-item>
                <el-form-item prop="city" label="所在地">
                    <el-select class="select-city" v-model="form.city" placeholder="请选择您的所在地" @change="setCityValue($event)">
                        <el-option
                            v-for="item in cities"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="speciality" label="擅长领域">
                    <el-input v-model="form.speciality" placeholder="例：抑郁"></el-input>
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
                <el-form-item prop="info" label="自我介绍">
                    <el-input v-model="form.info" type="textarea" style="height: 140px; overflow: auto;" ></el-input>
                </el-form-item>
                <p class="hint" v-show="showTishi">{{tishi}}</p>
                <el-button type = "primary" style="width:34%; margin-left: 33%;" v-on:click="register('form')">我要入驻</el-button>

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
                    phone: '',
                    city: '',
                    speciality: '',
                    career: '',
                    info: ''
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
                    ],
                    city: [
                        { required: true, message: '请输入您的所在地', trigger: 'blur' }
                    ],
                    speciality: [
                        { required: true, message: '请输入您的专长', trigger: 'blur' }
                    ],
                    career: [
                        { required: true, message: '请输入您的从业时长', trigger: 'blur' }
                    ],
                    info: [
                        { required: true, message: '请输入您的自我介绍', trigger: 'blur' }
                    ]
                },
                cities: [{
                    value: '北京',
                    label: '北京'
                },{
                    value: '天津',
                    label: '天津'
                },{
                    value: '上海',
                    label: '上海'
                },{
                    value: '重庆',
                    label: '重庆'
                },{
                    value: '河北',
                    label: '河北'
                },{
                    value: '山西',
                    label: '山西'
                },{
                    value: '辽宁',
                    label: '辽宁'
                },{
                    value: '吉林',
                    label: '吉林'
                },{
                    value: '黑龙江',
                    label: '黑龙江'
                },{
                    value: '江苏',
                    label: '江苏'
                },{
                    value: '浙江',
                    label: '浙江'
                },{
                    value: '安徽',
                    label: '安徽'
                },{
                    value: '福建',
                    label: '福建'
                },{
                    value: '江西',
                    label: '江西'
                },{
                    value: '山东',
                    label: '山东'
                },{
                    value: '河南',
                    label: '河南'
                },{
                    value: '湖南',
                    label: '湖南'
                },{
                    value: '广东',
                    label: '广东'
                },{
                    value: '海南',
                    label: '四川'
                },{
                    value: '贵州',
                    label: '贵州'
                },{
                    value: '云南',
                    label: '云南'
                },{
                    value: '陕西',
                    label: '陕西'
                },{
                    value: '甘肃',
                    label: '甘肃'
                },{
                    value: '青海',
                    label: '青海'
                },{
                    value: '台湾',
                    label: '台湾'
                },{
                    value: '香港',
                    label: '香港'
                },{
                    value: '澳门',
                    label: '澳门'
                },{
                    value: '内蒙古',
                    label: '内蒙古'
                },{
                    value: '广西',
                    label: '广西'
                },{
                    value: '西藏',
                    label: '西藏'
                },{
                    value: '宁夏',
                    label: '宁夏'
                },{
                    value: '新疆',
                    label: '新疆'
                }]
            }
        },
        methods: {
            setSexValue(value) {
                this.form.sex = value;
            },
            setCityValue(value) {
                this.form.city = value;
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
                        params.append('career', this.form.career);
                        params.append('city', this.form.city);
                        params.append('speciality', this.form.speciality);
                        params.append('phone', this.form.phone);
                        params.append('info', this.form.info);
                        this.$http.post('http://127.0.0.1:3000/api/doctor/addDoctor',params).then((res)=>{
                            console.log(res);
                            /*接口的传值是(-1,该用户已存在)*/
                            if(res.data == -1) {
                                this.tishi = "该用户名已存在";
                                this.showTishi = true;
                                this.form.username = '';
                                this.form.checkpassword = '';
                                this.form.password = '';
                                this.form.name = '';
                                this.form.career = '';
                                this.form.info = '';
                                this.form.sex = '';
                                this.form.city = '';
                                this.form.speciality = '';
                                this.form.phone = '';
                            }
                            else if(res.status == 200){
                                this.tishi = "注册成功";
                                this.showTishi = true;
                                this.form.username = '';
                                this.form.checkpassword = '';
                                this.form.password = '';
                                this.form.sex = '';
                                this.form.name = '';
                                this.form.city = '';
                                this.form.career = '';
                                this.form.info = '';
                                this.form.speciality = '';
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