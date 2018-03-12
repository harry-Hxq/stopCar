<template>
    <div style="text-align: center;">
        <head-top ref="headtop"></head-top>
        <mapDrag ref="mapDrag" @drag="dragMap" class="mapbox" :lng="lng" :lat="lat"></mapDrag>
        <div>test</div>

        <share ></share>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {getStore} from '../../config/mUtils'
    import {confirmStop,getUsers} from '../../service/getData'
    import navTab from '../../components/navTab'
    import mapDrag from '../../components/mapDrag'
    import share from '../../components/share'
    import eventBus from '../../config/eventBus'
    import axios from 'axios';
    export default {

        data () {
            return {
                lng: 0,
                lat: 0,
                address: null,
                nearestJunction: null,
                nearestRoad: null,
                nearestPOI: null,
                share_info : {
                    share_link : window.location.origin+'/home?v=v1',
                    share_title : '',
                    share_desc : '',
                    share_img : '',
                },
            };
        },


        components: {
            mapDrag,navTab,share
        },
        computed: {
            ...mapState([
                'agentInfo',
            ]),
        },
        created() {
//            this.$refs.mapDrag.getMap()
            this.getUsers()
        },
        mounted() {
            eventBus.$on('getCurrencyLocation', (center)=> {
                this.getCurrencyLocation(center)
            })
            eventBus.$on('confirmStop', ()=> {
                this.confrimStop()
            })

        },

        methods: {
            confrimStop(){
                var that = this;
                if(that.userInfo.is_vip){
                    let reqJson = {
                        lat : this.lat,
                        lng : this.lng,
                        location : this.dragData.address,
                    }
//                                console.log(6666,this.dragData.address)
                    return confirmStop(reqJson)
                        .then((data => {
                            if(data.code === 200){
                                that.$vux.alert.show({
                                    title: '停车无忧提醒您',
                                    content: '当前位置有交警执勤，请勿停车',
                                })
                                return false;
                            }
                            if(data.code === 202){
                                that.$vux.toast.show({
                                    text: '停车成功',
                                })
                                // 状态改为停车中



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
                            that.$router.push('/becomeMember/pay')
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
            getCurrencyLocation(center){
                console.log(2222222,center)
//                let url =  "http://restapi.amap.com/v3/assistant/coordinate/convert?key=078a1abbeb8ee82fa760819c5fd20681&locations=116.481499,39.990475|116.481499,39.990375&coordsys=gps";
                let url =  "http://restapi.amap.com/v3/assistant/coordinate/convert?key=078a1abbeb8ee82fa760819c5fd20681&locations="+center.lng+","+center.lat+"&coordsys=gps";
//                let url =  "http://api.map.baidu.com/geoconv/v1/?coords="+center.lng+","+center.lat+"&from=1&to=5&ak=vFXoHFCpIsou67qZj4IbPEdEctOGGRel";

                axios.get(url, {})
                    .then(response => {
                        console.log(response);
                        let locations = response.data.locations.split(",")
                        console.log(locations);
                        this.lng = locations[0];
                        this.lat = locations[1];
                        console.log(this.lng,this.lat)
                    })
                    .catch(err => {
                        console.log(err);
                    });

//                this.$http.jsonp(url, {},function(res){
//                    console.log(res)
//                })
//                this.$http.jsonp(url,{
//                    params:{
//
//                    },jsonp:"_callback"
//                }).then(resp=>{
//                    console.log(resp.data.s);
//                },response => {
//                    console.log("发送失败"+response.status+","+response.statusText);
//                });

                this.$refs.mapDrag.getMap()
            },
            dragMap (data) {
                console.log(data)
                this.dragData = {
                    lng: data.position.lng,
                    lat: data.position.lat,
                    address: data.address,
                    nearestJunction: data.nearestJunction,
                    nearestRoad: data.nearestRoad,
                    nearestPOI: data.nearestPOI
                }
            }
        }
    }
</script>

<style>
    .mapbox{ width: 100%; height: 100vh; }
</style>
