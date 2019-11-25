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

export default{
	selectCarts,
	deleteCarts
}