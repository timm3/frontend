 /************************************************************\
 | given a username, a paragraph for an error message, and
 | a div to contain that paragraph, warn users of invalid
 | usernames and how to remedy the issues encountered
 \************************************************************/
function validateUsername(type, usernameField, messageParagraph, messageDiv) {
    var error = "";
	var fld = usernameField; 
	var msg = messageParagraph; 
	var msgDiv = messageDiv; 
    var illegalChars = /\W/; // allow letters, numbers, and underscores
	var re = new RegExp(illegalChars);
	var badColor = '#ff6666';
 	
	//if an error is found, set error variable
    if (fld.value == "") {
        error = "You didn't enter a " + type + ".\n";
    } else if (fld.value.length < 5) {
        error = "Your " + type + " is too short. Please use more than 4 characters.\n";
    } else if (fld.value.length > 32) {
        error = "Your " + type + " is too long. Please stay under 33 characters.\n";
    } else if (re.test(fld.value)) {
        error = "Your " + type + " contains illegal characters.\n";
    } 
	
	//if error then alert user. if not, restore the form
	if(!(error == "")) {
		fld.style.background = badColor;
		msg.style.display = 'inline';
		msg.style.color = badColor;
		msg.innerHTML = error;
		msgDiv.style.display = 'inline';
	} else {
		fld.style.background = 'initial';
		msg.innerHTML = "";
		msg.style.color = 'initial';
		msg.style.display = 'none';
		msgDiv.style.display = 'none';
	}
	
    return error;
}