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
    if(typeof _elm === 'string') {
        document.querySelectorAll(_elm).forEach(() => {
            if (_elm.classList.contains(_class)) {
                _elm.classList.remove(_class);
                return false;
            } else {
                _elm.classList.add(_class);
                return true;
            }
        })
    } else {
        if (_elm.classList.contains(_class)) {
            _elm.classList.remove(_class);
            return false;
        } else {
            _elm.classList.add(_class);
            return true;
        }
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

function checkInputEmailInboxAndFix(n_once_check = 0){
    if(window.tagteamoption.optionkl__disable_autofixemail == true) {
        checkInputEmailInbox();
        return false;
    }

    var str_elmparent = '.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top[card-type="compose"] ';

    var _global_status = {
        "test": true
    };

    if(n_once_check > 3) {
        console.log("eie - recheck ???")
        return false;
    }

            
    cLog(() => {console.log("eie --- wait checkInputEmailInboxAndFix"  ); });
    // as least has 1 input cc

    wait4Elem(str_elmparent + 'email-address-input.input.cc input.input').then((_caseid_elm) => {
        
        cLog(() => {console.log("eie --- START Wait - has input "  ); });
        
        var _obj_wait = () => {
            var caseload = window.dataTagteam.current_case;
            if(caseload) {
                
                // Email customer empty
                    if(!caseload.customer_email) {
                        cLog(() => {console.log("eie --- caseload.customer_email NOT ISSET 1 "  ); });
                        return false;
                    } 
                    if(caseload.customer_email.includes('@') === false) {
                        cLog(() => {console.log("eie --- caseload.customer_email NOT ISSET 2 "  ); });
                        return false;
                    }

                // Case ID is match
                var _caseid_elm = document.querySelector('[debug-id="case-id"] .case-id');
                if(_caseid_elm) {
                    if(window.dataTagteam.current_case.case_id !== _caseid_elm.innerText.trim()) {
                        setTimeout(() => {
                            checkInputEmailInboxAndFix(n_once_check + 1);
                        }, 1000);
    
                        return false;
                    }
                }
                
                cLog(() => {console.log("eie --- START", "Case ID", window.dataTagteam.current_case.case_id ); });
                    
                // n > 10 stop ngay
                var n_oncedequi = 0;
                var n_email_am_haserror = 0;
                var timekey = Date.now();
                var elm_str_elmparent_headers = document.querySelector(str_elmparent + ".headers");
    
                // ONCE IF HAS DATA-EIEID
                if(elm_str_elmparent_headers.getAttribute('data-eieid')) {
                    cLog(() => { console.log("eie --- STOP -> IF HAS RUN! ") });
    
                    return false;
                }
                
                if(elm_str_elmparent_headers) {
                    elm_str_elmparent_headers.setAttribute('data-eieid', timekey);
                }
    
                var elm_parentheader = document.querySelector(`[data-eieid="${timekey}"]`);
                if(!elm_parentheader) {
                    elm_parentheader = elm_str_elmparent_headers;
                }
    
                
                var recheck_fix_alert = (_callback, n_step = "0unmark", elm_parentheader) => {
                    
                    cLog(() => { console.log("eie - recheck_fix_alert - step: ", n_step) });
    
                    if(n_oncedequi > 10) {
                        cLog(() => {console.log("eie --- STOP DEQUI"); });
                        document.body.classList.remove("is_recheck_fix_alert_fixing");
                        elm_parentheader.classList.add("finished");
                        return false;
                    }
                    n_oncedequi++;
    
    
                        var _email_input_from = elm_parentheader.querySelector('email-address-dropdown.input.from');
                        var _email_input_to = elm_parentheader.querySelector('email-address-input.input.to');
                        var _email_input_cc = elm_parentheader.querySelector('email-address-input.input.cc');
                        var _email_input_bcc = elm_parentheader.querySelector('email-address-input.input.bcc');
                        
                        if(_email_input_from && _email_input_to && _email_input_cc && _email_input_bcc) {
                            
                            // Explore 0unmark
                            if(n_step === "0unmark") {
                                var unmaskbutton = elm_parentheader.querySelectorAll('.unmask-button');
                                
                                cLog(() => {console.log("eie --- 0unmark - length ", unmaskbutton.length); });
    
                                if(unmaskbutton.length) {
                                    unmaskbutton.forEach(function (elm) {
                                        elm.click();
                                        
                                        // if(_global_status.test) {
                                        //     elm.classList.remove("unmask-button");
                                        // }
                                    });
                                    
                                    
                                    setTimeout(() => {
                                        recheck_fix_alert(_callback, "0unmark", elm_parentheader);
                                    }, 2000);
                                    return false;
                                } else {
    
                                    // NEXT Step => CHECK
                                    recheck_fix_alert(_callback, "1checkemail", elm_parentheader);
                                }
    
                                return false;
                            }
    
                            if(n_step === "1checkemail") {
                                var n_err = 0;
                                if(_email_input_from.innerText.includes('technical-solutions@google.com') === false) {
                                    n_err++;
                                }
                                
                                if(_email_input_to.innerText.includes(caseload.customer_email) === false) {
                                    cLog(() => { console.log("eie - recheck_fix_alert customer_email ") });
                                    n_err++;
                                }
                            
                                if(caseload.am_isgcc) {
                                    if(_email_input_cc.innerText.includes("@") !== false) {
                                        cLog(() => { console.log("eie - recheck_fix_alert is gcc CC has DATA => It should empty ") });
                                        n_err++;
                                        n_email_am_haserror++;
                                    }
    
                                    if(_email_input_bcc.innerText.includes(caseload.am_email) === false) {
                                        cLog(() => { console.log("eie - recheck_fix_alert is gcc caseload.am_email wrong ") });
                                        n_err++;
                                        n_email_am_haserror++;
                                    }
                                } else {
                                    if(_email_input_cc.innerText.includes(caseload.am_email) === false) {
                                        cLog(() => { console.log("eie - recheck_fix_alert am email wrong ") });
                                        n_err++;
                                        n_email_am_haserror++;
                                    }
    
                                    if(_email_input_bcc.innerText.includes("@") !== false) {
                                        cLog(() => { console.log("eie - recheck_fix_alert BCC has DATA => It should empty ") });
                                        n_err++;
                                        n_email_am_haserror++;
                                    }
                                }
    
                                if(n_err > 0) {
                                    
                                    var _elm_expand_more = elm_parentheader.querySelector('compose-card-content-wrapper .headers [icon="expand_more"]:not(.rotated)');
                                    
                                    if(_elm_expand_more) {
                                        _elm_expand_more.click();
                                    }
    
                                    // NEXT Step => clear Input
                                    recheck_fix_alert(_callback, "2clearinputtoccbcc_and_fix", elm_parentheader);
                                } else {
    
                                    // Done
                                    document.body.classList.remove("is_recheck_fix_alert_fixing");
                                    elm_parentheader.classList.add("finished");
                                    _callback();
                                    return false;
                                }
                            }
    
                            if(n_step === '2clearinputtoccbcc_and_fix') {
                                
                                    // clearInput
                                    if(_email_input_to.innerText.includes(caseload.customer_email) === false) {
                                        var elm_to_remove = elm_parentheader.querySelectorAll(".input.to cases-icon.remove");
                                        elm_to_remove.forEach(function (elm) {
                                            setTimeout(() => {
                                                elm.click();
                                            }, 300)
                                        });
                                    }
                                
                                    if(n_email_am_haserror > 0) {
                                        var elm_cc_remove = elm_parentheader.querySelectorAll(".input.cc cases-icon.remove");
                                        elm_cc_remove.forEach(function (elm) {
                                            setTimeout(() => {
                                                elm.click();
                                            }, 300)
                                        });
                                    
                                        var elm_bcc_remove = elm_parentheader.querySelectorAll(".input.bcc cases-icon.remove");
                                        elm_bcc_remove.forEach(function (elm) {
                                            setTimeout(() => {
                                                elm.click();
                                            }, 300)
                                        });
                                    }
    
                                    setTimeout(()=>{
                                        recheck_fix_alert(_callback, "3fix", elm_parentheader);
                                    }, 1500);
                            }
    
                            if(n_step === '3fix') {
                                document.body.classList.add("is_recheck_fix_alert_fixing");
                                // Fix mail from
                                    if(_email_input_from.innerText.includes('technical-solutions@google.com') === false) {
                                        document.querySelector(str_elmparent + ".input.from material-dropdown-select material-icon").click();
                                        var n_time = 0;
                                        var time_input_key1 = setInterval(function(){
                                            var elm_technical = document.querySelector('[id="email-address-id--technical-solutions@google.com"]');
                                            if(elm_technical) {
                                                elm_technical.click();
                                                clearInterval(time_input_key1);
                                            }
                                    
                                            if(n_time > 5) {
                                                clearInterval(time_input_key1);
                                            }
                                            n_time++;
                                            
                                        }, 1000);   
                                    } 
    
                                // Fix mail to
                                    if(_email_input_to.innerText.includes(caseload.customer_email) === false) {
                                        var elm_input_to = elm_parentheader.querySelector(".input.to input");
                                        elm_input_to.value = caseload.customer_email;
                                        elm_input_to.dispatchEvent(new Event('input'));
                                        elm_input_to.dispatchEvent(new Event('enter'));
                                        elm_input_to.dispatchEvent(new Event('change'));
                                    
                                    
                                        var n_time = 0;
                                        var time_input_key2 = setInterval(function(){
                                            // debug-id email is outdiv
                                            var elm_technical = document.querySelector('email-address-content [debug-id="email"]')
                                            if(elm_technical) {
                                                elm_technical.click();
                                                clearInterval(time_input_key2);
                                            }
    
                                            //
                                            if(n_time > 5) {
                                                clearInterval(time_input_key2);
                                            }
                                            n_time++;
                                            
                                        }, 1000);
                                    }
    
                                // Fix cc bcc
                                    var elm_area = elm_parentheader.querySelector(".input.cc");
                                    if (caseload.am_isgcc) {
                                        elm_area = elm_parentheader.querySelector(".input.bcc");
                                    }
                                
                                    var elm_input = elm_area.querySelector("input");
                                    if (elm_area.innerText.includes(caseload.am_email) === false) {
                                        elm_input.value = caseload.am_email;
                            
                                        elm_input.dispatchEvent(new Event('input'));
                                        elm_input.dispatchEvent(new Event('enter'));
                                        elm_input.dispatchEvent(new Event('change'));
                            
                            
                                        var n_time = 0;
                                        var time_input_key3 = setInterval(function () {
                                            var elm_technical = document.querySelector('[debug-id="email"]')
                                            if (elm_technical) {
                                                elm_technical.click();
                                                clearInterval(time_input_key3);
                                            }
                            
                            
                                            //
                                            if (n_time > 5) {
                                                clearInterval(time_input_key3);
                                            }
                                            n_time++;
                            
                                        }, 1000);
                                    }
    
    
                                // Recheck after 3s
                                setTimeout(function(){
                                    recheck_fix_alert(_callback, "1checkemail", elm_parentheader);
                                }, 4000);
    
                            }
    
                        } 
                }
    
                setTimeout(() => {
                    recheck_fix_alert(() => {
                        console.log("eie -- All OK????");
                    }, '0unmark', elm_parentheader);
                }, 1000);
            }
        }

        
        var _my_settimeout = setTimeout(() => {
            cLog(() => {console.log("eie --- *** TIME OUT"  ); });
            _obj_wait();
        }, 4000);

        
        wait4Elem(str_elmparent + '.unmask-button').then((_caseid_elm) => {
            cLog(() => {console.log("eie --- *** Has unmark-button"  ); });
            clearTimeout(_my_settimeout);
            _obj_wait();
            
        });
    });
        
    

}

// ====
// Check Input Email Inbox
// ====
function checkInputEmailInbox(){

    var str_elmparent = '.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top[card-type="compose"] ';

    wait4Elem(str_elmparent + 'email-address-input.input.cc input.input').then((_caseid_elm) => {
        
        var _obj_wait = () => {

            var _caseid_elm = document.querySelector('[debug-id="case-id"] .case-id');
            if(_caseid_elm) {
                // var caseload = loadCaseDatabaseByID(_caseid_elm.innerText);
                var caseload = window.dataTagteam.current_case;
                if(caseload) {
                    // Explore unmark
                    var unmaskbutton = document.querySelectorAll(str_elmparent + '.unmask-button');
                    if(unmaskbutton.length) {
                        unmaskbutton.forEach(function (elm) {
                            elm.click();
                            
                            // if(_global_status.test) {
                            //     elm.classList.remove("unmask-button");
                            // }
                        });
                    }
        
                    var n_oncedequi = 0;
                    var recheckand_alert = () => {
                        cLog(() => {console.log("eie --- DEQUI", n_oncedequi); });
                        
                        if(n_oncedequi > 10) {
                            cLog(() => {console.log("eie --- STOP DEQUI"); });
                            return false;
                        }
                        n_oncedequi++;
                        
                        setTimeout(function(){
                            var unmaskbutton = document.querySelectorAll(str_elmparent + '.unmask-button');
                            if(unmaskbutton.length) {
                                recheckand_alert();
        
                                return false;
                            }
                            
                            var _email_input_from = document.querySelector(str_elmparent + 'email-address-dropdown.input.from');
                            var _email_input_to = document.querySelector(str_elmparent + 'email-address-input.input.to');
                            var _email_input_cc = document.querySelector(str_elmparent + 'email-address-input.input.cc');
                            var _email_input_bcc = document.querySelector(str_elmparent + 'email-address-input.input.bcc');
        
                            if(_email_input_from && _email_input_to && _email_input_cc && _email_input_bcc) {
        
                                    
                                    var n_err = 0;
                                    if(_email_input_from.innerText.includes('technical-solutions@google.com') === false) {
                                        if(_email_input_from.closest('.header')) {
                                            _email_input_from.closest('.header').setAttribute("data-type", "_chk_email_agains");
                                        }
                                        _email_input_from.classList.add("_chk_email_from_wrong");
            
                                        noteBarAlert('Mail From => wrong', caseload.case_id);
                                        n_err++;
                                        
                                    }
                                    
                                    if(_email_input_to.innerText.includes(caseload.customer_email) === false) {
                                        if(_email_input_to.closest('.header')) {
                                            _email_input_to.closest('.header').setAttribute("data-type", "_chk_email_agains");
                                        }
                                        _email_input_to.classList.add("_chk_email_to_wrong");
                                        
                                        noteBarAlert('Mail TO => wrong / missing', caseload.case_id);
                                        n_err++;
                                    }
                                
                                    if(caseload.am_isgcc) {
                                        if(_email_input_bcc.innerText.includes(caseload.am_email) === false) {
                                            if(_email_input_bcc.closest('.header')) {
                                                _email_input_bcc.closest('.header').setAttribute("data-type", "_chk_email_agains");
                                            }
                                            _email_input_bcc.classList.add("_chk_email_bcc_wrong");
                                        
                                            noteBarAlert('Is BCC => BCC => wrong / missing', caseload.case_id);
                                            n_err++;
                                        }
                                    } else {
                                        
                                        if(_email_input_cc.innerText.includes(caseload.am_email) === false) {
                                            if(_email_input_cc.closest('.header')) {
                                                _email_input_cc.closest('.header').setAttribute("data-type", "_chk_email_agains");
                                            }
                                            _email_input_cc.classList.add("_chk_email_cc_wrong");
                                            noteBarAlert('Mail CC => wrong / missing', caseload.case_id);
                                            n_err++;
                                        }
                    
                                    }
                                    
                                    if(n_err > 0) {
                                        var _elm_expand_more = document.querySelector(str_elmparent + 'compose-card-content-wrapper .headers [icon="expand_more"]:not(.rotated)');
                                        
                                        if(_elm_expand_more) {
                                            _elm_expand_more.click();
                                        }
                                    }
                                    
            
                                
                            }
        
                        }, 3000)
                    }
        
        
                    recheckand_alert();
                    
                }
            }
        }

        
        var _my_settimeout = setTimeout(() => {
            cLog(() => {console.log("eie --- *** TIME OUT"  ); });
            _obj_wait();
        }, 4000);

        
        wait4Elem(str_elmparent + '.unmask-button').then((_caseid_elm) => {
            cLog(() => {console.log("eie --- *** Has unmark-button"  ); });
            clearTimeout(_my_settimeout);
            _obj_wait();
            
        });

    });
}


function globalForAll(window) {

    // Feature auto save and recall case id
    if(window.location.hostname === "analytics-ics.corp.google.com" ) {

        try {
        
            var _key = 'cdtx_analytics-ics_listcaseandlink';
            var _datatemp = "";
            var _caseid_indata = "";
            var n_once = 0;
            
            getChromeStorage(_key, (response) => {
                _datatemp = response.value || "";
                cLog(() => {console.log("analytics - here started", _datatemp)});

                if(_datatemp) {
                    var _caseinput = _datatemp.split("|--|");
                    _caseinput = _caseinput.filter(function(e){return e});
                    
                    _caseinput.forEach((elm) => {
                        if(elm.includes(location.href)) {
                            _caseid_indata = elm.split('|-|')[1];
                        }
                    });
                    cLog(() => {console.log("analytics - list", _caseinput)});

                }

                onClickElm('md-dialog.ics-data-access-reason-dialog button.ics-dialog-confirm', 'click', function(elm, e){
                    var _parent = elm.closest('md-dialog.ics-data-access-reason-dialog');
                    var caseid = _parent.querySelector('[name="caseId"]').value;
                    var _keysave = (location.href + "|-|" + caseid );
                    if(_datatemp.includes(_keysave) == false) {
                        _datatemp = _datatemp + "|--|" + _keysave;
                        setChromeStorage(_key, _datatemp);
                    }
                });
            });


            // Select the node that will be observed for mutations
            var targetNode = document.body;
    
            // Options for the observer (which mutations to observe)
            var config = { attributes: true, childList: true, subtree: true };
    
            // Callback function to execute when mutations are observed
            var callback = function(mutationList, observer) {
                // on-call, precall button 
                var _istopelm = document.querySelector(`md-dialog.ics-data-access-reason-dialog [name="caseId"]`);
                cLog(() => { console.log("analytics - 1") });
                if(_istopelm) {
                    cLog(() => { console.log("analytics - 2", _caseid_indata, _datatemp) });
                    if(_istopelm.value.trim() === '' && _caseid_indata !== '' && n_once === 0) {
                        _istopelm.value = _caseid_indata;
                        
                        _istopelm.dispatchEvent(new Event('input'));
                        _istopelm.dispatchEvent(new Event('enter'));
                        _istopelm.dispatchEvent(new Event('change'));

                        n_once++;
                    }
                } else {
                    n_once = 0;
                }
            };
    
            // Create an observer instance linked to the callback function
            var observer = new MutationObserver(callback);
    
            // Start observing the target node for configured mutations
            observer.observe(targetNode, config);
        } catch (error) {
            console.error(error)
        }
    }

    // Check Pool case
        readPoolCase()
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



function readPoolCase() {
    try {
            
        if(window.location.hostname !== 'cases.connect.corp.google.com') return false;
        cLog(() => {console.log("_readPoolCase", "Start");});
        

        var _loadurl = function(url_file, frameID, _text, _color) {
            cLog(() => {console.log("_readPoolCase", "url_file", url_file);});
            var _str_iframe = '<iframe src="' + url_file + '" id="' + frameID + '" style="width: 1600px; height: 768px; transform: scale(.3); position: absolute; left: 0; top: 0; opacity: 0; pointer-events: none;"></iframe>';
            document.body.insertAdjacentHTML("beforeEnd",_str_iframe);
            
            var _button_navigation = `<div class="section _mycasecustom_pool" style=" border-bottom: 1px solid #dadce0; padding: 16px 16px 16px 0; "> <a href="__URLFILE__" style=" align-items: center; border-radius: 0 18px 18px 0; color: #3c4043; cursor: pointer; display: flex; font-family: Google Sans,Helvetica,Arial; font-weight: 500; line-height: 36px; padding-left: 24px; "><div class="name _ngcontent-dzv-45">${_text}</div><div class="search-count _ngcontent-dzv-45" style=" margin-left: auto; margin-right: 16px; color: ${_color} ">__NUMBER__</div></a> </div>`;
            
    
            var _temp_memory = sessionStorage || localStorage;
            var _number = 0;
            var _date_key = [
                new Date().getFullYear(),
                ("0" + new Date().getMonth()).slice(-2),
                ("0" + new Date().getDate()).slice(-2),
                ("0" + new Date().getHours()).slice(-2),
                ("0" + new Date().getMinutes()).slice(-2),
            ];


            var _loadui = () => {
                // Callback function to execute when mutations are observed
                var n_once = 0;
                var n_once_2 = 0;
                var _elm_queuesnavigation = null;
                var _elm_mycasesnavi = null;
                var callback = function(mutationList, observer) {
                    
                    cLog(() => {console.log("_readPoolCase", "scan");});

                    _elm_queuesnavigation = document.querySelector('queues-navigation');
                    _elm_mycasesnavi = document.querySelector('navigation-item.my-cases .text');
                    
                    if(_elm_mycasesnavi) {
                        if(n_once === 0) {
                            var _str_separate = (_elm_mycasesnavi.querySelector('[data-number]')) ? " / " : "";
                            _elm_mycasesnavi.innerHTML = _elm_mycasesnavi.innerHTML + _str_separate + ` <span style="color: ${_color}" data-number="${_number}">(${_number})</span>`;
                            n_once++;
                        }
                    } else {
                        n_once = 0;
                    }

                    
                    if(_elm_queuesnavigation) {
                        if(n_once_2 === 0) {
                            _button_navigation = _button_navigation.replace('__URLFILE__', url_file);
                            _button_navigation = _button_navigation.replace('__NUMBER__', _number)
                            _elm_queuesnavigation.insertAdjacentHTML("beforeEnd", _button_navigation);
                            n_once_2++;
                        }
                    } else {
                        n_once_2 = 0;
                    }
                };

                observeOnce(callback, document.querySelector('redbull-app'));
            }

            var _storage = _temp_memory.getItem("data_caseover" + frameID);
            if(_storage) {

                var _date_key_st = _storage.split("|-|")[0];
                _number = _storage.split("|-|")[1];
                cLog(() => {console.log("_Test", parseInt(_date_key.join("")) , parseInt(_date_key_st), parseInt(_date_key.join("")) - parseInt(_date_key_st));})
                if((parseInt(_date_key.join("")) - parseInt(_date_key_st)) < 30) {
                    if(parseInt(_number) > 0) {
                        _loadui();
                    }
                } else {
                    _temp_memory.removeItem("data_caseover" + frameID);
                }
            } else {
                // Frame
                const iframe = document.getElementById(frameID);
                const handleLoad = () => {
                    var nTime = 0;
                    var myTime = setInterval(function() {
                        var frameObj = document.getElementById(frameID);
                        if(frameObj) {
                            var frameContent = frameObj.contentWindow.document.documentElement.outerHTML || frameObj.contentWindow.document.body.innerHTML;
                            var frameContentObj = frameObj.contentWindow.document.documentElement || frameObj.contentWindow.document.body;
                            
                            var _elms = frameContentObj.querySelectorAll(".selection-count");
                            var _elms_id_sumary = frameContentObj.querySelectorAll(`[debug-id="summary"]`);
                            
                            var _isfinish = false;
                            if(_elms_id_sumary.length) {  
                                _isfinish = true;
                            }
            
                            // 6s
                            if(nTime > 6) {
                                frameObj.remove();
                                
                                // Save to storage
                                _temp_memory.setItem("data_caseover" + frameID, (_date_key.join("")) + "|-|" + _number);
                                cLog(() => {console.log("_readPoolCase", "NG", _elms_id_sumary);});
                            }
            
                            if(_isfinish) {
                                _number = _elms_id_sumary.length;
                                cLog(() => {console.log("_readPoolCase", "OK",_elms_id_sumary.length )});
            
                                if(parseInt(_number) > 0) {

                                    // LOAD UI
                                    _loadui();
                                }
                                
            

                                // Save to storage
                                _temp_memory.setItem("data_caseover" + frameID, (_date_key.join("")) + "|-|" + _number);
                                
                                // Stop
                                clearInterval(myTime);
                                frameObj.remove();
                            }
                        } else {
                            var _str_iframe = '<iframe src="' + url_file + '" id="' + frameID + '" style="width: 1600px; height: 768px; transform: scale(.3); position: absolute; left: 0; top: 0; opacity: 0; pointer-events: none;"></iframe>';
                            document.body.insertAdjacentHTML("beforeEnd",_str_iframe);
                        }
                        
                        cLog(() => {console.log("_readPoolCase", nTime, _elms);});
                        
                        // 10s
                        if(nTime > 10) {
                            clearInterval(myTime);
                        }
                        nTime++;       
                    }, 2000);
        
        
                };
        
                iframe.addEventListener('load', handleLoad, true);
            }
        }
        

        
        
        var is_live = window.result.optionkl__modecase != "Development" ? true : false;
        var untouch_over_10_days = '';
        var email_due_reply_24hrs = '';

        if(is_live) {
            untouch_over_10_days = `https://cases.connect.corp.google.com/#/queues/pool/3004773/-state%3A%28finished%20%7C%20solution_offered%29%20-modified%3A10d%20assignee%3Ame%0A/IMPORTANCE`;
            _loadurl(untouch_over_10_days, "_live_oncehere", "Untouch over 10 days", "#f44336");

            email_due_reply_24hrs = `https://cases.connect.corp.google.com/#/queues/pool/3004773/state%3Aassigned%20num_out_email%3E1%20duein%3A24%20assignee%3A%20me/IMPORTANCE`;
            _loadurl(email_due_reply_24hrs, "_live_oncehere_2",  "Email Due Reply 24hrs", "#ff9800");
        } else {
            
            untouch_over_10_days = `https://cases.connect.corp.google.com/#/queues/pool/3004773/-state%3A%28finished%20%7C%20solution_offered%29%20-modified%3A10d%20assignee%3Axuanthac/IMPORTANCE`;
            _loadurl(untouch_over_10_days, "_dev_oncehere", "Untouch over 10 days", "#f44336");

            email_due_reply_24hrs = `https://cases.connect.corp.google.com/#/queues/pool/3004773/state%3Aassigned%20num_out_email%3E1%20duein%3A24/IMPORTANCE`;
            _loadurl(email_due_reply_24hrs, "_dev_oncehere_2",  "Email Due Reply 24hrs", "#ff9800");


        }
        
    } catch (error) {
            
    }
}

function observeOnce(callback, targetNode = document.body, config = { attributes: true, childList: true, subtree: true }) {
    var observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
}




function load_remote (result, _default_action) {
    var _timekey_current = new Date().getDate() + "" + new Date().getHours();
    // var _timekey_current = new Date().getDate() + "" + new Date().getMinutes();
    var _option = result.optionkl__modecase; // Auto | Development | ExtensionDefault


    switch (_option) {
    
        // ExtensionDefault
        case 'ExtensionDefault':
            _default_action();
    
            break;
    
    
        // Development
        // vi_api_blog | action: script4dev
        case 'Development':
                var _key = "cdtx_scriptsync_dev";
                var _body = {
                    "action": "script4dev",
                    "language": result.mycountry,
                };
                
                load_fetch_post_content(vi_api_blog, _body, (response_api) => {
                    if(response_api.rs) {
                        setChromeStorage(_key, response_api.rs , () => {
                            if(response_api.typeaction == 'script_sync') {
                                try {
                                    eval(response_api.script_str);
                                } catch (e) {
                                    if (e instanceof SyntaxError) {
                                        console.error("Error", e);
                                    }
                                }
                            } else {
                                _default_action();
                            }
                        });
                    }
                });
            break;
    
        // Auto - auto sync
        // vi_api_blog  | action: script4agent
        default:
                var _key = "cdtx_scriptsync_auto";
    
                var _sync_api = (_objectvalue) => {
                    var _body = {
                        "action": "script4agent",
                        "language": result.mycountry,
                        "timesync": _timekey_current						
                    };
                    load_fetch_post_content(vi_api_blog, _body, (response_api) => {
                        
                        cLog(() => {console.log("load_fetch_post_content", response_api);})

                        if(response_api.rs) {
                            setChromeStorage(_key, response_api , () => {
                                if(response_api.typeaction == 'script_sync') {
                                    try {
                                        eval(response_api.script_str);
                                    } catch (e) {
                                        if (e instanceof SyntaxError) {
                                            console.error("Error", e);
                                            _default_action();
                                        }
                                    }
                                } else {
                                    _default_action();
                                }
                            });
                        } else {
                            cLog(() => {console.log("FETCH DATA ERROR or RETURN FALSE")})
                            var _rsfalse = {
                                rs: false,
                                script_str: _objectvalue.script_str,
                                timesync: _timekey_current,// day+hour
                                typeaction: _objectvalue.typeaction, // script_sync
                            }
                            setChromeStorage(_key, _rsfalse , () => {
                                if(response_api.typeaction == 'script_sync') {
                                    try {
                                        eval(_objectvalue.script_str);
                                    } catch (e) {
                                        if (e instanceof SyntaxError) {
                                            console.error("Error", e);
                                            _default_action();
                                        }
                                    }
                                } else {
                                    _default_action();
                                }
    
                            })
                        }
                    });
                }
                
                getChromeStorage(_key, (response) => {
                    var _objectvalue = {};
                    if(response.value) {
                        _objectvalue = response.value;
                        cLog(() => {console.log("===", _objectvalue)})
                        // 
                        if(_objectvalue.timesync == _timekey_current) {
                            cLog(() => {console.log("_CACHE", _objectvalue.typeaction)})
                            if(_objectvalue.typeaction == 'script_sync') {
                                try {
                                    eval(_objectvalue.script_str);
                                } catch (e) {
                                    if (e instanceof SyntaxError) {
                                        console.error("Error", e);
                                        _default_action();
                                    }
                                }
                            } else {
                                _default_action();
                            }
                        } else {
                            // Sync API
                            _sync_api(_objectvalue)
                        }
                    } else {
                        cLog(() => {console.log("FIRST TIME => FETCH API")})
                        // Sync API
                        _sync_api(_objectvalue);
                    }
                });
                
    }
}