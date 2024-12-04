package mk.finki.ukim.StockApp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.*;
import java.io.Serializable;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Data
@Entity
@Table(name = "companies")
@NoArgsConstructor
@AllArgsConstructor
public class Company implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "Name", nullable = false)
    private String name;

    @NotEmpty
    @Column(name = "stock_symbol", nullable = false)
    private String stockSymbol;

    @NotNull
    @Column(name = "LastPrice", nullable = false)
    private String lastPrice;

    @Positive
    @Column(name = "average_price", nullable = false)
    private Double averagePrice;

    @NotNull
    @Column(name = "Date", nullable = false)
    private String date;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public @NotNull String getName() {
        return name;
    }

    public void setName(@NotNull String name) {
        this.name = name;
    }

    public @NotEmpty String getStockSymbol() {
        return stockSymbol;
    }

    public void setStockSymbol(@NotEmpty String stockSymbol) {
        this.stockSymbol = stockSymbol;
    }

    public @NotNull String getLastPrice() {
        return lastPrice;
    }

    public void setLastPrice(@NotNull String lastPrice) {
        this.lastPrice = lastPrice;
    }

    public @Positive Double getAveragePrice() {
        return averagePrice;
    }

    public void setAveragePrice(@Positive Double averagePrice) {
        this.averagePrice = averagePrice;
    }

    public @NotNull String getDate() {
        return date;
    }

    public void setDate(@NotNull String date) {
        this.date = date;
    }
}
