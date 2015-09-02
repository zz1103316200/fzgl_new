package cetc;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.dom4j.Document;

import XmlProj.FileViewer;
import XmlProj.QingBaoXml;
/*
 * 情报仿真服务使用的servlet
 */
public class qbfzServlet extends HttpServlet {

	
	ServletContext sc;//用来获得工程在服务器中的路径
	/**
	 * Constructor of the object.
	 */
	public qbfzServlet() {
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
		request.setCharacterEncoding("UTF-8");
		String newfangan=request.getParameter("fangan");
		String type=request.getParameter("type");
		String ope=request.getParameter("ope");
		String num=request.getParameter("num");
		String _x=request.getParameter("_x");
		String _y=request.getParameter("_y");
		String _z=request.getParameter("_z");
		String format=request.getParameter("format");
		String proto=request.getParameter("proto");
		String ip=request.getParameter("ip");
		String file=request.getParameter("file");
		String user=request.getParameter("user");
		String querylist=request.getParameter("querylist");
		String zhongwenfile= request.getParameter("zhongwenfile");
		String oldfangan=request.getParameter("old");
//		String socketIP=request.getParameter("socketIP");
//		String socketPort=request.getParameter("socketPort");
		
		
		if(num!=null)//操作类型s
		{
			QingBaoXml qb = new QingBaoXml();		
			String fpath=sc.getRealPath("/")+"qbfzXml\\"+newfangan+".xml";
			System.out.println(fpath);
			HashMap<String,String> map = new HashMap<String,String>();
			map.put("站号", num);
			map.put("经度", _x);
			map.put("纬度", _y);
			map.put("高度", _z);
			map.put("格式", format);
			map.put("协议", proto);
			map.put("地址", ip);
			System.out.println(num+" "+fpath+" "+type+" "+ope+" ");
			qb.modifyXml(fpath, type, ope, map);
			
			
		}
		if(file!=null)//提交新方案
		{
			System.out.println("提交新方案"+oldfangan+" "+newfangan+" "+file+" "+user);
			QingBaoXml qb = new QingBaoXml();	
			//另存为xml文件
			ArrayList<String> al = new ArrayList<String>();
			String[] s = {newfangan,user,file};
			for(int i=0;i<s.length;i++){
				al.add(s[i]);
			}
			boolean flag=false;
			if(newfangan.equals(oldfangan))
			{
				//直接在旧的里面更新
				String path=sc.getRealPath("/")+"qbfzXml\\"+oldfangan+".xml";
				qb.writeXml(qb.configXmlHead(al, path), path);
				response.setContentType("text/html; charset=gb2312");
				PrintWriter out = response.getWriter();
				flag=true;
				out.write("true");
			}
			else
			{
				//将旧方案另存为新方案,然后修改新方案的字段
				String path=sc.getRealPath("/")+"qbfzXml\\"+oldfangan+".xml";
				String newpath=sc.getRealPath("/")+"qbfzXml\\"+newfangan+".xml";
				flag=qb.doc2XmlFile(qb.configXmlHead(al, path),newpath);//另存函数
				if(oldfangan.equals("untitled"))
				{
					qb.initXml(path);//每次增加新的后清空临时方案
				}
				response.setContentType("text/html; charset=gb2312");
				PrintWriter out = response.getWriter();
				if(flag)
				{
					out.write("true");
				}
				else
				{
					out.write("false");
				}
				
				
			}
			//存储ip+port
//			String filepath=sc.getRealPath("/")+"config\\ipportconf.txt";
//			File f = new File(filepath);
//			String conf = socketIP+"#"+socketPort;
//			FileWriter writer = new FileWriter(f);
//			writer.write(conf);
//			writer.close();
			//读取
			
			//读ipportconf.txt
			if(flag)
			{
			String filepath=sc.getRealPath("/")+"config\\ipportconf.txt";
			//从文件读取ip地址和端口号
			File file1 = new File(filepath);
			BufferedReader reader = null;
			reader = new BufferedReader(new FileReader(file1));
			String tempString = reader.readLine();
			String[] t = tempString.split("#");
			String hostname = t[0];
			String port = t[1];
			//发送xmlsocket
			InetAddress addr;
			addr = InetAddress.getByName(hostname);
			DatagramSocket client = new DatagramSocket();
			String sendpath=sc.getRealPath("/")+"qbfzXml\\"+newfangan+".xml";
			Document sendDoc=qb.loadxml(sendpath);
			String sendStr="1"+qb.doc2String(sendDoc);
			DatagramPacket sendPacket = new DatagramPacket(sendStr.getBytes(),sendStr.getBytes().length, addr ,Integer.parseInt(port));
			client.send(sendPacket);
			}

			
		}
		if(querylist!=null)
		{
			String path=sc.getRealPath("/")+"qbfzXml\\";
			String list=FileViewer.getFiles(path);
			
			response.setContentType("text/html; charset=gb2312");
			PrintWriter out = response.getWriter();
			out.write(list);
			
		}
		if(zhongwenfile!=null)
		{
			QingBaoXml qb = new QingBaoXml();	
			String path=sc.getRealPath("/")+zhongwenfile;
			Document document = qb.loadxml(path);
			String s = qb.doc2String(document);
//			System.out.println(s);
			response.setContentType("text/xml; charset=gb2312");
			PrintWriter out = response.getWriter();
			out.write(s);
		}
		

		
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
        
	}

}
