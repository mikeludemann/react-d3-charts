import React, { Component } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import cloud from 'd3-cloud';

class BarChart extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount(){
		this.drawChart();
	}

	drawChart() {

		const element = "#" + this.props.id;
		var info = this.props.data;

		var margin = this.props.margin;
		var w = this.props.width - margin.left - margin.right;
		var h = this.props.height - margin.top - margin.bottom;
		var allData;

			info.forEach(function(d) {

				d.resident = +d.resident;

			});

			allData = info;

			// var arrayLength = allData.length;

			var yMax = d3.max(allData, function(d) {

				return d.resident;

			});

			var yScale = d3.scaleLinear()
				.domain([0, yMax])
				.range([h, 0]);

			var xScale = d3.scaleBand()
				.domain(allData.map(function(d) {

					return d.country;

				}))
				.rangeRound([0, w])
				.padding(0.1);

			var svg = d3.select(element)
				.append("svg")
				.attr("width", w + margin.left + margin.right)
				.attr("height", h + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			svg.selectAll("rect")
				.data(allData)
				.enter()
				.append("rect")
				.attr("x", function(d, i) {

					return xScale(d.country);

				})
				.attr("y", function(d) {

					return yScale(0);

				})
				.attr("width", xScale.bandwidth())
				.attr("height", function(d) {

					return h - yScale(0);

				})
				.attr("fill", "teal")
				.attr("class", "bar");

			// Animation
			svg.selectAll("rect")
				.transition()
				.duration(800)
				.attr("y", function(d) {

					return yScale(d.resident);

				})
				.attr("height", function(d) {

					return h - yScale(d.resident);

				})
				.delay(function(d,i){
					console.log(i);
					return(i*100)
				});

			// X-Axis
			var xAxis = d3.axisBottom(xScale);

			svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + h + ")")
				.call(xAxis)
				.selectAll("text")
				.style("text-anchor", "end")
				.attr("dx", "-.8em")
				.attr("dy", ".15em")
				.attr("transform", function(d) {

					return "rotate(-60)"

				});

			// Y-Axis
			var yAxis = d3.axisLeft(yScale);

			svg.append("g")
			.attr("class", "y axis")
				.call(yAxis);

	}

	render() {
		return (
			<div className="chart" id={this.props.id}></div>
		);
	}
}

BarChart.propTypes = {
	id: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	data: PropTypes.array.isRequired,
	margin: PropTypes.object.isRequired
}

// ############################################################

class PieChart extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount(){
		this.drawChart();
	}

	drawChart() {

		const element = "#" + this.props.id;
		var info = this.props.data;

		var width = this.props.width,
			height = this.props.height,
			margin = this.props.margin;

		// Radius
		var radius = Math.min(width, height) / 2 - margin;

		var svg = d3.select(element)
			.append("svg")
				.attr("width", width)
				.attr("height", height)
			.append("g")
				.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

		// Color 
		var color = d3.scaleOrdinal()
			.domain(info)
			.range(["#ff0000", "#ffa500", "#ffff00", "#008800", "#00ff00", "#ff00ff", "#000080", "#0000ff", "#d2691e", "#c0c0c0"])

		// Position of each group on the pie:
		var pie = d3.pie()
			.value(function(d) {

				return d.value;

			});

		var availableData = pie(d3.entries(info));

		// Build Arc
		var arcBuilder = d3.arc()
			.innerRadius(0)
			.outerRadius(radius * 0.8);

		var outerArcBuilder = d3.arc()
			.innerRadius(radius * 0.8)
			.outerRadius(radius * 1.0);

		// Build the pie chart
		svg
			.selectAll('pies')
			.data(availableData)
			.enter()
			.append('path')
			.attr('d', arcBuilder)
			.attr('fill', function(d){

				return(color(d.data.key));

			})
			.attr("stroke", "black")
			.style("stroke-width", "2px")
			.style("opacity", 0.7);

		// Polylines between chart and labels:
		svg
			.selectAll('allPolylines')
			.data(availableData)
			.enter()
			.append('polyline')
				.attr("stroke", "black")
				.style("fill", "none")
				.attr("stroke-width", 1)
				.attr('points', function(d) {
					var posA = arcBuilder.centroid(d);
					var posB = outerArcBuilder.centroid(d);
					var posC = outerArcBuilder.centroid(d);

					var middleAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;

					posC[0] = radius * 0.95 * (middleAngle < Math.PI ? 1 : -1);

					return [posA, posB, posC];

				})

		// Polylines between chart and labels:
		svg
			.selectAll('allLabels')
			.data(availableData)
			.enter()
			.append('text')
				.text( function(d) {

					console.log(d.data.key); 

					return d.data.key;

				})
				.attr('transform', function(d) {

					var pos = outerArcBuilder.centroid(d);
					var middleAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;

					pos[0] = radius * 0.99 * (middleAngle < Math.PI ? 1 : -1);

					return 'translate(' + pos + ')';

				})
				.style('text-anchor', function(d) {

					var middleAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;

					return (middleAngle < Math.PI ? 'start' : 'end');

				})

	}

	render() {
		return (
			<div className="chart" id={this.props.id}></div>
		);
	}
}

