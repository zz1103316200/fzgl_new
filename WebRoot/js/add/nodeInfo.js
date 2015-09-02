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
var cpuNum = "0.0%,0.0%,0.0%,0.0%,1.5%,0.0%,0.0%,0.0%,0.0%,0.0%";
$(document).ready(function() {
								
	var cpu_ram = [{"IP":"192.168.0.201","cpu":"48.5%","ram":"88.6%"},{"IP":"192.168.0.202","cpu":"12%","ram":"55%"},{"IP":"192.168.0.203","cpu":"56%","ram":"59%"}];
	//弹框效果		
	$(".page1").dialog({
		autoOpen : false,
		modal : true,
		title : "节点详情信息"	
	});
	//右上角小柱状图
	$.ajax({
		type:"post",
		url:"./newServlet/nodeDetail",
		success:function(data){
			//alert(data);
			var datainfo = data.split("@");
			
			$("#servicenum").append("<h5 style='font-family:Microsoft YaHei'> 节点总数 <span class='txt-color-blue'>" + datainfo[0] + "</span></h5>")
							.append("<div class='sparkline txt-color-blue hidden-mobile hidden-md hidden-sm'>" + datainfo[1] + "</div>");
			$("#startingnum").append("<h5 style='font-family:Microsoft YaHei'> 正在运行 <span class='txt-color-blue'>" + datainfo[2] + "</span></h5>")
							.append("<div class='sparkline txt-color-blue hidden-mobile hidden-md hidden-sm'>" + datainfo[3] + "</div>");
			$("#disconnectnum").append("<h5 style='font-family:Microsoft YaHei'> 已断开 <span class='txt-color-blue'>" + datainfo[4] + "</span></h5>")
							.append("<div class='sparkline txt-color-blue hidden-mobile hidden-md hidden-sm'>" + datainfo[5] + "</div>");
			
		}
	});
				
	pageSetUp();	
	/*
	 * 实现数据分页部分-wenyanqi
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
		//全部节点：点击翻页之后
		$(".allnoderesult .changenum").click(function(){
			//alert("sdf");
			$(".allnoderesult li").removeClass("active");
			var currentpage = $(this).find("a").html();
			$(this).addClass("active");

			var itemnumber = $("#itemnumber").val();	
			var startnum = itemnumber*(currentpage-1);
			$.ajax({
				type:"post",
				url:"./newServlet/nodeListServlet",
				data:{startnumber:startnum,itemnumber:itemnumber},
				success:function(data){
					
					NodeList(data);
				}
			});
		});

		//全部节点：点击上一页
		$(".allnoderesult .fa-chevron-left").parent().click(function(){

			var currentpage = $(".allnoderesult .active").find("a").html();
			if(currentpage > 1){
				currentpage = Number(currentpage)-1;
				$(".allnoderesult .active").removeClass('active');
				var currentpage_s = "." + currentpage;
				$(currentpage_s).parent().addClass("active");
				
				var itemnumber = $("#itemnumber").val();	
				var startnum = itemnumber*(currentpage-1);
				$.ajax({
					type:"post",
					url:"./newServlet/nodeListServlet",
					data:{startnumber:startnum,itemnumber:itemnumber},
					success:function(data){
						NodeList(data);
					}
				});
			}
			
		});
		//全部节点：点击下一页
		$(".allnoderesult .fa-chevron-right").parent().click(function(){
			var currentpage = $(".allnoderesult .active a").html();
			//alert(pagenum);
			if(currentpage < pagenum){
				currentpage = Number(currentpage)+1;
				$(".allnoderesult .active").removeClass('active');
				var currentpage_s = "." + currentpage;
				$(currentpage_s).parent().addClass("active");

				var itemnumber = $("#itemnumber").val();	
				var startnum = itemnumber*(currentpage-1);
				$.ajax({
					type:"post",
					url:"./newServlet/nodeListServlet",
					data:{startnumber:startnum,itemnumber:itemnumber},
					success:function(data){
						NodeList(data);
					}
				});
			}
		});
	}
	
	//2.搜索结果后的页码样式
	function showsearchpagination(){
		//搜索节点：点击翻页之后
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
				url:"./newServlet/nodeFilter",
				data:{type:searchtype,value:searchkey,startnumber:startnum,itemnumber:itemnumber},
				success:function(data){
					NodeList(data);
				}
			});
		});

		//搜索节点：点击上一页
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
					url:"./newServlet/nodeFilter",
					data:{type:searchtype,value:searchkey,startnumber:startnum,itemnumber:itemnumber},
					success:function(data){
						NodeList(data);
					}
				});
			}
			
		});
		//搜索节点：点击下一页
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
					url:"./newServlet/nodeFilter",
					data:{type:searchtype,value:searchkey,startnumber:startnum,itemnumber:itemnumber},
					success:function(data){
						NodeList(data);
					}
				});
			}
		});
	}
	//全部节点：显示全部节点的页码
	$.ajax({
		type:"post",
		url:"./newServlet/getNumber",
		data:{type:"node"},
		success:function(data){
			//alert("pagenum="+data);
			allitemnumber = data;
			pagenum = Math.ceil(data /itemnumber);
			$(".pagination").empty();
			$(".pagination").addClass("allnoderesult");
			$(".allnoderesult").append("<li ><a href='javascript:void(0);'><i class='fa fa-chevron-left'></i></a></li>");
			for(var i = 1; i<=pagenum;i++){
				if(i == 1){
					$(".allnoderesult").append("<li class='changenum active'><a class=" + i + ">" + i + "</a></li>");
				}else{
					$(".allnoderesult").append("<li class='changenum'><a class=" + i + ">" + i + "</a></li>");
				}
				
			}
			$(".allnoderesult").append("<li ><a href='javascript:void(0);'><i class='fa fa-chevron-right'></i></a></li>");
			showallpagination();
		}
	});
				
	//加载第一页数据
	$.ajax({
		type:"post",
		url:"./newServlet/nodeListServlet",
		data:{startnumber:0,itemnumber:itemnumber},
		success:function(data){
			NodeList(data);
		}
	});

	/*******************条件搜索之后的节点显示***************************/
	//搜索节点： 点击搜索图标之后
	$("#searchservice").click(function(){
		var searchtype = $("#search-type").val();
		var searchkey = $("#searchvalue").val();
		
		$(".pagination").empty();
		$(".pagination").removeClass("allnoderesult");
		$(".pagination").addClass("searchresult");
		//1 先请求节点个数生成页码
		$.ajax({
			type:"post",
			url:"./newServlet/getFilterNumber",
			data:{filtertype:"node",type:searchtype,value:searchkey},
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
		$.ajax({
			type:"post",
			url: "./newServlet/nodeFilter",
			data:{type:searchtype,value:searchkey,startnumber:0,itemnumber:itemnumber},
			success: function(data){
				//alert(data);
				NodeList(data);
			}
		});
		
	});


	 /***************每页显示个数变化之后*********************/
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
		if($(".pagination").hasClass("allnoderesult")){
			showallpagination();
			$.ajax({
				type:"post",
				url:"./newServlet/nodeListServlet",
				data:{startnumber:0,itemnumber:itemnumber},
				success:function(data){
					//alert(data);
					NodeList(data);
				}
			});
		}else{
			//请求搜索的数据
			showsearchpagination();
			$.ajax({
				type:"post",
				url: "./newServlet/nodeFilter",
				data:{type:searchtype,value:searchkey,startnumber:0,itemnumber:itemnumber},
				success: function(data){
					NodeList(data);
				}
			});
		}
		
	});

	//选择一个搜索类型			
	$("#search-type").change(function(){
		var searchtype = $("#search-type").val();
		//alert(searchtype);
		if(searchtype == "HostIp" || searchtype == "MAC" || searchtype == "Type"){
			$(".filtertype").empty();
			$(".filtertype").append("<select class='input-sm' id='searchvalue' style='font-size:14px'></select>");

		}else{
			$(".filtertype").empty();
			$(".filtertype").append("<input type='text' class='input-sm' id='searchvalue'/>");

		}
		if(searchtype != ""){
			$.ajax({
				type: "post",
				url: "./newServlet/nodeFilterFirst",
				data:{value:searchtype},
				success:function(data){
					var infoarray = new Array();
					infoarray = data.split("@");
					for(var i=0;i<infoarray.length;i++){
					
						$("#searchvalue").append("<option value=" + infoarray[i] +">"+ infoarray[i] + "</option>");
					}
				}
			});
		}
	});		
					
});

