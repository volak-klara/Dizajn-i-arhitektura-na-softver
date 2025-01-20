package mk.finki.ukim.StockApp.controller;

import mk.finki.ukim.StockApp.exception.CompanyNotFoundException;
import mk.finki.ukim.StockApp.model.Company;
import mk.finki.ukim.StockApp.service.AnalysisFactory;
import mk.finki.ukim.StockApp.service.AnalysisService;
import mk.finki.ukim.StockApp.service.CompanyService;
import mk.finki.ukim.StockApp.service.TechAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/companies")
@Validated
@CrossOrigin(origins="*")
public class CompanyController {
    private final CompanyService companyService;
    @Autowired

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @Autowired
    private AnalysisFactory analysisFactory;

    @GetMapping("/analysis")
    public ResponseEntity<String> getAnalysis(@RequestParam String companyName, @RequestParam String type) {
        try {
            String csvFilePath = null;
            if(type.equals("tech")) {
                 csvFilePath = "src/main/resources/companies/" + companyName + ".csv";
            }else if(type.equals("fund")){
                 csvFilePath = "src/main/resources/companiesFund/" + companyName + ".csv";
            }else if(type.equals("lstm")){
                csvFilePath = "src/main/resources/companiesLSTM/" + companyName + ".csv";
            }
            AnalysisService analysisService = analysisFactory.getAnalysisService(type);
            String result = analysisService.performAnalysis(csvFilePath);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error in analysis: " + e.getMessage());
        }
    }


    @GetMapping(value = "/all")
    public ResponseEntity<List<Company>> getAllCompanies() {
        List<Company> companies = companyService.getAllCompanies();
        return new ResponseEntity<>(companies, HttpStatus.OK);
    }



    @GetMapping("/names")
    public ResponseEntity<List<String>> getCompanyNames() {
        List<String> companyNames = companyService.getAllCompanyNames();
        return ResponseEntity.ok(companyNames);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Company> getCompanyById(@PathVariable(value = "id") Long id) throws CompanyNotFoundException {
        Optional<Company> companyOptional = companyService.getCompanyById(id);
        if (companyOptional.isEmpty()) {
            throw new CompanyNotFoundException(id);
        }
        return companyService.getCompanyById(id)
                .map(company -> new ResponseEntity<>(company, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping(value = "/company")
    public ResponseEntity<Company> createCompany(@RequestBody Company company) {
        Company savedCompany = companyService.saveCompany(company);
        return new ResponseEntity<>(savedCompany, HttpStatus.CREATED);
    }



    @GetMapping("/dates")
    public ResponseEntity<List<String>> getDistinctDatesByCompanyName(@RequestParam String name) {
        List<String> dates = companyService.getDistinctDatesByCompanyName(name);
        return ResponseEntity.ok(dates);
    }

    @GetMapping
    public ResponseEntity<Page<Company>> getCompanies(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "50") int size,
            @RequestParam(name = "name", required = false) String name,
            @RequestParam(name = "date", required = false) String date) {

        PageRequest pageRequest = PageRequest.of(page, size);
        Page<Company> companies;

        if (name != null && date != null) {
            companies = companyService.getCompaniesByNameAndDate(name, date, pageRequest);
        } else if (name != null) {
            companies = companyService.getCompaniesByName(name, pageRequest);
        } else {
            companies = companyService.getAllCompanies(pageRequest);
        }

        return ResponseEntity.ok(companies);
    }



}
