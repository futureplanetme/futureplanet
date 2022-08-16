<template>
	<view>
		<tn-nav-bar fixed alpha customBack>
		  <view slot="back" class='tn-custom-nav-bar__back' @click="goBack">
			<text class='icon tn-icon-left tn-color-white'></text><span class="tn-text-sm tn-margin-right-sm">返回主页</span>
		  </view>
		</tn-nav-bar>
		<view class="content" >
		<view class="top tn-text-center tn-text-xl-xxl tn-text-shadow-green" style="padding-top: 150upx; font-weight: bold; color: #128036;"></view>
		<view class="banner">
			<dl>
				<dt><image src="../../static/logo.png" mode=""></image></dt>
				<dd class="tn-text-xl" style="margin-top: 5upx; color: white; font-weight: bold;">FF</dd>
			</dl>
			<view class="img">
				<image :src="qrcode" mode=""></image>
			</view>
			<view class="tgtit" style="margin-top: 30upx; color: yellow;">推广链接：<text class="tugurl tn-text-xs" style="color: white;">{{'https://ffnft.me/#/?r=' + address}}</text></view>
			<view class="sharbuttn">
				<view class="btn tn-cool-bg-color-10--reverse" @tap="toast('请截屏分享！')">保存二维码</view>
				<view class="btn tn-cool-bg-color-10--reverse" @tap="copy('https://ffnft.me/#/?r=' + address)">复制推广链接</view>
			</view>
			
			<!-- <button class="btn" @click="share">分享</button> -->
			<view v-if="false" class="shartitle"><view>分享介绍</view></view>
			<view v-if="false" class="sharapk" @click="share">
				<view><image src="../../static/img/weact.png"></image></view>
				<view><image src="../../static/img/shar.png"></image></view>
				<view><image src="../../static/img/qq.png"></image></view>
			</view>
			
			<view v-if="false" style="margin-top: 40upx;" class="bottom">
				<ul class="tn-margin">
					<li>1、理财导师，根据周业绩拿进单量的 5% ~ 10%</li>
					<li>2、理财总监，拿每周整个进单量的 3%</li>
				</ul>
			</view>
		</view>
		
		</view>
	</view>
</template>

<script>
	import template_page_mixin from '@/libs/mixin/template_page_mixin.js';
	import QR from "@/static/js/wxqrcode.js";
	var _this;
	
	export default {
		mixins: [template_page_mixin],
		data(){
			return {
				providerList:[],				
				sourceLink: 'http://yunzhujiao.cn/bind_pub/index.html',		
				type:0,
				address: "",
				qrcode: "",
			}
		},
		mounted() {
			_this = this;
			_this.qrcode = QR.createQrCodeImg('https://ffnft.me/#/?r=' + this.address.substring(2), {
				size: parseInt(200)
			});
		},
		onLoad(options) {
			this.address = options.addr;
			this.version = plus.runtime.version;
			uni.getProvider({
				service: 'share',
				success: (e) => {
					let data = [];
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '分享到微信好友',
									id: 'weixin'
								})
								data.push({
									name: '分享到微信朋友圈',
									id: 'weixin',
									type: 'WXSenceTimeline'
								})
								break;
							case 'qq':
								data.push({
									name: '分享到QQ',
									id: 'qq'
								})
								break;
							default:
								break;
						}
					}
					this.providerList = data;
				},
				fail: (e) => {
					console.log('获取登录通道失败'+ JSON.stringify(e));
				}
			});
		},
		methods:{
			
			//复制分享链接
			sharurl(){
				uni.setClipboardData({
					data: 'http://sishuquan.com?id=3228969',
					success: function () {
						console.log('success');
						uni.showModal({
							title: '复制成功',
							content: '内容已复制到粘贴板，可前往其他应用粘贴查看。', 
							showCancel:false,
							success: function(res) {
								if (res.confirm) {											 
									//console.log('用户点击确定');
								} else if (res.cancel) {
									//console.log('用户点击取消');
								}
							}
						});
					}
				});
			},
			//保存图片到相册
			save(){
				uni.showActionSheet({
					itemList:['保存图片到相册'],
					success: () => {
						plus.gallery.save('http://pds.jyt123.com/wxtest/logo.png', function() {
							uni.showToast({
								title:'保存成功',
								icon:'none'
							})
						}, function() {
							uni.showToast({
								title:'保存失败，请重试！',
								icon:'none'
							})
						});
					}
				})
			},
			share(e) {
				if (this.providerList.length === 0) {
					uni.showModal({
						title: '当前环境无分享渠道!',
						showCancel: false
					})
					return;
				}
				let itemList = this.providerList.map(function (value) {
					return value.name
				})
				 
				console.log(itemList)
				
				uni.showActionSheet({
					itemList: itemList,
					success: (res) => {
						console.log(this.providerList[res.tapIndex].id)
						if(this.providerList[res.tapIndex].id=='qq'){
							this.type=1
						}else{
							this.type=0
						}
						 uni.share({
						 	provider: this.providerList[res.tapIndex].id,
						 	scene: this.providerList[res.tapIndex].type && this.providerList[res.tapIndex].type === 'WXSenceTimeline' ? 'WXSenceTimeline' : "WXSceneSession",
						 	type: this.type,
						 	title:'耘助教',
						 	summary: '耘助教是一个在线教育应用平台',
						 	imageUrl:'http://pds.jyt123.com/wxtest/logo.png',
						 	href:"https://m3w.cn/uniapp",
						 	success: (res) => {
						 		console.log("success:" + JSON.stringify(res));
						 	},
						 	fail: (e) => {
						 		uni.showModal({
						 			content: e.errMsg,
						 			showCancel:false
						 		})
						 	}
						 });
					}
				})
				
				
				
			 
			},
			openLink() {
				plus.runtime.openWeb(this.sourceLink)
			}
		}
	}
	
	
