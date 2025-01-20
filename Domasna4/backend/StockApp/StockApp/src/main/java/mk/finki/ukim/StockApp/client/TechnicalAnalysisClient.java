package mk.finki.ukim.StockApp.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

@FeignClient(name = "technical-analysis-service", url = "http://localhost:8082")
public interface TechnicalAnalysisClient {

    @PostMapping(value = "/api/technical-analysis/analyze",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ResponseEntity<String> analyzeTechnicalData(@RequestPart("file") MultipartFile file);

    @GetMapping("/api/technical-analysis/test")
    ResponseEntity<String> test();
}