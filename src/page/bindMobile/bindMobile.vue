<template>
    <div>
        <head-top ref="headtop"></head-top>

        <group title="">
            <x-input placeholder="请输入手机号码" :required="true" is-type="china-mobile"  v-model="mobile" >
                <img slot="label" style="padding-right:10px;display:block;" src="../../images/icon/phone_20.png" width="24" height="24">
            </x-input>

            <x-input title="验证码" class="weui-vcode" v-model="vcode">
                <x-button slot="right"  v-if="!showReget"  @click.native="sendVcodes" :gradients="['#1D62F0', '#19D5FD']" mini>发送验证码</x-button>
                <x-button slot="right"  v-if="showReget" :gradients="['#1D62F0', '#19D5FD']" mini>{{t}}s重新获取</x-button>
            </x-input>
        </group>
        <box gap="10px 10px">
            <x-button :gradients="['#1D62F0', '#19D5FD']" v-if="userInfo.plate_num" action-type="button" @click.native="bindUserInfo('confirm')">确认绑定</x-button>
            <x-button :gradients="['#1D62F0', '#19D5FD']" v-if="!userInfo.plate_num"  action-type="button" @click.native="bindUserInfo('next')">下一步</x-button>
        </box>
    </div>

</template>


<script>

    import {mapState} from 'vuex'
    import {getStore} from '../../config/mUtils'
    import {XTextarea} from 'vux'
    import {bindUserInfo,sendVcode,getUsers} from '../../service/getData'
    import XInput from "../../../node_modules/vux/src/components/x-input/index";
    import validator from 'src/plugins/validator'
    export default {
        data () {

            return {
                mobile:'',
                showReget : false,
                t:120,   // 验证码剩余秒数
                vcode:'',
                userInfo : {}
            };
        },


        components: {
            XInput,
            XTextarea,
            validator
        },
        computed: {














        },
        created() {
            this.getUsers()
            this.validateInit()
        },
        activated(){
        },
        mounted() {
        },

        methods: {

            getUsers(){
                return getUsers()
                    .then((data => {
                        if(data.code === 200) {
                            this.userInfo = data.data
                            if(this.userInfo.mobile && !this.userInfo.plate_num){
                                this.$router.replace('/bindCarNum')
                            }
                        }
                    }))
            },

            sendVcodes(){
                console.log('发送验证码')
                let data = {
                    mobile: this.mobile,
                }
                if(!this.validate(this.phoneValidator, data)) return
                var that = this;
                return sendVcode({mobile: that.mobile})
                    .then((data) => {
                        if(data.code === 200) {
                            that.showReget = true;
                            that.remainSecond();
                        }else {
                            that.$vux.toast.show({
                                text: data.msg,
                                type : 'warn'
                            })
                            return false
                        }
                    })
            },
            bindUserInfo(text){

                let data = {
                    mobile: this.mobile,
                    vcode: this.vcode,
                }
                if(!this.validate(this.validator, data)) return

                const reqJson = {
                    mobile : this.mobile,
                    vcode : this.vcode,
                }

                var that = this;
                return bindUserInfo(reqJson)
                    .then((data) => {
                        if(data.code === 200){

                            if(text === 'next'){
                                that.$router.push('/bindCarNum');return
                            }

                            that.$vux.toast.show({
                                text: '绑定成功',
                                onHide (){
                                    that.$router.go(-1)
                                }
                            })

                        }else{
                            that.$vux.toast.show({
                                text: data.msg,
                                type : 'warn'
                            })
                        }
                    })
            },
            // 验证及提醒
            validate(validator, data) {
                var result = validator.checkForm(data)
                if(!result.valid) {
                    this.$vux.toast.show({
                        text: result.errorList[0].msg,
                        type : 'warn'
                    })
                }
                return result.valid
            },
            // 表单验证初始化
            validateInit() {
                const rules = {
                    mobile: {
                        required: true,
                        tel: true,
                    },
                    vcode: {
                        required: true,
                    },
                }
                const messages = {
                    mobile: {
                        required: '请填写手机号码',
                        tel: '手机号码格式有误',
                    },
                    vcode: {
                        required: '请填写短信验证码',
                    },
                }
                this.phoneValidator = new validator({mobile: rules.mobile}, {mobile: messages.mobile})
                this.validator = new validator(rules, messages)
            },

            // 几秒后重新获取验证码
            remainSecond() {
                var timer = setInterval(() =>{
                    this.t--;
                    if(this.t <= 0) {
                        clearInterval(timer);
                        this.showReget = false;
                        this.t = 120;
                    }
                }, 1000);
            }
        }
    }
</script>

<style>

</style>
