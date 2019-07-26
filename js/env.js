var margin_ = {top: 20, right: 30, bottom: 20, left: 30};

var width_ = 600 - margin_.left - margin_.right,
    height_ = 400 - margin_.top - margin_.bottom;

var chart = d3.select("body")
  .select(".environmentsection")
  .append("svg")
  .lower()
  .attr("id", "envchart")
  .attr("width", width_ + margin_.left + margin_.right)
  .attr("height", height_ + margin_.top + margin_.bottom)


d3.json("env.json").then(function(data) {

  let decadeEnv = d3.nest()
      .key(d => d.decade)
      .entries(data)

// appending the the step for each stack
    decadeEnv.forEach(decade => {
      let total = 0
      decade.values.forEach(subcat => {
        subcat.startY = total
        total += subcat.count
      })
      decade.total = total
    })


//building the scale
    let yScale = d3.scaleLinear()
                .domain([0, 20])
                .range([0, 150])

    let bandScaleEnv = d3.scaleBand()
        .domain(['The 70s', 'The 80s', 'The 90s', 'The Early 2000s'])
        .range([10, width_])

// listing out the legend values
    var subcats = ["Cleanliness", "Dengue Prevention", "Food Hygiene", "Sars Education", "Sustainability", "Toilet Hygiene"]
    var envcolors = ["#10ac84", "#ee5253", "#ffbe76", "#8395a7", "#badc58", "#54a0ff"];

// tooltip
var div = d3.select("body").append("div") 
    .attr("class", "envtooltip")       
    .style("opacity", 0);

//  draw the chart
    chart.selectAll("g.subcat")
      .data(decadeEnv).enter()
      .append("g")
      .attr("class", "subcat")
      .selectAll("rect")
      .data(d => d.values).enter()
      .append("rect")
      .attr("class", "envsubcat")
      .attr("fill", d => envcolors[subcats.indexOf(d.subcat)])
      .attr("height", d => yScale(d.count))
      .attr("width", 60)
      .attr('x', function(d) {return bandScaleEnv(d.decade);})
      .attr("y", d => yScale(d.startY))

d3.selectAll(".envsubcat")
    .on("mouseover.count", function(d) {    
        div.transition()    
        .duration(200)    
        .style("opacity", .9);    
        div .html(d.count)  
        .style("left", (d3.event.pageX + 10) + "px")   
        .style("top", (d3.event.pageY - 28) + "px")
        d3.select(this)
        .attr("stroke","#009432")
        .attr("stroke-width", 4)
        .raise()
        })          
    .on("mouseout", function(d) {   
        div.transition()    
        .duration(500)    
        .style("opacity", 0)
        d3.select(this)
        .attr("stroke","none")
        })

d3.selectAll(".envsubcat")
  .on("mouseover.posters", d => vm.envGallery = d.imgfull)


// flipping the chart because i am noob
    chart.selectAll("g.subcat")
      .attr("transform", "translate(38,360) scale(1,-1)")

//putting in the x axis
    chart.append('g')
      .call(d3.axisBottom(bandScaleEnv))
      .attr('transform', `translate(0, ${height_})`)
      .attr("class", "yearAxis")

// legend stuff
let legendenv = chart.selectAll(".legend")
        .data(subcats) 
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(50," + Math.abs((i + 2) * 23) + ")"});

    legendenv.append("rect")
        .attr("x", 5 )
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", function(d, i) { return envcolors[i];});

    var labelenv = ["Cleanliness", "Dengue", "Food Hygiene", "SARS", "Sustainability", "Toilet Hygiene"];

    legendenv.append("text")
        .attr("x", 30)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function(d, i) { return labelenv[i]; });
});

// decadeEnv[0].values[0].imgfull[0]
// decadeEnv[0].key
// decadeEnv[0].values[0].subcat