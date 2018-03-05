var num1;
var num2;
var tempno;
var lastno;
var curOprator; 
var lastOprator;
var opratorsArray;
var inputflag;

function init(){
	num1 = null;
	num2 = null;	
	curOprator = null;
	lastOprator = null;
	tempno = null;
	lastno = null;
	inputflag = 0;
	opratorsArray = {107: '+', 109: '-', 106: '*',111:'/',13:'='};
	$("#calnumber").focus();	
}

function opration(keyid){	
	inputflag = 0;
	var prassedKey = keyid;
	for (var key in opratorsArray) {
		if(key == keyid){
			curOprator = opratorsArray[key];
			//console.log("key " + key + " has value " + opratorsArray[key] + "curOprator "+curOprator);
		}
	}
	
	if(isNaN(curOprator)){

		if(curOprator === '='){
			if(tempno !== null && lastno!== null && lastOprator!== null){
				console.log('=');
				doCalculation(tempno,lastno,lastOprator);
				$('#history').html('');
				curOprator = null;
				return;
			}		
		}
			
		if( num1 === null ){

			if(tempno === null){
				num1 = parseFloat( $('#calnumber').val() );
				$('#history').append(num1);				
			}else{
				num1 = tempno;
			}
						
			lastOprator = curOprator;
			curOprator = null;
			
			
		}else if( num2 === null ){			
			num2 = parseFloat( $('#calnumber').val() );
			$('#history').append(' '+lastOprator+' '+num2);
			console.log('lastOprator in if'+lastOprator);				
		}		
		
		if(num1 !== null && num2 !== null && lastOprator !== null){							
			doCalculation(num1,num2,lastOprator);
		}
		
		if(inputflag == 0){
			$('#calnumber').val('');
		}
		
		
		
	}	
}
function doCalculation(tempnum1,tempnum2,lastOprator){
	var tempnum1 = parseFloat(tempnum1);
	var tempnum2 = parseFloat(tempnum2);
	var calResult;
	
	if(lastOprator == '+'){		
		calResult = tempnum1+tempnum2;
	}
	
	if(lastOprator == '-'){		
		calResult = tempnum1-tempnum2;
	}
	
	if(lastOprator == '/'){		
		calResult = tempnum1/tempnum2;
	}
	
	if(lastOprator == '*'){
		calResult = tempnum1*tempnum2;
	}
	tempno = calResult;
	lastno = tempnum2;
	num1 = num2 = null;
	console.log('calResult= '+calResult);
	$('#calnumber, #result').val(calResult);
	inputflag = 1;
}


$(document).keyup(function(e){
	//var reg = /^\d+$/;
	//if( !reg.test($('#calnumber').val()) ){
		//e.preventDefault();
		//console.log("Please input number only.");
	//}else{
		$("#calnumber").focus();		
		var keyid = e.keyCode;
		opration(keyid);
	//}	
}); 

function isNumber(evt) {
    /*evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }*/
	if( !reg.test($('#calnumber').val()) ){
		e.preventDefault();
		console.log("Please input number only.");
	}
    return true;
}


function enterNumber(inputValue){
	$("#calnumber").val(function() {
		return this.value + inputValue;					
	});
}
document.querySelector("input").addEventListener("keypress", function (evt) {
	if (evt.which < 48 || evt.which > 57)
	{
		evt.preventDefault();
	}		
});
init();