var Container = function () {



    return {

        //main function
        init: function () {
           $(".circle-canvas").each(function() {
               var width=$(this).css("width");
               width=Number(width.substring(0,width.length-2))-30;
               var height=width+30;
               $(this).append("<canvas width="+width+" height="+height+"></canvas>");
              
           });


            var gdata;
            var alertData;
            function getGdata() {
                $.post("servlet/yxjk_9_warning_Servlet",null,function(data) {
              	  alertData=data.warnings;            	
              	  updateAlertInfo();
                  });
              $.post("servlet/yxjk_5_rq_Servlet",null,function(data) {
                gdata=data;
                updateView();
                updateCharts();
                updateTable();
              });
             // gdata=JSON.parse('{"Table":[{"amount":"22(20/2)","ram":"0.2%","containerName":"Tomcat","cpu":"32%","ip":"192.168.0.93"},{"amount":"20(19/1)","ram":"0.0%","containerName":"Axis2","cpu":"3.1%","ip":"192.168.0.96"}],"graph2":{"Mule":1,"IIS":2,"Axis2":3,"Tomcat":4},"graph1":{"Mule":0,"IIS":0,"Axis2":1,"Tomcat":1}}');
              
                
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
           
              function updataSP(p,color,index) {
              

                var circle=p.find(".circle-canvas");

               circle.each(function() {
              var canvas=$(this).find("canvas").get(0);

               context=canvas.getContext('2d');

               context.clearRect(0,0,canvas.width,canvas.height);
               context.strokeStyle="red";
               context.fillStyle=color;
               context.lineWidth=30;
               context.beginPath();
               var number=gdata.graph1[$(this).attr("data-title")];
               if(number=="0"){
                 context.fillStyle="#EEEEEE";
               }
               
               context.arc(canvas.width/2,canvas.height/2-15,canvas.width/2*0.9,0,Math.PI*2);
               context.fill();

               context.fillStyle="white";
               if(number=="0"){
                 context.fillStyle="#505050";
               }
               context.font="20pt 微软雅黑";
               context.textAlign='center';
               context.textBaseline='middle';
               context.fillText(number,canvas.width/2,canvas.height/2-15);

               context.fillStyle="black";
               context.font="12pt 微软雅黑";
               context.textAlign='center';
               context.textBaseline='middle';
               context.fillText($(this).attr("data-title"),canvas.width/2,canvas.height-15);
           });

              }

              updataSP($(".p1"),"#FFB748");
              
            }

              function updateCharts(){
                     d1 = [
                    {label:"Tomcat",
                    data: gdata.graph2['Tomcat']},
                     {label:"Axis2",
                    data: gdata.graph2['Axis2']},
                     {label:"IIS",
                    data: gdata.graph2['IIS']},
                     {label:"Mule",
                    data: gdata.graph2['Mule']}
                ]
                $.plot($("#pie_chart_1"), d1, {
                    series: {
                        pie: {
                            show: true,
                            radius: 0.85,
                            innerRadius: 0.5,
                            label: {
                                show: true,
                                radius: 1,
                                formatter: function (label, series) {
                                    return '<div style="font-size:12pt;text-align:center;padding:2px;color:black;">' + label + '('+gdata.graph2[label]+')<br/>' + Math.round(series.percent) + '%</div>';
                                },
                                background: {
                                    opacity: 0
                                }
                            }
                        }
                    },
                    legend: {
                        show: false
                    }
                });

              }

              function updateTable() {
              var table=$(".p3").find("table");
              var trTemplate=table.find(".template");

              for (var i = 0; i < gdata.Table.length; i++) {
                var newTr=trTemplate.clone().removeClass("template");
                table.append(newTr);
                var tds=newTr.find("td");
                $(tds[0]).html(gdata.Table[i]['containerName']);
                $(tds[1]).html(gdata.Table[i]['ip']);

                var cpu=gdata.Table[i]['cpu'];
                cpu=Number(cpu.slice(0,cpu.length-1));
                $(tds[2]).find(".slider-basic").slider({
                isRTL: App.isRTL(),
                    value: cpu,
                    min: 0,
                    max: 100,
                    step: .1
                }).slider('disable').css("opacity","1");  
                $(tds[2]).find(".slider-number").html(cpu+"%");

                var ram=gdata.Table[i]['ram'];
                ram=Number(ram.slice(0,ram.length-1));
                $(tds[3]).find(".slider-basic").slider({
                isRTL: App.isRTL(),
                    value: ram,
                    min: 0,
                    max: 100,
                    step: .1
                }).slider('disable').css("opacity","1");  
                $(tds[3]).find(".slider-number").html(ram+"%");

                 $(tds[4]).html(gdata.Table[i]['amount']);

              };

              table.find(".template").hide();
              table.find(".prograss-template").hide();  
             

            $("#host-table tbody tr:even").css("background-color","#FDF8E4");
            $("#host-table tbody tr:odd").css("background-color","#E0EFD8");
            $("#host-table tbody td").css("vertical-align","middle");
            }

            getGdata();



        }
    

    };

}();




