let allchart = d3.select("body")
		.select("#allposters")
		// .append('div')
		// .attr('class', 'graphic')
		.append('svg')
		.attr('width', 1100)
		.attr('height', 620)
		// .attr('style', 'border: 2px solid black; ')

const width = +allchart.attr('width')
const height = +allchart.attr('height')
const margin = { top: 20, right: 20, bottom: 50, left: 20};
const innerWidth = width - margin.right - margin.left;
const innerHeight = height - margin.top - margin.bottom;

d3.select("svg")
	.append("text")
	.text("Campaign Posters Arranged by Year")
	.attr('x', width/2 -150)
	.attr('y', height-20)
	.attr('font-size',"1.2em")

//Load in poster data
d3.json("test.json").then(function(data) {

// ensuring the year is numerical
	data.forEach(d => {
		d.year = +d.year});

// nesting data by year to make year groups 
	let dataByYear = d3.nest()
		.key(d => d.year)
		.entries(data)

// nesting data by campaign to make a group of campaign
	let dataByCampaign = d3.nest()
		.key(d => d.campaign)
		.entries(data)

// making a linear x scale for the year with domain starting from 1975 to the max in data year
	const xScale = d3.scaleLinear()
		.domain([1975, d3.max(data, d => d.year)])
		.range([10, innerWidth]);

// creating a group for each year
	let year = allchart.selectAll('g.year')
		.data(dataByYear).enter()
		.append('g')
		.attr('class', 'year');

// drawing each rectangle representing each per year 
	year.selectAll('datarect')
		.data(d => d.values)
		.enter()
		.append('rect')
		.attr('class', 'datarect')
		.attr('width', 25)
		.attr('height', 10)
	 	.attr('x', d => xScale(d.year))
	 	.attr('y', (d,i) => innerHeight -20 - (i * 15))
	 	.attr('fill', "#b2bec3")
	 	.on("mouseover.image", d => toolTipBox(d.imgfull, d.subcat))					
        .on("mouseover.color", hovered)
        .on("mouseout", hoverOut);


// the on hover boxes

	let divBox = d3.select("body").append("div")	
	    .attr("class", "tooltip")				
	    .style("opacity", 0)
		.style("left", "550px")		
		.style("top", "2040px")
	    .style("z-index", 1)

	divBox.append("img")
		.attr("class", "thumbnail")
		.style("display", "none")
		.style("width", "130px")

	divBox.append("h2")
		.attr("class", "titleBig")
		.style("display", "none")
		.style("width", "100%")
		// .style("margin-left", "120px")
		.style("margin-top", "0px")



// on click change color
	allchart.on('click', catColor)

// Appending the x axis
	allchart.append('g')
		.call(d3.axisBottom(xScale))
		.attr('transform', `translate(15, ${innerHeight})`)
		.attr("class", "yearAxis")

// Appending the legend

	let labels = ["Environment","Population-Control", "Health"];
	let legendColors = ["#00cec9","#ff7675", "#fdcb6e"];

    let legend = allchart.selectAll(".legend")
        .data(dataByCampaign) 
      	.enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(" + Math.abs((i +1) * 250) + ",30)"});

    legend.append("rect")
        .attr("x", 5 )
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d, i) { return legendColors[i];});

    legend.append("text")
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function(d, i) { return labels[i]; });
});

function hovered(d, i) {  // Add interactivity
    d3.select(this)
    	.attr("fill","#f5f6fa",)
    	.attr("stroke","black")
    	.attr("stroke-width", 3)
    	.attr('width', 30)
		.attr('height', 15)
    };

function hoverOut(d, i) {
    // Use D3 to select element, change color back to normal
    d3.select(this)
    	.attr("stroke","none")
    	.attr('width', 25)
		.attr('height', 10)
		.attr("fill", function(d){
     		return d.campaign === 'population' ? "#ff7675" 
     		: d.campaign === 'environment' ? "#00cec9"
     		: "#fdcb6e"
 	});
};

function catColor() {
    d3.selectAll('.datarect')
    .transition()		
    .duration(500)
    .attr("fill", function(d){
     return d.campaign === 'population' ? "#ff7675" 
     		: d.campaign === 'environment' ? "#00cec9"
     		: "#fdcb6e"
 	});
  };

function toolTipBox(posterUrl, subcat) {

	d3.select(".tooltip")
		.style("opacity", 1)
		.select("img")
		.attr("src", posterUrl)
		.style("display", "inline")


	d3.select(".tooltip")
		.style("opacity", 1)
		.select("h2")
		.text(subcat)
		.style("display", "block")
};

