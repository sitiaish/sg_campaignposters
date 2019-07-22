//Load in poster data
d3.json("poster.json").then(function(data) {
	
	//container
	wrappper = d3.select("body")
	.append("div")
	.attr("id", "gridwrapper")

	// Creating the grid here
	gridsquare = wrappper
   .append("div")
   .attr("id", "grid")
   .attr("class", "gridsquare");

   //append the posters in each grid 
   chars = gridsquare
    .selectAll("div")
    .data(data.posters)
    .enter()
    .append("div")
    .attr("class", "char")
    .style("background-color", "steelblue")
   	.on("click", info)
   	.on("mouseover", clicked);

   	//put in the content in the box
   	content = chars
   		.append("div")
   		.attr("class", "charContent")

	d3.select("#campaignType").on("click", function () {
      chars.sort(function(a, b) { 
         return d3.descending(b["year"], a["year"]);
      });
      chars.classed("open", false);
      chars.style("grid-row-start", "auto");
      chars.style("grid-column-start", "auto");
   });
})

// Create Event Handlers for mouse
function clicked() { 
    d3.select(this)
      .style("background-color", "red");
}

function info(d, i){
	if(this.className.split(' ').indexOf('open') > -1 ){
	 d3.select(this).classed("open", false);
	}
	else{
	    d3.selectAll(".char").classed("open", false);
	    d3.select(this).classed("open", true);
	}
}

