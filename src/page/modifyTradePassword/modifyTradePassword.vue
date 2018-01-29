<template>
    <div>
        <head-top></head-top>
        <group>
            <x-input title="手机" v-model="agentInfo.phone" :value="agentInfo.phone" type="text" disabled=""></x-input>
            <x-input title="发送验证码" placeholder="请输入手机验证码" v-model="verifyCode" class="weui-vcode">
                <x-button slot="right" type="primary" @click.native="sendPhoneVerify" mini :disabled="is_send">发送验证码</x-button>
            </x-input>
            <x-input title="交易密码" v-model="tpwd" type="password" placeholder="请输入六位数字" :min="6" :max="6"></x-input>
        </group>
        <box gap="10px 10px">
            <x-button type="primary" action-type="button" @click.native="submit">提交</x-button>
        </box>
    </div>
</template>


<script>
    import {mapState} from 'vuex'
    import {getStore} from '../../config/mUtils'
    import {modifyAgentTradePassword,sendPhoneVerify} from '../../service/getData'
    export default {
        data () {
            return {
                verifyCode: '',
                tpwd: '',
                agents :{},
                is_send :false
            }
        },
        components: {},
        created() {
            if(getStore('tpSessionId') && !this.agentInfo.phone) {
                App.getUserInfo();
            }
        },
        computed:{
            ...mapState([
                'agentInfo',
            ])
        },

        methods: {

            submit(){
                const reqJson = {
                    phone: this.agentInfo.phone,
                    verifyCode: this.verifyCode,
                    tradePassword: this.tpwd,
                }
                let that = this;
                return modifyAgentTradePassword(reqJson)
                    .then((data) => {
                        if (data.ret) {
                            that.$vux.alert.show({
                                content: '设置成功',
                                onHide () {
                                    that.$router.go(-1)
                                }
                            })
                        } else {
                            that.$vux.alert.show({
                                title: '提交失败',
                                content: data.res.errorMsg,
                            })
                        }
                    })
            },

            sendPhoneVerify(){
                const reqJson = {
                    phone: this.phone,
                }
                let that = this;
                return sendPhoneVerify(reqJson)
                    .then((data) => {
                        if (data.ret) {
                            that.$vux.alert.show({
                                title: '提示',
                                content: '发送成功',
                            })
                        } else {
                            that.$vux.alert.show({
                                title: '提交失败',
                                content: data.res.errorMsg,
                            })
                        }
                    })
            }
        }
    }
</script>

<style>
    .vux-demo {
        text-align: center;
    }

    .logo {
        width: 100px;
        height: 100px
    }
</style>
