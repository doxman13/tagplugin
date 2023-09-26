const warning = document.querySelector(".alert.alert-warning");
const success = document.querySelector(".alert.alert-success");
const info = document.querySelector(".alert.alert-info");
const error = document.querySelector(".alert.alert-danger");
const select = document.querySelectorAll('select');
const input = document.querySelectorAll('input');
const score = document.querySelector('.score');
const alert = document.querySelector('.alertMsg');
const conversion = document.querySelector('.conversion');
const errorMsg = document.getElementById("errorMsg")
const errorMsg1 = document.getElementById("errorMsg1");
const errorMsg2 = document.getElementById("errorMsg2");
const errorMsg3 = document.getElementById("errorMsg3");
const errorMsg5 = document.getElementById("errorMsg5");
const errorMsg6 = document.getElementById("errorMsg6");
//optimize: if 3 selects have been selected, will remove error message
select.forEach((i,k)=>{
	//if green tick have been selected, remove error message
	if (k==0) {
		i.onchange = function () {
			errorMsg.style.display = (this.value!= "") ? "none": "block";
		}
	}
	//if EC Qual dash has data, show input && remove error message when have been selected
	if (k==1) {
		i.onchange = function () {
			alert.style.display = (this.value == "no") ? "none": "block";
			conversion.style.display = (this.value == "no") ? "block": "none";
			errorMsg1.style.display = (this.value != "") ? "none": "block";
			if(this.value == "no") {
				score.style.display = "none";
				document.querySelector('#alertField').value = "";
				document.querySelector('#convAct').value = "";
			}
		}
	}
	if (k==2){
		i.onchange = function (){
			score.style.display = (this.value == "no") ? "block": "none";
			errorMsg6.style.display = (this.value != "") ? "none": "block";
		}
	}
	if (k==3){
		i.onchange = function (){
			errorMsg5.style.display = (this.value != "") ? "none": "block";
		}
	}
});
//optimize: if 2 inputs have been filled, will remove error message && enter will trigger validate()
input.forEach((i, k) => {
  if (k == 0) {
    // if data validity has been filled, remove error message
    i.onchange = function () {
      errorMsg2.style.display = this.value !== "" ? "none" : "block";
    };
    
    // Add event listener to trigger form submission on "Enter" key press
    i.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        Validate();
      }
    });
  }
  if (k == 1) {
    // if coverage rate has been filled, remove error message
    i.onchange = function () {
      errorMsg3.style.display = this.value !== "" ? "none" : "block";
    };
    
    // Add event listener to trigger form submission on "Enter" key press
    i.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        Validate();
      }
    });
  }
});

