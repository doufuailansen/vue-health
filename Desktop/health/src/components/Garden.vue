<template>
    <div id="content">
        <div class="container">
            <div class="row">
                <div id="list"  class="col-md-8">
                    <div class="title">
                        <div></div>
                        <span class="center">心理园地</span>
                        <div></div>
                        <span class="arrow"></span>
                    </div>
                    <ul>
                        <li class="question">
                            <span class="time">2018.09.12 来自 喵喵</span>
                            <span class="count">浏览量100</span>
                            <!--<div id="check">-->
                            <span class="ask">想回到过去</span>
                            <!--</div>-->
                            <span class="answer">
                                本案例由心理咨询师<a href="#">张三</a>等提供解答
                            </span>
                            <a class="more" href="#">查看详情</a>
                        </li>
                    </ul>
                </div>
                <div id="recommend" class="col-md-4">
                    <div class="title">
                        <div></div>
                        <span class="center">推荐专家</span>
                        <div></div>
                        <span class="arrow"></span>
                    </div>
                </div>
            </div>

        </div>

    </div>


</template>

<style scoped>
    #content {
        width: 80%;
        margin: 20px auto;
        /*background-image: url("../assets/image/gray_background.png");*/
        /*background-size: contain;*/
    }

    /*list*/
    #list ul {
        list-style: none;
    }

    .center {
        text-align: left;
        font-size: 20px;
        display: block;
        margin-bottom: 20px;
    }

    .question {
        padding-top: 10px;
        padding-left: 25px;
        padding-bottom: 10px;
        border-top: #eee solid 1px;
    }

    .question:nth-last-child(1) {
        border-bottom: #eee solid 1px;
    }

    .question:hover {
        box-shadow: 1px 1px 10px #ccc;
    }

    .question span {
        display: inline-block;
        text-align: left;
    }

    .count {
        float: right;
        width: 20%;
        font-weight: lighter;
        font-size: 12px;
    }

    .time {
        font-weight: lighter;
        width: 80%;
    }

    .ask {
        background-image: url("../assets/image/circle2.png");
        background-repeat: no-repeat;
        background-size: contain;
        margin-left: -50px;
        text-indent: 70px;
        font-size: 20px;
        height: 50px;
        line-height: 50px;
        display: block;
        width: 120%;
    }

    .answer {
        font-size: 12px;
        /*width: 80%;*/
        padding-right: 50px;
        padding-bottom: 20px;
    }

    .more {
        text-decoration: none;
        color: white;
        background-color: #44D84E;
        font-size: 14px;
        border-radius: 6px;
        padding: 5px 10px;
        display: inline-block;
    }

    @media screen and (max-width: 767px) {
        /*推荐*/
        #recommend {
            margin-top: 20px;
        }

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
    export default {
        data () {
            return {}
        },
        methods: {}
    }
</script>