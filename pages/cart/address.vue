<template>
	<view>
		<cu-custom bgColor="bg-black" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">地址管理</block>
		</cu-custom>
		<view class="cu-bar bg-white fixed"  :style="[{top:CustomBar + 'px'}]">
			<view class="action sub-title">
				<text class="text-xl text-bold text-black">地址管理</text>
				<text class="text-ABC text-black">address</text>
				<!-- last-child选择器-->
			</view>
		</view>
		<view class="cu-list bg-white" style="margin-top: 55px;">
			<view v-if="addressList.length == 0||addressList==null" class="text-center bg-gray padding-tb-xl text-gray">请添加新地址</view>
			<view class="cu-item arrow flex justify-between align-center" @tap="selectAddress" :data-index="index" v-for="(item,index) in addressList" :key="index">
				<view class="padding">
					<view class="text-lg text-bold text-lg text-black">{{ item.aLink }}<text class="margin-left-sm text-df text-gray">{{ item.aTel }}</text></view>
					<view class="text-df margin-top-sm">{{ item.aCity }}{{ item.aAddress }}</view>
				</view>
				<view class="padding">
					<text class="cuIcon-roundcheck text-red" style="font-size: 35px;" v-if="item.aDefatult==1"></text>
				</view>
			</view>
		</view>
		<view class="cu-tabbar-height margin-top-sm"></view>
		<view class="cu-bar bg-white tabbar border shop foot" @tap="toAdd">
			<view class="bg-red submit">添加新地址</view>
		</view>
		
	</view>
</template>

<script>
	import address from '../../common/address.js'
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				addressList:[],
			}
		},
		onShow() {
			var that = this;
			address.selectAllAddress(that);
		},
		methods: {
			toAdd(){
				uni.navigateTo({
					url:"/pages/my/addAddress"
				})
			},
			selectAddress(e){
				var index = e.currentTarget.dataset.index;
				var address = this.addressList[index];
				console.log(address);
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2];
				prevPage.setData({
					addressInfo:address
				});
				uni.navigateBack();
			}
		}
	}
</script>

<style>

</style>
