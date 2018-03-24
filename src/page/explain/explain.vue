<template>
    <div>
        <head-top ref="headtop"></head-top>


        <div class="explain">
            <ul>
                <li>停车无忧提供的服务内容分为小车管制点与摩托管制点两个部分。</li>
                <li>进入［首页］可选择查看小车管制点与摩托管制点。（位置有地图标注）</li>
                <li>每日实时更新地点和时间（摩托车早上更新上午的，下午更新下午的，晚上更新晚上的。小车是晚上更新）若有调整，则以平台更新为准。不更新则无动态。</li>
                <li>这两个服务内容相信粉丝们可以想到的。</li>
            </ul>
        </div>

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
            this.$refs.headtop.rightTitle = ''
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
        border: 4px solid #0e82da;
        margin: 22px;
        border-radius: 10px;
    }
    .explain ul{
        list-style: square url(../../images/icon/right.png);
        margin-top: 10px;
    }
    .explain ul li{
        margin-left: 29px;
        margin-top: 11px;
        font-size: 1.02rem;
    }
    .explain h3{
        text-align: center;
        margin-top: 10px;
    }
</style>
