<template>
    <div>
        <head-top ref="headtop"></head-top>

        <div class="vipContent">
            <ul>
                <li>实时得知交警正在执勤的路段或即将执勤的路段，随时掌握动向。</li>
                <li>有效的规避违停罚单，省时省钱。</li>
                <li>按提醒次数收费，经济划算。</li>
                <li>随时随地无忧停放，车主无忧。</li>
            </ul>
        </div>

        <div class="checkWapper">
            <checker
                    type="radio"
                    v-model="demo5"
                    default-item-class="demo5-item"
                    selected-item-class="demo5-item-selected"
                    :radio-required="true"
                    value="1"
            >
                <checker-item v-for="i in [1]" :key="i" :value="i">118元/年</checker-item>
            </checker>
        </div>
        <div class="confirmPay">
            <p>应付金额:    <span>118 </span>元</p>
            <button @click="_getWxpayData">提交订单</button>
        </div>
        <!--<div slot="content" class="card-padding">-->
            <!--<p style="font-size:14px;line-height:1.5;">会员年费为118元一年，低于50次提醒按2元一次收费，没有提醒不收费。在停车期间若无交警贴罚单，不提醒，也不收费，无限使用次数，我们主要是按提醒次数来收费</p>-->
        <!--</div>-->
        <!--<box gap="10px 10px">-->
            <!--<x-button type="primary" @click.native="">成为会员</x-button>-->
        <!--</box>-->
        <!--<nav-tab></nav-tab>-->

    </div>
</template>


<script>
    import {mapState} from 'vuex'
    import { Divider, Card ,Checker, CheckerItem} from 'vux'
    import {getStore} from '../../../config/mUtils'
    import {getUsers,pay,PayConfig,PayLocalOrder} from '../../../service/getData'
    import navTab from '../../../components/navTab'
//    import wx from 'weixin-js-sdk'
    const wx = require('weixin-js-sdk')
    export default {
        data () {
            return {
                logged: '',
                userInfo : {},
                wx : null,
                order_id : null,
                demo5: 1,
            }
        },
        components: { Divider, Card,navTab,Checker, CheckerItem},
        computed: {

        },
        created() {
            this._wxpayConfig()
        },
        activated(){
        },
        mounted() {

        },
        methods: {
            _getWxpayData() {
                return PayLocalOrder().then((res) => {
                    if(res.code === 200){
                        let order_id = res.data
                        wx.ready(() => {
                            this._setWxpayInfo(order_id)
                        })
                    }
                })
            },
            _wxpayConfig() {
                let url = window.location.href
                return PayConfig({url:url}).then((res) => {
                    console.log(res.data)
                    let data = res.data
                    if (res.code === 200) {
                        wx.config({
                            // debug: true,
                            appId: data.appId,
                            timestamp: data.timestamp,
                            nonceStr: data.nonceStr,
                            signature: data.signature,
                            jsApiList: ['chooseWXPay']
                        })
//                        this._getWxpayData()
                    }
                })
            },
            _setWxpayInfo(order_id) {
                let that = this;
                return pay({order_id:order_id}).then((result) => {
                    if(result.code === 200){
                        let data = result.data.js_config
                        wx.chooseWXPay({
                            appId: data.appId,
                            timestamp: data.timestamp,
                            nonceStr: data.nonceStr,
                            package: data.package,
                            signType: data.signType,
                            paySign: data.paySign,
                            success(res) {
                                if (res.errMsg === 'chooseWXPay:ok') {
                                    that.$vux.alert.show({
                                        title: '停车无忧',
                                        content: '恭喜您成为vip会员，我们将竭诚为您服务',
                                        onHide () {
                                            that.$router.go('-1')
                                        }
                                    })
                                } else {
                                    that.$vux.alert.show({
                                        title: '提示',
                                        content: '支付失败',
                                        onHide () {
                                            that.$router.go('-1')
                                        }
                                    })
                                }
                            },
                            cancel() {
                                that.$vux.alert.show({
                                    title: '提示',
                                    content: '支付取消',
                                    onHide () {
                                        that.$router.go('-1')
                                    }
                                })
                            },
                            error() {
                                that.$vux.alert.show({
                                    title: '提示',
                                    content: '系统错误',
                                    onHide () {
                                        that.$router.go('-1')
                                    }
                                })
                            }
                        })
                    }else{
                        alert('系统错误')
                    }

                })
            }
        }
    }

</script>

<style>
    .demo5-item {
        width: 210px;
        height: 49px;
        line-height: 46px;
        text-align: center;
        border-radius: 3px;
        border: 1px solid #ccc;
        background-color: #159fca;
        margin-right: 6px;
    }
    .demo5-item-selected {
        background:  #159fca url(../../../images/icon/active.png) no-repeat right bottom;
        border-color: #ff4a00;
    }
    .vipContent ul{
        list-style: square url(../../../images/icon/right.png);
    }
    .vipContent ul li{
        margin-left: 29px;
        margin-top: 11px;
        font-size: 1.01rem;
    }
    .confirmPay{
        background:#d9d9d9;
        width: 100%;
        position: fixed;
        bottom: 0;
        text-align: center;
    }
    .confirmPay button{
        width: 292px;
        height: 40px;
        background: #0bb20c;
        border-radius: 3px;
        color: #ffffff;
        margin: 12px;
    }
    .confirmPay p{
        margin: 2px;
    }
    .confirmPay span{
        color: red;
    }
    .checkWapper{
        text-align: center;
        margin-top: 36px;
    }
</style>
