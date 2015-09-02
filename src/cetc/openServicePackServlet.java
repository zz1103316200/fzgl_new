package cetc;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class openServicePackServlet extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public openServicePackServlet() {
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

		response.setContentType("application/json;charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		String type = request.getParameter("type");
		
		String path = "";

		path = (String)getServletConfig().getInitParameter("servicePackPath");
		
		System.out.println("path:"+path);
		PrintWriter out = response.getWriter();
		Runtime rt = Runtime.getRuntime();
		Process p =null;
		//path="C:\\Users\\hp\\Desktop\\ServicePackage\\ServicePackage_fat.jar";
		//String path = "D:\\Program Files\\eclipse\\eclipse.exe";
		try
		{
			//System.out.println("heelll");
			p=rt.exec("java -jar -Xmn32m -Xms128m -Xmx256m "+path);
			System.out.println("heelll---");
			//p=rt.exec("cmd.exe /c start /min C:\\Users\\hp\\Desktop\\runService.bat");
			System.out.println("heelll");
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
	
	public static void main(String[] args) {
		Runtime rt = Runtime.getRuntime();
		Process p =null;
		//String path = "D:\\Program Files\\eclipse\\eclipse.exe";
		try
		{
			//p=rt.exec("mstsc");
			//p=rt.exec("java -jar C:\\Users\\hp\\Desktop\\ServicePackaging\\CS\\ServicePackage.jar");
			//p=rt.exec("cmd /c start D:\\runServlet.bat");
			//p=rt.exec("java -jar -Xmn32m -Xms128m -Xmx256m D:\\myeclipsePro\\highService\\Surface.jar");
		}catch(Exception e){
			System.out.println("Error exec bf300.exe");
		}
		//executeVMScript("java -jar C:\\Users\\hp\\Desktop\\ServicePackaging\\CS\\ServicePackage.jar");
	}
	
	public static void executeVMScript(String strCmdPath){ 
		Process process = null;
		try {
			process = Runtime.getRuntime().exec(strCmdPath);			
			BufferedReader strCon = new BufferedReader(new InputStreamReader(process.getInputStream()));
	        String line;
	        while ((line = strCon.readLine()) != null) {
	            System.out.println(line);
	            }
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
	}
}
