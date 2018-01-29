<template>
    <div>
        <head-top></head-top>
        <group label-width="4.5em" label-margin-right="2em" label-align="left">
            <!-- <selector title="渠道类别" :options="['理财师', '公司']" v-model="agentType"></selector> -->
            <x-input title="姓名" placeholder="必填" v-model="realname"></x-input>
            <x-input title="手机" placeholder="必填" v-model="phone" is-type="china-mobile"></x-input>
            <x-input title="邮箱" placeholder="选填" v-model="email" is-type="email"></x-input>
            <x-input title="登录密码" placeholder="默认为手机后6位" v-model="pwd"></x-input>
        </group>
        <box gap="10px 10px">
            <x-button type="primary" action-type="button" @click.native="submit">提交</x-button>
        </box>
    </div>
</template>


<script>
    import {mapState, mapMutations, mapActions} from 'vuex'
    import {erpRegister} from '../../service/getData'
    import validator from '../../plugins/validator'
    export default {
        data () {
            return {
                agentType: '理财师',
                phone: '',
                email: '',
                pwd: '',
                realname: '',
            }
        },
        components: {},
        created() {
            this.validateInit()
        },
        methods: {
            submit() {
                const data = {
                    realname: this.realname,
                    phone: this.phone,
                    email: this.email,
                }

                if (!this.validate(data)) return
                var that =this;
                if(that.pwd.length === 0){
                    that.pwd = that.phone.substring(5)
                }

                erpRegister({
                    realname: that.realname,
                    phone: that.phone,
                    password: that.pwd,
                    email: that.email,
                })
                    .then((data) => {
                        // 添加成功
                        if (data.ret) {
                            that.$vux.alert.show({
                                content: '添加成功',
                                onHide () {
                                    that.$router.replace('/customerErp?t='+that.phone)
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
                    realname: {
                        required: true,
                    },
                    phone: {
                        required: true,
                        tel: true,
                    },
                    email: {
                        email: true,
                    },
                }
                const messages = {
                    phone: {
                        required: '请填写手机号码',
                        tel: '手机号码格式有误',
                    },
                    email: {
                        email: '邮箱格式错误',
                    },
                    realname: {
                        required: '请填写姓名',
                    },
                }
                this.validator = new validator(rules, messages)
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
