package mk.finki.ukim.StockApp.service;

import mk.finki.ukim.StockApp.model.Company;
import mk.finki.ukim.StockApp.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

//import javax.annotation.PostConstruct;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.stream.Stream;

@Component
public class DataInitializer {

    @Autowired
    private CompanyRepository companyRepository;


    @EventListener(ApplicationReadyEvent.class)
    public void loadDataFromMultipleCSV() {
        if (companyRepository.count() == 0) {
            try (Stream<Path> paths = Files.walk(Paths.get(getClass().getResource("/companies").toURI()))) {

                paths.filter(Files::isRegularFile)
                        .forEach(this::processSingleCSV);

                System.out.println("Податоците од сите CSV датотеки се внесени во базата.");

            } catch (Exception e) {
                System.err.println("Грешка при обработка на CSV датотеките: " + e.getMessage());
            }
        }
    }

    private void processSingleCSV(Path path) {
        try (BufferedReader reader = Files.newBufferedReader(path, StandardCharsets.UTF_8)) {

            reader.lines()
                    .skip(1) // Прескокни го првиот ред (headers)
                    .map(line -> {
                        String[] fields = line.split(",");
                        try {
                            String name = fields[0]; // Name
                            String date = fields[1]; // Date
                            Double lastPrice = Double.parseDouble(fields[2]); // PoslednaCena
                            Double averagePrice = Double.parseDouble(fields[5]); // ProsecnaCena

                            // Конвертирај го датумот во LocalDate
//                            LocalDate parsedDate = LocalDate.parse(date, DateTimeFormatter.ofPattern("dd.MM.yyyy"));

                            // Врати нов објект на Company
                            return new Company(null, name, name, lastPrice, averagePrice, date);

                        } catch (Exception e) {
                            System.err.println("Грешка при обработка на линија: " + line + " - " + e.getMessage());
                            return null; // Игнорирај невалидни редови
                        }
                    })
                    .filter(company -> company != null) // Игнорирај невалидни објекти
                    .forEach(companyRepository::save);

            System.out.println("Обработена датотека: " + path.getFileName());

        } catch (Exception e) {
            System.err.println("Грешка при обработка на датотеката " + path.getFileName() + ": " + e.getMessage());
        }
    }
//private void processSingleCSV(Path path) {
//    try (BufferedReader reader = Files.newBufferedReader(path, StandardCharsets.UTF_8)) {
//
//        reader.lines()
//                .skip(1) // Прескокни го првиот ред (headers)
//                .map(line -> {
//                    String[] fields = line.split(",");
//                    try {
//                        String name = fields[0]; // Name
//                        String date = fields[1]; // Date
//                        Double lastPrice = Double.parseDouble(fields[2]); // PoslednaCena
//                        Double averagePrice = Double.parseDouble(fields[5]); // ProsecnaCena
//
//                        // Конвертирај го датумот во LocalDate со саканиот формат
//                        LocalDate parsedDate = parseAndFormatDate(date);
//
//                        // Ако датумот е невалиден, врати null
//                        if (parsedDate == null) {
//                            return null;
//                        }
//
//                        // Врати нов објект на Company
//                        return new Company(null, name, name, lastPrice, averagePrice, parsedDate);
//
//                    } catch (Exception e) {
//                        System.err.println("Грешка при обработка на линија: " + line + " - " + e.getMessage());
//                        return null; // Игнорирај невалидни редови
//                    }
//                })
//                .filter(company -> company != null) // Игнорирај невалидни објекти
//                .forEach(companyRepository::save);
//
//        System.out.println("Обработена датотека: " + path.getFileName());
//
//    } catch (Exception e) {
//        System.err.println("Грешка при обработка на датотеката " + path.getFileName() + ": " + e.getMessage());
//    }
//}



    private LocalDate parseAndFormatDate(String date) {
        try {
            // Прво обиди се да го парсираш датумот во оригиналниот формат
            LocalDate parsedDate = LocalDate.parse(date, DateTimeFormatter.ofPattern("dd.MM.yyyy"));

            // Врати го датумот во саканиот формат
            return parsedDate;
        } catch (Exception e) {
            // Ако не успее, пробај со друг формат
            try {
                LocalDate parsedDate = LocalDate.parse(date, DateTimeFormatter.ofPattern("MM.dd.yyyy"));
                return parsedDate;
            } catch (Exception ex) {
                System.err.println("Грешка при парсирање на датум: " + date);
                return null;  // Ако не успее, врати null
            }
        }
    }

}

