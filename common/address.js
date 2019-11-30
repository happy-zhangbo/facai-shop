import req from './req'

const selectAllAddress = function(that){
	req.get("userinfo/address/select_address",{},function(res){
		console.log("查询用户地址:");
		console.log(res);
		var data = res.data.data;
		that.addressList = data;
	})
}

const insertAddress = function(address){
	req.post("userinfo/address/insert_insertAddress",address,"",function(res){
		console.log("添加地址:");
		console.log(res);
		uni.navigateBack({
			delta:1
		})
	})
} 

const updateAddress = function(address){
	req.post("userinfo/address/update_updateAddress",address,"",function(res){
		console.log("编辑地址:");
		console.log(res);
		uni.navigateBack({
			delta:1
		})
	})
}

const deleteAddress = function(that,index){
	var aId = that.addressList[index].aId;
	req.post("userinfo/address/delete_deleteAllAddress",{"aId":aId},"",function(res){
		console.log("删除地址:");
		console.log(res);
		that.confirmDelModel = false;
		that.addressList.splice(index, 1);
	})
}

export default{
	selectAllAddress,
	insertAddress,
	updateAddress,
	deleteAddress
}
