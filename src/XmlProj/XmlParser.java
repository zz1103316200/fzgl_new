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
 * ����ϵͳ����֧�Ź��ߵ�xml������ 
 */
public class XmlParser {
	
//	public String configPath;//�����ļ���·��
//	public String statePath;//״̬xml�ļ�·��
//	public Document stateDoc;//����״̬xml���ڴ�ṹ
//	public Document configDoc;//���������ļ����ڴ�ṹ
//	public FileOutputStream fileOut ;
	//���캯��
//	public XmlParser(String configPath,String statePath){
//		this.configPath = configPath;
//		this.statePath = statePath;
//	}
	/**
	 * ��������xml,���ر������xml�ļ���doc
	 * path����Ҫ�����xml�洢·��
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
	 * �������docд��xmlPath�ļ�
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
	 * �޸�xml ���seatid���ڣ��͸���seatid���ڽڵ㣬��������ڣ��ʹ���һ���µĽڵ�
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
				System.out.println("seatid �Ѵ��� ,index = "+index);
				Element e=(Element)nodeList.get(index);			
				
				Element timeEle = e.element("����ʱ��");				
				System.out.println("timeEle.getText():"+timeEle.getText()+"  recive[3] = "+recive[3]);				
				//���ı���ʱ��ĸ�ʽ				
				timeEle.setText(configTime(recive[3]));
				System.out.println("�޸ĺ� timeEle.getText():"+timeEle.getText());
				
				Element currentStatusEle = e.element("��ǰ״̬");				
				System.out.println("currentStatusEle.getText():"+currentStatusEle.getText()+"  recive[4] = "+recive[4]);
				//���������������
			  	//1:���Ի���2:���濪ʼ��3:���������4:�鵵��
				//5�����٣�6:��ͣ��7:�ָ���8:�طţ�
				//10������11�����룻12�˳�
				switch(Integer.parseInt(recive[4]))
				{
				case 1:
					currentStatusEle.setText("���Ի�");break;
				case 2:
					currentStatusEle.setText("���濪ʼ");break;
				case 3:
					currentStatusEle.setText("�������");break;
				case 4:
					currentStatusEle.setText("�鵵");break;
				case 5:
					currentStatusEle.setText("����");break;
				case 6:
					currentStatusEle.setText("��ͣ");break;
				case 7:
					currentStatusEle.setText("�ָ�");break;
				case 8:
					currentStatusEle.setText("�ط�");break;				
				case 10:
					currentStatusEle.setText("����");break;
				case 11:
					currentStatusEle.setText("����");break;
				case 12:
					currentStatusEle.setText("�˳�");break;
					
				}				
				System.out.println("�޸ĺ� currentStatusEle.getText():"+currentStatusEle.getText());				
				Element exeStatusEle = e.element("ִ��״̬");				
				System.out.println("exeStatusEle.getText():"+exeStatusEle.getText()+"  recive[5] = "+recive[5]);
				if(recive[5].equals("1"))
				{
					exeStatusEle.setText("����");
				}
				else
				{
					exeStatusEle.setText("�쳣");
				}				
				System.out.println("�޸ĺ� exeStatusEle.getText():"+exeStatusEle.getText());				
				
				writeXml(stateDoc,statePath);
			}
			else
			{
				//�½�һ��node�ڵ�
				Element nodeElement = stateDoc.getRootElement().addElement("node");
				nodeElement.addAttribute("seatid", recive[2]);
				nodeElement.addElement("����ʱ��").setText(configTime(recive[3]));
				
				switch(Integer.parseInt(recive[4]))
				{
				case 1:					
					nodeElement.addElement("��ǰ״̬").setText("���Ի�");break;
				case 2:
					nodeElement.addElement("��ǰ״̬").setText("���濪ʼ");break;
				case 3:
					nodeElement.addElement("��ǰ״̬").setText("�������");break;
				case 4:
					nodeElement.addElement("��ǰ״̬").setText("�鵵");break;
				case 5:
					nodeElement.addElement("��ǰ״̬").setText("����");break;
				case 6:
					nodeElement.addElement("��ǰ״̬").setText("��ͣ");break;
				case 7:
					nodeElement.addElement("��ǰ״̬").setText("�ָ�");break;
				case 8:
					nodeElement.addElement("��ǰ״̬").setText("�ط�");break;				
				case 10:
					nodeElement.addElement("��ǰ״̬").setText("����");break;
				case 11:
					nodeElement.addElement("��ǰ״̬").setText("����");break;
				case 12:
					nodeElement.addElement("��ǰ״̬").setText("�˳�");break;
				}
				if(recive[5].equals("1"))
				{
					nodeElement.addElement("ִ��״̬").setText("����");
				}
				else
				{
					nodeElement.addElement("ִ��״̬").setText("�쳣");
				}
				
				writeXml(stateDoc,statePath);
				
			}
		}
		if(recive[1].equals("3"))
		{
//			this.fzmllx = fzmllx;
//	    	this.SeatID = SeatID;
//	    	this.Command = Command;<��ǰ״̬>δ����</��ǰ״̬>��ӦCommand
//	    	this.Status = Status;<ִ��״̬>����</ִ��״̬>��ӦStatus
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
				System.out.println("seatid �Ѵ��� ,index = "+index);
				Element e=(Element)nodeList.get(index);			
				
				Element timeEle = e.element("����ʱ��");				
				System.out.println("timeEle.getText():"+timeEle.getText()+"  recive[5] = "+recive[5]);				
				timeEle.setText(configTime(recive[5]));
				System.out.println("�޸ĺ� timeEle.getText():"+timeEle.getText());
				
				Element currentStatusEle = e.element("��ǰ״̬");				
				System.out.println("currentStatusEle.getText():"+currentStatusEle.getText()+"  recive[3] = "+recive[3]);
				//ģ�����������״̬��
				//���������������
			  	//1:���Ի���2:���濪ʼ��3:���������4:�鵵��
				//5�����٣�6:��ͣ��7:�ָ���8:�طţ�
				//10������11�����룻12�˳�
				switch(Integer.parseInt(recive[3]))
				{
				case 1:
					currentStatusEle.setText("���Ի�");break;
				case 2:
					currentStatusEle.setText("���濪ʼ");break;
				case 3:
					currentStatusEle.setText("�������");break;
				case 4:
					currentStatusEle.setText("�鵵");break;
				case 5:
					currentStatusEle.setText("����");break;
				case 6:
					currentStatusEle.setText("��ͣ");break;
				case 7:
					currentStatusEle.setText("�ָ�");break;
				case 8:
					currentStatusEle.setText("�ط�");break;				
				case 10:
					currentStatusEle.setText("����");break;
				case 11:
					currentStatusEle.setText("����");break;
				case 12:
					currentStatusEle.setText("�˳�");break;
					
				}
				
				currentStatusEle.setText(recive[3]);
				System.out.println("�޸ĺ� currentStatusEle.getText():"+currentStatusEle.getText());
				
				Element exeStatusEle = e.element("ִ��״̬");	
				if(recive[4].equals("1"))
				{
					exeStatusEle.setText("����");
				}
				else
				{
					exeStatusEle.setText("�쳣");
				}
				System.out.println("exeStatusEle.getText():"+exeStatusEle.getText()+"  recive[4] = "+recive[4]);				
				exeStatusEle.setText(recive[4]);
				System.out.println("�޸ĺ� exeStatusEle.getText():"+exeStatusEle.getText());				
				
				writeXml(stateDoc,statePath);
				
			}
			else
			{
				//�½�һ��node�ڵ�
				Element nodeElement = stateDoc.getRootElement().addElement("node");
				nodeElement.addAttribute("seatid", recive[2]);
				nodeElement.addElement("����ʱ��").setText(configTime(recive[5]));
				
				switch(Integer.parseInt(recive[3]))
				{
				case 1:					
					nodeElement.addElement("��ǰ״̬").setText("���Ի�");break;
				case 2:
					nodeElement.addElement("��ǰ״̬").setText("���濪ʼ");break;
				case 3:
					nodeElement.addElement("��ǰ״̬").setText("�������");break;
				case 4:
					nodeElement.addElement("��ǰ״̬").setText("�鵵");break;
				case 5:
					nodeElement.addElement("��ǰ״̬").setText("����");break;
				case 6:
					nodeElement.addElement("��ǰ״̬").setText("��ͣ");break;
				case 7:
					nodeElement.addElement("��ǰ״̬").setText("�ָ�");break;
				case 8:
					nodeElement.addElement("��ǰ״̬").setText("�ط�");break;				
				case 10:
					nodeElement.addElement("��ǰ״̬").setText("����");break;
				case 11:
					nodeElement.addElement("��ǰ״̬").setText("����");break;
				case 12:
					nodeElement.addElement("��ǰ״̬").setText("�˳�");break;
				}
				if(recive[4].equals("1"))
				{
					nodeElement.addElement("ִ��״̬").setText("����");
				}
				else
				{
					nodeElement.addElement("ִ��״̬").setText("�쳣");
				}
					
				
				writeXml(stateDoc,statePath);
				
			}
			
		}
		System.out.println("�ɹ��޸���state.xml~");
	}
	
	/**
	 * ���state.xml�ļ�
	 */
	public static void clearXml(String statePath)
	{
		Document stateDoc = loadxml(statePath);
		stateDoc.clearContent();
		writeXml(stateDoc,statePath);
		System.out.println("�ɹ������state.xml");
	}
	
