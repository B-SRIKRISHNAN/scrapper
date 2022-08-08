import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.UnsupportedEncodingException;


public class AspectEditor {

    public void fileEditor(File f, String groupid, String artifactID) throws IOException
    {
        BufferedReader r = new BufferedReader(new FileReader(f));
        // 
        String s = "";

        while(true)
        {
            String line = r.readLine();
            // System.out.println(line);
            if(line==null)
                break;

            if(line.contains("@Pointcut"))
            {

                int toAddAt =line.indexOf("@Pointcut")+ 9;
                String toAdd = "(\"execution"+"(* " + groupid + "." + artifactID
                + ".*.*(..))\")";
                line = line.substring(0, toAddAt)+toAdd;

            }
            
            s = s.concat(line+"\n");
            
        }

        BufferedWriter w = new BufferedWriter(new FileWriter(f));
        w.write(s);
        w.flush();
        r.close();
        w.close();
    }
    // File file = new File("LoggerAspect.java");
    public static void main(String[] args) {
        try{
        File file = new File("LoggerAspect.java");
        File properties = new File("projectConfig.txt");
        AspectEditor editor = new AspectEditor();
        String[] details  = editor.readProperties(properties);
        editor.fileEditor(file, details[0], details[1]);
    }
        catch(IOException f){f.printStackTrace();}
    }
    public String[] readProperties(File file) throws IOException, UnsupportedEncodingException
    {
        BufferedReader read = new BufferedReader(new FileReader(file));
        String[] details = new String[2];

        while(true)
        {
            String line = read.readLine();
            if(line==null)
                break;
            // line = new String(line.getBytes(StandardCharsets.UTF_16), StandardCharsets.UTF_8);
            System.out.println(line);
            if(line.contains("groupId: "))
            {
               details[0] =  line.substring(line.indexOf("groupId: ")+9);
            }
            else if(line.contains("artifactId: "))
            {
                details[1] = line.substring(line.indexOf("artifactId: ")+12);
            }
        }
        read.close();
        return details;
    }
   

}