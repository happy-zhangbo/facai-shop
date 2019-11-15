
const baseURL = "http://127.0.0.1:8888/";
const timeout = 1000*10;

const get = function(url,param,callback){
	uni.showLoading({
		title:"加载中...",
		mask:true
	})
	
	uni.request({
		url:baseURL+url,
		data:param,
		success:function(res){
			uni.hideLoading();
			callback(res);
		}
	})
}



const post = function(url,param,contentType,callback){
	uni.showLoading({
		title:"加载中...",
		mask:true
	})
	
	uni.request({
		url:baseURL+url,
		data:param,
		header:{
			"Content-Type":contentType=="json"?"application/json":"application/x-www-form-urlencoded"
		},
		method:"post",
		success:function(res) {
			uni.hideLoading();
			callback(res);
		},
		fail:function(res){
			console.log(res);
			uni.hideLoading();
			uni.showToast({
				title:"错误请求"
			});
		}
		
	})
}

const checkNet = function(callback){
	uni.getNetworkType({
		success: function (res) {
			callback(res);
		}
	})
}



export default{
	get:get,
	post:post,
	checkNet:checkNet
}