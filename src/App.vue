<template>
	<div class="fullScreen">
        <head-top></head-top>
        <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </view-box>
        <nav-tab></nav-tab>
        <loading v-model="isLoading"></loading>
    </div>
</template>

<script>
import { ViewBox } from 'vux'
import {mapState, mapMutations, mapActions} from 'vuex'
import {setStore, getStore, removeStore} from './config/mUtils'
import {getUser} from './service/getData'
import {baseUrl, interfaceUrl} from './config/env'
import navTab from './components/navTab'
import headTop from './components/headTop'

export default {
    data() {
        return {
        }
    },
    created() {
        window.App = this

        if(!getStore('token')){
            if(!this.$route.query.api_token){
                window.location.href = interfaceUrl+'/api/v1/user/wx-login?targetUrl='+window.location.href
            }else{
                setStore('token',this.$route.query.api_token)
            }
        }
        if(this.$route.query.api_token){
            setStore('token',this.$route.query.api_token)
        }

    },
    mounted() {
    },
    components: {
        ViewBox,navTab,headTop
    },
    computed:{
        ...mapState({
          isLoading: state => state.loading.isLoading
        })
    },
    methods: {
    	...mapMutations([
            'LOGOUT',
        ]),
        ...mapActions([
            'getUserInfo'
        ]),
    }
}

</script>

<style lang="less">
@import './style/common.less';
@import '~vux/src/styles/reset.less';

</style>