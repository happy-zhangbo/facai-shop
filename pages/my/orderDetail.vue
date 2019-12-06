<template>
	<view>
		<cu-custom bgColor="bg-black" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">订单详情</block>
		</cu-custom>
		
		<view class="bg-white" style="margin-top: 55px;">
			<view class="cu-bar bg-white fixed"  :style="[{top:CustomBar + 'px'}]">
				<view class="action sub-title">
					<text class="text-xl text-bold text-black">订单信息</text>
					<text class="text-ABC text-black">order</text>
					<!-- last-child选择器-->
				</view>
			</view>
			<view class="cu-item padding">
				<view class="justify-between flex align-center solid-bottom margin-bottom-sm">
					<view class="">订单编号：<text class="text-bold">2019120615121234</text></view>
					<view>
						<text class="text-red">待支付</text>
					</view>
				</view>
				<view class="flex align-center solid-bottom margin-bottom-sm">
					<view class="">微信流水：<text class="text-bold">2019120615121234</text></view>
				</view>
				<view class="flex align-center solid-bottom margin-bottom-sm">
					<view class="">创建时间：<text class="text-bold">2019年12月06日 15:15</text></view>
				</view>
				<view class="flex align-center solid-bottom margin-bottom-sm">
					<view class="">送货时间：<text class="text-bold">2019年12月06日 15:00</text></view>
				</view>
				<view class="flex align-center solid-bottom margin-bottom-sm">
					<view class="">成交价格：<text class="text-bold text-price text-bold text-red">300元</text></view>
				</view>
			</view>
			<view class="cu-bar bg-white" >
				<view class="action sub-title">
					<text class="text-xl text-bold text-black">包含商品</text>
					<text class="text-ABC text-black">product</text>
					<!-- last-child选择器-->
				</view>
			</view>
			<view class="cu-list menu margin-bottom-sm" style="margin-top: 0px;">
				<view class="bg-white solid-bottom" v-for="(item,index) in 4" :key="index">
					<view class="flex justify-between align-center">
						<view class="flex-sub padding-sm">
							<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
							 mode="aspectFill" style="width: 100%;height: 115px;" class="radius"></image>
						</view>
						<view class="flex-sub padding">
							<view class="text-black">大芯板</view>
							<view class="text-sm text-gray margin-tb-sm">
								<view>数量：100张</view>
								<view>规格：规格1</view>
							</view>
						</view>
						<view class="flex-sub padding-right-xl text-right">
							<text class="text-price text-bold text-red">100元</text>
						</view>
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
				CustomBar: this.CustomBar,
			}
		},
		methods: {
			
		}
	}
</script>

<style>
</style>
