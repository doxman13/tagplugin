// ==== VARIABLE GLOBAL ====
window.dataTagteam = window.dataTagteam || {};
window.dataTagteam.extension_id = chrome.runtime.id;
window.dataTagteam.assets_url_img = 'chrome-extension://' + window.dataTagteam.extension_id + '/assets/img';
window.dataTagteam.api_blog = 'https://cdtx.lyl.vn/cdtx-assistant/filemanager_api/api.php';
window.dataTagteam.urlgooglesheet = 'https://docs.google.com/spreadsheets/u/2/d/e/2PACX-1vRMxOxerJ3zWV07uTOdTQCaa13ODbTfZVj5SB7-4Q6QlFhFTU8uXA-wsywXAUUqzHtOiGQdGgCYfRmk/pubhtml';
window.dataTagteam.dongtest = localStorage.getItem("dongtest") || false; 

// ==== LIB ====
    // Toastify
    !function(t){var i=function(t){return new i.lib.init(t)};i.lib=i.prototype={toastify:"0.0.1",constructor:i,init:function(t){return t||(t={}),this.options={},this.options.text=t.text||"Hi there!",this.options.duration=t.duration||3e3,this.options.selector=t.selector,this.options.class=t.class || "",this.options.callback=t.callback||function(){},this},buildToast:function(){if(!this.options)throw"Toastify is not initialized";var t=document.createElement("div");return t.className="_panel_toastify on " + this.options.class,t.innerHTML=this.options.text,t.addEventListener("click",this.options.callback),t},showToast:function(){var t,o=this.buildToast();if(!(t=void 0===this.options.selector?document.body:document.getElementById(this.options.selector)))throw"Root element is not defined";return t.insertBefore(o,t.firstChild),i.reposition(),window.setTimeout((function(){o.classList.remove("on"),window.setTimeout((function(){o.remove(),i.reposition()}).bind(this),400)}).bind(this),this.options.duration),this}},i.reposition=function(){for(var t=15,i=document.getElementsByClassName("_panel_toastify"),o=0;o<i.length;o++){var n=i[o].offsetHeight;i[o].style.top=t+"px",t+=n+15}return this},i.lib.init.prototype=i.lib,t.Toastify=i}(window);



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

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

  
function getDomainOnlyURL(_argurl) {
    // var _argurl = 'dong.com'
    var _url = '';
    try {
        var _urlobj = new URL(_argurl);
        _url = _urlobj.hostname
    } catch(e) {
        _url = _argurl;
    }
    
    return _url;
}

function getDiffTime(str_time, type) {
    try {    
        const date1 = new Date();
        const date2 = new Date(str_time);
        const diffTime = (date2 - date1);
        // const diffTime = Math.abs(date2 - date1);
        const diffSecond = Math.ceil(diffTime / (1000)); 
        const diffMinute = Math.ceil(diffTime / (1000 * 60)); 
        const diffHour = Math.ceil(diffTime / (1000 * 60 * 60)); 
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        
        if(type == 'second') {
            return diffSecond;
        }
        if(type == 'minute') {
            return diffMinute;
        }
        if(type == 'hour') {
            return diffHour;
        }
        if(type == 'day') {
            return diffDays;
        }
        
    } catch (error) {
        return "NG";
    }

    return false;
}

function getNameUrl(item) {
    // var _argurl = 'dong.com'
    if(item.trim()) {
        var _name = getDomainOnlyURL(item);
        if(item.includes('//cases.connect.corp.google.com')) { _name = 'cases connect'; }
        if(item.includes('//analytics.google.com')) { _name = 'analytics'; }
        if(item.includes('//adwords.corp.google.com')) { _name = 'adwords ics'; }
        if(item.includes('//analytics-ics.corp.google.com')) { _name = 'analytics-ics'; }
        if(item.includes('//tagmanager-ics.corp.google.com')) { _name = 'tagmanager-ics'; }
        if(item.includes('//mcn-ics.corp.google.com')) { _name = 'mcn-ics'; }
        return _name;
    }

    return '';
}
// Display day next exclude 7,8 
function dayNextByCustom(_daynext, format="d/m/Y", _isworkinday = true) {
    function calcWorkingDays(fromDate, days) {
        var count = 0;
        while (count < days) {
            fromDate.setDate(fromDate.getDate() + 1);

            // work in days
            if(_isworkinday) {
                if (fromDate.getDay() != 0 && fromDate.getDay() != 6) 
                    count++;
            } else {
                count++;
            }
        }
        return fromDate;
    }; 
    
    /* var _date_14day = (calcWorkingDays(new Date("2023/05/23"), 14)); */ 
    var _date_nextday = (calcWorkingDays(new Date(), _daynext));

    // d/m/Y
    _dateformat = format ? format : 'd/m/Y';
    var _replace = _dateformat.replace('d', ("0" + _date_nextday.getDate()).slice(-2));
    _replace = _replace.replace('m', ("0" + (_date_nextday.getMonth() + 1)).slice(-2));
    _replace = _replace.replace('Y', _date_nextday.getFullYear());
    // var _date_key_format = [
    //     ("0" + _date_nextday.getDate()).slice(-2),
    //     ("0" + (_date_nextday.getMonth() + 1)).slice(-2),
    //     _date_nextday.getFullYear(),
    // ];
    
    return _replace;
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
    try {
        return str_adsid
            .replace(/\D+/g, '')
            .replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');    
    } catch(e) {
        return false
    }
    return false
}


