<template>
    <div>
        <head-top ref="headtop"></head-top>

        <group title="" v-show="!address">
            <cell title="请选择停车位置" :is-link="true"  link="/getLocation" ></cell>
        </group>
        <group v-show="address">
            <x-textarea title="确认停车位置" :value="address"  :autosize="true" :rows="2"></x-textarea>
        </group>
        <box gap="10px 10px" v-show="address">
            <x-button type="primary" :is-link="true"  link="/getLocation" action-type="button">重新选择</x-button>
        </box>
        <box gap="10px 10px">
            <x-button type="primary" :disabled="isCanSubmit" action-type="button" @click.native="confirmStop">确认停车</x-button>
        </box>
    </div>

        <!--<box gap="10px 10px">-->
            <!--<x-button type="primary" action-type="button">重新定位</x-button>-->
        <!--</box>-->


</template>


<script>

    import {mapState} from 'vuex'
    import {getStore} from '../../config/mUtils'
    import {XTextarea} from 'vux'
    import {confirmStop} from '../../service/getData'
    export default {
        data () {

            return {
                address:'',
                lat : 0,
                lng : 0,
                isCanSubmit : true
            };
        },


        components: {
            XTextarea
        },
        computed: {
            ...mapState([
                'agentInfo',
            ]),
        },
        created() {
            console.log(11221)






        },
        activated(){
            if(this.$route.query.address){
                this.token = getStore('token')
                this.address = this.$route.query.address
                this.lat = this.$route.query.lat
                this.lng = this.$route.query.lng
            }
            if(this.address){
                this.isCanSubmit = false
            }

        },
        mounted() {

        },

        methods: {

            confirmStop(){
                const reqJson = {
                    location : this.address,
                    lat : this.lat,
                    lng : this.lng,
                }
                return confirmStop(reqJson)
                    .then((data) => {
                    var that = this;
                        if(data.code === 200){
                            that.$vux.alert.show({
                                title: '提示',
                                content: '附近有车巡逻',
                            })
                        }else if(data.code === 201){
                            that.$vux.alert.show({
                                title: '提示',
                                content: data.msg,
                                onHide () {
                                    that.$router.push('/becomeMember')
                                }
                            })

                        }
                    })
            }
        }
    }
</script>

<style>

</style>
