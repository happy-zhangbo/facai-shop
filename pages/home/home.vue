<template>
	<view>
		<cu-custom bgColor="bg-black shadow" ><block slot="content">首页</block></cu-custom>

		<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500" >
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
			</swiper-item>
		</swiper>
		<view class="text-center bg-white padding text-bold" style="font-size: 16px;">选择服务</view>
		
		<view class="cu-list grid" :class="['col-' + gridCol]">
			<view class="cu-item" v-for="(item,index) in cuIconList" :key="index">
				<view @tap="toPath(item.url)">
					<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]"></view>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
		
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'http://image.lonelysky.com.cn/202004251710.jpg'
				}],
				gridCol: 2,
				gridBorder: false,
				cuIconList: [{
					cuIcon: 'crownfill',
					color: 'red',
					name: '下单订货',
					url:"../index/index?p=product"
				},{
					cuIcon: 'crownfill',
					color: 'red',
					name: '货物物流',
					url:"1241"
				},{
					cuIcon: 'upstagefill',
					color: 'red',
					name: '企业合作',
					url:"124"
				}, {
					cuIcon: 'crownfill',
					color: 'red',
					name: '成为代理',
					url:"124"
				}, ],
			}
		},
		methods: {
			toSearch(e){
				uni.navigateTo({
					url:"../product/search"
				})
			},
			toPath(path){
				if(path.indexOf('index') === -1){
					console.log(path)
				}else{
					uni.redirectTo({
						url:"../index/index?p=product"
					})
				}
				
			}
		}
	}
</script>

<style>

</style>
