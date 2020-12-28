
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;
var t_str = "", v_str = "", u_str = "", a_str = "", d_str = "";


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


function compute_calc() {
    var u = parseFloat(document.getElementById("c_v_0").value);
    var v = parseFloat(document.getElementById("c_v_f").value);
    var d = parseFloat(document.getElementById("c_s").value);
    var a = parseFloat(document.getElementById("c_a").value);
    var t = parseFloat(document.getElementById("c_t").value);

    document.getElementById("democ").innerHTML = "";
    document.getElementById("democ2").innerHTML = "";
    document.getElementById("democ3").innerHTML = "";
    document.getElementById("democ4").innerHTML = "";
    document.getElementById("democ5").innerHTML = "";

    document.getElementById("solc").innerHTML = "";
    document.getElementById("solc2").innerHTML = "";
    document.getElementById("solc3").innerHTML = "";
    document.getElementById("solc4").innerHTML = "";
    document.getElementById("solc5").innerHTML = "";
    
    if (!Number.isNaN(t) && t < 0) {
	document.getElementById("democ").innerHTML = "Please enter a positive time value.";
	return;
    }

    var u_ = NaN, v_ = NaN, d_ = NaN, a_ = NaN, t_ = NaN;
    
    var count_arg = 0;
    
    if (!Number.isNaN(t)) {
	count_arg++;
	t_ = t;
    }
    if (!Number.isNaN(d)) {
	count_arg++;
	d_ = d;
    }
    if (!Number.isNaN(v)) {
	count_arg++;
	v_ = v;
    }
    if (!Number.isNaN(u) && count_arg < 3) {
	count_arg++;
	u_ = u;
    }
    if (!Number.isNaN(a) && count_arg < 3) {
	count_arg++;
	a_ = a;
    }
    
    if (count_arg < 3) {
	document.getElementById("democ").innerHTML = "Error: too few entries. Please enter at least three variables.";
	return;
    }

    if (t == 0) {
	d_ = 0;
	if (!Number.isNaN(d)) {
	    if (d != d_) {
		document.getElementById("democ").innerHTML = "Error: when time is zero, displacement must be zero.";
		return;
	    }
	}
	else {
	    document.getElementById("solc").innerHTML = 'd = ut + <div class="frac"><span>1</span><span class="symbol">/</span><span class="bottom">2</span></div>at<sup>2</sup> = u*0 + <div class="frac"><span>1</span><span class="symbol">/</span><span\
 class="bottom">2</span></div>a*0 = 0.000';
	    document.getElementById("democ").innerHTML = "Displacement is " + d_.toPrecision(4) + " m.";
	}

	if (!Number.isNaN(v) && !Number.isNaN(u)) {
	    if (v != u) {
		document.getElementById("democ2").innerHTML = "Error: when time is zero, initial velocity must be equal to the final velocity.";
		document.getElementById("democ").innerHTML = "";
		document.getElementById("solc").innerHTML = "";
		return;
	    }
	}
	else if (!Number.isNaN(v)) {
	    document.getElementById("democ2").innerHTML = "Initial Velocity is " + v.toPrecision(4) + " m/s.";
	    document.getElementById("solc2").innerHTML = "u = v - at = " + v.toPrecision(4) + " - a*0 = " + v.toPrecision(4);
	}
	else if (!Number.isNaN(u)) {
	    document.getElementById("democ2").innerHTML = "Final Velocity is " + u.toPrecision(4) + " m/s.";
	    document.getElementById("solc2").innerHTML = "v = u + at = " + u.toPrecision(4) + " + a*0 = " + u.toPrecision(4);
	}
	else {
	    document.getElementById("democ2").innerHTML = "When time is zero, initial velocity is equal to the final velocity.";
	}

	if (Number.isNaN(a)) {
	    document.getElementById("democ3").innerHTML = "When time is zero, acceleration is not determined.";
	}
	return;
    }

    if (d == 0 && Number.isNaN(a)) {

	if (!Number.isNaN(v) && Number.isNaN(u)) { 
	    u = -v;
	    document.getElementById("democ").innerHTML = "Initial Velocity is " + u.toPrecision(4) + " m/s.";
	}
	else if (!Number.isNaN(u) && Number.isNaN(v)) { 
	    v = -u;
	    document.getElementById("democ").innerHTML = "Final Velocity is " + v.toPrecision(4) + " m/s.";
	}
	
	if (u == v) {
	    if (Number.isNaN(t)) {
		document.getElementById("democ").innerHTML = "Time taken is 0.000 s.";
		document.getElementById("democ2").innerHTML = "When time is zero, acceleration is not determined.";
	    }
	    else if (t != 0) {
		document.getElementById("democ").innerHTML = "Error: inconsistent set of entries. Please try again.";
	    }
	}
	else if (u == -v) {
	    if (Number.isNaN(t)) {
		document.getElementById("democ2").innerHTML = "Either time or acceleration is needed to compute the other.";
	    }
	    else {
		a_ = -2*u/t;
		document.getElementById("democ2").innerHTML = "Acceleration is " + a_.toPrecision(4) + " m/s"+"2".sup()+ ".";
	    }
	}
	return;
    }

    if (Number.isNaN(a_)) //compute acceleration
	a_ = compute_a(u_, v_, d_, t_);

    if ((a == 0 || a_ == 0) && Number.isNaN(t)) {

	if (!Number.isNaN(a) && a != a_) {
	    document.getElementById("democ").innerHTML = "Error: inconsistent set of entries. Please try again.";
	    return;
	}
	
	if (Number.isNaN(a)) {
	    a = a_;
            document.getElementById("democ").innerHTML = "Acceleration is " + a_.toPrecision(4) + " m/s"+"2".sup()+ ".";
	    document.getElementById("solc").innerHTML = a_str;
	}
	
	if (!Number.isNaN(v) && Number.isNaN(u)) {
            u = v;
            document.getElementById("democ2").innerHTML = "Initial Velocity is " + u.toPrecision(4) + " m/s.";
        }
        else if (!Number.isNaN(u) && Number.isNaN(v)) {
            v = u;
            document.getElementById("democ2").innerHTML = "Final Velocity is " + v.toPrecision(4) + " m/s.";
        }
	    
	if (v != u) {
	    document.getElementById("democ").innerHTML = "";
	    document.getElementById("solc").innerHTML = "";
	    document.getElementById("democ2").innerHTML = "Error: When acceleration is zero, initial velocity must be equal to final velocity.";
	    return;
	}
	else if (u == 0) {
	    if (!Number.isNaN(d)) {
		if (d != 0) {
		    document.getElementById("democ").innerHTML = "";
		    document.getElementById("solc").innerHTML = "";
		    document.getElementById("democ2").innerHTML = "Error: When acceleration and initial velocity are zero, there is no displacement.";
		    return;
		}
		else {
		    document.getElementById("democ3").innerHTML = "When acceleration and initial velocity are zero, time is not determined.";
		}
	    }
	    else {
		document.getElementById("democ3").innerHTML = "Displacement is 0.000 m.";
		document.getElementById("democ4").innerHTML = "When acceleration and initial velocity are zero, time is not determined.";
	    }
	}
	else if (Number.isNaN(d)) {
	    document.getElementById("democ3").innerHTML = "Either displacement or time is needed to compute the other.";
	}
	else {	
	    t_ = d/u;
	    document.getElementById("democ3").innerHTML = "Time taken is " + t_.toPrecision(4) + " s.";
	}
	return;
    }
	
        
    if (Number.isNaN(u_))
	u_ = compute_u(v_, d_, a_, t_);
    if (Number.isNaN(v_))
	v_ = compute_v(u_, d_, a_, t_);
    if (Number.isNaN(d_))
	d_ = compute_d(u_, v_, a_, t_);
    if (Number.isNaN(t_))
	t_ = compute_t(u_, v_, d_, a_);

    if (!Number.isNaN(a) && approx_unequal(a, a_)) {
	document.getElementById("democ").innerHTML = "Error: inconsistent set of entries. Please try again.";
	return;
    }
    if (!Number.isNaN(u) && approx_unequal(u, u_)) {
	document.getElementById("democ").innerHTML = "Error: inconsistent set of entries. Please try again.";
	return;
    }
    if (!Number.isNaN(v) && approx_unequal(v, v_)) {
	document.getElementById("democ").innerHTML = "Error: inconsistent set of entries. Please try again.";
	return;
    }
    if (!Number.isNaN(d) && approx_unequal(d, d_)) {
	document.getElementById("democ").innerHTML = "Error: inconsistent set of entries. Please try again.";
	return;
    }
    if (!Number.isNaN(t) && approx_unequal(t, t_)) {
	document.getElementById("democ").innerHTML = "Error: inconsistent set of entries. Please try again.";
	return;
    }
    if (!check_consistent(u_, v_, d_, a_, t_)) {
	document.getElementById("democ").innerHTML = "Error: inconsistent set of entries. Please try again.";
	return;
    }

    if (Number.isNaN(a))  {
	document.getElementById("solc").innerHTML = a_str;
	document.getElementById("democ").innerHTML = "Acceleration is " + a_.toPrecision(4) + " m/s"+"2".sup()+ ".";
    }
    if (Number.isNaN(u)) {
	document.getElementById("solc2").innerHTML = u_str;
	document.getElementById("democ2").innerHTML = "Initial Velocity is " + u_.toPrecision(4) + " m/s.";
    }
    if (Number.isNaN(v)) {
	document.getElementById("solc3").innerHTML = v_str;
	document.getElementById("democ3").innerHTML = "Final Velocity is " + v_.toPrecision(4) + " m/s.";
    }
    if (Number.isNaN(d)) {
	document.getElementById("solc4").innerHTML = d_str;
	document.getElementById("democ4").innerHTML = "Displacement is " + d_.toPrecision(4) + " m.";
    }
    if (Number.isNaN(t)) {
	document.getElementById("solc5").innerHTML = t_str;
	document.getElementById("democ5").innerHTML = "Time taken is " + t_.toPrecision(4) + " s.";
    }
    return;
}



