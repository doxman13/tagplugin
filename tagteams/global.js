function global_case(optionkl__disable_dialog) {
    if(optionkl__disable_dialog) return false;
    cLog(() => { console.log('global_case START'); })



    window.dataCase = window.dataCase || {};
    window.dataMeetLink = window.dataMeetLink || {};
    window.dataMeetLinkAll = window.dataMeetLinkAll || [];
    window.caseCurrent = window.caseCurrent || {};
    window.isdongtest = localStorage.getItem("dongtest") || false;
    window.linkenable = localStorage.getItem("linkenable") || false;
    window.isdongtest_local = localStorage.getItem("dongtest_local") || false;
    window.keylanguage = window.keylanguage || '';
    window.qlus_datalist = window.qlus_datalist || [];
    


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
                        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gm;
                        var rs_regmatch = value.match(validRegex);
                        // console.log('___DONG 1 email', value, rs_regmatch);
                        if(rs_regmatch) {
                            // console.log('___DONG 2 email', value, rs_regmatch);
                            if(!value.includes('@google.com')) {
                                _tempdataCase['customer_name'] = key;
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
                    if(key === 'contact_info_name') {
                        _tempdataCase['customer_name'] = value;
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
                        e.target.classList.remove('notview_today');
                    });
                    
                }
            }
    
        } catch (error) {
            console.error('addButtonToDocContent', error);
        }
    }
    
    var addButtonResetVersion = () => {
        var _contenthtml = `
        <div class="material-button" data-btnclk="resetdata" >
            <div class="content">
                <img src="${assets_img_reseticon}">
            </div>
        </div>
        <div class="material-button _fordevmode" data-btnclk="enable_devmode" >
            <div class="content">
                <img src="data:image/svg+xml,%3Csvg fill='%23000000' width='800px' height='800px' viewBox='0 0 24 24' role='img' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.3zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z'/%3E%3C/svg%3E">
            </div>
        </div>
        
        <div class="material-button _fordevmode" data-btnclk="test_meetpin" >
            <div class="content">
                Test PIN
            </div>
        </div>
        `;


        // For Dev
        if(window.isdongtest) {
            _contenthtml += `
            <div class="material-button _fordevmode" data-btnclk="tool_mail_test" >
                <div class="content">
                    Mail test
                </div>
            </div>
            <div class="material-button" data-btnclk="removecase_example" title="remove 1 case storage example" >
                <div class="content">
                    <img src="${assets_img_removeicon}" alt="" srcset="">
                </div>
            </div>
            <div class="material-button _fordevmode" data-btnclk="get_window_data_case" >
                <div class="content">
                    <img src="data:image/svg+xml,%3Csvg fill='%23000000' width='800px' height='800px' viewBox='0 0 32 32' version='1.1' xmlns='http://www.w3.org/2000/svg'%3E%3Ctitle%3Eeye%3C/title%3E%3Cpath d='M0 16q0.064 0.128 0.16 0.352t0.48 0.928 0.832 1.344 1.248 1.536 1.664 1.696 2.144 1.568 2.624 1.344 3.136 0.896 3.712 0.352 3.712-0.352 3.168-0.928 2.592-1.312 2.144-1.6 1.664-1.632 1.248-1.6 0.832-1.312 0.48-0.928l0.16-0.352q-0.032-0.128-0.16-0.352t-0.48-0.896-0.832-1.344-1.248-1.568-1.664-1.664-2.144-1.568-2.624-1.344-3.136-0.896-3.712-0.352-3.712 0.352-3.168 0.896-2.592 1.344-2.144 1.568-1.664 1.664-1.248 1.568-0.832 1.344-0.48 0.928zM10.016 16q0-2.464 1.728-4.224t4.256-1.76 4.256 1.76 1.76 4.224-1.76 4.256-4.256 1.76-4.256-1.76-1.728-4.256zM12 16q0 1.664 1.184 2.848t2.816 1.152 2.816-1.152 1.184-2.848-1.184-2.816-2.816-1.184-2.816 1.184l2.816 2.816h-4z'%3E%3C/path%3E%3C/svg%3E">
                </div>
            </div>`;
        }

        
        // For Dev
        if(window.linkenable) {
            _contenthtml += `
            <div class="material-button _fordevmode" data-btnlinhvoclk="loadbot" >
                <div class="content">
                    <img src="data:image/svg+xml,%3Csvg height='800px' width='800px' version='1.1' id='_x32_' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 512 512' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%23000000;%7D%0A%3C/style%3E%3Cg%3E%3Cpath class='st0' d='M424.712,0c-13.927-0.017-25.211,11.233-25.228,25.16c-0.016,13.91,11.25,25.193,25.16,25.21 c13.91,0.017,25.203-11.25,25.219-25.169C449.872,11.292,438.622,0.009,424.712,0z'/%3E%3Cpath class='st0' d='M429.087,120.032c0.008-8.193-6.614-14.823-14.789-14.832c-8.192-0.008-14.83,6.622-14.839,14.806 c0,8.183,6.63,14.822,14.806,14.822C422.457,134.846,429.087,128.208,429.087,120.032z'/%3E%3Cpath class='st0' d='M461.241,65.304c-9.781-0.026-17.736,7.888-17.736,17.668c-0.018,9.797,7.913,17.711,17.702,17.736 c9.764,0,17.719-7.906,17.719-17.694C478.942,73.242,471.02,65.304,461.241,65.304z'/%3E%3Cpath class='st0' d='M78.238,395.333c-19.712,19.713-19.712,51.782,0,71.494c19.713,19.713,51.79,19.713,71.503,0l146.434-146.434 H153.186L78.238,395.333z'/%3E%3Cpath class='st0' d='M332.374,121.181c-11.934-11.943-31.36-11.943-43.294,0c-7.72,7.72-10.439,18.564-8.175,28.496l-1.96,1.968 L56.752,373.839c-31.57,31.562-31.57,82.921,0,114.483c31.554,31.571,82.922,31.571,114.476,0l222.201-222.193l1.96-1.96 c9.932,2.264,20.785-0.456,28.505-8.175c11.934-11.943,11.943-31.36,0-43.294L332.374,121.181z M381.832,257.159l-57.474,57.482 L160.957,478.043c-25.946,25.937-67.99,25.937-93.935,0c-25.928-25.937-25.928-67.989,0-93.927l162.599-162.598l58.293-58.277 l2.787-2.804c0.388,0.422,0.778,0.828,1.182,1.232l91.52,91.52c0.397,0.405,0.81,0.794,1.225,1.182L381.832,257.159z M413.606,245.715c-4.333,4.333-10.524,5.667-16.014,4.021l-4.164-4.164l-93.926-93.926l-4.164-4.164 c-1.656-5.49-0.312-11.689,4.02-16.022c6.276-6.275,16.461-6.275,22.736,0l91.511,91.51 C419.889,229.254,419.889,239.432,413.606,245.715z'/%3E%3C/g%3E%3C/svg%3E">
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


    var addGoCase2Calendar = (_caseid) => {
        // go_caseincalendar
        // https://calendar.google.com/calendar/u/0/r/search?q=2-4476000033977
        
        var _link = `https://calendar.google.com/calendar/u/0/r/search?q=${_caseid}`;
        
        
        if(!document.querySelector('#go_caseincalendar')) {
            var _contenthtml = `<a href="${_link}" target="_blank" id="go_caseincalendar">Go calendar</a>`;
            // _contenthtml += `<ul class="dock_icon">
            //     <li class="li-2 open-email">
            //         <span class="name">Send mail</span>
            //         <img class="ico" src="chrome-extension://gnhkacnhcenacadhaohjdkmkgfikdkoh/assets/img/groups/gmail.png">
            //     </li>
            //     <li class="li-3 click2call">
            //         <span class="name">Click to call</span>
            //         <img class="ico click2call"
            //             src="chrome-extension://gnhkacnhcenacadhaohjdkmkgfikdkoh/assets/img/groups/phone-call-mac.png" alt="">
            //     </li>
            //     <li class="li-5 open-note">
            //         <span class="name">Oncall Notes</span>
            //         <img class="ico" src="chrome-extension://gnhkacnhcenacadhaohjdkmkgfikdkoh/assets/img/groups/note.png" >
            //     </li>
            //     <li class="li-10">
            //         <span class="name">Ads ICS</span>
            //         <img class="ico ads-ics"
            //             src="chrome-extension://gnhkacnhcenacadhaohjdkmkgfikdkoh/assets/img/groups/icon-google-ads.png" >
            //     </li>
            //     <li class="li-11">
            //         <span class="name">Gearloose</span>
            //         <img class="ico open-gearloose"
            //             src="chrome-extension://gnhkacnhcenacadhaohjdkmkgfikdkoh/assets/img/groups/icon-gearloose.png" >
            //     </li>
            //     <li class="li-12">
            //         <span class="name">OGT Dashboard</span>
            //         <img class="ico ogt-dashboard"
            //             src="chrome-extension://gnhkacnhcenacadhaohjdkmkgfikdkoh/assets/img/groups/dashboard.png" >
            //     </li>
            //     <li class="li-13">
            //         <span class="name">EC Dashboard</span>
            //         <img class="ico ec-dashboard"
            //             src="chrome-extension://gnhkacnhcenacadhaohjdkmkgfikdkoh/assets/img/groups/dashboard.png" >
            //     </li>
            //     <li class="li-14">
            //         <span class="name">Connect Appointment</span>
            //         <img class="ico connect-appointment"
            //             src="https://cdtx.lyl.vn/cdtx-assistant/filemanager_api/tagteam/assets/img/groups/connect-appointment.png" >
            //     </li>
            // </ul>`;

            _contenthtml = `${_contenthtml} `;
            _contenthtml = _TrustScript(_contenthtml);
            document.querySelector('.home.header .card-title').insertAdjacentHTML('beforeEnd', _contenthtml);
        }
        
        
        if(document.querySelector('#go_caseincalendar')) {
            document.querySelector('#go_caseincalendar').setAttribute('href', _link);
        }
        
           
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
                    <div class="_casecalendar_info--controls _t_right" >
                        <span class="_btn_stall _connectcase_info-act_refresh" data-btnclk="_connectcase_info-act_refresh" >⟳</span>
                        <span class="_btn_stall _connectcase_info-act_edit" data-btnclk="_connectcase_info-act_edit" >EDIT</span>
                    </div>
                    <div class="_casecalendar_info--notification" ></div>
                    <div class="_casecalendar_info--consentrecord" >Please Hit SpeakEasy Record Button</div>
                    <div class="_casecalendar_info--inner"  data-isgcc="{%is_gcc%}" data-isexternal="{%is_external%}" data-issilver="{%customer_program%}" >
                        <span class="_casecalendar_info-50per" data-title="Case ID:" >
                            <a href="https://cases.connect.corp.google.com/#/case/${_caseid}" target="_blank" >${_caseid}</a>
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
                            console.log('__DONG v5', _data);
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
    
    
    var addPanelNote2Case = (_caseid) =>{
        try {
            var _contenthtml = `<div class="_infocase_byme"></div>`;
            var _contenthtml_inner = `
            <span class="_infocase_byme-btnopen" data-btnclk="_infocase_byme-openact" ></span>
            <div class="_infocase_byme-inner">
                <span class="_infocase_byme-warning mb_20px" >Note: The information is only stored on computer memory. And you can <span data-btnclk="removecase_example"  >refresh this data</span></span>
                
    
                <div class="_infocase_byme-row _infocase_byme-control" >
                    <div class="_infocase_byme-col">
                        <div class="_infocase_byme-note" data-title="Note" data-infocase="note" contenteditable="plaintext-only" ></div>
                        <div class="_infocase_byme-field" data-title="Meet link" data-infocase="customer_gmeet" data-disnewline="1" contenteditable="plaintext-only" ></div>
                        <div class="_infocase_byme-field" data-title="Date install" data-infocase="appointment_time" data-disnewline="1" contenteditable="plaintext-only" ></div>
                        <div class="_infocase_byme-field" data-title="Is External" data-infocase="is_external" data-disnewline="1" contenteditable="plaintext-only" ></div>
                        <div class="_infocase_byme-field" data-title="Is GCC" data-infocase="is_gcc" data-disnewline="1" contenteditable="plaintext-only" ></div>
                        <div class="_infocase_byme-field" data-title="Is Ads Enhanced Conversions" data-infocase="is_ads_enhanced_conversions" data-disnewline="1" contenteditable="plaintext-only" ></div>
                        <div class="_infocase_byme-field" data-title="Your call quality" data-iscenter="1" data-infocase="self_assessment_call_quality" data-disnewline="1" contenteditable="plaintext-only" data-select="7,6,5,4,3,2,1,∞" data-btnclk="note_select" >∞</div>
                    </div>
                    <div class="_infocase_byme-col" >
                        <span class="_btn_stall mb_20px disable" data-btnsave="1" data-caseid="${_caseid}" >Save</span>
                        <div class="_infocase_byme-field" data-title="Customer name" data-infocase="customer_name" data-disnewline="1" contenteditable="plaintext-only" ></div>
                        <div class="_infocase_byme-field" data-title="Customer email" data-infocase="customer_email" data-disnewline="1" contenteditable="plaintext-only" ></div>
                        <div class="_infocase_byme-field" data-title="Customer contact" data-infocase="customer_contact" data-disnewline="1" contenteditable="plaintext-only" ></div>
                        <div class="_infocase_byme-field" data-title="Customer Program" data-infocase="customer_program" data-disnewline="1" contenteditable="plaintext-only" ></div>
                        <div class="_infocase_byme-field" data-title="Customer Ads ID" data-infocase="customer_adsid" data-disnewline="1" contenteditable="plaintext-only" ></div>
                        <div class="_infocase_byme-field" data-title="Customer OCID" data-infocase="customer_ocid" data-disnewline="1" contenteditable="plaintext-only" ></div>
                        <div class="_infocase_byme-field" data-title="Customer Website" data-infocase="customer_website" data-disnewline="1" contenteditable="plaintext-only" ></div>
                        <div class="_infocase_byme-field" data-title="AM email" data-infocase="am_email" data-disnewline="1" contenteditable="plaintext-only" ></div>
                        <div class="_infocase_byme-field" data-title="Tasks" data-infocase="tasks" data-disnewline="1" contenteditable="plaintext-only" ></div>
                        <div class="_infocase_byme-field" data-title="UA,GA4" data-infocase="customer_ua_ga" data-disnewline="1" contenteditable="plaintext-only" ></div>
                        
                    </div>
                </div>
                <div class="_infocase_byme-row mb_20px" data-area="btn-shortcutcase" ></div>
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
    
    
                var _caseid = () => {
                    return _infocase_bymeelm.querySelector('[data-caseid]').getAttribute('data-caseid');
                };
    
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
                                updateAllFieldsCase2Storage(_temp, _caseid(), (rs) => {
                                    cLog(() => { console.log(`Setting Case ${_caseid()}!!!`, _temp); });
                                    
                                    // Toastify({
                                    //     text: `Setting Case ${_caseid()}!!!`,
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
                                updateNoteCase(_caseid(), _value_noted, (rs) => {
                                    cLog(() => { console.log(`Saved note ${_caseid()}!!!`, _value_noted); });
                                    // Toastify({
                                    //     text: `Saved note ${_caseid()}!!!`,
                                    //     duration: 2000,
                                    //     callback: function(){
                                    //         this.remove();
                                    //     }
                                    // }).showToast();
                                    
                                    _nsave_saved++;
                                    is_complete_updated(() => {})
                                });  


                                Toastify({
                                    text: `Save Case ${_caseid()}!!!`,
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


                if(localStorage.getItem('dongtest_local')) {
                    var _temp_oncall = {
                        'id' : 'cdtx__uioncall--btn',
                        'btn_text': 'On Call UI',
                        'content_insert' : `
                        <div class="cdtx__uioncall">
                            <div class="cdtx__uioncall_control">
                                <span class="cdtx__uioncall_control-save" data-text="Save" ></span>
                                <span class="cdtx__uioncall_control-load" data-text="Load" ></span>
                            </div>
                            <div class="cdtx__uioncall_outer">
                                <p dir="auto"><b>Sub-status:&nbsp;&nbsp;<span class="_sub_i" data-btnclk="choice_status_list" data-infocase="status_case" >Click Choice</span></b> </p>
                                <p dir="auto"><b>Sub-status Reason:</b>&nbsp;&nbsp; </p>
                                <p dir="auto"><span class="cdtx__uioncall_control-flchoice">FL: NA</span></p>
                                <p dir="auto"><b>Speakeasy ID:&nbsp;&nbsp;</b> </p>
                                <p dir="auto"><b>On Call Comments:</b>&nbsp;&nbsp; </p>
                                <p dir="auto"><b>Tags Implemented:&nbsp;&nbsp;</b></p>
                                <p dir="auto"><b><span class="cdtx__uioncall_control-flchoice">Screenshots: Attach</span></b></p>
                                <p dir="auto"><b>Multiple CIDs:&nbsp;&nbsp;</b>NA</p>
                                <p dir="auto"><b><span class="cdtx__uioncall_control-flchoice">On Call Screenshot: Attach</span></b></p>
                            </div>
                        </div>
                        `
                    };
                    _arr_btnlist.push(_temp_oncall);
                }



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
                                        _document_attachurl_elm.insertAdjacentHTML('beforeEnd', `<span class="_document_attachurl_i">DOCUMENT <strong>EC</strong>: <span data-highlight="need_recheck" data-btnclk="popup_add_doc_ec_dfa" >Click Add Document</span></span> `);
                                    }
                                    if(window.dataCase['is_external']) {
                                        _document_attachurl_elm.insertAdjacentHTML('beforeEnd', `<span class="_document_attachurl_i">DOCUMENT <strong>DfA</strong>: <span data-highlight="need_recheck" data-btnclk="popup_add_doc_ec_dfa" >Click Add Document</span></span> `);
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
    

    function clickAction() {
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
                
                if(_action === 'test_meetpin') {
                    setChromeStorage('_pinmeet_temp', '1'+ new Date().getSeconds());
                }
                
                if(_action === 'open_panelnote') {
                    

                    // Add noted
                    var _caseid = document.querySelector('[debug-id="case-id"] .case-id').innerText.trim();
                    
                    
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
                    })
                    
                }
                
                if(_action === 'removecase_example') {
                    var _caseid = 'cdtx_caseid_' + document.querySelector('[debug-id="case-id"] .case-id').innerText;
                    if (confirm(`You sure refresh ${_caseid} at memory`)) {
                        document.querySelector('._casecalendar_info._connectcase_info').remove()
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

                if(_action === 'resetdata') {
                    if (confirm("You sure reupdate")) {
                        elm.innerHTML = "Loading...";
                        var _arrlistkey = [
                            'cdtx_scriptsync_auto', 
                            'cdtx_loadgooglesheetpublish_timesave', 
                            'cdtx_loadgooglesheetpublish', 
                            'stylecasebytheme', 
                            'cdtx_caseid_' + document.querySelector('[debug-id="case-id"] .case-id').innerText,
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
                        
                        
                        // Start load crawl
                        loadGoogleSheetOnlineWebPublics(() => {});
                        
                        // Check before reload page
                        setInterval(() => {
                            getChromeStorage("cdtx_loadgooglesheetpublish", (response2) => {
                                var _rs = response2.value || 0;
                                
                                if(_rs) {
                                    location.reload();
                                }
                            });
                        }, 2000);
                        
                        
                        
                    }
                    
                }
                
                
                
                if(_action === 'remove_this_precall') {
                    elm.closest('._note_add_precall').remove();
                }
                
                if(_action === 'note_select') {
                    var _dataselect = elm.getAttribute('data-select');
                    var data_filter = _dataselect.split(',');
                    data_filter = data_filter.filter(n => n);
                    

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
                    // Lưu lại
                    // Đồng thời nhấn lưu luôn:
                    var _save_button = document.querySelector('._infocase_byme.open [data-btnsave][data-caseid]:not(.disable)');
                    if(_save_button) {
                        _save_button.dispatchEvent(new Event('mouseup'));
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
                    var _content = '';
                    if(_link_dfa || _link_ec) {
                        _content = `<small>Access:</small> `;
                        if(_link_dfa) {
                            _content += `<a href="${_link_dfa}" target="_blank">Folder DFA</a>, `;
                        }

                        if(_link_ec) {
                            _content += `<a href="${_link_ec}" target="_blank">Folder EC</a>`;
                        }
                    }
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
                if(_action === '_connectcase_info-act_refresh') {
                    document.querySelector('._casecalendar_info').remove();
                }

                // xxxx
                if(_action === 'ui-qplus-addtrviewall') {
                    var _alla_tagviewdetail = elm.closest('table').querySelectorAll('[data-btnclk="ui-qplus-addtrviewdetail"]');
                    _alla_tagviewdetail.forEach((elm) => {
                        elm.click();
                    })
                }
                
                // xxxx
                if(_action === 'ui-qplus-addtrviewdetail') {
                    var _foneme = () => {
                        var tr = elm.closest('tr');
                        var td = tr.querySelectorAll('td');

                        var iscreate = false;
                        if(tr.nextElementSibling) {
                            console.log(tr.nextElementSibling)
                            console.log(tr.nextElementSibling.getAttribute('data-detailcase'))
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
                                                    <a href="https://cases.connect.corp.google.com/#/case/${_caseid}" target="_blank" >${_caseid}</a>
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

                
                getChromeStorage("cdtx_listmeetlink_all", (response) => {
                    
                    var casesmeet = response.value || {};
                    document.querySelectorAll('[jslog][data-eventid]').forEach(function(elm){
                        var jslog = elm.getAttribute('jslog');
                        var caseid = elm.innerText.match(/\d-\d+/g);
                        if(jslog){
                            var meetid = jslog.match(/\w{3}-\w{4}-\w{3}/g);
                        }

                        if(caseid && meetid){
                            casesmeet[meetid[0]] = caseid[0];
                            // var _temp = {
                            //     meetid: meetid[0],
                            //     caseid: caseid[0]
                            // };
                            
                            // var _issave = true;
                            // casesmeet.forEach(function(item) {
                            //     if(item.meetid == _temp.meetid) {
                            //         _issave = false;
                            //     }
                            // })

                            // if(_issave) {
                            //     casesmeet.push(_temp);
                            // }
                        }

                    }); 
                    // end loop
                    
                    
                    setChromeStorage("cdtx_listmeetlink_all", casesmeet, () => {
                        
                        cLog(() => { console.log("Has update meet all link!", casesmeet); });
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
                var casemessageview_elm_all = document.querySelectorAll(".case-log-container.active-case-log-container case-message-view");
                

                if(casemessageview_elm_all.length > 0) {
                    casemessageview_elm_all.forEach(function(elm){
                        // Tối thiểu
                        if(elm.innerText.includes("Emails or feed")) {
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
            
            getChromeStorage("cdtx_listmeetlink", (response) => {
                var casesmeet = response.value || {};

                window.dataMeetLink = casesmeet;

                console.log('cdtx ', window.dataMeetLink);
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
            var _contenthtml = `
                <span class="_casecalendar_info-50per" data-title="Case ID:"  data-info="case_id" >
                    <a href="https://cases.connect.corp.google.com/#/case/{%case_id%}" target="_blank" data-infocase="case_id" ></a><span class="copycaseid" data-btnclk="copy_attrcopycontent" data-copycontent="${_data.case_id}" ></span>
                    <br>
                    <br>
                    <a href="#" target="_blank" data-linkcasetomeet="1" data-infocase_link="customer_gmeet" ></a>
                </span>
                
                <span class="_casecalendar_info-50per" data-title="Ads ID & Adv name:" >
                    <a href="#" target="_blank" data-infocase="customer_adsid_format" data-infocase_link="customer_adsid_format" ></a><span class="copycaseid" data-btnclk="copy_attrcopycontent" data-copycontent="${_data.customer_adsid}" ></span>
                    <span data-infocase="customer_name" ></span>
                    <span data-infocase="customer_email" ></span>
                </span>
                
                <span class="_casecalendar_info-50per" >
                    <span class="is_hascopyer in_block" data-title="Phone (click to copy): " data-infocase="customer_contact" data-btnclk="copy_innertext" ></span>
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
                <span class="_casecalendar_info-50per" data-title="Tasks:" data-infocase="tasks" ></span>
                <span class="_casecalendar_info-50per" data-title="Attribution Model:" data-infocase="customer_attributionmodel" ></span>
                <span class="_casecalendar_info-50per" data-title="Tool Shortlink:" data-infocase_html="toolshortlink" ></span>
                <span class="_casecalendar_info-100per" data-title="Date Install:" data-infocase="appointment_time" ></span>
                <span class="_casecalendar_info-100per" data-title="Qplus status:"  >
                    <span data-infocase="qplus_status" ></span>
                    <span data-infocase="status_case" style="opacity: 0.8; font-size: 80%" data-title="status on note:" ></span>
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
            _data = mergeObjectNotOverwrite(_data, _data_restructor);
    

            
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
                    _datatmp.customer_website = _data.customer_website.replace(/\s+|\n/gm, "");
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
                    
                    if(key === 'customer_adsid') {
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
                        <a href="https://cases.connect.corp.google.com/#/case/{%case_id%}" target="_blank" data-infocase="case_id" ></a><span class="copycaseid" data-btnclk="copy_attrcopycontent" data-copycontent="${_data.case_id}" ></span>
                        </span>
                        `;
                    }
                    if(key === 'customer_gmeet') {
                        _htmltemp = `<span class="_casecalendar_info-50per" data-title="Meet link:"   ><a href="{%customer_gmeet%}" target="_blank" data-linkcasetomeet="1" data-infocase_link="customer_gmeet"></a></span>
                        `;
                    }
                    
                    _ehtml += _htmltemp;
                }

                if(_data.data_all['Additional info']) {
                    _ehtml += '<span class="_casecalendar_info-100per" data-title="Additional info:" >' + _data.data_all['Additional info'] + '</span>';
                }
                
                _ehtml += '<span class="_casecalendar_info-100per" data-title="Qplus Status:" data-infocase="qplus_status" ></span>';
                _ehtml += '<span class="_casecalendar_info-100per" data-title="Tool Shortlink:" data-infocase_html="toolshortlink" ></span>';
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
                || location.hostname === 'barkeep.corp.google.com'
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
        observeOnce((elm) => {
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
        observeOnce((elm) => {
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
                    // Save case
                    // ========
                        // TH 1: caseid diff caseonce    
                        if(_caseid != _caseid_once) {
                            cLog(() => { console.log("cdtx - TH 1 here", window.dataCase.case_id, _caseid); });

                            var _panel_closebtn = document.querySelector('._infocase_byme.open [data-btnclk="_infocase_byme-openact"]');
                            if(_panel_closebtn) {
                                _panel_closebtn.click();
                            }
                            
                            
                            // addGoCase2Calendar 
                            addGoCase2Calendar(_caseid);
                            
                            
                            saveCaseNow(_caseid, (caseload) => {
                                if(typeof caseload == 'undefined') return false;
                                
                                cLog(() => { console.log('cdtx - TH 1 here -  saveCaseNow - DONE', caseload); });
                                
                                window.caseCurrent = {};
                                window.caseCurrent = caseload;
                                
                                reupdateForAll(caseload);
                                
                                global_checkAddLoadMoreInfo(_caseid);
                                
                                checkInputEmailInboxAndFix();
                                
                                
                                
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

                                    reupdateForAll(caseload);
                                    
                                    
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



                // callUI
                callPhoneDefaultNumber();
            }


            if(location.hostname === 'calendar.google.com') {
                // For reminder
                
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
                                        <a href="https://cases.connect.corp.google.com/#/case/${_caseid}" target="_blank" >${_caseid}</a>
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
                            

                            // Update meetlink now
                            autoUpdatelistLinkCalendar();


                            var _panel = () => { return document.querySelector('[jscontroller="dIQ6id"] ._casecalendar_info'); };


                            if(!window.htmlPanelTemp) {

                                loadCaseStorageByID(_caseid, (response) => {
                                    if(!response.value) return false;
                                    var _data = response.value;
                                    cLog(() => { console.log("cdtx calendar.google.com ", _data); })
                                    
                                    if(_data.case_id) {
                                        // Display content
                                        window.calendarCaseNowCaseID = _data.case_id;
                                        templateDisplay(_panel(), _data);
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
            
            // if(location.hostname === 'barkeep.corp.google.com') {

            //     var is_record = false
            //     var is_qa_recode_show = false
            //     var _pcurrentid = null;
            //     var _pcurrentid_str = '';
            //     var _pcurrent_object = {};

            //     // Check entry
            //     var list_callentry = document.querySelectorAll('#call-history .container .entry');
            //     var _arr_list_callentry = [];
            //     if(list_callentry.length > 0) {
            //         try {
            //             _pcurrentid = list_callentry[0].querySelector('.session-id');
            //             if(_pcurrentid) {
            //                 _pcurrentid_str = _pcurrentid.innerText;
                            
            //                 _pcurrentid_date = list_callentry[0].querySelector('.date').innerText;
            //                 _pcurrentid_time = list_callentry[0].querySelector('.time').innerText;
            //                 _pcurrent_object.id = _pcurrentid_str;
            //                 _pcurrent_object.date = _pcurrentid_date;
            //                 _pcurrent_object.time = _pcurrentid_time;

            //                 list_callentry.forEach(item => {
            //                     var _temp_info = {};
            //                     _temp_info.id = item.querySelector('.session-id').innerText;
            //                     _temp_info.date = item.querySelector('.date').innerText;
            //                     _temp_info.time = item.querySelector('.time').innerText;
            //                     _arr_list_callentry.push(_temp_info);
            //                 })
                            
            //             }
            //             cLog(() => { console.log('cdtx barkeep ', list_callentry.length, _pcurrentid_str); })
            //         } catch (error) {
            //             console.log("cdtx barkeep", error)
            //         }
            //     }

            //     // Check recording 
            //     if(document.querySelector('#consent-yes-button')) {
            //         is_qa_recode_show = true;
            //         cLog(() => { console.log('cdtx barkeep is_qa_recode_show', is_qa_recode_show); })
            //     }

            //     if(document.querySelector('session-panel.footer')) {
            //         if(
            //             document.querySelector('session-panel.footer participant-list-item') 
            //             && document.querySelector('#duration') 
            //         ) {
                        
            //             var _timeduration =  document.querySelector('#duration').innerText.trim().replace(/[^\d]+/g, '');
            //             _timeduration = parseInt(_timeduration);
            //             if(_timeduration % 10 == 0) {
            //                 cLog(() => { console.log('cdtx barkeep load oncall record'); })
            //                 is_record = true;
                            
            //                 if(_pcurrentid) {
            //                     cLog(() => { console.log('cdtx barkeep start', is_record, _pcurrentid.innerText); })
                                
                                
            //                     setChromeStorage("cdtx_caseidcurrentmeet_consentyesbutton", is_qa_recode_show, (response) => {
            //                         cLog(() => { console.log('cdtx barkeep cdtx_caseidcurrentmeet_consentyesbutton', is_qa_recode_show, _pcurrentid_str, _timeduration); })
            //                     });
                                
            //                     // Only qa_record show => OK
            //                     if(is_qa_recode_show == false) {
            //                         // isset last call
            //                         if(_arr_list_callentry.length > 0) {
            //                             getChromeStorage("cdtx_caseidcurrentmeet", (response) => {
            //                                 var _data = response.value || null;
            //                                 if(_data.caseid) {
            //                                     if(_data.datetime) {
            //                                         const date1 = new Date();
            //                                         const date2 = new Date(_data.datetime);
            //                                         const diffTime = Math.abs(date2 - date1);
            //                                         const diffMinute = Math.ceil(diffTime / (1000 * 60)); 

            //                                         if(diffMinute < 5) {
            //                                             _data.pcurrentid = _pcurrentid_str;
            //                                             cLog(() => { console.log('cdtx barkeep load oncall record', _data, diffMinute + " min", _pcurrentid_str, is_record, _timeduration); })
                
                
            //                                             // merge to object
            //                                             _pcurrent_object.meetid = _data.meetid;
            //                                             _pcurrent_object.caseid = _data.caseid;
            //                                             _pcurrent_object.datetime = _data.datetime;
            //                                             _arr_list_callentry = merge2array(_arr_list_callentry, [_pcurrent_object], "id");
    
            //                                             // merge to data
            //                                             getChromeStorage("cdtx_caseidcurrentmeet_pspeakeasy_caseid", (response) => {
            //                                                 var _list_rs = response.value || [];
                                                            
            //                                                 if(typeof _list_rs === 'object') {
            //                                                     _list_rs = merge2array(_arr_list_callentry, _list_rs, "id");
            //                                                     _list_rs = merge2array(_list_rs, [_pcurrent_object], "id");
            
            //                                                     console.log('cdtx list 2', _list_rs, _arr_list_callentry);
            
            //                                                     setChromeStorage("cdtx_caseidcurrentmeet_pspeakeasy_caseid", _list_rs, (response) => {
            //                                                         cLog(() => { console.log('cdtx barkeep cdtx_caseidcurrentmeet_pspeakeasy_caseid have save', _list_rs) })
            //                                                     })
            //                                                 }
                
                
            //                                             });
                                                        
            //                                         } 
                                                    
            //                                     }
            //                                 }
            //                             });     
            //                         }   
            //                     }
                                
            //                 } 
            //             }
                        
            //         }
            //     }

                
            // }

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
                        getChromeStorage("cdtx_listmeetlink_all", (response) => {
                            var casesmeet = response.value || {};
                            // if(casesmeet[_object.case_id]) {
                            for (const [_meetid, _caseid] of Object.entries(casesmeet)) {
                                if(location.pathname.includes(_meetid)) {
                                    cLog(() => { console.log('cdtx meet', _caseid, _caseid); })

                                    loadCaseStorageByID(_caseid, (response) => {
                                            
                                            
                                        cLog(() => { console.log('cdtx response' , response); })

                                        // case id overwrite
                                        

                                        if(!response.value) return false;
                                        _data = response.value;
                                        if(!_data.case_id) return false;

                                        
                                        templateDisplay(_panel, _data);

                                        checkSpeakEasy(_data);


                                        window.meetTimeInv = window.meetTimeInv || null;
                                        clearInterval(window.meetTimeInv); 

                                        window.meetTimeInv = setInterval(() => {
                                            var _temp_obj = {
                                                meetid: _meetid, 
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
                                        
                                    });

                                    break;
                                }
                            }
                            // }
                        });                        
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
    
    

    function loadGoogleSheetOnlineWebPublics(_callback_ready) {
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

                                cLog(() => { console.log("LOADSHEET --- DONE "); });
                                _callback_ready();
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
                cLog(() => { console.log("LOADSHEET --- DONE 2 "); });
                _callback_ready();
            }
        });
    }


    if(window.isdongtest) {
        backdoor_manage_keystorage();
    }


    // LOAD
    loadGoogleSheetOnlineWebPublics(() => {
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
    });
}
