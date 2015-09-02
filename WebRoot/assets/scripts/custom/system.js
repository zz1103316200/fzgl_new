var System = function () {



    return {

        //main function
        init: function () {         

            var gdata;
            var alertData;
            var tileColor=["bg-green","bg-yellow","bg-purple","bg-blue","bg-red","bg-dark"];
            function getGdata() {
                $.post("servlet/yxjk_9_warning_Servlet",null,function(data) {
              	  alertData=data.warnings;            	
              	  updateAlertInfo();
                  });
              $.post("servlet/yxjk_4_xt_Servlet",null,function(data) {
                gdata=data;
                updateView();
                updateTable();
                var tiles=$(".tile");
                $(tiles[1]).click();
              });
             // gdata=JSON.parse('[{"amount":[1,1],"host-Table":[{"CPU":"46.1%","IP":"192.168.0.96","MAC":"DE-89-OI-9I-EI-KL","RAM":"78%","hddList":["C:45%","D:45%","E:45%"],"hostName":"hp-PC2"}],"service-Table":[{"serviceIP":"192.168.0.96","serviceKind":"Axis2","serviceName":"addService","serviceSystem":"sys1","state":"started"}],"sysName":"sys1"},{"amount":[1,1],"host-Table":[{"CPU":"33.1%","IP":"192.168.0.93","MAC":"DE-99-OI-9I-EI-KL","RAM":"11%","hddList":["C:45%","D:45%","E:45%"],"hostName":"dd-PC"}],"service-Table":[{"serviceIP":"192.168.0.93","serviceKind":"Axis2","serviceName":"SubService","serviceSystem":"sys2","state":"started"}],"sysName":"sys2"}]');
           
            }
            

            function updateAlertInfo() {
                var alertBar=$("#header_notification_bar");              
                alertBar.find(".badge").html(alertData.length);

                var list=alertBar.find("li");
                $(list[0]).find("p").html("今天最近有"+alertData.length+"条警报");

                var alertTemplate=alertBar.find(".template");
                for (var i = 0; i < alertData.length; i++) {
                  var newAlert=alertTemplate.clone().removeClass("template");
                  newAlert.find("small").html(alertData[i][3]);
                  newAlert.find(".time").html(alertData[i][1].split(" ")[1]);
                  alertBar.find(".dropdown-menu-list").append(newAlert);
                }
                alertTemplate.hide();              
              }



            function updateView() {

              var tiles=$(".tiles");
              var tileTemplate=tiles.find(".template");
            
              for (var i = 0; i < gdata.length; i++) {
                var newTile=tileTemplate.clone().removeClass("template");
                newTile.addClass(tileColor[i%6]);
                newTile.find(".title").html(gdata[i].sysName);
                newTile.find(".number").html(gdata[i].amount[0]);
                tiles.append(newTile);
                //console.log(newTile);
              }; 

              $(".tile").click(function(e){
                  var sysInfo;
                  for (var i = 0; i < gdata.length; i++) {
                    if(gdata[i].sysName==$(this).find(".title").html()){
                      sysInfo=gdata[i];
                      break;
                    }
                  }
                  updateServiceTable(sysInfo);
                  updateHostTable(sysInfo);
              });
              tileTemplate.hide();
            }

            function updateTable(){
              var table1=$(".p2").find("table");
              var trTemplate1=table1.find(".template");             

              for (var i = 0; i < gdata.length; i++) {
                var serviceInfo=gdata[i]['service-Table'];
                console.log(serviceInfo.length);
                for (var j = 0; j < serviceInfo.length; j++) {
                    var newTr=trTemplate1.clone().removeClass("template");
                    table1.append(newTr);
                    var tds=newTr.find("td");
                    newTr.attr("data-system",serviceInfo[j]['serviceSystem'])
                    $(tds[0]).html(serviceInfo[j]['serviceName']);
                    $(tds[1]).html(serviceInfo[j]['serviceKind']);
                    $(tds[2]).html(serviceInfo[j]['serviceIP']);
                    if (serviceInfo[j]["state"]=="start") {
                      $(tds[3]).find(".label-danger").hide();
                    }else{
                      $(tds[3]).find(".label-success").hide();
                    }
                }

              };
              table1.find(".template").hide();

              var table2=$(".p3").find("table");
              var trTemplate2=table2.find(".template");             

              for (var i = 0; i < gdata.length; i++) {
                var hostInfo=gdata[i]['host-Table'];
                var sysName=gdata[i]['sysName'];
                //console.log(serviceInfo.length);
                for (var j = 0; j < hostInfo.length; j++) {
                     var newTr=trTemplate2.clone().removeClass("template");
                     newTr.attr("data-system",sysName);
                      table2.append(newTr);
                      var tds=newTr.find("td");
                      $(tds[0]).html(hostInfo[j]['hostName']);
                      $(tds[1]).html(hostInfo[j]['IP']);
                      $(tds[2]).html(hostInfo[j]['MAC']);

                      var cpu=hostInfo[j]['CPU'];
                      cpu=Number(cpu.slice(0,cpu.length-1));
                      $(tds[3]).find(".slider-basic").slider({
                      isRTL: App.isRTL(),
                          value: cpu,
                          min: 0,
                          max: 100,
                          step: .1
                      }).slider('disable').css("opacity","1");  
                      $(tds[3]).find(".slider-number").html(cpu+"%");

                      var ram=hostInfo[j]['RAM'];
                      ram=Number(ram.slice(0,ram.length-1));
                      $(tds[4]).find(".slider-basic").slider({
                      isRTL: App.isRTL(),
                          value: ram,
                          min: 0,
                          max: 100,
                          step: .1
                      }).slider('disable').css("opacity","1");  
                      $(tds[4]).find(".slider-number").html(ram+"%");

                      var hdd=hostInfo[j]['hddList'];                   
                      var progressTemplate=$(tds[5]).find(".prograss-template");
                      
                      for (var k = 0;k <hdd.length; k++) {
                        var percent=hdd[k].split(":")[1];
                        var newProgress=progressTemplate.clone().removeClass("prograss-template");
                        newProgress.find(".progress-bar").attr("style","width:"+percent);
                        newProgress.find(".hdd-number").html(hdd[j]);
                        $(tds[5]).append(newProgress);
                      };
                }

              };
              table2.find(".template").hide();
              table2.find(".prograss-template").hide();

            }

            function updateServiceTable(sysInfo) {
              $(".p2").find(".caption").html('<i class="fa fa-table"></i>'+sysInfo.sysName+"服务列表");
        
              var trs=$(".p2").find("tbody tr");
              var first;
              var find=false;
              for (var i = 0; i < trs.length; i++) {
                  $(trs[i]).hide();
                  if($(trs[i]).attr("data-system")==sysInfo.sysName){
                      $(trs[i]).show();
                      if(!find){
                        first=i;
                        find=true;
                      }
                  }
              };

              if(first%2==1){                  
                $(".p2 tbody tr:even").css("background-color","#D9EDF6");
                $(".p2 tbody tr:odd").css("background-color","#FDF8E4");
              }else{                
                $(".p2 tbody tr:even").css("background-color","#FDF8E4");
                $(".p2 tbody tr:odd").css("background-color","#D9EDF6");
              }

              $(".p2 tbody td").css("vertical-align","middle");
            }

            function updateHostTable(sysInfo) {
              $(".p3").find(".caption").html('<i class="fa fa-table"></i>'+sysInfo.sysName+"主机列表");
        
              var trs=$(".p3").find("tbody tr");
              var first;
              var find=false;
              for (var i = 0; i < trs.length; i++) {
                  $(trs[i]).hide();
                  if($(trs[i]).attr("data-system")==sysInfo.sysName){
                      $(trs[i]).show();
                      if(!find){
                        first=i;
                        find=true;
                      }
                  }
              };

              if(first%2==1){                  
                $(".p3 tbody tr:even").css("background-color","#D9EDF6");
                $(".p3 tbody tr:odd").css("background-color","#FDF8E4");
              }else{                
                $(".p3 tbody tr:even").css("background-color","#FDF8E4");
                $(".p3 tbody tr:odd").css("background-color","#D9EDF6");
              }

              $(".p3 tbody td").css("vertical-align","middle");
            }

 

            getGdata();


           
        },

        initCharts: function () {

        }
    

    };

}();




