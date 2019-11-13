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
						<view class="text-lg">张博<text class="margin-left-xs text-df text-gray">18010091016</text></view>
						<view class="text-df">北京北京市大兴区新华小区5单元607</view>
					</view>
				</view>
			</view>
		</view>
		<form>
			<view class="margin-bottom-sm">
				<view class="cu-form-group">
					<view class="title">配送日期</view>
					<picker mode="date" :value="date" start="2019-11-13" @change="DateChange">
						<view class="picker">
							{{date}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">配送时间</view>
					<picker mode="time" :value="time" start="00:00" end="23:59" @change="TimeChange">
						<view class="picker">
							{{time}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">支付方式</view>
					<picker @change="PickerChange" :value="index" :range="picker">
						<view class="picker">
							{{index>-1?picker[index]:'禁止换行，超出容器部分会以 ... 方式截断'}}
						</view>
					</picker>
				</view>
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
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="订单备注"></textarea>
			</view>
		</view>
		<view class="cu-bar bg-white tabbar foot shop justify-end">
			<view class="margin-lr text-black">
				<text>共 3 件，</text>
				<text>合计：<text class="text-price text-red margin-right">1000.00</text></text>
				<button class="cu-btn bg-red round shadow-blur" @tap="toPreview">立即订购</button>
			</view>
		</view>
		
		
		<view class="cu-tabbar-height margin-bottom-sm"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 0,
				date: '2018-12-25',
				time: '12:01',
				picker: ['在线支付', '货到付款', '签字付款']
			}
		},
		onLoad() {
			
			
		},
		methods: {
			PickerChange(e) {
				this.index = e.detail.value
			},
			TimeChange(e) {
				this.time = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
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
				
				
				
				
				
				
			}
		}
	}
</script>

<style>
	uni-picker .uni-picker-action.uni-picker-action-confirm{  
	        color: red !important;  
	}
</style>
