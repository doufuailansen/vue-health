<template>
    <div id="warp-inside">
        <el-form class="group" ref="form" :model="form" label-width="80px" :rules="rules" v-show="showuser">
            <el-form-item prop="username" label="用户名">
                <el-input v-model="form.username"  disabled :placeholder=user.UserAccount></el-input>
            </el-form-item>
            <el-form-item prop="password" label="我的密码">
                <el-input v-model="form.password" :placeholder=user.UserPassWord></el-input>
            </el-form-item>
            <el-form-item prop="name" label="我的姓名">
                <el-input v-model="form.name" disabled :placeholder=user.UserName></el-input>
            </el-form-item>
            <el-form-item prop="sex" label="性别">
                <el-select class="select-sex" disabled v-model="form.sex" :placeholder=user.UserSex  @change="setValue($event)">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="phone"  label="手机号">
                <el-input v-model="form.phone" :placeholder=user.UserPhone></el-input>
            </el-form-item>
            <p class="hint" v-show="showTishi">{{tishi}}</p>
            <el-button type = "success" style="width:34%; margin-left: 33%;" v-on:click="update('form')">更 新</el-button>

        </el-form>
        <el-form class="group" ref="form1" :model="form1" label-width="80px" :rules="rules1" v-show="showdoctor">
            <el-form-item prop="docusername" label="用户名">
                <el-input v-model="form1.docusername"  disabled :placeholder=doctor.DocAccount></el-input>
            </el-form-item>
            <el-form-item prop="docpassword" label="我的密码">
                <el-input v-model="form1.docpassword" :placeholder=doctor.DocPassWord></el-input>
            </el-form-item>
            <el-form-item prop="docname" label="我的姓名">
                <el-input v-model="form1.docname" disabled :placeholder=doctor.DocName></el-input>
            </el-form-item>
            <el-form-item prop="docsex" label="性别">
                <el-select class="select-sex" v-model="form1.docsex" :placeholder=doctor.DocSex disabled @change="setValue1($event)">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="career"  label="从业时长">
                <el-input v-model="form1.career" :placeholder=doctor.DocCareer></el-input>
            </el-form-item>
            <el-form-item prop="city" label="所在地">
                <el-select class="select-city" v-model="form1.city" :placeholder=doctor.DocCity @change="setCityValue($event)">
                    <el-option
                            v-for="item in cities"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="docphone"  label="手机号">
                <el-input v-model="form1.docphone" :placeholder=doctor.DocPhone></el-input>
            </el-form-item>
            <el-form-item prop="info" label="自我介绍">
                <el-input v-model="form1.info" type="textarea" style="height: 140px; overflow: auto;" ></el-input>
            </el-form-item>
            <p class="hint" v-show="showTishi1">{{tishi1}}</p>
            <el-button type = "success" style="width:34%; margin-left: 33%;" v-on:click="docupdate('form1')">更 新</el-button>

        </el-form>
    </div>

</template>

<style scoped>

    #warp-inside {
        margin: 30px auto;
        text-align: left;
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

</style>

<script>
    import Util from '../../utils/utils'
    import {setCookie, getCookie} from '../assets/js/cookie'

    export default {
        data () {
            var validatePass = (rule, value, callback) => {
                if(value === '') {
                    callback(new Error('请输入密码'));
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

            var validatePass1 = (rule, value, callback) => {
                if(value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };

            var validatePhone1 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else if (!Util.phoneReg.test(this.form1.docphone)){
                    callback(new Error('请输入正确的手机号'));
                } else {
                    callback();
                }
            };
            return {
                userAccount: '',
                docIntro: '',
                doctor: {},
                user:  {},
                showuser: false,
                showdoctor: false,
                tishi: '',
                tishi1: '',
                showTishi: false,
                showTishi1: false,
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
                }],
                form: {
                    username: '',
                    password:  '',
                    name: '',
                    sex: '',
                    phone: ''
                },
                form1: {
                    docusername: '',
                    docpassword:  '',
                    docname: '',
                    docsex: '',
                    docphone: '',
                    career: '',
                    city: '',
                    info: this.docIntro
                },
                rules: {
                    username: [
                        { message: '请输入用户名', trigger: 'blur' }
                    ],
                    name: [
                        {  message: '请输入姓名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { validator: validatePhone, trigger: 'blur' }
                    ],
                    sex: [
                        {  message: '请输入性别', trigger: 'blur' }
                    ]
                },
                rules1: {
                    docusername: [
                        { message: '请输入用户名', trigger: 'blur' }
                    ],
                    docname: [
                        { message: '请输入姓名', trigger: 'blur' }
                    ],
                    docpassword: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { validator: validatePass1, trigger: 'blur' }
                    ],
                    docphone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { validator: validatePhone1, trigger: 'blur' }
                    ],
                    docsex: [
                        {  message: '请输入性别', trigger: 'blur' }
                    ],
                    career: [
                        {  required: true, message: '请输入你的工作时长', trigger: 'blur'},
                    ],
                    city: [
                        {  required: true, message: '请选择你的所在地', trigger: 'blur'},
                    ],
                    info: [
                        {  required: true, message: '请输入你的自我介绍', trigger: 'blur'},
                    ],

                }
            }
        },
        created: function() {
            this.userAccount = getCookie('username');
//            console.log(this.$route.query.role + "!!!");
            if(this.$route.query.role == "students") {
                this.showuser = true;
                this.getUserInfo();
            }
            else if (this.$route.query.role =="doctors") {
                this.showdoctor = true;
                this.getDoctorInfo();
            }

        },
        methods: {
            setCityValue(value) {
                this.form1.city = value;
            },
            setValue(value) {
                this.form.sex = value;
            },
            setValue1(value) {
                this.form1.sex = value;
            },
            update(formName)
            {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var params = new URLSearchParams();
                        params.append('username', this.userAccount);
                        params.append('password', this.form.password);
                        params.append('name', this.user.UserName);
                        params.append('sex', this.user.UserSex);
                        params.append('phone', this.form.phone);
                        this.$http.post('http://127.0.0.1:3000/api/user/update',params).then((res)=>{
                            console.log(res);
                            /*接口的传值是(-1,该用户已存在)*/
                            if(res.status == 200){
                                this.tishi = "更新成功";
                                this.showTishi = true;
                            }
                        })
                    }
                })
            },
            docupdate(formName)
            {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var params = new URLSearchParams();
                        params.append('username', this.userAccount);
                        params.append('password', this.form1.docpassword);
                        params.append('career', this.form1.career);
                        params.append('city', this.form1.city);
                        params.append('intro', this.form1.info);
                        params.append('phone', this.form1.docphone);
                        this.$http.post('http://127.0.0.1:3000/api/doctor/update',params).then((res)=>{
                            console.log(res);
                            /*接口的传值是(-1,该用户已存在)*/
                            if(res.status == 200){
                                this.tishi1 = "更新成功";
                                this.showTishi1 = true;
                            }
                        })
                    }
                })
            },
            getUserInfo: function () {
                const self = this;
                self.$http.get('http://127.0.0.1:3000/api/user/searchUserAccount', {
                    params: {
                        username: self.userAccount
                    }
                }).then((res) => {
                    console.log(res);
                    self.user = res.data[0];
                });
            },
            getDoctorInfo: function () {
                const self = this;
                self.$http.get('http://127.0.0.1:3000/api/doctor/searchDoctorAccount', {
                    params: {
                        username: self.userAccount
                    }
                }).then((res) => {
                    console.log(res);
                    self.doctor = res.data[0];
                    self.docIntro = res.data[0].DocIntro;
                });
            },
        }
    }
</script>