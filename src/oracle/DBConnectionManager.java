package oracle;
import java.sql.*;

public class DBConnectionManager {
	static private DBConnectionManager instance; // The single instance
	private static Connection con;
	private String user = "pzk";
	private String password = "pzk";
	private static final String drivername = "oracle.jdbc.driver.OracleDriver";
	private static final String url = "jdbc:oracle:thin:@192.168.10.117:1521:c4orcl";

	static public DBConnectionManager getInstance() {
		if (instance == null) {
			instance = new DBConnectionManager();
		}
		return instance;
	}

	public DBConnectionManager() {
		try {
			Class.forName(drivername);
		} catch (ClassNotFoundException e1) {
			e1.printStackTrace();
			System.out.println("driver出错");
		}
		try {
			con = DriverManager.getConnection(url, user, password);
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("连接出错");
		}
	}

	public Connection getConnection() {
		return con;
	}
	
	public static void main(String[] args) {
		DBConnectionManager dbC = new DBConnectionManager();
		System.out.println("ssss");
		try {
			Class.forName(drivername);
		} catch (ClassNotFoundException e1) {
			e1.printStackTrace();
			System.out.println("driver出错");
		}
		try {
			con = DriverManager.getConnection(url, "pzk", "pzk");
			System.out.println("succsee");
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("连接出错");
		}
	}
}
