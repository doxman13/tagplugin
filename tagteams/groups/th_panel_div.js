// ._panel_btnshortcut {
//     position: relative
// }
// ._panel_btnshortcut:after {
//     content: "1. Missing Precall\A 2. Is GCC";
//     background: #F44336;
//     border: 1px solid #fff;
//     border-left: 0;
//     color: #fff;
//     font-size: 12px;
//     display: block;
//     font-weight: bold;
//     position: absolute;
//     left: 100%;
//     top: 30px;
//     height: auto;
//     width: 100px;
//     padding: 5px 10px;
//     z-index: 99999;
//     border-radius: 0 5px 5px 0;
//     opacity: 0.9;
//     white-space: pre-wrap;
// }




// tagteamext_demo-th_panel_div.js.php
var th_list_emailtemplatecontent = {
    'first_email': ``,
    'send_google_meet_link': ``,
    'as_reschedule_1':`` ,
    'so_verified': ``,
    'ni_attempted_contact': ``,
    'in_not_reachable': ``,
    'so_verification_not_needed': ``,
    'ni_awaiting_validation': ``,

};

var th_panel_div_style = `<style></style>`;
    

var th_email_temp = `
    <div class="_emailtemp">
    </div>
`;
var th_panel_div = `
    <div id="_panel_div" class="_panel active minisize hide_toolbar hide_opentiptutorial hide_opensetting hide_emailtemplate hide_firstemail hide_main" >
        
        <div class="_panel_toolbarmove" style="opacity: 0; display: none;">
            <span data-btnaction="move"><svg width="48px" height="48px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" fill="white" fill-opacity="0.01" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19 10.3075C19 12.6865 17.2091 14.615 15 14.615C12.7909 14.615 11 12.6865 11 10.3075C11 7.92854 12.7909 6 15 6C17.2091 6 19 7.92854 19 10.3075ZM15 28.615C17.2091 28.615 19 26.6865 19 24.3075C19 21.9285 17.2091 20 15 20C12.7909 20 11 21.9285 11 24.3075C11 26.6865 12.7909 28.615 15 28.615ZM15 42.615C17.2091 42.615 19 40.6865 19 38.3075C19 35.9285 17.2091 34 15 34C12.7909 34 11 35.9285 11 38.3075C11 40.6865 12.7909 42.615 15 42.615Z" fill="black" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M37 10.3075C37 12.6865 35.2091 14.615 33 14.615C30.7909 14.615 29 12.6865 29 10.3075C29 7.92854 30.7909 6 33 6C35.2091 6 37 7.92854 37 10.3075ZM33 28.615C35.2091 28.615 37 26.6865 37 24.3075C37 21.9285 35.2091 20 33 20C30.7909 20 29 21.9285 29 24.3075C29 26.6865 30.7909 28.615 33 28.615ZM33 42.615C35.2091 42.615 37 40.6865 37 38.3075C37 35.9285 35.2091 34 33 34C30.7909 34 29 35.9285 29 38.3075C29 40.6865 30.7909 42.615 33 42.615Z" fill="black" />
                </svg>
            </span>
            <span class="_panel_btntinhnang" data-btnaction="openmain" style="background-image: url('${window.dataTagteam.assets_url_img}/355037/google.svg')"></span>
            <span class="_panel_btntinhnang" data-btnaction="firstemail" style="background-image: url('${window.dataTagteam.assets_url_img}/67628/email.svg')"></span>
            <span class="_panel_btntinhnang" data-btnaction="openemailtemplate" style="background-image: url('${window.dataTagteam.assets_url_img}/194000/mail.svg')"></span>
            <span class="_panel_btntinhnang" data-btnaction="opentiptutorial" style="background-image: url('${window.dataTagteam.assets_url_img}/372881/java.svg')"></span>
            <span class="_panel_btntinhnang" data-btnaction="opensetting" style="background-image: url('${window.dataTagteam.assets_url_img}/418085/setting.svg')"></span>
        </div>
        <form action="" method="post" id="formCase">
            <div class="_panel_group" data-group="main">
                <div data-panel="main" class="active">
                    <div class="_panel__heading">
                        <div class="_panel__heading--group">
                            <span class="_panel__heading--close" data-btnaction="hide_panel"><img src="${window.dataTagteam.assets_url_img}/315851/close.svg" alt="" srcset=""></span>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="" srcset="">
                        </div>
                        <div class="_panel__heading--group">
                            <span class="_panel_btn _panel_btn--small" data-btnaction="toggle_minisize_panel">Mini</span>
                            <span class="_panel_btn _panel_btn--small" data-btnaction="toggle_panel_darkmode">Darkmode</span>
                        </div>
                    </div>
                    <div class="_panel__inner">
                        <div class="btn--group _panel__topsticky_toolbar">
                            <div class="_panel__topsticky_toolbar-gr">
                                <span class="_panel_btn _panel_btn--small btn--svg" data-btnaction="case_pin" title="Pin Case">
                                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="122.879px" height="122.867px" viewBox="0 0 122.879 122.867" enable-background="new 0 0 122.879 122.867" xml:space="preserve">
                                        <g>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M83.88,0.451L122.427,39c0.603,0.601,0.603,1.585,0,2.188l-13.128,13.125 c-0.602,0.604-1.586,0.604-2.187,0l-3.732-3.73l-17.303,17.3c3.882,14.621,0.095,30.857-11.37,42.32 c-0.266,0.268-0.535,0.529-0.808,0.787c-1.004,0.955-0.843,0.949-1.813-0.021L47.597,86.48L0,122.867l36.399-47.584L11.874,50.76 c-0.978-0.98-0.896-0.826,0.066-1.837c0.24-0.251,0.485-0.503,0.734-0.753C24.137,36.707,40.376,32.917,54.996,36.8l17.301-17.3 l-3.733-3.732c-0.601-0.601-0.601-1.585,0-2.188L81.691,0.451C82.295-0.15,83.279-0.15,83.88,0.451L83.88,0.451z" />
                                        </g>
                                    </svg>
                                </span>
                                <!-- <span class="_panel_btn _panel_btn--small _panel_btn--iconimg" data-btnaction="load_casecurrent" title="Load Current">
                                    <img src="${window.dataTagteam.assets_url_img}/311132/reading-list.svg">
                                </span> -->
                                <span class="_panel_btn _panel_btn--small _panel_btn--iconimg" data-btnaction="loadscript" title="Script Reading">
                                    <img src="${window.dataTagteam.assets_url_img}/311132/reading-list.svg">
                                </span>
                                <span class="_panel_btn _panel_btn--small _panel_btn--iconimg" data-btnaction="email-template" title="Email Template">
                                    <img src="${window.dataTagteam.assets_url_img}/194000/mail.svg">
                                </span>
                                <span class="_panel_btn _panel_btn--small _panel_btn--iconimg _panel_btn--iconimg-text" data-btnaction="list-case" title="List Case">
                                    <img src="${window.dataTagteam.assets_url_img}/25196/list.svg">
                                    List case
                                </span>
                                <span class="_panel_btn _panel_btn--small _panel_btn--iconimg" data-btnaction="opensetting" title="Setting">
                                    <img src="${window.dataTagteam.assets_url_img}/418085/setting.svg">
                                </span>
                                <span class="_panel_btn _panel_btn--small _panel_btn--iconimg" data-btnaction="opentiptutorial" title="Setting">
                                    <img src="${window.dataTagteam.assets_url_img}/372881/java.svg">
                                </span>
                                <span class="_panel_btn _panel_btn--small _panel_btn--icon" data-btnaction="crawl_case" title="Scan again value">
                                    <img src="${window.dataTagteam.assets_url_img}/105981/reload.svg" alt="" srcset="">
                                </span>
                                <button type="submit" action="save" class="_panel_btn _panel_btn--small">SAVE</button>
                            </div>
                        </div>
                        <div class="_panel__linear-progress small">
                            <div class="bar bar1"></div>
                            <div class="bar bar2"></div>
                        </div>
                        <div class="_panel__tabs--allcolumn">
                            <div class="_panel__tabs--allcolumn_detail">
                                <div class="_panel__tabs--area">
                                    <div class="_panel__notification">
                                    </div>
                                    <div class="_panel__caseview">
                                        <div class="_panel__form">
                                            <div class="_panel__form--column">
                                                <div class="_panel__form--panel">
                                                    Case ID: <span data-infocase="case_id">CASEID</span>
                                                    <a href="#" data-infocase_link="case_id" target="_blank">
                                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 489.3 489.3" style="enable-background:new 0 0 489.3 489.3;" xml:space="preserve">
                                                            <g>
                                                                <path d="M476.95,0H12.35c-6.8,0-12.2,5.5-12.2,12.2V235c0,6.8,5.5,12.2,12.2,12.2s12.3-5.5,12.3-12.2V24.5h440.2v440.2h-211.9 c-6.8,0-12.3,5.5-12.3,12.3s5.5,12.3,12.3,12.3h224c6.8,0,12.3-5.5,12.3-12.3V12.3C489.25,5.5,483.75,0,476.95,0z" />
                                                                <path d="M0.05,476.9c0,6.8,5.5,12.3,12.2,12.3h170.4c6.8,0,12.3-5.5,12.3-12.3V306.6c0-6.8-5.5-12.3-12.3-12.3H12.35 c-6.8,0-12.2,5.5-12.2,12.3v170.3H0.05z M24.55,318.8h145.9v145.9H24.55V318.8z" />
                                                                <path d="M222.95,266.3c2.4,2.4,5.5,3.6,8.7,3.6s6.3-1.2,8.7-3.6l138.6-138.7v79.9c0,6.8,5.5,12.3,12.3,12.3s12.3-5.5,12.3-12.3 V98.1c0-6.8-5.5-12.3-12.3-12.3h-109.5c-6.8,0-12.3,5.5-12.3,12.3s5.5,12.3,12.3,12.3h79.9L222.95,249 C218.15,253.8,218.15,261.5,222.95,266.3z" />
                                                            </g>
                                                        </svg>
                                                    </a>
                                                    <br>
                                                    Ads ID: <strong>
                                                        <span data-infocase="customer_adsid_format">123-321-0000</span>
                                                    </strong>
                                                    <a href="#" data-infocase_link="customer_ocid" target="_blank">
                                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 489.3 489.3" style="enable-background:new 0 0 489.3 489.3;" xml:space="preserve">
                                                            <g>
                                                                <path d="M476.95,0H12.35c-6.8,0-12.2,5.5-12.2,12.2V235c0,6.8,5.5,12.2,12.2,12.2s12.3-5.5,12.3-12.2V24.5h440.2v440.2h-211.9 c-6.8,0-12.3,5.5-12.3,12.3s5.5,12.3,12.3,12.3h224c6.8,0,12.3-5.5,12.3-12.3V12.3C489.25,5.5,483.75,0,476.95,0z" />
                                                                <path d="M0.05,476.9c0,6.8,5.5,12.3,12.2,12.3h170.4c6.8,0,12.3-5.5,12.3-12.3V306.6c0-6.8-5.5-12.3-12.3-12.3H12.35 c-6.8,0-12.2,5.5-12.2,12.3v170.3H0.05z M24.55,318.8h145.9v145.9H24.55V318.8z" />
                                                                <path d="M222.95,266.3c2.4,2.4,5.5,3.6,8.7,3.6s6.3-1.2,8.7-3.6l138.6-138.7v79.9c0,6.8,5.5,12.3,12.3,12.3s12.3-5.5,12.3-12.3 V98.1c0-6.8-5.5-12.3-12.3-12.3h-109.5c-6.8,0-12.3,5.5-12.3,12.3s5.5,12.3,12.3,12.3h79.9L222.95,249 C218.15,253.8,218.15,261.5,222.95,266.3z" />
                                                            </g>
                                                        </svg>
                                                    </a>
                                                    <br>
                                                    <a href="#" data-infocase_link="customer_gmeet" target="_blank"></a>
                                                </div>
                                                <div class="_panel__form--panel">
                                                    Customer: <strong><span data-infocase="customer_name">CUSTOMER_NAME</span></strong> (<select name="customer_gender" class="select_inline">
                                                        <option value="bạn">Bạn</option>
                                                        <option value="anh">Anh</option>
                                                        <option value="chị">Chị</option>
                                                    </select>) (<span data-infocase="customer_email">zzz@ccc.com</span>)
                                                    <br>
                                                    Website: <a href="#" data-infocase="customer_website" target="_blank">CUSTOMER_WEBSITE</a><br>
                                                    Contact: <strong><span data-infocase="customer_contact">CUSTOMER_CONTACT</span></strong><br>
                                                    <br>
                                                    Status+:
                                                    <div class="_gr_qlus_status">
                                                        <span data-infocase="qlus_status">QLUS_STATUS</span>
                                                        <label for="qlus_status" ><img src="${window.dataTagteam.assets_url_img}/414882/chevron-down-arrow.svg" >
                                                            <select name="qlus_status" id="qlus_status">
                                                                <option value="ZZZZ">ZZZZ</option>
                                                                <option value="AS - Work in Progress">AS - Work in Progress</option>
                                                                <option value="AS - Reschedule 1">AS - Reschedule 1</option>
                                                                <option value="AS - Reschedule 2">AS - Reschedule 2</option>
                                                                <option value="AS - Acceptable Reschedule">AS - Acceptable Reschedule</option>
                                                                <option value="NI - Awaiting Inputs">NI - Awaiting Inputs</option>
                                                                <option value="NI - In Consult">NI - In Consult</option>
                                                                <option value="NI - Awaiting Validation">NI - Awaiting Validation</option>
                                                                <option value="NI - Attempted Contact">NI - Attempted Contact</option>
                                                                <option value="NI - Other">NI - Other</option>
                                                                <option value="SO - Verified">SO - Verified</option>
                                                                <option value="SO - Unverified">SO - Unverified</option>
                                                                <option value="SO - Verification Not Needed">SO - Verification Not Needed</option>
                                                                <option value="IN - Infeasible">IN - Infeasible</option>
                                                                <option value="IN - Out of Scope - Rerouted">IN - Out of Scope - Rerouted</option>
                                                                <option value="IN - Not Reachable">IN - Not Reachable</option>
                                                                <option value="IN - Not Interested">IN - Not Interested</option>
                                                                <option value="IN - Not Ready">IN - Not Ready</option>
                                                                <option value="IN - Reschedule Limit Exceeded">IN - Reschedule Limit Exceeded</option>
                                                                <option value="IN - Other">IN - Other</option>
                                                                <option value="DC - Not Needed">DC - Not Needed</option>
                                                                <option value="DC - Test Case">DC - Test Case</option>
                                                                <option value="DC - Out of Scope - Rerouted">DC - Out of Scope - Rerouted</option>
                                                                <option value="AS - Agent Reschedule">AS - Agent Reschedule</option>
                                                                <option value="Other">Other</option>
                                                            </select>
                                                        </label>
                                                    </div>
                                                    
                                                    <br>
                                                    <span class="_panel__form--label">Schedule:</span>
                                                    <input type="datetime-local" name="meeting_time">
                                                </div>
                                            </div>
                                            <div class="_panel__form--column">
                                                <div class="_panel__form--panel">
                                                    Note: <span class="_panel_btn _panel_btn--small" data-btnaction="pushto_casesummary" title="Push to case summary">Push to case summary</span>
                                                    <textarea name="note" class="autoresize" cols="30" rows="5" placeholder="NOTE"></textarea>
                                                    Tasks: <span data-infocase="tasks_nowrap">TASKS</span><br>
                                                    Attribution Model: <strong><span data-infocase="customer_attributionmodel">customer_attributionmodel</span></strong><br>
                                                    <br>
                                                    Request:
                                                    <textarea name="request" class="autoresize" cols="30" rows="2" placeholder="REQUEST"></textarea>
                                                </div>
                                                <div class="_panel__form--panel">
                                                    AM: <strong><span data-infocase="am_name">AM_NAME</span></strong> (<span data-infocase="am_email">zzz@ccc.com</span>)
                                                    <br>
                                                    Đơn vị: <span data-infocase="am_isgcc_external">ZZZZZ</span> <span data-infocase="sales_program"> Sales program </span>
                                                    <br>
                                                    Meeting_time: <strong><span data-infocase="local_format_meeting_time">01/01/2022</span></strong>
                                                    <!-- <span data-infocase="meeting_ontime">MEETING_TIME</span> -->
                                                    <br>
                                                    Assign to: <a href="#" data-infocase="assignee">JOINX</a>,
                                                </div>
                                            </div>
                                        </div>
                                        <h3>OTHER</h3>
                                        <div class="_panel__form">
                                            <div class="_panel__form--column">
                                                <div class="_panel__form--panel" data-panel_title="">
                                                    <span class="_panel__form--label">Case ID: </span>
                                                    <input type="text" name="case_id">
                                                    <span class="_panel__form--label"><small>Ads ID: </small></span>
                                                    <input type="text" name="customer_adsid">
                                                </div>
                                                <div class="_panel__form--panel" data-panel_title="AM">
                                                    <span class="_panel__form--label">AM: </span>
                                                    <input type="text" name="am_name">
                                                    <span class="_panel__form--label"><small>Email: </small></span>
                                                    <input type="text" name="am_email">
                                                    <span class="_panel__form--label"><small>Sales Program: </small></span>
                                                    <input type="text" name="sales_program">
                                                    <label class="_panel__form--label_inputcenter">
                                                        <small>Is GCC? </small>
                                                        <input type="checkbox" name="am_isgcc_external">
                                                    </label>
                                                </div>
                                                <div class="_panel__form--panel" data-panel_title="Tasks">
                                                    <span class="_panel__form--label">Task: </span>
                                                    <textarea name="tasks" id="" cols="30" rows="3"></textarea>
                                                    <span class="_panel__form--label"><small>Attribution Model: </small></span>
                                                    <input type="text" name="customer_attributionmodel">
                                                </div>
                                                <div class="_panel__form--panel" data-panel_title="AM">
                                                </div>
                                            </div>
                                            <div class="_panel__form--column">
                                                <div class="_panel__form--panel" data-panel_title="Customer">
                                                    <span class="_panel__form--label">Customer: </span>
                                                    <input type="text" name="customer_name">
                                                    <span class="_panel__form--label"><small>Website: </small></span>
                                                    <input type="text" name="customer_website">
                                                    <span class="_panel__form--label"><small>Email: </small></span>
                                                    <input type="text" name="customer_email">
                                                    <span class="_panel__form--label"><small>Phone: </small></span>
                                                    <input type="text" name="customer_contact">
                                                    <span class="_panel__form--label"><small>OCID: </small></span>
                                                    <input type="text" name="customer_ocid">
                                                    <span class="_panel__form--label"><small>Meet: </small></span>
                                                    <input type="text" name="customer_gmeet">
                                                    <span class="_panel__form--label"><small>Meeting time: </small></span>
                                                    <input type="datetime-local" name="meeting_ontime">
                                                </div>
                                                <div class="_panel__form--panel" data-panel_title="Case Detail">
                                                    <span class="_panel__form--label">Est: </span>
                                                    <select name="est_setup">
                                                        <option value="25 phút">25 phút</option>
                                                        <option value="30 phút">30 phút</option>
                                                        <option value="45 phút">45 phút</option>
                                                        <option value="Hơn 1 giờ">Hơn 1 giờ</option>
                                                    </select>
                                                </div>
                                                <div class="_panel__form--panel" data-panel_title="Case Detail">
                                                    <span class="_panel__form--label">CMS / Platform: </span>
                                                    <select name="platform">
                                                        <option value="--------">CMS / Platform: </option>
                                                        <option value="Wordpress">Wordpress</option>
                                                        <option value="Ladipage">Shopify</option>
                                                        <option value="Ladipage">Ladipage</option>
                                                        <option value="Bizweb">Bizweb</option>
                                                        <option value="Haravan">Haravan</option>
                                                        <option value="Drupal">Drupal</option>
                                                        <option value="Custom">Custom</option>
                                                    </select>
                                                </div>
                                                <div class="_panel__form--panel" data-panel_title="Assignee">
                                                    <span class="_panel__form--label"><small>Assignee: </small></span>
                                                    <input type="text" name="assignee">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div data-panel="script-reading">
                    <div class="_panel__heading">
                        <div class="_panel__heading--group">
                            <span class="_panel__heading--close" data-btnaction="close_panel"><img src="${window.dataTagteam.assets_url_img}/315851/close.svg" alt="" srcset=""></span>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="" srcset="">
                            <span class="_panel__heading--title">Script Reading</span>
                        </div>
                    </div>
                    <div class=" _panel__inner">
                        <div class="_panel__script--header"><span data-infocase="customer_gender">C2</span> <span data-infocase="customer_name">B2</span></div>
                        <div class="_panel__script"> <br>
                            <div class="_panel__script--elm hide" data-title="1. Chào hỏi xác nhận thông Adv"> <br>Dạ em chào <span data-infocase="customer_gender">C2</span>, em là <span data-infosetting="your-shortname">Your shortname</span> đến từ đội giải pháp kỹ thuật đại diện Google
                                <br>có phải em <span data-infosetting="your-shortname">Your shortname</span> đang nghe máy với <span data-infocase="customer_gender">C2</span> <span data-infocase="customer_name">B2</span> đó không?
                                <br>// KH: đúng rồi em!
                                <br> <br>
                                <p data-am_donvi="GCC">Em nhận được yêu cầu từ đội hỗ trợ Google Ads, là hôm nay hỗ trợ cài đặt <span data-infocase="tasks_nowrap">Tasks</span> cho website <span data-infocase="customer_website">F2</span>, phải không <span data-infocase="customer_gender">C2</span> ạ?
                                    <br>// KH: đúng rồi em!</p> <br>
                                <p data-am_donvi="OTHER">Em có nhận được yêu cầu từ bạn <strong><span data-infocase="am_name">C2</span></strong> (người quản lý của Google)hôm nay sẽ hỗ trợ <span data-infocase="customer_gender">C2</span> cài đặt <span data-infocase="tasks_nowrap">Tasks</span> cho trang web <span data-infocase="customer_website">F2</span>. phải không ạ?
                                    <br>// KH: đúng rồi em!</p> <br>dạ, Ước tính thời gian cài đặt này là <span data-infocase="est_setup">G2</span> phút, vậy mình có đang ngồi máy tính để tiện cài đặt không <span data-infocase="customer_gender">C2</span>?
                                <br>// KH: Có em
                                <br>
                            </div>
                            <div class="_panel__script--elm hide" data-title="2. Thủ tục"> <br>Trước khi bắt đầu cài đặt <span data-infocase="customer_gender">C2</span> lưu ý giúp em cuộc gọi này sẽ được ghi âm nhằm nâng cao chất lượng dịch vụ [cho] khách hàng , <span data-infocase="customer_gender">C2</span> nha!
                                <br>// KH: Ok em
                                <br>Nếu sảy sự cố mất kết nối, <span data-infocase="customer_gender">C2</span> vui lòng không liên hệ qua số này, em sẽ chủ động gọi lại cho <span data-infocase="customer_gender">C2</span> <br>// KH: Ok em
                                <br>em <span data-infosetting="your-shortname">Your shortname</span> có gởi cho <span data-infocase="customer_gender">C2</span> một email có link google meet [á] để chia sẽ màn hình với em, <span data-infocase="customer_gender">C2</span> truy cập vào giúp em nha
                                <br>// KH: OK em
                                <br>// Chờ KH truy cập link, xong chưa
                                <br>[Rôi]Tại đây <span data-infocase="customer_gender">C2</span> giúp em tắt camera và đóng tất cả các thông tin riêng tư mà <span data-infocase="customer_gender">C2</span> không muốn chia sẽ <br> <br>[Rồi] sau đó nhấn vào nút [tham gia ngay], tiếp theo, <span data-infocase="customer_gender">C2</span> nhấn vào nút chia sẽ màn hình có dấu mũi tên hướng lên nằm bên dưới chính giữa của google meet, sau đó chọn [toàn bộ màn hình của bạn], nếu có nhiều màn hình thì <span data-infocase="customer_gender">C2</span> chọn cái đầu tiên
                                <br>// KH: OK em
                                <br> <br>// Me: em đã thấy màn hình của <span data-infocase="customer_gender">C2</span> rồi,
                                <br> <br></div>
                            <div class="_panel__script--elm hide" data-title="3. Điều khoản"> <br>à <span data-infocase="customer_gender">C2</span>! Bên em trước đó có gởi cho <span data-infocase="customer_gender">C2</span> một email xác nhận lịch hẹn ngày hôm nay [á], mình đã đọc qua nội dung bên trong rồi đúng không ạ?
                                <br>// KH: có rồi
                                <br>Nếu như <span data-infocase="customer_gender">C2</span> thấy mọi vấn đề nêu trên <span data-infocase="customer_gender">C2</span> cảm thấy thỏa, thì mình tiến hành cài đặt luôn nha!
                                <br> <br>// KH: Chưa
                                <br>Thế thì em sẽ mô tả sơ nội dung về điều mình cần chuẩn bị cho việc cài đặt code trên website của mình nha
                                <br>Trước tiên là mình cần đủ quyền truy cập cho Google Ads, Analytics, GTM, quản trị admin website.
                                <br>Nếu như <span data-infocase="customer_gender">C2</span> thấy mọi vấn đề nêu trên <span data-infocase="customer_gender">C2</span> cảm thấy thỏa, thì mình tiến hành cài đặt luôn nha!
                                <br> <br>// KH: OK em
                                <br>.............
                                <br>.............
                                <br></div>
                            <div class="_panel__script--elm hide" data-title="4. Đọc báo cáo"> <br>Hướng dẫn KH đọc báo cáo
                                <br>
                            </div>
                            <div class="_panel__script--elm hide" data-title="5. Tóm tắt, thông báo theo dõi về trường hợp"> 
                            <br>
                            // 1. Tóm tắt lại quá trình cài đặt <br>
                            // 2. các trường hợp <br>
                                2.1. Việc cài đặt đã thành công. Sau cuộc gọi này bên em sẽ gởi email thông báo thành công có kèm phần đánh giá chất lượng dịch vụ. <span data-infocase="customer_gender">C2</span> có thời gian thì phản hồi giúp em.<br>
                                2.2. Bên em sẽ theo dõi trong 2 ngày tới để đảm bảo dữ liệu được ghi nhận đúng. Nếu không có vấn đề gì thì sau 2 ngày bên em sẽ gửi 1 email thông báo thành công có kèm phần đánh giá chất lượng dịch vụ. <span data-infocase="customer_gender">C2</span> có thời gian thì phản hồi giúp em.<br>
                                2.3. Bên em sẽ theo dõi thêm 2 ngày để đảm bảo dữ liệu được ghi nhận đúng. Nếu không có vấn đề gì thì trong vòng 2 ngày bên em sẽ gửi 1 email thông báo thành công có kèm phần đánh giá chất lượng dịch vụ. <span data-infocase="customer_gender">C2</span> có thời gian thì phản hồi giúp em.<br>
                                2.4. Tạm ngưng phần hỗ trợ tại đây và sẽ tiếp tục trong sau 24h. <span data-infocase="customer_gender">C2</span> có thể sắp xếp lịch hẹn vào <span data-infocase="next_timeinstall">ZZZZZ</span> <br> <br>
                                2.5. *** Tùy vào case nhé
                            </div>
                            <div class="_panel__script--elm hide" data-title="6. Xác nhận giải đáp thắc mắc, dừng chia sẽ màn hình và KẾT THÚC"> <br>Mình còn thắc mắc nào trong quá trình cài đặt không <span data-infocase="customer_gender">C2</span> <span data-infocase="customer_name">B2</span> ơi!<br>
                                // Có<br>
                                // Tự tin giải đáp, giúp họ clear hơn trong phạm vi mình có thể<br><br>
                                
                                // Không<br>
                                Sau buổi hôm nay em sẽ gửi cho <span data-infocase="customer_gender">C2</span> email thông báo mình đã cài đặt thành công, kèm theo bảng đánh giá chất lượng dịch vụ, <span data-infocase="customer_gender">C2</span> có thời gian <span data-infocase="customer_gender">C2</span> phản hồi giúp em!<br>
                                Và trong thời gian tiếp theo <span data-infocase="customer_gender">C2</span> cũng theo dõi, nếu có vấn đề gì thì <span data-infocase="customer_gender">C2</span> cứ phản hồi qua mail này, em sẵn sàng hỗ trợ lại <span data-infocase="customer_gender">C2</span> ha!<br>
                                // OK em
                                Em cảm ơn <span data-infocase="customer_gender">C2</span> đã dành thời gian cho buổi cài đặt ngày hôm nay, giờ <span data-infocase="customer_gender">C2</span> có thể nhấn dừng chia sẽ màn hình được rồi ạ!<br>
                                Cảm ơn <span data-infocase="customer_gender">C2</span> và em chào <span data-infocase="customer_gender">C2</span>!<br>
                            </div>
    
                        </div>
                    </div>
                </div>
                <div data-panel="email-template">
                    <div class="_panel__heading">
                        <div class="_panel__heading--group">
                            <span class="_panel__heading--close" data-btnaction="close_panel"><img src="${window.dataTagteam.assets_url_img}/315851/close.svg" alt="" srcset=""></span>
                            <img src="${window.dataTagteam.assets_url_img}/Google_2015_logo.svg" alt="" srcset="">
                            <span class="_panel__heading--title">Email Template</span>
                        </div>
                    </div>
                    <div class=" _panel__inner">

                        <div class="_emailtemp_search">
                            <span id="_emailtemp_search_input" class="_emailtemp_search_input" contenteditable="true"></span>
                        </div>
                        ${th_email_temp}
                    </div>
                </div>
                <div data-panel="list-case">
                    <div class="_panel__heading">
                        <div class="_panel__heading--group">
                            <span class="_panel__heading--close" data-btnaction="close_panel"><img src="${window.dataTagteam.assets_url_img}/315851/close.svg" alt="" srcset=""></span>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="" srcset="">
                            <span class="_panel__heading--title">List Case</span>
                        </div>
                    </div>
                    <div class=" _panel__inner">
                        <ul class="_panel__caselist">
                        </ul>
                    </div>
                </div>
            </div>
            <div class="_panel_group" data-group="opentiptutorial">
                <div data-panel="opentiptutorial" class="active">
                    <div class="_panel__heading">
                        <div class="_panel__heading--group">
                            <span class="_panel__heading--close" data-btnaction="opentiptutorial"><img src="${window.dataTagteam.assets_url_img}/315851/close.svg" alt="" srcset=""></span>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="" srcset="">
                            <span class="_panel__heading--title">Tip and Tutorial</span>
                        </div>
                    </div>
                    <div class=" _panel__inner">
                        <span id="_panel__blogs-search" class="_panel__blogs-search" contenteditable="true"></span>
                        <div class="_panel__blogs empty">
                            <div class="_panel__linear-progress small">
                                <div class="bar bar1"></div>
                                <div class="bar bar2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <form action="" method="post" id="formSettings">
            <div class="_panel_group" data-group="opensetting">
                <div data-panel="opensetting" class="active">
                    <div class="_panel__heading">
                        <div class="_panel__heading--group">
                            <span class="_panel__heading--close" data-btnaction="opensetting"><img src="${window.dataTagteam.assets_url_img}/315851/close.svg" alt="" srcset=""></span>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="" srcset="">
                            <span class="_panel__heading--title">Setting</span>
                        </div>
                    </div>
                    <div class=" _panel__inner">
                        <div class="_panel__linear-progress small">
                            <div class="bar bar1"></div>
                            <div class="bar bar2"></div>
                        </div>
                        <div class="_panel__form">
                            <div class="_panel__form--column">
                                <div class="_panel__topsticky_toolbar">
                                    <div class="_panel__topsticky_toolbar-gr">
                                        <!-- <span class="_panel_btn _panel_btn--small _panel_btn--icon" data-btnaction="reload_panel">
                                            <img src="${window.dataTagteam.assets_url_img}/240005/sync.svg" alt="" srcset="">
                                            Update UI
                                        </span> -->
                                        <span class="_panel_btn _panel_btn--small" data-btnaction="toggle_minisize_panel">Mini</span>
                                        <span class="_panel_btn _panel_btn--small" data-btnaction="toggle_panel_darkmode">Darkmode</span>
                                    </div>
                                </div>
                                <!-- <div class="_panel__form--panel" data-panel_title="Auto load code">
                                    <label><input type="checkbox" name="auto_loadcode_vanbo" data-infosetting="auto_loadcode_vanbo" value="Focus cases"> Disable auto load code <small>(Author: Văn Bộ)</small></label>
                                </div>
                                <div class="_panel__form--panel" data-panel_title="Auto load GTM ID">
                                    <label title="Show ID in tagmanager.google.com"><input type="checkbox" name="auto_loadgtmid" data-infosetting="auto_loadgtmid" value="Show GTM ID"> Disable Show GTM ID</label>
                                </div> -->
                            </div>
                        </div>
                        <div class="_panel__form">
                            <div class="_panel__form--column">
                                <div class="_panel__form--panel" data-panel_title="List keystorage">
                                    <span class="_panel__form--label"><small>List keystorage: </small></span>
                                    <ul class="list_keystorage">
                                        empty
                                    </ul>
                                </div>
                                <div class="_panel__form--panel" data-panel_title="Save">
                                    <button type="submit" action="save" class="_panel_btn _panel_btn--small">SAVE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    `;
