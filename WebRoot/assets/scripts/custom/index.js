var Index = function () {



    return {

        //main function
        init: function () {
            
        },

        initCharts: function () {
            var gdata;
            var alertData;
            function getGdata() {
            	
              $.post("servlet/yxjk_1_zt_Servlet",null,function(data) {
                gdata=data;
                
                updateView();
                updatePie();
                updateActivities();
                updateLoad();

                var key=$(".p4 select").find("option:selected").html();
                
                
                
                updataHostLoad(getSelected1(key,gdata.graph4));
                	
                var key=$(".p5 select").find("option:selected").html();
                
                updataHostService(getSelected(key,gdata.graph5));
                
              });
              
              $.post("servlet/yxjk_9_warning_Servlet",null,function(data) {
            	  alertData=data.warnings;            	
            	  updateAlertInfo();
                });
              //gdata=JSON.parse('{"graph0":{"hostAmount":3,"systemAmount":1,"serviceAmount":2},"graph1":[{"amount":1,"sysName":"鎯呮姤鏈嶅姟"}],"graph2":[],"graph3":[[[47.76666666666667,28.513333333333332],[56.76666666666667,28.2],[51.79999999999999,27.836666666666662],[52.29999999999999,27.909999999999997],[52.73333333333333,27.913333333333338],[47.26666666666667,27.923333333333332],[57.4,27.486666666666668],[55.333333333333336,27.506666666666664],[51.166666666666664,27.813333333333333],[48.43333333333334,27.833333333333332],[55.166666666666664,27.856666666666666],[50.26666666666667,27.85666666666667],[47.166666666666664,27.926666666666666],[49.23333333333333,27.866666666666664],[47.53333333333333,27.80666666666666],[53.23333333333333,28.03],[48.93333333333334,28.083333333333332],[50.666666666666664,28.063333333333333],[49.4,28.096666666666664],[49.666666666666664,28.13],[48.599999999999994,28.14],[63.43333333333334,28.133333333333336],[50.93333333333333,28.08],[53.29999999999999,28.02333333333333],[51.666666666666664,28.013333333333332],[53.800000000000004,28.026666666666667],[49.56666666666666,28.05666666666667],[50.26666666666667,28.100000000000005],[52.23333333333333,28.046666666666667],[58.43333333333334,28.17],[52.833333333333336,28.870000000000005],[52.56666666666666,29.22333333333333],[54.833333333333336,29.393333333333334],[52.6,29.626666666666665],[48.166666666666664,30.026666666666667],[60.93333333333334,30.38],[51.800000000000004,30.69333333333333],[47.63333333333333,30.986666666666665],[56.199999999999996,31.243333333333336],[52.300000000000004,31.463333333333335],[47.23333333333333,31.69333333333333],[49.699999999999996,31.89],[54.166666666666664,32.03333333333333],[55.699999999999996,32.12],[49.73333333333333,32.17666666666667],[50.23333333333333,32.15],[52.1,31.873333333333335],[52.199999999999996,32.07],[47.199999999999996,32.39],[52.43333333333334,32.589999999999996]]],"graph4":[{"IP":"192.168.0.23","array":[["46.8","17.75"],["46.9","17.75"],["48.4","17.76"],["48.4","17.89"],["41.1","17.85"],["50.0","17.80"],["48.3","16.32"],["43.7","16.50"],["53.1","16.51"],["46.8","16.50"],["51.6","16.48"],["48.4","16.50"],["48.4","17.34"],["45.2","17.33"],["48.4","17.33"],["44.0","17.37"],["42.5","17.32"],["50.0","17.37"],["40.3","17.35"],["50.0","18.12"],["46.3","18.20"],["46.8","18.29"],["44.7","18.28"],["46.9","18.38"],["46.6","18.36"],["53.1","18.37"],["43.9","18.39"],["48.4","18.35"],["50.0","18.38"],["45.4","18.37"],["40.9","18.41"],["50.0","18.50"],["45.4","18.50"],["50.0","18.42"],["43.8","19.05"],["46.8","19.02"],["40.6","19.06"],["46.9","19.08"],["43.9","19.10"],["51.6","19.52"]]},{"IP":"192.168.0.24","array":[["44.0","41.86"],["27.2","41.85"],["39.3","41.91"],["24.1","41.92"],["28.8","41.90"],["43.8","41.94"],["29.9","41.94"],["25.7","42.01"],["33.3","42.06"],["21.1","42.07"],["33.3","42.13"],["37.9","42.08"],["34.8","42.12"],["25.2","42.16"],["41.7","42.15"],["33.3","42.14"],["25.7","42.45"],["22.7","42.36"],["27.3","42.35"],["40.9","42.35"],["30.3","42.36"],["31.8","42.35"],["34.8","42.37"],["27.2","42.34"],["19.6","42.36"],["39.3","42.37"],["37.8","42.35"],["25.7","42.43"],["36.3","42.39"],["34.8","42.40"],["32.8","42.39"],["25.8","42.46"],["34.8","42.43"],["37.8","42.47"],["34.7","42.46"],["32.8","42.47"],["30.2","42.48"],["29.7","42.48"],["25.7","42.49"],["46.8","42.49"]]},{"IP":"192.168.0.52","array":[["85.8","25.94"],["72.7","25.97"],["78.1","25.86"],["73.4","25.79"],["73.4","25.79"],["76.5","24.86"],["77.2","25.25"],["87.5","25.22"],["71.8","25.17"],["73.9","25.20"],["87.3","23.85"],["79.7","23.94"],["70.3","23.98"],["74.9","24.01"],["75.4","24.09"],["73.5","24.06"],["73.3","24.01"],["75.0","23.87"],["75.0","23.72"],["68.8","23.62"],["70.2","23.69"],["73.4","23.55"],["68.7","23.64"],["74.9","23.67"],["79.6","23.70"],["97.9","23.66"],["71.1","23.50"],["85.8","23.29"],["68.7","23.27"],["81.2","23.31"],["75.0","23.37"],["75.0","23.34"],["76.5","23.21"],["87.5","23.62"],["80.0","25.10"],["78.1","26.18"],["93.7","26.64"],["81.2","27.32"],["74.9","28.49"],["84.4","29.13"]]}],"graph5":[[{"IP":"192.168.0.52","array":[6,0,1,0]}],[{"IP":"192.168.0.24","array":[6,0,1,1]}],[{"IP":"192.168.0.23","array":[6,0,1,1]}]]}');
             
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
            $(".p5 select").change(function(){
                var key=$(".p5 select").find("option:selected").html();
                updataHostService(getSelected(key,gdata.graph5));
            });

             $(".p4 select").change(function(){
                var key=$(".p4 select").find("option:selected").html();
                updataHostLoad(getSelected1(key,gdata.graph4));
            });


            function showChartTooltip(x, y, xValue, yValue) {
                $('<div id="tooltip" class="chart-tooltip">'+yValue+'<\/div>').css({
                    position: 'absolute',
                    display: 'none',
                    top: y - 40,
                    left: x - 40,
                    border: '0px solid #ccc',
                    padding: '2px 6px',
                    'background-color': '#fff',
                }).appendTo("body").fadeIn(200);
            }

            function getSelected(key,data){
                for (var i = 0; data.length; i++) {
                    if(data[i][0].IP==key){
                        return data[i][0].array;
                    }
                };
            }

             function getSelected1(key,data){
                for (var i = 0; data.length; i++) {
                    if(data[i].IP==key){
                        return data[i].array;
                    }
                };
            }

           


            function updateView(){
               // console.log(gdata.graph5[0][0].IP);
                for (var i = gdata.graph5.length - 1; i >= 0; i--) {
                 $(".p5 select").append("<option>"+gdata.graph5[i][0].IP+"</option>");
                }; 
                for (var i = 0; i < gdata.graph4.length ; i++) {
                 $(".p4 select").append("<option>"+gdata.graph4[i].IP+"</option>");
                }; 
                
                $("#hostAmount").find(".number").html(gdata.graph0.hostAmount);
                $("#systemAmount").find(".number").html(gdata.graph0.systemAmount);
                $("#serviceAmount").find(".number").html(gdata.graph0.serviceAmount);
            }

            function updatePie() {
                d1 = [];

                for (var i = 0; i < gdata.graph1.length; i++) {
                    d1.push({label:gdata.graph1[i].sysName,data:gdata.graph1[i].amount});
                };
                    
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
                                    return '<div style="font-size:12pt;text-align:center;padding:2px;color:black;">' + label + '<br/>' + Math.round(series.percent) + '%</div>';
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

            function updateActivities(){

                var visitors=[];
                for (var i = 0; i < gdata.graph2.length; i++) {
                    visitors.push([gdata.graph2[i].time.split(" ")[1],Number(gdata.graph2[i].amount)]);
                };

          

                if ($('#site_statistics').size() != 0) {

                $('#site_statistics_loading').hide();
                $('#site_statistics_content').show();

                var plot_statistics = $.plot($("#site_statistics"), 

                    [
                    {
                        data:visitors,
                        lines: {
                            fill: 0.6,
                            lineWidth: 0,
                        },
                        color: ['#f89f9f']
                    },
                    {
                        data: visitors,
                        points: {
                            show: true,
                            fill: true,
                            radius: 5,
                            fillColor: "#f89f9f",
                            lineWidth: 3
                        },
                        color: '#fff',
                        shadowSize: 0
                    },
                    ], 

                    {
                    
                    xaxis: {
                        tickLength: 0,
                        tickDecimals: 0,                        
                        mode: "categories",
                        font: {
                            lineHeight: 14,
                            style: "normal",
                            variant: "small-caps",
                            color: "#6F7B8A"
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
                        hoverable: true,
                        clickable: true,
                        tickColor: "#eee",
                        borderColor: "#eee",
                        borderWidth: 1
                    }
                });

                var previousPoint = null;
                $("#site_statistics").bind("plothover", function (event, pos, item) {
                    $("#x").text(pos.x.toFixed(2));
                    $("#y").text(pos.y.toFixed(2));
                    if (item) {
                        if (previousPoint != item.dataIndex) {
                            previousPoint = item.dataIndex;

                            $("#tooltip").remove();
                            var x = item.datapoint[0].toFixed(2),
                                y = item.datapoint[1].toFixed(2);

                            showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + '次调用');
                        }
                    } else {
                        $("#tooltip").remove();
                        previousPoint = null;
                    }
                });
                } 
            }

            function updateLoad(){
                var cpuData = [];
                var ramData = [];

                for (var i = 0; i<gdata.graph3[0].length; i++) {
                    cpuData.push([i,gdata.graph3[0][i][0]]);
                    ramData.push([i,gdata.graph3[0][i][1]]);
                };
               

                if ($('#load_statistics').size() != 0) {
                     //server load
                    $('#load_statistics_loading').hide();
                    $('#load_statistics_content').show();        

                    var plot_statistics = $.plot($("#load_statistics"),[{
                                data: cpuData,
                                label: "CPU"
                            },
                            {
                                data: ramData,
                                label: "内存"
                            }], {
                    series: {
                        shadowSize: 1
                    },
                    lines: {
                        show: true,
                        lineWidth: 0.2,
                        fill: true,
                        fillColor: {
                            colors: [{
                                    opacity: 0.1
                                }, {
                                    opacity: 1
                                }
                            ]
                        }
                    },
                    yaxis: {
                        ticks: 4,
                        min: 0,
                        max: 100,
                        tickFormatter: function (v) {
                            return v + "%";
                        },                    
                        tickColor: "#eee"
                    },
                    xaxis: {
                        show: false
                    },
                    colors: ["#7AD488","#27A9E3"],
                    grid: {
                        tickColor: "#a8a3a3",
                        borderWidth: 0
                    }
                    });

                    }
            }


            function updataHostLoad(data){
            	
                 var pageviews = [];
                 var visitors = [];

                 for (var i = 0; i<data.length; i++) {
                     pageviews.push([i,data[i][0]]);
                     visitors.push([i,data[i][1]]);
                 };



                        var plot = $.plot($("#chart_2"), [{
                                data: pageviews,
                                label: "CPU",
                                lines: {
                                    lineWidth: 1,
                                },
                                shadowSize: 0

                            }, {
                                data: visitors,
                                label: "内存",
                                lines: {
                                    lineWidth: 1,
                                },
                                shadowSize: 0
                            }
                        ], {
                            series: {
                                lines: {
                                    show: true,
                                    lineWidth: 2,
                                    fill: true,
                                    fillColor: {
                                        colors: [{
                                                opacity: 0.05
                                            }, {
                                                opacity: 0.01
                                            }
                                        ]
                                    }
                                },
                                points: {
                                    show: true,
                                    radius: 3,
                                    lineWidth: 1
                                },
                                shadowSize: 2
                            },
                            grid: {
                                hoverable: true,
                                clickable: true,
                                tickColor: "#eee",
                                borderColor: "#eee",
                                borderWidth: 1
                            },
                            colors: ["#d12610", "#37b7f3", "#52e136"],
                            xaxis: {
                                ticks: 11,
                                tickDecimals: 0,
                                tickColor: "#eee",
                            },
                            yaxis: {
                                ticks: 11,
                                tickDecimals: 0,
                                tickColor: "#eee",
                            }
                        });


                 function showTooltip(x, y, contents) {
                        $('<div id="tooltip">' + contents + '</div>').css({
                                position: 'absolute',
                                display: 'none',
                                top: y + 5,
                                left: x + 15,
                                border: '1px solid #333',
                                padding: '4px',
                                color: '#fff',
                                'border-radius': '3px',
                                'background-color': '#333',
                                opacity: 0.80
                            }).appendTo("body").fadeIn(200);
                    }

                    var previousPoint = null;
                    $("#chart_2").bind("plothover", function (event, pos, item) {
                        $("#x").text(pos.x.toFixed(2));
                        $("#y").text(pos.y.toFixed(2));

                        if (item) {
                            if (previousPoint != item.dataIndex) {
                                previousPoint = item.dataIndex;

                                $("#tooltip").remove();
                                var x = item.datapoint[0].toFixed(2),
                                    y = item.datapoint[1].toFixed(2);

                                showTooltip(item.pageX, item.pageY, item.series.label + " of " + x + " = " + y);
                            }
                        } else {
                            $("#tooltip").remove();
                            previousPoint = null;
                        }
                    });

            }

            function updataHostService(data){
                var sum=data[0]+data[1]+data[2]+data[3];
                data[0]=Math.round(data[0]/sum*100);
                data[1]=Math.round(data[1]/sum*100);
                data[2]=Math.round(data[2]/sum*100);
                data[3]=Math.round(data[3]/sum*100);

                $('.easy-pie-chart .number.tomcat').attr("data-percent",data[0]);
                $('.easy-pie-chart .number.tomcat').find("span").html(data[0]);

                $('.easy-pie-chart .number.Axis2').attr("data-percent",data[1]);
                $('.easy-pie-chart .number.Axis2').find("span").html(data[1]);

                $('.easy-pie-chart .number.IIS').attr("data-percent",data[2]);
                $('.easy-pie-chart .number.IIS').find("span").html(data[2]);

                $('.easy-pie-chart .number.Mule').attr("data-percent",data[3]);
                $('.easy-pie-chart .number.Mule').find("span").html(data[3]);

               

                $('.easy-pie-chart .number.tomcat').easyPieChart({
                    animate: 1000,
                    size: 120,
                    lineWidth: 15,
                    trackColor:'#bbb',
                    scaleColor:false,
                    barColor: App.getLayoutColorCode('yellow')
                });

                $('.easy-pie-chart .number.Axis2').easyPieChart({
                     animate: 1000,
                    size: 120,
                    lineWidth: 15,
                    trackColor:'#bbb',
                    scaleColor:false,
                    barColor: App.getLayoutColorCode('green')
                });

                  $('.easy-pie-chart .number.IIS').easyPieChart({
                     animate: 1000,
                    size: 120,
                    lineWidth: 15,
                    trackColor:'#bbb',
                    scaleColor:false,
                    barColor: App.getLayoutColorCode('blue')
                });
                 
                $('.easy-pie-chart .number.Mule').easyPieChart({
                     animate: 1000,
                    size: 120,
                    lineWidth: 15,
                    trackColor:'#bbb',
                    scaleColor:false,
                    barColor: App.getLayoutColorCode('red')
                });

                $('.easy-pie-chart .number.tomcat').data('easyPieChart').update(data[0]);
                  $('.easy-pie-chart .number.Axis2').data('easyPieChart').update(data[1]);
                 $('.easy-pie-chart .number.IIS').data('easyPieChart').update(data[2]);
                 $('.easy-pie-chart .number.Mule').data('easyPieChart').update(data[3]);
                     

            }


            getGdata();

  
         
        },

        initMiniCharts: function () {
            
               
          

        },

        initChat: function () {

            var cont = $('#chats');
            var list = $('.chats', cont);
            var form = $('.chat-form', cont);
            var input = $('input', form);
            var btn = $('.btn', form);

            var handleClick = function (e) {
                e.preventDefault();
                
                var text = input.val();
                if (text.length == 0) {
                    return;
                }

                var time = new Date();
                var time_str = time.toString('MMM dd, yyyy hh:mm');
                var tpl = '';
                tpl += '<li class="out">';
                tpl += '<img class="avatar" alt="" src="assets/img/avatar1.jpg"/>';
                tpl += '<div class="message">';
                tpl += '<span class="arrow"></span>';
                tpl += '<a href="#" class="name">Bob Nilson</a>&nbsp;';
                tpl += '<span class="datetime">at ' + time_str + '</span>';
                tpl += '<span class="body">';
                tpl += text;
                tpl += '</span>';
                tpl += '</div>';
                tpl += '</li>';

                var msg = list.append(tpl);
                input.val("");
                $('.scroller', cont).slimScroll({
                    scrollTo: list.height()
                });
            }

            /*
            $('.scroller', cont).slimScroll({
                scrollTo: list.height()
            });
            */

            $('body').on('click', '.message .name', function(e){
                e.preventDefault(); // prevent click event

                var name = $(this).text(); // get clicked user's full name
                input.val('@' +  name + ':'); // set it into the input field
                App.scrollTo(input); // scroll to input if needed
            });

            btn.click(handleClick);
            input.keypress(function (e) {
                if (e.which == 13) {
                    handleClick();
                    return false; //<---- Add this line
                }
            });
        }

    };

}();




