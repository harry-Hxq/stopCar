<template>
    <div>
        <head-top ref="headtop"></head-top>
            <group v-for="item in list">
                <cell :title="item.bank_name" ></cell>
                <cell-form-preview :list="[{label: '银行账号',value: item.bank_account},
                {label: '币种',value: mapping.currencyCnName[item.cash_type]},
                {label: '地区',value: mapping.card_type[item.card_type]},
                ]"></cell-form-preview>
            </group>
    </div>

</template>


<script>
    import mapping from '../../config/mapping'
    import {mapState, mapMutations, mapActions} from 'vuex'
    import {Bank} from '../../service/getData'
    import {getStore, setStore, removeStore,formatDate,formatTime} from '../../config/mUtils'
    import {XTable, LoadMore, CellFormPreview, Checker, CheckerItem} from 'vux'

    export default {
        data () {
            return {
                mapping : mapping,
                list: [],
                page: 1,
                limit: 20,
                types:1,
                fullpath : ''

            }
        },
        components: {
            XTable, LoadMore,CellFormPreview,Checker, CheckerItem
        },


        created() {

            this.uid = this.$route.query.uid
            if(!this.uid){
            let that = this
            this.$vux.alert.show({
                    content: '系统错误',
                    onHide () {
                        that.$router.go(-1)
                    }
                })
            }
            this.getList()
        },


        mounted() {
            this.$refs.headtop.rightUrl = '/customerFundEditBank?uid='+this.uid
            this.$refs.headtop.rightTitle = '编辑银行卡'
            this.top = 1;
            this.bottom = 20
        },

        methods: {
            formatDate,formatTime,
            getList(){
                const reqJson = {
                    uid: this.uid,
                    page: this.page,
                    limit: this.limit,
                }
                return Bank(reqJson)
                    .then((data) => {
                        if (data.ret) {
                            this.list = data.res.data.list
                        } else {
                            this.$vux.alert.show({
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
