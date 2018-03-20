<template>
    <div>
        <head-top ref="headtop"></head-top>


        <div class="explain">
            <ul>
                <li>停车无忧提供的服务内容分为小车执勤点与摩托执勤点两个部分。</li>
                <li>进入［首页］可选择查看小车执勤点与摩托执勤的具体时间和地点。（位置有地图标注）</li>
                <li>每日实时更新地点和时间（摩托一般是早上9:35更新 小车是晚上20：00更新）具体以平台更新为准。</li>
                <li>这两个服务内容相信粉丝们可以想到的</li>
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
