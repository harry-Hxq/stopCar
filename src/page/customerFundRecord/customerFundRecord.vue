<template>
    <div>

        <head-top></head-top>
        <scroller style="top: 60px;"
                  :on-refresh="refresh"
                  :on-infinite="infinite"
                  refresh-layer-color="#4b8bf4"
                  loading-layer-color="#ec4949"
                  ref="scroller"
        >
            <!-- custom refresh spinner, use default `spinner` & viewBox 0,0,64,64 class -->
            <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
                <g stroke-width="7" stroke-linecap="round">
                    <line x1="10" x2="10" y1="27.3836" y2="36.4931">
                        <animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16"
                                 repeatCount="indefinite"></animate>
                        <animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48"
                                 repeatCount="indefinite"></animate>
                        <animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1"
                                 repeatCount="indefinite"></animate>
                    </line>
                    <line x1="24" x2="24" y1="18.6164" y2="45.3836">
                        <animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16"
                                 repeatCount="indefinite"></animate>
                        <animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48"
                                 repeatCount="indefinite"></animate>
                        <animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1"
                                 repeatCount="indefinite"></animate>
                    </line>
                    <line x1="38" x2="38" y1="16.1233" y2="47.8767">
                        <animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18"
                                 repeatCount="indefinite"></animate>
                        <animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44"
                                 repeatCount="indefinite"></animate>
                        <animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8"
                                 repeatCount="indefinite"></animate>
                    </line>
                    <line x1="52" x2="52" y1="16" y2="48">
                        <animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28"
                                 repeatCount="indefinite"></animate>
                        <animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36"
                                 repeatCount="indefinite"></animate>
                        <animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5"
                                 repeatCount="indefinite"></animate>
                    </line>
                </g>
            </svg>

            <button-tab  v-model="type" style="padding: 5px">
                <button-tab-item @on-item-click="changeParams" >全部</button-tab-item>
                <button-tab-item @on-item-click="changeParams" >认购</button-tab-item>
                <button-tab-item @on-item-click="changeParams" >赎回</button-tab-item>
            </button-tab>


            <group v-for="item in list">
                <div v-if="item.list_type == 1" >
                    <cell :title="item.fund_name_cn" :value="formatTime(item.create_date)" @click.native="showDetails(item)"></cell>
                    <cell-form-preview :list="[{label: '认购金额',value: item.purchase_money+'('+mapping.currencyCnName[item.currency]+')'},{label: '状态',value: mapping.purchaseState[item.state]}]"></cell-form-preview>
                </div>
                <div v-if="item.list_type == 2" >
                    <cell :title="item.fund_name_cn" :value="formatTime(item.create_date)" @click.native="showDetails(item)"></cell>
                    <cell-form-preview :list="[{label: '赎回金额',value: item.purchase_money},{label: '状态',value: mapping.redeemState[item.state]}]"></cell-form-preview>
                </div>
            </group>



            <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
                <g>
                    <circle cx="16" cy="32" stroke-width="0" r="3">
                        <animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5"
                                 repeatCount="indefinite"></animate>
                        <animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3"
                                 repeatCount="indefinite"></animate>
                    </circle>
                    <circle cx="32" cy="32" stroke-width="0" r="3.09351">
                        <animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5"
                                 repeatCount="indefinite"></animate>
                        <animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4"
                                 repeatCount="indefinite"></animate>
                    </circle>
                    <circle cx="48" cy="32" stroke-width="0" r="4.09351">
                        <animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6"
                                 repeatCount="indefinite"></animate>
                        <animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5"
                                 repeatCount="indefinite"></animate>
                    </circle>
                </g>
            </svg>
        </scroller>

        <div v-transfer-dom>
            <popup v-model="detailShow" position="left" width="100%">
                <div class="position-horizontal-demo">

                    <group>
                        <div v-if="detail.list_type == 1" >
                            <cell :title="detail.fund_name_cn" :value="mapping.redeemState[detail.state]"></cell>
                            <cell-form-preview :list="[
                                {label: '编号',value: detail.order_num},
                                {label: '认购金额',value: detail.purchase_money+'('+mapping.currencyCnName[detail.currency]+')'},
                                {label: '提交时间',value: formatTime(detail.create_date)}
                                ]"></cell-form-preview>
                            <load-more tip="兑换信息" :show-loading="false" background-color="#fbf9fe"></load-more>
                            <x-table full-bordered style="background-color:#fff;">
                                <thead>
                                <tr>
                                    <th>币种</th>
                                    <th>金额</th>
                                    <th>参考汇率</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="purchase_info in detail.purchase_info">
                                    <td>{{mapping.currencyCnName[purchase_info.name]}}</td>
                                    <td>{{purchase_info.value}}</td>
                                    <td>{{purchase_info.rate}}</td>
                                </tr>
                                </tbody>
                            </x-table>
                        </div>
                        <div v-if="detail.list_type == 2" >
                            <cell :title="detail.fund_name_cn" :value="mapping.redeemState[detail.state]"></cell>
                            <cell-form-preview :list="[
                                {label: '编号',value: detail.order_num},
                                {label: '赎回金额',value: detail.purchase_money+'('+mapping.currencyCnName[detail.currency]+')'},
                                {label: '提交时间',value: formatTime(detail.create_date)}
                                ]"></cell-form-preview>
                        </div>
                    </group>


                    <span class="vux-close" @click="detailShow = false"><x-icon type="ios-close" size="30"></x-icon></span>
                </div>
            </popup>
        </div>

    </div>