</script>

<style lang="scss" scoped>
  @import '@/static/css/templatePage/custom_nav_bar.scss';
  /* 悬浮 */
  .login-sussuspension{
    animation: suspension 3s ease-in-out infinite;
  }
  
  @keyframes suspension {
    0%, 100% {
      transform: translate(0 , 0);
    }
    50% {
      transform: translate(0rem , 1rem);
    }
  }
  
  .login {
    position: relative;
    height: 100%;
    z-index: 1;
    
    /* 背景图片 start */
    &__bg {
      z-index: -1;
      position: fixed;
      
      &--top {
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        
        .bg {
          width: 100vw;
          height: 100vh;
          will-change: transform;
        }
      }
      
      /* &--bottom {
        bottom: -10rpx;
        left: 0;
        right: 0;
        width: 100%;
        margin-bottom: env(safe-area-inset-bottom);
        
        image {
          width: 750rpx;
          will-change: transform;
        }
      } */
    }
    /* 背景图片 end */
    
    /* 内容 start */
    &__wrapper {
      margin-top: 403rpx;
      width: 100%;
    }
    
    /* 切换 start */
    &__mode {
      position: relative;
      margin: 0 auto;
      width: 476rpx;
      height: 77rpx;
      background-color: rgba(255,255,255,0.6);
      box-shadow: 0rpx 10rpx 50rpx 0rpx rgba(0, 3, 72, 0.1);
      border-radius: 39rpx;
      
      &__item {
        height: 77rpx;
        width: 100%;
        line-height: 77rpx;
        text-align: center;
        font-size: 31rpx;
        color: #FFFFFF;
        letter-spacing: 1em;
        text-indent: 1em;
        z-index: 2;
        transition: all 0.4s;
        
        &--active {
          font-weight: bold;
          color: #FFFFFF;
        }
      }
      
      &__slider {
        position: absolute;
        height: inherit;
        width: calc(476rpx / 2);
        border-radius: inherit;
        box-shadow: 0rpx 18rpx 72rpx 18rpx rgba(0, 195, 255, 0.1);
        z-index: 1;
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }
    }
    /* 切换 end */
    
    /* 登录注册信息 start */
    &__info {
      margin: 0 30rpx;
      margin-top: 105rpx;
      padding: 30rpx 51rpx;
      padding-bottom: 0;
      border-radius: 20rpx;
      background-color: rgba(255,255,255,0.3);
      box-shadow: 0rpx 10rpx 50rpx 0rpx rgba(0, 3, 72, 0.1);
      
      &__item {
        
        &__input {
          margin-top: 59rpx;
          width: 100%;
          height: 77rpx;
          border: 1rpx solid #E6E6E6;
          border-radius: 39rpx;
          
          &__left-icon {
            width: 10%;
            font-size: 44rpx;
            margin-left: 20rpx;
            color: #FFFFFF;
          }
          
          &__content {
            width: 80%;
            padding-left: 10rpx;
            
            &--verify-code {
              width: 56%;
            }
            
            input {
              font-size: 24rpx;
              // letter-spacing: 0.1em;
            }
          }
          
          &__right-icon {
            width: 10%;
            font-size: 44rpx;
            margin-right: 20rpx;
            color: #AAAAAA;
          }
          
          &__right-verify-code {
            width: 34%;
            margin-right: 20rpx;
          }
        }
        
        &__button {
          margin-top: 75rpx;
          margin-bottom: 39rpx;
          width: 100%;
          height: 77rpx;
          text-align: center;
          font-size: 31rpx;
          font-weight: bold;
          line-height: 77rpx;
          letter-spacing: 1em;
          text-indent: 1em;
          border-radius: 39rpx;
          box-shadow: 1rpx 10rpx 24rpx 0rpx rgba(60, 129, 254, 0.35);
        }
        
        &__tips {
          margin: 30rpx 0;
          color: #AAAAAA;
        }
      }
    }
    /* 登录注册信息 end */
    
    /* 登录方式切换 start */
    &__way {
      margin: 0 auto;
      margin-top: 110rpx;
      
      &__item {
        &--icon {
          width: 77rpx;
          height: 77rpx;
          font-size: 50rpx;
          border-radius: 100rpx;
          margin-bottom: 18rpx;
          position: relative;
          z-index: 1;
          
          &::after {
            content: " ";
            position: absolute;
            z-index: -1;
            width: 100%;
            height: 100%;
            left: 0;
            bottom: 0;
            border-radius: inherit;
            opacity: 1;
            transform: scale(1, 1);
            background-size: 100% 100%;
            background-image: url(https://tnuiimage.tnkjapp.com/cool_bg_image/icon_bg5.png);
          }
        }
      }
    }
    /* 登录方式切换 end */
    /* 内容 end */
    
  }
  
  /deep/.input-placeholder {
    font-size: 24rpx;
    color: #E6E6E6;
  }
  
	.tugurl{
		color: #999;
	}
	.sharbuttn{
		display: flex;
		justify-content: center;
	}
	.shartitle{
		    width: 80%;
			text-align: center;
			margin-left: 10%;
			border-bottom: 1px solid #dddddd;
			position: relative;
			height: 60upx;
	}
	.tgtit{
		text-align: center;
	}
	.shartitle view{
		    height: 50upx;
			line-height: 50upx;
			font-size: 28upx;
			color: #999;
			width: 120upx;
			margin: 32upx auto;
			position: absolute;
			background: #fff;
			left: 50%;
			margin-left: -60upx;
	}
	.sharapk{
	 display: flex;
	 justify-content: center;
	 margin: 20upx auto
	}
	.sharapk view{
		margin: 40upx;
	}
	.sharapk view image{
		height: 80upx;
		width: 80upx;
	}
	.content{
		width: 100%;
		background-color: #ffffff;
	}
	.top{
		width: 100%;
		height: 1600upx;
		background: url(../../static/ffBg.png) no-repeat ;
		background-size:100% ;
		background-position:center center;
	}
	.banner{
		margin-left: 5%;
		width: 90% ;
		background-color: #8bc34a8c;
		border-radius: 60upx;
		margin-top: -1420upx;
		padding: 40upx;
		color: yellow;
		padding-top: 150upx;
		padding-bottom: 150upx;
	}
	.banner dl{
		margin-top: -100upx;
	}
	.banner dl dt{
		text-align: center;
	}
	.banner dl dt image{
		width: 120upx;
		height: 120upx;
		border-radius:50% ;
	}
	.banner dl dd{
		text-align: center;
	}
	.img{
		width: 300upx;
		height: 300upx;
		background-color: red;
		margin: 0 auto;
		margin-top: 60upx;
	}
	.img image{
		width: 100%;
		height: 100%;
	}
	.btn{
		width: 260upx;
		height: 60upx;
		line-height: 60upx;
		margin: 0 auto;
		margin-top: 60upx;
		border-radius: 40upx;
		border: 0;
		font-size: 26upx;
		outline: 0;
		// background: #33b17b;
		color: #FFFFFF;
		text-align: center;
	}
	.bottom{
		width: 100%;
		height: 400upx;
	/* 	background: url(../../static/img/beij.png) no-repeat; */
		background-position:left bottom;/* 设置背景图片位置 */
		background-size: 20%;
	}
	.bottom ul{
		padding-left: 40upx;
		box-sizing: border-box;
	}
	.bottom ul li{
		width: 100%;
		height: 60upx;
	}
</style>
