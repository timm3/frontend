function trim(s)
{
  return s.replace(/^\s+|\s+$/, '');
} 


 /************************************************************\
 | given an email address, a paragraph for an error message, 
 | and a div to contain that paragraph, warn users of invalid
 | email addresses 
 \************************************************************/
function validEmail(emailField, messageParagraph, messageDiv) {
	//should the email field be passed in or assumed?
	//var fld = document.getElementById('inputEmail3');
	var regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b/;
	//' this comment and tic are to fix editor highlighting
	var re = new RegExp(regex);
	
	var error = "";
	
	var fld = emailField;
	var msg = messageParagraph;
	var msgDiv = messageDiv;
	
    var badColor = "#ff6666";
	
	//find reasons to flag for error and set error message
	if (fld.value == "") {
		error = "You didn't enter an email address.\n";
    } else if(!re.test(fld.value)) {
		error = "You didn't enter an email address.\n";
	}
	
	//change form look based on error existence
	if(!(error == "")) {
		fld.style.background = badColor;
		msg.style.color = badColor;
        msg.innerHTML = error;
		msg.style.display = 'inline';
		msgDiv.style.display = 'inline';
	} else {
		fld.style.background = 'initial';
		msg.style.display = 'none';
		msgDiv.style.display = 'none';
	}
	
	return error;
}


function validateEmail(fld) {
    var error="";
    var tfld = trim(fld.value);                        // value of field with whitespace trimmed off
    var emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/ ;
    var illegalChars= /[\(\)\<\>\,\;\:\\\"\[\]]/ ;
    
    if (fld.value == "") {
        fld.style.background = 'Yellow';
        error = "You didn't enter an email address.\n";
    } else if (!emailFilter.test(tfld)) {              //test email for illegal characters
        fld.style.background = 'Yellow';
        error = "Please enter a valid email address.\n";
    } else if (fld.value.match(illegalChars)) {
        fld.style.background = 'Yellow';
        error = "The email address contains illegal characters.\n";
    } else {
        fld.style.background = 'White';
    }
    return error;
}