
console.log('a123123123');
chrome.storage.sync.get({ 
	mycountry: "thailand", 
	ouremail: "xxx@google.com",
	optionkl__modecase: "Auto",
	optionkl__disable_stylebytheme: false,
	optionkl__disable_autofixemail: false,
},
function (result) {

	window.result = result;
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

	// // Update file overwrite /tagteams/groups
	// if (result.mycountry == "Japan") {
		// window.dataTagteam.language = ja_language;
		// window.dataTagteam.panel_div = ja_panel_div;
		// window.dataTagteam.api_blog = ja_api_blog;

		// // Focus case code vanbo
		// window.dataTagteam.tagteamFocusCase = () => { ja_TagteamFocusCase() } ;
		// window.dataTagteam.sendFirstEmail = () => { ja_sendFirstEmail() } ;
		
		// ja_tagTeamTDCXLoad();
	// }


	// // Update file overwrite /tagteams/groups
	// if (result.mycountry == "Thailan") {
		// window.dataTagteam.language = thailan_language;
		// window.dataTagteam.panel_div = thailan_panel_div;
		// window.dataTagteam.api_blog = thailan_api_blog;

		// // Focus case code vanbo
		// window.dataTagteam.tagteamFocusCase = () => { thailan_TagteamFocusCase() } ;
		// window.dataTagteam.sendFirstEmail = () => { thailan_sendFirstEmail() } ;
		
		// thailan_tagTeamTDCXLoad();
	// }
	
}
);
