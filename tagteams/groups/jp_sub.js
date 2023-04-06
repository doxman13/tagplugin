
var jp_language = {
    'appointment_time': 'Appointment Time',
    'google_ads_external_customer_id': 'Google Ads External Customer ID',
    'phone_prefix' : "+84",
};

var jp_key_task_searchandreplace = `
    ads_conversion_tracking_troubleshooting:Ads Conversion Tracking Troubleshooting:kiểm tra khắc phục sự cố theo dõi lượt chuyển đổi
    ads_conversion_tracking:Ads Conversion Tracking:triển khai theo dõi lượt chuyển đổi
    ga4_migration:GA4 Migration:triển khai theo dõi số liệu Google Analytics 4
    shopping_onboarding:Shopping Onboarding:triển khai Google Shopping 
    ads_remarketing:Ads Remarketing:triển khai tiếp thị lại
    ads_dynamic_remarketing:Ads Dynamic Remarketing:triển khai tiếp thị lại động
    ads_enhanced_conversions:Ads Enhanced Conversions:triển khai chuyển đổi nâng cao
    ads_website_call_conversion:Ads Website Call Conversion:triển khai lượt chuyển đổi cuộc gọi
    analytics_cross_domain_tracking:Analytics Cross Domain Tracking:phân tích theo dõi tên miền chéo
    analytics_dynamic_remarketing:Analytics Dynamic Remarketing:phân tích tiếp thị lại động 
    analytics_e-commerce_tracking:Analytics E-Commerce Tracking:phân tích theo dõi thương mại điện tử
    analytics_enhanced_e-commerce_tracking:Analytics Enhanced E-Commerce Tracking:phân tích theo dõi thương mại điện tử nâng cao
    analytics_event_tracking:Analytics Event Tracking:theo dõi các sự kiện phân tích
    analytics_health_check:Analytics Health Check:kiểm tra khả năng ghi nhận phân tích
    analytics_remarketing:Analytics Remarketing:phân tích tiếp thị lại
    analytics_setup:Analytics Setup:cài đặt phân tích
    analytics_troubleshooting:Analytics Troubleshooting:kiểm tra khắc phục sự cố phân tích
    consent_mode:Consent Mode:triển khai chế độ đồng ý cho trang web
    fix_sitewide_tagging_ogt_ct:Fix Sitewide Tagging (OGT & CT):sửa lỗi gắn thẻ trên toàn trang web (OGT & CT)
    ga4_e-commerce_migration:GA4 E-Commerce Migration:triển khai theo dõi số liệu mua hàng với Google Analytics 4
    google_tag_manager_installation:Google Tag Manager Installation:cài đặt trình quản lý thẻ cho website
    ads_conversion_code:Ads Conversion Code:triển khai mã nguồn lượt chuyển đổi
    website_call_conversion:Website Call Conversion:triển khai lượt chuyển đổi cuộc gọi cho trang web
    ga_destination_tracking:GA Destination Tracking:triển khai theo dõi trang đích với Google Analytics
    ga_event_tracking:GA Event Tracking:triển khai theo dõi sự kiện Google Analytics
    ga_smart_goals:GA Smart Goals:triển khai mục tiêu thông minh với Google Analytics
    site_wide_tag_-_conversion_tracking_fix(ogt_&_ct):Site Wide Tag - Conversion Tracking Fix(OGT & CT):sửa lỗi gắn thẻ và lượt chuyển đổi trên toàn trang web (OGT & CT)
    dynamic_remarketing_retail:Dynamic Remarketing - Retail:triển khai tiếp thị lại động - retail (bán lẻ)
    dynamic_remarketing_x_non_retail:Dynamic Remarketing - X (Non-Retail):triển khai tiếp thị lại động - X (Non-Retail)
    google_analytics_dynamic_remarketing_non_retail:Google Analytics Dynamic Remarketing (Non-Retail):triển khai tiếp thị lại động trên Google Analytics (Non-Retail)
    google_analytics_dynamic_remarketing_retail:Google Analytics Dynamic Remarketing (Retail):triển khai tiếp thị lại động trên Google Analytics - X (Non-Retail)
    google_analytics_health_check:Google Analytics Health Check:triển khai kiểm tra khả năng ghi nhận của Google Analytics 
    ga_starter_pack:GA Starter Pack:làm quen với Google Analytics
    google_analytics_troubleshooting:Google Analytics Troubleshooting:kiểm tra khắc phục sự cố Google Analytics
    offline_conversion_tracking:Offline Conversion Tracking:triển khai chuyển đổi theo dõi ngoại tuyến
    recaptcha_implementation:ReCaptcha Implementation:triển khai ReCaptcha
    cross_domain_tracking:Cross Domain Tracking:triển khai theo dõi tên miền chéo
    lead_form_ad_extension:Lead Form Ad Extension:triển khai tiện ích mở rộng biểu mẫu khách hàng tiềm năng
    enhanced_conversions:Enhanced Conversions:triển khai chuyển đổi nâng cao
    shopping_feed_optimization:Shopping Feed Optimization:tối ưu nguồn cấp dữ liệu trên Google Shopping
`;

var jp_heading_searchandreplace = `
    Good news, the Technical Solutions Team has received your case
    Good news, the Technical Solutions Team has received your case
    Here's the latest update regarding your case:Here's the latest update regarding your case
    Your appointment has been successfully rescheduled:Your appointment has been successfully rescheduled:
    Your appointment has been successfully rescheduled:Your appointment has been successfully rescheduled
    Congratulations, your case has been successfully implemented:Congratulations, your case has been successfully implemented
    Your case has been successfully implemented:Your case has been successfully implemented
    Congratulations on implementing your case:Congratulations on implementing your case
    Your case has been successfully implemented:Your case has been successfully implemented
    More information is needed to complete your implementation:More information is needed to complete your implementation
    Your case is in consultation:Your case is in consultation
    Your case status has been updated:Your case status has been updated
    We tried to reach you today regarding your case:We tried to reach you today regarding your case
    Please provide additional details for your case:Please provide additional details for your case
    Your case cannot be completed due to technical issues:Your case cannot be completed due to technical issues
    Your case has been closed due to inactivity:Your case has been closed due to inactivity
    Your case has been closed:Your case has been closed
    Your case is not ready for implementation. Learn more:Your case is not ready for implementation. Learn more
    Your case has been rerouted to the correct support team:Your case has been rerouted to the correct support team
    We are working to reroute your case to the correct support team:We are working to reroute your case to the correct support team
    Your request is out of scope for the Technical Solutions Team:Your request is out of scope for the Technical Solutions Team
    Your case will be closed. Learn more:Your case will be closed. Learn more
`;

var jp_hotkey_email = {
    'ts as new':'テクニカルソリューションチームより - 予約の確認',
    'ts as wip offtfr':'テクニカルソリューションチームより - 予約の確認',
    'ts as wip offs':"テクニカルソリューションチームより - ",
    'ts as resched1':'テクニカルソリューションチームより - ',
    'ts as reschedok':'テクニカルソリューションチームより - ',
    'ts so verif':'テクニカルソリューションチームより - サポート完了のご連絡',
    'ts so verif nrc':'テクニカルソリューションチームより - サポート完了のご連絡',
    'ts so unv':'テクニカルソリューションチームより - サポート完了のご連絡',
    'ts so vnn':'テクニカルソリューションチームより - サポート完了のご連絡',
    'ts ni ai':'テクニカルソリューションチームより - ',
    'ts ni ic':'テクニカルソリューションチームより - ',
    'ts ni av':'テクニカルソリューションチームより - ',
    'ts ni ac':'テクニカルソリューションチームより - ',
    'ts ni oth':'テクニカルソリューションチームより - ',
    'ts in inf':'テクニカルソリューションチームより - サポート終了のご連絡',
    'ts in nrch':'テクニカルソリューションチームより - サポート終了のご連絡',
    'ts in ni':'テクニカルソリューションチームより - サポート終了のご連絡',
    'ts in nrdy':'テクニカルソリューションチームより - サポート終了のご連絡',
    'ts in oost':'テクニカルソリューションチームより - サポート終了のご連絡',
    'ts in oosu':'テクニカルソリューションチームより - ',
    'ts in oos seller':'テクニカルソリューションチームより - ',
    'ts in oth':'テクニカルソリューションチームより -サポート終了のご連絡',
};

var jp_searchandremove = [
    'Technical Solutions Team',
];

var jp_api_blog = 'https://cdtx.lyl.vn/wordpress/wp-json/tagteam/blogs';




