<template>
	<view>
		<cu-custom bgColor="bg-black" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">支付订单</block>
		</cu-custom>
		<view class="cu-bar bg-white fixed"  :style="[{top:CustomBar + 'px'}]">
			<view class="action sub-title">
				<text class="text-xl text-bold text-black">支付订单</text>
				<text class="text-ABC text-black">pay</text>
				<!-- last-child选择器-->
			</view>
		</view>
		<view class="padding" style="color: #000000;margin-top: 55px;">
			<view class="padding-lr bg-white">
				<view class="solid-bottom padding-sm">
					<text class="text-bold">配送地址</text>
				</view>
				<view class="padding-sm">{{ address }}</view>
			</view>
			<view class="padding-lr bg-white margin-top-sm">
				<view class="solid-bottom padding-sm">
					<text class="text-bold">配送时间</text>
				</view>
				<view class="padding-sm">{{ datetime }}</view>
			</view>
			<view class="padding-lr bg-white margin-top-sm">
				<view class="solid-bottom padding-sm">
					<text class="text-bold">支付方式</text>
				</view>
				<view class="padding-sm">{{ payMethod }}</view>
			</view>
			<view class="padding-lr bg-white margin-top-sm">
				<view class="solid-bottom padding-sm">
					<text class="text-bold">订单内容</text>
				</view>
				<view class="padding-sm">
					<text v-for="(item,index) in productList" :key="index">{{ item.productSpecs.product.pTitle  }}<text v-if="index == productList.lengt-1">、</text></text>
				</view>
			</view>
			<view class="padding-lr bg-white margin-top-sm">
				<view class="solid-bottom padding-sm">
					<text class="text-bold">订单备注</text>
				</view>
				<view class="padding-sm">{{ remarks }}</view>
			</view>
		</view>
		<view class="cu-bar bg-white tabbar foot shop justify-end">
			<view class="margin-lr text-black">
				<text>共 {{ productList.length }} 件，</text>
				<text>合计：<text class="text-price text-red margin-right">{{ zongjia }}</text></text>
				<button class="cu-btn bg-red round shadow-blur" @tap="payOrder">确认支付</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import carts from '../../common/cart.js'
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				payParam:{},
				address:"",
				datetime:"",
				payMethod:"",
				productList:[],
				remarks:"",
				zongjia:"",
			}
		},
		onLoad(e) {
			console.log(e);
			var payParamStr = e.payParam.replace("%3D","=")
			this.payParam = JSON.parse(payParamStr); 
			console.log(this.payParam)
			this.address = e.address;
			this.datetime = e.datetime;
			this.payMethod = e.payMethod;
			this.productList = JSON.parse(e.productList);
			this.remarks = e.remarks;
			this.zongjia = e.zongjia;
		},
		methods: {
			payOrder(){
				var that = this;
				carts.payOrder(that);
			}
		}
	}
</script>

<style>

</style>
