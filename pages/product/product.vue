<template>
	<view>
		<cu-custom bgColor="bg-black shadow" ><block slot="content">产品</block></cu-custom>
		
		<scroll-view scroll-x class="bg-white nav text-gray fixed" :style="[{top:CustomBar + 'px'}]" >
			<view class="cu-item" :class="index==TabCur?'text-black cur':''" v-for="(item,index) in productTypeList" :key="index" @tap="tabSelect" :data-id="index">
				{{item.ptName}}
			</view>
		</scroll-view>
		<!-- <scroll-view scroll-x class="bg-white nav text-center fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in tabNav" :key="index" @tap="tabSelect"
			 :data-id="index">
				{{tabNav[index]}}
			</view>
		</scroll-view> -->
		
		
		<view class="cu-bar search bg-white" style="margin-top: 50px;" >
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="输入产品名称搜索" confirm-type="search"></input>
			</view>
			<!-- <view class="action">
				<button class="cu-btn bg-black shadow-blur round">搜索</button>
			</view> -->
		</view>
		<view class="cu-card">
			<view class="cu-item" v-for="(item,index) in productList" :key="index" @tap="toDetail" :data-id="index">
				<view class="flex">
					<view class="flex-sub padding-sm">
						<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
						 mode="aspectFill" style="width: 100%;height: 115px;" class="radius"></image>
					</view>
					
					<view class="flex-treble padding-sm">
						<view class="">{{ item.pTitle }}</view>
						<view class="text-sm text-gray margin-tb-sm impleName">{{ item.pBrief }}</view>
						<view class="text-sm text-gray justify-between flex align-center">
							
							<view>
								<text class="text-lg" style="right: 0px;">
									<text class="text-price text-red text-bold">{{ item.pSpecsList[0].sPrice}} </text>
									<text class="text-red text-bold" v-if="item.pSpecsList.length > 1">-{{ item.pSpecsList[item.pSpecsList.length-1].sPrice}}</text>
								</text>
							</view>
							<view>
								<button class="cu-btn text-sm bg-black shadow-blur" @click.stop="addToCart" :data-id="index"><text class="cuIcon-cart margin-right-xs"></text>加入购物车 </button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="addToCartModel?'show':''" @touchmove.stop.prevent="">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">选择配置</view>
					<view class="action" @tap="closeAddToCartModel">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding bg-white">
					<form>
						<view class="cu-form-group">
							<view class="title">数量</view>
							<uni-number-box :value="numberValue" @change="change" />
						</view>
						<view class="padding">
							<view class="title text-left margin-bottom-sm">规格</view>
							<scroll-view scroll-y style="height: 300px;">
								<radio-group class="block" @change="radioChange">
									<view class="cu-list menu text-left">
										<view class="cu-item" v-for="(item,index) in productSpces" :key="index">
											<label class="flex justify-between align-center flex-sub">
												<view class="flex-sub">{{ item.sName }}</view>
												<radio class="" :class="radio==index?'checked black':''" :checked="radio==index?true:false"
												 :value="index+''"></radio>
											</label>
										</view>
									</view>
								</radio-group>
							</scroll-view>
						</view>
						<view class="padding-lr text-red">
							价格：<text class="text-price text-xl text-bold">{{ 0==productSpces.length?0:productSpces[radio].sPrice }}</text>
						</view>
					</form>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-black solid-left" @tap="closeAddToCartModel">取消</view>
					<view class="action margin-0 flex-sub text-red  solid-left" @tap="commitAddToCart">确定</view>
				</view>
			</view>
		</view>
		<view class="cu-tabbar-height"></view>
		
		
		
		
		
		
	</view>
</template>

<script>
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
	import product from '../../common/product'
	export default {
		components: {
			uniNumberBox
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				TabCur: 0,
				scrollLeft: 0,
				addToCartModel:false,
				numberValue: 1,
				radio: 0,
				productTypeList:[],
				productList:[],
				productSpces:[]
			}
		},
		created() {
			var that = this;
			product.selectAllProductType(that);
			product.selectAllProduct(that);
		},
		methods: {
			toDetail(e){
				var index = e.currentTarget.dataset.id;
				
				uni.navigateTo({
					url:"../product/product-detail?pId="+this.productList[index].pId
				})
			},
			tabSelect(e) {
				var that = this;
				this.TabCur = e.currentTarget.dataset.id;
				product.selectAllProduct(that,this.TabCur);
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			addToCart(e){
				
				var index = e.currentTarget.dataset.id;
				this.productSpces = this.productList[index].pSpecsList;
				this.addToCartModel = true;
				
			},
			closeAddToCartModel(){
				this.productSpces = [];
				this.addToCartModel = false;
			},
			commitAddToCart(){
				this.addToCartModel = false;
				this.productSpces = [];
				uni.showToast({
					title:"已添加购物车"
				})
			},
			radioChange(e) {
				
				
				this.radio = e.detail.value
			},
			change(event) {
				this.numberValue = event.value;
			}
		}
	}
</script>

<style>
.impleName{
	display: -webkit-box;
	overflow: hidden;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
}
</style>
