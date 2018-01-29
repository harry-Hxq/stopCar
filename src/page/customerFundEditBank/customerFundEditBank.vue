<template>
    <div class="content">
        <head-top></head-top>
        <div class="checkbox-content">
            <divider>1 选择银行币种（单选）</divider>
            <checker v-model="cashType" type="radio" default-item-class="checker-item-bank"
                     selected-item-class="checker-item-selected">
                <checker-item v-for="item in mapping.list.currencyCnName" :key="item.key" :value="item.key"><i
                        class="md_flag" :class="item.key"></i> <br>{{item.value}}
                </checker-item>
            </checker>

        </div>
        <br >
        <div class="checkbox-content">
            <divider>2 选择收款银行地区（单选）</divider>
            <checker v-model="cardType" type="radio" default-item-class="checker-item-bank2"
                     selected-item-class="checker-item-selected">
                <checker-item v-for="item in mapping.list.card_type" :key="item.key" :value="item.key">{{item.value}}
                </checker-item>
            </checker>
        </div>
        <br >
        <div class="">
            <divider>3 填写银行账户信息</divider>

            <group>

                <x-input title="银行账户" type="text" v-model="bankAccount"  text-align="right" placeholder="输入银行卡号" ></x-input>
                <x-input title="银行名称" type="text" v-model="bankName" text-align="right" placeholder="务必精确到支行" ></x-input>
                <x-input title="SWIFT" type="text" v-model="swift" text-align="right" placeholder="请输入SWIFT码" ></x-input>
            </group>
            <box gap="10px 10px">
                <x-button type="primary" action-type="button" @click.native="checkData">提交</x-button>
            </box>
        </div>



    </div>
</template>


<script>
    import mapping from '../../config/mapping'
    import {editBank} from '../../service/getData'
    import {Checker, CheckerItem, Divider } from 'vux'
    import Group from "../../../node_modules/vux/src/components/group/index";
    import validator from '../../plugins/validator'

    export default {
        data () {
            return {
                mapping: mapping,
                cashType: '',
                cardType: '',
                bankAccount: '',
                bankName: '',
                swift: '',
                uid: '',
                trade_password: '',
                fullpath : '',
            }
        },
        components: {Checker, CheckerItem, Divider},
        created() {
            this.uid = this.$route.query.uid
            console.log(this.uid);
            if(!this.uid){
                let that = this
                this.$vux.alert.show({
                        content: '系统错误',
                        onHide () {
                            that.$router.go(-1)
                        }
                    })
            }
            this.validateInit()
        },

        mounted() {
        },

        methods: {
            checkData() {
                const data = {
                    cash_type : this.cashType,
                    card_type  : this.cardType ,
                    bank_account  : this.bankAccount ,
                    bank_name  : this.bankName ,
                    swift  : this.swift ,
                }
                if (!this.validate(this.validator, data)) return
                this.showTradePassword();
            },

            submit(){
                const reqJson = {
                    uid: this.uid,
                    cash_type : this.cashType,
                    card_type  : this.cardType ,
                    bank_account  : this.bankAccount ,
                    bank_name  : this.bankName ,
                    swift  : this.swift ,
                    trade_password  : this.trade_password ,
                }
                let that = this;
                editBank(reqJson)
                    .then((data) => {
                        if(data.ret) {
                            that.$vux.alert.show({
                                content: '提交成功',
                                onHide () {
                                    that.$router.go(-1)
                                }
                            })
                        }else {
                            that.$vux.alert.show({
                                title: '提交失败',
                                content: data.res.errorMsg,
                            })
                        }
                    })
            },

            //输入交易密码
            showTradePassword () {
                const _this = this
                _this.trade_password = '';
                this.$vux.confirm.prompt('', {
                    title: '交易密码',
                    inputAttrs : {
                        type:'password',
                        style:"text-align:center",
                        maxlength:6,
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
                        _this.submit()
                    }
                })
            },

            // 执行验证
            validate(validator, data) {
                let result = validator.checkForm(data)
                if(!result.valid) {
                    this.$vux.alert.show({
                        content: result.errorList[0].msg,
                    })
                }
                return result.valid
            },
            //验证初始化
            validateInit() {
                const rule = {
                    cash_type: {
                        required : true,
                    },
                    card_type : {
                        required : true,
                    },
                    bank_account : {
                        required : true
                    },
                    bank_name : {
                        required : true
                    }
                }
                const message = {
                    cash_type: {
                        required : '请选择银行币种',
                    },
                    card_type : {
                        required : '请选择银行地区',
                    },
                    bank_account : {
                        required : '请输入银行卡号',
                    },
                    bank_name : {
                        required : '请输入银行名称',
                    }
                }
                this.validator = new validator(rule,message)
            },
        }
    }
</script>

<style lang="scss">
    .content{
        padding: 10px;
    }
    .checkbox-content {
        text-align: center;

    }
    .currency-money{
        float: right;
        margin-right: 10px;
        margin-top: 8px;
        font-size: 1.5rem;
    }
    .checker-item-bank {
        width: 30%;
        height: 60px;
        line-height: 19px;
        border-radius: 4px;
        border: 1px solid #ccc;
        background-color: #fff;
        margin-right: 6px;
        margin-top: 6px;
    }
    .checker-item-bank2 {
        width: 30%;
        height: 40px;
        line-height: 37px;
        border-radius: 4px;
        border: 1px solid #ccc;
        background-color: #fff;
        margin-right: 6px;
        margin-top: 6px;
    }

    .checker-item-selected {
        background: #ffffff url('../../images/active.png') no-repeat right bottom;
        border-color: #ff4a00;
    }

    // 币种国旗
    // -------------------------
    $menuList: 'USD' 'HKD' 'CNY' 'AUD' 'JPY' 'GBP' 'EUR' 'SGD' 'CHF';
    .md_flag {
        display: inline-block;
        width: 2rem;
        height: 2rem;
        vertical-align: middle;
        margin-left: 6px;
        @each $var in $menuList {
            &.#{$var} {
                background: url('../../images/flag/#{$var}.png') 0 0 no-repeat;
                background-size: cover;
                margin-top: 5px;
            }
        }
    }


</style>
