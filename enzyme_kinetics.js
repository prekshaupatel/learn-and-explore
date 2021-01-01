var v_max = 1;
var k_m = 1;
var series = [];
var y_arr = [];
var x_arr;
var x_max;

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
    series = [];
    num_dataset = 0;
    document.getElementById("mm_eq").innerHTML = "";
}

function mm_graph() {
    v_max = parseFloat(document.getElementById("v_max").value);
    k_m = parseFloat(document.getElementById("k_m").value);
    if (isNaN(v_max)) {
	document.getElementById("v_max").innerHTML = 1;
	v_max = 1;
    }
    if (isNaN(k_m)) {
	document.getElementById("k_m").innerHTML = 1;
	k_m = 1;
    }
    num_dataset += 1;
    if (num_dataset == 1) {
	x_max = 10 * k_m;
    }
    data_gen();
    renderChart();
}

function data_gen() {
    let name_ = 'V<sub>max</sub>: ' + v_max.toPrecision(2) + "; K<sub>m</sub>: " + k_m.toPrecision(2);
    x_arr = range(0.0, x_max, 500.0);
    y_arr = [];
    x_arr.forEach(y_mm);
    series.push({name: name_, points: y_arr});
}

function y_mm(x) {
    var y = (v_max * x) / (k_m + x);
    y_arr.push([x,y]);

}

function x_mm(y) {
    var x = (k_m * y) / (v_max - y);
    return x;
}

function renderChart() {
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
        series: series,
	xAxis: { label_text: '[S] (mM)' },
	yAxis: { label_text: 'V<sub>0</sub> (μM/min)' },
	defaultPoint_marker_visible: false
    });
}

/*
function csvToSeries() {
    let name_ = 'V<sub>max</sub>: ' + v_max.toPrecision(2) + "; K<sub>m</sub>: " + k_m.toPrecision(2);
    x_arr = range(0.0, 10.0*k_m, 20000.0);
    y = [];
    x_arr.forEach(y_mm);
    series.push({label: name_, data: y_arr, lineWidth: 20, pointRadius: 0, fill: false, backgroundColor: 'rgba(185, 214, 200, 0.75)',fillColor : "rgba(73,188,170,0.4)",
                        strokeColor : "rgba(72,174,209,0.4)"});
}

function y_mm(x) {
    var y = (v_max * x) / (k_m + x);
    y_arr.push(y);

}


function renderChart() {
    new Chart(document.getElementById("mm_eq"), {
	type: 'line',
	color: 'blue',
	borderWidth: 10,
	multiTooltipTemplate: "<%%=datasetLabel%> : <%%= value %>",
	data: {
	    labels: x_arr,
	    datasets: series
	},
	options: {
	    hover: {
		mode: 'index',
		intersect: false
	    },
	    pointRadius: 0,
	    title: {
		display: true,
		text: 'Michaelis–Menten Kinetics'
	    }
	    
	}
    });
}

*/
