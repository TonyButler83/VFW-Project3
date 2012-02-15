/*
VFW Project Web App Part 2
by: David Butler
date: 2/09/2012
term: 1202
*/



window.addEventListener("DOMContentLoaded", function(){
		
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}

function makeCats(){
	var formTag = document.getElementsByTagName("form"),
		selectLi = $('select'),
		makeSelect = document.createElement('select');
		makeSelect.setAttribute("id", "groups");
	for(var i=0, j=entryGroups.length; i<j; i++){
		var makeOption = document.createElement('option');
		var optText = entryGroups[i];
		makeOption.setAttribute("value", optText);
		makeOption.innerHTML = optText;
		makeSelect.appendChild(makeOption);
	}
	selectLi.appendChild(makeSelect);
}



function getSelectedRadio(){
	var radios = document.forms[0].sort;
	for(var i=0; i<radios.length; i++){
		if(radios[i].checked){
			sortValue = radios[i].value;
		}
	}
}



	function toggleControls(n){
		switch(n){
			case "on":
				$('entryForm').style.display = "none";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addNew').style.display = "inline";
				break;
			case "off":
				$('entryForm').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "inline";
				$('addNew').style.display = "none";
				$('items').style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	
	function storeData(key){
		if(!key){
			var id				= Math.floor(Math.random()*1000000001);
		}else{
			id = key;
		}
	
	getSelectedRadio();
		
		var item			= {};
			item.group		= ["Category:", $('groups').value];
			item.title		= ["Title:", $('title').value];
			item.login		= ["Login:", $('login').value];
			item.pword		= ["Password:", $('pword').value];
			item.cpword		= ["Confirm Password:", $('cpword').value];
			item.sort		= ["Sort By:", sortValue];	
			item.usage		= ["Usage:", $('usage2').value];
			item.date		= ["Date Modified:", $('dateModified').value];
			item.notes		= ["Notes:", $('notes').value];
		
		localStorage.setItem(id, JSON.stringify(item));
		alert("Entry Saved!");
}

function getData(){
	toggleControls("on");
	if(localStorage.length === 0){
		alert("There are no password entries to display.");
	}
	var makeDiv = document.createElement('div');
	makeDiv.setAttribute("id", "items");
	var makeList = document.createElement('ul');
	makeDiv.appendChild(makeList);
	document.body.appendChild(makeDiv);
	for(var i=0, len=localStorage.length; i<len;i++){
		var makeli = document.createElement('li');
		var linksLi = document.createElement('li');
		makeList.appendChild(makeli);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		var makeSubList = document.createElement('ul');
		makeli.appendChild(makeSubList);
		for(var n in obj){
			var makeSubli = document.createElement('li');
			makeSubList.appendChild(makeSubli);
			var optSubText = obj[n][0]+" "+obj[n][1];
			makeSubli.innerHTML = optSubText;
			makeSubList.appendChild(linksLi);
		}
		makeItemLinks(localStorage.key(i), linksLi);
	}
}

function makeItemLinks(key, linksLi){
	var editLink = document.createElement('a');
	editLink.href = "#";
	editLink.key = key;
	var editText = "Edit Entry";
	editLink.addEventListener("click", editItem);
	editLink.innerHTML = editText;
	linksLi.appendChild(editLink);
	
	var breakTag = document.createElement('br');
	linksLi.appendChild(breakTag);
	
	var deleteLink = document.createElement('a');
	deleteLink.href = "#";
	deleteLink.key = key;
	var deleteText = "Delete Entry";
	deleteLink.addEventListener("click", deleteItem);
	deleteLink.innerHTML = deleteText;
	linksLi.appendChild(deleteLink);
}

function editItem(){
	var value = localStorage.getItem(this.key);
	var item = JSON.parse(value);
	
	toggleControls("off");

	$('groups').value = item.group[1];
	$('title').value = item.title[1];
	$('login').value = item.login[1];
	$('pword').value = item.pword[1];
	$('cpword').value = item.cpword[1];
	$('usage2').value = item.usage[1];
	$('dateModified').value = item.date[1];
	$('notes').value = item.notes[1];

	save.removeEventListener("click", storeData);
	$('submit').value = "Edit Entry";
	var editSubmit = $('submit');	
//Save the key value establised in this function as a property of the editSubmit event
//so we can use that value when we save the data we edited.
	editSubmit.addEventListener("click", validate);
	editSubmit.key = this.key;
}

function deleteItem(){
	var ask = confirm("Are you sure you want to delete this entry?");
	if(ask){
		localStorage.removeItem(this.key);
		alert("Entry is deleted!");
		window.location.reload();
	}else{
		alert("Entry was NOT deleted.")
		}
	}
	
function clearLocal(){
	if(localStorage.length === 0){
		alert("There is no data to clear.")
	}else{
		localStorage.clear();
		alert("All password entries have been deleted!");
		window.location.reload();
		return false;
	}
}

function validate(e){
	var getGroup = $('groups');
	var getTitle = $('title');
	var getPword = $('pword');
    var getCpword = $('cpword');
	
	
//Reset Error Messages	
	errMsg.innerHTML = "";
	getGroup.style.border = "1px solid black";
	getTitle.style.boarder = "1px solid black";
	
	var messageAry = [];
	if(getGroup.value ==="--Select Category--"){
		var groupError = "Please select a category.";
		getGroup.style.border = "1px solid red";
		messageAry.push(groupError);
	}
		
	if(getTitle.value === ""){
		var titleError = "Please enter a title."
		getTitle.style.boarder = "1px solid red";
		messageAry.push(titleError);
	}
	if(getPword.value === ""){
		var pwordError = "Please enter a password."
		getPword.style.boarder = "1px solid red";
		messageAry.push(pwordError);
	}	
	if(getCpword.value === ""){
		var cpwordError = "Please retype your password for confirmation."
		getCpword.style.boarder = "1px solid red";
		messageAry.push(cpwordError);
	
	}
	
////Displays messages on screen	
	if(messageAry.length >= 1){
		for(var i=0, j=messageAry.length; i < j; i++){
			var txt = document.createElement('li');
			txt.innerHTML = messageAry[i];
			errMsg.appendChild(txt);
		}
		e.preventDefault();
		return false;
	}else{
	
		storeData(this.key);
	}
}


//// Check Password function

var getPword = $('pword');
var getCpword = $('cpword');
var check = $('submit');


function checkPword(){
	if(getPword.value != ""){
		getCpword.removeAttribute("disabled", "disabled");
	}else{
		getCpword.setAttribute("disabled", "disabled");
	}
}

function comparePwords(){
	if(getPword.value === getCpword.value){
		
	}else{
		alert("The passwords do not match. Please try again.");
	}
}


var entryGroups = ["--Select Category--", "Computer Logins", "Email", "Financial", "Online Shopping", "Personal", "Other"], 
	sortValue,
	errMsg = $('errors');
;	
	makeCats();

var displayLink = $('displayLink');
displayLink.addEventListener("click", getData);
var clearLink = $('clear');
clearLink.addEventListener("click", clearLocal);
var save = $('submit');
save.addEventListener("click", validate);
getPword.addEventListener("blur", checkPword);
check.addEventListener("click", comparePwords);


});