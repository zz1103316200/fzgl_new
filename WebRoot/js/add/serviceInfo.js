
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
			
$(document).ready(function() {

//	var totalString = {"sysList":["情报系统","雷达系统","海洋系统","航空系统"],
//						"serviceCallQuantity":[12,21,2,15,6,8,11,5,4,18],
//						"serviceRunTime":[2,1,2,5,6,8,1,0,0,0],
//						"activeServiceList":[["service0","15"],["service1","14"],["service2","13"],["service3","12"],["service4","11"],["service5","10"],["service6","9"],
//											["service7","8"],["service8","7"],["service9","6"]],
//						"Table":[["start","TheAddService","接口add方法","Web Service","情报服务","情报系统","这是一个加法服务的描述","这里是服务详情"],
//								["start","TheShellService","接口shell方法","Web Service","情报服务","情报系统","这是一个shell服务的描述","这里是服务详情"]]
//						};
	// DO NOT REMOVE : GLOBAL FUNCTIONS!
	var serviceType;
	
	//右上角小柱状图
	$.ajax({
		type:"post",
		url:"./newServlet/serviceDetail",
		success:function(data){
			//alert(data);
			var datainfo = data.split("@");

			$("#servicenum").append("<h5 style='font-family:Microsoft YaHei'> 服务总数 <span class='txt-color-blue'>" + datainfo[0] + "</span></h5>")
							.append("<div class='sparkline txt-color-blue hidden-mobile hidden-md hidden-sm'>" + datainfo[1] + "</div>");
			$("#startingnum").append("<h5 style='font-family:Microsoft YaHei'> 正在运行 <span class='txt-color-blue'>" + datainfo[2] + "</span></h5>")
							.append("<div class='sparkline txt-color-blue hidden-mobile hidden-md hidden-sm'>" + datainfo[3] + "</div>");
			$("#stoppednum").append("<h5 style='font-family:Microsoft YaHei'> 已停止 <span class='txt-color-blue'>" + datainfo[4] + "</span></h5>")
							.append("<div class='sparkline txt-color-blue hidden-mobile hidden-md hidden-sm'>" + datainfo[5] + "</div>");
			$("#disconnectnum").append("<h5 style='font-family:Microsoft YaHei'> 已断开 <span class='txt-color-blue'>" + datainfo[6] + "</span></h5>")
							.append("<div class='sparkline txt-color-blue hidden-mobile hidden-md hidden-sm'>" + datainfo[7] + "</div>");
			pageSetUp();
		}
	});
				
	//弹框效果		
	$(".page1").dialog({
		autoOpen : false,
		modal : true,
		title : "服务详情信息"	
	});
	$(".page2").dialog({
		autoOpen : false,
		modal : true,
		title : "节点详细信息"	
	});
	$(".page3").dialog({
		autoOpen : false,
		modal : true,
		title : "服务详细信息"	
	});
	showServiceVisitNum();
 	showServiceVisitTime();
	//直接进入此页面时，进入下面的Servlet
	// $.post("./newServlet/yxjk_3_2_pre_fwxx_Servlet",{},function(text){
	// 	serviceVisitTimes = text.serviceCallQuantity;
	// 	serviceCallTime = text.serviceRunTime;
	// 	activeService = text.activeServiceList;
	// 	serviceType = text.sysList;
	// 	//得到option
	// 	showTypeOption(serviceType);
		
	// 	//得到图形BarChar1
	// 	//得到图形BarChar1
	// 	 if(activeService.length!=0){
	// 		 showBarChar1(activeService);
	// 	 }
		 
	// 	//得到图形BarChar
	// 	 showBarChar(serviceVisitTimes,text.serviceCallQuantity_ordTime);
	// 	//获得AreaGraph的data，并得到图形
	// 	//var data_area = getAreaGraph(serviceVisitTimes);
	// 	 showAreaGraph(serviceCallTime,text.serviceRunTime_ordTime);
	// 	//显示xy轴的坐标		
 //   });

	/*
	 * ajax翻页部分-wenyanqi
	 */
	
	//三个全局变量
	//获取当前一页显示多少条记录
	var itemnumber = $("#itemnumber").val();
	//一共有多少页
	var pagenum;
	//一共有多少条记录
	var allitemnumber;		
	/***************************不同的页码*********************************************/
	//1.全部页码的样式
	function showallpagination(){
		//全部服务：点击翻页之后
		$(".allserviceresult .changenum").click(function(){
			//alert("sdf");
			$(".allserviceresult li").removeClass("active");
			var currentpage = $(this).find("a").html();
			$(this).addClass("active");

			var itemnumber = $("#itemnumber").val();	
			var startnum = itemnumber*(currentpage-1);
			$.ajax({
				type:"post",
				url:"./newServlet/serviceListPageup",
				data:{startnumber:startnum,itemnumber:itemnumber},
				success:function(data){
					showservicelist(data);
				}
			});
		});

		//全部服务：点击上一页
		$(".allserviceresult .fa-chevron-left").parent().click(function(){

			var currentpage = $(".allserviceresult .active").find("a").html();
			if(currentpage > 1){
				currentpage = Number(currentpage)-1;
				$(".allserviceresult .active").removeClass('active');
				var currentpage_s = "." + currentpage;
				$(currentpage_s).parent().addClass("active");
				
				var itemnumber = $("#itemnumber").val();	
				var startnum = itemnumber*(currentpage-1);
				$.ajax({
					type:"post",
					url:"./newServlet/serviceListPageup",
					data:{startnumber:startnum,itemnumber:itemnumber},
					success:function(data){
						showservicelist(data);
					}
				});
			}
			
		});
		//全部服务：点击下一页
		$(".allserviceresult .fa-chevron-right").parent().click(function(){
			var currentpage = $(".allserviceresult .active a").html();
			//alert(pagenum);
			if(currentpage < pagenum){
				currentpage = Number(currentpage)+1;
				$(".allserviceresult .active").removeClass('active');
				var currentpage_s = "." + currentpage;
				$(currentpage_s).parent().addClass("active");

				var itemnumber = $("#itemnumber").val();	
				var startnum = itemnumber*(currentpage-1);
				$.ajax({
					type:"post",
					url:"./newServlet/serviceListPageup",
					data:{startnumber:startnum,itemnumber:itemnumber},
					success:function(data){
						showservicelist(data);
					}
				});
			}
		});
	}
	
	//2.搜索结果后的页码样式
	function showsearchpagination(){
		//搜索服务：点击翻页之后
		$(".searchresult .changenum").click(function(){
			$(".searchresult li").removeClass("active");
			var currentpage = $(this).find("a").html();
			$(this).addClass("active");

			var itemnumber = $("#itemnumber").val();	
			var startnum = itemnumber*(currentpage-1);
			var searchtype = $("#search-type").val();
			var searchkey = $("#searchvalue").val();
			$.ajax({
				type:"post",
				url:"./newServlet/filterServiceServlet",
				data:{type:searchtype,value:searchkey,startnumber:startnum,itemnumber:itemnumber},
				success:function(data){
					showservicelist(data);
				}
			});
		});

		//搜索服务：点击上一页
		$(".searchresult .fa-chevron-left").parent().click(function(){
			var currentpage = $(".searchresult .active").find("a").html();
			var searchtype = $("#search-type").val();
			var searchkey = $("#searchvalue").val();
			if(currentpage > 1){
				currentpage = Number(currentpage)-1;
				$(".searchresult .active").removeClass('active');
				var currentpage_s = "." + currentpage;
				$(currentpage_s).parent().addClass("active");
				
				var itemnumber = $("#itemnumber").val();	
				var startnum = itemnumber*(currentpage-1);
				$.ajax({
					type:"post",
					url:"./newServlet/filterServiceServlet",
					data:{type:searchtype,value:searchkey,startnumber:startnum,itemnumber:itemnumber},
					success:function(data){
						showservicelist(data);
					}
				});
			}
			
		});
		//搜索服务：点击下一页
		$(".searchresult .fa-chevron-right").parent().click(function(){
			var currentpage = $(".searchresult .active").find("a").html();
			var searchtype = $("#search-type").val();
			var searchkey = $("#searchvalue").val();
			if(currentpage < pagenum){
				currentpage = Number(currentpage)+1;
				$(".searchresult .active").removeClass('active');
				var currentpage_s = "." + currentpage;
				$(currentpage_s).parent().addClass("active");

				var itemnumber = $("#itemnumber").val();	
				var startnum = itemnumber*(currentpage-1);
				$.ajax({
					type:"post",
					url:"./newServlet/filterServiceServlet",
					data:{type:searchtype,value:searchkey,startnumber:startnum,itemnumber:itemnumber},
					success:function(data){
						showservicelist(data);
					}
				});
			}
		});
	}
	//3.顶部选择了服务类型的页码样式
	function showsearchpagination1(value){
		//搜索服务：点击翻页之后
		$(".searchresult1 .changenum").click(function(){
			$(".searchresult1 li").removeClass("active");
			var currentpage = $(this).find("a").html();
			$(this).addClass("active");
			
			var itemnumber = $("#itemnumber").val();	
			var startnum = itemnumber*(currentpage-1);

			$.ajax({
				type:"post",
				url:"./newServlet/filterServiceServlet",
				data:{type:"businesstype",value:value,startnumber:startnum,itemnumber:itemnumber},
				success:function(data){
					showservicelist(data);
				}
			});
		});

		//搜索服务：点击上一页
		$(".searchresult1 .fa-chevron-left").parent().click(function(){
			var currentpage = $(".searchresult1 .active").find("a").html();
			
			if(currentpage > 1){
				currentpage = Number(currentpage)-1;
				$(".searchresult1 .active").removeClass('active');
				var currentpage_s = "." + currentpage;
				$(currentpage_s).parent().addClass("active");
				
				var itemnumber = $("#itemnumber").val();	
				var startnum = itemnumber*(currentpage-1);
				$.ajax({
					type:"post",
					url:"./newServlet/filterServiceServlet",
					data:{type:"businesstype",value:value,startnumber:startnum,itemnumber:itemnumber},
					success:function(data){
						
						showservicelist(data);
					}
				});
			}
			
		});
		//搜索服务：点击下一页
		$(".searchresult1 .fa-chevron-right").parent().click(function(){
			var currentpage = $(".searchresult1 .active").find("a").html();
			
			if(currentpage < pagenum){
				currentpage = Number(currentpage)+1;
				$(".searchresult1 .active").removeClass('active');
				var currentpage_s = "." + currentpage;
				$(currentpage_s).parent().addClass("active");

				var itemnumber = $("#itemnumber").val();	
				var startnum = itemnumber*(currentpage-1);
				$.ajax({
					type:"post",
					url:"./newServlet/filterServiceServlet",
					data:{type:"businesstype",value:value,startnumber:startnum,itemnumber:itemnumber},
					success:function(data){
						showservicelist(data);
					}
				});
			}
		});
	}
	//全部服务：显示全部服务的页码，以及页码对应的事件绑定
	$.ajax({
		type:"post",
		url:"./newServlet/getNumber",
		data:{type:"service"},
		success:function(data){
			//alert("pagenum="+data);
			allitemnumber = data;
			pagenum = Math.ceil(data /itemnumber);
			$(".pagination").empty();
			$(".pagination").removeClass("searchresult");
			$(".pagination").removeClass("searchresult1");
			$(".pagination").addClass("allserviceresult");
			$(".allserviceresult").append("<li ><a href='javascript:void(0);'><i class='fa fa-chevron-left'></i></a></li>");
			for(var i = 1; i<=pagenum;i++){
				if(i == 1){
					$(".allserviceresult").append("<li class='changenum active'><a class=" + i + ">" + i + "</a></li>");
				}else{
					$(".allserviceresult").append("<li class='changenum'><a class=" + i + ">" + i + "</a></li>");
				}
				
			}
			$(".allserviceresult").append("<li ><a href='javascript:void(0);'><i class='fa fa-chevron-right'></i></a></li>");
			showallpagination();
		}
	});

	//全部服务：页面刚加载显示的数据
	$.ajax({
		type:"post",
		url:"./newServlet/serviceListPageup",
		data:{startnumber:0,itemnumber:itemnumber},
		success:function(data){
			
			showservicelist(data);
		}
	});

	/*******************条件搜索之后的服务显示***************************/
	//搜索服务： 点击搜索图标之后
	$("#searchservice").click(function(){
		var searchtype = $("#search-type").val();
		var searchkey = $("#searchvalue").val();
		itemnumber = $("#itemnumber").val();
		alert(itemnumber);
		$(".pagination").empty();
		$(".pagination").removeClass("allserviceresult");
		$(".pagination").removeClass("searchresult1");
		$(".pagination").addClass("searchresult");
		//1 先请求服务个数生成页码
		$.ajax({
			type:"post",
			url:"./newServlet/getFilterNumber",
			data:{filtertype:"service",type:searchtype,value:searchkey},
			success:function(data){
				//alert(data);
				allitemnumber = data;
				pagenum = Math.ceil(data / itemnumber);
				//alert(pagenum);
				$(".searchresult").append("<li ><a href='javascript:void(0);'><i class='fa fa-chevron-left'></i></a></li>");				
				for(var i = 1; i<=pagenum;i++){
					if(i == 1){
						$(".searchresult").append("<li class='changenum active'><a class=" + i + ">" + i + "</a></li>");
					}else{
						$(".searchresult").append("<li class='changenum'><a class=" + i + ">" + i + "</a></li>");
					}
					
				}
				$(".searchresult").append("<li ><a href='javascript:void(0);'><i class='fa fa-chevron-right'></i></a></li>");
				showsearchpagination();
			}
		});
		//生成符合条件的第一页数据
		//alert("itemnumber:"+itemnumber);
		$.ajax({
			type:"post",
			url: "./newServlet/filterServiceServlet",
			data:{type:searchtype,value:searchkey,startnumber:0,itemnumber:itemnumber},
			success: function(data){
				//alert(data);
				showservicelist(data);
			}
		});
		
	});


	/***************更改每页显示的页数*********************/
	//当每页显示个数变化之后
	$("#itemnumber").change(function(){
		itemnumber = $("#itemnumber").val();
		//重新生成页码
		var pagenum = Math.ceil(allitemnumber/itemnumber);
		$(".pagination").empty();
		$(".pagination").append("<li ><a href='javascript:void(0);'><i class='fa fa-chevron-left'></i></a></li>");
		for(var i = 1; i<=pagenum;i++){
			if(i == 1){
				$(".pagination").append("<li class='changenum active'><a class=" + i + ">" + i + "</a></li>");
			}else{
				$(".pagination").append("<li class='changenum'><a class=" + i + ">" + i + "</a></li>");
			}
		}
		$(".pagination").append("<li ><a href='javascript:void(0);'><i class='fa fa-chevron-right'></i></a></li>");
		
		//判断搜.pagination包含的是allserviceresult还是searchresult，是searchresult则向filterserviceservlet请求数据，否则向servicelistpageup请求数据
		var searchtype = $("#search-type").val();
		var searchkey = $("#searchvalue").val();
		//请求全部数据
		if($(".pagination").hasClass("allserviceresult")){
			showallpagination();
			$.ajax({
				type:"post",
				url:"./newServlet/serviceListPageup",
				data:{startnumber:0,itemnumber:itemnumber},
				success:function(data){
					showservicelist(data);
				}
			});
		}else if($(".pagination").hasClass("searchresult")){
			//请求搜索的数据
			showsearchpagination();
			$.ajax({
				type:"post",
				url: "./newServlet/filterServiceServlet",
				data:{type:searchtype,value:searchkey,startnumber:0,itemnumber:itemnumber},
				success: function(data){
					showservicelist(data);
				}
			});
		}else{
			showsearchpagination1();
			var value = $(".serviceTypeSelect").val();
			$.ajax({
				type:"post",
				url: "./newServlet/filterServiceServlet",
				data:{type:"businesstype",value:value,startnumber:0,itemnumber:itemnumber},
				success: function(data){
					showservicelist(data);
				}
			});
		}
		
	});
	
	//点击服务类型选择框时，根据选择的不通触发不同的Servlet
	$(".serviceTypeSelect").change(function(event) {
		/* Act on the event */
		var value = $(".serviceTypeSelect").val();
		 $("#area-graph").empty();
		 $("#area-graph-1").empty();
		 $("#bar-chart-1").empty();
		
		 $('#bar-chart').empty();
		//点击全部时触发
		if(value=="all"){
			//全部服务：显示全部服务的页码
			$.ajax({
				type:"post",
				url:"./newServlet/getNumber",
				data:{type:"service"},
				success:function(data){
					//alert("pagenum="+data);
					allitemnumber = data;
					pagenum = Math.ceil(data /itemnumber);
					$(".pagination").empty();
					$(".pagination").addClass("allserviceresult");
					$(".pagination").removeClass("searchresult");
					$(".pagination").removeClass("searchresult1");
					$(".allserviceresult").append("<li ><a href='javascript:void(0);'><i class='fa fa-chevron-left'></i></a></li>");
					for(var i = 1; i<=pagenum;i++){
						if(i == 1){
							$(".allserviceresult").append("<li class='changenum active'><a class=" + i + ">" + i + "</a></li>");
						}else{
							$(".allserviceresult").append("<li class='changenum'><a class=" + i + ">" + i + "</a></li>");
						}
						
					}
					$(".allserviceresult").append("<li ><a href='javascript:void(0);'><i class='fa fa-chevron-right'></i></a></li>");
					showallpagination();
				}
			});
			//全部服务：页面刚加载显示表格的数据
			$.ajax({
				type:"post",
				url:"./newServlet/serviceListPageup",
				data:{startnumber:0,itemnumber:itemnumber},
				success:function(data){
					
					showservicelist(data);
				}
			});

			//显示图标数据
			$.post("./newServlet/yxjk_3_2_pre_fwxx_Servlet",{},function(text){
				serviceVisitTimes = text.serviceCallQuantity;
				serviceCallTime = text.serviceRunTime;
				activeService = text.activeServiceList;
				//serviceType = text.sysList;
				//得到option
				//showTypeOption(serviceType);
				
				//得到图形BarChar1
				//得到图形BarChar1
				 if(activeService.length!=0){
					 showBarChar1(activeService);
				 }
				 
				
				//得到图形BarChar
				 showBarChar(serviceVisitTimes,text.serviceCallQuantity_ordTime);
				//获得AreaGraph的data，并得到图形
				//var data_area = getAreaGraph(serviceVisitTimes);
				 showAreaGraph(serviceCallTime,text.serviceRunTime_ordTime);
				//显示xy轴的坐标
				 });
		//点击除全部外的任意服务时触发
		}else{
			$.post("./newServlet/yxjk_3_2_fwxx_Servlet",{sysName:value},function(text){
				//alert(text);
				//serviceType = text.sysList;
				serviceVisitTimes = text.serviceCallQuantity;
				serviceCallTime = text.serviceRunTime;
				activeService = text.activeServiceList;
				//alert("activeService"+serviceVisitTimes);
				
				//得到图形BarChar1
				// alert(activeService.length);
				 if(activeService.length!=0){
					 showBarChar1(activeService);
				 }
				 
				//得到图形BarChar
				showBarChar(serviceVisitTimes,text.serviceCallQuantity_ordTime);
				//获得AreaGraph的data，并得到图形
				//var data_area = getAreaGraph(serviceCallTime);
				showAreaGraph(serviceCallTime,text.serviceRunTime_ordTime);
				showDebug();
				
           }
           );

			itemnumber = $("#itemnumber").val();
			//alert(itemnumber);
			$(".pagination").empty();
			$(".pagination").removeClass("allserviceresult");
			$(".pagination").removeClass("searchresult");
			$(".pagination").addClass("searchresult1");
			//1 先请求服务个数生成页码
			$.ajax({
				type:"post",
				url:"./newServlet/getFilterNumber",
				data:{filtertype:"service",type:"businesstype",value:value},
				success:function(data){
					//alert(data);
					allitemnumber = data;
					pagenum = Math.ceil(data / itemnumber);
					//alert(pagenum);
					$(".searchresult1").append("<li ><a href='javascript:void(0);'><i class='fa fa-chevron-left'></i></a></li>");				
					for(var i = 1; i<=pagenum;i++){
						if(i == 1){
							$(".searchresult1").append("<li class='changenum active'><a class=" + i + ">" + i + "</a></li>");
						}else{
							$(".searchresult1").append("<li class='changenum'><a class=" + i + ">" + i + "</a></li>");
						}
						
					}
					$(".searchresult1").append("<li ><a href='javascript:void(0);'><i class='fa fa-chevron-right'></i></a></li>");
					showsearchpagination1(value);
				}
			});
			//生成符合条件的第一页数据
			$.ajax({
				type:"post",
				url: "./newServlet/filterServiceServlet",
				data:{type:"businesstype",value:value,startnumber:0,itemnumber:itemnumber},
				success: function(data){
					//alert(data);
					showservicelist(data);
				}
			});
		}
		
		
		
	});
	/********************************分页相关代码结束***************************/

	//选择搜索类型	
	$("#search-type").change(function(){
		var searchtype = $("#search-type").val();
		if(searchtype == "servicename" || searchtype == "description"){
			$(".filtertype").empty();
			$(".filtertype").append("<input type='text' class='input-sm' id='searchvalue'/>");
			
		}else{
			$(".filtertype").empty();
			$(".filtertype").append("<select class='input-sm' id='searchvalue' style='font-size:14px'></select>");
			$.ajax({
				type:"post",
				url: "./newServlet/filter",
				data:{type:searchtype},
				success:function(data){
					//alert(data);
					var infoarray = new Array();
					infoarray = data.split("@");
					for(var i=0;i<infoarray.length;i++){
					
						$("#searchvalue").append("<option value=" + infoarray[i] +">"+ infoarray[i] + "</option>");
					}
					
				}
			});
		}

	});

			// area graph
		showDebug();
		setTimeout("showXY_1()", 500);
});
			
