
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

var jp_api_blog = 'https://cdtx.lyl.vn/cdtx-assistant/filemanager_api/api.php';




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


