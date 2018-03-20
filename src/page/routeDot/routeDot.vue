<template>
    <div>
        <head-top ref="headtop"></head-top>

        <div id="allmap" class="allmap"></div>
        <div class="stoping_moto" >
            <p><img src="http://i1.bvimg.com/574778/76ef65ea3344b0b7.png" alt=""><span>头像表示摩托车执勤点，点击可查看执勤时间，每日更新.</span></p>
        </div>
        <!--<button class="confirmButton" @click="confrimStop" v-if="userInfo.stop_car_status === 1">确认停车</button>-->
        <!--<img class="ucenter" @click="goUc" src="../../images/icon/ucenter_active.png" alt="">-->

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
    .stoping_moto{
        position: absolute;
        width: 100%;
        top: 46px;
        background: #ffffff;
        padding:4px;
    }
    .stoping_moto span{
        font-size: 0.8rem;
    }

</style>

<script>

    import {confirmStop,getUsers,endStopCar,routeDot} from '../../service/getData'
    import BMap from 'BMap'
    import mapping from '../../config/mapping'
    export default {
        data () {
            return {
                mapping : mapping,
                type: 'tab',
                address_detail: null,
                center: {lng: 117, lat: 25},
                map : {},
                address : '',
                userInfo : {},
                markers : {},
                motoPoints : {}
            }
        },
        created () {
            let route_date = this.$route.query.route_date
            let type = this.$route.query.type
            this.routeDot(route_date,type)
//            this.ready()
        },
        methods: {
            ready () {
                var that = this;
                that.map = new BMap.Map('allmap')
                let point = new BMap.Point(117.01720550977, 25.12007540656)
                that.map.centerAndZoom(point, 13)
                that.map.enableScrollWheelZoom(true);
                console.log(that.motoPoints[0].longitude)
                let motoPoint = {};
                let marker = {};

                var myIcon = new BMap.Icon("http://i1.bvimg.com/574778/76ef65ea3344b0b7.png", new BMap.Size(40,40));

                //设置标签

                var label = {}
                for (let i=0;i < that.motoPoints.length; i++){
                    motoPoint = new BMap.Point(that.motoPoints[i].longitude,that.motoPoints[i].latitude)
                    marker = new BMap.Marker(motoPoint,{icon:myIcon});

                    label = new BMap.Label(i,{offset:new BMap.Size(20,-16)});
                    marker.setLabel(label)
                    that.map.addOverlay(marker)
                    label.hide()
                    marker.addEventListener('click',function(){
                        that.showDetails(i)
                    })
                }
            },
            showDetails(id){
                this.$vux.toast.show({
                    text : '执勤时间：'+motoPoints[id].time_type,
                    type : 'text',
                    time : 3000,
                })
                console.log(id);
            },
            routeDot(route_date,type){
                var that = this;
                return routeDot({route_date:route_date,type})
                    .then((data => {
                        if(data.code === 200) {
                            console.log(data)
                            that.motoPoints = data.data;
                            that.ready()
                        }
                    }))
            }

        }
    }

</script>