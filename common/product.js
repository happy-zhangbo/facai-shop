import req from './req'


const selectAllProductType = function(that){
	req.get("product/find_selectAllProductType",{},function(res){
		console.log("查询所有分类:");
		console.log(res);
		var data = res.data.data;
		that.productTypeList = data;
	})
}

const selectAllProduct = function(that,typeId){
	
	var typeId = typeId?that.productTypeList[typeId].ptId:1
	
	req.get("product/find_selectAllProductByTypeId",{typeid:typeId},function(res){
		console.log("查询所有产品:");
		console.log(res);
		var data = res.data.data;
		that.productList = data;
	})
}
const selectProductDetail = function(that,pid){
	req.get("product/find_selectProductDetail",{pid:pid},function(res){
		console.log("查询产品详情:");
		console.log(res);
		var data = res.data.data;
		that.productDetail = data;
	})
}

const addToCarts = function(specs,count){
	var param = {"count":count,"productSpecs":specs};

	console.log(JSON.stringify(param));
	req.post("carts/add_carts",param,"json",function(res){
		console.log("加入购物车:");
		console.log(res);
		var data = res.data.data;
		
	})
}


export default{
	selectAllProductType,
	selectAllProduct,
	selectProductDetail,
	addToCarts
}

