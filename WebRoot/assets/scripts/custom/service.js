var Service = function () {



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
              $.post("servlet/yxjk_3_fw_Servlet",null,function(data) {
                gdata=data;
                 updateView();
                 updatePie();
                 updateChart5();
                 updateTable();
              });
              //gdata=JSON.parse('{"graph1":[3,2],"graph23":[{"amount":2,"started":1,"sysName":"sys1"},{"amount":1,"started":1,"sysName":"sys2"}],"Table":[["addService","Axis2","sys1","192.168.0.96","started"],["SubService","Axis2","sys2","192.168.0.93","started"]]}');
             
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
            function updateView(){
              $(".u2").each(function(index) {
               var canvas=$(this).find("canvas").get(0);
               context=canvas.getContext('2d');
               context.strokeStyle="red";
               context.fillStyle="#FFB849";
               context.lineWidth=30;
               context.beginPath();
               
               context.arc(canvas.width/2,canvas.height/2-15,canvas.width/2*0.9,0,Math.PI*2);
               context.fill();

               context.fillStyle="white";
               context.font="20pt 微软雅黑";
               context.textAlign='center';
               context.textBaseline='middle';
               var number=gdata.graph1[index];
               context.fillText(number,canvas.width/2,canvas.height/2-15);

               context.fillStyle="black";
               context.font="12pt 微软雅黑";
               context.textAlign='center';
               context.textBaseline='middle';
               context.fillText($(this).attr("data-title"),canvas.width/2,canvas.height-15);
              });

            }

            function updatePie(){
              d2 = [];
               for (var i = 0; i < gdata.graph23.length; i++) {
                 d2.push({label:gdata.graph23[i].sysName,
                    data: gdata.graph23[i].amount});
               };
                $.plot($("#pie_chart_1"), d2, {
                    series: {
                        pie: {
                            show: true,
                            radius: 0.85,
                            innerRadius: 0.5,
                            label: {
                                show: true,
                                radius: 1,
                                formatter: function (label, series) {
                                    var amount;
                                    for (var i = 0; i < gdata.graph23.length; i++) {
                                       if(label==gdata.graph23[i].sysName){
                                          amount=gdata.graph23[i].amount;
                                          break;
                                       }
                                         
                                     };
                                    return '<div style="font-size:10pt;text-align:center;padding:2px;color:black;">' + label + '（'+amount+'）<br/>' + Math.round(series.percent) + '%</div>';
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

              function updateChart5() {
                 [ 
                ['Tomcat', 500],
                ['Axis2', 1500],
                ['IIS', 2600],
                ['Mule', 1200]
                ];
                d1 = [];
                d3 = [];
                for (var i = 0; i < gdata.graph23.length; i++) {
                d1.push([gdata.graph23[i].sysName,Number(gdata.graph23[i].amount)-Number(gdata.graph23[i].started)]);
                  };
                for (var i = 0; i < gdata.graph23.length; i++) {
                d3.push([gdata.graph23[i].sysName,Number(gdata.graph23[i].started)]);
                  };
                
                console.log(d1);

                var stack = 0,
                    bars = true,
                    lines = false,
                    steps = false;

                function plotWithOptions() {
                    $.plot($("#chart_5"), 

                        [{
                            label: "启动",
                            data: d3,
                            lines: {
                                lineWidth: 1,
                            },
                            shadowSize: 0,
                            color: "green"
                        }, {
                            label: "停止",
                            data: d1,
                            lines: {
                                lineWidth: 1,
                            },
                            shadowSize: 0,
                            color: "red"
                        }]

                        , {
                            series: {
                                stack: stack,
                                lines: {
                                    show: lines,
                                    fill: true,
                                    steps: steps,
                                    lineWidth: 0, // in pixels
                                },
                                bars: {
                                    show: bars,
                                    barWidth: 0.5,
                                    lineWidth: 0, // in pixels
                                    shadowSize: 0,
                                    align: 'center',
                                }
                            },

                             xaxis: {                       
                        mode: "categories",
                        font: {
                            lineHeight: 30,
                            style: "normal",
                            variant: "small-caps",
                            color: "#6F7B8A",
                            size:22
                        }
                    },
                    yaxis: {
                        ticks: 5,
                        tickDecimals: 0,
                        tickColor: "#eee",
                        font: {
                            lineHeight: 14,
                            style: "normal",
                            variant: "small-caps",
                            color: "#6F7B8A"
                        }
                    },
                    grid: {
                                tickColor: "#eee",
                                borderColor: "#eee",
                                borderWidth: 1
                            }
                        }                       
                    );
                }               

                plotWithOptions();
            }


            function updateTable() {
              var table=$(".p4").find("table");
              var trTemplate=table.find(".template");

              for (var i = 0; i < gdata.Table.length; i++) {
                var newTr=trTemplate.clone().removeClass("template");
                table.append(newTr);
                var tds=newTr.find("td");
                $(tds[0]).html(gdata.Table[i][0]);
                $(tds[1]).html(gdata.Table[i][1]);
                $(tds[2]).html(gdata.Table[i][2]);
                $(tds[3]).html(gdata.Table[i][3]);
                if (gdata.Table[i][4]=="start") {
                  $(tds[4]).find(".label-danger").hide();
                }else{
                  $(tds[4]).find(".label-success").hide();
                }

              };

              table.find(".template").hide();

              $("#host-table tbody tr:even").css("background-color","#FDF8E4");
              $("#host-table tbody tr:odd").css("background-color","#D9EDF6");

              $("#host-table tbody td").css("vertical-align","middle");
              }
          

            getGdata();
        },

        initCharts: function () {
               

        }
    

    };

}();




