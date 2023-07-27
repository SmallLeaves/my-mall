<template>
	<view class="content">
		首页
	</view>
</template>

<script>
	import { homeData } from "@/api/home";
	const app = getApp();
	
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			this._getHomeData();
		},
		methods: {
			async _getHomeData(){
				const {status, data, msg} = await homeData();
				console.log("getHomeData的结果", status, data,msg);
				console.log(this.API_STATUS_CODE)
				if(status === this.API_STATUS_CODE.SUCCESS){
					console.log("getHomeData的结果", data);
					 app._initTabBar(data.tabBar.default)
				}else{
					console.log("请求失败")
					uni.showToast({
						title:msg,
						icon:"none",
						duration:3000
					})
				}
			}
		}
	}
</script>

<style>
	
</style>
