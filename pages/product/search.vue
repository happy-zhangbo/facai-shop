<template>
	<view>
		<cu-custom bgColor="bg-black" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">产品搜索</block>
		</cu-custom>
		<view class="cu-bar search bg-white" >
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @input="textAInput" :adjust-position="false" type="text" placeholder="输入产品名称搜索" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-black shadow-blur round" @tap="commitToSearch">搜索</button>
			</view>
		</view>
		<view class="text-center margin-top" v-if="!searchResult">请输入搜索条件</view>
		<view class="text-center margin-top" v-if="searchResult">搜索‘{{content}}’</view>
		
		<view class="" style="margin-top: 50px;" v-if="searchResult">
		<view class="text-center">没有查询到结果</view>
		<view class="text-center margin-top">可联系电话<text class="margin-lr-sm text-red" style="font-size: 20px;">13811418229</text>进行询问</view>
		</view>
		<view class="cu-card" >
			<view class="cu-item" v-for="(item,index) in productList" :key="index" @tap="toDetail" :data-id="index">
				<view class="flex">
					<view class="flex-sub padding-sm">
						<image :src="item.pCover"
						 mode="aspectFill" style="width: 100%;height: 115px;" class="radius"></image>
					</view>
					
					<view class="flex-treble padding-sm">
						<view class="">{{ item.pTitle }}</view>
						<view class="text-sm text-gray margin-tb-sm impleName">{{ item.pBrief }}</view>
						<view class="text-sm text-gray justify-between flex align-center">
							
							<view>
								<text class="text-lg text-red text-bold" style="right: 0px;">
									<text class="text-price ">{{ item.pSpecsList[0].sPrice}} </text>
									<text class="" v-if="item.pSpecsList.length > 1"><text style="margin: 0px 3px;">~</text>{{ item.pSpecsList[item.pSpecsList.length-1].sPrice}}</text>
									<text class="">元</text>
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
		·
		
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
							<uni-number-box :value="numberValue" @change="change"/>
							单位：{{ danwei }}
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
							价格：<text class="text-price text-xl text-bold">{{ 0==productSpces.length?0:productSpces[radio].sPrice*numberValue }}</text>
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
				content:"",
				CustomBar: this.CustomBar,
				StatusBar: this.StatusBar,
				TabCur: 0,
				scrollLeft: 0,
				addToCartModel:false,
				numberValue: 1,
				radio: 0,
				productTypeList:[],
				productList:[],
				productSpces:[],
				danwei:"",
				searchResult:false
			}
		},
		computed:{
		   ...mapState(['hasLogin','userInfo'])
		},
		methods: {
			textAInput(e){
				this.content = e.detail.value;
				this.searchResult = false;
			},
			commitToSearch(e){
				var that = this;
				product.selectAllProduct(that,this.content);
			},
			toDetail(e){
				var index = e.currentTarget.dataset.id;
				
				uni.navigateTo({
					url:"../product/product-detail?pId="+this.productList[index].pId
				})
			},
			addToCart(e){
				
				var index = e.currentTarget.dataset.id;
				this.productSpces = this.productList[index].pSpecsList;
				this.danwei = this.productSpces[0].sBrief
				this.addToCartModel = true;
				
			},
			commitAddToCart(){
				console.log(this.radio);
				if(this.hasLogin){
					product.addToCarts(this.productSpces[this.radio],this.numberValue)					
					
					this.addToCartModel = false;
					this.productSpces = [];
					this.numberValue = 1;
					uni.showToast({
						title:"已添加购物车"
					})
				}else{
					this.addToCartModel = false;
					this.productSpces = [];
					this.numberValue = 1;
					uni.showToast({
						title:"您还未登录",
						icon:"none",
						success:function(){
							login.mplogin();
						}
					});
				}
				
			},
			radioChange(e) {
				this.radio = e.detail.value
				this.danwei = this.productSpces[this.radio].sBrief
			},
			change(event) {
				if(event.value <= 0){
					this.numberValue = 1;
					return;
				}
				if(event.value >= 10000){
					this.numberValue = 9999;
					return;
				}
				this.numberValue = event.value;
				
			}
		}
	}
</script>

<style>

</style>
