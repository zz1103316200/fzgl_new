package socket.data;
//����
//״̬������Ϣ��
public class SimulationStatus_paraStruct {
	//������������
	//1���������������SimulationCommand_paraStruct
	//2���������������ϢReportCtrlMessage_paraStruct
	//3����״̬������ϢSimulationStatus_paraStruct
	//4����״̬��ѯ����StatusQuery_paraStruct
//	<node seatid="2">
//	<����ʱ��>2013-4-27</����ʱ��>
//	<��ǰ״̬>δ����</��ǰ״̬>��ӦCommand
//	<ִ��״̬>����</ִ��״̬>��ӦStatus
//	</node>
	public int fzmllx;
	//ģ��ϯλ��Ψһ��ʶ��
   public short SeatID;
    //ģ�����������״̬��
	//���������������
  	//1:���Ի���2:���濪ʼ��3:���������4:�鵵��
	//5�����٣�6:��ͣ��7:�ָ���8:�طţ�
	//10������11�����룻12�˳�
    public String Command;

    //����ִ��״̬��true��ִ�гɹ���false��ִ��ʧ�ܡ�
    public boolean Status;

    //״̬����ʱ�䣨����ʱ�䣩��
    public long CommandTime;
    
    public SimulationStatus_paraStruct(int fzmllx,short SeatID,String Command,boolean Status,long CommandTime){
    	this.fzmllx = fzmllx;
    	this.SeatID = SeatID;
    	this.Command = Command;
    	this.Status = Status;
    	this.CommandTime = CommandTime;
    }
    
}
