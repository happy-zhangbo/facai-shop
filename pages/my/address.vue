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
			<uni-swipe-action :options="options" @click="bindClick($event,index)" :data-index="index" v-for="(item,index) in 5" :key="index">
				<view class="cu-item arrow flex justify-between align-center">
					<view class="padding">
						<view class="text-lg text-bold text-lg text-black">张博<text class="margin-left-sm text-df text-gray">18010091016</text></view>
						<view class="text-df margin-top-sm">北京北京市大兴区新华小区5单元607</view>
					</view>
					<view class="padding">
						<text class="cuIcon-roundcheck text-red" style="font-size: 35px;" v-if="index==5"></text>
					</view>
				</view>
			</uni-swipe-action>
		</view>
		<view class="cu-tabbar-height margin-top-sm"></view>
		<view class="cu-bar bg-white tabbar border shop foot">
			<view class="bg-red submit">添加新地址</view>
		</view>
	</view>
</template>

<script>
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	export default {
		components: {
			uniSwipeAction
		},
		data() {
			return {
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
		methods: {
			
		}
	}
</script>

<style>

</style>
