document.querySelector("#name").each(function (type) {
	
	document.querySelector(this).keypress(function () {
		document.querySelector(this).parent().classList.add("focusWithText");
	});
 
	document.querySelector(this).blur(function () {
		if (document.querySelector(this).value == "") {
			document.querySelector(this).parent().classList.remove("focusWithText");
		}
	});
	
});