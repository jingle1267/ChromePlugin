console.log('background.js run');

chrome.contextMenus.create({
    title: "隐身状态打开当前页面10次",
    onclick: function(){
    	// alert('您点击了右键菜单！');
		var url = chrome.windows.getCurrent({"populate":true}, function (window) {
			console.log("window = ", window);
	
			for (var i = 0; i < window.tabs.length; i++) {
				var tab = window.tabs[i];
				if (tab.active) {
					for (var j = 0; j < 10; j++) {
						(function(e) {setTimeout(function() {
							console.log("e = ", e, "-", new Date());
							chrome.windows.create({"url": tab.url, "incognito": true}, function (window) {
									console.log('windowId : ', window.id, "-", new Date());
									setTimeout(function() {
										chrome.windows.remove(window.id);
										console.log('close window : ', new Date());
									}, 2150);
					
								}
							);
						}, e * 3125)})(j);
				
					}
					break;
				}
			}
	
		});
		console.log("url = ", url);
	}
});


