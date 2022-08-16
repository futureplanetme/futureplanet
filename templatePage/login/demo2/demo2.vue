<template>
	<view class="template-login2">
		<tn-nav-bar class="tn-text-xxl" fixed alpha customBack>
			<text @tap="goto('desc')" slot="back" class='tn-margin-top icon tn-icon-help tn-color-white'></text>
			<tn-tag @tap="copy(address)" style="margin-right: 30upx;" slot="right" shape="circle" width="200rpx"
				:plain="true" backgroundColor="#bbbbbe" fontColor="white">{{hiddenAddress(address)}}</tn-tag>
			<tn-tag @tap="cntTotal >= futureBuyPrices[0] && joInviter ? (isShowInvite=true) : toast('有上级的节点才可邀请')" slot="right" shape="circle" width="150rpx" :plain="false"
				backgroundColor="tn-cool-bg-color-17" fontColor="white">{{t('Invite')}}</tn-tag>
			<text @tap="langSwitch()" slot="right" class='tn-margin icon tn-icon-empty-network tn-color-white'></text>
		</tn-nav-bar>

		<canvas canvas-id="star_canvas" class="mycanvas"
			:style="'width:' + screenWidth + 'px; height:' + screenHeight + 'px;'"></canvas>
			
		<view class="tn-margin-left-sm tn-margin-right-sm" style="padding-top: 100upx;">
		  <tn-notice-bar class="tn-round" :show="true" :list="list" :speed="'120'"
				:rightIcon="true" :fontSize="34" :leftIconSize="40" :rightIconSize="40"
				backgroundColor="#1c1947" fontColor="white" @close="toast('aaab')"></tn-notice-bar>
		</view>
			
		<view :style="t3() == 'zh' ? 'left: 22.5%;' : 'left: 8%;'" style="position: absolute; text-align: center; z-index: 9999; top: 210upx;">
			<tn-avatar style="background-color: transparent;" size="140rpx" :src="'../../../static/logo.png'"></tn-avatar>
			<view class="tn-text-bold" style="color: #f28b03;">Futrue planet</view>
			
			<view v-if="t3() == 'zh'" class="animate seven tn-margin-top">
				<span class="ztcp">未</span>
				<span class="ztcp">来</span>
				<span class="ztcp">星</span>
				<span class="ztcp">球</span>
			</view>
			
			<view v-if="t3() == 'en'" class="animate seven tn-margin-top">
				<span class="ztcp">F</span>
				<span class="ztcp">u</span>
				<span class="ztcp">t</span>
				<span class="ztcp">u</span>
				<span class="ztcp">r</span>
				<span class="ztcp">e</span>
				<span class="tn-margin"> </span>
				<span class="ztcp">P</span>
				<span class="ztcp">l</span>
				<span class="ztcp">a</span>
				<span class="ztcp">n</span>
				<span class="ztcp">e</span>
				<span class="ztcp">t</span>
			</view>
		</view>
		
		<cover-image style="position: relative; padding-top: 75upx;" src="../../../static/top.png"></cover-image>
		
		<tn-landscape :show="isShowInvite" :closeBtn="true" :closeColor="''" :closeSize="0" :closePosition="'rightTop'"
			:closeTop="50" :closeRight="50" :closeBottom="0" :closeLeft="0" :mask="true" :maskCloseable="true"
			@close="isShowInvite=false">
			<view class="tn-text-center tn-margin tn-padding-xl"
				style="min-width: 600upx; border: 1px solid #bbbbbe; background-color: #1c1947; border-radius: 20upx;">
				<tki-qrcode ref="qrcode" :val="'https://futureplanet.me/#/?ref=' + address" :size="250"
					:icon="'../../../static/logo.png'" :iconSize="50" :onval="true" :loadMake="true"
					:usingComponents="true" :showLoading="true" :loadingText="t('Reward Loading')" />
				<view class="tn-margin-xl" style="color: #bbbbbe; width: 100%;">{{t('Invite Link')}}：<text
						class="tugurl tn-text-xs"
						style="color: white;">{{'https://futureplanet.me/#/?ref=' + hiddenAddress(address)}}</text></view>
				<view class="tn-flex" style="justify-content: center;">
					<tn-button @tap="isShowInvite=false;toast(t('Cut Screen'))" backgroundColor="tn-cool-bg-color-18"
						fontColor="tn-color-white" style="letter-spacing: 0.15em; margin-right: 20upx;">
						{{t('Save Qrcode')}}</tn-button>
					<tn-button @tap="isShowInvite=false;copy('https://futureplanet.me/#/?ref=' + address)"
						backgroundColor="tn-cool-bg-color-17" fontColor="tn-color-white"
						style="letter-spacing: 0.15em;">{{t('Copy Share Address')}}</tn-button>
				</view>
			</view>
		</tn-landscape>

		<view class="login tn-padding-xl" style="margin-top: -75upx; background-color: #14152d; border-radius: 40upx;">
			<view class="tn-flex tn-flex-direction-column tn-flex-col-center tn-flex-row-center">
				<block>
					<view
						v-if="vipLevel != 2 && futureEndtime > 0"
						style="text-align: center; width: 100%; background-color: #1c1947; color: #2287D7; border-radius: 40upx;"
						class="tn-text-bold tn-margin-top-xs tn-padding">
						
						<demo-title
							style="width: 100%; color: #2287D7; border-radius: 40upx; margin-top: -20upx; margin-bottom: -20upx;"
							class="tn-text-bold"
							:title="t('Join Node')">
						</demo-title>
						
						<view v-if="false" class="tn-margin-top tn-text-center zyl-clock" style="background-color: transparent; justify-content: center;">
							<tn-count-down :timestamp="futureEndtime / 1000" :hideZeroDay="true" :showBorder="false"  separator="cn"
							backgroundColor="transparent" fontColor="#FFFFFF" separatorColor="transparent"
							:fontSize="50" :separatorSize="35"></tn-count-down>
						</view>
							
						<view v-if="!joInviter" class="tn-padding-top-xs" style="width: 100%; align-items: center;">
							<input v-model="addrRef" class="tn-margin-sm tn-text-center tn-padding-xs tn-color-white"
								style="height: 60upx; border: 2upx solid #9bd5ec; border-radius: 16upx;"
								:placeholder="t('Please Enter Inviter Address')"></input>
						</view>
						
						<tn-radio-group class="tn-margin-top-sm" v-model="radioVal" :width="'auto'" :wrap="false" @change="radioGroupChange">
						  <tn-radio :activeColor="radioColors[index]" v-for="(item, index) in futureBuyPrices" :key="index" :name="index" v-if="radioShows[index]">
							  <span class="tn-text-sm" :style="'color: white;'">{{ radioDescs[index] }}</span></tn-radio>
						</tn-radio-group>

						<view class="tn-flex tn-margin" style="justify-content: center;text-align: center;">
							<view class="tn-margin-left-xs tn-margin-right-xs" style="color: #bbbbbe;">{{t('Consume')}}
							</view>
							<view class="tn-color-white">
								{{ futureBuyPrices[radioVal] }}
							</view>
							<view class="tn-margin-left-xs" style="color: #f28b03;">USDT</view>
						</view>

						<view class="tn-margin" style="text-align: center;">
							<tn-button @tap="doBuy()" backgroundColor="tn-cool-bg-color-17" fontColor="tn-color-white"
								style="letter-spacing: 0.15em;">{{ vipLevel == -1 ? t('Join') : t('Upgrade')}}</tn-button>
						</view>
					</view>

					<view style="width: 100%;"
						class="tn-info__container tn-flex tn-flex-wrap tn-flex-col-center tn-flex-row-between">
						<block v-for="(item, index) in tuniaoData" :key="index">
							<view style="background-color: #1c1947;"
								class="tn-info__item tn-flex tn-flex-direction-row tn-flex-col-center tn-flex-row-between about-shadow">
								<view
									class="tn-info__item__left tn-flex tn-flex-direction-row tn-flex-col-center tn-flex-row-left">
									<view style="width: 40upx; height: 40upx;"
										class="tn-info__item__left--icon tn-flex tn-flex-col-center tn-flex-row-center"
										:class="[`${item.color}`]">
										<view :class="[`tn-icon-${item.icon}`]"></view>
									</view>
									<view class="tn-info__item__left__content">
										<view class="tn-info__item__left__content--title tn-text-sm"
											style="color: #bbbbbe;">{{ item.title }}</view>
										<view
											class="tn-info__item__left__content--data tn-padding-top-xs tn-color-white tn-text-bold">
											{{ (item.value||'') }}<span class="tn-margin-left-xs tn-text-sm"
												style="color: #f28b03;">{{ item.value2 }}</span></view>
									</view>
								</view>
							</view>
						</block>
					</view>

					<view class="tn-padding-top-xs tn-margin-top" style="width: 100%;">
						<tn-list-view :card="true" :title="t('My Data')" backgroundColor="#1c1947" fontColor="#2287D7">
						</tn-list-view>
						<!-- <tn-list-cell style="background-color: #261f6d;">
							<view class="list-icon-text">
							  <view class="list__left tn-flex tn-flex-col-center">
								<tn-avatar size="40rpx" :src="'../../../static/bnb.png'"></tn-avatar>
								<view class="list__left__text tn-margin-left-sm" style="color: #bbbbbe;">BNB {{t('Amount')}}</view>
							  </view>
							  <view class="list__right tn-flex">
								<view class="tn-text-sm tn-color-white tn-text-bold">{{(cntBnb||0).toFixed(4)}}</view>
								<view class="tn-text-sm tn-margin-left-xs tn-text-bold" style="color: #f28b03;">BNB</view>
							  </view>
							</view>
						</tn-list-cell>
						<tn-list-cell style="background-color: #261f6d;">
							<view class="list-icon-text">
							  <view class="list__left tn-flex tn-flex-col-center">
								<tn-avatar size="40rpx" :src="'../../../static/busdt.png'"></tn-avatar>
								<view class="list__left__text tn-margin-left-sm" style="color: #bbbbbe;">USDT {{t('Amount')}}</view>
							  </view>
							  <view class="list__right tn-flex">
								<view class="tn-text-sm tn-color-white tn-text-bold">{{(cntUsdt||0).toFixed(4)}}</view>
								<view class="tn-text-sm tn-margin-left-xs tn-text-bold" style="color: #f28b03;">USDT</view>
							  </view>
							</view>
						</tn-list-cell> -->
						<tn-list-cell style="background-color: #261f6d;">
							<view class="list-icon-text">
								<view class="list__left tn-flex tn-flex-col-center">
									<view class="list__left__icon tn-icon-vip tn-cool-bg-color-16 tn-text-xl tn-round">
									</view>
									<view class="list__left__text tn-margin-left-sm" style="color: #bbbbbe;">
										{{t('Vip Level')}}</view>
								</view>
								<view class="list__right tn-flex tn-flex-row-left">
									<view class="tn-color-white tn-text-bold">{{vipLevel < 0 ? t('None') : radioDescs[vipLevel]}}</view>
									<view class="tn-text-sm tn-margin-left-xs tn-text-bold" style="color: #f28b03;"></view>
								</view>
							</view>
						</tn-list-cell>
						<tn-list-cell style="background-color: #261f6d;">
							<view class="list-icon-text">
								<view class="list__left tn-flex tn-flex-col-center">
									<view class="list__left__icon tn-icon-money tn-cool-bg-color-15 tn-text-xl tn-round">
									</view>
									<view class="list__left__text tn-margin-left-sm" style="color: #bbbbbe;">
										{{t('Invite Reward')}}</view>
								</view>
								<view class="list__right tn-flex tn-flex-row-left" style="align-items: center;">
									<view class="tn-color-white tn-text-bold">{{(bonusTotal - withdrawTotal).toFixed(0)}}</view>
									<view class="tn-text-sm tn-margin-left-xs tn-text-bold" style="color: #f28b03;">
										USDT</view>
									<tn-button v-if="bonusTotal - withdrawTotal > 0.0001" @tap="doWithdraw()" backgroundColor="tn-cool-bg-color-17" fontColor="tn-color-white tn-text-xs"
										style="margin-left: 10upx; letter-spacing: 0.15em; height: 40upx; padding: 10upx;">{{t('Withdraw')}}</tn-button>
								</view>
							</view>
						</tn-list-cell>
						<tn-list-cell style="background-color: #261f6d;">
							<view class="list-icon-text">
								<view class="list__left tn-flex tn-flex-col-center">
									<view
										class="list__left__icon tn-icon-my-fill tn-cool-bg-color-14 tn-text-xl tn-round">
									</view>
									<view class="list__left__text tn-margin-left-sm" style="color: #bbbbbe;">
										{{t('Inviter')}}</view>
								</view>
								<view class="list__right tn-flex tn-flex-row-left">
									<view class="tn-color-white tn-text-bold">
										{{joInviter ? hiddenAddress(joInviter.inviter) : t('None')}}</view>
									<view @tap="copy(joInviter.inviter)"
										class="tn-icon-copy tn-margin-left-xs tn-text-bold" style="color: #f28b03;">
									</view>
								</view>
							</view>
						</tn-list-cell>
						<tn-list-cell style="background-color: #261f6d;">
							<view class="list-icon-text">
								<view class="list__left tn-flex tn-flex-col-center">
									<view
										class="list__left__icon tn-icon-my-add tn-cool-bg-color-13 tn-text-xl tn-round">
									</view>
									<view class="list__left__text tn-margin-left-sm" style="color: #bbbbbe;">
										{{t('Be Invite')}}</view>
								</view>
								<view class="list__right tn-flex tn-flex-row-left">
									<view class="tn-color-white tn-text-bold">
										{{josChild ? josChild.length : 0}}</view>
									<!-- <view class="tn-icon-right tn-margin-left-xs tn-text-bold" style="color: #f28b03;"></view> -->
								</view>
							</view>
						</tn-list-cell>
						<tn-list-cell style="background-color: #261f6d; border-bottom-left-radius: 20upx; border-bottom-right-radius: 20upx;">
							<view class="list-icon-text">
								<view class="list__left tn-flex tn-flex-col-center">
									<tn-avatar style="margin-left: -10upx; margin-right: -5upx; background-color: transparent;" size="50rpx"
										:src="'../../../static/logo.png'"></tn-avatar>
									<view class="list__left__text tn-margin-left-sm" style="color: #bbbbbe;">
										{{t('FUR Contract')}}</view>
								</view>
								<view class="list__right tn-flex tn-flex-row-left">
									<view class="tn-color-white tn-text-bold">
										{{hiddenAddress('0xA95eD66A1192e5C09cff2a6bDA480D4DECdB7013')}}</view>
									<view @tap="copy('0xA95eD66A1192e5C09cff2a6bDA480D4DECdB7013')"
										class="tn-icon-copy tn-margin-left-xs tn-text-bold" style="color: #f28b03;">
									</view>
								</view>
							</view>
						</tn-list-cell>
						<!-- <tn-list-cell
							style="background-color: #261f6d; border-bottom-left-radius: 20upx; border-bottom-right-radius: 20upx;">
							<view class="list-icon-text">
								<view class="list__left tn-flex tn-flex-col-center">
									<view
										class="list__left__icon tn-icon-filter tn-cool-bg-color-8 tn-text-xl tn-round">
									</view>
									<view class="list__left__text tn-margin-left-sm" style="color: #bbbbbe;">NFT
										{{t('Progress')}}</view>
								</view>
								<view class="list__right">
									<view style="width: 150%; margin-left: -50%;"
										class="time-line-item__content__title tn-color-black">
										<tn-line-progress activeColor="#f28b03" inactiveColor="#bbbbbe"
											:percent="parseInt(10000 * (josChild.length / 1000)) / 100"
											:striped="true" :showPercent="true"></tn-line-progress>
									</view>
								</view>
							</view>
						</tn-list-cell> -->
					</view>
				</block>
				
				<view class="tn-margin-xl tn-padding" style="text-align: center;">
					<tn-button @tap="gotoLink('https://pancakeswap.finance/swap?inputCurrency=0x55d398326f99059fF775485246999027B3197955&outputCurrency=0xA95eD66A1192e5C09cff2a6bDA480D4DECdB7013')" backgroundColor="tn-cool-bg-color-17" fontColor="tn-color-white"
						style="letter-spacing: 0.15em;">{{ t('FUR Exchange')}}</tn-button>
				</view>

				<demo-title v-if="josChild.length > 0" style="width: 100%; color: #2287D7; background-color: #1c1947; border-radius: 40upx;"
					class="tn-text-bold tn-margin-top-xl" :title="t('Invite History')">
					<view class="time-line__wrap tn-padding">
						<tn-time-line>
							<block v-for="(item, index) in josChild" :key="index">
								<tn-time-line-item v-if="item.status !== 0" :top="2">
									<template slot="node">
										<view class="time-line-item__node">
											<view class="time-line-item__node--icon tn-icon-gift tn-text-xl"
												style="color: #2287D7;"></view>
										</view>
									</template>
									<template slot="content">
										<view class="tn-margin-bottom">
											<view
												class="time-line-item__content__time tn-margin-xs tn-text-bold tn-text"
												style="margin-left: -3upx; color: #2287D7;">
												【{{ zmoment(item.time).format("yyyy-MM-DD HH:mm:ss") }}】
											</view>
											<view class="time-line-item__content__title tn-margin-xs"
												style="color: #bbbbbe;">
												{{t('Vip Level')}}：
												<span
													class="tn-color-white tn-text-bold">{{item.cnt >= futureBuyPrices[2] ? radioDescs[2] : (item.cnt >= futureBuyPrices[1] ? radioDescs[1] : (item.cnt >= futureBuyPrices[0] ? radioDescs[0] : t('None')))}}</span>
												<span class="tn-margin-left-xs tn-text-bold"
													style="color: #f28b03;"></span>
											</view>
											<view v-if="item&&item._id"
												class="time-line-item__content__title tn-margin-xs"
												style="color: #bbbbbe;">
												{{t('Be Invite')}}：
												<span
													class="tn-color-white tn-text-bold">{{ hiddenAddress(item._id) }}</span>
												<span @tap="copy(item._id)"
													class="tn-icon-copy tn-text-bold tn-margin-left-xs"
													style="color: #f28b03;"></span>
											</view>
										</view>
									</template>
								</tn-time-line-item>
							</block>
						</tn-time-line>
					</view>
				</demo-title>

				<demo-title v-if="sharks.length > 0" style="width: 100%; color: #2287D7; background-color: #1c1947; border-radius: 40upx;"
					class="tn-text-bold tn-margin-top-xl" :title="t('Join History')">
					<view class="time-line__wrap tn-padding">
						<tn-time-line>
							<block v-for="(item, index) in sharks" :key="index">
								<tn-time-line-item v-if="item.status !== 0" :top="2">
									<template slot="node">
										<view class="time-line-item__node">
											<view class="time-line-item__node--icon tn-icon-gift tn-text-xl"
												style="color: #2287D7;"></view>
										</view>
									</template>
									<template slot="content">
										<view class="tn-margin-bottom">
											<view
												class="time-line-item__content__time tn-margin-xs tn-text-bold tn-text"
												style="margin-left: -3upx; color: #2287D7;">
												【{{ zmoment(item.time).format("yyyy-MM-DD HH:mm:ss") }}】
											</view>
											<view class="time-line-item__content__title tn-margin-xs"
												style="color: #bbbbbe;">
												{{t('Join Cnt')}}：
												<span
													class="tn-color-white tn-text-bold">{{ (item.cnt || 0) }}</span>
												<span class="tn-margin-left-xs tn-text-bold"
													style="color: #f28b03;">USDT</span>
											</view>
											<view class="time-line-item__content__title tn-margin-xs"
												style="color: #bbbbbe;">
												{{t('Join Type')}}：
												<span
													class="tn-color-white tn-text-bold">{{radioDescs[futureBuyPrices.indexOf(item.cnt)]}}</span>
											</view>
											<view v-if="item.inviter"
												class="time-line-item__content__title tn-margin-xs"
												style="color: #bbbbbe;">
												{{t('Bind Inviter')}}：
												<span
													class="tn-color-white tn-text-bold">{{ hiddenAddress(item.inviter) }}</span>
												<span @tap="copy(item.inviter)"
													class="tn-icon-copy tn-text-bold tn-margin-left-xs"
													style="color: #f28b03;"></span>
											</view>
											<view class="time-line-item__content__title tn-margin-xs"
												style="color: #bbbbbe;">
												{{t('Join Hash')}}：
												<span
													class="tn-color-white tn-text-bold">{{ hiddenAddress(item._id) }}</span>
												<span @tap="copy(item._id)"
													class="tn-icon-copy tn-margin-left-xs tn-text-bold"
													style="color: #f28b03;"></span>
											</view>
										</view>
									</template>
								</tn-time-line-item>
							</block>
						</tn-time-line>
					</view>
				</demo-title>

				<demo-title v-if="bonus.length > 0" style="width: 100%; color: #2287D7; background-color: #1c1947; border-radius: 40upx;"
					class="tn-text-bold tn-margin-top-xl" :title="t('Bonus History')">
					<view class="time-line__wrap tn-padding">
						<tn-time-line>
							<block v-for="(item, index) in bonus" :key="index">
								<tn-time-line-item v-if="item.status !== 0" :top="2">
									<template slot="node">
										<view class="time-line-item__node">
											<view class="time-line-item__node--icon tn-icon-gift tn-text-xl"
												style="color: #2287D7;"></view>
										</view>
									</template>
									<template slot="content">
										<view class="tn-margin-bottom">
											<view
												class="time-line-item__content__time tn-margin-xs tn-text-bold tn-text"
												style="margin-left: -3upx; color: #2287D7;">
												【{{ zmoment(item.time).format("yyyy-MM-DD HH:mm:ss") }}】
											</view>
											<view class="time-line-item__content__title tn-margin-xs"
												style="color: #bbbbbe;">
												{{t('Reward Cnt')}}：
												<span
													class="tn-color-white tn-text-bold">{{ (item.cnt || 0) }}</span>
												<span class="tn-margin-left-xs tn-text-bold"
													style="color: #f28b03;">USDT</span>
											</view>
											<view class="time-line-item__content__title tn-margin-xs"
												style="color: #bbbbbe;">
												{{t('Reward Source')}}：
												<span
													class="tn-color-white tn-text-bold">{{ hiddenAddress(item.src) }}</span>
												<span @tap="copy(item.src)"
													class="tn-icon-copy tn-text-bold tn-margin-left-xs"
													style="color: #f28b03;"></span>
											</view>
											<view class="time-line-item__content__title tn-margin-xs"
												style="color: #bbbbbe;">
												{{t('Reward Id')}}：
												<span
													class="tn-color-white tn-text-bold">{{ hiddenAddress(item._id) }}</span>
												<span @tap="copy(item._id)"
													class="tn-icon-copy tn-margin-left-xs tn-text-bold"
													style="color: #f28b03;"></span>
											</view>
										</view>
									</template>
								</tn-time-line-item>
							</block>
						</tn-time-line>
					</view>
				</demo-title>
				
				<demo-title v-if="withdraws.length > 0" style="width: 100%; color: #2287D7; background-color: #1c1947; border-radius: 40upx;"
					class="tn-text-bold tn-margin-top-xl" :title="t('Withdraw History')">
					<view class="time-line__wrap tn-padding">
						<tn-time-line>
							<block v-for="(item, index) in withdraws" :key="index">
								<tn-time-line-item v-if="item.status !== 0" :top="2">
									<template slot="node">
										<view class="time-line-item__node">
											<view class="time-line-item__node--icon tn-icon-gift tn-text-xl"
												style="color: #2287D7;"></view>
										</view>
									</template>
									<template slot="content">
										<view class="tn-margin-bottom">
											<view
												class="time-line-item__content__time tn-margin-xs tn-text-bold tn-text"
												style="margin-left: -3upx; color: #2287D7;">
												【{{ zmoment(item.time).format("yyyy-MM-DD HH:mm:ss") }}】
											</view>
											<view class="time-line-item__content__title tn-margin-xs"
												style="color: #bbbbbe;">
												{{t('Withdraw Cnt')}}：
												<span
													class="tn-color-white tn-text-bold">{{ (item.cnt || 0) }}</span>
												<span class="tn-margin-left-xs tn-text-bold"
													style="color: #f28b03;">USDT</span>
											</view>
											<view class="time-line-item__content__title tn-margin-xs"
												style="color: #bbbbbe;">
												{{t('Withdraw Hash')}}：
												<span
													class="tn-color-white tn-text-bold">{{ hiddenAddress(item._id) }}</span>
												<span @tap="copy(item._id)"
													class="tn-icon-copy tn-margin-left-xs tn-text-bold"
													style="color: #f28b03;"></span>
											</view>
											<view class="time-line-item__content__title tn-margin-xs"
												style="color: #bbbbbe;">
												{{t('Transfer Hash')}}：
												<span
													class="tn-color-white tn-text-bold">{{ hiddenAddress(item.hash) }}</span>
												<span @tap="copy(item.hash)"
													class="tn-icon-copy tn-margin-left-xs tn-text-bold"
													style="color: #f28b03;"></span>
											</view>
										</view>
									</template>
								</tn-time-line-item>
							</block>
						</tn-time-line>
					</view>
				</demo-title>

			</view>

			<view class="tn-text-center tn-margin-top-xl tn-margin-bottom-xxl" style="margin-top: 150upx;">
				<a class="tn-color-white" style="text-decoration: none;" href="mailto:service@acn.im">service@futureplanet.me</a>
			</view>
		</view>
	</view>
