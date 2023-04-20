function global_case() {
    var _keylanguage = '';
                    
    switch (result.mycountry) {
        case 'Thailand':
            _keylanguage = 'TH';
            break;
            
        case 'Vietnam':
            _keylanguage = 'VN';
            break;

    
        case 'China':
            _keylanguage = 'CN';
            break;
            
        case 'Japan':
            _keylanguage = 'JP';
            break;

    
        case 'Korea':
            _keylanguage = 'KR';
            break;
            
        case 'Indonesia':
            _keylanguage = 'ID';
            break;

        case 'English':
            _keylanguage = 'EN';
            break;
        
        default:
            _keylanguage = 'CB';
            break;
    }



    
    var global_crawl_external_case = (callback) => {
        var _datatemp = _datatemp || {};


        // customer_gender
        _datatemp.customer_gender = "bạn";
        _datatemp.interaction_type = "external";
        _datatemp.meeting_time = [
            new Date().getFullYear(),
            ("0" + (new Date().getMonth() + 1)).slice(-2),
            ("0" + new Date().getDate()).slice(-2),
        ].join('-') + "T12:12" ;

        try {
         
            var _dfa_key_lang = window.loadgooglesheetpublish['DfA key lang'].sheettab;
            var cuf_forn_field = document.querySelectorAll("card.read-card:not(.hidden) cuf-form-field"); 

            if(cuf_forn_field.length) {
                _datatemp.data_all = [];
                cuf_forn_field.forEach((elm) => {
                    var _cufstr = elm.innerText.trim().split("\n");
                    var _form_label = elm.querySelector('.form-label');

                    
                    var _t1 = _cufstr[0];
                    
                    if(_form_label) {
                        _t1 = _form_label.innerText.trim();
                    }

                    _cufstr = _cufstr.filter(function(item) {
                        return item !== _t1;
                    });

                    var _t2 = _cufstr.join(", ");
                    // cLog(() => { console.log("cdtx", _t1, _t2); })

                    
                    
                    // Get from GSheet
                    _dfa_key_lang.forEach((item) => {
                        // Vi
                        var _key = item.key.trim();
                        if(_t1 === item['vi']) {
                            _datatemp[_key] = _t2;
                        }

                        // En
                        if(_t1 === item['en']) {
                            _datatemp[_key] = _t2;
                        }
                    });

                    // Data All
                    _datatemp.data_all.push({
                        'key': _t1,
                        'value': _t2,
                    })

                });
            }

        } catch (error) {
            console.error("cdtx error", error);
        }

        
        
        
        // Track AM info
        try {
            var _contenttext = document.querySelector('internal-user-info');
            if(_contenttext) {
                if(_contenttext.innerText.includes('@google.com')) {
                    _datatemp.am_name = _contenttext.querySelector('[debug-id="name"]').innerText;
                    _datatemp.am_email = _contenttext.querySelector('[debug-id="details"] .email').innerText;
                }
                
            }
        } catch (error) {
            console.error('cdtx internal-user-info not found');
        }

        cLog(() => { console.log('cdtx', _datatemp) })


        
        callback(_datatemp);
    }


    var gloabl_crawl_case = (callback) => {
        var _datatemp = _datatemp || {};

        document.querySelectorAll('#read-card-tab-panel-case-log .case-log-container.active-case-log-container .activities > div').forEach(function(elm){
            if(elm.innerText.includes('Review case in Connect Sales')) {            

                var _tableinfo = elm.querySelectorAll("table tr"); 
                if(_tableinfo.length) {
                    _tableinfo.forEach((elm) => {   
                        var _td_1 = elm.querySelector("td:nth-child(1)");
                        var _td_2 = elm.querySelector("td:nth-child(2)"); 

                        if(_td_1 &&  _td_2) {
                            // cLog(() => { console.log(_td_1.innerText, _td_2.innerText); })
                            
                            if(_td_1.innerText.includes("Team")) {
                                _datatemp.team = _td_2.innerText;
                            }
                            
                            if(_td_1.innerText.includes("Company")) {
                                _datatemp.company = _td_2.innerText;
                            }
                            
                            if(_td_1.innerText.includes("Case Summary")) {
                                _datatemp.case_summary = _td_2.innerText;
                            }
                            
                            if(_td_1.innerText.includes("Accounts")) {
                                _datatemp.customer_ocid = _td_2.innerText;
                            }
                            
                            if(_td_1.innerText.includes("Website")) {
                                _datatemp.customer_website = _td_2.innerText;
                            }
                            
                            if(_td_1.innerText.includes("Request Category")) {
                                _datatemp.request_category = _td_2.innerText;
                            }
                            
                            if(_td_1.innerText.includes("Sales Program")) {
                                _datatemp.sales_program = _td_2.innerText;
                                if(_td_2.innerText.toUpperCase().includes("GCC")) {
                                    _datatemp.am_isgcc_external = 1;
                                }
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

                            if(_td_1.innerText.includes("Appointment Time")) {
                                _datatemp.appointment_time = _td_2.innerText;
                            }
                            
                            if(_td_1.innerText.includes("Merchant Center ID")) {
                                _datatemp.merchant_center_id = _td_2.innerText;
                            }

                            if(_td_1.innerText.includes("Please let us know if there are any specific details that we should be aware of for this request - Guide")) {
                                _datatemp.special_guide = _td_2.innerText;
                                _datatemp.request = _td_2.innerText;
                            }

                            if(_td_1.innerText.includes("Attribution Model")) {
                                _datatemp.customer_attributionmodel = _td_2.innerText;
                            }
                            
                            if(_td_1.innerText.includes("Tasks")) {
                                _datatemp.tasks = _td_2.innerText.trim().replace("\n", "").replace(",", ", ");
                            }
                            
                            if(_td_1.innerText.includes("Instructions for the Implementation (Guide)")) {
                                _datatemp.implementation_guide = _td_2.innerText;
                                _datatemp.request = _td_2.innerText;
                            }
                            
                            if(_td_1.innerText.includes("What Product Area(s) does your customer need help with?")) {
                                _datatemp.customer_need_help = _td_2.innerText;
                            }
                        }
                        
                    });
                }

                
                // Track AM info
                if(elm.querySelector('sanitized-content')) {
                    var _contenttext = elm.querySelector('sanitized-content').innerText;
                    _contenttext = _contenttext.split('was submitted by')[1];
                    if(_contenttext.includes('@google.com')) {
                        var _emails = _contenttext.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
    
                        var am_emailgoogle = _emails.find((_item2) => { return _item2.includes('@google.com')});
    
                        if(am_emailgoogle) {
                            var am_name = _contenttext.split('(')[0].trim();
                            var am_email = am_emailgoogle;
                            
                            _datatemp.am_name = am_name;
                            _datatemp.am_email = am_email;
                        }
                    }
                }

                
                // Meeting time
                var _date_key = [
                    new Date().getFullYear(),
                    ("0" + (new Date().getMonth() + 1)).slice(-2),
                    ("0" + new Date().getDate()).slice(-2),
                ];
                
                if(_datatemp.appointment_time) {
                    _datatemp.meeting_time = convertDateCustom(_datatemp.appointment_time, 2);
                }
                
            }
        });
        
        
        // customer_gender
            _datatemp.customer_gender = "bạn";

        // internal // external  || interaction_type
            _datatemp.interaction_type = "internal";
            
            document.querySelectorAll("card.read-card:not(.hidden) home-data-item").forEach(function(elm){
                var dataList = elm.innerText.split("\n");
                
                if(dataList[0].includes('Google Ads External Customer ID')) {
                    _datatemp.customer_adsid = dataList[1];
                }
            
                if(dataList[1].toLowerCase().includes('external')) {
                    _datatemp.interaction_type = dataList[1].toLowerCase();
                    _datatemp.am_isgcc_external = 1;

                    // 
                }
            });
        
            // cuf-form-field
            var getdatall = (elmall) => {
                if(elmall.length) {
                    _datatemp.data_all = [];
                    elmall.forEach((elm) => {
                        var _cufstr = elm.innerText.trim().split("\n");
                        var _t1 = _cufstr[0];
                        
                        var _form_label = elm.querySelector('.form-label');
                        if(_form_label) {
                            _t1 = _form_label.innerText.trim();
                        }

                        var _form_label = elm.querySelector('.data-pair-label');
                        if(_form_label) {
                            _t1 = _form_label.innerText.trim();
                        }

                        _cufstr = _cufstr.filter(function(item) {
                            return item !== _t1;
                        });

                        var _t2 = _cufstr.join(", ");
                        // Data All
                        _datatemp.data_all.push({
                            'key': _t1,
                            'value': _t2,
                        })

                    });
                }
            }

            
            getdatall(document.querySelectorAll("card.read-card:not(.hidden) cuf-form-field"));
            getdatall(document.querySelectorAll("card.read-card:not(.hidden) home-data-item"));

        callback(_datatemp);
    };

    
    var global_btnoncall_precall = (callback) => {
        // on-call, precall button 
        var _istopelm = document.querySelector(`.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top`);
        if(_istopelm) {

            // Không chèn nếu đã có sẵn 2 cái nút cũ    
            // if (_istopelm.querySelector("#on-call") !== null && _istopelm.querySelector("#pre-call") !== null) return false;

            if (_istopelm.querySelector("#cdtx__precallbtn") === null && _istopelm.querySelector("#cdtx__oncallbtn") === null) {
                var _arr_btnlist = [];
                var _temp_oncall = {
                    'id' : 'cdtx__oncallbtn',
                    'btn_text': 'On Call',
                    'content_insert' : `
                        <p dir="auto"><b>Sub-status:&nbsp;&nbsp;<span class="_sub_i" data-btnclk="choice_status_list" >Click Choice</span></b> </p>
                        <p dir="auto"><b>Sub-status Reason:&nbsp;&nbsp;</b> </p>
                        <p dir="auto"><b>Speakeasy ID:&nbsp;&nbsp;</b> </p>
                        <p dir="auto"><b>On Call Comments:&nbsp;&nbsp;</b> </p>
                        <p dir="auto"><b>Tags Implemented:&nbsp;&nbsp;</b> <span class="_task_i"></span></p>
                        <p dir="auto"><b>Screenshots:&nbsp;&nbsp;</b></p>
                        <p dir="auto"><b>Multiple CIDs:&nbsp;&nbsp;</b>NA</p>
                        <p dir="auto"><b>On Call Screenshot:&nbsp;&nbsp;</b> </p>
                    `
                };
                _arr_btnlist.push(_temp_oncall);

                var _temp_precall = {
                    'id' : 'cdtx__precallbtn',
                    'btn_text': 'Pre Call',
                    'content_insert' : `
                        <ul dir="auto">
                            <li>Emails or feedback from Advertiser/Seller (including seller request to join the call)[C]&nbsp;</li>
                            <li>Call being made in business hours[C]</li>
                            <li>Program ,task type (including special instructions),advertiser need and readiness [C]</li>
                            <li>Related cases [C]</li>
                            <li>CMS being used [C]</li>
                            <li>Gtag/GTM/GA already exists [C] (NA applicable only for Shopping or OCT cases)</li>
                        </ul>
                        <span class="_document_attachurl_i"></span>
                    `
                };

                _arr_btnlist.push(_temp_precall);



                _arr_btnlist.forEach((item) => {
                    var _elmcasenote = _istopelm.querySelector(`.case-note`);
                    if(_elmcasenote) {
                        var text = item.content_insert;
                        const dom = document.createElement("button");
                        dom.innerText = item.btn_text;
                        dom.id = item.id;

                        _elmcasenote.insertAdjacentElement("afterBegin", dom);

                        dom.addEventListener("click", () => {

                            if(typeof window.dataTagteam !== 'undefined') {
                                if(window.dataTagteam.hasOwnProperty("current_case")) {
                                    if(window.dataTagteam.current_case.hasOwnProperty("tasks")) {

                                        if(window.dataTagteam.current_case.qlus_status) {
                                            text = text.replace(/<span class="_sub_i">[\s\S]*?<\/span>/g, `<span class="_sub_i">${window.dataTagteam.current_case.qlus_status}</span>`);
                                        }

                                        if(window.dataTagteam.current_case.tasks) {
                                            text = text.replace(/<span class="_task_i">[\s\S]*?<\/span>/g, `<span class="_task_i">${window.dataTagteam.current_case.tasks}</span>`);

                                            var _task_i = window.dataTagteam.current_case.tasks;
                                            if(_task_i.includes("Ads Enhanced Conversions")) {
                                                text = text.replace(/<span class="_document_attachurl_i">[\s\S]*?<\/span>/g, `<span class="_document_attachurl_i">DOCUMENT EC: <span data-infocase="customer_name" data-highlight="need_recheck">ZZZZ</span></span>`);
                                            }
                                        }

                                    }
                                }
                            }

                            _elm_content = _istopelm.querySelector(`.editor [contenteditable="true"]`);
                            _elm_content.innerHTML += text;
                            _elm_content.dispatchEvent(new Event('input'));
                            _elm_content.dispatchEvent(new Event('focus'));
                            _elm_content.dispatchEvent(new Event('click'));
                        })
                    }    
                })
                
				
            }
        }
    }

    function global_checkAddLoadMoreInfo(_caseid) {
        console.log("1231231")
        wait4Elem('material-input.case-summary-input').then(function (elm) {
            
        })
    }
    
    // Is Ready Connect Case
    function global_is_external_readycaseconnect(_callback) {

        var n_time_dkneed = 0,  
            n_time_dkneed_compare = 0;
        var is_ready = () => {
            cLog(() => { console.log('cdtx is ready external', n_time_dkneed_compare, n_time_dkneed, n_time_dkneed_compare < n_time_dkneed); })
                // Test
            if(n_time_dkneed_compare < n_time_dkneed) return;
            _callback();
            
        }


        // -- unmark all
        n_time_dkneed++;
        var _unmask_buttons = document.querySelectorAll('card.read-card:not(.hidden) cuf-form-field .unmask-button');
        var _no_unmask_btnstr = 'card.read-card:not(.hidden) cuf-form-field span:not(.unmask-button)';
        var _cuf_form_field = 'card.read-card:not(.hidden) cuf-form-field';
        if(_unmask_buttons.length) {
            _unmask_buttons.forEach(function(elm3) {
                elm3.click();
            })

            
            var _cuf_form_field = 'card.read-card:not(.hidden) cuf-form-field';
            wait4Elem(_no_unmask_btnstr).then(function () {
                var _cuf_form_field_elms = document.querySelectorAll(_cuf_form_field);

                var _my_time = setInterval(() => {
                        var _is_havemask = false;
                        _cuf_form_field_elms.forEach(function(elm4) {
                            // cLog(() => { console.log('cdtx OKOKOKOK', elm4.innerText); })
                            if(elm4.innerText.includes('***')) {
                                _is_havemask = true;
                            }
                        });
                        
                        if(_is_havemask === false) {
                            is_ready(n_time_dkneed_compare++);
                            
                            clearInterval(_my_time);
                        }
                }, 500);    
                
                
                
            });
        }
    }
    
    var global_is_readycaseconnect = (_caseid, _callback) => {
        
        var n_time_dkneed = 0,  
            n_time_dkneed_compare = 0;
        var is_ready = () => {            
            cLog(() => { console.log('cdtx is ready', n_time_dkneed_compare, n_time_dkneed, n_time_dkneed_compare < n_time_dkneed); })

            // Chống bị chờ // khác case id
            if(document.querySelector('[debug-id="case-id"] .case-id')) {
                cLog(() => { console.log('cdtx dong', _caseid === document.querySelector('[debug-id="case-id"] .case-id').innerText); })

                if(_caseid !== document.querySelector('[debug-id="case-id"] .case-id').innerText) {
                    return;
                }
            }
            
            // Hạ 1 đơn vị để so sánh
            // -> recheck xem có phải external;
            var is_external = false;
            
            cLog(() => { console.log('cdtx is ready 1'); })
            if(n_time_dkneed_compare === (n_time_dkneed - 1)) {
                cLog(() => { console.log('cdtx is ready 2'); })
                document.querySelectorAll("card.read-card:not(.hidden) home-data-item").forEach(function(elm){
                    var dataList = elm.innerText.split("\n");
                    if(dataList[1].toLowerCase().includes('external')) {
                        is_external = true;
                        _callback(is_external);
                        return;
                    }   
                });
                
                document.querySelectorAll("card.read-card:not(.hidden) cuf-form-field").forEach(function(elm){
                    var dataList = elm.innerText.trim().split("\n");
                    dataList = dataList.filter(function (el) {
                        return el != "";
                    });
                  
                    if(dataList[0].toLowerCase().includes('universal analytics')) {
                        is_external = true;
                        _callback(is_external);
                        return;
                    }
                });
            } 

            
                // Test
            if(n_time_dkneed_compare < n_time_dkneed) return;
            _callback(is_external);
            
        }

        n_time_dkneed++;
        wait4Elem("card.read-card:not(.hidden) cuf-form-field").then(function () {
            is_ready(n_time_dkneed_compare++);
        });
        
        n_time_dkneed++;
        wait4Elem('[debug-id="case-id"] .case-id').then(function () {
            is_ready(n_time_dkneed_compare++);
        });

        
        n_time_dkneed++;
        wait4Elem("#read-card-tab-panel-case-log .case-log-container.active-case-log-container .activities > div").then((elm1) => {    

            document.querySelectorAll('#read-card-tab-panel-case-log .case-log-container.active-case-log-container .activities > div').forEach(function(elm){
                if(elm.innerText.includes('Review case in Connect Sales')) {            
                    // cLog(() => { console.log(elm.querySelector("table")) })

                    elm.querySelector('case-message-view .message-content-container-full').click();
                
                    wait4Elem("#read-card-tab-panel-case-log .case-log-container.active-case-log-container .activities > div table tr").then( (elm2) => {
                        
                        
                        is_ready(n_time_dkneed_compare++);
                    })
                }
            });
        });

        
    }
    
    

    function amInfoUpdate(_caseid) {
        var _istopelm = document.querySelector(`csl-customer-information .body`);
        
        if(_istopelm) {
        	if (_istopelm.querySelector("#panel_addamcontact") === null) {
        	    
                var _panel_add_am = `<div id="panel_addamcontact" class="panel_addamcontact" data-infocase_attr="am_email" >
                    <span class="panel_addamcontact_btn panel_addamcontact_btn-top " data-btnclk="add_amcontact_tgopenclose">+ Add AM Contact</span>
                    <span data-infocase="case_id" class="panel_addamcontact_displaynone" ></span>
                    <div class="panel_addamcontact_row">
                        <div class="panel_addamcontact_gr-row panel_addamcontact_gr-content">
                            <span class="panel_addamcontact_gr-email" contenteditable="true" data-placeholder="Email" data-infocase="am_email" ></span>
                            <span class="panel_addamcontact_gr-name" contenteditable="true" data-infocase="am_name" >Name</span>
                            <span class="panel_addamcontact_btn" data-btnclk="add_amcontact_save" >Save</span>
                            <span class="panel_addamcontact_btn" data-btnclk="add_amcontact_tgopenclose" >Close</span>
                        </div>
                    </div>
                </div>`;
                
        	    _istopelm.insertAdjacentHTML("beforeEnd", _panel_add_am);
        
        
                loadCaseStorageByID(_caseid, (response) => {
                    var _datatemp = response.value || false;
                    
                    var _elmpanel = _istopelm.querySelector("#panel_addamcontact");
            
                    if(_datatemp.am_email) {
                        _elmpanel.classList.add("panel_addamcontact_displaynone");
                        _elmpanel.classList.add("current_hasdata");
                        _elmpanel.classList.add("content_open");
                        
                    }

                    if(_datatemp.case_id) {
                        replaceAllHtmlElement(_elmpanel, _datatemp);
                    }
                })
        	}
        }
    }

    function clickAction() {
        onClickElm('[data-btnclk]', 'click', function(elm, e){
            try {
                var _action = elm.getAttribute("data-btnclk");
                cLog(() => { console.log('cdtx', _action); })

                // add_precall
                if(_action === 'add_precall') {
                    
                    var _casenote = `.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top[card-type="case-note"]`;
                    var _casenote_editor = _casenote + ` .editor[contenteditable="true"]`;
                    var _casenote_precall = _casenote + ` #pre-call`;
                    if(document.querySelector(_casenote + ` #cdtx__precallbtn`)) {
                        _casenote_precall = _casenote + ` #cdtx__precallbtn`;
                    }

                    if(!document.querySelector(_casenote)) {
                        document.querySelector('material-fab.case-note').click();

                        var ntime = 0;
                        var myTime = setInterval(() => {
                            if(document.querySelector(_casenote_precall)) {
                                document.querySelector(_casenote_precall).click();
                                if(document.querySelector(_casenote_editor).innerText.trim() !== "") {
                                    clearInterval(myTime);
                                }
                            }

                            if(ntime > 10) {
                                clearInterval(myTime);
                            }
                            ntime++;
                        }, 500)
                    } else {
                        if(document.querySelector(_casenote_editor).innerText.trim() === "") {
                            document.querySelector(_casenote_precall).click();
                        }
                    }

                    elm.remove();
                }


                // add_amcontact_tgopenclose
                if(_action === 'add_amcontact_tgopenclose') {
                    elm.closest('.panel_addamcontact').classList.toggle('content_open');
                }

                // kl_callchecklist--isdoneclick
                if(_action === 'kl_callchecklist--isdoneclick') {
                    elm.classList.toggle('done')
                }

                // kl_callchecklist--tgopenclose
                if(_action === 'kl_callchecklist--tgopenclose') {
                    elm.closest('.kl_callchecklist').classList.toggle('open')
                }
                // kl_callchecklist--opacity
                if(_action === 'kl_callchecklist--opacity') {
                    elm.closest('.kl_callchecklist__listload').classList.toggle('opacity')
                }

                // click_desc_calendar_expand
                if(_action === 'click_desc_calendar_expand') {
                    elm.classList.add('open');
                }

                // add_amcontact_tgopenclose
                if(_action === 'copy_innertext') {
                    copyTextToClipboard(elm.innerText);
                    var _this = elm;
                    
                    _this.classList.add("have_copy");
                    setTimeout(() => {
                        _this.classList.remove("have_copy");
                    }, 500);
                }

                // add_amcontact_save
                if(_action === 'add_amcontact_save') {
                    var __caseid = elm.closest('.panel_addamcontact').querySelector('[data-infocase="case_id"]').innerText;

                    cLog(() => { console.log(__caseid); })
                    var __am_email = elm.closest('.panel_addamcontact').querySelector('[data-infocase="am_email"]').innerText;
                    var __am_name = elm.closest('.panel_addamcontact').querySelector('[data-infocase="am_name"]').innerText;
                    updateFieldCase2Storage('am_email', __am_email, __caseid , () => {
                        cLog(() => { console.log('cdtx', 'have save am_email'); })
                        
                        updateFieldCase2Storage('am_name', __am_name, __caseid , () => {
                            cLog(() => { console.log('cdtx', 'have save am_name') })
                        });
                    });

                }

                // xxxx
                if(_action === 'choice_status_list') {
                    if(document.querySelector('._sub_i_ul')) {
                        document.querySelector('._sub_i_ul').remove();
                    } else {
                        var _lst = `
                                <span class="_sub_i_li" data-key="AS - Work in Progress" ></span>
                                <span class="_sub_i_li" data-key="AS - Reschedule 1" ></span>
                                <span class="_sub_i_li" data-key="AS - Reschedule 2" ></span>
                                <span class="_sub_i_li" data-key="AS - Acceptable Reschedule" ></span>
                                <span class="_sub_i_li" data-key="NI - Awaiting Inputs" ></span>
                                <span class="_sub_i_li" data-key="NI - In Consult" ></span>
                                <span class="_sub_i_li" data-key="NI - Awaiting Validation" ></span>
                                <span class="_sub_i_li" data-key="NI - Attempted Contact" ></span>
                                <span class="_sub_i_li" data-key="NI - Other" ></span>
                                <span class="_sub_i_li" data-key="SO - Verified" ></span>
                                <span class="_sub_i_li" data-key="SO - Unverified" ></span>
                                <span class="_sub_i_li" data-key="SO - Verification Not Needed" ></span>
                                <span class="_sub_i_li" data-key="IN - Infeasible" ></span>
                                <span class="_sub_i_li" data-key="IN - Out of Scope - Rerouted" ></span>
                                <span class="_sub_i_li" data-key="IN - Not Reachable" ></span>
                                <span class="_sub_i_li" data-key="IN - Not Interested" ></span>
                                <span class="_sub_i_li" data-key="IN - Not Ready" ></span>
                                <span class="_sub_i_li" data-key="IN - Reschedule spanmit Exceeded" ></span>
                                <span class="_sub_i_li" data-key="IN - Other" ></span>
                                <span class="_sub_i_li" data-key="DC - Not Needed" ></span>
                                <span class="_sub_i_li" data-key="DC - Test Case" ></span>
                                <span class="_sub_i_li" data-key="DC - Out of Scope - Rerouted" ></span>
                                <span class="_sub_i_li" data-key="AS - Agent Reschedule" ></span>
                                <span class="_sub_i_li" data-key="Other" ></span>
                            `;
                        var _position_screen = elm.getBoundingClientRect();
                        
                        var _sub_i_ul_elm = document.createElement('span');
                        _sub_i_ul_elm.classList.add('_sub_i_ul');
                        _sub_i_ul_elm.innerHTML = _lst;
                        _sub_i_ul_elm.style.left = (_position_screen.left + (elm.offsetWidth || 0) + 10) + "px";
                        _sub_i_ul_elm.style.top = _position_screen.top + "px";
                        _sub_i_ul_elm.style.position = 'fixed';
                        
                        document.body.appendChild(_sub_i_ul_elm);
                        _sub_i_ul_elm.querySelectorAll('._sub_i_li').forEach((_sub_i_ul_itemli) => {
                            
                            _sub_i_ul_itemli.innerText = _sub_i_ul_itemli.getAttribute('data-key');
    
                            _sub_i_ul_itemli.addEventListener('click', (e) => {
                                elm.innerText = e.target.innerText;
                                var __caseidelm = document.querySelector('[debug-id="case-id"] .case-id');
                                if(__caseidelm) {
                                    updateFieldCase2Storage('qlus_status', elm.innerText, __caseidelm.innerText , () => {
                                        cLog(() => { console.log('cdtx', 'qlus_status', innerText) })
                                    });
                                }
                                _sub_i_ul_elm.remove();
                            })
    
                        })
                    }
                    
                    
                }

                // xxxx
                if(_action === 'xxxx') {
                }

                // xxxx
                if(_action === 'xxxx') {
                }

            } catch (error) {
                cLog(() => console.log('ERROR', error) );
                    
            }
        });

    }

    // Add new
    function saveCase2Storage(_data, _callback) {
        // ID trust
        
        if(_data.case_id) {   
            var case_id = getOnlyCaseId(_data.case_id);
            if(case_id) {   

                // Save
                var _time = +new Date();
                // dataStatus.cdtx_lastupdate = _time;

                cLog(() => { console.log("cdtx Dong Dieu` tra", _data); })

                setChromeStorage('cdtx_caseid_' + case_id, _data, _callback);

            }
        }
    }

    // Update field 
    function updateFieldCase2Storage(strfield, value, _caseid , _callback) {
        // ID trust
        
        loadCaseStorageByID(_caseid, (response) => {
            cLog(() => { console.log('cdtx response' , response); })
            var caseload = response.value || false;
            
            if(caseload.case_id) {   
                // ====== BEGIN
                caseload[strfield] = value


                // ====== END -> SAVE
                saveCase2Storage(caseload, _callback)
            }
        })
    }



    function autoUpdatelistLinkCalendar() {
        if(location.hostname !== 'calendar.google.com') return;
        var is_updatelist_link = () => {
            getChromeStorage("cdtx_listmeetlink", (response) => {
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
                        cLog(() => { console.log("Has update meet link!"); })
                    })
                });
            });
        }

        is_updatelist_link();

        // reUpdate 20mins
        setInterval(() => {
            is_updatelist_link();
        }, 1000 * 60 * 10);
    }
    
    function checkIsNotePrecall(_caseid) {
        // Start
        // cLog(() => { console.log("cdtx - precall - start"); })


        // Nếu ldap chưa đúng
        if(document.querySelector('profile-icon img.photo')) {
            var _ldap = document.querySelector('profile-icon img.photo').src.split('/');
            _ldap = _ldap[_ldap.length - 1].split('?')[0];

            var _userassigneer = '';
            var _assignee = document.querySelector('[debug-id="assignee"]');
            if(_assignee) {
                _userassigneer = _assignee.innerText.replace(/[^a-z]/g,'')
            }
            if(_ldap !== _userassigneer) {
                return false;
            }
        }


        // Check case id
        // check 
        window._oncecaseid_precall = window._oncecaseid_precall || 0;
        if(window._oncecaseid_precall != _caseid) {
            var __note_add_precall = document.querySelector(`._note_add_precall`);
            if(__note_add_precall) __note_add_precall.remove();

            var is_precall = false;
            wait4Elem('.case-log-container.active-case-log-container case-message-view').then((elm) => {
                setTimeout(() => {
                    var casemessageview_elm_all = document.querySelectorAll(".case-log-container.active-case-log-container case-message-view");
                    casemessageview_elm_all.forEach(function(elm){
                        if(elm.innerText.includes("Emails or feedback from Advertiser")) {
                            is_precall = true;
                        }
                    });
        
    
                    // If false
                    if(is_precall == false) {
                        var _istopelm = document.querySelector(`.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"])`);
                        if(_istopelm) {
                            _istopelm.insertAdjacentHTML("beforeBegin", `<span class="_note_add_precall" data-btnclk="add_precall" title="click add precall" >Missing note precall</span>`)
                        }
                    }
                }, 3000);
                

            });


            // once
            window._oncecaseid_precall = _caseid;
        }
    }


    var saveCaseNow = (_caseid, callback) => {
        
        // Nếu ldap chưa đúng
        if(document.querySelector('profile-icon img.photo')) {
            var _ldap = document.querySelector('profile-icon img.photo').src.split('/');
            _ldap = _ldap[_ldap.length - 1].split('?')[0];

            var _userassigneer = '';
            var _assignee = document.querySelector('[debug-id="assignee"]');
            if(_assignee) {
                _userassigneer = _assignee.innerText.replace(/[^a-z]/g,'')
            }
            if(_ldap !== _userassigneer) {
                return false;
            }
        }
        
        
        window.once_savecase_load = window.once_savecase_load || 0;
        if(window.once_savecase_load > 0) return false;

        window.once_savecase_load = 1;
        // 2.1 load Case by caseid
        
        cLog(() => { console.log("cdtx-save case - 0/5 start: ", window.once_savecase_load, _caseid); })
        loadCaseStorageByID(_caseid, (response) => {
            cLog(() => { console.log('cdtx response' , response); })
            var caseload = response.value || false;
            
            // var caseload = false; // test
            cLog(() => { console.log("cdtx-save case - 1/5 is caseindata: ", caseload, _caseid); })
            window.once_savecase_load = 0;

            if(!caseload) {
                
                if(document.querySelector('profile-icon img.photo')) {
                    var _ldap = document.querySelector('profile-icon img.photo').src.split('/');
                    _ldap = _ldap[_ldap.length - 1].split('?')[0];
        
                    var _userassigneer = document.querySelector('[debug-id="assignee"]').innerText.replace(/[^a-z]/g,'');
                    if(_ldap === _userassigneer) {
                        cLog(() => { console.log("cdtx-save case - 2/5. has ldap"); })
                        // 3. is assigned debug-id="state-button"
                        var _state_button = document.querySelector('[debug-id="state-button"]');
                        if(_state_button) {
                            // 4. Save
                            // ==============

                            cLog(() => { console.log("cdtx-save case - 3 start ", _caseid); })
                            global_is_readycaseconnect(_caseid, (is_external) => {
                                cLog(() => { console.log("cdtx-save case - 4.1/5 is_external", is_external, _caseid); })
                                // is run if has element need
                                if(is_external === false) {
                                    gloabl_crawl_case((_datatemp) => {
                                        cLog(() => { console.log("cdtx-save case - 4.2/5 có thể cào", _caseid, _datatemp); })
                                        
                                        _datatemp.case_id = _caseid;
                                        _datatemp.assignee = _ldap;
                                        _datatemp.qlus_status = 'ZZZZ';
                                        saveCase2Storage(_datatemp, (response) => {
                                            cLog(() => { console.log('cdtx-save case - 5/5 - Finished save case', response); })
                                            callback();
                                        });
                                    })
                                }
                                
                                if(is_external === true) {
                                    cLog(() => { console.log("cdtx-save external case"); })
                                    
                                    global_is_external_readycaseconnect(() => {
                                        global_crawl_external_case((_datatemp) => {
                                            cLog(() => { console.log("cdtx-save external case - 4/5 có thể cào", _caseid); })
                                            
                                            _datatemp.case_id = _caseid;
                                            _datatemp.assignee = _ldap;
                                            _datatemp.qlus_status = 'ZZZZ';
                                            _datatemp.am_isgcc_external = 1;

                                            
                                            cLog(() => { console.log('cdtx-save external case - 4/5 -data', _datatemp); })

                                            saveCase2Storage(_datatemp, (response2) => {
                                                cLog(() => { console.log('cdtx-save external case - 5/5 - Finished save case', response2); })
                                                callback();
                                            });
                                        })
                                    })
                                }
                                
                            })
                            
                            // is_readycaseconnect(() => {
                            //     unmark_all_and_crawl(() => {
                            //         cLog(() => {cLog(() => { console.log('is_readycaseconnect and unmark_all_and_crawl', window.dataTagteam.current_case)}); })

                            //         // _form();
                            //     });
                            // });
                        }
                    }
                }
            } else {
                
                // 3. Load content case
                // ==============
                cLog(() => { console.log("cdtx - Load content case"); })
                callback(caseload);
            }
        });
    }




    function loadRealtime(_callback) {
        if(
            !(
                location.hostname === 'cases.connect.corp.google.com'
                || location.hostname === 'calendar.google.com'
                || location.hostname === 'meet.google.com'
            )
        ) 
        {
            cLog(() => { console.log('cdtx - could not run other domain'); })
            return false;
        }


        var _title_diff = '';
        var _title = '';
        var _caseid_once = '';
        observeOnce((elm) => {
            // Add link style head
            if(!document.head.querySelector("#cdtx_style")) {
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.id = 'cdtx_style';
                link.href = `https://cdtx.lyl.vn/cdtx-assistant/_Bookmark/assets/css/style.css?t=${new Date().valueOf() }"`;
                
                document.head.appendChild(link);
            }

            // for cases.connect.corp.google.com
            if(location.hostname === 'cases.connect.corp.google.com') {


                // 1. detech change case-id
                // 2. compare ldap (ldap vs profile ldap)
                // 3. is assigned === true
                // 4. is save case
                
                var _caseidelm = document.querySelector('.case-id');
                if(_caseidelm) {
                    _caseid = _caseidelm.innerText;

                    // ===========
                    // Alway load
                    // ===========
                        // Check 
                        checkIsNotePrecall(_caseid);
                        // Button oncall precall
                        global_btnoncall_precall(() => {
                            console.log("cdtx add oncall precall ok")
                        });
                        loadTemplateEmailGoogleSheet(_caseid, _keylanguage);


                    
                    // ========
                    // Save case
                    // ========
                        // TH 1: caseid diff caseonce    
                        if(_caseid != _caseid_once) {
                            cLog(() => { console.log("cdtx - TH 1 here"); })
                            saveCaseNow(_caseid, (caseload) => {
                                cLog(() => { console.log('cdtx - TH 1 here -  saveCaseNow - DONE'); });
                                global_checkAddLoadMoreInfo(_caseid);

                                if(caseload.interaction_type == 'external') {
                                    amInfoUpdate(_caseid);
                                }
                            });
                            _caseid_once = _caseid;
                        }

                        // TH 2: assignee status
                        // var state_button = document.querySelector('[debug-id="state-button"]');
                        var state_button = document.querySelector('div.action-buttons');
                        if(state_button) {
                            window.once_state_button = window.once_state_button || state_button.innerText;
                            if(window.once_state_button !== state_button.innerText) {
                                cLog(() => { console.log("cdtx - TH 2 HERE"); })
                                saveCaseNow(_caseid, (caseload) => {
                                    cLog(() => { console.log('cdtx - TH 2 here - saveCaseNow - DONE') });
                                    global_checkAddLoadMoreInfo(_caseid);
                                        
                                    if(caseload.interaction_type == 'external') {
                                        amInfoUpdate(_caseid);
                                    }
                                });

                                // Overwrite
                                window.once_state_button = state_button.innerText;
                            }
                        }


                    

                    // ===========
                    // Load once
                    // ===========
                }
            }

            if(location.hostname === 'calendar.google.com') {
                var _headelm = document.querySelector('#rAECCd');
                if(_headelm) {
                    var _title = _headelm.innerText;
                    var _caseid = getOnlyCaseId(_title);
                    
                    // has case id and isset area input template
                    if(_caseid && document.querySelector('[jscontroller="dIQ6id"]')) {
                        
                        // Insert test
                        if(!_headelm.querySelector('.caseid_ins')) {
                            if(_title.split('').length > 59) {
                                var _contenthtml = `<span class="caseid_ins" >${_caseid}</span> `;
                                _contenthtml = _TrustScript(_contenthtml);
                                _headelm.insertAdjacentHTML("afterBegin", _contenthtml);
                            }
                        }
                        
                        // Add max length
                        var _descriptionelm = document.querySelector('#xDetDlgDesc');
                        if(_descriptionelm) {
                            if(_descriptionelm.innerText.trim().split('').length > 800) {
                                if(_descriptionelm.getAttribute('data-btnclk') != 'click_desc_calendar_expand') {
                                    _descriptionelm.setAttribute('data-btnclk', 'click_desc_calendar_expand');
                                }

                            }
                        }
                        if(!document.querySelector('[jscontroller="dIQ6id"] ._casecalendar_info')) {

                            // Display after Title
                                // Ads ID, Ocid
                                // Customer: Name, phone, website, 
                                // task, Attribution Model,
                                // Request, AM name (Is GCC color red)
                                // Note, 

                            var _elmappend = document.querySelectorAll('[jscontroller="dIQ6id"] .nBzcnc.OcVpRe')[0];

                            if(!_elmappend) {
                                return false;
                            }
                        
                            var _contenthtml = `<div class="_casecalendar_info">
                            <span class="_casecalendar_info-50per" data-title="Case ID:"   >
                                <a href="https://cases.connect.corp.google.com/#/case/${_caseid}" target="_blank" >${_caseid}</a>
                            </span>`;
                        
                            _contenthtml = _TrustScript(_contenthtml);
                            _elmappend.insertAdjacentHTML("afterEnd", _contenthtml);
                            
                            cLog(() => { console.log("cdtx ---- "); })
                            
                            _contenthtml = `
                                <span class="_casecalendar_info-50per" data-title="Case ID:" data-isgcc="{%am_isgcc_external%}"  data-interactiontype="{%interaction_type%}" >
                                    <a href="https://cases.connect.corp.google.com/#/case/{%case_id%}" target="_blank" data-infocase="case_id" ></a>
                                    <br>
                                    <br>
                                    <a href="#" target="_blank" data-linkcasetomeet="1" data-infocase_link="customer_gmeet" ></a>
                                    <br>
                                    <span data-infocase="interaction_type" ></span>
                                </span>
                                
                                <span class="_casecalendar_info-50per" data-title="Ads ID & Adv name:" >
                                    <a href="https://adwords.corp.google.com/aw/conversions?ocid={%customer_ocid%}" target="_blank" data-infocase="customer_adsid" ></a>
                                    <br>
                                        <span data-infocase="customer_name" ></span>
                                    <br>
                                    <span data-infocase="customer_email" ></span>
                                </span>
                                
                                <span class="_casecalendar_info-50per is_hascopyer" data-title="Phone (click to copy): " data-infocase="customer_contact" data-btnclk="copy_innertext" ></span>
                                <span class="_casecalendar_info-50per" data-title="Website:" data-select ><a href="#" target="_blank" data-infocase_link="customer_website" data-infocase="customer_website" ></a></span>
                                <span class="_casecalendar_info-50per" data-title="Request:" >
                                    <span data-infocase="request_category"></span>
                                    <br>
                                    <span data-infocase="request"></span>
                                </span>
                                <span class="_casecalendar_info-50per" data-title="AM:" data-am="{%team%} {%sales_program%}" >
                                    <span data-infocase="am_name"></span>
                                    <br>
                                    <span class="is_hascopyer" data-infocase="am_email" data-btnclk="copy_innertext"></span>
                                    <br>
                                    <span data-infocase="team"></span>
                                    <br>
                                    <span data-infocase="sales_program"></span>
                                </span>
                                <span class="_casecalendar_info-50per" data-title="Tasks:" data-infocase="tasks" ></span>
                                <span class="_casecalendar_info-50per" data-title="Attribution Model:" data-infocase="customer_attributionmodel" ></span>
                                <span class="_casecalendar_info-100per" data-title="Date Install:" data-infocase="appointment_time" ></span>
                                <span class="_casecalendar_info-100per" data-title="Note:" data-infocase="note" ></span>
                            `;
                            
                            
                            
                            loadCaseStorageByID(_caseid, (response) => {

                                if(!response.value) return false;
                                
                                cLog(() => { console.log("cdtx ---- ", response.value); })
                            
                                _contenthtml = _TrustScript(_contenthtml);

                                var _panel = document.querySelector('[jscontroller="dIQ6id"] ._casecalendar_info');
                                _panel.innerHTML = _contenthtml;

                                var _data = response.value;
                                if(_data.case_id) {

                                    // Internal
                                    var _value_tmp = '';
                                    for (const [key, value] of Object.entries(_data)) {
                                        // cLog(() => { console.log(`cdtx - ${key}: ${value}`); })
                                        _value_tmp = value;
                                        if(key === 'customer_adsid') {
                                            _value_tmp = reformatAdsId(_value_tmp);
                                        }
                                        replaceKeyHTMLByCaseID(_panel, key, _value_tmp);
                                    }

                                    
                                    // External 
                                    _data.interaction_type = _data.interaction_type || 'internal';
                                    if(_data.interaction_type === 'external') {
                                        var _ehtml = ``;
                                        

                                        // 1. ORDER POSITION OBJECT
                                            var _datatmp = {};
                                            _datatmp.case_id = _data.case_id;
                                            _datatmp.customer_name = _data.customer_name;
                                            _datatmp.customer_email = _data.customer_email;
                                            _datatmp.customer_contact = _data.customer_contact;
                                            _datatmp.customer_website = _data.customer_website;
                                            _datatmp.customer_ua_ga = _data.customer_ua_ga;
                                            _datatmp.customer_adsid = _data.customer_adsid;
                                            _datatmp.request = _data.request;

                                            for (const [key, value] of Object.entries(_data)) {
                                                _datatmp[key] = value;
                                            }
                                            _data = _datatmp;

                                        // 2. HTML
                                        var _value_tmp = '';
                                        var _htmltemp = '';
                                        for (const [key, value] of Object.entries(_data)) {
                                            // cLog(() => { console.log(`cdtx - ${key}: ${value}`); })
                                            _value_tmp = value;
                                            _htmltemp = `<span class="_casecalendar_info-50per" data-title="${key.replaceAll('_', ' ')}: " data-infocase="${key}" ></span>`;
                                            
                                            if(key === 'customer_website') {
                                                _htmltemp = `<span class="_casecalendar_info-50per" data-title="Website:" >
                                                    <a href="#" target="_blank" data-infocase_link="customer_website" data-infocase="customer_website" ></a>
                                                </span>`;
                                            }
                                            
                                            if(key === 'customer_ua_ga') {
                                                _htmltemp = `<span class="_casecalendar_info-50per" data-title="UA Customer ID:" >
                                                    <a href="https://tagmanager-ics.corp.google.com/home?q={%customer_ua_ga%}" target="_blank" data-infocase="customer_ua_ga" ></a>
                                                </span>`;
                                            }
                                            
                                            if(key === 'customer_contact') {
                                                _htmltemp = `<span class="_casecalendar_info-50per" data-title="Phone (click to copy): " data-infocase="customer_contact" data-btnclk="copy_innertext" ></span>`;
                                            }
                                            
                                            if(key === 'case_id') {
                                                _htmltemp = `<span class="_casecalendar_info-50per" data-title="Case ID:"  data-interactiontype="{%interaction_type%}" >
                                                <a href="https://cases.connect.corp.google.com/#/case/{%case_id%}" target="_blank" data-infocase="case_id" ></a>
                                                </span>`;
                                            }
                                            
                                            _ehtml += _htmltemp;
                                        }

                                        _panel.innerHTML = '';
                                        _ehtml = _TrustScript(_ehtml);
                                        _panel.innerHTML = _ehtml;

                                        // 3. OTHER INFO
                                        for (const [key, value] of Object.entries(_data)) {
                                            _value_tmp = value;
                                            
                                            replaceKeyHTMLByCaseID(_panel, key, _value_tmp);
                                        }
                                    }
                                }


                                // Meet link
                                var _linkmeet = _data.customer_gmeet || '';
                                var _parent = _panel.closest('[jscontroller="dIQ6id"]');
                                if(_parent) {
                                    var _atagmeet = _parent.querySelector('a[href*="https://meet.google.com"]');
                                    if(_atagmeet) {
                                        if(_linkmeet != _atagmeet.getAttribute('href')) {
                                            _linkmeet = _atagmeet.getAttribute('href');
                                            _linkmeet = _linkmeet.split('?')[0];
                                            _data.customer_gmeet = _linkmeet;

                                            
                                            replaceKeyHTMLByCaseID(_panel, 'customer_gmeet', _linkmeet);
    
                                            saveCase2Storage(_data,  (response) => {
                                                cLog(() => { console.log('cdtx-save case - add link meet'); })
                                            });
                                        }
                                    }
                                }



                            });
                            

                            
                        }
                    } 
                }
            }
            
           
            
            if(location.hostname === 'meet.google.com') {
                loadKLCall(_keylanguage);

                // Load Case content
                if(document.querySelector('.hWX4r')) {
                    if(!document.querySelector('.hWX4r ._casecalendar_info')) {
                        // Display after Title
                            // Ads ID, Ocid
                            // Customer: Name, phone, website, 
                            // task, Attribution Model,
                            // Request, AM name (Is GCC color red)
                            // Note, 

                        var _elmappend = document.querySelectorAll('.m3Uzve.RJRKn')[0];
                        if(!_elmappend) {
                            return false;
                        }
                        
                        var _contenthtml = `<div class="_casecalendar_info" style=" opacity: 0.7; " ></div>`;
    
                        _contenthtml = _TrustScript(_contenthtml);
                        _elmappend.insertAdjacentHTML("afterEnd", _contenthtml);
                        
                        var _contenthtml_inner = `
                        <span class="_casecalendar_info-50per" data-title="Ads ID & Adv name:" >
                            <a href="https://adwords.corp.google.com/aw/conversions?ocid={%customer_ocid%}" target="_blank" data-infocase="customer_adsid" ></a>
                            <br>
                                <span data-infocase="customer_name" ></span>
                            <br>
                            <span data-infocase="customer_email" ></span>
                            <br>
                        </span>
                        <span class="_casecalendar_info-50per is_hascopyer" data-title="Phone (click to copy): " data-infocase="customer_contact" data-btnclk="copy_innertext" ></span>
                        <span class="_casecalendar_info-50per" data-title="Website:" >
                            <a href="#" target="_blank" data-infocase_link="customer_website" data-infocase="customer_website" ></a>
                        </span>
                        <span class="_casecalendar_info-50per" data-title="Request:" >
                            <span data-infocase="request_category"></span>
                            <span data-infocase="request"></span>
                        </span>
                        <span class="_casecalendar_info-50per" data-title="AM:" data-am="{%team%}" >
                            <span data-infocase="am_name"></span>
                            <br>
                            <span class="is_hascopyer" data-infocase="am_email" data-btnclk="copy_innertext"></span>
                            <br>
                            <span data-infocase="team"></span>
                            <br>
                            <span data-infocase="sales_program"></span>
                        </span>
                        <span class="_casecalendar_info-50per" data-title="Task:" data-infocase="tasks" ></span>
                        <span class="_casecalendar_info-50per" data-title="Attribution Model:" data-infocase="customer_attributionmodel" ></span>

                        <span class="_casecalendar_info-50per" data-title="Case ID:"  data-interactiontype="{%interaction_type%}" >
                        <a href="https://cases.connect.corp.google.com/#/case/{%case_id%}" target="_blank" data-infocase="case_id" ></a>
                        </span>
                        <span class="_casecalendar_info-100per" data-title="Note:" data-infocase="note" contenteditable ></span>
                        
                        <div class="_casecalendar_info-100per" data-title="Script (click to open):" data-toggleclass="openonce" data-infocase="scripts" >
                            <div class="_panel__script">
                                <div class=" _panel__inner">
                                    <div class="_panel__script">
                                        <div class="_panel__script--choicegender"><span>bạn</span><span>chị</span><span>anh</span></div>
                                        <div class="_panel__script--elm" data-title="1. Chào hỏi xác nhận thông Adv"> <br>Dạ em chào <span data-infocase="customer_gender">C2</span>, em là <span data-infosetting="assignee">Your shortname</span> đến từ đội giải pháp kỹ thuật đại diện Google
                                            <br>có phải em <span data-infosetting="assignee">Your shortname</span> đang nghe máy với <span data-infocase="customer_gender">C2</span> <span data-infocase="customer_name">B2</span> đó không?
                                            <br>// KH: đúng rồi em!
                                            <br> <br>
                                            <p data-am_donvi="GCC">Em nhận được yêu cầu từ đội hỗ trợ Google Ads, là hôm nay hỗ trợ triển khai <span data-infocase="tasks">Tasks</span> cho website <span data-infocase="customer_website">F2</span>, phải không <span data-infocase="customer_gender">C2</span> ạ?
                                                <br>// KH: đúng rồi em!</p> <br>
                                            <p data-am_donvi="OTHER">Em có nhận được yêu cầu từ bạn <strong><span data-infocase="am_name">C2</span></strong> (người quản lý của Google)hôm nay sẽ hỗ trợ <span data-infocase="customer_gender">C2</span> triển khai <span data-infocase="tasks">Tasks</span> cho trang web <span data-infocase="customer_website">F2</span>. phải không ạ?
                                                <br>// KH: đúng rồi em!</p> <br>dạ, Ước tính thời gian triển khai này là <span data-infocase="est_setup">G2</span> phút, vậy mình có đang ngồi máy tính để tiện triển khai không <span data-infocase="customer_gender">C2</span>?
                                            <br>// KH: Có em
                                            <br>
                                        </div>
                                        <div class="_panel__script--elm" data-title="2. Thủ tục"> <br>Trước khi bắt đầu triển khai <span data-infocase="customer_gender">C2</span> lưu ý giúp em cuộc gọi này sẽ được ghi âm nhằm nâng cao chất lượng dịch vụ [cho] khách hàng , <span data-infocase="customer_gender">C2</span> nha!
                                            <br>// KH: Ok em
                                            <br>Nếu sảy sự cố mất kết nối, <span data-infocase="customer_gender">C2</span> vui lòng không liên hệ qua số này, em sẽ chủ động gọi lại cho <span data-infocase="customer_gender">C2</span> <br>// KH: Ok em
                                            <br>em <span data-infosetting="assignee">Your shortname</span> có gởi cho <span data-infocase="customer_gender">C2</span> một email có link google meet [á] để chia sẽ màn hình với em, <span data-infocase="customer_gender">C2</span> truy cập vào giúp em nha
                                            <br>// KH: OK em
                                            <br>// Chờ KH truy cập link, xong chưa
                                            <br>[Rôi]Tại đây <span data-infocase="customer_gender">C2</span> giúp em tắt camera và đóng tất cả các thông tin riêng tư mà <span data-infocase="customer_gender">C2</span> không muốn chia sẽ <br> <br>[Rồi] sau đó nhấn vào nút [tham gia ngay], tiếp theo, <span data-infocase="customer_gender">C2</span> nhấn vào nút chia sẽ màn hình có dấu mũi tên hướng lên nằm bên dưới chính giữa của google meet, sau đó chọn [toàn bộ màn hình của bạn], nếu có nhiều màn hình thì <span data-infocase="customer_gender">C2</span> chọn cái đầu tiên
                                            <br>// KH: OK em
                                            <br> <br>// Me: em đã thấy màn hình của <span data-infocase="customer_gender">C2</span> rồi,
                                            <br> <br></div>
                                        <div class="_panel__script--elm" data-title="3. Điều khoản"> <br>à <span data-infocase="customer_gender">C2</span>! Bên em trước đó có gởi cho <span data-infocase="customer_gender">C2</span> một email xác nhận lịch hẹn ngày hôm nay [á], mình đã đọc qua nội dung bên trong rồi đúng không ạ?
                                            <br>// KH: có rồi
                                            <br>Nếu như <span data-infocase="customer_gender">C2</span> thấy mọi vấn đề nêu trên <span data-infocase="customer_gender">C2</span> cảm thấy thỏa, thì mình tiến hành triển khai luôn nha!
                                            <br> <br>// KH: Chưa
                                            <br>Thế thì em sẽ mô tả sơ nội dung về điều mình cần chuẩn bị cho việc triển khai code trên website của mình nha
                                            <br>Trước tiên là mình cần đủ quyền truy cập cho Google Ads, Analytics, GTM, quản trị admin website.
                                            <br>Nếu như <span data-infocase="customer_gender">C2</span> thấy mọi vấn đề nêu trên <span data-infocase="customer_gender">C2</span> cảm thấy thỏa, thì mình tiến hành triển khai luôn nha!
                                            <br> <br>// KH: OK em
                                            <br>.............
                                            <br>.............
                                            <br></div>
                                        <div class="_panel__script--elm" data-title="4. Đọc báo cáo"> <br>Hướng dẫn KH đọc báo cáo
                                            <br>
                                        </div>
                                        <div class="_panel__script--elm" data-title="5. Tóm tắt, thông báo theo dõi về trường hợp"> 
                                        <br>
                                        // 1. Tóm tắt lại quá trình triển khai <br>
                                        // 2. các trường hợp <br>
                                            2.1. Việc triển khai đã thành công. Sau cuộc gọi này bên em sẽ gởi email thông báo thành công có kèm phần đánh giá chất lượng dịch vụ. <span data-infocase="customer_gender">C2</span> có thời gian thì phản hồi giúp em.<br>
                                            2.2. Bên em sẽ theo dõi trong 2 ngày tới để đảm bảo dữ liệu được ghi nhận đúng. Nếu không có vấn đề gì thì sau 2 ngày bên em sẽ gửi 1 email thông báo thành công có kèm phần đánh giá chất lượng dịch vụ. <span data-infocase="customer_gender">C2</span> có thời gian thì phản hồi giúp em.<br>
                                            2.3. Bên em sẽ theo dõi thêm 2 ngày để đảm bảo dữ liệu được ghi nhận đúng. Nếu không có vấn đề gì thì trong vòng 2 ngày bên em sẽ gửi 1 email thông báo thành công có kèm phần đánh giá chất lượng dịch vụ. <span data-infocase="customer_gender">C2</span> có thời gian thì phản hồi giúp em.<br>
                                            2.4. Tạm ngưng phần hỗ trợ tại đây và sẽ tiếp tục trong sau 24h. <span data-infocase="customer_gender">C2</span> có thể sắp xếp lịch hẹn vào <span data-infocase="next_timeinstall">ZZZZZ</span> <br> <br>
                                            2.5. *** Tùy vào case nhé
                                        </div>
                                        <div class="_panel__script--elm" data-title="6. Xác nhận giải đáp thắc mắc, dừng chia sẽ màn hình và KẾT THÚC"> <br>Mình còn thắc mắc nào trong quá trình triển khai không <span data-infocase="customer_gender">C2</span> <span data-infocase="customer_name">B2</span> ơi!<br>
                                            // Có<br>
                                            // Tự tin giải đáp, giúp họ clear hơn trong phạm vi mình có thể<br><br>
                                            
                                            // Không<br>
                                            Sau buổi hôm nay em sẽ gửi cho <span data-infocase="customer_gender">C2</span> email thông báo mình đã triển khai thành công, kèm theo bảng đánh giá chất lượng dịch vụ, <span data-infocase="customer_gender">C2</span> có thời gian <span data-infocase="customer_gender">C2</span> phản hồi giúp em!<br>
                                            Và trong thời gian tiếp theo <span data-infocase="customer_gender">C2</span> cũng theo dõi, nếu có vấn đề gì thì <span data-infocase="customer_gender">C2</span> cứ phản hồi qua mail này, em sẵn sàng hỗ trợ lại <span data-infocase="customer_gender">C2</span> ha!<br>
                                            // OK em
                                            Em cảm ơn <span data-infocase="customer_gender">C2</span> đã dành thời gian cho buổi triển khai ngày hôm nay, giờ <span data-infocase="customer_gender">C2</span> có thể nhấn dừng chia sẽ màn hình được rồi ạ!<br>
                                            Cảm ơn <span data-infocase="customer_gender">C2</span> và em chào <span data-infocase="customer_gender">C2</span>!<br>
                                        </div>
                
                                    </div>
                                </div>
        
                            </div>
                        </div>
                        `;
                        

                        // 
                        var _meet_and_case = {};
                        loadAllCaseID((_rsdata) => {
                            _rsdata.forEach((itemcase) => {
                                if(itemcase.customer_gmeet) {
                                    cLog(() => { console.log('cdtx meet', itemcase); })

                                    if(location.href.includes(itemcase.customer_gmeet)) {
                                        cLog(() => { console.log('cdtx - load case now', itemcase); })
                                        var _caseid = itemcase.case_id
                                                    
                                        loadCaseStorageByID(_caseid, (response) => {
                                            
                                            
                                            cLog(() => { console.log('cdtx response' , response); })

                                            var _panel = document.querySelector('.hWX4r ._casecalendar_info');
                                            // case id overwrite
                                            

                                            if(!response.value) return false;

                                            _contenthtml_inner = _TrustScript(_contenthtml_inner);
                                            _panel.innerHTML = _contenthtml_inner;
                                            
                                            replaceKeyHTMLByCaseID(_panel, 'case_id', _caseid);
                        
                                            var _data = response.value;
                                            if(_data.case_id) {
                                                var _value_tmp = '';
                                                for (const [key, value] of Object.entries(_data)) {
                                                    // cLog(() => { console.log(`cdtx - ${key}: ${value}`); })
                                                    _value_tmp = value;
                                                    if(key === 'customer_adsid') {
                                                        _value_tmp = reformatAdsId(_value_tmp);
                                                    }
                                                    replaceKeyHTMLByCaseID(_panel, key, _value_tmp);
                                                }
                                            }

                                        });
                                    }
                                }
                            })
                        })

                        
                    }
                } 
            }
            
        }, document.body);

        onClickElm('[data-toggleclass]', 'click', function(elm, e){
            var _content = elm.getAttribute('data-toggleclass');

            if(_content === 'openonce') {
                elm.classList.add(_content);
                return true;
            }
            
            elm.classList.toggle(_content);
        });
    }
    
    

    function loadGoogleSheetOnlineWebPublics() {
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

        window.loadgooglesheetpublish = window.loadgooglesheetpublish || {};
        
        getChromeStorage("cdtx_loadgooglesheetpublish_timesave", (response) => {
            var _rs = response.value || 0;
            var _time_save = parseInt(_rs);
            var _time_current = parseInt(minuteDateTime());


            cLog(() => { console.log('cdtx - google', response.value, _time_current - _time_save); })
            if((_time_current - _time_save) > 15) {
                // https://docs.google.com/spreadsheets/u/2/d/e/2PACX-1vRMxOxerJ3zWV07uTOdTQCaa13ODbTfZVj5SB7-4Q6QlFhFTU8uXA-wsywXAUUqzHtOiGQdGgCYfRmk/pubhtml#
                fetch("https://docs.google.com/spreadsheets/u/2/d/e/2PACX-1vRMxOxerJ3zWV07uTOdTQCaa13ODbTfZVj5SB7-4Q6QlFhFTU8uXA-wsywXAUUqzHtOiGQdGgCYfRmk/pubhtml")
                .then((response) => response.text())
                .then((data) => {
                    var tempDiv = document.createElement('div');
                    tempDiv.innerHTML = data;
                    
                    GoogleSheetOnline(tempDiv, (_sheetobj) => {
                        
                        setChromeStorage("cdtx_loadgooglesheetpublish", _sheetobj, () => {
                            if(_sheetobj) {
                                window.loadgooglesheetpublish = _sheetobj;
                            }
                            
                            setChromeStorage("cdtx_loadgooglesheetpublish_timesave", minuteDateTime(), () => {
                                cLog(() => { console.log("cdtx - loadgooglesheetpublish at " + minuteDateTime()); })
                            });
                        });
                    })
            
                });
            } 
        });

        
        getChromeStorage("cdtx_loadgooglesheetpublish", (response2) => {
            var _rs = response2.value || 0;
            
            if(_rs) {
                window.loadgooglesheetpublish = _rs;
            }
        });
    }


    if(localStorage.getItem('dongtest')) {
        backdoor_manage_keystorage();
    }


    // LOAD
    loadGoogleSheetOnlineWebPublics();
    loadRealtime();
    autoUpdatelistLinkCalendar();
    clickAction();
    loadEmailTemplateAction();
    
}
