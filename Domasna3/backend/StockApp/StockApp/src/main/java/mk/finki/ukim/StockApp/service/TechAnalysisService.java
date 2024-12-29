package mk.finki.ukim.StockApp.service;

import org.springframework.stereotype.Service;
import java.io.BufferedReader;
import java.io.InputStreamReader;

@Service
public class TechAnalysisService {

    public String getTechAnalysis(String csvFilePath) throws Exception {
        // Патеката до Python скриптата

        String scriptPath = "python \"D:\\Documents\\FINKI\\DIANS\\Domasna2\\technical_analysis.py"; // Обезбеди ја вистинската патека до твојата Python скрипта

        // Команда за извршување на скриптата со патеката до CSV фајлот
        ProcessBuilder processBuilder = new ProcessBuilder(scriptPath, csvFilePath);
//        ProcessBuilder processBuilder = new ProcessBuilder("python", "\"D:\\Documents\\FINKI\\DIANS\\Domasna2\\technical_analysis.py", csvFilePath);
        Process process = processBuilder.start();

        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        String line;
        StringBuilder result = new StringBuilder();
        while ((line = reader.readLine()) != null) {
            result.append(line);
        }

        process.waitFor();
        return result.toString();  // Враќа резултати во JSON
    }
}

