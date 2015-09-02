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
            var width =  1150,
                height = 600;

	//d3.scale.category20用20种颜色构建一个ordinal变换
	var color = d3.scale.category10();

	//d3.layout.force节点（node）基于物理模拟的位置连接。
	var force = d3.layout.force()
	    .charge(-300)
	    .linkDistance(80)
	    .size([width, height]);

	//从当前文档中选择一系列元素
	var svg = d3.select(".svg-here").append("svg")
	    .attr("width", width)
	    .attr("height", height);

	var graph;
	var alertData;
	function showAreaGraph2(data){
		//alert("areagraph data : " + data);
		// area graph 鏈嶅姟璁块棶閲�
		if ($('#area-graph-2').length) {
			Morris.Area({
				element : 'area-graph-2',
				data : data,
				xkey : 'x',
				ykeys : ['y'],
				labels : ['Y']
			});
		}
	}
	function getAreaGraph2(serviceVisitTimes,timeStr){
		var data = new Array();
		
		for (i = 1 ; i <= serviceVisitTimes.length; i++) {

			data.push({
			x :timeStr[i-1],
			y : serviceVisitTimes[i-1]
			});
		};
		//alert(data.length);
		return data;
	}
	function showBarChar2(serviceRunTime,ordTime){
		if ($("#bar-chart-2").length) {
			//alert(totalString.sysList.length);
			var data1 = [];
			for (var i = 0; i <serviceRunTime.length; i += 1)
				data1.push([i, serviceRunTime[i]]);
			
			var ds = new Array();

			ds.push({
				data : data1,
				bars : {
					show : true,
					barWidth : 0.2,
					order : 1,
				}
			});

			//Display graph
			$.plot($("#bar-chart-2"), ds, {
				colors : [$chrt_second, $chrt_fourth, "#666", "#BBB"],
				grid : {
					show : true,
					hoverable : true,
					clickable : true,
					tickColor : $chrt_border_color,
					borderWidth : 0,
					borderColor : $chrt_border_color,
				},
				legend : true,
				tooltip : true,
				tooltipOpts : {
					content : "<b>%x</b> = <span>%y</span>",
					defaultTheme : false
				}

			});

		}
		for (var i = 0; i < 11; i += 1){
			//alert(ordTime[i]);
			if(i%2==0){
				$("#bar-chart-2 div.tickLabels div.xAxis div.tickLabel").eq(i).html(ordTime[i/2]);
			}else{
				$("#bar-chart-2 div.tickLabels div.xAxis div.tickLabel").eq(i).html(" ");
			}
			
		}
	}
