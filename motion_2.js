var consistent;
var u, theta, time;
var u_x, d_x;
var u_y, v_y, d_y;
var t_str = "", v_str = "", u_str = "", a_str = "", d_str = "", x_str = "", y_str = "";

//keep track of the computed variables in order
var computed = [];
var formula = [];

var in_x, in_y, in_u;

function clear_all() {
    document.getElementById("u").value = NaN;
    document.getElementById("theta").value = NaN;
    document.getElementById("time").value = NaN;
    document.getElementById("u_x").value = NaN;
    document.getElementById("d_x").value = NaN;
    document.getElementById("u_y").value = NaN;
    document.getElementById("v_y").value = NaN;
    document.getElementById("a").value = NaN;
    document.getElementById("d_y").value = NaN;

    document.getElementById("ans1").innerHTML = "";
    document.getElementById("ans2").innerHTML = "";
    document.getElementById("ans3").innerHTML = "";
    document.getElementById("ans4").innerHTML = "";
    document.getElementById("ans5").innerHTML = "";

    document.getElementById("sol1").innerHTML = "";
    document.getElementById("sol2").innerHTML = "";
    document.getElementById("sol3").innerHTML = "";
    document.getElementById("sol4").innerHTML = "";
    document.getElementById("sol5").innerHTML = "";
}


