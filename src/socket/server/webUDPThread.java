package socket.server;

import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.net.BindException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;

import javax.servlet.ServletContext;

import XmlProj.XmlParser;

import cetc.fzglServlet;

//public class WebUDPServer {
//	public static void main(String[] args)
//    {
//        new Thread(new webUDPThread()).start();
//    }
//}	

public class webUDPThread extends Thread{
	fzglServlet fzservlet;
	byte[] buf = new byte[1024];
	private int UDP_PORT = 4800;
	XmlParser xp;
	ServletContext sc;
	public DatagramSocket ds = null;
	public boolean flag=true;
	
	public webUDPThread(XmlParser xp,ServletContext sc)
	{
		this.sc=sc;
		this.xp=xp;
		
	}
	
	
	public void run() {//Ҫ����ܵ�һ���������������Ӧ��xml
		System.out.println("WebUDPServer��ʼ����..."+UDP_PORT);
		
		
		
		try {
			ds = new DatagramSocket(UDP_PORT);
		} catch (BindException e) {
			System.out.println("UDP�˿�ʹ����...���عرճ�����������");
		} catch (SocketException e) {
			e.printStackTrace();
		}
		
		
		while (ds!=null) {
			DatagramPacket dp = new DatagramPacket(buf, buf.length);

			try {
				
				ds.receive(dp);
				//�õ��Ѹ����ݰ������Ķ˿ں�Ip
//				int rport = dp.getPort();
//				InetAddress addr = dp.getAddress();
				String recvStr = new String(dp.getData() , 0 , dp.getLength());
				if(recvStr.equals("terminate"))
				{
					break;
				}
				
				//����дxml�Ĺ���
				System.out.println(recvStr);
				String recvs[]=recvStr.split("#");
				
				//state.xml��Ҫ�޸� ����sockeet�Ժ� �ó�testId�ŵ�·���� �ҵ���Ӧ״̬�ļ��� 
				String statePath=sc.getRealPath("/")+"xml\\"+"state.xml";
				//���ս��յ���recvs��Ϣ�޸�state.xml�ļ�
				XmlParser.modifyXml(recvs,statePath);
				//���ͻ��˻�Ӧ
//				String sendStr = "echo of "+recvStr;
//				byte[] sendBuf;
//				sendBuf = sendStr.getBytes();
//				DatagramPacket sendPacket = new DatagramPacket(sendBuf , sendBuf.length , addr , rport );
//				ds.send(sendPacket);

			} catch (IOException e) {
				e.printStackTrace();
			}

		}

	}
}


