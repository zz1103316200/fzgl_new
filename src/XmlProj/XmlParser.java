package XmlProj;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentFactory;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;

/*
 * 用于系统试验支撑工具的xml工具类 
 */
public class XmlParser {
	
//	public String configPath;//配置文件的路径
//	public String statePath;//状态xml文件路径
//	public Document stateDoc;//保存状态xml的内存结构
//	public Document configDoc;//保存配置文件的内存结构
//	public FileOutputStream fileOut ;
	//构造函数
//	public XmlParser(String configPath,String statePath){
//		this.configPath = configPath;
//		this.statePath = statePath;
//	}
	/**
	 * 负责载入xml,返回被载入的xml文件的doc
	 * path是需要载入的xml存储路径
	 */
	public static Document loadxml(String path) 
	{
		FileInputStream fileIn = null;
		try {
			fileIn = new FileInputStream(path);
		} catch (FileNotFoundException e1) {
			// TODO Auto-generated catch block
			System.out.println("File not found!!!");
		}
		SAXReader sb = new SAXReader();
		Document doc = null;
		try {
			doc = sb.read(fileIn);
			System.out.println("file "+path+" load successfully~1111111111111");
		} catch (DocumentException e) {
			// TODO Auto-generated catch block
			System.out.println("DocumentException");
			e.printStackTrace();
		}
		
		return doc;
	}	
	
