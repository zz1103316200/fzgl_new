package socket.data;
//发出
public class SimulationCommand_paraStruct {
	//仿真命令类型
	//1——仿真控制命令SimulationCommand_paraStruct
	//2——控制命令反馈信息ReportCtrlMessage_paraStruct
	//3——状态运行信息SimulationStatus_paraStruct
	//4——状态查询命令StatusQuery_paraStruct

	public int fzmllx;
	//仿真控制命令类型，
		//1:初试化；2:仿真开始；3:仿真结束；4:归档；
		//5：调速；6:暂停；7:恢复；8:回放；
		//10：部署；11：接入；12退出
	public String Command;
	//仿真速度。在仿真开始、仿真恢复和仿真调速时该项有效。为负数时表示减速倍数,1：1倍；2：2倍；4：4倍；8：8倍.16：16倍
    public short SimulationSpeed;
    //命令执行时间，该时间取自然时间。本时间为0时，表示收到命令立即执行，否则到达时间时执行。校时时为校时时间YYYYMMDDHHMMSS
    public long CommandTime;
    //配置文件名称
    public String ScenFile;
    //本次试验的代号，归档时有效。
    public long TestID;
    //该模拟席位在系统中的唯一标识，重演时有效。
    public long SeatId;
    //这个是testId
   
    
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
