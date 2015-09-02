package socket.client;

import java.io.*;
import java.net.*;

import socket.data.SimulationCommand_paraStruct;
import socket.data.StatusQuery_paraStruct;
public class WebUDPClient{
//	static String host;
//    static int port = 4700;
  //Ӧ�޸�Ϊ����3�������ĺ��������������ֱ�Ϊ����������s������Ŀ��url��Ŀ�Ķ˿ں� 
    //����Ӧ���з���ֵ������ֵ����ΪReportCtrlMessage_paraStruct��exeUDPserver�Ļ�����Ϣ��ҲӦ�����������
    public void clientJob(String s,String host,int port) throws IOException{
    	DatagramSocket client = new DatagramSocket();
        //client������Ϣ
        String sendStr = s;
        byte[] sendBuf;
        sendBuf = sendStr.getBytes();
        InetAddress addr = InetAddress.getByName(host);
        DatagramPacket sendPacket = new DatagramPacket(sendBuf ,sendBuf.length , addr , port);
        client.send(sendPacket);
        
//        client.setSoTimeout(3000);
//        //client���ܴӷ���˵ķ�����Ϣ
//        byte[] recvBuf = new byte[100];
//        DatagramPacket recvPacket = new DatagramPacket(recvBuf , recvBuf.length);
//        String recvStr=null;
//        try{
//        client.receive(recvPacket);
//        recvStr = new String(recvPacket.getData() , 0 ,recvPacket.getLength());
//        System.out.println("server echo:" + recvStr);
//        client.close();
//        
//        }
//       catch(java.net.SocketTimeoutException e){
//    	   client.close();
//       }
//       return recvStr;
        
        
    }
  //Ӧ�޸�Ϊ����3�������ĺ��������������ֱ�Ϊ����������s������Ŀ��url��Ŀ�Ķ˿ں�
    public void sendSimulationCommand_paraStruct(SimulationCommand_paraStruct scp,String host,int port)throws IOException{
    	String s = "#"+scp.fzmllx+"#"+scp.Command+"#"+scp.SimulationSpeed+"#"+scp.CommandTime+"#"+scp.ScenFile+"#"+scp.TestID+"#"+scp.SeatId+"#";
    	clientJob(s,host,port);
    }
    
  //Ӧ�޸�Ϊ����3�������ĺ��������������ֱ�Ϊ����������s������Ŀ��url��Ŀ�Ķ˿ں�
    public void sendStatusQuery_paraStruct(StatusQuery_paraStruct sqp,String host,int port)throws IOException{
    	String s = "#"+sqp.fzmllx+"#"+sqp.SeatID+"#"+sqp.CommandTime+"#";
    	clientJob(s,host,port);
    }
    
    public static void main(String[] args) throws IOException{
    	WebUDPClient wc = new WebUDPClient();
    	SimulationCommand_paraStruct scp = new SimulationCommand_paraStruct(1,"command",(short)2,20130425,"file1",5655776,98372873);
    	StatusQuery_paraStruct sqp = new StatusQuery_paraStruct(2,(short)2,20130425);
    	wc.sendSimulationCommand_paraStruct(scp,"127.0.0.1",4700);
    	wc.sendStatusQuery_paraStruct(sqp,"127.0.0.1",4700);
    }
    
    
    
}
