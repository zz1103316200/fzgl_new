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
 * 系统试验支撑工具交互servlet
 */
public class fzglServlet extends HttpServlet {

	ServletContext sc;//设备上下文变量，用于获取服务器的路径
	XmlParser xp;//负责xml的转换方法库
	webUDPThread wdt;//接受exe回馈socket消息的线程
	final String ip="192.168.10.88";//发送的目的ip地址
	final int port=20001;//发送的目的端口号
	
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
	//析构函数，在servlet结束时关闭线程
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
		
		String cmd=request.getParameter("cmd");//得到控制命令
		String query=request.getParameter("query");//得到查询命令，发送查询命令
		String filelist = request.getParameter("filelist");//请求配置文件列表
		String configure = request.getParameter("configure");//前端发送的配置文件名称
		String createConf=request.getParameter("createConf");//前端发送的配置文件，这是新建试验时候用的
		String checkTestId=request.getParameter("checkTestId");//查看试验时传进来的试验代号
		String deleteTestId=request.getParameter("deleteTestId");//删除试验时发送的试验代号
		//String testId=request.getParameter("testId");
		String visitIP = request.getRemoteAddr();
		System.out.println("visitIP:--"+visitIP);
		/*
		 * 如果是命令请求，那么cmd不为空
		 * 下面的if将控制命令发送给exe
		 */
		if (cmd!=null) 
		{
			//SimulationCommand_paraStruct是要发送的命令的格式
			//WebUDPClient发送socket的类 
//			SimulationCommand_paraStruct scp = new SimulationCommand_paraStruct(1,cmd,(short)1,0,configure,Integer.parseInt(testId),0);
//			WebUDPClient wc = new WebUDPClient();
//			wc.sendSimulationCommand_paraStruct(scp,this.ip,this.port);
			//这里只负责发送给exe，由线程负责接收
			
			/*
			 * 如果发送的是10号，部署命令，那么要对状态文件做初始化
			 */
			if(cmd.equals("10"))
			{
				String testId=request.getParameter("testId");
				SimulationCommand_paraStruct scp = new SimulationCommand_paraStruct(1,cmd,(short)1,0,configure,Long.parseLong(testId),0);
				WebUDPClient wc = new WebUDPClient();
				wc.sendSimulationCommand_paraStruct(scp,this.ip,this.port);
				System.out.println("testId-----:"+testId);
				String configPath=sc.getRealPath("/")+"xml\\"+configure;//配置文件路径
				String statePath=sc.getRealPath("/")+"xml\\"+testId+"state.xml";//状态文件路径
				System.out.println(configPath);
				System.out.println(statePath);
				//按照config文件修改state.xml文件
				XmlParser.initXml(configPath,statePath);

				
			}else{
				String testId=request.getParameter("testId");
				SimulationCommand_paraStruct scp = new SimulationCommand_paraStruct(1,cmd,(short)1,0,configure,Long.parseLong(testId),0);
				WebUDPClient wc = new WebUDPClient();
				wc.sendSimulationCommand_paraStruct(scp,this.ip,this.port);
			}
	
		}
		//如果发送过来的是查询命令  则按如下处理
		if (query!=null) {
			long seatid=Long.parseLong(request.getParameter("seatid"));
			StatusQuery_paraStruct sqp = new StatusQuery_paraStruct(4,seatid,0);
			WebUDPClient wc = new WebUDPClient();
			wc.sendStatusQuery_paraStruct(sqp, this.ip, this.port);//待修改
		}
		//设置返回的格式 
		response.setContentType("text/html; charset=gb2312");
		PrintWriter out = response.getWriter();
		//如果请求文件列表，那么查询数据库，返回文件列表
		if(filelist != null){
//			System.out.println(oracle.UseUserTable.read());
			//连接数据库时 记得从数据库读取 不连数据库时是个死数据
			//out.write(oracle.UseUserTable.read());
			out.write("configure1.xml,configure2.xml,configure3.xml");
		}
		//这个判断条件有待改进
		if(configure != null){
			String path=sc.getRealPath("/")+"xml\\"+configure;
			System.out.println(configure);
			//oracle.UseUserTable.getConfigXml(configure,path);//根据configure去查询数据库，然后将查询到的xml文件存入path路径下，文件名依然是configure
			
			QingBaoXml qb = new QingBaoXml();	
			
			Document document = qb.loadxml(path);
			//将文件取出，转换为字符串，发送给前端
			String s = qb.doc2String(document);
			response.setContentType("text/xml; charset=utf-8");
			out.write(s);
		}
		if(createConf!=null){
			String testPath=sc.getRealPath("/")+"xml\\"+"test.xml";//试验文件路径
			String  createIP=request.getParameter("createIP");
//			System.out.println(createIP);
//			//通过 “.”来截取最后的ip段  并保证最后的ip段是三位
//			String ipShuzu[]=createIP.split("[.]");
//			String lastIP=ipShuzu[ipShuzu.length-1];
//			//保证最后ip段是三位
//			if(lastIP.length()!=3){
//				if(lastIP.length()==2){
//					lastIP+="0"+lastIP;
//				}else if(lastIP.length()==1){
//					lastIP+="00"+lastIP;
//				}
//			}
			//把时间转化成年月日时分秒的字符串
			Date nowDate=new Date();
		    DateFormat format = new SimpleDateFormat("MMddHHmmss");    
		    String strDate=format.format(nowDate);
		    //试验的代号是用最后ip段和字符串的时间初始化出来的
		    //String testId=lastIP+strDate;
		    String testId=strDate;
		    //试验状态初始化为1 其他为0
		    String testState="000000000100";
		    
		    //下面组装hashmap 用来生成xml
		    HashMap testMap=new HashMap();
		    testMap.put("试验代号",testId);
		    testMap.put("创建IP", createIP);
		    testMap.put("配置文件", createConf);
		    testMap.put("运行", "false");
		    testMap.put("状态",testState );
		    
		    TestXmlParser.addTest(testPath, testMap);
		    
		    //创建一个跟test绑定的state文件，文件名是testId+state.xml
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
			//删除时候要把试验对应的state给删掉
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
		//开始服务器socket监听线程，等待应用程序发送反馈信息
		//对收到的反馈信息，生成xml，等待前端来读取
		super.init(config);
		
        sc=config.getServletContext();
//        String configPath=sc.getRealPath("/")+"/xml/configure1.xml";
//		String statePath=sc.getRealPath("/")+"/xml/state.xml";
		this.xp=new XmlParser();
		wdt=new webUDPThread(xp,sc);
		wdt.start();
		
		
	}
	

}
