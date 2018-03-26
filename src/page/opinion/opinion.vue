<template>
    <div>
        <head-top></head-top>
        <group label-width="4.5em" label-align="left">
            <x-input title="称呼" placeholder="必填" text v-model="nickname" ></x-input>
            <x-input title="手机" type="text" placeholder="必填" v-model="phone"  is-type="china-mobile" ></x-input>
        </group>

        <divider>希望我们做什么</divider>
        <div class="box">
            <checker v-model="demo1Required" radio-required default-item-class="demo1-item" selected-item-class="demo1-item-selected">
                <checker-item value="1">产品使用</checker-item>
                <checker-item value="2">技术问题</checker-item>
                <checker-item value="3">bug提交</checker-item>
                <checker-item value="4">商务合作</checker-item>
                <checker-item value="5">投诉建议</checker-item>
            </checker>
        </div>

        <group>
            <x-textarea title="" placeholder="详细备注与细节描述" v-model="textContent"></x-textarea>
        </group>
        <box gap="10px 10px">
            <x-button type="primary" @click.native="submit">提交</x-button>
        </box>
    </div>
</template>


<script>
    import {accountLogin} from '../../service/getData'
    import { Divider , Checker,CheckerItem,XTextarea} from 'vux'
    import {getStore, setStore, removeStore} from '../../config/mUtils'
    import validator from '../../plugins/validator'

    export default {
        data () {
            return {
                phone: '',
                nickname: '',
                demo1Required : '',
                textContent : ''
            }
        },
        components: {
            Divider , Checker,CheckerItem,XTextarea
        },
        created() {
            this.checkIsLogin();
            this.validateInit()
        },
        methods: {

            submit() {

                this.$vux.alert.show({
                    title: '提交成功',
                    content: '我们将尽快反馈您的问题',
                })
                return false;

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
    .box {
        padding: 5px 15px;
    }
    .demo1-item {
        border: 1px solid #ececec;
        padding: 5px 15px;
        margin: 5px;


    }
    .demo1-item-selected {
        border: 1px solid green;
    }
</style>
