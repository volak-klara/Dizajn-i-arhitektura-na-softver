package mk.finki.ukim.StockApp.controller;

import mk.finki.ukim.StockApp.exception.CompanyNotFoundException;
import mk.finki.ukim.StockApp.model.Company;
import mk.finki.ukim.StockApp.service.CompanyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/companies")
@Validated
@CrossOrigin(origins="*")
public class CompanyController {
    private final CompanyService companyService;
    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }


    @GetMapping(value = "/all")
    public ResponseEntity<List<Company>> getAllCompanies() {
        List<Company> companies = companyService.getAllCompanies();
        return new ResponseEntity<>(companies, HttpStatus.OK);
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
