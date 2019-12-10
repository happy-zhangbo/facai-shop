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
			<view class="cu-item padding" v-for="(item,index) in orderList" :key="index" @tap="toDetail" :data-id="index">
				<view class="justify-between flex align-center solid-bottom padding-bottom-sm">
					<view class="">编号：<text class="text-bold">{{ item.oSerialnum }}</text></view>
					<view>
						<text class="text-red" v-if="item.oState == 0">待支付</text>
						<text class="text-red" v-if="item.oState == 1">正在备货中</text>
						<text class="text-black" v-if="item.oState == 2">已发货</text>
						<text class="text-black" v-if="item.oState == 3">订单已完成</text>
						<text class="text-gray" v-if="item.oState == -1">订单已取消</text>
						<text class="text-gray" v-if="item.oState == -2">订单支付失败</text>
					</view>
				</view>
				<!-- <view class="flex solid-bottom" v-for="(detailItem,detailIndex) in item.orderDetail" :key="detailIndex">
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
				<view class="text-center padding-top-sm text-red ">查看详情</view> -->
				<view class="text-sm justify-between flex align-center" :class="item.oState == 1||item.oState == 0?'':'padding-top-sm'">
					<view>
						<!-- 共{{ item.orderDetailList.length }}件商品<text class="margin-left-sm"> -->
						合计：</text><text class="text-xl text-price text-bold text-red">{{ item.oTotalamount }}</text>
					</view>
					<view class="grid col-1">
						<view class="margin-tb-sm text-right">
							<!-- <button class="cu-btn round bg-black shadow margin-left" >评价</button> -->
							<button class="cu-btn round bg-red shadow margin-left" v-if="item.oState == 2" @click.stop="" >确认收货</button>
							<button class="cu-btn round line-black margin-left" v-if="item.oState == 0" @click.stop="cancelOrder" :data-index="index">取消订单</button>
							<button class="cu-btn round bg-red shadow margin-left" v-if="item.oState == 0" @click.stop="payOrder" :data-index="index">待支付</button>
							<button class="cu-btn round bg-black shadow margin-left" v-if="item.oState == 3 ||item.oState == -1||item.oState == 1||item.oState == -2" @click.stop="" open-type="contact">联系我们</button>
						</view>
					</view>
				</view>
				<view class="text-bold solid-bottom padding-tb-sm">
					<view class="">收货信息</view>
				</view>
				<view class="flex align-center solid-bottom padding-tb-sm">
					<view class="flex-sub text-center">联系人：</view>
					<view class="flex-treble"><text class="text-bold text-center">{{ item.oLink }}</text></view>
				</view>
				<view class="flex align-center solid-bottom padding-tb-sm">
					<view class="flex-sub text-center">联系电话：</view>
					<view class="flex-treble"><text class="text-bold text-center">{{ item.oLinktel }}</text></view>
				</view>
				<view class="flex align-center solid-bottom padding-tb-sm">
					<view class="flex-sub text-center">收货地址：</view>
					<view class="flex-treble"><text class="text-bold text-center">{{ item.oAddress }}</text></view>
				</view>
				<view class="flex  align-center solid-bottom padding-tb-sm">
					<view class="flex-sub text-center">送货时间：</view>
					<view class="flex-treble"><text class="text-bold text-center">{{ item.oDeliverytime }}</text></view>
				</view>
				<view class="text-sm text-right text-gray margin-top">{{ item.oCreatetime }}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import order from '../../common/order.js'
	export default {
		data() {
			return {
				orderState:[{
					name:"全部订单",
					v:""
				},{
					name:"待支付",
					v:0
				},{
					name:"备货中",
					v:1
				},{
					name:"待收货",
					v:2
				},{
					name:"已完成",
					v:3
				},{
					name:"已取消",
					v:-1
				},{
					name:"支付失败",
					v:-2
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
		onLoad(){
			var that = this;
			order.findAllOrder(that,"");
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				var v = this.orderState[this.TabCur].v;
				var that = this;
				order.findAllOrder(that,v);
			},
			toDetail(e){
				var index = e.currentTarget.dataset.id;
				
				uni.navigateTo({
					url:"../my/orderDetail?oId="+this.orderList[index].oId
				})
			},
			cancelOrder(e){
				var index = e.currentTarget.dataset.index;
				var od = this.orderList[index];
				var that = this;
				order.cancelOrder(that,od.oSerialnum);
			},
			payOrder(e){
				var index = e.currentTarget.dataset.index;
				var od = this.orderList[index];
				var that = this;
				order.payOrder(that,od.oSerialnum);
			}
		}
	}
</script>

<style>

</style>
