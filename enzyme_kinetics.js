var v_max = 1;
var k_m = 1;
var series_mm = [];
var series_lb = [];

var y_arr = [];
var x_arr;

var x_max_mm;
var x_min_lb;
var x_max_lb;

var num_dataset = 0;


function range(start, stop, num) {
    var step = (stop - start) / num;
    var temp = [];
    var cur = start;
    while (cur < stop) {
	temp.push(cur);
	cur += step;
    }
    return temp;
}

function clear_all() {
    series_lb = [];
    series_mm = [];
    num_dataset = 0;
    document.getElementById("mm_eq").innerHTML = "";
    document.getElementById("lb_p").innerHTML = "";
    document.getElementById("msg").innerHTML = "";
    document.getElementById("v_max").value = NaN;
    document.getElementById("k_m").value = NaN;
}

function mm_graph() {
    v_max = parseFloat(document.getElementById("v_max").value);
    k_m = parseFloat(document.getElementById("k_m").value);
    document.getElementById("msg").innerHTML = "";
    if (isNaN(v_max)) {
	document.getElementById("v_max").value = 1;
	v_max = 1;
    }
    if (isNaN(k_m)) {
	document.getElementById("k_m").value = 1;
	k_m = 1;
    }
    num_dataset += 1;
    if (num_dataset == 1) {
	x_max_mm = 10 * k_m;
	x_min_lb = -2 / k_m;
	x_max_lb = 4 / k_m;
    }
    data_gen_mm();
    renderChart_mm();
    if (v_max == 0) {
	document.getElementById("msg").innerHTML = "<b>Note:</b> Lineweaver-Burk Plot cannot be drawn for V<sub>max</sub> = 0.<br>";
    }
    else {
	data_gen_lb();
	renderChart_lb();
    }
}


/*
 * LB
 */
function y_lb(x) {
    var y = (k_m / v_max) * x + (1 / v_max);
    y_arr.push([x,y]);
}

function data_gen_lb() {
    let name_ = 'V<sub>max</sub>: ' + v_max.toPrecision(2) + "; K<sub>M</sub>: " + k_m.toPrecision(2);
    x_arr = range(x_min_lb, x_max_lb, 500.0);
    y_arr = [];
    x_arr.forEach(y_lb);
    series_lb.push({name: name_, points: y_arr});
}

function renderChart_lb() {
    JSC.Chart('lb_p', {
        title_label_text: 'Lineweaver-Burk Plot',
/*        annotations: [{
            label_text: 'Source: National Center for Health Statistics',
            position: 'bottom left'
        }],*/
        legend_visible: true,
	legend: {
	    position: 'right',
	    template: '%icon %name'
	},
        xAxis_crosshair_enabled: true,
        defaultPoint_tooltip: '%icon <b>%yValue</b>',
        series: series_lb,
	xAxis: { label_text: '1/[S] (mM)<sup>-1</sup>' },
	yAxis: { label_text: '1/V<sub>0</sub> (μM/min)<sup>-1</sup>' },
	defaultPoint_marker_visible: false
    });
}


/*
 * MM
 */
function data_gen_mm() {
    let name_ = 'V<sub>max</sub>: ' + v_max.toPrecision(2) + "; K<sub>M</sub>: " + k_m.toPrecision(2);
    x_arr = range(0.0, x_max_mm, 500.0);
    y_arr = [];
    x_arr.forEach(y_mm);
    series_mm.push({name: name_, points: y_arr});
}

function y_mm(x) {
    var y = (v_max * x) / (k_m + x);
    y_arr.push([x,y]);

}

function x_mm(y) {
    var x = (k_m * y) / (v_max - y);
    return x;
}

function renderChart_mm() {
    JSC.Chart('mm_eq', {
        title_label_text: 'Michaelis–Menten Kinetics',
/*        annotations: [{
            label_text: 'Source: National Center for Health Statistics',
            position: 'bottom left'
        }],*/
        legend_visible: true,
	legend: {
	    position: 'right',
	    template: '%icon %name'
	},
        xAxis_crosshair_enabled: true,
        defaultPoint_tooltip: '%icon <b>%yValue</b>',
        series: series_mm,
	xAxis: { label_text: '[S] (mM)' },
	yAxis: { label_text: 'V<sub>0</sub> (μM/min)' },
	defaultPoint_marker_visible: false
    });
}

