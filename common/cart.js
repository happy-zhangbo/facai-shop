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
	console.log(that.cartProduct)
	var address = that.addressInfo.aCity+that.addressInfo.aAddress
	var datetime = that.dateTimeValue;
	var param = {"oPaymethod":that.selectValue,"oType":1,"oRemarks":that.textareaRemarks,"oAddress":address,"oDeliverytime":datetime}
	var odArray = [];
	var cIdList = [];
	for(var i = 0;i < that.cartProduct.length;i++){
		var product = that.cartProduct[i];
		var od = {"ocId":product.cId,"odPsid":product.cPsid,"odCount":product.cCount,"odTotal":product.cTotal}
		odArray.push(od);
	}
	param.orderDetail = odArray;
	console.log(param)
	req.post("order/commit_unifiedorder",param,"json",function(res){
		console.log("提交订单:");
		console.log(res);
		var data = res.data.data;
		var dataStr = JSON.stringify(data).replace("=","%3D");
		var url = "/pages/cart/pay?payParam="+dataStr+"&productList="+JSON.stringify(that.cartProduct)+"&address="+address+"&datetime="+that.dateTimeLable+"&payMethod="+that.selectLabel+"&remarks="+that.textareaRemarks+"&zongjia="+that.zongjia;
		uni.navigateTo({
			url:url
		});
	})
}


const payOrder = function(that){
	var pay = that.payParam
	console.log(pay)
	uni.requestPayment({
	    provider: 'wxpay',
	    timeStamp: pay.timeStamp,
	    nonceStr: pay.nonceStr,
	    package: pay.package,
	    signType: pay.signType,
	    paySign: pay.paySign,
	    success: function (res) {
	        console.log('success:' + JSON.stringify(res));
			uni.navigateTo({
				url:"/pages/cart/ok_Pay"
			})
	    },
	    fail: function (err) {
	        uni.navigateTo({
	        	url:"/pages/cart/fail_Pay"
	        })
	    }
	});
	
}

export default{
	selectCarts,
	deleteCarts,
	getDefaultAddress,
	commitOrder,
	payOrder
}