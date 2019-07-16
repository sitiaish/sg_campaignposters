//Load in poster data
d3.json("poster.json").then(function(data) {
	
	// Creating the grid here
	grid = d3.select("body")
   .append("div")
   .attr("id", "grid")
   .attr("class", "grid");

   //append the posters in each grid 
   chars = grid
    .selectAll("div")
    .data(data.posters)
    .enter()
    .append("div")
    .attr("class", "char")
   	.style("background-image",  function(d){
      return 'url("'+d.imgpath+'")'})
   	.on("click", info);

   	//put in the content in the box
   	content = chars
   		.append("div")
   		.attr("class", "charContent")
   		.append("h2")
   		.text(function(d,i){
   			return d.era;});

   	content.on('click', clicked);

   	details = content
	   .append("div")
	   .attr("class", "details");

	bio = details
	    .append("div")
	    .attr("class", "bio")
	    .append("h3")
    	.text(function(d,i){
    		return d.title;});
	bio
		.filter(function(d){ return d.year != ""; })
		.append("h4")
		.text("YEAR:");
	bio
		.filter(function(d){ return d.year != ""; })
		.append("span")
		.text(function(d,i){
		return d.year;});
		
	bio
		.filter(function(d){ return d.board != ""; })
		.append("h4")
		.text("BOARD:");
		
	bio
		.filter(function(d){ return d.board != ""; })
		.append("span")
		.text(function(d,i){
		return d.board;});

	d3.select("#campaignType").on("click", function () {
      chars.sort(function(a, b) { 
         return d3.descending(b["year"], a["year"]);
      });
      chars.classed("open", false);
      chars.style("grid-row-start", "auto");
      chars.style("grid-column-start", "auto");
   })
;
})

// Create Event Handlers for mouse


function clicked() { 
    d3.select('charContent')
      .style("background-color", "green");
console.log("change color")
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

