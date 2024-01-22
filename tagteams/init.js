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
            window.dataTagteam.language = other_language;
            window.dataTagteam.panel_div = other_panel_div;
            window.dataTagteam.current_case = {};


            other_tagTeamTDCXLoad(window);
            globalForAll(window);
            global_case(window.result.optionkl__disable_dialog);
            vanBoCodeHere();
            linhvoLoader();
        }


        if (result.mycountry == "Thailand") {
            _default_action = () => {
                window.dataTagteam.language = th_language;
                window.dataTagteam.panel_div = th_panel_div;
                window.dataTagteam.current_case = {};

                // Focus case code vanbo
                window.dataTagteam.sendFirstEmail = () => { th_sendFirstEmail() };

                th_tagTeamTDCXLoad(window);
                globalForAll(window);
                global_case(window.result.optionkl__disable_dialog);
                vanBoCodeHere();
                linhvoLoader();
            }
        }


        // JP
        if (result.mycountry == "Japan") {
            _default_action = () => {
                window.dataTagteam.language = jp_language;
                window.dataTagteam.panel_div = jp_panel_div;
                window.dataTagteam.current_case = {};

                // Focus case code vanbo
                window.dataTagteam.sendFirstEmail = () => { jp_sendFirstEmail() };

                jp_tagTeamTDCXLoad(window);
                globalForAll(window);
                global_case(window.result.optionkl__disable_dialog);
                vanBoCodeHere();
                linhvoLoader();
            }
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
