<template>
    <div style="text-align: center;">
        <head-top ref="headtop"></head-top>
        <div v-if="!stoping">
            <!--<group title="" v-show="!address">-->
                <!--<cell title="请选择停车位置" :is-link="true"  link="/getLocation" ></cell>-->
            <!--</group>-->
            <!--<group v-show="address">-->
                <!--<x-textarea title="确认停车位置" :value="address"  :autosize="true" :rows="2"></x-textarea>-->
            <!--</group>-->


            <!--<box gap="10px 10px" v-show="address">-->
                <!--<x-button type="primary" :is-link="true"  link="/getLocation" action-type="button">重新选择</x-button>-->
            <!--</box>-->

            <baidu-map class="bm-view" :zoom="zoom" :center="center">
                <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true" @locationSuccess="locationSuccess" ></bm-geolocation>
            </baidu-map>
            <box gap="10px 10px">
                <x-button type="primary" :disabled="isCanSubmit" action-type="button" @click.native="submit">确认停车</x-button>
            </box>


            <confirm v-model="confirmShow"
                               title="无忧停车"
                               :content="content"
                               confirm-text = "成为会员"
                               @on-confirm="onConfirm">
        </confirm>

        </div>
        <!--<div v-if="stoping">-->
            <!--<img src="../../images/loading.gif" alt="">-->
            <!--<p>停车中...</p>-->
        <!--</div>-->

        <nav-tab></nav-tab>
    </div>

        <!--<box gap="10px 10px">-->
            <!--<x-button type="primary" action-type="button">重新定位</x-button>-->
        <!--</box>-->


</template>


<script>
    function renderReverse(data){
        console.log(data)
    }
    import {mapState} from 'vuex'
    import {getStore} from '../../config/mUtils'
    import {XTextarea,Confirm,TransferDom} from 'vux'
    import {confirmStop,getUsers} from '../../service/getData'
    import navTab from '../../components/navTab'
    export default {

//        ready () {
//            setInterval(this.update2, 2000)
//        },

        data () {
            return {
                percent1: 1,
                text1: 'Processing',
                address:'',
                isCanSubmit : true,
                userInfo : {},
                content: '',
                confirmShow : false,
                stopCarStatus : "停车中...",
                intervalid1 :{},
                stoping : false,
                zoom:15,
                center : {lng: 0, lat: 0}
            };
        },


        components: {
            XTextarea,navTab,Confirm,TransferDom
        },
        computed: {
            ...mapState([
                'agentInfo',
            ]),
        },
        created() {



            this.getUsers()
        },
        activated(){
            if(this.$route.query.address){
                this.token = getStore('token')
                this.address = this.$route.query.address
                this.lat = this.$route.query.lat
                this.lng = this.$route.query.lng
            }
            if(this.address){
                this.isCanSubmit = false
            }
        },
        mounted() {
            this.lng = 117.01799674
            this.lat = 25.07868543
        },

        methods: {

            syncCenterAndZoom (e) {
//                const {lng, lat} = e.target.getCenter()
//                this.center.lng = lng
//                this.center.lat = lat
//                this.zoom = e.target.getZoom()
            },

            locationSuccess(e){
                console.log(e)
                this.isCanSubmit = false;
                this.lat = e.point.lat;
                this.lng = e.point.lng;
                this.zoom = 18
                var _that = this
                _that.$http.get("http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location="+_that.lat+","+_that.lng+"&output=json&pois=1&ak=vFXoHFCpIsou67qZj4IbPEdEctOGGRel", {})

            },
            locationError(e){
                console.log(e)

            },

//            getLocation(lat,lng){
//                var _that = this
//                _that.$http.get("http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location="+lat+","+lng+"&output=json&pois=1&ak=vFXoHFCpIsou67qZj4IbPEdEctOGGRel", {})
//                    .then(function (res) {
//                        return res;
//                    })
//            },
            getUsers(){
                return getUsers()
                    .then((data => {
                        if(data.code === 200) {
                            this.userInfo = data.data
                        }
                    }))
            },
            submit(){

                if(!this.userInfo.is_vip){
                    //不是vip用户，提示免费停车次数
                    if(this.userInfo.free_times > 0){
                        this.content = '您当前为普通会员，无法停车';
                        this.confirmShow = true;
                    }
                }else{
                    this.stoping = true
//                    this.confirmStop()
                }
            },
            onCancel(){
                this.confirmShow = false;
                this.confirmStop()
            },
            onConfirm(){
                this.confirmShow = false;
                this.$router.push('/becomeMember')
            },

            confirmStop(){

                const reqJson = {
                    location : this.address,
                    lat : this.lat,
                    lng : this.lng,
                }
                return confirmStop(reqJson)
                    .then((data) => {
                    var that = this;
                        if(data.code === 200){
                            that.$vux.alert.show({
                                title: '提示',
                                content: data.msg,
                            })
                        }else if(data.code === 201){
                            that.$vux.alert.show({
                                title: '提示',
                                content: data.msg,
                                onHide () {
                                    that.$router.push('/becomeMember')
                                }
                            })
                        }else if(data.code === 202){
                            // 未查到
                            that.$vux.alert.show({
                                title: '提示',
                                content: data.msg,
                                onHide () {
                                    that.$router.push('/stopCar')
                                }
                            })
                        }else{
                            that.$vux.alert.show({
                                title: '提示',
                                content: data.msg,
                                onHide () {
                                    that.$router.push('/stopCar')
                                }
                            })

                        }
                        if(!this.userInfo.is_vip){
                            //不是vip用户，提示免费停车次数
                            if(this.userInfo.free_times > 0){
                                this.userInfo.free_times --;
                            }
                        }
                    })
            }
        }
    }
</script>

<style>
    .bm-view {
        width: 100%;
        height: 100vh;
    }
</style>