PieChart.propTypes = {
	id: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	data: PropTypes.array.isRequired,
	margin: PropTypes.number.isRequired
}

// ############################################################

class DonutChart extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount(){
		this.drawChart();
	}

	drawChart() {

		const element = "#" + this.props.id;
		var info = this.props.data;

		var width = this.props.width,
			height = this.props.height,
			margin = this.props.margin;

		// Radius
		var radius = Math.min(width, height) / 2 - margin

		// Build element
		var svg = d3.select(element)
			.append("svg")
				.attr("width", width)
				.attr("height", height)
			.append("g")
				.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

		// Color
		var color = d3.scaleOrdinal()
			.domain(["a", "b", "c", "d", "e", "f", "g", "h"])
			.range(["#ff0000", "#ffa500", "#ffff00", "#008800", "#00ff00", "#ff00ff", "#000080", "#0000ff", "#d2691e", "#c0c0c0"]);

		// Position of each group on the pie:
		var pie = d3.pie()
			.sort(null) 
			.value(function(d) {

				return d.value; 

			})

			var availableData = pie(d3.entries(info))

		// Arc Builder
		var arcBuilder = d3.arc()
			.innerRadius(radius * 0.5)
			.outerRadius(radius * 0.8);

		var outerArcBuilder = d3.arc()
			.innerRadius(radius * 0.9)
			.outerRadius(radius * 0.9);

		// Building
		svg
			.selectAll('all')
			.data(availableData)
			.enter()
			.append('path')
			.attr('d', arcBuilder)
			.attr('fill', function(d){ return(color(d.data.key)) })
			.attr("stroke", "white")
			.style("stroke-width", "2px")
			.style("opacity", 0.7)

		// Polylines between chart and labels:
		svg
			.selectAll('all-lines')
			.data(availableData)
			.enter()
			.append('polyline')
				.attr("stroke", "black")
				.style("fill", "none")
				.attr("stroke-width", 1)
				.attr('points', function(d) {

					var posA = arcBuilder.centroid(d);
					var posB = outerArcBuilder.centroid(d);
					var posC = outerArcBuilder.centroid(d);

					var middleAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;

					posC[0] = radius * 0.95 * (middleAngle < Math.PI ? 1 : -1);

					return [posA, posB, posC];

				})

		// Polylines between chart and labels:
		svg
			.selectAll('allLabels')
			.data(availableData)
			.enter()
			.append('text')
				.text( function(d) {

					console.log(d.data.key);

					return d.data.key;

				})
				.attr('transform', function(d) {

					var pos = outerArcBuilder.centroid(d);

					var middleAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;

					pos[0] = radius * 0.99 * (middleAngle < Math.PI ? 1 : -1);

					return 'translate(' + pos + ')';

				})
				.style('text-anchor', function(d) {

					var middleAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;

					return (middleAngle < Math.PI ? 'start' : 'end');

				})

	}

	render() {
		return (
			<div className="chart" id={this.props.id}></div>
		);
	}
}

DonutChart.propTypes = {
	id: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	data: PropTypes.array.isRequired,
	margin: PropTypes.number.isRequired
}

// ############################################################

class LineChart extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount(){
		this.drawChart();
	}

	drawChart() {

		const element = "#" + this.props.id;
		var info = this.props.data;

		var width = this.props.width,
			height = this.props.height,
			margin = this.props.margin;

		// Build element
		var svg = d3.select(element)
			.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
		// A line of one group
		var stats = d3.nest()
			.key(function(d) { 
				
				return d.name;
			
			})
			.entries(info);
		
		// X-Axis
		let xScale = d3.scaleLinear()
			.domain(d3.extent(info, function(d) { 
				
				return d.year;
			
			}))
			.range([ 0, width ]);

		svg.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(xScale).ticks(5));

		// Y-Axis
		var yScale = d3.scaleLinear()
			.domain([0, d3.max(info, function(d) {
				
				return +d.number;
			
			})])
			.range([ height, 0 ]);

		svg.append("g")
			.call(d3.axisLeft(yScale));

		// Color
		var res = stats.map(function(d){
			
			return d.key;
		
		})
		var color = d3.scaleOrdinal()
			.domain(res)
			.range(["#ff0000", "#ffa500", "#ffff00", "#008800", "#00ff00", "#ff00ff", "#000080", "#0000ff", "#d2691e", "#c0c0c0"]);

		// Draw the line
		svg.selectAll(".line")
			.data(stats)
			.enter()
			.append("path")
				.attr("fill", "none")
				.attr("stroke", function(d){ return color(d.key) })
				.attr("stroke-width", 1.5)
				.attr("d", function(d){

					return d3.line()
						.x(function(d) {
							
							return xScale(d.year);
						
						})
						.y(function(d) {
							
							return yScale(+d.number);
						
						})(d.values)
						
				})

	}

	render() {
		return (
			<div className="chart" id={this.props.id}></div>
		);
	}
}

