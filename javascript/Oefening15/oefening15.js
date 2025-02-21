/* document.getElementById("box").onmouseover = function(){
 	document.getElementById("resultaat").innerHTML += "De box werd betreden.<br />";
 	document.getElementById("box").style.backgroundColor = "green";
 	// this.style.backgroundColor = "green"; 
 };*/


// Met addEventListener en anonieme functie: 
document.getElementById("box").addEventListener("mouseover", function(){
	document.getElementById("resultaat").innerHTML += "De box werd betreden.<br />";
	document.getElementById("box").style.backgroundColor = "green"; 
	// this.style.backgroundColor = "green";
});

/* Met addEventListener en functie aanroep: 
document.getElementById("box").addEventListener("mouseover", boxMouseOver);

function boxMouseOver(){
	document.getElementById("resultaat").innerHTML += "De box werd betreden.<br />";
	document.getElementById("box").style.backgroundColor = "green"; 
	// this.style.backgroundColor = "green";
};
*/

/* Met addEventListener en arrow functie 
document.getElementById("box").addEventListener("mouseover", () => {
	document.getElementById("resultaat").innerHTML += "De box werd betreden.<br />";
	document.getElementById("box").style.backgroundColor = "green"; 
});
*/

/* Met arrow functie
document.getElementById("box").onmouseover = () => {
	document.getElementById("resultaat").innerHTML += "De box werd betreden.<br />";
	document.getElementById("box").style.backgroundColor = "green"; 
};
 */

/* Je kan ook het event gebruiken om het event.target te kunnen gebruiken: 
document.getElementById("box").addEventListener("mouseover", (event) => {
	document.getElementById("resultaat").innerHTML += "De box werd betreden.<br />";
	event.target.style.backgroundColor = "green";
});
werkt voor de 3 wijzes waarop this niet werkt
*/

document.getElementById("box").addEventListener("mouseout", function(){
	document.getElementById("resultaat").innerHTML += "De box werd verlaten.<br />";
	document.getElementById("box").style.backgroundColor = "red";
});

document.getElementById("box").addEventListener("mousedown", function(){
	document.getElementById("box").style.border = "5px solid blue";
});

document.getElementById("box").addEventListener("mouseup", function(){
	document.getElementById("box").style.border = "0px none blue";
});





 

