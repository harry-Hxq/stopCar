<template>
    <div>
        <head-top></head-top>

        <scroller style="top: 60px;"
                  :on-refresh="refresh"
                  :on-infinite="infinite"
                  refresh-layer-color="#4b8bf4"
                  loading-layer-color="#ec4949"
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

            <div class="flex layout f12">
                <span class="center"><x-icon type="ios-checkmark" size="18"></x-icon></span>
                <span>开户成功</span>

                <span class="center ml10"><x-icon type="ios-close-outline" size="18"></x-icon></span>
                <span>开户失败</span>

                <span class="center ml10"><x-icon type="ios-minus-outline" size="18"></x-icon></span>
                <span>审核中</span>

                <span class="center ml10"><x-icon type="ios-circle-outline" size="18"></x-icon></span>
                <span>未提交</span>


        </div>
        <div class="mt5"></div>
        <x-table :cell-bordered="false" style="background-color:#fff;">
            <thead>
            <tr style="background-color: #F7F7F7">
                <th>姓名</th>
                <th>手机</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in list">
                <td>{{item.realname}}</td>
                <td>
                    <a :href="'tel:'+item.phone" class="c_orange">{{item.phone}}</a>
                </td>
                <td>
                    <span class="center">
                        <x-icon type="ios-minus-outline" v-show="item.is_opener === 0 || item.is_opener === 3"></x-icon>
                        <x-icon type="ios-close-outline" v-show="item.is_opener === -1"></x-icon>
                        <x-icon type="ios-checkmark" v-show="item.is_opener === 1"></x-icon>
                        <x-icon type="ios-circle-outline" v-show="item.is_opener === 2"></x-icon>
                    </span>
                    </td>
                    <td>
                         <x-button mini v-show="item.is_opener === 1" :link="{path:'/customerFundDetail',query:{uid:item.uid}}" >查看</x-button>
                        <x-button mini v-if="item.open_state < 4" :link="{path:'/openFund',query:{uid:item.uid}}">开户
                        </x-button>
                    </td>
                </tr>
                <!-- custom infinite spinner -->
                </tbody>
            </x-table>
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

    </div>

</template>


<script>
    import {mapState, mapMutations, mapActions} from 'vuex'
    import {getFundList} from '../../service/getData'
    import {getStore, setStore, removeStore} from '../../config/mUtils'
    import {XTable, LoadMore} from 'vux'

    export default {
        data () {
            return {
                list: [],
                page: 1,
                limit: 10,
                fullpath : 1

            }
        },
        components: {
            XTable,
            LoadMore,
        },

        activated() {
            if(this.fullpath === this.$route.fullPath || this.fullpath===1){
                this.fullpath = this.$route.fullPath
                return
            }
            this.list = [];
            this.page = 1;
            this.getList();
        },


        created() {
//            this.getList()
        },

        mounted() {
//            this.getList();
            this.top = 1;
            this.bottom = 20
        },

        methods: {
            getList(){
                const reqJson = {
                    page: this.page,
                    limit: this.limit,
                }
                return getFundList(reqJson)
                    .then((data) => {
                        if (data.ret) {
                            this.list = data.res.data.list
                            this.page++;
                            if (data.res.data.list.length < this.limit) {
//                                done(true)
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
                this.getList();
                this.top = this.top - 10;
                done()
            },
            infinite(done) {
                console.log(1)
                if (this.bottom >= 30) {
                    setTimeout(() => {
                        done(true)
                    }, 1500)
                    return;
                }
                this.getList();
                this.bottom = this.bottom + 10;
                done()


            }
        }
    }
</script>

<style>
    .vux-x-icon {
        fill: #F70968;
    }

    td {
        vertical-align: middle;
    }
</style>
