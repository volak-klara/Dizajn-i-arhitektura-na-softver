
package mk.finki.ukim.StockApp.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.*;

@Service
public class LSTMAnalysisService implements AnalysisService {

    @Override
    public String performAnalysis(String filePath) throws Exception {

        List<Map<String, String>> rows = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line = reader.readLine();
            if (line == null) {
                throw new RuntimeException("CSV file is empty");
            }

            // Read header to get column names
            String[] headers = line.split(",");
            if (headers.length < 11) {  // Ensure there are at least 11 columns
                throw new RuntimeException("CSV file must have at least 11 columns");
            }

            // Selecting the columns to extract from the CSV
            int[] selectedColumns = {0, 5, 6, 7, 8, 9};  // Company, Last_Price, Day_1_Prediction, ..., Day_5_Prediction
            String[] selectedHeaders = Arrays.stream(selectedColumns)
                    .mapToObj(index -> headers[index])
                    .toArray(String[]::new);

            // Process each line in the CSV
            while ((line = reader.readLine()) != null) {
                String[] values = line.split(",");

                if (values.length < 11) {
                    System.err.println("Skipping row due to insufficient columns: " + Arrays.toString(values));
                    continue;
                }


                Map<String, String> row = new LinkedHashMap<>();
                for (int index : selectedColumns) {
                    if (index < values.length) {  // Ensure we don't access an invalid index
                        row.put(selectedHeaders[index], values[index]);
                    }
                }
                rows.add(row);
            }
        }


        if (rows.isEmpty()) {
            throw new RuntimeException("No valid rows found in the CSV file");
        }


        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(rows);
    }
}