function compute_a(u, v, d, t) {
    var a;
    if (!Number.isNaN(v) && !Number.isNaN(u) && !Number.isNaN(t)) {
	a = (v-u) / t;
	a_str = 'a = <div class="frac"><span> v - u </span><span class="symbol">/</span><span class="bottom"> t </span></div> = <div class="frac"><span> ' + v.toPrecision(4) + ' - ' + u.toPrecision(4) + ' </span><span class="symbol">/</span><span class="bottom"> ' + t.toPrecision(4) + ' </span></div> = ' + a.toPrecision(4);
    }
    else if (!Number.isNaN(v) && !Number.isNaN(u) && !Number.isNaN(d)) {
	a = ((v*v - u*u) / (2*d));
	a_str = 'a = <div class="frac"><span> v<sup>2</sup> - u<sup>2</sup> </span><span class="symbol">/</span><span class="bottom"> 2d </span></div> = <div class="frac"><span> ' + v.toPrecision(4) + '<sup>2</sup> - ' + u.toPrecision(4) + '<sup>2</sup> </span><span class="symbol">/</span><span class="bottom"> 2*' + d.toPrecision(4) + ' </span></div> = ' + a.toPrecision(4);
    }
    else if (!Number.isNaN(u) && !Number.isNaN(d) && !Number.isNaN(t)) {
	a = ((d - u*t) * 2 / (t*t));
	a_str = 'a = <div class="frac"><span> 2(d - ut) </span><span class="symbol">/</span><span class="bottom"> t<sup>2</sup> </span></div> = <div class="frac"><span> 2(' + d.toPrecision(4) + ' - ' + u.toPrecision(4) + '*' + t.toPrecision(4) + ') </span><span class="symbol">/</span><span class="bottom"> ' + t.toPrecision(4) + '<sup>2</sup> </span></div> = ' + a.toPrecision(4);
    }
    else if (!Number.isNaN(v) && !Number.isNaN(t) && !Number.isNaN(d)) {
	a = ((v*t - d) * 2 / (t*t));
	a_str = 'a = <div class="frac"><span> 2(vt - d) </span><span class="symbol">/</span><span class="bottom"> t<sup>2</sup> </span></div> = <div class="frac"><span> 2(' + v.toPrecision(4) + '*' + t.toPrecision(4) + ' - ' + d.toPrecision(4) + ') </span><span class="symbol">/</span><span class="bottom"> ' + t.toPrecision(4) + '<sup>2</sup> </span></div> = ' + a.toPrecision(4);
    }
    return a;
}

