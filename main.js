import App from './App'
import store from './store'

import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

// 引入全局TuniaoUI
import TuniaoUI from 'tuniao-ui'
Vue.use(TuniaoUI)

// 引入TuniaoUI提供的vuex简写方法
let vuexStore = require('@/store/$t.mixin.js')
Vue.mixin(vuexStore)

// 引入TuniaoUI对小程序分享的mixin封装
let mpShare = require('tuniao-ui/libs/mixin/mpShare.js')
Vue.mixin(mpShare)

import moment from 'moment'
Vue.prototype.zmoment = moment;

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.prototype.langSwitch = function() {
	var langCur = uni.getStorageSync("lang") == "en" ? "zh" : "en";
	uni.setStorageSync("lang", langCur);
	window.location.reload();
}

Vue.prototype.t = function(key) {
	var langs = {
		"Invite": "邀请好友",
		"Bonus": "收益",
		"Ecology": "生态",
		"History": "历史",
		"Book": "名单",
		"Total": "总数",
		"Trade": "交易",
		"Copy Share Address": "复制推广链接",
		"Data": "数据",
		"Contract": "合约",
		"Face": "社区身份",
		"Cnt": "数量",
		"User": "社员",
		"Team": "社长",
		"Social": "社区",
		"Node": "节点",
		"Boss": "超级节点",
		"Card": "张",
		"Bonus Total": "总分红",
		"Be Invite": "被邀请人",
		"None": "暂无",
		"Inviter": "推荐人",
		"Amount": "余额",
		"Ratio": "占比",
		"Remain": "剩余",
		"Price": "价格",
		"My": "我的",
		"Buy": "购买",
		"Pledge": "质押",
		"Day": "天",
		"ing ...": "中...",
		"Asset": "资产",
		"Withdraw": "提现",
		"Enter Cnt": "请输入数量",
		" Repeat": "复投",
		"More": "FFNFT交易、生态商城等更多FF赋能",
		"Wait ...": "敬请期待...",
		"Reward": "奖励",
		"Invite2": "邀请",
		"Own": "持有",
		"Buy": "买入",
		"Sell": "卖出",
		"Click arrow switch": "点击箭头切换FF买、卖",
		"Enter cnt": "请输入数量",
		
		"IDO History": "IDO历史",
		"IDO Private End Time": "IDO私募倒计时",
		"IDO Public End Time": "IDO公募倒计时",
		"Please Enter Inviter Address": "请输入邀请地址",
		"Join": "加入",
		"IDO Amount": "加入总金额",
		"IDO Persons": "加入总人数",
		"NFT Cnt": "NFT已发",
		"Type": "类型",
		"Bind Inviter": "绑定邀请",
		"Private": "私募",
		"Public": "公募",
		"Other": "公募",
		"Days": "天",
		"Hours": "时",
		"Minutes": "分",
		"Seconds": "秒",
		"Consume": "花费",
		"Invite History": "邀请历史",
		"Bonus History": "奖励历史",
		"Progress": "进度",
		"Reward Source": "奖励来源",
		"Deep": "代",
		"Reward Type": "奖励类型",
		"Invite Reward": "邀请奖励",
		"Home": "首页",
		"Save Qrcode": "保存二维码",
		"Cut Screen": "请截屏分享！",
		"Invite Link": "推广链接",
		"Reward Loading": "二维码生成中！",
		"Ido Not Open": "IDO未开启",
		"Your Inviter Invalid": "您的邀请人地址不合法",
		"Your Bnb not Enogugh": "您的 BNB 矿工费不足",
		"Your Usdt not Enogugh": "您的 USDT 余额不足",
		"IDO Success": "IDO成功",
		"My Data": "我的数据",
		"SHARK NFT Contract": "NFT合约",
		"SHARK NFT Cnt": "NFT已发",
		"Vip Level": "身份标识",
		"None": "暂无",
		"Withdraw History": "提现记录",
		"Withdraw Hash": "提现Hash",
		"Transfer Hash": "转账Hash",
		"Reward Cnt": "奖励数量",
		"Reward Id": "奖励ID",
		"Withdraw": "提现",
		"Join Cnt": "加入消耗",
		"Join History": "加入历史",
		"Join Type": "加入类型",
		"Join Hash": "加入Hash",
		"Withdraw Cnt": "提现数量",
		"Upgrade": "升级",
		"Normal Node": "普通节点",
		"Social Node": "社区节点",
		"Cooper Node": "联创节点",
		"Normal To Social": "普通 -> 社区节点",
		"Noraml To Cooper": "普通 -> 联创节点",
		"Social To Cooper": "社区 -> 联创节点",
		"Will Open": "即将开放",
		"Future Planet": "未来星球",
		"Planet Mine": "星球矿场",
		"IDO End Time": "IDO倒计时",
		"Join Node": "加入节点",
		"FUR Contract": "FUR合约",
		"FUR Exchange": "PancakeSwap交易FUR",
	};
	if (uni.getStorageSync("lang") == "en") {
		return key;
	} else {
		return langs[key];
	}
}

