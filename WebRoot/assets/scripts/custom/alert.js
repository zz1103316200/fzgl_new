var Alert = function () {



    return {

        //main function
        init: function () {       

            var gdata;
            var alertData;
            
            function getGdata() {
              $.post("servlet/yxjk_8_jb_Servlet",null,function(data) {
                gdata=data;
                updateTable();
              });
              //gdata=JSON.parse('{"Table":[["1","2014-05-30 11:19:50","containerAlarm","警告：主机192.168.0.24上的容器Mule的CPU占用率超过阈值200.0","192.168.0.24","Mule"],["2","2014-05-30 11:19:50","containerAlarm","警告：主机192.168.0.24上的容器Mule的CPU占用率超过阈值200.0","192.168.0.24","Mule"],["3","2014-06-02 15:17:23","containerAlarm","警告：主机192.168.0.23上的容器Tomcat的CPU占用率超过阈值200.0","192.168.0.23","Tomcat"]]}');
              //alertData=gdata.Table;
             
              $.post("servlet/yxjk_9_warning_Servlet",null,function(data) {
            	  alertData=data.warnings;
            	  console.log(alertData);
            	  updateAlertInfo();
                });
              
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



     
            function updateTable() {
              var table=$(".p1").find("table");
              var trTemplate=table.find(".template");

              for (var i = 0; i < gdata.Table.length; i++) {
                var newTr=trTemplate.clone().removeClass("template");
                table.append(newTr);
                var tds=newTr.find("td");
                $(tds[0]).html(gdata.Table[i][0]);
                $(tds[1]).html(gdata.Table[i][1]);
                $(tds[2]).html(gdata.Table[i][2]);
                $(tds[3]).html(gdata.Table[i][3]);
                $(tds[4]).html(gdata.Table[i][4]);
                $(tds[5]).html(gdata.Table[i][5]);
              }

              table.find(".template").hide();

              $("#host-table tbody tr:even").css("background-color","#F2DEDF");
              $("#host-table tbody tr:odd").css("background-color","#FDF8E4");

              $("#host-table tbody td").css("vertical-align","middle");
            }


            getGdata();
        
        },

        initCharts: function () {

        }
    

    };

}();




