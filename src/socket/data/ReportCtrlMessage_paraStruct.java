package socket.data;
//����
//�����������Ϣ
public class ReportCtrlMessage_paraStruct {
	//������������
	//1���������������SimulationCommand_paraStruct
	//2���������������ϢReportCtrlMessage_paraStruct
	//3����״̬������ϢSimulationStatus_paraStruct
	//4����״̬��ѯ����StatusQuery_paraStruct

	public String fzmllx;
	//��ģ��ϯλ�ڷ���ϵͳ�е�Ψһ��ʶ��
    public String SeatId;

    //����ʱ��
    public String Time;

    //���������������
  	//1:���Ի���2:���濪ʼ��3:���������4:�鵵��
	//5�����٣�6:��ͣ��7:�ָ���8:�طţ�
	//10������11�����룻12�˳�
    public String Command;

    //���ƽ����0��ʾʧ�ܣ�1��ʾ�ɹ���
    public String Result;
    
    public ReportCtrlMessage_paraStruct(String fzmllx,String SeatId,String Time,String Command,String Result){
    	this.fzmllx = fzmllx;
    	this.SeatId = SeatId;
    	this.Time = Time;
    	this.Command = Command;
    	this.Result = Result;
    }
}
