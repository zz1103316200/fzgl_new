var serverIP = "localhost:8080";
$(function(){
	//alert("dss");
	pageSetUp();
	cancel1();
	//readXmlToRadar(getCurrentFangan());
	$("#searchservice").click(function(){
		var searchtype = $("#search-type").val();
		//var searchkey = $("#searchvalue").val();
		//alert(searchtype+"_"+searchkey);
		//var json=[{"kl_id":"2","kl_title":"Test date","kl_content":"Test date","kl_type":"1","id":"1"},{"kl_id":"2","kl_title":"Test","kl_content":"Test","kl_type":"1","id":"2"}]
		if(searchtype=="new_plan"){
			readXmlToRadar("新建方案");
		}else{
			readXmlToRadar($("#searchvalue").val());
		}

		
	});
	
	//选择新建方案或者已有方案	
	$("#search-type").change(function(){
		var searchtype = $("#search-type").val();
		//alert(searchtype);
		console.log("searchtype:"+searchtype);
		if(searchtype == "old_plan"){
			//alert("1111");
			$(".filtertype").empty();
			//$(".filtertype").append("<input type='text' class='input-sm' id='searchvalue'/>");
			$.ajax({
				url:"./qbfz.do",
				type:"POST",
				data:{querylist:"aaa"},
				success:function(text){
					var list = new Array();
					list = text.split("#");
					var option = "<select class='input-sm' id='searchvalue' style='font-size:14px'>";
					for(var i = 0;i < list.length;i++){
						if(list[i] != "新建方案"){
							option += '<option value="'+list[i]+'">'+list[i]+'</option>';
							
						}
					}
					option+="</select>";
					$(option).appendTo(".filtertype");
				}
				});
			
		}else{
			//alert("2222");
			$(".filtertype").empty();
			//$(".filtertype").append("<select class='input-sm' id='searchvalue' style='font-size:14px'><option value='node'>节点类型</option><option value='service'>服务类型</option><option value='container'>容器类型</option></select>");
		}
	});	
	$("#tran_protocol label input").click(function(){
		for(var i = 0;i < $("#tran_protocol label span").length;i++){
			//alert($("#qingbao_style label span")[i].html());
			
				$($("#tran_protocol label span")[i]).attr("checked","false");

		}
		$(this).attr("checked","checked");
	});
	$("#qingbao_style label input").click(function(){
		for(var i = 0;i < $("#qingbao_style label span").length;i++){
			//alert($("#qingbao_style label span")[i].html());
			
				$($("#qingbao_style label span")[i]).attr("checked","false");

		}
		$(this).attr("checked","checked");
	});
	
});
function cancel1(){
	var form = document.getElementById("form1");
	form.reset();
	//form.num.disabled = false;
	$("#button_ok").hide();
	$("#button_cancel").hide();
	$("#button_submit").show();
}

