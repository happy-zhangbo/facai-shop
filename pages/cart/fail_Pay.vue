<template>
	<view>
		<cu-custom bgColor="bg-black" :isBack="false"><block slot="content">支付完成</block></cu-custom>
		<view class="bg-white padding-lr" style="margin-top: 100px;">
			<view class="padding-xs flex align-center">
				<view class="flex-sub text-center">
					<view class="solid-bottom text-xsl padding">
						<text class="cuIcon-roundclosefill text-red"></text>
					</view>
					<view class="padding text-xl">支付失败</view>
				</view>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-red margin-tb-sm lg" @tap="toIndex">返回首页</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toIndex(){
				uni.reLaunch({
					url:"/pages/index/index"
				})
				// var delta = getCurrentPages();
				// var index = delta[1];
				// console.log(index)
				// index.findAll();
				// uni.navigateBack({
				// 	delta:delta.length
				// })
			}
		}
	}
</script>

<style>
page{
	background: #FFFFFF;
}
</style>