var jp_checkStyleByTheme = (opt_isdisable) => {
    if(opt_isdisable) return false;


    var _timekey_current = new Date().getDate();
    // var _timekey_current = new Date().getDate() + "" + new Date().getMinutes();
    var _key = "cdtx_stylecasebytheme";

    var _sync_api = (_objectvalue) => {
        var _body = {
            "action": "stylecasebytheme",
            "language": "jp",
            "timesync": _timekey_current
        };
        load_fetch_post_content(jp_api_blog, _body, (response_api) => {
            if(response_api.rs) {
                setChromeStorage(_key, response_api , () => {
                    var cdtx_panel_div_style = _TrustScript(response_api.style_str);
                    document.body.insertAdjacentHTML("afterEnd", cdtx_panel_div_style);
                });
            } 
        });
    }
    
    getChromeStorage(_key, (response) => {
        var _objectvalue = {};
        if(response.value) {
            _objectvalue = response.value;
            cLog(() => {console.log("===", _objectvalue)})
            if(_objectvalue.timesync == _timekey_current) {
                cLog(() => {console.log("CACHE ===== STYLE")})
                var cdtx_panel_div_style = _TrustScript(_objectvalue.style_str);
                document.body.insertAdjacentHTML("afterEnd", cdtx_panel_div_style);
            } else {
                // Sync API
                _sync_api(_objectvalue)
            }
        } else {
            cLog(() => {console.log("FIRST TIME => FETCH API")})
            // Sync API
            _sync_api(_objectvalue);
        }
    });
}

var jp_clearAndPrepareCRTemplate = () => {
    // Prepare
    var _composeemailcard = document.querySelector('.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top[card-type="compose"]');
    if(_composeemailcard) {
        cLog(()=>{console.log("CR -> Start")});
        var _email_body_content = _composeemailcard.querySelector('#email-body-content');
        _email_body_content.style.padding = '0px';
        _email_body_content.style.width = '100%';

        var _email_body_content_top = _composeemailcard.querySelector('#email-body-content-top');
        _email_body_content_top.innerHTML = '<div id="email-body-content-top-content"><p dir="auto"></p></div>';

        var _email_body_content_top_content = _composeemailcard.querySelector('#email-body-content-top-content');
        
        
        _email_body_content_top_content.innerHTML = '<p dir="auto"><br></p>';
        
        var ntime = 0;
        var myInterval = setInterval(() => {
            cLog(()=>{console.log("CR -> interval focus cursor point and check content")});

            addCursor2Contenteditable(_email_body_content_top_content);

            if(_email_body_content_top_content.innerText.trim().length > 0) {
                clearInterval(myInterval);

                // replace heading search td table and replace heading
                var _tdcellist = _email_body_content_top_content.querySelectorAll("td");
                if(_tdcellist.length) {
                    _tdcellist.forEach((item) => {
                        var _heading = item.innerText.trim();
                        var _getvalue = searchAndReturnValue(jp_heading_searchandreplace, _heading, 1);
                        if(_getvalue) {
                            item.innerText = _getvalue;
                        }
                    });
                }

                // replace heading search td table and replace heading
                var _tdcellist = _email_body_content_top_content.querySelectorAll(".replaced");
                if(_tdcellist.length) {
                    _tdcellist.forEach((item) => {
                        var _heading = item.innerText.trim();
                        var _list = ['']
                        var _getvalue = searchAndReturnValue(jp_key_task_searchandreplace, _heading, 1);
                        if(_getvalue) {
                            item.innerText = _getvalue;
                        }
                    })
                }

                // remove text
                var _tr = _email_body_content_top_content.querySelectorAll("tr");
                if(_tr.length) {
                    _tr.forEach((item) => {
                        var _text = item.innerText.trim();
                        jp_searchandremove.forEach((item2) => {
                            if(_text == item2) {
                                item.remove();
                            }
                        })
                    })
                }


                // Update action
                _email_body_content_top_content.dispatchEvent(new Event('input'));
                _email_body_content_top_content.dispatchEvent(new Event('focus'));
                _email_body_content_top_content.dispatchEvent(new Event('click'));
                _email_body_content_top_content.click();
                document.execCommand("insertText", false, " ");
            }

            // more than 10s
            if(ntime > 10) {
                cLog(()=>{console.log("CR -> Clear time more than 10s")});
                clearInterval(myInterval);
            }
            ntime++;
            
            
        }, 1000);
    }
}



// -- Send 1st email
/* var jp_sendFirstEmail = () => {
    function waitForElm(selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }
    
            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    resolve(document.querySelector(selector));
                    observer.disconnect();
                }
            });
    
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }
    
    var caseId = document.querySelector('.case-id').innerText;
    document.querySelector('.recipient-dropdown > dropdown-button .button-text').click();
    document.querySelector('[aria-label="Create a write card"]').dispatchEvent(new Event('focus'));


    wait4Elem('material-list.options-list').then((elm) => {
        document.querySelector('material-list.options-list .item:nth-child(1)').click();
        wait4Elem('[debug-id="contact-info-name"]').then(elm => {
            wait4Elem('[aria-label="Create new email"]').then(elm => {
                elm.click();
                
                wait4Elem('.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top[card-type="compose"] #email-body-content-top').then(function (elm) {
                    
                    wait4Elem('email-address-dropdown material-dropdown-select .address').then(elm => {
                        elm.click();

                        wait4Elem('[id*=email-address-id--technical-solutions]').then(elm => {
                            elm.click();

                            wait4Elem('.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) .is-top .subject').then(elm => {
                                elm.value = `Đội giải pháp kỹ thuật - Xác nhận lịch hẹn [${caseId}]`;
                                elm.dispatchEvent(new Event('input'));
                                
                                    wait4Elem('.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) .is-top .editor-frame #email-body-content-top').then(emailBodyTop => {
                                        var xpath = `//div[contains(@class, 'form-label')][text() = 'Website']//following-sibling::div`;
                                        var url = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText;
                                        var name = document.querySelector('.internal-user-info .name').innerText;
                                        var inviteHtml = `<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td align="left" height="150" style="font-size: 28px; line-height: 36px; font-family: Roboto, Arial, sans-serif; color: rgb(60, 64, 67); padding: 30px 0px 30px 30px;" valign="middle" width="100%">Tin vui! Nhóm giải pháp kỹ thuật đã nhận được yêu cầu của bạn</td>
                                                        <td align="right" height="150" style="padding: 0 30px 0 10px;" valign="middle" width="130"><img alt="" border="0" src="https://storage.googleapis.com/fwm-emea-client-emails/google/14406_Gtech_Solutions/AS_Work_in_Progress_Offline_Support_ts_as_wip_offtfr.png" style="display: block;min-width:100px;" width="100"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td align="center" style="padding: 0px 40px 30px 30px;" valign="top">
                                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td align="left" style="font-size: 16px; line-height: 26px; font-family: Roboto, Arial, sans-serif; color: rgb(60, 64, 67); padding-bottom: 18px;">${name} thân mến!</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="left" style="font-size: 16px; line-height: 26px; font-family: Roboto, Arial, sans-serif; color: rgb(60, 64, 67); padding-bottom: 18px;">
                                                                            <p>Cảm ơn bạn đã đặt lịch hẹn với Nhóm giải pháp kỹ thuật của Google. Người đại diện của Google đã thay mặt bạn đặt lịch hẹn này và chúng tôi sẽ hỗ trợ bạn theo Mã yêu cầu <span class="replaced">4-9981000032961</span> cho ${url}.&nbsp;</p>
                                                                            <p>Vui lòng kiểm tra hộp thư đến trong email của bạn để tìm lời mời trên lịch cho cuộc hẹn sắp tới với chúng tôi, và làm theo hướng dẫn được trình bày trong thư để xác nhận việc bạn sẽ tham dự cuộc hẹn. Để chuẩn bị cho cuộc gọi, vui lòng xem và hoàn tất những Việc cần làm được nêu <a href="https://support.google.com/google-ads/answer/11605860" rel="noopener" target="_blank" class="ignore-globals" style="color: rgb(26, 115, 232); text-decoration-line: none;">tại đây</a>.</p>
                                                                            <p>Nếu bạn có câu hỏi trước khi tham gia cuộc gọi hoặc muốn thêm những người tham dự khác, vui lòng cho chúng tôi biết bằng cách trả lời email này hoặc liên hệ với Người đại diện bán hàng của Google. Chúng tôi rất mong được làm việc với bạn! Cảm ơn bạn.</p>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td align="center" style="padding: 0px 40px 50px 30px;" valign="top">
                                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td align="left" style="font-size: 16px; line-height: 24px; font-family: Roboto, Arial, sans-serif; color: rgb(60, 64, 67); padding-bottom: 2px;">Giải pháp kỹ thuật của Google</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <p dir="auto">
                                            </p>
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td align="center" style="padding: 0px 40px 30px 30px;" valign="top">
                                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                                <tbody>
                                                                    <tr>
                                                                        <td align="left" style="font-size:16px;line-height:24px;font-family: Roboto, Arial, sans-serif;color:#3C4043;font-weight: 700;padding: 0;">Yêu cầu số ${caseId}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>`;
                                        emailBodyTop.innerHTML = inviteHtml;
                                        document.execCommand("insertText", false, " ");
                                    })
                            });
                        });
                    });
                });
            });
        });
        document.querySelector('[aria-label="Create a write card"]').dispatchEvent(new Event('blur'));
    });
} */




