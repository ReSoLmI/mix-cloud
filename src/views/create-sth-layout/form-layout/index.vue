<template>
    <div class="form-layout" :class="{'is-side':isSide}">
        <header>
            <slot name="goback">
                <el-button type="text" icon="el-icon-back" class="icon-button" @click="$emit('close')">返回</el-button>
                <el-divider direction="vertical"></el-divider>
            </slot>
            <span class="title">{{title}}</span>
            <slot name="settings">

            </slot>
        </header>
        <div class="form-wrapper">
            <slot name="form">
            </slot>
            <div class="foot">
                <slot name="footer">
                    <el-button type="primary" @click="$emit('create')">创建</el-button>
                    <el-button @click="$emit('close')">取消</el-button>
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FormLayout",
        props: {
            title: String,
            isSide: Boolean,
        },
        data(){
            return{
            }
        },
        methods:{
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/variables";

        .form-layout {
            width: 100%;
            height: 100%;
            display: flex;
            flex-flow: column nowrap;
            justify-content: flex-start;
            position: relative;
            background-color: $color-background;

            .icon-button{
                margin:$space-8px $space-8px $space-8px $space-24px;
                color:$menuText;
            }

            &.is-side{
                width: 70%;
                height: 100%;
                position: absolute;
                top: 0;
                right: 0;
                z-index: $z-level-side-page;

                &:after {
                    height: 100%;
                    top: 0;
                    border-right: 1px solid $color-border;
                    content: " ";
                    position: absolute;
                    left: -6px;
                    width: 6px;
                    background: linear-gradient(270deg, rgba(197, 219, 232, .4), rgba(211, 220, 227, 0));
                }
            }

            header {
                height: $side-bar-sub-menu-height;
                line-height: $side-bar-sub-menu-height;
                width: 100%;
                background-color: $color-dark-background;
                flex: 0 0 auto;

                .title {
                    font-size: $font-size-h2;
                    color: $color-text-primary;
                }
            }

            .form-wrapper {
                flex: 0 1 auto;
                overflow: auto;
                padding: $page-padding;

                .el-input, .el-select {
                    width: 350px;
                }

                .foot {
                }
            }

        }

</style>

<style lang="scss">
    @import "~@/styles/variables";

    .form-layout {
        .form-wrapper {
            //输入框正常样式
            .input-normal {
                width: 350px;
            }
            //输入框中号
            .input-medium {
                width: 250px;
            }
            //输入框小号
            .input-small {
                width: 120px;
            }
            //输入框mini
            .input-mini {
                width: 100px;
            }
            //下拉框正常样式
            .select-normal {
                width: 350px;
            }
            //下拉框中号
            .select-medium {
                width: 220px;
            }
            //下拉框小号
            .select-small {
                width: 120px;
            }
            //下拉框mini
            .select-mini {
                width: 100px;
            }
            //计数框正常样式
            .input-number-normal{
                width: 350px;
            }
            //输入框后提示文字样式
            .tip-font{
                color: $color-text-secondary;
                font-size: $font-size-extra;
                line-height: 40px;
                height: 40px;
                margin-left: 10px;
                    a{
                        color: $color-primary;
                    }
            }
        }
    }

</style>
