<template>
    <div>
        <head-top></head-top>
        <group label-width="4.5em" label-align="left">
            <x-input title="手机" placeholder="必填" v-model="phone" is-type="china-mobile" required></x-input>
            <x-input title="密码" type="password" placeholder="必填" v-model="pwd" required></x-input>
        </group>
        <box gap="10px 10px">
            <x-button type="primary" @click.native="submit">登录</x-button>
        </box>
    </div>
</template>


<script>
    import {mapState, mapMutations, mapActions} from 'vuex'
    import {accountLogin} from '../../service/getData'
    import {getStore, setStore, removeStore} from '../../config/mUtils'
    import validator from '../../plugins/validator'

    export default {
        data () {
            return {
                phone: '',
                pwd: '',
            }
        },
        components: {
            // Alert,
            // Group,
            // XSwitch,
            // Cell
        },
        created() {
            this.checkIsLogin();
            this.validateInit()
        },
        methods: {
            ...mapMutations([
                'RECORD_USERINFO',
                'LOGIN',
            ]),
            submit() {
                const data = {
                    phone: this.phone,
                    pwd: this.pwd,
                }

                if (!this.validate(data)) return

                accountLogin({
                    loginName: this.phone,
                    password: this.pwd,
                })
                    .then((data) => {
                        // 登录成功
                        if (data.ret) {
                            setStore('tpSessionId', data.res.data.tpSessionId)
                            this.$router.replace('/open')
                        } else {
                            this.$vux.alert.show({
                                title: '登录失败',
                                content: data.res.errorMsg,
                            })
                        }
                    })
            },
            validate(data) {
                var result = this.validator.checkForm(data)
                if (!result.valid) {
                    this.$vux.alert.show({
                        content: result.errorList[0].msg,
                    })
                }
                return result.valid
            },
            // 表单验证初始化
            validateInit() {
                const rules = {
                    phone: {
                        required: true,
                        tel: true,
                    },
                    pwd: {
                        required: true,
                    },
                }
                const messages = {
                    phone: {
                        required: '请填写手机号码',
                        tel: '手机号码格式有误',
                    },
                    pwd: {
                        required: '请填写密码',
                    },
                }
                this.validator = new validator(rules, messages)
            },

            //判断是否登录
            checkIsLogin(){
                if(getStore('tpSessionId')) {
                    this.$router.replace('/uc');
                }
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
