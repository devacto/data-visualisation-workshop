/**
 * Created by victor on 26/08/2015.
 */

data = [{
    "name": "Victor",
    "age": 25
}, {
    "name": "Alice",
    "age": 23
}, {
    "name": "Ushnish",
    "age": 200,
    "meta": [{
        "origin": "Deep in the Himalays"
    }, {
        "whereabouts": "probably in the Kitchen at eBay"
    }]
}]

// data-dependent list
d3.select("#age-bar")
    .append("ul")
    .selectAll("li")
    .data(data)
    .enter()
    .append("li")
    .text(function (d) {
        return d.name + " is " + d.age;
    });

//-----------------------------------------------------------------------------
// data-driven chart

var width = 420,
    barHeight = 20;

var max_age = d3.max(
    data.map(function(d,i){ return d.age; })
);

var x = d3.scale.linear()
    .domain([0, max_age])
    .range([0, width]);

var chart = d3.select("#age-bar")
    .append("svg")
    .attr("class", "chart")
    .attr("width", width)
    .attr("height", barHeight * data.length);

var bar = chart.selectAll("g")
    .data(data)
    .enter().append("g")
    .attr("transform",
    function(d, i) { return "translate(0," + i * barHeight + ")"; }
);

bar.append("rect")
    .attr("width", function(d) { return x(d.age) ; })
    .attr("height", barHeight - 1);

bar.append("text")
    .attr("x", function(d) { return x(d.age) - 3; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d.age; });

//-----------------------------------------------------------------------------
// user interaction

var toggle_short = false;
bar.on("click", function() {
    toggle_short = !toggle_short;
    chart.selectAll("rect")
        .transition()
        .ease("bounce")
        .delay(function(d, i) { return i * 50; })
        .duration(1000)
        .attr("width", function(d, i) { return toggle_short? 10 : x(d.age); });
});

var canvas = document.getElementById("age_bar");
var p = new Processing(canvas, noisy_lines);