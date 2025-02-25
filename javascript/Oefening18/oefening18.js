//var buttonToonTitel = document.getElementsByTagName("button")[0];
let buttonToonTitel = document.querySelector("button");

buttonToonTitel.addEventListener("click", function(){
	//let nieuweTitel = document.getElementsByTagName("input")[0].value;
	let nieuweTitel = document.querySelector("input").value;
	
	let titel = document.createElement("h1"); 
	titel.innerHTML = nieuweTitel;
	//document.body.appendChild(titel); // onderaan
	//document.body.insertBefore(titel, document.body.firstChild); // voor de commentaar = voor eerste Node
	document.body.insertBefore(titel, document.body.firstElementChild); // na de commentaar = voor eerste HTML element
});
