import { constantRouterMap } from '../../router/index'

const SET_ROUTERS = 'SET_ROUTERS'
const SET_ACTIVE_ROUTER = ''

const navigator = {
    state: {
        routers: constantRouterMap,
        addRouters: [],
        activeRouter: ''
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            state.routers = constantRouterMap.concat(routers);
        },
        SET_ACTIVE_ROUTER: (state, activeRouter) => {
            state.activeRouter = activeRouter;
        }
    },
    actions: {
        generateRoutes({ commit }) {
            return new Promise( resolve => {
                commit('SET_ROUTERS',constantRouterMap);
                resolve()
            })
        }
    }
};

export default navigator;
