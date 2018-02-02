<template>
	<div class="fullScreen">

        <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </view-box>


        <loading v-model="isLoading"></loading>
    </div>
</template>

<script>
import { ViewBox } from 'vux'
import {mapState, mapMutations, mapActions} from 'vuex'
import {setStore, getStore, removeStore} from './config/mUtils'
import {getUser} from './service/getData'

export default {
    data() {
        return {
        }
    },
    created() {
        window.App = this
    },
    mounted() {
    },
    components: {
        ViewBox,
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