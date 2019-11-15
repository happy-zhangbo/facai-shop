
const baseURL = "http://192.168.1.199:8888/";
const timeout = 1000*10;

const get = function(url,param,callback){
	uni.request({
		url:baseURL+url,
		data:param,
		success:function(res){
			callback(res);
		}
	})
}



const post = function(url,param,contentType,callback){
	uni.request({
		url:baseURL+url,
		data:param,
		header:{
			"Content-Type":contentType=="json"?"application/json":"application/x-www-form-urlencoded"
		},
		method:"post",
		success:function(res) {
			callback(res);
		}
	})
}



export default{
	get:get,
	post:post
}