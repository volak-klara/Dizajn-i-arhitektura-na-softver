package mk.finki.ukim.StockApp.service;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.*;

@Service
public class TechAnalysisService implements AnalysisService {
    @Override
    public String performAnalysis(String filePath) throws Exception {
        ClassPathResource resource = new ClassPathResource("scripts/technical_analysis.py");

        File tempScript = File.createTempFile("technical_analysis", ".py");
        try (InputStream inputStream = resource.getInputStream();
             OutputStream outputStream = new FileOutputStream(tempScript)) {
            inputStream.transferTo(outputStream);
        }

        ProcessBuilder processBuilder = new ProcessBuilder("/app/venv/bin/python3", "/app/scripts/technical_analysis.py", filePath);
        processBuilder.redirectErrorStream(true);

        Process process = processBuilder.start();

        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        StringBuilder result = new StringBuilder();
        String line;

        while ((line = reader.readLine()) != null) {
            if (line.trim().startsWith("[")) {
                result.append(line);
            }
        }

        int exitCode = process.waitFor();
        tempScript.delete();

        if (exitCode != 0) {
            throw new RuntimeException("Python script failed with exit code: " + exitCode);
        }

        String resultStr = result.toString().trim();
        if (resultStr.isEmpty()) {
            throw new RuntimeException("No valid JSON output from Python script");
        }

        return resultStr;
    }
}

