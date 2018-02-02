<template>
    <div>
        <head-top ref="headtop"></head-top>

        <div class="amap-page-container">
            <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
            <el-amap vid="amapDemo" :center="mapCenter" :zoom="15" class="amap-demo">
                <el-amap-marker :position="marker" ></el-amap-marker>
            </el-amap>
        </div>
        <box gap="65px 10px">
            <x-button type="primary" @click.native="confirmLocation" action-type="button">确认</x-button>
        </box>

    </div>
</template>


<script>
    import {mapState} from 'vuex'
    import {getStore} from '../../config/mUtils'

    export default {
        data () {
            return {
                marker: [117.0171952227, 25.0750315393],
                searchOption: {
                    city: '龙岩',
                    citylimit: true
                },
                mapCenter: [117.0171952227, 25.0750315393],
                location : {}
            }
        },
        components: {},
        computed: {
//            ...mapState([
//                'agentInfo',
//            ]),
        },
        created() {

//            if(getStore('tpSessionId') && !this.agentInfo.phone) {
//                App.getUserInfo();
//            }
//            this.onSearchResult()
        },
        activated(){
            this.logged = getStore('tpSessionId')
        },
        mounted() {
//            this.$refs.headtop.rightUrl = 'https://fund.liechengcf.com/login?phone='+this.agentInfo.phone
//            this.$refs.headtop.loginFund = true
        },
        methods: {
            confirmLocation() {
                this.$router.push({path:'/stopCar', query:{address:this.location.name,lng:this.location.lng,lat:this.location.lat}})
            },
            onSearchResult(pois) {
                console.log( pois[0])
                this.location = pois[0]
                this.marker = [this.location.lng,this.location.lat]
                this.mapCenter = [this.location.lng,this.location.lat]

//                let latSum = 0;
//                let lngSum = 0;
//                if (pois.length > 0) {
//                    pois.forEach(poi => {
//                        let {lng, lat} = poi;
//                        lngSum += lng;
//                        latSum += lat;
////                        this.markers.push([poi.lng, poi.lat]);
//                    });
//                    let center = {
//                        lng: lngSum / pois.length,
//                        lat: latSum / pois.length
//                    };
//                    this.mapCenter = [center.lng, center.lat];
//                }
            }
        }
    }
</script>

<style>
    .amap-demo {
        height: 100px;
    }

    .search-box {
        position: absolute;
        top: 25px;
        left: 5px;
    }

    .amap-page-container {
        position: relative;
        height: 400px;
    }
</style>
