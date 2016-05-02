// ==UserScript==
// @name         WeaponMarketData
// @namespace    https://github.com/miguel200761/csgoMarketCheck
// @version      0.3
// @description  Gives the data from any csgo weapon into a string
// @author       Baldbyte ~ Miguel200761
// @include      http://steamcommunity.com/market/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/miguel200761/csgoMarketCheck/master/marketData.js
// @downloadURL  https://raw.githubusercontent.com/miguel200761/csgoMarketCheck/master/marketData.js
// ==/UserScript==

var data;
var done = false;

//Create Button
var button = document.createElement('BUTTON');
button.setAttribute('id', 'ButtonList');
var t = document.createTextNode("List & Copy!");
button.appendChild(t);
document.body.appendChild(button);

document.getElementById("ButtonList").addEventListener (
    "click", start, true
);

function start(){
    if(!done){
	var inspectsClass = document.getElementsByClassName("sih-inspect-magnifier");
	var pricesClass = document.getElementsByClassName("market_listing_price market_listing_price_with_fee");
    var imageClass = document.getElementsByClassName("market_listing_owner_avatar");
	var inspects = new Array(inspectsClass.length);
	var prices = new Array(pricesClass.length);
    var images = new Array(imageClass.lenght);
        
	data = new Array(inspectsClass.length);

	//Get Values
	for (i = 0; i < inspectsClass.length; i++) {
		inspects[i] = inspectsClass[i].href;
	}
	for (i = 0; i < pricesClass.length; i++) {
		prices[i] = pricesClass[i].innerHTML.trim().replace(",", ".");
	}
        
    for (i = 0; i < imageClass.length; i++) {
        console.log(imageClass[i].innerHTML);
		images[i] = getSRC(imageClass[i].innerHTML);
	}

	//Mount DATA
	for(i = 0; i < inspectsClass.length; i++){
		data[i] = inspects[i] + " " +  prices[i] + " " + images[i];
	}

	var stringData;
	for(i = 0; i < data.length; i++){
		stringData = stringData + data[i];
	}

	//Print data
	var inputArea = document.createElement('p');
	inputArea.setAttribute('type', 'text');
	inputArea.innerHTML = data;
	document.body.appendChild(inputArea);
    
    copyData();
    done = true;
    }
}

function copyData(){
  var textArea = document.createElement("textarea");

  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = 0;
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';

  textArea.value = data;

  document.body.appendChild(textArea);

    textArea.select();
    document.execCommand('copy');
}

function getSRC(str){
    var indexStart = str.indexOf('src=');
    var indexEnd = str.indexOf("jpg",30);
    
    
    indexStart += 5;
    indexEnd += 3;
    
    return str.substr(indexStart,indexEnd - indexStart);
    
    
}
    