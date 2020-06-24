import { constantRouterMap } from '../../router/index'

const SET_ROUTERS = 'SET_ROUTERS'
console.log(constantRouterMap)
const navigator = {
    state: {
        routers: constantRouterMap,
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            state.routers = constantRouterMap.concat(routers);
        }
    },
    actions: {
        GenerateRoutes({ commit }) {
            return new Promise( resolve => {
                commit('SET_ROUTERS',constantRouterMap);
                resolve()
            })
        }
    }
};

export default navigator;
