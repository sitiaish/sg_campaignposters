let hoverableVar = {
	props: ["img", "content"],
	data: function() {
		return {}
	},
	methods: {
		showPoster: function() {
			
			d3.select("#posterSide > img")
				.attr("src", this.img)
			d3.select("#posterSide")
			    // .style("opacity", 1)
				.style("display", "block")
				.transition()		
			    .duration(0)
			    .style("opacity", 1)
				
		},
		hidePoster: function() {
			d3.select("#posterSide")
				// .style("display", "none")
			    .transition()		
			    .duration(1000)
			    .style("opacity", 0)
		}
	},
	template: `<span class="hoverableThing" @mouseover="showPoster" @mouseout="hidePoster">{{ content }}</span>`
} 