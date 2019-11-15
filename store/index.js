import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({  
    state: {  
        userInfo: {},  
        hasLogin: false  
    },  
    mutations: {
        login(state, provider) {//改变登录状态  
			console.log(provider)
            state.hasLogin = true  
            state.userInfo.token = provider.token  
            state.userInfo.userName = provider.nickName
			state.userInfo.avatarUrl = provider.avatar  
            uni.setStorage({//将用户信息保存在本地  
                key: 'userInfo',  
                data: provider 
            })  
        },  
        logout(state) {//退出登录  
            state.hasLogin = false  
            state.userInfo = {}  
            uni.removeStorage({  
                key: 'userInfo'  
            })  
        }  
    }  
})

export default store