/// ==UserScript==
// @name         WeaponChecker
// @namespace    https://github.com/miguel200761/csgoMarketCheck
// @version      0.2
// @description  Check
// @author       Baldbyte ~ Miguel200761
// @include      http://www.csgozone.net/*
// @include      http://www.csgozone.net/
// @include      http://www.csgozone.net/#check
// @grant        none
// @updateURL    https://github.com/miguel200761/csgoMarketCheck/blob/master/csgoCheck.user.js
// @downloadURL  https://github.com/miguel200761/csgoMarketCheck/blob/master/csgoCheck.user.js
// ==/UserScript==




var ArrayLength;
var textField;

var urlsArray;
var pricesArray;
var wearArray;
var patternArray;
var timeToRefresh = 100;
var currentArray = 0;
var time = 0;
var hasPrinted = false;
var clicked = false;

var currentWear = NaN;
var lastWear = 2;

var mainInterval;

//Create TextField
textField = document.createElement('TEXTAREA');
textField.type = "text";
textField.setAttribute('id', 'textInspectData');
textField.setAttribute('maxlength', 100000);
textField.setAttribute('cols', 20);
textField.setAttribute('rows', 1);
document.body.appendChild(textField);

//Create Button
var button = document.createElement('BUTTON');
button.setAttribute('id', 'ButtonList');
var t = document.createTextNode("Calculate!");
button.appendChild(t);
document.body.appendChild(button);

document.getElementById("ButtonList").addEventListener(
	"click", start, false);



function MainManager(){
	if(currentArray < ArrayLength){
		//Get Current Wear Value
		var wearValue = document.getElementsByClassName("wear value");
		currentWear = parseFloat(wearValue[0].innerHTML);
		console.log("current: " + currentWear);
		if(!clicked){
			//
			var allCheckInputs = document.getElementsByClassName("check-input");
			var allCheckLoadButton = document.getElementsByClassName("check-load-button");
            
			//Put the value to inspect
			allCheckInputs[1].value = "";
			allCheckInputs[1].value = urlsArray[currentArray];

			//Click on it
			allCheckLoadButton[1].click();
			clicked = true;
		}else if(time > 20000 || lastWear != currentWear){
			if(!Number.isNaN(currentWear)){
			//Get the wear value
			lastWear = currentWear;
			console.log("last: " + lastWear);
			wearArray[currentArray] = currentWear;
			//patternArray
			var patValue = document.getElementsByClassName("pattern value");
			patternArray[currentArray] = parseFloat(patValue[0].innerHTML);
			time = 0;
			clicked = false;
			currentArray++;
			}
		}
		console.log("time: " + time);
		time += timeToRefresh;
	}else if(currentArray >= ArrayLength && !hasPrinted){
		//Print
		var para = document.createElement("P");
		para.setAttribute('style','font-size:160%');
		var text = "";
		for(i = 0; i < pricesArray.length; i++){
			text += pricesArray[i] + "  " + wearArray[i] + "     " + patternArray[i] + '<br>';
		}
        text += "BEST WEAR: " + '<br>';
        text += bestWear() + '<br>';
		para.innerHTML = text;
		document.body.appendChild(para);
		hasPrinted = true;
	}else if(currentArray >= ArrayLength && hasPrinted){
		clearInterval(mainInterval);
	}

}

function start(){
	var rawData = textField.value;

	var splitArray = rawData.split(",");
	ArrayLength = splitArray.length;
    
	clicked = false;
	currentArrat = 0;
	urlsArray = new Array(ArrayLength);
	pricesArray = new Array(ArrayLength);
	wearArray = new Array(ArrayLength);
	patternArray = new Array(ArrayLength);
	//Separate From Array
	for(i = 0; i < ArrayLength; i++){
		var split = splitArray[i].split(" ");
		//Always split must be 2 of length
		urlsArray[i] = split[0];
		pricesArray[i] = split[1];
	}
	
	mainInterval = setInterval(function(){MainManager();},timeToRefresh);
	
}

function bestWear(){
    var best = 0;
    var bestW = 1.0;  
    
    for(i = 0; i < pricesArray.length; i++){
		if(bestW > wearArray[i]){
            bestW = wearArray[i];
            best = i;
        }
	}
    
    return wearArray[best] + "     " + pricesArray[i];
}