Vue.prototype.t3 = function(key) {
	if (uni.getStorageSync("lang") == "en") {
		return 'en';
	} else {
		return 'zh';
	}
}

Vue.prototype.t2 = function(key) {
	var langs = {
		"zhIdo1": "IDO 推荐奖励深度解析",
		"zhIdo2": "基础奖励",
		"zhIdo3": "邀请奖励 9%（6% + 3%）",
		"zhIdo4": "直接邀请被邀请人，将获得被邀请人购买的 IDO 数量的 6% 代币奖励。被邀请人继续邀请他人，将获得用户购买的 IDO 数量的 3% 代币奖励",
		"zhIdo5": "额外奖励",
		"zhIdo6": "SHARK NFT 奖励",
		"zhIdo7": "邀请 15 为用户成功参与 IDO，即可获得一张鲨鱼 NFT 奖励。每 15 个有效推荐，奖励一张鲨鱼 NFT。鲨鱼 NFT 发行量有限，全球 250 张",
		"zhIdo8": "鲨鱼 NFT",
		"zhIdo9": "鲨鱼 NFT 只有在 IDO 阶段作为奖励免费发放，IDO 结束后只能通过NFTtrade 进行买卖交易获得。全球全网发行总量仅有 250 张。 价格：8 BNB / 鲨鱼 NFT",
		"zhIdo10": "鲨鱼 NFT 收益详情请关注",
		"zhIdo11": "“鲨鱼 NFT 收益解析”",
		"zhIdo12": "板块",
		"zhIdo13": "SHARK 在 pancakeswap 上交易，由智能合约自动分发推荐奖励",
		"enIdo1": "Ido recommendation reward in-depth analysis",
		"enIdo2": "basic rewards",
		"enIdo3": "invitation reward 9% (6% + 3%)",
		"enIdo4": "if you invite the invitee directly, you will get a token reward of 6% of the number of idos purchased by the invitee. If the invitee continues to invite others, you will get a token reward of 3% of the number of idos purchased by the user",
		"enIdo5": "extra rewards",
		"enIdo6": "share NFT awards",
		"enIdo7": "if you invite 15 users to successfully participate in Ido, you can get a shark NFT award. For every 15 effective recommendations, you will be rewarded with a shark NFT. The circulation of shark NFT is limited, with 250 worldwide",
		"enIdo8": "shark NFT",
		"enIdo9": "shark NFT can only be distributed free of charge as a reward at the Ido stage, and can only be obtained through nfttrade after the Ido is over. The total number of copies distributed worldwide is only 250. Price: 8 BNB / shark NFT",
		"enIdo10": "please pay attention to the details of shark NFT revenue",
		"enIdo11": "shark NFT income analysis",
		"enIdo12": "plate",
		"enIdo13": "share trades on pancakeswap, and the smart contract automatically distributes recommendation rewards",
		"zhExchange": "FUR于亚太时间8月15号22：00上线薄饼交易所",
		"enExchange": "FUR was launched on the PancakeSwap at 22:00 on August 15, Asia Pacific time"
	};
	if (uni.getStorageSync("lang") == "en") {
		return langs['en' + key];
	} else {
		return langs['zh' + key];
	}
}

Vue.prototype.goto = function(path, url, title) {
	if (url) {
		uni.navigateTo({
			url: path + "?url=" + encodeURIComponent(url) + (title ? "&title=" + title : "")
		});
	} else {
		uni.navigateTo({
			url: path
		});
	}
}

Vue.prototype.gotoLink = function(url) {
	// #ifndef H5
	plus.runtime.openURL(url)
	// #endif
	// #ifdef H5
	window.location.href = url;
	// #endif
}

Vue.prototype.toast = function(title) {
	uni.showToast({
		icon: "none",
		position: "bottom",
		title: title,
		duration: 2000,
	});

	return false;
}

Vue.prototype.copy = function(text) {
	// #ifndef H5
	uni.setClipboardData({
		data: text,
		success: function() {
			uni.showToast({
				icon: "none",
				position: "bottom",
				title: "复制成功",
				duration: 2000,
			});
		}
	});
	// #endif
	// #ifdef H5
	this.$copyText(text).then(
		res => {
			uni.showToast({
				icon: "none",
				position: "bottom",
				title: "复制成功",
				duration: 2000,
			});
		}
	)
	// #endif
}

Vue.prototype.gotoLink = function(url) {
	// #ifndef H5
	plus.runtime.openURL(url)
	// #endif
	// #ifdef H5
	window.location.href = url;
	// #endif
}

Vue.prototype.hiddenAddress = function(address) {
	if (address) {
		if (address.length > 6) {
			return address.substr(0, 6) + "..." + address.substr(address.length - 4, address.length);
		} else {
			return address.substr(0, 6) + "...";
		}
	} else {
		return "";
	}
}

Vue.prototype.hiddenAddress2 = function(address) {
	if (address) {
		return "..." + address.substr(address.length / 2 - 2, 4) + "...";
	} else {
		return "";
	}
}

const app = new Vue({
  store,
  ...App
})
app.$mount()