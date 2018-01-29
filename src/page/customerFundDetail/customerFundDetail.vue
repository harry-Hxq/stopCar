<template>
    <div>
        <head-top></head-top>
        <group>
            <cell title="姓名" :value="detail.realname"></cell>
            <cell title="手机号码" :value="detail.phone"></cell>
            <cell title="状态" :value="mapping.is_opener[detail.is_opener]"></cell>
        </group>
        <div v-if="detail.is_opener == 1">
            <group>
                <cell title="账户详情" :link="{path:'/customerFundAccount',query:{uid:detail.uid}}" is-link></cell>
                <cell title="持仓详情" :link="{path:'/customerFundPosition',query:{uid:detail.uid}}" is-link></cell>
                <cell title="交易记录" :link="{path:'/customerFundRecord',query:{uid:detail.uid}}" is-link></cell>
            </group>

            <group>
                <cell title="认购" :link="{path:'/purchase',query:{uid:detail.uid}}" is-link></cell>
            </group>

        </div>
        <group>

        </group>
    </div>
</template>


<script>

    import mapping from '../../config/mapping'
    import {mapState, mapMutations, mapActions} from 'vuex'
    import {getCustomers} from '../../service/getData'
    import Group from "../../../node_modules/vux/src/components/group/index";
    export default {
        data () {
            return {
                mapping: mapping,
                detail: {},
                uid: '',
                fullpath: '',
                LoginPassword: '显示',
                TradePassword: '显示',
            }
        },

        activated(){
            if (this.fullpath === this.$route.fullPath || this.fullpath === '') {
                this.fullpath = this.$route.fullPath
                return
            }
            // 参数不同，重新请求数据
            this.uid = this.$route.query.uid
            this.fullpath = this.$route.fullPath
            this.getDetail()
        },

        created() {
            this.uid = this.$route.query.uid
            if (!this.uid) {
                this.$vux.alert.show({
                    title: '提示',
                    content: '未知用户',
                    onHide () {
                        this.$router.go(-1)
                    }
                })
            }
        },
        mounted() {
            this.getDetail()
        },
        components: {Group},

        methods: {
            getDetail(){
                const reqJson = {
                    uid: this.uid
                }
                return getCustomers(reqJson)
                    .then((data) => {
                        if (data.ret) {
                            this.detail = data.res.data
                        } else {
                            this.$vux.alert.show({
                                title: '提示',
                                content: data.res.errorMsg,
                            })
                        }
                    })
            },


            //输入登录密码
            ConfirmLoginPassword (type) {
                console.log(type)
                const _this = this
                _this.trade_password = '';
                this.$vux.confirm.prompt('', {
                    title: '请输入您的登录密码',
                    inputAttrs: {
                        type: 'password',
                        style: "text-align:center",
                        maxlength: 6,
                    },
                    onShow () {
                        console.log('promt show')
//                        _this.$vux.confirm.setInputValue('set input value')
                    },
                    onHide () {
                        console.log('prompt hide')
                    },
                    onCancel () {
                        console.log('prompt cancel')
                    },
                    onConfirm (msg) {
                        _this.trade_password = msg;
                        if (_this.trade_password) {

                        }
                        _this.$vux.alert.show({
                            title: '提示',
                            content: '请填写密码',
                        })
                        return
                    }
                })
            }
        }
    }
</script>

<style>


</style>
