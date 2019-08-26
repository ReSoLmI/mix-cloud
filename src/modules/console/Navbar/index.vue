<template>
    <div class="nav-bar">
        <router-link class="item icon-wunsun-logo logo" style="font-size: 24px" to="/"/>
        <div class="middle"/>
        <div class="right">
            <div class="topbar-info-item topbar-info-dropdown">
                <router-link class="item " to="/">产品与服务</router-link>
            </div>
            <div class="topbar-info-item topbar-info-dropdown">
                <router-link class="item " to="/">费用</router-link>
            </div>
            <div class="topbar-info-item topbar-info-dropdown">
                <router-link class="item " to="/">工单</router-link>
            </div>
            <div class="topbar-info-item topbar-info-dropdown">
                <router-link class="item " to="/">备案</router-link>
            </div>

            <router-link class="item icon-huigun" style="font-size: 16px" to="/">
            </router-link>
            <router-link class="item icon-youjian" style="font-size: 16px" to="/">
            </router-link>
            <div class="topbar-info-item topbar-info-dropdown">
                <router-link class="item user" to="/">administrator</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        components: {},
        computed: {
            ...mapGetters([
                'sidebar'
            ])
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    @import "../../../styles/variables";

    .nav-bar {
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .08);
        display: flex;
        height: $topBarHeight;

        .middle {
            flex: 1;
        }

        .right {
            display: flex;
            justify-content: center;
        }

        .item {
            cursor: pointer;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
            width: auto;
            text-align: center;
            color: $color-gray-3;
            height: $topBarHeight;
            line-height: $topBarHeight;
            padding: 0px $component-padding;

            &.logo, &.user {
                color: $white;
            }

            &:hover {
                color: $white;
            }

        }

        .topbar-info-item {
            display: inline-block;
        }

        .topbar-info-dropdown {
            position: relative;
        }

    }

</style>
