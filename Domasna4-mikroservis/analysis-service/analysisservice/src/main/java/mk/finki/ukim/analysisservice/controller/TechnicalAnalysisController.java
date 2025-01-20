package mk.finki.ukim.analysisservice.controller;

import lombok.extern.slf4j.Slf4j;
import mk.finki.ukim.analysisservice.service.impl.TechAnalysisServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/api/technical-analysis")
public class TechnicalAnalysisController {

    @Autowired
    private TechAnalysisServiceImpl techAnalysisService;

    @PostMapping("/analyze")
    public ResponseEntity<String> analyzeTechnicalData(@RequestPart("file") MultipartFile file) {
        System.out.println("=== Starting Technical Analysis ===");
        System.out.println("Received file: " + file.getOriginalFilename());
        System.out.println("File size: " + file.getSize() + " bytes");

        try {
            // Прикажи содржина на CSV
            BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()));
            String line;
            int lineCount = 0;
            System.out.println("Preview of CSV content:");
            while ((line = reader.readLine()) != null && lineCount < 5) {
                System.out.println("Line " + lineCount++ + ": " + line);
            }

            String result = techAnalysisService.performAnalysis(file);

            System.out.println("Analysis completed successfully");
            System.out.println("Result: " + result);

            return ResponseEntity.ok(result);

        } catch (Exception e) {
            System.err.println("Analysis failed with error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500)
                    .body("Analysis failed: " + e.getMessage());
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        System.out.println("Test endpoint called on microservice");
        return ResponseEntity.ok("Technical Analysis Service is running on port 8082!");
    }

    @GetMapping("/analyze/{companyName}")
    public ResponseEntity<String> analyzeTechnicalData(@PathVariable String companyName) {
        System.out.println("Analyzing data for company: " + companyName);
        try {
            String csvFilePath = String.format("src/main/resources/companies/%s.csv", companyName);
            System.out.println("Looking for file at: " + csvFilePath);

            MultipartFile csvFile = new File(csvFilePath);
            if (!csvFile.exists()) {
                System.out.println("File not found at: " + csvFilePath);
                return ResponseEntity.status(404)
                        .body("CSV file not found for company: " + companyName);
            }

            String result = techAnalysisService.performAnalysis((MultipartFile) csvFile);
            System.out.println("Analysis completed with result: " + result);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            System.err.println("Error during analysis: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500)
                    .body("Analysis failed: " + e.getMessage());
        }
    }
}