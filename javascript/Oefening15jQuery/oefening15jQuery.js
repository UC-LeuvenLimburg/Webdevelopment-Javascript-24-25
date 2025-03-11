  $("#box").on({
	mousedown: function(){
		$(this).css("border", "5px solid blue");
	},
	mouseup: function(){
		$(this).css("border", "0px none blue");
	},
	mouseover: function(){
		$(this).css("background-color", "green");
		// $("#resultaat").html($("#resultaat").html() + "De box werd betreden.<br>");
		// $("#resultaat").html(function(i,cur){ return cur + "De box werd betreden.<br>";});
		$("#resultaat").html((i,cur) => cur + "De box werd betreden.<br>");
		// $("#resultaat").append("De box werd betreden.<br>");
	},
	mouseout: function(){
		$(this).css("background-color", "red");
		// $("#resultaat").html(function(i,cur){ return cur + "De box werd verlaten.<br>";});
		$("#resultaat").html(function(i,cur){ return cur + "De box werd verlaten.<br>";});
		// $("#resultaat").append("De box werd verlaten.<br>");
	}
  });





