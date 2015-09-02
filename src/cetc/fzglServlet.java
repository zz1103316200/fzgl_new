package cetc;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.dom4j.Document;

import XmlProj.QingBaoXml;
import XmlProj.TestXmlParser;
import XmlProj.XmlParser;
import socket.client.WebUDPClient; 
import socket.data.SimulationCommand_paraStruct;
import socket.data.StatusQuery_paraStruct;
import socket.server.webUDPThread;

/*
 * ϵͳ����֧�Ź��߽���servlet
 */
public class fzglServlet extends HttpServlet {

	ServletContext sc;//�豸�����ı��������ڻ�ȡ��������·��
	XmlParser xp;//����xml��ת��������
	webUDPThread wdt;//����exe����socket��Ϣ���߳�
	final String ip="192.168.10.88";//���͵�Ŀ��ip��ַ
	final int port=20001;//���͵�Ŀ�Ķ˿ں�
	
	private static final long serialVersionUID = 1L;

	/**
	 * Constructor of the object.
	 */
	public fzglServlet() {
		super();
		
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	//������������servlet����ʱ�ر��߳�
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
		System.out.println("servlet desdory");
		String sendStr = "terminate";
        byte[] sendBuf;
        sendBuf = sendStr.getBytes();
		try {
			new DatagramSocket().send(new DatagramPacket(sendBuf ,sendBuf.length , InetAddress.getByName("localhost") , 4800));
		} catch (SocketException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		wdt.ds.disconnect();
		System.out.println("disconnect()");
		wdt.ds.close();
		System.out.println("close()");

		
	}

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doPost(request, response);
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.out.println("dopost");
		
		String cmd=request.getParameter("cmd");//�õ���������
		String query=request.getParameter("query");//�õ���ѯ������Ͳ�ѯ����
		String filelist = request.getParameter("filelist");//���������ļ��б�
		String configure = request.getParameter("configure");//ǰ�˷��͵������ļ�����
		String createConf=request.getParameter("createConf");//ǰ�˷��͵������ļ��������½�����ʱ���õ�
		String checkTestId=request.getParameter("checkTestId");//�鿴����ʱ���������������
		String deleteTestId=request.getParameter("deleteTestId");//ɾ������ʱ���͵��������
		//String testId=request.getParameter("testId");
		String visitIP = request.getRemoteAddr();
		System.out.println("visitIP:--"+visitIP);
		/*
		 * ���������������ôcmd��Ϊ��
		 * �����if����������͸�exe
		 */
		if (cmd!=null) 
		{
			//SimulationCommand_paraStruct��Ҫ���͵�����ĸ�ʽ
			//WebUDPClient����socket���� 
//			SimulationCommand_paraStruct scp = new SimulationCommand_paraStruct(1,cmd,(short)1,0,configure,Integer.parseInt(testId),0);
//			WebUDPClient wc = new WebUDPClient();
//			wc.sendSimulationCommand_paraStruct(scp,this.ip,this.port);
			//����ֻ�����͸�exe�����̸߳������
			
			/*
			 * ������͵���10�ţ����������ôҪ��״̬�ļ�����ʼ��
			 */
			if(cmd.equals("10"))
			{
				String testId=request.getParameter("testId");
				SimulationCommand_paraStruct scp = new SimulationCommand_paraStruct(1,cmd,(short)1,0,configure,Long.parseLong(testId),0);
				WebUDPClient wc = new WebUDPClient();
				wc.sendSimulationCommand_paraStruct(scp,this.ip,this.port);
				System.out.println("testId-----:"+testId);
				String configPath=sc.getRealPath("/")+"xml\\"+configure;//�����ļ�·��
				String statePath=sc.getRealPath("/")+"xml\\"+testId+"state.xml";//״̬�ļ�·��
				System.out.println(configPath);
				System.out.println(statePath);
				//����config�ļ��޸�state.xml�ļ�
				XmlParser.initXml(configPath,statePath);

				
			}else{
				String testId=request.getParameter("testId");
				SimulationCommand_paraStruct scp = new SimulationCommand_paraStruct(1,cmd,(short)1,0,configure,Long.parseLong(testId),0);
				WebUDPClient wc = new WebUDPClient();
				wc.sendSimulationCommand_paraStruct(scp,this.ip,this.port);
			}
	
		}
		//������͹������ǲ�ѯ����  �����´���
		if (query!=null) {
			long seatid=Long.parseLong(request.getParameter("seatid"));
			StatusQuery_paraStruct sqp = new StatusQuery_paraStruct(4,seatid,0);
			WebUDPClient wc = new WebUDPClient();
			wc.sendStatusQuery_paraStruct(sqp, this.ip, this.port);//���޸�
		}
		//���÷��صĸ�ʽ 
		response.setContentType("text/html; charset=gb2312");
		PrintWriter out = response.getWriter();
		//��������ļ��б���ô��ѯ���ݿ⣬�����ļ��б�
		if(filelist != null){
//			System.out.println(oracle.UseUserTable.read());
			//�������ݿ�ʱ �ǵô����ݿ��ȡ �������ݿ�ʱ�Ǹ�������
			//out.write(oracle.UseUserTable.read());
			out.write("configure1.xml,configure2.xml,configure3.xml");
		}
		//����ж������д��Ľ�
		if(configure != null){
			String path=sc.getRealPath("/")+"xml\\"+configure;
			System.out.println(configure);
			//oracle.UseUserTable.getConfigXml(configure,path);//����configureȥ��ѯ���ݿ⣬Ȼ�󽫲�ѯ����xml�ļ�����path·���£��ļ�����Ȼ��configure
			
			QingBaoXml qb = new QingBaoXml();	
			
			Document document = qb.loadxml(path);
			//���ļ�ȡ����ת��Ϊ�ַ��������͸�ǰ��
			String s = qb.doc2String(document);
			response.setContentType("text/xml; charset=utf-8");
			out.write(s);
		}
		if(createConf!=null){
			String testPath=sc.getRealPath("/")+"xml\\"+"test.xml";//�����ļ�·��
			String  createIP=request.getParameter("createIP");
//			System.out.println(createIP);
//			//ͨ�� ��.������ȡ����ip��  ����֤����ip������λ
//			String ipShuzu[]=createIP.split("[.]");
//			String lastIP=ipShuzu[ipShuzu.length-1];
//			//��֤���ip������λ
//			if(lastIP.length()!=3){
//				if(lastIP.length()==2){
//					lastIP+="0"+lastIP;
//				}else if(lastIP.length()==1){
//					lastIP+="00"+lastIP;
//				}
//			}
			//��ʱ��ת����������ʱ������ַ���
			Date nowDate=new Date();
		    DateFormat format = new SimpleDateFormat("MMddHHmmss");    
		    String strDate=format.format(nowDate);
		    //����Ĵ����������ip�κ��ַ�����ʱ���ʼ��������
		    //String testId=lastIP+strDate;
		    String testId=strDate;
		    //����״̬��ʼ��Ϊ1 ����Ϊ0
		    String testState="000000000100";
		    
		    //������װhashmap ��������xml
		    HashMap testMap=new HashMap();
		    testMap.put("�������",testId);
		    testMap.put("����IP", createIP);
		    testMap.put("�����ļ�", createConf);
		    testMap.put("����", "false");
		    testMap.put("״̬",testState );
		    
		    TestXmlParser.addTest(testPath, testMap);
		    
		    //����һ����test�󶨵�state�ļ����ļ�����testId+state.xml
		    String statePath=sc.getRealPath("/")+"xml\\"+testId+"state.xml";
		    File file=new File(statePath);
		    file.createNewFile();
		    FileWriter fw = new FileWriter(file, true);
		    BufferedWriter bw = new BufferedWriter(fw);
		    bw.write("<?xml version='1.0' encoding='UTF-8'?>");
		    bw.flush();
		    bw.close();
		    fw.close();

		    
		    out.write(testId);
		    
		}
		if(checkTestId!=null){
			String checkPath=sc.getRealPath("/")+"xml\\"+"test.xml";
			String testState=request.getParameter("testState");
			TestXmlParser.updateTestStatusByTestId(checkTestId, checkTestId, testState);
		}
		if(deleteTestId!=null){
			String deletePath=sc.getRealPath("/")+"xml\\"+"test.xml";
			TestXmlParser.deleteTest(deletePath, deleteTestId);
			//ɾ��ʱ��Ҫ�������Ӧ��state��ɾ��
			String deleteStatePath=sc.getRealPath("/")+"xml\\"+deleteTestId+"state.xml";
			File file=new File(deleteStatePath);
			file.delete();
		}
		
	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init(ServletConfig config) throws ServletException {
		// Put your code here
		//��ʼ������socket�����̣߳��ȴ�Ӧ�ó����ͷ�����Ϣ
		//���յ��ķ�����Ϣ������xml���ȴ�ǰ������ȡ
		super.init(config);
		
        sc=config.getServletContext();
//        String configPath=sc.getRealPath("/")+"/xml/configure1.xml";
//		String statePath=sc.getRealPath("/")+"/xml/state.xml";
		this.xp=new XmlParser();
		wdt=new webUDPThread(xp,sc);
		wdt.start();
		
		
	}
	

}
