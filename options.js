// Saves options to chrome.storage
function save_options() {
    var country = document.getElementById('country').value;
    var youremail = document.getElementById('youremail').value;
    console.log(country);
    chrome.runtime.sendMessage({ message: country });

    var cdtx_option_form = document.getElementById('cdtx_option_form');
    var formDataObj = {};

    if(cdtx_option_form) {
        var formData = new FormData(cdtx_option_form);
        if(formData) {
            formData.forEach((value, key) => (formDataObj[key] = value));
        }
    }
    
    var optionkl__modecase = document.getElementById('optionkl__modecase').value || "";
    var optionkl__inputyourname = document.getElementById('optionkl__inputyourname').value || "";

    var optionkl__disable_dialog = false;
    if(chkelm = document.getElementById('optionkl__disable-dialog')) {
        optionkl__disable_dialog = chkelm.checked;
    }

    var optionkl__enable_sf_helper = false;
    if(chkelm = document.getElementById('optionkl__enable-sf-helper')) {
        optionkl__enable_sf_helper = chkelm.checked;
    }
    
    var optionkl__form_option_data = formDataObj || {};

    if (country == "Vietnam") {

        chrome.browserAction.setBadgeText({ text: "VN" });

    } else if (country == "Thailand") {

        chrome.browserAction.setBadgeText({ text: 'TH' });


    } else if (country == "China") {

        chrome.browserAction.setBadgeText({ text: 'CN' });


    } else if (country == "Japan") {

        chrome.browserAction.setBadgeText({ text: 'JP' });

    } else if (country == "Korea") {

        chrome.browserAction.setBadgeText({ text: 'KR' });

    } else if (country == "Indonesia") {

        chrome.browserAction.setBadgeText({ text: 'ID' });

    } else if (country == "English") {

        chrome.browserAction.setBadgeText({ text: 'EN' });

    }
    else if (country == "Other") {

        chrome.browserAction.setBadgeText({ text: 'CB' });

    }



    chrome.storage.sync.set({
        mycountry: country,
        ouremail: youremail,

        optionkl__modecase: optionkl__modecase,
        optionkl__inputyourname: optionkl__inputyourname,
        optionkl__disable_dialog: optionkl__disable_dialog,
        optionkl__enable_sf_helper: optionkl__enable_sf_helper,
        optionkl__form_option_data: optionkl__form_option_data,
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved, refresh your SF';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}





function inject_options() {
    var myGTM = document.getElementById('yourGTM').value.trim();
    console.log("my GTM injector ID is " + myGTM);
    chrome.runtime.sendMessage({ message: myGTM });



    chrome.storage.sync.set({
        myInjector: myGTM, gtmToDo: 'start'
    }, function (items) {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        
        document.getElementById('optionkl').setAttribute("data-gtmtodo", 'start');
        
        status.textContent = 'GTM injected, refresh your browser';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}


function stop_injector() {
    var myGTM = document.getElementById('yourGTM').value;
    console.log("my GTM injector ID is " + myGTM);
    chrome.runtime.sendMessage({ message: myGTM });



    chrome.storage.sync.set({
        gtmToDo: 'stop'
    }, function (items) {
        document.getElementById('optionkl').setAttribute("data-gtmtodo", 'stop');

        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'GTM injector stopped, refresh your browser';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}


function restore_options() {
    var y = "";

    chrome.storage.local.get({
        cdtx_loadgooglesheetpublish: {},
    }, function(result) {
        var _systemlst = false;
        if(result.cdtx_loadgooglesheetpublish['System']) {
            if(_systemlst = result.cdtx_loadgooglesheetpublish['System'].sheettab) {
                console.log(_systemlst)
                _systemlst.forEach((_item) => {
                    if(_item['Key'] === 'form_option') {
                        document.querySelector('[data-formdata="form_option"]').innerHTML = _item['Value'];
                    }
                })
            }
        }
    });

    chrome.storage.sync.get({
        mycountry: 'Thailand',
        ouremail: '',
        myInjector: '',
        gtmToDo: 'notStart',
        optionkl__modecase: "Auto",
        optionkl__inputyourname: "",
        optionkl__disable_dialog: false,
        optionkl__enable_sf_helper: false,
        optionkl__form_option_data: {},
    }, function (items) {
        var _country_lowercase = items.mycountry ? items.mycountry.toLocaleLowerCase() : '';
        console.log(items);
        console.log('why not here ' + items.myInjector + ' ' + items.gtmToDo);
        document.getElementById('country').value = items.mycountry;
        document.getElementById('youremail').value = items.ouremail;
        document.getElementById('yourGTM').value = items.myInjector;

        document.getElementById('optionkl').setAttribute("data-optionkl", items.mycountry);
        document.getElementById('optionkl').setAttribute("data-gtmtodo", items.gtmToDo);

        if(_country_lowercase) {
            if(elm = document.getElementById('optionkl').querySelector('.optionkl_logo')){
                elm.insertAdjacentHTML('afterBegin', `<span class="optionkl_flagmarket" ></span>`);
            }
        }
        
        document.getElementById('optionkl__modecase').value = items.optionkl__modecase;
        document.getElementById('optionkl__inputyourname').value = items.optionkl__inputyourname;

        if(elm = document.getElementById('optionkl__disable-dialog')) {
            elm.checked = items.optionkl__disable_dialog;
        }

        if(elm = document.getElementById('optionkl__enable-sf-helper')) {
            elm.checked = items.optionkl__enable_sf_helper;
        }
        
        
        for (const [key, value] of Object.entries(items.optionkl__form_option_data)) {
            // console.log(`${key}: ${value}`);
            // if(!document.querySelector(`form [name="${key}"]`)) return;

            if(key.startsWith('cdtx_chk')) {
                document.querySelector(`form [name="${key}"]`).checked = false;
                if(value) {
                    document.querySelector(`form [name="${key}"]`).checked = true;
                }
            }

            
            if(key.startsWith('cdtx_select')) {
                document.querySelector(`form [name="${key}"]`).selected = false;
                if(value) {
                    document.querySelector(`form [name="${key}"]`).selected = true;
                }
            }
            
            if(key.startsWith('cdtx_text')) {
                document.querySelector(`form [name="${key}"]`).value = "";
                if(value) {
                    document.querySelector(`form [name="${key}"]`).value = value;
                }
            }
        }
        

        


        console.log(items.ouremail);
        y = items.mycountry;
        window.superx = y;
        chrome.runtime.sendMessage({ message: country });
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

document.getElementById('country').addEventListener('change', function (e) {
    var elem_parent = this.closest('[id="optionkl"]');
    document.getElementById('optionkl').setAttribute("data-optionkl", this.value);


    // Vietnamses
    if (this.value === 'Vietnam') {
        // elem_parent.querySelector('[name="youremail"]').value='';

    }


});



if(optionkl__databtnclk_resetdata = document.querySelector('[data-btnclk="resetdata"]')) {
    optionkl__databtnclk_resetdata.addEventListener('click', function(e) {
        elm = e.target;
        if (confirm("You sure reupdate")) {
            elm.innerText = 'LOADING';
            elm.style.opacity = '0.2';
            var _arrlistkey = [
                'cdtx_scriptsync_auto', 
                'cdtx_loadgooglesheetpublish_timesave', 
                'cdtx_loadgooglesheetpublish', 
                'stylecasebytheme', 
            ];
            
            var _n_finish = 0;
            _arrlistkey.forEach(key => {
                chrome.runtime.sendMessage({method: 'fe2bg_chromestorage_remove', key: key}, (response) => {
                    console.log('remove ' + key + ' => DONE');

                    _n_finish++;
                    if(_n_finish === _arrlistkey.length) {
                        elm.innerText = 'RESET';
                        elm.style.opacity = '1';
                    }
                });
            });

            
            
        }
    })
}


document.querySelector('#startGTM').addEventListener('click', function(){
    inject_options()
})

document.querySelector('#stopGTM').addEventListener('click', function(){
    stop_injector()
})




