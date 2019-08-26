<template>
    <div class="lsh-info-card-item">
        <label class="lsh-info-card-item__label" :style="labelStyle">
            <slot name="label">
                {{label}}
            </slot>
        </label>
        <div class="lsh-info-card-item__content" :style="contentStyle">
            <slot name="content">
                {{content}}
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LshInfoCardItem",
        inject: ['lshInfoCard'],
        props: {
            labelWidth: String,
            labelAlign: String,
            label: String,
            content: String
            // TODO: 后续完善父组件model与子组件prop响应式绑定 by 吴斌
        },
        computed: {
            labelStyle() {
                const ret = {};
                if (this.labelAlign || this.lshInfoCard.labelAlign) {
                    const labelAlign = this.labelAlign || this.lshInfoCard.labelAlign
                    if (labelAlign) {
                        ret['text-align'] = labelAlign
                    }
                }
                if (this.labelWidth || this.lshInfoCard.labelWidth) {
                    const labelWidth = this.labelWidth || this.lshInfoCard.labelWidth;
                    if (labelWidth) {
                        ret.width = labelWidth;
                    }
                }
                return ret;
            },
            contentStyle() {
                const ret = {};
                const label = this.label;
                if (!label && !this.labelWidth && !this.lshInfoCard.labelWidth) return ret;
                const labelWidth = this.labelWidth || this.lshInfoCard.labelWidth;
                ret.marginLeft = labelWidth;
                return ret;
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/variables.scss";
    @import "~@/styles/mixin.scss";

    .lsh-info-card-item {
        margin-bottom: $space-8px;

        &:before, &:after {
            content: "";
            display: table;
            clear: both;
        }

        .lsh-info-card-item__label {
            text-align: left;
            vertical-align: middle;
            float: left;
            font-size: $font-size-base;
            line-height: $normal-component-height;
            padding: 0 $component-padding 0 $component-padding;
            box-sizing: border-box;
        }

        .lsh-info-card-item__content {
            line-height: $normal-component-height;
            /*position: relative;*/
            font-size: $font-size-base;
            padding: 0 $component-padding 0 $component-padding;
        }
    }

</style>
