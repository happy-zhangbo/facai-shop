<template>
	<view>
		<cu-custom bgColor="bg-black">
			<block slot="content">我的</block>
		</cu-custom>
		<view class="bg-black shadow padding-xl">
			<view v-if="hasLogin">
				<view class="cu-avatar lg round margin-left" :style="{'background-image':'url('+userInfo.avatarUrl+')'}"></view>
				<text class="margin-lr-xl text-xl">{{ userInfo.userName }}</text>
			</view>
			<view v-if="!hasLogin" @tap="login">
				<view class="cu-avatar lg round margin-left"><text class="cuIcon-people"></text></view>
				<text class="margin-lr-xl text-xl">点击登录</text>
			</view>
		</view>
		<view class="cu-list menu margin-top-xl card-menu ">
			<view class="cu-item arrow">
				<view class="content" @tap="toOrder">
					<text class="cuIcon-selectionfill text-black"></text>
					<text class="text-grey">订单</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content" @tap="toAddress">
					<text class="cuIcon-locationfill text-black"></text>
					<text class="text-grey">地址</text>
				</view>
			</view>
			<view class="cu-item">
				<navigator class="content" hover-class="none" url="/pages/my/customerService" open-type="navigate">
					<text class="cuIcon-servicefill text-black"></text>
					<text class="text-grey">客服</text>
				</navigator>
			</view>	
			<view class="cu-item">
				<navigator class="content" hover-class="none" url="/pages/my/about" open-type="navigate">
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
				alert:false
			}
		},
		computed:{
		   ...mapState(['hasLogin','userInfo'])
		},
		created() {
			console.log(this.hasLogin);	
			// this.$store.commit('change', true)
			// console.log(this.hasLogin);	
		},
		methods: {
			login(){
				login.mplogin();
			},
			toOrder(){
				if(this.hasLogin){
					uni.navigateTo({
						url:"/pages/my/order"
					})
				}else{
					uni.showToast({
						title:"请先登录",
						icon:"none"
						
					})
				}
				
				
			},
			toAddress(){
				if(this.hasLogin){
					uni.navigateTo({
						url:"/pages/my/address"
					})
				}else{
					uni.showToast({
						title:"请先登录",
						icon:"none"
					})
				}
				
			}
		}
	}
</script>

<style>

</style>
