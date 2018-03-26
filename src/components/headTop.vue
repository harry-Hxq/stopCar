<template>
    <header v-if="headerShow">
        <x-header slot="header"
                  style="width:100%;position:absolute;left:0;top:0;z-index:100;background: rgb(82, 175, 36);"
                  :left-options="leftOptions"
                  :right-options="rightOptions"
                  :title="title">
            <router-link :to="rightUrl" slot="right" v-if="rightTitle">
                {{rightTitle}}
            </router-link>
            <a :href="rightUrl" slot="right" v-if="loginFund">
                基金登录
            </a>
        </x-header>
    </header>
</template>

<script>
    import {XHeader} from 'vux'
    import {mapState, mapMutations, mapActions} from 'vuex'

    export default {
        // name: 'tabbar',
        data () {
            return {
                rightTitle: '',
                rightUrl: '',
                loginFund: false,
            }


        },
        components: {
            XHeader,
        },
        props: ['params'],
        created(){

        },
        computed: {
            ...mapState([
                'headerShow',
            ]),
            isShow() {
                return this.headShow
            },
            title() {
                return this.$route.meta.title
            },
            leftOptions () {
                return {
                    showBack: !this.$route.meta.hideBack
                }
            },
            rightOptions () {
                return {
                    showMore: false
                }
            },
            headerTransition () {
                return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
            },
            componentName () {
                if (this.route.path) {
                    const parts = this.route.path.split('/')
                    if (/component/.test(this.route.path) && parts[2]) return parts[2]
                }
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
