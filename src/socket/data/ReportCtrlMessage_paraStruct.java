package socket.data;
//接收
//控制命令反馈信息
public class ReportCtrlMessage_paraStruct {
	//仿真命令类型
	//1——仿真控制命令SimulationCommand_paraStruct
	//2——控制命令反馈信息ReportCtrlMessage_paraStruct
	//3——状态运行信息SimulationStatus_paraStruct
	//4——状态查询命令StatusQuery_paraStruct

	public String fzmllx;
	//该模拟席位在仿真系统中的唯一标识。
    public String SeatId;

    //报告时间
    public String Time;

    //仿真控制命令类型
  	//1:初试化；2:仿真开始；3:仿真结束；4:归档；
	//5：调速；6:暂停；7:恢复；8:回放；
	//10：部署；11：接入；12退出
    public String Command;

    //控制结果（0表示失败，1表示成功）
    public String Result;
    
    public ReportCtrlMessage_paraStruct(String fzmllx,String SeatId,String Time,String Command,String Result){
    	this.fzmllx = fzmllx;
    	this.SeatId = SeatId;
    	this.Time = Time;
    	this.Command = Command;
    	this.Result = Result;
    }
}
