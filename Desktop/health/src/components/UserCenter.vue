<template>
    <div id="content">
        <div class="contanier">
            <div class="row">
                <div class="nav col-lg-3 col-md-3 col-sm-3">
                    <el-menu
                            :default-active="$route.path"
                            class="el-menu-vertical-demo"
                            router>
                        <el-menu-item
                                :index="{path: '/usercenter/myinfo', query: {role: this.role}}">
                            <i class="el-icon-setting"></i>
                            <span slot="title">我的信息</span>
                        </el-menu-item>
                        <el-menu-item index="/usercenter/myquestion">
                            <i class="el-icon-document"></i>
                            <span slot="title">问题中心</span>
                        </el-menu-item>
                    </el-menu>
                </div>

                    <router-view class="col-lg-8 col-md-8 col-sm-8"/>

            </div>
        </div>

    </div>

</template>

<style scoped>
    #content {
        width: 80%;
        margin: 20px auto;
    }
</style>

<script>
    import {setCookie, getCookie} from '../assets/js/cookie'
    export default {
        created: function() {
            this.role = getCookie('role');
        },
        data () {
            return {
                role: '',
//                user: false,
//                doctor: false,
            }
        },
        methods: {}
    }
</script>
