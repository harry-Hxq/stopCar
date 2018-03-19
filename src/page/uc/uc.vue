<template>
    <div>
        <head-top ref="headtop"></head-top>
        <!--<marquee item-height="24">-->
            <!--<marquee-item v-for="item in marqueeList"  class="align-middle">{{item.name}}</marquee-item>-->
        <!--</marquee>-->

        <div id="box">
            <ul id="con1" ref="con1" :class="{anim:animate==true}">
                <li v-for='item in marqueeList'>{{item.name}}</li>
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
            <button class="carButton" v-if="userInfo.is_vip">vip会员</button>
            <button class="carButton" v-if="!userInfo.is_vip" @click="submit">购买vip会员</button>
        </div>
        <div class="clear"></div>

        <group>

            <cell title="会员专享"  link="/memberText2" is-link >
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/vip_20.png">
            </cell>
            <cell title="收费标准"  link="/memberText1" is-link >
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/recharge_20.png">
            </cell>

        </group>

        <group>
            <cell title="停车记录"  link="/stopRecord" is-link >
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/stop_log_20.png">
            </cell>
            <cell title="提醒记录"  link="/tipLog" is-link >
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/tip_log_20.png">
            </cell>
        </group>


        <group>
            <cell title="个人信息"  link="/ucenter" is-link >
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/ucenter_active.png">
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


        <group>
            <cell title="摩托执勤"  link="/motoMap" is-link >
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/ucenter_active.png">
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

    </div>
</template>


<script>
    import { Divider, Card,Confirm,XDialog,Marquee, MarqueeItem} from 'vux'



    import {mapState} from 'vuex'
    import {getStore} from '../../config/mUtils'
    import mapping from '../../config/mapping'
    import {getUsers,pay,PayConfig,PayLocalOrder,stopTipList} from '../../service/getData'
//    import navTab from '../../components/navTab'

    export default {
        data () {
            return {
                mapping: mapping,
                is_member : '非会员',
                userInfo : {},
                showContact:false,
                logged: '',
                showContent004 : false,
                confirmShow : false,
                content : '',
                deadline : 0,
                animate:false,
                marqueeList:[],
            }
        },
        components: { Divider, Card ,Confirm,XDialog,Marquee, MarqueeItem},
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

            getUsers(){
                return getUsers()
                    .then((data => {
                        if(data.code === 200) {
                            this.userInfo = data.data
                        }
                    }))
            },
            submit(){
                window.location.href = '/becomeMember/pay'
            },

            stopTipList(){
                return stopTipList()
                    .then((data => {
                        if (data.code === 200) {
                            this.marqueeList = data.data
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
                    that.marqueeList.push(that.marqueeList[0]);
                    that.marqueeList.shift();
                    con1.style.marginTop='0px';
                    that.animate=!that.animate;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
                },1700)
            },

            applyRefund(){
                console.log(232)
                if(this.userInfo.is_vip){
                    this.$vux.alert.show({
                        title:"停车无忧",
                        content: '经检测您的账户未到结算周期，暂时无法退款',
                    })
                }else{
                    this.$vux.alert.show({
                        title:"停车无忧",
                        content: '您不是vip用户',
                    })
                }
            },
            onConfirm (){
                this.confirmShow = false;
                window.location.href = '/becomeMember/pay'
            },

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
.userCard{
    height: 154px;
    background: #52af24;
    border-radius: 9px;
    margin: 7px;
    margin-top: 32px;
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
    border: 1px solid;
    border-radius: 5px;
    width: 104px;
    height: 26px;
    color: wheat;
    float: right;
    margin-right: 20px;
}
.align-middle {
    text-align: center;
}
.vux-marquee ul{
    font-size: 15px;
}
#box{
    width: 99%;
    height: 32px;
    line-height: 30px;
    overflow: hidden;
    /*border: 1px solid #0e82da;*/
    -webkit-transition: all 3s;
    transition: all 3s;
    font-size: 1rem;
    position: absolute;
    z-index: 2;
    top:46px;
    background: #ffffff;
}
#box ul{
    text-align: center;
    font-size: 0.8em;
    color : red;
}
.anim{
    transition: all 3s;
}
#con1 li{
    list-style: none;
    line-height: 30px;
    height: 30px;
}
</style>
