<template>
    <div>
        <head-top ref="headtop"></head-top>


        <div class="memberContent2">
            <!--<h3>关于小车</h3>-->
            <ul>
                <li>内部优势，实时得知交警正在执勤的路段或即将执勤的路段，随时掌握动向。</li>
                <li>有效的规避违停罚单，省时省钱。</li>
                <li>若有交警正在您的停车位置附近执勤，在即将贴罚单前，平台会通过微信公众号和短信发送提醒通知。</li>
                <li>按提醒次数收费，经济划算。</li>
                <li>随时随地无忧停放，车主无忧。</li>
            </ul>

            <!--<h3>关于摩托</h3>-->
            <!--<ul>-->
                <!--<li>骑车出门，只需点开地图即可掌握执勤地点和时间。</li>-->
            <!--</ul>-->

        </div>

        <!--<h1>会员专享</h1>-->
    </div>
</template>


<script>
    import {mapState} from 'vuex'
    import {getStore} from '../../config/mUtils'
    export default {
        data () {
            return {
                logged: '',
            }
        },
        components: {},
        computed: {
            ...mapState([
                'agentInfo',
            ]),
        },
        created() {

        },
        activated(){

        },
        mounted() {

        },
        methods: {
            logout() {
                App.LOGOUT()
                this.logged = false
            },
        }
    }
</script>

<style>
    .memberContent2 ul{
        list-style: square url(../../images/icon/right.png);
        margin-top: 10px;
    }
    .memberContent2 ul li{
        margin-left: 29px;
        margin-top: 11px;
        font-size: 1.02rem;


    }
    .memberContent2 h3{
        text-align: center;
        margin-top: 10px;
    }
</style>
