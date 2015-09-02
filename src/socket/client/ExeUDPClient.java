package socket.client;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

import socket.data.ReportCtrlMessage_paraStruct;
import socket.data.SimulationStatus_paraStruct;



public class ExeUDPClient {
	static String host="localhost";
    static int port = 4800;
    
    public void clientJob(String s) throws IOException{
    	DatagramSocket client = new DatagramSocket();
        //client发送消息
        String sendStr = s;
        byte[] sendBuf;
        sendBuf = sendStr.getBytes();
        InetAddress addr = InetAddress.getByName(host);
        DatagramPacket sendPacket = new DatagramPacket(sendBuf ,sendBuf.length , addr , port);
        client.send(sendPacket);
        
        //client接受从服务端的反馈信息
//        byte[] recvBuf = new byte[100];
//        DatagramPacket recvPacket = new DatagramPacket(recvBuf , recvBuf.length);
//        client.receive(recvPacket);
//        String recvStr = new String(recvPacket.getData() , 0 ,recvPacket.getLength());
//        System.out.println("server echo:" + recvStr);
        client.close();
    }
    
    public void sendReportCtrlMessage_paraStruct(ReportCtrlMessage_paraStruct rcmp)throws IOException{
    	String s ="#"+rcmp.fzmllx+"#"+rcmp.SeatId+"#"+rcmp.Time+"#"+rcmp.Command+"#"+rcmp.Result+"#";
    	clientJob(s);
    }
    
    
    public void sendSimulationStatus_paraStruct(SimulationStatus_paraStruct ssp)throws IOException{
    	String s = "#"+ssp.fzmllx+"#"+ssp.SeatID+"#"+ssp.Command+"#"+ssp.Status+"#"+ssp.CommandTime+"#";
    	clientJob(s);
    }
    
    public static void main(String[] args) throws IOException{
    	ExeUDPClient ec = new ExeUDPClient();
    	ReportCtrlMessage_paraStruct rcmp = new ReportCtrlMessage_paraStruct("2","102","20130425090909","10","1");
//    	SimulationStatus_paraStruct ssp = new SimulationStatus_paraStruct(3,(short)102,"10",true,5655776);
    	
    	ec.sendReportCtrlMessage_paraStruct(rcmp);
//    	ec.sendSimulationStatus_paraStruct(ssp);
    }
    
    
}