//给AreaGraph（cpu和内存）喂数据
function showAreaGraph(serviceVisitTimes){
	// area graph 服务访问量
	// area graph 1
	var data = new Array();
	//alert("times:" + serviceVisitTimes);
	for (var i = 0 ; i < serviceVisitTimes.length; i++) {
		data.push({
		x : serviceVisitTimes[i].time,
		CPU : serviceVisitTimes[i].cpu,
		rom : serviceVisitTimes[i].memory
		});
	};
	if ($('#area-graph').length) {
		//alert("area-graph-1"+$('#area-graph-1'));
		Morris.Area({
			element : 'area-graph',
			
			data : data,
			xkey : 'x',
			ykeys : ['CPU', 'rom'],
			labels : ['CPU', '内存']
		
		});
		//alert("siblings('selector')");
		
	}
	for (i = 0 ; i < serviceVisitTimes.length; i++) {
		
		$("#area-graph svg text tspan").eq(4+serviceVisitTimes.length-i).html(serviceVisitTimes[i].IP);
	};
}

//给AreaGraph1（即硬盘占用率）喂数据
function showAreaGraph1(serviceVisitTimes){
		// area graph 服务访问量
	var data = new Array();
	
	for (i = 0 ; i < serviceVisitTimes.length; i++) {

		data.push({
		x :  serviceVisitTimes[i].time,
		y : serviceVisitTimes[i].harddisk
		});
	};
	if ($('#area-graph-1').length) {
		//var data_area = getAreaGraph(totalString);
		//alert(data_area[0].x);
		Morris.Area({
			element : 'area-graph-1',
			data : data,
			xkey : 'x',
			ykeys : ['y'],
			labels : ['硬盘']
		});
	}
}
function NodeList(data){
	
	data=JSON.parse(data);
	$("#first_tbody").empty();
	
	for(var i=0;i<data.length;i++)
	{
		var txtHtml="";
		
		txtHtml += "<tr><td class='name'>"+ data[i].hostName +"</td>";   //节点名称
	
		txtHtml += "<td style='text-align:center;'>" + data[i].type + "</td>";
		txtHtml += "<td class='ip'>"+ data[i].hostip +"</td>";   //IP地址
		txtHtml += "<td class='mac'>"+ data[i].mac +"</td>";   //MAC地址
		txtHtml += "<td class='os'>"+ data[i].os +"</td>";   //操作系统
		//<span class="sparkline" data-sparkline-type="line" data-sparkline-width="50px" data-sparkline-height="18px">90,30,60,40,60,70,50,40,70,60,90,50</span>
		txtHtml += '<td style="text-align:center;"><span class="sparkline" data-sparkline-type="line" data-sparkline-width="80px" data-sparkline-height="18px">'+  data[i].cpu +"</span></td>";   //CPU
		txtHtml += '<td style="text-align:center;"><span class="sparkline" data-sparkline-type="line" data-sparkline-width="80px" data-sparkline-height="18px">'+  data[i].memory +"</span></td>";   //内存
		//<td style="text-align:center;">
		//<span class="sparkline display-inline" data-sparkline-type="pie" data-sparkline-offset="90" data-sparkline-piesize="18px">3,5,2
		//</span> 
	    //</td>  
		txtHtml += '<td style="text-align:center;"><span class="sparkline" data-sparkline-type="line" data-sparkline-width="80px" data-sparkline-height="18px">'+  data[i].hardDisk +"</span></td>";   //内存
		//txtHtml += "<td class='describe'>"+ data[i].description +"</td>";   //第3行 描述信息
	
		//txtHtml += "<td class='local'>"+ data[i].location +"</td>";   //第7行 节点位置
		txtHtml += "<td><a herf='#' class='readgraph' style='cursor: pointer;'>点击查看详情</a></td><tr>";
		//txtHtml += "<td><a class='btn btn-primary btn-sm' href='javascript:void(0);' name='modify'>修改</a><a class='btn btn-danger btn-sm' href='javascript:void(0);'name='delete'>删除</a></td></tr>";   //第9行 操作按钮
		
		$("#first_tbody").append(txtHtml);
		
	}

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
		$(".page1").dialog("open");
		var nodeip = $(this).parent().parent().find(".ip").html();
		;
		// area graph 1
 		$("#area-graph").empty();
 		$("#area-graph-1").empty();
 		$.post("./newServlet/nodeCpuMem",{nodeip:nodeip},function(text){
			var jsonText = JSON.parse(text);
 			//获得AreaGraph的data，并得到图形
			//var data_area = getAreaGraph1(text.serviceCallQuantity);
			//showAreaGraph1(data_area);
			//显示CPU和内存表
 			//alert("cpu data :" + jsonText.nodecpumem);
			showAreaGraph(jsonText.nodecpumem);
			//显示xy轴的坐标
			//setTimeout("showXY()", 1500);
			
       });
 		$.post("./newServlet/nodeHarddisk",{nodeip:nodeip},function(text){
			//获得AreaGraph的data，并得到图形
 			var jsonText = JSON.parse(text);

			showAreaGraph1(jsonText.nodeharddisk);
			//显示CPU和内存表
			//showAreaGraph(cpu_ram);
			//显示xy轴的坐标
			//setTimeout("showXY()", 1500);
			
       });
 		//alert("ssss");
 		$('#table2').dataTable({
			"sPaginationType" : "bootstrap_full",
			"aLengthMenu":[
			               [5,10,20,-1],
			               [5,10,20,"All"]
			 ],
			"iDisplayLength":5,
			"bServerSide" : true,
			"sAjaxSource" : "./newServlet/yxjk_3_4_Table_Servlet",
			"fnServerData" : function(sSource, aoData,fnCallback){
				$.ajax({
					"type" : "post",
					"url" : sSource,
					"datatype" : "json",
					"data" : {
						aoData : JSON.stringify(aoData),
						nodeIP : nodeip
					},
					"success": function(data){
						//alert("dssss");
						//alert("123:" + data);
						NodeList1(data);
					}	
				});
				
			 }
 		});
	
 		//pageSetUp();
	});
	pageSetUp();
}
			
