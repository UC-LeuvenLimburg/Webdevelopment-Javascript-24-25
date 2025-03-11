//$(function(){
    $("button").on("click", function(){
        let input = $("input").val();
        let titel = $("<h1></h1>").html(input);
        $("body").prepend(titel);
    });
//});