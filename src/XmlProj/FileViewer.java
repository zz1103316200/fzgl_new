package XmlProj;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class FileViewer {
	/*
	 * 读取一个服务器文件夹下的文件列表
	 */
	
	public static String getFiles(String path){
		ArrayList<String> a = new ArrayList<String>();
		File file = new File(path);
		File[] files = file.listFiles();
		for(int i=0;i<files.length;i++){
			if(!files[i].isDirectory()){
				a.add(files[i].getName());
			}
		}
		String s = getFileNameList(a);
		return s;
	}
	private static String getFileNameList(List<String> list){
		String s = "";	
		for(int i=0;i<list.size();i++){
			int index = list.get(i).lastIndexOf(".");
			String ax = list.get(i).substring(0, index);			
			s = s+ax+"#";
		}
		s.substring(0, s.length()-1);
		return s.substring(0, s.length()-1);
	}
	public static void main(String[] args){
		String a = FileViewer.getFiles("C://Documents and Settings//Administrator//Workspaces//MyEclipse 9//fzglServlet//WebRoot//xml//");		
		System.out.println(a);
	}
}
