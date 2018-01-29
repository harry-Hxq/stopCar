<template>
    <div>
        <head-top></head-top>
        <scroller style="top: 41px;"
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


            <div class="mt5"></div>
            <x-table :cell-bordered="false" style="background-color:#fff;">
                <thead>
                <tr style="background-color: #F7F7F7">
                    <th>姓名</th>
                    <th>手机</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in list">
                    <td>{{item.name}}</td>
                    <td>{{item.phone}}</td>
                    <td>
                        <x-button mini :link="{path:'/customerErpDetail',query:{id:item.id}}" >查看</x-button>
                    </td>
                </tr>

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
    import {getErpList} from '../../service/getData'
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
        },

        mounted() {
            this.top = 1;
            this.bottom = 20
        },

        methods: {
            getList(){
                const reqJson = {
                    page: this.page,
                    limit: this.limit,
                }
                return getErpList(reqJson)
                    .then((data) => {
                        console.log(data);
                        if (data.ret) {
                            this.list = data.res.data.list
                            this.page++;
                            if (data.res.data.list.length < this.limit) {
//                                done(true)
                            }
                        } else {
                            that.$vux.alert.show({
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
                if (this.bottom >= 30) {
                    done(true)
                    return;
                }

                this.getList();
                this.bottom = this.bottom + 10;
                setTimeout(() => {
                    done()
                })

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
