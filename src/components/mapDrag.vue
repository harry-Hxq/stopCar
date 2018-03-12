<!--
  描述：拖放地图组件，默认尺寸是 500 * 300
  接收属性参数：
    lat: 纬度
    lng: 经度
  自定义事件：
    drag: 拖放完成事件
  示例：
    <mapDrag @drag="dragMap" lat="22.574405" lng="114.095388"></mapDrag>
-->
<template>
    <div class="m-map">
        <div class="confirmButton" v-if="!is_end_stoping">
            <span  @click="Stop">确认停车</span>
        </div>
        <div class="confirmButton" v-if="is_end_stoping">
            <span  @click="endStoping">结束停车</span>
        </div>
        <div class="ucenter" @click="goUc">
            <img src="../images/icon/ucenter_active.png" alt="">
        </div>
        <!--<div class="getlocation" @click="getLocation">-->
            <!--<img src="../images/icon/getlocation.png" alt="">-->
        <!--</div>-->
        <div id="js-container" class="map"></div>
    </div>
</template>

<script>
    import remoteLoad from '../plugins/remoteLoad'
    import {confirmStop,getUsers} from '../service/getData'
    import eventBus from '../config/eventBus'
    export default {
        props: ['lat', 'lng'],
        data () {
            return {
                searchKey: '',
                placeSearch: null,
                dragStatus: false,
                AMapUI: null,
                AMap: null,
                geolocation : null,
                userInfo:{},
                is_end_stoping : false
            }
        },
        methods: {
            getLocation(){
//                this.$router.go(-1)
            },
            goUc(){
                this.$router.push('/uc')

            },
            confirmButton(){

            },
            endStoping(){
                this.is_end_stoping = false;
            },
            Stop(){
                eventBus.$emit('confirmStop') //确认停车
            },

            async getMap () {
                // 已载入高德地图API，则直接初始化地图
                if (window.AMap && window.AMapUI) {
                    this.initMap()
                    // 未载入高德地图API，则先载入API再初始化
                } else {
                    await remoteLoad('http://webapi.amap.com/maps?v=1.3&key=5df198198b1005b5800703e7c895f97d')
                    await remoteLoad('http://webapi.amap.com/ui/1.0/main.js')
                this.initMap()
                }
            },
            // 实例化地图
            initMap () {
                // 加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
                let AMapUI = this.AMapUI = window.AMapUI
                let AMap = this.AMap = window.AMap
                AMapUI.loadUI(['misc/PositionPicker'], PositionPicker => {
                    let mapConfig = {
                        zoom: 17,
                        cityName: '龙岩'
                    }
                    if (this.lat && this.lng) {
                        mapConfig.center = [this.lng, this.lat]
                    }
                    let map = new AMap.Map('js-container', mapConfig)
//                    // 加载地图搜索插件
//                    AMap.service('AMap.PlaceSearch', () => {
//                        this.placeSearch = new AMap.PlaceSearch({
//                            pageSize: 5,
//                            pageIndex: 1,
//                            citylimit: true,
//                            city: '龙岩',
//                            map: map,
//                            panel: 'js-result'
//                        })
//                    })
//                    AMap.plugin(['AMap.Geolocation'], function () {
//                        map.addControl(new AMap.Geolocation({
//                            enableHighAccuracy: true,//是否使用高精度定位，默认:true
//                            timeout: 10000, //超过10秒后停止定位，默认：无穷大
//                            maximumAge: 0, //定位结果缓存0毫秒，默认：0
//                            convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
//                            showButton: true, //显示定位按钮，默认：true
//                            buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
//                            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
//                            showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
//                            showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
//                            panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
//                            zoomToAccuracy:true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
//                        }));
////                        console.log(111)
////                        map.getCurrentPosition();
////                        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
////                        AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息
//                    });

//                    // 定位当前位置
//                    AMap.service('AMap.Geolocation',() => {
//                        this.geolocation = new AMap.Geolocation({
//                            city: '龙岩',
//                            map: map,
//                        })
//                    })

                    // 创建地图拖拽
                    let positionPicker = new PositionPicker({
                        mode: 'dragMap', // 设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
                        map: map // 依赖地图对象
                    })
                    // 拖拽完成发送自定义 drag 事件
                    positionPicker.on('success', positionResult => {
                        this.$emit('drag', positionResult)
                    })
                    // 启动拖放
                    positionPicker.start()
                })
            }
        },
        async created () {
            // 已载入高德地图API，则直接初始化地图
            if (window.AMap && window.AMapUI) {
//                this.initMap()
                // 未载入高德地图API，则先载入API再初始化
            } else {
                await remoteLoad('http://webapi.amap.com/maps?v=1.3&key=5df198198b1005b5800703e7c895f97d')
                await remoteLoad('http://webapi.amap.com/ui/1.0/main.js')
//                this.initMap()
            }
        }
    }
</script>

<style lang="css">
    .m-map{ min-width: 100%; min-height: 300px; position: relative; }
    .m-map .map{ width: 100%; height: 100%; }
    .m-map .confirmButton{
        position: absolute;
        width: 81px;
        height: 30px;
        z-index: 10;
        background: #0e82da;
        line-height: 27px;
        border-radius: 8px;
        color: #fff;
        margin: auto;
        top: 0;
        left: 0;
        right: 0;
        bottom: -69%;
    }
    .m-map .ucenter{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
        color: #fff;
        margin: auto;
        top: 164%;
        left: 35%;
        right: 0;
        bottom: 0;
    }.m-map .ucenter img{
        width: 32px;
        height: 32px;
    }
    .m-map .getlocation{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
        color: #fff;
        margin: auto;
        top: 164%;
        left: -74%;
        right: 0;
        bottom: 0;
    }.m-map .getlocation img{
        width: 32px;
        height: 32px;
    }
    /*.m-map .search input{ width: 180px; border: 1px solid #ccc; line-height: 20px; padding: 5px; outline: none; background: #ffffff }*/
    /*.m-map .search button{ line-height: 26px; background: #fff; border: 1px solid #ccc; width: 50px; text-align: center; }*/
    /*.m-map .result{ max-height: 300px; overflow: auto; margin-top: 10px; }*/
</style>