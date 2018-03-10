<template>

</template>

<script>
    import wx from 'weixin-js-sdk';
    import {PayConfig} from '../service/getData'
    import eventBus from '../config/eventBus'
    export default {
        // name: 'tabbar',
        data () {
            return {
                share_info_default : {
                    share_link : window.location.origin+'/home?v=v1',
                    share_title : '',
                    share_desc : '',
                    share_img : '',
                },
            }
        },
        props: ['active-page'],
        components: {},
        computed: {

        },
        created() {

            this.getWechatShare()
        },
        methods: {
            default_value(value,d_value){
                if(value === undefined || value === '' || value === null){
                    return d_value;
                }else{
                    return value;
                }
            },
            shareAddLeaf(type){
                return shareAddLeaf({type:type})
                    .then((data) => {
                        if(data.ret) {
                            eventBus.$emit('addLeaf',data.res.data)
                            eventBus.$emit('hasShare',type)
                        }else {
                            console.log(data.res.errorMsg)
                        }
                    })





            },
            getWechatShare(share_info) {
                if(!share_info){
                    share_info = this.share_info_default
                }
                let url = window.location.origin+this.$route.fullPath.split('#')[0];
//                if(checkUa() === 'ios'){
//                    url = App.iosSignUrl
//                }

//                if(typeof share_info.is_act_share !== 'undefined'){
//                    share_info.share_link = "http://liec.liebaobx.com/?v=v1"
//                }

                return PayConfig({url:url})
                    .then((data) => {
                        if(data.code === 200) {
                            this.getWxData(share_info,data.data)
                        }else {
//                            console.log(data.res.errorMsg)
                        }
                    })
            },
            // 分享到微信
            getWxData:function (share_info,share_config) {
                let _this = this;
                wx.config({
                    debug: false,
                    appId: share_config.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
                    timestamp:share_config.timestamp, // 必填，生成签名的时间戳
                    nonceStr: share_config.nonceStr, // 必填，生成签名的随机串
                    signature: share_config.signature,// 必填，签名，见附录1
                    //需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
                    jsApiList: [
                        'onMenuShareAppMessage','onMenuShareTimeline','getLocation'
                    ]
                });

                //处理验证失败的信息
                wx.error(function (res) {
//                    window.location.reload();
//                    alert(App.iosSignUrl)
//                    alert(window.location.origin+_this.$route.fullPath.split('#')[0])
                    alert(JSON.stringify(res))
                });

                wx.hideMenuItems({
                    menuList: ['onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                });

                //处理验证成功的信息
                wx.ready(function () {
                    //分享到朋友圈
                    wx.onMenuShareTimeline({
                        title: _this.default_value(share_info.share_title,share_config.share_title), // 分享标题
                        link: _this.default_value(share_info.share_link),
                        imgUrl: _this.default_value(share_info.share_img,share_config.share_img), // 分享图标
                        success: function (res) {
                            //成功分享，新增叶子数
                            console.log(res)
                        },
                        cancel: function (res) {
                            console.log(res)
                        }
                    });
                    //分享给朋友
                    wx.onMenuShareAppMessage({
                        title: _this.default_value(share_info.share_title,share_config.share_title), // 分享标题
                        desc: _this.default_value(share_info.share_desc,share_config.share_desc), // 分享标题
                        link: _this.default_value(share_info.share_link),
                        imgUrl: _this.default_value(share_info.share_img,share_config.share_img), // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function (res) {
                            //成功分享，新增叶子数
                            console.log(res)
                        },
                        cancel: function (res) {
                            console.log(res)
                        }
                    });
                    wx.getLocation({
                        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                        success: function (res) {
//                            _this.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
//                            _this.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                            eventBus.$emit('getCurrencyLocation',{lat : res.latitude,lng : res.longitude}) //获取当前位置
//                            var speed = res.speed; // 速度，以米/每秒计
//                            var accuracy = res.accuracy; // 位置精度
                        }
                    });
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
