var w = 960, h = 500;

var radius = 25;
var color = d3.scaleOrdinal(d3.schemeCategory20);
var centerScale = d3.scalePoint().padding(1).range([0, w]);
var forceStrength = 0.05;

var svg = d3.select("body").append("svg")
  .attr("width", w)
  .attr("height", h)

var simulation = d3.forceSimulation()
        .force("collide",d3.forceCollide( function(d){
          	return d.r + 8 }).iterations(16) 
        )
        .force("charge", d3.forceManyBody())
        .force("y", d3.forceY().y(h / 2))
        .force("x", d3.forceX().x(w / 2))

d3.csv("data.csv", function(data){
  
  data.forEach(function(d){
    d.r = radius;
    d.x = w / 2;
    d.y = h / 2;
  })
     
  var circles = svg.selectAll("circle")
  	.data(data, function(d){ return d.ID ;});
  
  var circlesEnter = circles.enter().append("circle")
  	.attr("r", function(d, i){ return d.r; })
    .attr("cx", function(d, i){ return 175 + 25 * i + 2 * i ** 2; })
		.attr("cy", function(d, i){ return 250; })
  	.style("fill", function(d, i){ return color(d.ID); })
  	.style("stroke", function(d, i){ return color(d.ID); })
  	.style("stroke-width", 10)
  	.style("pointer-events", "all")
  	.call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

  circles = circles.merge(circlesEnter)
  
  function ticked() {
    //console.log("tick")
    //console.log(data.map(function(d){ return d.x; }));
    circles
        .attr("cx", function(d){ return d.x; })
        .attr("cy", function(d){ return d.y; });
  }   

  simulation
        .nodes(data)
        .on("tick", ticked);
  
  function dragstarted(d,i) {
    //console.log("dragstarted " + i)
    if (!d3.event.active) simulation.alpha(1).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d,i) {
    //console.log("dragged " + i)
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d,i) {
    //console.log("dragended " + i)
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
    var me = d3.select(this)
    console.log(me.classed("selected"))
    me.classed("selected", !me.classed("selected"))
    
    d3.selectAll("circle")
      .style("fill", function(d, i){ return color(d.ID); })
  	
    d3.selectAll("circle.selected")
      .style("fill", "none")
  	
  } 
  
  function groupBubbles() {
    hideTitles();

    // @v4 Reset the 'x' force to draw the bubbles to the center.
    simulation.force('x', d3.forceX().strength(forceStrength).x(w / 2));

    // @v4 We can reset the alpha value and restart the simulation
    simulation.alpha(1).restart();
  }
  
 
})
