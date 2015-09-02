$(document).ready(function() {			
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
	// DO NOT REMOVE : GLOBAL FUNCTIONS!
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
				url:"./newServlet/yxjk_3_6_jblb_Servlet",
				data:{startnumber:startnum,itemnumber:itemnumber},
				success:function(data){
					
					showservicelist(data);
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
					url:"./newServlet/yxjk_3_6_jblb_Servlet",
					data:{startnumber:startnum,itemnumber:itemnumber},
					success:function(data){
						showservicelist(data);
					}
				});
			}
			
		});
		//全部节点：点击下一页
		$(".allnoderesult .fa-chevron-right").parent().click(function(){
			var currentpage = $(".allnoderesult .active a").html();
		
			if(currentpage < pagenum){
				currentpage = Number(currentpage)+1;
				$(".allnoderesult .active").removeClass('active');
				var currentpage_s = "." + currentpage;
				$(currentpage_s).parent().addClass("active");

				var itemnumber = $("#itemnumber").val();	
				var startnum = itemnumber*(currentpage-1);
				$.ajax({
					type:"post",
					url:"./newServlet/yxjk_3_6_jblb_Servlet",
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
				url:"./newServlet/filterWarn",
				data:{type:searchtype,value:searchkey,startnumber:startnum,itemnumber:itemnumber},
				success:function(data){
					showservicelist1(data);
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
					url:"./newServlet/filterWarn",
					data:{type:searchtype,value:searchkey,startnumber:startnum,itemnumber:itemnumber},
					success:function(data){
						showservicelist1(data);
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
					url:"./newServlet/filterWarn",
					data:{type:searchtype,value:searchkey,startnumber:startnum,itemnumber:itemnumber},
					success:function(data){
						showservicelist1(data);
					}
				});
			}
		});
	}
	//全部节点：显示全部节点的页码
	$.ajax({
		type:"post",
		url:"./newServlet/getLogNumber",
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
		url:"./newServlet/yxjk_3_6_jblb_Servlet",
		data:{startnumber:0,itemnumber:itemnumber},
		success:function(data){
			
			showservicelist(data);
		}
	});

	/*******************条件搜索之后的节点显示***************************/
	//搜索节点： 点击搜索图标之后
	$("#searchservice").click(function(){
		var searchtype = $("#search-type").val();
		var searchkey = $("#searchvalue").val();
		//alert(searchtype+"_"+searchkey);
		$(".pagination").empty();
		$(".pagination").removeClass("allnoderesult");
		$(".pagination").addClass("searchresult");
		var selectValue;		
		if($('#search-type').val()=="LogType"){
			if($('#searchvalue').val()=="node"){
				selectValue = "节点类型";
			}else if($('#searchvalue').val()=="service"){
				selectValue = "服务类型";
			}else{
				selectValue = "容器类型";
			}
		}else{
			selectValue = $('#searchvalue').val();
		}
	
		//1 先请求节点个数生成页码
		$.ajax({
			type:"post",
			url:"./newServlet/getLogNumber2",
			data:{type:searchtype,value:selectValue},
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
			url: "./newServlet/filterWarn",
			data:{type:searchtype,value:selectValue,startnumber:0,itemnumber:itemnumber},
			success: function(data){
				//falert(data);
				showservicelist1(data);
			}
		});
		
	});


	 /***************每页显示个数变化之后*********************/
	//当每页显示个数变化之后
	$("#itemnumber").change(function(){
		itemnumber = $("#itemnumber").val();
		//重新生成页码

		pagenum = Math.ceil(allitemnumber/itemnumber);
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
				url:"./newServlet/yxjk_3_6_jblb_Servlet",
				data:{startnumber:0,itemnumber:itemnumber},
				success:function(data){
					//alert(data);
					showservicelist(data);
				}
			});
		}else{
			//请求搜索的数据
			showsearchpagination();
			$.ajax({
				type:"post",
				url: "./newServlet/filterWarn",
				data:{type:searchtype,value:searchkey,startnumber:0,itemnumber:itemnumber},
				success: function(data){
					showservicelist1(data);
				}
			});
		}
		
	});

	//选择一个搜索类型			
	$("#search-type").change(function(){
		var searchtype = $("#search-type").val();
		//alert(searchtype);
		if(searchtype == "LogContent"){
			//alert("1111");
			$(".filtertype").empty();
			$(".filtertype").append("<input type='text' class='input-sm' id='searchvalue'/>");
			
		}else{
			//alert("2222");
			$(".filtertype").empty();
			$(".filtertype").append("<select class='input-sm' id='searchvalue' style='font-size:14px'><option value='node'>节点类型</option><option value='service'>服务类型</option><option value='container'>容器类型</option></select>");
		}
	});		
					
});