LineChart.propTypes = {
	id: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	data: PropTypes.any.isRequired,
	margin: PropTypes.number.isRequired
}

// ############################################################

class HistogramChart extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount(){
		this.drawChart();
	}

	drawChart() {

		const element = "#" + this.props.id;
		const info = this.props.data;

		var width = this.props.width,
			height = this.props.height,
			margin = this.props.margin;
		
		// Build element
		var svg = d3.select(element)
			.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		// X-Axis
		var x = d3.scaleLinear()
			.domain([0, 1000])
			.range([0, width]);

		svg.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x));

		// Setting parameters for the histogram
		var histogram = d3.histogram()
			.value(function(d) {
				
				return d.number;
			
			})
			.domain(x.domain())
			.thresholds(x.ticks(70));

		// Apply the main function to get the data
		var results = histogram(info);

		// Y-Axis
		var y = d3.scaleLinear()
			.range([height, 0]);
			y.domain([0, d3.max(results, function(d) {
				
				return d.length;

			})]);
		
		svg.append("g")
			.call(d3.axisLeft(y));

		// Bar rectangles
		svg.selectAll("rect")
			.data(results)
			.enter()
			.append("rect")
				.attr("x", 1)
				.attr("transform", function(d) {
					
					return "translate(" + x(d.x0) + "," + y(d.length) + ")";
				
				})
				.attr("width", function(d) {
					
					return x(d.x1) - x(d.x0) -1 ;
				
				})
				.attr("height", function(d) {
					
					return height - y(d.length);
				
				})
				.style("fill", "#69b3a2")

	}

	render() {
		return (
			<div className="chart" id={this.props.id}></div>
		);
	}
}

HistogramChart.propTypes = {
	id: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	data: PropTypes.array.isRequired,
	margin: PropTypes.number.isRequired
}

// ############################################################

class TreemapChart extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount(){
		this.drawChart();
	}

	drawChart() {

		const element = "#" + this.props.id;
		const info = this.props.data;

		var width = this.props.width,
			height = this.props.height,
			margin = this.props.margin;
		
		// Build element
		var svg = d3.select(element)
			.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


		// Data convert in this cluster layout:
		var root = d3.hierarchy(info).sum(function(d){
			
			return d.value;
		
		})

		// The position of each element of the hierarchy
		d3.treemap()
			.size([width, height])
			.paddingTop(28)
			.paddingRight(7)
			.paddingInner(3)(root)

		// Dynamic main data
		var arr = [];

		for(var i = 0; i < info.children.length; i++){

			arr.push(info.children[i].name);
				
		}

		// Color
		var color = d3.scaleOrdinal()
			.domain(arr)
			.range(["#ff0000", "#c0c0c0", "#00ff00", "#ffa500", "#ffff00", "#008800", "#ff00ff", "#000080", "#0000ff", "#d2691e"]);

		// Opacity
		var opacity = d3.scaleLinear()
			.domain([10, 30])
			.range([.5,1])

		// Add the informations to the rectangles:
		svg
			.selectAll("rect")
			.data(root.leaves())
			.enter()
			.append("rect")
				.attr('x', function (d) {
					
					return d.x0;
				
				})
				.attr('y', function (d) {
					
					return d.y0;
				
				})
				.attr('width', function (d) {
					
					return d.x1 - d.x0;
				
				})
				.attr('height', function (d) {
					
					return d.y1 - d.y0;
				
				})
				.style("stroke", "black")
				.style("fill", function(d){
					
					return color(d.parent.data.name)

				})
				.style("opacity", function(d){
					
					return opacity(d.data.value)
				
				})

		// Add the text to the labels
		svg
			.selectAll("text")
			.data(root.leaves())
			.enter()
			.append("text")
				.attr("x", function(d){
					
					return d.x0+5
				
				})
				.attr("y", function(d){
					
					return d.y0+20
				
				})
				.text(function(d){

					return d.data.name;

				})
				.attr("font-size", "19px")
				.attr("fill", "white")

		// and to add the text labels
		svg
			.selectAll("vals")
			.data(root.leaves())
			.enter()
			.append("text")
				.attr("x", function(d){
					
					return d.x0+5
				
				})
				.attr("y", function(d){
					
					return d.y0+35
				
				})
				.text(function(d){
					
					return d.data.value
				
				})
				.attr("font-size", "11px")
				.attr("fill", "white")

		// Add title to the groups
		svg
			.selectAll("titles")
			.data(root.descendants().filter(function(d){
				
				return d.depth === 1
			
			}))
			.enter()
			.append("text")
				.attr("x", function(d){
					
					return d.x0
				
				})
				.attr("y", function(d){
					
					return d.y0+21
				
				})
				.text(function(d){
					
					return d.data.name
				
				})
				.attr("font-size", "19px")
				.attr("fill",  function(d){
					
					return color(d.data.name)
				
				})

		// Add title to the groups
		svg
			.append("text")
				.attr("x", 0)
				.attr("y", 14)
				.attr("font-size", "19px")
				.attr("fill",  "grey" )

	}

	render() {
		return (
			<div className="chart" id={this.props.id}></div>
		);
	}
}

