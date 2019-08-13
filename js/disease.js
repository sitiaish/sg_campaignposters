let disease = d3.select("#disease")
		.append('svg')
		.attr('width', 935)
		.attr('height', 380)
		.attr("id", "diseaseSVG")
		.style("display", "block")

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
		.attr('width', 25)
		.attr('height', 10)
	 	.attr('x', d => xdisScale(d.year))
	 	.attr('y', (d,i) => 360 -20 - (i * 15))
	 	.attr("fill", function(d){
     		return d.subsubcat === 'aids' ? "#ff7675" 
     		: d.subsubcat === 'cancer' ? "#00cec9"
     		: d.subsubcat === 'high blood pressure' ? "#00b894"
     		: d.subsubcat === 'sars' ? "#0984e3"
     		: d.subsubcat === 'measles' ? "#0984e3"
     		: d.subsubcat === 'diabetes' ? "#fab1a0"
     		: d.subsubcat === 'dengue' ? "#fab1a0"
     		: d.subsubcat === 'heart attack' ? "#fab1a0"
     		: d.subsubcat === 'hepatitis' ? "#fab1a0"
     		: d.subsubcat === 'mental illness' ? "#fab1a0"
     		: d.subsubcat === 'tuberculosis' ? "#fab1a0"
     		: "#fdcb6e"})

	disease.append('g')
		.call(d3.axisBottom(xdisScale))
		.attr('transform', "translate(15, 360)")
		.attr("class", "yearAxis")
//img 

	// let cloud = d3.select("#disease")
	// 	.append("img")
	// 	.attr("class", "cloud")
	// 	.attr("src", "./img/cloud.png")	
	//     .style("z-index", 1)
	//     .style("width", "300px")
});

