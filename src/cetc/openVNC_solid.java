package cetc;

import java.io.File;
import java.io.IOException;
import java.io.PrintStream;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class openVNC_solid extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public openVNC_solid() {
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

		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		String name=request.getParameter("name");
		String ip ="";
		if(name.equals("态势显示")){
			ip = tools.PropertyHelp.taishiIp;
		}else if(name.equals("试验配置")){
			ip = tools.PropertyHelp.peizhiIp;
		}else if(name.equals("试验导调")){
			ip = tools.PropertyHelp.daodiaoIp;
		}else if(name.equals("数据采集")){
			ip = tools.PropertyHelp.caijiIp;
		}else if(name.equals("想定逻辑")){
			ip = tools.PropertyHelp.xiangdingIp;
		}
		System.out.println("ip--:"+ip);
		//写入文件中
		File fl =new File("c:\\vncconfig\\"+name+".vnc");
		//FileOutputStream fos = new FileOutputStream(fl);
		PrintStream ps = new PrintStream(fl);
		String fileString = "[connection]\r\nhost="+ip+"\r\nport=5900\r\npassword=a7f8fc867315b7ff\r\n[options]\r\nuse_encoding_0=1\r\nuse_encoding_1=1\r\nuse_encoding_2=1\r\nuse_encoding_3=1\r\nuse_encoding_4=1\r\nuse_encoding_5=1\r\npreferred_encoding=5\r\nrestricted=0\r\nviewonly=1\r\nfullscreen=0\r\n8bit=0\r\nshared=0\r\nswapmouse=0\r\nbelldeiconify=0\r\nemulate3=1\r\nemulate3timeout=100\r\nemulate3fuzz=4\r\ndisableclipboard=0\r\nlocalcursor=1\r\nscale_num=3\r\nscale_den=4\r\n";
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
		out.flush();
		out.close();
	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
	}

}
