<template>
	<view>
		<product v-if="PageCur=='product'"></product>
		<cart v-if="PageCur=='cart'"></cart>
		<my v-if="PageCur=='my'"></my>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="product">
				<view  :class="PageCur=='product'?'cuIcon-shopfill text-black':'cuIcon-shop text-gray'">
				</view>
				<view :class="PageCur=='product'?'text-black':'text-gray'">产品</view>
			</view>
			<view class="action" @click="NavChange" data-cur="cart">
				<view :class="PageCur=='cart'?'cuIcon-cartfill text-black':'cuIcon-cart text-gray'">
					
				</view>
				<view :class="PageCur=='cart'?'text-black':'text-gray'">购物车</view>
			</view>
			<view class="action" @click="NavChange" data-cur="my">
				<view :class="PageCur=='my'?'cuIcon-myfill text-black':'cuIcon-my text-gray'">
					
				</view>
				<view :class="PageCur=='my'?'text-black':'text-gray'">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				PageCur: 'product'
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style>

</style>