var jp_TagteamFocusCase = () => {
    cLog(() => {console.log("CODE VAN BO LOAD HAS LOAD")});
    try {
        // ==== CODE - VAN BO
        var ntime = 0;
        var css = `
        .hasdock card-deck .decks {
            max-height: calc(100% - 64px)
        }
        
        
        #preview-note {
            width: 100%;
            height: 800px;
            position: relative;
            padding-top: 40px;
        }
        
        #preview-note #preview-area {st
            width: 511px;
            min-height: 543px;
            max-height: none;
            margin-top: 20px;
            padding: 10px;
            outline: none;
            color: #202124;
            border: 2px dashed #599fff;
            font-size: 13px;
            text-align: left;
        }
        
        #preview-note #preview-area div {
            padding: 5px 0;
        }
        
        #preview-area ul {
            list-style-type: none;
            padding-left: 0px;
        }
        
        #preview-area h4 {
            display: inline !important;
        }
        
        #signature {
            background-color: #fdfdfd;
            padding: 10px;
            width: 50%;
            height: 100%;
        }
        
        #signature {
            font-family: Google Sans, Helvetica, Arial;
        }
        
        #signature .tag-shopping .form-group {
            width: 800px;
            display: flex;
            margin: 0.8em 0.5em;
            align-items: center;
            position: relative;
            flex-flow: row wrap;
        }
        
        #signature .collapsible-content .form-group {
            width: 80%;
            display: flex;
            margin: 0.7em;
            align-items: center;
        }
        
        #signature .tag-shopping .form-group .form-control:focus {
            outline: none;
        }
        
        #signature .tag-shopping .form-group .form-control {
            width: 400px;
            border: 1px solid #99c2fa;
            border-radius: 4px;
            padding: 8px 4px;
        }
        
        #signature .tag-shopping .form-group button,
        #addToNote,
        #resetNote,
        #signatureBtn {
            background-color: #599fff;
            border: none;
            color: white;
            text-decoration: none;
            margin: 0 15px;
            border-radius: 3px;
            padding: 9px 18px;
            cursor: pointer;
        }
        
        #addToNote,
        #resetNote {
            padding: 15px 30px;
            margin: 15px;
        }
        
        #signature .tag-shopping .form-group label {
            font-weight: 600;
            width: 20%;
            text-align: left;
            color: #202124;
        }
        
        #signature .collapsible-content .form-group .label {
            font-weight: 600;
            text-align: left;
            width: 50%;
            color: #202124;
        }
        
        #signature .tag-shopping #task {
            padding: 16px 0;
            text-align: left;
            line-height: 27px;
        }
        
        #signature .tag-shopping #task label {
            margin-right: 20px;
        }
        
        #signature option:nth-child(2n-1) {
            background: #f6f6f6;
        }
        
        .modal {
            display: none;
            position: fixed;
            z-index: 999;
            /* padding-top: 100px; */
            left: 0;
            top: 0;
            width: 100%;
            height: 100vh;
            overflow: auto;
            background-color: rgb(0, 0, 0);
            background-color: rgba(0, 0, 0, 0.4);
        }
        
        /* Modal Content */
        .modal-content {
            position: relative;
            background-color: #fefefe;
            margin: auto;
            padding: 0;
            border: 1px solid #888;
            width: 1300px;
            max-width: 96%;
            max-height: 96%;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            -webkit-animation-name: animatetop;
            -webkit-animation-duration: 0.4s;
            animation-name: animatetop;
            animation-duration: 0.4s;
            text-align: center;
            overflow: auto;
            display: flex;
        }
        
        /* The Close Button */
        .close {
            color: #599fff;
            position: absolute;
            right: 0;
            font-size: 28px;
            font-weight: bold;
            padding-right: 10px;
            z-index: 1;
        }
        
        .close:hover,
        .close:focus {
            color: #000;
            text-decoration: none;
            cursor: pointer;
        }
        
        .modal-header {
            /* padding: 2px 16px; */
            background: red;
            color: #599fff;
            font-weight: bold;
            height: 29px;
        }
        
        /* collapsible */
        .leadgen {
            width: 100%;
            text-align: left;
        }
        
        .ec-check-list {
            width: 100%;
            text-align: left;
        }
        
        .modal .collapsible {
            background-color: #fdfdfd;
            color: #202124;
            cursor: pointer;
            padding: 10px;
            width: 578px;
            border: 1px solid #202124;
            text-align: left;
            outline: none;
            font-size: 15px;
            font-weight: 600;
            border-radius: 10px;
            margin-bottom: 11px;
        }
        
        .modal .active,
        .collapsible:hover {
            background-color: #fafafa;
        }
        
        .modal .collapsible:after {
            content: '+';
            color: #599fff;
            font-weight: bold;
            float: right;
            margin-left: 5px;
        }
        
        .modal .active:after {
            content: "-";
        }
        
        .modal .collapsible-content {
            padding: 0;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.2s ease-out;
            background-color: #fdfdfd;
            width: 800px;
        }
        
        /* Add Animation */
        @-webkit-keyframes animatetop {
            from {
                top: -300px;
                opacity: 0
            }
        
            to {
                top: 0;
                opacity: 1
            }
        }
        
        @keyframes animatetop {
            from {
                top: -300px;
                opacity: 0
            }
        
            to {
                top: 0;
                opacity: 1
            }
        }
        
        /*Dock css*/
        
        
        @font-face {
            font-family: "San Francisco";
            font-weight: 400;
            src: url("https://applesocial.s3.amazonaws.com/assets/styles/fonts/sanfrancisco/sanfranciscodisplay-regular-webfont.woff");
        }
        
        @font-face {
            font-family: "San Francisco";
            font-weight: 800;
            src: url("https://applesocial.s3.amazonaws.com/assets/styles/fonts/sanfrancisco/sanfranciscodisplay-bold-webfont.woff");
        }
        
        .dock-float {
            width: auto;
            height: 60px;
            border-radius: 16px;
            display: flex;
            justify-content: center;
            position: fixed;
            bottom: 5px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 999;
        }
        
        .dock-float .dock-float-container {
            padding: 3px;
            width: 366px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 16px;
            background: rgba(83, 83, 83, 0.25);
            backdrop-filter: blur(13px);
            -webkit-backdrop-filter: blur(13px);
            border: 1px solid rgba(255, 255, 255, 0.18);
        }
        
        .dock-float .dock-float-container .li-bin {
            margin-left: 20px;
            border-left: 1.5px solid rgba(255, 255, 255, 0.4);
            padding: 0px 10px;
        }
        
        .dock-float .dock-float-container .li-1::after {
            position: absolute;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            content: "";
            bottom: 2px;
        }
        
        .dock-float .dock-float-container li {
            list-style: none;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 50px;
            vertical-align: bottom;
            /* margin: 4px 0; */
            transition: 0.2s;
            transform-origin: 50% 100%;
            cursor: pointer;
        }
        
        .dock-float .dock-float-container li:hover {
            margin: 0px 13px 0px 13px;
        }
        
        .dock-float .dock-float-container li .name {
            position: absolute;
            width: 100px;
            top: -70px;
            background: rgba(0, 0, 0, 0.5);
            color: rgba(255, 255, 255, 0.9);
            height: 10px;
            padding: 10px 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 5px;
            visibility: hidden;
        }
        
        .dock-float .dock-float-container li .name::after {
            content: "";
            position: absolute;
            bottom: -10px;
            width: 0;
            height: 0;
            backdrop-filter: blur(13px);
            -webkit-backdrop-filter: blur(13px);
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-top: 10px solid rgba(0, 0, 0, 0.5);
        }
        
        .dock-float .dock-float-container li .ico {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: 0.2s;
        }
        
        .dock-float .dock-float-container li .ico-bin {
            width: 94% !important;
            height: 94% !important;
            object-fit: cover;
            transition: 0.2s;
        }
        
        .dock-float .dock-float-container li .ico-bin:hover {
            margin-left: 10px;
        }
        
        .dock-float .dock-float-container li:hover .name {
            visibility: visible !important;
        }
        
        /* toggle */
        @charset "UTF-8";
        
        .toggler-wrapper {
            display: block;
            width: 45px;
            height: 25px;
            cursor: pointer;
            position: relative;
        }
        
        .toggler-wrapper input[type="checkbox"] {
            display: none;
        }
        
        .toggler-wrapper input[type="checkbox"]:checked+.toggler-slider {
            background-color: #599fff;
        }
        
        .toggler-wrapper .toggler-slider {
            background-color: #ccc;
            position: absolute;
            border-radius: 100px;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            -webkit-transition: all 300ms ease;
            transition: all 300ms ease;
        }
        
        .toggler-wrapper .toggler-knob {
            position: absolute;
            -webkit-transition: all 300ms ease;
            transition: all 300ms ease;
        }
        
        .toggler-wrapper.style-1 input[type="checkbox"]:checked+.toggler-slider .toggler-knob {
            left: calc(100% - 19px - 3px);
        }
        
        .toggler-wrapper.style-1 .toggler-knob {
            width: calc(25px - 6px);
            height: calc(25px - 6px);
            border-radius: 50%;
            left: 3px;
            top: 3px;
            background-color: #fff;
        }
        
        /* radio checkmark */
        /* Customize the label (the container) */
        .container-checkmark {
            display: flex;
            position: relative;
            padding-left: 35px;
            width: 100px;
            cursor: pointer;
            font-size: 18px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        
        /* Hide the browser's default radio button */
        .container-checkmark input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
        }
        
        /* Create a custom radio button */
        .checkmark {
            position: absolute;
            top: 0;
            left: 0;
            height: 22px;
            width: 22px;
            background-color: #ccc;
            border-radius: 50%;
        }
        
        /* On mouse-over, add a grey background color */
        .container-checkmark:hover input~.checkmark {
            background-color: #ccc;
        }
        
        /* When the radio button is checked, add a blue background */
        .container-checkmark input:checked~.checkmark {
            background-color: #2196F3;
        }
        
        /* Create the indicator (the dot/circle - hidden when not checked) */
        .checkmark:after,
        .checkmark-checkbox:after {
            content: "";
            position: absolute;
            display: none;
        }
        
        /* Show the indicator (dot/circle) when checked */
        .container-checkmark input:checked~.checkmark:after {
            display: block;
        }
        
        /* Style the indicator (dot/circle) */
        .container-checkmark .checkmark:after {
            top: 6px;
            left: 6px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: white;
        }
        
        /* checkbox checkmark */
        /* Create a custom checkbox */
        .checkmark-checkbox {
            position: absolute;
            top: -11px;
            left: 0;
            height: 22px;
            width: 22px;
            background-color: #ccc;
        }
        
        /* On mouse-over, add a grey background color */
        .container-checkmark:hover input~.checkmark-checkbox {
            background-color: #ccc;
        }
        
        /* When the checkbox is checked, add a blue background */
        .container-checkmark input:checked~.checkmark-checkbox {
            background-color: #2196F3;
        }
        
        /* Create the checkmark/indicator (hidden when not checked) */
        .checkmark-checkbox:after {
            content: "";
            position: absolute;
            display: none;
        }
        
        /* Show the checkmark when checked */
        .container-checkmark input:checked~.checkmark-checkbox:after {
            display: block;
        }
        
        /* Style the checkmark/indicator */
        .container-checkmark .checkmark-checkbox:after {
            left: 7px;
            top: 3px;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 3px 3px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
        }
        
        /* style cr-list */
        #cr-list {
            position: relative;
            height: 350px;
        }
        
        .cr-list {
            list-style: none;
            transition: all 0.5s ease-out;
            position: absolute;
            padding-left: 12px;
            padding-bottom: 12px;
        }
        
        .cr-list li {
            padding: 6px 0;
            color: #000;
            background: none;
            cursor: pointer;
        }
        
        .cr-list li:hover {
            background: #E5E5E5;
        }
        
        .cr-list.hidden {
            transform: translateX(150%);
        }
        
        .cr-list button {
            padding-left: 12px;
        }
        
        #cr-list button.hidden {
            display: none;
        }
        
        /*Loader*/
        .lds-dual-ring {
            display: inline-block;
            width: 80px;
            height: 80px;
        }
        
        .lds-dual-ring:after {
            content: " ";
            display: block;
            width: 64px;
            height: 64px;
            margin: 8px;
            border-radius: 50%;
            border: 6px solid rgb(26, 115, 232);
            border-color: rgb(26, 115, 232) transparent rgb(26, 115, 232) transparent;
            animation: lds-dual-ring 1.2s linear infinite;
        }
        
        @keyframes lds-dual-ring {
            0% {
                transform: rotate(0deg);
            }
        
            100% {
                transform: rotate(360deg);
            }
        }
        `;
        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        head.appendChild(style);
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        };

        // var loadingCustom = document.createElement('div');
        // loadingCustom.classList.add('lds-dual-ring');
        // document.querySelector('.is-top iswirte .editor').appendChild(loadingCustom);
        function renderDock() {
            var dock_float_html = `<div class="dock-float">
                <div class="dock-float-container">
                    <li class="li-2 open-email">
                        <div class="name">Send mail</div>
                        <img class="ico" src="chrome-extension://gnhkacnhcenacadhaohjdkmkgfikdkoh/assets/img/groups/gmail.png"
                            alt="">
                    </li>
                    <li class="li-3 click2call">
                        <div class="name">Click to call</div>
                        <img class="ico click2call"
                            src="chrome-extension://gnhkacnhcenacadhaohjdkmkgfikdkoh/assets/img/groups/phone-call-mac.png" alt="">
                    </li>
                    <li class="li-5 open-note">
                        <div class="name">Oncall Notes</div>
                        <img class="ico" src="chrome-extension://gnhkacnhcenacadhaohjdkmkgfikdkoh/assets/img/groups/note.png"
                            alt="">
                    </li>
                    <li class="li-10">
                        <div class="name">Ads ICS</div>
                        <img class="ico ads-ics"
                            src="chrome-extension://gnhkacnhcenacadhaohjdkmkgfikdkoh/assets/img/groups/icon-google-ads.png" alt=""
                            style="width: 60%; height: 60%">
                    </li>
                    <li class="li-11">
                        <div class="name">Gearloose</div>
                        <img class="ico open-gearloose"
                            src="chrome-extension://gnhkacnhcenacadhaohjdkmkgfikdkoh/assets/img/groups/icon-gearloose.png" alt=""
                            style="width: 60%; height: 60%">
                    </li>
                    <li class="li-12">
                        <div class="name">OGT Dashboard</div>
                        <img class="ico ogt-dashboard"
                            src="chrome-extension://gnhkacnhcenacadhaohjdkmkgfikdkoh/assets/img/groups/dashboard.png" alt=""
                            style="width: 60%; height: 60%">
                    </li>
                    <li class="li-13">
                        <div class="name">EC Dashboard</div>
                        <img class="ico ec-dashboard"
                            src="chrome-extension://gnhkacnhcenacadhaohjdkmkgfikdkoh/assets/img/groups/dashboard.png" alt=""
                            style="width: 60%; height: 60%">
                    </li>
            
                </div>
            </div>`;
            var dock_float = document.createElement('div');
            dock_float.innerHTML = dock_float_html;
            document.querySelector('.decks').appendChild(dock_float);
            document.body.classList.add('hasdock');

            const focus = (elem, index) => {
                let previous = index - 1;
                let previous1 = index - 2;
                let next = index + 1;
                let next2 = index + 2;

                if (previous == -1) {
                    // console.log("first element");
                    elem.style.transform = "scale(1.5)  translateY(-10px)";
                } else if (next == icons.length) {
                    elem.style.transform = "scale(1.5)  translateY(-10px)";
                    // console.log("last element");
                } else {
                    elem.style.transform = "scale(1.5)  translateY(-10px)";
                    if(icons[previous]) {
                        icons[previous].style.transform = "scale(1.2) translateY(-6px)";
                    }
                    if(icons[previous1]) {
                        icons[previous1].style.transform = "scale(1.1)";
                    }
                    if(icons[next]) {
                        icons[next].style.transform = "scale(1.2) translateY(-6px)";
                    }
                    if(icons[next2]) {
                        icons[next2].style.transform = "scale(1.1)";
                    }
                }
            };

            let icons = document.querySelectorAll(".ico");
            let length = icons.length;

            icons.forEach((item, index) => {
                item.addEventListener("mouseover", (e) => {
                    // focus(e.target, index);
                });
                item.addEventListener("mouseleave", (e) => {
                    icons.forEach((item) => {
                        item.style.transform = "scale(1)  translateY(0px)";
                    });
                });
            });
            document.querySelector('.open-email').addEventListener('click', openEmail)
            document.querySelector('.click2call').addEventListener('click', copyPhone)
            document.querySelector('.open-note').addEventListener('click', openNote)
            document.querySelector('.ads-ics').addEventListener('click', adsICS)
            document.querySelector('.open-gearloose').addEventListener('click', gearloose)
            document.querySelector('.ogt-dashboard').addEventListener('click', ogtDashboard)
            document.querySelector('.ec-dashboard').addEventListener('click', ecDashboard)
        }

        var modalHtml = `
            <div id="sinature-modal" class="modal">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                    <div id="signature">
                        <div class="tag-shopping">
                            <div class="form-group">
                                <label>Case Summary</label>
                                <input class="form-control case-summary" aria-label="Case Summary" type="text" value="19/11/2022 | 3:00 PM | OGT | abc.com"/>
                            </div>
                            <div class="form-group">
                                <label for="">Pre-call</label>
                                <label class="container-checkmark">
                                    <input type="checkbox" id="pre-call-check">
                                    <span class="checkmark-checkbox"></span>
                                </label>
            
                            </div>
                            
                        </div>
                        <!-- Leadgen -->
                        <div class="leadgen">
                            <button class="collapsible leadgen">Leadgen</button>
                            <div class="collapsible-content">
                                <div class="form-group">
                                    <div class='label' for="">GCLIDless education by GAM</div>
                                    <label for="gclidless-education" class="toggler-wrapper style-1">
                                        <input type="checkbox" id="gclidless-education" checked>
                                        <div class="toggler-slider">
                                        <div class="toggler-knob"></div>
                                        </div>
                                    </label>
                                </div>
                        
                                <div class="form-group">
                                    <div class='label' >Pitched for GCLIDless</div>
                                    <label for="pitched-gclidless" class="toggler-wrapper style-1">
                                        <input type="checkbox" id="pitched-gclidless" checked="checked">
                                        <div class="toggler-slider">
                                        <div class="toggler-knob"></div>
                                        </div>
                                    </label>
                                    <input class="form-control pitched-gclidless-reason" placeholder="Type the reason" style="
                                        width: 170px;
                                        margin-left: 20px;
                                        outline: none;
                                        border: 1px solid #99c2fa;
                                        border-radius: 4px;
                                        padding: 4px;
                                        display: none;
                                    "/>
                                </div>
                                <div class="form-group">
                                    <div class='label' for="ogt-check">OGT Setup on call</div>
                                    <label for="ogt-check" class="toggler-wrapper style-1">
                                        <input type="checkbox" id="ogt-check" checked="checked">
                                        <div class="toggler-slider">
                                        <div class="toggler-knob"></div>
                                        </div>
                                    </label>
                                    <input class="form-control ogt-check-reason" placeholder="Type the reason" style="
                                        width: 170px;
                                        margin-left: 20px;
                                        outline: none;
                                        border: 1px solid #99c2fa;
                                        border-radius: 4px;
                                        padding: 4px;
                                        display: none;
                                    "/>
                                </div>
                                <div class="form-group">
                                    <div class='label' for="">Implementation Type</div>
                                    <label class="container-checkmark">Legacy
                                        <input type="radio" id="imt-gclid" name="imt-type" value="Legacy">
                                        <span class="checkmark"></span>
                                    </label>
                                    
                                    <label class="container-checkmark">GCLIDless
                                        <input type="radio" id="imt-gclidless" name="imt-type" value="GCLIDless" checked>
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Tag-shopping -->
                        <div class="ec-check-list">
                            <button class="collapsible ec-check-list">EC checklist</button>
                            <div class="collapsible-content">
                            Comming soon!
                            </div>
                        </div>
                        <div class="tag-shopping">
                            <div class="form-group">
                                <label for="">Speakeasy ID</label>
                                <input type="text" aria-label="Speakeasy ID" class="form-control" placeholder="Separate each SE id by ',' or ';'" />
                            </div>
                            <div class="form-group">
                                <label for="">Sub-status</label>
                                <select class="form-control" aria-label="Sub-status" style="background: #fff;width: 410px;">
                                    <option value="">--None--</option>
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
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="">Sub-status Reason</label>
                                <select class="form-control" aria-label="Sub-status Reason" style="background: #fff;width: 410px;">
                                    <option value="">--None--</option>
                                    <option value="Impressions Received">Impressions Received</option>
                                    <option value="Conversions tracked">Conversions tracked</option>
                                    <option value="Impressions NOT Received">Impressions NOT Received</option>
                                    <option value="Conversions NOT Tracked">Conversions NOT Tracked</option>
                                    <option value="Not Applicable">Not Applicable</option>
                                </select>
                            </div>
                                <div class="form-group">
                                    <label for="">Tasks Implemented</label>
                                    <div id="task"></div>
                                </div>
                                <div class="form-group">
                                    <label for="">Conversion Ids</label>
                                    <input class="form-control" aria-label="Conversion Ids"type="text" placeholder="Separate each SE id by ',' or ';'"/>
                                </div>
                    
                            <div class="form-group">
                                <label for="">On Call Comments</label>
                                <textarea id="oncall-area"class="form-control" aria-label="On Call Comments" rows="7"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="">Follow up date</label>
                                <input class="form-control" aria-label="Follow up Date" type="date" />
                            </div>
                            <div class="form-group">
                                <label for="">Follow up done</label>
                                <div class="follow-up-done">
                                <label class="container-checkmark">
                                    <input type="checkbox" id="follow-up-done">
                                    <span class="checkmark-checkbox"></span>
                                </label>
                                </div>
                            </div>
                        </div>
            
                        <button id="addToNote">Add to note</button>
                        <button id="resetNote">Reset</button>
                    </div>
                    <div id="preview-note" class="preview-note">
                        <label style="
                        font-size: 13px;
                        position: absolute;
                        top: 35px;
                        left: 0;
                    ">You will see the note here</label>
                        <div id="preview-area">
                            <div id="preview-precall" style="display: none"></div>
                            <div id="preview-leadgen-check" style="display: none">
                            <ul>
                                <li><span>GCLIDless education by GAM : </span> <span class="answer1">Yes</span></li>
                                <li><span>Pitched for GCLIDless : </span> <span class="answer2">Yes</span></li>
                                <li><span>OGT Setup on call : </span> <span class="answer3">Yes</span></li>
                                <li><span>Implementation Type : </span> <span class="answer4">GCLIDless</span></li>
                            </ul>
                            </div>
                            <div id="preview-seid" style="display: none"></div>
                            <div id="preview-substatus" style="display: none"></div>
                            <div id="preview-substatus-reason" style="display: none"></div>
                            <div id="preview-tasks" style="display: none"><h4><span style="font-weight: bold">Tasks Implemented: </span><span class="tasks"></span></h4></div>
                            <div id="preview-ctIds" style="display: none"></div>
                            <div id="preview-oncallcmts" style="display: none"></div>
                            <div id="preview-flupdate" style="display: none"></div>
                        </div>
                    </div>
                    </div>
                </div>
            `;

        var modalNode = document.createElement('div');
        modalNode.innerHTML = modalHtml;
        document.body.appendChild(modalNode);
        
        //collapse
        let coll = document.querySelectorAll(".collapsible");
        for (let i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var content = this.nextElementSibling;
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        }

        document.querySelector('#addToNote').addEventListener('click', addToNote);
        document.querySelector('#resetNote').addEventListener('click', resetNote);
        var modal = document.getElementById("sinature-modal");

        function addToNote() {
            // var noteHtml = `${document.querySelector('#preview-area').innerHTML = ()}`;
            caseSumary = document.querySelector('.case-summary').value;
            var caseSumaryNote = document.querySelector('[aria-label="Enter a case summary"]');
            caseSumaryNote.value = caseSumary;
            caseSumaryNote.focus();
            caseSumaryNote.dispatchEvent(new Event('input'));
            var lastUpdate = new Date().toLocaleString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' })
            document.execCommand('insertText', false, ` | updated at: ${lastUpdate}`);
            var noteHtml = document.createElement('div');
            noteHtml.innerHTML = document.querySelector('#preview-area').innerHTML;
            noteHtml.setAttribute('id', 'case-note-added');
            noteHtml.querySelectorAll('div, span').forEach(item => {
                item.setAttribute('class', '');
                item.setAttribute('id', '');
            })
            document.querySelector('.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top[card-type="case-note"] [aria-label="Case Note"]').insertAdjacentHTML("beforeend", noteHtml.innerHTML);
            document.querySelector('.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top[card-type="case-note"] [aria-label="Case Note"]').focus();
            document.execCommand("insertText", false, " ");
            waitForElm('.is-top  .section.footer card-widget.align-left:not(.hidden)').then(elm => {

            });
            modal.style.display = "none";

        }

        function resetNote() {
            document.querySelectorAll('.form-control:not(.case-summary), #pre-call-check, [name="tasks"], #follow-up-done').forEach(item => {
                item.value = '';
                item.checked = false;
                is_leadgen = false;
                document.querySelector('.collapsible.leadgen').classList.remove('active');
                var content = document.querySelector('.collapsible-content');
                content.style.maxHeight = null;
            })
            document.querySelectorAll('#preview-area div').forEach(item => {
                item.style.display = 'none';
            })
        }

        function openNote() {
            document.querySelector('.case-summary').value = caseSumary;
            openCaseNote();
            // handle form
            var closeSpan = document.querySelector('.close');
            closeSpan.onclick = function(event) {
                modal.style.display = "none";
            };
            var signatureBtn = document.getElementById('on-call-note');
            document.querySelector('#preview-precall').innerHTML = (`<ul dir="auto"><li>Emails or feedback from Advertiser/Seller (including seller request to join the call)[C]&nbsp;</li>
                <li>Call being made in business hours[C]</li>
                <li>Program ,task type (including special instructions),advertiser need and readiness [C]</li>
                <li>Related cases [C]</li>
                <li>CMS being used  [C]</li>
                <li>Gtag/GTM/GA already exists  [C] (NA applicable only for Shopping or OCT cases)</li>
                </ul>`);

            document.querySelector('#pre-call-check').addEventListener('change', function() {
                if (this.checked) {
                    document.querySelector('#preview-precall').style.display = 'block';
                } else {
                    document.querySelector('#preview-precall').style.display = 'none';
                }
            })

            document.querySelector('.collapsible.leadgen').addEventListener('click', function() {
                if (this.classList.contains('active')) {
                    is_leadgen = true
                    document.querySelector('#preview-leadgen-check').style.display = 'block';
                    addLeadgen();
                } else {
                    document.querySelector('#preview-leadgen-check').style.display = 'none';
                    is_leadgen = false;
                }
            });

            function addLeadgen() {
                var answer1 = answer2 = answer3 = 'No',
                    answer4 = 'GCLIDless';
                document.querySelector('#gclidless-education').addEventListener('change', function() {
                    answer1 = this.checked ? 'Yes' : 'No';
                    document.querySelector('.answer1').innerText = (answer1);
                });
                document.querySelector('#pitched-gclidless').addEventListener('change', function() {
                    answer2 = this.checked ? 'Yes' : 'No';
                    document.querySelector('.answer2').innerText = (answer2);
                    if (!(this.checked)) {
                        document.querySelector('.pitched-gclidless-reason').style.display = 'block';
                    } else {
                        document.querySelector('.pitched-gclidless-reason').style.display = 'none';
                    }
                })
                document.querySelector('#ogt-check').addEventListener('change', function() {
                    answer3 = this.checked ? 'Yes' : 'No';
                    document.querySelector('.answer3').innerText = (answer3);
                    if (!(this.checked)) {
                        document.querySelector('.ogt-check-reason').style.display = 'block';
                    } else {
                        document.querySelector('.ogt-check-reason').style.display = 'none';
                    }
                })
                document.querySelectorAll('input[name="imt-type"]').forEach(item => {
                    item.addEventListener('change', function() {
                        if (item.checked) {
                            answer4 = item.value;
                            document.querySelector('.answer4').innerText = (answer4);
                        }
                    });
                })
                document.querySelector('.pitched-gclidless-reason').addEventListener('blur', function() {
                    if (this.value.trim().length > 0) document.querySelector('.answer2').innerText = (answer2 + ' - ' + this.value);
                    else document.querySelector('.answer2').innerText = (answer2);
                })
                document.querySelector('.ogt-check-reason').addEventListener('blur', function() {
                    if (this.value.trim().length > 0) document.querySelector('.answer3').innerText = (answer3 + ' - ' + this.value);
                    else document.querySelector('.answer3').innerText = (answer3);
                })
            }


            document.querySelector('[aria-label="Speakeasy ID"').addEventListener('blur', function() {
                seIds = this.value.trim().split(',');
                if (this.value.trim() == '') {
                    document.querySelector('#preview-seid').innerHTML = ('');
                    return false;
                }
                if (seIds && seIds.length > 0) {
                    var seidHtml = [];
                    seIds = seIds.forEach(id => {
                        seidHtml.push(`<a class="speakeasy-recording" target="_blank" href="https://contactcenter.corp.google.com/quality/player/?recording_id=${id}">${id}</a>`)
                    });
                    document.querySelector('#preview-seid').style.display = 'block';
                    document.querySelector('#preview-seid').innerHTML = ('<h4><span style="font-weight: bold">Speakeasy Ids: </span> ' + seidHtml.join(', ') + '</h4>');
                } else {
                    document.querySelector('#preview-seid').innerHTML = ('');
                }
            });

            document.querySelector('[aria-label="Sub-status"]').addEventListener('change', function() {
                if (this.value != '') {
                    document.querySelector('#preview-substatus').style.display = 'block';
                    document.querySelector('#preview-substatus').innerHTML = ('<h4><span style="font-weight: bold">Sub-status: </span> ' + this.value + '</h4>');
                } else {
                    document.querySelector('#preview-substatus').style.display = 'none';
                    document.querySelector('#preview-substatus').innerHTML = '';
                }
            })
            document.querySelector('[aria-label="Sub-status Reason"]').addEventListener('change', function() {
                if (this.value != '') {
                    document.querySelector('#preview-substatus-reason').style.display = 'block';
                    document.querySelector('#preview-substatus-reason').innerHTML = ('<h4><span style="font-weight: bold">Sub-status Reason: </span> ' + this.value + '</h4>');
                } else {
                    document.querySelector('#preview-substatus-reason').style.display = 'none';
                    document.querySelector('#preview-substatus-reason').innerHTML = '';
                }

            })
            var taskImplemented = document.querySelector('#task');
            var taskHtml = '';
            tasks.forEach(task => {
                taskHtml += `<label class="container-checkmark">
                            <input style="top: -5px;" type="checkbox" name="tasks" id="${task}" value="${task}">
                            <span class="checkmark-checkbox" style="top: 0;"></span>
                          
                        </label> <span style="top: -5px;padding-left: 30px;"> ${task}</span><br>`;
            });
            taskImplemented.innerHTML = taskHtml;
            var taskPreviewHtml = [];
            document.querySelectorAll('#task [name="tasks"]').forEach(function(item) {
                item.addEventListener('change', function() {
                    if (item.checked) {
                        taskPreviewHtml.push(item.value);
                        if (taskPreviewHtml.length > 0) {
                            document.querySelector('#preview-tasks').style.display = 'block';
                            document.querySelector('#preview-tasks .tasks').innerHTML = taskPreviewHtml.join(', ');
                        }
                    } else {
                        taskPreviewHtml.splice(taskPreviewHtml.indexOf(item.value), 1);
                        document.querySelector('#preview-tasks .tasks').innerHTML = taskPreviewHtml.join(', ');
                        if (taskPreviewHtml.length == 0) {
                            document.querySelector('#preview-tasks').style.display = 'none';
                        }
                    }
                });
            });


            document.querySelector('[aria-label="Conversion Ids"]').addEventListener('blur', function() {
                conversionIds = this.value.split(/[,;]/);
                if (this.value.trim() == '') {
                    document.querySelector('#preview-ctIds').innerHTML = ('');
                    return false;
                }
                document.querySelector('#preview-ctIds').style.display = 'block';
                document.querySelector('#preview-ctIds').innerHTML = ('<h4><span style="font-weight: bold">Conversion Ids: </span> ' + conversionIds.join(', ') + '</h4>');
            });
            document.querySelector('#oncall-area').addEventListener('keyup', function() {
                document.querySelector('#preview-oncallcmts').style.display = 'block';
                document.querySelector('#preview-oncallcmts').innerHTML = ('<h4><span style="font-weight: bold">Oncall Comments: </span> <br/>' + this.value.replaceAll('\n', `<br/>`) + '</h4>');
            });

            document.querySelector('[aria-label="Follow up Date"]').addEventListener('change', function() {
                let flupDate = this.value ? new Date(this.value) : null;
                if (flupDate) {
                    let onlyDate = flupDate.toLocaleString('vi-VN', { year: 'numeric', month: '2-digit', day: '2-digit' });
                    document.querySelector('#preview-flupdate').style.display = 'block';
                    document.querySelector('#preview-flupdate').innerHTML = ('<h4><span style="font-weight: bold">Follow up date: </span>' + onlyDate + '</h4>');
                } else {
                    document.querySelector('#preview-flupdate').style.display = 'none';
                }
            });
            document.querySelector('#follow-up-done').addEventListener('change', function() {
                if (this.checked == true) {
                    document.querySelector('[aria-label="Follow up Date"]').setAttribute('disabled', true);
                    document.querySelector('#preview-flupdate').style.display = 'none';
                } else {
                    document.querySelector('[aria-label="Follow up Date"]').removeAttribute('disabled');
                    document.querySelector('#preview-flupdate').style.display = 'block';
                }
            });

            modal.style.display = "block";
        };

        //main
        // do something first
        var caseSumary = null;
        var caseid = null;
        var phoneNumber = null;
        var dateTime = new Date();
        var tasks = [];
        var is_leadgen = false;
        var seIds = [];
        var subStatus = null;
        var subStatusReason = null;
        var taskImplemented = [];
        var conversionIds = [];
        var oncallCmts = null;
        var flupDate = null;
        var websites = [];
        var isGCC = false;
        // get information from case
        var cid = null;
        const execFocusCase = function() {
            if (window.location.hash.substr(1).includes('case')) {
                waitForElm('input[aria-label="Enter Google Ads CID"]').then(elem => {
                    cid = elem.value;
                })

                // hightlight

                var listOfImportantFields = ['Appointment Time', 'Sales Program', 'Attribution Model for the New Conversion Action', 'Website', 'Tasks', 'Task type', 'Case Summary', 'Instructions for the Implementation (Guide)', 'Copied to'];
                listOfImportantFields.forEach(function(field, index) {
                    var xpath = `//div[contains(@class, 'form-label')][text()='${field}']//following-sibling::div`;
                    var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    if (matchingElement) {
                        matchingElement.style.backgroundColor = '#FFFC22';
                        matchingElement.style.fontWeight = 'bold';

                        if (field == 'Appointment Time') {
                            var timeOptions = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
                            var appointmentTime = new Date(matchingElement.innerText);
                            var yourLanguageTime = appointmentTime.toLocaleString('vi-VN', timeOptions);
                            if (Date(yourLanguageTime)) {
                                dateTime = yourLanguageTime;
                                matchingElement.innerText = yourLanguageTime;
                            }
                        }
                        if (field == 'Copied to') {
                            matchingElement.querySelector('.value').className += ' copied-to';
                            var siblingCopi = matchingElement.nextElementSibling;
                            while (siblingCopi != null) {
                                siblingCopi.querySelector('.value').className += ' copied-to';
                                siblingCopi = siblingCopi.nextElementSibling;
                            }
                        }
                        if (field == 'Tasks' || field == 'Task type') {
                            tasks = [];
                            tasks.push(matchingElement.innerText);
                            var siblingTask = matchingElement.nextElementSibling;
                            while (siblingTask != null) {
                                tasks.push(siblingTask.innerText);
                                siblingTask.style.background = '#FFFC22';
                                siblingTask.style.fontWeight = 'bold';
                                siblingTask = siblingTask.nextElementSibling;
                            }
                        }

                        if (field == 'Sales Program') {
                            isGCC = matchingElement.innerText.toUpperCase().includes('GCC');
                            if(ntime == 0) {
                                ntime++;
                                onClickElm('[debug-id="canned_response_button"]', 'click', function(elm){ 
                                    prepareForEmail(isGCC);
                                });
                            }
                        }
                    }
                });

                waitForElm('.case-id').then(elem => {
                    caseid = elem.innerText;
                })
                waitForElm('.more-less-button:not(.show-more)').then(elem => {
                    elem.click();
                })
                waitForElm("span[aria-label='View hidden phone number']").then(elem => {
                    elem.click();
                })
                waitForElm('[debugid="pii-phone-value"] .value').then(phone => {
                    phoneNumber = phone.innerText || 'Invalid Number';
                });
                waitForElm('.recipient-dropdown > dropdown-button .button-text').then(elem => {
                    elem.click();
                    waitForElm('material-list.options-list').then((elm) => {
                        document.querySelector('material-list.options-list .item:nth-child(1)').click();
                    });
                })
                waitForElm('[aria-label="Enter a case summary"]').then(elm => {
                    let updatedAtIdx = elm.value.indexOf(' | updated at:');
                    if (updatedAtIdx > -1) {
                        caseSumary = elm.value.slice(0, updatedAtIdx);
                    } else caseSumary = elm.value;
                })
                if (!document.querySelector('.dock-float')) {
                    renderDock()
                }
            }
        };
        execFocusCase();
        window.addEventListener('hashchange', execFocusCase)

        /**Function utility */
        function waitForElm(selector) {
            return new Promise(resolve => {
                if (document.querySelector(selector)) {
                    return resolve(document.querySelector(selector));
                }

                const observer = new MutationObserver(mutations => {
                    if (document.querySelector(selector)) {
                        resolve(document.querySelector(selector));
                        observer.disconnect();
                    }
                });

                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
            });
        }

        function openEmail() {
            let existEmail = document.querySelector('.editor #email-body-container');
            if (existEmail) {
                existEmail.click();
                existEmail.click();
            } else {
                document.querySelector('[aria-label="Create a write card"]').dispatchEvent(new Event('focus'));
                waitForElm('[aria-label="Create new email"]').then(elm => {
                    elm.click();
                    document.querySelector('[aria-label="Create a write card"]').dispatchEvent(new Event('blur'));
                });
            }
            prepareForEmail(isGCC);

        }

        function openCaseNote() {
            let existCaseNote = document.querySelector('.is-top .editor[aria-label="Case Note"]');
            if (existCaseNote) {
                existCaseNote.click();
                existCaseNote.click();
            } else {
                document.querySelector('[aria-label="Create a write card"]').dispatchEvent(new Event('focus'));
                waitForElm('[aria-label="Create new case note"]').then(elm => {
                    elm.click();
                    document.querySelector('[aria-label="Create a write card"]').dispatchEvent(new Event('blur'));
                });
            }
        }

        function adsICS() {
            var adsUrl = 'https://adwords.corp.google.com/aw/go?cid=' + cid;
            window.open(adsUrl, '_blank').focus();
        }

        function gearloose() {
            var gearlooseUrl = 'https://gearloose.corp.google.com/#/search/merchants?q=awid:' + cid;
            window.open(gearlooseUrl, '_blank').focus();
        }

        function ogtDashboard() {
            var ogtUrl = 'https://dashboards.corp.google.com/view/_7f750f18_1d9b_4f6e_82b8_70e37c1e992a?f=customer_id:eq:' + cid;
            window.open(ogtUrl, '_blank').focus();
        }

        function ecDashboard() {
            var ecUrl = 'https://dashboards.corp.google.com/view/_0ded1099_6ef3_4bc9_bba0_2445840d1b69?f=customer_id:in:' + cid;
            window.open(ecUrl, '_blank').focus();
        }

        function prepareCR() {
            var actionCR = `<button class="view-leadgen">View Leadgen Hotkey</button>
    <button class="view-tag-shopping hidden">View Tag/Shopping Hotkey</button>`
            var crTagHtml = `
    <ul id="cr-list-tag" class="cr-list" style="overflow: auto; height: 300px;">
        <li data-key="ts as new" style="color: rgb(119, 0, 135);">AS - Send First Email (ts as new)</li>
        <li data-key="ts as wip offtfr" style="color: rgb(119, 0, 135);">AS - Work in Progress - Offline Support (ts as wip offtfr)</li>
        <li data-key="ts as wip offs" style="color: rgb(119, 0, 135);">AS - Work in Progress - Offline Support (ts as wip offs)</li>
        <li data-key="ts as resched1" style="color: rgb(119, 0, 135);">AS - Reschedule 1 (ts as resched1)</li>
        <li data-key="ts as reschedok" style="color: rgb(119, 0, 135);">AS - Acceptable Reschedule (ts as reschedok)</li>

        <li data-key="ts so verif" style="color: rgb(32, 125, 2);">SO - Verified (ts so verif)</li>
        <li data-key="ts so verif nrc" style="color: rgb(32, 125, 2);">SO - Verified No Recent Conversion (ts so verif nrc)</li>
        <li data-key="ts so unv" style="color: rgb(32, 125, 2);">SO - Unverified (ts so unv)</li>
        <li data-key="ts so vnn" style="color: rgb(32, 125, 2);">SO - Verification Not Needed (ts so vnn)</li>

        <li data-key="ts ni ai" style="color: rgb(148, 78, 0);">NI - Awaiting Inputs (ts ni ai)</li>
        <li data-key="ts ni ic" style="color: rgb(148, 78, 0);">NI - In Consult (ts ni ic)</li>
        <li data-key="ts ni av" style="color: rgb(148, 78, 0);">NI - Awaiting Validation (ts ni av)</li>
        <li data-key="ts ni ac" style="color: rgb(148, 78, 0);">NI - Attempted Contact (ts ni ac)</li>
        <li data-key="ts ni oth" style="color: rgb(148, 78, 0);">NI - Other (ts ni oth)</li>

        <li data-key="ts in inf">IN - Infeasible (ts in inf)</li>
        <li data-key="ts in nrch">IN - Not Reachable (ts in nrch)</li>
        <li data-key="ts in ni">IN - Not Interested (ts in ni)</li>
        <li data-key="ts in nrdy">IN - Not Ready (ts in nrdy)</li>
        <li data-key="ts in oost">IN - Out of Scope - Rerouted to Internal Team (ts in oost)</li>
        <li data-key="ts in oosu">IN - Out of Scope - Unable to Transfer (ts in oosu)</li>
        <li data-key="ts in oos seller">IN - Out of Scope - Email to Seller (ts in oos seller)</li>
        <li data-key="ts in oth">IN - Other (ts in oth)</li>
    </ul>
    `;
            var crLeadgenHtml = `
    <ul id="cr-list-leadgen" class="cr-list hidden" style="overflow: auto; height: 300px;">
        <li data-key="lg as new" style="color: rgb(119, 0, 135);">AS - Send First Email (lg as new)</li>
        <li data-key="lg as wip offtfr" style="color: rgb(119, 0, 135);">AS - Work in Progress - Offline Support (lg as wip offtfr)</li>
        <li data-key="lg as wip offs" style="color: rgb(119, 0, 135);">AS - Work in Progress - Offline Support (lg as wip offs)</li>
        <li data-key="lg as wip seller" style="color: rgb(119, 0, 135);">AS - Work in Progress - Pre Implementation Checklist to Seller (lg as wip seller)</li>
        <li data-key="lg as resched1" style="color: rgb(119, 0, 135);">AS - Reschedule 1 (lg as resched1)</li>
        <li data-key="lg as reschedok" style="color: rgb(119, 0, 135);">AS - Acceptable Reschedule (lg as reschedok)</li>

        <li data-key="lg so verif" style="color: rgb(32, 125, 2);">SO - Verified (lg so verif)</li>
        <li data-key="lg so verif seller" style="color: rgb(32, 125, 2);">SO - Verified Email to Seller (lg so verif seller)</li>
        <li data-key="lg so oth" style="color: rgb(32, 125, 2);">SO - Others (lg so oth)</li>

        <li data-key="lg ni ai" style="color: rgb(148, 78, 0);">NI - Awaiting Inputs (lg ni ai)</li>
        <li data-key="lg ni ic" style="color: rgb(148, 78, 0);">NI - In Consult (lg ni ic)</li>
        <li data-key="lg ni av" style="color: rgb(148, 78, 0);">NI - Awaiting Validation (lg ni av)</li>
        <li data-key="lg ni ac" style="color: rgb(148, 78, 0);">NI - Attempted Contact (lg ni ac)</li>
        <li data-key="lg ni lf" style="color: rgb(148, 78, 0);">NI - Modifying leadform to accept GCLID (lg ni lf)</li>
        <li data-key="lg ni crm" style="color: rgb(148, 78, 0);">NI - Updating CRM to accept GCLID (lg ni crm)</li>
        <li data-key="lg ni imp" style="color: rgb(148, 78, 0);">NI - Preparing data for import (lg ni imp)</li>
        <li data-key="lg ni oth" style="color: rgb(148, 78, 0);">NI - Other (lg ni oth)</li>

        <li data-key="lg in inf" >IN - Infeasible (lg in inf)</li>
        <li data-key="lg in nrch" >IN - Not Reachable (lg in nrch)</li>
        <li data-key="lg in ni" >IN - Not Interested (lg in ni)</li>
        <li data-key="lg in nrdy" >IN - Not Ready (lg in nrdy)</li>
        <li data-key="lg in oost" >IN - Out of Scope - Rerouted to Internal Team (lg in oost)</li>
        <li data-key="lg in oosu" >IN - Out of Scope - Unable to Transfer (lg in oosu)</li>
        <li data-key="lg in oos seller" >IN - Out of Scope - Email to Seller (lg in oos seller)</li>
        <li data-key="lg in oth" >IN - Other (lg in oth)</li>
    </ul>
    `;
            var dialog = document.querySelector('material-dialog footer');
            var crList = document.createElement('div');
            crList.setAttribute('id', 'cr-list');
            crList.innerHTML = actionCR + crTagHtml + crLeadgenHtml;
            dialog.appendChild(crList);
            document.querySelector('.view-leadgen').addEventListener('click', function() {
                document.querySelector('#cr-list-leadgen').classList.remove('hidden');
                document.querySelector('#cr-list-tag').classList.add('hidden');
                document.querySelector('.view-leadgen').classList.add('hidden');
                document.querySelector('.view-tag-shopping').classList.remove('hidden');
            });
            document.querySelector('.view-tag-shopping').addEventListener('click', function() {
                document.querySelector('#cr-list-leadgen').classList.add('hidden');
                document.querySelector('#cr-list-tag').classList.remove('hidden');
                document.querySelector('.view-tag-shopping').classList.add('hidden');
                document.querySelector('.view-leadgen').classList.remove('hidden');
            });
            document.querySelectorAll('.cr-list li').forEach(function(cr, idx) {
                cr.addEventListener('click', function() {
                    var input = document.querySelector('canned-response-dialog search-panel input');
                    var key = this.getAttribute('data-key');
                    input.value = key;
                    input.dispatchEvent(new Event('input'));
                    input.click();
                    input.focus();
                    var divLoading = document.createElement('div');
                    divLoading.setAttribute('id', 'cr-loading');
                    divLoading.innerText = 'Loading template..';
                    divLoading.style.textAlign = 'right';
                    divLoading.style.color = 'red';
                    document.querySelector('canned-response-dialog search-panel').appendChild(divLoading);
                    waitForElm('.suggestion-list .list-item').then(elm => {
                        elm.click();
                        divLoading.remove();
                        var _title = jp_hotkey_email[key] ? jp_hotkey_email[key] : "Technical Solutions Team - Update";
                        document.querySelector('.is-top .subject').value = `${_title} [${caseid}]`;
                        document.querySelector('.is-top .subject').focus();
                        document.querySelector('.is-top .subject').dispatchEvent(new Event('input'));
                        document.execCommand('innerText', false, ' ')
                    });
                });
            });
            // dialog.appendChild(crList);
        }

        function prepareForEmail(isGCC = false) {
            waitForElm('material-dialog footer').then(dialog => {
                if (!document.querySelector('#cr-list')) { prepareCR() };
            });

            waitForElm('email-address-dropdown material-dropdown-select .address').then(elm => {
                elm.click();
                waitForElm('[id*=email-address-id--technical-solutions]').then(elm => {
                    elm.click();

                    // waitForElm('[aria-label="Insert canned response"]').then(crBtn => {
                    //     crBtn.addEventListener('click', function() {
                    //         waitForElm('material-dialog footer').then(dialog => {
                    //             if (!document.querySelector('#cr-list')) { prepareCR() };
                    //         });
                    //     });
                    // });
                    if (isGCC) {
                        var emailCC = document.evaluate('//span[contains(text(),"CC")]//following-sibling::email-address-input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                        var emailBCC = document.evaluate('//span[contains(text(),"BCC")]//following-sibling::email-address-input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                        emailBCC.querySelector('input').value = emailCC.querySelector('.value').innerText;
                        emailBCC.querySelector('input').dispatchEvent(new Event('input'));
                        if (emailCC) emailCC.querySelector('.remove').click();
                        waitForElm('focus-trap [debug-id="email"]').then(item => {
                            item.click();
                        });
                    }
                });
            });
        }

        function copyPhone() {
            navigator.clipboard.writeText(phoneNumber);
        }

        function insertText(newText, selector) {
            const textarea = document.querySelector(selector);
            textarea.focus();

            let pasted = true;
            try {
                if (!document.execCommand("insertText", false, newText)) {
                    pasted = false;
                }
            } catch (e) {
                console.error("error caught:", e);
                pasted = false;
            }

            if (!pasted) {
                console.error("paste unsuccessful, execCommand not supported");
            }
        }
        // ==== END CODE - VAN BO       
    } catch (error) {
        console.error("tagteamFocusCase => ", error);
    }

}