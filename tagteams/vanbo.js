// Lib 
try {
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
            let time = new Date()
            console.log(time)
            Object.keys(events).forEach(evt => {
                let nearEvent = events[evt]
                let caseid = evt
                if(nearEvent.getHours() == time.getHours() && nearEvent.getMinutes() == time.getMinutes()){
                console.log('vanbo anoucement: your case '+caseid+' is comming')
                    window.open('https://appointments.connect.corp.google.com/appointmentDetails?caseId='+caseid,
                    'window',
                    'fullscreen'
                    );
                }
            })
            if(time.getHours() > 19) clearInterval(notifyTime)
        }
        var events = {};
        detectTime();
        var countEvent = setInterval(detectTime, 1000*60*15)
        var notifyEvent = setInterval(notifyTime, 1000*60)
        //end code vanbo
    }


    // Run
    if(window.location.href.includes('appointments.connect.corp.google.com/appointmentDetails')){
        var audio = new Audio('https://assets.mixkit.co/active_storage/sfx/988/988-preview.mp3');
        audio.muted = 'muted'
        // audio.play();
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
        
    }

    if(location.hostname === 'calendar.google.com') {
        detectConnectcase();
    }
} catch (error) {
    console.error('vanbo - ', error);
}