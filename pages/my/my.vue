<template>
	<view>
		<cu-custom bgColor="bg-black">
			<block slot="content">我的</block>
		</cu-custom>
		<view class="bg-black shadow padding-xl">
			<view v-if="hasLogin">
				<view class="cu-avatar lg round margin-left" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
				<text class="margin-lr-xl text-xl">张发财</text>
			</view>
			<view v-if="!hasLogin" @tap="login">
				<view class="cu-avatar lg round margin-left"><text class="cuIcon-people"></text></view>
				<text class="margin-lr-xl text-xl">点击登录</text>
			</view>
		</view>
		<view class="cu-list menu margin-top-xl card-menu ">
			<view class="cu-item arrow">
				<navigator class="content" hover-class="none" url="/pages/my/order" open-type="navigate">
					<text class="cuIcon-selectionfill text-black"></text>
					<text class="text-grey">订单</text>
				</navigator>
			</view>
			<view class="cu-item arrow">
				<navigator class="content" hover-class="none" url="/pages/my/order" open-type="navigate">
					<text class="cuIcon-locationfill text-black"></text>
					<text class="text-grey">地址</text>
				</navigator>
			</view>
			<view class="cu-item">
				<navigator class="content" hover-class="none" url="../list/list" open-type="navigate">
					<text class="cuIcon-servicefill text-black"></text>
					<text class="text-grey">客服</text>
				</navigator>
			</view>	
			<view class="cu-item">
				<navigator class="content" hover-class="none" url="../list/list" open-type="navigate">
					<text class="cuIcon-crownfill text-black"></text>
					<text class="text-grey">关于</text>
				</navigator>
			</view>
		</view>
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	import login from '../../common/login.js'
	import {
	  mapState,
	  mapMutations
	 } from 'vuex';
	export default {
		data() {
			return {
				
			}
		},
		computed:{
		   ...mapState(['hasLogin'])
		},
		created() {
			console.log(this.hasLogin);	
			// this.$store.commit('change', true)
			// console.log(this.hasLogin);	
		},
		methods: {
			login(){
				
				login.login();
			}
		}
	}
</script>

<style>

</style>
