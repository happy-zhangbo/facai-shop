<template>
	<view>
		<cu-custom bgColor="bg-black" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">确认订单</block>
		</cu-custom>
		<view class="cu-list menu margin-bottom-sm shadow-blur" style="border-bottom:10px transparent solid;border-image:linear-gradient(to left,#000,red) 1 10;">
			<view class="cu-item arrow" @tap="toAddress">
				<view class="flex flex-wrap" >
					<view class="flex-sub align-center justify-center flex">
						<view class="cu-avatar lg round bg-red">
							<text class="cuIcon cuIcon-locationfill text-white"></text>
						</view>
					</view>
					<view class="flex-treble padding" v-if="addressInfo != null">
						<view class="text-lg margin-bottom-sm">{{addressInfo.aLink}}<text class="margin-left-sm text-df text-grey">{{addressInfo.aTel}}</text></view>
						<view class="text-df">{{addressInfo.aCity}}{{addressInfo.aAddress}}</view>
					</view>
					<view class="flex-treble padding" v-if="addressInfo == null">
						<view class="text-lg margin-bottom-sm">姓名<text class="margin-left-sm text-df text-grey">联系方式</text></view>
						<view class="text-df">暂无默认地址</view>
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
						<text class="">{{ dateTimeLable }}</text>
					</view>
				</view>
				<w-picker
					mode="limitHour" 
					dayStep="60"
					@confirm="DateTimeChange"
					ref="limitHour" 
					@cancel="cancelDatetime"
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
					style="z-index: 999;"
				></w-picker>
			</view>
		</form>
		<view class="cu-list menu margin-bottom-sm" style="margin-top: 0px;">
			<view class="bg-white solid-bottom" v-for="(item,index) in cartProduct" :key="index">
				<view class="flex justify-between align-center">
					<view class="padding">
						<view class="text-black">{{ item.productSpecs.product.pTitle }}</view>
						<view class="text-sm text-gray margin-tb-sm">
							<view>数量：{{ item.cCount }}{{ item.productSpecs.sBrief }};</view>
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
				<textarea maxlength="-1" @input="textareaAInput" placeholder="订单备注"></textarea>
			</view>
		</view>
		<view class="cu-bar bg-white tabbar foot shop justify-end">
			<view class="margin-lr text-black">
				<text>共 {{ cartProduct.length }} 件，</text>
				<text>合计：<text class="text-price text-red margin-right">{{ zongjia }}</text></text>
				<button class="cu-btn bg-red round shadow-blur" @tap="commitOrder">提交订单</button>
			</view>
		</view>
		
		
		<view class="cu-tabbar-height margin-bottom-sm"></view>
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	import carts from '../../common/cart.js'
	import moment from 'moment'
	export default {
		components:{
			wPicker
		},
		data() {
			return {
				index: 0,
				mode:"range",
				dateTimeLable:"请选择配送时间",
				dateTimeValue:"",
				selectLabel:"在线支付",
				selectValue:0 ,
				selectList:[{
					label:"在线支付",
					value:0
				}],
				cartProduct:[],
				zongjia:0.00,
				addressInfo:null,
				textareaRemarks:"",
				showMask:true
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
			
			carts.getDefaultAddress(that);
			
		},
		onShow(e) {
			let pages = getCurrentPages();
			let currPage = pages[pages.length-1];
			if(currPage.data.addressInfo==undefined){
				
			}else{
				this.addressInfo = currPage.data.addressInfo
			}
		},
		methods: {
			textareaAInput(e){
				this.textareaRemarks = e.detail.value;
			},
			PayMethodChange(val) {
				console.log(val)
				this.index = val.defaultVal;
				this.selectValue = this.selectList[index].value;
				this.selectLabel = val.result;
			},
			DateTimeChange(val) {
				var datetime = val.result;
				var dateArray = datetime.split(" ");
				var hour = 0;
				if(dateArray[1]=="上午"){
					hour = parseInt(dateArray[2]);
				}else{
					hour = parseInt(dateArray[2])+12;
				}
				
				this.dateTimeLable = val.result
				var dateStr = dateArray[0]+" "+hour+":00:00"
				var datelong = moment(dateStr,"YYYY-MM-DD HH");
				this.dateTimeValue = datelong.valueOf();
				console.log(this.dateTimeValue)
			},
			cancelDatetime(e){
			},
			toggleTab(item,index){
				this.$refs[item].show();
			},
			toAddress(){
				uni.navigateTo({
					url:"/pages/cart/address"
				})
			},
			commitOrder(){
				var that = this;
				if(that.dateTimeValue == ""){
					uni.showToast({
						title:"请选择配送时间",
						icon:"none"
					})
					return;
				}
				if(that.addressInfo == null){
					uni.showToast({
						title:"请选择配送地点",
						icon:"none"
					})
					return;
				}
				
				carts.commitOrder(that);
			}
		}
	}
</script>

<style>

</style>
