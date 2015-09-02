var timer = "";
//serverIP 记得改
var serverIP = "localhost:8080";
var localIP = "";
$(function(){
	localIP = $("#localIP").val();
	console.log("localIP```"+localIP);
	//先从servlet里得到配置文件列表，添加到新建弹出框的option里
	$.post("./fzgl.do",{filelist:"123123"},function(text){
		console.log(text);
		var list = text.split(",");
		console.log(list.length);
		for(var i = 0;i < list.length;i++){
			if(list[i] != ""){
				var option = '<option value="'+list[i]+'">'+list[i]+'</option>';
				$("#configure").append(option);
			}
		}
		$("#configure > option:first").attr("selected","selected");
	});
	readTestList();
	$("#_9").click(function(){	//查询按钮点击事件
		if($(this).attr("disabled") == true || $(this).attr("disabled") == "disabled"){
			return false;
		}
		var arr = new Array();
		$("#table1").find("tr").each(function(){
			var isCheck = $(this).find("li.check input").attr("checked");
			if(isCheck){
				var index = $(this).attr("id").substr($(this).attr("id").indexOf("_") + 1);
				arr.push(index);	
			}
		});
		$.ajax({
			type:"POST",
			data:{query:arr.join(",")},
			success:function(text){
				//alert(text);
			}
			});
	});
	$(".test ul li a").click(function(){
		if($(this).attr("disabled") == true || $(this).attr("disabled") == "disabled"){
			return false;
		}
		var conFile = getConf();
		var command = $(this).attr("id").substr(1);
		var cmd = parseInt(command);
		//alert(cmd);
		console.log("hao---"+$("#test").val());
		$.ajax({
			url:"./fzgl.do",
			type:"POST",
			data:{cmd:command,configure:conFile,testId:$("#test").val()},
			success:function(text){
				switch(cmd)
				{
					case 1:	//初始化
						setEnabled($("#_2"));
						setDisabled($("#_10"));
					break;
					case 2:	//开始
						setDisabled($("#_2"));
						setEnabled($("#_3"));
						setEnabled($("#_6"));
						setEnabled($("#_5"));
					break;
					case 3:	//结束
						setDisabled($("#_3"));
						setDisabled($("#_6"));
						setDisabled($("#_7"));
						setDisabled($("#_5"));
						setEnabled($("#_2"));
						setEnabled($("#_4"));
						setEnabled($("#_8"));
						setEnabled($("#_10"));
						setEnabled($("#_12"));
					break;
					case 4:	//归档
					break;
					case 5:	//调速
					break;
					case 6:	//暂停
						setEnabled($("#_7"));
						setDisabled($("#_6"));
					break;
					case 7:	//恢复
						setEnabled($("#_6"));
						setDisabled($("#_7"));
					break;
					case 8:	//回放
					break;
					case 9:	//查询
					break;
					case 10:	//试验部署
						setEnabled($("#_11"));
						setEnabled($("#_9"));
					break;
					case 11:	//试验接入
						setEnabled($("#_12"));
						setEnabled($("#_1"));
						setEnabled($("#_8"));
					break;
					case 12:	//试验退出
						setEnabled($("#_10"));
						setDisabled($("#_11"));
						setDisabled($("#_12"));
						for(var i = 1;i <= 8;i++){
							var id = "#_" + i;
							setDisabled($(id));
						}
					break;
				}
			}
			});
	});
	$("#testnumber").change(testChange);
	testChange();
});

function getConf(){
	return $("#conf").val();
}

function getTestNum(){
	return $("#testnumber").val();
}

function getTest(){
	return $("#test").val();
}

//试验管理  新建实验 传递xml名字和ip地址，通过ip和配置文件得到试验代号，即试验管理页面显示的代号
function createSubmit(){
	//alert("helllo");
	var conf = $("#configure").val();
	$.post("./fzgl.do",{createConf:conf,createIP:localIP},function(text){
		if(text.length == 15){
			var option = "<option>" + text + "#</option>";
			$("#testnumber").prepend(option);
		}
		
		$.messager.alert('提示','创建试验成功');
	});
}

