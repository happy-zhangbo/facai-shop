<template>
	<view>
		<cu-custom bgColor="bg-black" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">添加地址</block>
		</cu-custom>
		<view class="cu-bar bg-white fixed"  :style="[{top:CustomBar + 'px'}]">
			<view class="action sub-title">
				<text class="text-xl text-bold text-black">添加地址</text>
				<text class="text-ABC text-black">address</text>
				<!-- last-child选择器-->
			</view>
		</view>
		<form @submit="commit">
			<view class="cu-form-group" style="margin-top: 55px;">
				<view class="title">联系人</view>
				<input class="text-right" placeholder="联系人" name="aLink" :value="addressInfo.aLink"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">联系电话</view>
				<input class="text-right" placeholder="联系电话" name="aTel" :value="addressInfo.aTel"></input>
			</view>
			<view class="cu-list menu solid-bottom">
				<view class="cu-item arrow" @tap="toggleTab('region',0)">
					<view class="content">
						<text class="">选择地址</text>
					</view>
					<view class="action">
						<text class="impleName text-bold">{{ addressInfo.aCity }}</text>
					</view>
				</view>
				<w-picker
					mode="region"
					:areaCode="['11','1101','110101']"
					:hideArea="false"
					@confirm="onConfirm" 
					themeColor="#f00"
					ref="region" 
				></w-picker>
			</view>
			<view class="cu-form-group">
				<textarea maxlength="-1" @input="textareaAInput" placeholder="详细地址" 	:value="addressInfo.aAddress"></textarea>
			</view>
			<view class="cu-form-group">
				<view class="title">是否默认</view>
				<switch @change="SwitchA" :class="switchA?'checked red':''" :checked="addressInfo.aDefatult==1?true:false" name="aDefatult"></switch>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-red margin-tb-sm lg" form-type="submit">提交</button>
			</view>
		</form>
		
	</view>
</template>

<script>
	import wPicker from "@/components/w-picker/w-picker.vue";
	import address from "../../common/address.js"
	export default {
		components:{
			wPicker
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				addressInfo:{},
			}
		},
		onLoad(e){
			var addressInfo = JSON.parse(e.addressInfo);
			this.addressInfo = addressInfo;
		},
		methods: {
			textareaAInput(e){
				this.addressInfo.aAddress = e.detail.value;
			},
			toggleTab(item,index){
				this.$refs[item].show();
			},
			SwitchA(e) {
				this.addressInfo.aDefatult = e.detail.value?1:0
			},
			onConfirm(val){
				console.log(val);
				this.addressInfo.aCity=val.result;
			},
			commit(e){
				var formData = e.detail.value;
				this.addressInfo.aLink= formData.aLink
				this.addressInfo.aTel= formData.aTel
				 console.log('form发生了submit事件，携带数据为：' + JSON.stringify(this.addressInfo))
				 address.updateAddress(this.addressInfo)
			}
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	.impleName{
		display: block;
		display: -webkit-box;
		max-width: 230px;
		margin: 0 auto;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
