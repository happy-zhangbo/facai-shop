<template>
	<view>
		<cu-custom bgColor="bg-black" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的订单</block>
		</cu-custom>
		<scroll-view scroll-x class="nav text-center bg-white text-gray">
			<view class="cu-item" :class="index==TabCur?'text-black cur':''" v-for="(item,index) in orderState" :key="index" @tap="tabSelect" :data-id="index">
				{{ item.name }}
			</view>
		</scroll-view>
		<view class="cu-card">
			<view class="cu-item padding" v-for="(item,index) in orderList" :key="index">
				<view class="justify-between flex align-center solid-bottom padding-bottom-sm">
					<view class="">编号：<text class="text-bold">{{ item.soNum }}</text></view>
					<view>
						<text class="text-red" v-if="item.state == 0">待支付</text>
						<text class="text-red" v-if="item.state == 1">待收货</text>
						<text class="text-red" v-if="item.state == 2">已完成</text>
						<text class="text-red" v-if="item.state == 3">已取消</text>
					</view>
				</view>
				<view class="flex solid-bottom" v-for="(detailItem,detailIndex) in item.orderDetailList" :key="detailIndex">
					<view class="flex-sub padding-sm">
						<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
						 mode="aspectFill" style="width: 100%;height: 105px;" class="radius"></image>
					</view>
					
					<view class="flex-treble padding-sm">
						<view class="">{{ detailItem.title }}</view>
						<view class="text-sm text-gray margin-tb-sm impleName">
							<view>规格: {{ detailItem.specs }}</view>
							<view>数量: {{ detailItem.count }}</view>
						</view>
					</view>
				</view>
				<view class="text-center padding-top-sm text-red ">查看详情</view>
				<view class="text-sm justify-between flex align-center" :class="item.state == 1||item.state == 0?'':'padding-top-sm'">
					<view>
						共{{ item.orderDetailList.length }}件商品<text class="margin-left-sm">合计：</text><text class="text-xl text-price text-bold ">{{ item.total }}</text>
					</view>
					<view class="grid col-1">
						<view class="margin-tb-sm text-right">
							<!-- <button class="cu-btn round bg-black shadow margin-left" >评价</button> -->
							<button class="cu-btn round bg-red shadow margin-left" v-if="item.state == 1">确认收货</button>
							<button class="cu-btn round bg-red shadow margin-left" v-if="item.state == 0">待支付</button>
							<button class="cu-btn round bg-black shadow margin-left" v-if="item.state == 2">联系我们</button>
						</view>
					</view>
				</view>
				<view class="text-sm text-right text-gray margin-top">2019年11月10日 12:03</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderState:[{
					name:"全部订单"
				},{
					name:"待支付"
				},{
					name:"待收货"
				},{
					name:"已完成"
				},{
					name:"已取消"
				}],
				orderList:[{
					soNum:191110120125634,
					state:1,
					total:300,
					orderDetailList:[{
						title:"产品0",
						specs:"1+1",
						count:50
					},{
						title:"产品1",
						specs:"1+1",
						count:50
					}]
				},{
					soNum:191110122525215,
					state:2,
					total:100,
					orderDetailList:[{
						title:"产品0",
						specs:"1+1",
						count:50
					}]
				},{
					soNum:191110123025634,
					state:0,
					total:300,
					orderDetailList:[{
						title:"产品0",
						specs:"1+1",
						count:50
					},{
						title:"产品1",
						specs:"1+1",
						count:50
					}]
				}],
				TabCur: 0,
				scrollLeft: 0
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	}
</script>

<style>

</style>
