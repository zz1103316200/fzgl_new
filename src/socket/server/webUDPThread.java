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
	
	
	public void run() {//要求接受到一条命令，并且生成相应的xml
		System.out.println("WebUDPServer开始监听..."+UDP_PORT);
		
		
		
		try {
			ds = new DatagramSocket(UDP_PORT);
		} catch (BindException e) {
			System.out.println("UDP端口使用中...请重关闭程序启服务器");
		} catch (SocketException e) {
			e.printStackTrace();
		}
		
		
		while (ds!=null) {
			DatagramPacket dp = new DatagramPacket(buf, buf.length);

			try {
				
				ds.receive(dp);
				//得到把该数据包发来的端口和Ip
//				int rport = dp.getPort();
//				InetAddress addr = dp.getAddress();
				String recvStr = new String(dp.getData() , 0 , dp.getLength());
				if(recvStr.equals("terminate"))
				{
					break;
				}
				
				//增加写xml的过程
				System.out.println(recvStr);
				String recvs[]=recvStr.split("#");
				
				//state.xml需要修改 接受sockeet以后 拿出testId放到路径里 找到对应状态文件名 
				String statePath=sc.getRealPath("/")+"xml\\"+"state.xml";
				//按照接收到的recvs信息修改state.xml文件
				XmlParser.modifyXml(recvs,statePath);
				//给客户端回应
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


