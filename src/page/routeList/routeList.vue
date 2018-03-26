<template>
    <div>
        <group>
            <div>
                <tab :line-width=2 active-color='#52af24' v-model="index">
                    <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
                </tab>
                <swiper v-model="index" height="75vh" :show-dots="false">
                    <swiper-item  :key="0">
                        <div class="tab-swiper vux-center">
                            <group>
                                <div v-for="item in route_list" v-if="item.type==1">
                                    <cell v-if="item.is_news === 1 && userInfo.deadline != 0" :title="formatDate(item.route_date)+mapping.route_type[item.type]+'管制点'"
                                          :link="{path:'/routeDot', query:{route_date:item.route_date,type:item.type}}"
                                          is-link >
                                        <div ><span style="color: red">点击查看</span></div>
                                    </cell>
                                    <cell v-if="item.is_news === 1 && userInfo.deadline === 0" @click.native="showIsDeadline = true" :title="formatDate(item.route_date)+mapping.route_type[item.type]+'管制点'"
                                          is-link  >
                                        <div ><span style="color: red">点击查看</span></div>
                                    </cell>
                                    <cell v-if="item.is_news === 0" @click.native="timeOut" :title="formatDate(item.route_date)+mapping.route_type[item.type]+'管制点'"
                                          is-link value="已过期">
                                    </cell>

                                </div>
                            </group>
                        </div>
                    </swiper-item>
                    <swiper-item  :key="1">
                        <div class="tab-swiper vux-center">
                            <group>
                                <div v-for="item in route_list" v-if="item.type==2">
                                    <cell v-if="item.is_news === 1"  :title="formatDate(item.route_date)+mapping.route_type[item.type]+'管制点'"
                                          :link="{path:'/routeDot', query:{route_date:item.route_date,type:item.type}}"
                                          is-link >
                                        <div ><span style="color: red">点击查看</span></div>
                                    </cell>
                                    <cell v-if="item.is_news === 0" @click.native="timeOut"  :title="formatDate(item.route_date)+mapping.route_type[item.type]+'管制点'"
                                          is-link value="已过期">
                                    </cell>
                                </div>
                            </group>
                        </div>
                    </swiper-item>
                </swiper>
            </div>
        </group>

        <confirm
                v-model="showIsDeadline"
                title="行车无忧"
                :hide-on-blur=true
                confirm-text="支付"
                cancel-text="购买会员"
                @on-cancel="onCancel"
                @on-confirm="onConfirm">
            <p style="text-align:center;">支付2元即可查看，购买会员卡更优惠哦！</p>
        </confirm>


        <!--<confirm-->
                <!--v-model="userInfo.is_news === 0"-->
                <!--title="行车无忧"-->
                <!--:hide-on-blur=true-->
                <!--confirm-text="领取"-->
                <!--cancel-text="1"-->
                <!--@on-cancel="onConfirmIsNews"-->
                <!--@on-confirm="onConfirmIsNews">-->
            <!--<p style="text-align:center;">恭喜您获得vip一周体验卷，点击领取即可随时随地查看管制地点。</p>-->
        <!--</confirm>-->



    </div>
</template>


<script>
    import { Tab, TabItem , Swiper, SwiperItem ,Confirm} from 'vux'
    import mapping from '../../config/mapping'
    import {formatDate} from '../../config/mUtils'
    import {getUsers,routeList,getDays} from '../../service/getData'
    export default {
        data () {
            return {
                mapping : mapping,
                list2 : ['摩托管制', '小车管制'],
                demo2: '摩托管制',
                index: 0,
                route_list : [],
                showIsDeadline : false,
                userInfo : {}

            }
        },
        components: { Tab, TabItem , Swiper, SwiperItem ,Confirm},
        computed: {

        },
        created() {
            if(this.$route.query.index){
                this.index = 1
            }

            this.getUsers()
            this.routeList()
        },
        activated(){

        },
        mounted() {

        },
        methods: {
            formatDate,
            onCancel(){
                window.location.href = '/becomeMember/pay'
            },
            onConfirm(){
                window.location.href = '/becomeMember/payOne'
            },


            getUsers(){
                var that = this;
                return getUsers()
                    .then((data => {
                        if(data.code === 200) {
                            that.userInfo = data.data
                            if(that.userInfo.is_news === 0){
                                that.$vux.alert.show({
                                    title:"行车无忧",
                                    content: '恭喜您获得vip一周体验卷，点击确定即可随时随地查看管制地点。',
                                    onHide(){
                                        return getDays()
                                            .then((data => {
                                                if(data.code === 200) {
                                                    that.userInfo.is_news = 1
                                                    that.userInfo.deadline = 111
                                                }
                                            }))
                                    }
                                })
                            }
                        }
                    }))
            },


            routeList(){
                return routeList({type:1})
                    .then((data => {
                        if(data.code === 200) {
                            this.route_list = data.data
                        }
                    }))
            },
            timeOut(){
                this.$vux.alert.show({
                    title:"提示",
                    content: '此条提示信息已过期。',
                })
            },

        }
    }
</script>

<style>
    .vux-tab{
        border: none;
        color: rgb(82, 175, 36);
        font-size: 1.2rem;
    }





</style>
