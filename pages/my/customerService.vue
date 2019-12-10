<template>
	<view>
		<cu-custom bgColor="bg-black" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">客服</block>
		</cu-custom>
		<view class="padding flex flex-direction" style="margin-top: 255px;">
			<button class="cu-btn bg-black margin-tb-sm lg" open-type="contact">打开客服</button>
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
			
		}
	}
</script>

<style>

</style>