TreemapChart.propTypes = {
	id: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	data: PropTypes.array.isRequired,
	margin: PropTypes.number.isRequired
}

// ############################################################

class ConnectScatterChart extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount(){
		this.drawChart();
	}

	drawChart() {

		const element = "#" + this.props.id;
		const info = this.props.data;

		var margin = this.props.margin,
			width = this.props.width - margin.left - margin.right,
			height = this.props.height - margin.top - margin.bottom;

		// Build element
		var svg = d3.select(element)
			.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add X-Axis
    var x = d3.scaleTime()
      .domain(d3.extent(info, function(d) {
				
				return d.number;

			}))
			.range([ 0, width ]);
			
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Y-Axis
    var y = d3.scaleLinear()
      .domain( [8000, 9200])
			.range([ height, 0 ]);
			
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add the line
    svg.append("path")
      .datum(info)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .curve(d3.curveBasis)
        .x(function(d) {
					
					return x(d.number);
				
				})
        .y(function(d) {
					
					return y(d.value);
				
				})
			)

    // Create - Tooltip
    var Tooltip = d3.select(element)
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")

		// Three functions for changing the tooltip
		var mouseover = function(d) {
			Tooltip
				.style("opacity", 1)
		}
		
		var mousemove = function(d) {
			Tooltip
				.html("Value: " + d.value)
				.style("left", (d3.mouse(this)[0]+70) + "px")
				.style("top", (d3.mouse(this)[1]) + "px")
		}
		
		var mouseleave = function(d) {
			Tooltip
				.style("opacity", 0)
		}

    // Adding points
    svg
      .append("g")
      .selectAll("dot")
      .data(info)
      .enter()
      .append("circle")
        .attr("class", "myCircle")
        .attr("cx", function(d) {
					
					return x(d.number);
				
				})
        .attr("cy", function(d) {
					
					return y(d.value);
				
				})
        .attr("r", 8)
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 3)
        .attr("fill", "white")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

	}

	render() {
		return (
			<div className="chart" id={this.props.id}></div>
		);
	}
}

ConnectScatterChart.propTypes = {
	id: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	data: PropTypes.array.isRequired,
	margin: PropTypes.number.isRequired
}

// ############################################################

class MapChart extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount(){
		this.drawChart();
	}

	drawChart() {

		const element = "#" + this.props.id;
		const info = this.props.data;

		// Build element
		var svg = d3.select(element),
			width = +svg.attr("width", this.props.width),
			height = +svg.attr("height", this.props.height);

		// Map and Projection
		var projection = d3.geoNaturalEarth1()
			.scale(width / 1.3 / Math.PI)
			.translate([width / 2, height / 2])

		d3.json(info, function(data){

			// Draw the map
			svg.append("g")
				.selectAll("path")
				.data(data.features)
				.enter().append("path")
					.attr("fill", "#69b3a2")
					.attr("d", d3.geoPath()
						.projection(projection)
					)
					.style("stroke", "#fff")

		})

	}

	render() {
		return (
			<svg className="chart" id={this.props.id}></svg>
		);
	}
}

MapChart.propTypes = {
	id: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	data: PropTypes.any.isRequired
}

// ############################################################

