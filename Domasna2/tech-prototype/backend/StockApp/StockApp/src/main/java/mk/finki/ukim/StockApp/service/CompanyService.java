package mk.finki.ukim.StockApp.service;

import mk.finki.ukim.StockApp.model.Company;

import java.util.List;
import java.util.Optional;

public interface CompanyService {

    List<Company> getAllCompanies();
    Optional<Company> getCompanyById(Long id);
    Company saveCompany(Company company);
    void deleteCompany(Long id);
}
