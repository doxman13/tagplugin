try {
    // add bookmark
    // javascript:localStorage.setItem('linhenable', new Date());

    
    // window.linhenable = localStorage.getItem("linhenable") || false;
    // var linhvoLoader = () => {
    //     cLog(() => {console.log("linhvo load", 2023)});
    //     window.loadgooglesheetpublish = window.loadgooglesheetpublish || {};



    //     var is_readygooglesheet = setInterval(() => {
    //         if(Object.keys(window.loadgooglesheetpublish).length > 0) {
    //             cLog(() => console.log('linhvo', window.loadgooglesheetpublish.WFM_helper, window.linhenable));
                
    //             var linhvo_WFM_helper = window.loadgooglesheetpublish.WFM_helper;
    //             var sheettab = linhvo_WFM_helper.sheettab;
                
    //             console.log('linh', sheettab);
    //             // get the webhook value
    //              var webhook_incoming = [];
    //             sheettab.forEach((item) => {
    //                 webhook_incoming.push(item['Incoming webhooks'])
    //             });
    //             console.log('linh webhook_incoming', webhook_incoming); // print the result to Console

    //             // ldap blocked from the trix
    //             var _list_blocked_lap = [];
    //             sheettab.forEach((item) => {
    //                 _list_blocked_lap.push(item['Blocked Ldap'])
    //             });
                
    //             console.log('linh _list_blocked_lap', _list_blocked_lap); // print the result to Console

    //             // ldap English team
    //             var english_Ldap = [];
    //             sheettab.forEach((item) => {
    //                 if (item['English'] != ""){
    //                 english_Ldap.push(item['English'])
    //                 }
    //             });
    //             console.log('linh english_Ldap', english_Ldap); // print the result to Console
    //             // Timer
    //             var Timer = [];
    //             sheettab.forEach((item) => {
    //                 if (item['Timer'] != ""){
    //                 Timer.push(item['Timer'])
    //                 }
    //             });
    //             console.log('linh Timer', Timer); // print the result to Console
                
    //             // Stop load sheet
    //             clearInterval(is_readygooglesheet);



    //             // // ====

    //             // if(window.linhenable) {
    //             //     document.body.classList.add('cdtx_linhenable');
    //             // }

    //             // var _loadbotonce = () => {
    //             //     if(!document.body.classList.contains('cdtx_linhenable_botrun')) {
    //             //         document.body.classList.add('cdtx_linhenable_botrun');
    //             //         //  === ACTION



    //             //         //  === END ACTION
    //             //     }
    //             // };
    //             // onClickElm('[data-btnlinhvoclk]', 'click', function(elm, e){
    //             //     try {
    //             //         var _action = elm.getAttribute("data-btnlinhvoclk");
    //             //         // loadbot
    //             //         if(_action === 'loadbot') {
    //             //             if(window.loadgooglesheetpublish.BotRun) {
    //             //                 var ldap = window.loadgooglesheetpublish.BotRun.sheettab[0].ldap;
    //             //                 var access_key = window.loadgooglesheetpublish.BotRun.sheettab[0].access_key;

    //             //                 var _key = ldap + ':' + access_key

    //             //                 if(localStorage.getItem('linh_ldap_run') == _key) {
    //             //                     alert("running");
    //             //                     _loadbotonce();
    //             //                 } else {
    //             //                     var _prompt = prompt("Enter your ldap", "tommorow");
    //             //                     if (_prompt == _key) { 
    //             //                         localStorage.setItem('linh_ldap_run', _key);
    //             //                         alert('success -> run')
    //             //                         _loadbotonce();
    //             //                     }  
    //             //                 }
            
    //             //             }

    //             //         }
    //             //     } catch (error) {
    //             //         console.error('linhvo', error);
    //             //     }
    //             // });
                


    //         }
    //     })
        
        
    // }
    var linhvoLoader = () => {

        // ADD MENU LINK
        function addMenuLinkCase() {
            if(location.hostname !== 'cases.connect.corp.google.com') return false;

            getChromeStorage("cdtx_loadgooglesheetpublish", (response) => {
                var _lstbtn = [];
                
                
                
                for (let i = 1; i < 9; i++) {
                    if(_name = getVariableSheetByKeyAndLanguage(`shortcut${i}_name`, window.keylanguage)) {
                        _lstbtn.push({
                            'name': _name,
                            'link': getVariableSheetByKeyAndLanguage(`shortcut${i}_link`, window.keylanguage),
                        })    
                    }
                }
                // console.log('LINHVO ADD MENU LINK 3', location.host, linkchk_10days_name, linkchk_10days_link);
                
                
                observeOnce((elm) => {
                    
                    cLog(() => { console.log('observeOnce - linhvoLoader' ) })
                    
                    var _navi = document.querySelectorAll('queues-navigation .section');
        
                   
                    if(_navi.length > 0) {
                        _lstbtn.forEach((_item, _index) => {
                            var _id = `cdtx_navylink${_index}`;
                            var _navi_html = `<a href="${_item.link}" id="${_id}" class="nav-item cdtx_navylink" 
                                style="margin: 10px 24px;
                                font-weight: 500;
                                color: #673AB7;
                                display: block;
                            "
                            
                            >${_item.name}</a>`;
                    
                            if(!_navi[0].querySelector('#' + _id)) {
                                _navi[0].insertAdjacentHTML('beforeEnd', _navi_html);
                            }    
                        })
                        
                    }
                });
            });
        }
        addMenuLinkCase();
        
        // TOOL RUN
        var _href_run = 'https://spewall-backend-uat.corp.google.com/ssr';
        if(location.href.startsWith(_href_run)) {

            var _isrun_loadfn = (dom) => {
                if (document.location.search.includes("GCARE_WEBTECH")){

                     console.log('Starting');
                        contains = (selector, text) => {
                        var elements = document.querySelectorAll(selector);
                        return Array.prototype.filter.call(elements, function(element){return RegExp(text).test(element.textContent); });
                    }
                            dimension = contains('.row','gCare WebTech')[0].innerText.replace(/sentiment_satisfied|sentiment_very_satisfied/g, '').split('\t');
                            VN_metric = contains('.row','Technical Solutions-VN-LT')[0].innerText.split('\t');
                            VN_metric.map(function(x){ return x.replace(/[^0-9\.:]+/g, "")});
                    
                                var waiting =  VN_metric[1];
                                var wait_time = VN_metric[2];
                                var available = VN_metric[3];
                                var on_call = VN_metric[4];
                                var after_call = VN_metric[5];
                                var not_ready = VN_metric[6];
                    
                            var time_stamp = document.querySelector('[class="date"]').innerText;
                        
                                sessionStorage.setItem("waiting", waiting);
                                sessionStorage.setItem("wait_time", wait_time);
                                sessionStorage.setItem("available", available);
                                sessionStorage.setItem("on_call", on_call);
                                sessionStorage.setItem("after_call", after_call);
                                sessionStorage.setItem("not_ready", not_ready);
                                sessionStorage.setItem("time_stamp", time_stamp);
                            
                        
                        var url = 'https://chat.googleapis.com/v1/spaces/AAAANuXXRCc/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=22YYP7Spi9z-OQ4KYV8ZQ75F6k-QXOcmR6_jjkUSZY8';
                        
                        if (waiting !='0'){
                            text = "waiting: " + waiting + "\n" + "available: " + available +  "on_call: " + on_call + " " + "after_call: " + after_call + " " + "not_ready: " + not_ready;
                            text.replace(/error/g, "");
                                const xhr = new XMLHttpRequest();
                                xhr.open("POST", url);
                                xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
                                const body = JSON.stringify({
                                    text: text
                                });
                                xhr.onload = () => {
                                    console.log(xhr)
                                }
                                xhr.send(body);
                                }
                 }
                 
                setInterval(() => {
                    console.log('LINHVO TOOL RUN - RUNING MAN');
                }, 400);
            }

            
            getChromeStorage('cdtx_isruntool', (response) => {
                var rsvalue = response.value;
                var isrun = (rsvalue === formatDate(new Date(), 'Y-m-d')) ? true: false;
                

                observeOnce((elm) => {
                    var _cdtx_isrunbtn = document.querySelector('.cdtx_isrunbtn');
                    if(!_cdtx_isrunbtn) {
                        
                        const dom = document.createElement("button");
                        dom.innerText = 'RUN';
                        dom.setAttribute('style', `
                            display: inline-block;
                            border: 1px solid #bbb7b7;
                            line-height: 0;
                            padding: 11px;
                            border-radius: 4px;
                            color: #444;
                            font-weight: 700;
                            text-shadow: 1px 1px 2px #fff;
                            background-color: #eee;
                            margin-right: 6px;
                            cursor: pointer;
                            font-size: 12px;
                            text-decoration: none;
                            white-space: nowrap;
                            user-select: none;
                            position: fixed;
                            bottom: 10px;
                            left: 10px;
                        `);
                        dom.className = 'cdtx_isrunbtn ' + (isrun ? 'isrun' : '' );


                        // IS LOADING
                        if(isrun) {
                            _isrun_loadfn();
                            dom.innerText = "LOADING";
                        }

                        var _listkey = [
                            'AAA',
                            'BBB',
                        ];

                        dom.addEventListener('click', () => {
                            if(!isrun) {
                                var _key = prompt("Enter key", "");
                                if(!_listkey.includes(_key)) {
                                    alert('WRONG');

                                    return;
                                }
                                
                                dom.innerText = "WAIT ... ";
                            }

                            setChromeStorage('cdtx_isruntool', (!isrun ? formatDate(new Date(), 'Y-m-d') : ''), (response) => {
                                // console.log('Link', 'DONE', isrun, response);
                                if(isrun) {
                                    if(window.confirm("Your sure stop?")) {
                                        dom.classList.remove('isrun');
                                        dom.innerText = "RUN";
                                        isrun = false;
    
                                        location.reload();
                                    }
                                } else {

                                    dom.classList.add('isrun');
                                    dom.innerText = "LOADING";
                                    isrun = true;
                                    
                                    if(isrun) {
                                        _isrun_loadfn();
                                    }
                                }

                            })
                        })
    
    
                        document.body.insertAdjacentElement("afterEnd", dom);
                    }
                })
            });
        }


    }

} catch (error) {
    console.error('linhvo', error);
}