function jp_tagTeamTDCXLoad() {

    // Libs
        // Toastify
        !function(t){var i=function(t){return new i.lib.init(t)};i.lib=i.prototype={toastify:"0.0.1",constructor:i,init:function(t){return t||(t={}),this.options={},this.options.text=t.text||"Hi there!",this.options.duration=t.duration||3e3,this.options.selector=t.selector,this.options.class=t.class || "",this.options.callback=t.callback||function(){},this},buildToast:function(){if(!this.options)throw"Toastify is not initialized";var t=document.createElement("div");return t.className="_panel_toastify on " + this.options.class,t.innerHTML=this.options.text,t.addEventListener("click",this.options.callback),t},showToast:function(){var t,o=this.buildToast();if(!(t=void 0===this.options.selector?document.body:document.getElementById(this.options.selector)))throw"Root element is not defined";return t.insertBefore(o,t.firstChild),i.reposition(),window.setTimeout((function(){o.classList.remove("on"),window.setTimeout((function(){o.remove(),i.reposition()}).bind(this),400)}).bind(this),this.options.duration),this}},i.reposition=function(){for(var t=15,i=document.getElementsByClassName("_panel_toastify"),o=0;o<i.length;o++){var n=i[o].offsetHeight;i[o].style.top=t+"px",t+=n+15}return this},i.lib.init.prototype=i.lib,t.Toastify=i}(window);
    
    // Variable    
    var hashchange_once = hashchange_once || false;

    // Gửi đi từ FE
    let location_href = window.location.href;
        time = +new Date(),
        _datatemp = {},
        dataStatus = {
            case_lastupdate: 0,
            case_list: []
        },

    panel_div = document.querySelector("#_panel_div"),
    draggie = null;

    var _global_status = {
        "test": false
    };

    window.tagteamoption = {};

    // ?test
    if(window.location.search.includes("test")) {
        _global_status.test = true;
    }
    
    // ?rmkey
    if(window.location.search.includes("rmkey")) {
        var _key = window.location.search.split("=")[1];
        removeChromeStorage(_key, () => {

            const url = new URL(window.location);
            url.searchParams.delete('rmkey');
            window.history.pushState({}, '', url);

            Toastify({
                text: `Remove ${_key} success`,
                duration: 3000,
                callback: function(){
                    this.remove();
                }
            }).showToast();

        });    
    }
    
    chrome.storage.sync.get({ 
        mycountry: 'Thailand',
        ouremail: 'xxx@google.com', 
        myInjector: 'gtm-xxx',
        gtmToDo: 'notStart',
        optionkl__modecase: "Your shortname",
        optionkl__inputyourshortname: "Your shortname",
        optionkl__inputyourname: "Your name",
        optionkl__disable_dialog: false,
        optionkl__disable_focuscase: false,
        optionkl__disable_autofixemail: false,
    }, function (result) {
        window.tagteamoption.optionkl__modecase = result.optionkl__modecase;
        window.tagteamoption.optionkl__inputyourshortname = result.optionkl__inputyourshortname;
        window.tagteamoption.optionkl__inputyourname = result.optionkl__inputyourname;
        window.tagteamoption.optionkl__disable_dialog = result.optionkl__disable_dialog;
        window.tagteamoption.optionkl__disable_focuscase = result.optionkl__disable_focuscase;
        window.tagteamoption.optionkl__disable_autofixemail = result.optionkl__disable_autofixemail;
    });

    // ============
    // FUNCTION
    // ============
    

        // Validate Case
        function validationCase(_datatemp = {}) {

            // For cases connect
            if(window.location.hostname === "cases.connect.corp.google.com" && window.location.href.indexOf("#/case/") > - 1) {
                if(_datatemp.am_isgcc_external) {
                    noteBarAlert('Is GCC / External', _datatemp.case_id);
                    var elminputbcc = document.querySelector("email-address-input.bcc");
                    if(elminputbcc) {
                        elminputbcc.classList.add("isgcc");
                    }
                }
            
                
                // Check email 
                cLog(() => {console.log("checkInputEmailInboxAndFix 1"); });
                checkInputEmailInboxAndFix();
            }
        }

        // Noted
        function notedByCase(_datatemp = {}) {
            var lst_notification = '';
            
            if(_datatemp.am_isgcc_external) {
                lst_notification +=`<p class="_panel__notification_alert">Is GCC / external?</p>`;
                var elminputbcc = document.querySelector("email-address-input.bcc");
                if(elminputbcc) {
                    elminputbcc.classList.add("isgcc");
                }
            }

            const staticHtmlPolicyv2 = trustedTypes.createPolicy(
                'foo-static', {createHTML: () => lst_notification});
            panel_div.querySelector("._panel__notification").innerHTML = staticHtmlPolicyv2.createHTML('');
        }
        

        // innerText Case
        function loadInfoCaseInnerTextElm (_panel, name, _value) {
            try {

                // Input text, input date, textarea
                _panel.querySelectorAll(`
                    [type="text"][name="${name}"], 
                    [type="datetime-local"][name="${name}"], 
                    textarea[name="${name}"]`
                ).forEach(function(elm){
                    elm.value = _value;
                });
                
                // div, span
                _panel.querySelectorAll('[data-infocase="' + name + '"]').forEach(function(elm){
                    elm.innerText = _value;
                });
                _panel.querySelectorAll('[data-infocase_capitalize="' + name + '"]').forEach(function(elm){
                    elm.innerText = capitalizeFirstLetter(_value);
                });
                
                _panel.querySelectorAll('[data-infocase_link="' + name + '"]').forEach(function(elm){
                    elm.setAttribute("href", _value);
                });

                // checkbox
                var _value_option = _value.split("\n")[0].trim();
                _panel.querySelectorAll('input[type="checkbox"][name="' + name + '"][value="' + _value_option + '"]').forEach(function(elm){
                    elm.checked = true;
                });

                _value_option = _value.split("\n")[0].trim();
                _panel.querySelectorAll(`select[name="${name}"] > option[value="${_value_option}"]`).forEach(function(elm){
                    elm.selected = true;
                });
            } catch (error) {
                console.log(error)
            }
        }


        var saveCase2Storage = (formDataObj, _callback) => {
            // ID trust
            
            if(formDataObj.case_id) {   
                if(getOnlyCaseId(formDataObj.case_id)) {   

                    // Save
                    var _time = +new Date();
                    var case_id = formDataObj.case_id;
                    dataStatus.cdtx_lastupdate = _time;

                    setChromeStorage('cdtx_datastatus', dataStatus);
                    setChromeStorage('cdtx_lastupdate', _time);
                    setChromeStorage('cdtx_lastupdate_caseid', case_id);
                    setChromeStorage('cdtx_caseid_' + case_id, formDataObj, _callback);
                }
            }
        }

        
        var saveSettings2Storage = (formDataObj, _callback) => {

            // Save
            var _time = +new Date();
            dataStatus.cdtx_lastupdate = _time;

            setChromeStorage('cdtx_datastatus', dataStatus);
            setChromeStorage('cdtx_lastupdate', _time);
            setChromeStorage('cdtx_settings', formDataObj, _callback);

        }

// ===============================================


 // Is Ready Connect Case
    function isReadyBasic(_callback, _n_once = 0) {
        var n_time_dkneed = 0,  
            n_time_dkneed_compare = 0;
        var is_ready = () => {
            if(n_time_dkneed_compare < n_time_dkneed) return;
            _callback();
        }
        
        n_time_dkneed++;
        wait4Elem('[debug-id="case-id"] .case-id').then(function (elm) {
            if(location.hash.includes(elm.innerText) === false) {
                if(_n_once < 3) {
                    setTimeout(() => {
                        isReadyBasic(_callback, _n_once + 1);
                    }, 1000)
                }
            } else {
                is_ready(n_time_dkneed_compare++);
                cLog(() => {console.info(n_time_dkneed_compare , '=' , n_time_dkneed, '--- [debug-id="case-id"] .case-id bassic')});
            }
        });
        
        // has cuf-form-field
        n_time_dkneed++;
        wait4Elem("cuf-form-field").then(function () {
            is_ready(n_time_dkneed_compare++);
            cLog(() => {console.info(n_time_dkneed_compare , '=' , n_time_dkneed, '--- cuf-form-field - bassic')});
        });

        // has caseview
        n_time_dkneed++;
        wait4Elem(".case-log-container.active-case-log-container case-message-view").then(function () {
            is_ready(n_time_dkneed_compare++);
            cLog(() => {console.info(n_time_dkneed_compare , '=' , n_time_dkneed, '--- case-message-view - bassic')});
        });

        
        n_time_dkneed++;
        wait4Elem("#read-card-tab-panel-case-log .case-log-container.active-case-log-container .activities > div").then((elm1) => {    
            is_ready(n_time_dkneed_compare++);
            document.querySelector('[debug-id="dock-item-case-log"]').click();
            document.querySelector('[debug-id="dock-item-home"]').click();
            cLog(() => {console.info(n_time_dkneed_compare , '=' , n_time_dkneed, '--- click open tab case-log')});
            
        })
    }
    

// Load Data Status Case List
    function loadDataStatusCaseList(_callback) {
        // Get Case List
        // 1. load all

        chrome.storage.local.get(null, function(results) {
            dataStatus.case_list = [];
            for (let key in results) {
                // 2. load only caselist
                if(key.includes("cdtx_caseid_")) {
                    dataStatus.case_list.push(results[key]);
                }
            }

            // Load case
            _callback();
        });
    }



// =============
// loadInfoSettingsInnerTextElm
// =============

    // innerText Settings
    function loadInfoSettingsInnerTextElm (_panel, name, _value) {
        try {

            // Input text, input date, textarea
            _panel.querySelectorAll(`
                [data-infosetting][type="text"][name="${name}"], 
                [data-infosetting][type="datetime-local"][name="${name}"], 
                textarea[data-infosetting][name="${name}"]`
            ).forEach(function(elm){
                elm.value = _value;
            });
            
            // div, span
            _panel.querySelectorAll('[data-infosetting="' + name + '"]').forEach(function(elm){
                elm.innerText = _value;
            });
            
            
            _panel.querySelectorAll('[data-infosetting_link="' + name + '"]').forEach(function(elm){
                elm.setAttribute("href", _value);
            });

            // checkbox
            var _value_option = _value.split("\n")[0].trim();
            _panel.querySelectorAll('input[data-infosetting][type="checkbox"]').forEach(function(elm){
                if(elm.getAttribute("name") === name && elm.getAttribute("value") === _value ) {
                    elm.checked = true;
                }
            });

            _value_option = _value.split("\n")[0].trim();
            _panel.querySelectorAll(`select[data-infosetting][name="${name}"] > option[value="${_value_option}"]`).forEach(function(elm){
                elm.selected = true;
            });

        } catch (error) {
            console.log(error)
        }
    }

    
// =============
// loadInputSettingss
// =============
    function loadInputSettings(_panel) {
        
        getChromeStorage('cdtx_settings', (response) => {
            var _datatemp = response.value || false;
            window.dataTagTeamSettings = response.value || false;
            // Load
            var _object = {};
            if(_datatemp) {
                _object = _datatemp;
            }

                // STEP 1: Load object to element 
                
            if(_datatemp !== false) {
                _panel.querySelectorAll('input[data-infosetting][type="checkbox"]').forEach(function(elm){
                    elm.checked = false;
                });
            }

            for (const property in _object) {
                // console.log(`${property}: ${_object[property]}`);

                loadInfoSettingsInnerTextElm(_panel, `${property}`, `${_object[property]}`);
            }

            
            // Overwrite
            // your name, your shortname
                _panel.querySelectorAll('[data-infosetting="your-shortname"]').forEach(function(elm){
                    elm.innerText = window.tagteamoption.optionkl__inputyourshortname;
                });
                _panel.querySelectorAll('[data-infosetting="your-name"]').forEach(function(elm){
                    elm.innerText = window.tagteamoption.optionkl__inputyourname;
                });
            // Other forcheckbox

            // loadInfoSettingsInnerTextElm(_panel, `${property}`, `${_object[property]}`);
        });
        
    }

// load_script_toolaction
    var load_script_toolaction = () => {
        panel_div.querySelectorAll(`[data-btntoolaction]`).forEach(function(elm) {
            elm.addEventListener('click', function(e){
                var _action = this.getAttribute("data-btntoolaction");
                panel_div.setAttribute("data-btntoolaction_status", _action);
                
                // open main
                if(_action === 'extract_gtm_id') {
                    tagteam_showGTMID();
                }
            });
        });
    };
    
// Function
    // ====
    // Auto Resize Textarea
    // ====
    function textareaAutoResize(_class, _elm){
        panel_div.querySelectorAll(`textarea.autoresize`).forEach(function(elm){
            elm.addEventListener('click', function() {
                textAreaAdjust(this);
            }, false);
            
            elm.addEventListener('input', function() {
                textAreaAdjust(this);
            }, false);
            

            // clearInterval(timerId);
            // timerId = setInterval((elm) => {
            //     if(elm.value) {
            //         textAreaAdjust(elm);
            //         console.log(333)
            //         console.log(elm);
            //         console.log(timerId);
            //         clearInterval(that.timerId);
            //     }
            // }, 1000)
            // (function (elm) {
            //     return setInterval(function () { 
            //         textAreaAdjust(elm);
            //     }, 1000);
            // })(i);
            
        });
    }


    // =====
    // clearInput
    // =====
    function clearInput(){
        // STEP 0: Empty
        // div, span
        panel_div.querySelectorAll('[data-infocase]').forEach(function(elm){
            elm.innerText = "";
        });
        
        var formThis = panel_div.querySelector("#formCase");
        formThis.reset();
    }


// ===
// ACTION
// ===
    var load_script_action = () => {
                
        onClickElm('[data-btnaction]', 'click', function(elm, e){
            try {
                var _action = elm.getAttribute("data-btnaction");
                cLog(() => { console.log('cdtx', _action); })


                panel_div.setAttribute("data-btnaction_status", _action);
            
                // open main
                if(_action === 'openmain') {
                    // 1. openmain
                        panel_div.classList.remove("hide_main");
                        document.documentElement.classList.remove("_hide_main");
                        panel_div.querySelector('[data-panel="openmain"]').classList.add("active");
                        
                    // 2. openmain
                        setChromeStorage('cdtx_hidepanel-' + location.hostname, true , () => {
                            // Empty
                        });
                }

                // open main
                if(_action === 'toggleopenmain_withoutsave') {
                    // 1. open main
                        toggleClass("hide_main", panel_div)
                        toggleClass("_hide_main", document.documentElement)

                }
                
                // opentoolbar
                if(_action === 'opentoolbar') {
                    // 2. opentoolbar
                        setChromeStorage('cdtx_hidetoolbar-' + location.hostname, toggleClass("hide_toolbar", panel_div) , () => {
                            // Empty
                        });
                }
                
                // emailtemplate
                if(_action === 'openemailtemplate' ||
                    _action === 'hide_panel-emailtemplate') {
                    // 2. Click Step2step _panel_emailtemplate
                    
                        toggleClass("active", document.querySelector('._panel_emailtemplate'));

                        // document.querySelector('[data-btnaction="openmain"]').click();
                        // document.querySelector('[data-btnaction="email-template"]').click();
                        
                }

                
                // emailtemplate
                if(_action === 'crawl_case') {
                    console.log("crawl_case")
                    // 2. Click Step2step
                    unmark_all_and_crawl(() => {
                        cLog(() => {console.log('crawl_case')});
                    });
                        
                }
                

                // opentiptutorial
                if(_action === 'opentiptutorial') {
                    // 2. Save
                    toggleClass("hide_opentiptutorial", panel_div);
                    
                    var _blogs = panel_div.querySelector("._panel__blogs.empty");
                    if(_blogs) {
                        
                        panel_div.classList.add('is-progress');

                        load_fetch_content(window.dataTagteam.api_blog, (response) => {

                            if(response.body) {
                                var itemLi = '';
                                response.body.forEach((item) => {
                                    itemLi += `<div data-blogs>`;
                                    if(item.image) {
                                        itemLi += `<div data-blogs_image style='background-image: url("${item.image}")'></div>`;
                                    }
                                    itemLi += `<div data-blogs_title>${item.title}</div>`;
                                    itemLi += `<div data-blogs_content_expect>${item.content_expect}</div>`;
                                    itemLi += `<div data-blogs_content>${item.content}</div>`;
                                    itemLi += `<div data-blogs_expand>Expand</div>`;
                                    itemLi += `</div>`;
                                });
                                _blogs.innerHTML = itemLi;

                                panel_div.querySelectorAll(`[data-blogs_expand]`).forEach(function(elm){
                                    elm.addEventListener('click', function(ev) {
                                        var elmblogs = this.closest('[data-blogs]');
                                        toggleClass("full", elmblogs);
                                    }, false);
                                });
                                
                                panel_div.querySelector('#_panel__blogs-search').addEventListener("keyup", (e) => {
                                    var _search = panel_div.querySelector('#_panel__blogs-search').innerText.toLowerCase();
                                    panel_div.querySelectorAll('[data-blogs]').forEach((elm) => {
                                        // elm
                                        elm.hidden = true;
                                        if(elm.innerText.toLowerCase().includes(_search)) {
                                            elm.hidden = false;
                                        }
                                    });
                                });
                            }


                            // All OK => remove class empty
                            _blogs.classList.remove('empty');
                            panel_div.classList.remove('is-progress');

                        });
                    }
                        // getChromeStorage('cdtx_opentiptutorial-date', () => {
                        //     // Empty
                            
                        //     setChromeStorage('cdtx_opentiptutorial-date', '' , () => {
                        //         // Empty
                        //     });
                        // });
                }
                
                // opensetting
                if(_action === 'opensetting') {
                    // 2. Save
                        setChromeStorage('cdtx_opensetting-' + location.hostname, toggleClass("hide_opensetting", panel_div) , () => {
                            toggleClass("active", panel_div.querySelector('[data-panel="opensetting"]'));
                        });
                }
                
                // opensetting
                if(_action === 'firstemail') {
                    // 2. Save
                    // window.dataTagteam.sendFirstEmail();
                    panel_div.querySelector(`[data-btnaction="emailtemp__insert1stemail"]`).click();
                }
                
                // open tip and tutorial
                if(_action === 'open tip and tutorial') {
                    // 1. Remove class
                        panel_div.classList.remove("hide_tiptutorial");

                    // 2. Save
                        setChromeStorage('cdtx_hidetiptutorial-' + location.hostname, true , () => {
                            // Empty
                        });
                }

                if(_action === 'pushto_casesummary') {
                    var case_sumary = document.querySelector('material-input[debug-id="case-summary-input"] textarea');
                    if(case_sumary && location.host.includes('cases.connect.corp.google.com')) {
                        case_sumary.value = new Date(panel_div.querySelector('input[name="meeting_time"]').value).toLocaleDateString('en-GB') + " " + panel_div.querySelector('textarea[name="note"]').value;
                        case_sumary.dispatchEvent(new Event('input'));
                    }
                }

                // Case pin
                if(_action === 'case_pin') {
                    var case_id = panel_div.querySelector('[name="case_id"]').value;
                    case_id = getOnlyCaseId(case_id);
                    if(case_id) {
                        setChromeStorage('cdtx_casecurrent', case_id , (response) => {
                            dataStatus.cdtx_casecurrent = case_id;
                            
                            Toastify({
                                text: 'Have PIN case',
                                duration: 3000,
                                class: "success",
                                callback: function(){
                                    this.remove();
                                }
                            }).showToast();
                        });
                    }
                }

                if(_action === 'hide_panel') {
                    // 1. Add class
                        panel_div.classList.add("hide_main");
                        document.documentElement.classList.add("_hide_main");
                    
                        document.documentElement.classList.remove("email_template");
                        document.documentElement.classList.remove("mainpanel_template");
                        
                    // 2. Save
                        setChromeStorage('cdtx_hidepanel-' + location.hostname, false , () => {
                            // Empty
                        });
                }
                

                // toggle_minisize_panel
                if(_action === 'toggle_minisize_panel') {
                    
                    setChromeStorage('cdtx_minisize-' + location.hostname, toggleClass("minisize", panel_div) , () => {
                        // Empty
                    });
                }

                // toggle_minisize_panel
                if(_action === 'toggle_panel_darkmode') {
                    
                    setChromeStorage('cdtx_setting-darkmode', toggleClass("_panel_darkmode", panel_div) , () => {
                        // Empty
                    });
                }



                if(_action === 'close_panel') {
                    document.documentElement.classList.remove("email_template");
                    document.documentElement.classList.remove("mainpanel_template");
                    
                    
                    if(panel_div.querySelector('[data-panel="main"]').classList.contains("active")) {
                        this.closest("[data-panel]").classList.remove("active");
                        if(this.closest('[data-panel="list-case"]')) {
                            if(panel_div.classList.contains("list-case__active")) {
                                panel_div.classList.remove("list-case__active");
                            }
                        }
                    } else {
                        toggleClass("hide_main", panel_div)
                        toggleClass("_hide_main", document.documentElement)
                        toggleClass("active", panel_div.querySelector('[data-panel="main"]'));
                    }
                }

                if(_action === 'loadscript') {
                    var _panel_elm = panel_div.querySelector(`[data-panel="script-reading"]`);
                    toggleClass("active", _panel_elm);
                }

                if(_action === 'email-template') {
                    var _panel_elm = panel_div.querySelector(`[data-panel="email-template"]`);
                    toggleClass("active", _panel_elm);
                }

                if(_action === 'list-case') {
                    var _panel_elm = panel_div.querySelector(`[data-panel="list-case"]`);
                    toggleClass("active", _panel_elm);
                    toggleClass("list-case__active", panel_div);
                }

                if(_action === 'form-case') {
                    var _panel_elm = panel_div.querySelector(`[data-panel="form-case"]`);
                    toggleClass("active", _panel_elm);
                }
            } catch (error) {
                
            }
        });
    }


function activeListCase(caseid){
    panel_div.querySelectorAll('[data-caseid]').forEach((elm)=>{
        
        if(elm.getAttribute('data-caseid') == caseid) {
            elm.classList.add("active");
        } else {
           elm.classList.remove("active");
       }
    });
}

// =============
// loadInputCase
// =============
function loadInputCase(_panel, _datatemp, _isvalidate = true) {
    window.dataTagteam.current_case = window.dataCase;
    clearInput();
    
    // Add noted to panel div
    notedByCase(_datatemp);

    
    // active item in list
    activeListCase(_datatemp.case_id);
    
    // Validation
    if(_isvalidate) {
        validationCase(_datatemp);
    }

    // Hide Process bar
    panel_div.classList.remove('is-progress');
    
    // Set Attribute
    panel_div.setAttribute("data-drive", JSON.stringify(_datatemp));
    
    // Load
    var _object = {};
    if(_datatemp) {
        _object = _datatemp;
    }


    
    // STEP 1: Load object to element 
    for (const property in _object) {
        // console.log(`${property}: ${_object[property]}`);

        loadInfoCaseInnerTextElm(_panel, `${property}`, `${_object[property]}`);
    }

    // STEP 2: Special display
    _panel.querySelector('[data-infocase_link="case_id"]').setAttribute("href", "https://cases.connect.corp.google.com/#/case/" + _datatemp.case_id);
    _panel.querySelector('[data-infocase_link="customer_ocid"]').setAttribute("href", "https://adwords.corp.google.com/aw/overview?ocid=" + _datatemp.customer_ocid);
    
    //Format date
    // alert(new Date(_datatemp.meeting_time).toLocaleDateString('en-GB'));
    // _panel.querySelector('[data-infocase="local_format_meeting_time"]').innerText = new Date(_datatemp.meeting_time).toLocaleDateString('en-GB')
    
    loadInfoCaseInnerTextElm(_panel, 'local_format_meeting_time', new Date(_datatemp.meeting_time).toLocaleDateString('en-GB'));
    

    // Link
    _panel.querySelector('[data-infocase="customer_website"]').setAttribute("href", _datatemp.customer_website);


    loadInfoCaseInnerTextElm(_panel, 'am_isgcc_external', '---');
    _panel.querySelector(`[data-panel="script-reading"]`).setAttribute('data-isgcc', '0');
    if(_datatemp.am_isgcc_external) {
        loadInfoCaseInnerTextElm(_panel, 'am_isgcc_external', 'GCC');
        _panel.querySelector('[name="am_isgcc_external"]').checked = true;
        _panel.querySelector(`[data-panel="script-reading"]`).setAttribute('data-isgcc', '1');
    }

    if(_datatemp.qlus_status) {
        loadInfoCaseInnerTextElm(_panel, 'qlus_status', _datatemp.qlus_status);
        _panel.querySelector(`[data-panel="email-template"]`).setAttribute('data-qlus_status', _datatemp.qlus_status);    
    }

    if(_datatemp.est_setup) {
        loadInfoCaseInnerTextElm(_panel, 'est_setup', _datatemp.est_setup);
    }

    if(_datatemp.customer_adsid) {
        loadInfoCaseInnerTextElm(_panel, 'customer_adsid_format', reformatAdsId(_datatemp.customer_adsid));
        wait4Elem('._panel_shortcut_gearloose_vanbo').then(function (elm) {
            if(elm) {
                elm.setAttribute("href", 'https://gearloose2.corp.google.com/#/search/merchants?q=awid:' + reformatAdsId(_datatemp.customer_adsid));
                elm.style.display = "";
            }
        });
    }

    // Remove new line tasks - nowrap
    if(_datatemp.tasks) {
        loadInfoCaseInnerTextElm(_panel, 'tasks_nowrap', _datatemp.tasks.trim().replace("\n", ", "));
    }
    

    // STEP 3: Load condition to script reading
    _panel.querySelector('._panel__script');
}
// ======
// loadCaseList
// ======
function loadCaseList(elm_caselist){
    cLog(() => {console.log("loadCaseList")});
    var case_list = dataStatus.case_list;
    elm_caselist.innerHTML = _TrustScript("");
    
    // Sort
    case_list.sort((a, b) => (a.meeting_time < b.meeting_time) ? 1 : ((b.meeting_time < a.meeting_time) ? -1 : 0));

    // Display
    var once_todaystr = true;
    case_list.forEach(function(item){

        // Time
        const date1 = new Date();
        const date2 = new Date(item.meeting_time);
        const diffTime = (date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const date1date = date1.getDate(); 
        const date1month = date1.getMonth() + 1; 
        const date1year = date1.getFullYear(); 
        const date1fullnum = +`${date1year}${date1month}${date1date < 10 ? "0" + date1date : date1date}`;
        const date2date = date2.getDate(); 
        const date2month = date2.getMonth() + 1; 
        const date2year = date2.getFullYear(); 
        const date2fullnum = +`${date2year}${date2month}${date2date < 10 ? "0" + date2date : date2date}`;

        const is_today = date1fullnum === date2fullnum;
        const str_today = is_today ? "Today" : "";

        var itemstr = "";
        if(once_todaystr) {
            if(date2fullnum < date1fullnum) {
                itemstr += `<li data-titletoday="Today ${date1date}/${date1month}" ></li>`;
                once_todaystr = false;
            }
        }

        itemstr += `<li data-caseid="${item.case_id}" class="${item.case_id === dataStatus.case_current ? 'active': ''} ${(item.qlus_status ? '_has_qlus_status' : "")}">
            <span>${item.case_id} - <small>${item.customer_name}(${item.customer_gender})</small> </span>
            <span class="_bottom">
                ${(item.qlus_status ? '<small class="_qlus_status" data-status="' + item.qlus_status + '">' + item.qlus_status + '</small>' : "")}
                ${(item.assignee ? '<small class="_assignee">' + item.assignee + '</small>' : "")}
                ${'<small class="_meeting_time" data-status="' + str_today + '">' + (!is_today?  date2date + "/" + date2month : "Today")  + '</small>'}
            </span>
            <span class="_right">
                ${'<small data-action="remove_case" >Delete</small>'}
            </span>
        </li>`;

        const staticHtmlPolicyv2 = trustedTypes.createPolicy('foo-static', {createHTML: () => itemstr}); 
        elm_caselist.insertAdjacentHTML("beforeEnd", staticHtmlPolicyv2.createHTML(''));
    });

    
    var lst_caseid = elm_caselist.querySelectorAll("[data-caseid]");
    lst_caseid.forEach(function(elm){
        elm.addEventListener("click", function(e){
            const _caseid = this.getAttribute("data-caseid");

            loadDataStatusCaseList(() => {
                var caseload = loadCaseDatabaseByID(_caseid);
                if(caseload) {
                    cLog(() => { console.log('loadInputCase | 2', caseload); })
                    loadInputCase(panel_div, caseload, false);
                    
                    elm_caselist.querySelectorAll("[data-caseid]").forEach(function(_elm){
                        _elm.classList.remove("active");
                    });
                    this.classList.add("active");
                }
            });

        });
    });

    var lst_caseid = elm_caselist.querySelectorAll("[data-action]");
    lst_caseid.forEach(function(elm){
        elm.addEventListener("click", function(e){
            const itemelm = this.closest('li[data-caseid]');
            const _caseid = itemelm.getAttribute("data-caseid");
            const _type = elm.getAttribute("data-action");

            if(_type === "remove_case") {
                if (confirm("You sure remove case: " + _caseid)) {
                    const formData = new FormData();
                    formData.append('action', "remove_case");
                    formData.append('case_id', _caseid);

                    removeChromeStorage("cdtx_caseid_" + _caseid, function(){
                        itemelm.remove();
                            
                        Toastify({
                            text: 'Removed: ' + _caseid,
                            duration: 3000,
                            callback: function(){
                                this.remove();
                            }
                        }).showToast();
                    });
                } 

            }
            
        });
    });
}


// Is Ready Connect Case
function is_readycaseconnect(_callback) {
                
    var n_time_dkneed = 0,  
        n_time_dkneed_compare = 0;
    var is_ready = () => {
        if(n_time_dkneed_compare < n_time_dkneed) return;
        _callback();
    }

// 2.1
    n_time_dkneed++;
    wait4Elem("cuf-form-field").then(function () {
        is_ready(n_time_dkneed_compare++);
        cLog(()=>{console.info(n_time_dkneed_compare , '=' , n_time_dkneed, '--- cuf-form-field');});
    });
    
    n_time_dkneed++;
    wait4Elem('[debug-id="case-id"] .case-id').then(function () {
        is_ready(n_time_dkneed_compare++);
        cLog(()=>{console.info(n_time_dkneed_compare , '=' , n_time_dkneed, '--- [debug-id="case-id"] .case-id');});
    });

    // n_time_dkneed++;
    wait4Elem("#read-card-tab-panel-case-log .case-log-container.active-case-log-container .activities > div").then((elm1) => {    
        document.querySelector('[debug-id="dock-item-case-log"]').click();
        document.querySelector('[debug-id="dock-item-home"]').click();

        document.querySelectorAll('#read-card-tab-panel-case-log .case-log-container.active-case-log-container .activities > div').forEach(function(elm){
            if(elm.innerText.includes('Review case in Connect Sales')) {            
                // console.log(elm.querySelector("table"))

                elm.querySelector('case-message-view .message-content-container-full').click();
            
                wait4Elem("#read-card-tab-panel-case-log .case-log-container.active-case-log-container .activities > div table tr").then( (elm2) => {
                    // is_ready(n_time_dkneed_compare++);
                    console.info(n_time_dkneed_compare , '=' , n_time_dkneed, '--- message-content-container-full');

                    
                })
            }
        });

        // Recheck pre call?
        // Is Precall?
        if(window.location.hostname === "cases.connect.corp.google.com" && window.location.href.indexOf("#/case/") > - 1) {
            var is_precall = false;
            document.querySelectorAll(".case-log-container.active-case-log-container case-message-view").forEach(function(elm){
                if(elm.innerText.includes("Emails or feedback from Advertiser")) {
                        is_precall = true;
                }
            });
            
            if(is_precall === false) {
                Toastify({
                    text: 'Not Precall',
                    duration: 6000,
                    class: "error",
                    callback: function(){
                        this.remove();
                    }
                }).showToast();
            }
        }
    });

    
    // n_time_dkneed++;
    // wait4Elem('contact-email-field').then(function () {
    //     is_ready(n_time_dkneed_compare++);
    //     console.info(n_time_dkneed_compare , '=' , n_time_dkneed, '--- contact-email-field');
    // });

    // n_time_dkneed++;
    // wait4Elem('case-message-view').then(function () {
    //     is_ready(n_time_dkneed_compare++);
    //     console.info(n_time_dkneed_compare , '=' , n_time_dkneed, '--- case-message-view');
    // });
    
    // n_time_dkneed++;
    // wait4Elem('home-data-item').then(function () {
    //     is_ready(n_time_dkneed_compare++);
    //     console.info(n_time_dkneed_compare , '=' , n_time_dkneed, '---home-data-item');
    // });
    
    // n_time_dkneed++;
    // wait4Elem('contact-info').then(function () {
    //     is_ready(n_time_dkneed_compare++);
    //     console.info(n_time_dkneed_compare , '=' , n_time_dkneed, '---contact-info');
    // });
    
    // n_time_dkneed++;
    // wait4Elem('internal-user-info').then(function () {
    //     is_ready(n_time_dkneed_compare++);
    //     console.info(n_time_dkneed_compare , '=' , n_time_dkneed, '---internal-user-info');
    // });
}
    

//Load case
function loadCase(elm) {
    
    if((window.location.hostname === "cases.connect.corp.google.com" && window.location.href.indexOf("#/case/") > - 1) ) {
        
        // Case ID
        var sLoadCase = function(n_time_recall = 0) {
            isReadyBasic(() => {
                var _caseid = document.querySelector(".case-id").innerText;
                if(location.hash.includes(_caseid) === false) {
                    
                    cLog(() => {console.log("1. case id != hash")})
                    var myTimeLoadCase = setTimeout(() => {
                        n_time_recall = n_time_recall + 1;
                        cLog(() => {console.log("1.2 rerun sLoadCase | ntime", n_time_recall)})
                        sLoadCase(n_time_recall);
                    }, 1500);
                    
                    if(n_time_recall > 10) {
                        cLog(() => {console.log("1.3 n_time_recall limit Clear case id != hash")})
                        clearTimeout(myTimeLoadCase);
                    }

                    return false;
                }

                
                
                var caseload = loadCaseDatabaseByID(_caseid);
                
                cLog(() => {console.log("2. case id === hash => OK | ntime", _caseid, caseload, n_time_recall)})
                
                
                if(caseload) {
                    cLog(() => {console.log("1. Has Data ========="); })
                    cLog(() => { console.log('loadInputCase | 3', caseload); })
                    loadInputCase(elm, caseload);



                    // Change status btn
                    panel_div.querySelector('#formCase [action="save"]').innerText = "SAVED";
                    panel_div.querySelector('#formCase [action="save"]').classList.remove("_panel_btn--success");

                } else {
                    Toastify({
                        text: 'NEW!!!! This case is new',
                        duration: 3000,
                        class: "success",
                        callback: function(){
                            this.remove();
                        }
                    }).showToast();

                    // is_readycaseconnect(() => {
                        // unmark_all_and_crawl();
                        cLog(()=>{console.log('_caseid', _caseid)})

                    //     // Show Input
                    //     if(document.querySelector('[debug-id="target-input"]')) {
                    //         document.querySelector('[debug-id="target-input"]').dispatchEvent(new Event("mouseover"));
                                            
                    //         wait4Elem('target-item .value').then(function () {                                            
                    //             var ads_id = document.querySelector("target-item .value").innerText;
                    //             if(document.querySelector('._panel_shortcut_gearloose_vanbo')) {
                    //                 document.querySelector('._panel_shortcut_gearloose_vanbo').setAttribute("href", 'https://gearloose2.corp.google.com/#/search/merchants?q=awid:' + reformatAdsId(ads_id));
                    //                 document.querySelector('._panel_shortcut_gearloose_vanbo').style.display = "";
                    //             }
                    //         });
                    //     }
                    // });


                    // Change status btn
                    panel_div.querySelector('#formCase [action="save"]').innerText = "FIRST SAVE";
                    panel_div.querySelector('#formCase [action="save"]').classList.add("_panel_btn--success");
                }


                // Open dial
                document.querySelector("material-fab-speed-dial").dispatchEvent(new Event('mouseenter'));
                // Close dial
                document.querySelector("material-fab-speed-dial").dispatchEvent(new Event('mouseleave'));

            });
        };
        
        // s1: load start
        wait4Elem(".case-id").then(function () {
            sLoadCase();
        });
        
        // s1: load by hash change once
        
            if(hashchange_once === false) {
                hashchange_once = true;
                window.addEventListener('hashchange', () => {
                    wait4Elem(".case-id").then(function () {
                        noteBarAlert("CLEAR");
                        cLog(() => {console.log("hashchange => sLoadCase | ")});
                        sLoadCase();
                    });
                }, false);
            }


        // Exit
        return true;
    }

    if(window.location.href.includes("calendar.google.com")) {
        // Exit

        // return true;
        // Set auto by checkbox
        document.addEventListener("readystatechange", (event) => {
            if(document.readyState === "complete") {
                function convertHour(time) {
  var hoursMinutes = time.split(/[.:]/);
  var hours = parseInt(hoursMinutes[0], 10);
  var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
  return hours + minutes / 60;
}
function detectTime()  {
    document.querySelectorAll('[id*="tsc"]').forEach(function(item){
        let date = item.innerText.split(',')[2].trim()
        let newDate = new Date(date)
        let today = new Date()
        if(newDate.getDate() == today.getDate()){
            let todayEvent = item.parentElement.querySelector('[role="presentation"]')
            todayEvent.querySelectorAll('[jslog]').forEach(function(evt){
                let caseTitle = evt.querySelector('.FAxxKc').innerText.match(/\d-\d+/g);
                if(caseTitle){
                    let timeApp = evt.querySelector('.YSbf0c div:nth-child(2)')
                    if(timeApp){
                        timeApp = timeApp.innerText
                    let ampm = timeApp.split(' – ')[1].match(/am|pm/);
                    let start = timeApp.split(' – ')[0]
                    start = start.match(/am|pm/) ? start : start + ampm
                    let newStart = start.match(/\d+:\d+/)
                    if(newStart) start = convertHour(newStart)
                    if(start.endsWith('am')){
                        start = start.split('am')[0]
                    } else if (start.endsWith('pm')) {
                        start = start.startsWith('12') ? +start.split('pm')[0] : +start.split('pm')[0]+12
                    }
                    console.log(start)
                    let tempDate = new Date()
                    tempDate.setHours(start-1)
                    tempDate.setMinutes(55)
                    tempDate.setSeconds(0)
                    events[caseTitle] = tempDate
                    }
                }
            })
            
        }
    })
    if(new Date().getHours() > 19) clearInterval(notifyTime)
}
function notifyTime(){
    let time = new Date()
    console.log(time)
    Object.keys(events).forEach(evt => {
        let nearEvent = events[evt]
        let caseid = evt
        if(nearEvent.getHours() == time.getHours() && nearEvent.getMinutes() == time.getMinutes()){
        console.log(caseid+' is comming')
            window.open('https://appointments.connect.corp.google.com/appointmentDetails?caseId='+caseid,
            'window',
            'fullscreen'
            );
        }
    })
    if(time.getHours() > 19) clearInterval(notifyTime)
}
var events = {};
var countEvent = setInterval(detectTime, 1000*60*15)
var notifyEvent = setInterval(notifyTime, 1000*60)

                var is_updatelist_link = () => {
                    getChromeStorage("cdtx_listmeetlink", (response) => {
                        console.log('0oook')
                        var casesmeet = response.value || {};
                        document.querySelectorAll('[jslog][data-eventid]').forEach(function(elm){
                            var jslog = elm.getAttribute('jslog');
                            var caseid = elm.innerText.match(/\d-\d+/g);
                            if(jslog){
                                var meetid = jslog.match(/\w{3}-\w{4}-\w{3}/g);
                            }

                            if(caseid && meetid){
                                casesmeet[caseid[0]] = "https://meet.google.com/" + meetid[0]
                            }
                        });
                        
                        setChromeStorage("cdtx_listmeetlink", casesmeet, () => {
                            
                            cLog(() => {
                                console.log("Has update meet link!");
                            })
                        });
                    });
                }

                is_updatelist_link();

                // reUpdate 20mins
                setInterval(() => {
                    is_updatelist_link();
                }, 1000 * 60 * 20);
                
                var _reupdate_data = function(){
                    if(panel_div.getAttribute("data-caseid") && panel_div.classList.contains("_hascasedata") === false) {

                        loadDataStatusCaseList(() => {
                            var _datatemp = loadCaseDatabaseByID(panel_div.getAttribute("data-caseid"));
                            if(_datatemp) {
                                loadCaseList(panel_div.querySelector('._panel__caselist'));
                                loadInputCase(elm, _datatemp);
                                panel_div.classList.add("_hascasedata");
                            }
                        });
                    }
                }
                
                setInterval(() => {
                    _reupdate_data();
                }, 1000 * 4);
            }
        });
            
        var _isauto = true;

        
        if(_isauto) {
            var _dialogParent = document.querySelector("#yDmH0d"),
            _onceChange = '',
            _elmHeading = _dialogParent.querySelector("#rAECCd");
            if(_elmHeading) {
                var _string = _elmHeading.innerText;
                var _caseid = getOnlyCaseId(_string);
                if(_caseid) {
                    var _datatemp = loadCaseDatabaseByID(_caseid);
                    cLog(() => { console.log('loadInputCase | 4', _datatemp); })
                    loadInputCase(elm, _datatemp);
                    elm.querySelector('[data-infocase="case_id"]').innerText = _caseid;

                    // Open
                    if(window.tagteamoption.optionkl__disable_dialog == false) {
                        document.querySelector('[data-btnaction="openmain"]').click();
                    }
                    
                    // var alinkelm = _dialogParent.querySelector('[href*="meet.google.com"]');
                    // if(alinkelm) {
                    //     var _link = alinkelm.getAttribute("href").split("?")[0];

                    //     var _cusmeet = elm.querySelector('[data-infocase_link="customer_gmeet"]');
                    //     var _cusmeet_input = elm.querySelector('[name="customer_gmeet"]');
                    //     // if(_cusmeet_input.value.length < 1) {
                    //         _cusmeet.setAttribute("href", _link);
                            
                    //         if(_cusmeet) {
                    //             _cusmeet_input.value = _link;
                    //         }
                    //     // }
                        
                    // }
                } 
            }

            _dialogParent.addEventListener('DOMSubtreeModified', (e) => {
                _elmHeading = _dialogParent.querySelector("#rAECCd");


                // STEP 2: Empty
                if(_elmHeading) {
                    var _string = _elmHeading.innerText;
                    var _caseid = getOnlyCaseId(_string);
                    if(_caseid) {
                        // Open
                        if(window.tagteamoption.optionkl__disable_dialog == false) {
                            document.querySelector('[data-btnaction="openmain"]').click();
                        }

                        if(_onceChange !== _caseid) {
                            _onceChange = _caseid;
                            var _datatemp = loadCaseDatabaseByID(_caseid);
                            
                            // set status
                            panel_div.setAttribute("data-caseid", _caseid);
                            if(_datatemp) {
                                panel_div.classList.add("_hascasedata");
                            } else {
                                panel_div.classList.remove("_hascasedata");
                            }

                            if(_datatemp) {
                                var itemelm = panel_div.querySelector(`._panel__caselist [data-caseid="${_caseid}"]`);

                                if(itemelm) {
                                    itemelm.click();
                                    var is_open = toggleClass("mainpanel_template", document.documentElement);

                                    document.documentElement.classList.remove("email_template");

                                    if(is_open) {
                                        document.documentElement.classList.remove("_hide_main");
                                        panel_div.classList.remove("hide_main");

                                        var _panels = panel_div.querySelectorAll(`[data-panel]`);
                                        _panels.forEach((elm) => {
                                            elm.classList.remove("active");
                                        });

                                        var _panel_elm_email = panel_div.querySelector(`[data-panel="main"]`);
                                        _panel_elm_email.classList.add("active");
                                    } else {
                                        document.documentElement.classList.add("_hide_main");
                                        panel_div.classList.add("hide_main");
                                    }
                                    
                                }

                    
                                // 2.1 formchanger
                                setTimeout(() => {
                                    // Save google meet link
                                    var alinkelm = _dialogParent.querySelector('[href*="meet.google.com"]');
                                    if(alinkelm) {
                                        var _link = alinkelm.getAttribute("href").split("?")[0];
                                        
                                        var _cusmeet = elm.querySelector('[data-infocase_link="customer_gmeet"]');
                                        var _cusmeet_input = elm.querySelector('[name="customer_gmeet"]');
                                        // if(_cusmeet_input.value.length < 1) {
                                            _cusmeet_input.value = _link;
                                            if(_cusmeet) {
                                                _cusmeet.setAttribute("href", _link);
                                            }

                                            // Action save
                                            elm.querySelector('[action="save"]').click();
                                        // }
                                        
                                    }
                                }, 1000);
                            } else {
                                clearInput();

                                elm.querySelector('[data-infocase="case_id"]').innerText = _caseid;
                                elm.querySelector('[data-infocase_link="case_id"]').setAttribute("href", "https://cases.connect.corp.google.com/#/case/" + _caseid);

                                Toastify({
                                    text: 'NEW!!!! This case is new',
                                    duration: 3000,
                                    class: "warning",
                                    callback: function(){
                                        this.remove();
                                    }
                                }).showToast();

                                // Open
                                if(window.tagteamoption.optionkl__disable_dialog == false) {
                                    document.querySelector('[data-btnaction="openmain"]').click();
                                    var is_open = toggleClass("mainpanel_template", document.documentElement);

                                    document.documentElement.classList.remove("email_template");

                                    if(is_open) {
                                        document.documentElement.classList.remove("_hide_main");
                                        panel_div.classList.remove("hide_main");

                                        var _panels = panel_div.querySelectorAll(`[data-panel]`);
                                        _panels.forEach((elm) => {
                                            elm.classList.remove("active");
                                        });

                                        var _panel_elm_email = panel_div.querySelector(`[data-panel="main"]`);
                                        _panel_elm_email.classList.add("active");
                                    } else {
                                        document.documentElement.classList.add("_hide_main");
                                        panel_div.classList.add("hide_main");
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }

        // Exit
        return true;
    }

    if(dataStatus.case_current) {        
        cLog(() => {
            console.log("Preload current case");
        })
        var caseload = loadCaseDatabaseByID(dataStatus.case_current);
        cLog(() => { console.log('loadInputCase | 5', caseload); })
        loadInputCase(elm, caseload);
    }
    
}   
    
// 0.0 unmark all before crawl
var s_crawl_case = (_caseid, callback = function(){}) => {
    var _datatemp = _datatemp || {};

    _datatemp.case_id = _caseid;
    // Ads ID
    var dataList = [];
    var dataListTemp = [];
    var customer_adsid = "EMPTY!!!";
    
    // internal // external  || interaction_type
    _datatemp.interaction_type = "internal";
    document.querySelectorAll("configurable-signals home-data-item").forEach(function(elm){
        dataList = elm.innerText.split("\n");
        if(dataList[0] === window.dataTagteam.language.google_ads_external_customer_id) {
            _datatemp.customer_adsid = dataList[1];
        }
        
        if(dataList[1].toLowerCase().includes('external')) {
            _datatemp.interaction_type = dataList[1].toLowerCase();
            _datatemp.am_isgcc_external = 1;
        }
    });

    // appointment_time
        var appointment_time = '';
        document.querySelectorAll("card.read-card:not(.hidden) cuf-form-field").forEach(function(elm){
            dataList = elm.innerText.trim().split("\n");
            dataList = dataList.filter(function (el) {return el != "";});
            
            if(dataList[0] === "Appointment Time") {
                appointment_time += " " + dataList[1] ;
            }

            if(dataList[0].toLowerCase().includes('universal analytics')) {
                _datatemp.interaction_type = 'external';
                _datatemp.am_isgcc_external = 1;
            }
        });

        _datatemp.appointment_time = appointment_time;
        if(_datatemp.appointment_time) {
            _datatemp.meeting_time = getDataTimeFormat(_datatemp.appointment_time);
            _datatemp.meeting_ontime = getDataTimeFormat(_datatemp.appointment_time);

            if(_datatemp.meeting_time === false) {
                if(window.dataTagteam.meeting_time) {
                    
                    _datatemp.meeting_time = getDataTimeFormat(window.dataTagteam.meeting_time);
                    _datatemp.meeting_ontime = getDataTimeFormat(window.dataTagteam.meeting_time);
                }
            }
            // window.dataTagteam.meeting_time 
        }


    // Other
        document.querySelectorAll("card.read-card:not(.hidden) cuf-form-field").forEach(function(elm){
            dataList = elm.innerText.trim().split("\n");
            dataList = dataList.map(s => s.trim());
            dataList = dataList.filter(n => n);

            if(dataList[0] === "Website") {
                _datatemp.customer_website = dataList[1];
            }
            
            if(dataList[0] === "Request Category") {
                dataListTemp = dataList;
                delete dataListTemp[0];
                dataListTemp = dataListTemp.filter(n => n);

                _datatemp.tasks = dataListTemp.join("\n");

            }

            if(dataList[0] === "Tasks") {
                dataListTemp = dataList;
                delete dataListTemp[0];
                dataListTemp = dataListTemp.filter(n => n);
                
                if(_datatemp.tasks) {
                    dataListTemp.push(_datatemp.tasks);
                }
                _datatemp.tasks = dataListTemp.join("\n");
            }

            if(dataList[0] === "Instructions for the Implementation (Guide)") {
                dataListTemp = dataList;
                delete dataListTemp[0];
                dataListTemp = dataListTemp.filter(n => n);
                _datatemp.request = dataListTemp.join("\n");
            }
            
            if(dataList[0] === "Sales Program") {
                _datatemp.sales_program = dataList[1];
                
                // Is GCC
                if(dataList.join(" ").toUpperCase().includes("GCC")){
                    _datatemp.am_isgcc_external = 1;
                    
                    Toastify({
                        text: 'HAVE GCC => EMAIL SEND: <br>TO BCC',
                        duration: 3000,
                        class: "warning"
                    }).showToast();
                }
            }
            
            
            if(dataList[0] === "Accounts") {
                _datatemp.customer_ocid = dataList[1];
            }

            if(dataList[0] === "Attribution Model for the New Conversion Action") {
                _datatemp.customer_attributionmodel = dataList[1];
            }
            
            
            if(dataList[0] === "Contact") {
                if(dataList[1].includes(window.dataTagteam.language.phone_prefix)) {
                    _datatemp.customer_contact = dataList[1];
                }
            }
            

        });


    // Customer 
        document.querySelectorAll("internal-user-info").forEach(function(elm){
            if(elm.querySelector(".email").innerText.includes("@google.com") === false) {
                if(elm.querySelector(".name")) {
                    _datatemp.customer_name = elm.querySelector(".name").innerText.trim();
                }
                if(elm.querySelector(".email")) {
                    _datatemp.customer_email = elm.querySelector(".email").innerText.trim();
                }
            }
        });

    // AM
        if(document.querySelector("internal-user-info .name")) {
            _datatemp.am_name = document.querySelector("internal-user-info .name").innerText.trim();
        }
        if(document.querySelector("internal-user-info .name")) {
            _datatemp.am_email = document.querySelector("internal-user-info .email").innerText.trim();
        }


    // Assign to
    if(document.querySelector(`[debug-id="assignee"]`)) {
        _datatemp.assignee = document.querySelector(`[debug-id="assignee"]`).innerText;
    } else {
        Toastify({
            text: 'This task has not been assigned yet!!',
            duration: 3000,
            class: "warning",
            callback: function(){
                this.remove();
            }
        }).showToast();

    }
    
    

    document.querySelectorAll('#read-card-tab-panel-case-log .case-log-container.active-case-log-container .activities > div').forEach(function(elm){
        if(elm.innerText.includes('Review case in Connect Sales')) {            

                var _tableinfo = elm.querySelectorAll("table tr"); 
                if(_tableinfo.length) {
                    _tableinfo.forEach((elm) => {   
                        var _td_1 = elm.querySelector("td:nth-child(1)");
                        var _td_2 = elm.querySelector("td:nth-child(2)"); 
                        if(_td_1 &&  _td_2) {
                            // console.log(_td_1.innerText, _td_2.innerText);
                            
                            if(_td_1.innerText.includes("Website")) {
                                _datatemp.customer_website = _td_2.innerText;
                            }

                            if(_td_1.innerText.includes("Tasks")) {
                                _datatemp.tasks = _td_2.innerText.trim().replace("\n", "").replace(",", ", ");
                            }
                            
                            if(_td_1.innerText.includes("Contact")) {
                                var _temp_now = _td_2.innerHTML.split("<br>");
                                _temp_now.forEach(function(str_item){
                                    str_item = str_item.replace(/(<([^>]+)>)/gi, "");

                                    if(str_item.includes("Name: ")) {
                                        _datatemp.customer_name = str_item.split("Name: ")[1];
                                    }

                                    if(str_item.includes("Email: ")) {
                                        _datatemp.customer_email = str_item.split("Email: ")[1];
                                    }

                                    if(str_item.includes("Phone: ")) {
                                        _datatemp.customer_contact = str_item.split("Phone: ")[1];
                                    }

                                });
                            }

                            if(_td_1.innerText.includes("Instructions for the Implementation (Guide)")) {
                                _datatemp.request = _td_2.innerText;
                            }

                            if(_td_1.innerText.includes("Account")) {
                                _datatemp.customer_ocid = _td_2.innerText;
                                window.tagteamoption.customer_ocid = _td_2.innerText;
                            }
                        }
                        
                    });
                }
        }
    });

    // == Load case
    callback();
};


// 0.2 Unmark all element and crawl
// for first save
var unmark_all_and_crawl = (callback) => {
    if(!document.querySelector(".case-id")) {
        
        Toastify({
            text: 'Not found Case ID / Is Not connect case ...',
            duration: 3000
        }).showToast();
        
        return false;
    }

    // add Process bar
    panel_div.classList.add('is-progress');

    // Get Case ID
    var _caseid = document.querySelector(".case-id").innerText;
    var caseload = loadCaseDatabaseByID(_caseid);
    
    if(caseload) {
        // cLog(() => {console.log("2. Has Data =========", caseload);})
        var elm = panel_div.querySelector('form#formCase');
        cLog(() => { console.log('loadInputCase | 8', caseload); })
        loadInputCase(elm, caseload);
        callback();
    } else {
        cLog(() => {console.log("New Crawl Data From Case Connent =========", caseload);})
        
        // 1. open all unmark
            document.querySelector('[aria-controls="read-card-tab-panel-home"]').click();
            document.querySelector('[aria-controls="read-card-tab-panel-case-log"]').click();
            document.querySelector('[aria-controls="read-card-tab-panel-home"]').click();

            // Expand all mask button
            if(document.querySelectorAll('[id="read-card-tab-panel-home"] .unmask-button').length) {
                var _unmark = (_ntime = 0) => {
                    var unmaskbutton = document.querySelectorAll('[id="read-card-tab-panel-home"] .unmask-button');

                    if(_ntime > 10) {
                        return false;
                    }
                    
                    // 2.1 click load more
                    var more_less_button = document.querySelectorAll(`.more-less-button:not(.show-more)`);
                    if(more_less_button.length) {
                        more_less_button.forEach(function (elm) {
                            elm.click();
                        });
                    } 

                    // 2.2 open all unmark
                    if(unmaskbutton.length){
                        unmaskbutton.forEach(function (elm) {
                            elm.click();

                            // test demo
                            if(_global_status.test) {
                                elm.classList.remove("unmask-button");
                            }
                        });

                        setTimeout(()=>{
                            _unmark(_ntime + 1);
                        }, 1500);
                    } else {
                        // 2.3 => READY Craw
                        s_crawl_case(_caseid, callback);
                    }
                    return false;

                }

                // Unmark
                _unmark();
                

            } else {
                s_crawl_case(_caseid, callback);
            }
    }
}
var set_init_load = () => {
    
    panel_div = document.querySelector("#_panel_div");
    
    return false;
    
    if(panel_div) {

            // 2. ====
            // 2. Form
                // 2.1 form Submit
                var _formCase = panel_div.querySelector('form#formCase');

                // loadCase(_formCase);
                // _formCase.addEventListener('submit', function(e){
                //     e.preventDefault();


                //     // prepare
                //     var _form = () => {
                //         const formData = new FormData(e.target);
                //         let formDataObj = {};
    
                        
                //         formData.append('action', "case_save");
    
                //         formData.forEach((value, key) => (formDataObj[key] = value));
    

                //         // Is OK
                //         if(getOnlyCaseId(formDataObj.case_id) !== false) {
                            
                //             _formCase.querySelector(`[action="save"]`).innerText = "PROCCESS ... ";
                            

                //             loadCaseStorageByID(formDataObj.case_id, (response) => {
                //                 var caseload = response.value || {};

                //                 // MERGE
                //                 var _tempcaseinfo = caseload;
                //                 Object.assign(_tempcaseinfo, formDataObj);
                                
                //                 saveCase2Storage(_tempcaseinfo, (response) => {
                //                     loadDataStatusCaseList(() => {
                                        
                //                         var caseload = loadCaseDatabaseByID(response.case_id);
        
                //                         Toastify({
                //                             text: 'SAVED',
                //                             duration: 3000,
                //                             callback: function(){
                //                                 this.remove();
                //                             }
                //                         }).showToast();
                                        
                //                         // Load case
                //                         cLog(() => { console.log('loadInputCase | 9'); })
                //                         loadInputCase(panel_div, caseload);
                //                         // Load list
                //                         loadCaseList(panel_div.querySelector("._panel__caselist"));
        
                //                         _formCase.querySelector(`[action="save"]`).innerText = "SAVED";
        
                //                         // Check is has current case is empty?
                //                         getChromeStorage('cdtx_casecurrent', (response) => {
                //                             if(typeof response.value === 'undefined') {
                //                                 panel_div.querySelector('[data-btnaction="case_pin"]').click();
                //                             }
                //                         });
                //                     });
                //                 });
                //             })
                //         } else {
                //             Toastify({
                //                 text: 'ID CASE EMPTY -> FALSE',
                //                 duration: 3000,
                //                 class: "warning",
                //                 callback: function(){
                //                     this.remove();
                //                 }
                //             }).showToast();
    
                //         }
                //     }

                    
                //     // If is first save, not isset in database
                //     cLog(() => { console.log("check ---- ", window.dataTagteam.current_case.case_id)});

                //     if(loadCaseDatabaseByID(window.dataTagteam.current_case.case_id) === false) {
                //         cLog(() => {console.log('recrawl and First save')});
                //         is_readycaseconnect(() => {
                //             unmark_all_and_crawl(() => {
                //                 cLog(() => {console.log('is_readycaseconnect and unmark_all_and_crawl', window.dataTagteam.current_case)});
                //                 _form();
                //             });
                            
                //         })
                        
                //     } else {
                //         cLog(() => {console.log('Has data and save')});
                //         _form();
                //     }


                    
                // });

                // 2.1 formchanger
                // _formCase.addEventListener('change', function() {
                //     _formCase.querySelector(`[action="save"]`).click();
                // });

                // 2.3 Form Settings
                try {
                    var _formSettings = panel_div.querySelector('form#formSettings');
                    _formSettings.addEventListener('submit', function(e){
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        let formDataObj = {};

                        formData.forEach((value, key) => (formDataObj[key] = value));

                        saveSettings2Storage(formDataObj, (response) => {
                            Toastify({
                                text: 'SETTIGNS SAVED',
                                duration: 3000,
                                callback: function(){
                                    this.remove();
                                }
                            }).showToast();
                            
                            // loadInputSettings(panel_div);
                        });
                        
                    });

                    // 2.1 formchanger
                    _formSettings.addEventListener('change', function() {
                        _formSettings.querySelector(`[action="save"]`).click();
                    });
                } catch (error) {
                    
                }

        // 3. load case list
            loadCaseList(panel_div.querySelector('._panel__caselist'));

        
        // 5. load Script Action 
            load_script_action();
        
        // 6. Load minisize
            getChromeStorage('cdtx_minisize-' + location.hostname, (response) => {
                if(response.value) {
                    panel_div.classList.add("minisize");
                    toggleClass("_panel_minisize", document.documentElement);
                }
            });
        
        // 6. Load minisize
            getChromeStorage('cdtx_setting-darkmode', (response) => {
                if(response.value) {
                    panel_div.classList.add("_panel_darkmode");
                }
            });
        
        // 6. Load minisize
            getChromeStorage('cdtx_setting-horizon', (response) => {
                if(response.value) {
                    panel_div.classList.add("_panel__horizon");
                }
            });

        // 7. Show Panel Default 
            // getChromeStorage('cdtx_hidepanel-' + location.hostname, (response) => {
            //     if(response.value) {
            //         panel_div.classList.remove("hide_main");
            //         document.documentElement.classList.remove("_hide_main");
            //     } else {
            //         panel_div.classList.add("hide_main");
            //         document.documentElement.classList.add("_hide_main");
            //     }
            // });

        // 8. Load current for other case connect
            

    
    


        // 10. Autoresize Textare
            textareaAutoResize();


        // 11. Load action toolbar
            load_script_toolaction();


        // 12. load setting
            loadInputSettings(panel_div);
        
        // 13. XXXX
                
        
        // 12. XXXX
        
    }
}
// =========
// loadpanelcaseconnect
// =========
var loadpanelcaseconnect = (is_reload = false) => {

    var _pos_append_html = function (cdtx_paneldivhtml) {
        if(
            window.location.hostname === "cases.connect.corp.google.com" && window.location.href.indexOf("#/case/") > - 1 || 
            _global_status.test
        ) {
            // 1 document.body.classList.add("_panel_sidebar");
            document.documentElement.className += ' _panel_sidebar _hide_main ';
            document.body.insertAdjacentHTML("afterEnd", cdtx_paneldivhtml);
            // 2 add shortcut button to connect cases


                if(window.location.hostname === "cases.connect.corp.google.com" ) {
                    cLog(() => {console.log('1. isReadyBasic')});

                    isReadyBasic(() => {


                        // 2. CR Button Email Template
                            onClickElm('[debug-id="canned_response_button"]', 'click', function(elm, e){                            
                                // Check
                                cLog(() => {console.log("checkInputEmailInboxAndFix 3"); });
                                checkInputEmailInboxAndFix();
                            });

                        // 2. toggleShow content



                        // Action noted card
                            onClickElm(`noted span`, `click`, (elm, e) => {
                                // allow
                                elm.remove();
                            });

                        // Action _chk_email_agains
                            onClickElm(`._chk_email_agains`, `click`, (elm, e) => {
                                // allow
                                elm.classList.remove("_chk_email_agains");
                            });

                        // Remove Note
                            onClickElm(`[card-type] [data-notetitle]`, `click`, (elm, e) => {
                                // allow
                                elm.removeAttribute("data-notetitle");
                                elm.setAttribute("data-notetitlestatus", "ischange");
                            });
                            onClickElm(`[card-type] [data-highlight]`, `click`, (elm, e) => {
                                // allow
                                elm.removeAttribute("data-highlight");
                            });
                            
                        // Script
                            onClickElm(`._panel__script--elm`, `click`, (elm, e) => {
                                // allow
                                toggleClass("hide", elm)
                            });


                            
                        // // // 13. Realtime forall
                        //     var _realtime_recheck = () => {
                        //         // Select the node that will be observed for mutations
                        //         var targetNode = document.body;

                        //         // Options for the observer (which mutations to observe)
                        //         var config = { attributes: true, childList: true, subtree: true };

                        //         // Callback function to execute when mutations are observed
                        //         var callback = function(mutationList, observer) {
                        //             var _istopelm = document.querySelector(`.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top[card-type="compose"]`);
                        //             if(_istopelm) {
                        //                 cLog(() => {console.log("checkInputEmailInboxAndFix 3"); });
                        //                 checkInputEmailInboxAndFix();  
                        //             }
                        //         };

                        //         // Create an observer instance linked to the callback function
                        //         var observer = new c(callback);

                        //         // Start observing the target node for configured mutations
                        //         observer.observe(targetNode, config);
                        //     }
                        //     _realtime_recheck();


                    });
                }
            
            // Return
            return true;
        }

                

        // add shortcut button to connect cases
        // if(
        //     window.location.hostname === ""|| 
        //     _global_status.test
        // ) {
            
        //     return true;
        
        // }

        return true;

    };

    // SHOW content 
    var cdtx_paneldivhtml = _TrustScript(window.dataTagteam.panel_div);
    _pos_append_html(cdtx_paneldivhtml);

    set_init_load();
    // load_action_script_reading();
}

// Load Data Status Case List
function autoLoadCode(keyaction) {
    getChromeStorage('cdtx_settings', (response) => {
        var _datatemp = response.value || false;
        window.dataTagTeamSettings = response.value || false;
        
        // Load
        var _object = {};
        if(_datatemp) {
            _object = _datatemp;
        }

        switch (keyaction) {

            case 'auto_loadgtmid':
                if(typeof _datatemp.auto_loadcode_vanbo === "undefined") {
                    tagteam_showGTMID();
                }
                break;
        
            default:
                break;
        }
    });
}


function loadInit() {


    // 0.0
    // Load GTM ID
        if(
            window.location.hostname === "tagmanager.google.com" || 
            window.location.hostname === "tagmanager-ics.corp.google.com" 
        ) {
            autoLoadCode('auto_loadgtmid');
        }
    
    // 0.1 Load panel
        loadpanelcaseconnect();
        
    
}    

// ============
// LOAD CASE
// ============
getChromeStorage('cdtx_settings', (response) => {
    window.dataTagTeamSettings = response.value || false;
    
    getChromeStorage("cdtx_datastatus", (response) => {
        dataStatus = response.value || dataStatus;
        loadDataStatusCaseList(() => {
            cLog(() => {console.log("0 = Case connect")});
            // Load Dialog 
            loadInit();
            
        });



    });
});


// ==============
// BACKDOOR
// ==============
    switch(location.hash) {

        case "#hide_panel":
            localStorage["hide_panel"] = true;
            return false;
            break;

        case "#show_panel":
            localStorage["hide_panel"] = false;    
            break;

        case "#remove__paneldivhtml":
            removeChromeStorage("cdtx_paneldivhtml", () => {

            });
            break;
        
            
    }
    

}