class WordCloudChart extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount(){
		this.drawChart();
	}

	drawChart() {

		const element = "#" + this.props.id;
		const info = this.props.data;

		var margin = this.props.margin,
			width = this.props.width - margin.left - margin.right,
			height = this.props.height - margin.top - margin.bottom;

		// Build element
		var svg = d3.select(element)
			.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		// Construct a new cloud layout instance
		var layout = cloud()
			.size([width, height])
			.words(info.map(function(d) {
				
				return {text: d.word, size:d.size};
			
			}))
			.padding(5)
			.rotate(function() {
				
				return ~~(Math.random() * 2) * 90;
			
			})
			.fontSize(function(d) {
				
				return d.size;
			
			})
			.on("end", draw);
			layout.start();

		// Function to takes the output of 'layout' above and draw the words
		function draw(words) {
			svg
				.append("g")
					.attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
					.selectAll("text")
						.data(words)
					.enter().append("text")
						.style("font-size", function(d) {
							
							return d.size;
						
						})
						.style("fill", "#69b3a2")
						.attr("text-anchor", "middle")
						.style("font-family", "Impact")
						.attr("transform", function(d) {
							
							return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";

						})
						.text(function(d) {
							
							return d.text;
						
						});
		}

	}

	render() {
		return (
			<div className="chart" id={this.props.id}></div>
		);
	}
}

WordCloudChart.propTypes = {
	id: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	data: PropTypes.array.isRequired,
	margin: PropTypes.number.isRequired
}

// ############################################################

class NetworkChart extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount(){
		this.drawChart();
	}

	drawChart() {

		const element = "#" + this.props.id;
		const info = this.props.data;

		var margin = this.props.margin,
			width = this.props.width - margin.left - margin.right,
			height = this.props.height - margin.top - margin.bottom;

		// Build element
		var svg = d3.select(element)
			.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			// Initialize - Links
			var link = svg
				.selectAll("line")
				.data(info.links)
				.enter()
				.append("line")
					.style("stroke", "#aaa")

			// Initialize - Nodes
			var node = svg
				.selectAll("circle")
				.data(info.nodes)
				.enter()
				.append("circle")
					.attr("r", 20)
					.style("fill", "#69b3a2")

			// List the force - Network
			var simulation = d3.forceSimulation(info.nodes)
				.force("link", d3.forceLink()
					.id(function(d) {
						
						return d.id;
					
					})
					.links(info.links)
				)
				.force("charge", d3.forceManyBody().strength(-400))
				.force("center", d3.forceCenter(width / 2, height / 2))
				.on("end", ticked);

			// Iteration of the force algorithm - Updating the position of all nodes.
			function ticked() {
				link
					.attr("x1", function(d) {
						
						return d.source.x;
					
					})
					.attr("y1", function(d) {
						
						return d.source.y;
					
					})
					.attr("x2", function(d) {
						
						return d.target.x;
					
					})
					.attr("y2", function(d) {
						
						return d.target.y;
					
					});

				node
					.attr("cx", function (d) {
						
						return d.x+6;
					
					})
					.attr("cy", function(d) {
						
						return d.y-6;
					
					});
			}

	}

	render() {
		return (
			<div className="chart" id={this.props.id}></div>
		);
	}
}

NetworkChart.propTypes = {
	id: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	data: PropTypes.array.isRequired,
	margin: PropTypes.number.isRequired
}

// ############################################################

