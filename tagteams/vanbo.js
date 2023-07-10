// Lib 
try {
    // For group and detech
    function vanBoCodeHere(){
        function detectConnectcase(){
            //code vanbo new
            function convertHour(time) {
                var hoursMinutes = time.split(/[.:]/);
                var hours = parseInt(hoursMinutes[0], 10);
                var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
                return hours + minutes / 60;
            }
            function detectTime()  {
                document.querySelectorAll('[id*="tsc"]').forEach(function(item){
                    let date = item.innerText.split(',')[2].trim()
                    let newDate = new Date(date)
                    let today = new Date()
                    if(newDate.getDate() == today.getDate()){
                        let todayEvent = item.parentElement.querySelector('[role="presentation"]')
                        todayEvent.querySelectorAll('[jslog]').forEach(function(evt){
                            let caseTitle = evt.querySelector('.FAxxKc').innerText.match(/\d-\d+/g);
                            if(caseTitle){
                                let timeApp = evt.querySelector('.YSbf0c div:nth-child(2)')
                                if(timeApp){
                                    timeApp = timeApp.innerText;
                                    let ampm = timeApp.split(' – ')[1].match(/am|pm/) ? timeApp.split(' – ')[1].match(/am|pm/)[0] : null;
                                    let start = timeApp.split(' – ')[0]
                                    start = start.match(/am|pm/) ? start : start + ampm
                                    let newStart = start.match(/\d+:\d+/) ? start.match(/\d+:\d+/)[0] : start
                                    if(newStart) start = convertHour(newStart)
                                    if(ampm.endsWith('am')){
                                        start = convertHour(newStart)
                                    } else if (ampm.endsWith('pm')) {
                                        start = Math.floor(start)==12||Math.floor(start)==11 ? start : start+12
                                    }
                                console.log(start)
                                let tempDate = new Date()
                                let decimalPart = start- Math.floor(start)
                                if(decimalPart == 0) {
                                    tempDate.setHours(start-1);
                                    tempDate.setMinutes(decimalPart*60 + 55)
                                } else {
                                    tempDate.setHours(start)
                                    tempDate.setMinutes(decimalPart*60 - 5)
                                }
                                
                                tempDate.setSeconds(0)
                                events[caseTitle] = tempDate
                                }
                            }
                        })
                        
                    }
                })
                if(new Date().getHours() > 19) clearInterval(notifyTime)
            }
            function notifyTime(){
                // Tạm thời tắt để theo dõi
                // let time = new Date()
                // console.log(time)
                // Object.keys(events).forEach(evt => {
                //     let nearEvent = events[evt]
                //     let caseid = evt
                //     if(nearEvent.getHours() == time.getHours() && nearEvent.getMinutes() == time.getMinutes()){
                //     console.log('vanbo anoucement: your case '+caseid+' is comming')
                //         window.open('https://appointments.connect.corp.google.com/appointmentDetails?caseId='+caseid,
                //         'window',
                //         'fullscreen'
                //         );
                //     }
                // })
                // if(time.getHours() > 19) clearInterval(notifyTime)
            }
            var events = {};
            detectTime();
            var countEvent = setInterval(detectTime, 1000*60*15)
            var notifyEvent = setInterval(notifyTime, 1000*60)
            //end code vanbo
        }


        // Run
        if(window.location.href.includes('appointments.connect.corp.google.com/appointmentDetails')){
            var startTime = document.querySelector('.content-time p').innerText
            var date = document.querySelector('.content > p').innerText;
            var now = new Date()
            var oncallDate = new Date(date+' '+startTime)
            oncallDate.setFullYear(now.getFullYear())
            var mins2mlsecond = 1000*60;
            var callTime = (oncallDate - now)/mins2mlsecond;
            console.log(callTime+' last')
            console.log(oncallDate)
            if(callTime > 5) {
                clearInterval(checkTime)
                audio.pause();
            } 
            else audio.play();
            var checkTime = setInterval(() => {
                console.log(new Date())
                audio.play();
                if(callTime>5) clearInterval(checkTime);
            }, 1000*60);
            var oncallButton = document.querySelector('mat-slide-toggle')
            if(oncallButton){
                oncallButton.addEventListener('click', function(){
                    audio.pause();
                })
            }
            var isCommingAppointment = document.querySelector('.mdc-button');
            if(isCommingAppointment){
                var caseid = new URLSearchParams(location.search).get('caseId')
                var caseURL = 'https://cases.connect.corp.google.com/' + caseid;
                isCommingAppointment.addEventListener('click', function(){
                    window.open(isCommingAppointment.href,'_blank')
                    window.open(caseURL, '_blank')
                })
            }
            
        } else if (window.location.href.includes('appointments.connect.corp.google.com/appointmentDetails')) {
            console.log('asdfasfdasdfasdfasdfasdf')
        }

        if(location.hostname === 'calendar.google.com') {
            detectConnectcase();
        }
    }
} catch (error) {
    console.error('vanbo - ', error);
}

