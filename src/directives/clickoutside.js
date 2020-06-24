export default {
    /**
     * 绑定方法
     * @param {Object} el - The element the directives is bound to.
     * @param {Object} binding - An vue directives object
     */
    bind(el, binding) {
        const documentHandler = (e) => {
            if (el.contains(e.target)) return

            binding.value(e)
        }
        el.__vueClickOutside__ = documentHandler
        document.addEventListener('click', documentHandler)
    },
    /**
     * 更新方法
     */
    update() {

    },
    /**
     * 销毁方法
     * @param {Object} el - The element the directives is bound to.
     */
    unbind(el) {
        document.removeEventListener('click', el.__vueClickOutside__)
        delete el.__vueClickOutside__
    },
}
