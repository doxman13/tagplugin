

chrome.storage.sync.get({ 
	mycountry: "thailand", 
	ouremail: "xxx@google.com",
	optionkl__modecase: "Auto",
	optionkl__disable_stylebytheme: false,
	optionkl__disable_autofixemail: false,
},
function (result) {

	window.result = result;
	if (result.mycountry == "Other") {
        window.dataTagteam.language = other_language;
        window.dataTagteam.panel_div = other_panel_div;
        window.dataTagteam.panel_div_style = other_panel_div_style;
        window.dataTagteam.api_blog = other_api_blog;
        window.dataTagteam.current_case = {};

        // Focus case code vanbo
        window.dataTagteam.tagteamFocusCase = () => { other_TagteamFocusCase() } ;
        window.dataTagteam.sendFirstEmail = () => { other_sendFirstEmail() } ;
        
        other_tagTeamTDCXLoad(window);
        globalForAll(window);
    }
    
	if (result.mycountry == "Vietnam") {


        var _default_action = () => {
            window.dataTagteam.language = vi_language;
            window.dataTagteam.panel_div = vi_panel_div;
            window.dataTagteam.panel_div_style = vi_panel_div_style;
            window.dataTagteam.api_blog = vi_api_blog;
            window.dataTagteam.current_case = {};
    
            // Focus case code vanbo
            window.dataTagteam.tagteamFocusCase = () => { vi_TagteamFocusCase() } ;
            window.dataTagteam.sendFirstEmail = () => { vi_sendFirstEmail() } ;
			
            vi_tagTeamTDCXLoad(window);
            globalForAll(window);
        }

		load_remote(result, _default_action);
		vi_checkStyleByTheme(result.optionkl__disable_stylebytheme);
	}	
	
	if (result.mycountry == "Thailand") {


        var _default_action = () => {
            window.dataTagteam.language = th_language;
            window.dataTagteam.panel_div = th_panel_div;
            window.dataTagteam.panel_div_style = th_panel_div_style;
            window.dataTagteam.api_blog = th_api_blog;
            window.dataTagteam.current_case = {};
    
            // Focus case code vanbo
            window.dataTagteam.tagteamFocusCase = () => { th_TagteamFocusCase() } ;
            window.dataTagteam.sendFirstEmail = () => { th_sendFirstEmail() } ;
			
            th_tagTeamTDCXLoad(window);
            globalForAll(window);
        }

		load_remote(result, _default_action);
	}

	if (result.mycountry == "English") {


        var _default_action = () => {
            window.dataTagteam.language = en_language;
            window.dataTagteam.panel_div = en_panel_div;
            window.dataTagteam.panel_div_style = en_panel_div_style;
            window.dataTagteam.api_blog = en_api_blog;
            window.dataTagteam.current_case = {};
    
            // Focus case code vanbo
            window.dataTagteam.tagteamFocusCase = () => { en_TagteamFocusCase() } ;
            window.dataTagteam.sendFirstEmail = () => { en_sendFirstEmail() } ;
			
            en_tagTeamTDCXLoad(window);
            globalForAll(window);
        }

		load_remote(result, _default_action);
	}

	// JP
    if (result.mycountry == "Japan") {


        var _default_action = () => {
            window.dataTagteam.language = jp_language;
            window.dataTagteam.panel_div = jp_panel_div;
            window.dataTagteam.panel_div_style = jp_panel_div_style;
            window.dataTagteam.api_blog = jp_api_blog;
            window.dataTagteam.current_case = {};
    
            // Focus case code vanbo
            window.dataTagteam.tagteamFocusCase = () => { jp_TagteamFocusCase() } ;
            window.dataTagteam.sendFirstEmail = () => { jp_sendFirstEmail() } ;
			
            jp_tagTeamTDCXLoad(window);
            globalForAll(window);
        }

		load_remote(result, _default_action);
	}
}
);
