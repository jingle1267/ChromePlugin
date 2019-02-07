console.log('background.js run');

var OpenTimes1 = 1;
var OpenTimes2 = 200;
var OpenTimes3 = 1000;

// 打开隐身窗口的时间
var OpenDuration = 3123;
// 隐身窗口打开后，多久关闭
var CloseDuration = 2202;

// 百度搜索
chrome.contextMenus.create({
    title: '百度搜索 %s', // %s表示选中的文字
    contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
    onclick: function(params)
    {
        // 注意不能使用location.href，因为location是属于background的window对象
        chrome.tabs.create({url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(params.selectionText)});
    }
});

// 必应搜索
chrome.contextMenus.create({
    title: '必应搜索 %s', 
    contexts: ['selection'], 
    onclick: function(params)
    {
        chrome.tabs.create({url: 'https://cn.bing.com/search?q=' + encodeURI(params.selectionText)});
    }
});

// 百度翻译
chrome.contextMenus.create({
    title: '百度翻译 %s', 
    contexts: ['selection'], 
    onclick: function(params)
    {
        chrome.tabs.create({url: 'https://fanyi.baidu.com/#en/zh/' + encodeURI(params.selectionText)});
    }
});

chrome.contextMenus.create({
    title: "打开当前页面" + OpenTimes1 + "次",
    onclick: function(){
		openIncognitoWindow(OpenTimes1)
	}
});

chrome.contextMenus.create({
    title: "打开当前页面" + OpenTimes2 + "次",
    onclick: function(){
    	openIncognitoWindow(OpenTimes2)
	}
});

chrome.contextMenus.create({
    title: "打开当前页面" + OpenTimes3 + "次",
    onclick: function(){
    	openIncognitoWindow(OpenTimes3)
	}
});

/**
 * 打开隐身状态的窗口
 */
function openIncognitoWindow(openTimes) {
	var url = chrome.windows.getCurrent({"populate":true}, function (window) {
		console.log("window = ", window);

		for (var i = 0; i < window.tabs.length; i++) {
			var tab = window.tabs[i];
			if (tab.active) {
				for (var j = 0; j < openTimes; j++) {
					(function(e) {setTimeout(function() {
						console.log("e = ", e, "-", new Date());
						chrome.windows.create({"url": tab.url, "incognito": true, "width": 200, 
							"height": 100}, function (window) {
								console.log('windowId : ', window.id, "-", new Date());
								setTimeout(function() {
									chrome.windows.remove(window.id);
									console.log('close window : ', new Date());
								}, CloseDuration);
				
							}
						);
					}, e * OpenDuration)})(j);
			
				}
				break;
			}
		}

	});
	console.log("url = ", url);
}
