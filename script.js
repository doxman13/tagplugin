chrome.storage.sync.get({
    mycountry: "thailand",
    ouremail: "xxx@google.com",
    optionkl__modecase: "Auto",
    optionkl__disable_dialog: false,
    optionkl__enable_sf_helper: false,
}, function(result) {
	window.result = result;
	if(window.result.optionkl__enable_sf_helper == false) return false;

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
		
		(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-5GHNQX3');

		
		console.log('Value currently is ' + result.mycountry + 'in IF ELSE') ;
		var myemail = result.ouremail;
		var x = document.createElement("p");
		x.setAttribute("id", "myspanemail");
		document.body.appendChild(x); 
		document.getElementById("myspanemail").innerHTML = myemail;
		



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

	}else if (result.mycountry == "Indonesia") {
		
		
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
		})(window,document,'script','dataLayer','GTM-NG2RK43');

	}else if (result.mycountry == "Other") {
		
		
		console.log('Value currently is ' + result.mycountry + 'in IF ELSE') ;
		(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-THHTK2M');	

	}
			  
		  
});



//Auto refresh and check on Unassigned page in connect dash
setInterval(function () {
	if(window.location.href === "https://appointments.connect.corp.google.com/" && document.querySelector('input:checked + label').textContent === "Unbooked "){
    	
    	document.querySelector('[mattooltip="Refresh"]').click();
       	console.log('click refrehs button - dash page test test'); 

    	setTimeout(function () {
    	if( 
        	document.querySelector('.is-empty') !== null) {console.log('no unassigned case yet')
    	} else {
        	console.log('checking cases')
        	chrome.runtime.sendMessage({textyou: "toNotifyNoAppt"});
    	}
                         
		}, 120000);   	 
	}
                    
}, 600000);