/*
*添加option
*<option value="0" selected="" disabled="">情报服务</option>
*/
function showTypeOption(serviceType){
	for (var i = 0; i <serviceType.length; i++) {
		$(".serviceTypeSelect").append('<option value="'+serviceType[i]+'">'+serviceType[i]+'</option>');
	};
	
}

//显示列表
function showservicelist(data){
	$("#table1 tbody").empty();
	res=data.split("@");
	
	var serviceinfo = JSON.parse(res[0]);
	var messageinfo = JSON.parse(res[1]);
	var servicestatusinfo = JSON.parse(res[2]);
	
	//瑙ｆ瀽鏈嶅姟鍒楄〃淇℃伅
	for(var i=0; i<serviceinfo.servicelist.length; i++){
		var appendinfo = "<tr id="+serviceinfo.servicelist[i].serviceid+">"+"<td  class='servicestatus' style='text-align:center;'>";
		var servicestatus = "";
		
		//鏈嶅姟鐘舵�淇℃伅
		for(var j=0; j<servicestatusinfo.statuslist.length;j++){
			if(servicestatusinfo.statuslist[j].serviceid == serviceinfo.servicelist[i].serviceid){
				if(servicestatusinfo.statuslist[j].status == "start"){
					servicestatus = "start";
				}else if(servicestatusinfo.statuslist[j].status == "stop"){
					servicestatus = "stop";
				}
			}
		}
		if(servicestatus == ""){
			servicestatus = "disconnect";
		}
		
		if(servicestatus == "start"){
			appendinfo += "<i class='fa fa-circle txt-color-green'><label>&nbsp;&nbsp;运行</label></td>";
		}else if(servicestatus == "stop"){
			appendinfo += "<i class='fa fa-circle txt-color-red'><label>&nbsp;&nbsp;停止</label></td>";
		}else if(servicestatus == "disconnect"){
			appendinfo += "<i class='fa fa-circle txt-color-orange'><label>&nbsp;&nbsp;断开</label></td>";
		}
		
		appendinfo += "<td class='servicename'>" + serviceinfo.servicelist[i].servicename + "</td>";
		//appendinfo += "<td class='serviceversion' style='text-align:center;'>" + serviceinfo.servicelist[i].version + "</td>";
		
		//鍒嗗壊鏈嶅姟鎺ュ彛淇℃伅
		var messagelist = new Array();
		var messagecount = 0;
		
		//鏄剧ず鏍戠姸鎺т欢
		appendinfo += "<td style='text-align:left;'><div class='tree smart-form'><ul><li><span><i class='fa fa-lg fa-plus-circle'></i>" + serviceinfo.servicelist[i].servicename + "</span><ul>";
		
		//鏈嶅姟鎺ュ彛淇℃伅
		for(var j=0; j<messageinfo.messagelist.length; j++){

			if(messageinfo.messagelist[j].serviceid == serviceinfo.servicelist[i].serviceid){
				
				messagelist[messagecount] = messageinfo.messagelist[j].servicemessage;
				messagecount ++;
			}
		}
		for(var j=0; j<messagelist.length; j++){
			appendinfo += "<li style='display:none'><span><i class='icon-leaf'></i>" + messagelist[j] + "</span></li>";
		}
		appendinfo += "</ul></li></ul></div></td>";
		
		appendinfo += "<td class='servicetype'>" + serviceinfo.servicelist[i].servicetype + "</td>";
		appendinfo += "<td class='businesstype'>" + serviceinfo.servicelist[i].businesstype + "</td>";
		appendinfo += "<td class='owersystem'>" + serviceinfo.servicelist[i].owersystem + "</td>";
		appendinfo += "<td class='description'>" + serviceinfo.servicelist[i].description + "</td>";
		appendinfo += "<td><a herf='#' class='readgraph' style='cursor: pointer;'>点击查看详情</a></td>";
		
		$("#table1 tbody").append(appendinfo);

		
	}
	//TreeView	
	$('.tree > ul').attr('role', 'tree').find('ul').attr('role', 'group');
	$('.tree').find('li:has(ul)').addClass('parent_li').attr('role', 'treeitem').find(' > span').attr('title', 'Collapse this branch').on('click', function(e) {
		var children = $(this).parent('li.parent_li').find(' > ul > li');
		if (children.is(':visible')) {
			children.hide('fast');
			$(this).attr('title', 'Expand this branch').find(' > i').removeClass().addClass('fa fa-lg fa-plus-circle');
		} else {
			children.show('fast');
			$(this).attr('title', 'Collapse this branch').find(' > i').removeClass().addClass('fa fa-lg fa-minus-circle');
		}
		e.stopPropagation();
	});
	$(".readgraph").click(function() {
		/* Act on the event */
		//alert("success");
		var serviceid = $(this).parent().parent().attr("id");
		var servicename = $(this).parent().parent().find(".servicename").html();
		var systemname = $(this).parent().parent().find(".owersystem").html();
		//alert(serviceid);
		$(".page1").dialog("open");
		$(".svg-here").empty();
		$.ajax({
			type:"post",
			url:"./newServlet/inputSession",
			data:{serviceid: serviceid,servicename:servicename,systemname:systemname},
			success:function(){
				Topology.init();
			}
		});
		

	});
}

