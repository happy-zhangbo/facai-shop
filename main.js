import Vue from 'vue'
import App from './App'
import req from 'common/req'
import store from './store'


Vue.prototype.$req = req;

import basics from './pages/basics/home.vue'
Vue.component('basics',basics)

import components from './pages/component/home.vue'
Vue.component('components',components)

import plugin from './pages/plugin/home.vue'
Vue.component('plugin',plugin)


import product from './pages/product/product.vue'
Vue.component('product',product)

import cart from './pages/cart/cart.vue'
Vue.component('cart',cart)

import my from './pages/my/my.vue'
Vue.component('my',my)

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

import uniPopup from "./components/uni-popup/uni-popup.vue"
Vue.component('uni-popup',uniPopup)


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()

 



