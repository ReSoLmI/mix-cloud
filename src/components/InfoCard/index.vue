<template>
    <div class="lsh-info-card">
        <slot name="header">
            <div class="lsh-info-card__header">
                <slot name="icon">
                    <i class="el-icon-tickets"></i>
                </slot>
                <slot name="title">
                    <span class="lsh-info-card__title">{{title}} </span>
                </slot>
            </div>
        </slot>
        <div class="lsh-info-card__body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LshInfoCard",
        props: {
            title: String,
            labelWidth: String,
            labelAlign: String,
        },
        provide() {
            return {
                lshInfoCard: this
            };
        },
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/variables.scss";

    .lsh-info-card {
        background-color: #fff;
        overflow: hidden;
        color: #303133;
        transition: .3s;

        .lsh-info-card__header {
            height: $side-bar-sub-menu-height;
            line-height: $side-bar-sub-menu-height;
            padding: 0 $space-8px;
            box-sizing: border-box;
            position: relative;
            font-size: $font-size-h2;

            &:after {
                background-color: $color-border;
                height: 1px;
                content: "";
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
            }

            i {
                font-size: $space-24px;
            }

            .lsh-info-card__title {
                padding: 0 $space-8px;
            }

        }

        .lsh-info-card__body {
            padding: $space-8px $space-8px;
        }

    }


</style>