class TreeChart extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount(){
		this.drawChart();
	}

	drawChart() {

		const element = "#" + this.props.id;
		const info = this.props.data;

		document.getElementById(this.props.id).setAttribute("width", this.props.width);
		document.getElementById(this.props.id).setAttribute("height", this.props.height);

		var style = document.createElement('style');
		style.type = 'text/css';

		let styling =
		`        
		.node circle {
			fill: #999;
		}
		
		.node text {
			font: 10px sans-serif;
		}
		
		.node--internal circle {
			fill: #555;
		}
		
		.node--internal text {
			text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;
		}
		
		.link {
			fill: none;
			stroke: #555;
			stroke-opacity: 0.4;
			stroke-width: 1.5px;
		}
		
		form {
			font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
			position: absolute;
			left: 10px;
			top: 10px;
		}
		
		label {
			display: block;
		}
		`

		style.innerHTML = styling;
		document.getElementsByTagName('head')[0].appendChild(style);

		// Build element
		var svg = d3.select(element),
			width = +svg.attr("width"),
			height = +svg.attr("height"),
			g = svg.append("g").attr("transform", "translate(40,0)");

		var tree = d3.tree()
			.size([height - 400, width - 160]);
			
		var stratify = d3.stratify()
			.parentId(function(d) {
				
				return d.id.substring(0, d.id.lastIndexOf("."));
			
			});
		
		var root = stratify(info)
      .sort(function(a, b) {
				
				return (a.height - b.height) || a.id.localeCompare(b.id);
			
			});

		tree(root);

		var link = g.selectAll(".link")
			.data(root.descendants().slice(1))
			.enter().append("path")
				.attr("class", "link")
				.attr("d", diagonal);

		var node = g.selectAll(".node")
			.data(root.descendants())
			.enter().append("g")
				.attr("class", function(d) {
					
					return "node" + (d.children ? " node--internal" : " node--leaf");
				
				})
				.attr("transform", function(d) {
					
					return "translate(" + d.y + "," + d.x + ")";
				
				});

		node.append("circle")
			.attr("r", 2.5);

		node.append("text")
			.attr("dy", 3)
			.attr("x", function(d) {
				
				return d.children ? -8 : 8;
			
			})
			.style("text-anchor", function(d) {
				
				return d.children ? "end" : "start";
			
			})
			.text(function(d) {
				
				return d.id.substring(d.id.lastIndexOf(".") + 1);
			
			});

		d3.selectAll("input")
			.on("change", changed);

		function changed() {
			var t = d3.transition().duration(750);
			node.transition(t).attr("transform", function(d) {
				
				return "translate(" + d.y + "," + d.x + ")";
			
			});
			link.transition(t).attr("d", diagonal);
		}

		function diagonal(d) {
			return "M" + d.y + "," + d.x
				+ "C" + (d.parent.y + 100) + "," + d.x
				+ " " + (d.parent.y + 100) + "," + d.parent.x
				+ " " + d.parent.y + "," + d.parent.x;
		}

	}

	render() {
		return (
			<svg className="chart" id={this.props.id}></svg>
		);
	}
}

TreeChart.propTypes = {
	id: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	data: PropTypes.any.isRequired
}

// ############################################################

class ClusterChart extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount(){
		this.drawChart();
	}

	drawChart() {

		const element = "#" + this.props.id;
		const info = this.props.data;

		document.getElementById(this.props.id).setAttribute("width", this.props.width);
		document.getElementById(this.props.id).setAttribute("height", this.props.height);

		var style = document.createElement('style');
		style.type = 'text/css';

		let styling =
		`        
		.node circle {
			fill: #999;
		}
		
		.node text {
			font: 10px sans-serif;
		}
		
		.node--internal circle {
			fill: #555;
		}
		
		.node--internal text {
			text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;
		}
		
		.link {
			fill: none;
			stroke: #555;
			stroke-opacity: 0.4;
			stroke-width: 1.5px;
		}
		
		form {
			font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
			position: absolute;
			left: 10px;
			top: 10px;
		}
		
		label {
			display: block;
		}
		`

		style.innerHTML = styling;
		document.getElementsByTagName('head')[0].appendChild(style);

		// Build element
		var svg = d3.select(element),
			width = +svg.attr("width"),
			height = +svg.attr("height"),
			g = svg.append("g").attr("transform", "translate(40,0)");

		var cluster = d3.cluster()
			.size([height, width - 160]);
			
		var stratify = d3.stratify()
			.parentId(function(d) {
				
				return d.id.substring(0, d.id.lastIndexOf("."));
			
			});
		
		var root = stratify(info)
      .sort(function(a, b) {
				
				return (a.height - b.height) || a.id.localeCompare(b.id);
			
			});

		cluster(root);

		var link = g.selectAll(".link")
			.data(root.descendants().slice(1))
			.enter().append("path")
				.attr("class", "link")
				.attr("d", diagonal);

		var node = g.selectAll(".node")
			.data(root.descendants())
			.enter().append("g")
				.attr("class", function(d) {
					
					return "node" + (d.children ? " node--internal" : " node--leaf");
				
				})
				.attr("transform", function(d) {
					
					return "translate(" + d.y + "," + d.x + ")";
				
				});

		node.append("circle")
			.attr("r", 2.5);

		node.append("text")
			.attr("dy", 3)
			.attr("x", function(d) {
				
				return d.children ? -8 : 8;
			
			})
			.style("text-anchor", function(d) {
				
				return d.children ? "end" : "start";
			
			})
			.text(function(d) {
				
				return d.id.substring(d.id.lastIndexOf(".") + 1);
			
			});

		d3.selectAll("input")
			.on("change", changed);

		function changed() {
			var t = d3.transition().duration(750);
			node.transition(t).attr("transform", function(d) {
				
				return "translate(" + d.y + "," + d.x + ")";
			
			});
			link.transition(t).attr("d", diagonal);
		}

		function diagonal(d) {
			return "M" + d.y + "," + d.x
				+ "C" + (d.parent.y + 100) + "," + d.x
				+ " " + (d.parent.y + 100) + "," + d.parent.x
				+ " " + d.parent.y + "," + d.parent.x;
		}

	}

	render() {
		return (
			<svg className="chart" id={this.props.id}></svg>
		);
	}
}

