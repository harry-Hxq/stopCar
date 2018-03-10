<template>
    <div style="text-align: center;">
        <head-top ref="headtop"></head-top>
        <mapDrag ref="mapDrag" @drag="dragMap" class="mapbox" :lng="lng" :lat="lat"></mapDrag>

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
    export default {

        data () {
            return {
                lng: 117.014845,
                lat: 25.086317,
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

//            this.getUsers()
        },
        mounted() {
            eventBus.$on('getCurrencyLocation', (center)=> {
                this.getCurrencyLocation(center)
            })
        },

        methods: {
            getCurrencyLocation(center){
                console.log(2222222,center)
                this.lng = center.lng;
                this.lat = center.lat;
                let url =  "http://restapi.amap.com/v3/assistant/coordinate/convert?locations="+center.lng+","+center.lat+"&coordsys=gps&output=xml&key=5df198198b1005b5800703e7c895f97d";
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
