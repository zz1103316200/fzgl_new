<%@ page language="java" import="java.util.*" pageEncoding="GB18030"%>
<%@ page
import="java.net.InetAddress"
%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%
	request.setCharacterEncoding("GB2312");
	String host = InetAddress.getLocalHost().toString();
	System.out.println(host);
	String localIP = host.substring(host.indexOf("/")+1);
	System.out.println(localIP);
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<title>ϵͳ��������ƽ̨</title>
	<link rel="stylesheet" type="text/css" href="themes/default/easyui.css">
	<link rel="stylesheet" type="text/css" href="themes/icon.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
	<script type="text/javascript" src="javascript/jquery-1.4.2.min.js"></script>
	<script type="text/javascript" src="javascript/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="javascript/default.js"></script>
</head>
<body class="easyui-layout">
		<div region="north" title="��" split="true" style="height:100px;padding:1px;">
			<img src="img/banner.png" />
		</div>
		<!--<div region="south" title="South Title" split="true" style="height:100px;padding:10px;background:#efefef;">
			<div class="easyui-layout" fit="true" style="background:#ccc;">
				<div region="center">sub center</div>
				<div region="east" split="true" style="width:200px;">sub center</div>
			</div>
		</div>-->
		<!--<div region="east" icon="icon-reload" title="Tree Menu" split="true" style="width:180px;">
			<ul class="easyui-tree" url="tree_data.json"></ul>
		</div>-->
		<div region="west" split="true" title="��" style="width:280px;padding1:1px;overflow:hidden;">
			<div class="easyui-accordion" fit="true" border="false">
				<div class="west_tab_1" title="ϵͳ����֧�Ź���" style="overflow:auto;" selected="true">
                	<p><a onClick="showTab1(this.id)" id="btn_1_7"><img height="60" src="img/button17.png" /></a></p>
					<p><a onClick="showTab1(this.id)" id="btn_1_1"><img height="60" src="img/button11.png" /></a></p>
					<p><a onClick="showTab1(this.id)" id="btn_1_4"><img height="60" src="img/button14.png" /></a></p>
					<p><a onClick="showTab1(this.id)" id="btn_1_5"><img height="60" src="img/button15.png" /></a></p>
					<p><a onClick="showTab1(this.id)" id="btn_1_6"><img height="60" src="img/button16.png" /></a></p>
                    <p><a onClick="showTab1(this.id)" id="btn_1_2"><img height="60" src="img/button12.png" /></a></p>
					<p><a onClick="showTab1(this.id)" id="btn_1_3"><img height="60" src="img/button13.png" /></a></p>
				</div>
				<div class="west_tab_2" title="�鱨�������" style="padding:10px;">
					<p><a onClick="showTab2(this.id)" id="btn_2_1"><img height="60" src="img/button21.png" /></a></p>
					<p><a onClick="showTab2(this.id)" id="btn_2_2"><img height="60" src="img/button22.png" /></a></p>
					<p><a onClick="showTab2(this.id)" id="btn_2_3"><img height="60" src="img/button23.png" /></a></p>
					<p><a onClick="showTab2(this.id)" id="btn_2_4"><img height="60" src="img/button24.png" /></a></p>
					<p><a onClick="showTab2(this.id)" id="btn_2_5"><img height="60" src="img/button25.png" /></a></p>
					<p><a onClick="showTab2(this.id)" id="btn_2_6"><img height="60" src="img/button26.png" /></a></p>
				</div>
				<div class="west_tab_3" title="ϵͳ��������">
					<p><a onClick="showTab3(this.id)" id="btn_3_1"><img height="60" src="img/button31.png" /></a></p>
					<p><a onClick="showTab3(this.id)" id="btn_3_2"><img height="60" src="img/button32.png" /></a></p>
				</div>
			</div>
		</div>
		<div class="center" region="center" title="��" style="overflow:hidden;">
            <div class="ct_tab_1">
            	<!-- 1-1 ������� -->
            	<div id="div_1_1">
                <div class="left">
                         <table cellpadding="5" cellspacing="5">
                          <tr>
                            <td>�������</td>
                            <td><input type="text" value="" name="test" id="test" style="width:180px;" disabled></td>
                          </tr>
                          <tr>
                            <td>�����ļ�</td>
                            <td><input type="text" value="" name="conf" id="conf" style="width:180px;" disabled></td>
                          </tr>
                          <tr>
                            <td>�붨�ļ�</td>
                            <td><input id="xiangding" name="xiangding" type="text" disabled size="24"></td>
                          </tr>
                          <tr>
                            <td>����ʱ��</td>
                            <td><input id="tianwen" name="tianwen" type="text" disabled size="24"></td>
                          </tr>
                          <tr>
                            <td>��սʱ��</td>
                            <td><input id="fight" name="fight" type="text" disabled size="24"></td>
                          </tr>
                          <input id="self" name="self" type="hidden" value="false">
                        </table>
                          <div class="test">
                            <ul class="bg1">
                            <li><a disabled="disabled" id="_10"><img width="100" src="img/deploy_gray.png" /></a></li>
                            <li><a disabled="disabled" id="_11"><img width="100" src="img/join_gray.png" /></a></li>
                            <li><a disabled="disabled" id="_12"><img width="100" src="img/quit_gray.png" /></a></li>
                            </ul>
                            <ul class="bg2">
                            <li><a disabled="disabled" id="_1"><img width="100" src="img/init_gray.png" /></a></li>
                            <li><a disabled="disabled" id="_2"><img width="100" src="img/start_gray.png" /></a></li>
                            <li><a disabled="disabled" id="_3"><img width="100" src="img/end_gray.png" /></a></li>
                            <li><a disabled="disabled" id="_4" style="display:none"><img width="100" src="img/document_gray.png" /></a></li>
                            <li><a disabled="disabled" id="_6"><img width="100" src="img/stop_gray.png" /></a></li>
                            <li><a disabled="disabled" id="_7"><img width="100" src="img/back_gray.png" /></a></li>
                            <li><a disabled="disabled" id="_5"><img width="100" src="img/speed_gray.png" /></a></li>
                            <li><a disabled="disabled" id="_8" style="display:none"><img width="100" src="img/redo_gray.png" /></a></li>
                            </ul>
                          </div>
              </div>
                <div class="right">
                	<div class="query"><a id="_9" disabled="disabled" style="display:none"><img width="100" src="img/query_gray.png" /></a></div>
                    <div class="data">
                        <div id="index_0" class="head">
                        	<ul>
                        		<li class="check"></li>
                        		<li class="deviceName">ģ���豸����</li>
                        		<li class="reportTime">����ʱ��</li>
                        		<li class="currentState">��ǰ״̬</li>
                        		<li class="exeState">ִ��״̬</li>
                        		<li class="other">����</li>
                        	</ul>
                        </div>
                        <!--<div id="index_1" class="row"><ul><li class="check"><input type="checkbox"></li><li class="no">1</li><li class="deviceName">�ۺ�̬����ʾ</li><li class="reportTime">2013-4-25 9:54:08</li><li class="currentState">�ѽ���</li><li class="exeState">����</li><li class="other">��ϸ��Ϣ ����Զ������</li></ul></div>-->
                    	<div class="data_list"></div>
                    </div>
                </div>
                <div style="clear:both"></div>
                </div>
                <!-- 1-2 �붨�༭ -->
                <div id="div_1_2"></div>
                <!-- 1-3 �������� -->
                <div id="div_1_3"></div>
                <!-- 1-4 ̬����ʾ -->
                <div id="div_1_4"></div>
                <!-- 1-5 ���鵼�� -->
                <div id="div_1_5"></div>
                <!-- 1-6 ���ݲɼ� -->
                <div id="div_1_6"></div>
                <!-- 1-7 ������� -->
                <div id="div_1_7">
                	<div class="content">
                    	<table cellspacing="10">
                          <tr>
                            <td>������ţ�</td>
                            <td><select id="testnumber" name="testnumber"></select></td>
                            <td><a onClick="check()"><img src="img/check.gif"></a></td>
                            <td><a id="delete" onClick="deleteTest()"><img src="img/delete1.png"></a></td>
                            <td><a onClick="create()"><img src="img/create.gif"></a></td>
                          </tr>
                        </table>
                        <div class="select_file">
                        	<div class="title"><span>�½�����</span></div>
                            <div class="filelist">
                            <ul><li>�����ļ���</li>
                            	<li><select name="configure" id="configure"></select></li>
                                <input type="hidden" name="localIP" id="localIP" value="<%=localIP%>" >
                                <li><a onClick="createSubmit()"><img height="25" src="img/login_ok.png"></a></li>
                                <li><a onClick="createCancel()"><img height="25" src="img/login_cancel.png"></a></li>
                                </ul></div>
                        </div>
                    </div>
              </div>
            </div>
        <div class="ct_tab_2" style="display:none">
        	<div id="div_2_1">
            		<div class="position">�״��鱨����  ��ǰ������<span>�½�����</span></div>
                    <form action="" method="post" id="form1">
                        <table cellpadding="2" cellspacing="15">
                          <tr>
                            <td>ģ����վ��</td>
                            <td><input type="text" name="num" size="20"></td>
                            <td>�״�߶ȣ��ף�</td>
                            <td><input type="text" name="_z" size="20"></td>
                          </tr>
                          <tr>
                            <td>�״ﾭ�ȣ��㣩</td>
                            <td><input type="text" name="_x" size="20"></td>
                            <td>�״�γ�ȣ��㣩</td>
                            <td><input type="text" name="_y" size="20"></td>
                          </tr>
                          <tr>
                          	<td>�鱨��ʽ</td>
                            <td colspan="3">
                            <input type="radio" name="format" value="QDB12" id="f1" checked><label for="f1">QDB12</label>
                            <input type="radio" name="format" value="40����" id="f2"><label for="f2">40����</label>
                            <input type="radio" name="format" value="5779" id="f3"><label for="f3">5779</label>
                            <input type="radio" name="format" value="�Զ���" id="f4"><label for="f4">�Զ���</label></td>
                           </tr>
                           <tr>
                            <td>����Э��</td>
                            <td colspan="3">
                            <input type="radio" name="proto" value="4908" id="p1" checked><label for="p1">4908</label>
                            <input type="radio" name="proto" value="HLA" id="p2"><label for="p2">HLA</label>
                            <input type="radio" name="proto" value="TCP" id="p3"><label for="p3">TCP</label>
                            <input type="radio" name="proto" value="UDP" id="p4"><label for="p4">UDP</label>
                            <input type="radio" name="proto" value="�Զ���" id="p5"><label for="p5">�Զ���</label>
                            </td>
                          </tr>
                          <tr>
                          	<td>Ŀ��IP��ַ</td>
                            <td><input type="text" name="ip" size="20"></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                            <td class="submit"><a onClick="submit1()"><img src="img/submit.png"/></a></td>
                            <td class="ok"><a onClick="ok1()"><img src="img/OK.png"/></a></td>
                            <td class="cancel"><a onClick="cancel1()"><img src="img/cancel.png"/></a></td>
                          </tr>
                        </table>
                        <div class="list radar">
                        	<div class="header">
                            	<ul><li class="station">�״�վ��</li><li class="long">�״ﾭ��(��)</li><li class="lat">�״�γ��(��)</li><li class="height">�״�߶ȣ��ף�</li><li class="format">�鱨��ʽ</li><li class="protocol">����Э��</li><li class="address">Ŀ��IP��ַ</li><li class="operation">����</li></ul>
                            </div>
                            <div class="list_list">
	                            <div class="record">
	                            	<ul><li class="no">1</li><li class="station">1001</li><li class="long">168</li><li class="lat">45</li><li class="height">2000</li><li class="format">QDB12</li><li class="protocol">TCP</li><li class="address">127.0.0.1</li><li class="operation"><a onClick="modify1('1001')">�޸�</a>  <a onClick="delete1('1001')">ɾ��</a></li></ul>
	                            </div>
                            </div>
                        </div>
              	</form>
               </div>
               <div id="div_2_2">
               		<div class="position">�����鱨����  ��ǰ������<span>�½�����</span></div>
                    <form action="" method="post" id="form2">
                        <table cellpadding="2" cellspacing="15">
                          <tr>
                            <td>ģ����վ��</td>
                            <td><input type="text" name="num" size="20"></td>
                            <td>Esm�߶ȣ��ף�</td>
                            <td><input type="text" name="_z" size="20"></td>
                          </tr>
                          <tr>
                            <td>Esm���ȣ��㣩</td>
                            <td><input type="text" name="_x" size="20"></td>
                            <td>Esmγ�ȣ��㣩</td>
                            <td><input type="text" name="_y" size="20"></td>
                          </tr>
                          <tr>
                          	<td>�鱨��ʽ</td>
                            <td colspan="3">
                            <input type="radio" name="format" value="JCB106" id="f01" checked><label for="f01">JCB106</label>
                            <input type="radio" name="format" value="�Զ���" id="f02"><label for="f02">�Զ���</label>
                           </tr>
                           <tr>
                            <td>����Э��</td>
                            <td colspan="3">
                            <input type="radio" name="proto" value="4908" id="p01" checked><label for="p01">4908</label>
                            <input type="radio" name="proto" value="HLA" id="p02"><label for="p02">HLA</label>
                            <input type="radio" name="proto" value="TCP" id="p03"><label for="p03">TCP</label>
                            <input type="radio" name="proto" value="UDP" id="p04"><label for="p04">UDP</label>
                            <input type="radio" name="proto" value="�Զ���" id="p05"><label for="p05">�Զ���</label>
                            </td>
                          </tr>
                          <tr>
                          	<td>Ŀ��IP��ַ</td>
                            <td><input type="text" name="ip" size="20"></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>&nbsp;</td>
                            <td class="submit"><a onClick="submit2()"><img src="img/submit.png"/></a></td>
                            <td class="ok"><a onClick="ok2()"><img src="img/OK.png"/></a></td>
                            <td class="cancel"><a onClick="cancel2()"><img src="img/cancel.png"/></a></td>
                          </tr>
                        </table>
                        <div class="list esm">
                        	<div class="header">
                            	<ul><li class="station">Esmվ��</li><li class="long">Esm����(��)</li><li class="lat">Esmγ��(��)</li><li class="height">Esm�߶ȣ��ף�</li><li class="format">�鱨��ʽ</li><li class="protocol">����Э��</li><li class="address">Ŀ��IP��ַ</li><li class="operation">����</li></ul>
                            </div>
                            <div class="list_list">
	                            <div class="record">
	                            	<ul><li class="no">1</li><li class="station">3001</li><li class="long">168</li><li class="lat">45</li><li class="height">2000</li><li class="format">�Զ���</li><li class="protocol">TCP</li><li class="address">127.0.0.1</li><li class="operation"><a onClick="modify2('3001')">�޸�</a>  <a onClick="delete2('3001')">ɾ��</a></li></ul>
	                            </div>
                            </div>
                        </div>
              	</form>
               </div>
               <div id="div_2_3"></div>
               <div id="div_2_4"></div>
               <div id="div_2_5">
               		<div class="position">�鱨�û��༭</div>
               		<form id="form5">
                    	<table cellpadding="5" cellspacing="10">
                        	<tr><td><input name="falx" type="radio" id="lx_1" onClick="changeFangan(1)" checked /><label for="lx_1">�½�����</label></td>
                            	<td><input type="radio" name="falx" id="lx_2" onClick="changeFangan(2)" /><label for="lx_2">���з���</label></td>
                                <td>�������ƣ�</td>
                                <td><select style="width:150px" name="fangan" id="fangan" disabled onChange="fanganChange(this.value)">
                                </select></td>
                                </tr>
                            <tr><td>�û�����</td><td><input type="text" name="user" value="" size="20"></td>
                            	<td>�붨�ļ�</td><td><select name="file" style="width:150px">
                                	<option selected>�붨1.xml</option>
                                    <option>�붨2.xml</option>
                                    <option>�붨3.xml</option></select></td></tr>
                            <tr><td>��������</td><td><input type="text" name="name" value="" ></td><td></td><td id="submitFangan" onClick="submitFangan()"><a><img src="img/submitFangan.png"></a></td></tr>
                        </table>
                        <div class="fangan_list">
                        	<div class="header">
                            	<ul><li class="type">ģ��������</li></li><li class="station">ģ����վ��</li><li class="long">����(��)</li><li class="lat">γ��(��)</li><li class="height">�߶ȣ��ף�</li><li class="format">�鱨��ʽ</li><li class="protocol">����Э��</li><li class="address">Ŀ��IP��ַ</li><li class="operation">����</li></ul>
                            </div>
                            <div class="fa_list">
	                            <div class="record">
	                            	<ul><li class="no">1</li><li class="type">�״�</li><li class="station">1001</li><li class="long">168</li><li class="lat">45</li><li class="height">2000</li><li class="format">QDB12</li><li class="protocol">TCP</li><li class="address">127.0.0.1</li><li class="operation"><a onClick="modify5(1)">�޸�</a>  <a onClick="delete5(1)">ɾ��</a></li></ul>
	                            </div>
	                            <div class="record">
	                            	<ul><li class="no">2</li><li class="type">Esm</li><li class="station">3001</li><li class="long">168</li><li class="lat">45</li><li class="height">2000</li><li class="format">�Զ���</li><li class="protocol">TCP</li><li class="address">127.0.0.1</li><li class="operation"><a onClick="modify5(2)">�޸�</a>  <a onClick="delete5(2)">ɾ��</a></li></ul>
	                            </div>
	                        </div>
                        </div>
                 </form>
          </div>
               <div id="div_2_6">
               		<ul><li><a id="fzkz_1" title="��ʼ��"><img src="img/c_init.png"></a></li>
                    <li><a id="fzkz_2" title="��ʼ" disabled="disabled"><img src="img/c_start_gray.png"></a></li>
                    <li><a id="fzkz_3" title="��ͣ" disabled="disabled"><img src="img/c_stop_gray.png"></a></li>
                    <li><a id="fzkz_4" title="�ָ�" disabled="disabled"><img src="img/c_back_gray.png"></a></li>
                    <li><a id="fzkz_5" title="ֹͣ" disabled="disabled"><img src="img/c_end_gray.png"></a></li>
                    </ul>
               </div>
            </div>
            <div class="ct_tab_3" style="display:none">
            	<div id="div_3_1"></div>
            	<div id="div_3_2"></div>
            </div>
		</div>
</body>
</html>
