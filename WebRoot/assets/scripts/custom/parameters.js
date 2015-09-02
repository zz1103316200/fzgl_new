var Parameters = function () {



    return {

        //main function
        init: function () {
            var gdata;
            var alertData;
            function getGdata() {
             /*   $.post("servlet/yxjk_9_warning_Servlet",null,function(data) {
              	  alertData=data.warnings;            	
              	  updateAlertInfo();
                  });*/
              $.post("servlet/yxjk_7_cs_Servlet",null,function(data) {
                gdata=data;
                updateView();
              });
             // gdata=JSON.parse('{"sampleTime":20,"defaultHostCPU":55,"defaultHostRam":30,"defaultContainerCPU":70,"defaultContainerRam":20}');
             // alertData=JSON.parse('{"Table":[["1","2014-05-30 11:19:50","containerAlarm","警告：主机192.168.0.24上的容器Mule的CPU占用率超过阈值200.0","192.168.0.24","Mule"],["2","2014-05-30 11:19:50","containerAlarm","警告：主机192.168.0.24上的容器Mule的CPU占用率超过阈值200.0","192.168.0.24","Mule"],["3","2014-06-02 15:17:23","containerAlarm","警告：主机192.168.0.23上的容器Tomcat的CPU占用率超过阈值200.0","192.168.0.23","Tomcat"]]}');
             //  alertData=alertData.Table;
              // updateAlertInfo();
               
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
              $("#slider-snap-inc-amount").text(gdata.sampleTime);
              $("#slider-snap-inc").slider({
                isRTL: App.isRTL(),
                value: gdata.sampleTime,
                min: 10,
                max: 60,
                step: 1,
                slide: function (event, ui) {
                    $("#slider-snap-inc-amount").text(ui.value);
                }
            });
              $("#slider-snap-inc1").slider({
                  isRTL: App.isRTL(),
                  value: gdata.sampleTime,
                  min: 10,
                  max: 60,
                  step: 1,
                  slide: function (event, ui) {
                      $("#slider-snap-inc-amount1").text(ui.value);
                  }
              });

              $(".knob").knob({
            	  'width' : 150,
            	  'height':150,
                 'dynamicDraw': true,
                'thickness': 0.3,
                'tickColorizeValues': true,
                'skin': 'tron',
                'change':function(v) {
                  //console.log(v);
                }
              }); 

              $(".knob").each(function(){
                  var number=Number(gdata[$(this).attr("data-title")]);
                  if (number>100) {number=100};
                  $(this).val(number).trigger('change');;
              });

             

            }
            $("#correct-icon").find("img").hide();
            $("#correct-icon").find("i").hide();
            $("#submit").click(function(event) {
                var para=[];
                para.push($("#slider-snap-inc-amount").text()==gdata.sampleTime?"":$("#slider-snap-inc-amount").text());
                para.push($(".knob[data-title='defaultContainerCPU']").val()==gdata.defaultContainerCPU?"":$(".knob[data-title='defaultContainerCPU']").val());
                para.push($(".knob[data-title='defaultContainerRam']").val()==gdata.defaultContainerRam?"":$(".knob[data-title='defaultContainerRam']").val());
                para.push($(".knob[data-title='defaultHostCPU']").val()==gdata.defaultHostCPU?"":$(".knob[data-title='defaultHostCPU']").val());
                para.push($(".knob[data-title='defaultHostRam']").val()==gdata.defaultHostRam?"":$(".knob[data-title='defaultHostRam']").val());
            
               // $("#correct-icon").css("background-image",'url("assets/img/input-spinner.gif")');
                $("#correct-icon").find("img").show();
                $("#correct-icon").find("i").hide();

               $.post("servlet/yxjk_10_modParameter_Servlet",{
                    sampleTime:para[0],
                    defaultContainerCPU:para[1],
                    defaultContainerRam:para[2],
                    defaultHostCPU:para[3],
                    defaultHostRam:para[4]
                },function(data) {
                	  setTimeout(function(){
                		  $("#correct-icon").find("img").hide();
                		  $("#correct-icon").find("i").show();
                	  },1000);
                	
                	  setTimeout(function(){
                		  $("#correct-icon").find("i").hide();
                	  },2000);
                      getGdata();
                });
            });
            
            getGdata();


        }
    

    };

}();




