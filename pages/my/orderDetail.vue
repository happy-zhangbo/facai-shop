<template>
	<view>
		<cu-custom bgColor="bg-black" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">订单详情</block>
		</cu-custom>
		
		<view class="bg-white" style="margin-top: 55px;">
			<view class="cu-bar bg-white fixed"  :style="[{top:CustomBar + 'px'}]">
				<view class="action sub-title">
					<text class="text-xl text-bold text-black">订单信息</text>
					<text class="text-ABC text-black">order</text>
					<!-- last-child选择器-->
				</view>
			</view>
			<view class="cu-bar bg-white" >
				<view class="action sub-title">
					<text class="text-xl text-bold text-black">包含商品</text>
					<text class="text-ABC text-black">product</text>
					<!-- last-child选择器-->
				</view>
			</view>
			<view class="cu-list menu margin-bottom-sm" style="margin-top: 0px;">
				<view class="bg-white solid-bottom" v-for="(item,index) in orderDetail.orderDetail" :key="index">
					<view class="flex justify-between align-center">
						<view class="flex-sub padding-sm">
							<image :src="item.productSpecs.product.pCover"
							 mode="aspectFill" style="width: 100%;height: 115px;" class="radius"></image>
						</view>
						<view class="flex-sub padding">
							<view class="text-black">{{ item.productSpecs.product.pTitle }}</view>
							<view class="text-sm text-gray margin-tb-sm">
								<view>数量：{{ item.odCount}}{{ item.productSpecs.sBrief}}</view>
								<view>规格：{{ item.productSpecs.sName}}</view>
							</view>
						</view>
						<view class="flex-sub padding-right-xl text-right">
							<text class="text-price text-bold text-red">{{ item.odTotal }}元</text>
						</view>
					</view>
				</view>
			</view>
			<view class="cu-item padding">
				
				
				<view class="flex  align-center solid-bottom padding-tb-sm">
					<view class="flex-sub text-center">订单状态：</view>
					<view class="flex-treble">
						<text class="text-bold text-lg">
							<text class="text-red" v-if="orderDetail.oState == 0">待支付</text>
							<text class="text-black" v-if="orderDetail.oState == 1">正在备货中</text>
							<text class="text-black" v-if="orderDetail.oState == 2">已发货</text>
							<text class="text-black" v-if="orderDetail.oState == 3">订单已完成</text>
							<text class="text-gray" v-if="orderDetail.oState == -1">订单已取消</text>
							<text class="text-gray" v-if="orderDetail.oState == -2">订单支付失败</text>
						</text>	
					</view>
				</view>
				<view class="flex  align-center solid-bottom padding-tb-sm">
					<view class="flex-sub text-center">成交价格：</view>
					<view class="flex-treble"><text class="text-bold text-center">{{ orderDetail.oTotalamount }}</text></view>
				</view>
				<view class="flex  align-center solid-bottom padding-tb-sm">
					<view class="flex-sub text-center">订单编号：</view>
					<view class="flex-treble"><text class="text-bold text-center">{{ orderDetail.oSerialnum }}</text></view>
				</view>
				<view class="flex  align-center solid-bottom padding-tb-sm">
					<view class="flex-sub text-center">送货地址：</view>
					<view class="flex-treble"><text class="text-bold text-center">{{ orderDetail.oAddress }}</text></view>
				</view>
				<view class="flex  align-center solid-bottom padding-tb-sm">
					<view class="flex-sub text-center">联系人：</view>
					<view class="flex-treble"><text class="text-bold text-center">{{ orderDetail.oLink }}</text></view>
				</view>
				<view class="flex  align-center solid-bottom padding-tb-sm">
					<view class="flex-sub text-center">联系电话：</view>
					<view class="flex-treble"><text class="text-bold text-center">{{ orderDetail.oLinktel }}</text></view>
				</view>
				<view class="flex  align-center solid-bottom padding-tb-sm">
					<view class="flex-sub text-center">微信流水：</view>
					<view class="flex-treble"><text class="text-bold text-center">{{ orderDetail.oTransactionnum }}</text></view>
				</view>
				<view class="flex  align-center solid-bottom padding-tb-sm">
					<view class="flex-sub text-center">创建时间：</view>
					<view class="flex-treble"><text class="text-bold text-center">{{ orderDetail.oCreatetime }}</text></view>
				</view>
				<view class="flex  align-center solid-bottom padding-tb-sm">
					<view class="flex-sub text-center">送货时间：</view>
					<view class="flex-treble"><text class="text-bold text-center">{{ orderDetail.oDeliverytime }}</text></view>
				</view>
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-black margin-tb-sm lg" v-if="orderDetail.oState == 2" @click.stop="">确认收货</button>
					<button class="cu-btn bg-white margin-tb-sm lg" v-if="orderDetail.oState == 0" @click.stop="cancelOrder">取消订单</button>
					<button class="cu-btn bg-red margin-tb-sm lg" v-if="orderDetail.oState == 0"  @click.stop="payOrder">去支付</button>
					<button class="cu-btn bg-black margin-tb-sm lg" v-if="orderDetail.oState == 3 ||orderDetail.oState == -1||orderDetail.oState == 1||orderDetail.oState == -2" @click.stop="" open-type="contact">联系我们</button>
				</view>
				

				
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import order from '../../common/order.js'
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				orderDetail:{}
			}
		},
		onLoad(e) {
			var that = this;
			order.findOrderDetail(that,e.oId)
		},
		methods: {
			cancelOrder(e){
				var that = this;
				order.cancelOrder(that,that.orderDetail.oSerialnum);
			},
			payOrder(e){
				var that = this;
				order.payOrder(that,that.orderDetail.oSerialnum);
			}
		}
	}
</script>

<style>
</style>
