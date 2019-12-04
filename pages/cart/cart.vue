<template>
	<view>
		<cu-custom bgColor="bg-black shadow" ><block slot="content">购物车</block></cu-custom>
		<view class="cu-bar bg-white fixed"  :style="[{top:CustomBar + 'px'}]">
			<view class="action sub-title">
				<text class="text-xl text-bold text-black">购物车</text>
				<text class="text-ABC text-black">cart</text>
				<!-- last-child选择器-->
			</view>
		</view>
		<view class="text-center" style="margin-top: 55px;" v-if="!hasLogin">
			<view class=" padding-tb-xl text-grey">您还未登录</view>
			<button class="cu-btn round bg-black" @tap="login">去登录</button>
		</view>
		<view v-if="hasLogin">
			<view class="text-center" style="margin-top: 55px;" v-if="0 == cartList.length">
				<view class=" padding-tb-xl text-grey">您的购物车空空如也</view>
				<button class="cu-btn round bg-black" @tap="toIndex">去购物</button>
			</view>
			<view v-if="0 != cartList.length">
				<checkbox-group class="block" @change="CheckboxChange" style="margin-top: 55px;">
					<view class="cu-list bg-white">
						<uni-swipe-action :options="options" @click="bindClick($event,index)" :data-index="index" v-for="(item,index) in cartList" :key="index">
							<view class="cu-item solid-bottom">
								<view class="flex">
									<view class="padding-left flex align-center"><checkbox :class="item.checked?'checked black':''" :checked="item.checked" :value="index+''"></checkbox></view>
									<view class="flex-sub padding-sm">
										<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
										 mode="aspectFill" style="width: 100%;height: 115px;" class="radius"></image>
									</view> <!-- #ifdef APP-PLUS -->
									
									<!-- #endif -->
									<view class="flex-treble padding-sm">
										<view>{{ item.productSpecs.product.pTitle }}</view>
										<view class="text-sm text-gray margin-tb-sm impleName">{{ item.productSpecs.sName }}</view>
										<view class="text-sm text-gray flex justify-between align-center">
											<uni-number-box :value="item.cCount" @change="change" :ids="index+''" />
											<view>
												<text class="text-lg" style="right: 0px;">
													<text class="text-price text-red text-bold">{{ item.cTotal }}</text>
												</text>
											</view>
										</view>
									</view>
								</view>
							</view>
						</uni-swipe-action>
					</view>
				</checkbox-group>
				<view class="cu-bar bg-white tabbar shop" style="width: 100%;bottom:calc(100upx + env(safe-area-inset-bottom) / 2);position: fixed;">
					<view class="margin-lr">
						<checkbox-group class="block" @change="checkAll">
							<checkbox class="margin-right-xs" :class="selectAll?'checked black':''" :checked="selectAll"></checkbox>
							全选
						</checkbox-group>
					</view>
					
					<view class="margin-lr">
						合计：<text class="text-price text-red margin-right text-bold">{{ zongjia }}</text>
						<button class="cu-btn bg-red round shadow-blur" @tap="toPreview">立即订购</button>
					</view>
					
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="confirmDelModel?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">确认删除</view>
					<view class="action" @tap="hiddenModel">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					您确认删除购物车中的商品吗？
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub solid-left" @tap="hiddenModel">取消</view>
					<view class="action margin-0 flex-sub solid-left text-red" @tap="commitDel">确定</view>
				</view>
			</view>
		</view>
		<view class="cu-tabbar-height"></view>
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	import carts from '../../common/cart.js'
	import login from '../../common/login.js'
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import {
	  mapState,
	  mapMutations
	 } from 'vuex';
	export default {
		components: {
			uniNumberBox,
			uniSwipeAction
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				modalName: null,
				cartList:[],
				selectAll:false,
				isOpened: false,
				zongjia:0.00,
				options: [{
					text: '删除',
					style: {
						backgroundColor: 'red'
					}
				}],
				confirmDelModel:false,
				delIndex:0
			}
		},
		computed:{
		   ...mapState(['hasLogin','userInfo'])
		},
		created() {
			this.findAll();
		},
		methods: {
			findAll(){
				console.log(123123);
				var that = this;
				if(this.hasLogin){
					carts.selectCarts(that);
				}
			},
			login(){
				var that = this;
				login.mplogin(function(res){
					console.log("carts："+res)
					carts.selectCarts(that);
				});
				
			},
			toIndex(){
				uni.reLaunch({
					url:"/pages/index/index"
				})
			},
			toPreview(){
				if(this.zongjia == 0.00){
					uni.showToast({
						title:"请选择一件商品",
						icon:"none"
					})
					return;
				}
				var checkedProduct = []
				for(var i = 0;i < this.cartList.length; i++){
					if(this.cartList[i].checked){
						checkedProduct.push(this.cartList[i])
					}
				}
				uni.navigateTo({
					url:"../cart/preview?cartProduct="+JSON.stringify(checkedProduct),
				})
				
			},
			change(event) {
				var items = this.cartList,
					ids = event.ids;
				
				items[ids].numberValue = event.value;
				if(items[ids].numberValue == 0){
					items[ids].numberValue = 1;
				}
				
				console.log(items[ids].numberValue);
				items[ids].cTotal = items[ids].numberValue * items[ids].productSpecs.sPrice;
				var zongjia = 0.00;
				for(var i = 0;i < this.cartList.length; i++){
					if(this.cartList[i].checked){
						zongjia += this.cartList[i].cTotal;
					}
				}
				this.zongjia = zongjia;
				
				
					
			},
			checkAll(){
				if(this.selectAll){
					this.selectAll = false;
					//循环遍历修改购物车标识为未选中
					for(var i = 0;i < this.cartList.length; i++){
						this.cartList[i].checked = false
						this.zongjia = 0.00;
					}
				}else{
					this.selectAll = true;
					var zongjia = 0.00;
					//循环遍历修改购物车标识为选中
					for(var i = 0;i < this.cartList.length; i++){
						this.cartList[i].checked = true;
						zongjia += this.cartList[i].cTotal;
					}
					this.zongjia = zongjia;
					
				}
			},
			CheckboxChange(e) {
				var items = this.cartList,
					values = e.detail.value,
					zongjia = 0.00;
				console.log(values);
				console.log(items);
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (i == values[j]) {
							items[i].checked = true;
							zongjia += items[i].cTotal;
							break
						}
					}
				}
				
				this.zongjia = zongjia;
				this.cartList = items;
			},
			bindClick(e,index) {
				this.confirmDelModel = true;
				this.delIndex = index;
			},
			commitDel(){
				console.log(this.delIndex);
				var that = this;
				
				carts.deleteCarts(that,this.delIndex);
			},
			hiddenModel(){
				this.confirmDelModel = false;
				this.delIndex = 0;
			}
		}
	}
</script>

<style>
	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}

	/* #endif */

	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
/* 		background-color: #ffffff; */
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 28rpx;
		line-height: inherit;
	}

	.example {
		padding: 0 30rpx 30rpx;
	}

	.example-info {
		padding: 30rpx;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14rpx;
		background-color: #ffffff;
	}

	/* #endif */
	.example {
		padding: 0 30rpx;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 30rpx;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 30rpx;
	}

	.example-info-text {
		font-size: 28rpx;
		line-height: 36rpx;
	}


	.example-body {
		flex-direction: column;
		padding: 30rpx;
		background-color: #ffffff;
	}

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}

	.cont {
		height: 45px;
		line-height: 45px;
		padding: 0 15px;
		position: relative;
		background-color: #fff;
		font-size: 15px;
		border-bottom-color: #F5F5F5;
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		padding: 10px 0;
		background-color: #fff;
	}

	.button {
		border-color: #e5e5e5;
		border-style: solid;
		border-width: 1px;
		padding: 4px 8px;
		border-radius: 4px;
	}

	.button-text {
		font-size: 15px;
	}
</style>
