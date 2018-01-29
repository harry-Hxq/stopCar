<template>
    <div>
        <head-top></head-top>
        <group>
            <cell title="姓名" :value="detail.name"></cell>
            <cell title="手机号码" :value="detail.phone"></cell>
            <cell title="邮箱" :value="detail.email"></cell>
            <cell title="备注"></cell>
        </group>

        <group>

        </group>
    </div>
</template>


<script>

    import {mapState, mapMutations, mapActions} from 'vuex'
    import {getAgents} from '../../service/getData'
    import Group from "../../../node_modules/vux/src/components/group/index";
    export default {
        data () {
            return {
                detail: {},
                id:'',
                fullpath:''
            }
        },

        activated(){
            if(this.fullpath === this.$route.fullPath || this.fullpath === '') {
                this.fullpath = this.$route.fullPath
                return
            }
            // 参数不同，重新请求数据
            this.id = this.$route.query.id
            this.fullpath = this.$route.fullPath
            this.getDetail()

        },

        created() {
            console.log(111)
            this.id = this.$route.query.id
            console.log(this.id)
            if(!this.id){
                this.$vux.alert.show({
                    title:'提示',
                    content: '未知用户',
                    onHide () {
                        this.$router.go(-1)
                    }
                })
            }
        },
        mounted() {
            this.getDetail()
        },
        components: {Group},

        methods: {
            getDetail(){
                const reqJson = {
                    id:this.id
                }
                return getAgents(reqJson)
                    .then((data) => {
                        if (data.ret) {
                            this.detail = data.res.data
                        } else {
                            this.$vux.alert.show({
                                title: '提示',
                                content: data.res.errorMsg,
                            })
                        }
                    })
            }
        }
    }
</script>

<style>


</style>
