let getal1, getal2;
do{
	getal1 = prompt("Geef het 1e getal in.");
	
} while (isNaN(getal1) || getal1=="" || getal1==null);

do{	
	getal2 = prompt("Geef het 2e getal in.");
} while (isNaN(getal2) ||  getal2=="" ||  getal2==null);

getal1 = +getal1;
getal2 = +getal2;

if (getal1 == getal2) {
	document.getElementById("resultaat").innerHTML = "Het eerste getal (" + getal1 +") is gelijk aan het tweede getal ("+ getal2 +").";
	  
} else if (getal1 > getal2) {
	document.getElementById("resultaat").innerHTML = "Het eerste getal (" + getal1 +") is groter aan het tweede getal ("+ getal2 +").";
	  
} else {
	document.getElementById("resultaat").innerHTML = "Het eerste getal (" + getal1 +") is kleiner aan het tweede getal ("+ getal2 +").";
}
