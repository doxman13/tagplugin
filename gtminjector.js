chrome.storage.sync.get({myInjector: '', gtmToDo: 'notstart'}, function(result) {
console.log('injector id currently is ' + result.myInjector + ' and it will '+ result.gtmToDo);

	if(result.gtmToDo == "start") {
			
		console.log('injector id currently is ' + result.myInjector + 'in IF ELSE') ;
		(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer',result.myInjector);
	}			  
		  
});







var s = document.createElement('script');
try {
	s.src = chrome.extension.getURL('script.js');
	s.onload = function() {
		(document.head||document.documentElement).appendChild(s);
		var s2 = document.createElement('script');
		s2.src = chrome.extension.getURL('script.js');
		(document.head||document.documentElement).appendChild(s2);
		s2.onload = function() {
		var s3 = document.createElement('script');
		s3.src = chrome.extension.getURL('script.js');
		(document.head||document.documentElement).appendChild(s3);
		};
	};
} catch (error) {
	console.error("gtminjector.js - has error", error);
}