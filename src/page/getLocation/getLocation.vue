<template>
    <div>
        <head-top ref="headtop"></head-top>

        <!--<mapDrag @drag="dragMap" class="mapbox"></mapDrag>-->
        <baidu-map class="bm-view" center="龙岩" :zoom="zoom" @moving="syncCenterAndZoom" @moveend="syncCenterAndZoom" @zoomend="syncCenterAndZoom">
            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true" @locationSuccess="locationSuccess" ></bm-geolocation>
        </baidu-map>
        <group >
            <x-textarea title="当前位置"  :autosize="true" :rows="2"></x-textarea>
        </group>
        <box gap="10px 10px">
            <x-button type="primary" @click.native="confirmLocation" action-type="button">确认</x-button>
        </box>

    </div>
</template>


<script>
    import {XTextarea} from 'vux'
    import {mapState} from 'vuex'
    import {getStore} from '../../config/mUtils'
//    import mapDrag from '../../components/mapDrag'
    export default {
        data () {
            return {
                zoom:12,
                center: {
                    lng: 116.404,
                    lat: 39.915
                },
            }
        },
        components: {XTextarea},
        computed: {

        },

        created(){
            console.log(111888111)

        },

        activated(){

        },

        methods: {

            confirmLocation(){
                this.$router.push({path:'/stopCar', query:{address:this.dragData.address,lng:this.dragData.lng,lat:this.dragData.lat}})
            },
            syncCenterAndZoom (e) {
                const {lng, lat} = e.target.getCenter()
                this.center.lng = lng
                this.center.lat = lat
                this.zoom = e.target.getZoom()
            },
            locationSuccess(e){
                console.log(e)
            },
            locationError(e){
                console.log(e)
            }


        }
    }
</script>

<style>
    .mapbox{ width: 100%; height: 400px; margin-bottom: 1px;  margin-top: 18px; }
    .bm-view {
        width: 100%;
        height: 300px;
    }

</style>
