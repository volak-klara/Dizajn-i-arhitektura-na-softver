package mk.finki.ukim.StockApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class AnalysisFactory {

    @Autowired
    private TechAnalysisService techAnalysisService;

    @Autowired
    private FundamentalAnalysisService fundamentalAnalysisService;
    @Autowired
    private LSTMAnalysisService lstmAnalysisService;

    public AnalysisService getAnalysisService(String type) {
        switch (type.toLowerCase()) {
            case "tech":
                return techAnalysisService;
            case "fund":
                return fundamentalAnalysisService;
            case "lstm":
                return lstmAnalysisService;
            default:
                throw new IllegalArgumentException("Invalid analysis type: " + type);
        }
    }
}