function getGdata() {

	//var data=JSON.parse('{"nodes":[{"name":"","value":"10","group":"1"},{"name":"电抗系统","value":"8","group":"2"},{"name":"雷达系统","value":"8","group":"2"},{"name":"席位1","value":"6","group":"3"},{"name":"席位2","value":"6","group":"3"},{"name":"席位3","value":"6","group":"3"},{"name":"海情服务","value":"4","group":"4"},{"name":"空情服务","value":"4","group":"4"},{"name":"雷达服务","value":"4","group":"4"}],"links":[{"source":1,"value":10,"target":0},{"source":2,"value":10,"target":0},{"source":3,"value":8,"target":1},{"source":4,"value":8,"target":2},{"source":5,"value":8,"target":2},{"source":6,"value":6,"target":3},{"source":7,"value":6,"target":5},{"source":8,"value":6,"target":4}]}');
	var data;
	$.ajax({
		type:"post",
		url:"./newServlet/ToPolgyServlet",
		success:function(data1){
			//alert(data1);
			data =JSON.parse(data1);
		
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
	  .attr("class", "node");   



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

    //添加拖拽事件
    force.drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on('dragstart', function(d) {
        d.oldX    = d.x;
        d.oldY    = d.y;
        d.dragged = false;
        d.fixed |= 2;
    })
    .on('drag', function(d) {

		// // alert(x.left+1200);
		// // alert(d3.event.x);
    	if((d3.event.x > 950) ){
    		
    		d.px = 950;
    	}else if(d3.event.x< 0){
    	
    		d.px = 0;
    	}else{
    		d.px = d3.event.x;
    	}
    	if(d3.event.y >  500 ){
    		d.py = 500;
    	}else if(d3.event.y<0){
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
    	var data_s;
 		var data_i;
 		var data_array = new Array();
 		var data_d;
         if (!dragged(d)) {

         	if(d.value == "6"){
         		$('.page2').dialog('open');
         		var nodeip = d.name.split("_")[2];
         		//alert(nodeip);
         		// area graph 1
         		
         		$("#area-graph-3").empty();
         		$("#area-graph-4").empty();
         		$.ajax({
         			type:"post",
         			url:"./newServlet/nodeCpuMem",
         			data:{nodeip:nodeip},
         			datatype:"json",
         			success:function(data){
         				var count=0;

         				data_s = JSON.parse(data);
         				data_i = data_s.nodecpumem;
         				//alert(data);
         				//alert(data_i);
         				for(var jj=0;jj<data_i.length;jj++){
         					data_array.push({
         						"time":data_i[jj].time,
         						"CPU":data_i[jj].cpu,
         						"memory":data_i[jj].memory
         					});
         				}
         				if ($('#area-graph-3').length) {
        					data_ii = [{"time":"2014-08-03 14:59:48","cpu":"0.0%","memory":"17.52%"},{"time":"2014-08-03 14:59:33","cpu":"0.0%","memory":"17.55%"},{"time":"2014-08-03 14:59:18","cpu":"0.0%","memory":"17.56%"},{"time":"2014-08-03 14:59:03","cpu":"0.0%","memory":"17.60%"},{"time":"2014-08-03 14:58:48","cpu":"3.0%","memory":"17.49%"},{"time":"2014-08-03 14:58:33","cpu":"0.0%","memory":"17.51%"},{"time":"2014-08-03 14:58:18","cpu":"0.0%","memory":"17.46%"},{"time":"2014-08-03 14:58:03","cpu":"0.0%","memory":"17.48%"},{"time":"2014-08-03 14:57:48","cpu":"1.5%","memory":"17.44%"},{"time":"2014-08-03 14:57:33","cpu":"1.5%","memory":"17.49%"}];
        					//alert("area-graph-1"+$('#area-graph-1'));
        					//alert(data_array);
        					Morris.Area({
        						element : 'area-graph-3',
        						data : data_array,
        						xkey : 'time',
        						ykeys : ['CPU', 'memory'],
        						labels : ['CPU', '内存']
        					
        					});
        					
        					
        				}
         			}
         		});
				
				$.ajax({
         			type:"post",
         			url:"./newServlet/nodeHarddisk",
         			data:{nodeip:nodeip},
         			success:function(data){
         				
         				data_s = JSON.parse(data);
         				data_d = data_s.nodeharddisk;

         				for(var jj=0;jj<data_d.length;jj++){
         					data_array.push({
         						"time": data_d[jj].time,
         						"harddisk": data_d[jj].harddisk
         					});
         				}
         			
        				if ($('#area-graph-4').length) {
        					Morris.Area({
        						element : 'area-graph-4',
        						data : data_d,
        						xkey : 'time',
        						ykeys : ['harddisk'],
        						labels : ['硬盘']
        					});
        				}
         			}
         		});
				

         	}else if(d.value == "4"){
         		$('.page3').dialog('open');
         		// area graph
         		$("#area-graph-2").empty();
         		$("#bar-char-2").empty();
				var service = d.name.split("_");
				var serviceid = service[service.length-1];
				//alert("serviceid:" + serviceid);
					
				  $.post("./newServlet/yxjk_3_3_12_fwxq_Servlet",{serviceID:serviceid},function(text){
	     				//alert("sdsd");
	     				//寰楀埌鍥惧舰BarChar
	     				showBarChar2(text.SingleServiceRunTime,text.ordTime1);
	     				//鑾峰緱AreaGraph鐨刣ata锛屽苟寰楀埌鍥惧舰
	     				var data_area = getAreaGraph2(text.SingleServiceCallQuantity,text.ordTime);
	     				showAreaGraph2(data_area);
	     				//鏄剧ずxy杞寸殑鍧愭爣
	     				//setTimeout("showXY()", 500);
	     				
	                }
	                );

				/* end bar chart */
         	}
         	
          
        }
    });

    //将节点以图片的形式展现出来
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
			return 200;
		}else{
			return 80;
		}
	})
	.attr("height",80)
	.call(force.drag);

	node.attr("title",function(d) { return d.name; });

   var text=svg.selectAll("g")
      .append("text")     
      .style('stroke', 'black').style('font-size', '16px').style("font-family",'Microsoft YaHei')
      .text(function(d) { return d.name.split("_")[d.name.split("_").length-1]; });
	 
	 
   //监听布局位置的变化。(仅支持"start","step","end"三种事件)
   force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x+40; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x+40; })
        .attr("y2", function(d) { return d.target.y; });

    circle.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; });
        
     text.attr("x", function(d) { return d.x+10; })
    .attr("y", function(d) { return d.y+95; })
    .call(force.drag);      
        
  }); 
		}
	});  
	   


}
// $(".readgraph").click(function(){
// 	var serviceid = $(this).parent().parent().attr("id");

// 	//通过ajax向后台请求拓扑结构的数据
// 	$.ajax({
// 		type:"post",
// 		url:,
// 		data:{serviceid:serviceid},
// 		success:function(data){
			
// 		}
// 	});
	
// });
// getGdata(data);
// $(".dialog-message").dialog("open");
getGdata();

        }

    };

}();




