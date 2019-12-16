import req from './req'
import moment from 'moment'

const findAllOrder = function(that,state){
	req.get("order/select_orders",{oState:state},function(res){
		console.log("查询订单:");
		console.log(res);
		var data = res.data.data;
		if(null == data){
			that.orderList = null;
			return;
		}
		for(var i = 0;i < data.length;i++){
			var timeDel=data[i].oDeliverytime;
			data[i].oDeliverytime = moment(timeDel).format("YYYY-MM-DD HH")+"点";
			var time=data[i].oCreatetime;
			data[i].oCreatetime = moment(time).format("YYYY-MM-DD HH:MM");
		}
		that.orderList = data;
	})	
}
const findOrderDetail = function(that,oId){
	req.get("order/select_selectAllOrderDetail",{oid:oId},function(res){
		console.log("查询订单详情:");
		console.log(res);
		var data = res.data.data;
		var timeDel=data.oDeliverytime;
		data.oDeliverytime = moment(timeDel).format("YYYY-MM-DD HH")+"点";
		var time=data.oCreatetime;
		data.oCreatetime = moment(time).format("YYYY-MM-DD HH:MM");
		
		
		that.orderDetail = data;
	})
}
const cancelOrder = function(that,serialNum){
	var param = {"serialNum":serialNum}
	req.post('order/update_cancelOrder',param,"",function(res){
		console.log("取消订单:");
		console.log(res);
		findAllOrder(that,that.orderState[that.TabCur].v)
	})
}


const confirmOrder = function(that,serialNum){
	var param = {"serialNum":serialNum}
	req.post('order/update_confirmOrder',param,"",function(res){
		console.log("确认订单:");
		console.log(res);
		findAllOrder(that,that.orderState[that.TabCur].v)
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
	payOrder,
	confirmOrder
	
}