function NodeList1(data){
	$("#table2 tbody").empty();
	//alert("nodelist1:" + data);
	res=data.split("@");
	
	var serviceinfo = JSON.parse(res[0]);
	var messageinfo = JSON.parse(res[1]);
	var servicestatusinfo = JSON.parse(res[2]);
	var lastinfo = JSON.parse(res[3]);
	var visitQuantity = "";
	//alert("lastinfo[0].visitQuantity.length   "+lastinfo[0].visitQuantity.length);
	for(var j = 0; j<lastinfo[0].visitQuantity.length;j++){
		visitQuantity +=lastinfo[0].visitQuantity[j]+",";
		
	}
	var SingleServiceRunTime = "";
	//alert("lastinfo[0].SingleServiceRunTime.length   "+lastinfo[0].SingleServiceRunTime.length);
	for(var j = 0; j<lastinfo[0].SingleServiceRunTime.length;j++){
		SingleServiceRunTime +=lastinfo[0].SingleServiceRunTime[j]+",";
		
	}
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

			//alert(messageinfo.messagelist[j].serviceid);
			//alert(serviceinfo.servicelist[i].serviceid);
			if(messageinfo.messagelist[j].serviceid == serviceinfo.servicelist[i].serviceid){
				
				messagelist[messagecount] = messageinfo.messagelist[j].servicemessage;
				//alert("messagelist:"+messageinfo.messagelist[j].servicemessage);
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
		appendinfo += '<td style="text-align:center;"><span class="sparkline" data-sparkline-type="line" data-sparkline-width="80px" data-sparkline-height="18px">'+  visitQuantity +"</span></td>";   //平均访问量
		appendinfo += '<td style="text-align:center;"><span class="sparkline" data-sparkline-type="line" data-sparkline-width="80px" data-sparkline-height="18px">'+  SingleServiceRunTime +"</span></td>";   //平均响应时间
		
		$("#table2 tbody").append(appendinfo);

	}

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
	pageSetUp();
}