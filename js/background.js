console.log('background.js run');

var OpenTimes = 1;

// 打开隐身窗口的时间
var OpenDuration = 3123;

// 百度搜索
chrome.contextMenus.create({
    title: '百度搜索 %s', // %s表示选中的文字
    contexts: ['selection'], // 只有当选中文字时才会出现此右键菜单
    onclick: function (params) {
        // 注意不能使用location.href，因为location是属于background的window对象
        chrome.tabs.create({url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(params.selectionText)});
    }
});

// 必应搜索
chrome.contextMenus.create({
    title: '必应搜索 %s',
    contexts: ['selection'],
    onclick: function (params) {
        chrome.tabs.create({url: 'https://cn.bing.com/search?q=' + encodeURI(params.selectionText)});
    }
});

// 百度翻译
chrome.contextMenus.create({
    title: '百度翻译 %s',
    contexts: ['selection'],
    onclick: function (params) {
        chrome.tabs.create({url: 'https://fanyi.baidu.com/#en/zh/' + encodeURI(params.selectionText)});
    }
});

// 无痕模式打开
chrome.contextMenus.create({
    title: "无痕打开",
    contexts: ['page', 'image', 'video', 'frame'],
    onclick: function () {
        openIncognitoWindow()
    }
});

// triggered when user clicks on installed extention icon
chrome.browserAction.onClicked.addListener(function (tab) {
    trueRefresh(tab);
});

// 添加刷新当前页面菜单
getIOT(function (customOpenTimes) {
    OpenTimes = customOpenTimes;

    let title = '清 cookies 刷新';
    if (OpenTimes != 1) {
        title += ' ' + OpenTimes + ' 次';
    }
    chrome.contextMenus.create({
        title: title,
        contexts: ['page', 'image', 'video', 'frame'],
        onclick: function () {
            var index = 0;
            var interval = setInterval(function () {
                getCurrentTab(function (tab) {
                    trueRefresh(tab);
                });
                index++;
                if (index >= OpenTimes) {
                    clearInterval(interval);
                }
            }, OpenDuration);

        }
    });
});

/**
 * 清空数据并刷新
 * @param tab
 */
function trueRefresh(tab) {
    // retrive domain from active tab
    var url = tab.url;
    var matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    var d = matches && matches[1].replace('www.', '');
    d = '.' + d;

    // get all cookies for domain
    chrome.cookies.getAll({domain: d}, function (cookies) {

        // iterate on cookie to get cookie detail
        for (var i = 0; i < cookies.length; i++) {
            var url = "http" + (cookies[i].secure ? "s" : "") + "://" + cookies[i].domain + cookies[i].path;
            var cname = cookies[i].name;

            // delete cookie
            chrome.cookies.remove({
                "url": url,
                "name": cname
            });
        }

        // reload currect active tab
        chrome.tabs.reload();
    });
}


/**
 * 打开隐身状态的窗口
 */
function openIncognitoWindow() {

    getCurrentTab(function (tab) {
        if (tab.active) {

            var params = {"url": tab.url, "incognito": true};
            chrome.windows.create(params, function (wd) {
                    console.log('wd : ', wd, "-", new Date());
                }
            );

        }
    });

}

/**
 * 获取无痕模式打开次数
 * @param callback
 */
function getIOT(callback) {
    // 获取用户设置的打开次数。可以在 options 中设置
    var defaultConfig = {iot: 1}; // 默认配置
    chrome.storage.sync.get(defaultConfig, function (result) {
        var customOpenTimes = result.iot;
        console.log('Value currently is ' + customOpenTimes);

        callback(customOpenTimes);
    });
}

/**
 * 获取当前 Tab
 * @param callback
 */
function getCurrentTab(callback) {
    chrome.windows.getCurrent({"populate": true}, function (window) {
        console.log("window = ", window);

        for (var i = 0; i < window.tabs.length; i++) {
            var tab = window.tabs[i];

            if (tab.active) {
                callback(tab);
                break;
            }
        }

    });
}