function compute_xy_u() {
    var cnt = 0;
    var u_ = NaN, x_ = NaN, y_ = NaN, theta_ = NaN;
    if (!Number.isNaN(u)) {
	u_ = u;
	cnt ++;
    }
    if (!Number.isNaN(theta)) {
	theta_ = theta;
	cnt++;
    }
    if (!Number.isNaN(u_x) && cnt < 2) {
	x_ = u_x;
	cnt ++;
    }
    if (!Number.isNaN(u_y) && cnt < 2) {
	y_ = u_y;
	cnt ++;
    }
    
    if (cnt < 2)
	return;

    in_u = true;
    
    if (!Number.isNaN(u_) && !Number.isNaN(theta_)) {
	x_ = u_ * Math.cos(theta_);
	x_str = "v<sub>x</sub> = u<sub>x</sub> = u cos &theta; = " + u_.toPrecision(4) + " cos (" + theta_.toPrecision(4) + ") = " + x_.toPrecision(4);
	y_ = u_ * Math.sin(theta_);
	y_str = "u<sub>y</sub> = u sin &theta; = " + u_.toPrecision(4) + " sin (" + theta_.toPrecision(4) + ") = " + y_.toPrecision(4);
    }
    else if (!Number.isNaN(u_) && !Number.isNaN(x_)) {
	theta_ = Math.acos(x_/u_);
	t_str = '&theta; = cos<sup>-1</sup>(<div class="frac"><span>u<sub>x</sub></span><span class="symbol">/</span><span class="bottom">u</span></div>) = cos<sup>-1</sup>(<div class="frac"><span>' + x_.toPrecision(4) + '</span><span class="symbol">/</span><span class="bottom">' + u_.toPrecision(4) + '</span></div>) = ' + theta_.toPrecision(4);
	y_ = u_ * Math.sin(theta_);
	y_str = "u<sub>y</sub> = u sin &theta; = " + u_.toPrecision(4) + " sin (" + theta_.toPrecision(4) + ") = " + y_.toPrecision(4);
    }
    else if (!Number.isNaN(u_) && !Number.isNaN(y_)) {
	theta_ = Math.asin(y_/u_);
	t_str = '&theta; = sin<sup>-1</sup>(<div class="frac"><span>u<sub>y</sub></span><span class="symbol">/</span><span class="bottom">u</span></div>) = sin<sup>-1</sup>(<div class="frac"><span>' + y_.toPrecision(4) + '</span><span class="symbol">/</span><span class="bottom">' + u_.toPrecision(4) + '</span></div>) = ' + theta_.toPrecision(4);
	x_ = u_ * Math.cos(theta_);
	x_str = "v<sub>x</sub> = u<sub>x</sub> = u cos &theta; = " + u_.toPrecision(4) + " cos (" + theta_.toPrecision(4) + ") = " + x_.toPrecision(4);
    }
    else if (!Number.isNaN(theta_) && !Number.isNaN(x_)) {
	u_ = x_ / (Math.cos(theta_));
	u_str = 'u = <div class="frac"><span>u<sub>x</sub></span><span class="symbol">/</span><span class="bottom">cos &theta;</span></div> = <div class="frac"><span> ' + x_.toPrecision(4) + ' </span><span class="symbol">/</span><span class="bottom">cos(' + theta_.toPrecision(4) + ')</span></div> = ' + u_.toPrecision(4);
	y_ = u_ * Math.sin(theta_);
	y_str = "u<sub>y</sub> = u sin &theta; = " + u_.toPrecision(4) + " sin (" + theta_.toPrecision(4) + ") = " + y_.toPrecision(4);
    }
    else if (!Number.isNaN(theta_) && !Number.isNaN(y_)) {
	u_ = y_ / (Math.sin(theta_));
	u_str = 'u = <div class="frac"><span>u<sub>y</sub></span><span class="symbol">/</span><span class="bottom">sin &theta;</span></div> = <div class="frac"><span> ' + y_.toPrecision(4) + ' </span><span class="symbol">/</span><span class="bottom">sin(' + theta_.toPrecision(4) + ')</span></div> = ' + u_.toPrecision(4);
	x_ = u_ * Math.cos(theta_);
	x_str = "v<sub>x</sub> = u<sub>x</sub> = u cos &theta; = " + u_.toPrecision(4) + " cos (" + theta_.toPrecision(4) + ") = " + x_.toPrecision(4);
    }
    else {
	u_ = Math.sqrt(x_*x_ + y_*y_);
	u_str = 'u = -&#8730;<SPAN STYLE="display:inline-block;border-top:1px solid #000;"> u<sub>x</sub><sup>2</sup> + u<sub>y</sub><sup>2</sup> </SPAN> = -&#8730;<SPAN STYLE="display:inline-block;border-top:1px solid #000;"> ' + x_.toPrecision(4) + '<sup>2</sup> + ' + y_.toPrecision(4) + '<sup>2</sup> </SPAN> = ' + u_.toPrecision(4);
	theta_ = Math.atan(y_/x_);
	t_str = '&theta; = tan<sup>-1</sup>(<div class="frac"><span>u<sub>y</sub></span><span class="symbol">/</span><span class="bottom">u<sub>x</sub></span></div>) = tan<sup>-1</sup>(<div class="frac"><span>' + y_.toPrecision(4) + '</span><span class="symbol">/</span><span class="bottom">' + x_.toPrecision(4) + '</sub></span></div>) = ' + theta_.toPrecision(4);
    }

    if ((!Number.isNaN(u) && approx_unequal(u_, u)) || (!Number.isNaN(u_x) && approx_unequal(u_x, x_)) || (!Number.isNaN(u_y) && approx_unequal(u_y, y_)) || (!Number.isNaN(theta) && approx_unequal(theta_, theta))) {
	consistent = false;
	return;
    }

    
    if (Number.isNaN(u) && !Number.isNaN(u_)) {
	computed.push("Initial Velocity (<b>u</b>) is <b>" + u_.toPrecision(4) + " m/s.</b>");
	formula.push(u_str);
	u = u_;
    }
    if (Number.isNaN(u_x) && !Number.isNaN(x_)) {
	computed.push("Velocity along x-axis (<b>v<sub>x</sub></b>) is <b>" + x_.toPrecision(4) + " m/s.</b>");
	formula.push(x_str);
	u_x = x_;
    }
    if (Number.isNaN(u_y) && !Number.isNaN(y_)) {
	computed.push("Initial Velocity along y-axis (<b>u<sub>y</sub></b>) is <b>" + y_.toPrecision(4) + " m/s.</b>");
	formula.push(y_str);
	u_y = y_;
    }
    if (Number.isNaN(theta) && !Number.isNaN(theta_)) {
	computed.push("Initial Velocity Angle (<b>&theta;</b>) is <b>" + rad_to_deg(theta_).toPrecision(4) + " &#176;.</b>");
	formula.push(t_str);
	theta = theta_;
    }
    
    return;
}


