 /************************************************************\
 | given a set of passwords, a paragraph for an error message, 
 | and a div to contain that paragraph, warn users of non-
 | matching or invalid passwords
 \************************************************************/
function checkPass(type, password, passwordConfirmation, messageParagraph, messageDiv)
{
	var pass1 = password;
	var pass2 = passwordConfirmation;
	var msg = messageParagraph;
	var msgDiv = messageDiv;
	var goodMsg, badMsg;
	
	if(type=="pass") {
		goodMsg = "Passwords Match! \n";
		badMsg = "Passwords Do Not Match! \n";
		
	} else if(type=="adPass") {
		goodMsg = "AD Passwords Match! \n";
		badMsg = "AD Passwords Do Not Match! \n";
	} else { //default 
		goodMsg = "Values Match! \n";
		badMsg = "Values Do Not Match! \n";
	}
	
    //Set the colors we will be using ...
    var goodColor = "#66cc66";
    var badColor = "#ff6666";
	
	var error = "";
	
    //Compare the values in the password field 
    //and the confirmation field
    if(pass1.value == pass2.value){
        //The passwords match. 
        //Set the color to the good color and inform
        //the user that they have entered the correct password 
		pass1.style.backgroundColor = "initial";
		pass2.style.backgroundColor = "initial";
        msg.style.color = goodColor;
        msg.innerHTML = goodMsg;
		msg.style.display = "none";
		msgDiv.style.display = "none";
    }else if(!(pass2.value == "")){
        //The passwords do not match.
        //Set the color to the bad color and
        //notify the user.
        pass1.style.backgroundColor = badColor;
		pass2.style.backgroundColor = badColor;
        msg.style.color = badColor;
        error = badMsg;
		msg.innerHTML = error;
		msg.style.display = "inline";
		msgDiv.style.display = "inline";
    }
	
	return error;
}  