ClusterChart.propTypes = {
	id: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	data: PropTypes.any.isRequired
}

// ############################################################

class ScatterChart extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount(){
		this.drawChart();
	}

	drawChart() {

		const element = "#" + this.props.id;
		const info = this.props.data;

		var margin = this.props.margin,
			width = this.props.width - margin.left - margin.right,
			height = this.props.height - margin.top - margin.bottom;

		// Build element
		var svg = d3.select(element)
			.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		// Dynamic main data
		var arr = [];

		for(var i = 0; i < info.length; i++){

			arr.push(info[i].group);

		}

		function uniq(a) {
			var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];

			return a.filter(function(item) {

				var type = typeof item;
				if(type in prims){

					return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
					
				}	else {
					
					return objs.indexOf(item) >= 0 ? false : objs.push(item);
				
				}

			});
		}

		// X-Axis
		var x = d3.scaleLinear()
			.domain([4, 8])
			.range([ 0, width ]);
		
		svg.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x));

		// Y-Axis
		var y = d3.scaleLinear()
			.domain([0, 9])
			.range([ height, 0]);
			
		svg.append("g")
			.call(d3.axisLeft(y));

		// Color
		var color = d3.scaleOrdinal()
			.domain(uniq(arr))
			.range(["#ff0000", "#c0c0c0", "#00ff00", "#ffa500", "#ffff00", "#008800", "#ff00ff", "#000080", "#0000ff", "#d2691e"]);

		// Highlight
		var highlight = function(d){

			var selectGroup = d.group

			d3.selectAll(".dot")
				.transition()
				.duration(200)
				.style("fill", "lightgrey")
				.attr("r", 3)

			d3.selectAll("." + selectGroup)
				.transition()
				.duration(200)
				.style("fill", color(selectGroup))
				.attr("r", 7)
		}

		// Not Highlight
		var doNotHighlight = function(){
			d3.selectAll(".dot")
				.transition()
				.duration(200)
				.style("fill", "lightgrey")
				.attr("r", 5 )
		}

		// Dots
		svg.append('g')
			.selectAll("dot")
			.data(info)
			.enter()
			.append("circle")
				.attr("class", function (d) {
					
					return "dot " + d.group;
				
				})
				.attr("cx", function (d) {
					
					return x(d.s_length);
				
				})
				.attr("cy", function (d) {
					
					return y(d.p_length);
				
				})
				.attr("r", 5)
				.style("fill", function (d) {
					
					return color(d.group);
				
				})
			.on("mouseover", highlight)
			.on("mouseleave", doNotHighlight )

	}

	render() {
		return (
			<div className="chart" id={this.props.id}></div>
		);
	}
}

ScatterChart.propTypes = {
	id: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	data: PropTypes.any.isRequired,
	margin: PropTypes.array.isRequired
}

// ############################################################

class LollipopChart extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount(){
		this.drawChart();
	}

	drawChart() {

		const element = "#" + this.props.id;
		const info = this.props.data;

		var margin = this.props.margin,
			width = this.props.width - margin.left - margin.right,
			height = this.props.height - margin.top - margin.bottom;
		
		// Build element
		var svg = d3.select(element)
			.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
		// Sort data
		info.sort(function(b, a) {
			return a.resident - b.resident;
		});

		// X-Axis
		var x = d3.scaleLinear()
			.domain([0, 100000000])
			.range([ 0, width]);

		svg.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x))
			.selectAll("text")
				.attr("transform", "translate(-10,0)rotate(-45)")
				.style("text-anchor", "end");

		// Y-Axis
		var y = d3.scaleBand()
			.range([ 0, height ])
			.domain(info.map(function(d) {
				
				return d.country;
			
			}))
			.padding(1);

		svg.append("g")
			.call(d3.axisLeft(y))

		// Lines
		svg.selectAll("myline")
			.data(info)
			.enter()
			.append("line")
				.attr("x1", function(d) {
					
					return x(d.resident);
				
				})
				.attr("x2", x(0))
				.attr("y1", function(d) {
					
					return y(d.country);
				
				})
				.attr("y2", function(d) {
					
					return y(d.country);
				
				})
				.attr("stroke", "grey")

		// Circles
		svg.selectAll("mycircle")
			.data(info)
			.enter()
			.append("circle")
				.attr("cx", function(d) {
					
					return x(d.resident);
				
				})
				.attr("cy", function(d) {
					
					return y(d.country);
				
				})
				.attr("r", "7")
				.style("fill", "#69b3a2")
				.attr("stroke", "black")

	}

	render() {
		return (
			<div className="chart" id={this.props.id}></div>
		);
	}
}

