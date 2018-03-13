<template>
    <div>
        <head-top ref="headtop"></head-top>

        <div class="userCard">
            <div class="userinfo">
                <img :src="userInfo.headimg" alt="">
                <span class="username">{{userInfo.username}}</span>
                <br>
                <span class="dateline" v-if="userInfo.is_vip">距结算周期还剩 <strong>{{userInfo.dateline}}</strong> 天</span>
                <span class="dateline" v-if="!userInfo.is_vip">距结算周期还剩 <strong>0</strong> 天</span>
            </div>
            <button class="carButton" v-if="userInfo.is_vip">vip会员</button>
            <button class="carButton" v-if="!userInfo.is_vip" @click="submit">购买vip会员</button>
        </div>
        <div class="clear"></div>

        <group title="vip专属特权">

            <cell title="会员专享"  link="/memberText2" is-link >
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/stop_log_20.png">
            </cell>
            <cell title="收费标准"  link="/memberText1" is-link >
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/stop_log_20.png">
            </cell>

        </group>

        <group v-if="userInfo.is_vip">
            <cell title="申请退款"  @click.native="applyRefund" is-link >
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/stop_log_20.png">
            </cell>
        </group>

        <confirm v-model="confirmShow"
                 title="成为会员须知"
                 :content="content"
                 confirm-text = "成为会员"
                 @on-confirm="onConfirm">
        </confirm>

        <!--<divider>收费标准</divider>-->
        <!--<div slot="content" class="card-padding">-->
            <!--<p style="font-size:14px;line-height:1.5;">会员年费为118元一年，低于50次提醒按2元一次收费，没有提醒不收费。在停车期间若无交警贴罚单，不提醒，也不收费，无限使用次数，我们主要是按提醒次数来收费</p>-->
        <!--</div>-->
        <!--<box gap="10px 10px">-->
            <!--<x-button type="primary" @click.native="submit">成为会员</x-button>-->
        <!--</box>-->
        <!--<nav-tab></nav-tab>-->

    </div>
</template>


<script>
    import {mapState} from 'vuex'
    import { Divider, Card ,Confirm} from 'vux'
    import {getStore} from '../../config/mUtils'
    import {getUsers,pay,PayConfig,PayLocalOrder} from '../../service/getData'
    import navTab from '../../components/navTab'
    export default {
        data () {
            return {
                logged: '',
                userInfo : {},
                showContent004 : false,
                confirmShow : false,
                content : '',
                deadline : 0,
            }
        },
        components: { Divider, Card,navTab,Confirm},
        computed: {

        },
        created() {
            this.getUsers()
        },
        activated(){

        },
        mounted() {
        },
        methods: {
            applyRefund(){
                console.log(232)
                if(this.userInfo.is_vip){
                    this.$vux.alert.show({
                        title:"停车无忧",
                        content: '未到结算周期，暂时无法退款',
                    })
                }else{
                    this.$vux.alert.show({
                        title:"停车无忧",
                        content: '您不是vip用户',
                    })
                }
            },

            submit(){
//                this.$router.push('/becomeMember/pay')
                window.location.href = '/becomeMember/pay'
            },
            onConfirm (){
                this.confirmShow = false;
                window.location.href = '/becomeMember/pay'
            },

            getUsers(){
                return getUsers()
                    .then((data => {
                        if (data.code === 200) {
                            this.userInfo = data.data
                        }
                    }))
            }

        }
    }

</script>

<style>
    .clear{clear:both}
    .userCard{
        height: 154px;
        background: #52af24;
        border-radius: 9px;
        margin: 14px;
    }

    .userCard .userinfo {
        padding: 21px;
        width: 82%;
        color: #fff;
    }
    .userCard .userinfo img{
        float: left;
        width: 60px;
        border-radius: 50%;


    }
    .userCard .userinfo .username{
        margin-left: 6%;

    }
    .userCard .userinfo .dateline{
        margin-left: 6%;
        font-size: 14px;
    }

    .userCard .carButton {
        position: absolute;
        left: 54%;
        margin-top:6%;
        border: 1px solid;
        border-radius: 5px;
        width: 104px;
        height: 26px;
        color: wheat;
    }
</style>
