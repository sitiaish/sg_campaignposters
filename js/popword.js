d3.json("popkeywords.json").then(function(data) {

	d3.selectAll("text.pop-keywords")
	    .on("mouseover", function (d) {
	      keyword = d3.select(this).html()
	      vm.imagespop =  data[keyword].img
	      vm.parapop = data[keyword].text 
	      vm.keywordpop = keyword
	      d3.select(this)
	      .transition(200)
	      .style("fill", "#535c68")

	})

});