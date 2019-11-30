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
			<uni-swipe-action :options="options" @click="bindClick($event,index)" :data-index="index" v-for="(item,index) in addressList" :key="index">
				<view class="cu-item arrow flex justify-between align-center">
					<view class="padding">
						<view class="text-lg text-bold text-lg text-black">{{ item.aLink }}<text class="margin-left-sm text-df text-gray">{{ item.aTel }}</text></view>
						<view class="text-df margin-top-sm">{{ item.aCity }}{{ item.aAddress }}</view>
					</view>
					<view class="padding">
						<text class="cuIcon-roundcheck text-red" style="font-size: 35px;" v-if="item.aDefatult==1"></text>
					</view>
				</view>
			</uni-swipe-action>
		</view>
		<view class="cu-tabbar-height margin-top-sm"></view>
		<view class="cu-bar bg-white tabbar border shop foot" @tap="toAdd">
			<view class="bg-red submit">添加新地址</view>
		</view>
		<view class="cu-modal" :class="confirmDelModel?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">确认删除</view>
					<view class="action" @tap="hiddenModel">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					地址删除后无法恢复，您确认删除吗？
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub solid-left" @tap="hiddenModel">取消</view>
					<view class="action margin-0 flex-sub solid-left text-red" @tap="commitDel">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import address from '../../common/address.js'
	export default {
		components: {
			uniSwipeAction
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				addressList:[],
				confirmDelModel:false,
				delIndex:0,
				options: [{
					text: '编辑',
					style: {
						backgroundColor: 'grey'
					}
				},{
					text: '删除',
					style: {
						backgroundColor: 'red'
					}
				}],
			}
		},
		onLoad(e) {
			
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
			bindClick(e,addressIndex){
				switch (e.index){
					case 0 :
						console.log("编辑");
						var addressInfo = this.addressList[addressIndex];
						console.log(addressInfo)
						uni.navigateTo({
							url:"/pages/my/editAddress?addressInfo="+JSON.stringify(addressInfo)
						})
						break;
					case 1 :
						this.confirmDelModel = true;
						this.delIndex = addressIndex;
						break;
				}
			},
			commitDel(){
				console.log(this.delIndex);
				var that = this;
				address.deleteAddress(that,this.delIndex);
			},
			hiddenModel(){
				this.confirmDelModel = false;
				this.delIndex = 0;
			}
		}
	}
</script>

<style>

</style>
