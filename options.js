// Saves options to chrome.storage
function save_options() {
  var country = document.getElementById('country').value;
  var youremail = document.getElementById('youremail').value;
  document.getElementById('c_country').innerHTML = country;
  console.log(country);
  chrome.runtime.sendMessage({message: country});
  
  var optionkl__modecase = document.getElementById('optionkl__modecase').value || "";
  var optionkl__inputyourname = document.getElementById('optionkl__inputyourname').value || "";
  var optionkl__inputyourshortname = document.getElementById('optionkl__inputyourshortname').value || "";
  var optionkl__disable_dialog = document.getElementById('optionkl__disable-dialog').checked || false;

  if(country == "Vietnam") {
		
		chrome.browserAction.setBadgeText({text: "VN"}); 
				
	}else if (country == "Thailand") {
		
		chrome.browserAction.setBadgeText({text: 'TH' });
		
		
	}else if (country == "China") {
		
		chrome.browserAction.setBadgeText({text: 'CN' });
		
	
	}else if (country == "Japan") {
		
		chrome.browserAction.setBadgeText({text: 'JP' });
		
	}else if (country == "Korea") {
		
		chrome.browserAction.setBadgeText({text: 'KR' });
		
	}else if (country == "Indonesia") {
		
		chrome.browserAction.setBadgeText({text: 'ID' });
		
	}else if (country == "English") {
		
		chrome.browserAction.setBadgeText({text: 'EN' });
		
	}
  else if (country == "Other") {
		
		chrome.browserAction.setBadgeText({text: 'CB' });
		
	}
    


  chrome.storage.sync.set({
    mycountry: country, 
    ouremail: youremail,

    optionkl__modecase: optionkl__modecase,
    optionkl__inputyourname: optionkl__inputyourname,
    optionkl__inputyourshortname: optionkl__inputyourshortname,
    optionkl__disable_dialog: optionkl__disable_dialog,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved, refresh your SF' ;
	setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}





function inject_options() {
  var myGTM = document.getElementById('yourGTM').value;
  console.log("my GTM injector ID is " + myGTM);
  chrome.runtime.sendMessage({message: myGTM});
  
  

  chrome.storage.sync.set({
    myInjector: myGTM, gtmToDo: 'start'
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'GTM injected, refresh your browser' ;
	setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}


function stop_injector() {
  var myGTM = document.getElementById('yourGTM').value;
  console.log("my GTM injector ID is " + myGTM);
  chrome.runtime.sendMessage({message: myGTM});
  
  

  chrome.storage.sync.set({
    gtmToDo: 'stop'
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'GTM injector stopped, refresh your browser' ;
	setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}


function restore_options() {
	var y = "";
  chrome.storage.sync.get({
    mycountry: 'Thailand',
    ouremail: 'xxx@google.com', 
    myInjector: '',
    gtmToDo: 'notStart',
    optionkl__modecase: "",
    optionkl__inputyourshortname: "",
    optionkl__inputyourname: "",
    optionkl__disable_dialog: false,
    optionkl__disable_focuscase: false,
    optionkl__disable_stylebytheme: false,
    optionkl__disable_autofixemail: false,
  }, function(items) {
    console.log(items);
	console.log('why not here ' + items.myInjector + ' ' +items.gtmToDo);
    document.getElementById('country').value = items.mycountry;
	document.getElementById('youremail').value = items.ouremail;
	document.getElementById('yourGTM').value = items.myInjector;

	document.getElementById('optionkl').setAttribute("data-optionkl", items.mycountry);
	document.getElementById('optionkl__modecase').value = items.optionkl__modecase;
	document.getElementById('optionkl__inputyourshortname').value = items.optionkl__inputyourshortname;
	document.getElementById('optionkl__inputyourname').value = items.optionkl__inputyourname;
	document.getElementById('optionkl__disable-dialog').checked = items.optionkl__disable_dialog;


	console.log(items.ouremail);
	y = items.mycountry;
	window.superx = y;
	console.log(superx);
    document.getElementById('c_country').innerHTML = superx;
	chrome.runtime.sendMessage({message: country});
	});
	}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

document.getElementById('country').addEventListener('change', function(e) {
  var elem_parent = this.closest('[id="optionkl"]');
	document.getElementById('optionkl').setAttribute("data-optionkl", this.value);
  
  
  // Vietnamses
  if(this.value === 'Vietnam') {
    // elem_parent.querySelector('[name="youremail"]').value='';

  }

  
});
$('#startGTM').click(inject_options);	
$('#stopGTM').click(stop_injector);	
	
	



