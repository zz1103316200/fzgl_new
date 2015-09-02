var $chrt_border_color = "#efefef";
      var $chrt_grid_color = "#DDD"
      var $chrt_main = "#E24913";
      /* red       */
      var $chrt_second = "#6595b4";
      /* blue      */
      var $chrt_third = "#FF9F01";
      /* orange    */
      var $chrt_fourth = "#7e9d3a";
      /* green     */
      var $chrt_fifth = "#BD362F";
      /* dark red  */
      var $chrt_mono = "#000";

var Topology = function () {



    return {

        //main function
        init: function () {  
            var pWidth=  $(".svg-here").css("width");
            var pheight = $(".svg-here").css("height");
            var width =  Number(pWidth.slice(0,pWidth.length-2)),
                height = 440;

//d3.scale.category20鐢�0绉嶉鑹叉瀯寤轰竴涓猳rdinal鍙樻崲
var color = d3.scale.category10();

//d3.layout.force鑺傜偣锛坣ode锛夊熀浜庣墿鐞嗘ā鎷熺殑浣嶇疆杩炴帴銆�
var force = d3.layout.force()
    .charge(-300)
    .linkDistance(50)
    .size([width, height]);

//浠庡綋鍓嶆枃妗ｄ腑閫夋嫨涓�郴鍒楀厓绱�
var svg = d3.select(".svg-here").append("svg")
    .attr("width", width)
    .attr("height", height);

var graph;
var alertData;


function getGdata() {

 var data;//=JSON.parse('{"nodes":[{"name":"","value":"10","group":"1"},{"name":"鐢垫姉绯荤粺","value":"8","group":"2"},{"name":"闆疯揪绯荤粺","value":"8","group":"2"},{"name":"甯綅1_192.168.0.12","value":"6","group":"3"},{"name":"甯綅2_192.168.0.14","value":"6","group":"3"},{"name":"甯綅3_192.168.0.19","value":"6","group":"3"},{"name":"娴锋儏鏈嶅姟_192.168.0.12_002","value":"4","group":"4"},{"name":"绌烘儏鏈嶅姟_192.168.0.19_003","value":"4","group":"4"},{"name":"闆疯揪鏈嶅姟_192.168.0.15_006","value":"4","group":"4"}],"links":[{"source":1,"value":10,"target":0},{"source":2,"value":10,"target":0},{"source":3,"value":8,"target":1},{"source":4,"value":8,"target":2},{"source":5,"value":8,"target":2},{"source":6,"value":6,"target":3},{"source":7,"value":6,"target":5},{"source":8,"value":6,"target":4}]}');

	 $.ajax({
		 type:"post",
		 url:"./newServlet/yxjk_3_1_topolgy_Servlet",
		 success:function(data1){
		//	 alert(data1);
			 data_s = JSON.parse(data1);
			 
			 data = data_s.ToPo;
			 

	 var n = data.nodes.length;
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
	       .attr("class", "node")

	       ;   

	    graph.draggedThreshold = d3.scale.linear()
        .domain([0, 0.1])
        .range([5, 20])
        .clamp(true);

    function dragged(d) {
        var threshold = graph.draggedThreshold(force.alpha()),
            dx        = d.oldX - d.px,
            dy        = d.oldY - d.py;
        if (Math.abs(dx) >= threshold || Math.abs(dy) >= threshold) {
            d.dragged = true;
        }
        return d.dragged;
    }

	    force.drag = d3.behavior.drag()
        .origin(function(d) { return d; })
        .on('dragstart', function(d) {
            d.oldX    = d.x;
            d.oldY    = d.y;
            d.dragged = false;
            d.fixed |= 2;
        })
        .on('drag', function(d) {
            if((d3.event.x >700) ){
        
              d.px = 700;
            }else if(d3.event.x< 0){
            
              d.px = 0;
            }else{
              d.px = d3.event.x;
            }
            if(d3.event.y >  400 ){
              d.py = 350;
            }else if(d3.event.y< 0){
               d.py = 0;
            }else{
               d.py = d3.event.y;
            }

               if (dragged(d)) {
                  if (!force.alpha()) {
                      force.alpha(.025);
                  }
              }
              
            
        })
        .on('dragend', function(d) {

        });
	  var circle = svg.selectAll("g")
	   .append("image")
	   .attr("xlink:href",function(d){
	     if(d.value == "10"){
        	return "img/add/1.png";
         }else if(d.value == "8"){ 
			return "img/add/2.png";
         }else if(d.value == "6"){
            return "img/add/3.png";
         }else if(d.value == "4"){
            return "img/add/4.png";
         }
	      })
    	.attr("src",function(d){

  	    if(d.value == "10"){
			return "img/add/1.png";
         }else if(d.value == "8"){ 
			return "img/add/2.png";      
         }else if(d.value == "6"){
            return "img/add/3.png";
         }else if(d.value == "4"){
            return "img/add/4.png";
         }
	     })
        .attr("width",function(d){
          if(d.value=="10")
          {
            return 150;
          }else{
            return 60;
          }
        })
        .attr("height",60)
        .call(force.drag);

	 	node.attr("title",function(d) { return d.name; })
	 	;

	   var text=svg.selectAll("g")
	      .append("text")     
	      .style('fill', 'black').style('stroke', 'black').style('stroke-width', '1px').style('font-size', '16px').style("font-family",'Microsoft YaHei')
        .text(function(d) { return d.name.split("_")[d.name.split("_").length-1]; });
	 
	 
	   //鐩戝惉甯冨眬浣嶇疆鐨勫彉鍖栥�(浠呮敮鎸�start","step","end"涓夌浜嬩欢)
	   force.on("tick", function() {
	    link.attr("x1", function(d) { return d.source.x+40; })
	        .attr("y1", function(d) { return d.source.y; })
	        .attr("x2", function(d) { return d.target.x+40; })
	        .attr("y2", function(d) { return d.target.y; });

	    circle.attr("x", function(d) { return d.x; })
	        .attr("y", function(d) { return d.y; });
	        
         text.attr("x", function(d) { return d.x+10; })
        .attr("y", function(d) { return d.y+90; })
        .call(force.drag);      
	        
	  }); 
	  
	   
//	    force.start();
//	    for (var i = n; i > 0; --i) force.tick();
//	    force.stop();
	  
	  //});
		 }
	 });

}

getGdata();



  
  


           
        }
    

    };

}();




