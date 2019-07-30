var margin_pop = {top: 20, right: 30, bottom: 20, left: 50};

var width_pop = 650 - margin_pop.left - margin_pop.right,
    height_pop = 400 - margin_pop.top - margin_pop.bottom;

var chart_pop = d3.select(".populationsection")
  .append("svg")
  .attr("id", "popchart")
  .attr("width", 600)
  .attr("height", height_pop + margin_pop.top + margin_pop.bottom)

d3.json("tfr.json").then(function(data) {

  data.forEach(function(d) {
      d.year = +d.year;
      d.tfr = +d.tfr;
  });

// set the ranges
let x = d3.scaleLinear()
	.domain([1960, 2017])
	.range([60, width_pop])

let y = d3.scaleLinear()
    .domain([6, 0]) // input 
    .range([30, height_pop]) // output 

// line

chart_pop.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 2.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.year) })
        .y(function(d) { return y(d.tfr) })
        )
      .attr('transform', `translate(0,0)`)


// Add the X Axis
chart_pop.append("g")
  .call(d3.axisBottom(x))
  .attr('transform', `translate(0, ${height_pop})`)

// Add the Y Axis
chart_pop.append("g")
  .call(d3.axisLeft(y))
  .attr('transform', "translate(60,0)")

//add period boxes
chart_pop.append("rect")
  .attr("class", "phase1")
  .attr("x", 60)
  .attr("y", 20)
  .attr("width", 195)
  .attr("height", height_pop-20)
  .attr("fill", "#22a6b3")
  .attr("fill-opacity", 0.35)
  .on("mouseover", d => vm.phase = "Stop At Two Policy. Two is Enough.")
  .on("mouseover.desc", d => vm.phaseDesc = "Baby booming phase post independence. To prevent burdening the still developing economy with overpopulation, the state legalised abortion. Couples were encouraged to build two-child families. Those who opted for sterilisation after the second child are given $10,000.")
  .on("mouseover.pic", d => vm.phaseImg = "./img/1.jpg")
  .on("mouseover.col", function(d) {
    d3.select(this)
      .attr("fill-opacity", 0.6)
  })
  .on("mouseout.col", function(d) {
    d3.select(this)
      .attr("fill-opacity", 0.35)
  })

chart_pop.append("rect")
  .attr("class", "phase2")
  .attr("x", 255)
  .attr("y", 20)
  .attr("width", 55)
  .attr("height", height_pop-20)
  .attr("fill", "blue")
  .attr("fill-opacity", 0.35)
  .on("mouseover", d => vm.phase = "The Eugenics Phase")
  .on("mouseover.desc", d => vm.phaseDesc = "“Lopsided” trend of procreation caused by better-educated women having fewer children. Hence, social and financial incentives were introduced to encourage more graduate singles to settle down and have children. The Social Development Unit was established to network graduate singles together. The Graduate Mother’s Scheme gives priority for primary school admissions for students whose parents are graduates.")
  .on("mouseover.pic", d => vm.phaseImg = "./img/21.jpg")
  .on("mouseover.col", function(d) {
    d3.select(this)
      .attr("fill-opacity", 0.6)
  })
  .on("mouseout.col", function(d) {
    d3.select(this)
      .attr("fill-opacity", 0.35)
  })

chart_pop.append("rect")
  .attr("class", "phase3")
  .attr("x", 310)
  .attr("y", 20)
  .attr("width", 110)
  .attr("height", height_pop-20)
  .attr("fill", "red")
  .attr("fill-opacity", 0.35)
  .on("mouseover", d => vm.phase = "Have Three Or More...If You Can Afford It")
  .on("mouseover.desc", d => vm.phaseDesc = "Active encouragement of having more than three children per family to increase the total replacement rate that have since dropped to 1.7 children per female in Singapore. ")
  .on("mouseover.pic", d => vm.phaseImg = "./img/28.jpg")
  .on("mouseover.col", function(d) {
    d3.select(this)
      .attr("fill-opacity", 0.6)
  })
  .on("mouseout.col", function(d) {
    d3.select(this)
      .attr("fill-opacity", 0.35)
  })


chart_pop.append("rect")
  .attr("class", "phase4")
  .attr("x", 420)
  .attr("y", 20)
  .attr("width", 150)
  .attr("height", height_pop-20)
  .attr("fill", "purple")
  .attr("fill-opacity", 0.35)
  .on("mouseover.title", d => vm.phase = "Baby Bonus and Other Pro-Natal Policies")
  .on("mouseover.desc", d => vm.phaseDesc = "Introduction of more incentives to encourage Singaporeans to settle down and start a family. The ‘Baby Bonus’ or more formally known as The Child Development Co-savings Scheme was launched in 2000 to provide financial incentives and, extended maternity and paternity leaves among other benefits to encourage procreation.")
  .on("mouseover.pic", d => vm.phaseImg = "./img/33.jpg")
  .on("mouseover.col", function(d) {
    d3.select(this)
      .attr("fill-opacity", 0.6)
  })
  .on("mouseout.col", function(d) {
    d3.select(this)
      .attr("fill-opacity", 0.35)
  })


chart_pop.append("text")
  .text("Year")
  .attr('x', width_pop/2)
  .attr('y', height_pop+35)
  .attr('font-size',"1.1em")

chart_pop.append("text")
  .text("Total Fertility Rate")
  .attr('x', 80)
  .attr('y', -10)
  .attr("transform", "rotate(90)")
});

