// importing data for fertility rate

d3.json("tfr.json").then(function(data) {

	let svg = d3.select("body")
		.append('svg')
		.attr('width', 700)
		.attr('height', 400)
		.attr('style', 'border: 2px solid black;')
		.append("g");


	//X scale will use the index of our data
	let xScale = d3.scaleLinear()
		.domain([1960, 2017])
		.range([0, 600])

	// Y scale will use the randomly generate number 
	let yScale = d3.scaleLinear()
	    .domain([0, 6]) // input 
	    .range([350,0]); // output 

	// Call the x axis in a group tag
	svg.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(40, 370)")
	    .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

	// Call the y axis in a group tag
	svg.append("g")
	    .attr("class", "y axis")
	    .attr("transform", "translate(40, 20)")
	    .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft


})
