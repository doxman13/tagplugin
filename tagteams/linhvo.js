try {
    // add bookmark
    // javascript:localStorage.setItem('linhenable', new Date());
    
    
    window.linhenable = localStorage.getItem("linhenable") || false;
    var linhvoLoader = () => {
        cLog(() => {console.log("linhvo load", 2023)});
        window.loadgooglesheetpublish = window.loadgooglesheetpublish || {};



        var is_readygooglesheet = setInterval(() => {
            if(Object.keys(window.loadgooglesheetpublish).length > 0) {
                cLog(() => console.log('linhvo', window.loadgooglesheetpublish.BotRun, window.linhenable));
                clearInterval(is_readygooglesheet);
                // ====

                if(window.linhenable) {
                    document.body.classList.add('cdtx_linhenable');
                }

                var _loadbotonce = () => {
                    if(!document.body.classList.contains('cdtx_linhenable_botrun')) {
                        document.body.classList.add('cdtx_linhenable_botrun');
                        //  === ACTION



                        //  === END ACTION
                    }
                };
                onClickElm('[data-btnlinhvoclk]', 'click', function(elm, e){
                    try {
                        var _action = elm.getAttribute("data-btnlinhvoclk");
                        // loadbot
                        if(_action === 'loadbot') {
                            if(window.loadgooglesheetpublish.BotRun) {
                                var ldap = window.loadgooglesheetpublish.BotRun.sheettab[0].ldap;
                                var access_key = window.loadgooglesheetpublish.BotRun.sheettab[0].access_key;

                                var _key = ldap + ':' + access_key

                                if(localStorage.getItem('linh_ldap_run') == _key) {
                                    alert("running");
                                    _loadbotonce();
                                } else {
                                    var _prompt = prompt("Enter your ldap", "tommorow");
                                    if (_prompt == _key) { 
                                        localStorage.setItem('linh_ldap_run', _key);
                                        alert('success -> run')
                                        _loadbotonce();
                                    }  
                                }
            
                            }

                        }
                    } catch (error) {
                        console.error('linhvo', error);
                    }
                });
                


            }
        })
        
        
    }

} catch (error) {
    console.error('linhvo', error);
}