function showservicelist(data){
	var warnJson = data.alarmTable; 
	$("#table1 tbody").empty();
	//var totalHtml = "";
	for(var i=0; i<warnJson.length;i++){
		var totalHtml = "<tr>";
		totalHtml += '<td style="'+'text-align:center;">'+warnJson[i][0]+'</td>'
					+'<td>'+warnJson[i][1]+'</td>'
					+'<td>'+warnJson[i][2]+'</td>'
					+'<td>'+warnJson[i][3]+'</td>'
					+'<td>'+warnJson[i][4]+'</td>';
		
		if(warnJson[i][6]=='1'){
		//<td><span class="glyphicon glyphicon-ok"></span><span>已处理</span></td>
			totalHtml +='<td><span class="txt-color-green glyphicon glyphicon-ok"></span><span>已处理</span></td>';
		}else{
			totalHtml +='<td><span class="txt-color-red glyphicon glyphicon-remove"></span><span>未处理</span><a style="float:right;"class="btn btn-success btn-sm" href="javascript:void(0);" onclick="warnDeal($(this));">处理</a></td>';
		}
		totalHtml += "</tr>";
		$("#table1 tbody").append(totalHtml);
	}

}
		

function showservicelist1(data){
	var jsonData = JSON.parse(data); 
	//var totalHtml = "";
	//alert(jsonData.alarmTable);
	var warnJson = jsonData.alarmTable;
	$("#table1 tbody").empty();
	for(var i=0; i<warnJson.length;i++){
		var totalHtml = "<tr>";
		totalHtml += '<td style="'+'text-align:center;">'+warnJson[i][0]+'</td>'
					+'<td>'+warnJson[i][1]+'</td>'
					+'<td>'+warnJson[i][2]+'</td>'
					+'<td>'+warnJson[i][3]+'</td>'
					+'<td>'+warnJson[i][4]+'</td>';
		
		if(warnJson[i][6]=='1'){
		//<td><span class="glyphicon glyphicon-ok"></span><span>已处理</span></td>
			totalHtml +='<td><span class="txt-color-green glyphicon glyphicon-ok"></span><span>已处理</span></td>';
		}else{
			totalHtml +='<td><span class="txt-color-red glyphicon glyphicon-remove"></span><span>未处理</span><a style="float:right;"class="btn btn-success btn-sm" href="javascript:void(0);" onclick="warnDeal($(this));">处理</a></td>';
		}
		totalHtml += "</tr>";
		$("#table1 tbody").append(totalHtml);
	}

}
		
function warnDeal(element){
	var num = element.parent().prev().prev().prev().prev().prev().html();
	//alert(num);
	$.post("./newServlet/yxjk_3_6_jbcl_Servlet",{alarmid:num},function(text){
		//alert(text+"tttttt");
		if(text){
			element.prev().html("已处理");
			
			element.prev().prev().removeClass("glyphicon-remove txt-color-red");
			element.prev().prev().addClass("glyphicon-ok txt-color-green");
			element.css("display","none");
		}else{
			alert("处理失败！");
		}				
		
   }
   );
}