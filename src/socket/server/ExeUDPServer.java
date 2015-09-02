package socket.server;
import java.io.*;
import java.net.*;


public class ExeUDPServer {
	public static void main(String[] args)
    {
        new Thread(new UDPThread()).start();
    }
}


class UDPThread implements Runnable {

	byte[] buf = new byte[1024];
	private int UDP_PORT = 4700;
	
	public void run() {
		System.out.println("ExeUDPServer开始监听..."+UDP_PORT);
		DatagramSocket ds = null;
		try {
			ds = new DatagramSocket(UDP_PORT);
		} catch (BindException e) {
			System.out.println("UDP端口使用中...请重关闭程序启服务器");
		} catch (SocketException e) {
			e.printStackTrace();
		}


		while (ds != null) {
			DatagramPacket dp = new DatagramPacket(buf, buf.length);
			try {
				ds.receive(dp);
				//得到把该数据包发来的端口和Ip
				int rport = dp.getPort();
				InetAddress addr = dp.getAddress();
				String recvStr = new String(dp.getData() , 0 , dp.getLength());
				System.out.println("Server receive：" + recvStr+" from " +addr+"  "+rport);
				
				//给客户端回应
				String sendStr = "echo of "+recvStr;
				byte[] sendBuf;
				sendBuf = sendStr.getBytes();
				DatagramPacket sendPacket = new DatagramPacket(sendBuf , sendBuf.length , addr , rport );
				ds.send(sendPacket);
				
			} catch (IOException e) {
				e.printStackTrace();
			}

		}

	}
}

