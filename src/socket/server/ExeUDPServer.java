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
		System.out.println("ExeUDPServer��ʼ����..."+UDP_PORT);
		DatagramSocket ds = null;
		try {
			ds = new DatagramSocket(UDP_PORT);
		} catch (BindException e) {
			System.out.println("UDP�˿�ʹ����...���عرճ�����������");
		} catch (SocketException e) {
			e.printStackTrace();
		}


		while (ds != null) {
			DatagramPacket dp = new DatagramPacket(buf, buf.length);
			try {
				ds.receive(dp);
				//�õ��Ѹ����ݰ������Ķ˿ں�Ip
				int rport = dp.getPort();
				InetAddress addr = dp.getAddress();
				String recvStr = new String(dp.getData() , 0 , dp.getLength());
				System.out.println("Server receive��" + recvStr+" from " +addr+"  "+rport);
				
				//���ͻ��˻�Ӧ
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

