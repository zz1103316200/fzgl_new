package socket.data;
//����
public class SimulationCommand_paraStruct {
	//������������
	//1���������������SimulationCommand_paraStruct
	//2���������������ϢReportCtrlMessage_paraStruct
	//3����״̬������ϢSimulationStatus_paraStruct
	//4����״̬��ѯ����StatusQuery_paraStruct

	public int fzmllx;
	//��������������ͣ�
		//1:���Ի���2:���濪ʼ��3:���������4:�鵵��
		//5�����٣�6:��ͣ��7:�ָ���8:�طţ�
		//10������11�����룻12�˳�
	public String Command;
	//�����ٶȡ��ڷ��濪ʼ������ָ��ͷ������ʱ������Ч��Ϊ����ʱ��ʾ���ٱ���,1��1����2��2����4��4����8��8��.16��16��
    public short SimulationSpeed;
    //����ִ��ʱ�䣬��ʱ��ȡ��Ȼʱ�䡣��ʱ��Ϊ0ʱ����ʾ�յ���������ִ�У����򵽴�ʱ��ʱִ�С�УʱʱΪУʱʱ��YYYYMMDDHHMMSS
    public long CommandTime;
    //�����ļ�����
    public String ScenFile;
    //��������Ĵ��ţ��鵵ʱ��Ч��
    public long TestID;
    //��ģ��ϯλ��ϵͳ�е�Ψһ��ʶ������ʱ��Ч��
    public long SeatId;
    //�����testId
   
    
    public SimulationCommand_paraStruct(int fzmllx,String Command,short SimulationSpeed,
    		long CommandTime,String ScenFile,long TestID,long SeatId){
    	this.fzmllx = fzmllx;
    	this.Command = Command;
    	this.SimulationSpeed = SimulationSpeed;
    	this.CommandTime = CommandTime;
    	this.ScenFile = ScenFile;
    	this.TestID = TestID;
    	this.SeatId = SeatId;
    	
    }
}
