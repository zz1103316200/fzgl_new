package cetc;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class openEclipseServlet extends HttpServlet {

	//static String path;
	/**
	 * Constructor of the object.
	 */
	public openEclipseServlet() {
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

		path = (String)getServletConfig().getInitParameter("eclipsePath");

		System.out.println("path:"+path);
		PrintWriter out = response.getWriter();
		Runtime rt = Runtime.getRuntime();
		Process p =null;
		//String path = "D:\\Program Files\\eclipse\\eclipse.exe";
		try
		{
			p=rt.exec(path);
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
		//path = (String)getServletConfig().getInitParameter("path");
		//System.out.println(path);
	}
	
	public static void main(String[] args) {
		Runtime rt = Runtime.getRuntime();
		Process p =null;
		System.out.println("sssssss");
		String path = "D:\\Program Files\\eclipse\\eclipse.exe";
		try
		{
			System.out.println("helllllll");
			p=rt.exec(path);
		}catch(Exception e){
			System.out.println("Error exec bf300.exe");
		}
	}

}
