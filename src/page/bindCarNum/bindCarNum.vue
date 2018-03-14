<template>
    <div>
        <head-top ref="headtop"></head-top>
        <div id="mixed-keyboard-box">
            <mixed-keyboard :args="args" :callbacks="callbacks"/>
        </div>

        <box gap="10px 10px">
            <x-button type="primary" :disabled="!args.isCompleted" @click.native="bindUserInfo" action-type="button">确定</x-button>
        </box>
    </div>

</template>


<script>
    var CallbackBridge = {
        _default: {
            native_callback_changed: function(isCompleted, number) {
                console.log("[无回调] 输入车牌号码（输入中），当前车牌：" + number);
            },
            native_callback_completed: function(number, isAutoCompleted) {
                console.log("[无回调] 输入车牌号码（已完成），当前车牌：" + number + "，自动完成：" + isAutoCompleted);
            },
            native_callback_show_message: function(message) {
                console.log("[无回调] 提示消息：" + message);
            }
        },
        platform: function() {
            var isAndroid = (typeof android === "object");
            if (isAndroid) {
                return android;
            } else {
                if (typeof global.native_callback_completed === "function") {
                    return global;
                } else {
                    return this._default;
                }
            }
        },
        onchanged: function(number, plateMode, isCompleted) {
            this.platform().native_callback_changed(isCompleted, number);
        },
        oncommit: function(number, plateMode, isAutoCompleted) {
            this.platform().native_callback_completed(number, isAutoCompleted);
        },
        onmessage: function(message) {
            this.platform().native_callback_show_message(message);
        }
    };

    import {mapState} from 'vuex'
    import {getStore} from '../../config/mUtils'
    import {XTextarea} from 'vux'
    import {bindUserInfo} from '../../service/getData'
    import XInput from "../../../node_modules/vux/src/components/x-input/index";
    import mixedKeyboard from '../../components/MixedKeyboard.vue'
    export default {
        data () {

            return {
                plate_num:'',
                args: {
                    number: "",
                    province: "",
                    keyboardtype: 0,
                    isCompleted : false
                },
                callbacks: CallbackBridge
            };
        },  


        components: {
            XInput,
            XTextarea,
            mixedKeyboard
        },
        computed: {

        },
        created() {

        },
        activated(){

        },
        mounted() {









        },

        methods: {

            bindUserInfo(){
                const reqJson = {
                    token : getStore('token'),
                    plate_num : this.args.number,
                }
                return bindUserInfo(reqJson)
                    .then((data) => {
                    var that = this;
                        if(data.code === 200){
                            this.$vux.toast.show({
                                text: '绑定成功',
                                onHide () {
                                    that.$router.push('/stopCar')
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

<style lang="scss" scoped="" type="text/css">

</style>
