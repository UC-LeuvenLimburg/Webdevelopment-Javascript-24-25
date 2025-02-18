function leesGetal(){
	let getal;
	do{
	getal = +prompt("Geef een getal van 1 tot 20.");
	}
	while (isNaN(getal) || getal < 1 || getal > 20);
	return getal;
}

function berekenTafels(getal){
	let tafels=[];
	for (var i=1; i<=20; i++) {
		tafels.push(i*getal);
		//tafels[i-1] = i*getal;
	} 
	return tafels;
}

function toonTafels(getal, tafels){
	let str="";
	for (let i=1; i<=tafels.length; i++) {
		//str += i + " * " + getal + " = " + tafels.shift() + "<br />"; 
		// Let op met tafels.shift() wordt tafels.length aangepast
		str += i + " * " + getal + " = " + tafels[i-1] + "<br />"; 		
	} 
	document.getElementById("resultaat").innerHTML = str;
}


function toonSom1(tafels){
	let som = 0;
	//for (let i=0; i<tafels.length; i++) {
	for (let i in tafels) {
		som += tafels[i];		
	} 
	document.getElementById("som1").innerHTML = "Som1: " + som;
}

function toonSom2(tafels){
	let som = 0;
	//tafels.forEach(function(tafel){
	tafels.forEach(tafel => {
		som += tafel;
	});
	document.getElementById("som2").innerHTML = "Som2: " + som;
}

function toonSom3(tafels){
	//let som = tafels.reduce((a,b)=>a+b,0);
	let som = tafels.reduce(function(a,b){return a+b;}, 0);
	document.getElementById("som3").innerHTML = "Som3: " + som;
}

var getal = leesGetal();
document.getElementById("waarde").innerHTML = getal;
var getalTafels = berekenTafels(getal);
console.log(getalTafels);
toonTafels(getal, getalTafels);
console.log(getalTafels);
toonSom1(getalTafels);
toonSom2(getalTafels);
toonSom3(getalTafels);