</template>


<script>
    import mapping from '../../config/mapping'
    import {mapState, mapMutations, mapActions} from 'vuex'
    import {tradeRecode} from '../../service/getData'
    import {getStore, setStore, removeStore,formatDate,formatTime} from '../../config/mUtils'
    import { XTable, LoadMore,CellFormPreview, Checker, CheckerItem,ButtonTab, ButtonTabItem, TransferDom, Popup} from 'vux'

    export default {
        directives: {
            TransferDom
        },
        data () {
            return {
                mapping : mapping,
                list: [],
                page: 1,
                limit: 20,
                type:0,
                fullpath : '',
                detailShow : false,
                detail : {}

            }
        },
        components: {
            XTable, LoadMore,CellFormPreview,Checker, CheckerItem,ButtonTab, ButtonTabItem, TransferDom, Popup
        },

        activated(){
            this.uid = this.$route.query.uid
            if (this.fullpath === this.$route.fullPath || this.fullpath === '') {
                this.fullpath = this.$route.fullPath
                return
            }
            // 参数不同，重新请求数据
            this.fullpath = this.$route.fullPath
            this.getList()
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
        },

        mounted() {
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
                    type: this.type,
                }
                return tradeRecode(reqJson)
                    .then((data) => {
                        if (data.ret) {
                            this.list = data.res.data.list
                            this.page ++;
                            if (data.res.data.list.length < this.limit) {

                            }
                        } else {
                            this.$vux.alert.show({
                                title: '提示',
                                content: data.res.errorMsg,
                            })
                        }
                    })
            },

            refresh(done) {
                this.page = 1;
                this.list = [];
                this.getList(done);
                this.top = this.top - 10;
                done()
            },
            infinite(done) {
                if (this.bottom >= 30) {
                    setTimeout(() => {
                        done(true)
                    }, 1500)
                    return;
                }
                this.getList();
                this.bottom = this.bottom + 10;
                done()


            },
            changeParams(){
                this.page = 1;
                this.list = [];
                this.getList();
                this.top = this.top - 10;
            },
            showDetails(item){
                console.log(item)
                this.detail = item;
                this.detailShow = true;
            }

        }
    }
</script>

<style lang="less" scoped>

    .position-horizontal-demo {
        position: relative;
        height: 100%;
        .vux-close {
            position: absolute;
            top: 90%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%) scale(2);
            color: #000;
        }
    }

</style>
