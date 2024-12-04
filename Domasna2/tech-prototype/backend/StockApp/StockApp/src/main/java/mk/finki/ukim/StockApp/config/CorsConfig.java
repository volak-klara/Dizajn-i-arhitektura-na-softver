package mk.finki.ukim.StockApp.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {


    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // Дозволува пристап од локалниот React сервер на порт 3000
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedOrigins("http://localhost:3001")
                        .allowedOrigins("http://localhost:3002")
                        .allowedOrigins("http://localhost:3003")// Дозволете повици од React (локален сервер)
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS"); // Дозволени HTTP методи
            }
        };
    }
}

