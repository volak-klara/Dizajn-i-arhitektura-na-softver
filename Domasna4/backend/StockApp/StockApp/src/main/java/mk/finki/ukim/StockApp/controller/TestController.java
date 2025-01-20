package mk.finki.ukim.StockApp.controller;


import mk.finki.ukim.StockApp.service.TechAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestController {

    @Autowired
    private TechAnalysisService techAnalysisService;

//    @GetMapping("/test-connection")
//    public ResponseEntity<String> testMicroserviceConnection() {
//        try {
//            String result = techAnalysisService.testConnection();
//            return ResponseEntity.ok("Connection test successful: " + result);
//        } catch (Exception e) {
//            return ResponseEntity.status(500)
//                    .body("Connection test failed: " + e.getMessage());
//        }
//    }
}