	/**
	 * ����config�ļ�����state.xml�ļ�
	 */
	public static void initXml(String configPath,String statePath){
		Document configDoc = loadxml(configPath);
		List nodeList = configDoc.selectNodes("/��������/ģ���豸��Ϣ/ģ���豸");
		ArrayList<String> seatidAL = new ArrayList<String>();
		Iterator it = nodeList.iterator();
		while(it.hasNext()){
			Element nodeElement = (Element) it.next();
			String seatid = nodeElement.attributeValue("��ʶ");
			seatidAL.add(seatid);
		}
//		clearXml(statePath);//���state.xml�ļ�
		Document stateDoc = DocumentFactory.getInstance().createDocument();
		//�½�һ��root�ڵ�
		Element rootElement = stateDoc.addElement("root");
		
		for(int i=0;i<seatidAL.size();i++){
			Element nodeElement = rootElement.addElement("node");
			nodeElement.addAttribute("seatid", seatidAL.get(i));
			nodeElement.addElement("����ʱ��").setText("");
			nodeElement.addElement("��ǰ״̬").setText("δ����");
			nodeElement.addElement("ִ��״̬").setText("δ֪");	
		}			
		writeXml(stateDoc,statePath);	
		System.out.println("state.xml init successfully~");
	}
	
	/**
	 * �޸�ʱ��ĸ�ʽ
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



