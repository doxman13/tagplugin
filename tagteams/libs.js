// ==== VARIABLE GLOBAL ====
window.dataTagteam = window.dataTagteam || {};
window.dataTagteam.extension_id = chrome.runtime.id;
window.dataTagteam.assets_url_img = 'chrome-extension://' + window.dataTagteam.extension_id + '/assets/img';



// ==== LIB ====
function loadCaseDatabaseByID(case_id) {
    // console.log(window.dataTagteam.current_case)
    if (dataStatus.case_list) {
        // console.log("dataStatus.case_list ||| ", case_id, dataStatus.case_list[0].case_id)
        for (let index = 0; index < dataStatus.case_list.length; index++) {
            var _item = dataStatus.case_list[index];
            if (_item.case_id === case_id) {
                cLog(()=>{console.log('loadCaseDatabaseByID | ', case_id, _item.case_id)});
                return _item;
                break;
            }
        }
    }

    return false;
}


function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}

// UpperCase
function capitalizeFirstLetter(string) {
    if(string[0]) {
        return string[0].toUpperCase() + string.slice(1);
    }
}

// getOnlyCaseId
function getOnlyCaseId(_string) {
    try {
        var _regex = /[0-9]{1}[-][0-9]{13}/g;
        _string = _regex.exec(_string);
        if (_string[0]) {
            return _string[0];
        }
        return false;
    } catch (error) {
        return false;
        console.error(error);
    }
    return false;
}

// Format Again Ads ID
function reformatAdsId(str_adsid) {
    return str_adsid
        .replace(/\D+/g, '')
        .replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join('-') + "T" + [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds())
    ].join(':');
}



// Format again datetime by zone
function getDataTimeFormat(_datestring) {
    try {
        var _regex = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?Z?/g;
        
        // var _regex = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?/g;
        _datestring_regex = _regex.exec(_datestring);
        if (_datestring_regex[0]) {
            var date = new Date(_datestring_regex[0]);
            var dateNow = new Date();

            // Convert to timezone current by browser location
            // Ex: KL malaysia
            var offset = dateNow.getTimezoneOffset();
            date.setHours(date.getHours() - Math.abs(offset/60));

            console.log(_datestring_regex[0], date.toLocaleString());

            // return dateTimeZone.toISOString();
            return formatDate(date);
            // return _datestring[0];
        }

    } catch (error) {
        cLog(() => {console.log(error)});
        return false;
    }
    return false;
}
// ====
// Toggle Class
// ====
function toggleClass(_class, _elm) {
    if (_elm.classList.contains(_class)) {
        _elm.classList.remove(_class);
        return false;
    } else {
        _elm.classList.add(_class);
        return true;
    }
}

// ====
// wait4Elem
// ====

function wait4Elem(selector) {
    return new Promise(function (resolve, reject) {
        var el = document.querySelector(selector);
        if (el) {
            resolve(el);
            return;
        }
        new MutationObserver(function (mutationRecords, observer) {
            // Query for elements matching the specified selector
            Array.from(document.querySelectorAll(selector)).forEach(function (element) {
                resolve(element);
                //Once we have resolved we don't need the observer anymore.
                observer.disconnect();
            });
        }).observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    });
}

