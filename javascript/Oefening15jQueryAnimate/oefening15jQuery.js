  $("#box").on({
	mousedown: function(){
		//$(this).css("border", "5px solid blue");
		$(this).css("border", "5px solid blue").animate({width:'120px', height:'120px'}, 500).animate({width:'100px', height:'100px'}, 500);

	},
	mouseup: function(){
		$(this).css("border", "0px none blue");
		$(this).css("border", "0px none blue").animate({width:'120px', height:'120px'}, 500).animate({width:'100px', height:'100px'}, 500);

	},
	mouseover: function(){
		$(this).css("background-color", "green");
		// $("#resultaat").html($("#resultaat").html() + "De box werd betreden.<br>");
		// $("#resultaat").html(function(i,cur){ return cur + "De box werd betreden.<br>";});
		// $("#resultaat").html((i,cur) => cur + "De box werd betreden.<br>");
		// $("#resultaat").append("De box werd betreden.<br>");
		$("#resultaat").fadeOut(500, function() {
			$("#resultaat").html("De box werd betreden.").fadeIn(500)
		});
	},
	mouseout: function(){
		$(this).css("background-color", "red");
		// $("#resultaat").html(function(i,cur){ return cur + "De box werd verlaten.<br>";});
		//$("#resultaat").html(function(i,cur){ return cur + "De box werd verlaten.<br>";});
		// $("#resultaat").append("De box werd verlaten.<br>");
		$("#resultaat").fadeOut(500, function() {
			$("#resultaat").html("De box werd verlaten.").fadeIn(500);
		});
	}
  });