//得到服务访问量chart
function showServiceVisitNum(){
					/* site stats chart */

				if ($("#lines-chart").length) {

					var pageviews = [[1, 75], [3, 87], [4, 93], [5, 127], [6, 116], [7, 137], [8, 135], [9, 130], [10, 167], [11, 169], [12, 179], [13, 185], [14, 176], [15, 180], [16, 174], [17, 193], [18, 186], [19, 177], [20, 153], [21, 149], [22, 130], [23, 100], [24, 50]];
					var pageviews1 = [[1, 56], [3, 67], [4, 63], [5, 17], [6, 116], [7, 37], [8, 13], [9, 30], [10, 67], [11, 69], [12, 79], [13, 185], [14, 176], [15, 180], [16, 174], [17, 193], [18, 186], [19, 177], [20, 153], [21, 149], [22, 130], [23, 100], [24, 50]];
					var visitors = [[1, 5], [3, 50], [4, 73], [5, 100], [6, 95], [7, 103], [8, 111], [9, 97], [10, 125], [11, 100], [12, 95], [13, 141], [14, 126], [15, 131], [16, 146], [17, 158], [18, 160], [19, 151], [20, 125], [21, 110], [22, 100], [23, 85], [24, 37]];
					var visitors1 = [[1, 87], [3, 58], [4, 77], [5, 10], [6, 95], [7, 13], [8, 11], [9, 97], [10, 15], [11, 110], [12, 95], [13, 141], [14, 126], [15, 131], [16, 146], [17, 158], [18, 160], [19, 151], [20, 125], [21, 110], [22, 100], [23, 85], [24, 37]];
					console.log(pageviews)
					var plot = $.plot($("#lines-chart"), [{
						data : pageviews,
						label : "访问总量"
					},{
						data : pageviews1,
						label : "平均访问量"
					},{
						data : visitors,
						label : "最高访问量"
					}, {
						data : visitors1,
						label : "最低访问量"
					}], {
						series : {
							lines : {
								show : true,
								lineWidth : 1,
								fill : true,
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
							ticks:15
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
//得到服务访问量chart
function showServiceVisitTime(){
					/* site stats chart */

				if ($("#lines-time-chart").length) {

					var pageviews = [[1, 75], [3, 87], [4, 93], [5, 127], [6, 116], [7, 137], [8, 135], [9, 130], [10, 167], [11, 169], [12, 179], [13, 185], [14, 176], [15, 180], [16, 174], [17, 193], [18, 186], [19, 177], [20, 153], [21, 149], [22, 130], [23, 100], [24, 50]];
					var pageviews1 = [[1, 56], [3, 67], [4, 63], [5, 17], [6, 116], [7, 37], [8, 13], [9, 30], [10, 67], [11, 69], [12, 79], [13, 185], [14, 176], [15, 180], [16, 174], [17, 193], [18, 186], [19, 177], [20, 153], [21, 149], [22, 130], [23, 100], [24, 50]];
					var visitors = [[1, 5], [3, 50], [4, 73], [5, 100], [6, 95], [7, 103], [8, 111], [9, 97], [10, 125], [11, 100], [12, 95], [13, 141], [14, 126], [15, 131], [16, 146], [17, 158], [18, 160], [19, 151], [20, 125], [21, 110], [22, 100], [23, 85], [24, 37]];
					//var visitors1 = [[1, 87], [3, 58], [4, 77], [5, 10], [6, 95], [7, 13], [8, 11], [9, 97], [10, 15], [11, 110], [12, 95], [13, 141], [14, 126], [15, 131], [16, 146], [17, 158], [18, 160], [19, 151], [20, 125], [21, 110], [22, 100], [23, 85], [24, 37]];
					console.log(pageviews)
					var plot = $.plot($("#lines-time-chart"), [{
						data : pageviews,
						label : "平均调用时间"
					},{
						data : pageviews1,
						label : "最大调用时间"
					},{
						data : visitors,
						label : "最小调用时间"
					}], {
						series : {
							lines : {
								show : true,
								lineWidth : 1,
								fill : true,
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
							ticks:15
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