// ====
// Check Input Email Inbox
// ====
function checkInputEmailInbox(){
    var _global_status = {
        "test": true
    };


    var _caseid_elm = document.querySelector('[debug-id="case-id"] .case-id');
    if(_caseid_elm) {
        cLog(() => {console.log("checkInputEmailInbox", window.dataTagteam.current_case.case_id); });
        // var caseload = loadCaseDatabaseByID(_caseid_elm.innerText);
        var caseload = window.dataTagteam.current_case;
        if(caseload) {

            // Explore unmark
            var unmaskbutton = document.querySelectorAll('.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top .unmask-button');
            if(unmaskbutton.length) {
                unmaskbutton.forEach(function (elm) {
                    elm.click();
                    
                    if(_global_status.test) {
                        elm.classList.remove("unmask-button");
                    }
                });
            }

            
            var recheckand_alert = () => {
                
                setTimeout(function(){
                    var unmaskbutton = document.querySelectorAll('.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top .unmask-button');
                    if(unmaskbutton.length) {
                        recheckand_alert();

                        return false;
                    }
                    
                    var _email_input_from = document.querySelector('.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top email-address-dropdown.input.from');
                    
                    var _email_input_to = document.querySelector('.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top email-address-input.input.to');
                    
                    var _email_input_cc = document.querySelector('.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top email-address-input.input.cc');
                    var _email_input_bcc = document.querySelector('.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top email-address-input.input.bcc');

                    if(_email_input_from && _email_input_to && _email_input_cc && _email_input_bcc) {
                        _email_input_from.style.backgroundColor = "";
                        _email_input_to.style.backgroundColor = "";
                        _email_input_cc.style.backgroundColor = "";
                        _email_input_bcc.style.backgroundColor = "";

                        if(_email_input_from.innerText.includes('technical-solutions@google.com') === false) {
                            _email_input_from.style.backgroundColor = "#ff8f8f";
                            if(_email_input_from.closest('.header')) {
                                _email_input_from.closest('.header').classList.add("_chk_email_agains");
                            }
                            _email_input_from.classList.add("_chk_email_from_wrong");

                            noteBarAlert('Mail From => wrong', caseload.case_id);
                        }
                        
                        if(_email_input_to.innerText.includes(caseload.customer_email) === false) {
                            _email_input_to.style.backgroundColor = "#ff8f8f";
                            if(_email_input_to.closest('.header')) {
                                _email_input_to.closest('.header').classList.add("_chk_email_agains");
                            }
                            _email_input_to.classList.add("_chk_email_to_wrong");
                            
                            noteBarAlert('Mail TO => wrong / missing', caseload.case_id);
    
                        }
    
                        if(_email_input_cc.innerText.includes(caseload.am_email) === false) {
                            _email_input_cc.style.backgroundColor = "#ff8f8f";
                            if(_email_input_cc.closest('.header')) {
                                _email_input_cc.closest('.header').classList.add("_chk_email_agains");
                            }
                            _email_input_cc.classList.add("_chk_email_cc_wrong");
                            
                            noteBarAlert('Mail CC => wrong / missing', caseload.case_id);
    
                        }
    
                        if(caseload.am_isgcc) {
                            if(_email_input_bcc.innerText.includes(caseload.am_email) === false) {
                                _email_input_bcc.style.backgroundColor = "#ff8f8f";
                                if(_email_input_bcc.closest('.header')) {
                                    _email_input_bcc.closest('.header').classList.add("_chk_email_agains");
                                }
                                _email_input_bcc.classList.add("_chk_email_bcc_wrong");
                            
                                noteBarAlert('Is BCC => BCC => wrong / missing', caseload.case_id);
    
                            }
                        }
                    }

                }, 1000)
            }

            recheckand_alert();
            
        }
    }
}


// =====
// addCursor2contenteditable
// Add position cursor point 
// ====
function addCursor2Contenteditable(el, npos = 1) {
    var range = document.createRange()
    var sel = window.getSelection()

    range.setStart(el, npos);
    range.collapse(true)

    sel.removeAllRanges()
    sel.addRange(range);
}


// =====
// textAreaAdjust
// Auto height textarea
// ====
function textAreaAdjust(elm) {
    elm.style.height = "auto";
    elm.style.height = elm.scrollHeight + "px";
}

function tagteam_showGTMID() {
    // If has => make recheck interval
    wait4Elem("gtm-container-public-id").then((elm) => {
        var is_copy = () => {
            var gtmpublish = document.querySelector(".gtm-container-public-id");
            var gtmclone = document.querySelector(".gtm-clone");
            if(gtmpublish && !gtmclone) {
                var gtm_id = gtmpublish.innerText.trim();
                gtmpublish.insertAdjacentHTML("afterEnd", `<span class="gtm-clone" style="font-size: 14px;border: 1px solid #ccc;margin: 10px;padding: 10px;background: #fff;box-shadow: 0 0 17px #ccc;display: inline-block;line-height: 1;text-align: left;"><small style="user-select: none; display: block; color: #888; font-size: 70%; ">Copy below</small><span style=" user-select: all; margin: 7px 0; display: block; color: #888; ">${gtm_id}</span></span>`)
            }
        }

        is_copy();
        setInterval(() => {
            is_copy();
        }, 3000);
    });
    
}

// Support click all elem visbile anytime - like jQuery(document).on("click", "classElemString", function(){   });
// onClickElm 
// =====
function onClickElm(str_selector, eventstr, callback){
    document.addEventListener(eventstr, function(e){
        var str_elm = document.querySelectorAll(str_selector);
        str_elm.forEach(function(elm){
            if(elm === e.target) {
                callback(elm, e);
            } else {
                if(e.target.closest(str_selector) === elm ) {
                    callback(elm, e);
                }
            }
        });
        
    });
}



