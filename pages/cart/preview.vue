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
			<view class="cu-item" v-for="(item,index) in 5" :key="index">
				<view class="flex">
					<view class="flex-sub padding-tb-sm">
						<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
						 mode="aspectFill" style="width: 100%;height: 115px;" class="radius"></image>
					</view>
					
					<view class="flex-treble padding-sm">
						<view class="">产品title{{ index }}产品title{{ index }}产品title{{ index }}产品title{{ index }}产品title{{ index }}产品title{{ index }}</view>
						<view class="text-sm text-gray margin-tb-sm">
							<view>数量：100个;</view>
							<view>规格：3*3 白色</view>
						</view>
					</view>
					<view class="flex-sub flex justify-center align-center">
						<text class="text-price text-bold">80.00</text>
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
				<text>合计：<text class="text-price text-red margin-right">1000.00</text></text>
				<button class="cu-btn bg-red round shadow-blur" @tap="toPreview">提交订单</button>
			</view>
		</view>
		
		
		<view class="cu-tabbar-height margin-bottom-sm"></view>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
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
				},{
					label:"货到付款",
					value:1
				},{
					label:"签字付款",
					value:2
				},{
					label:"现金支付",
					value:3
				}],
			}
		},
		onLoad() {
			
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
