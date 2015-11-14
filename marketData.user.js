// ==UserScript==
// @name         WeaponMarketData
// @namespace    https://github.com/miguel200761/csgoMarketCheck
// @version      0.1
// @description  Gives the data from any csgo weapon into a string
// @author       Baldbyte ~ Miguel200761
// @include      http://steamcommunity.com/market/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/miguel200761/csgoMarketCheck/master/marketData.js
// @downloadURL  https://raw.githubusercontent.com/miguel200761/csgoMarketCheck/master/marketData.js
// ==/UserScript==

var write = false;

//Create Button
var button = document.createElement('BUTTON');
button.setAttribute('id', 'ButtonList');
var t = document.createTextNode("List!"); 
button.appendChild(t);
document.body.appendChild(button);

setInterval(Button(), 100);

function Button(){
	if(!write){
		var b = document.getElementById("ButtonList");
		if(b.clicked == true){
			start();
			write = true;
		}
	}
}

function start(){
	var inspectsClass = document.getElementsByClassName("sih-market-action");
	var pricesClass = document.getElementsByClassName("market_listing_price market_listing_price_with_fee");
	var inspects = new Array(inspectsClass.length);
	var prices = new Array(pricesClass.length);

	var data = new Array(inspectsClass.length);

	//Get Values
	for (i = 0; i < inspectsClass.length; i++) { 
		inspects[i] = inspectsClass[i].href;
	}
	for (i = 0; i < pricesClass.length; i++) { 
		prices[i] = pricesClass[i].innerHTML.trim().replace(",", ".");
	}

	//Mount DATA
	for(i = 0; i < inspectsClass.length; i++){
		data[i] = inspects[i] + " " +  prices[i];
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
}