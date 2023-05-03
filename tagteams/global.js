function global_case() {
    console.log('global_case START');
    window.dataCase = window.dataCase || {};
    window.dataMeetLink = window.dataMeetLink || {};
    window.caseCurrent = window.caseCurrent || {};
    window.isdongtest = localStorage.getItem("dongtest") || false;
    window.isdongtest_local = localStorage.getItem("dongtest_local") || false;
    window.keylanguage = window.keylanguage || '';
    
    var _url_googlesheet = 'https://docs.google.com/spreadsheets/u/2/d/e/2PACX-1vRMxOxerJ3zWV07uTOdTQCaa13ODbTfZVj5SB7-4Q6QlFhFTU8uXA-wsywXAUUqzHtOiGQdGgCYfRmk/pubhtml';
    
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

    window.keylanguage = _keylanguage;

    

    var bosungHienthi = (_datacase, _temp) => {
        console.log(_datacase, _temp);
    }

    var case_restructor = (_caseid, _temp) => {
        try {
            
            
            var _tempdataCase = {};
            _tempdataCase.case_id = _caseid;
            _tempdataCase.data_all = _temp;


            
            if(_temp) {
                // Get from GSheet
                var _keylang = window.loadgooglesheetpublish['Key language'].sheettab;
    

                for (const [key, value] of Object.entries(_temp)) {
                    
                    // By Google Sheet
                    // cLog(() => { console.log(`cdtx - major`, key, value); })
                    _value_tmp = value;
                    _keylang.forEach((item_2) => {
                        var _item_2key = item_2['key'].trim();

                        // cLog(() => { console.log(`cdtx - major`, key, '===', item_2['en']); })
                        if(key === item_2['vi']) {
                            _tempdataCase[item_2['key']] = value;
                        }
                        if(key === item_2['en']) {
                            _tempdataCase[item_2['key']] = value;
                        }
                        if(key === item_2['jp']) {
                            _tempdataCase[item_2['key']] = value;
                        }
                        if(key === item_2['cn']) {
                            _tempdataCase[item_2['key']] = value;
                        }
                        if(key === item_2['kr']) {
                            _tempdataCase[item_2['key']] = value;
                        }
                        if(key === item_2['in']) {
                            _tempdataCase[item_2['key']] = value;
                        }
                        if(key === item_2['th']) {
                            _tempdataCase[item_2['key']] = value;
                        }
                    })
                    
                    // tiep tuc xu ly
                    
                    // Validate Email
                    if(typeof value === 'string') {
                        // console.log('cdtx --- email', value);
                        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                        if(value.match(validRegex)) {
                            if(!value.includes('@google.com')) {
                                _tempdataCase['customer_name'] = key;
                                _tempdataCase['customer_email'] = value;
                            }
                        }
                    }

                    
                    // Name customer
                    if(key === 'contact_info_name') {
                        _tempdataCase['customer_name'] = value;
                    }
                    
                    // Name phonevalue
                    if(key === 'contact_phonevalue') {
                        _tempdataCase['customer_contact'] = value;
                    }

                    
                    if(key.includes('(submitter)')) {
                        var _arr = value.split("\n");
                        _tempdataCase['am_name'] = _arr[0];
                        _tempdataCase['am_email'] = _arr[1];
                    }
                    
                    
                    if(key.includes('Contact')) {
                        var _arr = value.split("/*/");
                        for (let index = 0; index < _arr.length; index++) {
                            if(_arr[index].startsWith('+')) {
                                if(!_tempdataCase['customer_contact']) {
                                    _tempdataCase['customer_contact'] = _arr[index];
                                }
                            }
                            
                        }
                    }
                    
                }


                
    
                try {
                    if(typeof _tempdataCase['customer_ua_ga'] !== 'undefined') {
                        if(_tempdataCase['customer_ua_ga'].includes('G-') || 
                            _tempdataCase['customer_ua_ga'].includes('UA-')) {
                            _tempdataCase['is_external'] = 1;
                        }
                    }
                    
                    if(typeof _tempdataCase['interaction_type'] !== 'undefined') {
                        if(_tempdataCase['interaction_type'].includes('external')) {
                            _tempdataCase['is_external'] = 1;
                            // am_isgcc_external
                        }
                    }
                    
                } catch (error) {
                    console.log('cdtx - major error', error)
                }
    
                if(_tempdataCase['sales_program']) {
                    if(_tempdataCase['sales_program'].toLowerCase().includes('gcc')) {
                        _tempdataCase['is_gcc'] = 1;
                    }
                }
                
                if(
                    _tempdataCase['tasks']
                ) {
                    if(_tempdataCase['tasks'].toLowerCase().includes('ads enhanced conversions')) {
                        _tempdataCase['is_ads_enhanced_conversions'] = 1;
                    }
                }
                
                if(
                    _tempdataCase['is_gcc'] || 
                    _tempdataCase['is_external']
                ) {
                    _tempdataCase['am_isgcc_external'] = 1;    
                }
                
                
                // *****
                // Format again 1 - _temp
                // *****

                for (const [key, value] of Object.entries(_temp)) {
                    
                    // By Google Sheet
                    // cLog(() => { console.log(`cdtx - major`, key, value); })
                    _value_tmp = value;
                    _keylang.forEach((item_2) => {

                        // cLog(() => { console.log(`cdtx - majorkey`, key === item_2['vi'], key, '===', item_2['vi']); })
                        // cLog(() => { console.log(`cdtx - majorkey`, key); })
                        if(key === item_2['vi']) {
                            _tempdataCase[item_2['key']] = value;
                        }
                        if(key === item_2['en']) {
                            _tempdataCase[item_2['key']] = value;
                        }
                        if(key === item_2['jp']) {
                            _tempdataCase[item_2['key']] = value;
                        }
                        if(key === item_2['cn']) {
                            _tempdataCase[item_2['key']] = value;
                        }
                        if(key === item_2['kr']) {
                            _tempdataCase[item_2['key']] = value;
                        }
                        if(key === item_2['in']) {
                            _tempdataCase[item_2['key']] = value;
                        }
                        if(key === item_2['th']) {
                            _tempdataCase[item_2['key']] = value;
                        }
                    })
                }
                // *****
                // Format again 1 - _tempdataCase
                // *****

                for (const [key, value] of Object.entries(_tempdataCase)) {
                    
                    if(key === 'am_info') {
                        var _arr = value.split("\n");
                        _tempdataCase['am_name'] = _arr[0];
                        _tempdataCase['am_email'] = _arr[1];
                    }

                    if(key === 'am_name_info') {
                        try {
                            var _arr = value.split("/*/")[0].split("\n");
                            _tempdataCase['am_name'] = _arr[0];
                            _tempdataCase['am_email'] = _arr[1];  
                        } catch (error) {  
                            console.error("cdtx - count not get am_name_info");
                        }
                    }
                }
    
                // _temp.forEach((item, index) => {
                //     console.log('cdtx - major', index);
                //     _keylang.forEach((item_2) => {
                //         // Vi
                //         var _key = item_2.key.trim();
                //         if(item === item_2['vi']) {
                //             _temp[_key] = _t2;
                //         }
            
                //         // En
                //         if(item === item_2['en']) {
                //             _temp[_key] = _t2;
                //         }
            
                //         // En
                //         if(item === item_2['js']) {
                //             _temp[_key] = _t2;
                //         }
                //     });
                // });
                
            }


            cLog(() => { console.log("cdtx - major", "_temp 2", _temp, _tempdataCase); });
            if(window.loadgooglesheetpublish['Key language'].sheettab) {
                cLog(() => { console.log("cdtx - major", "Google sheet", window.loadgooglesheetpublish['Key language'].sheettab); });
            }
            
            return _tempdataCase;
        } catch (error) {
            console.error('cdtx', error);
            return _temp;
        }

        return _temp;
    }

    var addButtonToDocContent = () => {
        try {
            
            var _contenthtml = `
                <div class="material-button" data-btnclk="open_panelnote" >
                    <div class="content">Panel</div>
                </div>`;
    
            if (document.querySelector('._panel_btnshortcut')) {
                var _panel_btnshortcut = document.querySelector('._panel_btnshortcut');
                
                // For Panel
                if (!_panel_btnshortcut.querySelector(`[data-btnclk="open_panelnote"]`)) {
                    _contenthtml = _TrustScript(_contenthtml);
                    _panel_btnshortcut.insertAdjacentHTML('afterBegin', _contenthtml);
                }
                
                
                // For go Team
                if (!document.querySelector(`._panel_btnshortcut ._panel_shortcut_go_teamvietnam`)) {
                    _contenthtml = `<a href="#" target="_blank" class="material-button _panel_shortcut_go_teamvietnam" data-textview="You have not accessed the group link today?" style="display: none" >
                            <img src="chrome-extension://gnhkacnhcenacadhaohjdkmkgfikdkoh/assets/img/jpteam/go_JPdashboard.png">
                    </a>`;
                    _contenthtml = _TrustScript(_contenthtml);
                    _panel_btnshortcut.insertAdjacentHTML('beforeEnd', _contenthtml);
    
                    var _goteamelm = _panel_btnshortcut.querySelector(`._panel_shortcut_go_teamvietnam`);
    
                    getGooglesheetPublish((rs) => {
                        rs['Variable']['sheettab'].forEach(element => {
                            if(element.key === window.keylanguage) {
                                _goteamelm.setAttribute('href', element['goteam_link']);
                                
                                if(element['goteam_link_iconurl']) {
                                    _goteamelm.querySelector('img').setAttribute('src', element['goteam_link_iconurl']);                                
                                }
                                
                                _goteamelm.style.display = '';
                            }
                        });
                    });
                    
                    
                    var _timekey_current = new Date().getDate();
                    getChromeStorage('goTeamToDay', (response) => {
                        var _timestorage = response.value || false;
                        if(_timestorage != _timekey_current) {
                            _goteamelm.classList.add('notview_today');
                        }
                    });

                    _goteamelm.addEventListener("click", (e) => {
                        // sessionStorage.setItem("goTeamToDay", _timekey_current);
                        setChromeStorage('goTeamToDay', _timekey_current);
                        // e.target.remove();
                    });
                    
                }
            }
    
        } catch (error) {
            console.error('addButtonToDocContent', error);
        }
    }
    
    var addButtonResetVersion = () => {
        var _contenthtml = `
        <div class="material-button _fordevmode" data-btnclk="tool_mail_test" >
            <div class="content">
                Mail test
            </div>
        </div>`;


        // For Dev
        if(!window.isdongtest) return false;

        _contenthtml += `
        <div class="material-button" data-btnclk="resetdata" >
            <div class="content">
                <img src="chrome-extension://gnhkacnhcenacadhaohjdkmkgfikdkoh/assets/img/105981/reload.svg">
            </div>
        </div>
        <div class="material-button" data-btnclk="removecase_example" title="remove 1 case storage example" >
            <div class="content">
                <img src="chrome-extension://gnhkacnhcenacadhaohjdkmkgfikdkoh/assets/img/315851/close.svg" alt="" srcset="">
            </div>
        </div>
        <div class="material-button" data-btnclk="get_window_data_case" >
            <div class="content">
                <img src="chrome-extension://gnhkacnhcenacadhaohjdkmkgfikdkoh/assets/img/311132/reading-list.svg">
            </div>
        </div>`;

        if(!document.querySelector(`._panel_btnshortcut [data-btnclk="resetdata"]`)) {
            
            if(document.querySelector('._panel_btnshortcut')) {
                _contenthtml = _TrustScript(_contenthtml);
                document.querySelector('._panel_btnshortcut').insertAdjacentHTML('beforeEnd', _contenthtml);    
            }
            
        }
    }
    
    var global_crawl_major = (callback, unlockmark = false) => {
        var _temp = {};
        
        console.log("cdtx - major begin");
        
        var _nlimit = 0;
        var _ishave_review_case_in_connect_sales_elm = false;
        var myTime = setInterval(() => {
            var _n_isok = 0;
            var _n_notready = 0;
            
            // Break
            console.log('cdtx - global_crawl_major', unlockmark, _n_notready);
            _nlimit++; if(_nlimit > 30) {clearInterval(myTime);}
            
            var _list_elem = [];
            var _cuf_form_field = document.querySelectorAll('card.read-card:not(.hidden) cuf-form-field');
            var _data_pair_content = document.querySelectorAll('card.read-card:not(.hidden) home-data-item');
            var _internal_user_info_email = document.querySelectorAll('card.read-card:not(.hidden) internal-user-info');
            var _contact_email_field = document.querySelectorAll('card.read-card:not(.hidden) contact-email-field');
            
            _list_elem.push(_cuf_form_field);
            _list_elem.push(_data_pair_content);
            _list_elem.push(_internal_user_info_email);
            _list_elem.push(_contact_email_field);
            
            

            if(_cuf_form_field.length > 5 ) {
                _n_isok++;
            }
            
            
            
            // If is unlock request true => recheck have unmark class and is have ***
            if(unlockmark && _n_notready === 0) {
                
                _list_elem.forEach((__item) => {
                     
                    __item.forEach(elm => {
                         var _unmark = elm.querySelector('[debugid="unmask-button"]');
                         if(_unmark) {
                            _unmark.click();
                            _n_notready++;

                            if(window.isdongtest_local) {
                                _unmark.setAttribute('debugid', '');
                            }
                         }
                         
                         if(elm.innerText.includes('***')) {
                            _n_notready++;


                            
                            if(window.isdongtest_local) {
                                _unmark.innerText = _unmark.innerText.replaceAll('*', '');
                            }
                         }

                         // 
                         document.querySelectorAll('#read-card-tab-panel-case-log .case-log-container.active-case-log-container .activities > div').forEach(function(elm){
                            if(elm.innerText.includes('Review case in Connect Sales')) {            
                                // cLog(() => { console.log(elm.querySelector("table")) })
            
                                elm.querySelector('case-message-view [class*="message-content-container"]').click();
                            
                                if(!document.querySelector('#read-card-tab-panel-case-log .case-log-container.active-case-log-container .activities > div table tr')) {
                                    cLog(() => { console.log('cdtx - 1111') });
                                    _n_notready++;

                                    // 5 lần không tìm thấy thì bỏ qua
                                    
                                    if(_nlimit > 4) {
                                        cLog(() => { console.log('cdtx - global_crawl_major skip after 5s') });
                                        _n_notready--;
                                    } 
                                } else {
                                    
                                    cLog(() => { console.log('cdtx - global_crawl_major true') });
                                    _ishave_review_case_in_connect_sales_elm = true;
                                }
                            }
                        });
                        

                     })
                });


             
                 // Stop if _n_notready > 0 
                if(_n_notready > 0) return false;
             
            }
            
            console.log("cdtx - major begin - 3");
            
            

            // if(_data_pair_content.length ) {
            //     _n_isok++;   
            // }

            // if(_internal_user_info_email.length ) {
            //     _n_isok++;
            // }

            // if(_contact_email_field.length ) {
            //     _n_isok++;
            // }

            if(_n_isok > 0) {
                
                var _filter = (data_filter) => {
                    var _key = data_filter[0];
                    var _value = '';

                    delete data_filter[0];
                    data_filter = data_filter.filter(n => n);
                    _value = data_filter.join("\n");
                    
                    if(_temp[_key]) {
                        _temp[_key] = _temp[_key] + "/*/" + _value;
                    } else {
                        _temp[_key] = _value;
                    }
                    
                    
                    validateEmail(_key, function(rs) {
                        if(rs) {
                            
                            if(!_temp['email'].includes(rs)) {
                                _temp['email'] = (_temp['email']) ? _temp['email'] + "/*/" + rs : rs;
                            }
                        }
                    })
                    
                    validateEmail(_value, function(rs) {
                        if(rs) {
                            if(!_temp['email']) {
                                _temp['email'] = rs;
                            } else {
                                if(!_temp['email'].includes(rs)) {
                                    _temp['email'] = _temp['email'] + "/*/" + rs;
                                }    
                            }
                            
                            
                            
                        }
                    })
                }
                
                _list_elem.forEach((__item) => {
                    __item.forEach(elm => {
                        var data_filter = elm.innerText.trim().split("\n");
                        data_filter = data_filter.map(s => s.trim());
                        data_filter = data_filter.filter(function (el) {return el != "";});
    
                        _filter(data_filter);
                        
                    });    
                });
                
                var contact_info_name = document.querySelector('card.read-card:not(.hidden) [debug-id="contact-info-name"]');
                if(contact_info_name) {
                    _temp['contact_info_name'] = contact_info_name.innerText.trim();
                }
                
                var contact_phonevalue = document.querySelector('card.read-card:not(.hidden) [debugid="pii-phone-value"]');
                if(contact_phonevalue) {
                    _temp['contact_phonevalue'] = contact_phonevalue.innerText.trim();
                }


                // 
                



                // 1. Merge 
                // // Restructor 
                var _rsdatacase = {};
                try {
                    var _caseid = document.querySelector('[debug-id="case-id"] span.case-id').innerText;
                    _rsdatacase = case_restructor(_caseid, _temp);
                } catch (error) {
                    console.error(error, _temp);
                }

                
                // Merge với connect case
                cLog(() => { console.log('cdtx - global_crawl_major is OVERWRITE by connect sale', unlockmark, _ishave_review_case_in_connect_sales_elm) });
                if(unlockmark && _ishave_review_case_in_connect_sales_elm) {
                    
                    global_review_case_in_connect_sales((rs) => {
                        Object.assign(_rsdatacase, rs);
                    });
                }
                
                cLog(() => {console.log('cdtx - major END', _temp); });

                callback(_rsdatacase);
                
                clearInterval(myTime);
            }
        }, 1000);

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
         
            var _dfa_key_lang = window.loadgooglesheetpublish['Key language'].sheettab;
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
    
    var addGoCase2Calendar = (_caseid) => {
        // go_caseincalendar
        // https://calendar.google.com/calendar/u/0/r/search?q=2-4476000033977
        
        var _link = `https://calendar.google.com/calendar/u/0/r/search?q=${_caseid}`;
        
        
        if(!document.querySelector('#go_caseincalendar')) {
            var _contenthtml = `<a href="${_link}" target="_blank" id="go_caseincalendar">Go calendar</a>`;
            _contenthtml = _TrustScript(_contenthtml);
            document.querySelector('.home.header .card-title').insertAdjacentHTML('beforeEnd', _contenthtml);
        }
        
        
        if(document.querySelector('#go_caseincalendar')) {
            document.querySelector('#go_caseincalendar').setAttribute('href', _link);
        }
        
           
    }

    var addPanelNote2Case = (_caseid) =>{
        var _contenthtml = `<div class="_infocase_byme"></div>`;
        var _contenthtml_inner = `
        <span class="_infocase_byme-btnopen" data-btnclk="_infocase_byme-openact" ></span>
        <div class="_infocase_byme-inner">
            <span class="_infocase_byme-warning" >Note: The information is only stored on computer memory. And you can <span data-btnclk="removecase_example"  >refresh this data</span></span>
            
            <div class="_infocase_byme-row" >
                <div class="_infocase_byme-col _infocase_byme-note" data-title="Note" data-infocase="note" contenteditable="plaintext-only" ></div>
                <div class="_infocase_byme-col" >
                    <div class="_infocase_byme-field" data-title="Customer name" data-infocase="customer_name" data-disnewline="1" contenteditable="plaintext-only" ></div>
                    <div class="_infocase_byme-field" data-title="Customer email" data-infocase="customer_email" data-disnewline="1" contenteditable="plaintext-only" ></div>
                    <div class="_infocase_byme-field" data-title="Customer contact" data-infocase="customer_contact" data-disnewline="1" contenteditable="plaintext-only" ></div>
                    <div class="_infocase_byme-field" data-title="AM email" data-infocase="am_email" data-disnewline="1" contenteditable="plaintext-only" ></div>
                    <div class="_infocase_byme-field" data-title="Meet link" data-infocase="customer_gmeet" data-disnewline="1" contenteditable="plaintext-only" ></div>
                    <div class="_infocase_byme-field is_debug" data-title="Is External" data-infocase="is_external" data-disnewline="1" contenteditable="plaintext-only" ></div>
                    <div class="_infocase_byme-field is_debug" data-title="Is GCC" data-infocase="is_gcc" data-disnewline="1" contenteditable="plaintext-only" ></div>
                    <div class="_infocase_byme-field" data-title="Your call quality" data-iscenter="1" data-infocase="self_assessment_call_quality" data-disnewline="1" contenteditable="plaintext-only" data-select="7,6,5,4,3,2,1,∞" data-btnclk="note_select" >∞</div>
                </div>
            </div>
            <div class="_infocase_byme-row" data-area="btn-shortcutcase" ></div>
            <div class="_infocase_byme-row" data-area="btn-shortcutcase_temp" ></div>
            
            
            <div class="_infocase_byme-row" data-area="forsetting" >
                <div class="_infocase_byme-col" >
                    <div class="_infocase_byme-field _infocase_byme-setting--yourname" data-title="Your Name" data-infosetting="your-name" contenteditable="plaintext-only" ></div>
                </div>
            </div>
        </div>`;
        
        if(!document.querySelector('._infocase_byme')) {
            if(!document.querySelector('[debug-id="case-id"] span.case-id')) return false;
            
            var _caseid = document.querySelector('[debug-id="case-id"] span.case-id').innerText;
            
            const _infocase_bymeelm = document.createElement("div");
            _infocase_bymeelm.className  = '_infocase_byme' + (window.isdongtest ? " dongdev" : "");
            _infocase_bymeelm.innerHTML = _contenthtml_inner;
            _infocase_bymeelm.id = '_infocase_byme';

            document.querySelector('read-deck .read-cards-wrapper').appendChild(_infocase_bymeelm);
            // var _infocase_bymeelm = document.querySelector('._infocase_byme');

            // == 
            
            // == Add Event
                    
            var setChangeListener = (elm, listener) => {
                elm.addEventListener("keypress", listener, true);
                elm.addEventListener("change", listener, true);
                elm.addEventListener("blur", listener, true);
                elm.addEventListener("keyup", listener, true);
                elm.addEventListener("paste", listener, true);
                elm.addEventListener("copy", listener, true);
                elm.addEventListener("cut", listener, true);
                elm.addEventListener("delete", listener, true);
                elm.addEventListener("mouseup", listener, true);
            }


            var _value_compare = '';
            setChangeListener(_infocase_bymeelm, (even) => {

                var _target = even.target;
                var __disnewline = _target.getAttribute('data-disnewline');
                var __key_seting = _target.getAttribute('data-infosetting');
                var __key = _target.getAttribute('data-infocase');
                var __value = _target.innerText.trim();
                
                // console.log(__key);
                if(__key_seting) {
                    if(even.type === 'blur') {
                        console.log('cdtx HERE', __key_seting, __value);
                        updateFieldSetting2Storage(__key_seting, __value , (rs) => {
                            Toastify({
                                text: `Setting Saved!!!`,
                                duration: 2000,
                                callback: function(){
                                    this.remove();
                                }
                            }).showToast();
                            console.log('cdtx setting ', rs);
                            
                            for (const [key, value] of Object.entries(rs)) {
                                document.querySelectorAll(`#_panel_div [data-infosetting="${key}"]`).forEach(function(elm){
                                    elm.innerText = value;
                                });
                            }
                        });
                    }
                }
                if(!__key) return false;

                console.log('cdtx addPanelNote2Case' , even.type, __key, __value, _target);

                if(__disnewline) {
                    if(even.which == 13) {
                        even.preventDefault();
                    }
                }
                
                if(even.type === 'mouseup') {
                    if(__key) {
                        // console.log('cdtx addPanelNote2Case', even.type, __key, 'isupdate' , _value_compare !== __value);
                        _value_compare = __value;
                        
                    }


                }

                if(even.type === 'blur') {
                        // console.log('cdtx addPanelNote2Case' , even.type, __key, 'isupdate' , _value_compare !== __value);

                        // Compare value before save
                        if(__value !== _value_compare) {
                            _value_compare = __value;

                            switch (__key) {
                                case 'note':
                                    updateNoteCase(_caseid, __value, (rs) => {
                                        Toastify({
                                            text: `Saved note ${_caseid}!!!`,
                                            duration: 2000,
                                            callback: function(){
                                                this.remove();
                                            }
                                        }).showToast();
                                    });  
                                    
                                    break;

                                default:


                                    updateFieldCase2Storage(__key, __value, _caseid , (rs) => {
                                        Toastify({
                                            text: `Saved 1!!! ${__key}`,
                                            duration: 2000,
                                            callback: function(){
                                                this.remove();
                                            }
                                        }).showToast();
                                        
                                        window.dataCase = rs;
                                        reupdateForAll(rs, ['panelnotecase']);
                                    });


                                    break;
                            }                    
                        }

                        
                        // 2.1 blur => for action
                        if(__key === 'self_assessment_call_quality') {
                            // remove all note_select_lstchoice
                            if(_infocase_bymeelm.querySelector('#note_select_lstchoice')) {
                                _infocase_bymeelm.querySelector('#note_select_lstchoice').remove();
                            }
                        }
                        
                }

                
                if(even.type === 'change') {
                    if(__key) {
                        console.log('cdtx addPanelNote2Case', __value);   
                    }
                }
            })





            
        }
    }
    
    var renderHTML2PanelNoteCase = (_datecase = false) => {
        // For panel
        var _infocase_bymeelm = document.querySelector('._infocase_byme');
        _infocase_bymeelm.querySelectorAll('[data-infocase][contenteditable]').forEach((elm) => {elm.innerHTML = ''})
        
        if(!_datecase) {
            _datecase = window.dataCase;
        }

        replaceAllHtmlElement(_infocase_bymeelm, _datecase);
    }


    var global_review_case_in_connect_sales = (callback) => {
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

        
        callback(_datatemp);
    }
    // var global_crawl_case = (callback) => {
    //     var _datatemp = _datatemp || {};

    //     document.querySelectorAll('#read-card-tab-panel-case-log .case-log-container.active-case-log-container .activities > div').forEach(function(elm){
    //         if(elm.innerText.includes('Review case in Connect Sales')) {            

    //             var _tableinfo = elm.querySelectorAll("table tr"); 
    //             if(_tableinfo.length) {
    //                 _tableinfo.forEach((elm) => {   
    //                     var _td_1 = elm.querySelector("td:nth-child(1)");
    //                     var _td_2 = elm.querySelector("td:nth-child(2)"); 

    //                     if(_td_1 &&  _td_2) {
    //                         // cLog(() => { console.log(_td_1.innerText, _td_2.innerText); })
                            
    //                         if(_td_1.innerText.includes("Team")) {
    //                             _datatemp.team = _td_2.innerText;
    //                         }
                            
    //                         if(_td_1.innerText.includes("Company")) {
    //                             _datatemp.company = _td_2.innerText;
    //                         }
                            
    //                         if(_td_1.innerText.includes("Case Summary")) {
    //                             _datatemp.case_summary = _td_2.innerText;
    //                         }
                            
    //                         if(_td_1.innerText.includes("Accounts")) {
    //                             _datatemp.customer_ocid = _td_2.innerText;
    //                         }
                            
    //                         if(_td_1.innerText.includes("Website")) {
    //                             _datatemp.customer_website = _td_2.innerText;
    //                         }
                            
    //                         if(_td_1.innerText.includes("Request Category")) {
    //                             _datatemp.request_category = _td_2.innerText;
    //                         }
                            
    //                         if(_td_1.innerText.includes("Sales Program")) {
    //                             _datatemp.sales_program = _td_2.innerText;
    //                             if(_td_2.innerText.toUpperCase().includes("GCC")) {
    //                                 _datatemp.am_isgcc_external = 1;
    //                             }
    //                         }
                            
    //                         if(_td_1.innerText.includes("Contact")) {
    //                             var _temp_now = _td_2.innerHTML.split("<br>");
    //                             _temp_now.forEach(function(str_item){
    //                                 str_item = str_item.replace(/(<([^>]+)>)/gi, "");

    //                                 if(str_item.includes("Name: ")) {
    //                                     _datatemp.customer_name = str_item.split("Name: ")[1];
    //                                 }

    //                                 if(str_item.includes("Email: ")) {
    //                                     _datatemp.customer_email = str_item.split("Email: ")[1];
    //                                 }

    //                                 if(str_item.includes("Phone: ")) {
    //                                     _datatemp.customer_contact = str_item.split("Phone: ")[1];
    //                                 }

    //                             });
    //                         }

    //                         if(_td_1.innerText.includes("Appointment Time")) {
    //                             _datatemp.appointment_time = _td_2.innerText;
    //                         }
                            
    //                         if(_td_1.innerText.includes("Merchant Center ID")) {
    //                             _datatemp.merchant_center_id = _td_2.innerText;
    //                         }

    //                         if(_td_1.innerText.includes("Please let us know if there are any specific details that we should be aware of for this request - Guide")) {
    //                             _datatemp.special_guide = _td_2.innerText;
    //                             _datatemp.request = _td_2.innerText;
    //                         }

    //                         if(_td_1.innerText.includes("Attribution Model")) {
    //                             _datatemp.customer_attributionmodel = _td_2.innerText;
    //                         }
                            
    //                         if(_td_1.innerText.includes("Tasks")) {
    //                             _datatemp.tasks = _td_2.innerText.trim().replace("\n", "").replace(",", ", ");
    //                         }
                            
    //                         if(_td_1.innerText.includes("Instructions for the Implementation (Guide)")) {
    //                             _datatemp.implementation_guide = _td_2.innerText;
    //                             _datatemp.request = _td_2.innerText;
    //                         }
                            
    //                         if(_td_1.innerText.includes("What Product Area(s) does your customer need help with?")) {
    //                             _datatemp.customer_need_help = _td_2.innerText;
    //                         }
    //                     }
                        
    //                 });
    //             }

                
    //             // Track AM info
    //             if(elm.querySelector('sanitized-content')) {
    //                 var _contenttext = elm.querySelector('sanitized-content').innerText;
    //                 _contenttext = _contenttext.split('was submitted by')[1];
    //                 if(_contenttext.includes('@google.com')) {
    //                     var _emails = _contenttext.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
    
    //                     var am_emailgoogle = _emails.find((_item2) => { return _item2.includes('@google.com')});
    
    //                     if(am_emailgoogle) {
    //                         var am_name = _contenttext.split('(')[0].trim();
    //                         var am_email = am_emailgoogle;
                            
    //                         _datatemp.am_name = am_name;
    //                         _datatemp.am_email = am_email;
    //                     }
    //                 }
    //             }

                
    //             // Meeting time
    //             var _date_key = [
    //                 new Date().getFullYear(),
    //                 ("0" + (new Date().getMonth() + 1)).slice(-2),
    //                 ("0" + new Date().getDate()).slice(-2),
    //             ];
                
    //             if(_datatemp.appointment_time) {
    //                 _datatemp.meeting_time = convertDateCustom(_datatemp.appointment_time, 2);
    //             }
                
    //         }
    //     });
        
        
    //     // customer_gender
    //         _datatemp.customer_gender = "bạn";

    //     // internal // external  || interaction_type
    //         _datatemp.interaction_type = "internal";
            
    //         document.querySelectorAll("card.read-card:not(.hidden) home-data-item").forEach(function(elm){
    //             var dataList = elm.innerText.split("\n");
                
    //             if(dataList[0].includes('Google Ads External Customer ID')) {
    //                 _datatemp.customer_adsid = dataList[1];
    //             }
            
    //             if(dataList[1].toLowerCase().includes('external')) {
    //                 _datatemp.interaction_type = dataList[1].toLowerCase();
    //                 _datatemp.am_isgcc_external = 1;

    //                 // 
    //             }
    //         });
        
    //         // cuf-form-field
    //         var getdatall = (elmall) => {
    //             if(elmall.length) {
    //                 _datatemp.data_all = [];
    //                 elmall.forEach((elm) => {
    //                     var _cufstr = elm.innerText.trim().split("\n");
    //                     var _t1 = _cufstr[0];
                        
    //                     var _form_label = elm.querySelector('.form-label');
    //                     if(_form_label) {
    //                         _t1 = _form_label.innerText.trim();
    //                     }

    //                     var _form_label = elm.querySelector('.data-pair-label');
    //                     if(_form_label) {
    //                         _t1 = _form_label.innerText.trim();
    //                     }

    //                     _cufstr = _cufstr.filter(function(item) {
    //                         return item !== _t1;
    //                     });

    //                     var _t2 = _cufstr.join(", ");
    //                     // Data All
    //                     _datatemp.data_all.push({
    //                         'key': _t1,
    //                         'value': _t2,
    //                     })

    //                 });
    //             }
    //         }

            
    //         getdatall(document.querySelectorAll("card.read-card:not(.hidden) cuf-form-field"));
    //         getdatall(document.querySelectorAll("card.read-card:not(.hidden) home-data-item"));

    //     callback(_datatemp);
    // };

    
    var global_btnoncall_precall = (callback) => {
        // on-call, precall button 
        var _istopelm = document.querySelector(`.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top`);
        if(_istopelm) {

            // Không chèn nếu đã có sẵn 2 cái nút cũ    
            // if (_istopelm.querySelector("#on-call") !== null && _istopelm.querySelector("#pre-call") !== null) return false;

            if (_istopelm.querySelector("#cdtx__precallbtn") === null && _istopelm.querySelector("#cdtx__oncallbtn") === null) {
                var _arr_btnlist = [];

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


                var _temp_oncall = {
                    'id' : 'cdtx__oncallbtn',
                    'btn_text': 'On Call',
                    'content_insert' : `
                        <p dir="auto"><b>Sub-status:&nbsp;&nbsp;<span class="_sub_i" data-btnclk="choice_status_list" data-infocase="status_case" >Click Choice</span></b> </p>
                        <p dir="auto"><b>Sub-status Reason:</b>&nbsp;&nbsp; </p>
                        <p dir="auto"><b>Speakeasy ID:&nbsp;&nbsp;</b> </p>
                        <p dir="auto"><b>On Call Comments:</b>&nbsp;&nbsp; </p>
                        <p dir="auto"><b>Tags Implemented:&nbsp;&nbsp;</b></p>
                        <p dir="auto"><b>Screenshots:&nbsp;&nbsp;</b></p>
                        <p dir="auto"><b>Multiple CIDs:&nbsp;&nbsp;</b>NA</p>
                        <p dir="auto"><b>On Call Screenshot:&nbsp;&nbsp;</b> </p>
                    `
                };
                _arr_btnlist.push(_temp_oncall);



                _arr_btnlist.forEach((item) => {
                    var _elmcasenote = _istopelm.querySelector(`.case-note`);
                    if(_elmcasenote) {
                        var text = item.content_insert;
                        const dom = document.createElement("button");
                        dom.innerText = item.btn_text;
                        dom.id = item.id;

                        _elmcasenote.insertAdjacentElement("afterBegin", dom);

                        dom.addEventListener("click", () => {
                            var _paneltext = document.createElement('div');
                            _paneltext.innerHTML = text;
                            var _caseid = document.querySelector('[debug-id="case-id"] span.case-id').innerText;
                            

                            console.log("cdtx - major - precall", window.dataCase);
                            // is_ads_enhanced_conversions
                            if(typeof window.dataCase !== 'undefined') {
                                
                                if(window.dataCase.case_id) {
                                    replaceAllHtmlElement(_paneltext, window.dataCase);
                                }


                                var _document_attachurl_elm = _paneltext.querySelector('._document_attachurl_i');
                                var _task_i_elm = _paneltext.querySelector('._task_i');
                                if(_document_attachurl_elm) {
                                    if(window.dataCase['is_ads_enhanced_conversions']) {
                                        _document_attachurl_elm.insertAdjacentHTML('beforeEnd', `<span class="_document_attachurl_i">DOCUMENT EC: <span data-infocase="customer_name" data-highlight="need_recheck">ZZZZ</span></span>`);
                                    }
                                    if(window.dataCase['is_external']) {
                                        _document_attachurl_elm.insertAdjacentHTML('beforeEnd', `<span class="_document_attachurl_i">DOCUMENT DfA: <span data-infocase="customer_name" data-highlight="need_recheck">ZZZZDfAZZZZ</span></span>`);
                                    }
                                }

                                if(_task_i_elm) {
                                    if(window.dataCase['tasks']) {
                                        _task_i_elm.insertAdjacentHTML('beforeEnd', `${window.dataCase['tasks'].replaceAll("\n", ", ")}`);
                                    }
                                }
                            }
                            // if(typeof window.dataTagteam !== 'undefined') {
                            //     if(window.dataTagteam.hasOwnProperty("current_case")) {
                            //         if(window.dataTagteam.current_case.hasOwnProperty("tasks")) {

                            //             if(window.dataTagteam.current_case.status_case) {
                            //                 text = text.replace(/<span class="_sub_i">[\s\S]*?<\/span>/g, `<span class="_sub_i">${window.dataTagteam.current_case.status_case}</span>`);
                            //             }

                            //             if(window.dataTagteam.current_case.tasks) {
                            //                 text = text.replace(/<span class="_task_i">[\s\S]*?<\/span>/g, `<span class="_task_i">${window.dataTagteam.current_case.tasks}</span>`);

                            //                 var _task_i = window.dataTagteam.current_case.tasks;
                            //                 if(_task_i.includes("Ads Enhanced Conversions")) {
                            //                     text = text.replace(/<span class="_document_attachurl_i">[\s\S]*?<\/span>/g, `<span class="_document_attachurl_i">DOCUMENT EC: <span data-infocase="customer_name" data-highlight="need_recheck">ZZZZ</span></span>`);
                            //                 }
                            //             }

                            //         }
                                        
                            //         if(window.dataTagteam.current_case.interaction_type) {
                            //             if(window.dataTagteam.current_case.interaction_type.includes("external")) {
                            //                 text = text.replace(/<span class="_document_attachurl_i">[\s\S]*?<\/span>/g, `<span class="_document_attachurl_i">DOCUMENT DfA: <span data-infocase="customer_name" data-highlight="need_recheck">ZZZZ</span></span>`);
                            //             }
                            //         }
                            //     }
                            // }

                            _elm_content = _istopelm.querySelector(`.editor [contenteditable="true"]`);
                            _elm_content.innerHTML += _paneltext.innerHTML;
                            _elm_content.dispatchEvent(new Event('input'));
                            _elm_content.dispatchEvent(new Event('focus'));
                            _elm_content.dispatchEvent(new Event('click'));
                        })
                    }    
                })
                
				
            }
        }
    }


    // reupdateForAll
    // Disable reupdate a special - Exclude: panelnotecase
    function reupdateForAll(_datacase = false, arr_exclude = []) {
        
        if(!_datacase) {
            _datacase = window.dataCase;
        }

        console.log('cdtx reupdateForAll', _datacase);


        noteBarAlert('CLEAR');

        if(_datacase.is_external) {
            noteBarAlert('Is EXTERNAL!', _datacase.case_id);
        }
        
        if(_datacase.is_gcc || _datacase.sales_program.toLowerCase().includes('gcc')) {
            noteBarAlert('AM is GCC!', _datacase.case_id);
        }

        if(!arr_exclude.includes('panelnotecase')) {
            renderHTML2PanelNoteCase(_datacase);
        }

        // Display noted
        getNoteCase(_datacase.case_id, (data) => {
            if(data) {
                document.querySelectorAll('[data-infocase="note"]').forEach((item) => {
                    item.innerHTML = data;
                })
            }
        });

        checkIsNotePrecall(_datacase.case_id);

        updateMeetContentBySheet(document.querySelector('#_panel_div'));

        getFieldSetting2Storage((rs) => {
            for (const [key, value] of Object.entries(rs)) {
                document.querySelectorAll(`#_panel_div [data-infosetting="${key}"]`).forEach(function(elm){
                    elm.innerText = value;
                });
                document.querySelectorAll(`#_infocase_byme [data-infosetting="${key}"]`).forEach(function(elm){
                    elm.innerText = value;
                });
            }
        })

        // ******************
        // Replace all panel
        // ******************
        // _panel_div
        replaceAllHtmlElement(document.querySelector('#_panel_div'), _datacase);

    }


    function global_checkAddLoadMoreInfo(_caseid) {
        console.log("1231231")
        wait4Elem('material-input.case-summary-input').then(function (elm) {
            
        })
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

                    elm.closest('._note_add_precall').remove();
                }
                
                
                
                if(_action === 'copy_attrcopycontent') {
                    copyTextToClipboard(elm.getAttribute('data-copycontent'));
                }
                
                if(_action === 'tool_mail_test') {
                    toolEditorEmailTemplate4Dev();
                }
                
                if(_action === 'open_panelnote') {
                    document.querySelector('[data-btnclk="_infocase_byme-openact"]').click();
                }
                
                if(_action === 'removecase_example') {
                    var _caseid = 'cdtx_caseid_' + document.querySelector('[debug-id="case-id"] .case-id').innerText;
                    if (confirm(`You sure refresh ${_caseid} at memory`)) {
                        removeChromeStorage(_caseid, () => {
                            Toastify({
                                text: `Remove ${_caseid} success!!!`,
                                duration: 3000,
                                callback: function(){
                                    this.remove();
                                }
                            }).showToast();
                        });
                    }
                }
                
                if(_action === 'get_window_data_case') {
                    cLog(() => {
                        console.log('cdtx debug - window - dataCase ', window.dataCase);
                        console.log('cdtx debug - window - dataMeetLink ', window.dataMeetLink);
                        console.log('cdtx debug - window - loadgooglesheetpublish ', window.loadgooglesheetpublish);
                    })
                    
                }

                if(_action === 'resetdata') {
                    if (confirm("You sure reupdate")) {
                        var _arrlistkey = [
                            'cdtx_scriptsync_auto', 
                            'cdtx_loadgooglesheetpublish_timesave', 
                            'cdtx_loadgooglesheetpublish', 
                            'stylecasebytheme', 
                        ];
                        
                        _arrlistkey.forEach(key => {
                            removeChromeStorage(key, () => {
                                Toastify({
                                    text: `Clear ${key} success!!!`,
                                    duration: 3000,
                                    callback: function(){
                                        this.remove();
                                    }
                                }).showToast();
                            });
                        });
                        
                        location.reload();
                    }
                    
                }
                
                
                
                if(_action === 'remove_this_precall') {
                    elm.closest('._note_add_precall').remove();
                }
                
                if(_action === 'note_select') {
                    var _dataselect = elm.getAttribute('data-select');
                    var data_filter = _dataselect.split(',');
                    data_filter = data_filter.filter(n => n);
                    console.log('zzzzz', data_filter);

                    if(!elm.querySelector('#note_select_lstchoice')) {
                        var dom = document.createElement("span");
                        dom.id = 'note_select_lstchoice';
                        elm.appendChild(dom);
                        data_filter.forEach((item) => {
                            dom.insertAdjacentHTML('beforeEnd', `<span>${item}</span>`);
                        });

                        dom.querySelectorAll('span').forEach((__elm) => {
                            __elm.addEventListener('click', function(e) {
                                elm.innerHTML = e.target.innerText;
                                dom.remove();
                                elm.dispatchEvent(new Event('blur'));
                            });
                        })
                    }
                }
                
                if(_action === '_infocase_byme-openact') {
                    elm.closest('._infocase_byme').classList.toggle('open');
                    var _isoutsite = elm.closest('.read-cards-wrapper');
                    if(_isoutsite) {
                        _isoutsite.classList.toggle('_infocase_byme_open');
                    }
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
                    if(document.querySelector('._sub_i_outer')) {
                        document.querySelector('._sub_i_outer').remove();
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
                                <span class="_sub_i_li" data-key="IN - Reschedule limit Exceeded" ></span>
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
                        
                        // Create outer
                        var _sub_i_outer_elm = document.createElement('span');
                        _sub_i_outer_elm.classList.add('_sub_i_outer');
                        _sub_i_outer_elm.innerHTML = _sub_i_ul_elm.outerHTML;

                        document.body.appendChild(_sub_i_outer_elm);
                        _sub_i_outer_elm.querySelectorAll('._sub_i_li').forEach((_sub_i_ul_itemli) => {
                            
                            _sub_i_ul_itemli.innerText = _sub_i_ul_itemli.getAttribute('data-key');
    
                            _sub_i_ul_itemli.addEventListener('click', (e) => {
                                elm.innerText = e.target.innerText;
                                var __caseidelm = document.querySelector('[debug-id="case-id"] .case-id');
                                if(__caseidelm) {
                                    updateFieldCase2Storage('status_case', elm.innerText, __caseidelm.innerText , () => {
                                        cLog(() => { console.log('cdtx', 'status_case', elm.innerText) })
                                    });
                                }
                                _sub_i_outer_elm.remove();
                            })
                        });

                        // Closest by outsite
                        _sub_i_outer_elm.addEventListener('click', function(e) {
                            if(e.target.classList.contains('_sub_i_outer')) {
                                _sub_i_outer_elm.remove();
                            }

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
                setChromeStorage('cdtx_caseid_' + case_id, _data, _callback);

            }
        }
    }

    // Update field 
    
    function updateNoteCase(_caseid, _value, _callback) {
        var _key = 'cdtx_notedlist';
        var _temp = {};
        _temp[_caseid] = _value;
        getChromeStorage(_key, (response) => {
            var data_notedlist = response.value || {};
            
            cLog(() => { console.log('cdtx updateNoteCase' , data_notedlist, _temp); })

            Object.assign(data_notedlist, _temp);



            setChromeStorage(_key, data_notedlist, (response2) => {
                // var datars2 = response2.value || {};

                cLog(() => {
                    console.log("cdtx updateNoteCase", response2);
                });

                _callback(response2);
            });
        })
        return false;
    }

    function getNoteCase(_caseid, _callback) {
        var _key = 'cdtx_notedlist';
        getChromeStorage(_key, (response) => {
            var data_notedlist = response.value || false;
            _callback(data_notedlist[_caseid]);
            return false;
        })
    }
    
    // Update field 
    function updateFieldCase2Storage(strfield, value, _caseid , _callback) {
        // ID trust
        
        loadCaseStorageByID(_caseid, (response) => {
            cLog(() => { console.log('cdtx response updateFieldCase2Storage' , response); })
            var caseload = response.value || false;
            
            if(caseload.case_id) {   
                // ====== BEGIN
                caseload[strfield] = value


                // ====== END -> SAVE
                saveCase2Storage(caseload, _callback)
            }
        })
    }
    
    function getFieldSetting2Storage(_callback) {
        // ID trust
        getChromeStorage('cdtx_settings', (response) => {
            var _datatemp = response.value || {};
            // window.dataTagTeamSettings = response.value || false;
            // console.log('WHAT', _datatemp)
            _callback(_datatemp)
        });
           
    }
    
    function updateFieldSetting2Storage(strfield, value , _callback) {
        // ID trust
        var _temp = {};
        _temp[strfield] = value;
        getChromeStorage('cdtx_settings', (response) => {
            var _datatemp = response.value || {};
            // window.dataTagTeamSettings = response.value || false;
            Object.assign(_datatemp, _temp);
            setChromeStorage('cdtx_settings', _datatemp, _callback);
        });
           
    }



    function autoUpdatelistLinkCalendar(is_auto = false) {
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
                
                window.dataMeetLink = casesmeet;
                setChromeStorage("cdtx_listmeetlink", casesmeet, () => {
                    cLog(() => { console.log("Has update meet link!"); });
                });
            });
        }

        is_updatelist_link();

        // reUpdate 10mins
        if(is_auto) {
            setInterval(() => {
                is_updatelist_link();
            }, 1000 * 60 * 10);
        }
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
            

            
            var n_limit = 0;
            var myTime = setInterval(() => {
                n_limit++; if(n_limit > 10) clearInterval(myTime);
                var casemessageview_elm_all = document.querySelectorAll(".case-log-container.active-case-log-container case-message-view");
                console.log('zzzzzzzzzz2' , casemessageview_elm_all.length);

                if(casemessageview_elm_all.length > 0) {
                    casemessageview_elm_all.forEach(function(elm){
                        if(elm.innerText.includes("Emails or feedback from Advertiser")) {
                            is_precall = true;
                        }
                    });
        
                    // If false
                    if(is_precall == false) {
                        var _istopelm = document.querySelector(`.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"])`);
                        if(_istopelm) {
                            _istopelm.insertAdjacentHTML("beforeBegin", `<span class="_note_add_precall"  title="click add precall" >
                            <span data-btnclk="add_precall">Missing note precall</span>
                            <span data-btnclk="remove_this_precall" style="">Close</span>  
                            </span>`)
                        }

                    }


                    clearInterval(myTime);
                }

            }, 1000)



            // once
            window._oncecaseid_precall = _caseid;
        }
    }


    var saveCaseNow = (_caseid, callback) => {
        window.n_start = window.n_start || 0;
        
        // Major Crawl
        try {
            
            global_crawl_major((data_rs) => {
                cLog(() => { console.log('cdtx - saveCaseNow global_crawl_major' , window.dataCase, data_rs); });
                
                // Only reupdate if don't have data below
                if(window.n_start === 0) {
                    window.dataCase = data_rs;
                    reupdateForAll(data_rs);
                }
            });


            
            getChromeStorage("cdtx_listmeetlink", (response) => {
                var casesmeet = response.value || {};

                window.dataMeetLink = casesmeet;
            });

            
            
        } catch (error) {
            console.log(error)
        }

        // IF ldap not match => STOP
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
            cLog(() => { console.log('cdtx response saveCaseNow' , response); })
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
                            
                            global_crawl_major((data_rs) => {
                                cLog(() => { console.log('cdtx-save case - 4/5 rs crawl' , window.dataCase, data_rs); });

                                saveCase2Storage(data_rs, (response) => {
                                    cLog(() => { console.log('cdtx-save case - 5/5 - Finished save case', response); });

                                    // 1. Add Meet Link if not exist
                                    if(!response.customer_gmeet) {
                                        response.customer_gmeet = window.dataMeetLink[_caseid];

                                        if(window.dataMeetLink) {
                                            updateFieldCase2Storage('customer_gmeet', response.customer_gmeet, _caseid , (rs) => {
                                                Toastify({
                                                    text: `Saved 2!!!`,
                                                    duration: 2000,
                                                    callback: function(){
                                                        this.remove();
                                                    }
                                                }).showToast();
                                            });
                                        }
                                    }

                                    window.dataCase = response;
                                    window.n_start = window.n_start + 1;
                                    reupdateForAll(response);

                                    callback();
                                });
                            }, true);

                        }
                    }
                }
            } else {
                
                // 3. Load content case
                // ==============
                cLog(() => { console.log("cdtx - major : Load content case 1", caseload); })

                // 1. Add Meet Link if not exist
                if(!caseload.customer_gmeet) {
                    caseload.customer_gmeet = window.dataMeetLink[_caseid];

                    if(window.dataMeetLink) {
                        updateFieldCase2Storage('customer_gmeet', caseload.customer_gmeet, _caseid , (rs) => {
                            Toastify({
                                text: `Saved Google Meet!!!`,
                                duration: 2000,
                                callback: function(){
                                    this.remove();
                                }
                            }).showToast();
                        });
                    }
                }

                
                // Remove case by not isset customer website
                // if(!caseload.customer_website) {
                //     cLog(() => { console.log("cdtx - major : Load content case 2, Dont have custom_website"); })
                //     var _caseid_indb = 'cdtx_caseid_' + _caseid;
                //     removeChromeStorage(_caseid_indb, () => {
                //         cLog(() => { console.log("cdtx - major : Load content case 3, remove"); })
                //     });
                // }
                
                window.dataCase = caseload;

                cLog(() => { console.log("cdtx - major : Load content case 4", caseload, "window.dataCase", window.dataCase); });
                window.n_start = window.n_start + 1;


                reupdateForAll(caseload);

                callback(caseload);
            }
        });
    }




    function addActionFirstEmail() {
        var _btn_fistemail = document.querySelector('._panel_shortcut_fisrtemail');
        var _btn_fistemail_is_addaction = document.querySelector('._panel_shortcut_fisrtemail.is_addaction');
        if(!_btn_fistemail_is_addaction) {
            if(_btn_fistemail) {
                _btn_fistemail.classList.add('is_addaction');
                
                
                _btn_fistemail.addEventListener("click", (e) => {
                    // document.querySelector('[data-btnaction="firstemail"]').click();
                    cLog(() => {console.log('CDTX datacase', window.dataCase)});
                    
                    var elm_default = document.querySelector(`._panel_btn--addtemplate[data-btnaction="emailtemp__insert1stemail"]`);
                    var elm_dfa = document.querySelector(`._panel_btn--addtemplate[data-key="ts as new dfa"]`);
                    var elm_as_new = document.querySelector(`._panel_btn--addtemplate[data-key="ts as new"]`);
                    
                    if(window.dataCase.is_external) {
                        if(elm_dfa) {
                            elm_dfa.click();
                        } else {
                            if(elm_as_new) {
                                elm_as_new.click();
                            } else {
                                elm_default.click();
                            }
                        }
                    } else {
                        if(elm_as_new) {
                            elm_as_new.click();
                        } else {
                            elm_default.click();
                        }
                    }
                });
                
            }
        }
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
                var link = document.createElement('style');
                link.rel = 'stylesheet';
                link.id = 'cdtx_style';
                // link.href = `https://cdtx.lyl.vn/cdtx-assistant/_Bookmark/assets/css/style.css?t=${new Date().valueOf() }"`;
                
                link.innerHTML = _panel_style;

                document.head.appendChild(link);
            }
            // if(!document.querySelector('#kl_tagteam_inline_style')) {
                
            //     var style_tag = `<style id="kl_tagteam_inline_style">${window.dataTagteam.panel_div_style}</style>`;
            //     var style_tag = _TrustScript(style_tag);
            //     document.body.insertAdjacentHTML("afterEnd", style_tag);
            // }

            // for cases.connect.corp.google.com
            if(location.hostname === 'cases.connect.corp.google.com') {
                if(!document.querySelector('[debug-id="case-id"] span.case-id')) return false;


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
                        addPanelNote2Case(_caseid);
                        // Add button reset version
                        addButtonResetVersion();
                        // Add button feature
                        addButtonToDocContent();
                        // Add button feature
                        addActionFirstEmail();
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
                            
                            // addGoCase2Calendar 
                            addGoCase2Calendar(_caseid);
                            
                            
                            saveCaseNow(_caseid, (caseload) => {
                                if(typeof caseload == 'undefined') return false;
                                
                                cLog(() => { console.log('cdtx - TH 1 here -  saveCaseNow - DONE', caseload); });
                                
                                window.caseCurrent = {};
                                window.caseCurrent = caseload;
                                
                                
                                global_checkAddLoadMoreInfo(_caseid);
                                
                                checkInputEmailInboxAndFix();
                                
                                if(caseload.interaction_type) {
                                    
                                    if(caseload.interaction_type == 'external') {
                                        amInfoUpdate(_caseid);
                                    }
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
                                    if(typeof caseload == 'undefined') return false;
                                    
                                    cLog(() => { console.log('cdtx - TH 2 here - saveCaseNow - DONE', caseload) });
                                    window.caseCurrent = {};
                                    window.caseCurrent = caseload;
                                    
                                    
                                    global_checkAddLoadMoreInfo(_caseid);
                                    
                                    checkInputEmailInboxAndFix();
                                    
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
                var n_button_event = document.querySelectorAll('[jscontroller="ABQtfe"]').length
                window.n_button_event = window.n_button_event || 0;
                if(n_button_event > 0 &&  n_button_event !== window.n_button_event) {
                    window.n_button_event = n_button_event;
                }
                
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
                        
                            var _contenthtml = `
                            <div class="_casecalendar_info" >
                                <div class="_casecalendar_info--notification" ></div>
                                <div class="_casecalendar_info--inner"  data-isgcc="{%is_gcc%}" data-isexternal="{%is_external%}" >
                                    <span class="_casecalendar_info-50per" data-title="Case ID:" >
                                        <a href="https://cases.connect.corp.google.com/#/case/${_caseid}" target="_blank" >${_caseid}</a>
                                        <span class="copycaseid" data-btnclk="copy_attrcopycontent" data-copycontent="${_caseid}" ></span>
                                    </span>
                                </div>
                            </div>`;
                        
                            _contenthtml = _TrustScript(_contenthtml);
                            _elmappend.insertAdjacentHTML("afterEnd", _contenthtml);
                            

                            
                            _contenthtml = `
                                <span class="_casecalendar_info-50per" data-title="Case ID:"   >
                                    <a href="https://cases.connect.corp.google.com/#/case/{%case_id%}" target="_blank" data-infocase="case_id" ></a><span class="copycaseid" data-btnclk="copy_attrcopycontent" data-copycontent="${_caseid}" ></span>
                                    <br>
                                    <br>
                                    <a href="#" target="_blank" data-linkcasetomeet="1" data-infocase_link="customer_gmeet" ></a>
                                </span>
                                
                                <span class="_casecalendar_info-50per" data-title="Ads ID & Adv name:" >
                                    <a href="https://adwords.corp.google.com/aw/conversions?ocid={%customer_ocid%}" target="_blank" data-infocase="customer_adsid_format" ></a>
                                    <span data-infocase="customer_name" ></span>
                                    <span data-infocase="customer_email" ></span>
                                </span>
                                
                                <span class="_casecalendar_info-50per is_hascopyer" data-title="Phone (click to copy): " data-infocase="customer_contact" data-btnclk="copy_innertext" ></span>
                                <span class="_casecalendar_info-50per" data-title="Website:" data-select ><a href="#" target="_blank" data-infocase_link="customer_website" data-infocase="customer_website" ></a></span>
                                <span class="_casecalendar_info-50per" data-title="Request:" >
                                    <span data-infocase="request_category"></span>
                                    <span data-infocase="case_summary"></span>
                                    <span data-infocase="request"></span>
                                    
                                </span>
                                <span class="_casecalendar_info-50per" data-title="AM:" data-am="{%team%} {%sales_program%}" >
                                    <span data-infocase="am_name"></span>
                                    <span class="is_hascopyer" data-infocase="am_email" data-btnclk="copy_innertext"></span>
                                    <span data-infocase="team"></span>
                                    <span data-infocase="sales_program"></span>
                                </span>
                                <span class="_casecalendar_info-50per" data-title="Tasks:" data-infocase="tasks" ></span>
                                <span class="_casecalendar_info-50per" data-title="Attribution Model:" data-infocase="customer_attributionmodel" ></span>
                                <span class="_casecalendar_info-50per" data-title="Tool Shortlink:" data-infocase_html="toolshortlink" ></span>
                                <span class="_casecalendar_info-100per" data-title="Date Install:" data-infocase="appointment_time" ></span>
                                <span class="_casecalendar_info-100per" data-title="Sub status:" data-infocase="status_case" ></span>
                                <span class="_casecalendar_info-100per" data-title="Note:" data-infocase="note" ></span>
                            `;
                            
                            
                            // Update meetlink now
                            autoUpdatelistLinkCalendar();
                            
                            loadCaseStorageByID(_caseid, (response) => {
                                if(!response.value) return false;

                                var _data = response.value;
                                
                                cLog(() => { console.log("cdtx calendar.google.com ", _data); })
                            
                                _contenthtml = _TrustScript(_contenthtml);

                                var _panel = document.querySelector('[jscontroller="dIQ6id"] ._casecalendar_info');
                                _panel.querySelector('._casecalendar_info--inner').innerHTML = _contenthtml;

                                if(_data.case_id) {


                                    replaceAllHtmlElement(_panel, _data);
                                    // Internal
                                    
                                    if(_data.customer_adsid) {
                                        var _value_tmp = _data.customer_adsid;
                                        _value_tmp = reformatAdsId(_value_tmp);
                                        replaceKeyHTMLByCaseID(_panel, 'customer_adsid', _value_tmp);
                                    }
                                    
                                    var _data_restructor = case_restructor(_data.case_id, _data.data_all);
                                    Object.assign(_data, _data_restructor);

                                    
                                    // External 
                                    if(_data.is_external) {
                                        var _ehtml = ``;
                                        
                                        // 1. ORDER POSITION OBJECT
                                            var _datatmp = {};
                                            _datatmp.case_id = _data.case_id;
                                            _datatmp.customer_gmeet = _data.customer_gmeet;
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
                                            if (key === 'data_all') continue;
                                            
                                            _value_tmp = value;
                                            _htmltemp = `<span class="_casecalendar_info-50per" data-title="${key.replaceAll('_', ' ')}: " data-infocase="${key}" ></span>`;
                                            
                                            if(key === 'customer_website') {
                                                _htmltemp = `<span class="_casecalendar_info-50per" data-title="Website:" >
                                                    <a href="#" target="_blank" data-infocase_link="customer_website" data-infocase="customer_website" ></a>
                                                </span>`;
                                            }
                                            
                                            if(key === 'customer_adsid') {
                                                // zzz
                                                // https://adwords.corp.google.com/aw/internal/search?ocid=0&__awid=269-475-6195
                                                _htmltemp = `<span class="_casecalendar_info-50per" data-title="Ads ID:" >
                                                    <a href="https://adwords.corp.google.com/aw/internal/search?ocid=0&__awid=${_datatmp.customer_adsid}" target="_blank" data-infocase="customer_adsid_format" ></a>
                                                </span>`;
                                                
                                                if(_datatmp.customer_ocid) {
                                                    _htmltemp = `<span class="_casecalendar_info-50per" data-title="Ads ID:" >
                                                        <a href="https://adwords.corp.google.com/aw/conversions?ocid=${_data.customer_ocid}" target="_blank" data-infocase="customer_adsid_format" ></a>
                                                    </span>`;
                                                }
                                            }

                                            if(key === 'customer_ua_ga') {
                                                _htmltemp = `<span class="_casecalendar_info-50per" data-title="UA Customer ID:" >
                                                    <a href="https://tagmanager-ics.corp.google.com/home?q={%customer_ua_ga%}" target="_blank" data-infocase="customer_ua_ga" ></a>
                                                </span>`;
                                            }
                                            
                                            if(key === 'customer_contact') {
                                                _htmltemp = `<span class="_casecalendar_info-50per is_hascopyer" data-title="Phone (click to copy): " data-infocase="customer_contact" data-btnclk="copy_innertext" ></span>`;
                                            }
                                            
                                            if(key === 'case_id') {
                                                _htmltemp = `<span class="_casecalendar_info-50per" data-title="Case ID:"  data-interactiontype="{%interaction_type%}" >
                                                <a href="https://cases.connect.corp.google.com/#/case/{%case_id%}" target="_blank" data-infocase="case_id" ></a>
                                                </span>
                                                `;
                                            }
                                            if(key === 'customer_gmeet') {
                                                _htmltemp = `<a href="{%customer_gmeet%}" target="_blank" data-linkcasetomeet="1" data-infocase_link="customer_gmeet" data-title="Meet Link:" ></a>
                                                `;
                                            }
                                            
                                            _ehtml += _htmltemp;
                                        }
                                        
                                        _ehtml += '<span class="_casecalendar_info-100per" data-title="Sub status:" data-infocase="status_case" ></span>';
                                        _ehtml += '<span class="_casecalendar_info-100per" data-title="Note:" data-infocase="note" ></span>';

                                        _panel.querySelector('._casecalendar_info--inner').innerHTML = '';
                                        _ehtml = _TrustScript(_ehtml);
                                        _panel.querySelector('._casecalendar_info--inner').innerHTML = _ehtml;

                                        
                                        // 3. OTHER INFO
                                        for (const [key, value] of Object.entries(_data)) {
                                            _value_tmp = value;
                                            
                                            replaceKeyHTMLByCaseID(_panel, key, _value_tmp);
                                        }
                                    }
                                    // END EXTERNAL




                                    // IS GCC NOTIFCATION
                                    if(_data.is_gcc) {
                                        _panel.querySelector('._casecalendar_info--notification').insertAdjacentHTML('afterBegin', '<span>Case AM is GCC!!!</span>');
                                    }
                                    
                                    if(_data.is_external) {
                                        _panel.querySelector('._casecalendar_info--notification').insertAdjacentHTML('afterBegin', '<span>Case form EXTERNAL!!!</span>');
                                    }

                                    
                                    // DISPLAY NOTED by Case ID
                                    getNoteCase(_data.case_id, (data) => {
                                        if(data) {
                                            replaceKeyHTMLByCaseID(_panel, 'note', data);
                                        }
                                    });

                                    
                                    // DISPLAY ToolShortlink by Case ID
                                    getToolShortlink(_caseid, (data) => {
                                        if(data) {
                                            replaceKeyHTMLByCaseID(_panel, 'toolshortlink', data);
                                        }
                                    });
                                    
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
                                                cLog(() => { console.log('cdtx-save case - add link meet', response); })
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
                        
                        var _contenthtml = `<div class="_casecalendar_info" style=" opacity: 0.7; " >
                            <div class="_casecalendar_info--notification" ></div>
                            <div class="_casecalendar_info--inner"  data-isgcc="{%is_gcc%}" data-isexternal="{%is_external%}" >
                            </div>
                        </div>`;
    
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
                        
                        `;

                        getChromeStorage("cdtx_listmeetlink", (response) => {
                            var casesmeet = response.value || {};
                            // if(casesmeet[_object.case_id]) {
                                // console.log('hehe', casesmeet);
                            for (const [_caseid, value] of Object.entries(casesmeet)) {
                                if(value.includes(location.pathname)) {
                                    cLog(() => { console.log('cdtx meet', _caseid, value); })

                                    loadCaseStorageByID(_caseid, (response) => {
                                            
                                            
                                        cLog(() => { console.log('cdtx response' , response); })

                                        var _panel = document.querySelector('.hWX4r ._casecalendar_info');
                                        // case id overwrite
                                        

                                        if(!response.value) return false;
                                        _data = response.value;
                                        if(!_data.case_id) return false;

                                        _contenthtml_inner = _TrustScript(_contenthtml_inner);
                                        _panel.querySelector('._casecalendar_info--inner').innerHTML = _contenthtml_inner;
                                        
                                        // START
                                        replaceAllHtmlElement(_panel, _data);
                                    
                                        
                                        var _data_restructor = case_restructor(_data.case_id, _data.data_all);
                                        Object.assign(_data, _data_restructor);

                                        // External 
                                        if(_data.is_external) {
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
                                                if (key === 'data_all') continue;
                                                
                                                _value_tmp = value;
                                                _htmltemp = `<span class="_casecalendar_info-50per" data-title="${key.replaceAll('_', ' ')}: " data-infocase="${key}" ></span>`;
                                                
                                                if(key === 'customer_website') {
                                                    _htmltemp = `<span class="_casecalendar_info-50per" data-title="Website:" >
                                                        <a href="#" target="_blank" data-infocase_link="customer_website" data-infocase="customer_website" ></a>
                                                    </span>`;
                                                }
                                                
                                                if(key === 'customer_adsid') {
                                                    // zzz
                                                    // https://adwords.corp.google.com/aw/internal/search?ocid=0&__awid=269-475-6195
                                                    _htmltemp = `<span class="_casecalendar_info-50per" data-title="Ads ID:" >
                                                        <a href="https://adwords.corp.google.com/aw/internal/search?ocid=0&__awid=${_datatmp.customer_adsid}" target="_blank" data-infocase="customer_adsid_format" ></a>
                                                    </span>`;
                                                    
                                                    if(_datatmp.customer_ocid) {
                                                        _htmltemp = `<span class="_casecalendar_info-50per" data-title="Ads ID:" >
                                                            <a href="https://adwords.corp.google.com/aw/conversions?ocid=${_data.customer_ocid}" target="_blank" data-infocase="customer_adsid_format" ></a>
                                                        </span>`;
                                                    }
                                                }
                                                
                                                if(key === 'customer_ua_ga') {
                                                    _htmltemp = `<span class="_casecalendar_info-50per" data-title="UA Customer ID:" >
                                                        <a href="https://tagmanager-ics.corp.google.com/home?q={%customer_ua_ga%}" target="_blank" data-infocase="customer_ua_ga" >{%customer_ua_ga%}</a>
                                                    </span>`;
                                                }
                                                
                                                if(key === 'customer_contact') {
                                                    _htmltemp = `<span class="_casecalendar_info-50per is_hascopyer" data-title="Phone (click to copy): " data-infocase="customer_contact" data-btnclk="copy_innertext" >{%customer_contact%}</span>`;
                                                }
                                                
                                                if(key === 'case_id') {
                                                    _htmltemp = `<span class="_casecalendar_info-50per" data-title="Case ID:"  data-interactiontype="{%interaction_type%}" >
                                                    <a href="https://cases.connect.corp.google.com/#/case/{%case_id%}" target="_blank" data-infocase="case_id" ></a>
                                                    </span>`;
                                                }
                                                
                                                _ehtml += _htmltemp;
                                            }
                                            
                                            _ehtml += '<span class="_casecalendar_info-100per" data-title="Sub status:" data-infocase="status_case" ></span>';
                                            _ehtml += '<span class="_casecalendar_info-100per" data-title="Note:" data-infocase="note" ></span>';

                                            _panel.querySelector('._casecalendar_info--inner').innerHTML = '';
                                            _ehtml = _TrustScript(_ehtml);
                                            _panel.querySelector('._casecalendar_info--inner').innerHTML = _ehtml;

                                            
                                            // 3. OTHER INFO
                                            for (const [key, value] of Object.entries(_data)) {
                                                _value_tmp = value;
                                                
                                                replaceKeyHTMLByCaseID(_panel, key, _value_tmp);
                                            }
                                        }
                                        // END EXTERNAL


                                        // IS GCC NOTIFCATION
                                        if(_data.is_gcc) {
                                            _panel.querySelector('._casecalendar_info--notification').insertAdjacentHTML('afterBegin', '<span>Case AM is GCC!!</span>');
                                        }
                                        
                                        if(_data.is_external) {
                                            _panel.querySelector('._casecalendar_info--notification').insertAdjacentHTML('afterBegin', '<span>Case form EXTERNAL!!!</span>');
                                        }

                                        
                                        // DISPLAY NOTED by Case ID
                                        getNoteCase(_data.case_id, (data) => {
                                            if(data) {
                                                replaceKeyHTMLByCaseID(_panel, 'note', data);
                                            }
                                        });

                                        
                                        // DISPLAY ToolShortlink by Case ID
                                        getToolShortlink(_caseid, (data) => {
                                            if(data) {
                                                replaceKeyHTMLByCaseID(_panel, 'toolshortlink', data);
                                            }
                                        });

                                    });

                                    break;
                                }
                            }
                            // }
                        });                        
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
                fetch(_url_googlesheet)
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


    if(window.isdongtest) {
        backdoor_manage_keystorage();
    }


    // LOAD
    loadGoogleSheetOnlineWebPublics();
    loadRealtime();
    autoUpdatelistLinkCalendar(true);
    clickAction();
    loadEmailTemplateAction();
    panelAddShortcutLink();
    crSubjectByHotKeyEmail();
    openGAdsbyAdsID();
}
