<template>
    <div id="side-page-stack" class="side-page-stack">
        <side-page-wrap v-for="wrapper in wrapperStack"
                        :key="wrapper.id"
                        :page-component="wrapper.pageComponent"
                        :page-component-option="wrapper.pageComponentOption"
                        :wrap-id="wrapper.id"
                        :is-stack-bottom="wrapper.isStackBottom"
        />
    </div>
</template>

<script>
    import Vue from 'vue'
    import SidePageWrap from "@/views/side-page-stack/side-page-warp";

    export default {
        name: "SidePageStack",
        components: {SidePageWrap},
        data() {
            return {
                /**
                 * wrapperStack[{
                        id:Number,
                        pageComponent:VueComponentObject,
                        pageComponentOption:VueOption,
                        isStackBottom:Boolean
                 * }]
                 */
                wrapperStack: [],
                currentId: 0
            }
        },
        computed: {},
        provide() {
            return {
                getStack: this
            };
        },
        methods: {
            /**
             * 生成一个界面容器的描述对象
             * @param pageComponent Vue Component对象
             * @param pageComponentOption 界面组件render的参数配置
             * @param isStackBottom 是否是栈底界面容器
             */
            obtainWrapDescription(pageComponent, pageComponentOption, isStackBottom) {
                return {
                    id: this.currentId++,
                    pageComponent,
                    pageComponentOption,
                    isStackBottom
                }
            },
            /**
             * 推出指定id及其出栈方向顶部的所有容器的界面
             * @param id 目标界面容器的ID
             */
            popPage(id) {
                while (this.wrapperStack.length > 0) {
                    if (this.wrapperStack.pop().id === id) {
                        return
                    }
                }
            },
            /**
             * 往容器栈中添加一个目标组件的容器
             * @param pageComponent 需要打开的目标业务组件界面
             * @param option    传递给目标组件的render 参数配置项
             * @param singleTask 是否是栈内单实例模式打开
             */
            openPage(pageComponent, option, singleTask = false) {
                if (singleTask) {
                    this.wrapperStack = []
                }
                const wrapperDescription = this.obtainWrapDescription(pageComponent, option, this.wrapperStack.length === 0)
                this.wrapperStack.push(wrapperDescription)
                console.log("openPage",this.wrapperStack);

                // let stackDom = document.createElement('div')
                // document.getElementById('side-page-stack').appendChild(stackDom)

                // const wrapConstructor = Vue.extend(this.$options.components.SidePageWrap)
                // const wrapVm = new wrapConstructor({
                //     el: stackDom,
                //     data() {
                //         return {
                //             showWrap: true,
                //         }
                //     }
                // })
                // const SidePageConstructor = Vue.extend(pageComponent)
                // // 实例化一个 toast.vue
                // const sidePageDom = new SidePageConstructor({
                //     el: document.createElement('div'),
                //     data() {
                //         return {}
                //     }
                // })
                // wrapVm.$el.appendChild(sidePageDom.$el)
            }
        }
    }
</script>

<style lang="scss">
    @import "~@/styles/variables.scss";
</style>
