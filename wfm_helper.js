
(function () {
  function linkToAgent() {
    var el = document.querySelectorAll('.profile-name');
    var values = [];
    for (var i = 0; i < el.length; i++) {
      values.push(el[i].innerText);
    }
    agentList = values.filter(function (value, index) {
      return values.indexOf(value) === index;
    });
    console.log(agentList);
    agentList.forEach(function (agent) {
      Agent = {};
      casesAgent = [];
      for (let index = 0; index < el.length; index++) {
        if (el[index].innerText === agent) {

          casesAgent.push(document.querySelectorAll('.case.cdk-column-case')[index].innerText);
          Agent = {
            'agent': agent,
            'case': casesAgent
          }
        }
        if (index == el.length - 1) {
          var para = document.querySelector('[class="_sub_modal"]');
          if (Agent.agent != undefined) {
            var agentName = Agent.agent;
            var link = 'https://cases.connect.corp.google.com' + '?agent=' + encodeURIComponent(agentName) + '/#/queues/bookmark/caseid:' + encodeURIComponent(Agent.case.toString().match(/[0-9]{1}-[0-9]{13}/g).join(' OR caseid:'));
            console.log(agentName);
            console.log(link);
            para.innerHTML += `<p>\`${agentName}\` ----> <a target="_blank" href="${link}">${link}</a></p>`;

          };
        }
      }
    })
  }
  if (window.trustedTypes && window.trustedTypes.createPolicy) {
    window.trustedTypes.createPolicy('default', {
      createHTML: (string, sink) => string
    });
  }

  var clearBtn = document.createElement("button");
  clearBtn.innerHTML = "Clear";
  document.body.insertAdjacentElement("afterend", clearBtn);

  var linkToAgentBtn = document.createElement("button");
  linkToAgentBtn.innerHTML = "linkToAgent";
  document.body.insertAdjacentElement("afterend", linkToAgentBtn);
  linkToAgentBtn.addEventListener("click", linkToAgent, false);


  clearBtn.addEventListener("click", function () {
    const element = document.querySelectorAll('[class="_sub_modal"] p');
    for (let index = 0; index < element.length; index++) {
      element[index].remove();
    }
  });

function showAll() {
var caseList = document.querySelectorAll('calendar-event [aria-describedby]');
for (let i = 0; i < caseList.length; i++) {
  elementCase = caseList[i].getAttribute('aria-describedby');
  task = caseList[i].innerText.split('').shift() + ' - ';
  if (document.getElementById(elementCase)) {
    var status = document.getElementById(elementCase).innerHTML.replace(/Standard\s|Appointment\s/g, '');
    caseList[i].textContent = task + status;
    caseList[i].style.fontSize = '11px';
    if ((status.indexOf('Rescheduled') != -1) || (status.indexOf('Additional Appointment') != -1)) {
      caseList[i].style.backgroundColor = "#d97aff"
    } else if (status.indexOf('Call Not Started') != -1) {
      caseList[i].style.backgroundColor = "#f73c1b"
    } else if (status.indexOf('Call Started') != -1) {
      caseList[i].style.backgroundColor = "#1df753"
    }
  } else false
}
};
var country = {
COUNTRY: "NA",
TH: "TH",
JP: "JP",
KR: "KO",
ID: "ID",
VN: "VI",
CN: "ZH"
};
var show = function(e) {
var a = e.target.value;
if (a == "COUNTRY") {
  document.querySelectorAll(".rotate").forEach(function(e) {
    e.parentNode.click()
  });
} else {
  document.querySelectorAll(".rotate").forEach(function(e) {
    e.parentNode.click()
  });
  document.querySelectorAll('[class="pool-name"]').forEach(function(name) {
    name.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
    name.innerText.includes(country[a]) && name.click();
  });
  document.querySelectorAll('[class="availability-name"]').forEach(function(name) {
    name.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
    name.previousSibling.classList.contains("rotate") && name.click();
    if (country[a] == 'TH') {
      name.innerText.toUpperCase().includes("TH") && name.click();
    } else if (country[a] == 'VI') {
      name.innerText.toUpperCase().includes("VN") && name.click(); 
} else {
      name.innerText.includes("KL - S&T - " + a) && !name.previousSibling.classList.contains("rotate") && name.click();
    }
  });
}
setTimeout(showAll, 1000);
};
setTimeout(function() {

let ori = document.querySelector(".timezone");
let sel = document.createElement("select");
sel.addEventListener("change", show);
Object.keys(country).forEach(function(i) {
var option = document.createElement("option");
option.text = i;
option.value = i;
sel.appendChild(option);
});
ori.parentNode.insertBefore(sel, ori);


}, 3000);

//LT Queue Waiting Notification
if (document.location.search.includes("GCARE_WEBTECH")){    
const trigger = localStorage.getItem("myCat");
if(trigger){
  console.log('working w/t Internet');

  contains = (selector, text) => {
    var elements = document.querySelectorAll(selector);
    return Array.prototype.filter.call(elements, function(element){return RegExp(text).test(element.textContent); });
  }
  dimension = contains('.row','gCare WebTech')[0].innerText.replace(/sentiment_satisfied|sentiment_very_satisfied/g, '').split('\t');
  VN_metric = contains('.row','Technical Solutions-VN-LT')[0].innerText.split('\t');
  VN_metric.map(function(x){ return x.replace(/[^0-9\.:]+/g, "")});

    var waiting =  VN_metric[1];
    var wait_time = VN_metric[2];
    var available = VN_metric[3];
    var on_call = VN_metric[4];
    var after_call = VN_metric[5];
    var not_ready = VN_metric[6];

    var time_stamp = document.querySelector('[class="date"]').innerText;

      sessionStorage.setItem("waiting", waiting);
      sessionStorage.setItem("wait_time", wait_time);
      sessionStorage.setItem("available", available);
      sessionStorage.setItem("on_call", on_call);
      sessionStorage.setItem("after_call", after_call);
      sessionStorage.setItem("not_ready", not_ready);
      sessionStorage.setItem("time_stamp", time_stamp);

    
    var url = 'https://chat.googleapis.com/v1/spaces/AAAANuXXRCc/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=22YYP7Spi9z-OQ4KYV8ZQ75F6k-QXOcmR6_jjkUSZY8';
    
    if (waiting !='0'){

      text = "waiting: " + waiting + "\n" + "available: " + available +  "on_call: " + on_call + " " + "after_call: " + after_call + " " + "not_ready: " + not_ready;
      text.replace(/error/g, "");
      const xhr = new XMLHttpRequest();
      xhr.open("POST", url);
      xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
      const body = JSON.stringify({
        text: text
      });
      xhr.onload = () => {
        console.log(xhr)
      }
      xhr.send(body);
    }
} else {
  console.log('Check the value setting in localStorage');
  //location.reload();
      
}}  
})();

