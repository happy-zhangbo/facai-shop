<template>
	<view>
		<cu-custom bgColor="bg-black" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的订单</block>
		</cu-custom>
		<scroll-view scroll-x class="nav text-center bg-white text-gray">
			<view class="cu-item" :class="index==TabCur?'text-black cur':''" v-for="(item,index) in orderState" :key="index" @tap="tabSelect" :data-id="index">
				{{ item.name }}
			</view>
		</scroll-view>
		<view class="cu-card">
			<view class="cu-item padding" v-for="(item,index) in 3" :key="index">
				<view class="justify-between flex align-center solid-bottom padding-tb-sm">
					<view class="">编号：191109123456678988</view>
					<view>
						<text class="text-red">待收货</text>
					</view>
				</view>
				<view class="flex">
					<view class="flex-sub padding-sm">
						<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
						 mode="aspectFill" style="width: 100%;height: 100%;" class="radius"></image>
					</view>
					
					<view class="flex-treble padding-sm">
						<view class="">产品title{{ index }}产品title{{ index }}产品title{{ index }}产品title{{ index }}产品title{{ index }}产品title{{ index }}</view>
						<view class="text-sm text-gray margin-tb-sm impleName">产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍</view>
				
					</view>
				</view>
				
				<view class="text-sm justify-end flex align-center">
					<view>
						共1件商品<text class="margin-left">合计：</text><text class="text-xl text-price text-bold ">80.00</text>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderState:[{
					name:"全部订单"
				},{
					name:"待支付"
				},{
					name:"待收货"
				},{
					name:"已完成"
				},{
					name:"已取消"
				}],
				TabCur: 0,
				scrollLeft: 0
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style>

</style>
