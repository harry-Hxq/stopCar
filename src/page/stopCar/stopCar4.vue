<template>
    <div>
        <head-top ref="headtop"></head-top>

        <div id="allmap" class="allmap"></div>
        <div class="stoping" v-if="userInfo.stop_car_status === 2">
            <p>当前停车位置：<span>{{address}}</span></p>
            <button @click="endStopCar">结束停车</button>
        </div>
        <button class="confirmButton" @click="confrimStop" v-if="userInfo.stop_car_status === 1">确认停车</button>
        <img class="ucenter" @click="goUc" src="../../images/icon/ucenter_active.png" alt="">
    </div>
</template>

<style>

    body{
        overflow-x:hidden;
        overflow-y:hidden;
    }
    #allmap {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
    }
    .confirmButton{
        position: absolute;
        background: #0e82da;
        width: 30%;
        border-radius: 6px;
        height: 36px;
        color: #fff;
        bottom: 8%;
        left: 35%;
        font-size: 1.2rem;
    }
    .ucenter{
        position: absolute;
        bottom: 8%;
        right: 3%;
        width: 40px;
    }
    .stoping{
        position: absolute;
        width: 100%;
        top: 46px;
        background: #e4e6e7;
        padding:10px;
    }
    .stoping span{
        color: #0004c1;
    }
    .stoping button{
        background: #0e82da;
        width: 110px;
        border-radius: 6px;
        height: 34px;
        color: #fff;
        margin-left: 54%;
        margin-top: 12px;
    }
</style>

