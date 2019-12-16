import store from '../store'
import req from './req'
const mplogin = function(callback){	
	uni.login({
		provider: 'weixin',
		success: function (loginRes) {
			console.log(loginRes);
			//访问后端登录接口，并返回openId和sessionKey
			uni.getUserInfo({
				provider: 'weixin',
				success(userRes) {
					var code = loginRes.code;
					var userinfo = JSON.parse(userRes.rawData);
					var nickName = userinfo.nickName;
					var avatarUrl = userinfo.avatarUrl;
					console.log(userinfo);
					req.post("userinfo/login_wxLogin",{code:code,nickName:nickName,avatar:avatarUrl}
					,"",function(res){
						store.commit('login', res.data.data);
						uni.showToast({
							title:"登录成功"
						})
						if(callback){
							callback(res);
						}
					})
				},
				fail() {
					console.log("获取用户信息失败")
				}
			});
			
		}
	});
}
export default{
	mplogin
}
