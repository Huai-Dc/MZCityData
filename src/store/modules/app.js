const SET_COLLAPSE = 'SET_COLLAPSE'

const app = {
    state: {
        isCollapsed: false
    },
    mutations:{
        [SET_COLLAPSE](state){
            state.isCollapsed = !state.isCollapsed;
        }
    },
    actions: {
        toggleCollapse({commit}){
            commit('SET_COLLAPSE');
        }
    }
}

export default app
