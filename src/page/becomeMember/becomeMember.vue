<template>
    <div>
        <head-top ref="headtop"></head-top>
        <div id="box">
            <ul id="con1" ref="con1" :class="{anim:animate==true}">
                <li v-for='item in items'>{{item.name}}</li>
            </ul>
        </div>
        <div class="userCard">
            <div class="userinfo">
                <img :src="userInfo.headimg" alt="">
                <span class="username">{{userInfo.username}}</span>
                <br>
                <span class="dateline" v-if="userInfo.is_vip">距结算周期还剩 <strong>{{userInfo.deadline}}</strong> 天</span>
                <span class="dateline" v-if="!userInfo.is_vip">距结算周期还剩 <strong>0</strong> 天</span>
            </div>
            <button class="carButton" v-if="userInfo.is_vip" @click="showVip">vip会员</button>
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
            <cell title="余额退款"  @click.native="applyRefund" is-link >
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/stop_log_20.png">
            </cell>
        </group>

        <confirm v-model="confirmShow"
                 title="成为会员须知"
                 :content="content"
                 confirm-text = "成为会员"
                 @on-confirm="onConfirm">
        </confirm>

        <group>
            <cell title="联系客服"  is-link @click.native="showContact=true">
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/help_20.png">
            </cell>
        </group>

        <x-dialog v-model="showContact" class="dialog-demo" hide-on-blur>
            <div class="img-box">
                <img src="../../images/contact_qr.jpg" style="max-width:100%">
            </div>
            <div @click="showContact=false">
                <p>长按识别二维码即可联系客服</p>
                <span class="vux-close"></span>
            </div>
        </x-dialog>
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
    import { Divider, Card ,Confirm,XDialog} from 'vux'
    import {getStore} from '../../config/mUtils'
    import {getUsers,pay,PayConfig,PayLocalOrder,stopTipList} from '../../service/getData'
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
                animate:false,
                items:[],
                showContact : false
            }
        },
        components: { Divider, Card,navTab,Confirm,XDialog},
        computed: {
        },
        created() {
            this.stopTipList()
            this.getUsers()
        },
        activated(){

        },
        mounted() {
        },
        methods: {

            stopTipList(){
                return stopTipList()
                    .then((data => {
                        if (data.code === 200) {
                            this.items = data.data
                            setInterval(this.scroll,3500) // 在钩子函数中调用我在method 里面写的scroll()方法，注意此处不要忘记加this,我在这个位置掉了好几次坑，都是因为忘记写this。
                        }
                    }))
            },
            scroll(){
                let con1 = this.$refs.con1;
                con1.style.marginTop='-30px';
                this.animate=!this.animate;
                var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
                setTimeout(function(){
                    that.items.push(that.items[0]);
                    that.items.shift();
                    con1.style.marginTop='0px';
                    that.animate=!that.animate;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
                },1700)
            },

            applyRefund(){
                console.log(232)
                if(this.userInfo.is_vip){
                    this.$vux.alert.show({
                        title:"行车无忧",
                        content: '经检测您的账户未到结算周期，暂时无法退款',
                    })
                }else{
                    this.$vux.alert.show({
                        title:"行车无忧",
                        content: '您不是vip用户',
                    })
                }
            },

            submit(){
                window.location.href = '/becomeMember/pay'
            },
            showVip(){
                this.$router.push('/memberText2')
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
</style>
