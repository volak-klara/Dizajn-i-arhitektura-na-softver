package mk.finki.ukim.StockApp.exception;

public class CompanyNotFoundException extends Exception {
    public CompanyNotFoundException(Long id) {
        super(String.format("Company not found: %d", id));
    }
}
