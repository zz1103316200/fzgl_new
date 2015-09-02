package XmlProj;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;

public class TestXmlParser {
	private static Document doc ;
	
	/**
	 * ��������test.xml
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
	 * ��doc������д�뵽Path��
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
	 * ���һ��TEST�ڵ�
	 */
	public static void addTest(String Path,HashMap<String,String> map){
		doc = loadxml(Path);
		Element rootElement = doc.getRootElement();
		Element TestEle = rootElement.addElement("TEST");
		Element sydhEle = TestEle.addElement("�������");		
		sydhEle.setText(map.get("�������"));
		Element ipEle = TestEle.addElement("����IP");
		ipEle.setText(map.get("����IP"));
		Element pzwjEle = TestEle.addElement("�����ļ�");
		pzwjEle.setText(map.get("�����ļ�"));
		Element yxEle = TestEle.addElement("����");
		yxEle.setText(map.get("����"));
		Element ztEle = TestEle.addElement("״̬");
		ztEle.setText(map.get("״̬"));
				
		writeXml(doc,Path);	
		System.out.println("�ɹ������һ��TEST�ڵ㣡");
	}
	
	/**
	 * �ж���������Ƿ����
	 * @param id
	 * @return
	 */
	private static boolean isIdExist(String Path,String id){
		doc = loadxml(Path);
		List list = doc.selectNodes("root/TEST/�������");
		Iterator iter = list.iterator();
		while(iter.hasNext()){
			Element eEle = (Element)iter.next();
			if(eEle.getText().equals(id)){
				System.out.println("�������"+id+"�Ѵ���");		
				return true;
			}
		}		
		return false;
	}
	
	/**
	 * �޸�test.xml
	 */
	public static void updateTestStatusByTestId(String Path,String id,String status){
		doc = loadxml(Path);
		if(isIdExist(Path,id)){
			Element rootElement = doc.getRootElement();
			List list = doc.selectNodes("root/TEST");
			Iterator iter = list.iterator();
			while(iter.hasNext()){
				Element TestEle = (Element)iter.next();
				if(TestEle.element("�������").getText().equals(id)){
					Element statusEle = TestEle.element("״̬");
					System.out.println(statusEle.getText());
					statusEle.setText("");
					statusEle.setText(status);
					writeXml(doc,Path);	
					System.out.println("�ɹ��޸��������Ϊ"+id+"��״̬��");
				}
			}		
		}
		else{
			System.out.println("������Ų����ڣ��޸�״̬ʧ�ܣ�");
		}		
	}
	
	/**
	 * ɾ��һ��TEST�ڵ�
	 */
	public static void deleteTest(String Path,String id){
		doc = loadxml(Path);
		if(isIdExist(Path,id)){
			Element rootElement = doc.getRootElement();
			List list = doc.selectNodes("root/TEST");
			Iterator iter = list.iterator();
			while(iter.hasNext()){
				Element TestEle = (Element)iter.next();
				if(TestEle.element("�������").getText().equals(id)){
					rootElement.remove(TestEle);
					writeXml(doc,Path);	
					System.out.println("�ɹ�ɾ���������Ϊ"+id+"��Test�ڵ㣡");					
				}
			}					
		}
		else{
			System.out.println("������Ų����ڣ�ɾ���ڵ�ʧ�ܣ�");
		}	
	}
	
	
	public static void main(String[] args) throws IOException{
		String path = ".\\WebRoot\\xml\\test.xml";
		
		HashMap<String,String> map = new HashMap<String,String>();
		map.put("�������", "198130614145721");
		map.put("����IP", "219.245.68.199");
		map.put("�����ļ�", "configure1.xml");
		map.put("����", "false");
		map.put("״̬", "000000000110");
		
		TestXmlParser.addTest(path, map);
		TestXmlParser.updateTestStatusByTestId(path, "198130614145721", "XXX");
		TestXmlParser.deleteTest(path, "198130614145721");		
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
}
