package mk.finki.ukim.analysisservice.service.impl;

import mk.finki.ukim.analysisservice.service.TechAnalysisService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
public class TechAnalysisServiceImpl implements TechAnalysisService {

    @Value("${python.script.path:scripts/technical_analysis.py}")
    private String pythonScriptPath;

    @Override
    public String performAnalysis(MultipartFile file) throws Exception {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File cannot be null or empty");
        }

        // Create temporary file for the uploaded CSV
        Path tempCsvFile = Files.createTempFile("stock_data_", ".csv");
        file.transferTo(tempCsvFile.toFile());

        // Copy Python script to temporary location
        ClassPathResource scriptResource = new ClassPathResource(pythonScriptPath);
        Path tempScript = Files.createTempFile("technical_analysis_", ".py");

        try (InputStream inputStream = scriptResource.getInputStream();
             OutputStream outputStream = new FileOutputStream(tempScript.toFile())) {
            inputStream.transferTo(outputStream);
        }

        try {
            // Execute Python script
            ProcessBuilder processBuilder = new ProcessBuilder(
                    "python",
                    tempScript.toString(),
                    tempCsvFile.toString()
            );
            processBuilder.redirectErrorStream(true);

            Process process = processBuilder.start();

            // Read the results
            StringBuilder result = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    if (line.trim().startsWith("[")) {
                        result.append(line);
                    }
                }
            }

            int exitCode = process.waitFor();
            if (exitCode != 0) {
                throw new RuntimeException("Python script failed with exit code: " + exitCode);
            }

            String resultStr = result.toString().trim();
            if (resultStr.isEmpty()) {
                throw new RuntimeException("No valid JSON output from Python script");
            }

            return resultStr;

        } finally {
            // Cleanup
            try {
                Files.deleteIfExists(tempScript);
                Files.deleteIfExists(tempCsvFile);
            } catch (IOException e) {
                // Log the error but don't throw it
                e.printStackTrace();
            }
        }
    }
}