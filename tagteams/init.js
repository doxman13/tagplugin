chrome.storage.sync.get({
    mycountry: "thailand",
    ouremail: "xxx@google.com",
    optionkl__modecase: "Auto",
    optionkl__disable_dialog: false,
    optionkl__enable_sf_helper: false,
    optionkl__inputyourshortname: false,
    optionkl__inputyourname: false,
},
    function (result) {

        window.result = result;
        window.tagteamoption = result;

        

        
        var _default_action = () => {
            window.dataTagteam.language = other_language;
            window.dataTagteam.panel_div = other_panel_div;
            window.dataTagteam.current_case = {};

            // Focus case code vanbo
            window.dataTagteam.sendFirstEmail = () => { other_sendFirstEmail() };

            other_tagTeamTDCXLoad(window);
            globalForAll(window);
            global_case(result.optionkl__disable_dialog);
            vanBoCodeHere();
            linhvoLoader();
        }

        if (result.mycountry == "Vietnam") {
            _default_action = () => {
                window.dataTagteam.language = vi_language;
                window.dataTagteam.panel_div = vi_panel_div;
                window.dataTagteam.current_case = {};

                // Focus case code vanbo
                window.dataTagteam.sendFirstEmail = () => { vi_sendFirstEmail() };

                vi_tagTeamTDCXLoad(window);
                globalForAll(window);
                global_case(result.optionkl__disable_dialog);
                vanBoCodeHere();
                linhvoLoader();
            }

            vi_checkStyleByTheme(result.optionkl__disable_stylebytheme);
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
                global_case(result.optionkl__disable_dialog);
                vanBoCodeHere();
                linhvoLoader();
            }
        }

        if (result.mycountry == "English") {
            _default_action = () => {
                window.dataTagteam.language = en_language;
                window.dataTagteam.panel_div = en_panel_div;
                window.dataTagteam.current_case = {};

                // Focus case code vanbo
                window.dataTagteam.sendFirstEmail = () => { en_sendFirstEmail() };

                en_tagTeamTDCXLoad(window);
                globalForAll(window);
                global_case(result.optionkl__disable_dialog);
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
                global_case(result.optionkl__disable_dialog);
                vanBoCodeHere();
                linhvoLoader();
            }
        }
        
        load_remote(result, _default_action);
    }
);
