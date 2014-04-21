/*
$("form#formID :input").each(function(){
 var input = $(this); // This is the jquery object of the input, do what you will
});

// ==============================================================================

$('#myForm').submit(function() {
    // get all the inputs into an array.
//    var $inputs = $('#myForm :input');
    
    var $name = $('#myForm :input');
    var $email = $('#myForm : input');
    var $password = $('#myForm : input');
    var $confirmpass = $('#myForm : input');

    var $netid = $('#myForm : input');
    var $adpass = $('#myForm : input');
    var $confirmadpass = $('#myForm : input');

    // not sure if you wanted this, but I thought I'd add it.
    // get an associative array of just the values.
    
    var values = {};
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });

});

*/
$().ready(function() { 
	$("#form1").submit(function () {
    var inputs = $('.form-horizontal :input');
    console.log(inputs[0]);
    console.log('running');
    return;
});
console.log($('#form1').length);
});