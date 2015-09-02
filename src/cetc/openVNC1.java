package cetc;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.util.Iterator;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.dom4j.Document;
import org.dom4j.Element;

import socket.server.webUDPThread;

import XmlProj.QingBaoXml;
import XmlProj.XmlParser;

public class openVNC1 extends HttpServlet {
	ServletContext sc;//设备上下文变量，用于获取服务器的路径
	XmlParser xp;//负责xml的转换方法库
	webUDPThread wdt;//接受exe回馈socket消息的线程
	/**
	 * Constructor of the object.
	 */
	public openVNC1() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
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

		this.doPost(request, response);
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

		//response.setContentType("text/html");
		response.setContentType("text/xml; charset=utf-8");
		String configure = request.getParameter("configure");
		String id = request.getParameter("id");
		System.out.println("id--"+id);
		String name = request.getParameter("name");
		PrintWriter out = response.getWriter();
		String path=sc.getRealPath("/")+"xml\\"+configure;
		System.out.println("-----"+configure);
		//oracle.UseUserTable.getConfigXml(configure,path);//根据configure去查询数据库，然后将查询到的xml文件存入path路径下，文件名依然是configure
		//File file
		
		QingBaoXml qb = new QingBaoXml();	
		
		Document document = qb.loadxml(path);
		String computer ="";
		Element root = document.getRootElement();
		for(Iterator i = root.elementIterator("模型设备信息"); i.hasNext();){ 
			
			Element employee = (Element) i.next(); 
			for(Iterator j = employee.elementIterator("模型设备"); j.hasNext();){   
				
				Element employee_s = (Element) j.next();  
				//System.out.println("moxing:--"+j+"---"+employee_s.attribute("标识").getValue().toString());
				if(employee_s.attribute("标识").getValue().toString().equals(id)){
					computer = employee_s.attribute("计算机标识").getValue().toString();
					System.out.println("computer:"+computer);
				}
			}
		}

		String jlPath ="";
		System.out.println("computer:"+computer);
		for(Iterator i = root.elementIterator("计算机信息"); i.hasNext();){ 
			
			Element employee = (Element) i.next(); 
			for(Iterator j = employee.elementIterator("计算机"); j.hasNext();){   
				Element employee_s = (Element) j.next();   
				if(employee_s.attribute("标识").getValue().toString().equals(computer)){
					jlPath = employee_s.attribute("激励通道地址").getValue();
					System.out.println("jlPath:"+jlPath);
				}
			}
		}
		//写入文件中
		File fl =new File("c:\\vncconfig\\"+name+".vnc");
		//FileOutputStream fos = new FileOutputStream(fl);
		PrintStream ps = new PrintStream(fl);
		String fileString = "[connection]\r\nhost="+jlPath+"\r\nport=5900\r\npassword=a7f8fc867315b7ff\r\n[options]\r\nuse_encoding_0=1\r\nuse_encoding_1=1\r\nuse_encoding_2=1\r\nuse_encoding_3=1\r\nuse_encoding_4=1\r\nuse_encoding_5=1\r\npreferred_encoding=5\r\nrestricted=0\r\nviewonly=1\r\nfullscreen=0\r\n8bit=0\r\nshared=0\r\nswapmouse=0\r\nbelldeiconify=0\r\nemulate3=1\r\nemulate3timeout=100\r\nemulate3fuzz=4\r\ndisableclipboard=0\r\nlocalcursor=1\r\nscale_num=3\r\nscale_den=4\r\n";
		ps.println(fileString);
		ps.close();
		String path_vnc = "";

		path_vnc = (String)getServletConfig().getInitParameter("vncPath");

		System.out.println("path:"+path_vnc);
		Runtime rt = Runtime.getRuntime();
		Process p =null;
		//String path = "D:\\Program Files\\eclipse\\eclipse.exe";
		try
		{
			p=rt.exec("C:\\vnc.exe -exit");
			p=rt.exec("C:\\vnc.exe -config c:\\vncconfig\\"+name+".vnc -pos 280 210 -title "+name);
		}catch(Exception e){
			System.out.println("Error exec bf300.exe");
		}
		//将文件取出，转换为字符串，发送给前端
		String s = qb.doc2String(document);
		response.setContentType("text/xml; charset=utf-8");
		
		out.write(s);
		
		out.flush();
		out.close();
	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init(ServletConfig config) throws ServletException {
		// Put your code here
		super.init(config);
		
        sc=config.getServletContext();
//        String configPath=sc.getRealPath("/")+"/xml/configure1.xml";
//		String statePath=sc.getRealPath("/")+"/xml/state.xml";
		this.xp=new XmlParser();
		wdt=new webUDPThread(xp,sc);
		wdt.start();
	}

}
