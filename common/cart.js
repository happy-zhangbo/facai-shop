import req from './req'

const selectCarts = function(that){
	req.get("carts/select_carts",{},function(res){
		console.log("查询购物车:");
		console.log(res);
		var data = res.data.data;
		that.cartList = data;
	})
}

const deleteCarts = function(that,index){
	var cId = that.cartList[index].cId;
	req.post("carts/delete_carts",{cId:cId},"",function(res){
		console.log("删除购物车商品:");
		console.log(res);
		that.confirmDelModel = false;
		that.cartList.splice(index, 1)
		var zongjia = 0.00;
		for(var i = 0;i < that.cartList.length; i++){
			if(that.cartList[i].checked){
				zongjia += that.cartList[i].cTotal;
			}
		}
		that.zongjia = zongjia;
	})
}

const getDefaultAddress = function(that){
	req.get("userinfo/address/select_defaultAddress",{},function(res){
		console.log("查询默认地址:");
		console.log(res);
		var data = res.data.data;
		console.log(data);
		that.addressInfo = data;
	})
}

const commitOrder = function(that){
<<<<<<< HEAD
	 var param = {"oPaymethod":1,"oType":1,"o_remarks":"","o_address":"","orderDetail":[]}
	
	
=======
	console.log(that.cartProduct)
	var address = that.addressInfo.aCity+that.addressInfo.aAddress
	var datetime = that.dateTimeValue;
	var param = {"oPaymethod":that.selectValue,"oType":1,"o_remarks":that.textareaRemarks,"o_address":address,"oDeliverytime":datetime}
	var odArray = [];
	for(var i = 0;i < that.cartProduct.length;i++){
		var product = that.cartProduct[i];
		var od = {"odPsid":product.cPsid,"odCount":product.cCount,"cTotal":product.cTotal}
		odArray.push(od);
	}
	param.orderDetail = odArray;
	console.log(param)
	req.post("order/commit_unifiedorder",param,"json",function(res){
		console.log("提交订单:");
		console.log(res);
		var data = res.data.data;
		var dataStr = encodeURIComponent(JSON.stringify(data))
		var url = "/pages/cart/pay?payParam="+dataStr+"&productList="+JSON.stringify(that.cartProduct)+"&address="+address+"&datetime="+that.dateTimeLable+"&payMethod="+that.selectLabel+"&remarks="+that.textareaRemarks+"&zongjia="+that.zongjia;
		uni.navigateTo({
			url:url
		})
		
		
	})
}

export default{
	selectCarts,
	deleteCarts,
	getDefaultAddress,
	commitOrder
}