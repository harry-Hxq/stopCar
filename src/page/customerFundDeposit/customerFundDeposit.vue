<template>
    <div>
        <head-top ref="headtop"></head-top>

        <group label-width="4.5em" label-margin-right="2em" label-align="left">
            <!-- <selector title="渠道类别" :options="['理财师', '公司']" v-model="agentType"></selector> -->
            <selector title="币种：" :options="mapping.list.currencyCnName" v-model="currency_type"></selector>
            <x-input title="金额："  v-model="currency_money" placeholder="请填写入金金额"></x-input>
            <cell></cell>
            <div class="open_idcard_wrap_deposit mt10">
                <p>上传入金凭证</p>
                <img :src="deposit_img||defaultDepositImg" class="upload_img">
                <input type="file" class="md_file_input" @change="preview" id="inputFront">
                <div class="upload_content" v-show="!deposit_img">
                    <i class="upload_ico"></i>
                </div>
            </div>
        </group>
        <box gap="10px 10px">
            <x-button type="primary" action-type="button" @click.native="submit">提交</x-button>
        </box>
    </div>

</template>


<script>
    import mapping from '../../config/mapping'
    import {uploadDeposit} from '../../service/getData'
    import {Tab, TabItem, Sticky,Swiper, SwiperItem} from 'vux'
    import Group from "../../../node_modules/vux/src/components/group/index";
    import lrz from 'lrz'
    import validator from '../../plugins/validator'

    export default {
        data () {
            return {
                mapping: mapping,
                currency_money : '',
                currency_type : 'CNY',
                file : 0,
                deposit_img:'',
                defaultDepositImg: require('../../images/idcard.png'),
                uid : '',
            }
        },
        components: { Tab, TabItem, Sticky,Swiper, SwiperItem},
        activated () {

        },
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
            this.$refs.headtop.rightUrl = '/customerFundDepositLog?uid='+this.uid
            this.$refs.headtop.rightTitle = '入金记录'
        },

        methods: {

            submit() {
                const data = {
                    currency_type : this.currency_type,
                    currency_money : parseFloat(this.currency_money),
                    deposit_img : this.deposit_img
                }
                console.log(data);
                if (!this.validate(this.validator, data)) return

                const reqJson = {
                    uid: this.uid,
                    currency : data.currency_type,
                    currency_money : data.currency_money,
                    file : data.deposit_img,
                }
                let that = this;
                uploadDeposit(reqJson)
                    .then((data) => {
                        if(data.ret) {
                            that.$vux.alert.show({
                                content: '提交审核中，三个工作日左右',
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
                    currency_money: {
                        required : true,
                    },
                    currency_type : {
                        required : true,
                    },
                    deposit_img : {
                        required : true
                    }
                }
                const message = {
                    currency_money: {
                        required : '请填写入金金额',
                    },
                    currency_type : {
                        required : '请选择入金币种',
                    },
                    deposit_img : {
                        required : '请上传入金凭证'
                    }
                }
                this.validator = new validator(rule,message)
            },

            // 预览图片
            preview(event) {
                let that = this
                lrz(event.target.files[0], {
                    width: 750,
                    quality: 0.8,
                })
                    .then((data) => {
                        that.deposit_img = data.base64
                    })
            },


        }
    }
</script>

<style>

    .open_idcard_wrap_deposit {
        position: relative;
        border-radius: .1rem;
        text-align: center;
        box-sizing: border-box;
        overflow: hidden;
    }

    .upload_img {
        width: 17rem;
    }

    .md_file_input {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        font-size: 100px;
        opacity: 0;
        z-index: 5;
    }

    .upload_ico {
        display: block;
        position: absolute;
        left: 50%;
        top: 55%;
        width: 40px;
        height: 40px;
        margin: -20px 0 0 -20px;
        background-image: url('../../images/op_upload.png');
        background-size: 40px;
    }


</style>
