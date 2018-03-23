<template>
    <div>
        <head-top ref="headtop"></head-top>
        <group>
            <div>
                <tab :line-width=2 active-color='#0e82da' v-model="index">
                    <tab-item class="vux-center" :selected="demo2 === item" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
                </tab>
                <swiper v-model="index" height="75vh" :show-dots="false">
                    <swiper-item  :key="0">
                        <div class="tab-swiper vux-center">
                            <group>
                                <div v-for="item in route_list" v-if="item.type==1">
                                    <cell v-if="item.is_news === 1" :title="formatDate(item.route_date)+mapping.route_type[item.type]+'管制点'"
                                          :link="{path:'/routeDot', query:{route_date:item.route_date,type:item.type}}"
                                          is-link >
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

    </div>
</template>


<script>
    import { Tab, TabItem , Swiper, SwiperItem } from 'vux'
    import mapping from '../../config/mapping'
    import {formatDate} from '../../config/mUtils'
    import {getUsers,routeList} from '../../service/getData'

    export default {
        data () {
            return {
                mapping : mapping,
                list2 : ['摩托管制', '小车管制'],
                demo2: '摩托管制',
                index: 0,
                route_list : []

            }
        },
        components: { Tab, TabItem , Swiper, SwiperItem },
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
            getUsers(){
                return getUsers()
                    .then((data => {
                        if(data.code === 200) {
                            this.userInfo = data.data
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





</style>