	/**
	 * 将传入的doc写入xmlPath文件
	 */
	public static void writeXml(Document doc,String xmlPath)
	{
		FileOutputStream fileOut = null;		
		try {
			fileOut = new FileOutputStream(xmlPath);
			OutputFormat format = OutputFormat.createPrettyPrint();
			format.setEncoding("GB2312");
			format.setIndent(true);
	        format.setIndent(" ");
			XMLWriter writer = new XMLWriter(fileOut,format);			
			writer.write(doc);	
			writer.close();
		}
		catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	

	/**
	 * 修改xml 如果seatid存在，就更新seatid所在节点，如果不存在，就创建一个新的节点
	 */
	public static void modifyXml(String[] recive,String statePath)
	{
		Document stateDoc = loadxml(statePath);
		ArrayList<String> seatidAL =new ArrayList<String>();
		List nodeList = stateDoc.selectNodes("/root/node");
		Iterator it = nodeList.iterator();
		while(it.hasNext()){
			Element nodeElement = (Element) it.next();
			String seatid = nodeElement.attributeValue("seatid");
			seatidAL.add(seatid);
		}
	

		if(recive[1].equals("2"))
		{
			int index=-1;
			for(int i=0;i<seatidAL.size();i++)
			{
				if(seatidAL.get(i).equals(recive[2]))
				{
					index=i;
				}
			}			
			if(index!=-1)
			{
				System.out.println("seatid 已存在 ,index = "+index);
				Element e=(Element)nodeList.get(index);			
				
				Element timeEle = e.element("报告时间");				
				System.out.println("timeEle.getText():"+timeEle.getText()+"  recive[3] = "+recive[3]);				
				//更改报告时间的格式				
				timeEle.setText(configTime(recive[3]));
				System.out.println("修改后 timeEle.getText():"+timeEle.getText());
				
				Element currentStatusEle = e.element("当前状态");				
				System.out.println("currentStatusEle.getText():"+currentStatusEle.getText()+"  recive[4] = "+recive[4]);
				//仿真控制命令类型
			  	//1:初试化；2:仿真开始；3:仿真结束；4:归档；
				//5：调速；6:暂停；7:恢复；8:回放；
				//10：部署；11：接入；12退出
				switch(Integer.parseInt(recive[4]))
				{
				case 1:
					currentStatusEle.setText("初试化");break;
				case 2:
					currentStatusEle.setText("仿真开始");break;
				case 3:
					currentStatusEle.setText("仿真结束");break;
				case 4:
					currentStatusEle.setText("归档");break;
				case 5:
					currentStatusEle.setText("调速");break;
				case 6:
					currentStatusEle.setText("暂停");break;
				case 7:
					currentStatusEle.setText("恢复");break;
				case 8:
					currentStatusEle.setText("回放");break;				
				case 10:
					currentStatusEle.setText("部署");break;
				case 11:
					currentStatusEle.setText("接入");break;
				case 12:
					currentStatusEle.setText("退出");break;
					
				}				
				System.out.println("修改后 currentStatusEle.getText():"+currentStatusEle.getText());				
				Element exeStatusEle = e.element("执行状态");				
				System.out.println("exeStatusEle.getText():"+exeStatusEle.getText()+"  recive[5] = "+recive[5]);
				if(recive[5].equals("1"))
				{
					exeStatusEle.setText("正常");
				}
				else
				{
					exeStatusEle.setText("异常");
				}				
				System.out.println("修改后 exeStatusEle.getText():"+exeStatusEle.getText());				
				
				writeXml(stateDoc,statePath);
			}
			else
			{
				//新建一个node节点
				Element nodeElement = stateDoc.getRootElement().addElement("node");
				nodeElement.addAttribute("seatid", recive[2]);
				nodeElement.addElement("报告时间").setText(configTime(recive[3]));
				
				switch(Integer.parseInt(recive[4]))
				{
				case 1:					
					nodeElement.addElement("当前状态").setText("初试化");break;
				case 2:
					nodeElement.addElement("当前状态").setText("仿真开始");break;
				case 3:
					nodeElement.addElement("当前状态").setText("仿真结束");break;
				case 4:
					nodeElement.addElement("当前状态").setText("归档");break;
				case 5:
					nodeElement.addElement("当前状态").setText("调速");break;
				case 6:
					nodeElement.addElement("当前状态").setText("暂停");break;
				case 7:
					nodeElement.addElement("当前状态").setText("恢复");break;
				case 8:
					nodeElement.addElement("当前状态").setText("回放");break;				
				case 10:
					nodeElement.addElement("当前状态").setText("部署");break;
				case 11:
					nodeElement.addElement("当前状态").setText("接入");break;
				case 12:
					nodeElement.addElement("当前状态").setText("退出");break;
				}
				if(recive[5].equals("1"))
				{
					nodeElement.addElement("执行状态").setText("正常");
				}
				else
				{
					nodeElement.addElement("执行状态").setText("异常");
				}
				
				writeXml(stateDoc,statePath);
				
			}
		}
		if(recive[1].equals("3"))
		{
//			this.fzmllx = fzmllx;
//	    	this.SeatID = SeatID;
//	    	this.Command = Command;<当前状态>未接入</当前状态>对应Command
//	    	this.Status = Status;<执行状态>正常</执行状态>对应Status
//	    	this.CommandTime = CommandTime;
			int index=-1;
			for(int i=0;i<seatidAL.size();i++)
			{
				if(seatidAL.get(i).equals(recive[2]))
				{
					index=i;
				}
			}
			
			if(index!=-1)
			{
				System.out.println("seatid 已存在 ,index = "+index);
				Element e=(Element)nodeList.get(index);			
				
				Element timeEle = e.element("报告时间");				
				System.out.println("timeEle.getText():"+timeEle.getText()+"  recive[5] = "+recive[5]);				
				timeEle.setText(configTime(recive[5]));
				System.out.println("修改后 timeEle.getText():"+timeEle.getText());
				
				Element currentStatusEle = e.element("当前状态");				
				System.out.println("currentStatusEle.getText():"+currentStatusEle.getText()+"  recive[3] = "+recive[3]);
				//模拟软件的运行状态，
				//仿真控制命令类型
			  	//1:初试化；2:仿真开始；3:仿真结束；4:归档；
				//5：调速；6:暂停；7:恢复；8:回放；
				//10：部署；11：接入；12退出
				switch(Integer.parseInt(recive[3]))
				{
				case 1:
					currentStatusEle.setText("初试化");break;
				case 2:
					currentStatusEle.setText("仿真开始");break;
				case 3:
					currentStatusEle.setText("仿真结束");break;
				case 4:
					currentStatusEle.setText("归档");break;
				case 5:
					currentStatusEle.setText("调速");break;
				case 6:
					currentStatusEle.setText("暂停");break;
				case 7:
					currentStatusEle.setText("恢复");break;
				case 8:
					currentStatusEle.setText("回放");break;				
				case 10:
					currentStatusEle.setText("部署");break;
				case 11:
					currentStatusEle.setText("接入");break;
				case 12:
					currentStatusEle.setText("退出");break;
					
				}
				
				currentStatusEle.setText(recive[3]);
				System.out.println("修改后 currentStatusEle.getText():"+currentStatusEle.getText());
				
				Element exeStatusEle = e.element("执行状态");	
				if(recive[4].equals("1"))
				{
					exeStatusEle.setText("正常");
				}
				else
				{
					exeStatusEle.setText("异常");
				}
				System.out.println("exeStatusEle.getText():"+exeStatusEle.getText()+"  recive[4] = "+recive[4]);				
				exeStatusEle.setText(recive[4]);
				System.out.println("修改后 exeStatusEle.getText():"+exeStatusEle.getText());				
				
				writeXml(stateDoc,statePath);
				
			}
			else
			{
				//新建一个node节点
				Element nodeElement = stateDoc.getRootElement().addElement("node");
				nodeElement.addAttribute("seatid", recive[2]);
				nodeElement.addElement("报告时间").setText(configTime(recive[5]));
				
				switch(Integer.parseInt(recive[3]))
				{
				case 1:					
					nodeElement.addElement("当前状态").setText("初试化");break;
				case 2:
					nodeElement.addElement("当前状态").setText("仿真开始");break;
				case 3:
					nodeElement.addElement("当前状态").setText("仿真结束");break;
				case 4:
					nodeElement.addElement("当前状态").setText("归档");break;
				case 5:
					nodeElement.addElement("当前状态").setText("调速");break;
				case 6:
					nodeElement.addElement("当前状态").setText("暂停");break;
				case 7:
					nodeElement.addElement("当前状态").setText("恢复");break;
				case 8:
					nodeElement.addElement("当前状态").setText("回放");break;				
				case 10:
					nodeElement.addElement("当前状态").setText("部署");break;
				case 11:
					nodeElement.addElement("当前状态").setText("接入");break;
				case 12:
					nodeElement.addElement("当前状态").setText("退出");break;
				}
				if(recive[4].equals("1"))
				{
					nodeElement.addElement("执行状态").setText("正常");
				}
				else
				{
					nodeElement.addElement("执行状态").setText("异常");
				}
					
				
				writeXml(stateDoc,statePath);
				
			}
			
		}
		System.out.println("成功修改了state.xml~");
	}
	
	/**
	 * 清空state.xml文件
	 */
	public static void clearXml(String statePath)
	{
		Document stateDoc = loadxml(statePath);
		stateDoc.clearContent();
		writeXml(stateDoc,statePath);
		System.out.println("成功清空了state.xml");
	}
	
	/**
	 * 按照config文件重置state.xml文件
	 */
	public static void initXml(String configPath,String statePath){
		Document configDoc = loadxml(configPath);
		List nodeList = configDoc.selectNodes("/试验配置/模型设备信息/模型设备");
		ArrayList<String> seatidAL = new ArrayList<String>();
		Iterator it = nodeList.iterator();
		while(it.hasNext()){
			Element nodeElement = (Element) it.next();
			String seatid = nodeElement.attributeValue("标识");
			seatidAL.add(seatid);
		}
//		clearXml(statePath);//清空state.xml文件
		Document stateDoc = DocumentFactory.getInstance().createDocument();
		//新建一个root节点
		Element rootElement = stateDoc.addElement("root");
		
		for(int i=0;i<seatidAL.size();i++){
			Element nodeElement = rootElement.addElement("node");
			nodeElement.addAttribute("seatid", seatidAL.get(i));
			nodeElement.addElement("报告时间").setText("");
			nodeElement.addElement("当前状态").setText("未接入");
			nodeElement.addElement("执行状态").setText("未知");	
		}			
		writeXml(stateDoc,statePath);	
		System.out.println("state.xml init successfully~");
	}
	
	/**
	 * 修改时间的格式
	 */
	private static String configTime(String timeString){
		String timeDate = timeString.substring(0, 8);
		String year = timeDate.substring(0, 4);
		String month = timeDate.substring(4, 6);
		String day = timeDate.substring(6, 8);
		String time = timeString.substring(8, 14);
		String hour = time.substring(0, 2);
		String min = time.substring(2, 4);
		String sec = time.substring(4, 6);
		System.out.println(year+" "+month+" "+day+" "+time+" "+hour+" "+min+" "+sec);
		String s = year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec;
		return s;
	}
	
	
	
//	public static void main(String[] args){
//		XmlParser.initXml("G://configure1.xml","G://state.xml");
//		String[] receive = {"","2","9999991589001111","8989898915891155","1","1"};
//		XmlParser.modifyXml(receive,"G://state.xml");
//		
//	}
}



