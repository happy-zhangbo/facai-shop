<template>
	<view>
		<cu-custom bgColor="bg-black" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">确认订单</block>
		</cu-custom>
		<view class="cu-list menu margin-bottom-sm shadow-blur" style="border-bottom:10px transparent solid;border-image:linear-gradient(to left,#000,red) 1 10;">
			<view class="cu-item arrow">
				<view class="flex flex-wrap">
					<view class="basis-xs align-center justify-center flex">
						<view class="cu-avatar lg round bg-red">
							<text class="cuIcon cuIcon-locationfill text-white"></text>
						</view>
					</view>
					<view class="basis-xl padding">
						<view class="text-lg">张博<text class="margin-left-sm text-df text-grey">18010091016</text></view>
						<view class="text-df">北京北京市大兴区新华小区5单元607</view>
					</view>
				</view>
			</view>
		</view>
		<form>
			<view class="cu-list menu margin-bottom-sm">
				<view class="cu-item arrow" @tap="toggleTab('limitHour',0)">
					<view class="content">
						<text class="cuIcon-deliver_fill"></text>
						<text class="">配送时间</text>
					</view>
					<view class="action">
						<text class="">{{ datetime }}</text>
					</view>
				</view>
				<w-picker
					mode="limitHour" 
					dayStep="60"
					@confirm="DateTimeChange"
					ref="limitHour" 
					themeColor="#f00"
				></w-picker>
				<view class="cu-item arrow" @tap="toggleTab('selector',0)">
					<view class="content">
						<text class="cuIcon-sponsorfill"></text>
						<text class="">支付方式</text>
					</view>
					<view class="action">
						<text class="">{{ selectLabel }}</text>
					</view>
				</view>
				<w-picker
					v-if="selectList.length!=0"
					mode="selector"
					:defaultVal="[0]"
					@confirm="PayMethodChange" 
					ref="selector" 
					themeColor="#f00"
					:selectList="selectList"
				></w-picker>
			</view>
		</form>
		<view class="cu-list menu margin-bottom-sm" style="margin-top: 0px;">
			<view class="bg-white solid-bottom" v-for="(item,index) in cartProduct" :key="index">
				<view class="flex justify-between align-center">
					<view class="padding">
						<view class="text-black">{{ item.productSpecs.product.pTitle }}</view>
						<view class="text-sm text-gray margin-tb-sm">
							<view>数量：{{ item.cCount }};</view>
							<view>规格：{{ item.productSpecs.sName }};</view>
						</view>
					</view>
					<view class="padding-right-xl text-black">
						<text class="text-price text-bold">{{ item.cTotal }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-item">
			<view class="cu-form-group">
				<textarea maxlength="-1" placeholder="订单备注"></textarea>
			</view>
		</view>
		<view class="cu-bar bg-white tabbar foot shop justify-end">
			<view class="margin-lr text-black">
				<text>共 3 件，</text>
				<text>合计：<text class="text-price text-red margin-right">{{ zongjia }}</text></text>
				<button class="cu-btn bg-red round shadow-blur" @tap="toPreview">提交订单</button>
			</view>
		</view>
		
		
		<view class="cu-tabbar-height margin-bottom-sm"></view>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	import carts from '../../common/cart.js'
	export default {
		components:{
			wPicker
		},
		data() {
			return {
				index: 0,
				mode:"range",
				datetime:"请选择配送时间",
				selectLabel:"在线支付",
				selectList:[{
					label:"在线支付",
					value:0
				}],
				cartProduct:[],
				zongjia:0.00,
			}
		},
		onLoad(e) {
			var cartProduct = JSON.parse(e.cartProduct);
			var that = this;
			that.cartProduct = cartProduct;
			var zongjia = 0.00;
			//循环遍历修改购物车标识为选中
			for(var i = 0;i < that.cartProduct.length; i++){
				zongjia += that.cartProduct[i].cTotal;
			}
			that.zongjia = zongjia;
			
		},
		methods: {
			PayMethodChange(val) {
				console.log(val)
				this.index = val.defaultVal;
				this.selectLabel = val.result;
			},
			DateTimeChange(val) {
				this.datetime = val.result;
			},
			getUserLocation(){
				var that = this;
				uni.getLocation({
					success: function (res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						var param = {
							key:"34b4cb65debcdafdb24343be1a1bc76e",
							location:res.longitude+","+res.latitude
						}
						that.$req.get("https://restapi.amap.com/v3/geocode/regeo",param,function(res){
							console.log(res);
						})
					},
					fail(res) {
						console.log(res);
					}
				});
				
			},
			toggleTab(item,index){
				this.$refs[item].show();
			},
			onConfirm(val){
				this.resultInfo=val;
			}
		}
	}
</script>

<style>

</style>
