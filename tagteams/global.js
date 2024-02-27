function global_case(optionkl__disable_dialog) {
    if(optionkl__disable_dialog) return false;
    cLog(() => { console.log('global_case START', optionkl__disable_dialog); })



    window.dataCase = window.dataCase || {};
    window.dataMeetLink = window.dataMeetLink || {};
    window.dataMeetLinkAll = window.dataMeetLinkAll || [];
    window.caseCurrent = window.caseCurrent || {};
    window.isdongtest = localStorage.getItem("dongtest") || false;
    window.linkenable = localStorage.getItem("linkenable") || false;
    window.isdongtest_local = localStorage.getItem("dongtest_local") || false;
    window.keylanguage = window.keylanguage || '';
    window.qlus_datalist = window.qlus_datalist || [];
        
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
                        var rs_regmatch = extractEmails(value);
                        if(rs_regmatch) {
                            if(!value.includes('@google.com')) {
                                if(key != 'contact_email_field') {
                                    _tempdataCase['customer_name'] = key;
                                }
                                _tempdataCase['customer_email'] = value;
                            }
                            
                            var _found = rs_regmatch.find((value, index) => {
                                return value.includes('@google.com')
                            });

                            if(_found) {
                                var __am_name_here = value.split("\n")[0];
                                __am_name_here = __am_name_here.trim();

                                _tempdataCase['am_name'] = __am_name_here;
                                _tempdataCase['am_email'] = _found;
                            }
                        }
                    }
                    
                    // Name customer
                    if(key === 'contact_email_field') {
                        cLog(() => {console.log("OK HERE customer_email", value)})
                        _tempdataCase['customer_email'] = value;
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
                    
                    if(key.includes('Phone number')) {
                        if(value.startsWith('+')) {
                            if(!_tempdataCase['customer_contact']) {
                                _tempdataCase['customer_contact'] = value;
                            }
                        }
                    }
                    
                    if(key === 'Program') {
                        // if(value.toLowerCase().includes('silver')) {
                        //     _tempdataCase['customer_is_silver'] = value.toLowerCase().includes('silver') ? "1" : "";
                        // }
                        
                        // if(value.toLowerCase().includes('silver')) {
                        //     _tempdataCase['customer_is_silver'] = value.toLowerCase().includes('silver') ? "1" : "";
                        // }
                    }
                    
                    // Name customer
                    if(key === 'contact_info_name') {
                        _tempdataCase['customer_name'] = value;
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
                        if(_tempdataCase['interaction_type'].toLowerCase().includes('external')) {
                            _tempdataCase['is_external'] = 1;
                            // am_isgcc_external
                        }
                    }
                    
                    if(window.casetype_lt) {
                        _tempdataCase['is_external'] = 0;
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
                // Format again 1 - _temp with key Google Sheets
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

                // *****
                // Format again 3 - _temp
                // *****

                
                if(!_tempdataCase.tasks) {
                    var _nis = 0;
                    for (const [key, value] of Object.entries(_temp)) {
                        if(key === 'Request Category') {
                            _nis++;
                            _tempdataCase['tasks'] = value;
                        }
                    }

                    if(_nis === 0) {
                        for (const [key, value] of Object.entries(_temp)) {                        
                            if(key === 'Case Summary') {
                                _tempdataCase['tasks'] = value;
                            }
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
            // if(window.loadgooglesheetpublish['Key language'].sheettab) {
            //     cLog(() => { console.log("cdtx - major", "Google sheet", window.loadgooglesheetpublish['Key language'].sheettab); });
            // }
            
            return _tempdataCase;
        } catch (error) {
            console.error('cdtx', error);
            return _temp;
        }

        return _temp;
    }

    var addButtonToDocContent = () => {
        try {
            
            // please don't remove this
            var _contenthtml = `
                <div class="material-button" data-btnid="open_panelnote" data-btnclk="open_panelnote" style="display: none" >
                    <div class="content">Panel</div>
                </div>
                <div class="material-button" data-btnid="crawl_case"  data-btnclk="_connectcase_info-act_recrawl" 
                title="Force get Case's info properly"
                >
                    <div class="content" style=" font-size: 11px; text-align: center; font-weight: bold; ">CRAWL<small style=" display: block; ">CASE</small></div>
                </div>`;
    
            if (document.querySelector('._panel_btnshortcut')) {
                var _panel_btnshortcut = document.querySelector('._panel_btnshortcut');
                
                // For Panel
                if (!_panel_btnshortcut.querySelector(`[data-btnid="crawl_case"]`)) {
                    _contenthtml = _TrustScript(_contenthtml);
                    _panel_btnshortcut.insertAdjacentHTML('afterBegin', _contenthtml);
                }
                
                
                // For go Team
                if (!document.querySelector(`._panel_btnshortcut ._panel_shortcut_go_teamvietnam`)) {
                    // data-textview="You have not accessed the group link today?" 
                    _contenthtml = `<a href="#" target="_blank" data-debugid="goteam" class="material-button _panel_shortcut_go_teamvietnam" style="display: none" >
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
                        e.target.classList.remove('notview_today');
                    });
                    
                }
            }
    
        } catch (error) {
            console.error('addButtonToDocContent', error);
        }
    }
    
    
    var addBtnMail = () => {

    };

    var addButtonResetVersion = () => {
        var _contenthtml = `
        <div class="material-button _fordevmode" data-btnclk="enable_devmode" >
            <div class="content">
                <img src="data:image/svg+xml,%3Csvg fill='%23000000' width='800px' height='800px' viewBox='0 0 24 24' role='img' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.3zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z'/%3E%3C/svg%3E">
            </div>
        </div>
        
        <div class="material-button" data-btnclk="popup_update_LT" >
            <div class="content">
                LT
            </div>
        </div>
        `;


        // For Dev
        if(window.isdongtest) {
            _contenthtml += `
            
            <div class="material-button _fordevmode" data-btnclk="resetdata" >
                <div class="content">
                    <img src="${assets_img_reseticon}">
                </div>
            </div>

            <div class="material-button _fordevmode" data-btnclk="chatbot_dialog" >
                <div class="content">
                    <img src="data:image/svg+xml,%3Csvg width='800px' height='800px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.2 21.3702C12.54 22.2502 11.46 22.2502 10.8 21.3702L9.29999 19.3702C9.12999 19.1502 8.77 18.9702 8.5 18.9702H8C4 18.9702 2 17.9702 2 12.9702V7.97021C2 3.97021 4 1.97021 8 1.97021H16C20 1.97021 22 3.97021 22 7.97021V12.9702' stroke='%23292D32' stroke-width='1.5' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cg opacity='0.4'%3E%3Cpath d='M18.2 21.4C19.9673 21.4 21.4 19.9673 21.4 18.2C21.4 16.4327 19.9673 15 18.2 15C16.4327 15 15 16.4327 15 18.2C15 19.9673 16.4327 21.4 18.2 21.4Z' stroke='%23292D32' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M22 22L21 21' stroke='%23292D32' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/g%3E%3Cpath d='M15.9965 11H16.0054' stroke='%23292D32' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M11.9945 11H12.0035' stroke='%23292D32' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M7.99451 11H8.00349' stroke='%23292D32' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E">
                </div>
            </div>
            
            <div class="material-button _fordevmode" data-btnclk="tool_mail_test" >
                <div class="content">
                    Mail test
                </div>
            </div>
            <div class="material-button _fordevmode" data-btnclk="get_window_data_case" >
                <div class="content">
                    <img src="data:image/svg+xml,%3Csvg fill='%23000000' width='800px' height='800px' viewBox='0 0 32 32' version='1.1' xmlns='http://www.w3.org/2000/svg'%3E%3Ctitle%3Eeye%3C/title%3E%3Cpath d='M0 16q0.064 0.128 0.16 0.352t0.48 0.928 0.832 1.344 1.248 1.536 1.664 1.696 2.144 1.568 2.624 1.344 3.136 0.896 3.712 0.352 3.712-0.352 3.168-0.928 2.592-1.312 2.144-1.6 1.664-1.632 1.248-1.6 0.832-1.312 0.48-0.928l0.16-0.352q-0.032-0.128-0.16-0.352t-0.48-0.896-0.832-1.344-1.248-1.568-1.664-1.664-2.144-1.568-2.624-1.344-3.136-0.896-3.712-0.352-3.712 0.352-3.168 0.896-2.592 1.344-2.144 1.568-1.664 1.664-1.248 1.568-0.832 1.344-0.48 0.928zM10.016 16q0-2.464 1.728-4.224t4.256-1.76 4.256 1.76 1.76 4.224-1.76 4.256-4.256 1.76-4.256-1.76-1.728-4.256zM12 16q0 1.664 1.184 2.848t2.816 1.152 2.816-1.152 1.184-2.848-1.184-2.816-2.816-1.184-2.816 1.184l2.816 2.816h-4z'%3E%3C/path%3E%3C/svg%3E">
                </div>
            </div>`;
        }

        


        if(!document.querySelector(`._panel_btnshortcut [data-btnclk="enable_devmode"]`)) {
            
            if(document.querySelector('._panel_btnshortcut')) {
                _contenthtml = _TrustScript(_contenthtml);
                document.querySelector('._panel_btnshortcut').insertAdjacentHTML('beforeEnd', _contenthtml);    
            }
            
        }
    }
    
    var global_crawl_major = (caseid_compare, callback, unlockmark = false) => {
        var _temp = {};
        
        cLog(() => { console.log("cdtx - major begin start", caseid_compare, 'unlockmark: ', unlockmark); });
        
        
        var _nlimit = 0;
        var _nid_unmark = 0;
        var _ishave_review_case_in_connect_sales_elm = true;
        var myTime = setInterval(() => {
            
            cLog(() => { console.log("cdtx - major interval", caseid_compare, 'unlockmark: ', unlockmark); });

            var _caseid_elmcurrent = document.querySelector('[debug-id="case-id"] span.case-id');
            if(_caseid_elmcurrent) {
                if(caseid_compare !== _caseid_elmcurrent.innerText) {
                    clearInterval(myTime);
                    cLog(() => { console.log(`cdtx - major - STOP by different case ID`); })
                }
            }
            
        
            
            var _n_isok = 0;
            var _n_notready = 0;
            
            // Break
            
            _nlimit++; if(_nlimit > 30) {
                clearInterval(myTime);
                cLog(() => { console.log('cdtx - major - limit 30s'); })
            }
            _nid_unmark = (_nlimit%3 === 0 ? _nlimit : _nid_unmark);
            
            var _list_elem = [];
            var _cuf_form_field = document.querySelectorAll('card.read-card cuf-form-field');
            var _data_pair_content = document.querySelectorAll('card.read-card home-data-item');
            var _internal_user_info_email = document.querySelectorAll('card.read-card internal-user-info');
            var _contact_email_field = document.querySelectorAll('card.read-card contact-email-field');
            var _c2d_phone_field = document.querySelectorAll('card.read-card c2d-phone-field');
            
            
            if(_cuf_form_field.length > 5 ) {
                _n_isok++;
            } else {
                if(targetinput = document.querySelector('target-selector .target-input input')) {
                    if(targetinput.value.trim()) {
                        _n_isok++;
                    }
                }

            }
            
            _list_elem.push(_cuf_form_field);
            _list_elem.push(_data_pair_content);
            _list_elem.push(_internal_user_info_email);
            _list_elem.push(_contact_email_field);
            _list_elem.push(_c2d_phone_field);
            
            

            
            
            
            // If is unlock request true => recheck have unmark class and is have ***
            if(unlockmark && _n_notready === 0) {
                
                _list_elem.forEach((__item) => {
                     
                    __item.forEach(elm => {
                         
                        var _unmasks = elm.querySelectorAll('[debugid="unmask-button"]');
                        
                        if(_unmasks.length > 0) {
                            _unmasks.forEach(function(_unmask1){
                                cLog(() => { console.log(`cdtx - 1 - isloadunmark${_nid_unmark}`); })

                                if(!_unmask1.classList.contains(`isloadunmark${_nid_unmark}`)) {

                                    // Remove a attribute
                                    if(_unmask1.closest('a')) {
                                        _unmask1.closest('a').removeAttribute("href");
                                        _unmask1.closest('a').removeAttribute("target");
                                        _unmask1.closest('a').style.pointerEvents = "none";
                                    }

                                    _unmask1.click();
                                    _unmask1.classList.add(`isloadunmark${_nid_unmark}`);
                                    
                                }

                                


                            
                                if(window.isdongtest_local) {
                                    _unmask1.innerText = _unmask1.innerText.replaceAll('*', '');
                                    _unmask1.setAttribute('debugid', '');
                                }
                            })
                            
                            _n_notready++;
                        }
                         
                        // if > 15 skip this, don't follow
                        if(elm.innerText.includes('***')) {
                            if(_nlimit < 15) {
                                _n_notready++;
                            }
                        }

                         // 
                         document.querySelectorAll('#read-card-tab-panel-case-log .case-log-container.active-case-log-container .activities > div').forEach(function(elm2){
                            if(elm2.innerText.includes('Review case in Connect Sales')) {            
                                // cLog(() => { console.log(elm2.querySelector("table")) })
            
                                elm2.querySelector('case-message-view [class*="message-content-container"]').click();
                                
                                var _unmasks = elm2.querySelectorAll('[debugid="unmask-button"]');
                                if(_unmasks.length > 0) {
                                    _unmasks.forEach(function(elm3){
                                        cLog(() => { console.log(`cdtx - 2 - isloadunmark${_nid_unmark}`); })
                                        if(!elm3.classList.contains(`isloadunmark${_nid_unmark}`)) {
                                            
                                            // Remove a attribute
                                            if(elm3.closest('a')) {
                                                elm3.closest('a').removeAttribute("href");
                                                elm3.closest('a').removeAttribute("target");
                                                elm3.closest('a').style.pointerEvents = "none";
                                            }

                                            elm3.click();
                                            elm3.classList.add(`isloadunmark${_nid_unmark}`);
                                        }
                                    })
                                    
                                    _n_notready++;
                                }
                                _ishave_review_case_in_connect_sales_elm = true;
                                if(!document.querySelector('#read-card-tab-panel-case-log .case-log-container.active-case-log-container .activities > div table tr')) {
                                    cLog(() => { console.log('cdtx - 1111') });
                                    _n_notready++;
                                    _ishave_review_case_in_connect_sales_elm = false;

                                    // 5 lần không tìm thấy thì bỏ qua
                                    
                                    if(_nlimit > 4) {
                                        cLog(() => { console.log('cdtx - global_crawl_major skip after 5s') });
                                        _n_notready--;
                                        // _n_notready--;
                                    } 
                                } 
                            }
                        });
                        

                     })
                });


             
                cLog(() => { console.log("cdtx - major unmark count", _n_notready); })

                 // Stop if _n_notready > 0 && if time < 30s
                if(_nlimit < 30) {
                    if(_n_notready > 0) return false;
                }
             
            }
            
            cLog(() => { console.log("cdtx - major begin - 3", unlockmark, _n_notready, _n_isok); })
            
            

            // if(_data_pair_content.length ) {
            //     _n_isok++;   
            // }

            // if(_internal_user_info_email.length ) {
            //     _n_isok++;
            // }

            // if(_contact_email_field.length ) {
            //     _n_isok++;
            // }

            

            var _is_start = _n_isok > 0;

            if(unlockmark) {
                _is_start = (_n_notready === 0 && _n_isok > 0)
            }


            if(_is_start) {
                cLog(() => { console.log("cdtx - major begin - start inside", _is_start); });
                
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
                                 
                            if(!_temp['email']) {
                                _temp['email'] = rs;
                            } else {
                                if(!_temp['email'].includes(rs)) {
                                    _temp['email'] = _temp['email'] + "/*/" + rs;
                                }    
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
                
                var contact_info_name = document.querySelector('card.read-card [debug-id="contact-info-name"]');
                if(contact_info_name) {
                    _temp['contact_info_name'] = contact_info_name.innerText.trim();
                }
                
                var contact_email_field = document.querySelector('card.read-card contact-email-field .value');
                if(contact_email_field) {
                    _temp['contact_email_field'] = contact_email_field.innerText.trim();
                }
                
                var contact_phonevalue = document.querySelector('card.read-card [debugid="pii-phone-value"]');
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
                cLog(() => { console.log('cdtx - major is OVERWRITE by connect sale', window.dataMeetLink[(_caseid || caseid_compare)], unlockmark, _ishave_review_case_in_connect_sales_elm) });
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


    var addGoCase2Calendar = () => {
        // go_caseincalendar
        // https://calendar.google.com/calendar/u/0/r/search?q=2-4476000033977
        
        
        
        if(! __case_id()) return false; 
        if(document.querySelector('#go_caseincalendar')) return false;
        
        var _link = `https://calendar.google.com/calendar/u/0/r/search?q=${__case_id()}`;
        
        var _contenthtml = `<a href="${_link}" target="_blank" id="go_caseincalendar">Go calendar</a>`;
        _contenthtml = `${_contenthtml} `;
        _contenthtml = _TrustScript(_contenthtml);
        document.querySelector('.home.header .card-title').insertAdjacentHTML('beforeEnd', _contenthtml);
        
           
    }
    
    
    // Info case overview after save
    var addInfoCase2CaseConnect = (_caseid) => {
        var _elmappend = document.querySelector('[debug-id="body"]');
        if(!_elmappend) return;
        
        if(window.hasnew_data === 'yes') {
            if(document.querySelector('._connectcase_info')) {
                document.querySelector('._connectcase_info').remove();
            }
            
            window.hasnew_data = "once";
        }
        
        if(!document.querySelector(`[debug-id="body"] ._casecalendar_info[data-caseid="${_caseid}"]`)) {
            var _caseinfo = document.querySelector(`[debug-id="body"] ._casecalendar_info`);
            if(_caseinfo) {
                _caseinfo.remove();
            }
            
            var _getmemory_isopen = localStorage.getItem('_connectcase_info--isopen');
            var _contenthtml = `
            <div class="_casecalendar_info _connectcase_info  _hidden" data-caseid="${_caseid}" >
                <div class="_casecalendar_info--top_buttons">
                </div>
                <div class="_casecalendar_info--buttons">
                    <span class="${_getmemory_isopen === 'CLOSE' ? 'CLOSE' : 'OPEN' }" data-btnclk="_connectcase_info-act_toggleopen" ></span>
                </div>
                <div class="_connectcase_info--outer ${_getmemory_isopen === 'CLOSE' ? '_none' : ''}">
                    <div class="_casecalendar_info--controls _t_right" style=" margin-bottom: 10px; " >
                    
                        <span class="_btn_stall _connectcase_info-act_refresh" data-btnclk="removecase_example" title="reupdate case info">╳ </span>
                        <span class="_btn_stall _connectcase_info-act_refresh" data-btnclk="_connectcase_info-act_refresh" >⟳</span>
                        <span class="_btn_stall _connectcase_info-act_edit" data-btnclk="_connectcase_info-act_edit" >EDIT</span>
                    </div>
                    <div class="_casecalendar_info--notification" ></div>
                    <div class="_casecalendar_info--consentrecord" >Please Hit SpeakEasy Record Button</div>
                    <div class="_casecalendar_info--inner"  data-isgcc="{%is_gcc%}" data-isexternal="{%is_external%}" data-issilver="{%customer_program%}" >
                        <span class="_casecalendar_info-50per" data-title="Case ID:" >
                            <a href="https://cases.connect.corp.google.com/#/case/${_caseid}" ${location.hostname != 'cases.connect.corp.google.com' ? ` target="_blank" ` : ''} >${_caseid}</a>
                            <span class="copycaseid" data-btnclk="copy_attrcopycontent" data-copycontent="${_caseid}" ></span>
                        </span>
                    </div>
                </div>
            </div>`;
            
            if(_elmappend) {
                _contenthtml = _TrustScript(_contenthtml);
                
                var _elm_prev = document.querySelector('[debug-id="case-summary-input"]')
                
                // if(document.querySelector('#dock_order_1')) {
                //     _elm_prev = document.querySelector('#dock_order_1');
                // }
                
                
                if(_elm_prev) {
                    _elm_prev.insertAdjacentHTML("afterEnd", _contenthtml);
                }
                                
                var _panel = document.querySelector('._casecalendar_info');
                
                if(_panel) {
                    loadCaseStorageByID(_caseid, (response) => {
                        if(!response.value) return false;
                        var _data = response.value;
                        
                        if(_data.case_id) {
                            // Display content
                            templateDisplay(_panel, _data);
                            _panel.classList.remove('_hidden');
                        }
                    });    
                }
                
                
                
                
            }
            
            // if(_elmappend) {
            //     var _panel = _elmappend.querySelector('._casecalendar_info');
            //     if(_panel) {
            //         if(window.dataCase.case_id) {
            //             // Display content
            //             templateDisplay(_panel, window.dataCase);
            //         }    
            //     }
                
            // }
            
        }
        
        
            
        
            
    }
    
    
    var addPanelNote2Case = (args_caseid) =>{
        try {
            var _contenthtml = `<div class="_infocase_byme"></div>`;
            var _contenthtml_inner = `
            <span class="_infocase_byme-btnopen" data-btnclk="_infocase_byme-openact" ></span>
            <div class="_infocase_byme-inner">
                <span class="_infocase_byme-warning mb_20px" >Note: The information is only stored on computer memory. And you can <span data-btnclk="removecase_example"  >refresh this data</span></span>
                
                <div class="_infocase_byme-row mb_20px" data-area="btn-shortcutcase" ></div>

                <div class="_infocase_byme-row _infocase_byme-control" >
                    <div class="_infocase_byme-col">
                        <div class="_infocase_byme-note" data-title="Note" data-infocase="note" contenteditable="plaintext-only" ></div>
                        <div class="_infocase_byme-field" data-title="Date install" data-infocase="appointment_time" 
                            data-btnclk="oncall_templ_act_flchoice" 
                            data-dateformat="d/m/Y" 
                            data-text="oncall_templ_act_flchoice-text" 
                            data-dispatch_afterchange="keyup" 
                            data-anytime="true" 

                            data-disnewline="1" contenteditable="plaintext-only" 
                        ></div>
                        <div class="_infocase_byme-field" data-title="Is External" data-infocase="is_external" data-disnewline="1" contenteditable="plaintext-only" ></div>
                        <div class="_infocase_byme-field" data-title="AM is External" data-infocase="am_isgcc_external" data-disnewline="1" contenteditable="plaintext-only" ></div>
                        <div class="_infocase_byme-field" data-title="Is live transfer" data-infocase="is_caselt" data-disnewline="1" contenteditable="plaintext-only" ></div>
                        <div class="_infocase_byme-field" data-title="Is GCC" data-infocase="is_gcc" data-disnewline="1" contenteditable="plaintext-only" ></div>
                        
                        <div class="_infocase_byme-field" data-title="Is Ads Enhanced Conversions" data-infocase="is_ads_enhanced_conversions" data-disnewline="1" contenteditable="plaintext-only" ></div>
                    </div>
                    <div class="_infocase_byme-col" >
                        <span class="_btn_stall mb_20px disable" data-btnsave="1" >Save</span>
                        <div class="_infocase_byme-field" data-title="Customer name" data-infocase="customer_name" data-disnewline="1" contenteditable="plaintext-only" ></div>
                        <div class="_infocase_byme-field" data-title="Customer email" data-infocase="customer_email" data-disnewline="1" contenteditable="plaintext-only" ></div>
                        <div class="_infocase_byme-field" data-title="Customer contact" data-infocase="customer_contact" data-disnewline="1" contenteditable="plaintext-only" ></div>
                        <div class="_infocase_byme-field" data-title="Customer Program" data-infocase="customer_program" data-disnewline="1" contenteditable="plaintext-only" ></div>
                        <div class="_infocase_byme-field" data-title="Customer Ads ID" data-infocase="customer_adsid" data-disnewline="1" contenteditable="plaintext-only" ></div>
                        <div class="_infocase_byme-field" data-title="Customer OCID" data-infocase="customer_ocid" data-disnewline="1" contenteditable="plaintext-only" ></div>
                        <div class="_infocase_byme-field" data-title="Customer Website" data-infocase="customer_website" data-disnewline="1" contenteditable="plaintext-only" ></div>
                        <div class="_infocase_byme-field" data-title="Customer Gmeet" data-infocase="customer_gmeet" data-disnewline="1" contenteditable="plaintext-only" ></div>
                        <div class="_infocase_byme-field" data-title="AM email" data-infocase="am_email" data-disnewline="1" contenteditable="plaintext-only" ></div>
                        <div class="_infocase_byme-field" data-title="Sale Team" data-infocase="sales_program" data-disnewline="1" contenteditable="plaintext-only" ></div>
                        <div class="_infocase_byme-field" data-title="Tasks" data-infocase="tasks" data-disnewline="1" contenteditable="plaintext-only"
                            data-btnclk="oncall_templ_act_taskchoice"
                            data-text="oncall_templ_act_taskchoice-text"
                        ></div>
                        <div class="_infocase_byme-field" data-title="UA,GA4" data-infocase="customer_ua_ga" data-disnewline="1" contenteditable="plaintext-only" ></div>
                        
                    </div>
                </div>
                <div class="_infocase_byme-row" data-area="btn-shortcutcase_temp" ></div>
                
            </div>`;
            
            if(!document.querySelector('._infocase_byme')) {
                if(!document.querySelector('[debug-id="case-id"] span.case-id')) return false;
                
                
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
                var _once_save = false;
                var _innertext_compare = _infocase_bymeelm.innerText.replace(/(\r\n|\n|\r)/gm, "");
                
                setChangeListener(_infocase_bymeelm, (even) => {
    
                    var _innertext_trigger_compare = _infocase_bymeelm.innerText.replace(/(\r\n|\n|\r)/gm, "");
    
                    var _target = even.target;
                    var _elmbtnsave = _infocase_bymeelm.querySelector('[data-btnsave]');
                    var __elm_btnsave = _target.getAttribute('data-btnsave');
                    var __disnewline = _target.getAttribute('data-disnewline');
                    var __key = _target.getAttribute('data-infocase');
                    var __value = _target.innerText.trim();
                    
                    // cLog(() => { console.log('wsave', even.type); });
    
                    
                    cLog(() => { console.log('wsave length', _innertext_trigger_compare === _innertext_compare); });
    
                    
                    if(
                        even.type === 'keypress' ||
                        even.type === 'keyup' 
                    ) {
                        _elmbtnsave.classList.remove('disable');
                    }
    
                    
                    if(__disnewline) {
                        if(even.which == 13) {
                            even.preventDefault();
                        }
                    }
    
                    if(even.type === 'mouseup' && _elmbtnsave.classList.contains('disable') == false ) {
                        // Btn save action click
                        // 
                        // reupdateForAll(rs, ['panelnotecase']);
                        if(__elm_btnsave) {
    
                            // Save setting
                                var _nsave = 0;
                                var _nsave_saved = 0;
                                var _temp = {};
                                // cLog(() => { console.log('wsave', _temp); });
                                
                                var is_complete_updated = function(callback) {
                                    
                                    cLog(() => { console.log(`__DONG Is done`,_nsave, _nsave_saved, _nsave === _nsave_saved); });
                                    if(_nsave === _nsave_saved) {
                                        if(document.querySelector('._connectcase_info')) {
                                            document.querySelector('._connectcase_info').remove();
                                        }
                                        
                                        reupdateForAll(window.dataCase, ['panelnotecase']);
                                        callback();
                                    }
                                }
    
                            
                            
                            
                            // Save case info
                                var _temp = {};
                                var _is_save = true;
                                _infocase_bymeelm.querySelectorAll('[data-infocase]').forEach((_item) => {
                                    const _key = _item.getAttribute('data-infocase');
                                    const _value = _item.innerText.trim();
                                    _is_save = true;
                                    
                                    if(_key === 'note') {
                                        _is_save = false;
                                    }
                                    
                                    if(_is_save) {
                                        _temp[_key] = _value;
                                    }
    
                                })
                                
                                _nsave++;
                                updateAllFieldsCase2Storage(_temp, __case_id(), (rs) => {
                                    cLog(() => { console.log(`Setting Case ${__case_id()}!!!`, _temp); });
                                    
                                    // Toastify({
                                    //     text: `Setting Case ${__case_id()}!!!`,
                                    //     duration: 2000,
                                    //     callback: function(){
                                    //         this.remove();
                                    //     }
                                    // }).showToast();
                                    
                                    window.dataCase = rs;
    
                                    _nsave_saved++;
                                    is_complete_updated(() => {})
                                });
                                
                                
                            // Save NOTED
                                var _value_noted = _infocase_bymeelm.querySelector('[data-infocase="note"]').innerText.trim();
                                _nsave++;
                                updateNoteCase(__case_id(), _value_noted, (rs) => {
                                    cLog(() => { console.log(`Saved note ${__case_id()}!!!`, _value_noted); });
                                    // Toastify({
                                    //     text: `Saved note ${__case_id()}!!!`,
                                    //     duration: 2000,
                                    //     callback: function(){
                                    //         this.remove();
                                    //     }
                                    // }).showToast();
                                    
                                    _nsave_saved++;
                                    is_complete_updated(() => {})
                                });  
    
    
                                Toastify({
                                    text: `Save Case ${__case_id()}!!!`,
                                    duration: 2000,
                                    callback: function(){
                                        this.remove();
                                    }
                                }).showToast();
    
    
                            // Save length and disable button
                            _innertext_compare = _innertext_trigger_compare;
                            _elmbtnsave.classList.add('disable');
                        }
                    }
                })
    
                
    
                
            }
        } catch (error) {
            console.error("addPanelNote2Case ERROR", error)
        }
    }
    
    var renderHTML2PanelNoteCase = (_datacase = false) => {
        // For panel
        var _infocase_bymeelm = document.querySelector('._infocase_byme');
        if(_infocase_bymeelm) {
            var _elmbtnsave = _infocase_bymeelm.querySelector('[data-btnsave]');
            
            if(_elmbtnsave) {
                _elmbtnsave.classList.add('disable');    
            }
            
            _infocase_bymeelm.querySelectorAll('[data-infocase][contenteditable]').forEach((elm) => {elm.innerHTML = ''})
            
            if(!_datacase) {
                _datacase = window.dataCase;
            }
    
            var _iload = 0, _iload_done = 0;
            var _checkload = (_iload_done) => {
                if(_iload == _iload_done) {
                    _infocase_bymeelm.classList.add('childload_done');
                }
            }

            
            replaceAllHtmlElement(_infocase_bymeelm, _datacase);

            
            // Display noted
            _iload++;
            getNoteCase(_datacase.case_id, (data) => {
                if(data) {
                    _infocase_bymeelm.querySelectorAll('[data-infocase="note"]').forEach((item) => {
                        item.innerHTML = data;
                    })
                }

                _iload_done++;
                _checkload(_iload_done);
            });

            
            // DISPLAY ToolShortlink by Case ID
            _iload++;
            getToolShortlink(_datacase.case_id, (data) => {
                if(data) {
                    replaceKeyHTMLByCaseID(_infocase_bymeelm, 'toolshortlink', data);
                }
                
                _iload_done++;
                _checkload(_iload_done);
            });

        
        }
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
                                _datatemp.customer_website = _datatemp.customer_website.replace(/\s+|\n/gm, "");
                            }
                            
                            if(_td_1.innerText.includes("Request Category")) {
                                _datatemp.request_category = _td_2.innerText;
                            }
                            
                            if(_td_1.innerText.includes("Conversion Category")) {
                                _datatemp.conversion_category = _td_2.innerText;
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
                        var _emails = extractEmails(_contenttext);
    
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
            
    //         document.querySelectorAll("card.read-card home-data-item").forEach(function(elm){
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

            
    //         getdatall(document.querySelectorAll("card.read-card cuf-form-field"));
    //         getdatall(document.querySelectorAll("card.read-card home-data-item"));

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
                        <span class="_document_attachurl_i" style=" padding: 12px 0; display: block; " >DOCUMENT precall: <span data-highlight="need_recheck" data-btnclk="popup_add_doc_ec_dfa" >Click Add Document</span></span>
                    `
                };

                _arr_btnlist.push(_temp_precall);


                // var _temp_oncall = {
                //     'id' : 'cdtx__oncallbtn',
                //     'btn_text': 'On Call',
                //     'content_insert' : `
                //         <p dir="auto"><b>Sub-status:&nbsp;&nbsp;<span class="_sub_i" data-btnclk="choice_status_list" data-infocase="status_case" >Click Choice</span></b> </p>
                //         <p dir="auto"><b>Sub-status Reason:</b>&nbsp;&nbsp; </p>
                //         <p dir="auto"><b>Speakeasy ID:&nbsp;&nbsp;</b> </p>
                //         <p dir="auto"><b>On Call Comments:</b>&nbsp;&nbsp; </p>
                //         <p dir="auto"><b>Tags Implemented:&nbsp;&nbsp;</b></p>
                //         <p dir="auto"><b>Screenshots:&nbsp;&nbsp;</b></p>
                //         <p dir="auto"><b>Multiple CIDs:&nbsp;&nbsp;</b>NA</p>
                //         <p dir="auto"><b>On Call Screenshot:&nbsp;&nbsp;</b> </p>
                //     `
                // };
                // _arr_btnlist.push(_temp_oncall);
                // 
                // <span class="cdtx__uioncall_control-lt_sliptempl" data-text="LT S & T" data-btntooltip="LT SPLIT & TRANSFER" data-btnclk="oncall_templ_lt_template" >&nbsp;</span>

                var _content_insert = `
                    <div class="cdtx__uioncall" data-note="this is old version">
                        <div class="cdtx__uioncall_control" contenteditable="false" >
                            <span class="cdtx__uioncall_control-load" data-text="List" data-btnclk="oncall_templ_act_load" >&nbsp;</span>
                            <span class="cdtx__uioncall_control-save" data-text="Save" data-btnclk="oncall_templ_act_save" data-btntooltip="Save template Reuse"  >&nbsp;</span>
                            <span class="cdtx__uioncall_control-remove" data-text="Remove" data-btnclk="oncall_templ_act_remove" >&nbsp;</span>
                        </div>
                        <div class="cdtx__uioncall_outer">
                            <p dir="auto"><b>Sub-status:&nbsp;&nbsp;<span class="_sub_i" data-btnclk="choice_status_list" data-infocase="status_case" >Click Choice</span></b> </p>
                            <p dir="auto"><b>AM Program: <span data-highlight="need_recheck">{{sales_program}}</span></b>&nbsp;&nbsp; </p>
                            <p dir="auto"><b>Sub-status Reason:</b>&nbsp;&nbsp; </p>
                            <p dir="auto"><b data-btnclk="oncall_templ_act_flchoice" data-dateformat="d/m/Y" >FL:&nbsp;&nbsp;</b><span data-text="oncall_templ_act_flchoice-text" >NA</span></p>
                            <p dir="auto"><b>On Call Comments:&nbsp;&nbsp; </b>Like Sub-status Reason</p>
                            <p dir="auto"><b>Speakeasy ID:&nbsp;&nbsp;</b> Call log</p>
                            <p dir="auto"><b data-btnclk="oncall_templ_act_taskchoice" data-type="">Tags Implemented:&nbsp;&nbsp;</b><span data-text="oncall_templ_act_taskchoice-text" ></span></p>
                            <p dir="auto"><b><span class="cdtx__uioncall_control-flchoice">Screenshots: Attach</span></b></p>
                            <p dir="auto"><b>Multiple CIDs:&nbsp;&nbsp;</b>NA</p>
                            <p dir="auto"><b><span class="cdtx__uioncall_control-flchoice">On Call Screenshot: Attach</span></b></p>
                        </div>
                    </div>
                `;
                var _lt_template = getVariableSheetByKeyAndLanguage('OnCall note template', window.keylanguage);
                if(_lt_template.trim()) {
                    _content_insert = _lt_template;
                }
                
                
                var _temp_oncall = {
                    'id' : 'cdtx__uioncall--btn',
                    'btn_text': 'On Call (new)',
                    'content_insert' : _content_insert,
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
                            _paneltext.innerHTML = rules_vardatacase(text);
                            var _caseid = document.querySelector('[debug-id="case-id"] span.case-id').innerText;
                            
                            
                            
                            
                            _elm_content = _istopelm.querySelector(`.editor [contenteditable="true"]`);
                            if(_elm_content.innerText.trim() == '') {
                                _elm_content.innerHTML = '';
                            }
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
    

    // realtime checkInfo
    var recheckInfoCase = () => {
        // _panel.querySelector('._casecalendar_info--notification').insertAdjacentHTML('afterBegin', '<span style="background-color: #009688">Case Live Transfer!!!</span>');
        if(window.location.hostname !== 'cases.connect.corp.google.com') return false

        try {
            window._recheckInfo_Case = 0;
            observeOnce((elm) => {
                
                    
                var panel = () => { return document.querySelector('._casecalendar_info'); };
                var email_lst = () => { return document.querySelectorAll('internal-user-info .email'); }
                if(email_lst().length < 1) return; 
                
                
                
                
                    
                if(!panel()) return;
                
                if(window.dataCase.am_email) {
                    window._recheckInfo_Case = 1;
                
                
                    
                    cLog(() => { console.log('observeOnce - recheckInfoCase 2' ) }, 2)
                    
                    // s2
                    var _isset = false;
                    email_lst().forEach(elm => {
                        var email_inui = elm.innerText.trim()
                        var email_datacase = window.dataCase.am_email.trim();
                        email_datacase = (email_datacase.includes('@')) ? email_datacase : false;
                        email_inui = (email_inui.includes('@')) ? email_inui : false;
                        
                        
                        // console.log('recheckInfoCase', email_inui == email_datacase, email_inui, email_datacase);
                        if(email_inui && email_datacase) {
                            if(email_datacase.includes(email_inui)) {
                                
                                _isset = true
                            }
                        }
                    });
                    
                    var _isset_v2 = false; 
                    if(elm_readdeck = document.querySelector('read-deck')) {
                        _isset_v2 = elm_readdeck.innerText.includes(window.dataCase.am_email)
                    }
                    
                    // cLog(() => { console.log('recheckInfoCase - ', email_lst().length, panel(), window.dataCase ) })
                    
                    // s3
                    // cLog(() => { console.log('recheckInfoCase - ', _isset, _isset_v2 ) })
                    // if(_isset) {
                    //     if(panel().classList.contains('am_email_nomatch')) {
                    //         panel().classList.remove('am_email_nomatch')
                    //     }
                    // } else {
                    //     if(!panel().classList.contains('am_email_nomatch')) {
                    //         panel().classList.add('am_email_nomatch')
                    //     }
                    // }
                    
                    
                    
                    
                }
            });
        } catch (e) {
            console.error(e);    
        }
        
        
    }
    
    // mailTemplate
    var mailTemplateControl = () => {
        if(window.location.hostname !== 'cases.connect.corp.google.com') return false
        
        window.ncreate = window.ncreate || 1;
        observeOnce((elm) => {



            if(window.result.optionkl__form_option_data) {
                if(!window.result.optionkl__form_option_data.cdtx_chk_enable_emailcontrol) return false;
            }
            
            var _istopelm = document.querySelector(`.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top[card-type="compose"]`);
            if(_istopelm) {
                
                
                
                if(email_topcontent = _istopelm.querySelector('#email-body-content-top')) {
                    if(email_body_header = _istopelm.querySelector('#email-body-header')) {
                        var _elmcontrol = () => {
                            return _istopelm.querySelector('.cdtx__uiemailtempcontrol');
                        };

                        if(!_elmcontrol()) {
                            cLog(() => { console.log('observeOnce - mailTemplateControl' ) })
                            
                            // Anti loop
                            if(window.ncreate > 10) return false; window.ncreate++; 


                            console.log("DONGMAI", _elmcontrol())

                            cLog(() => { console.log('observeOnce - mailTemplateControl - once' ) })
                            
                            const dom = document.createElement("span");
                            dom.className = 'cdtx__uiemailtempcontrol';
                            dom.setAttribute('contenteditable', false)
                            dom.innerHTML = `
                                <span class="cdtx__uiemailtempcontrol-load" data-text="List" data-btnclk="mail_templ_act_load" >&nbsp;</span>
                                <span class="cdtx__uiemailtempcontrol-save" data-text="Save template" data-btnclk="mail_templ_act_save" >&nbsp;</span>
                                <span class="cdtx__uiemailtempcontrol-remove" data-text="Empty" data-btnclk="mail_templ_act_remove" >&nbsp;</span>
                            `;
    
                            email_body_header.insertAdjacentElement('afterEnd', dom);
    
                        }        
                    }
                }
                
            }
            
        });
    }

    // reupdateForAll
    // Disable reupdate a special - Exclude: panelnotecase
    function reupdateForAll(_datacase = false, arr_exclude = []) {
        
        if(!_datacase) {
            _datacase = window.dataCase;
        }

        cLog(() => {console.log('cdtx reupdateForAll', _datacase); })


        noteBarAlert('CLEAR');

        if(_datacase.is_external) {
            noteBarAlert('Is EXTERNAL!', _datacase.case_id);
        }
        
        if(_datacase.customer_program) {
            if(_datacase.customer_program.toLowerCase().trim().includes('silver')) {
                noteBarAlert('Customer Silver!!!!', _datacase.case_id, 'silver');
            }
            
            if(_datacase.customer_program.toLowerCase().trim().includes('gold')) {
                noteBarAlert('Customer Gold!!!!', _datacase.case_id, 'gold');
            }
            
            if(_datacase.customer_program.toLowerCase().trim().includes('platium')) {
                noteBarAlert('Customer Platium!!!!', _datacase.case_id, 'platium');
            }
        }
        
        try {
            
            var __is_external = false;
            if(_datacase.is_gcc) {
                __is_external = true;
            }
            
            if(_datacase.sales_program) {
                if(_datacase.sales_program.toLowerCase().includes('gcc')) {
                    __is_external = true;    
                }
            }
            
            if(__is_external) {
                noteBarAlert('AM is GCC!', _datacase.case_id);    
            }
            
        } catch (error) {
            console.log('reupdateForAll', error);
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

        // Uu tien load your name
        document.querySelectorAll('[data-infosetting="your-name"]').forEach(function(elm){
            elm.innerText = window.tagteamoption.optionkl__inputyourname;
            elm.dispatchEvent(new Event('blur'));
        });
                

        // ******************
        // Replace all panel
        // ******************
        // _panel_div
        replaceAllHtmlElement(document.querySelector('#_panel_div'), _datacase);

    }


    function global_checkAddLoadMoreInfo(_caseid) {
        cLog(() => { console.log("1231231") });
    }
    

    var _sub_modal = () => {
        return document.querySelector('._sub_modal');
    }
    var _sub_modal_close = () => {
        return document.querySelector('._sub_modal_close');
    }

    var _sub_modal_remove = () => {
        if(_sub_modal()) {
            _sub_modal().innerHTML = '';
            _sub_modal().classList.remove('show');
        }
    }

    if(!_sub_modal()) {
        
        var _dom = document.createElement('span');
        _dom.className = '_sub_modal';
        
        var _act_close_modal = (elm) => {
            if(elm.classList.contains('_sub_modal')) {
                _sub_modal().classList.remove('show');
                _sub_modal().setAttribute('data-attr', '');
                _sub_modal().innerHTML = '';
            }
        }
        _dom.addEventListener("click", (e2) => {
            _act_close_modal(e2.target);
            
            if(e2.target.matches('._sub_modal_close')) {
                _act_close_modal(e2.target.closest('._sub_modal'));
            }
        });
        

        document.body.insertAdjacentElement('afterEnd', _dom);
        
    }

    function clickAction() {
        // 0 - init once
        window._onceclickAction = window._onceclickAction || 0;
        if(0 != window._onceclickAction) { return false; }
        window._onceclickAction = 1;
        
        // ==== ONCLICK
        // Highlight
        onClickElm(`[data-highlight]`, `click`, (elm, e) => {
            // allow
            elm.removeAttribute("data-highlight");
        });
        
        
        
        


        // Close panel
        onClickElm('[data-btnaction="close_panel"]', 'click', function(elm, e){
            if(elm.closest('[data-panel="email-template"].active')) {
                document.querySelector('._panel_shortcut_openemailtemplate').click();
            }
            
        })
        
        // Toggle close popup
        onClickElm('.dock-container [debug-id]', 'click', function(elm, e){
            var _panel_closebtn = document.querySelector('._infocase_byme.open [data-btnclk="_infocase_byme-openact"]');
            if(_panel_closebtn) {                
                _panel_closebtn.click();
                
            }
            
        });
        
        
        onClickElm(`#cr-list li`, `click`, (elm, e) => {
            clearAndPrepareCRTemplate();
        });

        onClickElm('[debug-id]', 'mouseup', function(elm, e){
            
            try {
                var _action = elm.getAttribute("debug-id");
                cLog(() => { console.log('cdtx debug-id', _action); })

                // [debug-id="reply-button"]        
                if(_action === 'reply-button') {
                    window.hasClkReply = true;
                    
                }
                
                // [debug-id="reply-all-button"]
                if(_action === 'reply-all-button') {
                    window.hasClkReply = true;
                }

            
            } catch (error) {
                console.error('click debug id', error)
            }
        })
        // For group data btn click
        onClickElm('[data-btnclk]', 'click', function(elm, e){
            try {
                var _action = elm.getAttribute("data-btnclk");
                cLog(() => { console.log('cdtx', _action); })



                if(_action === 'popup_update_LT') {
                    popupUpdateLT()
                }
                
                
                if(_action === 'remind_1st_email_ec') {
                    var _attrcaseid = elm.getAttribute("data-forcaseid");
                    if(!__case_id()) return false;
                    if(__case_id() != _attrcaseid) return false;
                    
                    document.querySelector('.cdtxemailpanel-item[title="ec_hightouch_mms"]').click();

                    updateFieldCase2Storage('isremind_1stmail_ec', 1, __case_id(), (response) => {
                        if(!response.case_id) return false;    
                        elm.remove()
                    });   
                }
                
                if(_action === 'remind_add_precall_note') {
                    var _attrcaseid = elm.getAttribute("data-forcaseid");
                    if(!__case_id()) return false;
                    if(__case_id() != _attrcaseid) return false;
                    
                    
                    sAddPrecallNote();

                    updateFieldCase2Storage('isremind_precall_ec', 1, __case_id(), (response) => {
                        if(!response.case_id) return false;    
                        elm.remove()
                    });
                }
                
                
                                        
                

                if(_action === 'crawl_case') {
                    saveCaseNow(__case_id(), (caseload) => {
                        
                        cLog(() => { console.log('cdtx - TH 2 here - saveCaseNow - DONE', caseload) });
                        window.caseCurrent = {};
                        window.caseCurrent = caseload;

                        reupdateForAll(caseload);
                        
                        global_checkAddLoadMoreInfo(_caseid);
                        
                        checkInputEmailInboxAndFix();
                        
                    });

                }

                if(_action === '_clickshow') {
                    elm.classList.add('__show')
                }
                
                
                if(_action === 'click2remove') {
                    elm.remove();
                }
                
                
                
                if(_action === 'cdtx_quicklinkbtn--remove') {
                    if(!window.confirm("You sure remove?")) return;

                    if(elm.nextElementSibling.matches('[data-link]')) {
                        var _link = elm.nextElementSibling.getAttribute('data-link');
                        var _parent = elm.closest('.cdtx_quicklinkbtn--gr');


                        // DISPLAY Quick link by Case ID
                        setGetQuickLink(__case_id(), 'remove', _link);

                        console.log(__case_id(), _link);
                        _parent.remove();
                    }
                }
                
                
                
                // XXXXX
                if(_action === 'mail_templ_act_load') {

                    var _parent = elm.closest('#email-body-container');
                    var _emailbodycontenttop = _parent.querySelector('#email-body-content-top');
                    var _emailbodycontent = _parent.querySelector('#email-body-content');

                    getChromeStorage("mail_templ_list", (response) => {
                        var rs_list = response.value || [];
                        

                        // Filter lại danh sách đã xóa
                        rs_list = rs_list.filter((e, _i) => {
                            if(e.remove === 1) {
                                return false;
                            }
                            return true;
                        });
                        

                        
                        _sub_modal().insertAdjacentHTML('beforeEnd', `
                            <div class="cdtx__uioncall_control-list_templ" contenteditable="false">
                                <span class="cdtx__uioncall_control-searchtempl" contenteditable="plaintext-only"></span>
                                <ul>
                                </ul>
                            </div>
                        `);

                        _sub_modal().classList.add('show');


                        rs_list.forEach((value, index) => {
                            // `<li><span data-btnclk="oncall_templ_clickchoice">SO - Vui</span><span data-btnclk="oncall_templ_clickdelete">Del</span></li>`
                            // elm_list += `<li data-id="${index}"><span data-btnclk="oncall_templ_clickchoice">${elm.text}</span><span data-btnclk="oncall_templ_clickdelete" >Del</span></li>`
                            var _li = document.createElement('li');
                                _li.setAttribute('data-id', index);
                                _li.innerHTML = `<span class="cdtx__uioncall_templ_clickchoice" >${value.text}</span>
                                <span class="gr">
                                    <span class="cdtx__uioncall_templ_clickdelete" >Del</span>
                                    <span class="cdtx__uioncall_templ_clickpin" >${1 === rs_list[index].pin ? 'Unpin': 'Pin'}</span>
                                </span>
                                `;
                                _li.classList.toggle(`${1 === rs_list[index].pin ? 'pin': 'unpin'}`);

                                _li.querySelector('.cdtx__uioncall_templ_clickchoice').addEventListener('click', () => {
                                    
                                    var _caseid = () => {
                                        if(document.querySelector('[debug-id="case-id"] span.case-id')) {
                                            return document.querySelector('[debug-id="case-id"] span.case-id').innerText;
                                        }
                                        return '';
                                    };

                                    if(_caseid() !== window.dataCase.case_id) {
                                        if(!window.confirm("Data case not ready your sure is load?")) {
                                            return false;
                                        }
                                    }

                                    _emailbodycontenttop.innerHTML = value.content_outer;
                                    
                                    replaceAllHtmlElement(_emailbodycontenttop, window.dataCase);
                                    
                                    // _emailbodycontent.style.padding = '0px';
                                    // _emailbodycontent.style.width = '100%';
                                    
                                    _sub_modal_remove();
                                    _reupdate_outer();
                                });
                            


                                // REMOVE
                                _li.querySelector('.cdtx__uioncall_templ_clickdelete').addEventListener('click', () => {
                                    if(!window.confirm("Your sure del this?")) return;
                                    _parent.classList.add('isloading');

                                    rs_list[index].remove = 1;

                                    setChromeStorage("mail_templ_list", rs_list, (response) => {
                                        _li.remove();
                                        _parent.classList.remove('isloading');
                                    });   
                                });

                                _li.querySelector('.cdtx__uioncall_templ_clickpin').addEventListener('click', (e) => {
                                    _li.classList.remove('pin');
                                    _li.classList.remove('unpin');

                                    if(1 === rs_list[index].pin) {
                                        rs_list[index].pin = 0;
                                        e.target.innerText = 'Pin';
                                        
                                        _li.classList.add('unpin');
                                    } else {
                                        rs_list[index].pin = 1;
                                        e.target.innerText = 'Unpin';

                                        _li.classList.add('pin');
                                    }
                                    
                                    // console.log(rs_list);
                                    setChromeStorage("mail_templ_list", rs_list, (response) => {
                                        // console.log(response)
                                    });   
                                });
                            
                                _sub_modal().querySelector('.cdtx__uioncall_control-list_templ ul').insertAdjacentElement('afterBegin', _li);
                            
                            
                            
                            
                            _sub_modal().querySelector('.cdtx__uioncall_control-searchtempl').focus();
                            
                            _sub_modal().querySelector('.cdtx__uioncall_control-searchtempl').addEventListener('keyup', function(e){
                                // console.log(e.target.innerText);
                                var status_search = (str_search) => {
                                    // Reset
                                    _sub_modal().querySelectorAll('.cdtx__uioncall_control-list_templ li').forEach((__elm) => {
                                        __elm.style.display = "";
                                    });

                                    // Only > 0
                                    if(!(str_search.trim().length > 0)) return false;

                                    
                                    rs_list.forEach((value, index) => {
                                        var _stritem = value.text + value.content_outer;
                                        if(!_stritem.toLowerCase().includes(str_search.toLowerCase())) {
                                            _sub_modal().querySelector(`.cdtx__uioncall_control-list_templ li[data-id="${index}"]`).style.display = 'none';
                                        }
                                    })
                                };

                                status_search(e.target.innerText)
                            })
                        });
                    });
                    
                }


                // _connectcase_info-act_push2summary
                if(_action === '_connectcase_info-act_push2summary') {
                    if(window.dataCase.case_id) {
                        var _str_insert = `${window.dataCase.follow_up_time || ''} | ${window.dataCase.customer_name || ''} | ${window.dataCase.customer_website || ''} | ${(window.dataCase.is_caselt ? 'case LT' : false) || ''}`;
                        if(_summaryelm = document.querySelector('[debug-id="case-summary-input"] textarea')) {
                            _summaryelm.value = _str_insert;
                            
                            _summaryelm.dispatchEvent(new Event('focus'));
                            _summaryelm.dispatchEvent(new Event('input'));
                            _summaryelm.dispatchEvent(new Event('change'));
                            _summaryelm.dispatchEvent(new Event('blur'));
                        }
                    }
                }


                if(_action === 'mail_templ_act_save') {
                    var _parent = elm.closest('#email-body-container');
                    var _emailbodycontenttop = _parent.querySelector('#email-body-content-top');

                    if(!_emailbodycontenttop) { alert("not isset"); return false }

                    if(_emailbodycontenttop) {
                        var _contenthtml = _emailbodycontenttop.innerHTML;
    
                        var _text = prompt("Enter keyword for save ", "");
                        if(_text) {
                            var _content_outer = _contenthtml.trim();
    
                            var _this_time = new Date();
                            
                            getChromeStorage("mail_templ_list", (response) => {
                                var rs_list = response.value || [];
    
                                rs_list.push({
                                    'text': _text,
                                    'content_outer': _content_outer,
                                    'this_time': _this_time,
                                });
    
                                
                                setChromeStorage("mail_templ_list", rs_list, (response) => {
                                    
                                });   
                            });   
                        } 
                    }
                }
                
                if(_action === 'chatbot_dialog') {
                    
                    var iframe_dashboard_chklst_sop = 'https://app.bsd.education/sandbox_output/instance/jhkq7bsv/index.html';
                    if(iframe_dash_here = getVariableSheetByKeyAndLanguage('chatbot_dialog', window.keylanguage)) {
                        iframe_dashboard_chklst_sop = iframe_dash_here;
                    }
                    
                    _sub_modal().setAttribute('data-attr', 'chatbot_dialog');

                    _sub_modal().insertAdjacentHTML('beforeEnd', `
                        <span class="_sub_modal_close"></span>
                        <div class="_sub_modal_container_outer" >
                            <iframe src="${iframe_dashboard_chklst_sop}"></iframe>
                        </div>
                    `);

                    _sub_modal().classList.add('show');
                }
                
                
                if(_action === 'mail_templ_act_remove') {
                    var _parent = elm.closest('#email-body-container');
                    var _emailbodycontenttop = _parent.querySelector('#email-body-content-top');
                    if(_emailbodycontenttop) {
                        _emailbodycontenttop.innerHTML = "";
                    }
                }

                // XXXXX
                if(_action === 'oncall_templ_act_flchoice') {
                    var _parent = elm.closest('.cdtx__uioncall') || elm.closest('div');
                    var _textreplace = _parent.querySelector('[data-text="oncall_templ_act_flchoice-text"]') || elm;
                    var _dateformat = elm.getAttribute('data-dateformat');
                    var _anytime = elm.getAttribute('data-anytime');
                    var _type = elm.getAttribute('data-type');
                    var _case = elm.getAttribute('data-case');
                    var _dispatch_afterchange = elm.getAttribute('data-dispatch_afterchange');
                    var _data_infocase = elm.getAttribute('data-infocase');

                    var attr_min = _anytime ? '' : `min="${formatDate(new Date())}"`;

                    
                    var _span = document.createElement('div');
                        _span.className = 'cdtx__uioncall--datechoice';
                        _span.innerHTML = `
                        <ul ><li data-thischoice="3 days" title="work in days" ></li><li data-thischoice="6 days" title="work in days" ></li><li data-thischoice="14 days" title="days" ></li><li data-thischoice="N/A" ></li><li data-thischoice="Finish" ></li></ul>
                        <hr>
                        <div class="cdtx__uioncall--datechoice-outer"><span class="cdtx__uioncall--datepicker">Choice Date</span><input id="datepicker" type="date" ${attr_min} value=""></div>
                        `;
                    

                    _sub_modal().insertAdjacentElement('afterBegin', _span);
                    
                    _sub_modal().classList.add('show');

                    setTimeout(() => {
                        _sub_modal().querySelector('#datepicker').showPicker();
                    }, 500)
                    _sub_modal().querySelector('.cdtx__uioncall--datepicker').addEventListener('click', (e2) => {
                        _sub_modal().querySelector('#datepicker').showPicker();
                    });
                    

                    var update_dispatchevent = () => {
                        if(_dispatch_afterchange) {
                            var lst = _dispatch_afterchange.split(',');
                            lst.forEach(item => {
                                _textreplace.dispatchEvent(new Event(item));
                            })
                        }
                    };

                    var update2db = (_datestr) => {
                        // date case data
                        if(_type == 'update_infocase') {
                            if(_data_infocase) {
                                updateFieldCase2Storage(_data_infocase, _datestr, _case, (response) => {
                                    if(!response.case_id) return false;

                                    elm.setAttribute('data-valchoice', _datestr);

                                    // Next copy elm
                                    if(elm.nextElementSibling.matches('.copycaseid')) {
                                        elm.nextElementSibling.setAttribute('data-copycontent', _datestr)
                                    }
                                    
                                    cLog(() => { console.log('cdtx', _data_infocase + " " + _datestr + " " + _case + ' update done', response); })

                                    window.dataCase = response;

                                    
                                });
                            }
                        }
                    }
                    _sub_modal().querySelector('#datepicker').addEventListener('change', (e2) => {
                        const _datechoice = e2.target.value;
                        const _dateobj = new Date(_datechoice);
                        
                        const diffTime = Math.abs(_dateobj - new Date());
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                        
                        var _datestr = formatDate(_dateobj, _dateformat ? _dateformat : 'd/m/Y');

                        _textreplace.innerHTML = _datestr;

                        update2db(_datestr)
                        update_dispatchevent()

                        _sub_modal_remove();
                        _reupdate_outer();
                    });

                    

                    _span.querySelectorAll('[data-thischoice]').forEach((item) => {
                        item.addEventListener('click', (e) => {
                            var _thischoice = e.target.getAttribute('data-thischoice');
                            switch (_thischoice) {
                                case '3 days':
                                    _textreplace.innerHTML = dayNextByCustom(3) + ` (${_thischoice})`;
                                    
                                    break;
                            
                                case '6 days':
                                    _textreplace.innerHTML = dayNextByCustom(6) + ` (${_thischoice})`;
                                    
                                    break;
                
            
                                case '14 days':
                                    _textreplace.innerHTML = dayNextByCustom(14, '', false) + ` (${_thischoice})`;
                                    
                                    break;
                                    
                                case 'N/A':
                                    _textreplace.innerHTML = 'N/A'
                                    
                                    break;

                                default:
                                    _textreplace.innerHTML = _thischoice
                                    break;
                            }

                            update2db(_thischoice);
                            update_dispatchevent();

                            _sub_modal_remove();
                            _reupdate_outer();
                        })
                    });

                    elm.dispatchEvent(new Event('input'));
                    elm.dispatchEvent(new Event('focus'));
                    elm.dispatchEvent(new Event('click'));
                    _reupdate_outer();
                }

                if(_action === 'oncall_templ_act_taskchoice') {
                    var _type = elm.getAttribute('data-type');
                    var _case = elm.getAttribute('data-case');
                    var _data_infocase = elm.getAttribute('data-infocase');
                    
                    // after, append, replace
                    var _parent = elm.parentNode.closest('div');
                    console.log(_parent);
                    var _textreplace = () => {
                        return _parent.querySelector('[data-text="oncall_templ_act_taskchoice-text"]');
                    }

                    // reset
                    // var oncall_templ_act_taskchoice_lst = null;
                    // if(oncall_templ_act_taskchoice_lst = _parent.querySelector('[data-name="oncall_templ_act_taskchoice_lst"]')) {
                    //     oncall_templ_act_taskchoice_lst.remove();
                    //     return;
                    // }

                    var _span = document.createElement('span');
                        _span.setAttribute('data-name', 'oncall_templ_act_taskchoice_lst');
                        _span.innerHTML = `<div class="cdtx__uioncall--block">
                            <span class="oncall_templ_act_taskchoice_btnok" data-number=" / Clear">OK</span>
                            <ul class="oncall_templ_act_taskchoice_lst"></ul>
                        </div>`;

                    var arrlsttask = ['NA', 'Ads Enhanced Conversions', 'Ads Conversion Tracking', 'GA4 Migration', 'GA4 E-Commerce Migration', 'Shopping Feed Optimization', 'Shopping Onboarding', 'Google Analytics Troubleshooting', 'Analytics Event Tracking', 'Ads Remarketing', 'Ads Dynamic Remarketing', 'Fix Sitewide Tagging (OGT & CT)', 'Ads Conversion Tracking Troubleshooting', 'Analytics E-Commerce Tracking', 'Analytics Enhanced E-Commerce Tracking', 'Analytics Cross Domain Tracking', 'Analytics Dynamic Remarketing', 'Analytics Health Check', 'Analytics Remarketing', 'Analytics Setup', 'Analytics Troubleshooting', 'Consent Mode', 'Site Wide Tag - Conversion Tracking Fix(OGT & CT)', 'Google Tag Manager Installation', 'Ads Conversion Code', 'Website Call Conversion', 'GA Destination Tracking', 'GA Event Tracking', 'GA Smart Goals', 'Dynamic Remarketing - Retail', 'Dynamic Remarketing - X (Non-Retail)', 'Google Analytics Dynamic Remarketing (Non-Retail)', 'Google Analytics Dynamic Remarketing (Retail)', 'Google Analytics Health Check', 'GA Starter Pack', 'Offline Conversion Tracking', 'ReCaptcha Implementation', 'Cross Domain Tracking', 'Lead Form Ad Extension', 'Enhanced Conversions', 'Ads Website Call Conversion',];


                    var arr_chk_input = () => {
                        var arr = []
                        var checkboxes = document.querySelectorAll('.oncall_templ_act_taskchoice_lst [type="checkbox"][data-value]:checked')
                        
                        for (var i = 0; i < checkboxes.length; i++) {
                          arr.push(checkboxes[i].getAttribute('data-value'));
                        }
                        
                        if(btnok = _sub_modal().querySelector('.oncall_templ_act_taskchoice_btnok')) {
                            btnok.setAttribute('data-number', (arr.length ? ` (${arr.length}) ` : ' / Clear'));
                        }
                            
                        return arr;
                    };
                    
                        
                    var update2db = (_datastr) => {
                        // date case data
                        if(_type == 'update_infocase') {
                            if(_data_infocase) {
                                if(_case) {
                                    updateFieldCase2Storage(_data_infocase, _datastr, _case, (response) => {
                                        if(!response.case_id) return false;

                                        elm.setAttribute('data-valchoice', _datastr);
                                        cLog(() => { console.log('cdtx', _data_infocase + " " + _datastr + " " + _case + ' update done', response); })
    
                                        window.dataCase = response;
                                    });
                                }
                            }
                        }
                    }

                    arrlsttask.forEach(value => {
                        var _li = document.createElement('li');
                        _li.setAttribute('data-title', value);
                        
                        _li.innerHTML = `<input type="checkbox" data-value="${value}" /> <span class="__task_item_text" data-text="${value}" ></span>`;
                        
                        _li.querySelector('.__task_item_text').addEventListener('click', () => {
                            if(!_textreplace()) {
                                elm.insertAdjacentHTML('afterEnd', '<span data-text="oncall_templ_act_taskchoice-text"></span>')
                            } 
                            
                            _textreplace().insertAdjacentHTML('beforeEnd', _textreplace().innerText.trim() ? ", " + value : value );

                            update2db(_textreplace().innerText);

                            _span.remove(); 
                            _sub_modal_remove();
                            _reupdate_outer();
                        });
                        
                        _li.querySelector('[type="checkbox"][data-value]').addEventListener('input', () => {
                            console.log(arr_chk_input());
                        });

                        if(window.dataCase.tasks) {
                            if(window.dataCase.tasks.includes(value)) {
                                _li.setAttribute('data-istop', 1);
                            }    
                        }

                        _span.querySelector('ul').insertAdjacentElement('beforeEnd', _li);
                    });
                    
                    _sub_modal().insertAdjacentElement('afterBegin', _span);
                    
                    _sub_modal().classList.add('show');

                    
                    if(btnok = _sub_modal().querySelector('.oncall_templ_act_taskchoice_btnok')) {
                        
                        if(!_textreplace()) {
                            elm.insertAdjacentHTML('afterEnd', '<span data-text="oncall_templ_act_taskchoice-text"></span>');
                        }
                            
                        btnok.addEventListener('click', () => {
                            
                            _textreplace().innerText = arr_chk_input().join(', ');

                            update2db(_textreplace().innerText);

                            _span.remove(); 
                            _sub_modal_remove();
                            _reupdate_outer();
                        });
                    }
                    
                    elm.dispatchEvent(new Event('input'));
                    elm.dispatchEvent(new Event('focus'));
                    elm.dispatchEvent(new Event('click'));
                    // elm.dispatchEvent(new Event('change'));
                    elm.dispatchEvent(new Event('keypress'));
                    elm.dispatchEvent(new KeyboardEvent('keypress'));

                    _reupdate_outer();
                }

                if(_action === 'oncall_templ_act_remove') {
                    elm.closest('.cdtx__uioncall').remove();
                    _reupdate_outer();
                }

                if(_action === 'oncall_templ_act_save') {
                    var _text = prompt("Enter keyword for save ", "");
                    if(_text) {
                        var _parent = elm.closest('.cdtx__uioncall');
                        var _content_outer = _parent.querySelector('.cdtx__uioncall_outer').innerHTML;
                        _content_outer = _content_outer.trim();

                        var _this_time = new Date();
                        
                        getChromeStorage("oncall_templ_list", (response) => {
                            var rs_list = response.value || [];

                            rs_list.push({
                                'text': _text,
                                'content_outer': _content_outer,
                                'this_time': _this_time,
                            });

                            
                            setChromeStorage("oncall_templ_list", rs_list, (response) => {
                                
                            });   
                        });   
                    } 
 
                    
                }
                
                // if(_action === 'oncall_templ_lt_template') {
                //     var _lt_template = getVariableSheetByKeyAndLanguage('TEMPLATE_SPLIT_TRANSFER_CASE_TO_GCC', window.keylanguage);
                //     if(_lt_template.trim()) {
                //         var _parent = elm.closest('.cdtx__uioncall');
                //         _parent.querySelector('.cdtx__uioncall_outer').innerHTML = _lt_template;
                //         _reupdate_outer();    
                //     }
                // }
                
                if(_action === 'oncall_templ_act_load') {
                    var _parent = elm.closest('.cdtx__uioncall');
                    
                    getChromeStorage("oncall_templ_list", (response) => {
                        var rs_list = response.value || [];
                        

                        // Filter lại danh sách đã xóa
                        rs_list = rs_list.filter((e, _i) => {
                            if(e.remove === 1) {
                                return false;
                            }
                            return true;
                        });
                        

                        
                        _sub_modal().insertAdjacentHTML('beforeEnd', `
                            <div class="cdtx__uioncall_control-list_templ" contenteditable="false">
                                <span class="cdtx__uioncall_control-searchtempl" contenteditable="plaintext-only"></span>
                                <ul>
                                </ul>
                            </div>
                        `);

                        _sub_modal().classList.add('show');


                        rs_list.forEach((value, index) => {
                            // `<li><span data-btnclk="oncall_templ_clickchoice">SO - Vui</span><span data-btnclk="oncall_templ_clickdelete">Del</span></li>`
                            // elm_list += `<li data-id="${index}"><span data-btnclk="oncall_templ_clickchoice">${elm.text}</span><span data-btnclk="oncall_templ_clickdelete" >Del</span></li>`
                            var _li = document.createElement('li');
                                _li.setAttribute('data-id', index);
                                _li.innerHTML = `<span class="cdtx__uioncall_templ_clickchoice" >${value.text}</span>
                                <span class="gr">
                                    <span class="cdtx__uioncall_templ_clickedit" >Edit</span>
                                    <span class="cdtx__uioncall_templ_clickdelete" >Del</span>
                                    <span class="cdtx__uioncall_templ_clickpin" >${1 === rs_list[index].pin ? 'Unpin': 'Pin'}</span>
                                </span>
                                `;
                                _li.classList.toggle(`${1 === rs_list[index].pin ? 'pin': 'unpin'}`);

                                _li.querySelector('.cdtx__uioncall_templ_clickchoice').addEventListener('click', () => {
                                    
                                    
                                    _parent.querySelector('.cdtx__uioncall_outer').innerHTML = rules_vardatacase(value.content_outer);
                                    _sub_modal_remove();
                                    _reupdate_outer();
                                });
                            


                                // REMOVE
                                _li.querySelector('.cdtx__uioncall_templ_clickdelete').addEventListener('click', () => {
                                    if(!window.confirm("Your sure del this?")) return;
                                    _parent.classList.add('isloading');

                                    rs_list[index].remove = 1;

                                    setChromeStorage("oncall_templ_list", rs_list, (response) => {
                                        _li.remove();
                                        _parent.classList.remove('isloading');
                                    });   
                                });
                                
                                // Edit
                                _li.querySelector('.cdtx__uioncall_templ_clickedit').addEventListener('click', (e_edit) => {
                                    var areaedit = function() { return _li.querySelector('.cdtx__uioncall_templ_areaedit'); };
                                    
                                    var btnthis = e_edit.target;
                                    
                                    if(!areaedit()) {
                                        btnthis.innerText = 'Save!';
                                        const dom_areaedit = document.createElement("div");
                                        dom_areaedit.className = 'cdtx__uioncall_templ_areaedit';
                                        
                                        var a_key = [];
                                        for (const [key, value] of Object.entries(window.dataCase)) {
                                            a_key.push(`<span>{{${key}}}</span>`);
                                        }
                                        

                                        dom_areaedit.innerHTML = `<div class="cdtx__uioncall_templ_areaedit--shortbar" data-length="${a_key.length}">${a_key.join(' | ')}</div><div class="cdtx__uioncall_templ_areaedit--content" contenteditable="true" >${value.content_outer}</div>`;
                                        
                                        _li.insertAdjacentElement('beforeEnd', dom_areaedit);
                                        _li.classList.add('isediting');
                                    } else {
                                        
                                        rs_list[index].content_outer = areaedit().querySelector('.cdtx__uioncall_templ_areaedit--content').innerHTML;
                                        
                                        // console.log(rs_list);
                                        setChromeStorage("oncall_templ_list", rs_list, (response) => {
                                            // console.log(response)
                                        });   
                                    
                                    
                                        btnthis.innerText = "Edit";
                                        
                                        areaedit().remove();
                                        _li.classList.remove('isediting');
                                    }
                                    
                                });

                                _li.querySelector('.cdtx__uioncall_templ_clickpin').addEventListener('click', (e) => {
                                    _li.classList.remove('pin');
                                    _li.classList.remove('unpin');

                                    if(1 === rs_list[index].pin) {
                                        rs_list[index].pin = 0;
                                        e.target.innerText = 'Pin';
                                        
                                        _li.classList.add('unpin');
                                    } else {
                                        rs_list[index].pin = 1;
                                        e.target.innerText = 'Unpin';

                                        _li.classList.add('pin');
                                    }
                                    
                                    // console.log(rs_list);
                                    setChromeStorage("oncall_templ_list", rs_list, (response) => {
                                        // console.log(response)
                                    });   
                                });
                            
                                _sub_modal().querySelector('.cdtx__uioncall_control-list_templ ul').insertAdjacentElement('afterBegin', _li);
                            
                            
                            
                            

                            _sub_modal().querySelector('.cdtx__uioncall_control-searchtempl').addEventListener('keyup', function(e){
                                // console.log(e.target.innerText);
                                var status_search = (str_search) => {
                                    // Reset
                                    _sub_modal().querySelectorAll('.cdtx__uioncall_control-list_templ li').forEach((__elm) => {
                                        __elm.style.display = "";
                                    });

                                    // Only > 0
                                    if(!(str_search.trim().length > 0)) return false;

                                    
                                    rs_list.forEach((value, index) => {
                                        // var _stritem = value.text + value.content_outer;
                                        var _stritem = value.text;
                                        if(!_stritem.toLowerCase().includes(str_search.toLowerCase())) {
                                            _sub_modal().querySelector(`.cdtx__uioncall_control-list_templ li[data-id="${index}"]`).style.display = 'none';
                                        }
                                    })
                                };

                                status_search(e.target.innerText)
                            })
                        });
                    });
                    
                    
                    
                }

                // XXXXX
                if(_action === 'open_connectappointment') {
                    var _case_id_here = elm.getAttribute('data-text');
                    connectAppointment(_case_id_here);
                }

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
                
                if(_action === '_connectcase_info-act_toggleopen') {
                    
                    var _caseinfo = document.querySelector(`[debug-id="body"] ._casecalendar_info`);
                    _caseinfo.querySelector('._connectcase_info--outer').classList.toggle('_none');
                    
                    elm.classList.toggle('OPEN');

                    localStorage.setItem('_connectcase_info--isopen', (_caseinfo.querySelector('._connectcase_info--outer._none') ? "CLOSE": "OPEN" ))
                    
                }
                
                
                if(_action === '_connectcase_info-act_edit') {
                    
                    document.querySelector(`[data-btnclk="open_panelnote"]`).click();
                    
                }
                
                
                if(_action === 'note_edit') {
                    
                    var _parent_noteare = elm.closest('[data-notearea]');
                    var _note_edit = _parent_noteare.querySelector('[data-infocase="note"]');
                    if(!_note_edit.getAttribute('contenteditable')) {
                        _note_edit.setAttribute('contenteditable', 'plaintext-only');
                        _parent_noteare.classList.add('save_ready');
                    } else{
                        var _caseid_here = _note_edit.getAttribute('data-caseidhere');
                        var _value_noted = _note_edit.innerText.trim();
                        _note_edit.classList.add("loading");

                        updateNoteCase(_caseid_here, _value_noted, (rs) => {
                            _note_edit.classList.remove("loading")
                            cLog(() => { console.log(`Saved note ${_caseid_here}!!!`, _value_noted); });
                        });

                        // update status
                        _note_edit.removeAttribute('contenteditable');
                        _parent_noteare.classList.remove('save_ready');
                    }
                    
                }
                
                
                if(_action === 'open_desc_calendar') {
                    var _desc_case = document.querySelector(`[jscontroller="dIQ6id"] #xDetDlgDesc`);
                    if(_desc_case) {
                        _desc_case.style.display = '';
                        elm.remove();
                    }
                }
                
                if(_action === 'copy_attrcopycontent') {
                    copyTextToClipboard(elm.getAttribute('data-copycontent'));
                }
                
                if(_action === 'enable_devmode') {
                    var _isset = localStorage.getItem('dongtest');
                    if (confirm(`You sure ${_isset ? 'disable' : 'enable' } dev mode`)) {
                        if(_isset) {
                            localStorage.removeItem('dongtest');
                        } else {
                            localStorage.setItem('dongtest', 1);
                        }

                        location.reload()

                    }
                }
                
                if(_action === 'tool_mail_test') {
                    toolEditorEmailTemplate4Dev();
                }
                
                
                if(_action === 'open_panelnote') {
                    

                    // Add noted
                    var _caseid = __case_id();
                    
                    
                    addPanelNote2Case(_caseid);
                    loadCaseStorageByID(_caseid, (response) => {
                        var caseload = response.value || false;
                        
                        if(caseload.case_id) {   
                            renderHTML2PanelNoteCase(caseload);
                        }
                    });
                        
                    // Nếu case này có database thì mở nó lên
                    document.querySelector('[data-btnclk="_infocase_byme-openact"]').click();
                }
                
                if(_action === 'get_window_data_case') {
                    cLog(() => {
                        console.log('cdtx debug - window - dataCase ', window.dataCase);
                        console.log('cdtx debug - window - dataMeetLink ', window.dataMeetLink);
                        
                        
                        console.log('cdtx debug - window - loadgooglesheetpublish ', window.loadgooglesheetpublish);
                        
                        
                        getChromeStorage("cdtx_listmeetlink_all", (response) => {
                            var casesmeet = response.value || {};
                            console.log('cdtx debug - window - dataMeetLinkAll ', casesmeet);    
                            
                        });
                        
                        
                        
                        getChromeStorage("cdtx_tool_shortlink", (response) => {
                            var casesmeet = response.value || {};
                            console.log('cdtx debug - window - cdtx_tool_shortlink ', casesmeet);    
                            
                        });
                        
                        getChromeStorage("cdtx_tool_shortlink_v2", (response) => {
                            var casesmeet = response.value || {};
                            console.log('cdtx debug - window - cdtx_tool_shortlink ', casesmeet);    
                            
                        });
                        
                        
                        getChromeStorage("cdtx_caseidcurrentmeet_pspeakeasy_caseid", (response) => {
                            var _list_rs = response.value || [];
                            console.log('cdtx debug - window - cdtx_caseidcurrentmeet_pspeakeasy_caseid ', _list_rs);

                            var _rsstr = 'rs: \n';
                            _list_rs.forEach((item) => {
                                if(item.caseid === window.dataCase.case_id) {
                                    _rsstr += `${item.id} - ${item.date} - ${item.time} \n`;
                                    
                                }
                            })
                            console.log(_rsstr);
                            
                            
                        });
                        getChromeStorage("qlus_lststorage", (response) => {
                            var _list_rs = response.value || [];
                            console.log('cdtx debug - window - qlus_lststorage ', _list_rs);
                            
                        });
                        getChromeStorage("cdtx_qlus_detail_list_case", (response) => {
                            var _list_rs = response.value || [];
                            console.log('cdtx debug - window - cdtx_qlus_detail_list_case ', _list_rs);
                            
                        });
                        
                        getChromeStorage("cdtx_tool_quicklink", (response) => {
                            var _list_rs = response.value || [];
                            console.log('cdtx debug - window - cdtx_tool_quicklink ', _list_rs);
                            
                        });
                    })
                    
                }
                
                if(_action === 'removecase_example') {
                    var _caseid = 'cdtx_caseid_' + document.querySelector('[debug-id="case-id"] .case-id').innerText;
                    if (confirm(`You sure remove ${_caseid} at memory`)) {
                        document.querySelector('._casecalendar_info._connectcase_info').remove()
                        removeChromeStorage(_caseid, () => {
                            Toastify({
                                text: `Action rm ${_caseid} success!!!`,
                                duration: 3000,
                                callback: function(){
                                    this.remove();
                                }
                            }).showToast();
                        });
                    }
                }

                if(_action === 'resetdata') {
                    if (confirm("You sure reupdate")) {
                        elm.innerHTML = "Loading...";
                        var _arrlistkey = [
                            'cdtx_scriptsync_auto', 
                            'cdtx_loadgooglesheetpublish_timesave', 
                            'cdtx_loadgooglesheetpublish', 
                            'stylecasebytheme', 
                            // 'cdtx_caseid_' + document.querySelector('[debug-id="case-id"] .case-id').innerText,
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
                
                
                if(_action === '_infocase_byme-openact') {
                    if(elmhereb = document.querySelector('._infocase_byme.open [data-btnsave="1"]:not(.disable)')) {
                        elmhereb.dispatchEvent(new Event('mouseup'));
                    }
                    
                    
                    // Close popup
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
                if(_action === 'popup_add_doc_ec_dfa') {
                    
                    var _link_dfa = getVariableSheetByKeyAndLanguage('DFA team folder', window.keylanguage);
                    var _link_ec = getVariableSheetByKeyAndLanguage('EC team folder', window.keylanguage);
                    var _link_udpga4 = getVariableSheetByKeyAndLanguage('UDP - for GA4 team folder', window.keylanguage);
                    var _lst_prenote_cus = [];
                    var _lst_quicklink_cus = () => {
                        if(__folders_preoncall = localStorage.getItem('__folders_preoncall')) {
                            __folders_preoncall_arr = __folders_preoncall.split('|+|');
                            __folders_preoncall_arr.forEach((item) => {
                                var [_aname, _bname] = item.split('|-|');
                                if(_aname && _bname) {
                                    _lst_prenote_cus.push(item);
                                }
                            })
                        }
                    };
                    
                    _lst_quicklink_cus();
                    
                    var _content = '';
                    if(_link_dfa || _link_ec) {
                        _content = `<small>Quick access:</small> `;
                        if(_link_dfa) {
                            _content += `<a href="${_link_dfa}" target="_blank">DFA</a>, `;
                        }

                        if(_link_ec) {
                            _content += `<a href="${_link_ec}" target="_blank">EC</a>, `;
                        }
                        
                        if(_link_udpga4) {
                            _content += `<a href="${_link_udpga4}" target="_blank">UDP GA4</a>, `;
                        }
                        
                        _lst_prenote_cus.forEach((item) => {
                            var [_name, _url] = item.split('|-|');
                            var _key = `${_name}|-|${_url}`;
                            _content += `<span data-parentquickaccess="${_key}"><a href="${_url}" target="_blank" title="${_url}" >${_name}</a><span data-btnclk="addQuickAccess" data-action="remove" title="delete this">X</span></span>, `;
                        })
                        
                    }
                    _content += `<span data-btnclk="addQuickAccess" data-action="add" title="Add your folder quick link" >+</span>`;
                    
                    var _lst = `
                    <span class="_popup_input">
                        ${_content}
                        <span class="_popup_input-inner">
                            <input type="text" class="_popup_input-inputvalue" placeholder="Insert link DOC share here">
                            <button class="_btn_stall _popup_input-addlink">Add Link</button>
                        </span>
                    </span>
                    `;
                    var _position_screen = elm.getBoundingClientRect();
                    
                    var _popup_ul_elm = document.createElement('span');
                    _popup_ul_elm.classList.add('_popup_ul');
                    _popup_ul_elm.innerHTML = _lst;
                    _popup_ul_elm.style.left = _position_screen.left  + "px";
                    _popup_ul_elm.style.top = (_position_screen.top + 14 ) + "px";
                    _popup_ul_elm.style.position = 'fixed';
                    
                    // Create outer
                    var _popup_outer_elm = document.createElement('span');
                    _popup_outer_elm.classList.add('_popup_outer');
                    _popup_outer_elm.innerHTML = _popup_ul_elm.outerHTML;

                    document.body.appendChild(_popup_outer_elm);

                    
                    _popup_outer_elm.querySelector('button._popup_input-addlink').addEventListener('click', (e) => {
                        var _input_val = _popup_outer_elm.querySelector('._popup_input-inputvalue').value;
                        elm.innerText = _input_val.trim() ? _input_val : "######";
                        
                        var _note = elm.closest('[contenteditable="true"]');
                        _note.dispatchEvent(new Event('input'));
                        _note.dispatchEvent(new Event('focus'));
                        _note.dispatchEvent(new Event('click'));

                        _popup_outer_elm.remove();
                    })
                    // Closest by outsite
                    _popup_outer_elm.addEventListener('click', function(e) {
                        if(e.target.classList.contains('_popup_outer')) {
                            _popup_outer_elm.remove();
                        }

                    })
                }
                
                if(_action === 'addQuickAccess') {
                        if(elm.getAttribute('data-action') == 'add') {
                            // console.log('addQuickAccess', 123);
                            if(_name = prompt('Name')) {
                                if(_url = prompt('URL')) {
                                    var _key = `${_name}|-|${_url}`;
                                    elm.insertAdjacentHTML('beforeBegin', `<span data-parentquickaccess="${_key}"><a href="${_url}" target="_blank" title="${_url}">${_name}</a><span data-btnclk="addQuickAccess" data-action="remove" title="delete this" >X</span></span>, `);
                                    
                                    
                                    var __folders_preoncall_str = localStorage.getItem('__folders_preoncall') || '';
                                    __folders_preoncall_arr = __folders_preoncall_str.split('|+|');
                                    __folders_preoncall_arr = __folders_preoncall_arr.filter(function (el) {
                                        return el.replace(/(\r\n|\n|\r)/gm,"")
                                    });
                                    
                                    __folders_preoncall_arr.push(_key);
                                    localStorage.setItem('__folders_preoncall', __folders_preoncall_arr.join('|+|'));
                                }
                            }   
                        }
                        
                        if(elm.getAttribute('data-action') == 'remove') {
                            if(!window.confirm("You sure remove?")) return;
                            var _parent = elm.closest('[data-parentquickaccess]');
                            var _key = _parent.getAttribute('data-parentquickaccess');
                            _parent.remove();
                            
                            // storage
                            var __folders_preoncall_str = localStorage.getItem('__folders_preoncall') || '';
                            
                            localStorage.setItem('__folders_preoncall', __folders_preoncall_str.replace(_key, ''));
                            
                        }
                }

                if(_action === 'cdtx__uioncall_choice_removeitem') {
                    elm.closest(".cdtx__uioncall-item").remove();
                }

                if(_action === 'choice_speakeasyid') {
                    var __elm = null;
                    if(__elm = document.querySelector('._sub_selist_outer')) {
                        __elm.remove();
                    }
                
                    var _lst = `
                    <div class="_sub_selist_seouter--inner">
                    <div class="_sub_selist_drow">
                        <div class="_sub_selist_dcol" data-listse="1" >
                        </div>
                        <div class="_sub_selist_dcol" data-list>
                            <ul class="_sub_selist_ul_list" contenteditable="true" ><li class="_d_hidden" ></li></ul>
                        </div>
                    </div>
                    <span class="_sub_selist_seouter--clickadd">Insert</span>
                    </div>
                    
                    `;
                    var _position_screen = elm.getBoundingClientRect();
                    
                    var _sub_selist_ul_elm = document.createElement('span');
                    _sub_selist_ul_elm.classList.add('_sub_selist_ul');
                    _sub_selist_ul_elm.innerHTML = _lst;
                    _sub_selist_ul_elm.style.left = (_position_screen.left - 100) + "px";
                    _sub_selist_ul_elm.style.top = (_position_screen.top + elm.offsetHeight) + "px";
                    _sub_selist_ul_elm.style.position = 'fixed';
                    
                    // Create outer
                    
                    var _sub_selist_outer_elm = document.createElement('span');

                    if(document.querySelector('._sub_selist_outer')) {
                        _sub_selist_outer_elm  = document.querySelector('._sub_selist_outer');
                        _sub_selist_outer_elm.classList.remove('_d_hidden');
                    } else {
                        var _sub_selist_outer_elm = document.createElement('span');
                        _sub_selist_outer_elm.classList.add('_sub_selist_outer');
                        _sub_selist_outer_elm.classList.add('_sub_selist_seouter');
                        _sub_selist_outer_elm.innerHTML = _sub_selist_ul_elm.outerHTML;

                        document.body.appendChild(_sub_selist_outer_elm);

                        
                        getChromeStorage("cdtx_caseidcurrentmeet_pspeakeasy_caseid", (response) => {
                            var _list_rs = response.value || [];
                            console.log('cdtx debug - window - cdtx_caseidcurrentmeet_pspeakeasy_caseid ', _list_rs);

                            var _rsstr = 'rs: \n';
                            _rsstr += '<div data-seid="P123123123123" >P123123123 - <small>202123123 - 12:12</small></div>';
                            _rsstr += '<div data-seid="P222222" >P222222 - <small>202223123 - 12:12</small></div>';
                            _list_rs.forEach((item) => {
                                if(item.caseid === window.dataCase.case_id) {
                                    _rsstr += `<div data-seid="${item.id}" >${item.id} - <small style="color: #777777">${item.date} - ${item.time}</small></div>`;
                                }
                            })
                            
                            _sub_selist_outer_elm.querySelector('[data-listse]').insertAdjacentHTML('beforeEnd', _rsstr);

                            
                            _sub_selist_outer_elm.querySelectorAll('[data-seid]').forEach((_sub_selist_ul_itemli) => {
                                _sub_selist_ul_itemli.addEventListener('click', (e) => {
                                    try {
                                        _sub_selist_outer_elm.querySelector('._sub_selist_ul_list').insertAdjacentHTML('beforeEnd', `<li><a href="https://contactcenter.corp.google.com/quality/player/?recording_id=${_sub_selist_ul_itemli.getAttribute('data-seid')}" target="_blank">${_sub_selist_ul_itemli.getAttribute('data-seid')}</a>&nbsp;&nbsp;</li>`)
                                        if(_sub_selist_outer_elm.querySelector('._sub_selist_ul_list ._d_hidden')) {
                                            _sub_selist_outer_elm.querySelector('._sub_selist_ul_list ._d_hidden').remove();
                                        }
                                        _sub_selist_outer_elm.classList.add('readyinsert')
                                    } catch (error) {
                                        console.error('ERROR choice_selist', error)
                                    }
                                })
                            });
                        });
                    }
                    


                    _sub_selist_outer_elm.querySelector('._sub_selist_seouter--clickadd').addEventListener('click', (e) => {
                        try {
                            var _this = null;
                            if(_this = elm.closest(".cdtx__uioncall-item").querySelector('._sub_selist_ul_list')) {
                                _this.innerHTML = _sub_selist_outer_elm.querySelector('[data-list] ul').innerHTML;
                            } else {
                                elm.closest(".cdtx__uioncall-item").insertAdjacentHTML('beforeEnd', _sub_selist_outer_elm.querySelector('[data-list]').innerHTML);
                            }
                            
                            _sub_selist_outer_elm.classList.add('_d_hidden');
                        } catch (error) {
                            console.error('ERROR choice_selist', error)
                        }
                    })




                        
                        // Closest by outsite
                        _sub_selist_outer_elm.addEventListener('click', function(e) {
                            if(e.target.classList.contains('_sub_selist_outer')) {
                                _sub_selist_outer_elm.classList.add('_d_hidden');
                            }

                        })


                }

                if(_action === 'choice_status_list') {
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
                            
                        // overwrite
                        if(sheetdata = getSheetByTabName('Status Note Hotkey')) {
                            _lst = '';
                            sheetdata.forEach((item) => {
                                _lst += `<span class="_sub_i_li" data-key="${item.TitleSubnote}" style="background-color: ${item.ColorSubnote}" ></span>`;
                            })
                        }
                        
                        
                        var _position_screen = elm.getBoundingClientRect();
                        
                        var _sub_i_ul_elm = document.createElement('span');

                        _sub_i_ul_elm.classList.add('_sub_i_ul');
                        _sub_i_ul_elm.innerHTML = _lst;
                        _sub_i_ul_elm.style.left = (_position_screen.left + (elm.offsetWidth || 0) + 10) + "px";
                        _sub_i_ul_elm.style.top = _position_screen.top + "px";
                        _sub_i_ul_elm.style.position = 'fixed';
                        
                        // Create outer
                    var _sub_i_outer_elm = document.createElement('span');
                    if(document.querySelector('._sub_i_outer')) {
                        _sub_i_outer_elm  = document.querySelector('._sub_i_outer');
                        _sub_i_outer_elm.innerHTML = _sub_i_ul_elm.outerHTML;
                        _sub_i_outer_elm.classList.remove('_d_hidden');
                    } else {

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
                                _reupdate_outer();
                            })
                        });
                    }

                    // Closest by outsite
                    _sub_i_outer_elm.addEventListener('click', function(e) {
                        if(e.target.classList.contains('_sub_i_outer')) {
                            _sub_i_outer_elm.remove();
                        }
                    })
                    
                    
                }

                // xxxx
                if(_action === 'qplus-rescan') {
                    if(location.hostname === 'gauge.corp.google.com') {
                        location.href = "https://gauge.corp.google.com?apiconnect=AIzaSyCPDi7thwGXTtdTmxmU9RW-7qVPRD2ZvIM";
                    }

                    if(location.hostname === 'calendar.google.com') {
                        window.open("https://gauge.corp.google.com?apiconnect=AIzaSyCPDi7thwGXTtdTmxmU9RW-7qVPRD2ZvIM");
                    }

                }


                // xxxx
                // if(_action === 'add_shortlink_v2') {
                //     var _url = prompt("Enter URL:", "");
                //     if(_url) {
                //         var _name = prompt("Enter name:", "");
                //         _name = _name || _url;
                //         if(_name) {
                //             var _caseid = __case_id();
                //             var update_action = (_caseid, _value, _callback) => {
                //                 var _key = 'cdtx_tool_shortlink_v2';
                //                 getChromeStorage(_key, (response) => {
                //                     var datalist = response.value || {};
                                    
                //                     var temp = {
                //                         name: _name,
                //                         url: _url,
                //                     };
                //                     // Add
                //                     if(datalist[_caseid]) {
                //                         datalist[_caseid].push(temp);
                //                     } else {
                //                         datalist[_caseid] = [temp];
                //                     }
                                    
                //                     // Save
                //                     setChromeStorage(_key, datalist, (response2) => {
                //                         _callback(response2);
                //                     });
                //                 })
                //                 return false;
                //             };
                            
                //             update_action(_caseid, _url, (rs) => {
                //                 cLog(() => {
                //                     console.log("cdtx update_tool_shortlink_v2", rs);
                //                     ___casecalendar_elm().querySelector('[data-btnclk="_connectcase_info-act_refresh"]').click();
                //                 });
                //             });
                //         }
                //     }
                // }
                
                
                // xxxx
                if(_action === '_connectcase_info-act_recrawl') {

                    // checkLdap
                    if(!checkLdapAssignee()) {
                        Toastify({
                            text: `This case not assign to you!!!`,
                            class: "warning",
                            duration: 3000,
                            callback: function(){
                                this.remove();
                            }
                        }).showToast();

                        return false;
                    }

                    window.casetype_lt = false;
                    if(_strcaseid = __case_id()) {
                        clearInterval(window.__nMyTime);
                        
                        // Confirm
                        if(window.dataCase.case_id == __case_id()) {
                            if(!window.confirm("Is recrawl, Are you sure?")) return false;
                        }
                        
                        
                        // action
                        elm.classList.remove('isnew');
                        document.querySelector('._casecalendar_info').remove();
                        
                        // 1. Xoa
                        // 2. Nap lai
                        var _caseid = 'cdtx_caseid_' + _strcaseid;
                        removeChromeStorage(_caseid, () => {
                            Toastify({
                                text: `Remove ${_caseid} success!!!`,
                                duration: 3000,
                                callback: function(){
                                    this.remove();
                                }
                            }).showToast();
                            
                            
                            
                            saveCaseNow(_strcaseid, (caseload) => {
                                if(typeof caseload == 'undefined') return false;
                                
                                cLog(() => { console.log('cdtx - TH 2 here - saveCaseNow - DONE', caseload) });
                                window.caseCurrent = {};
                                window.caseCurrent = caseload;
        
                                reupdateForAll(caseload);
                                
                                global_checkAddLoadMoreInfo(_strcaseid);
                                
                                checkInputEmailInboxAndFix();
                                
                                document.querySelector('._casecalendar_info').remove();    
                            });
                        });   
                    }
                }
                // xxxx
                if(_action === '_connectcase_info-act_refresh') {
                    // window.casetype_lt = false;
                    // if(_strcaseid = __case_id()) {
                        
                    //     document.querySelector('._casecalendar_info').remove();
                        
                    //     // 1. Xoa
                    //     // 2. Nap lai
                    //     var _caseid = 'cdtx_caseid_' + _strcaseid;
                    //     removeChromeStorage(_caseid, () => {
                    //         Toastify({
                    //             text: `Remove ${_caseid} success!!!`,
                    //             duration: 3000,
                    //             callback: function(){
                    //                 this.remove();
                    //             }
                    //         }).showToast();
                            
                            
                            
                    //         saveCaseNow(_strcaseid, (caseload) => {
                    //             if(typeof caseload == 'undefined') return false;
                                
                    //             cLog(() => { console.log('cdtx - TH 2 here - saveCaseNow - DONE', caseload) });
                    //             window.caseCurrent = {};
                    //             window.caseCurrent = caseload;
        
                    //             reupdateForAll(caseload);
                                
                    //             global_checkAddLoadMoreInfo(_strcaseid);
                                
                    //             checkInputEmailInboxAndFix();
                                
                    //             document.querySelector('._casecalendar_info').remove();    
                    //         });
                    //     });
                    // }
                    loadCaseStorageByID(__case_id(), (response) => {
                        var caseload = response.value || false;
                        
                        if(caseload) {
                            window.dataCase = caseload;
                        }
                        document.querySelector('._casecalendar_info').remove(); 
                    });
                    
                }

                // xxxx
                if(_action === 'ui-qplus-addtrviewall') {
                    var _alla_tagviewdetail = elm.closest('table').querySelectorAll('[data-btnclk="ui-qplus-addtrviewdetail"]');
                    _alla_tagviewdetail.forEach((elm) => {
                        elm.click();
                    })
                }
                
                
                // xxxx
                if(_action === 'ui-qplus-addtrdelete') {
                    // if(window.confirm("Your sure del this?")) {
                        var _idcase = elm.getAttribute('data-caseidhere');
                        getChromeStorage("cdtx_qlus_detail_list_case", (response) => {
                            var _lst_case = response.value;
                            
                            cLog(() => { console.log(_lst_case.length); });
                            var filteredArray = _lst_case.filter(e => e.item.caseID !== _idcase)
                            cLog(() => { console.log(filteredArray.length); });
                            
                            setChromeStorage("cdtx_qlus_detail_list_case", filteredArray, (response) => {
                                elm.closest('tr').remove();
                            });    
                            
                            setChromeStorage("cdtx_qlus_detail_list_case_lastupdate", new Date(), (response) => {
    
                            })
                            
                        });
                    // }
                }
                
                
                
                // xxxx
                if(_action === 'ui-qplus-addtrviewdetail') {
                    var _foneme = () => {
                        var tr = elm.closest('tr');
                        var td = tr.querySelectorAll('td');

                        var iscreate = false;
                        if(tr.nextElementSibling) {
                            // console.log(tr.nextElementSibling)
                            // console.log(tr.nextElementSibling.getAttribute('data-detailcase'))
                            if(!tr.nextElementSibling.getAttribute('data-detailcase')) {
                                iscreate = true;
                            }
                        } else {
                            iscreate = true;
                        }

                        if(iscreate === false) {
                            if(tr.nextElementSibling) {
                                tr.nextElementSibling.classList.toggle("close"); 
                            }
                        }

                        if(iscreate === true) {
                            var _caseid = elm.getAttribute('data-caseidhere');
                            loadCaseStorageByID(_caseid, (response) => {
                                if(!response.value) return false;
                                var _data = response.value;
                                
                                if(_data.case_id) {
    
                                    var html = `<tr data-detailcase="1">
                                        <td colspan="${td.length}">
                                        
                                        <div class="_casecalendar_info" >
                                            <div class="_casecalendar_info--notification" ></div>
                                            <div class="_casecalendar_info--consentrecord" >Please Hit SpeakEasy Record Button</div>
                                            <div class="_casecalendar_info--inner"  data-isgcc="{%is_gcc%}" data-isexternal="{%is_external%}" data-issilver="{%customer_program%}" >
                                                <span class="_casecalendar_info-50per" data-title="Case ID:" >
                                                    <a href="https://cases.connect.corp.google.com/#/case/${_caseid}" ${location.hostname != 'cases.connect.corp.google.com' ? ` target="_blank" ` : ''} >${_caseid}</a>
                                                    <span class="copycaseid" data-btnclk="copy_attrcopycontent" data-copycontent="${_caseid}" ></span>
                                                </span>
                                            </div>
                                        </div>
                                        </td>
                                    </tr>`;
    
                                    tr.insertAdjacentHTML('afterEnd', html);

                                    
                                    templateDisplay(tr.nextElementSibling, _data);
                                }
                            });
                        }

                    }
                    
                    _foneme();
                }

                // xxxx
                if(_action === 'copy_textattr_and_dial') {
                    if(elm.getAttribute('data-text')) {
                        copyTextToClipboard(elm.getAttribute('data-text'));
                        // setChromeStorage('');
                    }
                }

                // xxxx
                if(_action === 'xxxx') {
                }

            } catch (error) {
                cLog(() => console.error('onClickElm(\'[data-btnclk] ERROR', error) );
                    
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
    

    // Update field 
    function updateAllFieldsCase2Storage(_temp, _caseid , _callback) {
        // ID trust
        
        loadCaseStorageByID(_caseid, (response) => {
            cLog(() => { console.log('__DONG v4' , response.value); })
            var caseload = response.value || {};
             
            // ====== BEGIN
            _temp.case_id = _caseid;
            
            Object.assign(caseload, _temp);
            cLog(() => { console.log('__DONG v4 1' , caseload); })


            // ====== END -> SAVE
            saveCase2Storage(caseload, _callback);
        })
    }

    function checkSpeakEasy(_data) {
        // if(_data)

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
    
    function updateAllFieldsSetting2Storage(_temp , _callback) {
        // ID trust
        getChromeStorage('cdtx_settings', (response) => {
            var _datatemp = response.value || {};
            // window.dataTagTeamSettings = response.value || false;
            Object.assign(_datatemp, _temp);
            setChromeStorage('cdtx_settings', _datatemp, _callback);
        });
           
    }

    function autoUpdatelistLinkCalendar(is_auto = false) {
        if(location.hostname !== 'calendar.google.com') return;


        try {
            
            var update_via_click = () => {
                onClickElm('.w1OTme[href*="//meet.google.com/"]', 'click', (e) => {
                    var _elm = e.target;
                    var _parent = _elm.closest('#yDmH0d');
                    var _url = new URL(_elm.getAttribute('href'));
                    
                    if(caseidelm= _parent.querySelector('[data-infocase="case_id"][data-infocase_value]')) {
                        var _caseid = caseidelm.getAttribute('data-infocase_value');
                        
                        loadCaseStorageByID(_caseid, (response) => {
                            var caseload = response.value || {};
                            if(caseload.case_id) {
                                caseload.customer_gmeet = _url.origin + _url.pathname;
                                 // ====== END -> SAVE
                                // saveCase2Storage(caseload, _callback);
                                saveCase2Storage(caseload, (response) => {
                                    toastify_act("have update GMeet to case")
                                });
                             }
                
                            
                        });
                    }
                });
            };
            
            
            var is_updatelist_link = () => {
                // getChromeStorage("cdtx_listmeetlink", (response) => {
                //     var casesmeet = response.value || {};
                //     document.querySelectorAll('[jslog][data-eventid]').forEach(function(elm){
                //         var jslog = elm.getAttribute('jslog');
                //         var caseid = elm.innerText.match(/\d-\d+/g);
                //         if(jslog){
                //             var meetid = jslog.match(/\w{3}-\w{4}-\w{3}/g);
                //         }

                //         if(caseid && meetid){
                //             casesmeet[caseid[0]] = "https://meet.google.com/" + meetid[0]
                //         }
                //     });
                    
                //     window.dataMeetLink = casesmeet;
                //     setChromeStorage("cdtx_listmeetlink", casesmeet, () => {
                //         cLog(() => { console.log("Has update meet link!"); });
                //     });
                // });

                
                // getChromeStorage("cdtx_listmeetlink_all", (response) => {
                    
                //     var casesmeet = response.value || {};
                //     document.querySelectorAll('[jslog][data-eventid]').forEach(function(elm){
                //         var jslog = elm.getAttribute('jslog');
                //         var caseid = elm.innerText.match(/\d-\d+/g);
                //         if(jslog){
                //             var meetid = jslog.match(/\w{3}-\w{4}-\w{3}/g);
                //         }

                //         if(caseid && meetid){
                //             casesmeet[meetid[0]] = caseid[0];
                //             // var _temp = {
                //             //     meetid: meetid[0],
                //             //     caseid: caseid[0]
                //             // };
                            
                //             // var _issave = true;
                //             // casesmeet.forEach(function(item) {
                //             //     if(item.meetid == _temp.meetid) {
                //             //         _issave = false;
                //             //     }
                //             // })

                //             // if(_issave) {
                //             //     casesmeet.push(_temp);
                //             // }
                //         }

                //     }); 
                //     // end loop
                    
                    
                //     setChromeStorage("cdtx_listmeetlink_all", casesmeet, () => {
                        
                //         cLog(() => { console.log("Has update meet all link!", casesmeet); });
                //     });
                // });
                
                // Click to save meetlink to case
                
            }
            

            update_via_click();
            
            
            is_updatelist_link();
            // reUpdate 10mins
            if(is_auto) {
                setInterval(() => {
                    is_updatelist_link();
                }, 1000 * 60 * 10);
            }
                
        } catch (error) {
            console.error('ERROR autoUpdatelistLinkCalendar', error)
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


                var _task_get = window.dataCase['tasks'] || '';
                _task_get = _task_get.toLocaleLowerCase();
                if(!(
                    window.dataCase['is_ads_enhanced_conversions'] 
                    || _task_get.includes('ads enhanced conversions') 
                    || window.dataCase['is_external']
                    )
                ) return false;


                var casemessageview_elm_all = document.querySelectorAll(".case-log-container.active-case-log-container case-message-view");
                

                if(casemessageview_elm_all.length > 0) {
                    casemessageview_elm_all.forEach(function(elm){
                        // Tối thiểu
                        if(elm.innerText.includes("DOCUMENT precall")) {
                            is_precall = true;
                        }
                        
                        if(elm.innerText.includes("Emails or feed")) {
                            is_precall = true;
                        }
                    });
        
                    // If false
                    if(is_precall == false) {
                        var _istopelm = document.querySelector(`.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"])`);
                        if(_istopelm) {
                            var _elm_note_add_precall = () => { return document.querySelector('._note_add_precall[data-caseid="' + __case_id() + '"]'); };
                            
                            window.case_haveprecallskip = localStorage.getItem('case_haveprecallskip') || '';
                            
                            if(!_elm_note_add_precall()) {
                                
                                if(!window.case_haveprecallskip.includes(__case_id())) {
                                    _istopelm.insertAdjacentHTML("beforeBegin", `<span data-caseid="${__case_id()}" class="_note_add_precall"  title="Memo" >
                                    <style>
                                    ._note_add_precall-addprecall {
                                        background: red;    padding: 7px; color: #fff; border-radius: 0 5px 5px 0; cursor: pointer; display: inline-block;
                                    }
                                    ._note_add_precall-closepopup {
                                        display: inline; position: absolute; top: 106%; background: #000; padding: 3px 8px; color: #fff; left: 0; cursor: pointer;
                                    }
        
                                    </style>
                                    <span class="_note_add_precall-addprecall">Click add precall</span>
                                    <span class="_note_add_precall-closepopup" >Skip</span>  
                                    </span>`);
                                    
                                    
                                    _elm_note_add_precall().querySelector('._note_add_precall-closepopup').addEventListener('click', function(ev){
                                        localStorage.setItem('case_haveprecallskip', window.case_haveprecallskip + '||' + __case_id());
                                        _elm_note_add_precall().remove();
                                    });
                                    
                                    _elm_note_add_precall().querySelector('._note_add_precall-addprecall').addEventListener('click', function(ev){
                                        var this_elm  = ev.target;
                                        
                                        sAddPrecallNote();
                    
                                        this_elm.closest('._note_add_precall').remove();
                                    });    
                                }
                                
                                
                            }
                            
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
            
            getChromeStorage("cdtx_listmeetlink", (response) => {
                var casesmeet = response.value || {};

                window.dataMeetLink = casesmeet;

                
                cLog(() => { 
                    console.log('cdtx ', window.dataMeetLink);    
                })
            });

            // without unmark
            global_crawl_major(_caseid, (data_rs) => {
                cLog(() => { console.log('cdtx - saveCaseNow global_crawl_major' , window.dataCase, data_rs); });
                
                // Only reupdate if don't have data below
                if(window.n_start === 0) {
                    window.dataCase = data_rs;
                    reupdateForAll(data_rs);
                }
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
        
        
        // IF isset email AM / Adv put to head case
            // cLog(() => { console.log('cdtx take case 0'); })
            // var _i = 0;
            // if (emailinput = document.querySelector('account-field input')) {
            //     if (emailinput.value.includes('@')) {
            //         cLog(() => { console.log('cdtx take case 1' ); })
            //         _i = _i + 1;
            //     }
            // } else {
            //     if (emailinput = document.querySelector('account-field')) {
            //         if (emailinput.innerText.includes('@')) {
            //             cLog(() => { console.log('cdtx take case 2'); })
            //             _i = _i + 1;
            //         }
            //     }
            // }
            
            // if(_i === 0) {
            //     return false;
            // }
        
        
        
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
                            
                            global_crawl_major(_caseid, (data_rs) => {
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
                                    window.hasnew_data = "yes";
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
                    if( window.dataMeetLink[_caseid] ) {
                        caseload.customer_gmeet = window.dataMeetLink[_caseid];

                        cLog(() => { console.log("dataMeetLink", window.dataMeetLink[_caseid], Object.keys(window.dataMeetLink).length,  window.dataMeetLink, caseload); });

                        if(Object.keys(window.dataMeetLink).length) {
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



    var templateDisplay = (_panel, _data) => {
        try {
            var _iload = 0, _iload_done = 0;
            var _checkload = (_iload_done) => {
                if(_iload == _iload_done) {
                    _panel.classList.add('childload_done');
                    window.htmlPanelTemp = _panel.innerHTML;
                }
            }
            var __tasks = _data.tasks || '';
            var _contenthtml = `
                <span class="_casecalendar_info-50per" data-title="Case ID:"  data-info="case_id" >
                    <a href="https://cases.connect.corp.google.com/#/case/{%case_id%}" ${location.hostname != 'cases.connect.corp.google.com' ? ` target="_blank" ` : ''} data-infocase="case_id" ></a><span class="copycaseid" data-btnclk="copy_attrcopycontent" data-copycontent="${_data.case_id}" ></span>
                </span>
                
                <span class="_casecalendar_info-50per _casecalendar_info-infoadsid" data-title="Ads ID & Adv name:" >
                    <span data-customer_adsid="${_data.customer_adsid || ''}">
                        <span style="font-size: 70%">Ads ID:</span> <a href="#" target="_blank" data-infocase="customer_adsid_format" data-infocase_link="customer_adsid_format" ></a>
                        <span class="copycaseid" data-btnclk="copy_attrcopycontent" data-copycontent="${_data.customer_adsid}" ></span>
                    </span>
                    <span data-customer_ocid="${_data.customer_ocid || ''}">
                        <span style="font-size: 70%">OCID:</span> <a href="#" target="_blank" data-infocase="customer_ocid" data-infocase_link="customer_ocid" ></a>
                        <span class="copycaseid" data-btnclk="copy_attrcopycontent" data-copycontent="${_data.customer_ocid || ''}" ></span>
                        <a href="https://dashboards.corp.google.com/view/_0ded1099_6ef3_4bc9_bba0_2445840d1b69?f=customer_id:in:${_data.customer_ocid}" target="_blank" class="_casecalendar_info--dashboardec" ></a>
                    </span>

                    <span data-infocase="customer_name" ></span>
                    <span data-infocase="customer_email" class="is_hascopyer" data-btnclk="copy_innertext" ></span>
                </span>
                
                
                <span class="_casecalendar_info-50per" >
                    <span class="is_hascopyer in_block" data-title="Phone (click to copy): " data-infocase="customer_contact" data-btnclk="copy_innertext" ></span>
                    <br>
                    <span class="in_block" data-title="Meet link:">
                        <span data-infocase="customer_gmeet" class="_casecalendar_info--meetlink" data-btnclk="_clickshow" ></span>
                    </span>
                </span>
                <span class="_casecalendar_info-50per" data-title="Website:" data-select ><span data-infocase_listlink="customer_website" ></span></span>
                <span class="_casecalendar_info-50per" data-title="Request:" >
                    <span data-infocase="request_category"></span>
                    <span data-infocase="conversion_category"></span>
                    <span data-infocase="case_summary"></span>
                    <span data-infocase="request"></span>
                    
                </span>
                <span class="_casecalendar_info-50per" data-title="AM:" data-am="{%team%} {%sales_program%}" >
                    <span data-infocase="am_name"></span>
                    <span class="is_hascopyer" data-infocase="am_email" data-btnclk="copy_innertext"></span>
                    <span data-infocase="team"></span>
                    <span data-infocase="sales_program"></span>
                </span>
                <span class="_casecalendar_info-50per">
                    <span data-title="Tasks:" data-infocase="tasks" ></span>
                    <span class="copycaseid" data-btnclk="copy_attrcopycontent" data-copycontent="${_data.tasks || ''}" ></span>
                    
                    ${
                    __tasks.includes("Enhanced Conversions") ? `
                            <span class="remind_1stmail_prenote_ec" >
                            ${!_data.isremind_1stmail_ec ? `<span data-btnclk="remind_1st_email_ec" data-forcaseid="${_data.case_id}" >1st mail EC</span>` : ''}
                            ${!_data.isremind_precall_ec ? `<span data-btnclk="remind_add_precall_note" data-forcaseid="${_data.case_id}" >Precall</span></span>`: ''}
                            </span>
                        ` : '' 
                    }
                    
                </span>
                <span class="_casecalendar_info-50per" data-title="Attribution Model:" data-infocase="customer_attributionmodel" ></span>
                
                <span class="_casecalendar_info-50per" data-title="Qplus status:"  >
                    <span data-infocase="qplus_status" ></span>
                </span>

                
                
                <span class="_casecalendar_info-100per _casecalendar_info-uidatefl_install" >
                    <div class="_1">
                        <span data-title="Date Install:" 
                            data-infocase="appointment_time" 
                            data-btnclk="oncall_templ_act_flchoice" 
                            data-dateformat="d/m/Y" 
                            data-text="oncall_templ_act_flchoice-text" 
                            data-anytime="true" 
                            data-type="update_infocase" 
                            data-case="${_data.case_id}" 
                            data-valchoice="${_data.appointment_time || ''}"
                        ></span>

                        
                        <span class="copycaseid" data-btnclk="copy_attrcopycontent" data-copycontent="${_data.appointment_time || ''}" ></span>

                    </div>
                    <div class="_2">
                        <span data-title="Date Follow up:" 
                            data-infocase="follow_up_time" 
                            data-btnclk="oncall_templ_act_flchoice" 
                            data-dateformat="d/m/Y" 
                            data-text="oncall_templ_act_flchoice-text" 
                            data-type="update_infocase" 
                            data-case="${_data.case_id}" 
                            data-valchoice="${_data.follow_up_time || ''}"
                        ></span>
                        
                        <span class="copycaseid" data-btnclk="copy_attrcopycontent" data-copycontent="${_data.follow_up_time || ''}" ></span>

                        <span class="_btn_stall" data-btnclk="_connectcase_info-act_push2summary" title="update to case summary">Push</span>
                    </div>
                </span>
                <span class="_casecalendar_info-100per" data-title="Quicklink:" data-area="btn-shortcutcase" >
                    <span data-infocase_html="toolshortlink" ></span>
                </span>
                <span class="_casecalendar_info-100per" data-title="Note:" data-notearea="1">
                    <span data-btnclk="note_edit"></span>
                    <span data-infocase="note" data-caseidhere="{%case_id%}" ></span>
                </span>
            `;
    
    
            _contenthtml = _TrustScript(_contenthtml);
            _panel.querySelector('._casecalendar_info--inner').innerHTML = _contenthtml;
    
            replaceAllHtmlElement(_panel, _data);
            // Internal
            
            if(_data.customer_adsid) {
                var _value_tmp = _data.customer_adsid;
                _value_tmp = reformatAdsId(_value_tmp);
                replaceKeyHTMLByCaseID(_panel, 'customer_adsid', _value_tmp, _data);
            }
            
            var _data_restructor = case_restructor(_data.case_id, _data.data_all);
            // _data = mergeObjectNotOverwrite(_data, _data_restructor);
    

            
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
                    _datatmp.customer_website = (_data.customer_website ? _data.customer_website.replace(/\s+|\n/gm, "") : "");
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
                    if (key === 'am_isgcc_external') continue;
                    if (key === 'is_external') continue;
                    if (key === 'am_name_info') continue;
                    
                    _value_tmp = value;
                    _htmltemp = `<span class="_casecalendar_info-50per" data-title="${key.replaceAll('_', ' ')}: " data-infocase="${key}" ></span>`;
                    
                    if(key === 'customer_website') {
                        _htmltemp = `<span class="_casecalendar_info-50per" data-title="Website:" >
                            <a href="#" target="_blank" data-infocase_link="customer_website" data-infocase="customer_website" ></a>
                        </span>`;
                    }
                    
                    var _isset_adsid = false;
                    if(key === 'customer_adsid') {
                        _isset_adsid = true;
                        _htmltemp = `<span class="_casecalendar_info-50per" data-title="Ads ID:" >
                            <a href="https://adwords.corp.google.com/aw/go?external_cid=${_datatmp.customer_adsid}" target="_blank" data-infocase="customer_adsid_format" ></a>
                        </span>`;
                        
                        if(_datatmp.customer_ocid) {
                            if(_datatmp.customer_ocid.trim()) {
                                _htmltemp = `<span class="_casecalendar_info-50per" data-title="Ads ID:" >
                                    <a href="https://adwords.corp.google.com/aw/conversions?ocid=${_data.customer_ocid}" target="_blank" data-infocase="customer_adsid_format" ></a>
                                </span>`;
                            }
                        }
                    }
                    
                    
                    if(key === 'customer_ocid') {
                        if(_isset_adsid === false) {
                            _htmltemp = `<span class="_casecalendar_info-50per" data-title="OCID ID:" >
                                <a href="https://adwords.corp.google.com/aw/conversions?ocid=${_data.customer_ocid}" target="_blank" data-infocase="customer_ocid" ></a>
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
                        <a href="https://cases.connect.corp.google.com/#/case/{%case_id%}" ${location.hostname != 'cases.connect.corp.google.com' ? ` target="_blank" ` : ''} data-infocase="case_id" ></a><span class="copycaseid" data-btnclk="copy_attrcopycontent" data-copycontent="${_data.case_id}" ></span>
                        </span>
                        `;
                    }
                    
                    _ehtml += _htmltemp;
                }

                if(_data.data_all['Additional info']) {
                    _ehtml += '<span class="_casecalendar_info-100per" data-title="Additional info:" >' + _data.data_all['Additional info'] + '</span>';
                }
                
                _ehtml += `<span class="_casecalendar_info-100per" ><span class="_casecalendar_info-100per _casecalendar_info-uidatefl_install" >
                                    <div class="_1">
                                        <span data-title="Date Install:" 
                                            data-infocase="appointment_time" 
                                            data-btnclk="oncall_templ_act_flchoice" 
                                            data-dateformat="d/m/Y" 
                                            data-text="oncall_templ_act_flchoice-text" 
                                            data-anytime="true" 
                                            data-type="update_infocase" 
                                            data-case="${_data.case_id}" 
                                            data-valchoice="${_data.appointment_time || ''}"
                                        ></span>
                                        <span class="copycaseid" data-btnclk="copy_attrcopycontent" data-copycontent="${_data.appointment_time || ''}" ></span>
                                    </div>
                                    <div class="_2">
                                        <span data-title="Date Follow up:" 
                                            data-infocase="follow_up_time" 
                                            data-btnclk="oncall_templ_act_flchoice" 
                                            data-dateformat="d/m/Y" 
                                            data-text="oncall_templ_act_flchoice-text" 
                                            data-type="update_infocase" 
                                            data-case="${_data.case_id}" 
                                            data-valchoice="${_data.follow_up_time || ''}"
                                        ></span>
                                        
                                        
                                        <span class="copycaseid" data-btnclk="copy_attrcopycontent" data-copycontent="${_data.follow_up_time || ''}" ></span>
                                        
                                        <span class="_btn_stall" data-btnclk="_connectcase_info-act_push2summary" title="update to case summary">Push</span>
                                    </div>
                                </span>
                            </span>`;
                            
                _ehtml += '<span class="_casecalendar_info-100per" data-title="Qplus Status:" data-infocase="qplus_status" ></span>';
                _ehtml += '<span class="_casecalendar_info-100per" data-title="Quicklink:" data-infocase_html="toolshortlink" ></span>';
                _ehtml += `<span class="_casecalendar_info-100per" data-title="Note:" data-notearea="1">
                                <span data-btnclk="note_edit"></span>
                                <span data-infocase="note" data-caseidhere="{%case_id%}" ></span>
                            </span>`;
    
                _panel.querySelector('._casecalendar_info--inner').innerHTML = '';
                _ehtml = _TrustScript(_ehtml);
                _panel.querySelector('._casecalendar_info--inner').innerHTML = _ehtml;
    
                
                // 3. OTHER INFO
                for (const [key, value] of Object.entries(_data)) {
                    _value_tmp = value;
                    
                    replaceKeyHTMLByCaseID(_panel, key, _value_tmp, _data);
                }
            }
            // END EXTERNAL
    
    
    
    
            // IS GCC NOTIFCATION
            if(_data.is_gcc) {
                _panel.querySelector('._casecalendar_info--notification').insertAdjacentHTML('afterBegin', '<span>AM is GCC!!!</span>');
            }
            
            
            if(_data.is_external) {
                _panel.querySelector('._casecalendar_info--notification').insertAdjacentHTML('afterBegin', '<span>Case EXTERNAL!!!</span>');
            }
            
            if(_data.is_caselt) {
                _panel.querySelector('._casecalendar_info--notification').insertAdjacentHTML('afterBegin', '<span style="background-color: #009688">Case Live Transfer!!!</span>');
            }

            

            
            if(_data.customer_program) {
                if(_data.customer_program.toLowerCase().trim().includes('gold')) {
                    _panel.querySelector('._casecalendar_info--notification').insertAdjacentHTML('afterBegin', '<span class="__gold" >Adv Gold!!!</span>');
                }
                
                if(_data.customer_program.toLowerCase().trim().includes('silver')) {
                    _panel.querySelector('._casecalendar_info--notification').insertAdjacentHTML('afterBegin', '<span class="__silver" >Adv Silver!!!</span>');
                }
                
                if(_data.customer_program.toLowerCase().trim().includes('platium')) {
                    _panel.querySelector('._casecalendar_info--notification').insertAdjacentHTML('afterBegin', '<span class="__platium" >Adv Platium!!!</span>');
                }
            }
    
            
            // DISPLAY NOTED by Case ID
            _iload++;
            getNoteCase(_data.case_id, (data) => {
                if(data) {
                    replaceKeyHTMLByCaseID(_panel, 'note', data);
                }
                
                _iload_done++;
                _checkload(_iload_done);
            });
    
            
            // DISPLAY ToolShortlink by Case ID
            _iload++;
            getToolShortlink(_data.case_id, (data) => {
                if(data) {
                    replaceKeyHTMLByCaseID(_panel, 'toolshortlink', data);
                }
                
                _iload_done++;
                _checkload(_iload_done);
            });

            // DISPLAY Quick link by Case ID
            _iload++;
            setGetQuickLink(_data.case_id, 'get', (data) => {
                if(data) {
                    var _html = '';
                    var _html_arr = data.split('\n');
                    _html_arr.forEach(item => {
                        if(urlget = item.trim()) {
                            var _name = getNameUrl(urlget);
                            _html += `<span class="cdtx_quicklinkbtn--gr">
                                    <span class="cdtx_quicklinkbtn--remove" data-btnclk="cdtx_quicklinkbtn--remove" >X</span>
                                    <a href="${urlget}" data-keytext="${_name}" data-btntooltip="${urlget}" data-link="${urlget}" target="_blank" class="_btn_stall cdtx_quicklinkbtn">${_name}</a>
                                </span>
                                `;
                        }
                    })
                    replaceKeyHTMLByCaseID(_panel, 'toolquicklink', _html);
                }
                
                _iload_done++;
                _checkload(_iload_done);
            });
            

            // DISPLAY qplus
            var getqplus = () => {
                window.qlus_datalist = window.qlus_datalist || {};
                if(window.qlus_datalist.list_bycaseid) {
                    if(status_here = window.qlus_datalist.list_bycaseid[_data.case_id]) {
                        var _html = `${status_here[0].statusCase} 
                            ${(status_here[0].followUpCase) ? `FL: ${status_here[0].followUpCase} ` : '' }
                            ${formatDate(new Date(status_here[0].dateReview))}
                        `;
                        replaceKeyHTMLByCaseID(_panel, 'qplus_status', _html);
                    }
                }
            }
            getqplus();
            getQlusDetailListCase(() => {
                getqplus();
            });
    
        } catch (error) {
            cLog(() => {
                console.error('error templateDisplay', error);
            })
        }
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

    function loadStyle() {
        if(
            !(
                location.hostname === 'cases.connect.corp.google.com'
                || location.hostname === 'calendar.google.com'
                || location.hostname === 'meet.google.com'
                // || location.hostname === 'barkeep.corp.google.com'
                || location.hostname === 'gauge.corp.google.com'
                )
                ) 
        {
            cLog(() => { console.log('cdtx - could not run other domain'); })
            return false;
        }

        var run_style = () => {
            if(!document.head.querySelector("#cdtx_style")) {
                var link = document.createElement('style');
                link.rel = 'stylesheet';
                link.id = 'cdtx_style';
                // link.href = `https://cdtx.lyl.vn/cdtx-assistant/_Bookmark/assets/css/style.css?t=${new Date().valueOf() }"`;
                
                link.innerHTML = _panel_style;

                document.head.appendChild(link);
            }
        }



        // RUN
        run_style();
        styleAllviaSheet();
        observeOnce((elm) => {
            cLog(() => { console.log('observeOnce - run_style' ) }, 2)

            // Add link style head
            run_style();
            
        });
    }   
    function loadRealtime(_callback) {
    if(
            !(
                location.hostname === 'cases.connect.corp.google.com'
                || location.hostname === 'calendar.google.com'
                || location.hostname === 'meet.google.com'
                || location.hostname === 'barkeep.corp.google.com'
            )
        ) 
        {
            cLog(() => { console.log('cdtx - could not run other domain'); })
            return false;
        }


        var _title_diff = '';
        var _title = '';
        var _caseid_once = '';
        var _caseid_isnew = '';
        var _caseid_once_autoclickcraw = '';
        observeOnce((elm) => {
            cLog(() => { console.log('observeOnce - loadRealtime', location.hostname) }, 2)

            // if(!document.querySelector('#kl_tagteam_inline_style')) {
                
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
                        recheckVersionForResetData();
                        // Check email cc
                        detechAMemailMissing();
                        // Load button
                        addShortCutBtn();
                        // add infocase
                        addInfoCase2CaseConnect(_caseid);
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
                    // Load data case
                    // ========
                        var _btn_recrawl = () => {
                                return document.querySelector('[data-btnid="crawl_case"]');
                        };
                        
                        if(_caseid != _caseid_once) {
                            _caseid_once = _caseid;
                            
                            cLog(() => { console.log('DONG CHECK' , _caseid, _caseid_once); })
                            

                            loadCaseStorageByID(_caseid, (response) => {
                                cLog(() => { console.log('DONG CHECK 2' , response); })
                                var caseload = response.value || false;

                                // Remove class
                                if(_btn_recrawl()) {
                                    _btn_recrawl().classList.remove('isnew')
                                }
                                
                                if(caseload) {
                                    window.dataCase = caseload;
                                } else {
                                    if(_btn_recrawl()) {
                                        _btn_recrawl().classList.add('isnew');
                                        _caseid_isnew = _caseid;
                                    }
                                }
                            });

                        }
                        

                        // Count down auto craw
                        window.__nMyTime = window.__nMyTime || null;
                        if(
                            __case_id() != _caseid_once_autoclickcraw  
                            && __case_id() === _caseid_isnew
                        ) {
                            
                            
                            if(checkLdapAssignee())  {
                                
                                if(isHaveReviewCase()) {
                                if(_btn_recrawl()) {
                                    if(_btn_recrawl().classList.contains('isnew')) {
                                        _caseid_once_autoclickcraw = _caseid_isnew;
                                        
                                        // Once
                                        
                                        cLog(() => { 
                                            console.log("checkLdapAssignee -> Btn isnew class"); 
                                        })
                                        
                                        
                                        var ncountdown = 7;
                                        window.__nMyTime = setInterval(() => {
                                            
                                            _btn_recrawl().setAttribute('data-ncountdow', ncountdown);
                                            
                                            if(__case_id() != _caseid_isnew) {
                                                // console.log('ZZZZZZZ Clear', __case_id(), _caseid_once_autoclickcraw, _caseid, _caseid_isnew);
                                                _caseid_isnew = '';
                                                _caseid_once_autoclickcraw = '';
                                                clearInterval(window.__nMyTime);
                                            }
                                            

                                            ncountdown--;
                                            if(ncountdown < 0) {
                                                clearInterval(window.__nMyTime);
                                                _btn_recrawl().click();
                                            }
                                        }, 1000);        
                                    }
                                        
                                }     
                                }
                                
                                
                            }
                            
                        } 
                    
                    // ========
                    // Save case
                    // ========
                    
                        // // TH 1: caseid diff caseonce    
                        // if(_caseid != _caseid_once) {
                        //     cLog(() => { console.log("cdtx - TH 1 here", window.dataCase.case_id, _caseid); });

                        //     var _panel_closebtn = document.querySelector('._infocase_byme.open [data-btnclk="_infocase_byme-openact"]');
                        //     if(_panel_closebtn) {
                        //         _panel_closebtn.click();
                        //     }
                            
                            
                        //     // addGoCase2Calendar 
                        //     addGoCase2Calendar(_caseid);
                            
                            
                        //     saveCaseNow(_caseid, (caseload) => {
                        //         if(typeof caseload == 'undefined') return false;
                                
                        //         cLog(() => { console.log('cdtx - TH 1 here -  saveCaseNow - DONE', caseload); });
                                
                        //         window.caseCurrent = {};
                        //         window.caseCurrent = caseload;
                                
                        //         reupdateForAll(caseload);
                                
                        //         global_checkAddLoadMoreInfo(_caseid);
                                
                        //         checkInputEmailInboxAndFix();
                                
                                
                                
                        //     });
                        //     _caseid_once = _caseid;
                        // }

                        // // // TH 2: assignee status
                        // // var state_button = document.querySelector('[debug-id="state-button"]');
                        // var state_button = document.querySelector('div.action-buttons');
                        // if(state_button) {
                        //     window.once_state_button = window.once_state_button || state_button.innerText;
                        //     if(window.once_state_button !== state_button.innerText) {
                        //         cLog(() => { console.log("cdtx - TH 2 HERE"); })
                        //         saveCaseNow(_caseid, (caseload) => {
                        //             if(typeof caseload == 'undefined') return false;
                                    
                        //             cLog(() => { console.log('cdtx - TH 2 here - saveCaseNow - DONE', caseload) });
                        //             window.caseCurrent = {};
                        //             window.caseCurrent = caseload;

                        //             reupdateForAll(caseload);
                                    
                                    
                        //             global_checkAddLoadMoreInfo(_caseid);
                                    
                        //             checkInputEmailInboxAndFix();
                                    
                        //         });

                        //         // Overwrite
                        //         window.once_state_button = state_button.innerText;
                        //     }
                        // }


                    

                    // ===========
                    // Load once
                    // ===========
                }



                // callUI
                callPhoneDefaultNumber();
                
                
                // go Case to calendar
                addGoCase2Calendar();
            }


            if(location.hostname === 'calendar.google.com') {
                // For reminder
                cLog(() => { console.log("cdtx calendar.google.com timeleft"); })
                timeLeftGoogleCalendar();
                
                // For case
                var n_button_event = document.querySelectorAll('[jscontroller="ABQtfe"]').length
                window.n_button_event = window.n_button_event || 0;
                if(n_button_event > 0 &&  n_button_event !== window.n_button_event) {
                    window.n_button_event = n_button_event;
                }
                
                var _headelm = document.querySelector('#rAECCd');
                if(_headelm) {
                    window.calendarCaseNow = window.calendarCaseNow || {};
                    var _title = _headelm.innerText;
                    var _caseid = getOnlyCaseId(_title);
                    
                    // has case id and isset area input template
                    if(_caseid && document.querySelector('[jscontroller="dIQ6id"]')) {
                        

                        // Add Apoiment Icon
                        // pPTZAe
                        if(!document.querySelector('.cdtx_opencaseconnect')) {    
                            var _contenthtml = `<span class="cdtx_opencaseconnect" data-btnclk="open_connectappointment" data-text="${_caseid}" ></span> `;
                            _contenthtml = _TrustScript(_contenthtml);
                            document.querySelector('.pPTZAe').insertAdjacentHTML("afterBegin", _contenthtml);
                        }
                        



                        // Insert test
                        if(!_headelm.querySelector('.caseid_ins')) {
                            if(_title.split('').length > 59) {
                                var _contenthtml = `<span class="caseid_ins" >${_caseid}</span> `;
                                _contenthtml = _TrustScript(_contenthtml);
                                _headelm.insertAdjacentHTML("afterBegin", _contenthtml);
                            }
                        }
                        
                        
                        
                        if(!document.querySelector('[jscontroller="dIQ6id"] ._casecalendar_info')) {
                            cLog(() => { console.log("cdtx calendar.google.com 0000"); })
                            window._once_2 = window._once_2 || 0;

                            // Display after Title
                                // Ads ID, Ocid
                                // Customer: Name, phone, website, 
                                // task, Attribution Model,
                                // Request, AM name (Is GCC color red)
                                // Note, 

                            var _elmappend = document.querySelectorAll('[jscontroller="dIQ6id"] .nBzcnc.OcVpRe')[0];
                            window.htmlPanelTemp = window.htmlPanelTemp || '';
                            
                            if(!_elmappend) {
                                return false;
                            }

                            if(window.calendarCaseNowCaseID != _caseid || !document.querySelector('[jscontroller="dIQ6id"][data-once]')) {
                                window.htmlPanelTemp = '';
                                document.querySelector('[jscontroller="dIQ6id"]').setAttribute('data-once', 1);
                            }
                        
                            var _contenthtml = `
                            <div class="_casecalendar_info" >
                                <div class="_casecalendar_info--notification" ></div>
                                <div class="_casecalendar_info--consentrecord" >Please Hit SpeakEasy Record Button</div>
                                <div class="_casecalendar_info--inner"  data-isgcc="{%is_gcc%}" data-isexternal="{%is_external%}" data-issilver="{%customer_program%}" >
                                    <span class="_casecalendar_info-50per" data-title="Case ID:" >
                                        <a href="https://cases.connect.corp.google.com/#/case/${_caseid}" ${location.hostname != 'cases.connect.corp.google.com' ? ` target="_blank" ` : ''} >${_caseid}</a>
                                        <span class="copycaseid" data-btnclk="copy_attrcopycontent" data-copycontent="${_caseid}" ></span>
                                    </span>
                                </div>
                            </div>`;
                        
                            
                            if(window.htmlPanelTemp) {
                                _contenthtml = `
                                    <div class="_casecalendar_info" >
                                        ${window.htmlPanelTemp}
                                    </div>`;
                            }

                            _contenthtml = _TrustScript(_contenthtml);
                            _elmappend.insertAdjacentHTML("afterEnd", _contenthtml);
                            

                            var _panel = () => { return document.querySelector('[jscontroller="dIQ6id"] ._casecalendar_info'); };


                            if(!window.htmlPanelTemp) {
                                
                                if(window._once_2 == 0) {
                                    window._once_2 = 1;
                                    
                                    loadCaseStorageByID(_caseid, (response) => {
                                        window._once_2 = 0;
                                        
                                        if(!response.value) return false;
                                        var _data = response.value;
                                        cLog(() => { console.log("cdtx calendar.google.com ", _data); })
                                        
                                        if(_data.case_id) {
                                            // Display content
                                            window.calendarCaseNowCaseID = _data.case_id;
                                            templateDisplay(_panel(), _data);
                                            window.dataCase = _data;
                                            
                                        }
        
        
                                        // Meet link
                                        var _linkmeet = _data.customer_gmeet || '';
                                        var _parent = _panel().closest('[jscontroller="dIQ6id"]');
                                        if(_parent) {
                                            var _atagmeet = _parent.querySelector('a[href*="https://meet.google.com"]');
                                            if(_atagmeet) {
                                                if(_linkmeet != _atagmeet.getAttribute('href')) {
                                                    _linkmeet = _atagmeet.getAttribute('href');
                                                    _linkmeet = _linkmeet.split('?')[0];
                                                    _data.customer_gmeet = _linkmeet;
        
                                                    
                                                    replaceKeyHTMLByCaseID(_panel(), 'customer_gmeet', _linkmeet, _data);
            
                                                    saveCase2Storage(_data,  (response) => {
                                                        cLog(() => { console.log('cdtx-save case - add link meet', response); })
                                                    });
                                                }
                                            }
                                        }
        
        
        
                                    });   
                                }
                            }

                            // HIDE Description
                            try {
                                var _desc_case = document.querySelector(`[jscontroller="dIQ6id"] #xDetDlgDesc`);
                                if(_desc_case) {
                                    _desc_case.insertAdjacentHTML('beforeBegin', '<span data-btnclk="open_desc_calendar" >Click to Show Description</span>');
                                    _desc_case.style.display = "none";
                                }
                            } catch (error) {
                                console.log("try Hide Description ", error)
                                
                            }
                            

                        }
                    } 
                }
            }
            
            
            
            if(location.hostname === 'barkeep.corp.google.com') {
                quaySoBarkeep('');
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
                            <div class="_casecalendar_info--consentrecord" >Please Hit SpeakEasy Record Button</div>
                            <div class="_casecalendar_info--inner"  data-isgcc="{%is_gcc%}" data-isexternal="{%is_external%}" data-issilver="{%customer_program%}" >
                            </div>
                        </div>`;
    
                        _contenthtml = _TrustScript(_contenthtml);
                        _elmappend.insertAdjacentHTML("afterEnd", _contenthtml);
                        

                        var _panel = document.querySelector('.hWX4r ._casecalendar_info');
                        // getChromeStorage("cdtx_listmeetlink_all", (response) => {
                        //     var casesmeet = response.value || {};
                        // });
                        
                        
                        loadAllCaseID((listcase) => {
                            if(typeof listcase !== 'object') return;
                            
                            listcase.forEach((item) => {
                                if(item.customer_gmeet) {
                                    const linkmeet = location.origin + location.pathname;
                                    
                                    var _meetid_current = linkmeet.match(/\w{3}-\w{4}-\w{3}/g) || [];
                                    var _meetid_case = item.customer_gmeet.match(/\w{3}-\w{4}-\w{3}/g) || [];
                                    
                                    
                                    console.log('check', _meetid_current[0], _meetid_case[0]);
                                    if(_meetid_current[0] == _meetid_case[0]) {
                                        var _caseid = item.case_id;
                                        
                                        _data = item;
                                        
                                        templateDisplay(_panel, _data);

                                        checkSpeakEasy(_data);


                                        window.meetTimeInv = window.meetTimeInv || null;
                                        clearInterval(window.meetTimeInv); 

                                        window.meetTimeInv = setInterval(() => {
                                            var _temp_obj = {
                                                meetid: _meetid_current, 
                                                caseid: _caseid,
                                                datetime: new Date(),
                                            };
                                            setChromeStorage("cdtx_caseidcurrentmeet", _temp_obj, () => {
                                                cLog(() => { console.log('cdtx cdtx_caseidcurrentmeet', _temp_obj); })
                                            });
    
    
                                            _panel.setAttribute('data-consentrecord', 0);
                                            getChromeStorage("cdtx_caseidcurrentmeet_consentyesbutton", (response2) => {
                                                var _data2 = response2.value || null;
                                                if(_data2) {
                                                    _panel.setAttribute('data-consentrecord', 1);
                                                    cLog(() => { console.log('cdtx barkeep load oncall record', _data2); });
                                                }
                                            });
                                        }, 4000)
                                    }
                                }
                            })
                            
                        });
                        //ZZZZZZZZZZZZZZZZ
                    }
                }

                quaySoBarkeep('meet_showdialbutton')

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
    
    



    if(window.isdongtest) {
        backdoor_manage_keystorage();
    }


    function showListFollowUp() {
        if(!(
                window.location.hostname == 'cases.connect.corp.google.com' ||
                window.location.hostname == 'calendar.google.com'
            )
        ) return false
        
        var elm_popup_lstcasefl = () => {return document.querySelector('.li-popup_lstcasefl');};
        
        var data_case = {};
        
        
        var isshowallcase = isshowallcase || false;

        try {
            

            // f diff date number
            var _get_diffday_number = (str_date) => {
                if(!str_date) return -1;

                const date1 = new Date(str_date);
                const date2 = new Date();
                const diffTime = Math.abs(date2 - date1);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                var _str = 'today';
                if(diffDays > 0) {
                    _str = parseInt(diffDays);
                    if(date2 > date1) {
                        _str = parseInt('-' + diffDays);
                    }
                }

                if(formatDate(date1, 'd/m/Y') == formatDate(date2, 'd/m/Y')) {
                    _str = 0;
                }

                return _str;
            }
            
            
            // Recall data
            var list_case_havefl = (_callback) => {
                // console.log(window.isload_once)
                if(window.isload_once === 1) return;
                window.isload_once = 1;
    
                // START
                data_case = {
                    rs: false,
                };
                
                loadAllCaseID((listcase) => {
                    window.isload_once = 0;
                    if(typeof listcase !== 'object') return;
    
                    var n_havedate = 0;
                    var n_havedatefl = 0;
                    var listcase_havefl = [];
                    var isadd = false;
                    var ishave_appointmenttime = false;
                    listcase.forEach((item) => {
                        isadd = false;
                        ishave_appointmenttime = false;
                        
                        if(item.appointment_time) {
                            var [_day,_month,_year] = item.appointment_time.split('/');
                            if(_day && _month && _year) {
                                item.order_datetimeformat = new Date(`${_year}/${_month}/${_day}`);
                                item.appointment_time_datetimeformat = new Date(`${_year}/${_month}/${_day}`);
                                        
                                ishave_appointmenttime = true;
                                if(_get_diffday_number(`${_year}/${_month}/${_day}`) > -1) {
                                    isadd = true;
                                    
                                    if(item.follow_up_time) {
                                        if(item.follow_up_time.includes('Finish')) {
                                            isadd = false;
                                        }    
                                    }
                                    
                                }
                            }
                        }
                        
                        if(item.follow_up_time) {
                            var [_day,_month,_year] = item.follow_up_time.split('/');
                            if(_day && _month && _year) {
                                item.order_datetimeformat = new Date(`${_year}/${_month}/${_day}`);
                                item.follow_up_time_datetimeformat = new Date(`${_year}/${_month}/${_day}`);
                                
                                n_havedatefl++;   
                                isadd = true;
                            }
                        }
                        
                        // console.log('compare', isadd, item.follow_up_time, _get_diffday_number(`${_year}/${_month}/${_day}`));
                        // console.log(`zzzz ${ishave_appointmenttime}`);
                        if(isadd || isshowallcase) {
                            n_havedate++;
                            listcase_havefl.push(item);
                        }
                    })
    
                    if(n_havedate > 0) {
                        data_case.rs = true;
                        data_case.n_havedate = n_havedate;
                        data_case.n_havedatefl = n_havedatefl;
                        data_case.listcase_havefl = listcase_havefl;
            
                        _callback();
                    }
                    
                });
            };
            
            // f caculator diff date
            var _get_diffday = (str_date) => {
                if(!str_date) return '';

                const date1 = new Date(str_date);
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

                if(formatDate(date1, 'd/m/Y') == formatDate(date2, 'd/m/Y')) {
                    _str = 'today';
                }

                return _str;
            }
            
            // update attr status n case
            var remove_attr_btnshowmodal = () => {
                elm_popup_lstcasefl().removeAttribute('data-attr');
            }

            // ui table list
            var ui_table_list_modal = () => {
                remove_attr_btnshowmodal();

                

                // reload date and ui
                list_case_havefl(() => {
                    
                    var _html = `<span class="_sub_modal_close"></span>
                    <div class="cdtx_lstcasefl--container">
                        <div class="cdtx_lstcasefl--listheader">
                            <a href="#" class="cdtx_lstcasefl--listheader-a-dboard_qplus _btn_stall" target="_blank">Dashboard Q+</a>
                            <span class="cdtx_lstcasefl--listheader-showall _btn_stall" >All case</span>
                        </div>
                        <div class="cdtx_lstcasefl--searchbar"><span class="cdtx_lstcasefl--searchbar-input" contenteditable="true" data-value="" ></span></div>
                        <div class="cdtx_lstcasefl--tablecontainer">
                        </div>
                    </div>`;


                    var cdtx_lstcasefl_elm = document.createElement("div");
                    cdtx_lstcasefl_elm.id = "cdtx_lstcasefl";
                    cdtx_lstcasefl_elm.className = "cdtx_lstcasefl";
                    cdtx_lstcasefl_elm.innerHTML = _html;
                    

                    
                    getValueByKeyInSheetname(key = 'url_qplus_dashboard_check', 'System' , (rs) => {
                        if(elm = cdtx_lstcasefl_elm.querySelector('.cdtx_lstcasefl--listheader-a-dboard_qplus')) {
                            elm.setAttribute('href', rs);
                            elm.setAttribute('data-url_qplus_dashboard_check', rs);
                        }
                    });
                    
                    if(elm = cdtx_lstcasefl_elm.querySelector('.cdtx_lstcasefl--listheader-showall')) {
                        elm.addEventListener('click', (e) => {
                            _sub_modal().innerHTML = '';
                            isshowallcase = true;
                            ui_table_list_modal();
                        });
                    }
                    
                    if(elm = cdtx_lstcasefl_elm.querySelector('.cdtx_lstcasefl--searchbar-input')) {
                        var _uiqplus_table = function() { return document.querySelector('.uiqplus_table'); };
                        elm.addEventListener('keyup', (e) => {
                            var textinput = e.target.innerText;
                            e.target.setAttribute('data-value', textinput);
                            console.log(textinput);
                            if(_uiqplus_table()) {
                                _uiqplus_table().querySelectorAll('tbody tr').forEach((elm_tr) => {
                                    var _str1 = '';
                                    if(elm_herrre = elm_tr.querySelector('[data-dateinstall]')) {
                                        _str1 = elm_herrre.getAttribute('data-dateinstall');
                                    }
                                    var _str2 = elm_tr.innerText;
                                    if(_str1.includes(textinput) || _str2.includes(textinput)) {
                                        elm_tr.style.display = "";
                                    } else {
                                        elm_tr.style.display = "none";
                                    }
                                })
                            }
                        });
                    }
                    
                    
                    

                    var _tr = '';
                    var _lst_arr_followup = [];
                    for (const item of data_case.listcase_havefl) {
                        // if(!item.status_case) continue;
                        item.appointment_time_dmy = item.appointment_time_datetimeformat ? formatDate(item.appointment_time_datetimeformat, 'd/m/Y') + ` (${_get_diffday(item.appointment_time_datetimeformat)})` : '';
                        item.follow_up_time_dmy = item.follow_up_time_datetimeformat ? formatDate(item.follow_up_time_datetimeformat, 'd/m/Y') : '';
                        item.follow_up_time_diffday = _get_diffday(item.follow_up_time_datetimeformat);
                        item.follow_up_time_integer = parseInt(item.follow_up_time_diffday.replace(/[^\d-]+/g, '')) || 0;
                        
                        item.order_datetime_diffday_integer =  parseInt(_get_diffday(item.order_datetimeformat).replace(/[^\d-]+/g, '')) || 0;
                        
                        _lst_arr_followup.push(item);
                    }


                    // sort by condition
                    var int_number = 0;
                    _lst_arr_followup.sort((a,b) => {

                        if(a.order_datetime_diffday_integer < b.order_datetime_diffday_integer) {
                            return -1;
                        }
                        
                        // if(
                        //     !a.follow_up_time_diffday.startsWith('-')
                        // ) {
                        //     return -1;
                        // }

                        // if(
                        //     a.follow_up_time_diffday.startsWith('today')
                        // ) {
                        //     return -1;
                        // }
                        return 0;
                    });

                    // console.log('window.qlus_datalist', window.qlus_datalist);

                    
                    for (const item of _lst_arr_followup) {
                        _tr += `<tr>
                            <td style="white-space: nowrap"><a href="https://cases.connect.corp.google.com/#/case/${item.case_id}" ${location.hostname != 'cases.connect.corp.google.com' ? ` target="_blank" ` : ''}>${item.case_id}</a>
                            ${ item.is_caselt ? `<br> <span class="uiqplus_table-qluslable">LT</span>` : ``}
                            </td>
                            <td>
                            <div>
                                <strong>${item.customer_name}</strong>
                                <br>
                                <small style="max-width: 200px; text-overflow: ellipsis; overflow: hidden; " >
                                    ${getDomainOnlyURL(item.customer_website)}
                                    <br>${reformatAdsId(item.customer_adsid) || 'N/A'} <sup>${item.customer_ocid}</sup>
                                    <br>${item.tasks}
                                <small>
                            </div>
                            </td>
                            <td style="white-space: nowrap" >
                                <span data-dateinstall="${item.appointment_time_dmy}">${item.follow_up_time_dmy + ` <i date-st="${item.follow_up_time_diffday}">${item.follow_up_time_diffday}</i>`}</span>
                            </td>
                            <td><span data-btnclk="ui-qplus-addtrviewdetail" data-caseidhere="${item.case_id}" >View</span></td>
                        </tr>`;
                    }                            
                
                    var _lst_table = `<table class="uiqplus_table">
                        <thead>
                            <tr>
                                <th>Case ID</th>
                                <th>Adv info</th>
                                <th><span>Date FL (${data_case.n_havedatefl + " / " + data_case.n_havedate})</span></th>
                                <th class="uiqplus-act"><span data-btnclk="ui-qplus-addtrviewall" >View all</span></th>
                            </tr>
                        </thead>
                        <tbody>
                        ${_tr}
                        </tbody>
                    </table>`;
                    cdtx_lstcasefl_elm.querySelector(`.cdtx_lstcasefl--tablecontainer`).innerHTML = _lst_table;
                    
    
                    _sub_modal().insertAdjacentElement('beforeEnd', cdtx_lstcasefl_elm);
    
                    _sub_modal().classList.add('show');

                    
                })
            };
            
            list_case_havefl(() => {
                if(window.location.hostname == 'cases.connect.corp.google.com') {
                    observeOnce((elm) => {
                        cLog(() => { console.log('observeOnce - list_case_havefl cases.connect.corp' ) });

                        if(!document.querySelector('.dock-float-container')) return;
                
                        // if have data
                        if(data_case.rs) {
                            
                            if(!elm_popup_lstcasefl()) {
                                document.querySelector('.dock-float-container li:nth-child(2)').insertAdjacentHTML('afterEnd', `<li class="li-popup_lstcasefl" data-attr="${data_case.n_havedate}" ><span class="ico"></span></li>`)
                                
                                
                                elm_popup_lstcasefl().addEventListener('click', (elm) => {
                                    isshowallcase = false;
                                    ui_table_list_modal();
                                });
                            } 
                        }
                        
                
                    });
                }

                
                if(window.location.hostname == 'calendar.google.com') {
                    observeOnce((elm) => {
                        if(!document.querySelector('.panel_info-listbtn')) return;
                
                        // if have data
                        if(data_case.rs) {
                            
                            
                            
                            if(!elm_popup_lstcasefl()) {
                                cLog(() => { console.log('observeOnce - run_style list_case_havefl 2 calendar.google' ) })
                                
                                document.querySelector('.panel_info-listbtn').insertAdjacentHTML('afterEnd', `<span class="li-popup_lstcasefl" data-attr="${data_case.n_havedate}" ><span class="ico"></span></span>`)
                                
                                
                                elm_popup_lstcasefl().addEventListener('click', (elm) => {
                                    ui_table_list_modal();
                                });
                            } 
                        }
                        
                
                    });
                }
            });
    
        
        } catch (error) {
            cLog(() => { console.log('list_case_havefl', error) })
        }
    
    
    }

    
    function popupUpdateLT() {
        if(window.location.hostname !== 'cases.connect.corp.google.com') return false;

        // if(!localStorage.getItem('dongtest_local')) return false;
        
        var _sub_modal = () => {
            return document.querySelector('._sub_modal');
        }
        
        
        var _sub_modal_close = () => {
            return document.querySelector('._sub_modal_close');
        }
        
        if(!_sub_modal()) {
            setTimeout(() => {
             popupUpdateLT()   
            }, 1000);
            return false
        }
        
        _sub_modal().insertAdjacentHTML('beforeEnd', `
        <style>
        #_contentPopupUpdateLT_quicklink,
        #_contentPopupUpdateLT_input {
            width: 100%; height: 196px;margin: 0 auto;display: block;
            margin-bottom: 20px;
            padding: 20px;
            font-size: 80%;
            background: #fff;
            border: 1px dashed #cacaca;
            overflow: auto;
            position: relative;
            z-index: 1;
            
        }

        #_contentPopupUpdateLT_quicklink {
            height: 40px;
            padding: 10px;
        }

        #_contentPopupUpdateLT_input:after,
        #_contentPopupUpdateLT_quicklink:after {
            content: "Quick link";
            pointer-events: none;
            color: #9C27B0;
            position: absolute;
            left: 4px;
            top: 4px;
            z-index: -1;
            font-size: 80%;
            border: 1px dotted;
            z-index: 9999;
            background: #fff;
            padding: 2px 10px;
            border-radius: 4px;
        }

        #_contentPopupUpdateLT_input:after {
            content: attr(data-tiptitle);
        }

        #_contentPopupUpdateLT_quicklink.isfocus:after,
        #_contentPopupUpdateLT_quicklink:focus:after,
        #_contentPopupUpdateLT_input:focus:after {
            display: none;
        }
        
        #_contentPopupUpdateLT_quicklink.isfocus,
        #_contentPopupUpdateLT_quicklink:focus {
            height: 70px;
        }
        

        #_contentPopupUpdateLT {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            top: 92px;
            position: relative;
        }
        #_contentPopupUpdateLT_input_count {
            text-align: center;
            text-transform: uppercase;
            color: #555;
        }
        #_contentPopupUpdateLT_input_submit:after {
            content: "Update";
        }
        #_contentPopupUpdateLT_input_submit {
            display: inline-block;
            border: 1px solid #bbb7b7;
            line-height: 0;
            padding: 11px;
            border-radius: 4px;
            color: #444;
            font-weight: 700;
            text-shadow: 1px 1px 2px #fff;
            background-color: #fff;
            margin-right: 6px;
            cursor: pointer;
            font-size: 12px;
            text-decoration: none;
            white-space: nowrap;
            user-select: none;
            margin: 0 auto;
            margin-bottom: 20px;
            
        }
    
        #_contentPopupUpdateLT_input_rs {
            white-space: pre;
            font-family: monospace;
            background: #fefefe;
            border-radius: 10px;
            padding: 10px;
        
        }
        #_contentPopupUpdateLT * {
            box-sizing: border-box;
        }

        #_contentPopupUpdateLT_readmore {            
            user-select: auto;
            background: #fffbd3;
            padding: 10px;
        }

        #_contentPopupUpdateLT_readmore:not(.open) {
            max-height: 42px;
            overflow: hidden;
            font-style: italic;
            text-overflow: ellipsis;
            display: block;
            cursor: pointer;
        }

        #_contentPopupUpdateLT label[for="_contentPopupUpdateLT_input_chksetquicklink"] {
            margin-bottom: 10px;
            display: block;
        }
        
        </style>
        <span class="_sub_modal_close"></span>
        <div id="_contentPopupUpdateLT">
            <div id="_contentPopupUpdateLT_input" contenteditable="" data-tiptitle="Update case" ></div>
            <span id="_contentPopupUpdateLT_input_submit"></span>
            <pre id="_contentPopupUpdateLT_readmore">${
                ['Ex: copy bellow paste for demo:',
                    '=========',
                    'Join Kenedy // ADV Name 1st line, exclude with prefix: -',
                    'https://domainname.com',
                    '-----------',
                    'https://adwords.corp.google.com/aw/conversions/detail?ocid=762568944',
                    'OR',
                    'ocid:   762568944    // prefix ocid: ',
                    'OR',
                    'CID:  162568941 // prefix cid:',
                    'OR',
                    'adsid:   162568941 // prefix adsid:',
                    '-----------',
                    'https://meet.google.com/jna-tgvk-nbb?authuser=0',
                    '-----------',
                    '84 987654321',
                    'OR',
                    '+1-212-456-7890',
                    'OR',
                    'p:+86987654321',
                    '-----------',
                    'Dong ...',
                    'JoinKenedy@gmail.com',
                    'amemail@google.com // AM email'
                ].join('\n')
            }</pre>
            <div id="_contentPopupUpdateLT_input_count"></div>
            <div id="_contentPopupUpdateLT_input_rs"></div>
        </div>    
        `);
        var _contentPopupUpdateLT_input = document.querySelector('#_contentPopupUpdateLT_input');
        var _contentPopupUpdateLT_input_rs = document.querySelector('#_contentPopupUpdateLT_input_rs');
        var _contentPopupUpdateLT_input_submit = document.querySelector('#_contentPopupUpdateLT_input_submit');
        var _contentPopupUpdateLT_readmore = document.querySelector('#_contentPopupUpdateLT_readmore');
        var _contentPopupUpdateLT_input_count = document.querySelector('#_contentPopupUpdateLT_input_count');
        var _templateCase = {};
        var urls_isquicklink = [];
        
        
        

        // Show Input
        _contentPopupUpdateLT_input.addEventListener('keyup', function(e){
            // var _innerHtml = e.target.innerHTML;
            // _text = stripHtml(_innerHtml);
            // console.log(_text);
            
            var _val = e.target.innerText;
            
            
            
            // Extract url
            var urls = extractUrls(_val);
            var urls_notgoogle = [];
            urls_isquicklink = [];
            var url_meet = '';
            var ocid = '';
    
            var _lst_value = _val.trim().split("\n");
            _lst_value = _lst_value.filter(n => n)
            _lst_value = _lst_value.filter((c, index) => {
                return _lst_value.indexOf(c) === index;
            });
            
            var _all_url = [];
            urls.forEach((item) => {
                _all_url.push(item);

                if(!(item.includes('google.com') || item.includes('tel.meet'))) {
                    urls_notgoogle.push(item);
                }
    
                if(item.includes('meet.google.com')) {
                    url_meet = item;
                }
    
                if(item.includes('adwords.corp.google.com')) {
                    const params = new URL(item).searchParams;
                    ocid = params.get('ocid') || ''; 
                }
                
            });

            

            urls_notgoogle = urls_notgoogle.filter((c, index) => {
                return urls_notgoogle.indexOf(c) === index;
            });
            
            // Extract email
                var emails = extractEmails(_val);
                var emails_notgoogle = [];
                var emails_google = [];
                
                if(emails) {
                    emails.forEach((item) => {
                        if(!item.includes('@google.com')) {
                            emails_notgoogle.push(item);
                        } else {
                            emails_google.push(item);
                        }    
                   
                        
                    });    
                }
                
            
                emails_google = emails_google.filter((c, index) => {
                    return emails_google.indexOf(c) === index;
                });
    
                emails_notgoogle = emails_notgoogle.filter((c, index) => {
                    return emails_notgoogle.indexOf(c) === index;
                });
            
            
    
            // Phone
            var _phone = '';
            var _lowertext = '';
            _lst_value.forEach(item => {
                _lowertext = item.toLowerCase();
                
                if(
                    !(
                        _lowertext.startsWith('adsid:') ||
                        _lowertext.startsWith('ocid:') ||
                        _lowertext.startsWith('cid:')
                    )
                    && (
                        _lowertext.startsWith('p:')
                        || _lowertext.startsWith('+')
                        || _lowertext.replace(/[^\d]+/g, '').startsWith('84')
                    )
                ) {
                    
                    
                    var _phone_tmp = _lowertext.replace(/[^\d]+/g, '')
                    if(_phone_tmp.startsWith('84')) {
                        item = `+${_phone_tmp}`;
                    }
                    
                    if(_phone_get = reFormatPhone(item)) {
                        _phone = _phone_get;
                    }
                }
                
                
            });
            
            
            
            
            // Ocid, External ID
            var _ocid = '', _external_id = '', _lowertext = '';
            _lst_value.forEach(item => {
                _lowertext = item.toLowerCase()
                
                if(_lowertext.startsWith('ocid:')) {
                    _ocid = item.replace(/[^\d]+/g, '');
                }
                
                if(
                    _lowertext.startsWith('adsid:') ||
                    _lowertext.startsWith('cid:') ||
                    getAdsID(_lowertext)
                ) {
                    _external_id = item.replace(/[^\d]+/g, '');
                }
            })
    
    
            
            _templateCase = {};
            
            
            _templateCase.case_id = __case_id();
            _templateCase.is_caselt = '1';
            
    
            if(url_meet) {
                _templateCase.customer_gmeet = url_meet;
            }
    
            if(urls_notgoogle.length > 0) {
                _templateCase.customer_website = urls_notgoogle.join(', ');
            }
    
            if(emails_google.length > 0) {
                _templateCase.am_email = emails_google.join(', ');
                _templateCase.am_name = _templateCase.am_email.split('@')[0];
            }

            if(emails_notgoogle.length > 0) {
                _templateCase.customer_email = emails_notgoogle.join(', ');
            }
    
            // Customer name
            if(_lst_value.length > 0) {
                _templateCase.customer_name = _lst_value[0];
                if(
                    _lst_value[0].startsWith('-') 
                    || _lst_value[0].startsWith('+')
                    || _lst_value[0].startsWith('http')
                    || _lst_value[0].includes('@google.com')
                ) {
                    delete _templateCase.customer_name;
                }
                
                // if(adv_name = document.querySelector('action-bar account-field.input-email material-input input')) {                
                //     if(_templateCase.am_email) {
                //         adv_name.value = _templateCase.am_email;
                //     } else {
                //         adv_name.value = _templateCase.customer_email;
                //     }
                // }
            }
    
            if(_phone) {
                _templateCase.customer_contact = _phone;
            }
    
            if(ocid) {
                _templateCase.customer_ocid = ocid;
            }
            // Overwrite ocid
                if(_ocid) {
                    _templateCase.customer_ocid = _ocid;
                }
            
            
            // Ads ID
            var input_adsconnect = '';
            if(_external_id) {
                input_adsconnect = _external_id;
                _templateCase.customer_adsid = _external_id;
            } else {
                if(ocid) {    
                    input_adsconnect = ocid;
                }
            }
            
            if(input_adsconnect) {
                if(adv_name = document.querySelector('action-bar [debug-id="target-input"] input')) {
                    adv_name.value = input_adsconnect;
                }
            }        

            
            // Could
            var length_temcase = Object.keys(_templateCase).length;
            var str = length_temcase + ' - normal';
            if(length_temcase > 4) str = 'normal';
            if(length_temcase > 7) str = 'good';
            if(length_temcase > 8) str = 'good+';
            if(length_temcase > 10) str = 'great';

            _contentPopupUpdateLT_input_count.innerText = `${str} (${length_temcase})`;

            _contentPopupUpdateLT_input_rs.innerText = JSON.stringify(_templateCase,null,'\t');

        });
    
    


    
        var _actevent = (adv_name) => {
            // adv_name.dispatchEvent(new Event('focus'));
            adv_name.dispatchEvent(new Event('input'));
            adv_name.dispatchEvent(new Event('change'));
            adv_name.dispatchEvent(new Event('blur'));
            adv_name.dispatchEvent(new Event('enter'));
            adv_name.dispatchEvent(new Event('keypress'));
        }
        
    
        var _updateinput = () => {
            
    
            if(_templateCase.customer_name) {
                if(adv_name = document.querySelector('action-bar [debug-id="name-input"] input')) {
                    adv_name.value = _templateCase.customer_name;
                    _actevent(adv_name);
                }    
            }
            
            if(_templateCase.customer_email) {
                if(adv_name = document.querySelector('action-bar account-field.input-email material-input input')) {
                    
                    if(_templateCase.am_email) {
                        adv_name.value = _templateCase.am_email;
                    } else {
                        adv_name.value = _templateCase.customer_email;
                    }
                    _actevent(adv_name);
                }
                
                if(adv_name = document.querySelector('email-input input')) {
                    adv_name.value = _templateCase.customer_email;
                    _actevent(adv_name);
                }
            }
            
            if(_templateCase.customer_contact) {
                if(adv_name = document.querySelector('phone-number-input input')) {
                    adv_name.value = _templateCase.customer_contact;
                    _actevent(adv_name);
                }
            }
            
            
            // Ocid
            if(_templateCase.customer_ocid) {
                if(adv_name = document.querySelector('action-bar [debug-id="target-input"] input')) {
                    adv_name.value = _templateCase.customer_ocid;
                    _actevent(adv_name);
                }
            } else {
                if(_templateCase.customer_adsid) {
                    if(adv_name = document.querySelector('action-bar [debug-id="target-input"] input')) {
                        adv_name.value = _templateCase.customer_adsid;
                        _actevent(adv_name);
                    }
                }
            }
        }   
        
        
        // Update
        _contentPopupUpdateLT_input_submit.addEventListener('click', (e) => {
    
            // if(!_templateCase.customer_email) { 
            //     Toastify({
            //         text: `Dont have customer email!!!`,
            //         duration: 2000,
            //         callback: function(){
            //             this.remove();
            //         }
            //     }).showToast();
                
            //     return false;
            // };
            
            // Update url
            
            
            // If have data
            if(_templateCase.case_id) {
                // Open all button editor
                if(_templateCase.am_email) {
                    document.querySelectorAll('[debug-id="add-email-button"]').forEach(elm => {
                        elm.click()
                    });    
                }
                
                if(_templateCase.customer_email || _templateCase.customer_contact) {
                    document.querySelectorAll('[debug-id="edit-button"]').forEach(elm => {
                        elm.click()
                    });
                }
                
                // Dialog Show 
                // document.querySelectorAll('[debug-id="edit-button"]').forEach(item => {
                //     item.click()
                // })
                // document.querySelectorAll('[debug-id="add-phone-number-button"]').forEach(item => {
                //     item.click()
                // })
    
                document.querySelector('._casecalendar_info').remove();
        
                var _contentPopupUpdateLT_input = document.querySelector('#_contentPopupUpdateLT_input');
                
                // var __content = '';
                // for (const property in _templateCase) {
                //   __content += (`${property}: ${_templateCase[property]}`) + "\n";
                // }
                
                
                // Update note case
                __content = `${_contentPopupUpdateLT_input.innerText }`;
                
                getNoteCase(_templateCase.case_id, (data) => {
                    if(!data) {
                        updateNoteCase(_templateCase.case_id, __content, (rs) => {
                            cLog(() => { console.log(`Saved note ${_templateCase.case_id}!!!`, __content); });
                        }); 
                    }
                });
    
        
                loadCaseStorageByID(_templateCase.case_id, (response) => {
                    var caseload = response.value || {};
                     
                    // ====== BEGIN
                    if(caseload.is_external) { _templateCase.is_external = '' };
                    if(caseload.am_isgcc_external) { _templateCase.am_isgcc_external = '' };
                    
                    var merge2obj = Object.assign(caseload, _templateCase);
                    // console.log("compare", caseload, _templateCase, merge2obj);
    
                    if(!merge2obj.appointment_time) {
                        merge2obj.appointment_time = formatDate(new Date(), 'd/m/Y');
                    }
                    
                    // ====== END -> SAVE
                    // saveCase2Storage(caseload, _callback);
                    saveCase2Storage(merge2obj, (response) => {
                        window.dataCase = response;
                        window.n_start = window.n_start + 1;
                        window.hasnew_data = "yes";
                        reupdateForAll(response);
                        
                        setTimeout(() => {
                            _updateinput();
                        }, 2000)
                        
            
                    });
    
                })    
            }
            

            if(urls_isquicklink.length > 0) {
                setGetQuickLink(__case_id(), urls_isquicklink.join('\n'), (data) => {
                    cLog(() => { console.log('UPDATE', data) });
                });
            }
            
               
            if(_sub_modal_close()) {
                _sub_modal_close().click();
                
                var elmrefresh = document.querySelector('[data-btnclk="_connectcase_info-act_refresh"]');
                if(elmrefresh) {
                    elmrefresh.click();
                }
            }
        })

        _contentPopupUpdateLT_readmore.addEventListener('click', (e) => {
            e.target.classList.add('open');
        })
    
        _sub_modal().classList.add('show');
    }
    
    var keyupEscAction = () => {
        document.addEventListener('keyup', function(e) {
            if('27' == e.keyCode) {
                if(elm = document.querySelector('._sub_modal.show')) {
                    elm.innerHTML = '';
                    elm.classList.remove('show');
                }
            }
        })
    };
    
    
            
            
    // ======================
    // INIT
    // ======================
    // try {
    //     popupUpdateLT();    
    //     cLog(() => { console.log('popupUpdateLT') });
    // } catch (error) {
    //     console.log('popupUpdateLT error', error)
    // }
    
    // LOAD
    
    var _initLOAD = () => {
        initLoadGroup();
        loadStyle();
        loadRealtime();
        autoUpdatelistLinkCalendar(true);
        clickAction();
        loadEmailTemplateAction();
        panelAddShortcutLink();
        crSubjectByHotKeyEmail();
        openGAdsbyAdsID();
        initQplusLoad();
        uiOnCallPanel();
        // Load code vanbo
        tagteamFocusCase();    
        mailTemplateControl();    
        tagteam_showGTMID();
        recheckInfoCase();
        showListFollowUp();
        keyupEscAction();
        happyChristMas();
        
        addDashboardChklstSOP();
        addDashboardCheckWinCriteria();
        addBoadListEmailTemplate();
        
        lastVisitCase();
        


        // dashboard_bookmark_lsttool
        addBoardIframe({
            'urlframe_default': 'https://cdtx.lyl.vn/_support/4agent/index.php',
            'urlonsheet_bykey': 'dashboard_bookmark_lsttool',
            'btn_keyclick': 'dashboard_bookmark_lsttool',
            'tooltip': 'Tools on Bookmark click',
            'icon_url': assets_img_bookmark,
            'elm_pos_show': `[data-debugid="goteam"]`,
            
        })
        
        
    }

    if(window.isloadgooglesheetonlinewebpublics) {
        _initLOAD();
    } else {
        var _once_load = 0;
        loadGoogleSheetOnlineWebPublics(() => {
            if(_once_load === 0) {
                _once_load = _once_load + 1;
                _initLOAD()
            }
        });
    }
}