// Case Format 0-000000
function isCaseFormat(str_adsid) {
    try {
        var dateReg = /^\d{1}([./-])\d{13}$/

        return str_adsid.match(dateReg) ? true : false;

    } catch(e) {
        return false
    }
    return false
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDateTime(date) {
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

function formatDate(date, format = 'Y-m-d') {
    _dateformat = format ? format : 'd/m/Y';
    var _replace = _dateformat.replace('d', ("0" + date.getDate()).slice(-2));
    _replace = _replace.replace('m', ("0" + (date.getMonth() + 1)).slice(-2));
    _replace = _replace.replace('Y', date.getFullYear());

    return _replace;
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
            return formatDateTime(date);
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

// function wait4Elem(selector) {
//     cLog(() => {console.log('wait4Elem use ' + selector)});
//     return new Promise(function (resolve, reject) {
//         var el = document.querySelector(selector);
//         if (el) {
//             resolve(el);
//             return;
//         }
//         new MutationObserver(function (mutationRecords, observer) {
//             // Query for elements matching the specified selector
//             Array.from(document.querySelectorAll(selector)).forEach(function (element) {
//                 resolve(element);
//                 //Once we have resolved we don't need the observer anymore.
//                 observer.disconnect();
//             });
//         }).observe(document.documentElement, {
//             childList: true,
//             subtree: true
//         });
//     });
// }

// 
function wait4Elem(selector) {
    return new Promise(function (resolve, reject) {
        var el = document.querySelector(selector);
        if (el) {
            console.log('wait4Elem', selector);
            resolve(el);
            return;
        }
        
        let timeoutId = 0;
        const observer = new MutationObserver(function (mutationRecords, observer) {
            const elem = mutationRecords[0].target.querySelector(selector) || document.querySelector(selector);
            if(elem !== null) {
                clearTimeout(timeoutId);
                observer.disconnect();
                resolve(elem);
            }
        });
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });

        timeoutId = setTimeout(() => {
            observer.disconnect();

            const elem = document.querySelector(selector);
            
            console.log('wait4Elem timeout', selector);
            if(elem !== null) {
                resolve(elem);
            } else {
                reject('timeout for wait4Elem, selector not found: ' + selector);
            }
        }, 15000);
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
                var is_exclude_am_emaildfa = false;

                // If is Gold / silver => make AM email to CC
                    if(caseload.customer_program) {
                        var is_goldsilver = false;
                        if(caseload.customer_program.toLowerCase().trim().includes('silver')) {
                            is_goldsilver = true;
                        }
                        
                        if(caseload.customer_program.toLowerCase().trim().includes('gold')) {
                            is_goldsilver = true;
                        }

                        if(is_goldsilver && window.dataCase.is_external) {
                            is_gcc_external = is_goldsilver ? false : is_gcc_external ;
                        }
                    }

                // is external & has am
                    if(window.dataCase.is_external && is_gcc_external) {
                        is_exclude_am_emaildfa = true;
                    }

                
                cLog(() => {console.log("eie --- START Wait - is_gcc_external ", is_gcc_external  ); });
                
                
                
                // AM Function
                var am_function = () => {
                    
                    // Expan cc if not show
                    window._ntimeexpand = window._ntimeexpand || 0;
                    if(window._ntimeexpand > 3) {
                        return false;
                    }
                    
                    var _email_input_cc = () => { 
                        return document.querySelector(str_elmparent + 'email-address-input.input.cc');
                    };
                    var _email_input_bcc = () => {
                        return document.querySelector(str_elmparent + 'email-address-input.input.bcc');
                    };


                    if(!(_email_input_cc() && _email_input_bcc())) {
                        if(elmexpand = elm_parentheader.querySelector('[debug-id="expand-button"]')) {
                            elmexpand.click();    
                        }
                        
                        setTimeout(() => {
                            am_function();
                        }, 1000);
                        
                        return false;
                    }
                    
                    
                    
                    // Start
                    var elm_area = () => { return elm_parentheader.querySelector(".input.cc"); }
                    
                        if (is_gcc_external) {
                            elm_area = () => { return elm_parentheader.querySelector(".input.bcc"); }
                        }
                        
                        var elm_input = elm_area().querySelector("input");
                        if(elm_area().innerText.trim().includes('@') === false && is_exclude_am_emaildfa === false) {
                            // cLog(() => { console.log('eie 1checkandfix Add AM EMAIL ** 2 => START', 'is GCC', is_gcc_external); })
                            elm_input.value = caseload.am_email;
                
                            elm_input.dispatchEvent(new Event('input'));
                            elm_input.dispatchEvent(new Event('enter'));
                            elm_input.dispatchEvent(new Event('change'));
                            
                            
                            setTimeout(() => {
                                elm_input.dispatchEvent(new Event('blur'));
                            }, 500);
                            
            
                            // var n_time = 0;
                            // var time_input_key = setInterval(function () {

                            //     elm_input.dispatchEvent(new Event('blur'));
                            //     var elm_technical = document.querySelector('email-address-content [debug-id="email"]');
                            //     if (elm_technical) {
                            //         if(elm_technical.innerText.includes(caseload.am_email)) {
                            //             elm_technical.click();
                            //         }
                            //     }

                            //     cLog(() => {  console.log('eie', elm_area().querySelectorAll('user-chip').length, caseload.am_email.split(',').length, elm_area().querySelectorAll('user-chip').length === caseload.am_email.split(',').length ); });
                            //     if(elm_area().querySelectorAll('user-chip').length === caseload.am_email.split(',').length) {
                            //         clearInterval(time_input_key);
                            //     }

                            //     if (n_time > 10) {
                            //         cLog(() => { console.log('eie 1checkandfix Add AM EMAIL ** 2 => STOP ACTION '); })
                            //         clearInterval(time_input_key);
                            //         elm_input.dispatchEvent(new Event('blur'));
                            //     }
                            //     n_time++;
                
                            // }, 500);

                            return false;
                        }
                }
                
                
                
                
                
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
                    
                    // If click reply email => STOp
                    cLog(() => { console.log("eie - recheck_fix_alert - hasClkReply: ", window.hasClkReply) });
                    if(window.hasClkReply == true) {
                        window.hasClkReply = false;
                        
                        elm_str_elmparent_headers.setAttribute('data-eieid', timekey);
                        
                        var elm_parentheader = document.querySelector(`[data-eieid="${timekey}"]`);
                        elm_parentheader.classList.add("finished");
                        elm_parentheader.classList.add("finished-reply");
                        
                        am_function();

                        return false;
                    }
                    
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
        
                    
                    
                        
                    // Repair
                        var _email_input_from = elm_parentheader.querySelector('email-address-dropdown.input.from');
                        var _email_input_to = () => {
                            return elm_parentheader.querySelector('email-address-input.input.to');
                        };
                        var _email_input_cc = () => {
                            return elm_parentheader.querySelector('email-address-input.input.cc');
                        };
                        
                        var _email_input_bcc = () => { 
                            return elm_parentheader.querySelector('email-address-input.input.bcc');
                        };
                    
                    
                    
                    
                        
                    
                    var recheck_fix_alert = (_callback, n_step = "0unmark", elm_parentheader) => {
                        
                        cLog(() => { console.log("eie - recheck_fix_alert - step: ", n_step, window.hasClkReply) });
        
                        
                        if(n_oncedequi > 10) {
                            cLog(() => {console.log("eie --- STOP DEQUI"); });
                            document.body.classList.remove("is_recheck_fix_alert_fixing");
                            elm_parentheader.classList.add("finished");
                            return false;
                        }

                        n_oncedequi++;
        
                        // START
                        
                        // ****
                        // MAJOR: Recheck input , False => reset function again.
                        // ****
                        
                            if(!(_email_input_cc() && _email_input_bcc())) {
                                if(elmexpand = elm_parentheader.querySelector('[debug-id="expand-button"]')) {
                                    elmexpand.click();    
                                }
                                
                                
                                // return for recheck
                                setTimeout(() => {
                                    recheck_fix_alert(_callback, n_step, elm_parentheader);
                                }, 500);
                                
                                return false;
                            }
                                
                        
                        // BEGIN
                        if(_email_input_from && _email_input_to() && _email_input_cc() && _email_input_bcc()) {
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
                                
                                
                                // *******************
                                // 1. EMAIL FROM
                                // *******************
                                // if(_email_input_from.innerText.trim().includes('technical-solutions@google.com') === false) {
                                //     cLog(() => { console.log('eie 1checkandfix CLEAR EMAIL INPUT => START'); })
                                    
                                //     cLog(() => { console.log('eie 1checkandfix _email_input_from: NG: ', _email_input_from.innerText.trim()); })

                                //     document.querySelector(str_elmparent + ".input.from material-dropdown-select material-icon").click();

                                //     wait4Elem('[id="email-address-id--technical-solutions@google.com"]').then((_caseid_elm) => {
                                //         _caseid_elm.click();
                                //         recheck_fix_alert(_callback, "1checkandfix", elm_parentheader);
                                //     })

                                //     return false;
                                // }


                                
                                


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
                                    var elm_input_to = elm_parentheader.querySelector(".input.to input");
                                    elm_input_to.value = caseload.customer_email.trim();
                                    elm_input_to.dispatchEvent(new Event('input'));
                                    elm_input_to.dispatchEvent(new Event('enter'));
                                    elm_input_to.dispatchEvent(new Event('change'));
                                    cLog(() => { console.log('eie 1checkandfix Customer Email ** 1 => START', elm_input_to) })

                                    var n_time = 0;
                                    var time_input_key = setInterval(function () {
                                        
                                        elm_input_to.dispatchEvent(new Event('blur'));
                                        var elm_technical = document.querySelector('email-address-content [debug-id="email"]');
                                        if (elm_technical) {
                                            if(elm_technical.innerText.includes(caseload.customer_email.trim())) {
                                                elm_technical.click();
                                            }
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
                                            
                                            elm_input_to.dispatchEvent(new Event('blur'));
                                        }

                                        n_time++;
                                    }, 500);
                                    
                                    return false;
                                }


                                // ******************
                                // Add AM EMAILx
                                // ******************
                                var elm_area = () => { return elm_parentheader.querySelector(".input.cc"); }
                                if (is_gcc_external) {
                                    elm_area = () => { return elm_parentheader.querySelector(".input.bcc"); }
                                }
                                
                                var elm_input = elm_area().querySelector("input");
                                if(elm_area().innerText.trim().includes('@') === false && is_exclude_am_emaildfa === false) {
                                    cLog(() => { console.log('eie 1checkandfix Add AM EMAIL ** 2 => START', 'is GCC', is_gcc_external); })
                                    elm_input.value = caseload.am_email;
                        
                                    elm_input.dispatchEvent(new Event('input'));
                                    elm_input.dispatchEvent(new Event('enter'));
                                    elm_input.dispatchEvent(new Event('change'));
                    
                                    var n_time = 0;
                                    var time_input_key = setInterval(function () {

                                        elm_input.dispatchEvent(new Event('blur'));
                                        var elm_technical = document.querySelector('email-address-content [debug-id="email"]');
                                        if (elm_technical) {
                                            if(elm_technical.innerText.includes(caseload.am_email)) {
                                                elm_technical.click();
                                            }
                                        }

                                        
                                        try {
                                            // cLog(() => {  console.log('eie', elm_area().querySelectorAll('user-chip').length, caseload.am_email.split(',').length, elm_area().querySelectorAll('user-chip').length === caseload.am_email.split(',').length ); });
                                            if(caseload.am_email) {
                                                if(elm_area().querySelectorAll('user-chip').length === caseload.am_email.split(',').length) {
                                                    clearInterval(time_input_key);
                                                    recheck_fix_alert(_callback, "1checkandfix", elm_parentheader);   
                                                }    
                                            }
                                        } catch(error) {
                                            console.error(error)
                                        }
                                        

                                        if (n_time > 10) {
                                            cLog(() => { console.log('eie 1checkandfix Add AM EMAIL ** 2 => STOP ACTION '); })
                                            clearInterval(time_input_key);
                                            recheck_fix_alert(_callback, "1checkandfix", elm_parentheader);
                                            elm_input.dispatchEvent(new Event('blur'));
                                        }
                                        n_time++;
                        
                                    }, 500);

                                    return false;
                                }
                                

                                elm_parentheader.classList.add("finished");
                                
                                cLog(() => {console.log('eie 1checkandfix FINISH');});

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
                            var _email_input_cc = () => { 
                                return document.querySelector(str_elmparent + 'email-address-input.input.cc');
                            };
                            var _email_input_bcc = () => {
                                return document.querySelector(str_elmparent + 'email-address-input.input.bcc');
                            };
        
        
                            if(!(_email_input_cc() && _email_input_bcc())) {
                                if(elmexpand = elm_parentheader.querySelector('[debug-id="expand-button"]')) {
                                    elmexpand.click();    
                                }
                                
                                return false;
                            }
                                
                            if(_email_input_from && _email_input_to && _email_input_cc() && _email_input_bcc()) {
        
                                    
                                    var n_err = 0;
                                    
                                    // if(_email_input_from.innerText.includes('technical-solutions@google.com') === false) {
                                    //     if(_email_input_from.closest('.header')) {
                                    //         _email_input_from.closest('.header').setAttribute("data-type", "_chk_email_agains");
                                    //     }
                                    //     _email_input_from.classList.add("_chk_email_from_wrong");
            
                                    //     noteBarAlert('Mail From => wrong', caseload.case_id);
                                    //     n_err++;
                                        
                                    // }
                                    
                                    if(_email_input_to.innerText.includes(caseload.customer_email) === false) {
                                        if(_email_input_to.closest('.header')) {
                                            _email_input_to.closest('.header').setAttribute("data-type", "_chk_email_agains");
                                        }
                                        _email_input_to.classList.add("_chk_email_to_wrong");
                                        
                                        noteBarAlert('Mail TO => wrong / missing', caseload.case_id);
                                        n_err++;
                                    }
                                
                                    if(caseload.am_isgcc_external) {
                                        if(_email_input_bcc().innerText.includes(caseload.am_email) === false) {
                                            if(_email_input_bcc().closest('.header')) {
                                                _email_input_bcc().closest('.header').setAttribute("data-type", "_chk_email_agains");
                                            }
                                            _email_input_bcc().classList.add("_chk_email_bcc_wrong");
                                        
                                            noteBarAlert('Is BCC => BCC => wrong / missing', caseload.case_id);
                                            n_err++;
                                        }
                                    } else {
                                        
                                        if(_email_input_cc().innerText.includes(caseload.am_email) === false) {
                                            if(_email_input_cc().closest('.header')) {
                                                _email_input_cc().closest('.header').setAttribute("data-type", "_chk_email_agains");
                                            }
                                            _email_input_cc().classList.add("_chk_email_cc_wrong");
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
    if(
        window.location.hostname === "analytics-ics.corp.google.com" || 
        window.location.hostname === "tagmanager-ics.corp.google.com" 
    ) {

        try {
        
            var _datatemp = "";
            var _caseid_indata = "";
            var n_once = 0;
            var _listcase = [];
            var __lastvisitcasse = "";
            
            var _key = 'cdtx_analytics-ics_listcaseandlink';
            
            var _key = 'cdtx_tool_quicklink';
            getChromeStorage(_key, (response) => {
                _datatemp = response.value || {};
                cLog(() => {console.info("dongmai - here started", _datatemp)});


                
                Object.entries(_datatemp).forEach(([key, value]) => {
                    if(value.includes(location.href)) {
                        _caseid_indata = key;
                        _listcase.push(key);
                    }
                });
                
                
            });
            

            
            
            getChromeStorage("__lastvisitcasse", (response) => {
                __lastvisitcasse = response.value || '';
            });
            
            
            observeOnce((elm) => {
                // on-call, precall button 
                
                
                if(_istopelm = document.querySelector(`md-dialog.ics-data-access-reason-dialog [name="caseId"]`)) {
                    
                    if(!_istopelm.classList.contains('is_insert')) {
                        cLog(() => { console.log('observeOnce - globalForAll' ) });
                    
                        _istopelm.classList.add('is_insert');
                        
                        getChromeStorage("__lastvisitcasse", (response) => {
                            __lastvisitcasse = response.value || '';
                            
                            cLog(() => { console.log("analytics - 2", __lastvisitcasse, _listcase, _caseid_indata, _datatemp) });
                        
                            _istopelm.value = _caseid_indata;
                            
                            _istopelm.dispatchEvent(new Event('input'));
                            _istopelm.dispatchEvent(new Event('enter'));
                            _istopelm.dispatchEvent(new Event('change'));
                            _istopelm.dispatchEvent(new Event('blur'));
                            
                            
                            if(elm_here = _istopelm.closest('md-input-container')) {
                                var lst = '';
                                _listcase.forEach(item => {
                                    if(item != _caseid_indata) {
                                        lst += `<span  data-debugid="actfillcaseid"  >${item}</span>`;
                                    }
                                });
                                
                                if(__lastvisitcasse) {
                                    var caseidextract = __lastvisitcasse.split('|||');
                                    lst += `<span data-debugid="actfillcaseid" data-text="${caseidextract[1] ? `Last visit: ${caseidextract[1]}` : ''  }" >${caseidextract[0]}</span>`;
                                }
                                
                                if(lst) {
                                    elm_here.insertAdjacentHTML('beforeEnd', `
                                    <style>.cdtx_lstcaserelated [data-debugid]{position:relative;display:inline-block;font-size:80%;line-height:1;white-space:nowrap;border-radius:5px;margin:10px 10px 10px 0;cursor:pointer;padding:10px 0}
                                    
                                    .cdtx_lstcaserelated [data-debugid][data-text]:before{content:attr(data-text);position:absolute;bottom:calc(70% + 2px);font-size:80%;opacity:.7} .cdtx_lstcaserelated [data-debugid][data-text] {color:#9E9E9E}
                                    .cdtx_lstcaserelated [data-debugid][data-text]:hover {
                                        color: #009688;
                                    }
                                    </style>
                                    <div class="cdtx_lstcaserelated">${lst}</div>`);
                                }
                            }
                            
                        });
                        
                        
                        
                        
                    }
                    
                }
            });
            
            // Event Click
            onClickElm('[data-debugid="actfillcaseid"]', 'click', function(elm, e){
                
                if(_istopelm = document.querySelector(`md-dialog.ics-data-access-reason-dialog [name="caseId"]`)) {
                        cLog(() => { console.log("analytics - 2", __lastvisitcasse, _listcase, _caseid_indata, _datatemp) });
        
                        _istopelm.value = elm.innerText;
                        
                        _istopelm.dispatchEvent(new Event('input'));
                        _istopelm.dispatchEvent(new Event('enter'));
                        _istopelm.dispatchEvent(new Event('change'));
                        _istopelm.dispatchEvent(new Event('blur'));
                    
                }
            
            });
            
            onClickElm('.ics-dialog-confirm', 'click', function(elm, e){
                if(_istopelm = document.querySelector(`md-dialog.ics-data-access-reason-dialog [name="caseId"]`)) {
                    var _caseid_here = _istopelm.value.trim();
                    if(isCaseFormat(_caseid_here)) {
                        setGetQuickLink(_caseid_here, location.href, () => {
                            console.log(123123123)
                        });
                    }
                }
                
            
            });
            
            
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
    if(!(location.hostname === 'tagmanager.google.com' || location.hostname === 'tagmanager-ics.corp.google.com')) return false;

    var callback = () => {
        if(gtmpublish = document.querySelector('header .gtm-container-public-id')) {
            if(!(gtmclone = document.querySelector(".gtm-clone"))) {
                cLog(() => { console.log('observeOnce - tagteam_showGTMID' ) })
                // if(gtmpublish.classList.contains('done')) return;
                // gtmpublish.classList.add('done')
                
                // START
                var is_copy = () => {
                    var gtm_id = gtmpublish.innerText.trim();
                    gtmpublish.insertAdjacentHTML("afterEnd", `<span class="gtm-clone" style="font-size: 14px;border: 1px solid #ccc;margin: 10px;padding: 10px;background: #fff;box-shadow: 0 0 17px #ccc;display: inline-block;line-height: 1;text-align: left;"><small style="user-select: none; display: block; color: #888; font-size: 70%; ">Copy below</small><span style=" user-select: all; margin: 7px 0; display: block; color: #888; ">${gtm_id}</span></span>`)
    
                }
            
                is_copy();    
            }
            
        }    
    }
    
    observeOnce(callback);
}

// Support click all elem visbile anytime - like jQuery(document).on("click", "classElemString", function(){   });
// onClickElm 
// =====
// function onClickElm(str_selector, eventstr, _callback){
//     document.addEventListener(eventstr, function(e){
//         e.target.matches(str_selector)&&_callback(e.target, e)
//     });
// }

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
        _item = _item.split("|||");
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

function cLog(callback, type = 1) {

    if(type == 1 && localStorage.getItem('dongtest') == '1') {
        callback();
    } 
    if(type == 2 && localStorage.getItem('dongtest') == '2') {
        callback();
    } 
}


function d_load_script(url, callback,   _id = null) {
    if ( _id) {
        if(document.querySelector('#' + _id)) {
            callback();
            return;
        };
    }
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.id = _id;
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
        }).catch((error) => {
            _callback(false);
        });;;
}

function loadFetchText(url, _callback) {
    fetch(url, {
        method: 'GET'
    })
        .then(function(response) {
            return response.text();
        }).then(function(_content) {
            _callback(_content);
        }).catch((error) => {
            _callback(false);
        });
}

function loadFetchContent(url, _callback) {
    fetch(url, {
        method: 'GET',
        cache: "force-cache",
    })
        .then(function(response) {
            return response.text();
        }).then(function(_html_panel) {
            _callback(_html_panel);
        }).catch((error) => {
            _callback(false);
        });;
}



// ======
// For Storage
function setChromeStorage(key, value, _callback = false) {
    chrome.runtime.sendMessage({method: 'fe2bg_chromestorage_set', key: key, value: value}, (response) => {
        if(_callback !== false) {
            _callback(response);
            // cLog(() => {console.log('__DONG save', key, value, response); });
        }
    });
}


function getChromeStorage(key, _callback = false) {
    chrome.runtime.sendMessage({method: 'fe2bg_chromestorage_get', key: key}, (response) => {
        if(_callback !== false) {
            response = response || {};
            if(response.value) {
                if(response.value.case_id) {
                    // console.log('__DONG get_st', key, response.value.case_id, response.value);
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

                    if(case_body = elm_casedetails.querySelector('.case-body')) {
                        case_body.insertAdjacentHTML("beforeBegin", _str);
                    }
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
}

function observeOnce(callback, targetNode = document.body, config = { attributes: true, childList: true, subtree: true }) {
    var callback_control = (elm) => {
        cLog(() => { console.log('observeOnce', elm[0].target) }, 2);
        callback(elm);
    };
    
    var observer = new MutationObserver(callback_control);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);
}




function load_remote (result, _default_action) {
    var _timekey_current = new Date().getDate() + "" + new Date().getHours();
    var _option = result.optionkl__modecase; // Auto | Development | ExtensionDefault
    var _timecacheminute = [
        new Date().getMonth(),
        new Date().getDate(),
        new Date().getHours(),
        new Date().getMinutes(),
    ];

       

    switch (_option) {
    
        // ExtensionDefault
        case 'ExtensionDefault':
            _default_action();
    
            break;
    
    
        // Development
        // vi_api_blog | action: script4dev
        case 'Development':
                
            // Get API URL
            getValueByKeyInSheetname(key = 'cdn_dev', 'System' , (url) => {
                
                if(url == '') return;

                // Add paramater
                var _url = new URL(url);
                _url.searchParams.set('key', _timecacheminute.join(''));
                url = _url.href;


                cLog(() => {
                    console.log("load_remote 000", url);
                });

                // Load URL
                loadFetchContent(url, (response_api) => {
                    // If fetch error => default

                    if(response_api == false) {
                        cLog(() => {
                            console.log("load_remote response_api false => _default_action");
                        });
                        _default_action();
                        return;
                    }


                    // if content
                    try {
                        cLog(() => {
                            console.log("load_remote RUN SCRIPT CONTENT");
                        });
                        eval(response_api);
                    } catch (e) {
                        if (e instanceof SyntaxError) {
                            cLog(() => {
                                console.log("load_remote error code try catch => _default_action");
                                
                                console.error("CDTX Error", e);
                            });
                            _default_action();
                        }
                    }
                });
            });
            
                // load_fetch_post_content(window.dataTagteam.api_blog, _body, (response_api) => {
                //     if(response_api.rs) {
                //         setChromeStorage(_key, response_api.rs , () => {
                //             if(response_api.typeaction == 'script_sync') {
                //                 try {
                //                     eval(response_api.script_str);
                //                 } catch (e) {
                //                     if (e instanceof SyntaxError) {
                //                         console.error("Error", e);
                //                     }
                //                 }
                //             } else {
                //                 _default_action();
                //             }
                //         });
                //     }
                // });
            break;
    
        // Auto - auto sync
        // vi_api_blog  | action: script4agent
        default:
            
        var _key = "cdtx_scriptsync_auto";
        getChromeStorage(_key, (load_rs) => {
            cLog(() => {
                console.log('load_rs',load_rs );
            });

            var _crawl = () => {
                getValueByKeyInSheetname(key = 'cdn_beta', 'System' , (url) => {
                    cLog(() => {
                        console.log("load_remote cdn_beta System", url);
                    });

                    if(url == '') return;

                    // Add paramater
                    var _url = new URL(url);
                    _url.searchParams.set('key', _timecacheminute.join(''));
                    url = _url.href;


                    cLog(() => {
                        console.log("load_remote 000", url);
                    });

                    // Load URL
                    loadFetchContent(url, (response_api) => {
                        // If fetch error => default

                        if(response_api == false) {
                            cLog(() => {
                                console.log("load_remote response_api false => _default_action");
                            });
                            _default_action();
                            return;
                        }


                        // if content
                        try {
                            cLog(() => {
                                console.log("load_remote RUN SCRIPT CONTENT");
                            });

                            var _obj = {
                                timesync: new Date(),
                                script_str: response_api,
                            };

                            setChromeStorage(_key, _obj , (response) => {
                                if(response) {
                                    eval(response_api);
                                } else {
                                    _default_action();
                                }
                            });
                        } catch (e) {
                            if (e instanceof SyntaxError) {
                                cLog(() => {
                                    console.log("load_remote error code try catch => _default_action"); console.error("CDTX Error", e);
                                });
                                _default_action();
                            }
                        }
                    });
                });
            };
            if(load_rs.value) {
                var _obj = load_rs.value;
                
                cLog(() => {
                    console.log('load_remote', parseInt(_timecacheminute.join('')), getDiffTime(_obj.timesync, 'minute'), _obj);
                })
                if(getDiffTime(_obj.timesync, 'minute') < 30) {
                    eval(_obj.script_str);

                } else {
                    _crawl();
                }
            } else {
                _crawl();
            }
        });
        


                // var _key = "cdtx_scriptsync_auto";
    
                // var _sync_api = (_objectvalue) => {
                //     var _body = {
                //         "action": "script4agent",
                //         "language": result.mycountry,
                //         "timesync": _timekey_current						
                //     };
                //     load_fetch_post_content(window.dataTagteam.api_blog, _body, (response_api) => {
                        
                //         cLog(() => {console.log("load_fetch_post_content", response_api);})

                //         if(response_api.rs) {
                //             setChromeStorage(_key, response_api , () => {
                //                 if(response_api.typeaction == 'script_sync') {
                //                     try {
                //                         eval(response_api.script_str);
                //                     } catch (e) {
                //                         if (e instanceof SyntaxError) {
                //                             console.error("Error", e);
                //                             _default_action();
                //                         }
                //                     }
                //                 } else {
                //                     _default_action();
                //                 }
                //             });
                //         } else {
                //             cLog(() => {console.log("FETCH DATA ERROR or RETURN FALSE")})
                //             var _rsfalse = {
                //                 rs: false,
                //                 script_str: _objectvalue.script_str,
                //                 timesync: _timekey_current,// day+hour
                //                 typeaction: _objectvalue.typeaction, // script_sync
                //             }
                //             setChromeStorage(_key, _rsfalse , () => {
                //                 if(response_api.typeaction == 'script_sync') {
                //                     try {
                //                         eval(_objectvalue.script_str);
                //                     } catch (e) {
                //                         if (e instanceof SyntaxError) {
                //                             console.error("Error", e);
                //                             _default_action();
                //                         }
                //                     }
                //                 } else {
                //                     _default_action();
                //                 }
    
                //             })
                //         }
                //     });
                // }
                
                // getChromeStorage(_key, (response) => {
                //     var _objectvalue = {};
                //     if(response.value) {
                //         _objectvalue = response.value;
                //         cLog(() => {console.log("===", _objectvalue)})
                //         // 
                //         if(_objectvalue.timesync == _timekey_current) {
                //             cLog(() => {console.log("_CACHE", _objectvalue.typeaction)})
                //             if(_objectvalue.typeaction == 'script_sync') {
                //                 try {
                //                     eval(_objectvalue.script_str);
                //                 } catch (e) {
                //                     if (e instanceof SyntaxError) {
                //                         console.error("Error", e);
                //                         _default_action();
                //                     }
                //                 }
                //             } else {
                //                 _default_action();
                //             }
                //         } else {
                //             // Sync API
                //             _sync_api(_objectvalue)
                //         }
                //     } else {
                //         cLog(() => {console.log("FIRST TIME => FETCH API")})
                //         // Sync API
                //         _sync_api(_objectvalue);
                //     }
                // });

            break;
                
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
                // console.log(key, results[key]);
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
            console.log(1, "CDTX Here 1515", window.dataCase);
        })
        
        var _caseid = () => {
            if(document.querySelector('[debug-id="case-id"] span.case-id')) {
                return document.querySelector('[debug-id="case-id"] span.case-id').innerText;
            }
            return '';
        };

        if(_caseid() !== window.dataCase.case_id) {
            Toastify({
                text: 'Data case not ready!  One Minute ',
                duration: 3000,
                class: "warning",
                callback: function(){
                    this.remove();
                }
            }).showToast();
            return false;
        }
        
        
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
                body_content.style.maxWidth = '100%';
                // Insert value
                if(!window.hasClkReply && !_card_istop.querySelector(".finished-reply")) {
                    subject.value = template_title.innerText;
                }
                
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
            document.querySelector("material-fab.themeable.compose").addEventListener("click", () => {
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
            document.querySelector("material-fab.themeable.compose").click();
            
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

function sCaseId() {
    if(document.querySelector('[debug-id="case-id"] span.case-id')) {
        return document.querySelector('[debug-id="case-id"] span.case-id').innerText;
    }
    return '';
};
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
                        
                        
                        
                        subjectText = subjectText.replaceAll('{%case_id%}', '<span data-infocase="case_id">' + sCaseId() + '</span>')

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



function replaceKeyHTMLByCaseID(_elm, _key, _value, _data = {}) {
    // cLog(() => {console.log('cdtx review', _elm, _key, _value); });
    if(!_value) return false;
    if(!_elm) return false;


    var _date_key = [
        ("0" + new Date().getDate()).slice(-2), "/",
        ("0" + (new Date().getMonth() + 1)).slice(-2), "/",
        new Date().getFullYear(),
    ];


    var _date_key_v2 = [
        new Date().getHours()," giờ ",
        new Date().getMinutes()," phút ",
        (new Date().getHours() > 11 ? "chiều": "sáng"),
        ", ngày ",
        ("0" + new Date().getDate()).slice(-2), "/",
        ("0" + (new Date().getMonth() + 1)).slice(-2), "/",
        new Date().getFullYear(),
    ];



    var _date_key_japan = [
        new Date().getFullYear(),"/",
        ("0" + (new Date().getMonth() + 1)).slice(-2),"/",
        ("0" + new Date().getDate()).slice(-2),"/",
        " ",
        new Date().getHours(),":",
        new Date().getMinutes(),"",
        
    ];
    


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
    

    // setup time
    _elm.querySelectorAll('[data-infocase="local_format_meeting_time"]').forEach(function(elm){
        elm.innerText = _date_key.join('');
        if (result.mycountry == "Japan") { 
            elm.innerText = _date_key_japan.join('');
        }
    });
    
    // v2 
        _elm.querySelectorAll('[data-infocase="info_example_1stemail"]').forEach(function(elm){
            // var _date_strreplace = '%0:%1 <span data-highlight="need_recheck">%5</span>%2-%3-%4';
            var _date_strreplace = elm.getAttribute('data-templ') || '';
            var _date_key_v2 = [
                new Date().getHours(),
                new Date().getMinutes(),
                ("0" + new Date().getDate()).slice(-2),
                ("0" + (new Date().getMonth() + 1)).slice(-2),        new Date().getFullYear(),
                (new Date().getHours() > 11 ? "PM": "AM"),
            ];
            
            
            
            _date_key_v2.forEach((_ite, _index) => {
                _date_strreplace = _date_strreplace.replace('%' + _index, _ite);
            });
            
            elm.innerHTML = _date_strreplace;

        });
    
    
    // div, span
    _elm.querySelectorAll('[data-infocase="' + _key + '"]').forEach(function(elm){
        elm.innerText = _value;
        elm.setAttribute('data-infocase_value', _value);
    });
    
    // div, span
    _elm.querySelectorAll('[data-infocase_attr="' + _key + '"]').forEach(function(elm){
        elm.setAttribute('data-infocase_attr', _value);
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
                var url_http = url;
                if(!url_http.startsWith('http')) {
                    url_http = '//' + url_http;
                }
                _arr.push(`<a href="${url_http}" target="_blank">${url}</a>`);
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

        _elm.querySelectorAll('[data-infocase_link="customer_adsid_format"]').forEach(function(elm){
            elm.setAttribute("href", `https://adwords.corp.google.com/aw/go?external_cid=${_data.customer_adsid}`);
            if(_data.customer_ocid) {
                if(_data.customer_ocid.trim()) {
                    elm.setAttribute("href", `https://adwords.corp.google.com/aw/conversions?ocid=${_data.customer_ocid}`)
                } 
            }
            
        });
    }
    
    if(_key == 'customer_ocid') {    
        if(_data.customer_ocid) {
            if(_data.customer_ocid.trim()) {
                
                _elm.querySelectorAll('[data-infocase_link="customer_ocid"]').forEach(function(elm){
                    elm.innerHTML = _data.customer_ocid;
                    elm.setAttribute("href", `https://adwords.corp.google.com/aw/conversions?ocid=${_data.customer_ocid}`);
                });
            } 
        }
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
            
            replaceKeyHTMLByCaseID(_panel, key, _value_tmp, _data);
        }
    }
    
    // SETTING
    if(_panel) {
        _panel.querySelectorAll('[data-infosetting="your-name"]').forEach(function(elm){
            if(window.tagteamoption.optionkl__inputyourname) {
                elm.innerText = window.tagteamoption.optionkl__inputyourname;
                elm.dispatchEvent(new Event('blur'));
            }
        });
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
    
    
    // case id replace
    if(__case_id()) {
        _str = _str.replaceAll(`{%case_id%}`, __case_id());
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


function loadGoogleSheetOnlineWebPublics(_callback_ready) {
    // Convert table html => object
        function GoogleSheetOnline(_htmlelm, _callback) {
            function decodeHTMLEntities(text) {
                var textArea = document.createElement('textarea');
                textArea.innerHTML = text;
                return textArea.value;
            }
        
        
            function ConvertSheetTable2JsonObject(table) {
                // var table = document.querySelector('[id="1451083050"] table tbody');
                // table.querySelector('thead').remove()
                var header = [];
                var rows = [];
                var _innerHTML = '';
        
                for (var i = 0; i < table.rows[0].cells.length; i++) {
                    header.push(table.rows[0].cells[i].innerText);
                }
        
                for (var i = 1; i < table.rows.length; i++) {
                    var row = {};
        
                    // exclude column 0
                    for (var j = 1; j < table.rows[i].cells.length; j++) {
                        _innerText = table.rows[i].cells[j].innerText;
        
                        // get Result
                        row[header[j]] = _innerText;
                    }
                    rows.push(row);
                }
        
                return rows;
            }
        
            // Giao doan 1: chuyen doi Sheet table -> json
            var _sheetobj = {};
            var _objtemp = {};
            var _id, _text, _rsConvert;
        
            _htmlelm.querySelectorAll('#sheet-menu li').forEach((item) => {
                _objtemp = {};
                _objtemp.id = item.getAttribute('id').replace('sheet-button-', '');
                _objtemp.text = item.innerText;
                _objtemp.sheettab = ConvertSheetTable2JsonObject(_htmlelm.querySelector('[id="' + _objtemp.id + '"] table tbody'));
                
                _sheetobj[_objtemp.text] = _objtemp;
            });
        
            _callback(_sheetobj);
        
        
        }

    window.loadgooglesheetpublish = window.loadgooglesheetpublish || null;

    
    // If have any return now
        cLog(() => { console.log("cdtx - google LOADSHEET - storage", window.loadgooglesheetpublish, location.hostname); });
        if(window.loadgooglesheetpublish) {
            _callback_ready();
            return window.loadgooglesheetpublish;
        }

    // Check time
        getChromeStorage("cdtx_loadgooglesheetpublish_timesave", (response) => {
            var _rs = response.value || -1;
            var _time_save = _rs;
            var _time_current = new Date();
            var _minute = Math.abs(getDiffTime(_time_save, 'minute'));
            

            cLog(() => { console.log('cdtx - google checktime', response.value, _time_save, _minute); })
            if(_minute > 15 || _time_save < 0) {
                // https://docs.google.com/spreadsheets/u/2/d/e/2PACX-1vRMxOxerJ3zWV07uTOdTQCaa13ODbTfZVj5SB7-4Q6QlFhFTU8uXA-wsywXAUUqzHtOiGQdGgCYfRmk/pubhtml#
                fetch(window.dataTagteam.urlgooglesheet)
                .then((response) => response.text())
                .then((data) => {
                    var tempDiv = document.createElement('div');
                    tempDiv.innerHTML = data;
                    
                    GoogleSheetOnline(tempDiv, (_sheetobj) => {
                        
                        setChromeStorage("cdtx_loadgooglesheetpublish", _sheetobj, () => {
                            if(_sheetobj) {
                                window.loadgooglesheetpublish = _sheetobj;

                                cLog(() => { console.log("cdtx - google LOADSHEET -- FETCH--- DONE ", window.loadgooglesheetpublish); });
                                _callback_ready();
                            }
                            
                            setChromeStorage("cdtx_loadgooglesheetpublish_timesave", _time_current, () => {
                                cLog(() => { console.log("cdtx - google - loadgooglesheetpublish at " + _time_current); })
                            });
                        });
                    })
            
                });
            } 
        });

    // check storage
        getChromeStorage("cdtx_loadgooglesheetpublish", (response2) => {
            var _rs = response2.value || 0;
            
            if(_rs) {
                window.loadgooglesheetpublish = _rs;
                cLog(() => { console.log("cdtx - google LOADSHEET --- DONE 2 "); });
                _callback_ready();
            }
        });
}

// setGetQuickLink
function setGetQuickLink(_caseid, _type, _callback) {
    var _key = 'cdtx_tool_quicklink';
    cLog(() =>  { console.log('input', _type); });
    
    if(_type == 'remove') {
        _link = _callback;
        getChromeStorage(_key, (response) => {
            var data_notedlist = response.value || {};
            
            cLog(() => { console.log('cdtx update_tool_shortlink' , data_notedlist); })
            
            var _datalist = data_notedlist[_caseid];

            // replace
            _datalist = _datalist.replaceAll(_link, '');
            // slip
            _datalist_arr = _datalist.split("\n");
            // filter => remove line empty 
            _datalist_arr = _datalist_arr.filter(function(e){return e})
            // join
            data_notedlist[_caseid] = _datalist_arr.join("\n");

            // SAVE
            setChromeStorage(_key, data_notedlist, (response2) => {
                cLog(() => {
                    console.log("cdtx update_tool_shortlink", response2);
                });
            });
        })

        // Stop
        return false;
    }

    if(_type == 'get') {
        getChromeStorage(_key, (response) => {
            var data_notedlist = response.value || {};
            _callback(data_notedlist[_caseid]);
            return false;
        })
        
        // Stop
        return false;
    } else {
        getChromeStorage(_key, (response) => {
            var data_notedlist = response.value || {};
            
            cLog(() => { console.log('cdtx update_tool_shortlink' , data_notedlist); })

            
            // data_notedlist[_caseid] =  _type;
            data_notedlist[_caseid] = data_notedlist[_caseid] ? data_notedlist[_caseid] + "\n" + _type : _type;

            setChromeStorage(_key, data_notedlist, (response2) => {
                // var datars2 = response2.value || {};

                cLog(() => {
                    console.log("cdtx update_tool_shortlink", response2);
                });

                _callback(response2);
            });
        })
    }
   
}

// Add more short link 
function panelAddShortcutLink() {
    if(location.hostname !== 'cases.connect.corp.google.com') return;
    
    

    observeOnce((elm) => {
        var _istopelm = document.querySelector(`[data-area="btn-shortcutcase"]`);
        if(_istopelm) {
            var _el_tool_shortlink = () => {
                return document.querySelector("#tool_shortlink");
            };

            if (!_el_tool_shortlink()) {

                var tool_shortlink_html = _TrustScript(`<div class="tool_shortlink_row">
                        <div class="tool_shortlink_gr-row tool_shortlink_gr-list" ></div>
                    </div>
                    <span class="tool_shortlink_btn" data-btnsclick="add_shortlink" >+</span>
                    <div class="tool_shortlink_row">
                        <div class="tool_shortlink_gr-row tool_shortlink_gr-content" >
                            <span class="tool_shortlink_gr-url" data-tttip="Url" title="URL" contenteditable="plaintext-only"></span>
                            <span class="tool_shortlink_gr-text" data-tttip="Name" title="Name" contenteditable="plaintext-only"></span>
                            <span class="tool_shortlink_btn" data-btnsclick="save" >Save</span>
                            <span class="tool_shortlink_btn" data-btnsclick="close" >Close</span>
                        </div>
                    </div>`);
                
                const dom = document.createElement('div');
                dom.innerHTML = tool_shortlink_html;
                dom.id = 'tool_shortlink';
                dom.className = 'tool_shortlink _casecalendar_info-100per';
                dom.style.marginBottom = "20px";
                dom.setAttribute('data-title', 'Quicklink')
                _istopelm.replaceWith(dom);

                
                if(__case_id() && _el_tool_shortlink()) {
                    getToolShortlink(__case_id(), (data) => {

                        if(data) {
                            _el_tool_shortlink().querySelector('.tool_shortlink_gr-list').innerHTML = data;
                        } else {
                            _el_tool_shortlink().querySelector('.tool_shortlink_gr-list').innerHTML = '';
                        }
                    });
                    
                }

                
                onClickElm('.tool_shortlink [contenteditable]', 'keypress', function(elm, e){
                    if (e.which === 13) {
                        e.preventDefault();
                        _shortcutlink_actsave(elm, () => {
                            cLog(() => { console.log('cdtx Have save'); })
                        });
                    }
                });
                

            }
            
            
            
                    
            
            
        }
    });


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
                        cLog(() => { console.log('crSubjectByHotKeyEmail', _tempsubject, window.dataCase); })
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


function getValueByKeyInSheetname(key, sheetname, callback) {
    try {
        getGooglesheetPublish((result) => {
            var _systemlst = false;
            // console.log('getValueByKeyInSheetname', result);
            if(result[sheetname]) {
                if(_systemlst = result[sheetname].sheettab) {
                    var rs = '';
                    _systemlst.forEach((_item) => {
                        if(_item['Key'] == key) {
                            // console.log('xxxx', _item, _item['Value']);
                            rs = _item['Value'];
                            // document.querySelector('[data-formdata="form_option"]').innerHTML = _item['Value'];
                        }
                    });

                    callback(rs)
                    
                    return rs;
                }
            }
            return false;
        });
            
    } catch (error) {
        return false;        
    }
}

function updateMeetContentBySheet(_panel) {
    if(!_panel) return false;

    try {
        if(window.loadgooglesheetpublish) {
            if(window.loadgooglesheetpublish['email varabiles']['sheettab']) {
                window.loadgooglesheetpublish['email varabiles']['sheettab'].forEach((item) => {
                    if(item[window.keylanguage]) {
                        if(item['Attribute']) {
                            // console.log('GOOGLE SHEET', window.dataCase.customer_gmeet, item[window.keylanguage], window.keylanguage, item);        
                            if(window.dataCase.customer_gmeet){
                                if(_panel.querySelector(`[${item['Attribute']}]`)) {
                                    _panel.querySelectorAll(`[${item['Attribute']}]`).forEach(function(__elm){
                                        __elm.innerHTML = item[window.keylanguage];
                                    });
                                    replaceAllHtmlElement(_panel, window.dataCase);
                                }
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
            dom_editor.style.height = '100%';
            dom_editor.style.width = '100%';
            dom_editor.style.top = '0px';
            dom_editor.style.position = 'absolute';
            dom_editor.style.zIndex = '99999';
            
            // document.querySelector('read-deck .read-cards-wrapper').insertAdjacentHTML('beforeEnd', );
            document.querySelector('read-deck .read-cards-wrapper').insertAdjacentElement('beforeEnd', dom_editor);
            document.querySelector('read-deck .read-cards-wrapper').style.position = 'relative';

            var editor = ace.edit("editor_email");
            editor.setTheme("ace/theme/monokai");
            editor.session.setMode("ace/mode/html");
            editor.session.setUseWrapMode(false);

            

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

                if(_ebc) {
                    _ebc.innerHTML = editor.getValue();
                    replaceAllHtmlElement(_ebc, window.dataCase);
                    updateMeetContentBySheet(_ebc);

                    localStorage.setItem('_tempsaveaceeditor1', editor.getValue());
                }
            });
        }
        if(!document.querySelector('#editor_email.ace_editor')) {
            if(typeof ace === 'object') {
                _load();
            }
            
            var html_combie = '';
            loadFetchText("https://cdnjs.cloudflare.com/ajax/libs/ace/1.19.0/ace.min.js", (rs) => {
                html_combie += "\n " + rs;
                    loadFetchText("https://cdnjs.cloudflare.com/ajax/libs/ace/1.23.1/mode-html.js", (rs) => {
                        html_combie += "\n " + rs;
                        eval(html_combie);
                        
                        if(typeof ace === 'object') {
                            _load();
                        }    
                    });
            });
        } else {
            if(editor_email = document.querySelector('#editor_email')) {
                editor_email.remove();
            }
        }
    
    } catch (error) {
        console.error('cdtx toolEditorEmailTemplate4Dev', error)  
    }   
}



function clearAndPrepareCRTemplate() {

    // Prepare
    var _composeemailcard = document.querySelector('.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top[card-type="compose"]');
    if(_composeemailcard) {
        // cLog(()=>{console.log("CR -> Start", window.loadgooglesheetpublish['email - find_replace'].sheettab)});
        // cLog(()=>{console.log(window.result, window.keylanguage)});
        var _listsheet_find_replace = [];
        var _str_list_search = '';
        try {
            _listsheet_find_replace = window.loadgooglesheetpublish['email - find_replace'].sheettab;
            if(_listsheet_find_replace) {
                _listsheet_find_replace.forEach((item) => {
                    var _strreplace = item[window.keylanguage];
                    if(window.dataCase.case_id) {
                        for (const [_key, _value] of Object.entries(window.dataCase)) {
                            _strreplace = _strreplace.replaceAll(`{%${_key}%}`,`${_value}`)
                        }
                    } 
                    
                    
                    // Other replace 
                    _strreplace = _strreplace.replaceAll(`{%case_id%}`,`${sCaseId()}`)
                    
                    _str_list_search += item['Find'] + "|||" + _strreplace + "\n";
                })
            }   
        } catch (error) {
            cLog(()=>{console.error("_listsheet_find_replace", error)});
        }


        cLog(() => {console.log('HHH', window.dataCase, _str_list_search )})



        var _email_body_content = _composeemailcard.querySelector('#email-body-content');
        // _email_body_content.style.padding = '0px';
        _email_body_content.style.maxWidth = '100%';

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
                        var _getvalue = searchAndReturnValue(_str_list_search, _heading, 1);
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
                        
                        var _getvalue = searchAndReturnValue(_str_list_search, _heading, 1);
                        if(_getvalue) {
                            item.innerText = _getvalue;
                        }
                    })
                }
                
                // replace heading search td table and replace heading
                var _tdcellist = _email_body_content_top_content.querySelectorAll(".field");
                if(_tdcellist.length) {
                    _tdcellist.forEach((item) => {
                        var _heading = item.innerText.trim();
                        
                        var _getvalue = searchAndReturnValue(_str_list_search, _heading, 1);
                        if(_getvalue) {
                            item.innerText = _getvalue;
                        }
                    })
                }

                // remove text
                // var _tr = _email_body_content_top_content.querySelectorAll("tr");
                // if(_tr.length) {
                //     _tr.forEach((item) => {
                //         var _text = item.innerText.trim();
                //         vi_searchandremove.forEach((item2) => {
                //             if(_text == item2) {
                //                 item.remove();
                //             }
                //         })
                //     })
                // }
                
                document.querySelectorAll('.is-top #email-body-content-top-content table[width="348"]').forEach((elm) => {
                    if(elm.innerText.toLocaleLowerCase().includes("thay mặt cho google")){
                        elm.style.padding = "0 30px"
                    }
                })


                // Update action
                _email_body_content_top_content.dispatchEvent(new Event('input'));
                _email_body_content_top_content.dispatchEvent(new Event('focus'));
                _email_body_content_top_content.dispatchEvent(new Event('blur'));
                _email_body_content_top_content.dispatchEvent(new Event('click'));
                _email_body_content_top_content.click();
                
                reSaveComposerContentAction();
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
            // cLog(() => { console.log('xxx', window.loadgooglesheetpublish) });;
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
        cLog(() => {
            console.error('getVariableSheetByKeyAndLanguage', _columnname, _keylanguage, error)
        });
        
        return false;
    }

    return false;
}

function getSystemsSheetByKeyAndLanguage(_columnname, _keylanguage) {
    try {
        if(window.loadgooglesheetpublish) {
            var _rs = window.loadgooglesheetpublish;
            var _targetarr = _rs['Variable'].sheettab;
            // cLog(() => { console.log('xxx', window.loadgooglesheetpublish) });;
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
        cLog(() => {
            console.error('getVariableSheetByKeyAndLanguage', _columnname, _keylanguage, error)
        });
        
        return false;
    }

    return false;
}

// getSheetByTabName('Status Note Hotkey');
function getSheetByTabName(tabname) {
    try {
        if(window.loadgooglesheetpublish) {
            var _rs = window.loadgooglesheetpublish;
            var _arr = _rs[tabname].sheettab;
            // cLog(() => { console.log('xxx', _targetarr) });
            return _arr;
            // for (let index = 0; index < _targetarr.length; index++) {
            //     const _item = _targetarr[index];
                
            //     if(_item['key'].includes(_keylanguage)) {
            //         // cLog(() => { console.log('xxx',_item[_columnname]) });;
            //         // Load
            //         return _item[_columnname];
            //         break;
            //     }
                
            // }
        }
            
    } catch (error) {
        cLog(() => {
            console.error('getSheetByTabName', error)
        });
        
        return false;
    }

    return false;
}


    
    
// getAdsID
// lấy adsID
function getAdsID(_string) {
    try {
        var _regex = /[0-9a-z]{3}[-][0-9a-z]{3}[-][0-9a-z]{4}/g;
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
    var kim_realtime = document.querySelector(`[data-principal-ids][data-column-index] > div[style*="top"]`);
    if(!kim_realtime) return false;
    

    // Isset button appointment @group.calendar.google.com
    // var btn_appointment = document.querySelectorAll(`[role="gridcell"] [jslog*="@group.calendar.google.com"]`);
    // var btn_tasks = document.querySelectorAll(`[role="gridcell"] [data-eventid^="tasks_"]`);
    
    // cLog(() => { console.log('wcout', btn_appointment.length, btn_tasks.length) })
    
    // if(btn_appointment.length === 0) return false;
    

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
                _contentsub_tasks += `<p><a href="https://appointments.connect.corp.google.com/appointmentDetails?caseId=${item.caseid}" target="_blank"  >${item.caseid}</a>: <span class="hour">${toHoursAndMinutes(item.timeleft)}</span> left</p>`
            });

            _contentsub = `
            <span class="panel_info-casesoverview">
                <span>${_data.length}</span> case</span>
                ${_data_task.length > 0 ? `<span class="panel_info-casesoverview panel_info-tasksoverview" style="left: 59%; z-index: -1; transform: translateX(-50%) scale(.8)"><span>${_data_task.length}</span> tasks</span>` : ''}
                
                <div class="panel_info-inner" >
                    ${_contentsub_item}
                </div>
                <hr>
                <p class="panel_info-qplus">
                    <span data-btnclk="qplus-rescan" data-qplus_status="Q+"></span>
                </p>      
                
                <div class="panel_info-listbtn">
                </div>      
                
                `;
                

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
            var _caseurl = 'https://appointments.connect.corp.google.com/appointmentDetails?caseId=' + _caseid
            window.open(_caseurl);
        };
    }

    function calendarGetInfoRealtime() {
        var _cols = document.querySelectorAll('[role="presentation"] [role="row"] [data-principal-ids]');

        for (let i1 = 0; i1 < _cols.length; i1++) {
            const element = _cols[i1];
            // console.log('calendarGetInfoRealtime', element)
            // Nếu trong cột ngày có tồn tại kim thời gian thực => cột của ngày hiện tại
            if(element.querySelector('[data-principal-ids][data-column-index] > div[style*="top"]')) {
                var _col = element;
                var _pos_events = _col.querySelectorAll("[data-eventid]"); 
                
                var _data = [];
                var _data_task = [];
                for (var index = 0; index < _pos_events.length; index++) {
                    var _elm = _pos_events[index];
                    
                    // Lấy case ID trong title
                    var _get_title = _elm; // get this //_elm.querySelector('.I0UMhf');
                    var _get_caseid = '';
                    if(_get_title) {
                        _get_caseid = getOnlyCaseId(_get_title.innerText);
                    
                    }
                
                    // Lấy vị trí thanh realtime point
                    var _pos_realtime_elm = _col.querySelector('[data-principal-ids][data-column-index] > div[style*="top"]');
                    var _pos_realtime_elm_time = 0;
                    if(_pos_realtime_elm) {
                        _pos_realtime_elm_time = convertPostion(_pos_realtime_elm, _col);
                    }
                
                    
                    
                    // 1. Nếu tồn tại Case ID
                    if(_get_caseid) {
                        var _timecasecurrent = convertPostion(_elm, _col);

                        // console.log('calendarGetInfoRealtime 2', _get_caseid, _timecasecurrent);
                        
                        // // 1. Nếu tồn tại Google Meet ID  --- 27/10 Google have remove
                        // var _jslog = _elm.getAttribute('jslog'); --- 27/10 Google have remove
                        // if(getMeetID(_jslog)) { --- 27/10 Google have remove
                        // 2. nếu chứa từ khóa "Calendar: Connect Appointments"
                        if(_elm.querySelector('.ynRLnc').innerText.includes('Calendar: Connect Appointments')) {
                            if(IS_DEBUG) {
                                console.log(convertPostion2Time(_pos_realtime_elm_time), convertPostion2Time(_timecasecurrent), _pos_realtime_elm_time, _timecasecurrent, _get_caseid);    
                            }
                            if(_timecasecurrent - _pos_realtime_elm_time > 0) {
                                var _minute_timeleft = convertPostion2Minute(_timecasecurrent - _pos_realtime_elm_time);
                                if(IS_DEBUG) { console.log("calendarGetInfoRealtime time minute left: ", _minute_timeleft); }
                                
                                var _temp_info = {
                                    'timeleft': _minute_timeleft,
                                    'caseid': _get_caseid,
                                };
                                _data.push(_temp_info);
                                if(_minute_timeleft < 6) {
                                    // debugger;
                                    if(localStorage.getItem('__calendar_caseidopen') !== _get_caseid) {
                                        // Once
                                        localStorage.setItem('__calendar_caseidopen', _get_caseid) ;


                                        // ACTION
                                        notificationCaseChrome(_get_caseid, _minute_timeleft);

                                        window.open('https://appointments.connect.corp.google.com/appointmentDetails?caseId='+ _get_caseid,
                                            'window',
                                            'fullscreen'
                                        );
                                    }
                                }
                                
                            }
                        }
                        
                        // 1.2 Get task
                        // console.log('data-eventid', _elm.getAttribute('data-eventid'), _elm.getAttribute('data-eventid').includes('tasks_'));
                        if(_elm.getAttribute('data-eventid').includes('tasks_')) {
                            if(_elm.innerText.includes('task: ')) {
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
            
            
            if(!element.querySelector('[data-principal-ids][data-column-index] > div[style*="top"]')) {
                if(panel_info = document.querySelector('.panel_info')) {
                    var _elmpause = panel_info.querySelector('.pause');
                    if(_elmpause) _elmpause.remove();
                    
                    panel_info.insertAdjacentHTML('beforeEnd', _TrustScript('<span class="pause" style="color: red">Pause - not found today (auto refresh 1 min)</span>'));    
                }
                
            }
            
        }
    }

    function getInfoQPlus() {
        if(typeof getQlusDetailListCase === 'function') {
            getQlusDetailListCase(() => {
                window.qlus_datalist = window.qlus_datalist || {};
                cLog(() => { console.log('cdtx window.qlus_datalist', window.qlus_datalist); });
                var _lst_arr_followup = [];
                
                var _date_key = [
                    ("0" + new Date().getDate()).slice(-2),
                    ("0" + (new Date().getMonth() + 1)).slice(-2),
                    new Date().getFullYear(),
                ];



                var _convertmmddyyyy2Date = (_str) => {
                    // var _str = '01/06/2023';
                    var _arr_str = _str.split('/');
                    _arr_str.reverse();
    
                    return new Date(_arr_str.join('/'));
                }
            
                var _get_diffday = (str_date) => {
                    const date1 = _convertmmddyyyy2Date(str_date);
                    const date2 = new Date();
                    const diffTime = Math.abs(date2 - date1);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                    var _str = 0;
                    
                    if(diffDays > 0) {
                        _str = diffDays;
                        if(date2 > date1) {
                            _str = '-' + diffDays;
                        }
                    }
                    return parseInt(_str);
                }
                
                
                var _ntoday = 0;
                for (const [key, value] of Object.entries(window.qlus_datalist.list_bycaseid)) {
                    if(!value[0].followUpCase) continue;
                    _lst_arr_followup.push(value[0]);
 
                    // console.log(_get_diffday(_date_key.join('/')));
                    if(_get_diffday(value[0].followUpCase) < 0 ) {
                        _ntoday++;
                    }
                }

                if(_lst_arr_followup.length > 0) {
                    if(qlust_status = document.querySelector('[data-qplus_status]')) {
                        qlust_status.innerHTML = `${_ntoday} / ${_lst_arr_followup.length} cases - FL today`;
                    }
                }

            });
        }
    }

    // Run Once
    
    var _oncerun = 0;
    var _run = () => {
        if(_oncerun > 0) return false;
        _oncerun++;

        calendarGetInfoRealtime();
        getInfoQPlus();
        setInterval(() => {
            getInfoQPlus();
            calendarGetInfoRealtime();
        }, 1000 * 40)
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

function initQplusLoad() {
    if(location.hostname !== 'gauge.corp.google.com') return;
    window.qlus_lststorage_badurl = window.qlus_lststorage_badurl || [];
    var qplus_version = '1.2.1.20230603';
    // 1.2.1.20230605 : display UI
    // 1.1.1.20230603 : complete crawl all case qplus
    
    try {
    
        
        
    // _TrustScript
        function _TrustScript(_string) {
            const staticHtmlPolicyv2 = trustedTypes.createPolicy('foo-static', { createHTML: () => _string });
            return staticHtmlPolicyv2.createHTML('');
        }
    
        // them vao list localStorage
        var _updateQplusCaseIDTimeReview = function(strKey) {
            strKey = strKey.toString();
            var _lstitem = localStorage.getItem('dr_itemslst') || false;
            var _lstarr = _lstitem ? _lstitem.split("//") : [];
            if(!_lstarr.includes(strKey)) {
                _lstarr.push(strKey);
            
                var _rs = _lstarr.join("//");
                localStorage.setItem("dr_itemslst", _rs);
            }
        }
    
        function setStorage(_key, datainput){
            if(typeof datainput === 'object') {
                datainput = JSON.stringify(datainput);
            }
            
            // localStorage.setItem('qplus_lst_outsitelink', datainput)
            localStorage.setItem(_key, datainput)
        }
    
    
        function getStorage(_key){        
            var rs = localStorage.getItem(_key);
            try {
                return JSON.parse(rs);
            } catch (error) {
                return rs;
            }
        }

        
        function uiOverview(){        
            var _html = `
                <div class="uiqplus_inner">
                    <div class="uiqplus_row uiqplus_process">
                        <span class="uiqplus_process--rescan" data-btnclk="qplus-rescan" >Rescan</span>
                        <div class="uiqplus_process--bar" data-barinfo="0/0"></div>
                    </div>
                    <div class="uiqplus_row">
                        <div class="uiqplus_panel--tabpanel">
                            <div class="uiqplus_panel--tab">
                            <span class="uiqplus_panel--tab-refreshdata">Refresh</span> - <span class="uiqplus_panel--tab-time"></span>
                            <div class="uiqplus_panel--tabinner">
                                <div class="uiqplus_panel--item" data-pntabitem="last_submit" data-pntablabel="Last submit" ></div>
                                <div class="uiqplus_panel--item" data-pntabitem="follow_up" data-pntablabel="Follow up" ></div>
                                <div class="uiqplus_panel--item" data-pntabitem="case" data-pntablabel="Case" ></div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>`;

            var uiqplus_elm = document.createElement("div");
            uiqplus_elm.id = "uiqplus";
            uiqplus_elm.className = "uiqplus";
            uiqplus_elm.innerHTML = _html;


            var _list_tab = '';
            uiqplus_elm.querySelectorAll('.uiqplus_panel--item').forEach(item => {
                _list_tab += `<span data-pntabitem_act="${item.getAttribute('data-pntabitem')}" >${item.getAttribute('data-pntablabel')}</span>`;
            });

            var _list_tab = `<div class="uiqplus_panel--tab_btnact">${_list_tab}</div>`;

            uiqplus_elm.querySelector('.uiqplus_panel--tab').insertAdjacentHTML('beforeBegin', _list_tab);


            onClickElm('[data-pntabitem_act]', 'click', function(elm, e){
                var _this = e.target;
                _this_action = _this.getAttribute('data-pntabitem_act');
                
                
                uiqplus_elm.querySelectorAll('[data-pntabitem]').forEach(elm => { elm.classList.remove('active')})
                uiqplus_elm.querySelector(`[data-pntabitem="${_this_action}"]`).classList.add('active');
                
                uiqplus_elm.querySelectorAll('[data-pntabitem_act]').forEach(elm => { elm.classList.remove('active')})
                _this.classList.add('active');
            });


            var _convertmmddyyyy2Date = (_str) => {
                // var _str = '01/06/2023';
                var _arr_str = _str.split('/');
                _arr_str.reverse();

                return new Date(_arr_str.join('/'));
            }

            var _get_diffday = (str_date) => {
                const date1 = _convertmmddyyyy2Date(str_date);
                const date2 = new Date();
                const diffTime = Math.abs(date2 - date1);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                var _str = 'today';
                if(diffDays > 0) {
                    _str = diffDays + " days";
                    if(date2 > date1) {
                        _str = '-' + diffDays + " days";
                    }
                }
                return _str;
            }

            // get Data
            
            
            wait4Elem('[data-pntabitem_act="follow_up"]').then((elm) => {
                elm.click();
            });

            var _reupdate = () => {
                getQlusDetailListCase(() => {
                    window.qlus_datalist = window.qlus_datalist || {};
                    cLog(() => { console.log('cdtx window.qlus_datalist', window.qlus_datalist); });
    
                    //  for Last submit
                        var _lst_case_haveqplus = [];
                        var _lst_case_qplus_new = [];
                        var _temp = (_value) => {
                            return `<tr>
                                <td><a href="${_value.linkEvaluationDetails}" target="_blank">${_value.caseID}</a> q+</td>
                                <td>${_value.statusCase}</td>
                                <td>${_value.dateReview}</td>
                                <td>${_value.followUpCase + `${_value.followUpCase ? ` (${_get_diffday(_value.followUpCase)})` : "" }`}</td>
                                <td class="uiqplus_inner-action" >
                                    <span data-btnclk="ui-qplus-addtrviewdetail" data-caseidhere="${_value.caseID}" >View</span>
                                    <span data-btnclk="ui-qplus-addtrdelete" data-caseidhere="${_value.caseID}" >Delete</span>
                                </td>
                            </tr>`;
                        }
                        var _tr = ``;
                        for (const [key, value] of Object.entries(window.qlus_datalist.list_bycaseid)) {
                            _lst_case_haveqplus.push(value[0].caseID);
                            _lst_case_qplus_new.push(value[0]);
                            _tr += _temp(value[0])
                        }
                        
                        var _lst_table = `<table class="uiqplus_table">
                                <thead>
                                    <tr>
                                        <th>Case ID</th>
                                        <th>Status</th>
                                        <th>Submit</th>
                                        <th>FL</th>
                                        <th class="uiqplus-act"><span data-btnclk="ui-qplus-addtrviewall" >View all</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                ${_tr}
                                </tbody>
                        </table>`;
                        uiqplus_elm.querySelector(`[data-pntabitem="last_submit"]`).innerHTML = _lst_table;
                    
                    //  for Follow up
                        var _lst_arr_followup = [];
                        for (const [key, value] of Object.entries(window.qlus_datalist.list_bycaseid)) {
                            if(!value[0].followUpCase) continue;
                            _lst_arr_followup.push(value[0]);
                        }
    
                        _lst_arr_followup.sort((a,b) => {
                            var _a_time_date = _convertmmddyyyy2Date(a.followUpCase);
                            var _b_time_date = _convertmmddyyyy2Date(b.followUpCase);
                            if(_a_time_date && _b_time_date) {
                                if ( _a_time_date < _b_time_date ){
                                    return -1;
                                }
                            }
                            return 0;
                        })
    
                        var _tr = ``;
                        
                        cLog(() => { console.log('CHECK', _lst_case_qplus_new, _lst_arr_followup) });
                        for (const value of _lst_arr_followup) {
                            _tr += _temp(value);
                        }
                        
                        var _lst_table = `<table class="uiqplus_table">
                                <thead>
                                    <tr>
                                        <th>Case ID</th>
                                        <th>Status</th>
                                        <th>Submit</th>
                                        <th>FL</th>
                                        <th class="uiqplus-act"><span data-btnclk="ui-qplus-addtrviewall" >View all</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                ${_tr}
                                </tbody>
                        </table>`;
                        uiqplus_elm.querySelector(`[data-pntabitem="follow_up"]`).innerHTML = _lst_table;

                        
                    //  for Case
                        var _tr = ``;
                        loadAllCaseID((listcase) => {
                            // console.log('HERE', listcase);
                            // cLog(() => { console.log('CHECK', _lst_arr_followup) });
                            
                            var _lst_arr_followup = [];
                            for (const value of listcase) {
                                // if(!value.status_case) continue;
                                _lst_arr_followup.push(value);
                            }

                            _lst_arr_followup.sort((a,b) => {
                                if(
                                    _lst_case_haveqplus.includes(a.case_id)
                                ) {
                                    return -1;
                                }
                                return 0;
                            });

                            
                            for (const value of _lst_arr_followup) {

                                _tr += `<tr>
                                            <td style="white-space: nowrap">${value.case_id}</td>
                                            <td>${getDomainOnlyURL(value.customer_website)}</td>
                                            <td>${value.customer_adsid}</td>
                                            <td>${value.status_case}</td>
                                            <td>
                                            <span data-btnclk="ui-qplus-addtrviewdetail" data-caseidhere="${value.case_id}" >View</span>
                                            <span data-btnclk="ui-qplus-addtrdelete" data-caseidhere="${value.case_id}" >Delete</span>
                                            </td>
                                            
                                        </tr>`;
                            }                            
                        
                            var _lst_table = `<table class="uiqplus_table">
                                <thead>
                                    <tr>
                                        <th>Case ID</th>
                                        <th>Website</th>
                                        <th>Ads ID</th>
                                        <th>Status</th>
                                        <th class="uiqplus-act"><span data-btnclk="ui-qplus-addtrviewall" >View all</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                ${_tr}
                                </tbody>
                            </table>`;
                            uiqplus_elm.querySelector(`[data-pntabitem="case"]`).innerHTML = _lst_table;
                        });
                        // var _lst_arr_followup = [];
                        // for (const [key, value] of Object.entries(window.qlus_datalist.list_bycaseid)) {
                        //     if(!value[0].followUpCase) continue;
                        //     _lst_arr_followup.push(value[0]);
                        // }

                        // _lst_arr_followup.sort((a,b) => {
                        //     var _a_time_date = _convertmmddyyyy2Date(a.followUpCase);
                        //     var _b_time_date = _convertmmddyyyy2Date(b.followUpCase);
                        //     if(_a_time_date && _b_time_date) {
                        //         if ( _a_time_date < _b_time_date ){
                        //             return -1;
                        //         }
                        //     }
                        //     return 0;
                        // })

                        // var _tr = ``;
                        
                        // cLog(() => { console.log('CHECK', _lst_arr_followup) });
                        // for (const value of _lst_arr_followup) {
                        //     _tr += _temp(value);
                        // }
                        


                        
                    uiqplus_elm.querySelector(`.uiqplus_panel--tab-time`).innerHTML = new Date();


                    
                });
            }

            _reupdate();
            
            uiqplus_elm.querySelector('.uiqplus_panel--tab-refreshdata').addEventListener('click', () => {
                _reupdate();
            })
            // body append
            document.body.insertAdjacentElement("afterEnd", uiqplus_elm);

        }

        var uiOverviewElem = () => {
            return document.querySelector('.uiqplus');
        }
    
        // them vao list localStorage
        function qplusActionByParam() {
            let params = new URLSearchParams(location.search);
            let updateParam = (callback) => {
                var url = new URL(location.href);
                // url.searchParams.set('x', 42);
                // url.searchParams.delete('x');
                callback(url);
                history.replaceState(null, '', url)
            }
    
            
            var removeData = params.get('removeData'); 
            if(removeData) {
                // Remove param
                updateParam((url) => {
                    url.searchParams.delete('removeData');
                })
                
                removeChromeStorage('cdtx_qlus_detail_list_case', () => {
                    Toastify({
                        text: `Clear ${'cdtx_qlus_detail_list_case'} success!!!`,
                        duration: 3000,
                        callback: function(){
                            this.remove();
                        }
                    }).showToast();
                });

            }



            var apiconnect = params.get('apiconnect'); 
            if(apiconnect) {
                // Remove param
                updateParam((url) => {
                    url.searchParams.delete('apiconnect');
                })

                document.title = 'Scanning ...';


                
                uiOverview();


                var _animation = () => {
                    const card = document.querySelector(".uiqplus_inner");
                    card.classList.add('uiqplus_inner_animation');
                    const motionMatchMedia = window.matchMedia("(prefers-reduced-motion)");
                    const THRESHOLD = 14;
                    
                    /*
                     * Read the blog post here:
                     * https://letsbuildui.dev/articles/a-3d-hover-effect-using-css-transforms
                     */
                    function handleHover(e) {
                      const { clientX, clientY, currentTarget } = e;
                      const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget;
                    
                      const horizontal = (clientX - offsetLeft) / clientWidth;
                      const vertical = (clientY - offsetTop) / clientHeight;
                      const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
                      const rotateY = (vertical * THRESHOLD - THRESHOLD / 2).toFixed(2);
                    
                      card.style.transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`;
                    }
                    
                    function resetStyles(e) {
                      card.style.transform = `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
                    }
                    
                    if (!motionMatchMedia.matches) {
                      card.addEventListener("mousemove", handleHover);
                      card.addEventListener("mouseleave", resetStyles);
                    }

                }
                
                if(localStorage.getItem('uiqplus_inner_animation')) {
                    _animation();
                }

                // crawl by iframe
                var _crawbyframe_storage = () => {
                    // Load from cache
                    var _lst_list_scan = getStorage('qlus_lststorage');
                    if(_lst_list_scan) {
                        var _qlus_lststorage_time = getStorage('qlus_lststorage_time');
                        // Ex:
                        // var diff = Math.abs(new Date().getTime() - new Date('Fri May 19 2023 01:03:02 GMT+0800 (Malaysia Time)').getTime()) / 3600000;
                        if(_qlus_lststorage_time) {
                            var diff = Math.abs(new Date().getTime() - new Date(_qlus_lststorage_time).getTime()) / 3600000;
                            
                            // < 6 hour scan => get storage
                            if(diff < 5) {
                                cLog(() => { console.log("QPlus - 2 - crawl by frame"); });

                                cLog(() => { console.log('Qplus from Cache') });
                                crawl_eachlink(_lst_list_scan, 0);
                                return true;
                            }
                        }
                    }
                };
                
                // debugger;
                // get link workflow
                var dqAction = function(n_time) {
                    document.querySelectorAll('[data-workflow-index][jsaction]').forEach((elm) => {
                        if (elm.innerText.includes('Technical Solutions Case Update')) {
                            elm.click();
                            var _parent = elm.parentElement;
                
                            var _oneTime = setInterval(() => {
                                if (_parent.querySelectorAll('[data-isadmin]').length > 0) {
                                    n_time = 4;
                                    clearInterval(_oneTime);
                                    
                                    // Start
                                    getChromeStorage("cdtx_qlus_detail_list_case", (response) => {
                                        window.qlus_detail_list_case = window.qlus_detail_list_case || [];
                                        if(rsvlue = response.value) {
                                            window.qlus_detail_list_case = rsvlue;
                                        }

                                        initStart(_crawbyframe_storage);                            
                                    })
                                }
                            }, 500);
                        }
                    }); 
    
                    if(!(n_time < 4)) {
                        return false;
                    }
    
                    setTimeout(() => {
                        n_time = n_time + 1;
                        if(n_time < 4) {
                            dqAction(n_time);
                        }
                            
                    }, 2000);
                }
                dqAction(0);
                
                
                
                return false;
            }
    
    
            // URL ?qlusact_click_flow=1
            var isclickopen = params.get('qlusact_click_flow'); 
            if(isclickopen) {
                
            }
        }
    
        // Libs
        var issetByKeyOnce = function(keyonce) {
            window.qlus_detail_list_case = window.qlus_detail_list_case || [];
            for (let index = 0; index < window.qlus_detail_list_case.length; index++) {
                const item = window.qlus_detail_list_case[index];
                if(item.keyonce === keyonce) {
                    return true;
                    break;
                }
            }
            return false;
        }
    
        // Libs
        var _loadurlqplus = function (url_file, _index, elm_query, _callback) {
            var frameID = '_detail_' + _index;
            var _str_iframe = '<iframe src="' + url_file + '" id="' + frameID + '" style="opacity: 0; width: 1600px; height: 768px; transform: scale(.3); position: absolute; left: 0; top: 0; opacity: 1; pointer-events: none;"></iframe>';
            _str_iframe = _TrustScript(_str_iframe);
            document.body.insertAdjacentHTML("beforeEnd", _str_iframe);
    
    
            var _temp_memory = sessionStorage || localStorage;
            var _number = 0;
            var _date_key = [
                new Date().getFullYear(),
                ("0" + new Date().getMonth()).slice(-2),
                ("0" + new Date().getDate()).slice(-2),
                ("0" + new Date().getHours()).slice(-2),
                ("0" + new Date().getMinutes()).slice(-2),
            ];
    
            // Frame
            const iframe = document.getElementById(frameID);
            const handleLoad = () => {
                var nTime = 0;
                var myTime = setInterval(function () {
                    var frameObj = document.getElementById(frameID);
                    if (frameObj) {
                        var frameContent = frameObj.contentWindow.document.documentElement.outerHTML || frameObj.contentWindow.document.body.innerHTML;
                        var frameContentObj = frameObj.contentWindow.document.documentElement || frameObj.contentWindow.document.body;
    
                        var _elms_id_sumary = frameContentObj.querySelectorAll(elm_query);
    
                        var _isfinish = false;
                        if (_elms_id_sumary.length) {
                            _isfinish = true;
                        }
    
    
                        if (_isfinish) {
                            cLog(() => { console.log("finish frame id: " + frameID) });
    
                            _number = _elms_id_sumary.length;
    
    
                            // 1 Stop
                            clearInterval(myTime);
                            frameObj.remove();
    
                            // 2 Load callback
                            if (parseInt(_number) > 0) {
                                // LOAD UI
                                cLog(() => { console.log("callback") });
    
                                _callback(frameContentObj)
                            }
                        }
                    }
    
    
                    // 10s
                    if (nTime > 10) {
                        cLog(() => { console.log("qplus stop 10s"); });
                        clearInterval(myTime);
                        frameObj.remove();

                        // === NEXT
                        _callback('NEXT LINK');

                        // // === STOPALLL
                        // clearInterval(myTime);
                        // window.qlus_lststorage_badurl[url_file] = 1;
                        // setStorage('qlus_lststorage_badurl', window.qlus_lststorage_badurl);
                        // setStorage('qlus_lststorage_badurl_time', new Date());

                    }
                    nTime++;
                }, 2000);
    
    
            };
    
            iframe.addEventListener('load', handleLoad, true);
    
        }
    
    
        var TaskOwner = (_step, dom_body = document, callback) => {
    
    
            if(_step === 'qpluslst-getlst') {
    
                // Step 2: 
                var _list_case = [];
        
                var dom_body = dom_body;
                dom_body.querySelectorAll(`[jsaction="click: qOOoce"]`).forEach((elm3) => {
                // frameContentObj.querySelectorAll(`[jsaction="click: qOOoce"]`).forEach((elm3) => {
                    if (elm3.innerText.includes('View Evaluation Details')) {
        
        
                        var _parentElm = elm3.parentElement;
                        var _dateReviewElm = _parentElm.querySelector('.mh4JWc'),
                            _dateReview_string = '',
                            _elmTask = {
                                caseID: '',
                                caseIDInner: '',
                                dateReview: '',
                                linkEvaluationDetails: '',
                                statusCase: '',
                                followUpCase: '',
                            };
        
                        // CaseID
                        _elmTask.caseID = _parentElm.querySelector('.YIWTkd').innerText;
        
        
                        // Link detail
                        _elmTask.linkEvaluationDetails = 'https://gauge.corp.google.com' + _parentElm.querySelector('.XaulGe .FkE4Ef').getAttribute('href');
        
                        var _regex = /[0-9]{1}[-][0-9]{13}/g;
                        _string = _regex.exec(_elmTask.caseID);
                        if (_string[0]) {
                            _elmTask.caseID = _string[0];
        
                            // Review case Time
                            if (_dateReviewElm) {
                                _dateReview_string = _dateReviewElm.innerText.replace("Reviewed at", "");
                                _elmTask.dateReview = _dateReview_string;
                            } 
        
                            
                            // Push
                            _list_case.push(_elmTask);
                        }
                    }
                });
        
                window.qlus_list_case = _list_case;
                
                TaskOwner('qpluslst-getdetail', dom_body, callback)
            }
        
        
        
            // Tiến tới trang chi tiết
            if(_step === 'qpluslst-getdetail') {
                // Step 3
                // Loop get detail
                var _ncout = 0;
                var _n_step_done = 1;
                var _list_case = window.qlus_list_case;
                window.qlus_detail_list_case = window.qlus_detail_list_case || [];
                
        
                var _tempLstCase = {};
                var _tempLstCaseArr = [];
                var dquiLoadCase = (_index) => {
                    var item = _list_case[_index];
                    var keyonce = item.caseID + item.dateReview;

                    // If isset then NEXT LINK
                    if(issetByKeyOnce(keyonce)) {
                        cLog(() => { console.log('Qplus issetByKeyOnce'); });
                        _index++;
                        if(_index < _list_case.length) {
                            dquiLoadCase(_index);
                        } else {
                            callback();
                            return false;
                        }

                        return false;
                    }

                    _loadurlqplus(item.linkEvaluationDetails, _index, '.uzMjAe', (frameContentObj) => {
                        cLog(() => { console.log("Qplus", _n_step_done + "/" + _list_case.length, _list_case[_index]);  });
                        _n_step_done++;
        
                        // frameContentObj is NULL have text = NEXT LINK
                        if(frameContentObj == 'NEXT LINK') {
                            _index++;
                            dquiLoadCase(_index);
                            return false;
                        }

                        // Case ID
                        if(frameContentObj.querySelector('[href*="/#/case/"]')) {
                            _list_case[_index].caseIDInner = frameContentObj.querySelector('[href*="/#/case/"]').innerText;
                        }
        
                        frameContentObj.querySelectorAll('.uzMjAe').forEach((_elminframe) => {
                            
                            // // Sub-Status
                            if (_elminframe.innerText.includes('Sub-Status')) {
                                cLog(() => { console.log("Sub-Status", _elminframe.querySelector('.FEZIwd').innerText); });
                                if(!_elminframe.querySelector('.FEZIwd').innerText.includes('Question not encountered by')) {
                                    _list_case[_index].statusCase = _elminframe.querySelector('.FEZIwd').innerText;    
                                }
                            }
        
                            // // Follow up date
                            if (_elminframe.innerText.includes('Follow up date')) {
                                var _dateformat = _elminframe.querySelector('.FEZIwd').innerText;
        
                                if (/^\d\d\/\d\d\/\d\d\d\d$/.test(_dateformat)) {
        
                                    _list_case[_index].followUpCase = _dateformat;
        
                                }
                            }
        
                        });
        
        
                        if(issetByKeyOnce(keyonce) === false) {
                            cLog(() => { console.log('QPlus window.qlus_detail_list_case', window.qlus_detail_list_case); });
                            window.qlus_detail_list_case.push({
                                'keyonce': keyonce,
                                'item': item
                            });        
                        }
                        
                        _index++;
        
                        // Stop by manual
                        // if(_index > 2) {
                        //     callback()
                        //     return false;
                        // }
        
        
                        if(_index < _list_case.length) {
                            dquiLoadCase(_index);
                        } else {
                            callback();
                            return false;
                        }
        
                    });
        
        
                }
                
                dquiLoadCase(0);
            }
        
        }
    
    
        var crawl_eachlink = (arr_lstlink, _index) => {
            window.qlus_detail_list_case = window.qlus_detail_list_case || [];
            cLog(() => { console.log("QPlus - CRAW - GET LINK", _index, arr_lstlink.length, arr_lstlink[_index]); });
            if(elm_barinfo  = document.querySelector('[data-barinfo]')) {
                elm_barinfo.setAttribute('data-barinfo', _index + "/" + arr_lstlink.length + "(loading ...)" )
                elm_barinfo.style.width = (_index * 100 / arr_lstlink.length) + "%";


                if(_index === arr_lstlink.length) {
                    
                    if(refreshdata = document.querySelector('.uiqplus_panel--tab-refreshdata')) {
                        refreshdata.click();
                    }
                    
                    setTimeout(() => {
                        var second = 60 * 15; // 15p
                        
                        var ndown = second;
                        var _myCountDown = setInterval(() => {
                            ndown--;
                            elm_barinfo.setAttribute('data-barinfo', `REFRESH ${ndown}s (${Math.round(ndown / 60)}min)` );
                            document.title = `${ndown}s left`;
                            elm_barinfo.style.width = (ndown * 100  / second) + "%";

                            if(ndown < 0) {
                                clearInterval(_myCountDown);
                                document.querySelector('[data-btnclk="qplus-rescan"]').click();
                            }
                        }, 1000)
                    }, 1000)
                }
            }
            
            if(arr_lstlink[_index])  {
                
                
                _loadurlqplus(arr_lstlink[_index], _index, '[jsaction="click: qOOoce"]', (frameContentObj) => {
                    
                    // frameContentObj is NULL have text = NEXT LINK
                    if(frameContentObj == 'NEXT LINK') {
                        _index = _index + 1;
                        crawl_eachlink(arr_lstlink, _index);
                        return false;
                    }
                    
                    TaskOwner('qpluslst-getlst', frameContentObj, () => {
                        
                        cLog(() => { console.log('QPlus XONG ' + _index, window.qlus_detail_list_case) });
                                
                        setChromeStorage("cdtx_qlus_detail_list_case", window.qlus_detail_list_case, (response) => {

                        });

                              
                        setChromeStorage("cdtx_qlus_detail_list_case_lastupdate", new Date(), (response) => {

                        })
                        // NEXT
                        _index = _index + 1
                        crawl_eachlink(arr_lstlink, _index);
                    })
                })
    
                
                
            }
        }
        
        var initStart = (_callback) => {    
            cLog(() => { console.log("QPlus - 1 -  initStart - get link to storage") });
            document.querySelectorAll('[data-workflow-index][jsaction]').forEach((elm) => {
                var _parent = elm.parentElement;
        
                var _n_oneTime = 0
                var _oneTime = setInterval(() => {
                    if (_parent.querySelectorAll('[data-isadmin]').length > 0) {
    
                        var _i = 0;
                        var _lst_list_scan = [];
    
                        cLog(() => { console.log("QPlus - OK - GET LINK") });
    
                        _parent.querySelectorAll('[data-isadmin]').forEach((elm2) => {
                            var _link = elm2.querySelector('a').getAttribute('href'),
                                _linkscan7day = 'https://gauge.corp.google.com' + _link + '?id=1&dateRangeField=1&timeRangeType=Last+7+days';
                                // _linkscan14day = 'https://gauge.corp.google.com' + _link + '?id=0&dateRangeField=1&timeRangeType=Last+14+days';
                                // _linkscan30day = 'https://gauge.corp.google.com' + _link + '?id=0&dateRangeField=1&timeRangeType=Last+30+days';
                                _lst_list_scan.push(_linkscan7day);
                                // _lst_list_scan.push(_linkscan14day);
                                // _lst_list_scan.push(_linkscan30day);
                                
                            _i++;
                        });
                        
                        cLog(() => { console.log("QPlus - OK - GET LINK", _lst_list_scan); });
                        setStorage('qlus_lststorage', _lst_list_scan);
                        setStorage('qlus_lststorage_time', new Date());
    
                        clearInterval(_oneTime);

                        _callback();
                    }
    
                    if(_n_oneTime > 6) {
                        clearInterval(_oneTime);
                        cLog(() => { console.log("QPlus - STOP") });
                    }
                    _oneTime++;
                }, 1000);
    
            });
        
        }
            
    
        // Search
        // var str_search = "1-1248000034254";
        // var rs_lst_search = [];
        // _list_case.forEach(function(item){
        //     if(item.caseID === str_search && item.caseIDInner === str_search) {
        //         rs_lst_search.push(item);
                
        //     }
        // })
    
        // rs_lst_search
        qplusActionByParam();
    } catch (error) {
        cLog(() => { console.log('qQlus', error) });
    }
    
}




function getQlusDetailListCase(callback) {
    cLog( () => { console.log("cdtx", 'getQlusDetailListCase', window.qlus_datalist) });
    getChromeStorage("cdtx_qlus_detail_list_case", (response) => {
        var _list_rs = response.value || [];


        // Sort by dateReview
        function compare( a, b ) {
            if(a.item.dateReview && b.item.dateReview) {
                if ( new Date(a.item.dateReview.trim()) > new Date(b.item.dateReview.trim()) ){
                    return -1;
                }
            }
            return 0;
        }  
        _list_rs.sort( compare );

        // Group caseid
        var _listbycaseid = {};
        var _nodup = [];
        _list_rs.forEach((_i) => {
            if(_listbycaseid[_i.item.caseID]) {
                _listbycaseid[_i.item.caseID].push(_i.item); 
            } else {
                _listbycaseid[_i.item.caseID] = [_i.item]
            }
        });

        cLog(() => { console.log('qplus', _listbycaseid) });

        var _temp = {
            // 'list_rs': _list_rs,
            'list_bycaseid': _listbycaseid,
        }

        cLog(() => { console.log('qplus ', _temp); });

        window.qlus_datalist = _temp;

        if(typeof callback == 'function') {
            callback();
        }
    });
}

function merge2array(a, b, prop) {
  var reduced = a.filter(aitem => !b.find(bitem => aitem[prop] === bitem[prop]))
  return reduced.concat(b);
}
// console.log("ES6", merge(_a, _b, "caseid"));


function uiOnCallPanel() {
    if(!localStorage.getItem("dongtest_local")) return false;
}


function callPhoneDefaultNumber() {
    // if(!IS_DEBUG) return;

    var _dialog_noti = document.querySelector('.dialog-with-notification');
    if(!_dialog_noti) return false;

    
    var _title = _dialog_noti.querySelector('h1');
    var _phone = _dialog_noti.querySelector('input.input.input-area');
    var _call_button = _dialog_noti.querySelector('[debug-id="call-button"]');

    // debug-id="call-button"

    if(_title && _phone && _call_button) {
        if(!document.querySelector('.cdtx__btn')) {
            var _phonecenter = getVariableSheetByKeyAndLanguage('Phone Center', window.keylanguage);
            
            const dom = document.createElement('span');
            dom.innerHTML = `Dial to G. Meet (${window.keylanguage})`;
            
            dom.setAttribute('data-phonenumber', _phonecenter);
            dom.className = 'cdtx__btn';
        
            _title.insertAdjacentElement('beforeEnd', dom);
            _title.classList.add('cdtx__havephonenumber');
            
            dom.addEventListener('click', function(){

                _phone.value = dom.getAttribute('data-phonenumber').replace(/[^\d+]+/g, '');
                _phone.dispatchEvent(new Event('input'));

                setTimeout(() => {
                    document.querySelector('.dialog-with-notification [debug-id="call-button"]').click();
                }, 1000)
            })
        }
    }
    

}

function autoClickRedirectURLGoogleQuery() {
    if(!location.href.includes('https://www.google.com/url?q=')) return false;

    if(window.result && window.result.optionkl__form_option_data && window.result.optionkl__form_option_data.cdtx_chk_disable_redirectgooglequery) {
        return false;
    }
            
    const params = new URL(location.href).searchParams;
    const q = params.get('q') || ''; 
    
    
    
    try {
        const _url = decodeURIComponent(q);
        const fccUrl = new URL(_url);
        console.log(_url);
        location.href = _url;
    } catch (error) {
        return false;
    }
    return false;
}


function quaySoBarkeep(_type){
    
    // option disable
    try {
        if(window.result.optionkl__form_option_data) {
            if(window.result.optionkl__form_option_data.cdtx_chk_disable_pin) return false;
        }
    } catch (error) {
        console.error('cdtx_chk_disable_pin undentify', window.result)
    }


    if(_type === 'meet_showdialbutton') {
        // loadCopyDianumber
        try {
            if(document.querySelector('.vFzkO')) {

                var _meet_dial_copy = (_primary, _search_pos, _id_button) => {
                    if(!document.querySelector(_primary)) {
                        var _str_elm = _search_pos;
                        var _elm = document.querySelector(_str_elm);
                        if(_elm) {
                            var _textview = _elm.innerText.trim();
                            if(_textview) {    

                                const _copydial_number = document.createElement("span");
                                _copydial_number.className  = 'cdtx_copydial';
                                _copydial_number.innerText = 'COPY';
                                _copydial_number.id = _id_button;
                    
                                _elm.insertAdjacentElement('afterEnd', _copydial_number);
                                _copydial_number.addEventListener('click', () => {
                                    _textview = _elm.innerText.trim().replace(/[^\d#+]/g, '');
                                    copyTextToClipboard(_textview);
                                });
                                
                                if('cdtx_copydial_2' === _id_button) {
                                    
                                    const _dialnow = document.createElement("span");
                                    _dialnow.className  = 'cdtx_copydial';
                                    _dialnow.innerHTML = 'DIAL <span class="no" style="line-height: 1;" >record NO</span>';
                                    _dialnow.title = 'Please check consent at dial section case';
                                    _dialnow.id = 'cdtx_dialnow';

                                    var _timeout = _timeout || null;

                                    clearTimeout(_timeout);
                                    
                                    _elm.insertAdjacentElement('afterEnd', _dialnow);
                                    _dialnow.addEventListener('click', () => {
                                        
                                        
                                        setChromeStorage('_pinmeet_temp', _textview.trim().replace(/[^\d#+]/g, ''));
                                        
                                        // Empty if not use
                                        _timeout = setTimeout(() => {
                                            setChromeStorage('_pinmeet_temp', '');
                                        }, 20 * 1000)
                                    });

                                    
                                    const _dialnow_consent = document.createElement("span");
                                    _dialnow_consent.className  = 'cdtx_copydial';
                                    _dialnow_consent.innerHTML = 'DIAL <span class="yes" style="line-height: 1;">record YES</span>';
                                    _dialnow_consent.title = 'Auto accept consent! Please check and accept consent';
                                    _dialnow_consent.id = 'cdtx_dialnow_consent';
                                    
                                    _elm.insertAdjacentElement('afterEnd', _dialnow_consent);
                                    _dialnow_consent.addEventListener('click', () => {
                                        
                                        setChromeStorage('_pinmeet_temp', "consent" + _textview.trim().replace(/[^\d#+]/g, ''));
                                        
                                        // Empty if not use
                                        _timeout = setTimeout(() => {
                                            setChromeStorage('_pinmeet_temp', '');
                                        }, 20 * 1000)
                                    });
                                        
                                }
                                
                                
                            }
                        }
                    }
                }
                _meet_dial_copy ('.vFzkO #cdtx_copydial_1', ".vFzkO .iMP6zc + [jsname='zQ0Yjb']",  "cdtx_copydial_1");
                _meet_dial_copy ('.vFzkO #cdtx_copydial_2', ".vFzkO .iMP6zc + [jsname='pCHCHe']",  "cdtx_copydial_2");


            }
        
        
        
            
        } catch (error) {
            console.error('catch', error)
        }


        return false;
    }





    // ====================
    
    // Auto dial
    var _checkDialPad = () => {
        dialpad = null
        if(dialpad = document.querySelector('.dialpad-section dialpad'))  {
            return dialpad;
        }

        return dialpad;
    }

    var _checkDialToggle = () => {
        dialpad_toggle = null;
        if(dialpad_toggle = document.querySelector('#dialpad-toggle'))  {
            return dialpad_toggle;
        }

        return dialpad_toggle;
    }

    var _checkConsentYesButton = () => {
        var consentyesbtn = null;
        
        if(consentyesbtn = document.querySelector('#consent-yes-button'))  {
            return consentyesbtn;
        }

        return consentyesbtn;
    }
    
    
    var _checkpin = (_textview) => {
        if(!_textview.includes('#')) {
            alert('PIN missing #');
            return false;
        }

        return true;
    }


    var _act_quayso = (_number) => {
        
        _number = _number.replace(/[^\d#*]+/g, '');
        var _numberarr = _number.split('');

        if(!_checkpin(_numberarr)) {
            return false;
        }

        var _index_st = 0;
        var _color_act = `#A` + Math.floor((Math.random() * 99) + 10) + "A00";

        var _myTime = setInterval(() => {
            if(_numberarr[_index_st]) {
                var _pad = _numberarr[_index_st];
                
                var _dialbtn = null;
                
                switch (_pad) {
                    case '#':
                        _dialbtn = document.querySelector(`.dialpad-section [aria-label="Pound sign"]`);
                        
                        break;
                    case '*':
                        _dialbtn = document.querySelector(`.dialpad-section [aria-label="Star sign"]`);
                        
                        break;
                
                    default:
                        _dialbtn = document.querySelector(`.dialpad-section [aria-labelledby="dialpad-button-${_pad}"]`);

                        break;
                }
                
                if(_dialbtn) {
                    cLog(() => { console.log('quayso', _numberarr[_index_st]); });
                    // _dialbtn.style.backgroundColor = _color_act; 
                    
                    _dialbtn.dispatchEvent(new Event('click'));
                }

            } else {
                clearInterval(_myTime);
            }
            _index_st = _index_st + 1;
        }, 350);
    }
    
    
    
    
    // toggle
    if(_checkDialToggle()) {
        getChromeStorage('_pinmeet_temp', (response) => {
            if(response.value) {
                cLog(() => { console.log('DONGDEP _checkDialToggle'); });
                
                if(!_checkDialToggle().classList.contains('donetoggle')) {
                    
                    cLog(() => { console.log('DONGDEP _checkDialToggle 2'); });
                    
                    if(!_checkDialPad()) {
                        
                        cLog(() => { console.log('DONGDEP _checkDialToggle 3'); });
                        
                        _checkDialToggle().click();
                        _checkDialToggle().classList.add('donetoggle');
                    }
                }
                
                
                if(_checkDialPad()) {
                    if(!_checkDialPad().classList.contains('isdial_ready')) {
                        _checkDialPad().classList.add('isdial_ready');
                        
                        cLog(() => { console.log('DONGDEP', 'ACTION GET PIN STORAGE QUAY SO', response); });
                        
                        // 1. Dial button
                        _act_quayso(response.value);
                        
                        // 2. Auto click ConsentYesButton
                        if(response.value.startsWith('consent')) {
                            cLog(() => { console.log('DONGDEP HAVE CONSENT'); });
                            if(_checkConsentYesButton()) {
                                _checkConsentYesButton().click();
                            }
                        }
                        
                        
                        // 3. Reset Null
                        setChromeStorage('_pinmeet_temp', '', () => {
                            cLog(() => { console.log('DONGDEP 4 Reset'); });
                            _checkDialPad().classList.remove('isdial_ready');    
                        });
                    }
                }
            }
        
        });
    }
    
    
    
    
    
    if(!document.querySelector('[data-quayso_submit]')) {
                    
        cLog(() => { console.log('barkeep.corp.google.com - Start') });
        
        if(_checkDialPad()) {
            var _html = `<div style="display: flex;font-size: 13px; justify-content: center;flex-wrap: wrap;outline: none;margin: 5px;"><span style="background: #1a73e8;border-radius: 5px;border: 1px solid #1a73e8;cursor: pointer;color: #fff;user-select: none;width: 30%;text-align: center;flex-basis: 0;flex-grow: 1;max-width: 100%;line-height: 28px;height: 28px;font-size: 12px;max-width: 64px;" data-quayso_submit="1">Dial now</span></div>`;
            
            _html = _TrustScript(_html);

            
            document.querySelector('.dialpad-section').insertAdjacentHTML('beforeBegin', _html);
            

            document.querySelector('[data-quayso_submit]').addEventListener("click", function(){
                    
            

                var _number = prompt("Enter dial number ", "");
                if (!(_number != null && _number != "")) return false;
                

                // ACTION QUAY SO
                _act_quayso(_number);
            })
        }
    }
}



function connectAppointment(caseid = null){
    if(typeof caseid !== 'string' ) {
        if(document.querySelector('.case-id')) {
            caseid = document.querySelector('.case-id').innerText;
        }
    }

    var popupwin = window.open('https://appointments.connect.corp.google.com/appointmentDetails?caseId='+caseid,'popUpWindow','height=350,width=400,left=100,top=100,resizable=yes,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no, status=yes');    
    setTimeout(function() { popupwin.close();}, 5000);
}



function _reupdate_outer() {
    var _istopelm = document.querySelector(`.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) .is-top`);
    var _elm_content = _istopelm.querySelector(`.editor [contenteditable="true"]`);
    _elm_content.dispatchEvent(new Event('input'));
    _elm_content.dispatchEvent(new Event('focus'));
    _elm_content.dispatchEvent(new Event('click'));
    // console.log('DONG', 'HELLO');
}


function testCrawCase() {
    if (!localStorage.getItem('longtest')) return;
    if (location.host !== 'cases.connect.corp.google.com') return false;


    if(!document.querySelector('[debugid="cases-app-bar"]')) {
        setTimeout(() => {
            testCrawCase();
        }, 2000);
        return false;
    }
    
    getChromeStorage('cdtx_lstcaseinfo_long', (response_begin) => {
        console.log('LONG', 'RS', response_begin.value);





        var _arr_begin = response_begin.value || {};

        // Textarea
        var _contentarea = [];
        Object.keys(_arr_begin).forEach(__key => {
            // console.log('Long', __key, _arr_begin[__key]);

            _contentarea.push(`${__key}&#9;${_arr_begin[__key]}`);
        });
        
        console.log("LONG total", _contentarea.length);

        if (___elmidcase = document.querySelector(`#product_forgmc`)) {
            ___elmidcase.remove();
        }

        var _textarea = `<textarea id="product_forgmc" onclick="this.focus();this.select()" readonly="readonly" style=" width: 100%; 
            height: 56px;
            min-height: 56px;
            max-height: 56px;
            position: relative; z-index: 999999999; font-family: monospace;">` + _contentarea.join("\n") + '</textarea>';


        document.body.insertAdjacentHTML("beforeBegin", _textarea);

        var _text = prompt("Enter lst case ", "");
        if (_text) {
            var _arr = _text.split("\n");
            // Unique
            _arr = [...new Set(_arr)];

            console.log("LONG count", _arr.length);

            var _dq = (_index) => {
                
                if(!_arr[_index]) {
                    return false;
                }
                
                document.querySelectorAll('tab:not(.selected) .close-button').forEach((elm) => {
                    elm.click()
                });
                
                console.clear();
                
                var caseid =  _arr[_index].trim() ;

                if (_arr_begin[caseid]) {
                    console.log("LONG isset case", caseid);

                    _dq(_index + 1);
                    return false;
                }


                var _id = `case_${caseid}`;

                if (___elmidcase = document.querySelector(`.onlyonecase`)) {
                    ___elmidcase.remove();
                }

                var _html = `<a href="https://cases.connect.corp.google.com/#/case/${caseid}" class="onlyonecase" id="${_id}">${caseid}</a>`;
                document.querySelector('[debugid="cases-app-bar"]').insertAdjacentHTML("afterBegin", _html);

                document.querySelector(`#${_id}`).click();



                var ntime = 0;
                var myTime = setInterval(() => {
                    ntime++;

                    var _type = 0
                    // LOAI 0
                    // Access redistrict
                    if (document.querySelectorAll('empty-state').length) {
                        clearInterval(myTime);
                        console.log('LONG 1', 'EMPTY');
                        getChromeStorage('cdtx_lstcaseinfo_long', (response) => {
                            var _lst = response.value || {};
                            _lst[caseid] = 'Access restricted';
                            // console.log('LONG', response);
                            setChromeStorage('cdtx_lstcaseinfo_long', _lst, (response2) => {
                                // console.log('LONG', response2);    
                                _dq(_index + 1);
                            })
                        });

                        // Stop
                        return true;
                    }

                    // LOAI 1
                    // TIM THAY CASE ID and wait
                    if (document.querySelectorAll('[debug-id="case-id"] span.case-id').length) {
                        _type = 1;
                        var _caseidelm = document.querySelectorAll('[debug-id="case-id"] span.case-id')[0];

                        if (_caseidelm.innerText.trim().includes(caseid)) {
                            console.log('LONG 1', 'HAVE CASE ID', caseid);
                            var _text = ''
                            document.querySelectorAll('home-data-item').forEach(elm => {
                                if (elm.innerText.includes('Google Ads External Customer ID')) {
                                    clearInterval(myTime);

                                    _text = elm.innerText.trim().split('Google Ads External Customer ID')[1].replace(/[^\d]+/g, '');

                                    getChromeStorage('cdtx_lstcaseinfo_long', (response) => {
                                        var _lst = response.value || {};
                                        _lst[caseid] = _text;
                                        console.log('LONG 1 OKOK CO Ext ID', _text);
                                        // console.log('LONG', response);
                                        setChromeStorage('cdtx_lstcaseinfo_long', _lst, (response2) => {
                                            // console.log('LONG', response2);    
                                            _dq(_index + 1);
                                            
                                            return;
                                        })
                                    });
                                }
                            });
                        }


                    }

                    var _limit = 30
                    if (_type === 1) {
                        _limit = 20;
                    }
                    if (ntime > _limit) {
                        clearInterval(myTime);


                        if (_type === 1) {
                            getChromeStorage('cdtx_lstcaseinfo_long', (response) => {
                                var _lst = response.value || {};
                                _lst[caseid] = (_type === 1 ? 'empty GAds Ext ID' : 'NULL');
                                // console.log('LONG', response);
                                setChromeStorage('cdtx_lstcaseinfo_long', _lst, (response2) => {
                                    // console.log('LONG', response2);    
                                    _dq(_index + 1);
                                })
                            });
                        } else {
                            _dq(_index);
                        }

                        return false;
                    }
                }, 500)
            }

            var nindex = 0;
            _dq(nindex);
        }

    });
}




function testCrawCasev2() {
    if (!localStorage.getItem('longtestv2')) return;
    
    var longtest = localStorage.getItem('longtestv2');
    
    if (location.host !== 'cases.connect.corp.google.com') return false;
    
    if(!document.querySelector('[debugid="cases-app-bar"]')) {
        setTimeout(() => {
            console.log("LONG RELOAD")
            testCrawCasev2();
        }, 2000);
        return false;
    }
    getChromeStorage('cdtx_lstcaseinfo_long', (response_begin) => {
        console.log('LONG', 'RS', response_begin.value);

        var _arr_begin = response_begin.value || {};

        // Textarea
        var _contentarea = [];
        Object.keys(_arr_begin).forEach(__key => {
            // console.log('Long', __key, _arr_begin[__key]);

            _contentarea.push(`${__key}&#9;${_arr_begin[__key]}`);
        });
        
        console.log("LONG total", _contentarea.length);

        if (___elmidcase = document.querySelector(`#product_forgmc`)) {
            ___elmidcase.remove();
        }

        var _textarea = `<textarea id="product_forgmc" onclick="this.focus();this.select()" readonly="readonly" style=" width: 100%; 
            height: 56px;
            min-height: 56px;
            max-height: 56px;
            position: relative; z-index: 999999999; font-family: monospace;">` + _contentarea.join("\n") + '</textarea>';


        document.body.insertAdjacentHTML("beforeBegin", _textarea);
        
        var _text = prompt("Enter lst case ", "");
        if (_text) {
            var _arr = _text.split("\n");
            // Unique
            _arr = [...new Set(_arr)];

            console.log("LONG count", _arr.length);

            var _dq = (_index) => {
                
                
                if(!_arr[_index]) {
                    return false;
                }
                
                if(document.querySelectorAll('tab .close-button').length > 3) {
                    document.querySelectorAll('tab:not(.selected) .close-button').forEach((elm) => {
                        elm.click()
                    });
                }
                
                console.clear();
                
                var caseid =  _arr[_index].trim() ;

                if (_arr_begin[caseid] && longtest != '2') {
                    console.log("LONG isset case", caseid);

                    _dq(_index + 1);
                    return false;
                }


                var _id = `case_${caseid}`;

                if (___elmidcase = document.querySelector(`.onlyonecase`)) {
                    ___elmidcase.remove();
                }

                var _html = `<a href="https://cases.connect.corp.google.com/#/case/${caseid}" class="onlyonecase" id="${_id}">${caseid}</a>`;
                document.querySelector('[debugid="cases-app-bar"]').insertAdjacentHTML("afterBegin", _html);

                document.querySelector(`#${_id}`).click();



                var ntime = 0;
                var myTime = setInterval(() => {
                    ntime++;

                    var _type = 0
                    // LOAI 0
                    // Access redistrict
                    if (document.querySelectorAll('empty-state').length) {
                        clearInterval(myTime);
                        console.log('LONG 1', 'EMPTY');
                        getChromeStorage('cdtx_lstcaseinfo_long', (response) => {
                            var _lst = response.value || {};
                            _lst[caseid] = 'Access restricted';
                            // console.log('LONG', response);
                            setChromeStorage('cdtx_lstcaseinfo_long', _lst, (response2) => {
                                // console.log('LONG', response2);    
                                _dq(_index + 1);
                            })
                        });

                        // Stop
                        return true;
                    }

                    // LOAI 1
                    // TIM THAY CASE ID and wait
                    if (document.querySelectorAll('[debug-id="case-id"] span.case-id').length) {
                        _type = 1;
                        var _caseidelm = document.querySelectorAll('[debug-id="case-id"] span.case-id')[0];

                        if (_caseidelm.innerText.trim().includes(caseid)) {
                            console.log('LONG 1', 'HAVE CASE ID 2', caseid, document.querySelectorAll('home-data-item').length);
                            var _text = '';

                            if(document.querySelectorAll('home-data-item').length > 0) {
                                
                                
                                document.querySelectorAll('home-data-item').forEach(elm => {
                                    if (elm.innerText.includes('Google Ads External Customer ID')) {
                                        
                                        _text = elm.innerText.trim().split('Google Ads External Customer ID')[1].replace(/[^\d]+/g, '');
                                        
                                    }
                                });
                                
                                // console.log('LONG 1 2', _text);
                                
                                var _text2 = '';
                                if(_text == '') {
                                    if(__targetinput = document.querySelector('[debug-id="target-input"] input')) {
                                        if(__targetinput.value.trim()) {
                                            _text2 = __targetinput.value;    
                                        }
                                        
                                    }
                                }
                                
                                if(_text != '' || _text2 != '') {
                                    
                                    clearInterval(myTime);
                                    
                                    getChromeStorage('cdtx_lstcaseinfo_long', (response) => {
                                        var _lst = response.value || {};
                                        
                                        var _internal_id = '';
                                        if(__targetinput = document.querySelector('[debug-id="target-input"] input')) {
                                            _internal_id = '| i' + __targetinput.value;
                                        }
                                        
                                        _lst[caseid] = _text + _internal_id;
                                        // console.log('LONG 1 OKOK CO Ext ID', _text, );
                                        // console.log('LONG', response);
                                        setChromeStorage('cdtx_lstcaseinfo_long', _lst, (response2) => {
                                            // console.log('LONG', response2);    
                                            _dq(_index + 1);
                                            
                                        })
                                    });
                                    
                                    return;
                                }    
                            }
                            
                            
                            
                                    
                        }


                    }

                    var _limit = 30
                    if (_type === 1) {
                        _limit = 20;
                    }
                    if (ntime > _limit) {
                        clearInterval(myTime);


                        if (_type === 1) {
                            getChromeStorage('cdtx_lstcaseinfo_long', (response) => {
                                var _lst = response.value || {};
                                _lst[caseid] = (_type === 1 ? 'empty GAds Ext ID' : 'NULL');
                                // console.log('LONG', response);
                                setChromeStorage('cdtx_lstcaseinfo_long', _lst, (response2) => {
                                    // console.log('LONG', response2);    
                                    _dq(_index + 1);
                                })
                            });
                        } else {
                            _dq(_index);
                        }

                        return false;
                    }
                }, 500)
            }

            var nindex = 0;
            _dq(nindex);
        }

    });
}

function __case_id() {
    if(_caseidelm = document.querySelector('[debug-id="case-id"] span.case-id')) {
        return _caseidelm.innerText;
    }
    
    return false;
}

function ___casecalendar_elm() {
    if(elm = document.querySelector('._casecalendar_info')) {
        return elm;
    }
    
    return false;
}



function extractEmails(text) {
    // Regular expression to match emails
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;
    // const emailRegex = /([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+)/;
    
    const emails = text.match(emailRegex);
    // console.log(emails);  // Output: ["info@example.com", "support@example.net"]



    // Create a mutable array to store the emails
    // const emails = [];

    // // Split the text string on spaces
    // var words = text.replace(/(\r\n|\r|\n)/g, ' ');
    // words_arr = words.split(" ");

    // // Iterate over the words array
    // for (const word of words_arr) {
    //     // Match the email regex on the current word
    //     const match = emailRegex.exec(word);

    //     // If there is a match, add the email to the array
    //     if (match) {
    //         emails.push(match[1]);
    //     }
    // }

    // console.log('emails', emails);
    // Return the array of emails
    return emails;
}

var reFormatPhone = function(phoneNumber, prefix_phone) {
    prefix_phone = prefix_phone || "84";

    var _rp=function(t,r){r=r||"84";return!!function(t){return/^\d{10}$|^\d{11}$|^(\+\d{1,3})?\d{10,11}$/.test(t)}(t=t.replace(/[^\d+]+/g,""))&&(t.startsWith("+")?t:"+"+r+t)};
    if(_phone = _rp(phoneNumber, prefix_phone)) {
        return _phone;
    }

    return false;
}


function extractUrls(text) {
    // Regular expression to match URLs
    const urlRegex = /(https?:\/\/[^\s,]+)/;

    // Create a mutable array to store the URLs
    const urls = [];

    // Split the text string on commas
    var words = text.replace(/(\r\n|\r|\n)/g, ' ');
    words_arr = words.split(" ");
    

    // Iterate over the words array
    for (const word of words_arr) {
        // Match the URL regex on the current word
        const match = urlRegex.exec(word);

        // If there is a match, add the URL to the array
        if (match) {
            urls.push(match[1]);
        }
    }

    // Return the array of URLs
    return urls;
}


function stripHtml(html) {
   let tmp = document.createElement("DIV");
   html = html.replace(/<br\s*[\/]?>/gi, "\n");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

function initLoadGroup() {
    console.log('initLoadGroup', window.result);
    var event_str = '';
    
    document.documentElement.setAttribute("data-hostname", window.location.hostname);
    document.documentElement.setAttribute("data-setting_mycountry", window.result.mycountry);
    document.documentElement.setAttribute("data-setting_optionkl__modecase", window.result.optionkl__modecase);
    
}
function styleAllviaSheet(){
    window._styleallviasheet_once = window._styleallviasheet_once || 0;

    if(window._styleallviasheet_once == 0) {
        getValueByKeyInSheetname(key = 'style_all', 'System' , (rs) => {
            window._styleallviasheet_once = 1;
            document.head.insertAdjacentHTML('beforeEnd',rs);
        });
    }
}


function chatBotPopup(){
    if(window.dataTagteam.dongtest == false) return;
    if(window.location.hostname !== 'cases.connect.corp.google.com') return false;
    
    var _showchatbox = (rs) => {
        
        var _main_elm = () => {
            return document.querySelector('.tr_popupcontact');
        }
        
        if(_main_elm()) return;
        
        
        var ui = `
        <style>
            .tr_popupcontact {
                --url-iconcheckbox-call: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.2 21.37C12.54 22.25 11.46 22.25 10.8 21.37L9.29999 19.37C9.12999 19.15 8.77 18.97 8.5 18.97H8C4 18.97 2 17.97 2 12.97V7.96997C2 3.96997 4 1.96997 8 1.96997H16C20 1.96997 22 3.96997 22 7.96997V12.97' stroke='%23ffffff' stroke-width='1.5' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M18.2 21.4C19.9673 21.4 21.4 19.9673 21.4 18.2C21.4 16.4327 19.9673 15 18.2 15C16.4327 15 15 16.4327 15 18.2C15 19.9673 16.4327 21.4 18.2 21.4Z' stroke='%23ffffff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M22 22L21 21' stroke='%23ffffff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M15.9965 11H16.0054' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M11.9955 11H12.0045' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M7.99451 11H8.00349' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
            }
            
            
            
            @keyframes fb_bounce_out_v2 {
                0% {
                    opacity: 1;
                    transform: scale(1, 1);
                    transform-origin: bottom left
                }
            
                100% {
                    opacity: 0;
                    transform: scale(0, 0);
                    transform-origin: bottom left;
                }
            }
            
            @keyframes fb_bounce_in_v2 {
                0% {
                    opacity: 0;
                    transform: scale(0, 0);
                    transform-origin: bottom left
                }
            
                50% {
                    transform: scale(1.03, 1.03);
                    transform-origin: bottom left
                }
            
                100% {
                    opacity: 1;
                    transform: scale(1, 1);
                    transform-origin: bottom left;
                }
            }
            
            
            
            .tr_popupcontact {
                position: fixed;
                bottom: 10px;
                right: auto;
                left: 10px;
                z-index: 9999999999
            }
            
            .tr_popupcontact iframe {
                border: 0;
                margin: 0;
                padding: 0;
                min-height: 426px;
            }
            
            .tr_popupcontact__popupinfo {
            position: absolute;
            bottom: calc(100% + 10px);
            background: #fff;
            width: 320px;
            max-width: 320px;
            height: auto;
            padding: 10px;
            border-radius: 10px;
            user-select: none;
            display: flex;
            flex-direction: column;
            left: 0;
            
            
            box-shadow: 0 4px 12px 0 rgba(0, 0, 0, .15);
            
                
            animation-duration: 300ms;
            transition-timing-function: ease-in;
            }
            
            
            
            .tr_popupcontact__btn {
            border-radius: 50%;
            width: 42px;
            height: 42px;
            display: block;
            background: #03A9F4 var(--url-iconcheckbox-call) no-repeat center;
            background-size: 60%;
            cursor: pointer;
            -webkit-tap-highlight-color:  rgba(255, 255, 255, 0); 

            }
            
            .tr_popupcontact__btn:not(.open)~.tr_popupcontact__popupinfo {
            opacity: 0;
            pointer-events: none;
            animation-name: fb_bounce_out_v2;
            }
            
            
            .tr_popupcontact__btn.open~.tr_popupcontact__popupinfo {
            animation-name: fb_bounce_in_v2;
            }
            
            
            .tr_popupcontact__btn.open {
                background-size: 50%;
                border-radius: 50% 0  50% 50%;
            }
            
            .tr_popupcontact [data-type] {
            padding: 10px;
            padding-left: 32px;
            background: var(--url-iconcheckbox-whatsapp) no-repeat left top 10px;
            background-size: 24px;
            display: block
            }
            
            .tr_popupcontact [data-type][data-type=whatsapp] {
            background-image: var(--url-iconcheckbox-whatsapp)
            }
            
            /* DEV */
            html:not([data-setting_optionkl__modecase="Development"]) .tr_popupcontact{
            display: none;
            }
    
    
        </style>
        <div class="tr_popupcontact _fordevmode">
            <span class="tr_popupcontact__btn"></span>
            <div class="tr_popupcontact__popupinfo"></div>
        </div>`;
        
        document.body.insertAdjacentHTML("afterEnd", ui);
        
        var iframe = `<iframe src="${rs}"></iframe>`;
        
        if(_main_elm()) {
            var _content_div = _main_elm().querySelector('.tr_popupcontact__popupinfo');
            var _btn = _main_elm().querySelector('.tr_popupcontact__btn');
            _btn.addEventListener('click', (e) => {
                _btn.classList.toggle('open');
                if(!_content_div.classList.contains('once_iframeload')) {
                    _content_div.innerHTML = iframe;
                    _content_div.classList.add('once_iframeload');
                }
                
                
            });
        }
        
    }
    

    getValueByKeyInSheetname(key = 'chatbox_iframeurl', 'System' , (rs) => {
        if(rs) {
            _showchatbox(rs);    
        }
        
    });
    
    
}

function toastify_act(messenger){
    Toastify({
        text: messenger,
        duration: 2000,
        callback: function(){
            this.remove();
        }
    }).showToast();
}






function rules_vardatacase(string) {
    var str = `All {{abv_dec}} of us except @Emran {{abv_dec}} , @Raju and @Noman were there \n {{def}}
    cdfdf
    sdfsdf
    {{avb}}
    `;
    str = string;

    try {
        var _arr = str.match(/{{\w*}}/g)
        
        if(typeof _arr == 'object') {
            _arr = _arr.filter(n => n)
            _arr = _arr.filter((c, index) => {
                return _arr.indexOf(c) === index;
            });
            
            
            _arr.forEach((item) => {
                var _name = item.replace('{{', '').replace('}}', '');
                if(value = window.dataCase[_name]) {
                    str = str.replace(item, value);    
                }
            });
        }
        
            
    } catch (error) {
        return str;    
    }

    return str;
}


function happyChristMas(){
    if(window.location.hostname !== 'cases.connect.corp.google.com') return false;
    
    cLog(() => {  console.log('happyChristMas', getDiffTime('2023-12-31', "day")) });
            
    var is_end = false;
    
    var days = getDiffTime( new Date().getFullYear() + '-12-31', "day");
    if(!(days > 0 && days < 20)) {
        is_end = true;
        localStorage.removeItem("_christmas_theme")
        return false;
    }
    
    var isthemest = localStorage.getItem("_christmas_theme");
    
    
    if(isthemest) {
        document.documentElement.setAttribute("data-event", "christmas");    
    }
    

    observeOnce((elm) => {
        if(!(btn_toggle_event = document.querySelector('[data-btnclk="toggle_event"]'))) {
           if(open_panelnote = document.querySelector('.material-button[data-btnclk="open_panelnote"]')) {
            cLog(() => { console.log('observeOnce - happyChristMas' ) })


               var imgsrc = isthemest ? 'https://cdn-icons-png.flaticon.com/128/13109/13109989.png' : 'https://cdn-icons-gif.flaticon.com/13109/13109989.gif';
               open_panelnote.insertAdjacentHTML('beforeBegin', `<div class="material-button" data-btnclk="toggle_event"><div class="content"><img src="${imgsrc}" style=" mix-blend-mode: multiply; transform: scale(${isthemest ? 1.5 : 2}); "></div></div>`);
               
               
               onClickElm('[data-btnclk="toggle_event"]', 'click', function(elm, e){
                    if (confirm("You sure " + (isthemest ? 'remove' : 'change') + " theme Christmas?")) {
                        
                        if(!isthemest) {
                            localStorage.setItem("_christmas_theme", "true")    
                        } else {
                            localStorage.removeItem("_christmas_theme")
                        }
                        
                        location.reload();
                    }
               })
           }
        }
        
        if(isthemest && (app_bar = document.querySelector('app-bar[debugid="cases-app-bar"]'))) {
            var cdtx_christmas_trangtri = function () { return app_bar.querySelector('#cdtx_christmas_trangtri') };
            if(!cdtx_christmas_trangtri()) {
                app_bar.insertAdjacentHTML('afterBegin', `
                <style>
                #cdtx_christmas_trangtri {
                    position: fixed;
                    z-index: 9999;
                    width: 86px;
                    height: 86px;
                    pointer-events: none;
                }
                
                #cdtx_christmas_trangtri:hover {
                    opacity: 0.3;
                }
                </style>
                <video id="cdtx_christmas_trangtri" autoplay="true" loop="" src="https://bucket-o39pcy.s3.ap-southeast-1.amazonaws.com/cdtx.lyl.vn/assets/webp/1702347051608.webm" ></video>`)

                cdtx_christmas_trangtri().addEventListener('click', function(){
                    cdtx_christmas_trangtri().remove()
                })
            }
            
        }
    });
}

function checkLdapAssignee() {
    if(window.location.hostname !== 'cases.connect.corp.google.com') return false;

    try {
        
        if(_ldap_photo = document.querySelector('profile-icon img.photo')) {
            var _ldap = _ldap_photo.src.split('/');
            _ldap = _ldap[_ldap.length - 1].split('?')[0];

            var _userassigneer = document.querySelector('[debug-id="assignee"]').innerText.replace(/[^a-z]/g,'');
            if(_ldap === _userassigneer) {
                return true;
            }
        }
    } catch (error) {
        return false;
    }

    return false;
}

// isStopLoopInfinity("keyname", 3)
function isStopLoopInfinity (key, ntime) {
    if(typeof window.isstoploopinfinity != 'object') {
        window.isstoploopinfinity = {};
    }
    
    window.isstoploopinfinity[key] = window.isstoploopinfinity[key] || 0;


    if(window.isstoploopinfinity[key] > ntime) {
        return true;
    }
    // plus
    window.isstoploopinfinity[key] = window.isstoploopinfinity[key] + 1;
    
    return false;
    
}


function addDashboardChklstSOP() {
    if(window.location.hostname !== 'cases.connect.corp.google.com') return false;
    
    // 1. add button
    var _btn = () => {
        return document.querySelector('._panel_btnshortcut [data-btnclk="dashboard_chklst_sop"]');
    };
    
    
    var _sub_modal = () => {
        return document.querySelector('._sub_modal');
    }
    
    observeOnce((elm) => {
        
        // toolbar
        if(elpos = document.querySelector('[data-debugid="goteam"]')) {
            if(!_btn()) {
                if(isStopLoopInfinity("keyname", 2000)) return false;
                
                cLog(() => { console.log('observeOnce - addDashboardChklstSOP' ) })
                 
                
                
                var _html = `<div class="material-button" data-btnclk="dashboard_chklst_sop" title="check EC, OGT, ...." >
                    <div class="content">
                        <img src="${assets_img_checklist}" alt="" >
                    </div>
                </div>`;  
                
                elpos.insertAdjacentHTML('beforeBegin', _html);
                
            }
        }
    });   
        
    
    
    // 2. ACTION
    onClickElm('[data-btnclk]', 'click', function(elm, e){
        try {
            var _action = elm.getAttribute("data-btnclk");
            if(_action === 'dashboard_chklst_sop') {
                
                var iframe_dashboard_chklst_sop = 'https://app.bsd.education/share/o/zxnmpa42/';
                if(iframe_dash_here = getVariableSheetByKeyAndLanguage('dashboard_chklst_sop', window.keylanguage)) {
                    iframe_dashboard_chklst_sop = iframe_dash_here;
                }
                
                _sub_modal().insertAdjacentHTML('beforeEnd', `
                    <span class="_sub_modal_close"></span>
                    <div class="_sub_modal_container_outer" >
                        <iframe src="${iframe_dashboard_chklst_sop}"></iframe>
                    </div>
                `);
        
                _sub_modal().classList.add('show');
            }
        } catch(error) {
            console.error('cdtx addDashboardChklstSOP', error)
        }
    });
}


// addBoardIframe({
//     'urlframe_default': 'https://cdtx.lyl.vn/_support/4agent/index.php',
//     'urlonsheet_bykey': 'dashboard_bookmark_lsttool',
//     'btn_keyclick': 'dashboard_bookmark_lsttool',
//     'tooltip': 'Tools on Bookmark click',
//     'icon_url': assets_img_bookmark,
//     'elm_pos_show': `[data-debugid="goteam"]`,
    
// })

function addBoardIframe(_opt) {
    if(window.location.hostname !== 'cases.connect.corp.google.com') return false;
    
    // 1. add button
    var _btn = () => {
        return document.querySelector(`._panel_btnshortcut [data-btnclk="${_opt.btn_keyclick}"]`);
    };
    
    
    var _sub_modal = () => {
        return document.querySelector('._sub_modal');
    }
    
    observeOnce((elm) => {
        
        // toolbar
        if(elpos = document.querySelector(`${_opt.elm_pos_show}`)) {
            if(!_btn()) {
                if(isStopLoopInfinity("keyname", 2000)) return false;
                
                cLog(() => { console.log('observeOnce - addDashboardBookmarkListTool' ) })
                 
                
                
                var _html = `<div class="material-button" data-btnclk="${_opt.btn_keyclick}" title="Tools on Bookmark click" >
                    <div class="content">
                        <img src="${_opt.icon_url}" alt="" >
                    </div>
                </div>`;  
                
                elpos.insertAdjacentHTML('beforeBegin', _html);
                
            }
        }
    });   
        
    
    
    // 2. ACTION
    onClickElm('[data-btnclk]', 'click', function(elm, e){
        try {
            var _action = elm.getAttribute("data-btnclk");
            if(_action === `${_opt.btn_keyclick}`) {
                
                var iframe_dashboard_chklst_sop = _opt.urlframe_default;
                if(iframe_dash_here = getVariableSheetByKeyAndLanguage(_opt.urlonsheet_bykey, window.keylanguage)) {
                    iframe_dashboard_chklst_sop = iframe_dash_here;
                }
                
                _sub_modal().insertAdjacentHTML('beforeEnd', `
                    <span class="_sub_modal_close"></span>
                    <div class="_sub_modal_container_outer" >
                        <iframe src="${iframe_dashboard_chklst_sop}"></iframe>
                    </div>
                `);
        
                _sub_modal().classList.add('show');
            }
        } catch(error) {
            console.error('cdtx addDashboardChklstSOP', error)
        }
    });
}


function addDashboardCheckWinCriteria() {
    if(window.location.hostname !== 'cases.connect.corp.google.com') return false;
    
    // 1. add button
    var _btn = () => {
        return document.querySelector('._panel_btnshortcut [data-btnclk="dashboard_chklst_wincriteria_sop"]');
    };
    
    
    var _sub_modal = () => {
        return document.querySelector('._sub_modal');
    }
    
    observeOnce((elm) => {
        
        // toolbar
        if(elpos = document.querySelector('[data-debugid="goteam"]')) {
            if(!_btn()) {
                if(isStopLoopInfinity("keyname", 2000)) return false;
                cLog(() => { console.log('observeOnce - addDashboardChklstSOP' ) })
                
                var _html = `<div class="material-button" data-btnclk="dashboard_chklst_wincriteria_sop" title="Check win criteria, ...." >
                    <div class="content">
                        <img src="${assets_img_target}" alt="" >
                    </div>
                </div>`;  
                
                elpos.insertAdjacentHTML('beforeBegin', _html);
                
            }
        }
    });   
        
    
    
    // 2. ACTION
    onClickElm('[data-btnclk]', 'click', function(elm, e){
        try {
            var _action = elm.getAttribute("data-btnclk");
            if(_action === 'dashboard_chklst_wincriteria_sop') {
                
                var iframe_dashboard_chklst_sop = 'https://app.bsd.education/sandbox_output/instance/xmr2atrg/index.html';
                if(iframe_dash_here = getVariableSheetByKeyAndLanguage('dashboard_chklst_wincriteria', window.keylanguage)) {
                    iframe_dashboard_chklst_sop = iframe_dash_here;
                }
                
                _sub_modal().insertAdjacentHTML('beforeEnd', `
                    <span class="_sub_modal_close"></span>
                    <div class="_sub_modal_container_outer" >
                        <iframe src="${iframe_dashboard_chklst_sop}"></iframe>
                    </div>
                `);
        
                _sub_modal().classList.add('show');
            }
        } catch(error) {
            console.error('cdtx addDashboardChklstSOP', error)
        }
    });
}


function addBoadListEmailTemplate() {
    if(window.location.hostname !== 'cases.connect.corp.google.com') return false;
    
    // 1. add button
    var _btn = () => {
        return document.querySelector('._panel_btnshortcut [data-btnclk="boardlistemail"]');
    };
    
        
    // deloy UI
    var domDivPanel = document.createElement('div');
    domDivPanel.className = 'cdtxemailpanel';
    domDivPanel.style.display = 'none';
    domDivPanel.innerHTML = `
        <span class="cdtxemailpanel-head">
            <span class="cdtxemailpanel-btnclose" data-btnclk="cdtxemailpanel-btnclose"><img src="chrome-extension://gnhkacnhcenacadhaohjdkmkgfikdkoh/assets/img/315851/close.svg" ></span>
            <span>Email templates</span>
        </span>
        <span class="cdtxemailpanel-searchinput" contenteditable="true" data-elm_inputparent=""></span>
        <div class="cdtxemailpanel-body">
        
        </div>
    `;

    document.body.insertAdjacentElement('afterEnd', domDivPanel);

    var _elm_body = function() {
        return domDivPanel.querySelector('.cdtxemailpanel-body');
    };
    
    var rs = window.loadgooglesheetpublish || null;
    var _1st_email_elm = null;
    if(rs) {
        var _tab_cr_subject_templatemail = rs[`${window.keylanguage} | CR, Subject, Template Emails`];
        if(_tab_cr_subject_templatemail) {
            var _sheet_tab = _tab_cr_subject_templatemail['sheettab'];
            var domItem = null;

            var _insertmailbox = (_objdata) => {
            
                var template_subject = _objdata.subject;
                var template_body = _objdata.template_body;
                
                // Wait and insert
                wait4Elem('.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top[card-type="compose"] #email-body-content-top').then(function (elm) {
                    cLog(() => {console.log("checkInputEmailInboxAndFix 2"); });
                    checkInputEmailInboxAndFix();
                    
                    var _card_istop = document.querySelector('.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top');
    
                    
                    var subject = _card_istop.querySelector("input.subject");
                    var body_content = _card_istop.querySelector("#email-body-content");
                    var body_content_top = _card_istop.querySelector("#email-body-content-top");
                    var body_content_top_content = _card_istop.querySelector("#email-body-content-top-content");
    
                    // body_content.style.padding = '0px';
                    body_content.style.maxWidth = '100%';
                    
                    // Insert value
                    if(!window.hasClkReply && !_card_istop.querySelector(".finished-reply")) {
                        subject.value = template_subject.innerText;    
                    }
                    
                    
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
                            _objdata.crname.includes("SO - ")
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


            _sheet_tab.forEach((item) => {
                if('1' == item['Is HTML Custom']) {
                    domItem = document.createElement('span');
                    domItem.className = 'cdtxemailpanel-item';
                    domItem.title = `${item['Key']}`;
                    domItem.innerHTML = `
                        ${item['CR Name']}
                    `;
                    
                    if(domItem.title.trim() == 'ts as new') {
                        _1st_email_elm = domItem;
                    }
                    
                    
                    // replaceAllHtmlElement(template_body, window.dataCase);
                    
                    // click event
                    domItem.addEventListener("click", (e) => {
                        
                        if(window.dataCase.case_id) {
                            if(__case_id() !== window.dataCase.case_id) {
                                Toastify({
                                    text: 'Data case not ready! Please check, Make sure all good! ',
                                    duration: 3000,
                                    class: "warning",
                                    callback: function(){
                                        this.remove();
                                    }
                                }).showToast();
                                
                                // return false;
                                window.dataCase = {};
                            }    
                        }
                        
                        
                        var _str_template_body = replaceTextByData(item['Email Templates Custom']);
                        var template_body = document.createElement('div');
                        template_body.innerHTML = _str_template_body;
                        
                        
                        var _str_template_subject = replaceTextByData(item['Subject']);
                        var template_subject = document.createElement('div');
                        template_subject.innerHTML = _str_template_subject;
                        replaceAllHtmlElement(template_subject, window.dataCase);
                        
                       
                        var _objdata = {
                            subject: template_subject,
                            template_body: template_body,
                            crname: item['CR Name'],
                        }; 
                        
                       cLog(() => { console.log('addBoadListEmailTemplate', _objdata); })
                        
                        if(document.querySelector('.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top[card-type="compose"] #email-body-content-top')) {
                            _insertmailbox(_objdata);
                        } else {
                            document.querySelector("material-fab-speed-dial").dispatchEvent(new Event('mouseenter'));
                            document.querySelector("material-fab.themeable.compose").addEventListener("click", () => {
                                var n_card = document.querySelectorAll("card[casesanimate].write-card").length || 0;
                                var myTimeCheck = setInterval(() => {
                                    var n_card_2 = document.querySelectorAll("card[casesanimate].write-card").length || 0;
                                    if(n_card_2 > n_card) {
                                        clearInterval(myTimeCheck);
                                        _insertmailbox(_objdata);
                
                                        // Close dial
                                        document.querySelector("material-fab-speed-dial").dispatchEvent(new Event('mouseenter'));
                
                                    }
                                }, 1000)
                                
                            });
                            
                            // 1.2
                            document.querySelector("material-fab.themeable.compose").click();
                            
                        }
                        
                       
                    });
                    
                    // append to body
                    _elm_body().insertAdjacentElement('beforeEnd', domItem);
                }
                
            
            }); 
            
            cLog(() => { console.log('addBoadListEmailTemplate', window.dataCase); })
        }
    }
            
    
    
    
    observeOnce((elm) => {
        
        // toolbar
        if(elpos = document.querySelector('[data-btnid="crawl_case"]')) {
            if(!_btn()) {
                if(isStopLoopInfinity("keyname", 2000)) return false;
                
                var _html = `<div class="material-button" data-btnclk="boardlistemail" title="Email templates custom" >
                    <div class="content">
                        <img src="${assets_img_mailicon}" alt="" >
                    </div>
                </div>`;
                
                if(_1st_email_elm) {
                    _html += `<div class="material-button" data-btnclk="board_clk1stemail_tag" title="Send 1st email - Tag" >
                    <div class="content">
                        <img src="${assets_img_1semail}">
                    </div>
                </div>`
                }
                
                elpos.insertAdjacentHTML('afterEnd', _html);
                
            }
        }
    });   
    
    // console.log('addBoadListEmailTemplate', window.loadgooglesheetpublish)
    
    var _toggleDomPanel = () => {
        if('block' != domDivPanel.style.display) {
            domDivPanel.style.display = "block";
            document.documentElement.style.marginRight = '320px';
            
        } else {
            domDivPanel.style.display = "none";
            document.documentElement.style.marginRight = '';
        }
        
    };
    
    
    onClickElm('[data-btnclk]', 'click', function(elm, e){
        try {
            var _action = elm.getAttribute("data-btnclk");
            
            cLog(() => { 
                console.log('addBoadListEmailTemplate', _action)
            });
            
            if(_action === 'boardlistemail') {
                _toggleDomPanel();
            }
            
            if(_action === 'cdtxemailpanel-btnclose') {
                _toggleDomPanel();
            }
            
            if(_action === 'board_clk1stemail_tag') {
                _1st_email_elm.click();
            }
            
            
            
        } catch(error) {
            console.error('cdtx boardlistemail', error)
        }
    });
    
    // Search 
    onClickElm('.cdtxemailpanel-searchinput', 'keyup', function(elm_inputparent, e){
        var _search = elm_inputparent.innerText.toLowerCase();
        elm_inputparent.setAttribute('data-elm_inputparent', _search);
        domDivPanel.querySelectorAll('.cdtxemailpanel-item').forEach((elm) => {
            // elm
            elm.style.display = 'none';
            if(elm.innerText.toLowerCase().includes(_search)) {
                elm.style.display = '';
            }
        });
    });
}


// last visit case
function lastVisitCase(){
    window.__lastVisitCase = window.__lastVisitCase || '';
    window.__lastvisitcase_id = window.__lastvisitcase_id || '';
    
    var _ischeck_update = () => {
        if('0' == window.__lastVisitCase) return false;
        
        if(__case_id()) {
            if(__case_id() != localStorage.getItem("__lastvisitcasse")) {
                // Once
                cLog(() => { console.log('lastVisitCase', __case_id()); });
                localStorage.setItem("__lastvisitcasse", __case_id());
                
                // Begin
                setChromeStorage("__lastvisitcasse", `${__case_id()}|||${formatDate(new Date(), 'Y-m-d')}` , (response) => {

                });
                
            }
            
        }
    };
    
    document.addEventListener( 'visibilitychange' , function() {
        
        if (document.hidden) {
            window.__lastVisitCase = '0';
        } else {
            window.__lastVisitCase = '1';
        }
        
        _ischeck_update();
    }, false );
    
    observeOnce((elm) => {
        if(__case_id()) {
            if(__case_id() != window.__lastvisitcase_id) {
                window.__lastvisitcase_id = __case_id();
                _ischeck_update();
            }
        }
    });
    
    

    
}

// Check is Reply mailbox
function isMailboxReplyStatus() {
    
}


function isHaveReviewCase() {
    var ishave = false;
    document.querySelectorAll('#read-card-tab-panel-case-log .case-log-container.active-case-log-container .activities > div').forEach(function(elm){
        if(elm.innerText.includes('Review case in')) {     
            ishave = true;
        }
    })
    
    return ishave;
}


// Open input get ID
function disPatchEventGetIDAds() {
    console.log('window.dataCase', window._gl_idads);
    
    window._gl_idads = window._gl_idads || [];
    window._gl_idads[__case_id()] = {};
    
    if(window._gl_idads[__case_id()].customer_ocid) return false;
    
    
    var _myTimeout = _myTimeout || null;
    
    // Load input hide
    if(!document.querySelector('.selected-target .field .value')) {
        document.querySelector('.target-input').dispatchEvent(new Event('mouseover'));
    }

    wait4Elem('.selected-target .field .value').then((_elm) => {
        document.querySelectorAll('.selected-target .field').forEach((elm) => {
            var _label = () => {
                return elm.querySelector('.label');
            }

            if(_label()) {
                var _n = 0;
                var _myInterval = setInterval(() => {

                    var _is_ok = false;
                    if(_label().innerText.toLowerCase().includes('internal id')) {
                        if(_label().innerText.trim()) {
                            var _value = elm.querySelector('.value');
                            var _id = _value.innerText.trim();
                            _is_ok = true; 
                            window._gl_idads[__case_id()].customer_ocid = _id
                            console.log('window.dataCase', window._gl_idads);
                            
                        }
                    }
                    
                    if(_label().innerText.toLowerCase().includes('external id')) {
                        if(_label().innerText.trim()) {
                            var _value = elm.querySelector('.value');
                            var _id = _value.innerText.trim();
                            
                            window._gl_idads[__case_id()].customer_adsid = _id
                            console.log('window.dataCase', window._gl_idads);
                        }
                    }

                    if(_n > 5 || _is_ok) {
                        clearInterval(_myInterval);
                        clearTimeout(_myTimeout);
                    }
                    _n++;
                }, 500);
            }
        });
    }); 
}


// push to Obsever
function detechAMemailMissing(){
    if(window.location.hostname !== "cases.connect.corp.google.com") return false;
    
    var _istopelm = document.querySelector(`.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top[card-type="compose"]`);
    if(_istopelm) {
        var _inputcc = () => {
            return _istopelm.querySelector('.input.cc');
        };
        
        var _inputbcc = () => {
            return _istopelm.querySelector('.input.bcc');
        };
        
        var _attr_eieid = () => {
            return _istopelm.querySelector('[data-eieid]');
        };
        
        
        
        
        var _expand_btn = () => {
            return _istopelm.querySelector('[debug-id="expand-button"]');
        };
        
        
        if(!(_inputcc() || _inputbcc())) {
            if(_expand_btn()) {
                // cLog(() => { console.log('DTEST expand'); })
                _expand_btn().click();
            }
        } else {
            
            if(!window.dataCase.case_id) return false;

            if(_inputcc().innerText.includes('@')) {
                // cLog(() => { console.log('DTEST OKOK') });
            } else {
                if(
                    (
                    _inputcc().querySelector('input') 
                    || _inputbcc().querySelector('input')
                    )
                    
                    && !_attr_eieid()
                ) {
                    if(!_istopelm.classList.contains('_once')) {
                        // cLog(() => { console.log('DTEST fix now'); })
                        _istopelm.classList.add('_once')
                        checkInputEmailInboxAndFix();    
                    }
                    
                }
                
            }
        }
        
        
    }
    
}

function reSaveComposerContentAction() {
    var _istop = function () {
        return document.querySelector('.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top');
    };
    
    if(!_istop()) return;

    _istop().querySelector("input.subject").focus();
    
    var _composeemailcard = document.querySelector('.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top[card-type="compose"]');
    
    if(_email_body_content_top_content = _composeemailcard.querySelector('[debug-id="underline"]')) {
        // Update action
        _email_body_content_top_content.click();

    }
    

}

// update new data elem
function recheckVersionForResetData(){
    if(window.location.hostname !== "cases.connect.corp.google.com") return false;
    
    if(
        !(
            window.result.optionkl__modecase == 'Development'
            || window.result.optionkl__modecase == 'Auto'
        )
    ) return false;

    // isForLiveBeta
    // getVersion
        window._once_recheckversionforresetdata = window._once_recheckversionforresetdata || 0;
        window._once_recheckversionforresetdata_time = window._once_recheckversionforresetdata_time || new Date();
        var _second = Math.abs(getDiffTime(window._once_recheckversionforresetdata_time, 'second'));
        cLog(() => { console.log('recheckVersionForResetData', _second, 'second'); });

        var _fetch_compare = () => {
            if(window._once_recheckversionforresetdata > 0) return false;
            window._once_recheckversionforresetdata = 1;
            getValueByKeyInSheetname(key = 'extension_ver_url', 'System' , (rs) => {
                if(rs) { 

                    // Start check
                    loadFetchText(rs, function(content){
                        cLog(() => { console.log('recheckVersionForResetData fetch', content); });

                        if(content) {
                            if(vers = Number(content)) {
                                cLog(() => { console.log('recheckVersionForResetData vers', vers); });

                                var _key = 'cdtx_ver_extremote';
                                getChromeStorage(_key, (response) => {
                                    _ver_storage = response.value || 0;
                                    
                                    cLog(() => { console.log('recheckVersionForResetData compare', vers, _ver_storage); });
                                    if(vers != _ver_storage) {

                                        // 0 clear

                                        // 1 sync

                                        // 2 save
                                        setChromeStorage(_key, vers, (response) => {
                                            cLog(() => { console.log('recheckVersionForResetData save done', vers); });                                    
                                        })
                                    }
                                });
                            }
                        }
                    });

                    // END
                     
                }
            });
        }
        
            if(window._once_recheckversionforresetdata == 0) {
                _fetch_compare(); 
            }

        if(_second > (10 * 60)) {
            window._once_recheckversionforresetdata = 0;
            window._once_recheckversionforresetdata_time = new Date();
            _fetch_compare();
        }
        // Compare width storage
}

var addShortCutBtn = () => {
    var _panel_addshortcutbtn = document.querySelector(".dock-container._panel_btnshortcut");
    if(!_panel_addshortcutbtn) {
        var dock_container = document.querySelector(".dock-container");
        if(dock_container) {
            var strhtml = `<div class="dock-container _panel_btnshortcut"></div>`;
            
            var dock_container_add = _TrustScript(strhtml);
            // // Open
            // document.querySelector('[data-btnaction="openmain"]').click();
            dock_container.insertAdjacentHTML("afterEnd", dock_container_add);
        }
        
    }
};


function sAddPrecallNote() {
    var _casenote = `.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top[card-type="case-note"]`;
    var _casenote_editor = _casenote + ` .editor[contenteditable="true"]`;
    var _casenote_precall = _casenote + ` #pre-call`;
    

    var ntime = 0;
    var myTime = setInterval(() => {

        if(document.querySelector(_casenote)) {
            console.log('cdtx - log 1')
            if(document.querySelector(_casenote + ` #cdtx__precallbtn`)) {
                console.log('cdtx - log 2')
                _casenote_precall = _casenote + ` #cdtx__precallbtn`;   
            }
            if(document.querySelector(_casenote_precall)) {
                console.log('cdtx - log 3')
                document.querySelector(_casenote_precall).click();

                if(document.querySelector(_casenote_editor).innerText.trim() !== "") {
                    
                    clearInterval(myTime);
                }
            }
        } else {
            if(!document.querySelector('material-fab.case-note')) {
                console.log('cdtx - log 1')
                document.querySelector("material-fab-speed-dial").dispatchEvent(new Event('mouseenter')); 
                if(document.querySelector('material-fab.case-note')) {
                    document.querySelector("material-fab-speed-dial").dispatchEvent(new Event('mouseenter')); 
                    document.querySelector('material-fab.case-note').click();
                }
            } else {
                console.log('cdtx - log 1.2')
                document.querySelector('material-fab.case-note').click();
            }
        }

        if(ntime > 10) {
            clearInterval(myTime);
        }
        ntime++;
        
    }, 500);
}














