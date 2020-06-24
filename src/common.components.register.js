/**
 * 公共组件注册
 * 高频组件
 */
import Vue from 'vue'

import 'normalize.css'
import 'view-design/dist/styles/iview.css'
import './assets/scss/base.scss'
import './assets/icons/cityIcons/iconfont.css'

import { Collapse, Icon, Panel, Spin, Message, Modal, Notice, Button } from 'view-design'
import DataV from '@jiaminghi/data-view'

import md5 from "js-md5";
// import VueLazyload from "vue-lazyload";

Vue.component('Collapse', Collapse)
Vue.component('Panel', Panel)
Vue.component('Icon', Icon)
Vue.component("Button", Button)
Vue.component('Modal', Modal)
Vue.component("Notice", Notice)
Vue.prototype.$Spin = Spin
Vue.prototype.$Message = Message

Vue.use(DataV)

// 图片懒加载
// Vue.use(VueLazyload, {
//     preLoad: 1.3,
//     //error: require('@/assets/images/model/model_default_0.png'),  // 加载失败图片
//     //loading: require('@/assets/images/default_loading.gif'),   // 加载中图片
//     attempt: 1   // 加载数量
// });

Vue.prototype.$md5 = md5;

