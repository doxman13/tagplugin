chrome.storage.sync.get({mycountry: 'thailand',ouremail: 'xxx@google.com'}, function(result) {
console.log('Value currently is ' + result.mycountry);

	if(result.mycountry == "Vietnam") {
		
		
		console.log('Value currently is ' + result.mycountry + 'in IF ELSE') ;
		var myemail = result.ouremail;
		var x = document.createElement("p");
		x.setAttribute("id", "myspanemail");
		document.body.appendChild(x); 
		document.getElementById("myspanemail").innerHTML = myemail;
		
		(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-T5B9283');
		
	}else if (result.mycountry == "Thailand") {
		
		
		console.log('Value currently is ' + result.mycountry + 'in IF ELSE') ;
		var myemail = result.ouremail;
		var x = document.createElement("p");
		x.setAttribute("id", "myspanemail");
		document.body.appendChild(x); 
		document.getElementById("myspanemail").innerHTML = myemail;
		
		(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-5GHNQX3');

	}else if (result.mycountry == "China") {

		console.log('Value currently is ' + result.mycountry + 'in IF ELSE') ;
		var myemail = result.ouremail;
		var x = document.createElement("p");
		x.setAttribute("id", "myspanemail");
		document.body.appendChild(x); 
		document.getElementById("myspanemail").innerHTML = myemail;
		
		(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-N4C9XG8');

	}else if (result.mycountry == "Japan") {
		
		
		console.log('Value currently is ' + result.mycountry + 'in IF ELSE') ;
		var myemail = result.ouremail;
		var x = document.createElement("p");
		x.setAttribute("id", "myspanemail");
		document.body.appendChild(x); 
		document.getElementById("myspanemail").innerHTML = myemail;
		
		(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-T67C9ZK');

	}else if (result.mycountry == "Korea") {
		
		
		console.log('Value currently is ' + result.mycountry + 'in IF ELSE') ;
		var myemail = result.ouremail;
		var x = document.createElement("p");
		x.setAttribute("id", "myspanemail");
		document.body.appendChild(x); 
		document.getElementById("myspanemail").innerHTML = myemail;
		
		(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-TBMND42');

	}
	else if (result.mycountry == "English") {
		
		
		console.log('Value currently is ' + result.mycountry + 'in IF ELSE') ;
		var myemail = result.ouremail;
		var x = document.createElement("p");
		x.setAttribute("id", "myspanemail");
		document.body.appendChild(x); 
		document.getElementById("myspanemail").innerHTML = myemail;
		

	}
			  
		  
});
		








var s = document.createElement('script');
s.src = chrome.extension.getURL('script.js');
(document.head||document.documentElement).appendChild(s);
s.onload = function() {
var s2 = document.createElement('script');
s2.src = chrome.extension.getURL('script.js');
(document.head||document.documentElement).appendChild(s2);
s2.onload = function() {
var s3 = document.createElement('script');
s3.src = chrome.extension.getURL('script.js');
(document.head||document.documentElement).appendChild(s3);
};
};