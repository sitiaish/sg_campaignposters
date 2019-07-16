var margin_ = {top: 20, right: 160, bottom: 35, left: 30};

var width_ = 960 - margin_.left - margin_.right,
    height_ = 500 - margin_.top - margin_.bottom;

var chart = d3.select("body")
  .append("svg")
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

    //console.log(decadeEnv[0].values)

//buildings the scale
    yScale = d3.scaleLinear()
                .domain([0, 20])
                .range([0, 200])
    xScale = d3.scaleLinear()
              .domain([0, 5])
              .range([0, 500])

// listing out the legend values
    var subcats = ["cleanliness", "dengue", "foodhygeine", "others", "sars", "sustain", "toilet"]
    var colors = ["#b33040", "#d25c4d", "#f2b447", "#d9d574", "#FF0000", "#00FF00", "#0000FF"];

//  draw the chart
    chart.selectAll("g.subcat")
      .data(decadeEnv).enter()
      .append("g")
      .attr("transform", (d, i) => "translate(" + xScale(i) + "," + (400 - yScale(d.total)) + ")")
      .attr("class", "subcat")
      .selectAll("rect")
      .data(d => d.values).enter()
      .append("rect")
      .attr("fill", d => colors[subcats.indexOf(d.subcat)])
      .attr("height", d => yScale(d.count))
      .attr("value", d => d.subcat)
      .attr("width", 80)
      .attr("x", 0)
      .attr("y", d => yScale(d.startY))


});