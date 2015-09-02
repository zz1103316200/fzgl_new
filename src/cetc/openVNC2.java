package cetc;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.net.UnknownHostException;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class openVNC2 extends HttpServlet {
	ServletContext sc;//用来获得工程在服务器中的路径
	/**
	 * Constructor of the object.
	 */
	public openVNC2() {
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
		//PrintWriter out = response.getWriter();
		String btn_left=request.getParameter("btn_left");
		String name=request.getParameter("name");
		try {
			String filepath=sc.getRealPath("/")+"config\\ipportconf.txt";
			//从文件读取ip地址和端口号
			File file = new File(filepath);
			BufferedReader reader = null;
			reader = new BufferedReader(new FileReader(file));
			String tempString = reader.readLine();
			String[] t = tempString.split("#");
			String hostname = t[0];
			String port = t[1];
//			System.out.println("hostname+port"+hostname+"  "+port);
			InetAddress addr;
			addr = InetAddress.getByName(hostname);
			DatagramSocket client = new DatagramSocket();
			btn_left="3#"+btn_left;
			DatagramPacket sendPacket = new DatagramPacket(btn_left.getBytes() ,btn_left.getBytes().length, addr ,Integer.parseInt(port));
			client.send(sendPacket);
			 //client接受从服务端的反馈信息
			client.setSoTimeout(0);
	        byte[] recvBuf = new byte[100];
	        DatagramPacket recvPacket = new DatagramPacket(recvBuf , recvBuf.length);
	        client.receive(recvPacket);
	        String recvStr = new String(recvPacket.getData() , 0 ,recvPacket.getLength());
	        System.out.println("server echo:" + recvStr);
	        String str[]=recvStr.split("#");
	        
	        response.setContentType("text/html");
			PrintWriter out = response.getWriter();
			String ip = str[str.length-1];
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
			out.write(str[str.length-1]);

			client.close();
		}catch(java.net.SocketTimeoutException e)
		{
			System.out.println("超时");
			PrintWriter out = response.getWriter();
			out.write("false");
		} 
		catch (SocketException e1) {
			// TODO Auto-generated catch block
			
			e1.printStackTrace();
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 

		//out.flush();
		//out.close();
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
