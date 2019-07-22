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
			    .style("opacity", 1)
				.style("display", "block")
				
		},
		hidePoster: function() {
			d3.select("#posterSide")
			    .transition()		
			    .duration(300)
			    .style("opacity", 0)
		}
	},
	template: `<span class="hoverableThing" @mouseover="showPoster" @mouseout="hidePoster">{{ content }}</span>`
} 