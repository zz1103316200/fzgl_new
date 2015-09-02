package cetc;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
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

public class qbkzServlet extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	ServletContext sc;
	public qbkzServlet() {
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

		doPost(request,response);
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
		System.out.println("qbkzservletdopost");
		String cmd=request.getParameter("cmd");
		String btn_left=request.getParameter("btn_left");
		if(btn_left!=null)
		{
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
//				System.out.println("hostname+port"+hostname+"  "+port);
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
		}
		if(cmd!=null)
		{
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
//				System.out.println("hostname+port"+hostname+"  "+port);
				InetAddress addr;
				addr = InetAddress.getByName(hostname);
				DatagramSocket client = new DatagramSocket();
				cmd="2"+cmd;
				DatagramPacket sendPacket = new DatagramPacket(cmd.getBytes() ,cmd.getBytes().length, addr ,Integer.parseInt(port));
				client.send(sendPacket);
				 //client接受从服务端的反馈信息
//		        byte[] recvBuf = new byte[100];
//		        DatagramPacket recvPacket = new DatagramPacket(recvBuf , recvBuf.length);
//		        client.receive(recvPacket);
//		        String recvStr = new String(recvPacket.getData() , 0 ,recvPacket.getLength());
//		        System.out.println("server echo:" + recvStr);
//		        response.setContentType("text/html");
//				PrintWriter out = response.getWriter();
//				out.write(recvStr);

				client.close();
			} catch (SocketException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			} catch (UnknownHostException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}		
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
