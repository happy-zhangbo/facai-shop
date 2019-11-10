<template>
	<view>
		<cu-custom bgColor="bg-black shadow" ><block slot="content">产品</block></cu-custom>
		
		<scroll-view scroll-x class="bg-white nav text-gray" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-black cur':''" v-for="(item,index) in 10" :key="index" @tap="tabSelect" :data-id="index">
				分类{{index}}
			</view>
		</scroll-view>
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="输入产品名称搜索" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-black shadow-blur round">搜索</button>
			</view>
		</view>
		<view class="cu-card">
			<view class="cu-item" v-for="(item,index) in 5" :key="index">
				<view class="flex">
					<view class="flex-sub padding-sm">
						<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
						 mode="aspectFill" style="width: 100%;height: 100%;" class="radius"></image>
					</view>
					
					<view class="flex-treble padding-sm">
						<view class="">产品title{{ index }}产品title{{ index }}产品title{{ index }}产品title{{ index }}产品title{{ index }}产品title{{ index }}</view>
						<view class="text-sm text-gray margin-tb-sm impleName">产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍</view>
						<view class="text-sm text-gray justify-between flex align-center">
							
							<view>
								<text class="text-lg" style="right: 0px;">
									<text class="text-price text-red text-bold">80.00</text>
								</text>
							</view>
							<view>
								<button class="cu-btn text-sm bg-black shadow-blur" @tap="addToCart"><text class="cuIcon-cart margin-right-xs"></text>加入购物车 </button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="addToCartModel?'show':''">
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
										<view class="cu-item" v-for="(item,index) in 5" :key="index">
											<label class="flex justify-between align-center flex-sub">
												<view class="flex-sub">规格 {{index +1}}</view>
												<radio class="" :class="radio=='radio' + index?'checked black':''" :checked="radio=='radio' + index?true:false"
												 :value="'radio' + index"></radio>
											</label>
										</view>
									</view>
								</radio-group>
							</scroll-view>
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
	import uniNumberBox from '@/component/uni-number-box/uni-number-box.vue'
	export default {
		components: {
			uniNumberBox
		},
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				addToCartModel:false,
				numberValue: 1,
				radio: 'radio0',
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			addToCart(){
				this.addToCartModel = true;
			},
			closeAddToCartModel(){
				this.addToCartModel = false;
			},
			commitAddToCart(){
				this.addToCartModel = false;
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
