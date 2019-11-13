import axios from 'axios';
const baseURL = "http://127.0.0.1:8888/";
const timeout = 1000*10;

const get = function(url,param,callback){
	axios.get(url,{params:param})
	.then( res => {
		callback(res);
	}).catch( err => {	
		console.log(err);
	})
}



export default{
	get:get
}