function readXmlToRadar(fname){
	//alert(fname);
	var file = "qbfzXml/" + fname + ".xml";
	//$(".radar .list_list").empty();
	$("#leiDatable").empty();
	$.ajax({
		url:"./qbfz.do",
		type:"POST",
		data:{zhongwenfile:file},
		dataType:"xml",
		success:function(xml){
			var index = 0;
			$(xml).find("雷达").find("模拟器").each(function(){
				index++;
				var num = $(this).attr("站号");
				var position = $(this).children("位置");
				var _x = position.attr("经度");
				var _y = position.attr("纬度");
				var _z = position.attr("高度");
				var format = $(this).children("情报格式").attr("格式");
				var proto = $(this).children("传输协议").attr("协议");
				var ip = $(this).children("目的IP").attr("地址");
				var radar = '<tr><td class="no" style="display:none;">'+index+'</td><td class="station">'+num+'</td><td class="long">'+_x+'</td><td class="lat">'+_y+'</td><td class="height">'+_z+'</td><td class="format">'+format+'</td><td class="protocol">'+proto+'</td><td class="address">'+ip+'</td><td class="operation"><a onClick="modify1(\''+num+'\')" class="btn btn-primary deleteservice btn-sm"><i class="fa fa-gear"></i>&nbsp;&nbsp;修改</a></td><td><a onClick="delete1(\''+num+'\')" class="btn btn-danger deleteservice btn-sm"><i class="fa fa-gear"></i>&nbsp;&nbsp;卸载</a></td></tr>';
				$("#leiDatable").append(radar);
			});
			//$(".list .list_list > div.record:odd").css("background","#f0f0f0");
			//$(".list .list_list > div.record:even").css("background","#bbf0f0");
		}
		});
}
//点击列表中的修改按钮触发
function modify1(num){
//	var type = "radar";
//	var form = document.getElementById("form1");
	//alert($("#table1").find("#leiDatable").length);
	
	$("#leiDatable").find("td.station").each(function(){
		//alert(num);
		if($(this).html() == num){
			//alert("ssssss");
			$("#num").val(num);
			$("#num").attr("disabled","true");
			//$("#_x").html = $(this).find("li.long").text();
			$("#_x").val($(this).next().html());
			$("#_y").val($(this).next().next().html());
			$("#_z").val($(this).next().next().next().html());
			$("#_ip").val($(this).next().next().next().next().next().next().html());
			//form._y.value = $(this).find("td.lat").text();
			//form._z.value = $(this).find("td.height").text();
			//form.ip.value = $(this).find("td.address").text();
			//alert( $("#qingbao_style label span").length);
			for(var i = 0;i < $("#qingbao_style label span").length;i++){
				//alert($("#qingbao_style label span")[i].html());
				if($($("#qingbao_style label span")[i]).html() == $(this).next().next().next().next().html()){
					$($("#qingbao_style label input")[i]).attr("checked","checked");
					break;
				}
			}
			
			for(var i = 0;i < $("#tran_protocol label span").length;i++){
				if($($("#tran_protocol label span")[i]).html() == $(this).next().next().next().next().next().html()){
					$($("#tran_protocol label span")[i]).attr("checked","checked");
					break;
				}
			}
//			for(var i = 0;i < form.proto.length;i++){
//				if(form.proto[i].value == $(this).find("li.protocol").text()){
//					form.proto[i].checked = true;
//					break;
//				}
//			}
			return ;
		}
	});
	
	$("#button_submit").hide();
	$("#button_ok").show();
	$("#button_cancel").show();
}
//点击列表中的删除按钮触发
function delete1(num){
	var type = "radar";
//	var form = document.getElementById("form1");
	var fangan = getFanganname();
	alert(fangan);
	alert(num);
	//alert(fangan);
	$.ajax({
		url:"./qbfz.do",
		type:"POST",
		data:{fangan:fangan,type:type,ope:"del",num:num},
		success:function(text){
			$("#leiDatable").find("td.station").each(function(){
			if($(this).html() == num){
				$(this).parent().remove();
				return ;
			}
		});
	}
	});
}
//点修改后保存
function ok1(){
	var type = "radar";
	var form = document.getElementById("form1");
	var fangan = $("#searchvalue").val();
	//alert("fangan:"+fangan);
	if($("#_x").val() == ""){
		alert("模拟器经度不能为空");
		return false;
	}
	if($("#_y").val() == ""){
		alert("模拟器纬度不能为空");
		return false;
	}
	if($("#_z").val() == ""){
		alert("模拟器高度不能为空");
		return false;
	}
	var fmt = "";
	var pro = "";
	for(var i = 0;i < $("#qingbao_style label span").length;i++){
		//alert($("#qingbao_style label span")[i]);
		//alert($($("#qingbao_style label input")[i]).attr("checked"));
		if($($("#qingbao_style label input")[i]).attr("checked")=="checked"){
			
			fmt = $($("#qingbao_style label span")[i]).html();
		}
	}
	//("fmt:"+fmt);
	for(var i = 0;i < $("#tran_protocol label span").length;i++){
		if($($("#tran_protocol label input")[i]).attr("checked")=="checked"){
			
			pro = $($("#tran_protocol label span")[i]).html();
		}
	}
	//alert("pro:"+pro);
	var num = $("#num").val();
	//alert("num:"+num);
	$.ajax({
		url:"./qbfz.do",
		type:"POST",
		data:{fangan:fangan,type:type,ope:"mod",num:num,_x:$("#_x").val(),_y:$("#_y").val(),_z:$("#_z").val(),format:fmt,proto:pro,ip:$("#_ip").val()},
		success:function(text){
		//alert(text);
			$("#leiDatable").find("td.station").each(function(){
			if($(this).html() == num){
				$(this).next().html($("#_x").val());
				$(this).next().next().html($("#_y").val());
				$(this).next().next().next().html($("#_z").val());
				$(this).next().next().next().next().html(fmt);
				$(this).next().next().next().next().next().html(pro);
				$(this).next().next().next().next().next().next().html($("#_ip").val());
				alert("ddd");
				form.reset();
				alert("cccc");
				$("#num").removeAttr("disabled");
				$("#button_ok").hide();
				$("#button_cancel").hide();
				$("#button_submit").show();
				return ;
			}
		});
	}
	});
}
//点提交按钮触发
function submit1(){
	var type = "radar";
	var form = document.getElementById("form1");
	var fangan = getFanganname();//即：新建方案
	if($("#num").val() == ""){
		alert("模拟器站号不能为空");
		return false;
	}
	if(isNaN($("#num").val())){
		alert("模拟器站号格式不正确");
	}
	var flag = 0;
	$("#leiDatable").find("td.station").each(function(){
		var s = $(this).html();
		if(s == $("#num").val()){
			alert("模拟器站号重复");
			flag = 1;
			return false;
		}
	});
	if(flag == 1){
		return false;
	}
	if($("#_x").val() == ""){
		alert("模拟器经度不能为空");
		return false;
	}
	if($("#_y").val() == ""){
		alert("模拟器纬度不能为空");
		return false;
	}
	if($("#_z").val() == ""){
		alert("模拟器高度不能为空");
		return false;
	}
	var fmt = "";
	var pro = "";
	for(var i = 0;i < $("#qingbao_style label span").length;i++){
		//alert($("#qingbao_style label span")[i]);
		//alert($($("#qingbao_style label input")[i]).attr("checked"));
		if($($("#qingbao_style label input")[i]).attr("checked")=="checked"){
			
			fmt = $($("#qingbao_style label span")[i]).html();
		}
	}
	//("fmt:"+fmt);
	for(var i = 0;i < $("#tran_protocol label span").length;i++){
		if($($("#tran_protocol label input")[i]).attr("checked")=="checked"){
			
			pro = $($("#tran_protocol label span")[i]).html();
		}
	}
	var num = $("#num").val();
	var _x = $("#_x").val();
	var _y = $("#_y").val();
	var _z = $("#_z").val();
	var _ip = $("#_ip").val();
	var no = $("#leiDatable").find("td.no").length;
	$.ajax({
		url:"./qbfz.do",
		type:"POST",
		data:{fangan:fangan,type:type,ope:"add",num:$("#num").val(),_x:_x,_y:_y,_z:_z,format:fmt,proto:pro,ip:_ip},
		success:function(text){
		//alert(text);
		var record =  '<tr><td class="no" style="display:none;">'+no+'</td><td class="station">'+num+'</td><td class="long">'+_x+'</td><td class="lat">'+_y+'</td><td class="height">'+_z+'</td><td class="format">'+fmt+'</td><td class="protocol">'+pro+'</td><td class="address">'+_ip+'</td><td class="operation"><a onClick="modify1(\''+num+'\')" class="btn btn-primary deleteservice btn-sm"><i class="fa fa-gear"></i>&nbsp;&nbsp;修改</a></td><td><a onClick="delete1(\''+num+'\')" class="btn btn-danger deleteservice btn-sm"><i class="fa fa-gear"></i>&nbsp;&nbsp;卸载</a></td></tr>';
		$("#leiDatable").append(record);
		form.reset();
		//$(".list .list_list > div.record:odd").css("background","#f0f0f0");
		//$(".list .list_list > div.record:even").css("background","#bbf0f0");
	}
	});
}
//返回方案名
function getFanganname(){
	if( $("#search-type").val()=="old_plan"){
		var name = $("#searchvalue").val();
		return name;
	}else{
		return "新建方案";
	}
}