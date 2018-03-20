<template>
    <div>
        <head-top ref="headtop"></head-top>

        <group>
            <cell title="我的车牌"  value="未绑定" link="/bindCarNum" v-if="!userInfo.plate_num" is-link>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/car_num_20.png">
            </cell>
            <cell title="我的车牌"  :value="userInfo.plate_num" v-if="userInfo.plate_num" is-link link="/bindCarNum">
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/car_num_20.png">
            </cell>
            <cell title="我的昵称"  :value="userInfo.username" is-link>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/huiyuan_20.png">
            </cell>
            <cell title="手机号码"  :value="userInfo.mobile" v-if="userInfo.mobile" link="/bindMobile" is-link>
                <img slot="icon" width="20" style="display:block;margin-right:5px;" src="../../images/icon/phone_20.png">
            </cell>
        </group>

    </div>
</template>


<script>
    import {  Card,Confirm,XDialog} from 'vux'
    import {mapState} from 'vuex'
    import {getStore} from '../../config/mUtils'
    import mapping from '../../config/mapping'
    import {getUsers,pay,PayConfig,PayLocalOrder,stopTipList} from '../../service/getData'
//    import navTab from '../../components/navTab'

    export default {
        data () {
            return {
                mapping: mapping,
                is_member : '非会员',
                userInfo : {},
                showContact:false,
                logged: '',
                showContent004 : false,
                confirmShow : false,
                content : '',
                deadline : 0,
                animate:false,
                items:[],
            }
        },
        components: { Card ,Confirm,XDialog},
        computed: {
//            ...mapState([
//                'agentInfo',
//            ]),

        },
        created() {
//            this.stopTipList()
            this.getUsers()
        },
        activated(){

        },
        mounted() {
            console.log(111)

        },
        methods: {

            getUsers(){
                return getUsers()
                    .then((data => {
                        if(data.code === 200) {
                            this.userInfo = data.data
                        }
                    }))
            },

        }
    }
</script>

<style>
</style>
