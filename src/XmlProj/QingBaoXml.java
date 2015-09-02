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
	 * ��������xml
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
	 * ��doc������д�뵽qbPath��
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
	 * ���path�ļ�
	 */
	public static void clearXml(String path)
	{
		doc = loadxml(path);
		doc.clearContent();
		writeXml(doc,path);
		System.out.println("�ɹ������ "+path);
	}
	
	/**
	 * ��ʼ��qingbao.xml
	 */
	public void initXml(String qbPath){
		doc = loadxml(qbPath);
		clearXml(qbPath);	
		
		Element rootElement = doc.addElement("root");
		Element famcEle = rootElement.addElement("��������");
		famcEle.addAttribute("����", "").setText("");
		Element yhxxEle = rootElement.addElement("�û���Ϣ");
		yhxxEle.addAttribute("����", "").setText("");
		Element jqEle = rootElement.addElement("����");
		jqEle.addAttribute("�붨����", "").setText("");
		leidaEle = rootElement.addElement("�״�");
		leidaEle.setText("");
		esmEle = rootElement.addElement("esm");
		esmEle.setText("");
		writeXml(doc,qbPath);	
		System.out.println(qbPath +" init successfully~");
	}

	
	/**
	 * �޸�qingbao.xml
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
	 * �ж�վ���Ƿ���ڣ������ڣ�����true,�����ڣ�����false
	 */
	private static boolean isZhanHaoExist(String type,HashMap<String,String> map){
		String zhanhao = map.get("վ��");
		if(type.equals("radar")){
			List list = doc.selectNodes("root/�״�/ģ����");
			Iterator iter = list.iterator();
			while(iter.hasNext()){
				Element eEle = (Element)iter.next();
				if(eEle.attribute("վ��").getValue().equals(zhanhao)){
					System.out.println("վ��"+zhanhao+"�Ѵ���");
					return true;
				}
			}
		}
		if(type.equals("esm")){
			List list = doc.selectNodes("root/esm/ģ����");
			Iterator iter = list.iterator();
			while(iter.hasNext()){
				Element eEle = (Element)iter.next();
				if(eEle.attribute("վ��").getValue().equals(zhanhao)){
					System.out.println("վ��"+zhanhao+"�Ѵ���");
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
				System.out.println("��ӽڵ�ʧ��");
				return ;
			}
				
			leidaEle = doc.getRootElement().element("�״�");
			Element mnqEle = leidaEle.addElement("ģ����");
			mnqEle.addAttribute("վ��", map.get("վ��"));
			Element weizhiEle = mnqEle.addElement("λ��");
			weizhiEle.addAttribute("����", map.get("����"));
			weizhiEle.addAttribute("γ��", map.get("γ��"));
			weizhiEle.addAttribute("�߶�", map.get("�߶�"));
			weizhiEle.setText("");
			Element qbgsEle = mnqEle.addElement("�鱨��ʽ");
			qbgsEle.addAttribute("��ʽ", map.get("��ʽ"));
			qbgsEle.setText("");
			Element csxyEle = mnqEle.addElement("����Э��");
			csxyEle.addAttribute("Э��", map.get("Э��"));		
			csxyEle.setText("");
			Element mbIPEle = mnqEle.addElement("Ŀ��IP");
			mbIPEle.addAttribute("��ַ", map.get("��ַ"));		
			mbIPEle.setText("");
			writeXml(doc,qbPath);
		}
		if(type.equals("esm")){
			boolean flag = isZhanHaoExist("esm",map);
			if(flag){
				System.out.println("��ӽڵ�ʧ��");
				return ;
			}
			esmEle = doc.getRootElement().element("esm");
			Element mnqEle = esmEle.addElement("ģ����");
			mnqEle.addAttribute("վ��", map.get("վ��"));
			Element weizhiEle = mnqEle.addElement("λ��");
			weizhiEle.addAttribute("����", map.get("����"));
			weizhiEle.addAttribute("γ��", map.get("γ��"));
			weizhiEle.addAttribute("�߶�", map.get("�߶�"));
			weizhiEle.setText("");
			Element qbgsEle = mnqEle.addElement("�鱨��ʽ");
			qbgsEle.addAttribute("��ʽ", map.get("��ʽ"));
			qbgsEle.setText("");
			Element csxyEle = mnqEle.addElement("����Э��");
			csxyEle.addAttribute("Э��", map.get("Э��"));		
			csxyEle.setText("");
			Element mbIPEle = mnqEle.addElement("Ŀ��IP");
			mbIPEle.addAttribute("��ַ", map.get("��ַ"));		
			mbIPEle.setText("");
			writeXml(doc,qbPath);
		}
		System.out.println("�ɹ����" + type +" ģ����");
	}
	private static void delNode(String qbPath,String type,HashMap<String,String> map){
		leidaEle = doc.getRootElement().element("�״�");
		esmEle = doc.getRootElement().element("esm");
		String zhanhao = map.get("վ��");
		if(type.equals("radar")){		
			boolean flag = isZhanHaoExist(type,map);
			if(!flag){
				System.out.println("ɾ���ڵ�ʧ��");
				return ;
			}
			List list = doc.selectNodes("root/�״�/ģ����");
			Iterator iter = list.iterator();
			while(iter.hasNext()){
				Element delEle = (Element)iter.next();
				if(delEle.attribute("վ��").getValue().equals(zhanhao)){
					leidaEle.remove(delEle);
				}
			}									
		}
		if(type.equals("esm")){
			boolean flag = isZhanHaoExist(type,map);
			if(!flag){
				System.out.println("ɾ���ڵ�ʧ��");
				return ;
			}
			List list = doc.selectNodes("root/esm/ģ����");
			Iterator iter = list.iterator();
			while(iter.hasNext()){
				Element delEle = (Element)iter.next();
				if(delEle.attribute("վ��").getValue().equals(zhanhao)){
					esmEle.remove(delEle);
				}
			}	
		}
		writeXml(doc,qbPath);
		System.out.println("�ɹ�ɾ��" + type +" վ��Ϊ "+zhanhao+" ��ģ����");
	}
	@SuppressWarnings("deprecation")
	private static void modNode(String qbPath,String type,HashMap<String,String> map){
		leidaEle = doc.getRootElement().element("�״�");
		esmEle = doc.getRootElement().element("esm");
		String zhanhao = map.get("վ��");
		if(type.equals("radar")){
			boolean flag = isZhanHaoExist(type,map);
			if(!flag){
				System.out.println("�޸Ľڵ�ʧ��");
				return ;
			}
			List list = doc.selectNodes("root/�״�/ģ����");
			Iterator iter = list.iterator();
			while(iter.hasNext()){
				Element modEle = (Element)iter.next();
				if(modEle.attribute("վ��").getValue().equals(zhanhao)){
					modEle.element("λ��").setAttributeValue("����", map.get("����"));
					modEle.element("λ��").setAttributeValue("γ��", map.get("γ��"));
					modEle.element("λ��").setAttributeValue("�߶�", map.get("�߶�"));
					modEle.element("�鱨��ʽ").setAttributeValue("��ʽ", map.get("��ʽ"));
					modEle.element("����Э��").setAttributeValue("Э��", map.get("Э��"));
					modEle.element("Ŀ��IP").setAttributeValue("��ַ", map.get("��ַ"));
				}
			}			
			writeXml(doc,qbPath);
		}
		if(type.equals("esm")){
			boolean flag = isZhanHaoExist("esm",map);
			if(!flag){
				System.out.println("�޸Ľڵ�ʧ��");
				return ;
			}
			List list = doc.selectNodes("root/esm/ģ����");
			Iterator iter = list.iterator();
			while(iter.hasNext()){
				Element modEle = (Element)iter.next();
				if(modEle.attribute("վ��").getValue().equals(zhanhao)){
					modEle.element("λ��").setAttributeValue("����", map.get("����"));
					modEle.element("λ��").setAttributeValue("γ��", map.get("γ��"));
					modEle.element("λ��").setAttributeValue("�߶�", map.get("�߶�"));
					modEle.element("�鱨��ʽ").setAttributeValue("��ʽ", map.get("��ʽ"));
					modEle.element("����Э��").setAttributeValue("Э��", map.get("Э��"));
					modEle.element("Ŀ��IP").setAttributeValue("��ַ", map.get("��ַ"));
				}
			}			
			writeXml(doc,qbPath);
		}
		System.out.println("�ɹ��޸�" + type +" վ��Ϊ "+zhanhao+" ��ģ����");
	}
	
	/**
	 * ��xml�ļ����Ϊ�����ļ�
	 */
	public static boolean doc2XmlFile(Document document,String filename){	
		File newFile = new File(filename);
		if(newFile.exists()){
			System.out.println("�ļ��Ѵ��ڣ����Ϊxml�ļ�ʧ��");
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
			System.out.println("�ɹ���xml�ļ��洢Ϊ��"+filename);			
		}catch(Exception e){
			flag = false;
			e.printStackTrace();
		}
		return flag;
	}
	
	/**
	 * ����xml�ļ��� �������ơ��û���Ϣ������ 
	 */
	@SuppressWarnings("deprecation")
	public static Document configXmlHead(ArrayList<String> a,String path){
		doc = loadxml(path);
		Element famcEle = doc.getRootElement().element("��������");
		famcEle.setAttributeValue("����", a.get(0));
		Element yhxxEle = doc.getRootElement().element("�û���Ϣ");
		yhxxEle.setAttributeValue("����", a.get(1));
		Element jqEle = doc.getRootElement().element("����");
		jqEle.setAttributeValue("�붨����", a.get(2));
		return doc;
//		writeXml(doc,path);
//		System.out.println("�ɹ�����  "+path+" xml�ļ���ͷ����Ϣ");
	}
	
	/**
	 * ��xml�ļ������� ת��ΪString
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
	 * ����鱨�ļ������鱨�ļ�ת��socket�ַ������ڷ���
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
		String qbPath =".\\WebRoot\\qbfzXml\\�·���.xml";
		qb.initXml(qbPath);
//		String s = qb.getQingBaoFile(".\\WebRoot\\qbfzXml\\fangan1.xml");
//		System.out.println("�鱨�ļ�fangan1.xml  ���ַ���Ϊ��\n"+s);
		
//		String type = "esm";
//		HashMap<String,String> map = new HashMap<String,String>();
//		map.put("վ��", "001");
//		map.put("����", "111");
//		map.put("γ��", "222");
//		map.put("�߶�", "hsh");
//		map.put("��ʽ", "444");
//		map.put("Э��", "sss");
//		map.put("��ַ", "192.168.1.2");
//		QingBaoXml.modifyXml(qbPath,type, "add",map);
		
		//���Ϊxml�ļ�
//		ArrayList<String> al = new ArrayList<String>();
//		String[] s = {"����һ","�û�1","default.xml"};
//		for(int i=0;i<s.length;i++){
//			al.add(s[i]);
//		}
//		qb.configXmlHead(al, qbPath);
//		Document doc = qb.loadxml(qbPath);
//		qb.doc2XmlFile(doc,".\\WebRoot\\xml\\test4.xml");
	}
	
	
	
	
	
	
	
}
