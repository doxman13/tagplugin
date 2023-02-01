chrome.storage.sync.get({mycountry: 'thailand',ouremail: 'xxx@google.com'}, function(result) {
console.log('Value currently is ' + result.mycountry);

	if(result.mycountry == "Vietnam") {
		
		
		console.log('Value currently is ' + result.mycountry + 'in IF ELSE') ;
		var myemail = result.ouremail;
		var x = document.createElement("p");
		x.setAttribute("id", "myspanemail");
		document.body.appendChild(x); 
		document.getElementById("myspanemail").innerHTML = myemail;
		
		(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-T5B9283');

		
		
	}else if (result.mycountry == "Thailand") {
		
		(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-5GHNQX3');

		
		console.log('Value currently is ' + result.mycountry + 'in IF ELSE') ;
		var myemail = result.ouremail;
		var x = document.createElement("p");
		x.setAttribute("id", "myspanemail");
		document.body.appendChild(x); 
		document.getElementById("myspanemail").innerHTML = myemail;
		



	}else if (result.mycountry == "China") {

		console.log('Value currently is ' + result.mycountry + 'in IF ELSE') ;
		var myemail = result.ouremail;
		var x = document.createElement("p");
		x.setAttribute("id", "myspanemail");
		document.body.appendChild(x); 
		document.getElementById("myspanemail").innerHTML = myemail;
		
		(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-N4C9XG8');


	

	}else if (result.mycountry == "Japan") {
		
		
		console.log('Value currently is ' + result.mycountry + 'in IF ELSE') ;
		var myemail = result.ouremail;
		var x = document.createElement("p");
		x.setAttribute("id", "myspanemail");
		document.body.appendChild(x); 
		document.getElementById("myspanemail").innerHTML = myemail;
		
		(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-T67C9ZK');

	}else if (result.mycountry == "Korea") {
		
		
		console.log('Value currently is ' + result.mycountry + 'in IF ELSE') ;
		var myemail = result.ouremail;
		var x = document.createElement("p");
		x.setAttribute("id", "myspanemail");
		document.body.appendChild(x); 
		document.getElementById("myspanemail").innerHTML = myemail;
		
		(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-TBMND42');

	}else if (result.mycountry == "Indonesia") {
		
		
		console.log('Value currently is ' + result.mycountry + 'in IF ELSE') ;
		var myemail = result.ouremail;
		var x = document.createElement("p");
		x.setAttribute("id", "myspanemail");
		document.body.appendChild(x); 
		document.getElementById("myspanemail").innerHTML = myemail;
		
		(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-NG2RK43');

	}else if (result.mycountry == "Other") {
		
		
		console.log('Value currently is ' + result.mycountry + 'in IF ELSE') ;
		(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-THHTK2M');	

	}
			  
		  
});
		

try {
	var s = document.createElement('script');
	s.src = chrome.extension.getURL('script.js');
	s.onload = function() {
		(document.head||document.documentElement).appendChild(s);
		var s2 = document.createElement('script');
		s2.src = chrome.extension.getURL('script.js');
		(document.head||document.documentElement).appendChild(s2);
		s2.onload = function() {
		var s3 = document.createElement('script');
		s3.src = chrome.extension.getURL('script.js');
		(document.head||document.documentElement).appendChild(s3);
		};
	};
} catch (error) {
	
}


if (window.location.hostname === "cases.connect.corp.google.com" && window.location.href.indexOf("#/case/") > - 1) {
	try {
		function createDomWithText(domText, text, id) {
			const dom = document.createElement("button");
			dom.innerText = domText;
			dom.id = id;

			var _istopelm = document.querySelector(`.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top`);
			if(_istopelm) {
				var _elmcasenote = _istopelm.querySelector(`.case-note`);
				if(_elmcasenote) {
					_elmcasenote.insertAdjacentElement("afterBegin", dom);
					
					dom.addEventListener("click", () => {
						if(typeof window.dataTagteam !== 'undefined') {
							if(window.dataTagteam.hasOwnProperty("current_case")) {
								if(window.dataTagteam.current_case.hasOwnProperty("tasks")) {

									if(window.dataTagteam.current_case.qlus_status) {
										text = text.replace(/<span class="_sub_i">[\s\S]*?<\/span>/g, `<span class="_sub_i">${window.dataTagteam.current_case.qlus_status}</span>`);
									}

									if(window.dataTagteam.current_case.tasks) {
										text = text.replace(/<span class="_task_i">[\s\S]*?<\/span>/g, `<span class="_task_i">${window.dataTagteam.current_case.tasks}</span>`);

										var _task_i = window.dataTagteam.current_case.tasks;
										if(_task_i.includes("Ads Enhanced Conversions")) {
											text = text.replace(/<span class="_document_attachurl_i">[\s\S]*?<\/span>/g, `<span class="_document_attachurl_i">DOCUMENT EC: <span data-infocase="customer_name" data-highlight="need_recheck">ZZZZ</span></span>`);
										}
									}

								}
							}
						}

						_elm_content = _istopelm.querySelector(`.editor [contenteditable="true"]`);
						_elm_content.innerHTML += text;
						_elm_content.dispatchEvent(new Event('input'));
						_elm_content.dispatchEvent(new Event('focus'));
						_elm_content.dispatchEvent(new Event('click'));
					})
				}
			}
		}


		// Select the node that will be observed for mutations
		var targetNode = document.body;

		// Options for the observer (which mutations to observe)
		var config = { attributes: true, childList: true, subtree: true };

		// Callback function to execute when mutations are observed
		var callback = function(mutationList, observer) {
			// on-call, precall button 
			var _istopelm = document.querySelector(`.write-cards-wrapper:not([style*="display:none"]):not([style*="display: none"]) card.write-card.is-top`);
			if(_istopelm) {
				if (_istopelm.querySelector("#pre-call") === null && _istopelm.querySelector("#on-call") === null) {
					createDomWithText("Precall", `<ul dir="auto"><li>Emails or feedback from Advertiser/Seller (including seller request to join the call)[C]&nbsp;</li><li>Call being made in business hours[C]</li><li>Program ,task type (including special instructions),advertiser need and readiness [C]</li><li>Related cases [C]</li><li>CMS being used  [C]</li><li>Gtag/GTM/GA already exists  [C] (NA applicable only for Shopping or OCT cases)</li></ul><span class="_document_attachurl_i"></span>`, "pre-call");
					createDomWithText("OnCall", `<b>Sub-status:&nbsp;<span class="_sub_i"></span></b>&nbsp; <p dir="auto"><b>Sub-status Reason:</b>&nbsp;</p><p dir="auto"><b>Speakeasy ID:&nbsp;</b></p><p dir="auto"><b>On Call Comments:</b>&nbsp;</p><p dir="auto"><b>Tags Implemented:</b>&nbsp;<span class="_task_i"></span></p><p dir="auto"><b>Screenshots:&nbsp;</b></p><p dir="auto"><b>Multiple CIDs:&nbsp;</b></p><p dir="auto"><b>On Call Screenshot:</b>&nbsp;</p>`, "on-call");


				}
			}
			
			// findCalendarBtn button go to calendar
			var _elmHomeTitle = document.querySelector('#read-card-tab-panel-home .section.header.home:not([style*="display:none"]):not([style*="display: none"])');
			if(_elmHomeTitle) {
				if (_elmHomeTitle.querySelector("#findCalendarBtn") === null) {
					if(document.querySelector('[debug-id="case-id"]')) {
						var _caseId = document.querySelector('[debug-id="case-id"]').innerText;
						var _findCalendarBtnHtmlStr = `<a href="https://calendar.google.com/calendar/u/0/r/search?q=${_caseId}" id="findCalendarBtn" target="_blank"
						style="
						border: 1px solid #bbb7b7;
						line-height: 0;
						padding: 11px;
						border-radius: 4px;
						color: #444;
						font-weight: 700;
						text-shadow: 1px 1px 2px #fff;
						background-color: #eee;
						margin-right: 6px;
						cursor: pointer;
						font-size: 12px;
						text-decoration: none;"
						
						>Go to Calendar</a>`;
						if(_elmHomeTitle) {
							_elmHomeTitle.insertAdjacentHTML("beforeEnd", _findCalendarBtnHtmlStr);
						}
					}
				}
			}
		};

		// Create an observer instance linked to the callback function
		var observer = new MutationObserver(callback);

		// Start observing the target node for configured mutations
		observer.observe(targetNode, config);


		
		// Later, you can stop observe
		
	} catch (error) {
		
	}
}





chrome.storage.sync.get({mycountry: 'thailand',ouremail: 'xxx@google.com'}, function(result) {
console.log('Value currently is ' + result.mycountry);

	if(result.mycountry == "Vietnam") {
		function waitForElm(selector) {return new Promise(resolve => {if (document.querySelector(selector)) {return resolve(document.querySelector(selector));
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
var sendMailBtn = document.createElement('material-button');
sendMailBtn.innerHTML = `<div class="content _ngcontent-jrt-7"><!----><material-icon size="xx-large" class="_ngcontent-jrt-13 _nghost-jrt-31"><i class="material-icon-i material-icons-extended _ngcontent-jrt-31" role="img" aria-hidden="true">contact_mail</i></material-icon></div><material-ripple aria-hidden="true" class="_ngcontent-jrt-7"></material-ripple>`;
Object.assign(sendMailBtn, {
className: 'dock-item',
style: 'cursor: pointer',
onclick: sendMail,
});
waitForElm('.decks .dock-container').then((elm) => {
	elm.appendChild(sendMailBtn);
	});function sendMail(){
var caseId = document.querySelector('.case-id').innerText;
document.querySelector('.recipient-dropdown > dropdown-button .button-text').click();
document.querySelector('[aria-label="Create a write card"]').dispatchEvent(new Event('focus'));
waitForElm('material-list.options-list').then((elm) => {
document.querySelector('material-list.options-list .item:nth-child(1)').click();
waitForElm('[debug-id="contact-info-name"]').then(elm => {waitForElm('[aria-label="Create new email"]').then(elm => {
  elm.click();
  waitForElm('email-address-dropdown material-dropdown-select .address').then(elm => {
	elm.click();
	waitForElm('[id*=email-address-id--technical-solutions]').then(elm => {
	elm.click();
	waitForElm('.is-top .subject').then(elm => {elm.value = `Đội giải pháp kỹ thuật - Xác nhận lịch hẹn [${caseId}]`;elm.dispatchEvent(new Event('input'));(function() {
	waitForElm('.editor-frame #email-body-content-top').then(emailBodyTop => {
	var xpath = `//div[contains(@class, 'form-label')][text() = 'Website']//following-sibling::div`;
	var url = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText;
	var name = document.querySelector('.internal-user-info .name').innerText;
	var inviteHtml = `<p dir="auto">Xin chào <b>${name}</b>,</p><p dir="auto">Cảm ơn bạn đã lên lịch hẹn với Đội giải pháp kỹ thuật đại diện cho Google. Người Quản lý tài khoản Google của bạn đã thay mặt bạn yêu cầu cuộc hẹn này và chúng tôi sẽ hỗ trợ bạn với mã trường hợp: <b>${caseId}</b> cho website: <b>${url}</b>.</p><p dir="auto">Vui lòng kiểm tra hộp thư đến để biết lịch mời cuộc hẹn sắp tới với chúng tôi và làm theo hướng dẫn để xác nhận tham gia. Trước khi cuộc gọi diễn ra, vui lòng xem và hoàn thành danh sách việc cần làm qua liên kết <a href="https://support.google.com/google-ads/answer/11605860?hl=vi" style="color: rgb(26, 115, 232); text-decoration-line: none;" class="ignore-globals">này</a>.</p><p dir="auto">Nếu bạn có bất kỳ câu hỏi nào trước cuộc gọi với chúng tôi hoặc muốn thêm người tham gia, vui lòng cho chúng tôi biết bằng cách trả lời email này hoặc liên hệ với Người Quản lý tài khoản Google của bạn</p><p dir="auto">Chúng tôi rất mong được làm việc với bạn.</p><p dir="auto">Trân trọng,<div style="font:normal 13px/17px Roboto,sans-serif;display:block">&nbsp;</div><div style="font:normal 13px/17px Roboto,sans-serif;display:block">`;
	var agentSign = '<div style="font:normal 13px/17px Roboto,sans-serif;display:block">'+emailBodyTop.querySelectorAll('.replaced')[1].innerHTML+'</div>';
	var note = `<div style="font:normal 13px/17px Roboto,sans-serif;display:block">&nbsp;</div><div style="font:normal 13px/17px Roboto,sans-serif;display:block"><em>Lưu ý: Nếu sau này bạn cần nêu mã vé hỗ trợ này, thì mã là <span class="replaced">${caseId}</span></em></div>`;
	emailBodyTop.innerHTML = inviteHtml + agentSign+note;document.execCommand("insertText",false," ");})})();});
  });
  });
});});
document.querySelector('[aria-label="Create a write card"]').dispatchEvent(new Event('blur'));
});
}

	} else if (result.mycountry == "Thailand") {


		function waitForElm(selector) {return new Promise(resolve => {if (document.querySelector(selector)) {return resolve(document.querySelector(selector));
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

		var sendMailBtn = document.createElement('material-button');
		sendMailBtn.innerHTML = `<div class="content _ngcontent-jrt-7"><!----><material-icon size="xx-large" class="_ngcontent-jrt-13 _nghost-jrt-31"><i class="material-icon-i material-icons-extended _ngcontent-jrt-31" role="img" aria-hidden="true">contact_mail</i></material-icon></div><material-ripple aria-hidden="true" class="_ngcontent-jrt-7"></material-ripple>`;
		Object.assign(sendMailBtn, {
		className: 'dock-item',
		style: 'cursor: pointer',
		onclick: sendMail,
		});
		waitForElm('.decks .dock-container').then((elm) => {
		elm.appendChild(sendMailBtn);
		});
		function sendMail(){
		var caseId = document.querySelector('.case-id').innerText;
		document.querySelector('.recipient-dropdown > dropdown-button .button-text').click();
		document.querySelector('[aria-label="Create a write card"]').dispatchEvent(new Event('focus'));
		waitForElm('material-list.options-list').then((elm) => {
		document.querySelector('material-list.options-list .item:nth-child(1)').click();
		waitForElm('[debug-id="contact-info-name"]').then(elm => {waitForElm('[aria-label="Create new email"]').then(elm => {
		  elm.click();
		  waitForElm('email-address-dropdown material-dropdown-select .address').then(elm => {
			elm.click();
			waitForElm('[id*=email-address-id--technical-solutions]').then(elm => {
			elm.click();
			waitForElm('.is-top .subject').then(elm => {elm.value = `ทีมแก้ปัญหาด้านเทคนิค - [${caseId}]`;elm.dispatchEvent(new Event('input'));(function() {
			waitForElm('.editor-frame #email-body-content-top-content').then(elm => {
			var xpath = `//div[contains(@class, 'form-label')][text() = 'Website']//following-sibling::div`; //
			var url = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText;
			var name = document.querySelector('.internal-user-info .name').innerText;
			var inviteHtml = `<p dir="auto">สวัสดี <b>${name}</b>,</p><p dir="auto">ขอบคุณที่ทำการนัดหมายกับเราทีมแก้ปัญหาด้านเทคนิค ตัวแทน Google ของเราได้ร้องขอการนัดหมายนี้ในนามของคุณ และเราจะทำการช่วยเหลือคุณในหมายเลขเคส  <b>${caseId}</b> สำหรับ: <b>${url}</b>.</p><p dir="auto">โปรดตรวจสอบกล่องจดหมายอีเมลของคุณสำหรับการนัดหมายกับทางเราและทำตามขั้นตอนตามนั้นเพื่อยืนยันการเข้าร่วมของคุณ ในการเตรียมตัวสำหรับการโทรของเรา โปรดตรวจสอบและกรอกรายการสิ่งที่ต้องทำที่ลิงก์ไว้ <a href="https://support.google.com/google-ads/answer/11605860?hl=th" style="color: rgb(26, 115, 232); text-decoration-line: none;" class="ignore-globals">ที่นี่</a>.</p><p dir="auto">หากคุณมีคำถามใด ๆ ก่อนการโทรนัดหมาย&nbsp; หรือต้องการเชิญผู้เข้าร่วมเพิ่มเติม&nbsp; โปรดแจ้งให้เราทราบผ่านการตอบกลับอีเมลฉบับนี้&nbsp; หรือติดต่อผู้ดูแลบัญชีของคุณ เรายินดีที่จะช่วยเหลือคุณ</p><p dir="auto">ด้วยความเคารพ,<div style="font:normal 13px/17px Roboto,sans-serif;display:block">&nbsp;</div><div style="font:normal 13px/17px Roboto,sans-serif;display:block">`;
			var emailBodyTop = document.querySelector('.editor-frame #email-body-content-top-content');
			var agentSign = emailBodyTop.querySelector('.replaced:last-child').innerHTML;
			emailBodyTop.innerHTML = inviteHtml + agentSign;document.execCommand("insertText",false," ");})})();});
		  });
		  });
		});});
		document.querySelector('[aria-label="Create a write card"]').dispatchEvent(new Event('blur'));
		});
		}
		

	}else if (result.mycountry == "China") {


		
		function waitForElm(selector) {return new Promise(resolve => {if (document.querySelector(selector)) {return resolve(document.querySelector(selector));
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

		var sendMailBtn = document.createElement('material-button');
		sendMailBtn.innerHTML = `<div class="content _ngcontent-jrt-7"><!----><material-icon size="xx-large" class="_ngcontent-jrt-13 _nghost-jrt-31"><i class="material-icon-i material-icons-extended _ngcontent-jrt-31" role="img" aria-hidden="true">contact_mail</i></material-icon></div><material-ripple aria-hidden="true" class="_ngcontent-jrt-7"></material-ripple>`;
		Object.assign(sendMailBtn, {
		className: 'dock-item',
		style: 'cursor: pointer',
		onclick: sendMail,
		});
		waitForElm('.decks .dock-container').then((elm) => {
		elm.appendChild(sendMailBtn);
		});
		function sendMail(){
		var caseId = document.querySelector('.case-id').innerText;
		document.querySelector('.recipient-dropdown > dropdown-button .button-text').click();
		document.querySelector('[aria-label="Create a write card"]').dispatchEvent(new Event('focus'));
		waitForElm('material-list.options-list').then((elm) => {
		document.querySelector('material-list.options-list .item:nth-child(1)').click();
		waitForElm('[debug-id="contact-info-name"]').then(elm => {waitForElm('[aria-label="Create new email"]').then(elm => {
		  elm.click();
		  waitForElm('email-address-dropdown material-dropdown-select .address').then(elm => {
			elm.click();
			waitForElm('[id*=email-address-id--technical-solutions]').then(elm => {
			elm.click();
			waitForElm('.is-top .subject').then(elm => {elm.value = `技术解决方案团队-预约确认 [${caseId}]`;elm.dispatchEvent(new Event('input'));(function() {
			waitForElm('.editor-frame #email-body-content-top-content').then(elm => {
			var xpath = `//div[contains(@class, 'form-label')][text() = 'Website']//following-sibling::div`;
			var url = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText;
			var name = document.querySelector('.internal-user-info .name').innerText;
			var inviteHtml = `<p dir="auto">您好 <b>${name}</b>,</p><p dir="auto">感谢您安排与代表 Google 的技术解决方案团队的会议。您的 Google 客户经理代表您申请了此次预约，我们将协助您提供案例代码: <b>${caseId}</b> 于网站: <b>${url}</b>.</p><p dir="auto">请检查您的收件箱以了解即将与我们进行的会议，并按照说明确认您的参与。通话前，请通过链接查看并完成待办事项清单 <a href="https://support.google.com/google-ads/answer/11605860?hl=zh-Hans" style="color: rgb(26, 115, 232); text-decoration-line: none;" class="ignore-globals">这个</a>.</p><p dir="auto">如果您在与我们通话前有任何疑问或希望更多参与者，请回复此电子邮件或联系您的 Google 客户经理告知我们。</p><p dir="auto">我们期待着与您的合作。</p><p dir="auto">致此，<div style="font:normal 13px/17px Roboto,sans-serif;display:block">&nbsp;</div><div style="font:normal 13px/17px Roboto,sans-serif;display:block">`;
			var emailBodyTop = document.querySelector('.editor-frame #email-body-content-top-content');
			var agentSign = emailBodyTop.querySelector('.replaced:last-child').innerHTML;
			emailBodyTop.innerHTML = inviteHtml + agentSign;document.execCommand("insertText",false," ");})})();});
		  });
		  });
		});});
		document.querySelector('[aria-label="Create a write card"]').dispatchEvent(new Event('blur'));
		});
		}

	}else if (result.mycountry == "Japan") {
		
	function waitForElm(selector) {return new Promise(resolve => {if (document.querySelector(selector)) {return resolve(document.querySelector(selector));
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

		var sendMailBtn = document.createElement('material-button');
		sendMailBtn.innerHTML = `<div class="content _ngcontent-jrt-7"><!----><material-icon size="xx-large" class="_ngcontent-jrt-13 _nghost-jrt-31"><i class="material-icon-i material-icons-extended _ngcontent-jrt-31" role="img" aria-hidden="true">contact_mail</i></material-icon></div><material-ripple aria-hidden="true" class="_ngcontent-jrt-7"></material-ripple>`;
		Object.assign(sendMailBtn, {
		className: 'dock-item',
		style: 'cursor: pointer',
		onclick: sendMail,
		});
		waitForElm('.decks .dock-container').then((elm) => {
		elm.appendChild(sendMailBtn);
		});
		function sendMail(){
		var caseId = document.querySelector('.case-id').innerText;
		document.querySelector('.recipient-dropdown > dropdown-button .button-text').click();
		document.querySelector('[aria-label="Create a write card"]').dispatchEvent(new Event('focus'));
		waitForElm('material-list.options-list').then((elm) => {
		document.querySelector('material-list.options-list .item:nth-child(1)').click();
		waitForElm('[debug-id="contact-info-name"]').then(elm => {waitForElm('[aria-label="Create new email"]').then(elm => {
		  elm.click();
		  waitForElm('email-address-dropdown material-dropdown-select .address').then(elm => {
			elm.click();
			waitForElm('[id*=email-address-id--technical-solutions]').then(elm => {
			elm.click();
			waitForElm('.is-top .subject').then(elm => {elm.value = `テクニカルソリューションチームより：予約の確認 - [${caseId}]`;elm.dispatchEvent(new Event('input'));(function() {
			waitForElm('.editor-frame #email-body-content-top-content').then(elm => {
			var xpath = `//div[contains(@class, 'form-label')][text() = 'Website']//following-sibling::div`;
			var url = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText;
			var name = document.querySelector('.internal-user-info .name').innerText;
			var inviteHtml = `<p dir="auto"><b>${name}</b>様</p>
<p dir="auto">Google テクニカルソリューションチームにご予約いただき誠にありがとうございます。Google 広告アカウント担当者より依頼を受け、 <b>${url}</b> のケース ID  <b>${caseId}</b>についてサポートいたします。</p>

<p dir="auto">Eメールで、本サポートのためのカレンダーの招待状をお送りしております。その指示に従い、出席をご確認ください。また事前準備として、 <a href="https://support.google.com/google-ads/answer/11605860?hl=ja" style="color: rgb(26, 115, 232); text-decoration-line: none;" class="ignore-globals">こちらの To Do リスト</a>のチェックリストも完了しておいてください。</p>

<p dir="auto">お時間になりましたらカレンダーに記載された Google Meet の URL を開き、「参加をリクエスト」してください。（お時間になってもMeetに参加されないようであれば、お電話差し上げます。）</p>

<p dir="auto">できれば Chrome で開いていただき、カメラは OFF （音声のみ）でお願いいたします。お手元に、該当 Google 広告アカウントの管理画面と、対象のウェブサイトの編集画面（またはタグマネジャーの管理画面） をご用意下さい。</p>

<p dir="auto">ご予約日前に質問がある場合、または参加者を追加したい場合は、このメールに返信するか、Google の営業担当者に連絡してお知らせください。 </p>

<p dir="auto">どうぞよろしくお願いいたします。<div style="font:normal 13px/17px Roboto,sans-serif;display:block">`;
			var emailBodyTop = document.querySelector('.editor-frame #email-body-content-top-content');
			var agentSign = emailBodyTop.querySelector('.replaced:last-child').innerHTML;
			emailBodyTop.innerHTML = inviteHtml + agentSign;document.execCommand("insertText",false," ");})})();});
		  });
		  });
		});});
		document.querySelector('[aria-label="Create a write card"]').dispatchEvent(new Event('blur'));
		});
		}
	}else if (result.mycountry == "Korea") {
		
	function waitForElm(selector) {return new Promise(resolve => {if (document.querySelector(selector)) {return resolve(document.querySelector(selector));
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

		var sendMailBtn = document.createElement('material-button');
		sendMailBtn.innerHTML = `<div class="content _ngcontent-jrt-7"><!----><material-icon size="xx-large" class="_ngcontent-jrt-13 _nghost-jrt-31"><i class="material-icon-i material-icons-extended _ngcontent-jrt-31" role="img" aria-hidden="true">contact_mail</i></material-icon></div><material-ripple aria-hidden="true" class="_ngcontent-jrt-7"></material-ripple>`;
		Object.assign(sendMailBtn, {
		className: 'dock-item',
		style: 'cursor: pointer',
		onclick: sendMail,
		});
		waitForElm('.decks .dock-container').then((elm) => {
		elm.appendChild(sendMailBtn);
		});
		function sendMail(){
		var caseId = document.querySelector('.case-id').innerText;
		document.querySelector('.recipient-dropdown > dropdown-button .button-text').click();
		document.querySelector('[aria-label="Create a write card"]').dispatchEvent(new Event('focus'));
		waitForElm('material-list.options-list').then((elm) => {
		document.querySelector('material-list.options-list .item:nth-child(1)').click();
		waitForElm('[debug-id="contact-info-name"]').then(elm => {waitForElm('[aria-label="Create new email"]').then(elm => {
		  elm.click();
		  waitForElm('email-address-dropdown material-dropdown-select .address').then(elm => {
			elm.click();
			waitForElm('[id*=email-address-id--technical-solutions]').then(elm => {
			elm.click();
			waitForElm('.is-top .subject').then(elm => {elm.value = `기술 솔루션 팀 - 사전 준비 사항 안내 [${caseId}]`;elm.dispatchEvent(new Event('input'));(function() {
			waitForElm('.editor-frame #email-body-content-top-content').then(elm => {
			var xpath = `//div[contains(@class, 'form-label')][text() = 'Website']//following-sibling::div`;
			var url = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText;
			var name = document.querySelector('.internal-user-info .name').innerText;
			var inviteHtml = `<p dir="auto">안녕하세요 <b>${name} 님</b>,</p>
<p dir="auto">Google 기술 솔루션팀과 일정 예약을 해주셔서 감사합니다. 고객님의 Google 담당자가 이 미팅 일정을 요청하셨고 저희는 <b>${url}</b>의 케이스 <b>${caseId}</b>에 대해 지원을 드릴 예정입니다.</p>
<p dir="auto"> 저희 기술 솔루션팀과의 예정된 미팅 일정 초대 이메일을 확인해주시고 지침에 따라 미팅 일정 참석에 대해 답변해주시기 바랍니다. 상담을 준비하기 위해, <a href="https://support.google.com/google-ads/answer/11605860?hl=ko" style="color: rgb(26, 115). , 232); text-decoration-line: none;" class="ignore-globals">여기</a>를 확인하셔서 할 일 목록을 검토해주시기 바랍니다.</p>
<p dir="auto">상담 전 다른 문의가 있으시거나 미팅에 다른 참석자가 있는 경우, 이 이메일에 회신 주시거나 고객님의 Google 계정 담당자님께 문의 부탁드립니다.</p>
<p dir="auto">감사합니다.<div style="font:normal 13px/17px Roboto,sans-serif;display:block">&nbsp;</div><div style="font:normal 13px/17px Roboto,sans-serif;display:block">`;
			var emailBodyTop = document.querySelector('.editor-frame #email-body-content-top-content');
			var agentSign = emailBodyTop.querySelector('.replaced:last-child').innerHTML;
			emailBodyTop.innerHTML = inviteHtml + agentSign;document.execCommand("insertText",false," ");})})();});
		  });
		  });
		});});
		document.querySelector('[aria-label="Create a write card"]').dispatchEvent(new Event('blur'));
		});
		}
		
	}else if (result.mycountry == "Indonesia") {
		
		function waitForElm(selector) {return new Promise(resolve => {if (document.querySelector(selector)) {return resolve(document.querySelector(selector));
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

		var sendMailBtn = document.createElement('material-button');
		sendMailBtn.innerHTML = `<div class="content _ngcontent-jrt-7"><!----><material-icon size="xx-large" class="_ngcontent-jrt-13 _nghost-jrt-31"><i class="material-icon-i material-icons-extended _ngcontent-jrt-31" role="img" aria-hidden="true">contact_mail</i></material-icon></div><material-ripple aria-hidden="true" class="_ngcontent-jrt-7"></material-ripple>`;
		Object.assign(sendMailBtn, {
		className: 'dock-item',
		style: 'cursor: pointer',
		onclick: sendMail,
		});
		waitForElm('.decks .dock-container').then((elm) => {
		elm.appendChild(sendMailBtn);
		});
		function sendMail(){
		var caseId = document.querySelector('.case-id').innerText;
		document.querySelector('.recipient-dropdown > dropdown-button .button-text').click();
		document.querySelector('[aria-label="Create a write card"]').dispatchEvent(new Event('focus'));
		waitForElm('material-list.options-list').then((elm) => {
		document.querySelector('material-list.options-list .item:nth-child(1)').click();
		waitForElm('[debug-id="contact-info-name"]').then(elm => {waitForElm('[aria-label="Create new email"]').then(elm => {
		  elm.click();
		  waitForElm('email-address-dropdown material-dropdown-select .address').then(elm => {
			elm.click();
			waitForElm('[id*=email-address-id--technical-solutions]').then(elm => {
			elm.click();
			waitForElm('.is-top .subject').then(elm => {elm.value = `Tim Technical Solution - [${caseId}]`;elm.dispatchEvent(new Event('input'));(function() {
			waitForElm('.editor-frame #email-body-content-top-content').then(elm => {
			var xpath = `//div[contains(@class, 'form-label')][text() = 'Website']//following-sibling::div`;
			var url = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerText;
			var name = document.querySelector('.internal-user-info .name').innerText;
			var inviteHtml = `<p dir="auto">Halo! <b>${name}</b>,</p><p dir="auto">Terimakasih telah menjadwalkan pertemuan dengan tim Google Technical Solutions. Perwakilan Google anda telah mengajukan penjadwalan ini atas nama Anda dan kami akan membantu Anda dalam kasus <b>${caseId}</b> untuk: <b>${url}</b>.</p><p dir="auto"> Mohon periksa kotak masuk email Anda untuk mendapatkan undangan Google Calendar pertemuan yang akan datang bersama tim kami dan untuk mengkonfirmasi pertemuan Anda tersebut, dimohon untuk mengikuti petunjuk yang tersedia di dalam tautan berikut <a href="https://support.google.com/google-ads/answer/11605860?hl=id" style="color: rgb(26, 115). , 232); text-decoration-line: none;" class="ignore-globals">di sini</a>.</p><p dir="auto">Jika Anda memiliki pertanyaan sebelum panggilan berlangsung.&nbsp; atau ingin mengundang lebih banyak peserta &nbsp; Beri tahu kami dengan membalas email ini.&nbsp; atau hubungi Akun Manager Anda. Kami senang dapat bekerja sama dengan Anda!.</p><p dir="auto">Hormat Kami,<div style="font:normal 13px/17px Roboto,sans-serif;display:block">&nbsp;</div><div style="font:normal 13px/17px Roboto,sans-serif;display:block">`;
			var emailBodyTop = document.querySelector('.editor-frame #email-body-content-top-content');
			var agentSign = emailBodyTop.querySelector('.replaced:last-child').innerHTML;
			emailBodyTop.innerHTML = inviteHtml + agentSign;document.execCommand("insertText",false," ");})})();});
		  });
		  });
		});});
		document.querySelector('[aria-label="Create a write card"]').dispatchEvent(new Event('blur'));
		});
		}
		
	}else if (result.mycountry == "Other") {
		
		
		console.log('Value currently is ' + result.mycountry + 'in IF ELSE') ;
		(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-THHTK2M');	

	}
			  
		  
});


//Auto refresh and check on Unassigned page in connect dash

setInterval(function () {
	if(window.location.href === "https://appointments.connect.corp.google.com/" && document.querySelector('input:checked + label').textContent === "Unbooked "){
    	
    	document.querySelector('[mattooltip="Refresh"]').click();
       	console.log('click refrehs button - dash page test test'); 

    	setTimeout(function () {
    	if( 
        	document.querySelector('.is-empty') !== null) {console.log('no unassigned case yet')
    	} else {
        	console.log('checking cases')
        	chrome.runtime.sendMessage({textyou: "toNotifyNoAppt"});
    	}
                         
		}, 120000);   	 
	}
                    
}, 600000);