//validate all (select & input) & recommendation set
function Validate(){
	//validate all select
	select.forEach((i,k)=>{
		if(k==0){
			if(i.value == ""){
				errorMsg.classList.add("show");
			}  
		}
		if(k==1){
			if(i.value == ""){
				errorMsg1.classList.add("show");
			}
		}
    if (k==2){
      if (i.value == "") {
        errorMsg6.classList.add("show");
      }
    }
		if(k==3){
			if(conversion.style.display = "block" && i.value == ""){
				errorMsg5.classList.add("show");
			}
		}
	});
	
	//validate all input
	if ("block"==score.style.display) {
		input.forEach((i,k)=>{
			if (k==0) {
				if (i.value=="") {
					errorMsg2.classList.add("show");
				} 
			} else {
				if (i.value=="") {
					errorMsg3.classList.add("show");
				}
			} 
		});
	}
	
	//Reset all messages after click submit
	warning.innerHTML= '<div class="icon"><i class="fa fa-warning"></i></div>';
	warning.setAttribute("aria-hidden","true");
	success.innerHTML = '<div class="icon"><i class="fa fa-check"></i></div>';
	success.setAttribute("aria-hidden","true");
	info.innerHTML = '<div class="icon"><i class="fa fa-info-circle"></i></div>';
	info.setAttribute("aria-hidden","true");
	error.innerHTML = '<div class="icon"><i class="fa fa-times-circle"></i></div>';
	error.setAttribute("aria-hidden","true");

  // Get values from selects and inputs
  const greenTickValue = document.getElementById("greenTick").value;
  const ecDashValue = document.getElementById("ecDash").value;
	const alertValue = document.getElementById("alertField").value;
  const convActValue = document.getElementById("convAct").value;
  const daVaValue = parseFloat(document.getElementById("daVa").value);
  const coRaValue = parseFloat(document.getElementById("coRa").value);
	
	//recommended action set
	if (greenTickValue === "yes" && ecDashValue === "yes" && alertValue === "no" && daVaValue >= 0 && daVaValue <= 1 && coRaValue >= 0 && coRaValue <= 1) {
    if (daVaValue >= 0.75 && coRaValue >= 0.7) {
			success.innerHTML = 'Close the case as SO-Verified<div class="icon"><i class="fa fa-check"></i></div>';
			success.style.display = "block";
			success.setAttribute("aria-hidden","false");
			warning.style.display = "none";
			info.style.display = "none";
			error.style.display = "none";
    } else if (daVaValue < 0.75 && coRaValue >= 0.7) {
			warning.innerHTML = 'Either implementation needs to be verified or corrected by SME<div class="icon"><i class="fa fa-warning"></i></div>';
			warning.style.display = "block";
			warning.setAttribute("aria-hidden","false");
			success.innerHTML = 'Close the case as SO-Verified if implementation is verified by SME<div class="icon"><i class="fa fa-check"></i></div>';
			success.style.display = "block";
			success.setAttribute("aria-hidden","false");
			info.innerHTML = 'If AM raises queries regarding data validity, split & transfer to L1G/S<div class="icon"><i class="fa fa-info-circle"></i></div>';
			info.style.display = "block";
			info.setAttribute("aria-hidden","false");
			error.style.display = "none";
    } else if (daVaValue >= 0.75 && coRaValue < 0.7) {
			warning.innerHTML = 'Either implementation needs to be verified or corrected by SME<div class="icon"><i class="fa fa-warning"></i></div>';
			warning.style.display = "block";
			warning.setAttribute("aria-hidden","false");
			success.innerHTML = 'Close the case as SO-Verified if implementation is verified by SME<div class="icon"><i class="fa fa-check"></i></div>';
			success.style.display = "block";
			success.setAttribute("aria-hidden","false");
			info.innerHTML = 'If AM raises queries regarding coverage rate, split & transfer to L1G/S<div class="icon"><i class="fa fa-info-circle"></i></div>';
			info.style.display = "block";
			info.setAttribute("aria-hidden","false");
			error.style.display = "none";
    } else {
			warning.innerHTML = 'Either implementation needs to be verified or corrected by SME<div class="icon"><i class="fa fa-warning"></i></div>';
			warning.style.display = "block";
			warning.setAttribute("aria-hidden","false");
			success.innerHTML = 'Close the case as SO-Verified if implementation is verified by SME<div class="icon"><i class="fa fa-check"></i></div>';
			success.style.display = "block";
			success.setAttribute("aria-hidden","false");
			info.innerHTML = 'If AM raises queries regarding either coverage rate or data validity, split & transfer to L1G/S<div class="icon"><i class="fa fa-info-circle"></i></div>';
			info.style.display = "block";
			info.setAttribute("aria-hidden","false");
			error.style.display = "none";
    }
  } else if (greenTickValue === "yes" && ecDashValue === "yes" && alertValue === "yes"){
			warning.innerHTML = 'Either implementation needs to be verified or corrected by SME<div class="icon"><i class="fa fa-warning"></i></div>';
			warning.style.display = "block";
			warning.setAttribute("aria-hidden","false");
			success.innerHTML = 'Close the case as SO-Verified if implementation is verified by SME<div class="icon"><i class="fa fa-check"></i></div>';
			success.style.display = "block";
			success.setAttribute("aria-hidden","false");
			info.innerHTML = 'If AM raises queries regarding alert, coverage rate or data validity, split & transfer to L1G/S<div class="icon"><i class="fa fa-info-circle"></i></div>';
			info.style.display = "block";
			info.setAttribute("aria-hidden","false");
			error.style.display = "none";
	} else if (greenTickValue === "yes" && ecDashValue === "no") {
    if (convActValue === "yes") {
			warning.innerHTML = 'Either implementation needs to be verified or corrected by SME<div class="icon"><i class="fa fa-warning"></i></div>';
			warning.style.display = "block";
			warning.setAttribute("aria-hidden","false");
			success.innerHTML = 'Close the case as SO-Verified if implementation is verified by SME.<div class="icon"><i class="fa fa-check"></i></div>';
			success.style.display = "block";
			success.setAttribute("aria-hidden","false");
			info.innerHTML = 'If Am raises queries regarding no data in EC Qual dash, split & transfer to L1G/S<div class="icon"><i class="fa fa-info-circle"></i></div>';
			info.style.display = "block";
			info.setAttribute("aria-hidden","false");
			error.style.display = "none";
    } else if (convActValue === "no") {
			warning.innerHTML = 'Either implementation needs to be verified or corrected by SME<div class="icon"><i class="fa fa-warning"></i></div>';
			warning.style.display = "block";
			warning.setAttribute("aria-hidden","false");
			success.innerHTML = 'Close the case as SO-Verified if implementation is verified by SME.<div class="icon"><i class="fa fa-check"></i></div>';
			success.style.display = "block";
			success.setAttribute("aria-hidden","false");
			info.innerHTML = 'Issue could be caused due to low conversion volume which cannot be fixed by TechSol<div class="icon"><i class="fa fa-info-circle"></i></div>';
			info.style.display = "block";
			info.setAttribute("aria-hidden","false");
			error.style.display = "none";
    }
  } else if (greenTickValue === "no" && ecDashValue === "yes" && alertValue === "no" && daVaValue >= 0 && daVaValue <= 1 && coRaValue >= 0 && coRaValue <= 1) {
    if (daVaValue >= 0.75 && coRaValue >= 0.7) {
			warning.innerHTML = 'Either implementation needs to be verified or corrected by SME<div class="icon"><i class="fa fa-warning"></i></div>';
			warning.style.display = "block";
			warning.setAttribute("aria-hidden","false");
			success.innerHTML = 'Close the case as SO-Unverified if implementation is verified by SME.<div class="icon"><i class="fa fa-check"></i></div>';
			success.style.display = "block";
			success.setAttribute("aria-hidden","false");
			info.innerHTML = 'If AM raises queries regarding diagnostic status in GAds, split & transfer to L1G/S<div class="icon"><i class="fa fa-info-circle"></i></div>';
			info.style.display = "block";
			info.setAttribute("aria-hidden","false");
			error.style.display = "none";
    } else if (daVaValue >= 0.75 && coRaValue < 0.7) {
			warning.innerHTML = 'Either implementation needs to be verified or corrected by SME<div class="icon"><i class="fa fa-warning"></i></div>';
			warning.style.display = "block";
			warning.setAttribute("aria-hidden","false");
			success.innerHTML = 'Close the case as SO-Unverified if implementation is verified by SME.<div class="icon"><i class="fa fa-check"></i></div>';
			success.style.display = "block";
			success.setAttribute("aria-hidden","false");
			error.innerHTML = 'Split & transfer to L1G/S after close the case as SO-Unverified<div class="icon"><i class="fa fa-times-circle"></i></div>';
			error.style.display = "block";
			error.setAttribute("aria-hidden","false");
			info.style.display = "none";
    } else if (daVaValue < 0.75 && coRaValue >= 0.7) {
			warning.innerHTML = 'Either implementation needs to be verified or corrected by SME<div class="icon"><i class="fa fa-warning"></i></div>';
			warning.style.display = "block";
			warning.setAttribute("aria-hidden","false");
			success.innerHTML = 'Close the case as SO-Unverified if implementation is verified by SME.<div class="icon"><i class="fa fa-check"></i></div>';
			success.style.display = "block";
			success.setAttribute("aria-hidden","false");
			error.innerHTML = 'Split & transfer to L1G/S after close the case as SO-Unverified<div class="icon"><i class="fa fa-times-circle"></i></div>';
			error.style.display = "block";
			error.setAttribute("aria-hidden","false");
			info.style.display = "none";
    } else {
			warning.innerHTML = 'Either implementation needs to be verified or corrected by SME<div class="icon"><i class="fa fa-warning"></i></div>';
			warning.style.display = "block";
			warning.setAttribute("aria-hidden","false");
			success.innerHTML = 'Close the case as SO-Unverified if implementation is verified by SME.<div class="icon"><i class="fa fa-check"></i></div>';
			success.style.display = "block";
			success.setAttribute("aria-hidden","false");
			error.innerHTML = 'Split & transfer to L1G/S after close the case as SO-Unverified<div class="icon"><i class="fa fa-times-circle"></i></div>';
			error.style.display = "block";
			error.setAttribute("aria-hidden","false");
			info.style.display = "none";
    }
  } else if (greenTickValue === "no" && ecDashValue === "yes" && alertValue === "yes"){
			warning.innerHTML = 'Either implementation needs to be verified or corrected by SME<div class="icon"><i class="fa fa-warning"></i></div>';
			warning.style.display = "block";
			warning.setAttribute("aria-hidden","false");
			success.innerHTML = 'Close the case as SO-Unverified if implementation is verified by SME.<div class="icon"><i class="fa fa-check"></i></div>';
			success.style.display = "block";
			success.setAttribute("aria-hidden","false");
			info.innerHTML = 'TechSol may provide implementation support for the following error messages:<br>-Implement in-page code in addition to Automatic for better results<br>-AUTO_PII_RECOMMENDATION<br>-Improve your matched conversions by sending more user data<div class="icon"><i class="fa fa-info-circle"></i></div>';
			info.style.display = "block";
			info.setAttribute("aria-hidden","false");
			error.innerHTML = 'Split & transfer to L1G/S after close the case as SO-Unverified<div class="icon"><i class="fa fa-times-circle"></i></div>';
			error.style.display = "block";
			error.setAttribute("aria-hidden","false");		
	} else if (greenTickValue === "no" && ecDashValue === "no") {
		if (convActValue === "no") {
			warning.innerHTML = 'Either implementation needs to be verified or corrected by SME<div class="icon"><i class="fa fa-warning"></i></div>';
			warning.style.display = "block";
			warning.setAttribute("aria-hidden","false");
			success.innerHTML = 'Close the case as SO-Verified if implementation is verified by SME.<div class="icon"><i class="fa fa-check"></i></div>';
			success.style.display = "block";
			success.setAttribute("aria-hidden","false");
			info.innerHTML = 'Issue could be caused due to low conversion volume which cannot be fixed by TechSol<div class="icon"><i class="fa fa-info-circle"></i></div>';
			info.style.display = "block";
			info.setAttribute("aria-hidden","false");
			error.style.display = "none";
		} else if (convActValue === "yes") {
			warning.innerHTML = 'Either implementation needs to be verified or corrected by SME<div class="icon"><i class="fa fa-warning"></i></div>';
			warning.style.display = "block";
			warning.setAttribute("aria-hidden","false");
			success.innerHTML = 'Close the case as SO-Unverified if implementation is verified by SME.<div class="icon"><i class="fa fa-check"></i></div>';
			success.style.display = "block";
			success.setAttribute("aria-hidden","false");
			error.innerHTML = 'Split & transfer to L1G/S after close the case as SO-Unverified<div class="icon"><i class="fa fa-times-circle"></i></div>';
			error.style.display = "block";
			error.setAttribute("aria-hidden","false");
			info.style.display = "none";
		}
  } else if((greenTickValue === "yes" || greenTickValue === "no") && ecDashValue === "yes" && (daVaValue < 0 || daVaValue > 1) && coRaValue >= 0 && coRaValue <= 1){
			error.innerHTML = 'Please input valid value for data validity<div class="icon"><i class="fa fa-times-circle"></i></div>';
			error.style.display = "block";
			error.setAttribute("aria-hidden","false");
			info.style.display = "none";
			warning.style.display = "none";
			success.style.display = "none";
	} else if ((greenTickValue === "yes" || greenTickValue === "no") && ecDashValue === "yes" && (coRaValue < 0 || coRaValue > 1) && daVaValue >= 0 && daVaValue <= 1){
			error.innerHTML = 'Please input valid value for coverage rate<div class="icon"><i class="fa fa-times-circle"></i></div>';
			error.style.display = "block";
			error.setAttribute("aria-hidden","false");
			info.style.display = "none";
			warning.style.display = "none";
			success.style.display = "none";
	} else if ((greenTickValue === "yes" || greenTickValue === "no") && ecDashValue === "yes" && (coRaValue < 0 || coRaValue > 1) && (daVaValue < 0 || daVaValue > 1)){
			error.innerHTML = 'Please input valid value for data validity & coverage rate<div class="icon"><i class="fa fa-times-circle"></i></div>';
			error.style.display = "block";
			error.setAttribute("aria-hidden","false");
			info.style.display = "none";
			warning.style.display = "none";
			success.style.display = "none";
	}
}

//reset all selected & input
function Reset() {
	location.reload(true);
}
