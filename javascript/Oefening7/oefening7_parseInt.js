let getal1 = parseInt(prompt("Geef het 1e getal in."));
let getal2 = parseInt(prompt("Geef het 2e getal in."));

if (isNaN(getal1) || isNaN(getal2)) {
	document.getElementById("resultaat").innerHTML = "Je hebt geen 2 getallen ingegeven.";
  } else {
	  if (getal1 == getal2) {
		document.getElementById("resultaat").innerHTML = "Het eerste getal (" + getal1 +") is gelijk aan het tweede getal ("+ getal2 +").";
	  
	  } else if (getal1 > getal2) {
		document.getElementById("resultaat").innerHTML = "Het eerste getal (" + getal1 +") is groter aan het tweede getal ("+ getal2 +").";
	  
	  } else {
		document.getElementById("resultaat").innerHTML = "Het eerste getal (" + getal1 +") is kleiner aan het tweede getal ("+ getal2 +").";
	  }
  }