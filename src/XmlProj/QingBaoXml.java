package XmlProj;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;

public class QingBaoXml {

	private static Document doc ;
	private static Element leidaEle;
	private	static Element esmEle;
	
	/**
	 * 负责载入xml
	 */
	public static Document loadxml(String xmlPath) 
	{
		FileInputStream fileIn = null;
		try {
			fileIn = new FileInputStream(xmlPath);
		} catch (FileNotFoundException e1) {
			// TODO Auto-generated catch block
			System.out.println(xmlPath+" File not found!!!");
		}
		SAXReader sb = new SAXReader();
		Document doc = null;
		try {
			doc = sb.read(fileIn);
			System.out.println("file "+xmlPath+" load successfully~");
		} catch (DocumentException e) {
			// TODO Auto-generated catch block
			System.out.println("DocumentException");
			e.printStackTrace();
		}		
		return doc;
	}	
	
	/**
	 * 将doc的内容写入到qbPath里
	 */
	public static void writeXml(Document doc,String qbPath)
	{	
		FileOutputStream fileOut = null;
		try {
			fileOut = new FileOutputStream(qbPath);
			OutputFormat format = OutputFormat.createPrettyPrint();
			format.setEncoding("GB2312");
			format.setIndent(true);
	        format.setIndent(" ");
			XMLWriter writer = new XMLWriter(fileOut,format);			
			writer.write(doc);	
			writer.flush();
			writer.close();
		}
		catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	/**
	 * 清空path文件
	 */
	public static void clearXml(String path)
	{
		doc = loadxml(path);
		doc.clearContent();
		writeXml(doc,path);
		System.out.println("成功清空了 "+path);
	}
	
	/**
	 * 初始化qingbao.xml
	 */
	public void initXml(String qbPath){
		doc = loadxml(qbPath);
		clearXml(qbPath);	
		
		Element rootElement = doc.addElement("root");
		Element famcEle = rootElement.addElement("方案名称");
		famcEle.addAttribute("方案", "").setText("");
		Element yhxxEle = rootElement.addElement("用户信息");
		yhxxEle.addAttribute("名称", "").setText("");
		Element jqEle = rootElement.addElement("剧情");
		jqEle.addAttribute("想定名称", "").setText("");
		leidaEle = rootElement.addElement("雷达");
		leidaEle.setText("");
		esmEle = rootElement.addElement("esm");
		esmEle.setText("");
		writeXml(doc,qbPath);	
		System.out.println(qbPath +" init successfully~");
	}

	
	/**
	 * 修改qingbao.xml
	 */
	public static void modifyXml(String qbPath,String type,String ope,HashMap<String,String> map){
		doc = loadxml(qbPath);
		if(type.equals("radar")){			
			if(ope.equals("add")){
				System.out.println("radar+add");
				addNode(qbPath,type,map);
			}else if(ope.equals("del")){
				delNode(qbPath,type,map);
			}else if(ope.equals("mod")){
				modNode(qbPath,type,map);
			}
		}
		else if(type.equals("esm")){
			if(ope.equals("add")){
				addNode(qbPath,type,map);
			}else if(ope.equals("del")){
				delNode(qbPath,type,map);
			}else if(ope.equals("mod")){
				modNode(qbPath,type,map);
			}
		}
	}

	/**
	 * 判断站号是否存在，若存在，返回true,不存在，返回false
	 */
	private static boolean isZhanHaoExist(String type,HashMap<String,String> map){
		String zhanhao = map.get("站号");
		if(type.equals("radar")){
			List list = doc.selectNodes("root/雷达/模拟器");
			Iterator iter = list.iterator();
			while(iter.hasNext()){
				Element eEle = (Element)iter.next();
				if(eEle.attribute("站号").getValue().equals(zhanhao)){
					System.out.println("站号"+zhanhao+"已存在");
					return true;
				}
			}
		}
		if(type.equals("esm")){
			List list = doc.selectNodes("root/esm/模拟器");
			Iterator iter = list.iterator();
			while(iter.hasNext()){
				Element eEle = (Element)iter.next();
				if(eEle.attribute("站号").getValue().equals(zhanhao)){
					System.out.println("站号"+zhanhao+"已存在");
					return true;
				}
			}
		}
		return false;
	}
	
	private static void addNode(String qbPath,String type,HashMap<String,String> map){						
		if(type.equals("radar")){		
			boolean flag = isZhanHaoExist(type,map);
			if(flag){
				System.out.println("添加节点失败");
				return ;
			}
				
			leidaEle = doc.getRootElement().element("雷达");
			Element mnqEle = leidaEle.addElement("模拟器");
			mnqEle.addAttribute("站号", map.get("站号"));
			Element weizhiEle = mnqEle.addElement("位置");
			weizhiEle.addAttribute("经度", map.get("经度"));
			weizhiEle.addAttribute("纬度", map.get("纬度"));
			weizhiEle.addAttribute("高度", map.get("高度"));
			weizhiEle.setText("");
			Element qbgsEle = mnqEle.addElement("情报格式");
			qbgsEle.addAttribute("格式", map.get("格式"));
			qbgsEle.setText("");
			Element csxyEle = mnqEle.addElement("传输协议");
			csxyEle.addAttribute("协议", map.get("协议"));		
			csxyEle.setText("");
			Element mbIPEle = mnqEle.addElement("目的IP");
			mbIPEle.addAttribute("地址", map.get("地址"));		
			mbIPEle.setText("");
			writeXml(doc,qbPath);
		}
		if(type.equals("esm")){
			boolean flag = isZhanHaoExist("esm",map);
			if(flag){
				System.out.println("添加节点失败");
				return ;
			}
			esmEle = doc.getRootElement().element("esm");
			Element mnqEle = esmEle.addElement("模拟器");
			mnqEle.addAttribute("站号", map.get("站号"));
			Element weizhiEle = mnqEle.addElement("位置");
			weizhiEle.addAttribute("经度", map.get("经度"));
			weizhiEle.addAttribute("纬度", map.get("纬度"));
			weizhiEle.addAttribute("高度", map.get("高度"));
			weizhiEle.setText("");
			Element qbgsEle = mnqEle.addElement("情报格式");
			qbgsEle.addAttribute("格式", map.get("格式"));
			qbgsEle.setText("");
			Element csxyEle = mnqEle.addElement("传输协议");
			csxyEle.addAttribute("协议", map.get("协议"));		
			csxyEle.setText("");
			Element mbIPEle = mnqEle.addElement("目的IP");
			mbIPEle.addAttribute("地址", map.get("地址"));		
			mbIPEle.setText("");
			writeXml(doc,qbPath);
		}
		System.out.println("成功添加" + type +" 模拟器");
	}
	private static void delNode(String qbPath,String type,HashMap<String,String> map){
		leidaEle = doc.getRootElement().element("雷达");
		esmEle = doc.getRootElement().element("esm");
		String zhanhao = map.get("站号");
		if(type.equals("radar")){		
			boolean flag = isZhanHaoExist(type,map);
			if(!flag){
				System.out.println("删除节点失败");
				return ;
			}
			List list = doc.selectNodes("root/雷达/模拟器");
			Iterator iter = list.iterator();
			while(iter.hasNext()){
				Element delEle = (Element)iter.next();
				if(delEle.attribute("站号").getValue().equals(zhanhao)){
					leidaEle.remove(delEle);
				}
			}									
		}
		if(type.equals("esm")){
			boolean flag = isZhanHaoExist(type,map);
			if(!flag){
				System.out.println("删除节点失败");
				return ;
			}
			List list = doc.selectNodes("root/esm/模拟器");
			Iterator iter = list.iterator();
			while(iter.hasNext()){
				Element delEle = (Element)iter.next();
				if(delEle.attribute("站号").getValue().equals(zhanhao)){
					esmEle.remove(delEle);
				}
			}	
		}
		writeXml(doc,qbPath);
		System.out.println("成功删除" + type +" 站号为 "+zhanhao+" 的模拟器");
	}
	@SuppressWarnings("deprecation")
	private static void modNode(String qbPath,String type,HashMap<String,String> map){
		leidaEle = doc.getRootElement().element("雷达");
		esmEle = doc.getRootElement().element("esm");
		String zhanhao = map.get("站号");
		if(type.equals("radar")){
			boolean flag = isZhanHaoExist(type,map);
			if(!flag){
				System.out.println("修改节点失败");
				return ;
			}
			List list = doc.selectNodes("root/雷达/模拟器");
			Iterator iter = list.iterator();
			while(iter.hasNext()){
				Element modEle = (Element)iter.next();
				if(modEle.attribute("站号").getValue().equals(zhanhao)){
					modEle.element("位置").setAttributeValue("经度", map.get("经度"));
					modEle.element("位置").setAttributeValue("纬度", map.get("纬度"));
					modEle.element("位置").setAttributeValue("高度", map.get("高度"));
					modEle.element("情报格式").setAttributeValue("格式", map.get("格式"));
					modEle.element("传输协议").setAttributeValue("协议", map.get("协议"));
					modEle.element("目的IP").setAttributeValue("地址", map.get("地址"));
				}
			}			
			writeXml(doc,qbPath);
		}
		if(type.equals("esm")){
			boolean flag = isZhanHaoExist("esm",map);
			if(!flag){
				System.out.println("修改节点失败");
				return ;
			}
			List list = doc.selectNodes("root/esm/模拟器");
			Iterator iter = list.iterator();
			while(iter.hasNext()){
				Element modEle = (Element)iter.next();
				if(modEle.attribute("站号").getValue().equals(zhanhao)){
					modEle.element("位置").setAttributeValue("经度", map.get("经度"));
					modEle.element("位置").setAttributeValue("纬度", map.get("纬度"));
					modEle.element("位置").setAttributeValue("高度", map.get("高度"));
					modEle.element("情报格式").setAttributeValue("格式", map.get("格式"));
					modEle.element("传输协议").setAttributeValue("协议", map.get("协议"));
					modEle.element("目的IP").setAttributeValue("地址", map.get("地址"));
				}
			}			
			writeXml(doc,qbPath);
		}
		System.out.println("成功修改" + type +" 站号为 "+zhanhao+" 的模拟器");
	}
	
	/**
	 * 将xml文件另存为本地文件
	 */
	public static boolean doc2XmlFile(Document document,String filename){	
		File newFile = new File(filename);
		if(newFile.exists()){
			System.out.println("文件已存在，另存为xml文件失败");
			return false ;
		}
		boolean flag = true;
		try{
			OutputFormat format = OutputFormat.createPrettyPrint();
			format.setEncoding("GB2312");
			FileWriter fileOut = new FileWriter(new File(filename));
			XMLWriter writer = new XMLWriter(fileOut,format);
			writer.write(document);
			writer.close();
			System.out.println("成功将xml文件存储为："+filename);			
		}catch(Exception e){
			flag = false;
			e.printStackTrace();
		}
		return flag;
	}
	
	/**
	 * 配置xml文件的 方案名称、用户信息、剧情 
	 */
	@SuppressWarnings("deprecation")
	public static Document configXmlHead(ArrayList<String> a,String path){
		doc = loadxml(path);
		Element famcEle = doc.getRootElement().element("方案名称");
		famcEle.setAttributeValue("方案", a.get(0));
		Element yhxxEle = doc.getRootElement().element("用户信息");
		yhxxEle.setAttributeValue("名称", a.get(1));
		Element jqEle = doc.getRootElement().element("剧情");
		jqEle.setAttributeValue("想定名称", a.get(2));
		return doc;
//		writeXml(doc,path);
//		System.out.println("成功配置  "+path+" xml文件的头部信息");
	}
	
	/**
	 * 将xml文件的内容 转化为String
	 */
	public static String doc2String(Document document){
		String s="";
		try{
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			OutputFormat format = new OutputFormat(" ",true,"GB2312");
			XMLWriter writer = new XMLWriter(out,format);
			writer.write(document);
			s=out.toString("GB2312");
		}catch(Exception ex){
			ex.printStackTrace();
		}
		return s;
	}
	
	/**
	 * 获得情报文件，把情报文件转成socket字符串用于发送
	 */
	public static void sendQingBaoFile(String path,String host,int port){
		Document document = loadxml(path);
		String s = doc2String(document);
		byte[] sendBuf;
        sendBuf = s.getBytes();
        InetAddress addr;
        try {
			DatagramSocket client = new DatagramSocket();
			addr = InetAddress.getByName(host);
			DatagramPacket sendPacket = new DatagramPacket(sendBuf ,sendBuf.length , addr , port);
			client.send(sendPacket);
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
	
	
	public static void main(String[] args){
		QingBaoXml qb = new QingBaoXml();		
		String qbPath =".\\WebRoot\\qbfzXml\\新方案.xml";
		qb.initXml(qbPath);
//		String s = qb.getQingBaoFile(".\\WebRoot\\qbfzXml\\fangan1.xml");
//		System.out.println("情报文件fangan1.xml  的字符串为：\n"+s);
		
//		String type = "esm";
//		HashMap<String,String> map = new HashMap<String,String>();
//		map.put("站号", "001");
//		map.put("经度", "111");
//		map.put("纬度", "222");
//		map.put("高度", "hsh");
//		map.put("格式", "444");
//		map.put("协议", "sss");
//		map.put("地址", "192.168.1.2");
//		QingBaoXml.modifyXml(qbPath,type, "add",map);
		
		//另存为xml文件
//		ArrayList<String> al = new ArrayList<String>();
//		String[] s = {"方案一","用户1","default.xml"};
//		for(int i=0;i<s.length;i++){
//			al.add(s[i]);
//		}
//		qb.configXmlHead(al, qbPath);
//		Document doc = qb.loadxml(qbPath);
//		qb.doc2XmlFile(doc,".\\WebRoot\\xml\\test4.xml");
	}
	
	
	
	
	
	
	
}
