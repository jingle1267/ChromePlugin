console.log('iconclick.js run');

var url = chrome.windows.getCurrent({"populate":true}, function (window) {
	console.log("window = ", window);
	
	for (var i = 0; i < window.tabs.length; i++) {
		var tab = window.tabs[i];
		if (tab.active) {
			for (var j = 0; j < 3; j++) {
				(function(e) {setTimeout(function() {
					console.log("e = ", e, "-", new Date());
					chrome.windows.create({"url": tab.url, "incognito": true}, function (window) {
							console.log('windowId : ', window.id, "-", new Date());
							var wId = window.id;
							// (function(f) {setTimeout(function() {
								// chrome.windows.remove(f);
							// }, 2000)})(wId);
					
						}
					);
				}, e * 5000)})(j);
				
			}

			break;
		}
	}
	
});
console.log("url = ", url);
