const getters = {
    isCollapsed: state => state.app.isCollapsed,
    routers: state => state.navigator.routers,
    activeRouter: state => state.navigator.activeRouter,
};

export default getters
