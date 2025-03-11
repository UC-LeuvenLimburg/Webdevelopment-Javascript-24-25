$("p").on("click", wijzigTekst);

function wijzigTekst() {
    $(this).css("color", "red");
    $(this).html("You're hacked!");
}

let knop = $("<button></button>").html("Voeg paragraaf toe");
$("body").append(knop);
knop.on("click", function() {
    let aantal = $("p").length;
    let paragraaf = $("<p></p>").html("Paragraaf " + (aantal+1));
    $(this).before(paragraaf);

    paragraaf.on("click", wijzigTekst);
});
