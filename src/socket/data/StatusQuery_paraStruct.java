package socket.data;

//����
//״̬��ѯ����
public class StatusQuery_paraStruct {
	//������������
	//1���������������SimulationCommand_paraStruct
	//2���������������ϢReportCtrlMessage_paraStruct
	//3����״̬������ϢSimulationStatus_paraStruct
	//4����״̬��ѯ����StatusQuery_paraStruct

	public int fzmllx;
	//ģ��ϯλ��Ψһ��ʶ��
   public long SeatID;
 
    //״̬��ѯʱ�䣨����ʱ�䣩��
    public long CommandTime;
    
    public StatusQuery_paraStruct(int fzmllx,long SeatID,long CommandTime){
    	this.fzmllx = fzmllx;
    	this.SeatID = SeatID;
    	this.CommandTime = CommandTime;
    }
}
