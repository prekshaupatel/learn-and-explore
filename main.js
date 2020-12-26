var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}


if ($sidenav.length > 0) {
    
    var $sidebar_a = $sidenav.find('a');
    
    $sidenav_a
	.addClass('scrolly')
	.on('click', function() {
	    
	    var $this = $(this);

	    // External link? Bail.
	    if ($this.attr('href').charAt(0) != '#')
		return;
	    
	    // Deactivate all links.
	    $sidenav_a.removeClass('active');
	    
	    // Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
	    $this
		.addClass('active')
		.addClass('active-locked');
	    
	})
	.each(function() {
	    
	    var	$this = $(this),
		id = $this.attr('href'),
		$section = $(id);
	    
	    // No section for this link? Bail.
	    if ($section.length < 1)
		return;
	    
	    // Scrollex.
	    $section.scrollex({
		mode: 'middle',
		top: '-20vh',
		bottom: '-20vh',
		initialize: function() {
							    
		    // Deactivate section.
		    $section.addClass('inactive');
		    
		},
		enter: function() {
		    
		    // Activate section.
		    $section.removeClass('inactive');

		    // No locked links? Deactivate all links and activate this section's one.
		    if ($sidenav_a.filter('.active-locked').length == 0) {
			
			$sidenav_a.removeClass('active');
										$this.addClass('active');
			
		    }
		    
		    // Otherwise, if this section's link is the one that's locked, unlock it.
		    else if ($this.hasClass('active-locked'))
			$this.removeClass('active-locked');
		    
		}
	    });
	    
	});

}

// Scrolly.
$('.scrolly').scrolly({
    speed: 1000,
    offset: function() {

	// If <=large, >small, and sidebar is present, use its height as the offset.
	if (breakpoints.active('<=large')
					&&	!breakpoints.active('<=small')
	    &&	$sidenav.length > 0)
	    return $sidenav.height();
	
	return 0;

    }
});



function compute_vuat() {
    var u = document.getElementById("v_0").value;
    var v = document.getElementById("v_f").value;
    var a = document.getElementById("a").value;
    var t = document.getElementById("t").value;
    if (u && v && a && !t) { // time
        var t_ = (v-u)/a;
        document.getElementById("demo").innerHTML = "Time taken is " + t_.toPrecision(4) + "s";
    }
    else if (u && v && !a && t) { //acceleration
        var a_ = (v-u)/t;
        document.getElementById("demo").innerHTML = "Acceleration is " + a_.toPrecision(4) + "m/s"+"2".sup();
    }
    else if (u && !v && a && t) { //final velocity
        var v_ = u + a*t;
        document.getElementById("demo").innerHTML = "Final Velocity is " + v_.toPrecision(4) + "m/s";
    }
    else if (!u && v && a && t) { //initial velocity
        var u_ = v - a*t;
        document.getElementById("demo").innerHTML = "Initial Velocity is " + u_.toPrecision(4) + "m/s";
    }
    else {
        document.getElementById("demo").innerHTML = "Error: Please enter any 3 values to compute the 4th.";
    }
}

function compute_usat() {
    var u = document.getElementById("2_v_0").value;
    var s = document.getElementById("2_s").value;
    var a = document.getElementById("2_a").value;
    var t = document.getElementById("2_t").value;
    if (u && s && a && !t) { // time dooooooooo
        var t_ = (v-u)/a;
        document.getElementById("demo2").innerHTML = "Time taken is " + t_.toPrecision(4) + "s";
    }
    else if (u && s && !a && t) { //acceleration
        var a_ = 2*(s - u*t)/(t*t);
        document.getElementById("demo2").innerHTML = "Acceleration is " + a_.toPrecision(4) + "m/s"+"2".sup();
    }
    else if (u && !s && a && t) { //distance
        var s_ = u*t + a*t*t/2;
        document.getElementById("demo2").innerHTML = "Distance/Height is " + s_.toPrecision(4) + "m";
    }
    else if (!u && s && a && t) { //initial velocity
        var u_ = (s - a*t*t/2)/t;
        document.getElementById("demo2").innerHTML = "Initial Velocity is " + u_.toPrecision(4) + "m/s";
    }
    else {
        document.getElementById("demo2").innerHTML = "Error: Please enter any 3 values to compute the 4th.";
    }
}
