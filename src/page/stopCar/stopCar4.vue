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
            }
        },
        mounted () {
            this.getUsers()
            this.ready()
        },
        methods: {
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
                var geoc = new BMap.Geocoder();
//                map.enableScrollWheelZoom(true)
//                map.enableDoubleClickZoom(true)
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

                        let markers = new BMap.Marker(r.point,{icon:myIcon})
                        that.map.addOverlay(markers)
                        markers.setAnimation(BMAP_ANIMATION_BOUNCE);
                        markers.enableDragging()
                        markers.addEventListener("dragend",function (s) {
//
                            console.log(s)
                            geoc.getLocation(s.point, function(rs){
                                console.log(rs)
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
                    console.log(e)
                    //先删除所有点
                    let allOverlay = that.map.getOverlays();
                    console.log(allOverlay);
                    for (let i = 0; i < allOverlay.length -1; i++){
                        that.map.removeOverlay(allOverlay[i]);
                    }

//                    that.$vux.toast.show({
//                        text: '定位成功',
//                        type : 'text',
//                        position : 'middle',
//                        time : 2000
//                    })
                    console.log(e)
                    console.log('定位成功')
                    that.center.lng = e.point.lng
                    that.center.lat =  e.point.lat
                    var myIcon = new BMap.Icon("http://i4.bvimg.com/574778/07e14e989eafdd9d.png", new BMap.Size(30,30));

                    let markers = new BMap.Marker(e.point,{icon:myIcon})
                    that.map.addOverlay(markers)
                    markers.setAnimation(BMAP_ANIMATION_BOUNCE);
                    markers.enableDragging()

                    markers.enableDragging()
                    markers.addEventListener("dragend",function (s) {
//
                        console.log(s)
                        geoc.getLocation(s.point, function(rs){
                            console.log(rs)
                            that.center.lng = s.point.lng
                            that.center.lat = s.point.lat
                            that.address = rs.address
                            console.log(that.address)
                        });
                    });




                    markers.setLabel('当前位置');
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
                                    content: '当前位置有交警执勤，请勿停车',
                                })
                                this.userInfo.stop_car_status = 2;
                                return false;
                            }
                            if(data.code === 202){
                                that.$vux.toast.show({
                                    text: '停车成功',
                                })
                                // 状态改为停车中
                                this.userInfo.stop_car_status = 2;
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
                return getUsers()
                    .then((data => {
                        if(data.code === 200) {
                            this.userInfo = data.data
                        }
                    }))
            },
            goUc(){
                this.$router.push('/uc')
            },
            endStopCar(){
                return endStopCar()
                    .then((data => {
                        if(data.code === 200) {
                            this.$vux.toast.show({
                                text: '成功结束',
                            })
                            this.userInfo.stop_car_status = 1
                        }
                    }))
            }

        }
    }

</script>