function validateFormOnSubmit(theForm) {
  var theForm = document.getElementById("signup");
  var reason = "";

  reason += validateUsername(theForm.name);
  reason += validatePassword(theForm.pwd);
  reason += validateEmail(theForm.email);
  //reason += validatePhone(theForm.phone);
  reason += validateEmpty(theForm.from);
      
  if (reason != "") {
    alert("Some fields need correction:\n" + reason);
    return false;
  }

  return true;
}


function validateSignup() {
	var form = document.getElementById("signup");
	var reason = "";
	
	reason += validateUsername(document.getElementById('name'), document.getElementById('validNameMessage'), document.getElementById('validNameDiv'));
	reason += validEmail(document.getElementById('email'), document.getElementById('validEmailMessage'), document.getElementById('validEmailDiv'));
	reason += checkPass('pass', document.getElementById('inputPassword3'), document.getElementById('confirmPassword3'), document.getElementById('passwordMatchMessage'), document.getElementById('validPasswordDiv'));
	//reason += validateUsername(document.getElementById('netid'), document.getElementById('validNetidMessage'), document.getElementById('validNetidDiv'));
	reason += checkPass('adPass', document.getElementById('inputADPassword3'), document.getElementById('confirmADPassword3'), document.getElementById('ADpasswordMatchMessage'), document.getElementById('validADPasswordDiv'));
	
	if (reason != "") {
		alert("Some fields need correcting: \n" + reason);
		return false;
	}
	else {
		form.submit();
		return true;
	}
}