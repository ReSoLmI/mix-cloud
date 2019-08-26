<script>
    export default {
        name: "SidePageWrap",
        inject: ['getStack'],
        mounted() {
        },
        methods: {
            requestCloseThisPage() {
                this.getStack.popPage(this.wrapId)
            },
            requestOpenPage(component, option,singleTop) {
                this.getStack.openPage(component, option,singleTop)
            }
        },
        props: {
            wrapId: Number,
            pageComponent:[Function,Object] ,//支持异步传入组件(函数)
            pageComponentOption: Object,
            isStackBottom: Boolean,
        },
        render: function (createElement) {
            const _this = this
            let _pageComponentOption = {}
            Object.assign(_pageComponentOption, this.pageComponentOption,
                {
                    on: {
                        close: _this.requestCloseThisPage,
                        openSidePage: _this.requestOpenPage,
                    },
                }
            );//拷贝参数传入的配置
            return createElement('div', {
                    'class': {
                        'side-page-wrap': true,
                        'is-stack-bottom': this.isStackBottom
                    },
                },
                [
                    createElement(_this.pageComponent, _pageComponentOption)
                ])
        }
    }
</script>

<style lang="scss" scoped>
    @import "~@/styles/variables.scss";

    .side-page-wrap {
        //该元素为公共模块为指定的实例组件创建的容器元素,原则上公共模块不应该影响到具体业务实例
        position: absolute;
        bottom: 0;
        right: 0;
        width: 80%; //calc(100% - 144px)
        height: calc(100% - #{$normal-component-height} - #{$space-16px} - #{$page-padding}); //-actionBar高度32px-间距16px-上边距32px
        z-index: $z-level-side-page;
        background-color: $color-background;


        &.is-stack-bottom:after {
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

</style>
