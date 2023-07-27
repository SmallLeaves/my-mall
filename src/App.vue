<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			_initTabBar(menu){
				(menu.tabBarList.list).map((item,_index) => {
					uni.setTabBarItem({
						index:_index,
						text: item.name,
						iconPath:item.imgList[0],
						selectedIconPath:item.imgList[1],
						pagePath:item.link
					})
				})
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