//得到试验代号option,注意编码格式
function readTestList(){
	$("#testnumber").empty();
	$.post("xml/test.xml",{},function(xml){
		console.log(xml);
		
		$(xml).find("TEST").each(function(){
			//alert($(this).children("hello").text()+"sss");
			var testnum = $(this).children("试验代号").text();
			
			var option = "<option>" + testnum + "</option>";
			$("#testnumber").append(option);
		});
	});
}
//查看试验
function check(){
	$(".select_file").css("display","none");
	var num = getTestNum().substr(0,17);
	console.log("num:"+num);
	if(getTest() != num){
		//若当前试验不为空 要先记录下试验的执行状态
		if(getTest() != ""){
			if($("#self").val() == "true"){
				var state = encodeState();
				//实验代号和当前状态
				
				$.post("./fzgl.do",{checkTestId:$("#_test").val(),testState:state});
			}
		}
		if(timer != ""){
			clearTimeout(timer);
			timer = "";
		}
		$.post("xml/test.xml",{},function(xml){
			$(xml).find("TEST").each(function(){
				console.log("实验代号:"+$(this).children("试验代号").text());
				if(num == $(this).children("试验代号").text()){
					console.log("come!!!");
					$("#test").val(num);
					$("#conf").val($(this).children("配置文件").text());
					if($(this).children("创建IP").text() == localIP){
						$("#self").val("true");
						if($(this).children("运行").text() == "true")
							decodeState($(this).children("状态").text());
						else
							decodeState("000000000100");
					}
					else{
						$("#self").val("false");
						decodeState("000000000000");
					}
				}
			});
			getXml();
			//updateConfXml();
			getTestState();
			
		});
	}
	//showTab1("div_1_1");
	$("#main_area").css("display","block");
}
function encodeState(){
	var state = "";
	for(var i = 1;i <= 12;i++){
		var obj = $("#_"+i);
		if(obj.attr("disabled") == null || obj.attr("disabled") == false){
			state += "1";
		}
		else{
			state += "0";
		}
	}
	return state;
}
//更新那九个button的状态
function decodeState(state){
	for(var i = 1;i <=12;i++){
		var obj = $("#_"+i);
		if(state.charAt(i-1) == 1)
			setEnabled(obj);
		else
			setDisabled(obj);
	}
}
//得到输入框里的想定名称和作战时间
function getXml(){
	var conFile = getConf();
	$("#table1 .data_list").empty();
	console.log("conFile:"+conFile);
	$.ajax({
		url:"./fzgl.do",
		type:"POST",
		data:{configure:conFile},
		dataType:"xml",
		success:function(xml){
			var node = $(xml).find("试验信息");
			//获取想定名称
			$("#xiangding").val(node.attr("想定名称"));
			//获取作战时间
			$("#fight").val(node.attr("作战开始时间"));
			var d = new Date();
			var mon = d.getMonth() + 1;
			//alert("mon:"+mon);
			var month = mon;
			if(mon < 10){
				month = "0" + mon;
			}
			var intday = d.getDate();
			//alert("intday:"+intday);
			var day = intday;
			if(intday < 10){
				day = "0" + intday;
			}
			var h = d.getHours();
			var hour = h;
			//alert("hour:"+hour);
			if(h < 10){
				hour = "0" + h;
			}
			var m = d.getMinutes();
			var minute = m;
			//alert("minute:"+minute);
			if(m < 10){
				minute = "0" + m;
			}
			var s = d.getSeconds();
			var second = s;
			//alert("second:"+minute);
			if(s < 10){
				second = "0" + s;
			}
			var date = d.getFullYear() + "年" + month + "月" + day + "日" + hour + "时" + minute + "分" + second + "秒";
			console.log(date);
			//天文时间
			$("#tianwen").val(date);
			var no = 0;

			$(xml).find("模型设备信息").children("模型设备").each(function(){
				var name = $(this).attr("名称");
				var id = $(this).attr("标识");
				if(id != "101"){
					no++;
					var device = '<tr id="index_' + id + '"><td class="no" style="display:none;">'+no+'</td><td class="check" style="display:none;"><input type="checkbox"></td><td class="deviceName">' + name + '</td><td class="reportTime"></td><td class="currentState"></td><td class="exeState"></td><td class="other"></td></tr>';
					$("#table1 .data_list").append(device);
				}
			});
			for(no++;no <= 20;no++){
				var temp = '<tr><td class="no" style="display:none;">'+no+'</td></tr>';
				$("#table1 .data_list").append(temp);
			}
			//initPage();
			}
	}
	);
}
//更新配置xml
function updateConfXml(){
	var conFile = getConf();
	console.log("conFile---update:"+conFile);
	$.post("./servlet/updateConfXml",{configure:conFile},function(text){
		
	});
}
//给弹出的table赋值
function getTestState(){
	var testnum = $("#test").val();
	console.log("testnum:"+testnum);
	//alert("sss");
	$.ajax({
		url:"xml/" + testnum + "state.xml",
		type:"POST",
		success:function(xml){
			$(xml).find("node").each(function(){
				
				var id = $(this).attr("seatid");
				console.log(id+"--seatid")
				var reportTime = $(this).children("报告时间").text();
				if(reportTime == ""){
					reportTime = "-";
				}
				var curState = $(this).children("当前状态").text();
				var exeState = $(this).children("执行状态").text();
				var obj = $("#table1 .data_list tr#index_" + id);
				if(obj != null){
					obj.find(".reportTime").text(reportTime);
					obj.find(".currentState").text(curState);
					obj.find(".exeState").text(exeState);
					obj.find(".other").html('<a class="btn btn-lg btn-primary"><i class="fa fa-resize-vertical"></i>&nbsp详情</a> <a class="btn btn-lg btn-primary" onclick="openVNC(\'支撑工具\',\''+id+'\')"><i class="fa fa-resize-vertical"></i>&nbsp监控</a>');
				}
			});
		}
	});
	timer = setTimeout(getTestState,3000);
}

