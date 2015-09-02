var Topology = function () {



    return {

        //main function
        init: function () {  
            var pWidth=  $(".svg-here").css("width");
            var width =  Number(pWidth.slice(0,pWidth.length-2)),
                height =800;


var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-800)
    .linkDistance(70)
    .size([width, height]);

var svg = d3.select(".svg-here").append("svg")
    .attr("width", width)
    .attr("height", height);

var graph;
var alertData;

function updateAlertInfo() {
    var alertBar=$("#header_notification_bar");              
    alertBar.find(".badge").html(alertData.length);

    var list=alertBar.find("li");
    $(list[0]).find("p").html("今天最近有"+alertData.length+"条警报");

    var alertTemplate=alertBar.find(".template");
    for (var i = 0; i < alertData.length; i++) {
      var newAlert=alertTemplate.clone().removeClass("template");
      newAlert.find("small").html(alertData[i][3]);
      newAlert.find(".time").html(alertData[i][1].split(" ")[1]);
      alertBar.find(".dropdown-menu-list").append(newAlert);
    }
    alertTemplate.hide();              
  }

function getGdata() {
	
    $.post("servlet/yxjk_9_warning_Servlet",null,function(data) {
  	  alertData=data.warnings;            	
  	  updateAlertInfo();
      });
    
	
 $.post("servlet/yxjk_6_tp_Servlet",null,function(data) {
	 	//alert(data.length);
	 	graph=data;
	 	force.nodes(graph.nodes)
	      .links(graph.links)
	      .size([width,height])
	      .start();

	  var link = svg.selectAll(".link")
	      .data(graph.links)
	    .enter().append("line")
	      .attr("class", "link")
	      .style("stroke-width", function(d) { return d.value; });
	      
	  var node = svg.selectAll("g")
	      .data(graph.nodes)
	    .enter().append("g")     
	       .attr("class", "node");   

	  var circle = svg.selectAll("g")
	      .append("circle")     
	       .attr("r",function(d) { return Number(d.value)*4+20; })
	       .style("fill", function(d) { return color(d.group); })
	       .call(force.drag);       
	      
	  node.append("title")
	      .text(function(d) { return d.name; });
	       
	   var text=svg.selectAll("g")
	      .append("text")     
	      .style('fill', 'black').style('stroke', 'black').style('stroke-width', '1px').style('font-size', '16px').text(function(d) { return d.name.split("_")[d.name.split("_").length-1]; })
	       .call(force.drag); 
	  
	  
	 

	   force.on("tick", function() {
	    link.attr("x1", function(d) { return d.source.x; })
	        .attr("y1", function(d) { return d.source.y; })
	        .attr("x2", function(d) { return d.target.x; })
	        .attr("y2", function(d) { return d.target.y; });

	    circle.attr("cx", function(d) { return d.x; })
	        .attr("cy", function(d) { return d.y; });
	        
	         text.attr("x", function(d) { return d.x-20; })
	        .attr("y", function(d) { return d.y; });      
	        
	  }); 
	  
	    node.on("mouseover",function(){
	      d3.select(this).select("circle")
	      .transition()
	      .attr("r",function(d) {return (Number(d.value)*4+20)*1.2;}) 
	      d3.select(this).select("text")
	      .transition()
	     .style('font-size', '20px');
	  });
	  
	    node.on("mouseout",function(){
	      d3.select(this).select("circle")
	      .transition()
	      .attr("r",function(d) {return Number(d.value)*4+20;});
	      d3.select(this).select("text")
	      .transition()
	     .style('font-size', '16px');
	  }); 
  });

}

getGdata();

//var graph=JSON.parse('{"nodes":[{"name":"center","value":"10","group":"1"},{"name":"sys1","value":"8","group":"2"},{"name":"sys2","value":"8","group":"2"},{"name":"sys1_192.168.0.96","value":"6","group":"3"},{"name":"sys2_192.168.0.92","value":"6","group":"3"},{"name":"sys2_192.168.0.93","value":"6","group":"3"},{"name":"192.168.0.96_Axis2","value":"4","group":"4"},{"name":"192.168.0.93_Tomcat","value":"4","group":"4"},{"name":"192.168.0.92_Tomcat","value":"4","group":"4"},{"name":"192.168.0.96_Axis2_addService","value":"2","group":"5"},{"name":"192.168.0.93_Tomcat_SubService","value":"2","group":"5"},{"name":"192.168.0.92_exe_exeService","value":"2","group":"5"}],"links":[{"source":1,"value":10,"target":0},{"source":2,"value":10,"target":0},{"source":3,"value":8,"target":1},{"source":4,"value":8,"target":2},{"source":5,"value":8,"target":2},{"source":6,"value":6,"target":3},{"source":7,"value":6,"target":5},{"source":8,"value":6,"target":4},{"source":9,"value":4,"target":6},{"source":10,"value":4,"target":7},{"source":11,"value":4,"target":4}]}');

  
  


           
        }
    

    };

}();




