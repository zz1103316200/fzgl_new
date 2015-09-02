package oracle;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.UnknownHostException;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.util.ArrayList;

public class UseUserTable {
	private DBConnectionManager connMgr;
	private Connection con;

	/*
	 * ¹¹Ôìº¯Êý
	 */
	public UseUserTable() {
		connMgr = DBConnectionManager.getInstance();
		con = connMgr.getConnection();
		if (con == null) {
			System.out.println("Can't get connection");
			return;
		}
	}
	public static String read()
	{   
		String result = new String();
		UseUserTable u=new UseUserTable();
		try {
			Statement stmt = u.con.createStatement();
			ResultSet rs = stmt.executeQuery("select PZWJMC from TAB_PZWJ_INFO");
			while(rs.next())
			{
//				System.out.println(rs.getString(1));
//				Blob blob=rs.getBlob(8);
//				InputStream ins=blob.getBinaryStream();
//				
//				File file=new File("c:\\output.xml");
//				OutputStream opt=null;
//				try {
//					opt=new FileOutputStream(file);
//				} catch (FileNotFoundException e1) {
//					// TODO Auto-generated catch block
//					e1.printStackTrace();
//				}
//				byte[] b=new byte[1024];
//				int len=0;
//				try {
//					while((len=ins.read(b))!=-1)
//					{
//						opt.write(b, 0, len);
//						String s=b.toString();
//						System.out.println(s);
//					}
//				} catch (IOException e) {
//					// TODO Auto-generated catch block
//					e.printStackTrace();
//				}
//				System.out.println();
				
				//result = rs.getString(1)+","+result;
				
				result += rs.getString(1)+",";
				//System.out.println(rs.getString(1));
//				System.out.println(rs.getNString(8));
				
			}
//			System.out.println(result);
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("result::"+result);
		return result;
		
		
	}
	
	
	public static void getConfigXml(String PZWJ,String path)
	{   
		
		UseUserTable u=new UseUserTable();
		try {
			Statement stmt = u.con.createStatement();
			ResultSet rs = stmt.executeQuery("select WJNR from TAB_PZWJ_INFO where PZWJMC ='"+PZWJ+"'");
			
			while(rs.next())
			{
//				System.out.println(rs.getString(1));
				Blob blob=rs.getBlob(1);
				System.out.println(blob.toString());
				System.out.println("sss");
				InputStream ins=blob.getBinaryStream();
				System.out.println("ins--"+ins);
				File file=new File(path);
				OutputStream opt=null;
				try {
					opt=new FileOutputStream(file);
				} catch (FileNotFoundException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				byte[] b=new byte[1024];
				int len=0;
				try {
					while((len=ins.read(b))!=-1)
					{
						opt.write(b, 0, len);
						String s=b.toString();
//						System.out.println(s);
					}
					opt.close();
					
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
//				System.out.println();
				
			
				
				
				
//				System.out.println(rs.getNString(8));
				
			}
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		
		
	}

	
	
	
	
	public static void main(String args[]){
		getConfigXml("configure3.xml","C:\\test.txt");
		//read();
	}


}


