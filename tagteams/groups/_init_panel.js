var _addshortcutbtn = () => {
    var _panel_addshortcutbtn = document.querySelector(".dock-container._panel_btnshortcut");
    if(!_panel_addshortcutbtn) {
        var dock_container = document.querySelector(".dock-container");
        if(dock_container) {
            var strhtml = `<div class="dock-container _panel_btnshortcut">`;

            if(window.tagteamoption.optionkl__disable_dialog === false) {
                strhtml += `<div class="material-button" data-btnclk="open_panelnote" >
                        <div class="content">
                            <img src="${window.dataTagteam.assets_url_img}/355037/google.svg">
                        </div>
                    </div>`;
                
                // strhtml += `<div class="material-button _panel_shortcut_toggleopenmain_withoutsave"  >
                //         <div class="content">
                //             <img src="${window.dataTagteam.assets_url_img}/355037/google.svg">
                //         </div>
                //     </div>`;
            }

            strhtml += `
                <div class="material-button _panel_shortcut_openemailtemplate"  >
                    <div class="content">
                        <img src="${window.dataTagteam.assets_url_img}/194000/mail.svg">
                    </div>
                </div>
                <div class="material-button _panel_shortcut_fisrtemail"  >
                    <div class="content">
                        <img src="${window.dataTagteam.assets_url_img}/67628/email.svg">
                    </div>
                </div>
                <a href="http://go/teamVN" target="_blank" class="material-button _panel_shortcut_go_teamvietnam" data-textview="Hôm nay bạn chưa ghé go/TeamVN thì phải?"  >
                    <img src="${window.dataTagteam.assets_url_img}/pepe-4chan.gif">
                    <span class="content"></span>
                </a>
            </div>`;
            
            var dock_container_add = _TrustScript(strhtml);
            // // Open
            // document.querySelector('[data-btnaction="openmain"]').click();
            dock_container.insertAdjacentHTML("afterEnd", dock_container_add);
            if(document.querySelector('._panel_shortcut_toggleopenmain_withoutsave')) {
                document.querySelector('._panel_shortcut_toggleopenmain_withoutsave').addEventListener("click", (e) => {
                    var is_open = toggleClass("mainpanel_template", document.documentElement);

                    document.documentElement.classList.remove("email_template");

                    if(is_open) {
                        document.documentElement.classList.remove("_hide_main");
                        panel_div.classList.remove("hide_main");

                        var _panels = panel_div.querySelectorAll(`[data-panel]`);
                        _panels.forEach((elm) => {
                            elm.classList.remove("active");
                        });

                        var _panel_elm_email = panel_div.querySelector(`[data-panel="main"]`);
                        _panel_elm_email.classList.add("active");
                    } else {
                        document.documentElement.classList.add("_hide_main");
                        panel_div.classList.add("hide_main");
                    }

                });
            }

            document.querySelector('._panel_shortcut_openemailtemplate').addEventListener("click", (e) => {
                var is_open = toggleClass("email_template", document.documentElement);

                document.documentElement.classList.remove("mainpanel_template");

                if(is_open) {
                    document.documentElement.classList.remove("_hide_main");
                    panel_div.classList.remove("hide_main");

                    var _panels = panel_div.querySelectorAll(`[data-panel]`);
                    _panels.forEach((elm) => {
                        elm.classList.remove("active");
                    });

                    var _panel_elm_email = panel_div.querySelector(`[data-panel="email-template"]`);
                    _panel_elm_email.classList.add("active");
                } else {
                    document.documentElement.classList.add("_hide_main");
                    panel_div.classList.add("hide_main");
                }
                
            });



            // go/TeamVn
            var _timekey_current = new Date().getDate();
            getChromeStorage('goTeamVNToDay', (response) => {
                var _timestorage = response.value || false;
                if(_timestorage != _timekey_current) {
                    document.querySelector('._panel_shortcut_go_teamvietnam').classList.add('notview_today');
                }
            });

            document.querySelector('._panel_shortcut_go_teamvietnam').addEventListener("click", (e) => {
                // sessionStorage.setItem("goTeamVNToDay", _timekey_current);
                setChromeStorage('goTeamVNToDay', _timekey_current);

                e.target.remove();
            });

            
        }
        
    }
};