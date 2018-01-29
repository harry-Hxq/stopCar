<template>
    <div>
        <head-top ref="headtop"></head-top>
        <group title="费率设定">
            <x-input title="当前费率(%)" placeholder="" v-model="agentInfo.rate" :disabled="!agentInfo.is_can_update_rate" :min="0.8" :max="3.5"></x-input>
        </group>
        <group title="注意">
            <p style="padding: 10px;font-size: 0.8rem;color: #0bb20c">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费率更改时间为3月5号、6月5号、9月5号、12月5号，请在这些时间内进行费率更改。如果您确实需要在这时间外更改费率， 请点击
                <router-link to="/updateRate" >
                    申请更改费率
                </router-link> </p>
        </group>

        <box gap="10px 10px">
            <x-button type="primary" action-type="button" :disabled="!agentInfo.is_can_update_rate" @click.native="submit">提交</x-button>
        </box>
    </div>
</template>


<script>
    import {mapState} from 'vuex'
    import {getStore} from '../../config/mUtils'
    import {setRate} from '../../service/getData'
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
        mounted() {
            this.$refs.headtop.rightUrl = '/updateRateRecord'
            this.$refs.headtop.rightTitle = '申请记录'
            this.top = 1;
            this.bottom = 20
        },
        methods: {
            submit() {
                const reqJson = {
                    rate: this.agentInfo.rate,
                }
                let that = this
                setRate(reqJson)
                    .then((data) => {
                        if (data.ret) {
                            that.$vux.alert.show({
                                content: '修改成功',
                                onHide () {
                                    that.$router.go(-1)
                                }
                            })
                        } else {
                            that.$vux.alert.show({
                                title: '失败',
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
