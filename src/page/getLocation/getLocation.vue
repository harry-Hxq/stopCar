<template>
    <div>
        <head-top ref="headtop"></head-top>

        <mapDrag @drag="dragMap" class="mapbox"></mapDrag>
        <group >
            <x-textarea title="当前位置" :value="dragData.address"  :autosize="true" :rows="2"></x-textarea>
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
    import mapDrag from '../../components/mapDrag'

    export default {
        data () {
            return {
                dragData: {
                    lng: null,
                    lat: null,
                    address: null,
                    nearestJunction: null,
                    nearestRoad: null,
                    nearestPOI: null
                }
            }
        },
        components: {mapDrag,XTextarea},
        computed: {

        },

        created(){
            console.log(1118888888)
        },

        activated(){

        },

        methods: {
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
            },
            confirmLocation(){
                this.$router.push({path:'/stopCar', query:{address:this.dragData.address,lng:this.dragData.lng,lat:this.dragData.lat}})
            }

        }
    }
</script>

<style>
    .mapbox{ width: 100%; height: 400px; margin-bottom: 1px;  margin-top: 18px; }

</style>
