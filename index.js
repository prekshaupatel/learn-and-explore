function hide_steps(name, button_name, msg) {
    var x = document.getElementById(name);
    if (x.style.display === "none") {
	x.style.display = "block";
	document.getElementById(button_name).innerHTML = "Hide "+msg;
    } else {
	x.style.display = "none";
	document.getElementById(button_name).innerHTML	= "Show "+msg;
    }
}
