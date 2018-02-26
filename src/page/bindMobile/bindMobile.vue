<template>
    <div>
        <head-top ref="headtop"></head-top>

        <group title="">
            <x-input title="请输入手机"  v-model="mobile" ></x-input>
        </group>
        <box gap="10px 10px">
            <x-button type="primary"  action-type="button" @click.native="bindUserInfo">确认绑定</x-button>
        </box>
    </div>

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
                mobile:'',
            };
        },


        components: {
            XInput,
            XTextarea
        },
        computed: {

        },
        created() {
            console.log(1121);
        },
        activated(){

        },
        mounted() {

        },

        methods: {

            bindUserInfo(){
                const reqJson = {
                    token : getStore('token'),
                    mobile : this.mobile,
                }

                return bindUserInfo(reqJson)
                    .then((data) => {
                        if(data.code === 200){
                            this.$vux.toast.show({
                                text: '绑定成功'
                            })
                            this.$router.go(-1)
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
