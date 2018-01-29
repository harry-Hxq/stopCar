<template>
    <div>
        <head-top></head-top>
        <group title="费率更改">
            <x-input title="当前费率(%)" placeholder="" v-model="agentInfo.rate"  :min="0.8" :max="3.5"></x-input>
        </group>
        <box gap="10px 10px">
            <x-button type="primary" action-type="button" @click.native="submit">提交申请</x-button>
        </box>

    </div>
</template>


<script>
    import {mapState} from 'vuex'
    import {getStore} from '../../config/mUtils'
    import {updateRateReply} from '../../service/getData'
    import validator from '../../plugins/validator'
    export default {
        data () {
            return {

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
            submit() {
                const reqJson = {
                    rate: this.agentInfo.rate,
                }

                let that = this;
                updateRateReply(reqJson)
                    .then((data) => {
                        if (data.ret) {
                            that.$vux.alert.show({
                                content: '申请成功',
                                onHide () {
                                    that.$router.go(-1)
                                }
                            })
                        } else {
                            that.$vux.alert.show({
                                title: '提示',
                                content: data.res.errorMsg,
                            })
                        }
                    })
            },
        }
    }
</script>

<style>

</style>