// Search key and return value
// Value like  abc : 123
// Return value => 123
function searchAndReturnValue(_str_data, _keysearch, _posvalue = 1){
    _str_data = _str_data.trim();
    var _newline = _str_data.split("\n");

    _newline = _newline.map(s => s.trim());
    var _item = "";
    for (let index = 0; index < _newline.length; index++) {
        _item = _newline[index];
        _item = _item.split(":");
        _item = _item.map(s => s.trim());
        
        // Only loop key, if ok => get value
        for (let index2 = 0; index2 < _item.length - 1; index2++) {
            var _keyindex = _item[index2];
            _key = _keysearch.replace("\n", " ");

            // console.log(_key, ",", _keyindex, _key === _keyindex);
            // console.log(_item[_posvalue]);
            if(_key === _keyindex){
                return _item[_posvalue].trim().length > 0 ? _item[_posvalue] : false;
                break;
            }

            _key = _keysearch.replace("\n", "");
            if(_key === _keyindex){
                return _item[_posvalue].trim().length > 0 ? _item[_posvalue] : false;
                break;
            }
        }
    }
    return false;
}

function cLog(callback) {
    // ?test
    if(window.location.search.includes("test")) {
        callback();
    }
}


function d_load_script(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = function () {
            callback();
        };
    }
    const staticUrlPolicy = trustedTypes.createPolicy("foo-js-static", {
        createScriptURL: () => url
    });
    script.src = staticUrlPolicy.createScriptURL("");;
    document.getElementsByTagName("head")[0].appendChild(script);
}


function loadFetchObject(url, _callback) {
    fetch(url, {
        method: 'GET'
    })
        .then(function(response) {
            return response.json();
        }).then(function(_content) {
            _callback(_content);
        });
}

function loadFetchContent(url, _callback) {
    fetch(url, {
        method: 'GET'
    })
        .then(function(response) {
            return response.text();
        }).then(function(_html_panel) {
            // chrome.scripting.executeScript(_html_panel);
            _callback(_html_panel);
        })
}



// ======
// For Storage
function setChromeStorage(key, value, _callback = false) {
    chrome.runtime.sendMessage({method: 'fe2bg_chromestorage_set', key: key, value: value}, (response) => {
        if(_callback !== false) {
            _callback(response);
        }
    });
}


function getChromeStorage(key, _callback = false) {
    chrome.runtime.sendMessage({method: 'fe2bg_chromestorage_get', key: key}, (response) => {
        if(_callback !== false) {
            response = response || {};
            _callback(response);
        }
    });
}

function removeChromeStorage(key, _callback = false) {
    chrome.runtime.sendMessage({method: 'fe2bg_chromestorage_remove', key: key}, (response) => {
        if(_callback !== false) {
            _callback(response);
        }
    });
}


// ============
// Noted bar 
function noteBarAlert(note, caseid) {
    
    // Add card noted
    if(note) {
        if(window.location.hostname === "cases.connect.corp.google.com" && window.location.href.indexOf("#/case/") > - 1) {
            var elm_casedetails = document.querySelector('case-details');

            if(note === 'CLEAR') {
                // Remove all if isset
                elm_casedetails.querySelectorAll(`noted[data-id] ._str`).forEach((elm)=>{
                    elm.remove();
                });

                return false;
            }
            
            if(document.querySelector('[debug-id="case-id"] .case-id').innerText.trim() == caseid) {
                if(elm_casedetails.querySelector(`noted[data-id="${caseid}"]`)) {
                    var _noted = elm_casedetails.querySelector(`noted[data-id="${caseid}"]`);
                    var _is_add = true;
                    
                    _noted.querySelectorAll("span").forEach((elm) => {
                        if(elm.innerText == note) {
                            _is_add = false;
                        }
                    })
        
                    if(_is_add) {
                        var _str = _TrustScript(note);
                        _noted.innerHTML += `<span class="_str" data-text="${_str}">${_str}</span>`;
                    }
                } else {
        
                    // Remove all if isset
                    elm_casedetails.querySelectorAll(`noted[data-id]`).forEach((elm)=>{
                        elm.remove();
                    });
        
                    // data id
                    var _str = `<noted data-id="${caseid}" ><span class="_str">${note}</span></noted>`;
                    _str = _TrustScript(_str);
                    elm_casedetails.querySelector('card-deck').insertAdjacentHTML("beforeBegin", _str);
                }
            }
        }
    }

}


// set TrustScript chrome
function _TrustScript (_string) {
    const staticHtmlPolicyv2 = trustedTypes.createPolicy('foo-static', {createHTML: () => _string}); 
    return staticHtmlPolicyv2.createHTML('');
}


// Load content
function load_fetch_post_content(url, _body, _callback) {
    // _body = {
    //     "action": "getpanel",
    //     "language": "vi"
    // };
    if(!_body.action ) return false;
    
    const formData = new FormData();
    Object.keys(_body).forEach(key => {
        formData.append(key, _body[key]);
    });
    
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(function(response) {
            return response.json();
        }).then(function(_content) {
            _callback(_content);
        }).catch((error) => {
            _callback(false);
        });;
}

