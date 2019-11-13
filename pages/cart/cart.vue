<template>
	<view>
		<cu-custom bgColor="bg-black shadow" ><block slot="content">购物车</block></cu-custom>
		<view class="cu-bar bg-white">
			<view class="action sub-title">
				<text class="text-xl text-bold text-black">购物车</text>
				<text class="text-ABC text-black">cart</text>
				<!-- last-child选择器-->
			</view>
		</view>
		<checkbox-group class="block" @change="CheckboxChange">
			<view class="cu-list bg-white">
				<view class="cu-item solid-bottom" v-for="(item,index) in cartList" :key="index" :class="modalName=='move-box-'+ index?'move-cur':''" @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
					<view class="flex">
						<view class="padding-left flex align-center"><checkbox :class="item.checked?'checked black':''" :checked="item.checked" :value="index+''"></checkbox></view>
						<view class="flex-sub padding-sm">
							<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
							 mode="aspectFill" style="width: 100%;height: 115px;" class="radius"></image>
						</view>
						<view class="flex-treble padding-sm">
							<view>产品title{{ index }}产品title{{ index }}产品title{{ index }}产品title{{ index }}产品title{{ index }}产品title{{ index }}</view>
							<view class="text-sm text-gray margin-tb-sm impleName">规格配置</view>
							<view class="text-sm text-gray flex justify-between align-center">
								<uni-number-box :value="item.numberValue" @change="change" :ids="index+''" />
								<view>
									<text class="text-lg" style="right: 0px;">
										<text class="text-price text-red text-bold">80.00</text>
									</text>
								</view>
							</view>
						</view>
						<view class="move">
							<view class="bg-red">删除</view>
						</view>
					</view>
					
				</view>
			</view>
		</checkbox-group>
		<view class="cu-bar bg-white tabbar shop" style="width: 100%;bottom:calc(100upx + env(safe-area-inset-bottom) / 2);position: fixed;">
			<view class="margin-lr">
				<checkbox-group class="block" @change="checkAll">
					<checkbox class="margin-right-xs" :class="selectAll?'checked black':''" :checked="selectAll"></checkbox>
					全选
				</checkbox-group>
			</view>
			
			<view class="margin-lr">
				合计：<text class="text-price text-red margin-right">1000.00</text>
				<button class="cu-btn bg-red round shadow-blur" @tap="toPreview">立即订购</button>
			</view>
			
		</view>
		<view class="cu-tabbar-height"></view>
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
	export default {
		components: {
			uniNumberBox
		},
		data() {
			return {
				
				modalName: null,
				cartList:[{
					checked:false,
					numberValue: 1
				},{
					checked:false,
					numberValue: 1
				},{
					checked:false,
					numberValue: 1
				},{
					checked:false,
					numberValue: 1
				},{
					checked:false,
					numberValue: 1
				}],
				selectAll:false,
				listTouchStart: 0,
				listTouchDirection: null
			}
		},
		methods: {
			toPreview(){
				uni.navigateTo({
					url:"../cart/preview"
				})
			},
			change(event) {
				var items = this.cartList,
					ids = event.ids;
				items[ids].numberValue = event.value;
					
			},
			checkAll(){
				if(this.selectAll){
					this.selectAll = false;
					//循环遍历修改购物车标识为未选中
					for(var i = 0;i < this.cartList.length; i++){
						this.cartList[i].checked = false
					}
				}else{
					this.selectAll = true;
					//循环遍历修改购物车标识为选中
					for(var i = 0;i < this.cartList.length; i++){
						this.cartList[i].checked = true;
					}
					
				}
			},
			CheckboxChange(e) {
				var items = this.cartList,
					values = e.detail.value;

				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (i == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			
			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			}
		}
	}
</script>

<style>

</style>