function compute_x_axis() {
    var cnt = 0;
    if (!Number.isNaN(u_x))
	cnt ++;
    if (!Number.isNaN(d_x))
	cnt ++;
    if (!Number.isNaN(time))
	cnt ++;

    if (cnt < 2)
	return;

    in_x = true;
    
    if (cnt == 3) {
	if (approx_unequal(u_x * time, d_x)) {
	    consistent = false;
	}
	return;
    }

    if (Number.isNaN(u_x)) {
	if (time != 0) {
	    u_x = d_x / time;
	    computed.push("Velocity along x-axis (<b>v<sub>x</sub></b>) is <b>" + u_x.toPrecision(4) + " m/s.</b>");
	    formula.push('v<sub>x</sub> = <div class="frac"><span>d<sub>x</sub></span><span class="symbol">/</span><span class="bottom">t</span></div></b></div> = <div class="frac"><span>' + d_x.toPrecision(4) + '</span><span class="symbol">/</span><span class="bottom">' + time.toPrecision(4) + '</span></div></b></div> = ' + u_x.toPrecision(4));
	}
    }
    else if (Number.isNaN(d_x)) {
	d_x = u_x * time;
	computed.push("Displacement along x-axis (<b>d<sub>x</sub></b>) is <b>" + d_x.toPrecision(4) + " m.</b>");
	formula.push("d<sub>x</sub> = v<sub>x</sub>t = " + u_x.toPrecision(4) + "*" + time.toPrecision(4) + " = " + d_x.toPrecision(4));
    }
    else if (u_x != 0) {
	time = d_x / u_x;
	computed.push("Time taken (<b>t</b>) is <b>" + time.toPrecision(4) + " s.</b>");
	formula.push('t = <div class="frac"><span>d<sub>x</sub></span><span class="symbol">/</span><span class="bottom">v<sub>x</sub></span></div></b></div> = <div class="frac"><span>' + d_x.toPrecision(4) + '</span><span class="symbol">/</span><span class="bottom">' + u_x.toPrecision(4) + '</span></div></b></div> = ' + time.toPrecision(4));
    }
    return;	    
}

function print_computed(value, index, array) {
    document.getElementById("sol"+(index+1)).innerHTML = value;
}

function print_formula(value, index, array) {
    document.getElementById("ans"+(index+1)).innerHTML = value;
}

function throw_inconsistency_error() {
    document.getElementById("ans1").innerHTML = "Error: inconsistent set of entries. Please try again.";
}

function rad_to_deg(radians)
{
  var pi = Math.PI;
  return radians * (180/pi);
}

function deg_to_rad(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}


function compute_calc_2d_motion() {
    u = parseFloat(document.getElementById("u").value);
    theta = deg_to_rad(parseFloat(document.getElementById("theta").value));
    time = parseFloat(document.getElementById("time").value);
    u_ = u;
    theta_ = theta;
    time_ = time;
    
    u_x = parseFloat(document.getElementById("u_x").value);
    d_x = parseFloat(document.getElementById("d_x").value);
    u_x_ = u_x;
    d_x_ = d_x;
    
    u_y = parseFloat(document.getElementById("u_y").value);
    v_y = parseFloat(document.getElementById("v_y").value);
    a = parseFloat(document.getElementById("a").value);
    d_y = parseFloat(document.getElementById("d_y").value);
    u_y_ = u_y;
    v_y_ = v_y;
    a_ = a;
    d_y_ = d_y;

    document.getElementById("ans1").innerHTML = "";
    document.getElementById("ans2").innerHTML = "";
    document.getElementById("ans3").innerHTML = "";
    document.getElementById("ans4").innerHTML = "";
    document.getElementById("ans5").innerHTML = "";

    document.getElementById("sol1").innerHTML = "";
    document.getElementById("sol2").innerHTML = "";
    document.getElementById("sol3").innerHTML = "";
    document.getElementById("sol4").innerHTML = "";
    document.getElementById("sol5").innerHTML = "";

    in_x = false;
    in_y = false;
    in_u = false;
    
    computed = [];
    formula = [];
    
    consistent = true;

    //check time is > 0
    //convert theta to radians
    var iter = 0;
    
    while (!in_x || !in_y || !in_u) {

	if (!in_x) {
	    compute_x_axis();
	    if (!consistent) {
		throw_inconsistency_error();
		return;
	    }
	}

	if (!in_u) {
	    compute_xy_u();
	    if (!consistent) {
		throw_inconsistency_error();
		return;
	    }
	}

	if (!in_y) {
	    compute_y_axis();
	    if (!consistent) {
		throw_inconsistency_error();
		return;
	    }
	}

	iter = iter + 1;
	if (iter > 3) {
	    break;
	}
	
    }

    
    computed.map(print_computed);
    formula.map(print_formula);
    return;
}


