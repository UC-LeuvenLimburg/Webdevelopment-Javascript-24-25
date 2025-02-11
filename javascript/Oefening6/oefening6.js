let antwoord = prompt("Geef een zin in.");
let positie = antwoord.indexOf(" ");
document.getElementById("resultaat").innerHTML = "<p>In de zin: " + antwoord + "<br />";
document.getElementById("resultaat").innerHTML += "staat de spatie op positie " + (positie+1) + "</p>";
