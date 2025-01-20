package mk.finki.ukim.StockApp.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.*;

@Service
public class FundamentalAnalysisService implements AnalysisService {

    @Override
    public String performAnalysis(String filePath) throws Exception {
        // Читање на CSV датотеката
        List<Map<String, String>> rows = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line = reader.readLine(); // Првата линија (header)
            if (line == null) {
                throw new RuntimeException("CSV file is empty");
            }

            // Извлечи ги колоните од header
            String[] headers = line.split(",");
            if (headers.length < 2) {
                throw new RuntimeException("CSV file must have at least two columns");
            }

            // Првата и последната колона
            String firstColumn = headers[0];
            String lastColumn = headers[headers.length - 1];

            // Читање на податоците
            while ((line = reader.readLine()) != null) {
                String[] values = line.split(",");
                if (values.length < headers.length) {
                    throw new RuntimeException("Invalid row format in CSV file");
                }

                // Додавање на првата и последната колона во мапа
                Map<String, String> row = new LinkedHashMap<>();
                row.put(firstColumn, values[0]);
                row.put(lastColumn, values[values.length - 1]);
                rows.add(row);
            }
        }

        // Конверзија на резултатот во JSON формат
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(rows);
    }
}
