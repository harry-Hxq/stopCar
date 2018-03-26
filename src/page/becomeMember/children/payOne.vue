<template>
    <div>

    </div>
</template>


<script>
    import {getStore} from '../../../config/mUtils'
    import {getUsers,pay,PayConfig,PayLocalOrder} from '../../../service/getData'
    const wx = require('weixin-js-sdk')
    export default {
        data () {
            return {
                logged: '',
                userInfo : {},
                wx : null,
                order_id : null,
                moneyType: 1,
                money : 9.9
            }
        },
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

            changeMoney(e){
                if(e === 1){
                    this.money = 9.9
                }else if(e === 2){
                    this.money = 19.9
                }else if(e === 3){
                    this.money = 29.9
                }else{
                    this.money = 49.9
                }
                console.log(e)
            },
            _getWxpayData() {
                return PayLocalOrder({money_type:5}).then((res) => {
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
                        this._getWxpayData()
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
                                        title: '行车无忧',
                                        content: '恭喜您支付成功',
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
            },
        }
    }

</script>

<style>

</style>
