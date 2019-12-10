import req from './req'

const findAllOrder = function(that,state){
	req.get("order/select_orders",{oState:state},function(res){
		console.log("查询订单:");
		console.log(res);
		var data = res.data.data;
		that.orderList = data;
	})	
}
const findOrderDetail = function(that,oId){
	req.get("order/select_selectAllOrderDetail",{oid:oId},function(res){
		console.log("查询订单详情:");
		console.log(res);
		var data = res.data.data;
		that.orderDetail = data;
	})
}
const cancelOrder = function(that,serialNum){
	var param = {"serialNum":serialNum}
	req.post('order/update_cancelOrder',param,"",function(res){
		console.log("取消订单:");
		console.log(res);
		findAllOrder(that)
	})
}
const payOrder = function(that,serialNum){
	var param = {"serialNum":serialNum}
	req.post("order/pay_order",param,"",function(res){
		console.log("支付订单:");
		console.log(res);
		var pay = res.data.data;
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
		
		
		
		
		
	})
}

export default{
	findAllOrder,
	findOrderDetail,
	cancelOrder,
	payOrder
	
}