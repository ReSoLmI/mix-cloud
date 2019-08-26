<template>
    <el-dialog class="lsh-delete-confirm-dialog__wrap"
               v-bind="$attrs"
               v-bind:value="value"
               v-on="$listeners">

        <slot>
            <template v-if="confirmHint">
                <div>
                    <el-checkbox v-model="confirm">{{confirmHint}}</el-checkbox>
                </div>
            </template>
        </slot>

        <template v-slot:footer>
            <slot name="footer">
                <el-button type="primary" :disabled="!confirm&&confirmHint">{{positiveText}}</el-button>
                <el-button>{{passiveText}}</el-button>
            </slot>
        </template>


    </el-dialog>
</template>

<script>
    // import ElDialog from 'Dialog'
    export default {
        name: "DeleteConfirmDialog",
        data() {
            return {
                confirm: true
            }
        },
        props: {
            confirmHint: {
                type: String,
                default: ''
            },
            positiveText: {
                type: String,
                default: '删除'
            },
            passiveText: {
                type: String,
                default: '取消'
            }
        }
        // extends: ElDialog,
    }
</script>

<style lang="scss">
    @import "~@/styles/variables.scss";

    .lsh-delete-confirm-dialog__wrap {
        .el-dialog {
            .el-dialog__header {
                position: relative;
                height: $side-bar-sub-menu-height;
                line-height: $side-bar-sub-menu-height;
                padding: 0 $space-16px;

                .el-dialog__title {
                    display: inline-block;
                }

                &:after {
                    content: '';
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: 1px;
                    background-color: $color-border;
                }
            }

            .el-dialog__footer {
                height: $space-72px;
                line-height: $space-72px;
                padding: 0 $space-16px;
                position: relative;

                &:before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 1px;
                    background-color: $color-border;
                }

                .el-button + .el-button {
                    margin-left: $space-16px;
                }
            }
        }

    }

</style>
