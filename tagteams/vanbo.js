if(window.location.href.includes('appointments.connect.corp.google.com/appointmentDetails')){
    var audio = new Audio('https://cdn.tainhacchuong24h.com/uploads/f18000/nhac-chuong-day-di-ong-chau-oi-day-di-chau-oi.mp3');
    var startTime = document.querySelector('.content-time p').innerText
    var date = document.querySelector('.content > p').innerText;
    var now = new Date()
    var oncallDate = new Date(date+' '+startTime)
    oncallDate.setFullYear(now.getFullYear())
    var mins2mlsecond = 1000*60;
    var callTime = Math.abs(oncallDate - now)/mins2mlsecond;
    console.log(callTime+' last')
    console.log(oncallDate)
    if(callTime>5) clearInterval(checkTime); else audio.play();
    var checkTime = setInterval(() => {
        console.log(new Date())
        audio.play();
        if(callTime>5) clearInterval(checkTime);
    }, 1000*60);
    var isCommingAppointment = document.querySelector('.mdc-button');
    if(isCommingAppointment){
        var caseid = new URLSearchParams(location.search).get('caseId')
        var caseURL = 'https://cases.connect.corp.google.com/' + caseid;
        isCommingAppointment.addEventListener('click', function(){
            window.open(this.href,'_blank')
            window.open(caseURL, '_blank')
        })
    }
    
}