LollipopChart.propTypes = {
	id: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	data: PropTypes.any.isRequired,
	margin: PropTypes.array.isRequired
}

// ############################################################

class ParallelChart extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount(){
		this.drawChart();
	}

	drawChart() {

		const element = "#" + this.props.id;
		const info = this.props.data;

		var margin = this.props.margin,
			width = this.props.width - margin.left - margin.right,
			height = this.props.height - margin.top - margin.bottom;
		
		// Build element
		var svg = d3.select(element)
			.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		// Dynamic main data
		var arr = [];

		for(var i = 0; i < info.length; i++){

			arr.push(info[i].group);

		}

		var secondArr = [];

		for(var obj in info){

			if(info.hasOwnProperty(obj)){

				for(var prop in info[obj]){

					if(info[obj].hasOwnProperty(prop)){

						secondArr.push(prop);
						
					}

				}

			}

		}

		function uniq(a) {
			var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];

			return a.filter(function(item) {

				var type = typeof item;
				if(type in prims){

					return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
					
				}	else {
					
					return objs.indexOf(item) >= 0 ? false : objs.push(item);
				
				}

			});
		}
        
		function removeLastIndex(){

			var x = uniq(secondArr);
			
			x.pop();
				
			return x;

		}

		// Color
		var color = d3.scaleOrdinal()
			.domain(uniq(arr))
			.range(["#ff0000", "#c0c0c0", "#00ff00", "#ffa500", "#ffff00", "#008800", "#ff00ff", "#000080", "#0000ff", "#d2691e"]);

		var dimensions = removeLastIndex();

		var y = {};

		for (i in dimensions) {
			let name = dimensions[i];
			y[name] = d3.scaleLinear()
				.domain( [0,8] )
				.range([height, 0])
		}

		// X-Scale
		var x = d3.scalePoint()
			.range([0, width])
			.domain(dimensions);

		// Highlight
		var highlight = function(d){

			let selectGroup = d.group

			d3.selectAll(".line")
				.transition().duration(200)
				.style("stroke", "lightgrey")
				.style("opacity", "0.2")
			
			d3.selectAll("." + selectGroup)
				.transition().duration(200)
				.style("stroke", color(selectGroup))
				.style("opacity", "1")

		}

		// Not highlight
		var doNotHighlight = function(d){
			d3.selectAll(".line")
				.transition().duration(200).delay(1000)
				.style("stroke", function(d){
					
					return( color(d.group));
				
				})
				.style("opacity", "1")
		}

		// Path - Return X and Y coordinates
		function path(d) {

			return d3.line()(dimensions.map(function(p) {
				
				return [x(p), y[p](d[p])];
			
			}));

		}

		// Draw the lines
		svg
			.selectAll("myPath")
			.data(info)
			.enter()
			.append("path")
				.attr("class", function (d) {
					
					return "line " + d.group
				
				} )
				.attr("d",  path)
				.style("fill", "none" )
				.style("stroke", function(d){
					
					return( color(d.group))
				
				})
				.style("opacity", 0.5)
				.on("mouseover", highlight)
				.on("mouseleave", doNotHighlight )

		// Draw Axis:
		svg.selectAll("myAxis")
			.data(dimensions).enter()
			.append("g")
			.attr("class", "axis")
			.attr("transform", function(d) {
				
				return "translate(" + x(d) + ")";
			
			})
			.each(function(d) {
				
				d3.select(this).call(d3.axisLeft().ticks(5).scale(y[d]));
			
			})
			.append("text")
				.style("text-anchor", "middle")
				.attr("y", -9)
				.text(function(d) {
					
					return d;
				
				})
				.style("fill", "black")
	
	}

	render() {
		return (
			<div className="chart" id={this.props.id}></div>
		);
	}
}

ParallelChart.propTypes = {
	id: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	data: PropTypes.any.isRequired,
	margin: PropTypes.array.isRequired
}


// ############################################################

export {
	BarChart,
	PieChart,
	DonutChart,
	LineChart,
	HistogramChart,
	TreemapChart,
	ConnectScatterChart,
	MapChart,
	WordCloudChart,
	NetworkChart,
	TreeChart,
	ClusterChart,
	ScatterChart,
	LollipopChart,
	ParallelChart
}