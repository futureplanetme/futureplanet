<template>
  <view class="template-login">
    <!-- 顶部自定义导航 -->
    <tn-nav-bar fixed alpha customBack>
      <view slot="back" class='tn-custom-nav-bar__back'>
        <text @tap="isModalShow=true" class='icon tn-icon-tips tn-color-red'></text>
        <text @tap="toast('即将支持多语言')" class='icon tn-icon-empty-network tn-color-purple'></text>
		<!-- <view class="tn-margin-sm tn-padding-top-xs">
		  <tn-avatar size="40rpx" src="../../../static/imgs/lang.png"></tn-avatar>
		</view> -->
      </view>
    </tn-nav-bar>
	
	<tn-modal :showCloseBtn="true" :zoom="true" v-model="isModalShow" :custom="true">
	  <view class="tn-radius tn-color-grey tn-text-bold" style="background-image: url(../../../static/imgs/login-top1.png); background-size: 100% 100%;">
		<view style="color: #00000000">.</view>
		<view class="tn-text-center tn-margin-top tn-text-xl tn-color-purple">欢乐转介绍</view>
		<view class="tn-margin-top tn-margin-top-xl">1.<span class="tn-color-black tn-margin-left-sm">参与 1 次，花费 {{ wheelPrice }} HLD</span></view>
		<view class="tn-margin-top">
			<span>2.</span>
			<span class="tn-color-black tn-margin-left-sm">随机抽中 HLD 数量：<span class="tn-color-purple">{{ wheelRewards }}</span></span>
		</view>
		<view class="tn-margin-top">
			<span>3.</span>
			<span class="tn-color-black tn-margin-left-sm">抽中概率（%）：<span class="tn-color-blue">{{ wheelRatios2 }}</span></span>
		</view>
		<view class="tn-margin-top">4.<span class="tn-color-black tn-margin-left-sm">参与 1 次即可分享，分享 N 个有效玩家拿 N 代押注的 {{ (wheelParentRatio * 100).toFixed(0) }}%（最多 {{ wheelParentMax }} 代）</span></view>
		<view class="tn-margin-top">5.<span class="tn-color-black tn-margin-left-sm">提现扣除 {{ (wheelWithdrawFee * 100).toFixed(0) }}% 用于链上的销毁，打包，维护等费用，销毁地址：{{ hiddenAddress(addressWheelDestory) }}</span><span @tap="copy(addressWheelDestory)" class="tn-icon-copy tn-color-purple tn-margin-left-xs"></span></view>
		<view style="color: #00000000">.</view>
	  </view>
	</tn-modal>
	
    <view class="login">
      <!-- 顶部背景图片-->
      <view class="login__bg login__bg--top">
        <image class="bg" src="../../../static/imgs/login_top2.jpg" mode="widthFix"></image>
      </view>
      <view class="login__bg login__bg--top">
        <image class="rocket rocket-sussuspension" src="../../../static/imgs/login_top3.png" mode="widthFix"></image>
      </view>
	  <view class="login__bg login__bg--top" style="margin-top: -25rpx; margin-left: 325rpx;">
	    <!-- <tn-avatar class="rocket rocket-sussuspension" src=""></tn-avatar> -->
		<tn-avatar style="background: transparent !important;" class="rocket rocket-sussuspension" size="100rpx" src="../../../static/logo.png"></tn-avatar>
	  </view>
      
      <view class="login__wrapper">
        <!-- 登录/注册切换 -->
        <view class="login__mode tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-center" style="width: 93%; margin-top: -7.5rem;">
          <view class="login__mode__item tn-flex-1" style="font-weight: bold !important; letter-spacing: 0.15em;" :class="[{'login__mode__item--active': currentModeIndex === 0}]" @tap.stop="modeSwitch(0)">
            开始游戏
          </view>
		  <view class="login__mode__item tn-flex-1" style="font-weight: bold !important; letter-spacing: 0.15em;" :class="[{'login__mode__item--active': currentModeIndex === 1}]" @tap.stop="modeSwitch(1)">
		    奖励管理&nbsp;
		  </view>
          <view class="login__mode__item tn-flex-1" style="font-weight: bold !important; letter-spacing: 0.15em;" :class="[{'login__mode__item--active': currentModeIndex === 2}]" @tap.stop="modeSwitch(2)">
            历史记录&nbsp;
          </view>
          
          <!-- 滑块-->
          <view class="login__mode__slider tn-cool-bg-color-15--reverse" :style="[modeSliderStyle]"></view>
        </view>
		
		<view v-if="currentModeIndex === 0" class="login__info" style="padding: 0.25rem; margin-top: 1.5rem; padding-bottom: 1rem; background-color: #a6e7fb7a;">
			<view class="tn-margin-top-xl tn-text-center tn-text-xl tn-text-bold">
				<demo-title class="tn-color-purple tn-text-bold" :title="(cntUsdtPer * rechargeCnt).toFixed(0) + ' USDT + ' + (cntHldPer * rechargeCnt).toFixed(1) + ' HLD'">
				  <tn-number-box  :min="1" :max="500" v-model="rechargeCnt" backgroundColor="tn-cool-bg-color-2" fontColor="tn-color-red"></tn-number-box>
				  <tn-button @tap="doRecharge()" backgroundColor="tn-cool-bg-color-2" fontColor="tn-color-white" margin="5rpx 25rpx" style="letter-spacing: 0.15em;">定投</tn-button>
				</demo-title>
			</view>
		</view>
		
		<view v-if="currentModeIndex === 1" class="login__info" style="margin-top: 1.5rem; padding-bottom: 1rem; background-color: #58b5f06b;">
          <view class="tn-flex">
            <view class="tn-flex-1 screen-shadow tn-bg-white tn-radius" style="margin: 30rpx 20rpx;padding: 40rpx 0;border-radius: 0.5rem;">
              <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
                <view class="tn-text-center">
                  <view class="tn-text-ellipsis tn-text-xl tn-color-teal--dark" style="color: purple !important; font-weight: bold !important;">总中奖</view>
                  <view class="tn-text-ellipsis tn-color-gray--dark tn-padding-top-sm">{{ (rewardTotal||0).toFixed(2) }}</view>
                </view>
              </view>
            </view>
            <view class="tn-flex-1 screen-shadow tn-bg-white tn-radius" style="margin: 30rpx 20rpx;padding: 40rpx 0;border-radius: 0.5rem;">
              <view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
                <view class="tn-text-center">
                  <view class="tn-text-ellipsis tn-text-xl tn-color-teal--dark" style="color: purple !important; font-weight: bold !important;">总提成</view>
                  <view class="tn-text-ellipsis tn-color-gray--dark tn-padding-top-sm">{{ (bonusTotal||0).toFixed(4) }}</view>
                </view>
              </view>
            </view>
          </view>
          
          <view class="template-about tn-safe-area-inset-bottom">
          	<view class="about__wrap">
          		<view class="about-shadow tn-padding-top-sm tn-padding-bottom-sm">
          			<tn-list-cell :hover="true" :unlined="false" :radius="false" :fontSize="30" style="border-top-left-radius: 0.5rem;border-top-right-radius: 0.5rem;">
          				<view class="tn-flex tn-flex-col-center">
          				  <view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-cool-bg-color-6 tn-color-white"> 
          					<view class="tn-icon-add"></view>
          				  </view>
          				  <view class="tn-margin-left-sm tn-flex-1">邀请人</view>
          				  <view class="tn-margin-left-sm tn-color-blue">{{ joInviter ? hiddenAddress(joInviter.inviter) : "暂无" }}<span v-if="joInviter" @tap="copy(joInviter.inviter)" class="tn-icon-copy tn-color-purple tn-margin-left-xs"></span></view>
          				</view>
          			</tn-list-cell>
          		  <tn-list-cell :hover="true" :unlined="false" :radius="false" :fontSize="30">
          			<view class="tn-flex tn-flex-col-center">
          			  <view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-cool-bg-color-5 tn-color-white" > 
          				<view class="tn-icon-time"></view>
          			  </view>
          			  <view class="tn-margin-left-sm tn-flex-1">总分享</view>
          			  <view class="tn-margin-left-sm tn-color-blue">{{ josChild ? josChild.length : 0 }}</view>
          			</view>
          		  </tn-list-cell>
          		  <tn-list-cell :hover="true" :unlined="false" :radius="false" :fontSize="30">
          			<view class="tn-flex tn-flex-col-center">
          			  <view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-cool-bg-color-1 tn-color-white"> 
          				<view class="tn-icon-power"></view>
          			  </view>
          			  <view class="tn-margin-left-sm tn-flex-1">总提现</view>
          			  <view class="tn-margin-left-sm tn-color-blue">{{ (withdrawTotal||0).toFixed(4) }}</view>
          			</view>
          		  </tn-list-cell>
          		  <tn-list-cell :hover="true" :unlined="true" :radius="false" :fontSize="30" style="border-bottom-left-radius: 0.5rem;border-bottom-right-radius: 0.5rem;">
          			<view class="tn-flex tn-flex-col-center">
          			  <view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-cool-bg-color-2 tn-color-white"> 
          				<view class="tn-icon-my"></view>
          			  </view>
          			  <view class="tn-margin-left-sm tn-flex-1">可提现</view>
          			  <view class="tn-margin-left-sm tn-color-blue">{{ ((rewardTotal||0) + (bonusTotal||0) - (withdrawTotal||0)).toFixed(4) }}<span class="tn-margin-left-xs tn-color-gray">HLD</span></view>
          			</view>
          		  </tn-list-cell>
          		</view>
          	</view>
          </view>
		  
		  <view class="tn-padding-sm">
		  	<view @tap="doWithdraw()" class="login__info__item__button tn-cool-bg-color-15--reverse"  style="margin-top: 0.5rem; letter-spacing: 0.15em;" hover-class="tn-hover" :hover-stay-time="150">余额全部提现</view> 
		  	<view @tap="joInviter && cntUse > 0 ? copy('https://big-wheel.life/#/?from=' + address) : toast('您必须有邀请人，且参与了抽奖')" class="login__info__item__button tn-cool-bg-color-2--reverse" style="margin-top: 0.5rem; letter-spacing: 0.15em;" hover-class="tn-hover" :hover-stay-time="150">复制分享链接</view> 
		  </view>
        
        </view>
      </view>
	  
	  <view v-if="currentModeIndex === 2" class="login__info" style="margin-top: 1.5rem; padding-bottom: 1rem; background-color: #519eec73;">
	      <tn-tabs style="font-weight: bold; border-radius: 0.5rem; margin-bottom: 1rem;" backgroundColor="white" activeColor="purple" :list="fixedList" :current="current" :isScroll="false" :badgeOffset="[20, 50]" @change="tabChange"></tn-tabs>
		  <view v-if="current==0" class="time-line__wrap">
	        <tn-time-line>
	          <block v-for="(item, index) in wheelRecharges" :key="index">
	            <tn-time-line-item v-if="item.status !== 0" :top="2">
	              <template slot="node">
	                <view class="time-line-item__node">
	                  <view class="time-line-item__node--icon tn-icon-gift tn-color-purple tn-text-xl"></view>
	                </view>
	              </template>
	              <template slot="content">
	                <view class="tn-margin-bottom">
	                	<view class="time-line-item__content__time tn-color-purple tn-margin-xs tn-text-bold tn-text" style="margin-left: -3upx;">
	  							【{{ zmoment(item.time).format("yyyy-MM-DD HH:mm:ss") }}】
	  						</view>
	  						<view class="time-line-item__content__title tn-color-black tn-margin-xs">
	  							购买次数：
	  							<span class="tn-color-blue tn-text-bold">{{ (item.cnt || 0).toFixed(0) }}</span>
	  							<span class="tn-color-grey tn-margin-left-xs">次</span>
	  						</view>
	  						<view class="time-line-item__content__title tn-color-black tn-margin-xs">
	  							购买金额：
	  							<span class="tn-color-blue tn-text-bold">{{ (item.amount || 0).toFixed(2) }}</span>
	  							<span class="tn-color-grey tn-margin-left-xs">HLD</span>
	  						</view>
	  						<view class="time-line-item__content__title tn-color-black tn-margin-xs">
	  							购买Hash：
	  							<span class="tn-color-blue tn-text-bold">{{ (item._id && item._id.length > 10) ? hiddenAddress(item._id) : item._id}}</span>
	  							<span @tap="copy(item._id)" class="tn-icon-copy tn-color-purple tn-margin-left-xs"></span>
	  						</view>
	                </view>
	              </template>
	            </tn-time-line-item>
	          </block>
	        </tn-time-line>
	      </view>
		  
		  <view v-if="current==1" class="time-line__wrap">
		    <tn-time-line>
		      <block v-for="(item, index) in wheelRewardsHistory" :key="index">
		        <tn-time-line-item v-if="item.status !== 0" :top="2">
		          <template slot="node">
		            <view class="time-line-item__node">
		              <view class="time-line-item__node--icon tn-icon-gift tn-color-purple tn-text-xl"></view>
		            </view>
		          </template>
		          <template slot="content">
		            <view class="tn-margin-bottom">
		            	<view class="time-line-item__content__time tn-color-purple tn-margin-xs tn-text-bold tn-text" style="margin-left: -3upx;">
							【{{ zmoment(item.time).format("yyyy-MM-DD HH:mm:ss") }}】
						</view>
						<view class="time-line-item__content__title tn-color-black tn-margin-xs">
							中奖金额：
							<span class="tn-color-blue tn-text-bold">{{ (item.cnt || 0).toFixed(2) }}</span>
							<span class="tn-color-grey tn-margin-left-xs">HLD</span>
						</view>
		            </view>
		          </template>
		        </tn-time-line-item>
		      </block>
		    </tn-time-line>
		  </view>
		  
		  <view v-if="current==2" class="time-line__wrap">
		    <tn-time-line>
		      <block v-for="(item, index) in wheelBonus" :key="index">
		        <tn-time-line-item v-if="item.status !== 0" :top="2">
		          <template slot="node">
		            <view class="time-line-item__node">
		              <view class="time-line-item__node--icon tn-icon-gift tn-color-purple tn-text-xl"></view>
		            </view>
		          </template>
		          <template slot="content">
		            <view class="tn-margin-bottom">
		            	<view class="time-line-item__content__time tn-color-purple tn-margin-xs tn-text-bold tn-text" style="margin-left: -3upx;">
							【{{ zmoment(item.time).format("yyyy-MM-DD HH:mm:ss") }}】
						</view>
						<view class="time-line-item__content__title tn-color-black tn-margin-xs">
							提成数量：
							<span class="tn-color-blue tn-text-bold">{{ (item.cnt || 0).toFixed(4) }}</span>
							<span class="tn-color-grey tn-margin-left-xs">HLD</span>
						</view>
						<view v-if="item.flag >= 0" class="time-line-item__content__title tn-color-black tn-margin-xs">
							提成来源：
							<span class="tn-color-grey tn-margin-right-xs">第</span>
							<span class="tn-color-blue tn-text-bold">{{ (item.flag || 0).toFixed(0) }}</span>
							<span class="tn-color-grey tn-margin-left-xs">代</span>
						</view>
						<view v-if="item.flag == -1" class="time-line-item__content__title tn-color-black tn-margin-xs">
							提成来源：
							<span class="tn-color-blue tn-text-bold">销毁分成</span>
						</view>
						<view v-if="item.flag == -2" class="time-line-item__content__title tn-color-black tn-margin-xs">
							提成来源：
							<span class="tn-color-blue tn-text-bold">技术分成</span>
						</view>
						<view v-if="item.flag == -3" class="time-line-item__content__title tn-color-black tn-margin-xs">
							提成来源：
							<span class="tn-color-blue tn-text-bold">项目分成</span>
						</view>
						<view class="time-line-item__content__title tn-color-black tn-margin-xs">
							被邀请人：
							<span class="tn-color-blue tn-text-bold">{{ hiddenAddress(item.src) }}</span>
							<span @tap="copy(item.src)" class="tn-icon-copy tn-color-purple tn-margin-left-xs"></span>
						</view>
		            </view>
		          </template>
		        </tn-time-line-item>
		      </block>
		    </tn-time-line>
		  </view>
		  
		  <view v-if="current==3" class="time-line__wrap">
		    <tn-time-line>
		      <block v-for="(item, index) in wheelWithdraws" :key="index">
		        <tn-time-line-item v-if="item.status !== 0" :top="2">
		          <template slot="node">
		            <view class="time-line-item__node">
		              <view class="time-line-item__node--icon tn-icon-gift tn-color-purple tn-text-xl"></view>
		            </view>
		          </template>
		          <template slot="content">
		            <view class="tn-margin-bottom">
		            	<view class="time-line-item__content__time tn-color-purple tn-margin-xs tn-text-bold tn-text" style="margin-left: -3upx;">
							【{{ zmoment(item.time).format("yyyy-MM-DD HH:mm:ss") }}】
						</view>
						<view class="time-line-item__content__title tn-color-black tn-margin-xs">
							提现数量：
							<span class="tn-color-blue tn-text-bold">{{ (item.cnt || 0).toFixed(2) }}</span>
							<span class="tn-color-grey tn-margin-left-xs">HLD</span>
						</view>
						<view class="time-line-item__content__title tn-color-black tn-margin-xs">
							提现Hash：
							<span class="tn-color-blue tn-text-bold">{{ (item._id && JSON.stringify(item._id).length > 10 && JSON.stringify(item._id).indexOf('0x') >= 0) ? hiddenAddress(item._id) : "链上执行"}}</span>
							<span v-if="item._id && item._id.length > 10" @tap="copy(item._id)" class="tn-icon-copy tn-color-purple tn-margin-left-xs"></span>
						</view>
						<view class="time-line-item__content__title tn-color-black tn-margin-xs">
							收款Hash：
							<span class="tn-color-blue tn-text-bold">{{ (item.hash && item.hash.length > 10) ? hiddenAddress(item.hash) : (item.hash ? item.hash : "链上执行")}}</span>
							<span v-if="item.hash && item.hash.length > 10" @tap="copy(item.hash)" class="tn-icon-copy tn-color-purple tn-margin-left-xs"></span>
						</view>
		            </view>
		          </template>
		        </tn-time-line-item>
		      </block>
		    </tn-time-line>
		  </view>
		  
		  <view v-if="current==4" class="time-line__wrap">
		    <tn-time-line>
		      <block v-for="(item, index) in josChild" :key="index">
		        <tn-time-line-item v-if="item.status !== 0" :top="2">
		          <template slot="node">
		            <view class="time-line-item__node">
		              <view class="time-line-item__node--icon tn-icon-gift tn-color-purple tn-text-xl"></view>
		            </view>
		          </template>
		          <template slot="content">
		            <view class="tn-margin-bottom">
		            	<view class="time-line-item__content__time tn-color-purple tn-margin-xs tn-text-bold tn-text" style="margin-left: -3upx;">
							【{{ zmoment(item.time).format("yyyy-MM-DD HH:mm:ss") }}】
						</view>
						<view class="time-line-item__content__title tn-color-black tn-margin-xs">
							被邀请人：
							<span class="tn-color-blue tn-text-bold">{{ hiddenAddress(item._id) }}</span>
							<span @tap="copy(item._id)" class="tn-icon-copy tn-color-purple tn-margin-left-xs"></span>
						</view>
		            </view>
		          </template>
		        </tn-time-line-item>
		      </block>
		    </tn-time-line>
		  </view>
	    
	    </view>
	  </view>
      
      
      <!-- 底部背景图片-->
      <view class="login__bg login__bg--bottom">
        <image src="../../../static/imgs/login_bottom_bg.jpg" mode="widthFix"></image>
      </view>
    </view>
  </view>
