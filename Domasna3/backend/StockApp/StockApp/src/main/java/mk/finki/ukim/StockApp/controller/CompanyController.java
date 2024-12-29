package mk.finki.ukim.StockApp.controller;

import mk.finki.ukim.StockApp.exception.CompanyNotFoundException;
import mk.finki.ukim.StockApp.model.Company;
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
    private final TechAnalysisService techAnalysisService;
    public CompanyController(CompanyService companyService, TechAnalysisService techAnalysisService) {
        this.companyService = companyService;
        this.techAnalysisService = techAnalysisService;
    }


    @GetMapping("/tech-analysis")
    public ResponseEntity<String> getTechAnalysis(@RequestParam String companyName) {
        try {

            String csvFilePath = "./././resources/companies/" + companyName + ".csv";


            String result = techAnalysisService.getTechAnalysis(csvFilePath);

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error in analysis");
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

    @PutMapping(value = "/{id}")
    public ResponseEntity<Company> updateCompany(@PathVariable(value = "id") Long id, @RequestBody Company company) {
        return companyService.getCompanyById(id)
                .map(existingCompany -> {
                    existingCompany.setName(company.getName());
                    existingCompany.setStockSymbol(company.getStockSymbol());
                    existingCompany.setAveragePrice(company.getAveragePrice());
                    existingCompany.setDate(company.getDate());
                    existingCompany.setLastPrice(company.getLastPrice());
                    Company updatedCompany = companyService.saveCompany(existingCompany);
                    return new ResponseEntity<>(updatedCompany, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @GetMapping
//    public ResponseEntity<Page<Company>> getAllCompanies(
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "50") int size) {
//        Page<Company> companies = companyService.getAllCompanies(PageRequest.of(page, size));
//        return new ResponseEntity<>(companies, HttpStatus.OK);
//    }
    public ResponseEntity<Page<Company>> getCompanies(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "50") int size,
            @RequestParam(name = "name", required = false) String name) {

        PageRequest pageRequest = PageRequest.of(page, size);
        Page<Company> companies;

        if (name != null && !name.isEmpty()) {
            companies = companyService.getCompaniesByName(name, pageRequest);
        } else {
            companies = companyService.getAllCompanies(pageRequest);
        }

        return ResponseEntity.ok(companies);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteCompany(@PathVariable(value = "id") Long id) {
        return companyService.getCompanyById(id)
                .map(company -> {
                    companyService.deleteCompany(id);
                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