function compute_u(v, d, a, t) {
    var u;
    if (!Number.isNaN(v) && !Number.isNaN(a) && !Number.isNaN(t)) {
	u = v - a*t;
	u_str = "u = v - at = " + v.toPrecision(4) + " - " + a.toPrecision(4) + "*" + t.toPrecision(4) + " = " + u.toPrecision(4);
    }
    else if (!Number.isNaN(v) && !Number.isNaN(a) && !Number.isNaN(d)) {
	u = Math.sqrt(v*v - 2*a*d);
	if (!check_consistent(u, v, d, a, (v-u)/a)) {
	    u = -u;
	    u_str = 'u = -&#8730;<SPAN STYLE="display:inline-block;border-top:1px solid #000;"> v<sup>2</sup> - 2ad </SPAN> = -&#8730;<SPAN STYLE="display:inline-block;border-top:1px solid #000;"> ' + v.toPrecision(4) + '<sup>2</sup> - 2*' + a.toPrecision(4) + '*' + d.toPrecision(4) + ' </SPAN> = ' + u.toPrecision(4);
	}
	else {
	    u_str = 'u = &#8730;<SPAN STYLE="display:inline-block;border-top:1px solid #000;"> v<sup>2</sup> - 2ad </SPAN> = &#8730;<SPAN STYLE="display:inline-block;border-top:1px solid #000;"> ' + v.toPrecision(4) + '<sup>2</sup> - 2*' + a.toPrecision(4) + '*' + d.toPrecision(4) + ' </SPAN> = ' + u.toPrecision(4);
	}
    }
    else if (!Number.isNaN(d) && !Number.isNaN(a) && !Number.isNaN(t)) {
	u = (d/t) - (a*t/2);
	u_str = 'u = <div class="frac"><span>d</span><span class="symbol">/</span><span class="bottom">t</span></div> - <div class="frac"><span>1</span><span class="symbol">/</span><span class="bottom">2</span></div>at = <div class="frac"><span>' + d.toPrecision(4) + '</span><span class="symbol">/</span><span class="bottom">' + t.toPrecision(4) + '</span></div> - <div class="\
frac"><span>1</span><span class="symbol">/</span><span class="bottom">2</span></div>' + a.toPrecision(4) + '*' + t.toPrecision(4) + ' = ' + u.toPrecision(4);
    }
    return u;
}

