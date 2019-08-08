import React, { Component } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

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

			var arrayLength = allData.length;

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

export {
	BarChart,
	PieChart,
	DonutChart
}
