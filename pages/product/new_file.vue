<template>
	<view>
		<view class="cu-modal" :class="addToCartModel?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">Modal标题</view>
					<view class="action" @tap="closeAddToCartModel">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					Modal 内容。
				</view>
				<view class="cu-bar bg-white">
					
					<view class="action margin-0 flex-sub text-green solid-left" @tap="closeAddToCartModel">取消</view>
					<view class="action margin-0 flex-sub  solid-left" @tap="commitAddToCart">确定</view>
				</view>
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
			
		}
	}
</script>

<style>

</style>
