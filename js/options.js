console.log('options.js start load');

var incoginoOpenTimes = document.getElementById('IncoginoOpenTimes');

document.addEventListener('DOMContentLoaded', function() {
	console.log('DOMContentLoaded');
 
    var defaultConfig = {iot: 100}; // 默认配置
	chrome.storage.sync.get(defaultConfig, function(result) {
        console.log('Value currently is ' + result.iot);
        incoginoOpenTimes.value = result.iot;
    });

});

incoginoOpenTimes.onchange = function(){ 
	console.log('show onpropertychange incoginoOpenTimes = ', incoginoOpenTimes.value);


    chrome.storage.sync.set({iot: incoginoOpenTimes.value}, function() {
        console.log('Value is set to ' + incoginoOpenTimes.value);
    });
}





