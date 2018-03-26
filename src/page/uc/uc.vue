<template>
    <div>

        <!--<marquee item-height="24">-->
            <!--<marquee-item v-for="item in marqueeList"  class="align-middle">{{item.name}}</marquee-item>-->
        <!--</marquee>-->
        <div class="userCard">
            <div class="userinfo">
                <img :src="userInfo.headimg" alt="">
                <span class="username">{{userInfo.username}}</span>
                <br>
                <span class="dateline" >有效期 <strong>{{formatDate(userInfo.deadline)}}</strong></span>
            </div>
            <button class="carButton"  @click="submit">续费</button>
        </div>
        <div class="clear"></div>

        <!--<group>-->

            <!--<cell title="会员专享"  link="/memberText2" is-link >-->
                <!--<img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/vip_20.png">-->
            <!--</cell>-->
            <!--<cell title="收费标准"  link="/memberText1" is-link >-->
                <!--<img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/recharge_20.png">-->
            <!--</cell>-->

        <!--</group>-->

        <!--<group>-->
            <!--<cell title="停车记录"  link="/stopRecord" is-link >-->
                <!--<img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/stop_log_20.png">-->
            <!--</cell>-->
            <!--<cell title="提醒记录"  link="/tipLog" is-link >-->
                <!--<img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/tip_log_20.png">-->
            <!--</cell>-->
        <!--</group>-->


        <!--<group>-->
            <!--<cell title="个人信息"  link="/ucenter" is-link >-->
                <!--<img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/ucenter_active.png">-->
            <!--</cell>-->
        <!--</group>-->

        <group>
            <cell title="联系客服"  is-link @click.native="showContact=true">
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/help_20.png">
            </cell>
        </group>


        <group>
            <cell title="意见反馈"  is-link link="/opinion">
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/opinion_20.png">
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
    import { Divider, Card,Confirm,XDialog} from 'vux'
    import {mapState} from 'vuex'
    import {getStore,formatDate} from '../../config/mUtils'
    import mapping from '../../config/mapping'
    import {getUsers,pay,PayConfig,PayLocalOrder,stopTipList} from '../../service/getData'


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
        components: { Divider, Card ,Confirm,XDialog},
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
            formatDate,
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
    height: 143px;
    background: #52af24;
    border-radius: 9px;
    margin: 7px;
    margin-top: 3px;
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

</style>