function compute_v(u, d, a, t) {
    var v;
    if (!Number.isNaN(u) && !Number.isNaN(a) && !Number.isNaN(t)) {
	v = u + a*t;
	v_str = "v = u + at = " + u.toPrecision(4) + " + " + a.toPrecision(4) + "*" + t.toPrecision(4) + " = " + v.toPrecision(4);
    }
    else if (!Number.isNaN(a) && !Number.isNaN(d) && !Number.isNaN(u)) {
	v = Math.sqrt(2*a*d + u*u);
	if (!check_consistent(u, v, d, a, (v-u)/a)) {
	    v = -v;
	    v_str = 'v = -&#8730;<SPAN STYLE="display:inline-block;border-top:1px solid #000;"> 2ad + u<sup>2</sup> </SPAN> = -&#8730;<SPAN STYLE="display:inline-block;border-top:1px solid #000;"> 2*' + a.toPrecision(4) + '*' + d.toPrecision(4) + ' + ' + u.toPrecision(4) + '<sup>2</sup> </SPAN> = ' + v.toPrecision(4);
	}
	else {
	    v_str = 'v = &#8730;<SPAN STYLE="display:inline-block;border-top:1px solid #000;"> 2ad + u<sup>2</sup> </SPAN> = &#8730;<SPAN STYLE="display:inline-block;border-top:1px solid #000;"> 2*' + a.toPrecision(4) + '*' + d.toPrecision(4) + ' + ' + u.toPrecision(4) + '<sup>2</sup> </SPAN> = ' + v.toPrecision(4);
	}
    }
    return v;
}

function compute_d(u, v, a, t) {
    var d;
    if (!Number.isNaN(u) && !Number.isNaN(t) && !Number.isNaN(a)) {
	d = u*t + a*t*t/2;
	d_str = 'd = ut + <div class="frac"><span>1</span><span class="symbol">/</span><span class="bottom">2</span></div>at<sup>2</sup> = ' + u.toPrecision(4) + '*' + t.toPrecision(4) + ' + <div class="frac"><span>1</span><span class="symbol">/</span><span class="bottom">2</span></div> ' + a.toPrecision(4) + '*' + t.toPrecision(4) + '<sup>2</sup> = ' + d.toPrecision(4);
    }
    else if (!Number.isNaN(a) && !Number.isNaN(v) && !Number.isNaN(u)) {
	d = (v*v - u*u)/(2*a);
	d_str = 'd = <div class="frac"><span>v<sup>2</sup> - u<sup>2</sup></span><span class="symbol">/</span><span class="bottom">2a</span></div> = <div class="frac"><span>' + v.toPrecision(4) + '<sup>2</sup> - ' + u.toPrecision(4) + '<sup>2</sup></span><span class="symbol">/</span><span class="bottom">2*' + a.toPrecision(4) + '</span></div> = ' + d.toPrecision(4);
    }
    return d;
}

function compute_t(u, v, d, a) {
    var t;
    if (!Number.isNaN(v) && !Number.isNaN(u) && !Number.isNaN(a)) {
	t = (v-u)/a;
	t_str = 't = <div class="frac"><span>v - u</span><span class="symbol">/</span><span class="bottom">a</span></div> = <div class="frac"><span>' + v.toPrecision(4) + ' - ' + u.toPrecision(4) + '</span><span class="symbol">/</span><span class="bottom">' + a.toPrecision(4) +'</span></div> = ' + t.toPrecision(4);
    }
    return t;
}



function check_consistent(u, v, d, a, t) {
    if (approx_unequal(v, u + a*t) || approx_unequal(d, u*t + a*t*t/2) || approx_unequal(v*v - u*u, 2*a*d) || t < 0) {
	return false;
    }
    return true;
}


function approx_unequal(x, y) {
    var ratio = x/y;
    if (x == y || Math.abs(x-y) < 1e-10) {
	ratio = 1;
    }
    if (ratio > 0.99 && ratio < 1.01) {
	return false;
    }
    return true;
}
