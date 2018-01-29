<template>
    <div>
        <head-top></head-top>
        <group>
            <x-input title="" v-model="tpwd" type="password" placeholder="请输入六位数字" :min="6" :max="6"></x-input>
        </group>
        <box gap="10px 10px">
            <x-button type="primary" action-type="button" @click.native="submit">提交</x-button>
        </box>
    </div>
</template>


<script>
    import {mapState} from 'vuex'
    import {getStore} from '../../config/mUtils'
    import {setAgentTradePassword} from '../../service/getData'
    export default {
        data () {
            return {
                tpwd: ''
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
                    tradePassword: this.tpwd,
                }
                let that = this;
                return setAgentTradePassword(reqJson)
                    .then((data) => {
                        if (data.ret) {
                            that.updateAgentInfo()
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

            updateAgentInfo() {
                if(!this.agentInfo) return
                this.agentInfo.is_trade = true
                this.RECORD_USERINFO(this.agentInfo)
            },

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
