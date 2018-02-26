<template>
    <div>
        <head-top ref="headtop"></head-top>

        <group v-for="item in list">
            <cell title="状态" value="成功提醒" ></cell>
            <cell-form-preview :list="[
                    {label: '停车位置',value: item.location},
                    {label: '时间',value: formatTime(item.create_time)}
                    ]">
            </cell-form-preview>
        </group>

    </div>
</template>


<script>
    import {mapState} from 'vuex'
    import {formatDate,formatTime,getStore} from '../../config/mUtils'
    import {XTable, LoadMore,CellFormPreview, Checker, CheckerItem,ButtonTab, ButtonTabItem, TransferDom, Popup,} from 'vux'
    import {tipLog} from '../../service/getData'

    export default {
        data () {
            return {
                list: [],
            }
        },
        components: {XTable, LoadMore,CellFormPreview, Checker, CheckerItem,ButtonTab, ButtonTabItem, TransferDom, Popup},
        computed: {

        },
        created() {
            this.tipLog()
        },
        activated(){

        },
        mounted() {

        },
        methods: {
            formatTime,

            tipLog(){

                return tipLog()
                    .then((data) => {
                        if(data.code === 200){
                            this.list = data.data.list
                        }else{
                            this.$vux.alert.show({
                                title: '提示',
                                content: data.msg,
                            })
                        }
                    })
            }
        }
    }
</script>

<style>
    .vux-demo {
        text-align: center;
    }

    .logo {
        width: 100px;
        height: 100px
    }
</style>
