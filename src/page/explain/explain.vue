<template>
    <div>
        <div class="explain">
            <divider>平台服务内容与更新</divider>
            <ul>
                <li>行车无忧提供的服务内容分为《小车管制点》与《摩托管制点》两个部分。</li>
                <li>进入［首页］可选择查看小车管制点与摩托管制点。（位置有地图标注）</li>
                <li>每日实时更新地点和时间（摩托车早上更新上午的，下午更新下午的，晚上更新晚上的。小车是晚上更新）若有调整，则以平台更新为准。</li>
                <li>时间和地点都是落实后平台才更新，若一直未更新则无动态。</li>
                <li>出门前请多多查看，预防更新。</li>
            </ul>
            <divider>会员说明</divider>
            <ul>
                <li>初次关注的粉丝都可获得由平台赠送的一张有效期为7天的vip体验卡。(一个微信一次)</li>
                <li>会员可购买包月卡/包季卡，一次性购买的时间越长，优惠越大。</li>
                <li>若不购买包月或包季业务，也可按天收费，每天2元，即无限次查看当天的内容。(0点为界)</li>
            </ul>
        </div>

    </div>

</template>


<script>

    import {mapState} from 'vuex'
    import { Divider} from 'vux'

    import {getStore} from '../../config/mUtils'
    export default {
        data () {
            return {
                logged: '',
            }
        },
        components: {Divider},
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


    .explain {
        padding: 13px;
        border: 4px solid #52af24;
        margin: 22px;
        border-radius: 10px;
        background: #52af24;
    }
    .explain p {
        color: #d4f430;
        font-size: 22px;
    }
    .explain ul{
        list-style: square url(../../images/icon/right_14_yellow.png);
        margin-top: 10px;
    }
    .explain ul li{
        margin-left: 29px;
        margin-top: 6px;
        font-size: 1rem;
        color:#ffffff;
    }
    .explain h3{
        text-align: center;
        margin-top: 10px;
    }
</style>
