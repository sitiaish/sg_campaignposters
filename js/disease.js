let disease = d3.select("#disease")
		.append('svg')
		.attr('width', 935)
		.attr('height', 320)
		.attr("id", "diseaseSVG")
		.style("display", "block")

let diseaseContent = d3.select("#disease")
						.append("div")
						.attr("class", "content")
						.style("margin-top", "50px")
						.append("p")
						.attr("class", "disease-content")

d3.json("health3.json").then(function(data) {

// ensuring the year is numerical
	data.forEach(d => {
		d.year = +d.year});

// nesting data by year to make year groups 
	let dataYear = d3.nest()
		.key(d => d.year)
		.entries(data)


// nesting data by campaign to make a group of campaign
	let dataByDisease = d3.nest()
		.key(d => d.subsubcat)
		.entries(data)

// making a linear x scale for the year with domain starting from 1975 to the max in data year
	const xdisScale = d3.scaleLinear()
		.domain([1976, 2006])
		.range([10, 900]);

// creating a group for each year
	let year = disease.selectAll('g.year')
		.data(dataYear).enter()
		.append('g')
		.attr('class', 'yeardisease');

// drawing each rectangle representing each per year 
	year.selectAll('datarect')
		.data(d => d.values)
		.enter()
		.append('rect')
		.attr('class', 'diseaserect')
		.attr('typeofdisease', d => d.subsubcat)
		.attr('width', 25)
		.attr('height', 10)
	 	.attr('x', d => xdisScale(d.year))
	 	.attr('y', (d,i) => 300 -20 - (i * 15))
	 	.attr("fill", "#34495e")
	 	.attr("fill", function(d){
	 		return d.subsubcat === 'aids' ? "#747d8c" 
	 		// : d.subsubcat === 'cancer' ? "#bdc3c7"
	 		// : d.subsubcat === 'high blood pressure' ? "#95a5a6"
	 		// : d.subsubcat === 'sars' ? "#7f8c8d"
	 		// : d.subsubcat === 'measles' ? "#57606f"
	 		: "#747d8c"})
	 	.on("mouseover", d => healthPosterHover(d.imgfull))	
	 	.on("mouseover.color", function(d){
	 		d3.select(this)
	 			.attr("stroke", "black")
	 	.on("mouseover.annotate", annoatatedis(d.subsubcat))
	 	.on("mouseout", null)
	 	})			


	disease.append('g')
		.call(d3.axisBottom(xdisScale))
		.attr('transform', "translate(15, 300)")
		.attr("class", "yearAxis")
});

function changeColor(disease, color, text) {
	d3.selectAll('.diseaserect')
    .transition()		
    .duration(100)
    .attr("fill", "#747d8c")

    d3.selectAll('.diseaserect[typeofdisease="' + disease + '"]')
    .transition()		
    .duration(100)
    .attr("fill", color)

	diseaseContent.html(`<hr>${text}`)
};

function healthPosterHover(posterUrl) {

	d3.select("#heathSide")
		.style("display", "block")
		.select("img")
		.attr("src", posterUrl)
		.style("display", "block")
}

function annoatatedis(subcat) {

	const annotations = [
	  {
	    note: {
	      title: subcat,
	    },
		x: 940,
	    y: 200,
	    dy: -50,
	    dx: -90
	  }
	]

	// Remove previous annotation
	d3.select("#diseaseSVG")
	  .selectAll(".annotations")
	  .attr("opacity", 0)


	// Add annotation to the chart
	const makeAnnotations = d3.annotation()
	  .annotations(annotations)
	d3.select("#diseaseSVG")
	  .append("g")
	  .call(makeAnnotations)
};


