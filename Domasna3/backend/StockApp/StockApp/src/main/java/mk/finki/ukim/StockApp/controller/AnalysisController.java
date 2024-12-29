package mk.finki.ukim.StockApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/analysis")
public class AnalysisController {

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/{companyId}")
    public ResponseEntity<?> getTechnicalAnalysis(@PathVariable String companyId) {
        String pythonApiUrl = "http://localhost:8000/process-file/";

        // Пратете барање до FastAPI
        ResponseEntity<Object> response = restTemplate.getForEntity(pythonApiUrl, Object.class);

        return ResponseEntity.ok(response.getBody());
    }
}