</template>

<script>
	import template_page_mixin from '@/libs/mixin/template_page_mixin.js';
	import demoTitle from '@/libs/components/demo-title.vue';
	import tkiQrcode from "tki-qrcode";

	var _this;
	var web3;
	var web3Provider;
	var usdtContract;
	var tp;

	const Point = class {
		constructor(x, y) {
			this.x = x
			this.y = y
			this.r = 1 + Math.random() * 2
			this.sx = Math.random() * 2 - 1
			this.sy = Math.random() * 2 - 1
		}

		draw(ctx) {
			ctx.beginPath()
			ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
			ctx.closePath()
			ctx.fillStyle = '#fff'
			ctx.fill()
		}

		move(w, h) {
			this.x += this.sx
			this.y += this.sy
			if (this.x > w || this.x < 0) this.sx = -this.sx
			if (this.y > h || this.y < 0) this.sy = -this.sy
		}

		drawLine(ctx, p) {
			const dx = this.x - p.x
			const dy = this.y - p.y
			const d = Math.sqrt(dx * dx + dy * dy)
			if (d < 100) {
				var alpha = (100 - d) / 300 * 1
				ctx.beginPath()
				ctx.moveTo(this.x, this.y)
				ctx.lineTo(p.x, p.y)
				ctx.closePath()
				ctx.strokeStyle = 'rgba(255, 255, 255, ' + alpha + ')'
				ctx.strokeWidth = 1
				ctx.stroke()
			}
		}
	}

	const sysinfo = uni.getSystemInfoSync()
	const w = 400
	const h = 1000


	export default {
		name: 'login-demo-2',
		mixins: [template_page_mixin],
		components: {
			demoTitle,
			tkiQrcode
		},
		data() {
			return {
				ctx: null,
				screenWidth: sysinfo.screenWidth,
				screenHeight: sysinfo.screenHeight,
				timer: null,
				points: [],

				// 当前选中的模式
				currentModeIndex: 0,

				tuniaoData: [{
						title: this.t('Will Open'),
						icon: 'discover-planet',
						color: 'tn-cool-bg-color-17',
						value: 0,
					},
					{
						title: this.t('Will Open'),
						icon: 'hardware',
						color: 'tn-cool-bg-color-18',
						value: 0
					},
				],

				address: "",
				addrRef: "",
				cntBnb: 0,
				cntUsdt: 0,
				cntBuy: 1,
				isShowInvite: false,
				isTp: false,

				joInviter: '',
				josChild: [],
				sharks: [],
				cntTotal: 1,
				cntTotalMy: 0,
				cntNum: 0,
				contractUsdtBnb: '',
				bonus: [],
				bonusTotal: 0,
				futureBuyAddress: '',
				futureBuyPrices: [100],
				radioVal: 0,
				radioColors: {'0': '#f28b03', '1': '#f06500', '2': '#f00500', '3': 'red', '4': 'blue', '5': 'purple'},
				radioDescs: {'0': this.t('Normal Node'), '1': this.t('Social Node'), '2': this.t('Cooper Node'), '3': this.t('Normal To Social'), '4': this.t('Noraml To Cooper'), '5': this.t('Social To Cooper')}, 
				radioShows: {'0': false, '1': false, '2': false, '3': false, '4': false, '5': false},
				futureRatio1: 0,
				futureWithdrawFee: 0,
				futureWithdrawAddress: '',
				vipLevel: -1,
				withdrawTotal: 0,
				withdraws: [],
				futureEndtime: 0,
				list: [
				  this.t2('Exchange'),
				],
			}
		},
		onLoad(options) {
			for (let i = 0; i < 80; i++) {
				this.points.push(new Point(Math.random() * w, Math.random() * h))
			}
			this.ctx = uni.createCanvasContext('star_canvas')
			// console.log(points)

			// this.gameloop() //进行
			// this.ctx.setFillStyle('red')
			// this.ctx.fillRect(200, 300, 50, 50)
			// this.ctx.draw()

			if (options.ref && (options.ref.length == 42 || options.ref.length == 40) && (options.ref.indexOf('0x') == 0 ||
					options.ref.indexOf('0X') == 0)) {
				this.addrRef = options.ref;
			}
		},
		onUnload() {
			clearTimeout(this.timer);
		},
		mounted() {
			_this = this;

			tp = require('tp-js-sdk');
			_this.isTp = tp.isConnected();

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
			web3.eth.getChainId(function(err, res) {
				if (!err) {
					if (res != 56) {
						window.ethereum.request({
							method: 'wallet_addEthereumChain',
							params: [{
								chainId: web3.utils.numberToHex(56),
								chainName: 'Binance Smart Chain Mainnet',
								nativeCurrency: {
									name: 'Bnb Token',
									symbol: 'BNB',
									decimals: 18
								},
								rpcUrls: ['https://bsc-dataseed1.ninicoin.io'],
								blockExplorerUrls: ['https://bscscan.com/']
							}]
						}).then((res) => {
							console.log(res);
						}).catch((err) => {
							console.log(err);
						})
					}
					console.log(res);
				} else {
					console.log(err);
				}
			});
			web3.eth.getAccounts(function(error, result) {
				if (!error) {
					_this.address = result[0];

					web3.eth.getBalance(_this.address).then(function(resultIn) {
						_this.cntBnb = resultIn / 1000000000000000000;
						console.log("cntBnb: " + _this.cntBnb);
					});

					var usdtContractAbi = [{
						"inputs": [],
						"payable": false,
						"stateMutability": "nonpayable",
						"type": "constructor"
					}, {
						"anonymous": false,
						"inputs": [{
							"indexed": true,
							"internalType": "address",
							"name": "owner",
							"type": "address"
						}, {
							"indexed": true,
							"internalType": "address",
							"name": "spender",
							"type": "address"
						}, {
							"indexed": false,
							"internalType": "uint256",
							"name": "value",
							"type": "uint256"
						}],
						"name": "Approval",
						"type": "event"
					}, {
						"anonymous": false,
						"inputs": [{
							"indexed": true,
							"internalType": "address",
							"name": "previousOwner",
							"type": "address"
						}, {
							"indexed": true,
							"internalType": "address",
							"name": "newOwner",
							"type": "address"
						}],
						"name": "OwnershipTransferred",
						"type": "event"
					}, {
						"anonymous": false,
						"inputs": [{
							"indexed": true,
							"internalType": "address",
							"name": "from",
							"type": "address"
						}, {
							"indexed": true,
							"internalType": "address",
							"name": "to",
							"type": "address"
						}, {
							"indexed": false,
							"internalType": "uint256",
							"name": "value",
							"type": "uint256"
						}],
						"name": "Transfer",
						"type": "event"
					}, {
						"constant": true,
						"inputs": [],
						"name": "_decimals",
						"outputs": [{
							"internalType": "uint8",
							"name": "",
							"type": "uint8"
						}],
						"payable": false,
						"stateMutability": "view",
						"type": "function"
					}, {
						"constant": true,
						"inputs": [],
						"name": "_name",
						"outputs": [{
							"internalType": "string",
							"name": "",
							"type": "string"
						}],
						"payable": false,
						"stateMutability": "view",
						"type": "function"
					}, {
						"constant": true,
						"inputs": [],
						"name": "_symbol",
						"outputs": [{
							"internalType": "string",
							"name": "",
							"type": "string"
						}],
						"payable": false,
						"stateMutability": "view",
						"type": "function"
					}, {
						"constant": true,
						"inputs": [{
							"internalType": "address",
							"name": "owner",
							"type": "address"
						}, {
							"internalType": "address",
							"name": "spender",
							"type": "address"
						}],
						"name": "allowance",
						"outputs": [{
							"internalType": "uint256",
							"name": "",
							"type": "uint256"
						}],
						"payable": false,
						"stateMutability": "view",
						"type": "function"
					}, {
						"constant": false,
						"inputs": [{
							"internalType": "address",
							"name": "spender",
							"type": "address"
						}, {
							"internalType": "uint256",
							"name": "amount",
							"type": "uint256"
						}],
						"name": "approve",
						"outputs": [{
							"internalType": "bool",
							"name": "",
							"type": "bool"
						}],
						"payable": false,
						"stateMutability": "nonpayable",
						"type": "function"
					}, {
						"constant": true,
						"inputs": [{
							"internalType": "address",
							"name": "account",
							"type": "address"
						}],
						"name": "balanceOf",
						"outputs": [{
							"internalType": "uint256",
							"name": "",
							"type": "uint256"
						}],
						"payable": false,
						"stateMutability": "view",
						"type": "function"
					}, {
						"constant": false,
						"inputs": [{
							"internalType": "uint256",
							"name": "amount",
							"type": "uint256"
						}],
						"name": "burn",
						"outputs": [{
							"internalType": "bool",
							"name": "",
							"type": "bool"
						}],
						"payable": false,
						"stateMutability": "nonpayable",
						"type": "function"
					}, {
						"constant": true,
						"inputs": [],
						"name": "decimals",
						"outputs": [{
							"internalType": "uint8",
							"name": "",
							"type": "uint8"
						}],
						"payable": false,
						"stateMutability": "view",
						"type": "function"
					}, {
						"constant": false,
						"inputs": [{
							"internalType": "address",
							"name": "spender",
							"type": "address"
						}, {
							"internalType": "uint256",
							"name": "subtractedValue",
							"type": "uint256"
						}],
						"name": "decreaseAllowance",
						"outputs": [{
							"internalType": "bool",
							"name": "",
							"type": "bool"
						}],
						"payable": false,
						"stateMutability": "nonpayable",
						"type": "function"
					}, {
						"constant": true,
						"inputs": [],
						"name": "getOwner",
						"outputs": [{
							"internalType": "address",
							"name": "",
							"type": "address"
						}],
						"payable": false,
						"stateMutability": "view",
						"type": "function"
					}, {
						"constant": false,
						"inputs": [{
							"internalType": "address",
							"name": "spender",
							"type": "address"
						}, {
							"internalType": "uint256",
							"name": "addedValue",
							"type": "uint256"
						}],
						"name": "increaseAllowance",
						"outputs": [{
							"internalType": "bool",
							"name": "",
							"type": "bool"
						}],
						"payable": false,
						"stateMutability": "nonpayable",
						"type": "function"
					}, {
						"constant": false,
						"inputs": [{
							"internalType": "uint256",
							"name": "amount",
							"type": "uint256"
						}],
						"name": "mint",
						"outputs": [{
							"internalType": "bool",
							"name": "",
							"type": "bool"
						}],
						"payable": false,
						"stateMutability": "nonpayable",
						"type": "function"
					}, {
						"constant": true,
						"inputs": [],
						"name": "name",
						"outputs": [{
							"internalType": "string",
							"name": "",
							"type": "string"
						}],
						"payable": false,
						"stateMutability": "view",
						"type": "function"
					}, {
						"constant": true,
						"inputs": [],
						"name": "owner",
						"outputs": [{
							"internalType": "address",
							"name": "",
							"type": "address"
						}],
						"payable": false,
						"stateMutability": "view",
						"type": "function"
					}, {
						"constant": false,
						"inputs": [],
						"name": "renounceOwnership",
						"outputs": [],
						"payable": false,
						"stateMutability": "nonpayable",
						"type": "function"
					}, {
						"constant": true,
						"inputs": [],
						"name": "symbol",
						"outputs": [{
							"internalType": "string",
							"name": "",
							"type": "string"
						}],
						"payable": false,
						"stateMutability": "view",
						"type": "function"
					}, {
						"constant": true,
						"inputs": [],
						"name": "totalSupply",
						"outputs": [{
							"internalType": "uint256",
							"name": "",
							"type": "uint256"
						}],
						"payable": false,
						"stateMutability": "view",
						"type": "function"
					}, {
						"constant": false,
						"inputs": [{
							"internalType": "address",
							"name": "recipient",
							"type": "address"
						}, {
							"internalType": "uint256",
							"name": "amount",
							"type": "uint256"
						}],
						"name": "transfer",
						"outputs": [{
							"internalType": "bool",
							"name": "",
							"type": "bool"
						}],
						"payable": false,
						"stateMutability": "nonpayable",
						"type": "function"
					}, {
						"constant": false,
						"inputs": [{
							"internalType": "address",
							"name": "sender",
							"type": "address"
						}, {
							"internalType": "address",
							"name": "recipient",
							"type": "address"
						}, {
							"internalType": "uint256",
							"name": "amount",
							"type": "uint256"
						}],
						"name": "transferFrom",
						"outputs": [{
							"internalType": "bool",
							"name": "",
							"type": "bool"
						}],
						"payable": false,
						"stateMutability": "nonpayable",
						"type": "function"
					}, {
						"constant": false,
						"inputs": [{
							"internalType": "address",
							"name": "newOwner",
							"type": "address"
						}],
						"name": "transferOwnership",
						"outputs": [],
						"payable": false,
						"stateMutability": "nonpayable",
						"type": "function"
					}];

					uni.request({
						url: "https://hld-api.ours.pro/futrue/info?address=" + _this.address,
						method: 'GET',
						header: {
							'content-type': 'application/x-www-form-urlencoded',
						},
						data: {},
						success: (res) => {
							if (res.data.code == 10000) {
								_this.joInviter = res.data.data.inviter;
								_this.josChild = res.data.data.invites;
								_this.sharks = res.data.data.sharks;
								_this.cntTotal = res.data.data.cntTotal;
								_this.cntTotalMy = res.data.data.cntTotalMy;
								_this.cntNum = res.data.data.cntNum;

								_this.tuniaoData[0].value = _this.t('Future Planet');
								_this.tuniaoData[1].value = _this.t('Planet Mine');

								_this.contractUsdtBnb = res.data.data.contractUsdtBnb;
								usdtContract = new web3.eth.Contract(usdtContractAbi, _this
									.contractUsdtBnb, {});
								usdtContract.methods.balanceOf(_this.address).call({}, function(error,
									result) {
									if (!error) {
										_this.cntUsdt = result / 1000000000000000000;
										console.log("cntUsdt: " + _this.cntUsdt);
									} else {
										console.log(error);
									}
								});

								_this.bonus = res.data.data.bonus;
								_this.bonusTotal = res.data.data.bonusTotal;
								
								_this.futureBuyAddress = res.data.data.futureBuyAddress;
								_this.futureBuyPrices = res.data.data.futureBuyPrices;
								_this.futureRatio1 = res.data.data.futureRatio1;
								_this.futureWithdrawFee = res.data.data.futureWithdrawFee;
								_this.futureWithdrawAddress = res.data.data.futureWithdrawAddress;
								_this.withdrawTotal = res.data.data.withdrawTotal;
								_this.withdraws = res.data.data.withdraws;
								_this.futureEndtime = res.data.data.futureEndtime;
								
								if (_this.cntTotalMy >= _this.futureBuyPrices[2]) {
									_this.vipLevel = 2;
								} else if (_this.cntTotalMy >= _this.futureBuyPrices[1]) {
									_this.vipLevel = 1;
								} else if (_this.cntTotalMy >= _this.futureBuyPrices[0]) {
									_this.vipLevel = 0;
								}
								if (_this.vipLevel == -1) {
									_this.radioShows[0] = true;
									_this.radioShows[1] = true;
									_this.radioShows[2] = true;
								} else if (_this.vipLevel == 0) {
									_this.radioShows[3] = true;
									_this.radioShows[4] = true;
									_this.radioVal = 3;
								} else if (_this.vipLevel == 1) {
									_this.radioShows[5] = true;
									_this.radioVal = 5;
								}
							}
						}
					});

					console.log("connect: " + _this.address);
				} else {
					console.log(error);
				}
			});
		},
		methods: {
			/**粒子进行*/
			gameloop() {
				this.timer = setTimeout(this.gameloop, 100);
				// console.log('gameloop')
				this.paint();
			},
			/**清空画布*/
			paint() {
				this.ctx.clearRect(0, 0, w, h)
				for (var i = 0; i < this.points.length; i++) {
					this.points[i].move(w, h)
					this.points[i].draw(this.ctx)
					for (var j = i + 1; j < this.points.length; j++) {
						this.points[i].drawLine(this.ctx, this.points[j])
					}
				}
				this.ctx.draw();
			},
			doBuy() {
				if (_this.inviter || _this.addrRef == _this.address) {
					_this.addrRef = "";
				}
				if (_this.addrRef != "" && _this.addrRef.length != 42) {
					_this.toast(_this.t('Your Inviter Invalid'));
					return;
				}

				if (_this.cntBnb < 0.00055) {
					_this.toast(_this.t('Your Bnb not Enogugh'));
					return;
				}

				if (_this.cntUsdt < _this.futureBuyPrices[_this.radioVal]) {
					_this.toast(_this.t('Your Usdt not Enogugh'));
					return;
				}

				let contractAddress = _this.contractUsdtBnb;
				let zdecimal = 18;
				let zgasPrice = '0x1312D0000' // 5.12 gwei
				let zgasLimit = '0x186A0' // 含额外信息所以要大一些 0x186A0 100000

				let val2 = (_this.futureBuyPrices[_this.radioVal] * Math.pow(10, zdecimal)).toString(16)
				let valPrefix = ""
				for (let i = 0; i < (64 - val2.length); i++) {
					valPrefix = valPrefix + "0";
				}
				const middleAddress = _this.futureBuyAddress.substring(2);

				var extraStr = _this.addrRef;
				var extra = "";
				for (var i = 0; i < extraStr.length; i++) {
					extra += extraStr.charCodeAt(i).toString(16);
				}

				if (_this.isTp) {
					var message = {
						from: _this.address,
						gasLimit: zgasLimit,
						gasPrice: zgasPrice,
						value: '0x',
					};
					usdtContract.methods.transfer(_this.futureBuyAddress,
						web3.utils.toWei(_this.futureBuyPrices[_this.radioVal] + "", 'ether')).send(message, function(err, res) {
						if (!err) {
							_this.toast(_this.t('IDO Success'));
							uni.request({
								url: "https://hld-api.ours.pro/futrue/buySuccess?hash=" + res +
									"&address=" + _this.addrRef,
								method: 'GET',
								header: {
									'content-type': 'application/x-www-form-urlencoded',
								},
								data: {},
								success: (res) => {
									if (res.data.code == 10000) {}
									_this.cntBuy = 1;
									_this.addrRef = "";
								}
							});
							console.log(res);
						} else {
							console.log(err);
						}
					});
				} else {
					web3.eth.sendTransaction({
						from: _this.address,
						to: contractAddress, // 平台币是接受者地址，代币是合约地址
						gas: zgasLimit, // 0xF4240 1000000
						gasPrice: zgasPrice,
						value: '', // 平台币是转账数量，代币是空
						data: '0xa9059cbb000000000000000000000000' + middleAddress + valPrefix + val2 +
						extra, // 平台币是空，代币需填https://www.liankexing.com/question/1634
					}, function(error, hash) {
						if (!error) {
							_this.toast(_this.t('IDO Success'));
							console.log(hash);
						} else {
							console.log(err);
						}
					});
				}
			},
			doWithdraw () {
				var cnt = _this.bonusTotal - _this.withdrawTotal;
				if (cnt <= 0.0001) {
					_this.toast('您的 USDT 可提余额不足');
					return;
				}
				if (_this.cntBnb < 0.001) {
					_this.toast('您的 BNB 手续费不足');
					return;
				}
				var extraStr = cnt + "";
				var extra="";
				for(var i = 0; i < extraStr.length; i++){
					extra += extraStr.charCodeAt(i).toString(16);
				}
				var message = {
					from: _this.address,
					to: _this.futureWithdrawAddress,
					value: web3.utils.toWei(_this.futureWithdrawFee + '', 'ether'),
					gasLimit: 39000,
					gasPrice: web3.utils.toWei('5.12', 'gwei'),
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/css/templatePage/custom_nav_bar.scss';

	/* 粒子背景 start*/
	.template-login2 {
		background-color: #14152d;
		min-height: 100vh
	}

	// .template-login2:before {
	// 		content: "";
	// 		position: absolute;
	// 		top: 0;
	// 		left: 0;
	// 		bottom: 0;
	//     right: 0;
	// 		-webkit-mask-image: -webkit-gradient(linear, left top, left bottom, from(transparent), to(black));
	// 		-webkit-mask-image: linear-gradient(to bottom, transparent, black);
	// 		        mask-image: -webkit-gradient(linear, left top, left bottom, from(transparent), to(black));
	// 		        mask-image: linear-gradient(to bottom, transparent, black);
	// 		background: -webkit-gradient(linear, left top, right top, from(#E72F8C), to(#892FE8));
	// 		background: linear-gradient(90deg, #E72F8C, #892FE8);	
	//   }

	.mycanvas {
		position: absolute;
		background-size: cover;
		width: 100vw;
		height: 100vh;
		justify-content: center;
		flex-direction: column;
		color: #fff;
	}



	.login {
		position: relative;
		height: 100%;
		z-index: 1;

		/* 内容 start */
		&__wrapper {
			padding-top: 400rpx;
			width: 100%;
		}

		/* 切换 start */
		&__mode {
			position: relative;
			margin: 0 auto;
			width: 600rpx;
			height: 77rpx;
			background-color: rgba(255, 255, 255, 0.2);
			backdrop-filter: blur(6rpx);
			-webkit-backdrop-filter: blur(6rpx);
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
				width: calc(600rpx / 5);
				border-radius: inherit;
				box-shadow: 0rpx 18rpx 72rpx 18rpx rgba(0, 195, 255, 0.1);
				z-index: 1;
				transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
			}
		}

		/* 切换 end */

		/* 登录注册信息 start */
		&__info {
			margin: 0 50rpx;
			margin-top: 105rpx;
			padding: 30rpx 51rpx;
			padding-bottom: 0;
			border-radius: 20rpx;
			background-color: rgba(255, 255, 255, 0.2); // #17380db5
			backdrop-filter: blur(6rpx);
			-webkit-backdrop-filter: blur(6rpx);
			border: 2rpx solid rgba(255, 255, 255, 0.1);
			box-shadow: 0rpx 10rpx 50rpx 0rpx rgba(0, 3, 72, 0.1);

			&__item {

				&__input {
					margin-top: 59rpx;
					width: 100%;
					height: 77rpx;
					border: 1rpx solid #FFFFFF;
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
							color: #FFFFFF;
							// letter-spacing: 0.1em;
						}
					}

					&__right-icon {
						width: 10%;
						font-size: 44rpx;
						margin-right: 20rpx;
						color: #FFFFFF;
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
					border-radius: 100rpx;
					color: #FFFFFF;
					background-color: rgba(255, 255, 255, 0.2);
					// border: 2rpx solid #FFFFFF;
				}

				&__tips {
					margin: 30rpx 0;
					color: #FFFFFF;
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

	/* 页面 start*/
	.about-shadow {
		border-radius: 15rpx;
		box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
	}

	.about {

		&__wrap {
			position: relative;
			z-index: 1;
			margin: 20rpx 30rpx;
			margin-top: -180rpx;
		}
	}

	/* 页面 end*/

	/* 信息展示 start */
	.tn-info {

		&__container {
			margin-top: 40rpx;
		}

		&__item {
			width: 48%;
			margin: 15rpx 0rpx;
			padding: 28rpx;
			border-radius: 15rpx;


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
				background-image: url(/static/6.png);
			}

			&__left {

				&--icon {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					font-size: 40rpx;
					margin-right: 20rpx;
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
						background-image: url(/static/icon_bg5.png);
					}
				}

				&__content {
					font-size: 30rpx;

					&--data {
						margin-top: 5rpx;
						font-weight: bold;
					}
				}
			}

			&__right {
				&--icon {
					font-size: 60rpx;
					opacity: 0.15;
				}
			}
		}
	}

	/* 信息展示 end */

	.list-icon-text,
	.list-image-text {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.list-image-text {
		.list {
			&__left {
				&__image {
					width: 20rpx;
					height: 20rpx;
				}
			}
		}
	}

	.qrimg {
		display: flex;
		justify-content: center;
	}

	.qrimg-i {
		margin-right: 10px;
	}

	.h1 {
		margin-top: 0px;
		margin-bottom: 32px;
		color: #2287D7;
		font-size: 56px;
		line-height: 66px;
	}

	.section__footer {
		padding-top: 80px;
		background-color: #1a1921;
		margin-left: -7.5%;
	}

	.container-1440 {
		width: 100%;
		max-width: 1536px;
		margin-right: auto;
		margin-left: auto;
		padding-right: 48px;
		padding-left: 48px;
	}

	.footer-wrap {
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		width: 100%;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		-ms-flex-direction: column;
		flex-direction: column;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		text-align: center;
	}

	.footer-soc-wrap {
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		margin-top: 80px;
		margin-bottom: 80px;
	}

	.soc-link {
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		min-width: 74px;
		margin-right: 35px;
		margin-left: 35px;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		-ms-flex-direction: column;
		flex-direction: column;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		color: #bbbbbe;
		font-size: 12px;
		line-height: 19px;
		text-decoration: none;
	}

	.soc-link--img {
		height: 56px;
		margin-bottom: 18px;
	}

	.footer-bottom {
		padding-top: 42px;
		padding-bottom: 38px;
		background-color: #1c1947;
	}

	.footer-bottom-wrap {
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		-ms-flex-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
	}

	.footer--link {
		overflow: hidden;
		margin-right: 16px;
		margin-left: 16px;
		-webkit-transition: box-shadow 200ms ease;
		transition: box-shadow 200ms ease;
		color: #fff;
		font-size: 16px;
		line-height: 26px;
		text-decoration: none;
	}

	.footer--link:hover {
		box-shadow: inset 0 -1px 0 0 hsla(0, 0%, 100%, 0.3);
	}

	.footer-country-link {
		overflow: hidden;
		margin-top: 32px;
		box-shadow: 0 1px 0 0 #fff;
		-webkit-transition: box-shadow 200ms ease, color 200ms ease;
		transition: box-shadow 200ms ease, color 200ms ease;
		color: #fff;
		font-weight: 700;
		text-decoration: none;
		cursor: pointer;
	}

	.footer-country-link:hover {
		box-shadow: 0 1px 0 0 #f28b03;
		color: #f28b03;
	}

	@media screen and (max-width: 767px) {
		.h1 {
			margin-bottom: 24px;
			font-size: 30px;
			line-height: 42px;
		}

		.section__footer {
			padding-top: 60px;
		}

		.footer-soc-wrap {
			margin-top: 40px;
			margin-bottom: 40px;
			max-width: 300px !important;
		}

		.soc-link {
			margin: 20px;
		}

		.container-1440 {
			padding-right: 24px;
			padding-left: 24px;
		}

		.footer-soc-wrap {
			max-width: 500px;
			margin-top: 50px;
			margin-bottom: 50px;
			-webkit-box-pack: center;
			-webkit-justify-content: center;
			-ms-flex-pack: center;
			justify-content: center;
			-webkit-flex-wrap: wrap;
			-ms-flex-wrap: wrap;
			flex-wrap: wrap;
		}
	}
	
	.animate {
		font-size: 100upx;
	}
	
	.animate span {
		display: inline-block;
	}
	
	.animate span:nth-of-type(2) {
		animation-delay: .05s;
	}
	.animate span:nth-of-type(3) {
		animation-delay: .1s;
	}
	.animate span:nth-of-type(4) {
		animation-delay: .15s;
	}
	.animate span:nth-of-type(5) {
		animation-delay: .2s;
	}
	.animate span:nth-of-type(6) {
		animation-delay: .25s;
	}
	.animate span:nth-of-type(7) {
		animation-delay: .3s;
	}
	.animate span:nth-of-type(8) {
		animation-delay: .35s;
	}
	.animate span:nth-of-type(9) {
		animation-delay: .4s;
	}
	.animate span:nth-of-type(10) {
		animation-delay: .45s;
	}
	.animate span:nth-of-type(11) {
		animation-delay: .5s;
	}
	.animate span:nth-of-type(12) {
		animation-delay: .55s;
	}
	.animate span:nth-of-type(13) {
		animation-delay: .6s;
	}
	.animate span:nth-of-type(14) {
		animation-delay: .65s;
	}
	.animate span:nth-of-type(15) {
		animation-delay: .7s;
	}
	.animate span:nth-of-type(16) {
		animation-delay: .75s;
	}
	.animate span:nth-of-type(17) {
		animation-delay: .8s;
	}
	.animate span:nth-of-type(18) {
		animation-delay: .85s;
	}
	.animate span:nth-of-type(19) {
		animation-delay: .9s;
	}
	.animate span:nth-of-type(20) {
		animation-delay: .95s;
	}
	
	@keyframes dropVanish {
		30% {
			transform: translate(0, -50px) rotate(180deg) scale(1);
		}
	
		50% {
			transform: translate(0, 20px) scale(.8) rotate(0deg);
			opacity: 1;
		}
	
		80% {
			transform: translate(-100px, -100px) scale(1.5) rotate(-180deg);
			opacity: 0;
		}
	
		100% {
			transform: translate(0) scale(1) rotate(0deg);
			opacity: 1;
		}
	}
	
	.seven span {
		opacity: 0;
		transform: translate(-150px, 0) scale(.3);
		animation: leftRight 3s forwards;
	}
	
	@keyframes leftRight {
		40% {
			transform: translate(50px, 0) scale(.7);
			opacity: 1;
			color: #f28b03;
		}
		60% {
			color: #f00500;
		}
		80% {
			transform: translate(0) scale(2);
			opacity: 0;
		}
		100% {
			transform: translate(0) scale(1);
			color: white;
			opacity: 1;
		}
	}
</style>
