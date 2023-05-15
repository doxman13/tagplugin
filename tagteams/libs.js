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
    textArea.style.opacity = "0";
    textArea.style.position = "fixed";
    textArea.style.pointerEvents = "none";

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
        cLog(() => {console.log('Async: Copying to clipboard was successful!');});
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
    try {

        if(window.tagteamoption.optionkl__disable_autofixemail == true) {
            checkInputEmailInbox();
            return false;
        }

        var str_elmparent = '.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top[card-type="compose"] ';

        if(n_once_check > 3) {
            console.log("eie - recheck ???")
            return false;
        }

                
        cLog(() => {console.log("eie --- wait checkInputEmailInboxAndFix"  ); });
        // as least has 1 input cc

        wait4Elem(str_elmparent + 'dropdown-button .address').then((_caseid_elm) => {
            
            cLog(() => {console.log("eie --- START Wait - has input ", window.dataCase  ); });


            // Check EMAIL customer
            var is_email_customer = false;
            if(window.dataCase.customer_email) {
                if(window.dataCase.customer_email.includes('@')) {
                    is_email_customer = true;
                }
            }

            if(!is_email_customer) {
                Toastify({
                    text: `Customer Email Missing at panel, click to update!`,
                    class: "warning",
                    duration: 3000,
                    callback: function(){
                        document.querySelector('[data-btnclk="open_panelnote"]').click();
                    }
                }).showToast();

                console.error('eie', 'Customer Email missing at panel, access panel to update');
                
                return false;
            }
            
            var _obj_wait = () => {
                var caseload = window.dataCase;
                var is_gcc_external = window.dataCase.am_isgcc_external || window.dataCase.is_gcc_external || window.dataCase.is_gcc || window.dataCase.is_external;
                
                // If is silver => make AM email to CC
                if(window.dataCase.customer_is_silver) {
                    is_gcc_external = window.dataCase.customer_is_silver == "1" ? false : is_gcc_external ;
                }
                
                cLog(() => {console.log("eie --- START Wait - is_gcc_external ", is_gcc_external  ); });
                if(caseload) {
                    // Case ID is match
                    var _caseid_elm = document.querySelector('[debug-id="case-id"] .case-id');
                    if(_caseid_elm) {
                        if(caseload.case_id !== _caseid_elm.innerText.trim()) {
                            setTimeout(() => {
                                checkInputEmailInboxAndFix(n_once_check + 1);
                            }, 1000);
        
                            return false;
                        }
                    }
                    
                    cLog(() => {console.log("eie --- START", "Case ID", caseload.case_id,  _caseid_elm.innerText.trim() ); });
                        
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
        
                        // Repair
                            var _email_input_from = elm_parentheader.querySelector('email-address-dropdown.input.from');
                            var _email_input_to = () => {
                                return elm_parentheader.querySelector('email-address-input.input.to');
                            };
                            var _email_input_cc = elm_parentheader.querySelector('email-address-input.input.cc');
                            var _email_input_bcc = elm_parentheader.querySelector('email-address-input.input.bcc');
                        

                        // START
                        if(_email_input_from && _email_input_to() && _email_input_cc && _email_input_bcc) {
                            cLog(() => { console.log('eie 1checkandfix', window.dataCase); })
                            


                            // Expand button
                                var _elm_expand_more = elm_parentheader.querySelector('compose-card-content-wrapper .headers [icon="expand_more"]:not(.rotated)');
                                if(_elm_expand_more) {
                                    _elm_expand_more.click();
                                }

                            // Explore 0unmark
                            if(n_step === "0unmark") {
                                var unmaskbutton = elm_parentheader.querySelectorAll('[debugid="unmask-button"]');
                                
                                cLog(() => {console.log("eie --- 0unmark - length ", unmaskbutton.length); });
    
                                if(unmaskbutton.length) {
                                    unmaskbutton.forEach(function (elm) {
                                        elm.click();
                                        
                                        // if(_global_status.test) {
                                        //     elm.classList.remove("unmask-button");
                                        // }
                                    });
                                }

                                setTimeout(() => {
                                    var _isset_unmark = false;
                                    unmaskbutton.forEach(function (elm) {
                                        var _is1 = elm.innerText.includes('***');
                                        var _is2 = elm.querySelector('.loading-state');

                                        if(_is2 || _is1) {
                                            _isset_unmark = true;
                                        }
                                    });

                                    if(_isset_unmark) {
                                        recheck_fix_alert(_callback, "0unmark", elm_parentheader);
                                    } else {
                                        // OK next step 2
                                        recheck_fix_alert(_callback, "1checkandfix", elm_parentheader);
                                    }
                                }, 1000);
    
                                
    
                                return false;
                            }

                            if(n_step === '1checkandfix') {
                                // debugger;
                                
                                // *******************
                                // 1. EMAIL FROM
                                // *******************
                                if(_email_input_from.innerText.trim().includes('technical-solutions@google.com') === false) {
                                    cLog(() => { console.log('eie 1checkandfix CLEAR EMAIL INPUT => START'); })
                                    
                                    cLog(() => { console.log('eie 1checkandfix _email_input_from: NG: ', _email_input_from.innerText.trim()); })

                                    document.querySelector(str_elmparent + ".input.from material-dropdown-select material-icon").click();

                                    wait4Elem('[id="email-address-id--technical-solutions@google.com"]').then((_caseid_elm) => {
                                        _caseid_elm.click();
                                        recheck_fix_alert(_callback, "1checkandfix", elm_parentheader);
                                    })

                                    return false;
                                }


                                


                                // 


                                // *******************
                                // 2. CLEAR EMAIL INPUT
                                // *******************
                                if(!elm_parentheader.classList.contains('clear_emailinput_done')) {
                                    cLog(() => { console.log('eie 1checkandfix CLEAR EMAIL INPUT => START'); })
                                    
                                    var elm_area = elm_parentheader.querySelector(".input.cc");
                                    if (is_gcc_external) {
                                        elm_area = elm_parentheader.querySelector(".input.bcc");
                                    }
                                    
                                    var elm_to_remove = () => {
                                        return elm_parentheader.querySelectorAll(".input.to cases-icon.remove");
                                    };

                                    var elm_cc_remove = () => {
                                        return elm_parentheader.querySelectorAll(".input.cc cases-icon.remove");
                                    };
                                
                                    var elm_bcc_remove = () => { 
                                        return elm_parentheader.querySelectorAll(".input.bcc cases-icon.remove");
                                    }


                                    elm_to_remove().forEach(function (elm) {
                                        elm.click();
                                    });
                                    elm_cc_remove().forEach(function (elm) {
                                        elm.click();
                                    });
                                    // Clear All BCC
                                    elm_bcc_remove().forEach(function (elm) {
                                        elm.click();
                                    });
                                    


                                    var _n_done = elm_to_remove().length + elm_cc_remove().length + elm_bcc_remove().length;

                                    // Recheck clear finish ???
                                    cLog(() => { console.log('eie 1checkandfix CLEAR EMAIL INPUT ** 0', _n_done); })
                                    if(_n_done) {
                                        cLog(() => { console.log('eie 1checkandfix CLEAR EMAIL INPUT ** 0 -> action recheck'); })

                                        setTimeout(() => {
                                            recheck_fix_alert(_callback, "1checkandfix", elm_parentheader);
                                        }, 500);

                                        return false;
                                    }

                                    // FNISH CLEAR EMAIL ONCE
                                    elm_parentheader.classList.add("clear_emailinput_done");
                                }





                                // ******************
                                // 3. Customer Email
                                // ******************
                                if(_email_input_to().innerText.trim().includes('@') === false) {
                                    cLog(() => { console.log('eie 1checkandfix Customer Email ** 1 => START') })
                                    var elm_input_to = elm_parentheader.querySelector(".input.to input");
                                    elm_input_to.value = caseload.customer_email.trim();
                                    elm_input_to.dispatchEvent(new Event('input'));
                                    elm_input_to.dispatchEvent(new Event('enter'));
                                    elm_input_to.dispatchEvent(new Event('change'));

                                    var n_time = 0;
                                    var time_input_key = setInterval(function () {
                                        
                                        var elm_technical = document.querySelector('email-address-content [debug-id="email"]');
                                        if (elm_technical) {
                                            elm_technical.click();
                                        }
                                        cLog(() => {  console.log('eie', _email_input_to().querySelectorAll('user-chip').length, caseload.customer_email.split(',').length, _email_input_to().querySelectorAll('user-chip').length === caseload.customer_email.split(',').length ); });
                                        if(_email_input_to().querySelectorAll('user-chip').length === caseload.customer_email.split(',').length) {
                                            clearInterval(time_input_key);
                                            recheck_fix_alert(_callback, "1checkandfix", elm_parentheader);   
                                        }

                                        if(n_time > 10) {
                                            cLog(() => { console.log('eie 1checkandfix Customer Email ** 1 => STOP ACTION '); })
                                            clearInterval(time_input_key);
                                            recheck_fix_alert(_callback, "1checkandfix", elm_parentheader);    
                                        }

                                        n_time++;
                                    }, 500);
                                    
                                    return false;
                                }


                                // ******************
                                // Add AM EMAIL
                                // ******************
                                var elm_area = () => { return elm_parentheader.querySelector(".input.cc"); }
                                if (is_gcc_external) {
                                    elm_area = () => { return elm_parentheader.querySelector(".input.bcc"); }
                                }
                                
                                var elm_input = elm_area().querySelector("input");
                                if(elm_area().innerText.trim().includes('@') === false) {
                                    cLog(() => { console.log('eie 1checkandfix Add AM EMAIL ** 2 => START', 'is GCC', is_gcc_external); })
                                    elm_input.value = caseload.am_email;
                        
                                    elm_input.dispatchEvent(new Event('input'));
                                    elm_input.dispatchEvent(new Event('enter'));
                                    elm_input.dispatchEvent(new Event('change'));
                    
                                    var n_time = 0;
                                    var time_input_key = setInterval(function () {
                                        var elm_technical = document.querySelector('email-address-content [debug-id="email"]');
                                        if (elm_technical) {
                                            elm_technical.click();   
                                        }

                                        cLog(() => {  console.log('eie', elm_area().querySelectorAll('user-chip').length, caseload.am_email.split(',').length, elm_area().querySelectorAll('user-chip').length === caseload.am_email.split(',').length ); });
                                        if(elm_area().querySelectorAll('user-chip').length === caseload.am_email.split(',').length) {
                                            clearInterval(time_input_key);
                                            recheck_fix_alert(_callback, "1checkandfix", elm_parentheader);   
                                        }

                                        if (n_time > 10) {
                                            cLog(() => { console.log('eie 1checkandfix Add AM EMAIL ** 2 => STOP ACTION '); })
                                            clearInterval(time_input_key);
                                            recheck_fix_alert(_callback, "1checkandfix", elm_parentheader);
                                        }
                                        n_time++;
                        
                                    }, 500);

                                    return false;
                                }
                                

                                elm_parentheader.classList.add("finished");
                                
                                console.log('eie 1checkandfix FINISH');

                            }
    
    
                        } 
                    }
        
                    // After ... second => auto stop
                    setTimeout(() => {
                        if(typeof time_input_key2 === 'number') {
                            clearInterval(time_input_key2);
                        }
                        
                        if(typeof time_input_key3 === 'number') {
                            clearInterval(time_input_key3);
                        }

                        _obj_wait = null;
                        elm_parentheader.classList.add("finished");
                    }, 10 * 1000)
                    



                    // recheck_fix_alert(() => {
                    //     console.log("eie -- All OK????");
                    // }, '0unmark', elm_parentheader);
                    
                    recheck_fix_alert(() => {
                        console.log("eie -- All OK????");
                    }, '1checkandfix', elm_parentheader);
                    


                }
            }

            
            _obj_wait();
        });
            
        
    } catch (error) {
        cLog(() => {console.error('eie checkInputEmailInboxAndFix', error)});
    }

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
                                
                                    if(caseload.am_isgcc_external) {
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
    if(localStorage.getItem('dongtest')) {
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

function loadFetchText(url, _callback) {
    fetch(url, {
        method: 'GET'
    })
        .then(function(response) {
            return response.text();
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
            cLog(() => {console.log('__DONG save', key, value, response); });
        }
    });
}


function getChromeStorage(key, _callback = false) {
    chrome.runtime.sendMessage({method: 'fe2bg_chromestorage_get', key: key}, (response) => {
        if(_callback !== false) {
            response = response || {};
            if(response.value) {
                if(response.value.case_id) {
                    console.log('__DONG get_st', response.value.case_id, response.value);
                }
            }
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


function loadCaseStorageByID(case_id, _callback) {
    // Chỉ load nếu đây là ID
    case_id = getOnlyCaseId(case_id);
    if(case_id) {   
        getChromeStorage('cdtx_caseid_' + case_id, _callback);
    }
}

// ============
// Noted bar 
function noteBarAlert(note, caseid, colortype = 'alert') {
    
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
                        _noted.innerHTML += `<span class="_str ${colortype}" data-text="${_str}">${_str}</span>`;
                    }
                } else {
        
                    // Remove all if isset
                    elm_casedetails.querySelectorAll(`noted[data-id]`).forEach((elm)=>{
                        elm.remove();
                    });
        
                    // data id
                    var _str = `<noted data-id="${caseid}" ><span class="_str ${colortype}" >${note}</span></noted>`;
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
    return;
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

var minuteDateTime = function () {
    var _date_key = [
        new Date().getFullYear(),
        ("0" + new Date().getMonth()).slice(-2),
        ("0" + new Date().getDate()).slice(-2),
        ("0" + new Date().getHours()).slice(-2),
        ("0" + new Date().getMinutes()).slice(-2),
    ];

    return _date_key.join("");
};

var hourDateTime = function () {
    var _date_key = [
        new Date().getFullYear(),
        ("0" + new Date().getMonth()).slice(-2),
        ("0" + new Date().getDate()).slice(-2),
        ("0" + new Date().getHours()).slice(-2),
    ];

    return _date_key.join("");
};

var dateDateTime = function () {
    var _date_key = [
        new Date().getFullYear(),
        ("0" + new Date().getMonth() + 1).slice(-2),
        ("0" + new Date().getDate()).slice(-2),
    ];

    return _date_key.join("-");
};




// Load loadAllCaseID
function loadAllCaseID(_callback) {
    // Get Case List
    // 1. load all

    var listcase = [];
    chrome.storage.local.get(null, function(results) {
        for (let key in results) {
            // 2. load only caselist
            if(key.includes("cdtx_caseid_")) {
                listcase.push(results[key]);
            }
        }

        // Load case
        _callback(listcase);
    });
}

// function copyText(text) {
//     var input = document.createElement('textarea');
//     input.innerHTML = text;
//     input.style.opacity = "0";
//     input.style.pointerEvents = "none";
//     input.style.position = "fixed";
//     input.style.zIndex = -1;
//     document.body.insertAdjacentElement("afterEnd", input);
//     input.select();
//     var result = document.execCommand('copy');
//     input.remove();
//     return result;
// }


function convertDateCustom(_str_input, type = 1) {
    // Mar 6, 2023, 3:14 PM GMT+8

    cLog(() => {
        console.log('cdtx convertDateCustom', _str_input)
    })

    _str_input = _str_input.trim();
    _str_input = _str_input.replace("  ", " ");
    var _str_input_arr = _str_input.split(" ");
    var _listshortmonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var _m = _listshortmonth.findIndex((_month) => {
        return _month === _str_input_arr[0];
    });

    var _d = parseInt(_str_input_arr[1]);

    var _y = parseInt(_str_input_arr[2]);

    var _time = _str_input_arr[3];

    var _sangorchieu = _str_input_arr[4];

    var _format = _str_input;
    
    if(typeof _sangorchieu === 'undefined') return dateDateTime();
    
    // 21-11-2023 at 11:30 AM (Asian/Saigon)
    if(type == 1) {
        _format =
            ("0" + _d).slice(-2) + "-" +
            ("0" + (_m + 1)).slice(-2) + "-" +
            _y + " " +
            _time + " " +
            _sangorchieu + " " +
            _str_input_arr[5];
    }

    // 2023-12-21T12:60
    if(type == 2) {
        _format =
            _y + "-" +
            ("0" + (_m + 1)).slice(-2) + "-" +
            ("0" + _d).slice(-2) + "T" +
            _sangorchieu.toUpperCase().replace('AM', '').replace('PM', '')
    }

    // 21-12-2023
    if(type == 3) {
        _format =
            ("0" + _d).slice(-2) + "-" +
            ("0" + (_m + 1)).slice(-2) + "-" +
            _y + " "
    }

    return _format.trim();
}


function backdoor_manage_keystorage() {
    wait4Elem(".list_keystorage").then(() => {
        chrome.storage.local.get(null, function(results) {
            var li = "";
            for (let key in results) {
                li += `<li>${key} <span data-btnremovekeystorage="${key}">Remove</span></li> `;
                console.log(key, results[key]);
            }

            panel_div.querySelector("ul.list_keystorage").innerHTML = _TrustScript(li);

            document.querySelectorAll("ul.list_keystorage [data-btnremovekeystorage]").forEach((elm) => {
                elm.addEventListener("click", (e) => {
                    var key = elm.getAttribute('data-btnremovekeystorage');
                    
                    if (confirm("You sure remove: " + key)) {
                        removeChromeStorage(key, () => {
                            Toastify({
                                text: `Remove ${key} success`,
                                duration: 3000,
                                callback: function(){
                                    this.remove();
                                }
                            }).showToast();

                            elm.closest("li").remove();
                        });
                    }
                });
            });
        });
    });
}



// Load Email Template 
function loadEmailTemplateAction(){   
    cLog(() => {console.log('dongmail - load email content');});
    onClickElm('._panel_btn--addtemplate', 'click', function(elm, e){
        cLog(() => {
            console.log(1, "Here 1515", window.dataCase);
        })
        
        // 0. ready
        var _insertmailbox = (_this) => {
        
            var template_title = _this.closest("._emailtemp-item").querySelector("._emailtemp-item__title");
            var template_body = _this.closest("._emailtemp-item").querySelector("#email-body-content-top-content");
            
            // Wait and insert
            wait4Elem('.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top[card-type="compose"] #email-body-content-top').then(function (elm) {
                cLog(() => {console.log("checkInputEmailInboxAndFix 2"); });
                checkInputEmailInboxAndFix();
                
                var _card_istop = document.querySelector('.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top');

                
                var subject = _card_istop.querySelector("input.subject");
                var body_content = _card_istop.querySelector("#email-body-content");
                var body_content_top = _card_istop.querySelector("#email-body-content-top");
                var body_content_top_content = _card_istop.querySelector("#email-body-content-top-content");

                body_content.style.padding = '0px';
                body_content.style.width = '100%';
                // Insert value
                subject.value = template_title.innerText;
                
                console.log('Here 1515', window.dataCase);
                
                replaceAllHtmlElement(template_body, window.dataCase);
                
                var _replace_all = template_body.innerHTML;
                
                body_content_top.innerHTML = _replace_all;
                
                // action save status
                    subject.dispatchEvent(new Event('input'));
                    body_content.dispatchEvent(new Event('input'));
                    body_content_top.dispatchEvent(new Event('input'));

                    if(body_content_top_content) {
                        body_content_top_content.dispatchEvent(new Event('input'));
                    }
                    
                    _card_istop.querySelector('[debug-id="add_highlight"]').click();
                
                // Click offer
                    if(
                        _this.closest("._emailtemp-item").getAttribute("data-type").includes("SO - ")
                    ) {
                    
                        if(_card_istop.querySelector('[debug-id="solution_offered_checkbox"].disabled')) {                                        
                            Toastify({
                                text: 'Please update Tracking Issue Time',
                                duration: 3000,
                                class: "warning",
                                callback: function(){
                                    this.remove();
                                }
                            }).showToast();

                            document.querySelector('[debug-id="dock-item-issue"]').click();
                        }
                        
                        if(_card_istop.querySelector('[debug-id="solution_offered_checkbox"]:not(.disabled)')) {
                            _card_istop.querySelector('[debug-id="solution_offered_checkbox"]:not(.disabled):not(._active)').click();
                            _card_istop.querySelector('[debug-id="solution_offered_checkbox"]:not(.disabled)').classList.add('_active');
                        }
                    }

                // Open document doc list
                    document.querySelector('compose-card-content-wrapper').click();
                    document.querySelector('compose-card-content-wrapper').focus();
                    
            });
            
        }

        // 1.1 Open dial
        if(document.querySelector('.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top[card-type="compose"] #email-body-content-top')) {
            _insertmailbox(elm);
        } else {
            document.querySelector("material-fab-speed-dial").dispatchEvent(new Event('mouseenter'));
            document.querySelector("material-fab.themeable.action-2.compose").addEventListener("click", () => {
                var n_card = document.querySelectorAll("card[casesanimate].write-card").length || 0;
                var myTimeCheck = setInterval(() => {
                    var n_card_2 = document.querySelectorAll("card[casesanimate].write-card").length || 0;
                    if(n_card_2 > n_card) {
                        clearInterval(myTimeCheck);
                        _insertmailbox(elm);

                        // Close dial
                        document.querySelector("material-fab-speed-dial").dispatchEvent(new Event('mouseenter'));

                    }
                }, 1000)
                
            });
            
            // 1.2
            document.querySelector("material-fab.themeable.action-2.compose").click();
            
        }

    });
    
    
    onClickElm('._emailtemp_search_input', 'keyup', function(elm_inputparent, e){
        var _search = elm_inputparent.innerText.toLowerCase();
        elm_inputparent.closest('[data-panel="email-template"]').querySelectorAll('[data-type]').forEach((elm) => {
            // elm
            elm.style.display = 'none';
            cLog(()=> {console.log(elm.getAttribute("data-type").toLowerCase().includes(_search))})
            if(elm.getAttribute("data-type").toLowerCase().includes(_search)) {
                elm.style.display = '';
            }
        });
    });
    // panel_div.querySelector('#_emailtemp_search_input').addEventListener("keyup", (e) => {
    //     var _search = panel_div.querySelector('#_emailtemp_search_input').innerText.toLowerCase();
    //     panel_div.querySelectorAll('[data-type]').forEach((elm) => {
    //         // elm
    //         elm.style.display = 'none';
    //         cLog(()=> {console.log(elm.getAttribute("data-type").toLowerCase().includes(_search))})
    //         if(elm.getAttribute("data-type").toLowerCase().includes(_search)) {
    //             elm.style.display = '';
    //         }
    //     });
    // });
}

// Load List Template Mail From Google Sheet
function loadTemplateEmailGoogleSheet(_caseid, _keylanguage) {
    try {
    
        var _elm_cr_listtag = document.querySelector('._emailtemp');
        if(!_elm_cr_listtag) return false;
        
        if(!_elm_cr_listtag.classList.contains('othertemplatemail')) {
            cLog(() => { console.log('cdtx loadTemplateEmailGoogleSheet', _caseid, _keylanguage); })

            // Case
            getChromeStorage("cdtx_loadgooglesheetpublish", (response2) => {
                var _rs = response2.value;
                
                
                var _load_keycase = (_item) => {

                    // 1. has HTML Custom :)
                    if(_item['Is HTML Custom'] == 1) {
                        
                        var emailHtml = _item['Email Templates Custom'] || "";
                        var subjectText = _item['Subject'] || "";
                        var colorText = _item['Color'] || "";
                        
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = emailHtml;
                        
                        
                        subjectText = subjectText.replaceAll('{%case_id%}', '<span data-infocase="case_id"></span>')

                        var item_html = `<div class="_emailtemp-item" data-type="${_item['CR Name']}">
                            <span class="_panel_btn _panel_btn--small _panel_btn--addtemplate" data-key="${_item['Key']}"  >Insert</span>
                            <div class="_emailtemp-item__title">${subjectText}</div>
                            <div class="_emailtemp-item__content">${_item['Email Templates Custom']}</div>
                        </div>`;

                        
                        _elm_cr_listtag.insertAdjacentHTML('beforeEnd', item_html);
                        
                        
                        // var li_html = `<li data-tempkey="${_item['CR Name']}" style="color: ${colorText}" >${_item['CR Name']}</li>`;
                        // wait4Elem('#cr-list-tag').then((elm) => {
                            
                        //     var tempLi = document.createElement('div');
                        //     tempLi.innerHTML = li_html;

                        //     var _li_elm = tempLi.querySelector('li');
                        //     elm.insertAdjacentElement('beforeEnd', _li_elm);
                            
                        //     _li_elm.addEventListener('click', (e) => {

                        //         var _card_istop = document.querySelector('.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top');
            
                                    
                        //         setTimeout(() => {
                        //             var subject = _card_istop.querySelector("input.subject");
                        //             var body_content = _card_istop.querySelector("#email-body-content");
                        //             var body_content_top = _card_istop.querySelector("#email-body-content-top");
                        //             var body_content_top_content = _card_istop.querySelector("#email-body-content-top-content");
            
                        //             body_content.style.padding = '0px';
                        //             body_content.style.width = '100%';
                        //             // Insert value
                        //             subject.value = subjectText;
                        //             body_content_top.innerHTML = tempDiv.innerHTML;

                        //             // action save status
                        //                 subject.dispatchEvent(new Event('input'));
                        //                 body_content_top.dispatchEvent(new Event('input'));
                        //                 body_content_top_content.dispatchEvent(new Event('input'));
                        //                 _card_istop.querySelector('[debug-id="add_highlight"]').click();
                        //         }, 1000)
                                
                                
                        //     })

                        // })
                    }
                }

                if(_rs) {
                    cLog(() => { console.log('cdtx google', _rs); })
                    _rs['Variable'].sheettab.forEach(_item => {
                        var _sheet_cr_mail = _item['sheet_cr_mail'];
                        if(_sheet_cr_mail.includes(_keylanguage + " | ")) {
                            // Load
                            _rs[_sheet_cr_mail].sheettab.forEach(_item => {
                                // cLog(() => { console.log('cdtx loadTemplateEmailGoogleSheet', _item['Is HTML Custom']); })
                                _load_keycase(_item);
                            });
                        }
                    });

                    

                    replaceAllKeyHtmlByCaseID(_elm_cr_listtag, _caseid, () => {
                        cLog(() => {console.log('cdtx google 2', '2222') });
                    });
                }
                
            });



            // Once
            _elm_cr_listtag.classList.add('othertemplatemail');
        }    

                
    } catch (error) {
        console.log('loadTemplateEmailGoogleSheet', error);
    }
}


// Load CallScriptButton To Meet Google 
function loadKLCall(_keylanguage) {
    // Load call checklist
    var _contenthtml = `
    <span class="kl_callchecklist__button" data-btnclk="kl_callchecklist--tgopenclose" >
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 399.38 412.24"><text x="-105" y="-233.47"/><path d="M253.71,337H306.4v58.53q10.55-.23,19.05-13.66t8.49-42.69V337h53.83v2.41q0,58.88-23.53,84.81Q391,455.52,391,510v2.07h-57v-1.84q0-28.92-7.17-45.16T306.4,448.17V512.1H253.71Z" transform="translate(-105 -233.47)" fill="#231f20"/><path d="M504.38,512.1H405.33V337H458V468.14h46.37Z" transform="translate(-105 -233.47)" fill="#231f20"/><path d="M399.21,571.31c-12.88-10.28-53-30-62.9-32.33s-21.84,7.26-25.14,19.12-9.49,10.75-9.49,10.75-23.8-8.75-67.33-52.12S182,449.58,182,449.58s-1.16-6.17,10.71-9.53,21.35-15.33,19-25.21-22.24-49.95-32.56-62.77-30.31-6.21-34.7-3-50.83,32.69-36.87,87,44,97.82,76.91,130.66,76.54,62.65,130.93,76.43,83.72-32.75,86.89-37.16S412.06,581.6,399.21,571.31Z" transform="translate(-105 -233.47)" fill="#010101"/></svg>
    </span>
    <div class="kl_callchecklist__listload">
        <span class="kl_callchecklist__header">
            <span class="kl_callchecklist__header-title" >Call Checklist</span>
            <span class="kl_callchecklist__header-grbtn" >
                <span class="kl_callchecklist__header-opacity" data-btnclk="kl_callchecklist--opacity" >Opacity</span>
                <span class="kl_callchecklist__header-close" data-btnclk="kl_callchecklist--tgopenclose" >Close</span>
            </span>
        </span>

        <ul class="kl_callchecklist--listcontent">
        </ul>
    </div>
    `;

    if(!document.querySelector('.kl_callchecklist')) {
        
        if(document.body.classList.contains('J0p3ve')) {
            _contenthtml = `<div class="kl_callchecklist open">${_contenthtml}</div>`;

            _contenthtml = _TrustScript(_contenthtml);
            document.body.insertAdjacentHTML('beforeend', _contenthtml);



            // Đổ data vào                
            getChromeStorage("cdtx_loadgooglesheetpublish", (response) => {
                if(response.value) {
                    try {
                        window.loadgooglesheetpublish = response.value;
                        if(response.value['CallScript checklist'].sheettab) {
                            // Default EN
                            var _contenthtml2 = '';
                            response.value['CallScript checklist'].sheettab.forEach((item) => {
                                if(item['CB']) {
                                    _contenthtml2 += `<li data-btnclk="kl_callchecklist--isdoneclick">${item['CB']}</li>`;
                                    
                                }
                            });

                            // Get Overwrite
                            var _contenthtml3 = '';
                            response.value['CallScript checklist'].sheettab.forEach((item) => {
                                if(item[_keylanguage]) {
                                    _contenthtml3 += `<li data-btnclk="kl_callchecklist--isdoneclick">${item[_keylanguage]}</li>`;
                                }
                            });
                            
                            var _contenthtml2 = _TrustScript((_contenthtml3 ? _contenthtml3 : _contenthtml2));
                            document.querySelector('.kl_callchecklist--listcontent').insertAdjacentHTML('beforeEnd', _contenthtml2);
                        }
                        
                        
                            
                    } catch (error) {
                            cLog(() => { console.log(cdtx)});
                    }
                }
            })
        }

    } 
}



function replaceKeyHTMLByCaseID(_elm, _key, _value) {
    // cLog(() => {console.log('cdtx review', _elm, _key, _value); });
    if(!_value) return false;
    if(!_elm) return false;


    // div, span
    // debugger;
    _elm.innerHTML = _TrustScript(_elm.innerHTML.replaceAll(`{%${_key}%}`,`${_value}`));


    // Input text, input date, textarea
    _elm.querySelectorAll(`
        [type="text"][name="${_key}"], 
        [type="datetime-local"][name="${_key}"], 
        textarea[name="${_key}"]`
    ).forEach(function(elm){
        elm.value = _value;
    });
    
    // div, span
    _elm.querySelectorAll('[data-infocase="' + _key + '"]').forEach(function(elm){
        elm.innerText = _value;
        elm.setAttribute('data-infocase_value', _value);
    });

    // div, span
    _elm.querySelectorAll('[data-infocase_html="' + _key + '"]').forEach(function(elm){
        elm.innerHTML = _value;
    });

    // div, span
    _elm.querySelectorAll('[data-infocase_capitalize="' + _key + '"]').forEach(function(elm){
        elm.innerText = capitalizeFirstLetter(_value);
    });
    
    _elm.querySelectorAll('[data-infocase_link="' + _key + '"]').forEach(function(elm){
        var _value_link = (!(_value.includes('http://') || _value.includes('https://')) ? `http://${_value}` : _value);
        if(_value_link) {
            elm.setAttribute("href", _value_link);
        }
    });

    _elm.querySelectorAll('[data-infocase_listlink="' + _key + '"]').forEach(function(elm){
        
        var _website_list = _value;
        if(_website_list) {
            var _website_listarr = _website_list.split(',');
            var _arr = [];
            _website_listarr.forEach((url) => {
                url = url.trim();
                _arr.push(`<a href="${url}" target="_blank">${url}</a>`);
            });
            elm.innerHTML = _arr.join(',');
        }
        
    });
    
    
    // New format
    if(_key == 'tasks') {
        _elm.querySelectorAll('[data-infocase="tasks_nowrap"]').forEach(function(elm){
            elm.innerHTML = _value.trim().replace("\n", ", ");
        });
    }
    
    if(_key == 'customer_adsid') {
        _elm.querySelectorAll('[data-infocase="customer_adsid_format"]').forEach(function(elm){
            elm.innerHTML = reformatAdsId(_value);
        });
    }
    if(_key == 'case_id') {
        _elm.querySelectorAll('[data-infocase="case_id"]').forEach(function(elm){
            elm.innerText = _value;
        });
    }

    
    return _elm;
}

// replaceAllHtmlElement
function replaceAllHtmlElement(_panel, _data) {
    // cLog(() => { console.log('cdtx replaceAllHtmlElement -', _panel, _data); })
    if(_data.case_id) {
        var _value_tmp = '';

        
        for (const [key, value] of Object.entries(_data)) {
            _value_tmp = value;
            
            replaceKeyHTMLByCaseID(_panel, key, _value_tmp);
        }
    }
}

// replaceTextByData
// s1: replace all by format {%_key_%}
function replaceTextByData(_str) {
    if(window.dataCase.case_id) {
        var _value_tmp = '';

        for (const [key, value] of Object.entries(window.dataCase)) {
            _value_tmp = value;
            _str = _str.replaceAll(`{%${key}%}`,`${value}`)
        }
        
        return _str;
    }
    
    return _str;
}



// REPLACE ALL KEY HTML BY CASE ID
// s1: load data by case
// s2: replace elem match by id
function replaceAllKeyHtmlByCaseID(_elmpanel, _caseid, _callback) {
    loadCaseStorageByID(_caseid, (response) => {
        var _datatemp = response.value || false;
        
        // console.log(_datatemp.case_id);
        if(_datatemp.case_id) {
            replaceAllHtmlElement(_elmpanel, _datatemp);
            _callback();
        }
    })
}

// Validate email
function validateEmail(emailstr, callback) {
    if(typeof emailstr === 'string') {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(emailstr.match(validRegex)) {
            callback(emailstr)
            return false;
        }
    }
    
    callback(false);
}

// getToolShortlink
function getToolShortlink(_caseid, _callback) {
    var _key = 'cdtx_tool_shortlink';
    getChromeStorage(_key, (response) => {
        var data_notedlist = response.value || false;
        _callback(data_notedlist[_caseid]);
        return false;
    })
}

// Add more short link 
function panelAddShortcutLink() {
    if(location.hostname !== 'cases.connect.corp.google.com') return;
    try {
        
		// Select the node that will be observed for mutations
		var targetNode = document.body;

		// Options for the observer (which mutations to observe)
		var config = { attributes: true, childList: true, subtree: true };

		// Callback function to execute when mutations are observed
		var callback = function(mutationList, observer) {
			var _istopelm = document.querySelector(`[data-area="btn-shortcutcase"]`);
			if(_istopelm) {
				if (_istopelm.querySelector("#tool_shortlink") === null) {
                    
                    var tool_shortlink_html = _TrustScript(`<div class="tool_shortlink_row">
                            <div class="tool_shortlink_gr-row tool_shortlink_gr-list" ></div>
                        </div>
                        <span class="tool_shortlink_btn" data-btnsclick="add_shortlink" >+ Add shortlink</span>
                        <div class="tool_shortlink_row">
                            <div class="tool_shortlink_gr-row tool_shortlink_gr-content" >
                                <span class="tool_shortlink_gr-url" data-tttip="U" title="URL" contenteditable="plaintext-only"></span>
                                <span class="tool_shortlink_gr-text" data-tttip="N" title="Name" contenteditable="plaintext-only"></span>
                                <span class="tool_shortlink_btn" data-btnsclick="save" >Save</span>
                                <span class="tool_shortlink_btn" data-btnsclick="close" >Close</span>
                            </div>
                        </div>`);
                    
                    const dom = document.createElement('div');
                    dom.innerHTML = tool_shortlink_html;
                    dom.id = 'tool_shortlink';
                    dom.className = 'tool_shortlink';
                    _istopelm.appendChild(dom);

                    setTimeout(() => {
                        var _tool_shortlink = document.querySelector('.tool_shortlink');
                        var _case_idelm = document.querySelector('[debug-id="case-id"] .case-id');
                        if(_case_idelm) {
                            var _caseid = _case_idelm.innerText.trim();
                            window._caseid_toolscript = window._caseid_toolscript || '';

                            if(_caseid !== window._caseid_toolscript) {
                                
                                getToolShortlink(_caseid, (data) => {
                                    if(data) {
                                        _tool_shortlink.querySelector('.tool_shortlink_gr-list').innerHTML = data;
                                    }
                                });
                                
                                window._caseid_toolscript = _caseid;
                            }
                        }

                        
                        onClickElm('.tool_shortlink [contenteditable]', 'keypress', function(elm, e){
                            if (e.which === 13) {
                                e.preventDefault();
                                _shortcutlink_actsave(elm, () => {
                                    cLog(() => { console.log('cdtx Have save'); })
                                });
                            }
                        });
                    }, 1000)
                    

				}
				
                
                
                     
                
                
			}
		};

		// Create an observer instance linked to the callback function
		var observer = new MutationObserver(callback);
		// Start observing the target node for configured mutations
		observer.observe(targetNode, config);
    } catch (error) {
        console.error('cdtx panelAddShortcutLink function');
    }

    try {
        
        var update_tool_shortlink = (_caseid, _value, _callback) => {
            var _key = 'cdtx_tool_shortlink';
            var _temp = {};
            _temp[_caseid] = _value;
            getChromeStorage(_key, (response) => {
                var data_notedlist = response.value || {};
                
                cLog(() => { console.log('cdtx update_tool_shortlink' , data_notedlist, _temp); })

                Object.assign(data_notedlist, _temp);



                setChromeStorage(_key, data_notedlist, (response2) => {
                    // var datars2 = response2.value || {};

                    cLog(() => {
                        console.log("cdtx update_tool_shortlink", response2);
                    });

                    _callback(response2);
                });
            })
            return false;
        }

        var _shortcutlink_actsave = (elm, callback) => {
            var _parent = elm.closest('.tool_shortlink'),
            _url = _parent.querySelector('.tool_shortlink_gr-url'),
            _text = _parent.querySelector('.tool_shortlink_gr-text');

            if(_text.innerText.trim() === '' || _url.innerText.trim() === '') {
                cLog(() => { console.log('tool_shortlink - URL or text this empty value') });
                return false;
            }

            if(/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(_url.innerText.trim()) != true) {
                cLog(() => { console.log('tool_shortlink - URL wrong ' + _url.innerText.trim()) });
                return false;
            }
            
            var _htmltrust = _TrustScript(`<span class="tool_shortlink_gr-grbtn"><a href="${_url.innerText.trim()}" data-keytext="${_text.innerText.trim()}" data-link="${_url.innerText.trim()}" target="_blank">${_text.innerText.trim()}</a><span class="tool_shortlink_gr-removebtn" data-btnsclick="remove">X</span></span>`);
            _parent.querySelector('.tool_shortlink_gr-list').insertAdjacentHTML("beforeEnd", _htmltrust);
            
            // Reset
            _url.innerText = '';
            _text.innerText = '';

            // Close
            _parent.classList.toggle('content_open');

            // Save localstorage
            var _case_idelm = document.querySelector('[debug-id="case-id"] .case-id');
            if(_case_idelm) {
                
                // Remove data
                var _html_linkelm = _parent.querySelector('.tool_shortlink_gr-list');
                var _case_idelm = document.querySelector('[debug-id="case-id"] .case-id');
                if(_case_idelm) {
                    var _caseid = _case_idelm.innerText.trim();
                    
                    update_tool_shortlink(_caseid, _html_linkelm.innerHTML, (rs) => {
                        callback();
                    });  
                }
            }
        }

        onClickElm('[data-btnsclick]', 'click', function(elm, e){
            try {
                var _action = elm.getAttribute("data-btnsclick");
                

                var _parent = elm.closest('.tool_shortlink');


                // add_precall
                if(_action === 'add_shortlink') {
                    _parent.classList.toggle('content_open');
                    
                }

                // close
                if(_action === 'close') {
                    _parent.classList.toggle('content_open');
                }

                // save
                if(_action === 'save') {
                    _shortcutlink_actsave(elm, () => {
                        _parent.classList.toggle('content_open');
                        cLog(()=>{  console.log('cdtx panelAddShortcutLink save XONG')});
                    });
                }

                // save
                if(_action === 'remove') {

                    if (confirm("You sure remove?")) {
                        elm.closest('.tool_shortlink_gr-grbtn').remove();

                        // Remove data
                        var _html_linkelm = _parent.querySelector('.tool_shortlink_gr-list');
                        var _case_idelm = document.querySelector('[debug-id="case-id"] .case-id');
                        if(_case_idelm) {
                            var _caseid = _case_idelm.innerText.trim();
                            
                            update_tool_shortlink(_caseid, _html_linkelm.innerHTML, (rs) => {
                                cLog(()=>{  console.log('cdtx panelAddShortcutLink remove XONG')});
                            });  
                        }
                    }
                }
                
            } catch (error) {
                console.error('cdtx panelAddShortcutLink', error)
            }
        });
    } catch (error) {
        console.error('cdtx panelAddShortcutLink', error)
    }
}


// crSubjectByHotKeyEmail 
function crSubjectByHotKeyEmail() {
    window.subject_hotkey_email = window.subject_hotkey_email || {}
    if(location.hostname !== 'cases.connect.corp.google.com') return;
    
    
    try {
        // Đổ data vào    
        getGooglesheetPublish((rs) => {
            if(rs) {
                var _tab_cr_subject_templatemail = rs[`${window.keylanguage} | CR, Subject, Template Emails`];
                if(_tab_cr_subject_templatemail) {
                    var _sheet_tab = _tab_cr_subject_templatemail['sheettab'];
                    _sheet_tab.forEach((item) => {
                        var _tempsubject = item['Subject'];
                        console.log('crSubjectByHotKeyEmail', _tempsubject, window.dataCase);
                        window.subject_hotkey_email[item['Key']] = _tempsubject;
                    });    
                }
                
            }
        });

        
    } catch (error) {
        console.error('cdtx panelAddShortcutLink', error)

    }
    
}


// Open Gooogle Ads By Ads ID
//   and update CID (consider)
//  parameter: _awid=123123
//   url: https://adwords.corp.google.com/aw/internal/search?ocid=0&__awid=269-475-6195
function openGAdsbyAdsID() {
    if(location.hostname !== 'adwords.corp.google.com') return;
    
    try {
        // javsacript
        var queryString = window.location.search;
        cLog(() => { console.log('cdtx openGAdsbyAdsID', queryString); });
        var urlParams = new URLSearchParams(queryString);
        var __awid = urlParams.get('__awid')
        if(__awid) {
            document.body.classList.add('_ads_wait1m');
            setTimeout(() => {
                document.body.classList.remove('_ads_wait1m');
            }, 10000)
        
            var _inputsearch = document.querySelector('menu-suggest-input input.search-box');
            _inputsearch.value = __awid;
            _inputsearch.dispatchEvent(new Event('input'));
            _inputsearch.dispatchEvent(new Event('keypress'));
            _inputsearch.dispatchEvent(new KeyboardEvent("keypress", {keyCode: 13,which: 13,}));
        }
    } catch (error) {
        console.error('openGAdsbyAdsID', error)
    }
}

// Get data google sheets publish
// 
function getGooglesheetPublish(_callback) {
    if(window.loadgooglesheetpublish) {
        if(Object.keys(window.loadgooglesheetpublish).length) {
            _callback(window.loadgooglesheetpublish);
            return true;
        }    
    }
    
    getChromeStorage("cdtx_loadgooglesheetpublish", (response2) => {
        var _rs = response2.value || 0;
        if(_rs) {
            window.loadgooglesheetpublish = _rs;
            _callback(window.loadgooglesheetpublish);
            return true;
        }
    });
    
    return false;
}

function updateMeetContentBySheet(_panel) {
    try {
        if(window.loadgooglesheetpublish) {
            if(window.loadgooglesheetpublish['email varabiles']['sheettab']) {
                window.loadgooglesheetpublish['email varabiles']['sheettab'].forEach((item) => {
                    if(item[window.keylanguage]) {
                        if(item['Attribute']) {
                            // console.log('GOOGLE SHEET', window.dataCase.customer_gmeet, item[window.keylanguage], window.keylanguage, item);        
                            if(window.dataCase.customer_gmeet){
                                _panel.querySelectorAll(`[${item['Attribute']}]`).forEach(function(__elm){
                                    __elm.innerHTML = item[window.keylanguage];
                                });
                                replaceAllHtmlElement(_panel, window.dataCase);
                            }
                        }
                    }
                });
            }
        }
    } catch (error) {
        console.error('cdtx updateMeetContentBySheet have error', error)
    }
}

function toolEditorEmailTemplate4Dev() {
    try {
        
        var _load = () => {
            const dom_editor = document.createElement("div");
            dom_editor.id = 'editor_email';
            dom_editor.className = 'editor_email';
            dom_editor.style.display = 'block';
            dom_editor.style.height = '600px';
            document.querySelector('.read-card.focused .section.header:first-child').insertAdjacentElement('afterEnd', dom_editor);

            var editor = ace.edit("editor_email");
            editor.setTheme("ace/theme/monokai");
            editor.session.setMode("ace/mode/html");
            editor.session.setUseWrapMode(true);


            var _temlocalStorage = localStorage.getItem('_tempsaveaceeditor1');
            if(_temlocalStorage) {
                editor.setValue(_temlocalStorage);
                var _ebc = document.querySelector('.write-cards-wrapper:not([style*="none"]) .editor #email-body-content');

                if(_ebc) {
                    _ebc.innerHTML = _temlocalStorage;
                    replaceAllHtmlElement(_ebc, window.dataCase);
                    updateMeetContentBySheet(_ebc);
                } 
            }

            editor.session.on('change', function(delta) {
                // delta.start, delta.end, delta.lines, delta.action
                // editor.getValue(); // or session.getValue
                var _ebc = document.querySelector('.write-cards-wrapper:not([style*="none"]) .editor #email-body-content');

                _ebc.innerHTML = editor.getValue();
                replaceAllHtmlElement(_ebc, window.dataCase);
                updateMeetContentBySheet(_ebc);

                localStorage.setItem('_tempsaveaceeditor1', editor.getValue());

            });
        }
        if(!document.querySelector('#editor_email.ace_editor')) {
            if(typeof ace === 'object') {
                _load();
            }
            loadFetchText("https://cdnjs.cloudflare.com/ajax/libs/ace/1.19.0/ace.min.js", (rs) => {
                eval(rs);
                if(typeof ace === 'object') {
                    _load();
                }          
            })
        }
    
    } catch (error) {
        console.error('cdtx toolEditorEmailTemplate4Dev', error)  
    }   
}



function clearAndPrepareCRTemplate() {
    // Prepare
    var _composeemailcard = document.querySelector('.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top[card-type="compose"]');
    if(_composeemailcard) {
        cLog(()=>{console.log("CR -> Start")});
        var _email_body_content = _composeemailcard.querySelector('#email-body-content');
        _email_body_content.style.padding = '0px';
        _email_body_content.style.width = '100%';

        var _email_body_content_top = _composeemailcard.querySelector('#email-body-content-top');
        _email_body_content_top.innerHTML = '<div id="email-body-content-top-content"><p dir="auto"></p></div>';

        var _email_body_content_top_content = _composeemailcard.querySelector('#email-body-content-top-content');
        
        
        _email_body_content_top_content.innerHTML = '<p dir="auto"><br></p>';
        
        var ntime = 0;
        var myInterval = setInterval(() => {
            cLog(()=>{console.log("CR -> interval focus cursor point and check content")});

            addCursor2Contenteditable(_email_body_content_top_content);

            if(_email_body_content_top_content.innerText.trim().length > 0) {
                clearInterval(myInterval);

                // replace heading search td table and replace heading
                var _tdcellist = _email_body_content_top_content.querySelectorAll("td");
                if(_tdcellist.length) {
                    _tdcellist.forEach((item) => {
                        var _heading = item.innerText.trim();
                        var _getvalue = searchAndReturnValue(vi_heading_searchandreplace, _heading, 1);
                        if(_getvalue) {
                            item.innerText = _getvalue;
                        }
                    });
                }

                // replace heading search td table and replace heading
                var _tdcellist = _email_body_content_top_content.querySelectorAll(".replaced");
                if(_tdcellist.length) {
                    _tdcellist.forEach((item) => {
                        var _heading = item.innerText.trim();
                        var _list = ['']
                        var _getvalue = searchAndReturnValue(vi_key_task_searchandreplace, _heading, 1);
                        if(_getvalue) {
                            item.innerText = _getvalue;
                        }
                    })
                }

                // remove text
                var _tr = _email_body_content_top_content.querySelectorAll("tr");
                if(_tr.length) {
                    _tr.forEach((item) => {
                        var _text = item.innerText.trim();
                        vi_searchandremove.forEach((item2) => {
                            if(_text == item2) {
                                item.remove();
                            }
                        })
                    })
                }


                // Update action
                _email_body_content_top_content.dispatchEvent(new Event('input'));
                _email_body_content_top_content.dispatchEvent(new Event('focus'));
                _email_body_content_top_content.dispatchEvent(new Event('click'));
                _email_body_content_top_content.click();
                document.execCommand("insertText", false, " ");
            }

            // more than 10s
            if(ntime > 10) {
                cLog(()=>{console.log("CR -> Clear time more than 10s")});
                clearInterval(myInterval);
            }
            ntime++;
            
            
        }, 1000);
    }
}


function getVariableSheetByKeyAndLanguage(_columnname, _keylanguage) {
    try {
        if(window.loadgooglesheetpublish) {
            var _rs = window.loadgooglesheetpublish;
            var _targetarr = _rs['Variable'].sheettab;
            for (let index = 0; index < _targetarr.length; index++) {
                const _item = _targetarr[index];
                
                if(_item['key'].includes(_keylanguage)) {
                    // cLog(() => { console.log('xxx',_item[_columnname]) });;
                    // Load
                    return _item[_columnname];
                    break;
                }
                
            }
        }
            
    } catch (error) {
        console.error('getVariableSheetByKeyAndLanguage', error)
    }

    return false;
}


// timeLeftGoogleCalendar
function timeLeftGoogleCalendar() {

    
    // _TrustScript
    if(typeof _TrustScript !== 'function') {
        function _TrustScript(_string) {
            const staticHtmlPolicyv2 = trustedTypes.createPolicy('foo-static', { createHTML: () => _string });
            return staticHtmlPolicyv2.createHTML('');
        }
    }




    // Stop if ready
    var drawerMiniMonthNavigatorElm = document.querySelector('#drawerMiniMonthNavigator');
    // if(drawerMiniMonthNavigatorElm) return false;
    
    
    // Search kim realtime
    var kim_realtime = document.querySelector(`.H3tRZe`);
    if(!kim_realtime) return false;
    
    // Isset button appointment @group.calendar.google.com
    var btn_appointment = document.querySelectorAll(`[role="gridcell"] [jslog*="@group.calendar.google.com"]`);
    var btn_tasks = document.querySelectorAll(`[role="gridcell"] [data-eventid^="tasks_"]`);
    
    console.log('wcout', btn_appointment.length, btn_tasks.length)
    if(btn_appointment.length === 0 && btn_tasks.length === 0) return false;
    

    // seach tablist
    var calendar_tablist = document.querySelector(`[role="tablist"]`);
    if(!calendar_tablist) return false;
    

    var btn_reminder = () => {
        return calendar_tablist.querySelector('.panel_info-btnrunremide');
    };
    if(btn_reminder()) return false;
    

    if(calendar_tablist) {
        if(!btn_reminder()) {
            var btn_reminder_html = `
            <style>
            </style>
            <div id="gsc-gab-999" class="panel_info-btnrunremide DWWcKd-OomVLb-LgbsSe" data-guest-app-id="999" role="tab" aria-label="remide" aria-selected="false" style="user-select: none;" > <div class="panel_info-btnrunremide-inner DWWcKd-OomVLb-LgbsSe-Bz112c-haAclf" style="background-image: url('data:image/svg+xml,%3Csvg fill=%27%23000000%27 width=%27800px%27 height=%27800px%27 viewBox=%270 0 36 36%27 version=%271.1%27 preserveAspectRatio=%27xMidYMid meet%27 xmlns=%27http://www.w3.org/2000/svg%27 xmlns:xlink=%27http://www.w3.org/1999/xlink%27%3E%3Ctitle%3Etasks-solid-badged%3C/title%3E%3Cpath class=%27clr-i-solid--badged clr-i-solid-path-1--badged%27 d=%27M30,13.5a7.49,7.49,0,0,1-6.46-3.7H11.25V8a1,1,0,0,1,1-1h3.44V6.32a2.31,2.31,0,0,1,4.63,0V7h2.26a7.53,7.53,0,0,1-.07-1,7.53,7.53,0,0,1,.08-1.05h-.5a4.31,4.31,0,0,0-8.17,0H7A1.75,1.75,0,0,0,5,6.64V32.26a1.7,1.7,0,0,0,1.71,1.69H29.29A1.7,1.7,0,0,0,31,32.26V13.43A7.52,7.52,0,0,1,30,13.5Zm-4.23,3.71-9.12,9.12-5.24-5.24a1.4,1.4,0,0,1,2-2l3.26,3.26,7.14-7.14a1.4,1.4,0,1,1,2,2Z%27%3E%3C/path%3E%3Ccircle class=%27clr-i-solid--badged clr-i-solid-path-2--badged clr-i-badge%27 cx=%2730%27 cy=%276%27 r=%275%27%3E%3C/circle%3E%3Crect x=%270%27 y=%270%27 width=%2736%27 height=%2736%27 fill-opacity=%270%27/%3E%3C/svg%3E'); user-select: none;" ></div> </div>`;
            calendar_tablist.insertAdjacentHTML('afterBegin', _TrustScript(btn_reminder_html));
            
        }

    }

    // === SETUP
    var IS_DEBUG = localStorage.getItem('dongtest');


    function toHoursAndMinutes(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        
        return `${hours > 0 ? `${hours}h`: ""}${minutes > 0 ? ` ${minutes}m` : ""}`;
    }
    


    function templateShow(_data, _data_task) {
        if(IS_DEBUG) {
            console.log('templateShow', _data, _data_task);    
        }

        if(drawerMiniMonthNavigatorElm) {
            var _contentsub = '', _contentsub_item = '',  _contentsub_tasks = '';
            _data.forEach(item => {
                _contentsub_item += `<p><a href="https://cases.connect.corp.google.com/#/case/${item.caseid}" target="_blank"  >${item.caseid}</a>: <span class="hour">${toHoursAndMinutes(item.timeleft)}</span> left</p>`
            });


            _data_task.forEach(item => {
                _contentsub_tasks += `<p><a href="https://cases.connect.corp.google.com/#/case/${item.caseid}" target="_blank"  >${item.caseid}</a>: <span class="hour">${toHoursAndMinutes(item.timeleft)}</span> left</p>`
            });

            _contentsub = `
            <span class="panel_info-casesoverview">
                <span>${_data.length}</span> case</span>
                ${_data_task.length > 0 ? `<span class="panel_info-casesoverview panel_info-tasksoverview" style="left: 59%; z-index: -1; transform: translateX(-50%) scale(.8)"><span>${_data_task.length}</span> tasks</span>` : ''}
                
                <div class="panel_info-inner" >
                    ${_contentsub_item}
                </div>`;

            var _tempHtml = `
            <div class="panel_info _r" >
                ${_contentsub}
            </div>`;

            
            if(!document.querySelector('.panel_info')) {
                drawerMiniMonthNavigatorElm.insertAdjacentHTML("afterEnd", _TrustScript(_tempHtml))
            } else {
                document.querySelector('.panel_info').innerHTML = _TrustScript(_contentsub);
            }
        }
    }

    // Đã có trong libs.js
    if(typeof getOnlyCaseId !== 'function') {
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
    }

    // getMeetID
    // lấy meetID
    function getMeetID(_string) {
        try {
            var _regex = /[0-9a-z]{3}[-][0-9a-z]{4}[-][0-9a-z]{3}/g;
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

    // convertPostion2Time
    // chuyển position thành định dạng thời gian
    function convertPostion2Time(_time_position) {
        
        var _convert = (_time_position % 1) * 60 / 100;
        
            _convert = _convert.toFixed(2) * 100;
            _convert = Math.round(_convert);
        var _timecasecurrent = parseInt(_time_position) + ":" + _convert;
        
        return _timecasecurrent;
    }


    // convertPostion2Minute
    // chuyển position thành dạng phút
    function convertPostion2Minute(_time_position) {
        
        var _convert = _time_position * 60 / 100;
        
            _convert = _convert * 100;
            _convert = Math.round(_convert);
        var _timecasecurrent = _convert;
        
        return _timecasecurrent;
    }

    // Chuyển postion thành thời gian số
    // time current: position * 24 giờ / chiều cao của tổng
    function convertPostion(_elm, _col) {
        
        var _pos_event_top = _elm.offsetTop;
        var _time_position = _pos_event_top * 24 / _col.offsetHeight;
        
        
        return _time_position;
    }

    function notificationCaseChrome(_caseid, _timeleft) {
        const options = {
            body: `${_timeleft}min - ${_caseid}`,
            dir: 'ltr',
        };
        const notification = new Notification('Notification', options);

        notification.onclick = function () {
            var _caseurl = 'https://cases.connect.corp.google.com/#/case/' + _caseid
            window.open(_caseurl);
        };
    }

    function calendarGetInfoRealtime() {
        var _cols = document.querySelectorAll('[role="presentation"] [role="row"] [data-principal-ids]');

        for (let i1 = 0; i1 < _cols.length; i1++) {
            const element = _cols[i1];
            // Nếu trong cột ngày có tồn tại kim thời gian thực => cột của ngày hiện tại
            if(element.querySelector('.H3tRZe')) {
                var _col = element;
                var _pos_events = _col.querySelectorAll("[data-eventid]"); 
                
                var _data = [];
                var _data_task = [];
                for (var index = 0; index < _pos_events.length; index++) {
                    var _elm = _pos_events[index];
                    
                    // Lấy case ID trong title
                    var _get_title = _elm.querySelector('.FAxxKc');
                    var _get_caseid = '';
                    if(_get_title) {
                        _get_caseid = getOnlyCaseId(_get_title.innerText);
                    
                    }
                
                    // Lấy vị trí thanh realtime point
                    var _pos_realtime_elm = _col.querySelector('.H3tRZe');
                    var _pos_realtime_elm_time = 0;
                    if(_pos_realtime_elm) {
                        _pos_realtime_elm_time = convertPostion(_pos_realtime_elm, _col);
                    }
                
                    
                    
                    // 1. Nếu tồn tại Case ID
                    if(_get_caseid) {
                        var _timecasecurrent = convertPostion(_elm, _col);

                        console.log('_get_caseid', _get_caseid);
                        
                        // 1. Nếu tồn tại Google Meet ID  
                        var _jslog = _elm.getAttribute('jslog');
                        if(getMeetID(_jslog)) {
                            if(IS_DEBUG) {
                                console.log(convertPostion2Time(_pos_realtime_elm_time), convertPostion2Time(_timecasecurrent), _pos_realtime_elm_time, _timecasecurrent, _get_caseid,  getMeetID(_jslog));    
                            }
                            if(_timecasecurrent - _pos_realtime_elm_time > 0) {
                                var _minute_timeleft = convertPostion2Minute(_timecasecurrent - _pos_realtime_elm_time);
                                if(IS_DEBUG) { console.log("time minute left: ", _minute_timeleft); }
                                
                                var _temp_info = {
                                    'timeleft': _minute_timeleft,
                                    'caseid': _get_caseid,
                                };
                                _data.push(_temp_info);
                                if(_minute_timeleft < 6) {
                                    window.caseNotiOnce = window.caseNotiOnce || _get_caseid;
                                    if(window.caseNotiOnce !== _get_caseid) {
                                        notificationCaseChrome(_get_caseid, _minute_timeleft);
                                        window.caseNotiOnce = _get_caseid;
                                    }
                                }
                                
                            }
                        }
                        
                        // 1.2 Get task
                        if(_elm.getAttribute('jslog').includes('tasks@tasks.google.com')) {
                            if(!_elm.querySelector('.w9eXqe')) {
                                var _temp_info = {
                                    'timeleft': _minute_timeleft,
                                    'caseid': _get_caseid,
                                };
                                _data_task.push(_temp_info);    
                            }
                            
                        }
                    }
                }


                templateShow(_data, _data_task);
                

                // Tìm thấy nhau thì dừng lại và bỏ qua mọi thứ xung quanh;
                break;
            }
            
        }
    }


    // Run Once
    var _oncerun = 0;
    var _run = () => {
        if(_oncerun > 0) return false;
        _oncerun++;
        calendarGetInfoRealtime();
        setInterval(() => {
            calendarGetInfoRealtime();
        }, 1000 * 60)
    }
    
    if(localStorage.getItem('show_calendarview')) {
        _run();
        btn_reminder().classList.add("active");
    }

    // click
    btn_reminder().addEventListener('click', function(e) {
        _run();

        if(btn_reminder().classList.contains('active')) {
            document.querySelector('.panel_info').classList.add('hidden');
            localStorage.removeItem('show_calendarview');
        } else {
            document.querySelector('.panel_info').classList.remove('hidden');
            localStorage.setItem('show_calendarview', 1);
        }

        btn_reminder().classList.toggle('active');
        
    });
}



// Example
// var _a = {'a': 123, 'b': 3333}
// var _b = {'a': 4444, 'c': 3333}
// mergeObjectNotOverwrite(_a, _b);
// {a: 123, b: 3333, c: 3333}
function mergeObjectNotOverwrite(target, src) {
    var _rs = {};
    for (const [key, value] of Object.entries(target)) {
        _rs[key] = value;
    }

    
    for (const [key, value] of Object.entries(src)) {
        if(_rs[key]) continue;
        _rs[key] = value;
    }

    return _rs;
}