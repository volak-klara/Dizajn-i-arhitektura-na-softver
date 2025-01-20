package mk.finki.ukim.analysisservice.service;

import org.springframework.web.multipart.MultipartFile;

public interface TechAnalysisService {
    String performAnalysis(MultipartFile file) throws Exception;
}