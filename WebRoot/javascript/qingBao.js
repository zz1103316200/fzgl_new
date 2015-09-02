var serverIP = "localhost:8080";
$(function(){
	//alert("dss");
	pageSetUp();
	cancel2();
	//readXmlToRadar(getCurrentFangan());
	$("#searchservice").click(function(){
		var searchtype = $("#search-type").val();
		//var searchkey = $("#searchvalue").val();
		//alert(searchtype+"_"+searchkey);
		//var json=[{"kl_id":"2","kl_title":"Test date","kl_content":"Test date","kl_type":"1","id":"1"},{"kl_id":"2","kl_title":"Test","kl_content":"Test","kl_type":"1","id":"2"}]
		if(searchtype=="new_plan"){
			readXmlToEsm("新建方案");
		}else{
			readXmlToEsm($("#searchvalue").val());
		}

		
	});
	
	//选择新建方案或者已有方案	
	$("#search-type").change(function(){
		var searchtype = $("#search-type").val();
		//alert(searchtype);
		if(searchtype == "old"){
			//alert("1111");
			$(".filtertype").empty();
			//$(".filtertype").append("<input type='text' class='input-sm' id='searchvalue'/>");
			
			
		}else{
			//alert("2222");
			$(".filtertype").empty();
			//$(".filtertype").append("<select class='input-sm' id='searchvalue' style='font-size:14px'><option value='node'>节点类型</option><option value='service'>服务类型</option><option value='container'>容器类型</option></select>");
		}
	});	
	$.ajax({
		url:"./qbfz.do",
		type:"POST",
		data:{querylist:"aaa"},
		success:function(text){
			console.log(text);
			var list = new Array();
			list = text.split("#");
			//var option = "<select class='input-sm' id='searchvalue' style='font-size:14px'>";
			for(var i = 0;i < list.length;i++){
				if(list[i] != "新建方案"){
					option = '<option value="'+list[i]+'">'+list[i]+'</option>';
					$(option).appendTo("#fangan");
				}
			}
			//option+="</select>";
			
		}
		});
	
	$.post("xml/xiangDing.xml",{},function(xml){
		console.log(xml);
		
		$(xml).find("想定").each(function(){
			//alert($(this).children("hello").text()+"sss");
			var testnum = $(this).children("名称").text();
			
			var option = "<option>" + testnum + "</option>";
			$("#select-1").append(option);
		});
	});
//	$("old_plan").click(function(){
//		
//	});
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
//改变是已有方案还是新建方案
function changeFangan(type){
	if(type == 1){
		$("#fangan").attr("disabled","disabled");
		//$(".position span").text("新建方案");
		$("#old_plan").removeAttr("checked");
		$("#new_plan").attr("checked","checked");
		readXmlToFanganList("新建方案");
	}
	if(type == 2){
		$("#fangan").removeAttr("disabled");
		$("#old_plan").attr("checked","checked");
		$("#new_plan").removeAttr("checked");
		var fname = $("#fangan").val();
		//$(".position span").text(fname);
		readXmlToFanganList(fname);
	}
}

function fanganChange(fname){
	//$(".position span").text(fname);
	readXmlToFanganList(fname);
}

function cancel2(){
	var form = document.getElementById("form5");
	form.reset();
	//form.num.disabled = false;
	//$("#button_ok").hide();
	//$("#button_cancel").hide();
	//$("#button_submit").show();
}


function readXmlToFanganList(fname){
	//alert(fname);
	var file = "qbfzXml/" + fname + ".xml";
	console.log("file:"+file);
	//$(".radar .list_list").empty();
	$("#leiDatable").empty();
	$.ajax({
		url:"./qbfz.do",
		type:"POST",
		data:{zhongwenfile:file},
		dataType:"xml",
		success:function(xml){
			var name = $(xml).find("方案名称").attr("方案");
			var user = $(xml).find("用户信息").attr("名称");
			var file1 = $(xml).find("剧情").attr("想定名称");
			$("#qingBao_name").val(name);
			$("#qingBao_user").val(user);
			$("#select-1").val(file1);
			console.log("name:"+name);
			console.log("user:"+user);
			console.log("file1:"+file1);
			var index = 0;
			$(xml).find("esm").find("模拟器").each(function(){
				index++;
				var type = "Esm";
				var num = $(this).attr("站号");
				var position = $(this).children("位置");
				var _x = position.attr("经度");
				var _y = position.attr("纬度");
				var _z = position.attr("高度");
				var format = $(this).children("情报格式").attr("格式");
				var proto = $(this).children("传输协议").attr("协议");
				var ip = $(this).children("目的IP").attr("地址");
				var radar = '<tr><td class="no" style="display:none;">'+index+'</td><td class="type">'+type+'</td><td class="station">'+num+'</td><td class="long">'+_x+'</td><td class="lat">'+_y+'</td><td class="height">'+_z+'</td><td class="format">'+format+'</td><td class="protocol">'+proto+'</td><td class="address">'+ip+'</td></tr>';
				$("#leiDatable").append(radar);
			});
			$(xml).find("雷达").find("模拟器").each(function(){
				index++;
				var type = "雷达";
				var num = $(this).attr("站号");
				var position = $(this).children("位置");
				var _x = position.attr("经度");
				var _y = position.attr("纬度");
				var _z = position.attr("高度");
				var format = $(this).children("情报格式").attr("格式");
				var proto = $(this).children("传输协议").attr("协议");
				var ip = $(this).children("目的IP").attr("地址");
				var radar = '<tr><td class="no" style="display:none;">'+index+'</td><td class="type">'+type+'</td><td class="station">'+num+'</td><td class="long">'+_x+'</td><td class="lat">'+_y+'</td><td class="height">'+_z+'</td><td class="format">'+format+'</td><td class="protocol">'+proto+'</td><td class="address">'+ip+'</td></tr>';
				$("#leiDatable").append(radar);
			});
			//$(".list .list_list > div.record:odd").css("background","#f0f0f0");
			//$(".list .list_list > div.record:even").css("background","#bbf0f0");
		}
		});
}
//点提交按钮触发
function submitFangan(){
	var old = "";
	var form = document.getElementById("form5");
	//alert($("#new_plan").attr("checked"));
	if($("#new_plan").attr("checked") == "checked"){
		old = "新建方案";
	}
	else{
		old = $("#fangan").val();
	}
	console.log("old:"+old);
	//var fangan = getFanganname();//即：新建方案
	var fangan = $("#qingBao_name").val();
	var user = $("#qingBao_user").val();
	var file = $("#select-1").val();
	if(fangan == ""){
		alert("请输入新方案名称。");
		return ;
	}
	if(user == ""){
		alert("请输入用户信息。");
		return ;
	}
	if(file == null){
		alert("请输入想定文件。");
		return ;
	}
	
	$.ajax({
		url:"./qbfz.do",
		type:"POST",
		data:{old:old,fangan:fangan,user:user,file:file},
		success:function(text){
			if(text == "true"){
				var option = '<option value="'+fangan+'">'+fangan+'</option>';
				if(old != fangan){
					$(option).prependTo("#fangan");
				}
				$("#fangan").val(fangan);
				$("#old_plan").attr("checked","checked");
				$("#new_plan").removeAttr("checked");
				$("#fangan").removeAttr("disabled");
				alert(fangan);
				readXmlToFanganList(fangan);
			}
			if(text == "false"){
				alert("添加方案失败，请检查方案是否已存在。");
			}
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