console.log('background.js run');

var OpenTimes1 = 1;

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

// 无痕模式打开1次
chrome.contextMenus.create({
    title: "无痕模式打开当前页面" + OpenTimes1 + "次",
    contexts: ['page', 'image', 'video', 'frame'], 
    onclick: function(){
		openIncognitoWindow(OpenTimes1, false)
	}
});

// 获取用户设置的打开次数。可以在 options 中设置
var defaultConfig = {iot: 1}; // 默认配置
chrome.storage.sync.get(defaultConfig, function(result) {
	var customOpenTimes = result.iot;
    console.log('Value currently is ' + customOpenTimes);

    if (customOpenTimes != 1) {
        chrome.contextMenus.create({
            title: "无痕模式打开当前页面" + customOpenTimes + "次",
            onclick: function(){
                openIncognitoWindow(customOpenTimes, true)
            }
        });
	}

});

/**
 * 打开隐身状态的窗口
 */
function openIncognitoWindow(openTimes, auto) {
	var url = chrome.windows.getCurrent({"populate":true}, function (window) {
		console.log("window = ", window);

		for (var i = 0; i < window.tabs.length; i++) {
			var tab = window.tabs[i];

			if (tab.active) {
                var url = tab.url;
				for (var j = 0; j < openTimes; j++) {
					(function(e) {setTimeout(function() {
						console.log("e = ", e, "-", new Date());

						var params;
						if (auto) {
                            params = {"url": url, "incognito": true, "width": 400,
                                "height": 300};
                        } else {
                            params = {"url": url, "incognito": true};
						}
						chrome.windows.create(params, function (wd) {
								console.log('wd : ', wd, "-", new Date());
								if (auto) {
                                    setTimeout(function() {
                                        chrome.windows.remove(wd.id);
                                        console.log('close window : ', new Date());
                                    }, CloseDuration);
                                }

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
