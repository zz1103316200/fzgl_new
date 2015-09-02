var Host = function () {



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
              $.post("servlet/yxjk_2_zj_Servlet",null,function(data) {
                gdata=data;
                console.log(data);

                updateView();
                updateTable();
              });
              $.post("servlet/yxjk_9_warning_Servlet",null,function(data) {
            	  alertData=data.warnings;            	
            	  updateAlertInfo();
                });
              //gdata=JSON.parse('{"Table":[{"ram":"78%","cpu":"46.1%","hostName":"hp-PC2","mac":"DE-89-OI-9I-EI-KL","hdd":"[C:45%, D:45%, E:45%]","ip":"192.168.0.96"},{"ram":"11%","cpu":"33.1%","hostName":"dd-PC","mac":"DE-99-OI-9I-EI-KL","hdd":"[C:45%, D:45%, E:45%]","ip":"192.168.0.93"}],"graph2":[{"Mule":"0,0","IIS":"0,0","IP":"192.168.0.96","Axis2":"1,20","Tomcat":"0,0"},{"Mule":"0,0","IIS":"0,0","IP":"192.168.0.93","Axis2":"0,0","Tomcat":"1,22"}],"graph1":[2,39.6,44.5,67.5]}');
           
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
              $(".host-num .number").html(gdata.graph1[0]);
              
              $(".avg-cpu .number").html(Math.round(gdata.graph1[1])+"%");
              $(".avg-ram .number").html(Math.round(gdata.graph1[2])+"%");
              $(".avg-disk .number").html(Math.round(gdata.graph1[3])+"%");

              for (var i = gdata.graph2.length - 1; i >= 0; i--) {
                 $(".p1 select").append("<option>"+gdata.graph2[i].IP+"</option>");
                 $(".p2 select").append("<option>"+gdata.graph2[i].IP+"</option>");
              }; 

              function updataSP(p,color,index) {
                  var sip=p.find("option:selected").html();
                  var snum;
                  for (var i = gdata.graph2.length - 1; i >= 0; i--) {
                    if (sip==gdata.graph2[i].IP) {
                        snum=i;
                        break;
                    };
                  };

                  var circle=p.find(".circle-canvas");

                 circle.each(function(index) {
                 var canvas=$(this).find("canvas").get(0);

                 context=canvas.getContext('2d');

                 context.clearRect(0,0,canvas.width,canvas.height);
                 context.strokeStyle="red";
                 context.fillStyle=color;
                 context.lineWidth=30;
                 context.beginPath();
                 var number=gdata.graph2[snum][$(this).attr("data-title")];
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
                 console.log(snum);
                 context.fillText(number,canvas.width/2,canvas.height/2-15);

                 context.fillStyle="black";
                 context.font="12pt 微软雅黑";
                 context.textAlign='center';
                 context.textBaseline='middle';
                 context.fillText($(this).attr("data-title"),canvas.width/2,canvas.height-15);
                    });

                }

                function updataSP2(p,color,index) {
                  var sip=p.find("option:selected").html();
                  var snum;
                  var title=["Web服务","流程服务","可执行文件服务","网站服务"];
                  for (var i = gdata.graph2.length - 1; i >= 0; i--) {
                    if (sip==gdata.graph3[i].IP) {
                        snum=i;
                        break;
                    };
                  };

                  var circle=p.find(".circle-canvas");

                 circle.each(function(index) {
                 var canvas=$(this).find("canvas").get(0);

                 context=canvas.getContext('2d');

                 context.clearRect(0,0,canvas.width,canvas.height);
                 context.strokeStyle="red";
                 context.fillStyle=color;
                 context.lineWidth=30;
                 context.beginPath();
                 var number=gdata.graph3[snum].array[index];
                 console.log(snum+"  "+index+" "+gdata.graph3[snum].array[index]);
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
                 context.fillText(title[index],canvas.width/2,canvas.height-15);
                    });

                }

                updataSP($(".p1"),"#27A9E3",0);
                updataSP2($(".p2"),"#FFB748",1);
                $(".p1 select").change(function(){
                  updataSP($(".p1"),"#27A9E3",0);
                });
                 $(".p2 select").change(function(){
                  updataSP2($(".p2"),"#FFB748",1);
                });
              
            }

            function updateTable() {
              var table=$(".p3").find("table");
              var trTemplate=table.find(".template");

              for (var i = 0; i < gdata.Table.length; i++) {
                var newTr=trTemplate.clone().removeClass("template");
                table.append(newTr);
                var tds=newTr.find("td");
                $(tds[0]).html(gdata.Table[i]['hostName']);
                $(tds[1]).html(gdata.Table[i]['ip']);
                $(tds[2]).html(gdata.Table[i]['mac']);

                var cpu=gdata.Table[i]['cpu'];
                cpu=Number(cpu.slice(0,cpu.length-1));
                $(tds[3]).find(".slider-basic").slider({
                isRTL: App.isRTL(),
                    value: cpu,
                    min: 0,
                    max: 100,
                    step: .1
                }).slider('disable').css("opacity","1");  
                $(tds[3]).find(".slider-number").html(cpu+"%");

                var ram=gdata.Table[i]['ram'];
                ram=Number(ram.slice(0,ram.length-1));
                $(tds[4]).find(".slider-basic").slider({
                isRTL: App.isRTL(),
                    value: ram,
                    min: 0,
                    max: 100,
                    step: .1
                }).slider('disable').css("opacity","1");  
                $(tds[4]).find(".slider-number").html(ram+"%");

                var hdd=gdata.Table[i]['hdd'];
                hdd=hdd.slice(1,hdd.length-1).split(",");
                var progressTemplate=$(tds[5]).find(".prograss-template");
                
                for (var j = 0; j <hdd.length; j++) {
                  var percent=hdd[j].split(":")[1];
                  var newProgress=progressTemplate.clone().removeClass("prograss-template");
                  newProgress.find(".progress-bar").attr("style","width:"+percent);
                  newProgress.find(".hdd-number").html(hdd[j]);
                  $(tds[5]).append(newProgress);
                };

              };

              table.find(".template").hide();
              table.find(".prograss-template").hide();

              $("#host-table tbody tr:even").css("background-color","#D9EDF6");
              $("#host-table tbody tr:odd").css("background-color","#FDF8E4");

              $("#host-table tbody td").css("vertical-align","middle");
            }

            getGdata();


           
        },

        initCharts: function () {

        }
    

    };

}();