function compute_y_axis() {
    
    var u_ = NaN, v_ = NaN, d_ = NaN, a_ = NaN, t_ = NaN;
    var t = time, u = u_y, v = v_y, d = d_y;
    var count_arg = 0;
    
    if (!Number.isNaN(a)) {
	count_arg++;
	a_ = a;
    }
    if (!Number.isNaN(d)) {
	count_arg++;
	d_ = d;
    }
    if (!Number.isNaN(t)) {
	count_arg++;
	t_ = t;
    }
    if (!Number.isNaN(u) && count_arg < 3) {
	count_arg++;
	u_ = u;
    }
    if (!Number.isNaN(v) && count_arg < 3) {
	count_arg++;
	v_ = v;
    }
    
    if (count_arg < 3) 
	return;
    
    if (t == 0) {
	d_ = 0;
	if (!Number.isNaN(d)) {
	    if (d != d_) {
		consistent = false;
		return;
	    }
	}
	else {
	    formula.push('d = ut + <div class="frac"><span>1</span><span class="symbol">/</span><span class="bottom">2</span></div>at<sup>2</sup> = u*0 + <div class="frac"><span>1</span><span class="symbol">/</span><span class="bottom">2</span></div>a*0 = 0.000');
	    computed.push("Displacement along y-axis (<b>d<sub>y</sub></b>) is <b>" + d_.toPrecision(4) + " m.</b>");
	    d_y = d_;
	}

	if (!Number.isNaN(v) && !Number.isNaN(u)) {
	    if (v != u) {
		consistent = false;
		return;
	    }
	}
	else if (!Number.isNaN(v)) {
	    computed.push("Initial Velocity along y-axis (<b>u<sub>y</sub></b>) is <b>" + v.toPrecision(4) + " m/s.</b>");
	    v_y = v;
	    formula.push("u = v - at = " + v.toPrecision(4) + " - a*0 = " + v.toPrecision(4));
	}
	else if (!Number.isNaN(u)) {
	    computed.push("Final Velocity along y-axis (<b>v<sub>y</sub></b>) is <b>" + u.toPrecision(4) + " m/s.</b>");
	    u_y = u;
	    formula.push("v = u + at = " + u.toPrecision(4) + " + a*0 = " + u.toPrecision(4));
	}
	return;
    }

    if (d == 0 && Number.isNaN(a)) {

	if (!Number.isNaN(v) && Number.isNaN(u)) { 
	    u = -v;
	    computed.push("Initial Velocity along y-axis (<b>u<sub>y</sub></b>) is <b>" + u.toPrecision(4) + " m/s.</b>");
	    formula.push("");
	    u_y = u;
	}
	else if (!Number.isNaN(u) && Number.isNaN(v)) { 
	    v = -u;
	    computed.push("Final Velocity along y-axis (<b>v<sub>y</sub></b>) is <b>" + v.toPrecision(4) + " m/s.</b>");
	    formula.push("");
	    v_y = v;
	}
	
	if (u == v) {
	    if (Number.isNaN(t)) {
		computed.push("Time taken (<b>t</b>) is <b>0.000 s.</b>");
		formula.push("");
		time = 0; 
	    }
	    else if (t != 0) {
		consistent = false;
		return;
	    }
	}
	else if (u == -v) {
	    if (Number.isNaN(t)) {
		;
	    }
	    else {
		a_ = -2*u/t;
		computed.push("Acceleration (<b>a</b>) is <b>" + a_.toPrecision(4) + " m/s"+"2".sup()+ ".</b>");
		formula.push("");
		a = a_;
	    }
	}
	return;
    }

    if (Number.isNaN(a_)) //compute acceleration
	a_ = compute_a(u_, v_, d_, t_);

    if ((a == 0 || a_ == 0) && Number.isNaN(t)) {

	if (!Number.isNaN(a) && a != a_) {
	    consistent = false;
	    return;
	}
	
	if (Number.isNaN(a)) {
	    a = a_;
            computed.push("Acceleration (<b>a</b>) is <b>" + a_.toPrecision(4) + " m/s"+"2".sup()+ ".</b>");
	    formula.push(a_str);
	}
	
	if (!Number.isNaN(v) && Number.isNaN(u)) {
            u = v;
            computed.push("Initial Velocity along y-axis (<b>u<sub>y</sub></b>) is <b>" + u.toPrecision(4) + " m/s.</b>");
	    formula.push("");
	    u_y = u;
        }
        else if (!Number.isNaN(u) && Number.isNaN(v)) {
            v = u;
	    computed.push("Final Velocity along y-axis (<b>v<sub>y</sub></b>) is <b>" + v.toPrecision(4) + " m/s.</b>");
	    formula.push("");
	    v_y = v;
        }
	    
	if (v != u) {
	    consistent = false;
	    return;
	}
	else if (u == 0) {
	    if (!Number.isNaN(d)) {
		if (d != 0) {
		    consistent = false;
		    return;
		}
	    }
	    else {
		computed.push("Displacement along y-axis (<b>d<sub>y</sub></b>) is <b>0.000 m.</b>");
		formula.push("");
		d_y = 0;
	    }
	}
	else if (Number.isNaN(d)) {
	    ;
	}
	else {	
	    t_ = d/u;
	    computed.push("Time taken (<b>t</b>) is <b>" + t_.toPrecision(4) + " s.</b>");
	    formula.push("");
	    time = t_;
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
	consistent = false;
	return;
    }
    if (!Number.isNaN(u) && approx_unequal(u, u_)) {
	consistent = false;
	return;
    }
    if (!Number.isNaN(v) && approx_unequal(v, v_)) {
	consistent = false;
	return;
    }
    if (!Number.isNaN(d) && approx_unequal(d, d_)) {
	consistent = false;
	return;
    }
    if (!Number.isNaN(t) && approx_unequal(t, t_)) {
	consistent = false;
	return;
    }
    if (!check_consistent(u_, v_, d_, a_, t_)) {
	consistent = false;
	return;
    }

    if (Number.isNaN(a))  {
	formula.push(a_str);
	computed.push("Acceleration (<b>a</b>) is <b>" + a_.toPrecision(4) + " m/s"+"2".sup()+ ".</b>");
	a = a_;
    }
    if (Number.isNaN(u)) {
	formula.push(u_str);
	computed.push("Initial Velocity along y-axis (<b>u<sub>y</sub></b>) is <b>" + u_.toPrecision(4) + " m/s.</b>");
	u_y = u_;
    }
    if (Number.isNaN(v)) {
	formula.push(v_str);
	computed.push("Final Velocity along y-axis (<b>v<sub>y</sub></b>) is <b>" + v_.toPrecision(4) + " m/s.</b>");
	v_y = v_;
    }
    if (Number.isNaN(d)) {
	formula.push(d_str);
	computed.push("Displacement along y-axis (<b>d<sub>y</sub></b>) is <b>" + d_.toPrecision(4) + " m.</b>");
	d_y = d_;
    }
    if (Number.isNaN(t)) {
	formula.push(t_str);
	computed.push("Time taken (<b>t</b>) is <b>" + t_.toPrecision(4) + " s.</b>");
	time = t_;
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
