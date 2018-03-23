<template>
    <div>
        <head-top ref="headtop"></head-top>

        <div id="allmap" class="allmap"></div>
        <div class="stoping_moto" >
            <p><img :src="iconUrl" alt=""><span>图标表示{{car_name}}管制点，实时更新. </span></p>
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
                address_detail: null,
                center: {lng: 117, lat: 25},
                map : {},
                address : '',
                userInfo : {},
                markers : {},
                motoPoints : {},
                type : 1,
                iconUrl : '',
                car_name : '',
                update_time : ''
            }
        },
        created () {
            let route_date = this.$route.query.route_date
            this.type = this.$route.query.type
            if(this.type == 2){
                this.iconUrl = 'http://i2.bvimg.com/574778/acea25bfc761dbd2.png';
                this.car_name = '小车'
                this.update_time = '更新时间为上午九点'
            }else{
                this.iconUrl = 'http://i1.bvimg.com/574778/76ef65ea3344b0b7.png';
                this.car_name = '摩托车'
                this.update_time = '更新时间为晚上八点'
            }
            this.routeDot(route_date,this.type )
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
                console.log(this.type)
                var myIcon = new BMap.Icon(this.iconUrl, new BMap.Size(40,40));

                //设置标签

                var label = {}
                for (let i=0;i < that.motoPoints.length; i++){
                    motoPoint = new BMap.Point(that.motoPoints[i].longitude,that.motoPoints[i].latitude)
                    marker = new BMap.Marker(motoPoint,{icon:myIcon});

                    label = new BMap.Label(this.mapping.route_time_type[that.motoPoints[i].time_type],{offset:new BMap.Size(20,-16)});
                    label.setStyle({ color : "#0e82da", fontSize : "15px" ,borderRadius : "7px",border : "1px solid #0e82da"})
                    marker.setLabel(label)
                    label.show()
                    that.map.addOverlay(marker)

                    marker.addEventListener('click',function(e){
//                        that.showDetails(i)
                    })
                }
            },
            showDetails(id){
                console.log(this.motoPoints);
                this.$vux.toast.show({
                    text : '管制时间：'+this.mapping.route_time_type[this.motoPoints[id].time_type],
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