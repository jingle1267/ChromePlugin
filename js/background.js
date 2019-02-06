console.log('background.js run');

var OpenTimes1 = 1;
var OpenTimes2 = 200;
var OpenTimes3 = 1000;

// 打开隐身窗口的时间
var OpenDuration = 3123;
// 隐身窗口打开后，多久关闭
var CloseDuration = 2202;

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
						chrome.windows.create({"url": tab.url, "incognito": true}, function (window) {
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
