// JavaScript Document
var timer = "";
//serverIP 记得改
var serverIP = "192.168.10.91:8080";
var localIP = "";

function openVNC1(name){
	$.post("./servlet/openVNC_solid",{name:name},function(ip){

	});
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
	$.post("./servlet/openVNC1",{configure:conFile,tag:"openVNC",id:id,name:name},function(xml){

	},"xml");
}

//打开远程桌面。 name：文件名。 btn:要向服务器端发送的命令
function openVNC2(name,btn){
	
	$.post("./servlet/openVNC2",{btn_left:btn,name:name},function(ip){
		//alert("hello");
		if(ip == "false"){
			alert("请求超时。");
			return ;
		}
		//创建一个对应ip的VNC文件
	});
}
function getConf(){
	return $("#conf").val();
}