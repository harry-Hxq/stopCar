<template>
    <div style="text-align: center;">
        <head-top ref="headtop"></head-top>
        <baidu-map class="map" center="北京">
            <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_LEFT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
        </baidu-map>

        <div class="confirmButton">
            <button  @click="Stop">确认停车</button>
        </div>
        <div class="ucenter" @click="goUc">
            <img src="../../images/icon/ucenter_active.png" alt="">
        </div>

    </div>
</template>
<script>
    import {getStore} from '../../config/mUtils'
    import {confirmStop,getUsers} from '../../service/getData'
    export default {

        data () {
            return {


            };
        },
        components: {
        },
        computed: {

        },
        created() {

        },
        mounted() {

        },

        methods: {
            Stop(){

            },
            goUc(){

            }

        }
    }
</script>

<style>
    .map {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
    }
    .confirmButton{
        width: 100%;
        margin:0 auto;
        /*position: absolute;*/
    }
    .confirmButton button{
        background: #0e82da;
        width: 110px;
        border-radius: 6px;
        height: 34px;
        color: #fff;
        margin-top: 10px;



    }
    .ucenter{
        width:100%;
        margin-left: 36%;
    }
</style>
