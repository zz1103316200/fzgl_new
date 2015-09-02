var serverIP = "localhost:8080";
$(function(){
	
	$("#div_2_6 ul li a").click(function(){
		if($(this).attr("disabled") == true || $(this).attr("disabled") == "disabled"){
			return false;
		}
		var command = $(this).attr("id").substr(5);
		var cmd = parseInt(command);
		$.ajax({
			url:"./qbkz.do",
			type:"POST",
			data:{cmd:command},
			success:function(text){
//				if(text == "true")
				{
					switch(cmd)
					{
						case 1:	//初始化
							setEnabled($("#fzkz_2"));
							setEnabled($("#fzkz_5"));
						break;
						case 2:	//开始
							setEnabled($("#fzkz_3"));
							setDisabled($("#fzkz_2"));
							setEnabled($("#fzkz_5"));
						break;
						case 3:	//暂停
							setEnabled($("#fzkz_4"));
							setDisabled($("#fzkz_3"));
						break;
						case 4:	//恢复
							setEnabled($("#fzkz_3"));
							setDisabled($("#fzkz_4"));
						break;
						case 5:	//停止
							setEnabled($("#fzkz_2"));
							setDisabled($("#fzkz_3"));
							setDisabled($("#fzkz_4"));
							setDisabled($("#fzkz_5"));
						break;
					}
				}
			}
			});
	});

});
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