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
	 * 负责载入test.xml
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
	 * 将doc的内容写入到Path里
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
	 * 添加一个TEST节点
	 */
	public static void addTest(String Path,HashMap<String,String> map){
		doc = loadxml(Path);
		Element rootElement = doc.getRootElement();
		Element TestEle = rootElement.addElement("TEST");
		Element sydhEle = TestEle.addElement("试验代号");		
		sydhEle.setText(map.get("试验代号"));
		Element ipEle = TestEle.addElement("创建IP");
		ipEle.setText(map.get("创建IP"));
		Element pzwjEle = TestEle.addElement("配置文件");
		pzwjEle.setText(map.get("配置文件"));
		Element yxEle = TestEle.addElement("运行");
		yxEle.setText(map.get("运行"));
		Element ztEle = TestEle.addElement("状态");
		ztEle.setText(map.get("状态"));
				
		writeXml(doc,Path);	
		System.out.println("成功添加了一个TEST节点！");
	}
	
	/**
	 * 判断试验代号是否存在
	 * @param id
	 * @return
	 */
	private static boolean isIdExist(String Path,String id){
		doc = loadxml(Path);
		List list = doc.selectNodes("root/TEST/试验代号");
		Iterator iter = list.iterator();
		while(iter.hasNext()){
			Element eEle = (Element)iter.next();
			if(eEle.getText().equals(id)){
				System.out.println("试验代号"+id+"已存在");		
				return true;
			}
		}		
		return false;
	}
	
	/**
	 * 修改test.xml
	 */
	public static void updateTestStatusByTestId(String Path,String id,String status){
		doc = loadxml(Path);
		if(isIdExist(Path,id)){
			Element rootElement = doc.getRootElement();
			List list = doc.selectNodes("root/TEST");
			Iterator iter = list.iterator();
			while(iter.hasNext()){
				Element TestEle = (Element)iter.next();
				if(TestEle.element("试验代号").getText().equals(id)){
					Element statusEle = TestEle.element("状态");
					System.out.println(statusEle.getText());
					statusEle.setText("");
					statusEle.setText(status);
					writeXml(doc,Path);	
					System.out.println("成功修改试验代号为"+id+"的状态！");
				}
			}		
		}
		else{
			System.out.println("试验代号不存在，修改状态失败！");
		}		
	}
	
	/**
	 * 删除一个TEST节点
	 */
	public static void deleteTest(String Path,String id){
		doc = loadxml(Path);
		if(isIdExist(Path,id)){
			Element rootElement = doc.getRootElement();
			List list = doc.selectNodes("root/TEST");
			Iterator iter = list.iterator();
			while(iter.hasNext()){
				Element TestEle = (Element)iter.next();
				if(TestEle.element("试验代号").getText().equals(id)){
					rootElement.remove(TestEle);
					writeXml(doc,Path);	
					System.out.println("成功删除试验代号为"+id+"的Test节点！");					
				}
			}					
		}
		else{
			System.out.println("试验代号不存在，删除节点失败！");
		}	
	}
	
	
	public static void main(String[] args) throws IOException{
		String path = ".\\WebRoot\\xml\\test.xml";
		
		HashMap<String,String> map = new HashMap<String,String>();
		map.put("试验代号", "198130614145721");
		map.put("创建IP", "219.245.68.199");
		map.put("配置文件", "configure1.xml");
		map.put("运行", "false");
		map.put("状态", "000000000110");
		
		TestXmlParser.addTest(path, map);
		TestXmlParser.updateTestStatusByTestId(path, "198130614145721", "XXX");
		TestXmlParser.deleteTest(path, "198130614145721");		
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
}
