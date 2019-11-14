import store from '../store'
import axios from './axios.js'
const login = function(){	
	uni.login({
		provider: 'weixin',
		success: function (loginRes) {
			console.log(loginRes);
			//访问后端登录接口，并返回openId和sessionKey
			getUserInfo()
			store.commit('change', true);
		}
	});
}

const getUserInfo = function(){
	uni.getUserInfo({
		success(res){
			console.log(res);
		}
	})
}

export default{
	login
}
