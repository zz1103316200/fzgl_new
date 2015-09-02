<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page
import="java.net.InetAddress"
%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%
	request.setCharacterEncoding("utf-8");
	String host = InetAddress.getLocalHost().toString();
	System.out.println(host);
	String localIP = host.substring(host.indexOf("/")+1);
	System.out.println(localIP);
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
		<meta charset="utf-8">
		<!--<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">-->

		<title> 系统开发试验平台 </title>
		<meta name="description" content="">
		<meta name="author" content="">

		<!-- Use the correct meta names below for your web application
			 Ref: http://davidbcalhoun.com/2010/viewport-metatag 
			 
		<meta name="HandheldFriendly" content="True">
		<meta name="MobileOptimized" content="320">-->
		
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

		<!-- Basic Styles -->
		<link rel="stylesheet" type="text/css" media="screen" href="css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" media="screen" href="css/font-awesome.min.css">

		<!-- SmartAdmin Styles : Please note (smartadmin-production.css) was created using LESS variables -->
		<link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin-production.css">
		<link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin-skins.css">

		<!-- SmartAdmin RTL Support is under construction
		<link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin-rtl.css"> -->

		<!-- We recommend you use "your_style.css" to override SmartAdmin
		     specific styles this will also ensure you retrain your customization with each SmartAdmin update.
		<link rel="stylesheet" type="text/css" media="screen" href="css/your_style.css"> -->

		<!-- Demo purpose only: goes with demo.js, you can delete this css when designing your own WebApp -->
		<link rel="stylesheet" type="text/css" media="screen" href="css/demo.css">

		<!-- FAVICONS -->
		<link rel="shortcut icon" href="img/favicon/favicon.ico" type="image/x-icon">
		<link rel="icon" href="img/favicon/favicon.ico" type="image/x-icon">
		
		<!-- 自己加的 -->
		<link rel="stylesheet" type="text/css" media="screen" href="css/wxh.css">
		
		<!-- GOOGLE FONT -->
		<!--  <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700">-->
		<style>
		body{
			font-family: "Microsoft YaHei" !important;
		}
		.node {
		  stroke: #fff;
		  stroke-width: 1.5px;
		}
		
		.link {
		  stroke: #999;
		  stroke-opacity: .6;
		}
		
		svg{
			/*background-color:black;*/
		}
		
		</style>
	</head>
  
  <body class="">
		<!-- possible classes: minified, fixed-ribbon, fixed-header, fixed-width-->

		<header id="header" style="height:100px;">
			<div id="logo-group" style="width:100%;">

				<!-- PLACE YOUR LOGO HERE -->
				<span id="logo" style="width:350px;color:white;font-size:21px;font-family:  'Microsoft YaHei' ;"> <img src="img/school.png" alt="SmartAdmin" style="height:80px;width:80px;">    系统开发试验平台</span>
				<!-- END LOGO PLACEHOLDER -->

				<!-- Note: The activity badge color changes when clicked and resets the number to 0
				Suggestion: You may want to set a flag when this happens to tick off all checked messages / notifications -->
				<span id="activity" class="activity-dropdown" style="margin-top:40px;float:right;position:relative;left:-120px;"> <i class="glyphicon glyphicon-bell txt-color-blue"></i> <b class="badge"> 21 </b> </span>

				<!-- AJAX-DROPDOWN : control this dropdown height, look and feel from the LESS variable file -->
				<div class="ajax-dropdown" style="margin-left:79%;margin-top:20px;">

					<!-- the ID links are fetched via AJAX to the ajax container "ajax-notifications" -->
					<div class="btn-group btn-group-justified" data-toggle="buttons">
						<label class="btn btn-default">
							<input type="radio" name="activity" id="ajax/notify/mail.html">
							Msgs (14) </label>
						<label class="btn btn-default">
							<input type="radio" name="activity" id="ajax/notify/notifications.html">
							notify (3) </label>
						<label class="btn btn-default">
							<input type="radio" name="activity" id="ajax/notify/tasks.html">
							Tasks (4) </label>
					</div>

					<!-- notification content -->
					<div class="ajax-notifications custom-scroll">

						<div class="alert alert-transparent">
							<h4>Click a button to show messages here</h4>
							This blank page message helps protect your privacy, or you can show the first message here automatically.
						</div>

						<i class="fa fa-lock fa-4x fa-border"></i>

					</div>
					<!-- end notification content -->

					<!-- footer: refresh area -->
					<span> Last updated on: 12/12/2013 9:43AM
						<button type="button" data-loading-text="<i class='fa fa-refresh fa-spin'></i> Loading..." class="btn btn-xs btn-default pull-right">
							<i class="fa fa-refresh"></i>
						</button> </span>
					<!-- end footer -->

				</div>
				<label class="TitleLabel">试验管理</label>
				<!-- END AJAX-DROPDOWN -->
			</div>

			<!-- projects dropdown -->
			
			<!-- end projects dropdown -->

			
			<!-- pulled right: nav area -->
			<div class="pull-right">

				<!-- collapse menu button -->
				
				<!-- end collapse menu -->

				<!-- logout button -->
				
				<!-- end logout button -->

				<!-- search mobile button (this is hidden till mobile view port) -->
				
				<!-- end search mobile button -->

				<!-- input: search field -->
				
				<!-- end input: search field -->

				<!-- multiple lang dropdown : find all flags in the image folder -->
				<ul class="header-dropdown-list hidden-xs" id="AdminInfo">
					<li>
						<a href="#" class="dropdown-toggle" data-toggle="dropdown"> <img alt="" src="img/avatar3_small.jpg"> <span> Admin </span> <i class="fa fa-angle-down"></i> </a>
						<ul class="dropdown-menu pull-right">
							<li>
								<a href="javascript:void(0);"><i class="fa fa-move"></i>&nbsp;&nbsp;全屏 </a>
							</li>
							<li>
								<a href="javascript:void(0);"><i class="fa fa-lock"></i>&nbsp;&nbsp;&nbsp;锁定屏幕 </a>
							</li>
							<li>
								<a href="javascript:void(0);"><i class="fa fa-key"></i>&nbsp;&nbsp;退出 </a>
							</li>
						</ul>
					</li>
				</ul>
				<!-- end multiple lang -->

			</div>
			
			
			<!-- end pulled right: nav area -->

		</header>
		<!-- END HEADER -->

		<!-- MAIN CONTENT -->
		<div id="content" class="content_style">
			<div class="row">
				<div class="form-group">
				
					<label class="col-md-1 control-label">实验代号:</label>
					<div class="col-md-2">
						<select class="form-control" id="testnumber" name="testnumber">
							<!-- <option value="2">123456789012345</option>
							<option value="3">312345678901234</option>
							<option value="15">151234567890123</option>
							<option value="20">201234567890123</option> -->
						</select>
					</div>
					<div class="col-md-3">
					   <a class="btn btn-lg btn-primary" onclick="check()">查看</a>
					   <a class="btn btn-lg btn-primary" id="delete" onClick="deleteTest()">删除</a>
					   <a class="btn btn-lg btn-primary" onClick="create()">新建</a>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="select_file" style="display:none;">
					<div class="jarviswidget jarviswidget-color-darken" data-widget-editbutton="false" data-widget-deletebutton="false">
									
						<header>
							<span class="widget-icon"> <i class="fa fa-hand-o-up"></i> </span>
							<h2> 新建试验 </h2>

						</header>

						<div class="widget-body no-padding" style="margin:0;">
							<div class="filelist col-md-12">
		    					<label class="col-md-1 control-label">配置文件：</label>
		                    		<!-- <li>配置文件：</li> -->
		                    	<select class="form-control col-md-3" name="configure" id="configure"></select>
		
		                        <input type="hidden" name="localIP" id="localIP" value="<%=localIP%>" >
		                        <a class="btn btn-lg btn-primary" onClick="createSubmit()">确定</a>
		                        <a class="btn btn-lg btn-primary" onClick="createCancel()">取消</a>
		                     </div>			
						</div>						
						<!-- end widget -->
					</div>
					<%-- <label class="col-md-1 control-label">新建试验</label>
					<br>
                	<!-- <div class="title"><span>新建试验</span></div> -->
                    <div class="filelist col-md-12">
    					<label class="col-md-1 control-label">配置文件：</label>
                    		<!-- <li>配置文件：</li> -->
                    	<select class="form-control" name="configure" id="configure"></select>

                        <input type="hidden" name="localIP" id="localIP" value="<%=localIP%>" >
                        <a onClick="createSubmit()"><img height="25" src="img/login_ok.png"></a>
                        <a onClick="createCancel()"><img height="25" src="img/login_cancel.png"></a>
                     </div> --%>
                </div>
			</div>
			<div class="row" id="main_area" style="display:none;">
				
				<article class="col-sm-3 col-md-3 col-lg-3">
					
					<div style="margin-top:10px;">
					<br>
					<div class="form-group">
						<label class="col-md-4 control-label">试验代号:</label>
						<div class="col-md-8">
							<input name="test" id="test" class="form-control" disabled type="text">
						</div>
					</div>
					<br>
					<div class="form-group">
						<label class="col-md-4 control-label">配置文件:</label>
						<div class="col-md-8">
							<input name="conf" id="conf" class="form-control" disabled type="text">
						</div>
					</div>
					<br>
					<div class="form-group">
						<label class="col-md-4 control-label">想定文件:</label>
						<div class="col-md-8">
							<input class="form-control" id="xiangding" name="xiangding" disabled type="text">
						</div>
					</div>
					<br>
					<div class="form-group">
						<label class="col-md-4 control-label">天文时间:</label>
						<div class="col-md-8">
							<input class="form-control" id="tianwen" name="tianwen" type="text" disabled type="text">
						</div>
					</div>
					<br>
					<div class="form-group">
						<label class="col-md-4 control-label">作战时间</label>
						<div class="col-md-8">
							<input id="fight" disabled name="fight" class="form-control" type="text">
						</div>
					</div>
					<br>
					<input id="self" name="self" type="hidden" value="false">
					</div>
					<div class="test" style="margin-top:35px;">
						<ul class="bg" style="list-style-type:none">
							<li style="display:inline;">
								 <a disabled="disabled" id="_10"class="btn btn-lg btn-primary bg_li"><i class='fa fa-cog'></i>&nbsp部署&nbsp</a>
							</li>
							<li style="display:inline;">
								 <a disabled="disabled" id="_11" class="btn btn-lg btn-primary bg_li"><i class='fa fa-arrow-down'></i>&nbsp接入</a>
							</li>
							<li style="display:inline;">
								 <a disabled="disabled" id="_12" class="btn btn-lg btn-primary bg_li"><i class='fa fa-arrow-right'></i>&nbsp退出</a>
							</li>
						</ul>
						<br>
						<ul class="bg" style="list-style-type:none">
							<li style="display:inline;">
								 <a disabled="disabled" id="_1" class="btn btn-lg btn-primary bg_li"><i class='fa fa-circle'></i>&nbsp初始</a>
							</li>
							<li style="display:inline;">
								 <a disabled="disabled" id="_2" class="btn btn-lg btn-primary bg_li"><i class='fa fa-play'></i>&nbsp开始</a>
							</li>
							<li style="display:inline;">
								 <a disabled="disabled" id="_3" class="btn btn-lg btn-primary bg_li"><i class='fa fa-power-off'></i>&nbsp结束</a>
							</li>
							<li style="display:inline;">
								 <a style="display:none;" disabled="disabled" id="_4" class="btn btn-lg btn-primary bg_li"><i class='fa fa-resize-vertical'></i>&nbsp隐藏1</a>
							</li>
						</ul>
						<ul class="bg" style="list-style-type:none">
							<li style="display:inline;">
								 <a disabled="disabled" id="_5" class="btn btn-lg btn-primary bg_li"><i class='fa fa-resize-vertical'></i>&nbsp调速</a>
							</li>
							<li style="display:inline;">
								 <a disabled="disabled" id="_6" class="btn btn-lg btn-primary bg_li"><i class='fa fa-pause'></i>&nbsp暂停</a>
							</li>
							<li style="display:inline;">
								 <a disabled="disabled" id="_7" class="btn btn-lg btn-primary bg_li"><i class='fa fa-mail-reply-all'></i>&nbsp恢复</a>
							</li>
							<li style="display:inline;">
								 <a style="display:none;" disabled="disabled" id="_8" class="btn btn-lg btn-primary bg_li"><i class='fa fa-resize-vertical'></i>&nbsp隐藏2</a>
							</li>
						</ul>
					</div>
				</article>
				<!-- <article class="col-sm-3 col-md-3 col-lg-3">
					
				</article> -->
				<article class="col-sm-9 col-md-9 col-lg-9">
					<div class="jarviswidget jarviswidget-color-darken" data-widget-editbutton="false" data-widget-deletebutton="false" style="margin-top:25px;">
									
						<header style="background-color:#296191;">
							<span class="widget-icon"> <i class="fa fa-lg fa-fw"></i> </span>
						   <label class="header-label"></label>
							<a style="display:none;" disabled="disabled" id="_9" class="btn btn-lg btn-primary" onclick="check()"><i class='fa fa-resize-vertical'></i>&nbsp隐藏3</a>
						</header>

							<div class="widget-body no-padding" style="margin:0;overflow-y:scroll;height:700px;">
								<!--<div class="widget-body-toolbar">
		
								</div>-->
								
								<table id="table1" class="table table-striped table-bordered table-hover" >
									<thead>
										<tr>
											<th>模型设备名称</th>
											<th>报告时间</th>
											<th>当前状态</th>
											<th>执行状态</th>
											<th>操作</th>
										</tr>
									</thead>
									<tbody class="data_list">
										<!-- <tr>
											<td></td>
											<td>Jennifer</td>
											<td>1-342-463-8341</td>
											<td></td>
											<td></td>																			
										</tr>
										<tr>
											<td></td>
											<td>Jennifer</td>
											<td>1-342-463-8341</td>
											<td></td>
											<td></td>
										</tr>
										<tr>
											<td></td>
											<td>Jennifer</td>
											<td>1-342-463-8341</td>
											<td></td>
											<td></td>
										</tr>
										<tr>
											<td></td>
											<td>Jennifer</td>
											<td>1-342-463-8341</td>
											<td></td>
											<td></td>
										</tr>
										<tr>
											<td></td>
											<td>Jennifer</td>
											<td>1-342-463-8341</td>
											<td></td>
											<td></td>
										</tr>
										<tr>
											<td></td>
											<td>Jennifer</td>
											<td>1-342-463-8341</td>
											<td></td>
											<td></td>
										</tr>
										<tr>
											<td></td>
											<td>Jennifer</td>
											<td>1-342-463-8341</td>
											<td></td>
											<td></td>
										</tr> -->
									</tbody>
								</table>
		
							<!-- end widget content -->
											
							</div>						
							<!-- end widget -->
						</div>
				</article>	
			</div>
						
			
		</div>

		<!-- END MAIN CONTENT -->

		
		<!-- END MAIN PANEL -->

		<!-- SHORTCUT AREA : With large tiles (activated via clicking user name tag)
		Note: These tiles are completely responsive,
		you can add as many as you like
		-->
		<!-- END SHORTCUT AREA -->

		<!--================================================== -->

		<!-- PACE LOADER - turn this on if you want ajax loading to show (caution: uses lots of memory on iDevices)-->
		<script data-pace-options='{ "restartOnRequestAfter": true }' src="js/plugin/pace/pace.min.js"></script>

		<!-- Link to Google CDN's jQuery + jQueryUI; fall back to local -->
		<script src="js/libs/jquery.min.js"></script>

		<script src="js/libs/jquery-2.0.2.min.js"></script>
		<script src="js/libs/jquery-ui.min.js"></script>
		<script src="js/libs/jquery-ui-1.10.3.min.js"></script>

		<!-- BOOTSTRAP JS -->
		<script src="js/bootstrap/bootstrap.min.js"></script>

		<!-- CUSTOM NOTIFICATION -->
		<script src="js/notification/SmartNotification.min.js"></script>

		<!-- JARVIS WIDGETS -->
		<script src="js/smartwidgets/jarvis.widget.min.js"></script>

		<!-- EASY PIE CHARTS -->
		<script src="js/plugin/easy-pie-chart/jquery.easy-pie-chart.min.js"></script>

		<!-- SPARKLINES -->
		<script src="js/plugin/sparkline/jquery.sparkline.min.js"></script>

		<!-- JQUERY VALIDATE -->
		<script src="js/plugin/jquery-validate/jquery.validate.min.js"></script>

		<!-- JQUERY MASKED INPUT -->
		<script src="js/plugin/masked-input/jquery.maskedinput.min.js"></script>

		<!-- JQUERY SELECT2 INPUT -->
		<script src="js/plugin/select2/select2.min.js"></script>

		<!-- JQUERY UI + Bootstrap Slider -->
		<script src="js/plugin/bootstrap-slider/bootstrap-slider.min.js"></script>

		<!-- browser msie issue fix -->
		<script src="js/plugin/msie-fix/jquery.mb.browser.min.js"></script>

		<!-- FastClick: For mobile devices -->
		<script src="js/plugin/fastclick/fastclick.js"></script>

		<!--[if IE 7]>

		<h1>Your browser is out of date, please update your browser by going to www.microsoft.com/download</h1>

		<![endif]-->

		<!-- Demo purpose only -->
		<script src="js/demo.js"></script>

		<!-- MAIN APP JS FILE -->
		<script src="js/app.js"></script>
		
		<!-- PAGE RELATED PLUGIN(S) -->
		
		<!-- Flot Chart Plugin: Flot Engine, Flot Resizer, Flot Tooltip -->
		<script src="js/plugin/flot/jquery.flot.cust.js"></script>
		<script src="js/plugin/flot/jquery.flot.resize.js"></script>
		<script src="js/plugin/flot/jquery.flot.fillbetween.min.js"></script>
		<script src="js/plugin/flot/jquery.flot.orderBar.js"></script>
		<script src="js/plugin/flot/jquery.flot.pie.js"></script>
		<script src="js/plugin/flot/jquery.flot.tooltip.js"></script>
		<!-- Vector Maps Plugin: Vectormap engine, Vectormap language -->
		<script src="js/plugin/vectormap/jquery-jvectormap-1.2.2.min.js"></script>
		<script src="js/plugin/vectormap/jquery-jvectormap-world-mill-en.js"></script>
		<script src="js/plugin/morris/raphael.2.1.0.min.js"></script>
		<script src="js/plugin/morris/morris.min.js"></script>
		<!-- PAGE RELATED PLUGIN(S) -->
		<script src="js/plugin/datatables/jquery.dataTables-cust.min.js"></script>
		<script src="js/plugin/datatables/ColReorder.min.js"></script>
		<script src="js/plugin/datatables/FixedColumns.min.js"></script>
		<script src="js/plugin/datatables/ColVis.min.js"></script>
		<script src="js/plugin/datatables/ZeroClipboard.js"></script>
		<script src="js/plugin/datatables/media/js/TableTools.min.js"></script>
		<script src="js/plugin/datatables/DT_bootstrap.js"></script>
		<!-- Full Calendar -->
		<script src="js/plugin/fullcalendar/jquery.fullcalendar.min.js"></script>
		<script type="text/javascript" charset="utf-8" src="javascript/practiceManege.js"></script>
		<!-- <script type="text/javascript" charset="utf-8" src="javascript/default.js"></script> -->
		<!-- /*<script src="js/d3.min.js" type="text/javascript"></script>
		<script src="js/add/monitor.js" type="text/javascript"></script>
		<script src="js/add/topology.js" type="text/javascript"></script>*/ -->
		

		<!-- Your GOOGLE ANALYTICS CODE Below -->

	</body>
</html>
