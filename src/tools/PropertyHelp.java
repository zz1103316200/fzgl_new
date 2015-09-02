package tools;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;



public class PropertyHelp {
	public static String taishiIp;
	public static String daodiaoIp;
	public static String caijiIp;
	public static String xiangdingIp;
	public static String peizhiIp;
	public static String vcPath;
	public static String codeblockPath;
	public static String QTPath;
	public static String EAPath;
	public static String rosePath;
	static{
		//String path = 	
		InputStream in=PropertyHelp.class.getResourceAsStream("/ipconf.properties");
		Properties pro=new Properties();
		try {
			pro.load(in);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		taishiIp=pro.getProperty("taishiIp").trim();
		daodiaoIp=pro.getProperty("daodiaoIp").trim();
		caijiIp=pro.getProperty("caijiIp").trim();
		xiangdingIp=pro.getProperty("xiangdingIp").trim();
		peizhiIp=pro.getProperty("peizhiIp").trim();
		vcPath=pro.getProperty("vcPath").trim();
		codeblockPath=pro.getProperty("codeblockPath").trim();
		QTPath=pro.getProperty("QTPath").trim();
		EAPath=pro.getProperty("EAPath").trim();
		rosePath=pro.getProperty("rosePath").trim();
	}
}
