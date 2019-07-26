var margin_health1 = {top: 20, right: 30, bottom: 20, left: 30};

var width_health1 = 700 - margin_.left - margin_.right,
    height_health1 = 80 - margin_.top - margin_.bottom;

var chart_health = d3.select("body")
  .select(".healthsection")
  .append("svg")
  .lower()
  .attr("id", "healthchart1")
  .attr("width", width_health1 + margin_.left + margin_.right)
  .attr("height", height_health1 + margin_.top + margin_.bottom)

d3.json("health2.json").then(function(data) {

	let total = 0
	data.forEach(subcat => {
		subcat.startY = total
		total += subcat.count
	})

    var subcats = ["Abortion", "Eyecare", "Safety", "Blooddonation", "Breastfeeding", "Spitting", "Children", "Mental Wellness", "Sars Education", "Service", "Personal Hygiene", "Healthy Lifestyle", "Healthy Diet", "Aids", "Publicity Posters", "Dental Care", "Diseases", "Smoking"]

    var colours = ["#ff7979", "#ffbe76", "#ff7979", "#badc58", "#dff9fb", "#f9ca24", "#f0932b", "#eb4d4b", "#6ab04c", "#c7ecee", "#7ed6df", "#e056fd", "#686de0", "#30336b", "#95afc0", "#22a6b3", "#be2edd", "#4834d4"]
    

	let healthScale = d3.scaleLinear()
						.domain([0, total])
						.range([30, 670])

	chart_health.selectAll("rect")
		.data(data).enter()
		.append("rect")
		.attr("class", "healthsubcats")
		.attr("height", height_health1)
		.attr("width", d => healthScale(d.count*2))
		.attr('x', d => healthScale(d.startY))
      	.attr("y", 20)
      	.attr("fill", d => colours[subcats.indexOf(d.subcat)])
      	
});