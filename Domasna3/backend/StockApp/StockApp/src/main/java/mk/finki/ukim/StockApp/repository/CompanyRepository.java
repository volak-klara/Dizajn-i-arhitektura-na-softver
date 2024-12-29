package mk.finki.ukim.StockApp.repository;

import mk.finki.ukim.StockApp.model.Company;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    @Query(value = "SELECT DISTINCT c.name FROM COMPANIES c", nativeQuery = true)
    public List<String> getAllCompanyNames();

    Page<Company> findByNameContainingIgnoreCase(String name, Pageable pageable);
}