var tagteamFocusCase = () => {
    try {
        
        // ==== CODE - VAN BO
        
        // Once for All
        if(location.hostname !== 'cases.connect.corp.google.com') return false;
        
        
        cLog(() => {console.log("CODE VAN BO LOAD")});
        

        var ntime = 0;
        var css = `
        
        #preview-note {
            width: 100%;
            height: 800px;
            position: relative;
            padding-top: 40px;
        }
        
        #preview-note #preview-area {
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
        
        .dock-float {
            width: auto;
            height: 60px;
            border-radius: 16px;
            display: flex;
            justify-content: center;
            bottom: 5px;
            left: 50%;
            z-index: 999;
        }
        
        .dock-float .dock-float-container {
            padding: 3px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 2px dashed #ccc;
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
            width: 40px;
            height: 40px;
            vertical-align: bottom;
            transform-origin: 50% 100%;
            cursor: pointer;
        }
        
        
        .dock-float .dock-float-container li .ico {
            width: 100%;
            height: 100%;
            object-fit: contain;
            height: 28px;
            filter: grayscale(1);
        }

        .dock-float .dock-float-container li .ico:hover {
            filter: grayscale(0);
        }
        
        
        
        
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
        }
        
        .toggler-wrapper .toggler-knob {
            position: absolute;
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
            if(!document.querySelector('[debug-id="case-summary-input"]')) return false;
            
            var dock_float_html = `<div class="dock-float">
                <div class="dock-float-container">
                    <li class="li-2 open-email">
                        <img class="ico" src="data:image/svg+xml,%0A%3Csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 792.77 634.22'%3E%3Ctitle%3Email (2)%3C/title%3E%3Cpath d='M160.9,82.89H639.1c17.39,0,32.39,0,44.81.85,13.07.89,26.15,2.85,39.07,8.2a118.9,118.9,0,0,1,64.35,64.36c5.36,12.92,7.32,26,8.21,39.07.85,12.42.85,27.42.85,44.81V559.82c0,17.39,0,32.39-.85,44.81-.89,13.07-2.85,26.15-8.21,39.07A118.9,118.9,0,0,1,723,708.06c-12.92,5.35-26,7.31-39.07,8.21-12.42.84-27.42.84-44.81.84H160.9c-17.39,0-32.39,0-44.81-.84-13.07-.9-26.15-2.86-39.07-8.21A118.92,118.92,0,0,1,12.66,643.7c-5.35-12.92-7.31-26-8.2-39.07-.85-12.42-.85-27.42-.85-44.81V240.18c0-17.39,0-32.39.85-44.81.89-13.07,2.85-26.15,8.2-39.07A118.92,118.92,0,0,1,77,91.94c12.92-5.35,26-7.31,39.07-8.2C128.51,82.89,143.51,82.89,160.9,82.89ZM95.47,173.18a39.64,39.64,0,0,1,55.94-3.73L373.9,364.13a39.65,39.65,0,0,0,52.2,0L648.59,169.45a39.64,39.64,0,0,1,52.21,59.66L478.31,423.79a118.92,118.92,0,0,1-156.62,0L99.2,229.11A39.64,39.64,0,0,1,95.47,173.18Z' transform='translate(-3.61 -82.89)' fill='%23a8046d' fill-rule='evenodd'/%3E%3C/svg%3E"
                            style="height: 25px; top: 4px; opacity: 0.7;"
                            alt="">
                    </li>
                    <li class="li-5 open-note">
                        <img class="ico" src="data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 800 800' style='enable-background:new 0 0 800 800;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:none;stroke:%232196F3;stroke-width:70;stroke-linecap:round;stroke-linejoin:round;%7D%0A%3C/style%3E%3Cg%3E%3Cpath id='Vector' class='st0' d='M283.7,124.6H172.1c-44.7,0-67,0-84,8.7c-15,7.6-27.2,19.8-34.8,34.8c-8.7,17.1-8.7,39.4-8.7,84 v382.7c0,44.7,0,67,8.7,84c7.6,15,19.8,27.2,34.8,34.9c17,8.7,39.4,8.7,83.9,8.7h382.9c44.6,0,66.8,0,83.9-8.7 c15-7.6,27.2-19.9,34.9-34.9c8.7-17,8.7-39.3,8.7-83.9V523.3 M522.9,164.5L283.7,403.7v119.6h119.6l239.2-239.2 M522.9,164.5 L642.5,44.9l119.6,119.6L642.5,284.1 M522.9,164.5l119.6,119.6'/%3E%3C/g%3E%3C/svg%3E%0A"
                            alt="">
                    </li>
                    <li class="li-10">
                        <img class="ico ads-ics"
                            src="data:image/svg+xml,%3Csvg fill='%23000000' width='800px' height='800px' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.989 1.396h0.032c1.197 0 2.307 0.401 3.197 1.073h0.005c0.615 0.463 1.125 1.057 1.489 1.733l5.953 10.36 0.036 0.083 4.557 7.907c0.485 0.817 0.74 1.755 0.74 2.713 0 0.751-0.156 1.469-0.437 2.12l0.005 0.021c-0.213 0.484-0.495 0.927-0.844 1.328-0.396 0.459-0.864 0.853-1.396 1.156-0.787 0.459-1.683 0.703-2.593 0.713h-0.089c-1.156 0-2.276-0.375-3.197-1.073h-0.005c-0.615-0.463-1.125-1.057-1.489-1.733l-5.953-10.36-0.036-0.083-4.579-7.943c-0.473-0.813-0.719-1.735-0.719-2.677 0-0.563 0.088-1.109 0.251-1.62l0.009-0.032 0.016-0.041c0.068-0.208 0.156-0.448 0.156-0.448 0.208-0.479 0.495-0.921 0.833-1.312l0.084-0.099 0.020-0.021v-0.005h0.005l0.011-0.016 0.011-0.004c0.359-0.396 0.787-0.745 1.276-1.027 0.787-0.459 1.683-0.703 2.593-0.713zM5.344 30.604h-0.079c-0.911-0.011-1.807-0.255-2.593-0.713-0.532-0.303-1-0.697-1.396-1.156-0.349-0.401-0.631-0.844-0.844-1.328l0.005-0.021c-0.292-0.667-0.437-1.391-0.437-2.12 0-0.995 0.271-1.921 0.74-2.713l4.557-7.907 0.036-0.083 4.052-7.047c0.099 0.859 0.364 1.703 0.792 2.473l0.077 0.131 4.5 7.807v-0.015l0.089 0.192 0.385 0.677-5.183 9.016c-0.364 0.676-0.875 1.271-1.489 1.733h-0.005c-0.921 0.699-2.041 1.073-3.197 1.073z' fill='%232196f3' /%3E%3C/svg%3E"
                            alt=""
                        >
                    </li>
                    <li class="li-11">
                        <img class="ico open-gearloose"
                            src="data:image/svg+xml,%3Csvg height='800px' width='800px' version='1.1' id='_x32_' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 512 512' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%23FF5722;%7D%0A%3C/style%3E%3Cg%3E%3Cpath class='st0' d='M442.973,250.491c-25.635,18.05-196.165,53.474-141.134-74.936c3.975-11.693,6.732-29.452,6.732-42.457 c0-64.839-53.389-117.403-119.24-117.403c-50.361,0-93.398,30.764-110.867,74.224c-34.196,6.826-42.062-6.929-48.861-22.794 C22.261,50.005,3.509,54.898,0.255,76.915c-2.288,15.462,10.727,57.347,44.004,70.52c-9.423,4.482-17.365,10.671-24.444,18.754 c-9.507,10.877,2.654,29.198,16.147,24.566c12.733-4.37,32.433-6.001,45.419-6.358c5.814,13.109,13.09,24.398,19.972,33.568 c7.351,9.799-3.319,16.916-25.936,53.812c-30.979,50.549-35.874,117.403,2.992,165.822 c46.497,57.937,139.418,58.706,242.137,58.706c141.998,0,178.706-146.076,188.466-205.456 C521.529,214.702,493.813,214.702,442.973,250.491z M153.119,131.945c-10.802,0-19.559-8.758-19.559-19.569 c0-10.802,8.758-19.569,19.559-19.569c10.811,0,19.569,8.767,19.569,19.569C172.688,123.187,163.93,131.945,153.119,131.945z' /%3E%3C/g%3E%3C/svg%3E"
                        >
                    </li>
                    <li class="li-12">
                        <img class="ico ogt-dashboard"
                            src="data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 800 800' style='enable-background:new 0 0 800 800;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%232196F3;%7D .st1%7Bfill:%23191919;%7D .st2%7Bfill:%23FFFFFF;%7D%0A%3C/style%3E%3Cpath class='st0' d='M458,768.3c40.7,0,75.6-2.1,104.8-8.6c29.6-6.6,55.2-18,75.2-38c20-20,31.4-45.6,38-75.2 c6.5-29.2,8.6-64.1,8.6-104.8v-98.2c0-35.9-29.1-65-65-65H359.7c-35.9,0-65,29.1-65,65v259.9c0,35.9,29.1,65,65,65H458z'/%3E%3Cpath class='st0' d='M34.9,541.7c0,40.7,2.1,75.6,8.6,104.8c6.6,29.6,18,55.2,38,75.2s45.6,31.4,75.2,38c2.8,0.6,5.7,1.2,8.5,1.8 c35.2,6.8,64.6-23,64.6-58.9V443.5c0-35.9-29.1-65-65-65h-65c-35.9,0-65,29.1-65,65V541.7z'/%3E%3Cpath class='st0' d='M261.5,118.6c-40.7,0-75.6,2.1-104.8,8.6c-29.6,6.6-55.2,18-75.2,38s-31.4,45.6-38,75.2c-0.5,2.4-1,4.9-1.5,7.3 c-7,35.7,23.4,65.8,59.8,65.8h517.1c35.9,0,65.7-29.4,58.9-64.6c-0.6-2.9-1.1-5.7-1.8-8.5c-6.6-29.6-18-55.2-38-75.2 c-20-20-45.6-31.4-75.2-38c-29.2-6.5-64.1-8.6-104.8-8.6H261.5z'/%3E%3Cg%3E%3Cg%3E%3Cpath class='st1' d='M373.8,215.3c-18.9,0-35.9-4.1-50.6-12.2c-14.7-8.1-26.3-19.5-34.5-33.9c-8.2-14.3-12.3-30.8-12.3-49.1 c0-18.4,4.1-35,12.3-49.4c8.2-14.5,19.8-25.9,34.5-33.9c14.7-8,31.7-12,50.5-12c18.9,0,35.9,4,50.5,12c14.7,8,26.3,19.4,34.5,33.7 c8.2,14.3,12.3,31,12.3,49.6c0,18.2-4.1,34.7-12.3,49.1c-8.2,14.4-19.9,25.8-34.7,33.9C409.5,211.3,392.5,215.3,373.8,215.3z M373.6,76.8c-6.3,0-11.8,1.7-16.9,5.3c-5.1,3.6-9,8.7-11.8,15.1c-2.9,6.6-4.3,14.2-4.3,22.7c0,12.7,3.2,23.1,9.4,30.7 c6.2,7.5,14,11.2,23.8,11.2c9.7,0,17.5-3.7,23.7-11.2c6.3-7.7,9.5-18,9.5-30.7c0-8.5-1.5-16.1-4.4-22.7c-2.9-6.4-6.9-11.6-12-15.2 C385.6,78.5,380,76.8,373.6,76.8z'/%3E%3Cpath class='st2' d='M373.8,28.4c18.4,0,34.7,3.9,48.9,11.6c14.2,7.7,25.3,18.5,33.2,32.4c7.9,13.9,11.9,29.8,11.9,47.8 c0,17.7-4,33.5-11.9,47.3c-7.9,13.9-19,24.7-33.3,32.5c-14.3,7.8-30.5,11.7-48.7,11.7c-18.4,0-34.7-3.9-48.9-11.7 c-14.2-7.8-25.3-18.7-33.2-32.5c-7.9-13.9-11.9-29.6-11.9-47.3c0-17.9,4-33.8,11.9-47.7c7.9-13.9,19-24.8,33.2-32.5 C339.1,32.3,355.4,28.4,373.8,28.4 M373.8,165.4c10.7,0,19.5-4.2,26.4-12.5c6.9-8.3,10.3-19.3,10.3-32.9c0-9-1.6-17.1-4.7-24.1 c-3.2-7.1-7.5-12.6-13.1-16.6c-5.6-4-12-6-19.1-6c-7,0-13.3,2-18.9,6c-5.6,4-10,9.5-13,16.6c-3.1,7.1-4.6,15.1-4.6,24.1 c0,13.6,3.4,24.6,10.2,32.9C354.1,161.2,362.9,165.4,373.8,165.4 M373.8,21.4c-19.5,0-37,4.2-52.2,12.5 c-15.3,8.3-27.4,20.2-35.9,35.2c-8.5,15-12.8,32.2-12.8,51.2c0,18.8,4.3,35.9,12.8,50.8c8.5,14.9,20.6,26.8,35.9,35.2 c15.2,8.4,32.8,12.6,52.2,12.6c19.3,0,36.8-4.2,52.1-12.6c15.4-8.4,27.5-20.3,36-35.2c8.5-14.9,12.8-32,12.8-50.8 c0-19.2-4.3-36.4-12.8-51.3C453.4,54,441.3,42.2,426,33.8C410.8,25.6,393.3,21.4,373.8,21.4L373.8,21.4z M373.8,158.4 c-8.8,0-15.7-3.2-21.1-9.9c-5.7-7-8.6-16.6-8.6-28.5c0-8,1.4-15.2,4-21.3c2.6-5.9,6.1-10.4,10.7-13.7c4.4-3.2,9.3-4.7,14.8-4.7 c5.7,0,10.6,1.5,15.1,4.7c4.6,3.3,8.1,7.8,10.8,13.7c2.7,6.1,4.1,13.3,4.1,21.3c0,11.9-2.9,21.5-8.7,28.5 C389.3,155.1,382.4,158.4,373.8,158.4L373.8,158.4z'/%3E%3C/g%3E%3Cg%3E%3Cpath class='st1' d='M573.9,215.3c-17.7,0-34-4.3-48.2-12.9c-14.3-8.5-25.6-20.4-33.7-35.1c-8.1-14.7-12.2-31.2-12.2-48.9 c0-17,4.1-32.9,12.3-47.2c8.2-14.3,19.7-25.7,34.4-34c14.6-8.3,31.4-12.4,50-12.4c10.1,0,20,1.1,29.5,3.4c9.5,2.3,18.3,5.6,26,9.8 c1.6,0.9,2.3,2.8,1.5,4.4l-16.8,39.6c-0.6,1.3-1.9,2.1-3.2,2.1c-0.4,0-0.9-0.1-1.3-0.3C601,79.4,590.5,77,581,77 c-12.1,0-21.2,3.7-27.7,11.4c-6.6,7.7-9.9,18.1-9.9,30.8c0,8.3,1.5,15.8,4.5,22.4c2.9,6.4,7.1,11.6,12.5,15.3 c5.3,3.7,11.2,5.5,18,5.5c2.5,0,4.8-0.1,6.7-0.4v-38.2c0-1.8,1.3-3.3,3.1-3.5l44.1-5.1c0.1,0,0.3,0,0.4,0c0.9,0,1.7,0.3,2.3,0.9 c0.7,0.7,1.2,1.6,1.2,2.6v79.9c0,1.4-0.8,2.6-2,3.2C614.7,210.8,594.3,215.3,573.9,215.3z'/%3E%3Cpath class='st2' d='M576.4,28.4c9.9,0,19.4,1.1,28.7,3.3c9.3,2.2,17.6,5.4,25.1,9.4l-16.8,39.6c-11.6-4.8-22.4-7.1-32.4-7.1 c-13.1,0-23.2,4.2-30.4,12.6c-7.1,8.4-10.7,19.4-10.7,33c0,8.8,1.6,16.8,4.8,23.9c3.2,7.1,7.8,12.6,13.7,16.7 c5.9,4.1,12.5,6.1,20,6.1c4.1,0,7.5-0.3,10.2-1v-41.1l44.1-5.1v79.9c-19.2,8.8-38.9,13.3-58.9,13.3c-17.2,0-32.7-4.1-46.4-12.4 c-13.8-8.2-24.6-19.5-32.4-33.8c-7.8-14.3-11.7-30-11.7-47.2c0-16.5,4-31.6,11.9-45.4s18.9-24.7,33-32.7 C542.3,32.4,558.4,28.4,576.4,28.4 M576.4,21.4c-19.2,0-36.6,4.3-51.7,12.9c-15.2,8.6-27.2,20.5-35.7,35.3 c-8.5,14.8-12.8,31.2-12.8,48.9c0,18.3,4.2,35.3,12.6,50.6c8.4,15.3,20.2,27.6,35,36.5c14.8,8.9,31.6,13.4,50,13.4 c21,0,41.8-4.7,61.9-13.9c2.5-1.1,4.1-3.6,4.1-6.4v-79.9c0-2-0.9-3.9-2.3-5.2c-1.3-1.1-2.9-1.8-4.7-1.8c-0.3,0-0.5,0-0.8,0 l-44.1,5.1c-3.5,0.4-6.2,3.4-6.2,7v35c-1,0.1-2.1,0.1-3.2,0.1c-6.1,0-11.3-1.6-16-4.9c-4.9-3.4-8.6-7.9-11.3-13.9 c-2.8-6.1-4.2-13.2-4.2-20.9c0-12,3-21.3,9.1-28.5c5.8-6.8,14-10.2,25-10.2c9.1,0,19.1,2.2,29.7,6.6c0.9,0.4,1.8,0.5,2.7,0.5 c2.7,0,5.3-1.6,6.4-4.3l16.8-39.6c1.4-3.3,0.1-7.2-3.1-8.9c-8-4.4-17-7.8-26.9-10.1C597,22.6,586.8,21.4,576.4,21.4L576.4,21.4z' /%3E%3C/g%3E%3Cg%3E%3Cpath class='st1' d='M682.6,211.3c-1.9,0-3.5-1.6-3.5-3.5V74.5h-33c-1.9,0-3.5-1.6-3.5-3.5V32.2c0-1.9,1.6-3.5,3.5-3.5h132.4 c1.9,0,3.5,1.6,3.5,3.5V71c0,1.9-1.6,3.5-3.5,3.5h-33v133.3c0,1.9-1.6,3.5-3.5,3.5H682.6z'/%3E%3Cpath class='st2' d='M778.5,32.2V71H742v136.8h-59.5V71h-36.5V32.2H778.5 M778.5,25.2H646.1c-3.9,0-7,3.1-7,7V71c0,3.9,3.1,7,7,7 h29.5v129.8c0,3.9,3.1,7,7,7H742c3.9,0,7-3.1,7-7V78h29.5c3.9,0,7-3.1,7-7V32.2C785.5,28.3,782.4,25.2,778.5,25.2L778.5,25.2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
                        >
                    </li>
                    <li class="li-13">
                        <img class="ico ec-dashboard"
                            src="data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 800 800'  xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%232196F3;%7D .st1%7Bfill:%232D2D2D;%7D .st2%7Bfill:%23FFFFFF;%7D%0A%3C/style%3E%3Cpath class='st0' d='M458,768.3c40.7,0,75.6-2.1,104.8-8.6c29.6-6.6,55.2-18,75.2-38c20-20,31.4-45.6,38-75.2 c6.5-29.2,8.6-64.1,8.6-104.8v-98.2c0-35.9-29.1-65-65-65H359.7c-35.9,0-65,29.1-65,65v259.9c0,35.9,29.1,65,65,65H458z'/%3E%3Cpath class='st0' d='M34.9,541.7c0,40.7,2.1,75.6,8.6,104.8c6.6,29.6,18,55.2,38,75.2s45.6,31.4,75.2,38c2.8,0.6,5.7,1.2,8.5,1.8 c35.2,6.8,64.6-23,64.6-58.9V443.5c0-35.9-29.1-65-65-65h-65c-35.9,0-65,29.1-65,65V541.7z'/%3E%3Cpath class='st0' d='M261.5,118.6c-40.7,0-75.6,2.1-104.8,8.6c-29.6,6.6-55.2,18-75.2,38s-31.4,45.6-38,75.2c-0.5,2.4-1,4.9-1.5,7.3 c-7,35.7,23.4,65.8,59.8,65.8h517.1c35.9,0,65.7-29.4,58.9-64.6c-0.6-2.9-1.1-5.7-1.8-8.5c-6.6-29.6-18-55.2-38-75.2 c-20-20-45.6-31.4-75.2-38c-29.2-6.5-64.1-8.6-104.8-8.6H261.5z'/%3E%3Cg%3E%3Cg%3E%3Cpath class='st1' d='M442.8,222.9c-0.8,0-1.5-0.7-1.5-1.5V20.1c0-0.8,0.7-1.5,1.5-1.5h141.3c0.8,0,1.5,0.7,1.5,1.5v44.5 c0,0.8-0.7,1.5-1.5,1.5h-68.7v33.6h62.6c0.8,0,1.5,0.7,1.5,1.5V138c0,0.8-0.7,1.5-1.5,1.5h-62.6v35.9h68.7c0.8,0,1.5,0.7,1.5,1.5 v44.5c0,0.8-0.7,1.5-1.5,1.5H442.8z'/%3E%3Cpath class='st2' d='M584.1,20.1v44.5h-70.2v36.6h64.1V138h-64.1v38.9h70.2v44.5H442.8V20.1H584.1 M584.1,17.1H442.8 c-1.7,0-3,1.3-3,3v201.3c0,1.7,1.3,3,3,3h141.3c1.7,0,3-1.3,3-3v-44.5c0-1.7-1.3-3-3-3h-67.2V141h61.1c1.7,0,3-1.3,3-3v-36.9 c0-1.7-1.3-3-3-3h-61.1V67.6h67.2c1.7,0,3-1.3,3-3V20.1C587.1,18.4,585.7,17.1,584.1,17.1L584.1,17.1z'/%3E%3C/g%3E%3Cg%3E%3Cpath class='st1' d='M711.6,227.6c-19.7,0-37.8-4.7-53.9-14.1c-16.1-9.3-28.9-22.3-38.3-38.6c-9.4-16.2-14.1-34.5-14.1-54.1 c0-20.1,4.6-38.4,13.7-54.6c9.1-16.2,21.7-29,37.4-38.2c15.8-9.2,33.7-13.8,53.4-13.8c10.6,0,21.2,1.3,31.4,3.8 c10.3,2.6,19.2,6.3,26.5,11c0.5,0.3,0.8,0.9,0.7,1.5l-7.9,45.3c-0.1,0.4-0.3,0.8-0.7,1c-0.2,0.1-0.5,0.2-0.7,0.2 c-0.2,0-0.4,0-0.5-0.1c-13.8-5.2-26.4-7.8-37.5-7.8c-15.1,0-26.8,4.4-34.9,13.1c-8.1,8.7-12.2,21.5-12.2,38 c0,16.1,4.3,28.8,12.9,37.7c8.5,8.9,20.6,13.4,35.9,13.4c5.9,0,11.5-0.6,16.6-1.7c5.2-1.1,11.6-3.3,19.1-6.4 c0.2-0.1,0.4-0.1,0.6-0.1c0.3,0,0.5,0.1,0.7,0.2c0.4,0.2,0.7,0.6,0.8,1.1l8.2,46.2c0.1,0.6-0.2,1.2-0.7,1.6 C750.9,222.5,731.9,227.6,711.6,227.6z'/%3E%3Cpath class='st2' d='M709.9,15.7c10.5,0,20.9,1.3,31,3.8c10.1,2.5,18.8,6.1,26,10.8L759,75.7c-14-5.3-26.7-7.9-38-7.9 c-15.6,0-27.6,4.5-36,13.6c-8.4,9.1-12.6,22.1-12.6,39.1c0,16.6,4.4,29.5,13.3,38.8c8.9,9.3,21.2,13.9,37,13.9 c6,0,11.7-0.6,17-1.8c5.3-1.2,11.7-3.3,19.3-6.4l8.2,46.2c-17,9.9-35.5,14.9-55.6,14.9c-19.5,0-37.2-4.6-53.1-13.9 c-15.9-9.3-28.5-21.9-37.7-38c-9.3-16.1-13.9-33.9-13.9-53.4c0-19.9,4.5-37.8,13.5-53.8c9-16,21.3-28.5,36.9-37.6 C672.8,20.2,690.4,15.7,709.9,15.7 M709.9,12.7c-20,0-38.2,4.7-54.2,14c-16,9.3-28.8,22.3-38,38.7c-9.2,16.4-13.8,35-13.8,55.3 c0,19.9,4.8,38.4,14.3,54.9c9.5,16.5,22.6,29.6,38.8,39.1c16.3,9.5,34.7,14.3,54.6,14.3c20.5,0,39.7-5.2,57.1-15.3 c1.1-0.6,1.7-1.9,1.4-3.1l-8.2-46.2c-0.2-0.9-0.7-1.7-1.5-2.1c-0.4-0.2-0.9-0.4-1.4-0.4c-0.4,0-0.8,0.1-1.1,0.2 c-7.4,3-13.7,5.2-18.8,6.3c-5,1.1-10.5,1.7-16.3,1.7c-14.9,0-26.6-4.4-34.8-13c-8.3-8.6-12.5-21-12.5-36.7c0-16.1,4-28.6,11.8-37 C695,75,706.3,70.8,721,70.8c10.9,0,23.3,2.6,37,7.7c0.3,0.1,0.7,0.2,1.1,0.2c0.5,0,1-0.1,1.5-0.4c0.8-0.4,1.3-1.2,1.5-2.1 l7.9-45.3c0.2-1.2-0.3-2.4-1.3-3c-7.5-4.8-16.5-8.6-26.9-11.2C731.3,14,720.6,12.7,709.9,12.7L709.9,12.7z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A"
                        >
                    </li>
                    <li class="li-14">
                        <img class="ico connect-appointment"
                            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%232196f3' viewBox='0 0 180.31 160.67'%3E%3Ctitle%3Ecase_apoinmentAsset 1%3C/title%3E%3Cg id='Layer_2' data-name='Layer 2'%3E%3Cg id='Layer_1-2' data-name='Layer 1'%3E%3Cpath d='M141.41,8.44,178,71.9a16.84,16.84,0,0,1,0,16.87l-36.63,63.46a16.89,16.89,0,0,1-14.62,8.44H53.51a16.87,16.87,0,0,1-14.61-8.44L2.26,88.77a16.89,16.89,0,0,1,0-16.87L38.9,8.44A16.87,16.87,0,0,1,53.51,0h73.28A16.89,16.89,0,0,1,141.41,8.44Z' fill='%23fff'/%3E%3Cpath d='M126.79,4a12.91,12.91,0,0,1,11.15,6.44L174.58,73.9a12.91,12.91,0,0,1,0,12.87S47.39,155.17,46.42,154.53a12.88,12.88,0,0,1-4.06-4.3L5.72,86.77a12.91,12.91,0,0,1,0-12.87L42.36,10.44A12.93,12.93,0,0,1,53.51,4h73.28m0-4H53.51A16.87,16.87,0,0,0,38.9,8.44L2.26,71.9a16.89,16.89,0,0,0,0,16.87L38.9,152.23a16.87,16.87,0,0,0,14.61,8.44h73.28a16.89,16.89,0,0,0,14.62-8.44L178,88.77a16.84,16.84,0,0,0,0-16.87L141.41,8.44A16.89,16.89,0,0,0,126.79,0Z' fill='%232196f3'/%3E%3Crect x='25.78' y='57.8' width='22.35' height='22.35' fill='%232196f3'/%3E%3Crect x='52.59' y='57.8' width='22.35' height='22.35' fill='%232196f3'/%3E%3Crect x='79.92' y='57.8' width='22.35' height='22.35' fill='%232196f3'/%3E%3Crect x='107.35' y='57.8' width='22.35' height='22.35' fill='%232196f3'/%3E%3Crect x='79.92' y='85.71' width='22.35' height='22.35' fill='%232196f3'/%3E%3Crect x='52.59' y='85.71' width='22.35' height='22.35' fill='%232196f3'/%3E%3Crect x='25.01' y='85.71' width='22.35' height='22.35' fill='%232196f3'/%3E%3Crect x='107.9' y='30.84' width='22.35' height='22.35' fill='%232196f3'/%3E%3Crect x='80.33' y='30.84' width='22.35' height='22.35' fill='%232196f3'/%3E%3Crect x='52.59' y='30.84' width='22.35' height='22.35' fill='%232196f3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
                            style="height: 26px;"
                        >
                    </li>
            
                </div>
            </div>`;
            var dock_float = document.createElement('div');
            dock_float.id = "dock_order_1";
            dock_float.innerHTML = dock_float_html;
            
            document.querySelector('[debug-id="case-summary-input"]').insertAdjacentElement("afterEnd", dock_float);

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

            // icons.forEach((item, index) => {
            //     item.addEventListener("mouseover", (e) => {
            //         focus(e.target, index);
            //     });
            //     item.addEventListener("mouseleave", (e) => {
            //         icons.forEach((item) => {
            //             item.style.transform = "scale(1)  translateY(0px)";
            //         });
            //     });
            // });
            document.querySelector('.open-email').addEventListener('click', openEmail);
            document.querySelector('.open-note').addEventListener('click', openNote)
            document.querySelector('.ads-ics').addEventListener('click', adsICS)
            document.querySelector('.open-gearloose').addEventListener('click', gearloose)
            document.querySelector('.ogt-dashboard').addEventListener('click', ogtDashboard)
            document.querySelector('.ec-dashboard').addEventListener('click', ecDashboard)
            document.querySelector('.connect-appointment').addEventListener('click', connectAppointment)
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

                    }
                });

                waitForElm('.case-id').then(elem => {
                    caseid = elem.innerText;
                    waitForElm('#findCalendarBtn').then(btn => {
                        var url = 'https://calendar.google.com/calendar/u/0/r/search?q='+caseid
                        btn.setAttribute('href', url);
                    })
                })
                
                // waitForElm('.more-less-button:not(.show-more)').then(elem => {
                //     elem.click();
                // })

                // Tam thoi disable by Linh
                // waitForElm("span[aria-label='View hidden phone number']").then(elem => {
                //     elem.click();
                // })
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
            }
        };
        
        observeOnce((elm) => {
            if(document.querySelector('.read-card.focused')) {
                if(!document.querySelector('.dock-float')) {
                    renderDock();
                }
            }
        });
        
        
        execFocusCase();

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
            
            
            if(window.dataCase.customer_ocid) {
                window.dataCase.customer_ocid.split(',').forEach((item) => {
                    var _int = item.trim();
                    adsUrl = `https://adwords.corp.google.com/aw/conversions?ocid=${_int}`;
                    window.open(adsUrl, '_blank').focus();
                })
                
                return true;
            }
            
            
            if(window.dataCase.customer_adsid) {
                
                adsUrl = `https://adwords.corp.google.com/aw/go?external_cid=${window.dataCase.customer_adsid}`;
                window.open(adsUrl, '_blank').focus();
                
                return true;
            }
            
            
            window.open(adsUrl, '_blank').focus();
            return false;            
            
            
            
        }

        function gearloose() {
            var gearlooseUrl = 'https://gearloose.corp.google.com/#/search/merchants?q=awid:' + cid;
            window.open(gearlooseUrl, '_blank').focus();
        }

        function ogtDashboard() {
            
            if(window.dataCase.customer_ocid) {
                window.dataCase.customer_ocid.split(',').forEach((item) => {
                    var _int = item.trim();
                    var ogtauditUrl = 'https://dashboards.corp.google.com/view/_a186557f_a4ad_4e9b_b1f0_fc360bc3143e?f=customer_id:in:' + _int;
                    var ogtTechsolURL = 'https://dashboards.corp.google.com/view/_7f750f18_1d9b_4f6e_82b8_70e37c1e992a?f=customer_id:eq:'+ _int;
                    window.open(ogtauditUrl, '_blank').focus();
                    window.open(ogtTechsolURL, '_blank');
                })
                
                return true;
            }
            
            
            var ogtauditUrl = 'https://dashboards.corp.google.com/view/_a186557f_a4ad_4e9b_b1f0_fc360bc3143e?f=customer_id:in:' + cid;
            var ogtTechsolURL = 'https://dashboards.corp.google.com/view/_7f750f18_1d9b_4f6e_82b8_70e37c1e992a?f=customer_id:eq:'+cid
            window.open(ogtauditUrl, '_blank').focus();
            window.open(ogtTechsolURL, '_blank');
        }

        function ecDashboard() {
            if(window.dataCase.customer_ocid) {
                window.dataCase.customer_ocid.split(',').forEach((item) => {
                    var _int = item.trim();
                    var ecUrl = 'https://dashboards.corp.google.com/view/_0ded1099_6ef3_4bc9_bba0_2445840d1b69?f=customer_id:in:' + _int;
                    window.open(ecUrl, '_blank').focus();
                })
                
                return true;
            }
            
            
            var ecUrl = 'https://dashboards.corp.google.com/view/_0ded1099_6ef3_4bc9_bba0_2445840d1b69?f=customer_id:in:' + cid;
            window.open(ecUrl, '_blank').focus();
        }

        function prepareCR() {
            var actionCR = `<button class="view-leadgen">View Leadgen Hotkey</button>
    <button class="view-tag-shopping hidden">View Tag/Shopping Hotkey</button>`
            var crTagHtml = `
    <ul id="cr-list-tag" class="cr-list" style="overflow: auto; height: 300px;">
        <li data-key="ts as new dfa" style="color: rgb(119, 0, 135);">AS - Send DfA First Email (ts as new dfa)</li>
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
                        var _title = vi_hotkey_email[key] ? vi_hotkey_email[key] : "Đội giải pháp kỹ thuật - Thông báo";
                        var _subject = `${_title} [${caseid}]`;
                        
                        if(window.subject_hotkey_email) {
                            if(window.subject_hotkey_email[key]) {
                                _subject = window.subject_hotkey_email[key];
                                _subject = replaceTextByData(_subject);
                            }
                        }
                        
                        document.querySelector('.is-top .subject').value = _subject;
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
                        emailBCC.querySelector('input').value = document.querySelector('material-input.action-input.input-email .input').value;
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


        
        onClickElm('[debug-id="canned_response_button"]', 'click', function(elm){ 
            prepareForEmail();
        });
        // ==== END CODE - VAN BO       
    } catch (error) {
        console.error("tagteamFocusCase => ", error);
    }

};

if(location.hostname == 'cases.connect.corp.google.com') {
    console.log('okela')
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "hahahahaa") {
        console.log('jajajajajajajaa')
    }
    });
}
if(location.hostname == 'meet.google.com') {
    console.log('vanbomeet')
    console.log(chrome.tabs)
    chrome.tabs.query({ url: "*://cases.connect.corp.google.com/*" }, function(tabs) {
    if (tabs.length > 0) {
        console.log('vanbomeet sendmessage')
        var tabId = tabs[0].id;
        chrome.tabs.sendMessage(tabId, { message: "hahahahaa" });
    }
    });
}