function setDisabled(obj){
if(obj.attr("disabled") == null || obj.attr("disabled") == false){
	obj.attr("disabled","disabled");
}
}

function setEnabled(obj){
	if(obj.attr("disabled") == true || obj.attr("disabled") == "disabled"){
		obj.removeAttr("disabled");
	}
}

//显示新建弹出框
function create(){
	//alert("hello");
	$("#main_area").css("display","none");
	$(".select_file").css("display","block");
}

//试验管理  新建实验 传递xml名字和ip地址，通过ip和配置文件得到试验代号，即试验管理页面显示的代号
function createSubmit(){
	//alert("helllo");
	var conf = $("#configure").val();
	$.post("./fzgl.do",{createConf:conf,createIP:localIP},function(text){
		//if(text.length == 15){
			var option = "<option>" + text + "</option>";
			$("#testnumber").prepend(option);
		//}
		
		alert('创建试验成功');
	});
	$(".select_file").css("display","none");
}
//隐藏新建弹出框
function createCancel(){
	$(".select_file").css("display","none");
}
//删除试验
function deleteTest(){
	
	if(confirm('确定要删除吗？')){
		
		if($("#delete").attr("disabled") == null || $("#delete").attr("disabled") == false){
			var num = getTestNum();
			if(num.indexOf("*") >= 0){
				alert("该试验正在运行，请停止试验后重试。");
				return ;
			}
			num = num.substr(0,15);
			//发送要删除的试验号
			$.post("./fzgl.do",{deleteTestId:num},function(){
				readTestList();
			});
			
		}
		
	}
	
}

function testChange(){
	var num = getTestNum();
	if(num.indexOf("#") >= 0){
		setEnabled($("#delete"));
	}
	else{
		setDisabled($("#delete"));
	}
}

//打开远程桌面，name:文件名，如果是态势显示等。则name也等于title。  id：seatid
function openVNC(name,id){
	var device = "";
	if(name == "态势显示" || name == "试验导调" || name == "数据采集"){
		device = name;
	}else{
		device = $("#index_"+id).find("td.deviceName").html();
	}
	var conFile = getConf();
	//var conFile="configure3.xml";
	jiliip = "";
	$.post("./servlet/openVNC1",{configure:conFile,tag:"openVNC",id:id,name:name},function(xml){
	},"xml");
}