<template>
    <div>
        <head-top ref="headtop"></head-top>

        <group title="" >
            <x-input title="请输入车牌"  v-model="plate_num" ></x-input>
        </group>
        <box gap="10px 10px">
            <x-button type="primary"  action-type="button" @click.native="bindUserInfo">确认绑定</x-button>
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
    import {bindUserInfo} from '../../service/getData'
    import XInput from "../../../node_modules/vux/src/components/x-input/index";
    export default {
        data () {

            return {
                plate_num:'',
            };
        },


        components: {
            XInput,
            XTextarea
        },
        computed: {

        },
        created() {

            if(getStore('tpSessionId') && !this.agentInfo.phone) {
                App.getUserInfo();
            }
        },
        activated(){

        },
        mounted() {

        },

        methods: {

            bindUserInfo(){
                const reqJson = {
                    token : getStore('token'),
                    plate_num : this.plate_num,
                }
                return bindUserInfo(reqJson)
                    .then((data) => {
                    var that = this;
                        if(data.code === 200){
                            this.$vux.toast.show({
                                text: '绑定成功',
                                onHide () {
                                    that.$router.go(-1)
                                }
                            })
                        }else{
                            this.$vux.alert.show({
                                title: '提示',
                                content: data.msg,
                            })
                        }
                    })
            }
        }
    }
</script>

<style>

</style>
