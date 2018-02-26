<template>
    <div>
        <head-top ref="headtop"></head-top>
        <!--<div class="vux-demo">-->
            <!--<img class="logo" src="../../images/liecheng_logo.png">-->
            <!--<h3>昵称</h3>-->
        <!--</div>-->

        <group>
            <cell title="我的车牌"  value="未绑定" link="/bindCarNum" v-if="!userInfo.plate_num" is-link></cell>
            <cell title="我的车牌"  :value="userInfo.plate_num" v-if="userInfo.plate_num" ></cell>
            <cell title="会员信息"  value="vip会员" v-if="userInfo.is_vip"></cell>
            <cell title="会员信息"  link="/becomeMember" value="成为会员" v-if="!userInfo.is_vip" is-link></cell>
            <cell title="手机号码"  link="/bindMobile" is-link value="未绑定" v-if="!userInfo.mobile"></cell>
            <cell title="手机号码"  :value="userInfo.mobile" v-if="userInfo.mobile"></cell>
        </group>

        <group>
            <cell title="停车记录"  link="/stopRecord" is-link ></cell>
        </group>
        <group>
            <cell title="提醒记录"  link="/tipLog" is-link ></cell>
        </group>
        <group>
            <cell title="帮助中心"  link="/help" is-link ></cell>
            <cell title="联系客服"  link="/contact" is-link ></cell>
        </group>

    </div>
</template>


<script>
    import {mapState} from 'vuex'
    import {getStore} from '../../config/mUtils'
    import mapping from '../../config/mapping'
    import {getUsers} from '../../service/getData'

    export default {
        data () {
            return {
                logged: '',
                mapping: mapping,
                is_member : '非会员',
                userInfo : {},
            }
        },
        components: {},
        computed: {
//            ...mapState([
//                'agentInfo',
//            ]),
        },
        created() {
            this.initData()
        },
        activated(){

        },
        mounted() {
            console.log(1117777111111111117)
        },
        methods: {
            initData(){
                this.getUsers()
            },
            getUsers(){
                return getUsers()
                    .then((data => {
                        if(data.code === 200) {
                            this.userInfo = data.data
                        }
                    }))
            }
        }
    }
</script>

<style>
    .vux-demo {
        text-align: center;
    }

    .logo {
        width: 100px;
        height: 100px
    }
</style>
