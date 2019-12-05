import req from './req'

const findAllOrder = function(that){
	req.get("order/select_orders",{},function(res){
		console.log("查询订单:");
		console.log(res);
		var data = res.data.data;
		that.orderList = data;
	})	
}
const findOrderDetail = function(that){
	
}
const cancelOrder = function(that){
	
}
const payOrder = function(that){
	
}

export default{
	findAllOrder,
	findOrderDetail,
	cancelOrder,
	payOrder
	
}