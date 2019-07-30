//Load in poster data
d3.json("health2.json").then(function(data) {
	
	//container
	wrappper = d3.select(".healthsection")
	.append("div")
	.attr("id", "gridwrapper")

	// Creating the grid here
	gridsquare = wrappper
   .append("div")
   .attr("id", "grid")
   .attr("class", "gridsquare") 

  //append the posters in each grid 
  chars = gridsquare
  .selectAll("div")
  .data(data)
  .enter()
  .append("div")
  .attr("class", "char")
  .style("border", "3px solid #535c68")
  .style("background-image", d =>'url("'+d.img+'")')
  .on("mouseover", showCat)
  .on("mouseout", hideCat)


  content = chars
    .append("div")
    .attr("class", "charContent")
    .append("h2")
    .text(d => d.subcat)
    .style("display", "none")

  chars
   .filter(function(d){ return d.count > 0; })
   .classed("size1", true)
   .filter(function(d){ return d.count > 10; })
   .classed("size1", false)
   .classed("size3", true)
   .filter(function(d){ return d.count > 20; })
   .classed("size1", false)
   .classed("size3", false)
   .classed("size4", true)
   .filter(function(d){ return d.count > 30; })
   .classed("size4", false)
   .classed("size1", false)
   .classed("size3", false)
   .classed("size5", true)
  ;

});

// Create Event Handlers for mouse
function showCat() { 
    d3.select(this)
      .style("width", "103%")
      .style("height", "103%")
      .style("border", "3px solid #222f3e")
      .select(".charContent > h2")
      .style("display", "block")

};
      
function hideCat() { 
    d3.select(this)
      .style("width", "100%")
      .style("height", "100%")
      .style("border", "3px solid #535c68")
      .select(".charContent > h2")
      .style("display", "none")
};