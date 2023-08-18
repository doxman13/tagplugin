
  javascript: (function () {
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
            var para = document.querySelector('[class="mat-mdc-paginator connect-paginator"]');
            if (Agent.agent != undefined) {
              var agentName = Agent.agent;
              var link = 'https://cases.connect.corp.google.com' + '?agent=' + encodeURIComponent(agentName) + '/#/queues/bookmark/caseid:' + encodeURIComponent(Agent.case.toString().match(/[0-9]{1}-[0-9]{13}/g).join(' OR caseid:'));
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
      const element = document.querySelectorAll('[class="mat-mdc-paginator connect-paginator"] p');
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
}

var country = {
  COUNTRY:"NA",
  JP:"JP",
  KR:"KO",
  ID:"ID",
  VN:"VI",
  CN:"ZH"
}

var show = function(e){
    var a = e.target.value;
    if (a == "COUNTRY") {
      document.querySelectorAll(".rotate").forEach(function(e){e.parentNode.click()});
    } else {
    //console.log("hide all");
    document.querySelectorAll(".rotate").forEach(function(e){e.parentNode.click()});
    //console.log("open JP");
    document.querySelectorAll('[class="pool-name"]').forEach(function (name) {
      name.parentNode.parentNode.parentNode.parentNode.style.display='none';
      name.innerText.includes(country[a]) && name.click();
    });
    //console.log("open all calendar");
    document.querySelectorAll('[class="availability-name"]').forEach(function (name) {
      name.parentNode.parentNode.parentNode.parentNode.style.display='none';
      name.previousSibling.classList.contains("rotate")&&name.click();
      name.innerText.includes("KL - S&T - "+a)&&!name.previousSibling.classList.contains("rotate")&&name.click();
    });
  }
    setTimeout(showAll,1000);
}

ori = document.querySelector(".timezone");
sel = document.createElement("select");
sel.addEventListener("change", show);

Object.keys(country).forEach(function(i) {
  var option = document.createElement("option");
  option.text = i;
  option.value = i;
  sel.appendChild(option);
});

ori.parentNode.insertBefore(sel,ori);
  
})();

