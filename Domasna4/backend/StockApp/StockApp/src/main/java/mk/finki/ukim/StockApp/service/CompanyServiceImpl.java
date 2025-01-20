package mk.finki.ukim.StockApp.service;

import mk.finki.ukim.StockApp.model.Company;
import mk.finki.ukim.StockApp.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyServiceImpl implements CompanyService {
  private final CompanyRepository companyRepository;

  @Autowired
    public CompanyServiceImpl(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @Override
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    @Override
    public Optional<Company> getCompanyById(Long id) {
        return companyRepository.findById(id);
    }

    @Override
    public Company saveCompany(Company company) {
        return companyRepository.save(company);
    }

    @Override
    public void deleteCompany(Long id) {
        companyRepository.deleteById(id);
    }
    public Page<Company> getAllCompanies(Pageable pageable) {
        return companyRepository.findAll(pageable);
    }

    @Override
    public List<String> getAllCompanyNames() {
        return companyRepository.getAllCompanyNames();
    }
    @Override
    public Page<Company> getCompaniesByName(String name, Pageable pageable) {
        if (name == null || name.isEmpty()) {
            return companyRepository.findAll(pageable);
        }
        return companyRepository.findByNameContainingIgnoreCase(name, pageable);
    }

    @Override
    public List<String> getDistinctDatesByCompanyName(String name) {
        return companyRepository.findDistinctDatesByCompanyName(name);
    }

    @Override
    public Page<Company> getCompaniesByNameAndDate(String name, String date, Pageable pageable) {
        return companyRepository.findByNameAndDate(name, date, pageable);
    }


}
