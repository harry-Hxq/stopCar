<template>
    <div>
        <head-top ref="headtop"></head-top>
        <group title="">
            <x-input title="车牌号" value="闽F5525B" text-align="right" placeholder="I'm placeholder"></x-input>
        </group>
        <group title="">
            <x-input title="手机" value="17876013413" text-align="right" placeholder="I'm placeholder"></x-input>
        </group>
        <group title="">
            <cell title="当前位置" :is-link="true" :value="address" link="/getLocation" ></cell>
        </group>
        <box gap="10px 10px">
            <x-button type="primary" action-type="button">确认停车</x-button>
        </box>
    </div>

        <!--<box gap="10px 10px">-->
            <!--<x-button type="primary" action-type="button">重新定位</x-button>-->
        <!--</box>-->


</template>


<script>

    import {mapState} from 'vuex'
    import {getStore} from '../../config/mUtils'

    export default {
        data () {

            return {
                address:'',


            };
        },


        components: {

        },
        computed: {
            ...mapState([
                'agentInfo',
            ]),
        },
        created() {


            if(getStore('tpSessionId') && !this.agentInfo.phone) {
                App.getUserInfo();
            }
        },
        activated(){

            if(this.$route.query.address){
                this.address = this.$route.query.address
            }
        },
        mounted() {

        },



        methods: {

        }
    }
</script>

<style>
    .amap-page-container{
        height:500px;
    }
    .amap-box {
        width: 500px;
        height: 500px;
    }
</style>
