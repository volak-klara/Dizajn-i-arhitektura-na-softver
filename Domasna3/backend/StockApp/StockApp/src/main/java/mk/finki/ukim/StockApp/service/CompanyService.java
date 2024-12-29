package mk.finki.ukim.StockApp.service;

import mk.finki.ukim.StockApp.model.Company;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface CompanyService {

    List<Company> getAllCompanies();
    Optional<Company> getCompanyById(Long id);
    Company saveCompany(Company company);
    void deleteCompany(Long id);
    public Page<Company> getAllCompanies(Pageable pageable);
    public Page<Company> getCompaniesByName(String name, Pageable pageable);
    List<String> getAllCompanyNames();
}
