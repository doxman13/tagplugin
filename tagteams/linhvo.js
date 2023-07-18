try {
    // add bookmark
    // javascript:localStorage.setItem('linhenable', new Date());

function getChromeStorageHelper(key, _callback = false) {
    chrome.runtime.sendMessage({method: 'fe2bg_chromestorage_get', key: key}, (response) => {
        if(_callback !== false) {
            response = response || {};
            _callback(response);
        }
    });
}


getChromeStorageHelper("cdtx_loadgooglesheetpublish", (response2) => {
    var _rs = response2.value;
    if(_rs) {
        var linhvo_WFM_helper = _rs.WFM_helper;
        var sheettab = linhvo_WFM_helper.sheettab;
        
        
                // console.log('linh', sheettab);
                // get the webhook value
                 var webhook_incoming = [];
                sheettab.forEach((item) => {
                    webhook_incoming.push(item['Incoming webhooks'])
                });
                // console.log('linh webhook_incoming', webhook_incoming); // print the result to Console

                // ldap blocked from the trix
                var _list_blocked_lap = [];
                sheettab.forEach((item) => {
                    _list_blocked_lap.push(item['Blocked Ldap'])
                });
                
                // console.log('linh _list_blocked_lap', _list_blocked_lap); // print the result to Console

                // ldap English team
                var english_Ldap = [];
                sheettab.forEach((item) => {
                    if (item['English'] != ""){
                    english_Ldap.push(item['English'])
                    }
                });
                // console.log('linh english_Ldap', english_Ldap); // print the result to Console
                // Timer
                var Timer = [];
                sheettab.forEach((item) => {
                    if (item['Timer'] != ""){
                    Timer.push(item['Timer'])
                    }
                });
                // console.log('linh Timer', Timer); // print the result to Console
        
    }
});    

    
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
    var linhvoLoader = () => {}

} catch (error) {
    console.error('linhvo', error);
}