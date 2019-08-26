import Cookies from 'js-cookie'

const state = {
    sidebar: {
        // opened: true,
        opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
        withoutAnimation: false
    },
}

const mutations = {
    TOGGLE_SIDEBAR: state => {
        console.log("toggleSideBar","mutations");
        state.sidebar.opened = !state.sidebar.opened
        state.sidebar.withoutAnimation = false
        if (state.sidebar.opened) {
            Cookies.set('sidebarStatus', 1)
        } else {
            Cookies.set('sidebarStatus', 0)
        }
    },}

const actions = {
    toggleSideBar({ commit }) {
        commit('TOGGLE_SIDEBAR')
        console.log("toggleSideBar","actions");
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