<script>

    import {confirmStop,getUsers,endStopCar} from '../../service/getData'
    import BMap from 'BMap'
    export default {
        data () {
            return {
                type: 'tab',
                address_detail: null,
                center: {lng: 117, lat: 25},
                map : {},
                address : '',
                userInfo : {},
                markers : {}
            }
        },
        created () {
            this.getUsers()
//            this.ready()
        },
        methods: {
            stopReady(){
                var that = this;
                that.address = that.userInfo.address
                that.map = new BMap.Map('allmap')
                let point = new BMap.Point(that.userInfo.lng, that.userInfo.lat)
                that.map.centerAndZoom(point, 16)
                var myIcon = new BMap.Icon("http://i4.bvimg.com/574778/07e14e989eafdd9d.png", new BMap.Size(30,30));

                that.markers = new BMap.Marker(point,{icon:myIcon})
                that.map.addOverlay(that.markers)
                that.markers.setAnimation(BMAP_ANIMATION_BOUNCE);
            },



            ready () {
                var that = this;
                that.$vux.toast.show({
                    text: '定位中......',
                    type : 'text',
                    position : 'middle',
                    time : 2000
                })
                that.map = new BMap.Map('allmap')
                let point = new BMap.Point(that.center.lng, that.center.lat)
                that.map.centerAndZoom(point, 10)

                var geoc = new BMap.Geocoder();  //位置转换

                var geolocation = new BMap.Geolocation()
                geolocation.getCurrentPosition((r) => {
                    if (r.point) {
                        that.$vux.toast.hide()
                        that.$vux.toast.show({
                            text: '定位成功',
                            type : 'text',
                            position : 'middle',
                            time : 2000
                        })
                        console.log(r)
                        console.log('定位成功')
                        that.center.lng = r.longitude
                        that.center.lat = r.latitude

                        var myIcon = new BMap.Icon("http://i4.bvimg.com/574778/07e14e989eafdd9d.png", new BMap.Size(30,30));

                        that.markers = new BMap.Marker(r.point,{icon:myIcon})
                        that.map.addOverlay(that.markers)
                        that.markers.setAnimation(BMAP_ANIMATION_BOUNCE);

                        //设置标签
                        var label = new BMap.Label("点击可拖动",{offset:new BMap.Size(20,-16)});
                        label.setStyle({ color : "#0e82da", fontSize : "15px" ,borderRadius : "7px",border : "1px solid #0e82da"})
                        that.markers.setLabel(label)

                        //给markers增加拖拽事件
                        that.markers.enableDragging()

                        that.markers.addEventListener("dragstart",function (s) { //拖拽开始，隐藏markers标签
                            label.hide();
                        });

                        that.markers.addEventListener("dragend",function (s) { //拖拽结束，显示markers标签
                            geoc.getLocation(s.point, function(rs){
                                console.log(rs)
                                label.show()
                                that.center.lng = s.point.lng
                                that.center.lat = s.point.lat
                                that.address = rs.address
                                console.log(that.address)
                            });
                        });

                        that.map.panTo(r.point)
                        that.map.centerAndZoom(r.point, 16)


                        geoc.getLocation(r.point, function(rs){
                            console.log(rs)
                            that.address = rs.address
                        });

                        console.log(that.center)
                    }else{
                        console.log('定位失败')
                    }
                },
                    { enableHighAccuracy: true }
                )

                // 添加定位控件
                var geolocationControl = new BMap.GeolocationControl();

                geolocationControl.addEventListener("locationSuccess", function(e){
//                    console.log(e)
//                    //先删除所有点
                    let allOverlay = that.map.getOverlays();
                    console.log(allOverlay);
                    that.map.removeOverlay(allOverlay[2]);  //删除定位的点
                    that.markers.setPosition(e.point)
                    that.map.panTo(e.point)
                    that.map.centerAndZoom(e.point, 16)
                    console.log(that.center)
                    // 定位成功事件

                    var geoc = new BMap.Geocoder();
                    geoc.getLocation(e.point, function(rs){
                        console.log(rs)
                        that.address = rs.address
                    });

                });
                geolocationControl.addEventListener("locationError",function(e){
                    // 定位失败事件
                    alert(e.message);
                });
                that.map.addControl(geolocationControl);
            },
            confrimStop(){
                var that = this;
                if(that.userInfo.is_vip){

                    // 判断是否绑定手机
                    if(!that.userInfo.mobile){
                        that.$vux.alert.show({
                            title: '提示',
                            content: '请先绑定手机号',
                            onHide()  {
                                that.$router.push('/bindMobile')
                            }
                        })
                        return false
                    }

                    // 判断是否绑定车牌
                    if(!that.userInfo.plate_num){
                        that.$vux.alert.show({
                            title: '提示',
                            content: '请先绑定车牌号',
                            onHide()  {
                                that.$router.push('/bindCarNum')
                            }
                        })
                        return false
                    }


                    let reqJson = {
                        lat : this.center.lat,
                        lng : this.center.lng,
                        location : this.address,
                    }
                    return confirmStop(reqJson)
                        .then((data => {
                            if(data.code === 200){
                                that.$vux.alert.show({
                                    title: '停车无忧提醒您',
                                    content: '您当前停车位置可能有被贴罚单的风险，请您尽快挪车',
                                })
                                this.userInfo.stop_car_status = 2;
                                return false;
                            }
                            if(data.code === 202){
                                that.$vux.alert.show({
                                    title: '停车成功',
                                    content : '停车期间若有交警执勤，系统将以短信提示和公众号推送提示通知您，请注意查收'
                                })
                                // 状态改为停车中
                                this.userInfo.stop_car_status = 2;
                                that.markers.disableDragging()
                                return false;
                            }
                            that.$vux.alert.show({
                                title: '提示',
                                content: data.msg,
                            })
                            return false;
                        }))
                }else{
                    that.$vux.alert.show({
                        title: '停车无忧提醒您',
                        content: '您不是vip会员，无法享有此服务，请先成为vip会员',
                        onHide () {
                            window.location.href = '/becomeMember/pay'
                        }
                    })

                }
            },
            getUsers(){
                var that = this;
                return getUsers()
                    .then((data => {
                        if(data.code === 200) {
                            that.userInfo = data.data
                            if(that.userInfo.stop_car_status === 1){
                                that.ready()
                            }else{
                                that.stopReady()
                                if(that.userInfo.is_tip === 2){
                                    that.$vux.alert.show({
                                        title: '停车无忧提醒您',
                                        content: '您当前停车位置 ('+that.userInfo.address+') 可能有被贴罚单的风险，请您尽快挪车',
                                    })
                                }
                            }
                        }
                    }))
            },
            goUc(){
                this.$router.push('/uc')
            },
            endStopCar(){
                var that = this
                return endStopCar()
                    .then((data => {
                        if(data.code === 200) {
                            that.$vux.toast.show({
                                text: '成功结束',
                                time: 1000,
                                onHide () {
                                    that.userInfo.stop_car_status = 1
                                    that.ready()
                                }
                            })


                        }
                    }))
            }

        }
    }

</script>