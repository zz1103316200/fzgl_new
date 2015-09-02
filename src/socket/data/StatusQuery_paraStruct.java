package socket.data;

//发出
//状态查询命令
public class StatusQuery_paraStruct {
	//仿真命令类型
	//1——仿真控制命令SimulationCommand_paraStruct
	//2——控制命令反馈信息ReportCtrlMessage_paraStruct
	//3——状态运行信息SimulationStatus_paraStruct
	//4——状态查询命令StatusQuery_paraStruct

	public int fzmllx;
	//模拟席位的唯一标识。
   public long SeatID;
 
    //状态查询时间（天文时间）。
    public long CommandTime;
    
    public StatusQuery_paraStruct(int fzmllx,long SeatID,long CommandTime){
    	this.fzmllx = fzmllx;
    	this.SeatID = SeatID;
    	this.CommandTime = CommandTime;
    }
}
