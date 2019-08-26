<template>
    <div class="detail-layout">
        <div class="window-header">
            <slot name="header">
                <el-button type="text" icon="el-icon-close" class="icon-button" @click="$emit('close')"></el-button>
                <slot name="actions">
                </slot>
                <template v-if="showNavTabs&&currentComponent">
                    <el-tabs class="tabs" :value="currentComponent.name"
                             @tab-click="handleClick">
                        <el-tab-pane v-for="componentInfo in componentsInfo"
                                     :label="componentInfo.description"
                                     :name="componentInfo.name"
                                     :key="componentInfo.name"/>
                    </el-tabs>
                </template>
            </slot>
        </div>
        <div class="content">
            <!-- 考虑是否把基本信息设为default slot,理由是主操作栏的相关操作与其耦合度太大,而主操作栏内容由slot提供 -->
            <slot>
                <template v-if="currentComponent">
                    <component :is="currentComponent"
                               v-bind="$attrs"
                               v-on="$listeners">
                    </component>
                </template>
            </slot>
        </div>

    </div>
</template>

<script>

    export default {
        name: "DetailLayout",
        components: {},
        props: {
            /**
             * [{
                    description:String,->tabLabel
                    name:String,->VueComponentName
                    component:Object,->VueComponent
             * }]
             */
            componentsInfo: {
                type: Array,
                default: function () {
                    return []
                }
            },
            showNavTabs: {
                type: Boolean,
                default: true
            },
        },
        data() {
            return {
                currentComponent: this.componentsInfo.length > 0 ? this.componentsInfo[0].component : null,
                serverNetValue: '',
                serverNetOptions: [
                    {value: "0", label: "集群管理"}
                ]
            }
        },
        computed: {},
        methods: {
            handleClick(tab, event) {
                for (let componentInfo of this.componentsInfo) {
                    if (componentInfo.name === tab.name) {
                        this.currentComponent = componentInfo.component
                    }
                }
            },
            onOpenPageClick() {
                this.$emit('open', this.$options.components.DetailLayout, {});
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/variables.scss";

    .detail-layout {
        height: 100%;
        width: 100%;
        position: relative;

        .window-header {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: $side-bar-sub-menu-height;
            line-height: $side-bar-sub-menu-height;
            background: $color-dark-background;
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            justify-items: center;
        }

        .content {
            position: relative;
            width: 100%;
            height: calc(100% - #{$side-bar-sub-menu-height});
            top: $side-bar-sub-menu-height;
        }

    }
</style>