</template>

<script>
  import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
  import demoTitle from '@/libs/components/demo-title.vue'
  
  var _this;
  var web3;
  var web3Provider;
  var usdtContract;
  
  export default {
    name: 'login-demo-1',
    mixins: [template_page_mixin],
	components: {demoTitle},
    data() {
      return {
        currentModeIndex: 0,
        modeSliderStyle: {
          left: 0
        },
		address: "",
		batchJo: {"historyMy": []},
		isModalShow: false,
		rechargeTotal: 0,
		cntTotal: 0,
		wheelRecharges: [],
		rewardTotal: 0,
		cntUse: 0,
		wheelRewardsHistory: [],
		bonusTotal: 0,
		wheelBonus: [],
		withdrawTotal: 0,
		wheelWithdraws: [],
		joInviter: {},
		josChild: [],
		addressWheelRecharge: "",
		addressWheelWithdraw: "",
		wheelPrice: 0,
		wheelRewards: [],
		wheelRatios: [],
		wheelRatios2: [],
		wheelParentMax: 0,
		wheelParentRatio: 0,
		wheelWithdrawFee: 0,
		addressWheelDestory: "",
		addressTo: "",
		fixedList: [
		  {name: '购买', count: 0},
		  {name: '中奖'},
		  {name: '提成'},
		  {name: '提现'},
		  {name: '分享'}
		],
		current: 0,
		awardList: [],
		
		addressLiquidityRecharge: '0xB0ADa16F7ace83fCcA249916C7334ecF301082aE',
		cntUsdt: 0,
		cntHld: 0,
		cntUsdtPer: 200.0,
		cntHldPer: 29.6,
		rechargeCnt: 1,
      }
    },
	onLoad(option) {
		if (option.a && option.a.length == 42) {
			this.addressTo = option.a;
			console.log("addressToOld: " + this.addressTo);
		}
		if (option.from && option.from.length == 42) {
			this.addressTo = option.from;
			console.log("addressTo: " + this.addressTo);
		}
	},
	mounted() {
		_this = this;
		
		let Web3 = require('web3');
		if (window.ethereum) {
			web3Provider = window.ethereum;
			try {
				window.ethereum.enable();
			} catch (error) {
				console.error("User denied account access")
			}
		}
		web3 = new Web3(web3Provider);
		web3.eth.getAccounts(function(error, result) {
			if (!error) {
				_this.address = result[0];
				
				var usdtContractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"tokenOwner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"delegate","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"delegate","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"buyer","type":"address"},{"internalType":"uint256","name":"numTokens","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
				usdtContract = new web3.eth.Contract(usdtContractAbi, '0x672591B938e3bc046Cf60C4DAf0f73316B9C2958', {});
				usdtContract.methods.balanceOf(_this.address).call({}, function(error, result) {
					if (!error) {
						_this.cntUsdt = result / 1000000;
						console.log("cntUsdt: " + _this.cntUsdt);
					} else {
						console.log(error);
					}
				});
				
				web3.eth.getBalance(_this.address).then(function(resultIn){
					_this.cntHld = resultIn / 1000000000000000000;
					console.log("cntHld: " + _this.cntHld);
				});
				
				uni.request({
					url: "https://hld-api.ours.pro/wheel/info?address=" + _this.address + "&addressTo=" + (_this.addressTo != "" ? _this.addressTo : _this.address),
					method: 'GET',
					header: {
						'content-type': 'application/x-www-form-urlencoded',
					},
					data: {},
					success: (res) => {
						if (res.data.code == 10000) {
							_this.rechargeTotal = res.data.data.rechargeTotal;
							_this.cntTotal = res.data.data.cntTotal;
							_this.wheelRecharges = res.data.data.wheelRecharges;
							_this.fixedList[0].count = _this.wheelRecharges.length;
							_this.rewardTotal = res.data.data.rewardTotal;
							_this.cntUse = res.data.data.cntUse;
							_this.wheelRewardsHistory = res.data.data.wheelRewardsHistory;
							_this.bonusTotal = res.data.data.bonusTotal;
							_this.wheelBonus = res.data.data.wheelBonus;
							_this.withdrawTotal = res.data.data.withdrawTotal;
							_this.wheelWithdraws = res.data.data.wheelWithdraws;
							_this.joInviter = res.data.data.joInviter;
							_this.josChild = res.data.data.josChild;
							_this.addressWheelRecharge = res.data.data.addressWheelRecharge;
							_this.addressWheelWithdraw = res.data.data.addressWheelWithdraw;
							_this.wheelPrice = res.data.data.wheelPrice;
							_this.wheelRewards = res.data.data.wheelRewards;
							for (var inx = 0; inx < _this.wheelRewards.length; inx++) {
								// _this.awardList[inx].text = _this.wheelRewards[inx];
							}
							_this.wheelRatios = res.data.data.wheelRatios;
							var ratioTotal = 0;
							for (var inx = 0; inx < _this.wheelRatios.length; inx++) {
								ratioTotal += _this.wheelRatios[inx];
							}
							for (var inx = 0; inx < _this.wheelRatios.length; inx++) {
								_this.wheelRatios2[inx] = parseFloat((_this.wheelRatios[inx] * 100 / ratioTotal).toFixed(2));
							}
							_this.wheelParentMax = res.data.data.wheelParentMax;
							_this.wheelParentRatio = res.data.data.wheelParentRatio;
							_this.wheelWithdrawFee = res.data.data.wheelWithdrawFee;
							_this.addressWheelDestory = res.data.data.addressWheelDestory;
							
							_this.priceRef();
						}
					}
				});
				
				console.log("connect: " + _this.address);
			} else {
				console.log(error);
			}
		});
	},
    watch: {
      currentModeIndex(value) {
        const sliderWidth = uni.upx2px(476 / 2)
        this.modeSliderStyle.left = `${sliderWidth * value}px`
      }
    },
    methods: {
      // 切换模式
      modeSwitch(index) {
        this.currentModeIndex = index
        this.showPassword = false
      },
	  doRecharge() {
		  _this.priceRef();
		  
		  var cntUsdtNeed = _this.rechargeCnt * _this.cntUsdtPer;
		  if (cntUsdtNeed > _this.cntUsdt) {
		  	_this.toast('您的 USDT 余额不足');
		  	return;
		  }
		  
		  var cntHldNeed = _this.rechargeCnt * _this.cntHldPer;
		  if (cntHldNeed > _this.cntHld - 0.015) {
		  	_this.toast('您的 HLD 余额不足');
		  	return;
		  }
		  
		  var message = {
		  	from: _this.address,
		  	gasLimit: 200000,
		  	gasPrice: web3.utils.toWei('36.6', 'gwei'),
		  	value: '0x',
		  };
		  usdtContract.methods.transfer(_this.addressLiquidityRecharge, 
		  	web3.utils.toWei(cntUsdtNeed + "", 'mwei')).send(message, function(err, res) {
		  	if (!err) {
		  		var extraStr = res;
		  		var extra="";
		  		for(var i = 0; i < extraStr.length; i++){
		  			extra += extraStr.charCodeAt(i).toString(16);
		  		}
		  		var messageIn = {
		  			from: _this.address,
		  			to: _this.addressLiquidityRecharge,
		  			value: web3.utils.toWei(cntHldNeed.toFixed(9), 'ether'),
		  			gasLimit: 200000,
		  			gasPrice: web3.utils.toWei('36.6', 'gwei'),
		  			data: extra
		  		};
		  		web3.eth.sendTransaction(messageIn, (errIn, resIn) => {
		  			if (!errIn) {
		  				_this.toast('定投成功');
		  				console.log(resIn);
		  			} else {
		  				console.log(errIn);
		  			}
		  		});
				console.log(res);
		  	} else {
		  		console.log(err);
		  	}
		  });
	  },
	  tabChange(index) {
	    this.current = index;
		for (var i = 0; i < _this.fixedList.length; i++) {
			if (i == index) {
				if (index == 0) {
					_this.fixedList[i].count = _this.wheelRecharges.length;
				} else if (index == 1) {
					_this.fixedList[i].count = _this.wheelRewardsHistory.length;
				} else if (index == 2) {
					_this.fixedList[i].count = _this.wheelBonus.length;
				} else if (index == 3) {
					_this.fixedList[i].count = _this.wheelWithdraws.length;
				} else if (index == 4) {
					_this.fixedList[i].count = _this.josChild.length;
				}
			} else {
				delete _this.fixedList[i].count;
			}
		}
	  },
	  doWithdraw() {
		  var cnt = _this.rewardTotal + _this.bonusTotal - _this.withdrawTotal - 0.0001;
		  if (cnt <= 0) {
			_this.toast('您的可提余额不足');
			return;
		  }
		  if (_this.cntHld < 0.01) {
			_this.toast('您的 HLD 手续费不足');
			return;
		  }
		  var extraStr = cnt + "";
		  var extra="";
		  for(var i = 0; i < extraStr.length; i++){
			extra += extraStr.charCodeAt(i).toString(16);
		  }
		  var message = {
			from: _this.address,
			to: _this.addressWheelWithdraw,
			value: web3.utils.toWei('0.005', 'ether'),
			gasLimit: 200000,
			gasPrice: web3.utils.toWei('36.6', 'gwei'),
			data: extra
		  };
		  web3.eth.sendTransaction(message, (err, res) => {
			if (!err) {
				_this.toast('提现成功');
				console.log(res);
			} else {
				console.log(err);
			}
		  });
	  },
	  priceRef() {
		uni.request({
			url: "https://hld-api.ours.pro/swap/prices?address=" + _this.address,
			method: 'GET',
			header: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			data: {},
			success: (res) => {
				if (res.data.code == 10000) {
					_this.cntHldPer = _this.cntUsdtPer / res.data.data['0x846091c5DB00cF432CA0f64A9110447b53060734'.toLowerCase()];
					console.log("hldPrice: " + _this.cntHldPer);
				}
			}
		});  
	  },
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/static/css/templatePage/custom_nav_bar.scss';
  /* 悬浮 */
  .rocket-sussuspension{
    animation: suspension 3s ease-in-out infinite;
  }
  
  @keyframes suspension {
    0%, 100% {
      transform: translate(0 , 0);
    }
    50% {
      transform: translate(-0.8rem , 1rem);
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
          width: 750rpx;
          will-change: transform;
        }
        .rocket {
          margin: 50rpx 28%;
          width: 400rpx;
          will-change: transform;
        }
      }
      
      &--bottom {
        bottom: -10rpx;
        left: 0;
        right: 0;
        width: 100%;
        // height: 144px;
        margin-bottom: env(safe-area-inset-bottom);
        
        image {
          width: 750rpx;
          will-change: transform;
        }
      }
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
      background-color: #FFFFFF;
      box-shadow: 0rpx 10rpx 50rpx 0rpx rgba(0, 3, 72, 0.1);
      border-radius: 39rpx;
      
      &__item {
        height: 77rpx;
        width: 100%;
        line-height: 77rpx;
        text-align: center;
        font-size: 31rpx;
        color: #908f8f;
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
      background-color: #ffff;
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
            color: #AAAAAA;
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
            background-image: url(../../../static/imgs/icon_bg5.png);
          }
        }
      }
    }
    /* 登录方式切换 end */
    /* 内容 end */
    
  }
  
</style>
