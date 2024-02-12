chrome.storage.sync.get({
    mycountry: "thailand",
    ouremail: "xxx@google.com",
    optionkl__modecase: "Auto",
    optionkl__disable_dialog: false,
    optionkl__enable_sf_helper: false,
    optionkl__inputyourname: false,
    optionkl__form_option_data: false,
},
    function (result) {

        window.result = result;
        window.tagteamoption = result;
        
        cLog(() => {
            console.log("INIT START",  location.hostname, window.result);
            
        });
        
        var _default_action = () => {
            window.dataTagteam.current_case = {};

            globalForAll(window);
            global_case(window.result.optionkl__disable_dialog);
            vanBoCodeHere();
            linhvoLoader();
        }


        
        // =======================
        // INIT LOAD
        // =======================
        
        var _once_load = 0;
        loadGoogleSheetOnlineWebPublics(() => {
            if(_once_load === 0) {
                _once_load = _once_load + 1;
                load_remote(result, _default_action);
                window.isloadgooglesheetonlinewebpublics = true;
            }
        });

    
    }
);
