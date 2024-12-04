package mk.finki.ukim.StockApp.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/graphs")
public class GraphController {

    private final String GRAPH_DIRECTORY = "graphs";

    @GetMapping("/{companyName}")
    public ResponseEntity<Resource> getGraph(@PathVariable String companyName) {
        try {
            Path filePath = Paths.get(GRAPH_DIRECTORY).resolve(companyName + ".png").normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return ResponseEntity.ok(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}

