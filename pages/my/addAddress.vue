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
		<form>
			<view class="cu-form-group" style="margin-top: 55px;">
				<view class="title">联系人</view>
				<input class="text-right" placeholder="联系人" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">联系电话</view>
				<input class="text-right" placeholder="联系电话" name="input"></input>
			</view>
			<view class="cu-list menu solid-bottom">
				<view class="cu-item arrow" @tap="toggleTab('region',0)">
					<view class="content">
						<text class="">选择地址</text>
					</view>
					<view class="action">
						<text class="impleName text-bold">北京大兴区华远西红世</text>
					</view>
				</view>
				<w-picker
					mode="region"
					:defaultVal="['浙江省','杭州市','滨江区']"
					:areaCode="['33','3301','330108']"
					:hideArea="false"
					@confirm="onConfirm" 
					ref="region" 
				></w-picker>
			</view>
			<view class="cu-form-group">
				<textarea maxlength="-1" @input="textareaAInput" placeholder="详细地址"></textarea>
			</view>
			<view class="cu-form-group">
				<view class="title">是否默认</view>
				<switch @change="SwitchA" :class="switchA?'checked red':''" :checked="switchA?true:false"></switch>
			</view>
			<view class="cu-tabbar-height margin-top-sm"></view>
			<view class="cu-bar bg-white tabbar border shop foot">
				<view class="bg-red submit">确认添加</view>
			</view>
		</form>
		
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
				switchA: false
			}
		},
		methods: {
			toAddAddress(){
				uni.navigateTo({
					url:"/pages/my/addAddress"
				})
			},
			toggleTab(item,index){
				this.$refs[item].show();
			},
			SwitchA(e) {
				this.switchA = e.detail.value
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
