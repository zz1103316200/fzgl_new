package socket.data;
//接收
//状态运行信息。
public class SimulationStatus_paraStruct {
	//仿真命令类型
	//1——仿真控制命令SimulationCommand_paraStruct
	//2——控制命令反馈信息ReportCtrlMessage_paraStruct
	//3——状态运行信息SimulationStatus_paraStruct
	//4——状态查询命令StatusQuery_paraStruct
//	<node seatid="2">
//	<报告时间>2013-4-27</报告时间>
//	<当前状态>未接入</当前状态>对应Command
//	<执行状态>正常</执行状态>对应Status
//	</node>
	public int fzmllx;
	//模拟席位的唯一标识。
   public short SeatID;
    //模拟软件的运行状态，
	//仿真控制命令类型
  	//1:初试化；2:仿真开始；3:仿真结束；4:归档；
	//5：调速；6:暂停；7:恢复；8:回放；
	//10：部署；11：接入；12退出
    public String Command;

    //命令执行状态，true：执行成功，false：执行失败。
    public boolean Status;

    //状态反馈时间（天文时间）。
    public long CommandTime;
    
    public SimulationStatus_paraStruct(int fzmllx,short SeatID,String Command,boolean Status,long CommandTime){
    	this.fzmllx = fzmllx;
    	this.SeatID = SeatID;
    	this.Command = Command;
    	this.Status = Status;
    	this.CommandTime = CommandTime;
    }
    
}
