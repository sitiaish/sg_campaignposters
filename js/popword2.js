d3.json("popkeywords2.json").then(function(data) {

	d3.selectAll("text.pop-keywords2")
	    .on("mouseover.image", function () {
	      keyword = d3.select(this).html()
	      vm.imagespop2 =  data[keyword].img
	      vm.parapop2 = data[keyword].text 
	      vm.keywordpop2 = keyword
	      d3.select(this)
	      .classed("popwordHovered", true)
	    .on("mouseout.image", function() {
	      d3.select(this)
	      .classed("popwordHovered", false)
	    })


	})

	for (let k in data) {
		d3.select("#" + data[k].id)
			.on("mouseover.infobox", function() {
				// d3.select("#test").classed("show", true)
				d3.select("#threedesc").style("height", "350px");
				// $('.ui.accordion').accordion()'open', keys.indexOf(k));
			})
			// .on("mouseout.infobox", function() {
			// 	// d3.select("#test").classed("show", false)
			// 	d3.select("#test")
			// 	.style("height", "0px");
			// })
	}

});