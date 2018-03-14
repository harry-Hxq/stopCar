<template>
    <div>
        <head-top ref="headtop"></head-top>
        <div class="header">
             <span >{{userInfo.username}}</span>
            <img :src="userInfo.headimg" alt="" width="60px">
        </div>
        <group>
            <cell title="我的车牌"  value="未绑定" link="/bindCarNum" v-if="!userInfo.plate_num" is-link>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/car_num_20.png">
            </cell>
            <cell title="我的车牌"  :value="userInfo.plate_num" v-if="userInfo.plate_num" is-link link="/bindCarNum">
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/car_num_20.png">
            </cell>
            <cell title="会员信息" link="/becomeMember"  value="vip会员" v-if="userInfo.is_vip" is-link>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/huiyuan_20.png">
            </cell>
            <cell title="会员信息"  link="/becomeMember" value="成为会员" v-if="!userInfo.is_vip" is-link>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/huiyuan_20.png">
            </cell>
            <cell title="手机号码"  link="/bindMobile" is-link value="未绑定" v-if="!userInfo.mobile">
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/phone_20.png">
            </cell>
            <cell title="手机号码"  :value="userInfo.mobile" v-if="userInfo.mobile" link="/bindMobile" is-link>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/phone_20.png">
            </cell>
        </group>

        <group>
            <cell title="停车记录"  link="/stopRecord" is-link >
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/stop_log_20.png">
            </cell>
        </group>
        <group>
            <cell title="提醒记录"  link="/tipLog" is-link >
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/tip_log_20.png">
            </cell>
        </group>
        <!--<group>-->
            <!--<cell title="帮助中心"  link="/help" is-link >-->
                <!--<img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/phone_20.png">-->
            <!--</cell>-->
            <!--<cell title="联系客服"  link="/contact" is-link >-->
                <!--<img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/help_20.png">-->
            <!--</cell>-->
        <!--</group>-->
        <!--<nav-tab></nav-tab>-->

    </div>
</template>


<script>
    import {mapState} from 'vuex'
    import {getStore} from '../../config/mUtils'
    import mapping from '../../config/mapping'
    import {getUsers} from '../../service/getData'
    import navTab from '../../components/navTab'

    export default {
        data () {
            return {
                logged: '',
                mapping: mapping,
                is_member : '非会员',
                userInfo : {},
            }
        },
        components: {navTab},
        computed: {
//            ...mapState([
//                'agentInfo',
//            ]),
        },
        created() {
            this.getUsers()
        },
        activated(){

        },
        mounted() {
            console.log(111)

        },
        methods: {

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
.header{
    background: #0e82da;
    color: #fff;
    height: 91px;
}
    .header span {
        margin-left: 21px;
        line-height: 5rem;
    }
    .header img {
        float: right;
        border-radius: 50%;
        margin-right: 18px;
    }
</style>
