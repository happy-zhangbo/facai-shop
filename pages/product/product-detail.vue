<template>
	<view>
		<cu-custom bgColor="bg-black" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">产品详情</block>
		</cu-custom>
		<swiper class="screen-swiper round-dot" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.src" mode="aspectFill" v-if="item.type=='image'"></image>
				<video :src="item.src" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
			</swiper-item>
		</swiper>
		<view class="flex bg-white solid-bottom">
			<view class="flex-treble padding-sm">
				<view class="text-bold text-black">{{ productDetail.pTitle}}</view>
				<view class="text-sm text-gray margin-tb-sm">{{ productDetail.pBrief}}</view>
				<!-- <view class="text-sm text-gray text-left">
					<view>
						<text class="text-lg " style="right: 0px;">
							<text class="text-price text-red text-bold">{{ productDetail.pSpecsList[0].sPrice }}</text>
						</text>
					</view>
				</view> -->
			</view>
		</view>
		<scroll-view scroll-x class="nav text-center bg-white text-gray">
			<view class="cu-item" :class="index==TabCur?'text-black cur':''" v-for="(item,index) in orderState" :key="index" @tap="tabSelect" :data-id="index">
				{{ item.name }}
			</view>
		</scroll-view>
		<view class="padding-xl" v-if="TabCur==0">
			{{ productDetail.pDetail}}
		</view>
		<view class="padding-xl" v-if="TabCur==1">
			<text v-for="(item,index) in productDetail.pSpecsList" :key="index">
				{{ item.sName }}、
				
			</text>
		</view>
		
		
		
		<view class="cu-bar bg-white tabbar shop foot justify-between">
			<view class="padding-left">
				价格：<text class="text-price text-red text-bold text-lg">{{ productDetail.pSpecsList[0].sPrice }} </text>
				<text class="text-red text-bold text-lg" v-if="productDetail.pSpecsList.length > 1"><text style="margin: 0px 3px;">~</text>{{ productDetail.pSpecsList[productDetail.pSpecsList.length-1].sPrice}}</text>
			</view>
			<view class="padding-right">
				<button class="cu-btn bg-black round shadow-blur" @tap="addToCart"><text class="cuIcon-cart margin-right-xs"></text>加入购物车</button>
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
							单位：{{ danwei }}
						</view>
						<view class="padding-lr">
							<view class="title text-left margin-bottom-sm">规格</view>
							<scroll-view scroll-y style="height: 300px;">
								<radio-group class="block" @change="radioChange">
									<view class="cu-list menu text-left">
										<view class="cu-item" v-for="(item,index) in productDetail.pSpecsList" :key="index">
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
							总价：<text class="text-price text-xl text-bold">{{ productDetail.pSpecsList[radio].sPrice*numberValue }}元</text>
						</view>
					</form>
				</view>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-black solid-left" @tap="closeAddToCartModel">取消</view>
					<view class="action margin-0 flex-sub text-red  solid-left" @tap="commitAddToCart">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
	import product from '../../common/product'
	import login from '../../common/login.js'
	import {
	  mapState,
	  mapMutations
	 } from 'vuex';
	export default {
		components: {
			uniNumberBox
		},
		data() {
			return {
				addToCartModel:false,
				numberValue: 1,
				radio: 0,
				TabCur: 0,
				danwei:"",
				productDetail:{
					pSpecsList:[{sPrice:0}]
				},
				orderState:[{
					name:"商品介绍"
				},{
					name:"规格参数"
				}],
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					id: 4,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
				}],
			}
		},
		computed:{
		   ...mapState(['hasLogin','userInfo'])
		},
		onLoad(e) {
			var that = this;
			product.selectProductDetail(that,e.pId)
		},
		methods: {
			addToCart(e){
				this.addToCartModel = true;
				this.danwei = this.productDetail.pSpecsList[0].sBrief
			},
			closeAddToCartModel(){
				this.addToCartModel = false;
			},
			radioChange(e) {
				this.radio = e.detail.value;
				this.danwei = this.productDetail.pSpecsList[this.radio].sBrief
			},
			change(event) {
				
				if(event.value <= 0){
					this.numberValue = 1;
				}
				if(event.value >= 10000){
					this.numberValue = 9999;
				}
				this.numberValue = event.value;
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			commitAddToCart(){
				if(this.hasLogin){
					product.addToCarts(this.productDetail.pSpecsList[this.radio],this.numberValue)		
					this.addToCartModel = false;
					uni.showToast({
						title:"已添加购物车"
					})
				}else{
					this.addToCartModel = false;
					uni.showToast({
						title:"您还未登录",
						icon:"none",
						success:function(){
							login.mplogin();
						}
					});
				}
				
			},
		}
	}
</script>

<style>
	page{
		background: #FFFFFF;
	}
</style>
