<template>
    <div>
        <head-top ref="headtop"></head-top>
        <group title="">
            <x-input title="车牌号" value="闽F5525B" text-align="right" placeholder="I'm placeholder"></x-input>
        </group>
        <group title="">
            <x-input title="手机" value="17876013413" text-align="right" placeholder="I'm placeholder"></x-input>
        </group>
        <group title="">
            <cell title="当前位置" :is-link="true" link="/getLocation" ></cell>
        </group>
        <box gap="10px 10px">
            <x-button type="primary" action-type="button">确认停车</x-button>
        </box>
    </div>

        <!--<box gap="10px 10px">-->
            <!--<x-button type="primary" action-type="button">重新定位</x-button>-->
        <!--</box>-->


</template>


<script>

    import {mapState} from 'vuex'
    import {getStore} from '../../config/mUtils'
    const exampleComponents = {
        props: ['text'],
        template: `<div>: {{text}}</div>`
    }
    export default {
        data () {
            let self = this;
            return {
                count: 1,
                slotStyle: {
                    padding: '2px 8px',
                    background: '#eee',
                    color: '#333',
                    border: '1px solid #aaa'
                },
                zoom: 14,
                center: [113.9584215471,22.5435653340],
                markers: [
                    {
                        position: [113.9584215471,22.5435653340],
                        events: {
                            click: () => {
                                alert('click marker');
                            },
                            dragend: (e) => {
                                this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
                            }
                        },
                        visible: true,
                        draggable: false,
                        template: '<span>1</span>'
                    }
                ],
                renderMarker: {
                    position: [113.9584215471,22.5435653340],
                    contentRender: (h, instance) => {
                        // if use jsx you can write in this
                        // return <div style={{background: '#80cbc4', whiteSpace: 'nowrap', border: 'solid #ddd 1px', color: '#f00'}} onClick={() => ...}>marker inner text</div>
                        return h(
                            'div',
                            {
                                style: {background: '#80cbc4', whiteSpace: 'nowrap', border: 'solid #ddd 1px', color: '#f00'},
                                on: {
                                    click: () => {
                                        const position = this.renderMarker.position;
                                        this.renderMarker.position = [position[0] + 0.002, position[1] - 0.002];
                                    }
                                }
                            },
                            ['marker inner text']
                        )
                    }
                },
                componentMarker: {
                    position: [113.9584215471,22.5435653340],
                    contentRender: (h, instance) => h(exampleComponents,{style: {backgroundColor: '#fff'}, props: {text: ''}}, ['xxxxxxx'])
                },
                slotMarker: {
                    position: [113.9584215471,22.5435653340],
                }

            };
        },


        components: {

        },
        computed: {
            ...mapState([
                'agentInfo',
            ]),
        },
        created() {
            if(getStore('tpSessionId') && !this.agentInfo.phone) {
                App.getUserInfo();
            }
        },
        activated(){
            this.logged = getStore('tpSessionId')
        },
        mounted() {

        },



        methods: {
            onClick() {
                this.count += 1;
            },
            changePosition() {
                let position = this.markers[0].position;
                this.markers[0].position = [position[0] + 0.002, position[1] - 0.002];
            },
            chnageDraggle() {
                let draggable = this.markers[0].draggable;
                this.markers[0].draggable = !draggable;
            },
            toggleVisible() {
                let visableVar = this.markers[0].visible;
                this.markers[0].visible = !visableVar;
            },
            addMarker() {
                let marker = {
                    position: [121.5273285 + (Math.random() - 0.5) * 0.02, 31.21515044 + (Math.random() - 0.5) * 0.02]
                };
                this.markers.push(marker);
            },
            removeMarker() {
                if (!this.markers.length) return;
                this.markers.splice(this.markers.length - 1, 1);
            }
        }
    }
</script>

<style>
    .amap-page-container{
        height:500px;
    }
    .amap-box {
        width: 500px;
        height: 500px;
    }
</style>
