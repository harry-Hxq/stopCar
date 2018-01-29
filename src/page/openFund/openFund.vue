<template>

    <div>
        <head-top></head-top>
        <flow>
            <flow-state title="注册" :is-done="activeStep>=0"></flow-state>
            <flow-line :is-done="activeStep>0" :line-span="25"></flow-line>

            <flow-state title="身份信息" :is-done="activeStep>=1"></flow-state>
            <flow-line :is-done="activeStep>1" :line-span="25"></flow-line>

            <flow-state title="确认信息" :is-done="activeStep>=2"></flow-state>
            <flow-line :is-done="activeStep>2" :line-span="25"></flow-line>

            <flow-state title="完善信息" :is-done="activeStep>=3"></flow-state>
            <flow-line :is-done="activeStep>3" :line-span="25"></flow-line>

            <flow-state title="签名验证" :is-done="activeStep>=4"></flow-state>
        </flow>
        <div>
            <div class="content">
                <div class="content-item" v-show="activeStep === 0">

                    <group>
                        <x-input title="手机" v-model="phone" placeholder="开户手机号码" type="number" keyboard="number" is-type="china-mobile"></x-input>
                        <x-input title="登录密码" v-model="pwd" type="text" placeholder="默认手机后六位" :min="6" :max="20"></x-input>
                        <x-input title="交易密码" v-model="tpwd" type="text" placeholder="必填" :min="6" :max="20"></x-input>
                    </group>

                    <box gap="10px 10px">
                        <x-button type="primary" @click.native="next1">下一步</x-button>
                    </box>
                </div>
                <div class="content-item" v-show="activeStep === 1">
                    <div class="layout tc">
                        <div class="">
                            <p class="c_orange">证件放到白纸上完整拍照，文字清晰可识别</p>
                            <p class="c_gray">必须为本人身份证原件，不能是复印件</p>
                        </div>
                        <div class="open_idcard_wrap mt10">
                            <img :src="cardFront||defaultFront" class="upload_img">
                            <input type="file" class="md_file_input" @change="previewFront" id="inputFront">
                            <div class="upload_content" v-show="!cardFront">
                                <i class="upload_ico"></i>
                            </div>
                        </div>
                        <p class="c_gray f12">{{cardFront ? '点击图片可重新上传背面' : '上传身份证正面'}}</p>
                        <div class="open_idcard_wrap mt30">
                            <img :src="cardBack||defaultBack" class="upload_img">
                            <input type="file" class="md_file_input" @change="previewBack" id="inputBack">
                            <div class="upload_content" v-show="!cardBack">
                                <i class="upload_ico"></i>
                            </div>
                        </div>
                        <p class="c_gray f12">{{cardBack ? '点击图片可重新上传背面' : '上传身份证背面'}}</p>
                    </div>
                    <box gap="10px 10px">
                        <x-button type="primary" @click.native="next2">下一步</x-button>
                    </box>
                </div>
                <div class="content-item" v-show="activeStep === 2">
                    <group>
                        <x-input title="姓名：" v-model="realname" type="text"></x-input>
                        <x-input title="姓拼音：" v-model="lastname" type="text"></x-input>
                        <x-input title="名拼音：" v-model="firstname" type="text"></x-input>
                        <x-input title="身份证：" v-model="idcard" type="text"></x-input>
                        <x-input title="地址：" v-model="addr" type="text"></x-input>
                        <selector title="性别" :options="mapping.list.gender" v-model="gender"></selector>
                    </group>

                    <box gap="10px 10px">
                        <x-button type="primary" @click.native="next3">下一步</x-button>
                    </box>
                </div>
                <div class="content-item" v-show="activeStep === 3">
                    <group>
                        <group-title slot="title">所在单位</group-title>
                        <x-input title="单位名称：" v-model="companyName" placeholder="输入单位全称" type="text" required></x-input>
                        <x-input title="单位地址：" v-model="companyAddr" placeholder="如：XX市XX路XX号XX栋XX室" type="text" required></x-input>
                        <selector title="商业性质:" :options="mapping.list.business" v-model="companyBusiness"></selector>
                    </group>

                    <group>
                        <group-title slot="title">投资偏好<span style="float:right;">单位：人民币</span></group-title>
                        <selector title="年度收入:" :options="mapping.list.income" v-model="income"></selector>
                        <selector title="收入来源:" :options="mapping.list.source" v-model="source"></selector>
                        <selector title="流动资金:" :options="mapping.list.flow" v-model="flow"></selector>
                        <selector title="风险偏好:" :options="mapping.list.risk" v-model="risk"></selector>
                        <selector title="派息方式:" :options="mapping.list.repay" v-model="repay"></selector>
                    </group>

                    <box gap="10px 10px">
                        <x-button type="primary" @click.native="next4">下一步</x-button>
                    </box>
                </div>
                <div class="content-item" style="text-align: center" v-show="activeStep === 4">
                    <p class="c_orange tc mt30">将手机横屏，并保持书写清晰，</p>
                    <div class="op_sign_img mt30" v-if="signature">
                        <img :src="signature" alt="">
                    </div>
                    <div class="md_btn_wrap mt10">
                        <x-button mini plain type="primary" @click.native="openSignModal">{{signature ? '已签名' : '点击签名'}}</x-button>
                    </div>

                    <box gap="10px 10px">
                        <x-button type="primary" @click.native="submit">完成</x-button>
                    </box>
                </div>
                
            </div>
        </div>

        <!-- 签名弹窗 -->
        <section class="op_sign_modal" v-show="signShow">
            <!-- 横屏提示 -->
            <section class="md_landscape">
                <div class="content">
                    <p class="c_orange mt100">请将手机横屏</p>
                    <p class="c_gray mt10">请取消竖屏锁定，再把手机横过来</p>
                </div>
            </section>
            <div class="pad">
                <canvas id="signature_canvas"></canvas>
            </div>
            <div class="tool justify layout">
                <div class="left">
                    <span class="c_gray">请勿超出边界</span>
                </div>
                <div class="right">
                    <button class="c_white" @click="resetSign">重写</button>
                    <button class="c_white ml10" @click="confirmSign">确定</button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import {Flow, FlowState, FlowLine, PopupRadio} from 'vux'
    import {mapState, mapMutations, mapActions} from 'vuex'
    import SignaturePad from '../../plugins/signature_pad'
    import validator from '../../plugins/validator'
    import mapping from '../../config/mapping'
    import {openAccount, uploadIdCard,fundRegister,setTrdPassword,getCustomers,saveOpenStateFinal,saveOpenStateThree,saveOpenStateFour} from '../../service/getData'
    import lrz from 'lrz'

    export default {
        data () {
            return {
                mapping: mapping,
                activeStep: 0,
                defaultFront: require('../../images/op_card1.png'),
                defaultBack: require('../../images/op_card2.png'),
                cardFront: '',  // 正面
                cardBack: '',  // 反面
                frontLink:'',
                backLink:'',

                index: 0,
                phone: '',
                pwd: '',
                tpwd: '',

                realname: '',
                lastname: '',
                firstname: '',
                idcard: '',
                addr: '',
                gender: 1,
                companyName: '',
                companyAddr: '',
                companyBusiness: 1,
                income: 1,
                source: 1,
                flow: 1,
                risk: 1,
                repay: 1,

                signaturePad: {},  // 签名实例对象
                signShow: false,  // 签名弹窗是否显示
                signature: '',  // 签名base64

            }
        },
        components: {
            Flow, FlowState, FlowLine, PopupRadio
        },
        created() {
            console.log(this.$route.query.uid)

            // 判断是否是新开户
            if(this.$route.query.uid){
                var that = this;
                that.uid = that.$route.query.uid
                const reqJson = {
                    uid:that.uid
                }
                getCustomers(reqJson)
                    .then((data) => {
                        if(data.ret) {
                            if(data.res.data.is_opener === 3 || data.res.data.is_opener === 0){
                                this.$vux.alert.show({
                                    title:'提示',
                                    content: '此用户正在开户审核中',
                                    onHide () {
                                        that.$router.go(-1)
                                    }
                                })
                            }
                            if(data.res.data.is_opener === 1){
                                this.$vux.alert.show({
                                    title:'提示',
                                    content: '此用户已开户成功',
                                    onHide () {
                                        that.$router.go(-1)
                                    }
                                })
                            }
                            this.activeStep = data.res.data.open_state + 1
                        }else {
                            this.$vux.alert.show({
                                title:'提示',
                                content: data.res.errorMsg,
                                onHide () {
                                    that.$router.go(-1)
                                }
                            })
                        }
                    })

            }
            this.validateInit()
        },
        methods: {
            ...mapMutations([
                'SETTOOL',
            ]),
            submit() {
                const data = {
                    signature: this.signature,
                }
                if(!this.validate(this.validator5, data)) return

                const reqJson = {
                    uid:this.uid,
                    identity_sign_img: this.signature,  // 签名base64
                    open_state : 4

                }

                var that = this;
                openAccount(reqJson)
                .then((data) => {
                    if(data.ret) {
                        that.$vux.alert.show({
                            content: '提交审核中，三个工作日左右',
                            onHide () {
                                that.$router.replace('/customerFund?time='+that.phone)
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
            toStep(i) {
                if(i < 0 || i > 4) return
                this.activeStep = i
            },
            nextStep() {
                this.toStep(this.activeStep+1)
            },
            next1(){
                const data = {
                    phone: this.phone,
                    tpwd: this.tpwd,
                }
                if(!this.validate(this.validator, data)) return

                if(this.pwd.length === 0){
                    this.pwd = this.phone.substring(5)
                }
                //注册
                const reqJson = {
                    phone: this.phone,
                    password: this.pwd,
                }
                fundRegister(reqJson)
                    .then((data) => {
                        if(data.ret) {
                            this.uid = data.res.data.uid;

                            //设置交易密码
                            setTrdPassword({trade_password:this.tpwd,uid:this.uid})
                                .then((data) => {
                                    if(data.ret) {
                                        // window.location.search = 'uid='+this.uid;
                                        this.nextStep()
                                    }else {
                                        this.$vux.alert.show({
                                            title: '提交失败',
                                            content: data.res.errorMsg,
                                        })
                                    }
                                })

                        }else {
                            this.$vux.alert.show({
                                title: '提交失败',
                                content: data.res.errorMsg,
                            })
                        }
                    })

            },
            next2(){
                const data = {
                    cardFront: this.cardFront,
                    cardBack: this.cardBack,
                }
                if(!this.validate(this.validator2, data)) return

                //获取身份信息
                const reqJson = {
                    identity_front_img : this.cardFront,
                    identity_back_img : this.cardBack,
                }
                uploadIdCard(reqJson)
                    .then((data) => {
                        if(data.ret) {
                            this.frontLink = data.res.data.identity_front_img
                            this.backLink = data.res.data.identity_back_img

                            this.realname = data.res.data.realname
                            this.lastname = data.res.data.lastname
                            this.firstname = data.res.data.firstname
                            this.idcard = data.res.data.idcard
                            this.addr = data.res.data.address
                            this.gender = data.res.data.gender

                            this.nextStep()

                        }else {
                            this.$vux.alert.show({
                                title: '提交失败',
                                content: data.res.errorMsg,
                            })
                        }
                    })


            },
            next3(){
                const data = {
                    realname: this.realname,
                    lastname: this.lastname,
                    firstname: this.firstname,
                    gender: this.gender,
                    idcard: this.idcard,
                    addr: this.addr,
                }
                if(!this.validate(this.validator3, data)) return

                //保存开户状态（保存身份信息）
                const reqJson = {
                    uid: this.uid,
                    realname: this.realname,  // 姓名
                    lastname: this.lastname,  // 姓拼音
                    firstname: this.firstname,  // 名拼音
                    gender: this.gender,  // 性别
                    identity_number: this.idcard,  // 身份证
                    address: this.addr,  // 地址
                    identity_front_img: this.frontLink,  // 证件正面图片链接
                    identity_back_img: this.backLink,  // 证件背面图片链接
                    open_state : 2
                }
                openAccount(reqJson)
                    .then((data) => {
                        if(data.ret) {
                            this.nextStep()
                        }else {
                            this.$vux.alert.show({
                                title: '提交失败',
                                content: data.res.errorMsg,
                            })
                        }
                    })

            },
            next4(){
                const data = {
                    companyName: this.companyName,
                    companyAddr: this.companyAddr,
                }
                if(!this.validate(this.validator4, data)) return

                // 保存客户状态（完善信息）
                const reqJson = {
                    uid: this.uid,
                    company_name: this.companyName,  // 单位名称
                    company_addr: this.companyAddr,  // 单位地址
                    business : this.companyBusiness,  // 单位商业性质
                    income: this.income,  // 年收入
                    source: this.source,  // 收入来源
                    flow: this.flow,  // 流动资金
                    risk: this.risk,  // 风险偏好
                    repay: this.repay,  // 派息方式
                    open_state : 3
                }
                openAccount(reqJson)
                    .then((data) => {
                        if(data.ret) {
                            this.nextStep()
                        }else {
                            this.$vux.alert.show({
                                title: '提交失败',
                                content: data.res.errorMsg,
                            })
                        }
                    })


            },
            // 执行验证
            validate(validator, data) {
                var result = validator.checkForm(data)
                if(!result.valid) {
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
                  tpwd: {
                    required: true,
                  },
                }
                const messages = {
                  phone: {
                    required: '请填写手机号码', 
                    tel: '手机号码格式有误', 
                  },
                  tpwd: {
                    required: '请填写交易密码', 
                  },
                }

                const rules2 = {
                  cardFront: {
                    required: true,
                  },
                  cardBack: {
                    required: true,
                  },
                }
                const messages2 = {
                  cardFront: {
                    required: '请上传身份证正面', 
                  },
                  cardBack: {
                    required: '请上传身份证背面', 
                  },
                }

                const rules3 = {
                    realname: {
                        required: true,
                    },
                    lastname: {
                        required: true,
                    },
                    firstname: {
                        required: true,
                    },
                    gender: {
                        required: true,
                    },
                    idcard: {
                        required: true,
                        idcard: true,
                    },
                    addr: {
                        required: true,
                    },
                }
                const messages3 = {
                    realname: {
                        required: '请填写姓名',
                    },
                    lastname: {
                        required: '请填写姓拼音',
                    },
                    firstname: {
                        required: '请填写名拼音',
                    },
                    gender: {
                        required: '请选择性别',
                    },
                    idcard: {
                        required: '请填写昵称',
                        idcard: '身份证号码有误',
                    },
                    addr: {
                        required: '请填写地址',
                    },
                }

                const rules4 = {
                  companyName: {
                    required: true,
                  },
                  companyAddr: {
                    required: true,
                  },
                }
                const messages4 = {
                  companyName: {
                    required: '请填单位名称', 
                  },
                  companyAddr: {
                    required: '请填写单位地址', 
                  },
                }

                const rules5 = {
                  signature: {
                    required: true,
                  },
                }
                const messages5 = {
                  signature: {
                    required: '请签名', 
                  },
                }

                // 各步骤验证
                this.validator = new validator(rules, messages)
                this.validator2 = new validator(rules2, messages2)
                this.validator3 = new validator(rules3, messages3)
                this.validator4 = new validator(rules4, messages4)
                this.validator5 = new validator(rules5, messages5)
            },

            // 预览正面
            previewFront(event) {
                let that = this
                lrz(event.target.files[0], {
                    width: 750,
                    quality: 0.8,
                })
                    .then((data) => {
                        that.cardFront = data.base64
                    })
            },
            // 预览背面
            previewBack(event) {
                let that = this
                lrz(event.target.files[0], {
                    width: 1000,
                    quality: 0.5,
                })
                    .then((data) => {
                        that.cardBack = data.base64
                    })
            },
            // 打开签名弹窗
            openSignModal() {
                var that = this
                this.SETTOOL('hide')
                this.signShow = true
                if (!that.signature) {
                    setTimeout(() => {
                        that.signatureInit()
                    }, 30)
                }
            },
            // 重写签名
            resetSign() {
                this.signaturePad.clear();
            },
            // 确认签名
            confirmSign() {
                if (this.signaturePad.isEmpty()) {
                    App.$refs.toast.show('请在屏幕上手写签名')
                    return;
                }
                this.signature = this.signaturePad.toDataURL()
                this.signShow = false
                this.SETTOOL('show')
            },
            // 签名初始化
            signatureInit() {
                var that = this
                var canvas = document.querySelector("#signature_canvas")
                this.signaturePad = new SignaturePad(canvas)

                // resize
                function resizeCanvas() {
                    var ratio = Math.max(window.devicePixelRatio || 1, 1);
                    canvas.width = canvas.offsetWidth * ratio;
                    canvas.height = canvas.offsetHeight * ratio;
                    canvas.getContext("2d").scale(ratio, ratio);
                    that.signaturePad.clear(); // otherwise isEmpty() might return incorrect value
                }

                window.addEventListener("resize", resizeCanvas, false);
                resizeCanvas();
            },
        }
    }
</script>

<style lang="less">
    .open_idcard_wrap {
        display: inline-block;
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
        top: 50%;
        width: 40px;
        height: 40px;
        margin: -20px 0 0 -20px;
        background-image: url('../../images/op_upload.png');
        background-size: 40px;
    }

    .op_sign_modal {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background:#fff;
        z-index: 3000;
    }
    .op_sign_modal .pad {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 30px;
    }
    .op_sign_modal .pad canvas {
        width: 100%;
        height: 100%;
    }
    .op_sign_modal .tool {
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 30px;
        background:#242526;
    }
    .op_sign_img {
        padding: 0 15px;
    }
    .op_sign_img img {
        border-radius: 5px;
        background: #fff;
    }

</style>


