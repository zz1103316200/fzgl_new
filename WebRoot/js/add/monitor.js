 /*chart colors default */
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
var totalData;
//var serviceName ="aaa";
var serviceVisitTime = [[1,1,1,"addservice001",1,"addservice001"],[2,3,1,"addservice002",1,"addservice003"],[1,3,5,"addservice004",1,"addservice001"],[1,4,5,"addservice001",1,"addservice001"],[1,1,1,"addservice001",1,"addservice001"],[1,1,1,"addservice001",1,"addservice001"],[1,1,1,"addservice001",1,"addservice001"],[1,1,1,"addservice001",1,"addservice001"],[1,1,1,"addservice001",1,"addservice001"]];
var serviceTime = ["2014-10-26 21:23:40","2014-10-15 17:34:49","2014-10-04 13:45:58","2014-11-12 02:59:55","2014-10-31 23:11:04","2014-10-20 19:22:13","2014-10-09 15:33:22","2014-11-17 04:47:19","2014-11-06 00:58:28","2014-10-25 21:09:37"];
//var serviceCallTime = [2,1,2,5,6,8,1,0,0,0];
//var nodeServiceAmount = [{"IP":"192.168.0.201","amount":6},{"IP":"192.168.0.202,192","amount":0},{"IP":"192.168.0.205","amount":0}];
//var cpu_rom = [{"IP":"192.168.0.201","cpu":"48.5%","ram":"88.6%"},{"IP":"192.168.0.202","cpu":"12%","ram":"55%"},{"IP":"192.168.0.203","cpu":"56%","ram":"59%"}];
$(document).ready(function() {
	// DO NOT REMOVE : GLOBAL FUNCTIONS!
	// $.ajax({
	// 	type:"post",
	// 	url:"./newServlet/yxjk_3_1_littlePic_Servlet",
	// 	success:function(data){

	// 		var serNum = "";
	// 		for(var i=0 ; i<data.serDetail.length; i++){
	// 			serNum +=data.serDetail[i]+",";
	// 		}
	// 		var sysNum = "";
	// 		for(var i=0 ; i<data.sysDetail.length; i++){
	// 			sysNum +=data.serDetail[i]+",";
	// 		}
	// 		var nodeNum = "";
	// 		for(var i=0 ; i<data.nodeDetail.length; i++){
	// 			nodeNum +=data.serDetail[i]+",";
	// 		}
	// 		$("#servicenum").append("<h5 style='font-family:Microsoft YaHei'> 服务总数 <span class='txt-color-blue'>" + data.serviceAmount + "</span></h5>")
	// 						.append("<div class='sparkline txt-color-blue hidden-mobile hidden-md hidden-sm'>" + serNum + "</div>");
	// 		$("#systemnum").append("<h5 style='font-family:Microsoft YaHei'> 系统总数 <span class='txt-color-blue'>" + data.sysAmount + "</span></h5>")
	// 						.append("<div class='sparkline txt-color-blue hidden-mobile hidden-md hidden-sm'>" + sysNum + "</div>");
	// 		$("#nodenum").append("<h5 style='font-family:Microsoft YaHei'> 节点总数 <span class='txt-color-blue'>" + data.nodeAmount + "</span></h5>")
	// 						.append("<div class='sparkline txt-color-blue hidden-mobile hidden-md hidden-sm'>" + nodeNum + "</div>");
	// 		pageSetUp();
	// 	}
	// });
	$.post("./newServlet/yxjk_3_1_jkgl_Servlet",{},function(text){
	
		totalData = text;
		showServiceVisitNum(text.serviceCallQuantity.min,text.serviceCallQuantity_ordTime.min);
		showServiceVisitTime(text.serviceRunTime.min,text.serviceRunTime_ordTime.min);
		showCPUUse(text.cpu_ram.min,text.cpuram_ordTime.min);
		showNodeTotal(text);
    }
    );
 	//绑定服务访问量统计单位里的选项点击事件
 	$("#unit_minute").click(function() {
 		//alert("分");
 		$("#lines-chart").empty();
 		showServiceVisitNum(totalData.serviceCallQuantity.min,totalData.serviceCallQuantity_ordTime.min);
 	});
 	$("#unit_hour").click(function() {
 		//alert("时");
 		$("#lines-chart").empty();
 		showServiceVisitNum(totalData.serviceCallQuantity.hour,totalData.serviceCallQuantity_ordTime.hour);
 	});
 	$("#unit_day").click(function() {
 		//alert("天");
 		$("#lines-chart").empty();
 		showServiceVisitNum(totalData.serviceCallQuantity.day,totalData.serviceCallQuantity_ordTime.day);
 	});
 	$("#unit_week").click(function() {
 		//alert("周");
 		$("#lines-chart").empty();
 		showServiceVisitNum(totalData.serviceCallQuantity.week,totalData.serviceCallQuantity_ordTime.week);
 	});
 	$("#unit_month").click(function() {
 		//alert("月");
 		$("#lines-chart").empty();
 		showServiceVisitNum(totalData.serviceCallQuantity.month,totalData.serviceCallQuantity_ordTime.month);
 	});
 	//绑定服务访问时间统计单位里的选项点击事件
 	$("#unit_time_minute").click(function() {
 		//alert("分");
 		$("#lines-time-chart").empty();
 		showServiceVisitTime(totalData.serviceRunTime.min,totalData.serviceRunTime_ordTime.min);
 	});
 	$("#unit_time_hour").click(function() {
 		//alert("时");
 		$("#lines-time-chart").empty();
 		showServiceVisitTime(totalData.serviceRunTime.hour,totalData.serviceRunTime_ordTime.hour);
 	});
 	$("#unit_time_day").click(function() {
 		//alert("天");
 		$("#lines-time-chart").empty();
 		showServiceVisitTime(totalData.serviceRunTime.day,totalData.serviceRunTime_ordTime.day);
 	});
 	$("#unit_time_week").click(function() {
 		//alert("周");
 		$("#lines-time-chart").empty();
 		showServiceVisitTime(totalData.serviceRunTime.week,totalData.serviceRunTime_ordTime.week);
 	});
 	$("#unit_time_month").click(function() {
 		//alert("月");
 		$("#lines-time-chart").empty();
 		showServiceVisitTime(totalData.serviceRunTime.month,totalData.serviceRunTime_ordTime.month);
 	});
 	//绑定服务访问时间统计单位里的选项点击事件
 	$("#unit_use_minute").click(function() {
 		//alert("分");
 		$("#lines-chart").empty();
 		showCPUUse(totalData.cpu_ram.min,totalData.cpuram_ordTime.min);
 	});
 	$("#unit_use_hour").click(function() {
 		//alert("时");
 		$("#lines-chart").empty();
 		showCPUUse(totalData.cpu_ram.hour,totalData.cpuram_ordTime.hour);
 	});
 	$("#unit_use_day").click(function() {
 		//alert("天");
 		$("#lines-chart").empty();
 		showCPUUse(totalData.cpu_ram.day,totalData.cpuram_ordTime.day);
 	});
 	$("#unit_use_week").click(function() {
 		//alert("周");
 		$("#lines-chart").empty();
 		showCPUUse(totalData.cpu_ram.week,totalData.cpuram_ordTime.week);
 	});
 	$("#unit_use_month").click(function() {
 		//alert("月");
 		$("#lines-chart").empty();
 		showCPUUse(totalData.cpu_ram.month,totalData.cpuram_ordTime.month);
 	});
 	//绑定排序里的选项点击事件
 	$("#sort_ip").click(function() {
 		alert("月");
 		$("#bar-chart-1").empty();
 		showNodeTotal();
 	});
 	$("#sort_name").click(function() {
 		alert("月");
 		$("#bar-chart-1").empty();
 		showNodeTotal();
 	});
 	$("#sort_num").click(function() {
 		alert("月");
 		$("#bar-chart-1").empty();
 		showNodeTotal();
 	});
 	//绑定显示里的选项点击事件
 	$("#show_ip").click(function() {
 		alert("月");
 		$("#bar-chart-1").empty();
 		showNodeTotal();
 	});
 	$("#show_name").click(function() {
 		alert("月");
 		$("#bar-chart-1").empty();
 		showNodeTotal();
 	});

 	showServiceVisitNum(serviceVisitTime,serviceTime);
 	showServiceVisitTime(serviceVisitTime,serviceTime);
 	//showCPUUse();
 	//showNodeTotal();
	pageSetUp();

	Topology.init();
	//setTimeout("showXY()", 500);
	
});
//得到服务访问量chart
function showServiceVisitNum(data,time){
					/* site stats chart */
				var visitTotal = [];
				var avgVisit = [];
				var largeVisit = [];
				var smallVisit = [];
				var xaxisLabel = [];
				var largeVisitName;
				var smallVisitName;
				for (var i = 0; i < data.length; i++) {
					//alert(time[0]);
					//alert(data[i][0]);
					visitTotal.push([i,data[i][0]]);
					avgVisit.push([i,data[i][1]]);
					largeVisit.push([i,data[i][2]]);
					smallVisit.push([i,data[i][4]]);
					xaxisLabel.push([i,time[0]]);
				};
				//console.log(visitTotal);
				if ($("#lines-chart").length) {

					//var pageviews = [[1, 75], [3, 87], [4, 93], [5, 127], [6, 116], [7, 137], [8, 135], [9, 130], [10, 167], [11, 169], [12, 179], [13, 185], [14, 176], [15, 180], [16, 174], [17, 193], [18, 186], [19, 177], [20, 153], [21, 149], [22, 130], [23, 100], [24, 50]];
					//var pageviews1 = [[1, 56], [3, 67], [4, 63], [5, 17], [6, 116], [7, 37], [8, 13], [9, 30], [10, 67], [11, 69], [12, 79], [13, 185], [14, 176], [15, 180], [16, 174], [17, 193], [18, 186], [19, 177], [20, 153], [21, 149], [22, 130], [23, 100], [24, 50]];
					//var visitors = [[1, 5], [3, 50], [4, 73], [5, 100], [6, 95], [7, 103], [8, 111], [9, 97], [10, 125], [11, 100], [12, 95], [13, 141], [14, 126], [15, 131], [16, 146], [17, 158], [18, 160], [19, 151], [20, 125], [21, 110], [22, 100], [23, 85], [24, 37]];
					//var visitors1 = [[1, 87], [3, 58], [4, 77], [5, 10], [6, 95], [7, 13], [8, 11], [9, 97], [10, 15], [11, 110], [12, 95], [13, 141], [14, 126], [15, 131], [16, 146], [17, 158], [18, 160], [19, 151], [20, 125], [21, 110], [22, 100], [23, 85], [24, 37]];
					//console.log(pageviews)
					var plot = $.plot($("#lines-chart"), [{
						data : visitTotal,
						label : "访问总量"
					},{
						data : avgVisit,
						label : "平均访问量"
					},{
						data : largeVisit,
						label : "最高访问量"
					}, {
						data : smallVisit,
						label : "最低访问量"
					}], {
						series : {
							lines : {
								show : true,
								lineWidth : 1,
								fill : false,
								fillColor : {
									colors : [{
										opacity : 0.1
									}, {
										opacity : 0.15
									}]
								}
							},
							points : {
								show : true
							},
							shadowSize : 0
						},
						xaxis : {
							mode : "time",
							//tickLength : 10,
							//timezone:"browser"
						},

						yaxes : [{
							min : 0,
							tickLength : 5
						}],
						grid : {
							hoverable : true,
							clickable : true,
							tickColor : $chrt_border_color,
							borderWidth : 0,
							borderColor : $chrt_border_color,
						},
						tooltip : true,
						tooltipOpts : {
							//content : "%s 在 <b>%x:00 hrs</b> 是 %y",
							content : "%s 是 %y",
							dateFormat : "%y-%0m-%0d",
							defaultTheme : true
						},
						colors : [$chrt_main, $chrt_second],
						xaxis : {
							//ticks:  [[1, "zero"], [5, "one mark"], [8, "two marks"]]
							ticks:xaxisLabel
							// tickFormatter: function(v) {
							// 	return v + " cm";
							// },
							//tickLength:15,
							//tickDecimals : 2
						},
						yaxis : {
							ticks : 10,
							tickDecimals : 0
						},
					});
 					$("#lines-chart").bind("plotclick", function (event, pos, item) {
					    //alert("You clicked at " + pos.x + ", " + pos.y);
					    //alert(item.dataIndex);
					    //alert(data[item.dataIndex][3]);
					    alert(item.seriesIndex);
					    if (item.dataIndex!=null) {
					   		serviceName = data[item.dataIndex][3];
					   		alert(serviceName);
					    };
					    
					    console.log(item);
					    // axis coordinates for other axes, if present, are in pos.x2, pos.x3, ...
					    // if you need global screen coordinates, they are pos.pageX, pos.pageY

					    // if (item) {
					    //     highlight(item.series, item.datapoint);
					    //     alert("You clicked a point!");
					    // }
					});
 					//点击事件，后面也许会用到
 				// 	$("#lines-chart").bind("plotclick", function (event, pos, item) {
					//     alert("You clicked at " + pos.x + ", " + pos.y);
					//     console.log(item);
					//     // axis coordinates for other axes, if present, are in pos.x2, pos.x3, ...
					//     // if you need global screen coordinates, they are pos.pageX, pos.pageY

					//     if (item) {
					//         highlight(item.series, item.datapoint);
					//         alert("You clicked a point!");
					//     }
					// });
				}

				/* end site stats */
}
//得到服务访问时间chart
function showServiceVisitTime(data,time){
				//var visitTotal = [];
				var avgVisit = [];
				var largeVisit = [];
				var smallVisit = [];
				var xaxisLabel = [];
				var largeVisitName;
				var smallVisitName;
				for (var i = 0; i < data.length; i++) {
					//alert(time[0]);
					//alert(data[i][0]);
					//visitTotal.push([i,data[i][0]]);
					avgVisit.push([i,data[i][0]]);
					largeVisit.push([i,data[i][1]]);
					smallVisit.push([i,data[i][2]]);
					xaxisLabel.push([i,time[0]]);
				};
				if ($("#lines-time-chart").length) {

					//var pageviews = [[1, 75], [3, 87], [4, 93], [5, 127], [6, 116], [7, 137], [8, 135], [9, 130], [10, 167], [11, 169], [12, 179], [13, 185], [14, 176], [15, 180], [16, 174], [17, 193], [18, 186], [19, 177], [20, 153], [21, 149], [22, 130], [23, 100], [24, 50]];
					//var pageviews1 = [[1, 56], [3, 67], [4, 63], [5, 17], [6, 116], [7, 37], [8, 13], [9, 30], [10, 67], [11, 69], [12, 79], [13, 185], [14, 176], [15, 180], [16, 174], [17, 193], [18, 186], [19, 177], [20, 153], [21, 149], [22, 130], [23, 100], [24, 50]];
					//var visitors = [[1, 5], [3, 50], [4, 73], [5, 100], [6, 95], [7, 103], [8, 111], [9, 97], [10, 125], [11, 100], [12, 95], [13, 141], [14, 126], [15, 131], [16, 146], [17, 158], [18, 160], [19, 151], [20, 125], [21, 110], [22, 100], [23, 85], [24, 37]];
					//var visitors1 = [[1, 87], [3, 58], [4, 77], [5, 10], [6, 95], [7, 13], [8, 11], [9, 97], [10, 15], [11, 110], [12, 95], [13, 141], [14, 126], [15, 131], [16, 146], [17, 158], [18, 160], [19, 151], [20, 125], [21, 110], [22, 100], [23, 85], [24, 37]];
					//console.log(pageviews)
					var plot = $.plot($("#lines-time-chart"), [{
						data : avgVisit,
						label : "平均调用时间"
					},{
						data : largeVisit,
						label : "最大调用时间"
					},{
						data : smallVisit,
						label : "最小调用时间"
					}], {
						series : {
							lines : {
								show : true,
								lineWidth : 1,
								fill : false,
								fillColor : {
									colors : [{
										opacity : 0.1
									}, {
										opacity : 0.15
									}]
								}
							},
							points : {
								show : true
							},
							shadowSize : 0
						},
						xaxis : {
							mode : null,
							tickLength : 10,
							//timezone:"browser"
						},

						yaxes : [{
							min : 0,
							tickLength : 5
						}],
						grid : {
							hoverable : true,
							clickable : true,
							tickColor : $chrt_border_color,
							borderWidth : 0,
							borderColor : $chrt_border_color,
						},
						tooltip : true,
						tooltipOpts : {
							content : "%s 是 %y",
							dateFormat : "%y-%0m-%0d",
							defaultTheme : true
						},
						colors : [$chrt_main, $chrt_second],
						xaxis : {
							//ticks:  [[1, "zero"], [5, "one mark"], [8, "two marks"]]
							ticks:xaxisLabel
							// tickFormatter: function(v) {
							// 	return v + " cm";
							// },
							//tickLength:5,
							//tickDecimals : 2
						},
						yaxis : {
							ticks : 10,
							tickDecimals : 0
						},
					});

				}

				/* end site stats */
}
//得到CPU内存占用率chart
function showCPUUse(data,time){
					/* site stats chart */
				//var visitTotal = [];
				var avgCPU = [];
				var largeCPU = [];
				var smallCPU = [];
				var avgRAM = [];
				var largeRAM = [];
				var smallRAM = [];
				var xaxisLabel = [];
				var largeCPUName;
				var smallCPUName;
				var largeRAMName;
				var smallRAMName;
				for (var i = 0; i < data.length; i++) {
					//alert(time[0]);
					//alert(data[i][0]);
					avgCPU.push([i,data[i][0]]);
					avgRAM.push([i,data[i][1]]);
					largeCPU.push([i,data[i][2]]);
					largeRAM.push([i,data[i][3]]);
					smallCPU.push([i,data[i][4]]);
					smallRAM.push([i,data[i][5]]);
					xaxisLabel.push([i,time[0]]);
				};
				if ($("#lines-use-chart").length) {

					//var pageviews = [[1, 75], [3, 87], [4, 93], [5, 127], [6, 116], [7, 137], [8, 135], [9, 130], [10, 167], [11, 169], [12, 179], [13, 185], [14, 176], [15, 180], [16, 174], [17, 193], [18, 186], [19, 177], [20, 153], [21, 149], [22, 130], [23, 100], [24, 50]];
					//var pageviews1 = [[1, 56], [3, 67], [4, 63], [5, 17], [6, 116], [7, 37], [8, 13], [9, 30], [10, 67], [11, 69], [12, 79], [13, 185], [14, 176], [15, 180], [16, 174], [17, 193], [18, 186], [19, 177], [20, 153], [21, 149], [22, 130], [23, 100], [24, 50]];
					//var visitors = [[1, 5], [3, 50], [4, 73], [5, 100], [6, 95], [7, 103], [8, 111], [9, 97], [10, 125], [11, 100], [12, 95], [13, 141], [14, 126], [15, 131], [16, 146], [17, 158], [18, 160], [19, 151], [20, 125], [21, 110], [22, 100], [23, 85], [24, 37]];
					//var visitors1 = [[1, 87], [3, 58], [4, 77], [5, 10], [6, 95], [7, 13], [8, 11], [9, 97], [10, 15], [11, 110], [12, 95], [13, 141], [14, 126], [15, 131], [16, 146], [17, 158], [18, 160], [19, 151], [20, 125], [21, 110], [22, 100], [23, 85], [24, 37]];
					//var pageviews2 = [[1, 56], [3, 97], [4, 63], [5, 57], [6, 116], [7, 37], [8, 13], [9, 30], [10, 67], [11, 69], [12, 79], [13, 185], [14, 176], [15, 180], [16, 174], [17, 193], [18, 186], [19, 177], [20, 153], [21, 149], [22, 130], [23, 100], [24, 50]];
					//var visitors2 = [[1, 5], [3, 50], [4, 33], [5, 100], [6, 55], [7, 103], [8, 111], [9, 97], [10, 125], [11, 100], [12, 95], [13, 141], [14, 126], [15, 131], [16, 146], [17, 158], [18, 160], [19, 151], [20, 125], [21, 110], [22, 100], [23, 85], [24, 37]];
					
					//console.log(pageviews)
					var plot = $.plot($("#lines-use-chart"), [{
						data : avgCPU,
						label : "平均CPU占用率"
					},{
						data : avgRAM,
						label : "平均内存占用率"
					},{
						data : largeCPU,
						label : "最高CPU占用率"
					},{
						data : largeRAM,
						label : "最高内存占用率"
					},{
						data : smallCPU,
						label : "最低CPU占用率"
					},{
						data : smallRAM,
						label : "最低内存占用率"
					}], {
						series : {
							lines : {
								show : true,
								lineWidth : 1,
								fill : false,
								fillColor : {
									colors : [{
										opacity : 0.1
									}, {
										opacity : 0.15
									}]
								}
							},
							points : {
								show : true
							},
							shadowSize : 0
						},
						xaxis : {
							mode : null,
							tickLength : 10,
							//timezone:"browser"
						},

						yaxes : [{
							min : 0,
							tickLength : 5
						}],
						grid : {
							hoverable : true,
							clickable : true,
							tickColor : $chrt_border_color,
							borderWidth : 0,
							borderColor : $chrt_border_color,
						},
						tooltip : true,
						tooltipOpts : {
							content : "%s 是 %y",
							dateFormat : "%y-%0m-%0d",
							defaultTheme : true
						},
						colors : [$chrt_main, $chrt_second],
						xaxis : {
							//ticks:  [[1, "zero"], [5, "one mark"], [8, "two marks"]]
							ticks:xaxisLabel
							// tickFormatter: function(v) {
							// 	return v + " cm";
							// },
							//tickLength:5,
							//tickDecimals : 2
						},
						yaxis : {
							ticks : 10,
							tickDecimals : 0
						},
					});

				}

				/* end site stats */
}
//节点服务数图的显示
function showNodeTotal(data){
				var nodeDetail = [];
				if (data.length*50>600) {
					$("#bar-chart-1").css("width",(data.length*50)+"px");
				};
				for (var i = 0; i < data.length; i++) {
					nodeDetail.push([i,data[i][0]]);
				};
				if ($('#bar-chart-1').length) {
					Morris.Bar({
						element : 'bar-chart-1',
						//axes : false,
						data : [{
							x : '192.168.9.0',
							y : 3,

						}, {
							x : 'sadsas',
							y : 2,

						}, {
							x : '2011 Q3',
							y : 0,

						}, {
							x : '2011 Q4',
							y : 2,

						}, {
							x : '2011 Q4',
							y : 2,

						}, {
							x : '2011 Q4',
							y : 2,

						}, {
							x : '2011 Q4',
							y : 2,

						}, {
							x : '2011 Q4',
							y : 2,

						}, {
							x : '2011 Q4',
							y : 2,

						}, {
							x : '2011 Q4',
							y : 2,

						}, {
							x : '2011 Q4',
							y : 2,

						}, {
							x : '2011 Q4',
							y : 2,

						}],
						xkey : 'x',
						ykeys : ['y'],
						labels : ['Y'],
						//barRatio: 0.4,
						xLabelAngle: -55,
						//hideHover: 'auto'
						//parseTime : false
					});
				}
}

