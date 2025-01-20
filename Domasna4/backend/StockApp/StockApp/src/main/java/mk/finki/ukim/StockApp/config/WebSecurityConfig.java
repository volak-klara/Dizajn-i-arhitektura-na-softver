////package mk.finki.ukim.StockApp.config;
////
////import mk.finki.ukim.StockApp.service.CustomUserDetailsService;
////import org.springframework.context.annotation.Bean;
////import org.springframework.context.annotation.Configuration;
////import org.springframework.security.authentication.AuthenticationManager;
////import org.springframework.security.authentication.AuthenticationProvider;
////import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
////import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
////import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
////import org.springframework.security.config.annotation.web.builders.HttpSecurity;
////import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
////import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
////import org.springframework.security.crypto.password.PasswordEncoder;
////import org.springframework.security.web.SecurityFilterChain;
////import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
////
////@Configuration
////@EnableWebSecurity
////@EnableMethodSecurity
////public class WebSecurityConfig {
////
////    private final CustomUserDetailsService userDetailsService;
////
////    public WebSecurityConfig(CustomUserDetailsService userDetailsService) {
////        this.userDetailsService = userDetailsService;
////    }
////
////    @Bean
////    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
////        http
////                .csrf(csrf -> csrf
////                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
////        )
////                .authorizeRequests()
////                .antMatchers("/api/auth/register", "/api/auth/login").permitAll() // Овие патеки се дозволени
////                .anyRequest().authenticated()
//////                .authorizeHttpRequests((requests) -> requests
//////                        .requestMatchers("/", "/home", "/register", "/login", "/assets/**").permitAll()
//////                        .requestMatchers("/admin/**").hasRole("ADMIN")
//////                        .anyRequest().authenticated()
//////                )
////                .formLogin((form) -> form
////                        .loginPage("/login") // Патека до вашата прилагодена форма за логирање
////                        .defaultSuccessUrl("/dashboard", true)
////                        .permitAll()
////                )
////                .logout((logout) -> logout
////                        .logoutUrl("/logout")
////                        .logoutSuccessUrl("/login?logout")
////                        .invalidateHttpSession(true)
////                        .deleteCookies("JSESSIONID")
////                );
////
////        return http.build();
////    }
////
////    @Bean
////    public PasswordEncoder passwordEncoder() {
////        return new BCryptPasswordEncoder();
////    }
////
////    @Bean
////    public AuthenticationProvider authenticationProvider() {
////        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
////        authProvider.setUserDetailsService(userDetailsService);
////        authProvider.setPasswordEncoder(passwordEncoder());
////        return authProvider;
////    }
////
////    @Bean
////    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
////        return authConfig.getAuthenticationManager();
////    }
////}
////
//package mk.finki.ukim.StockApp.config;
//
//import mk.finki.ukim.StockApp.service.CustomUserDetailsService;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.AuthenticationProvider;
//import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//
//import java.util.List;
//
//@Configuration
//@EnableWebSecurity
//@EnableMethodSecurity
//public class WebSecurityConfig {
//
//    private final CustomUserDetailsService userDetailsService;
//
//    public WebSecurityConfig(CustomUserDetailsService userDetailsService) {
//        this.userDetailsService = userDetailsService;
//    }
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//
//                .csrf(AbstractHttpConfigurer::disable
//                )
//                .authorizeHttpRequests(authorizeRequests ->
//                        authorizeRequests
//                                .requestMatchers("/api/auth/register", "/api/auth/login").permitAll() // Дозволи пристап до login и register
//                                .anyRequest().authenticated() // Сите други патеки бараат логирање
//                )
//                .formLogin(formLogin ->
//                        formLogin
//                                .loginPage("/login") // Патека до формата за логирање
//                                .defaultSuccessUrl("/api/companies", true) // Пренасочи на /home по успешен login
//                                .permitAll()
//                )
//                .logout(logout ->
//                        logout
//                                .logoutUrl("/logout")
//                                .logoutSuccessUrl("/login?logout") // По логирање logout, врати на login со порака
//                                .invalidateHttpSession(true)
//                                .deleteCookies("JSESSIONID")
//                );
//
//        return http.build();
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder(); // Користи BCryptPasswordEncoder за хаширање на лозинките
//    }
//
//    @Bean
//    public AuthenticationProvider authenticationProvider() {
//        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
//        authProvider.setUserDetailsService(userDetailsService); // Постави CustomUserDetailsService
//        authProvider.setPasswordEncoder(passwordEncoder()); // Постави PasswordEncoder
//        return authProvider;
//    }
//
//    @Bean
//    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
//        return authConfig.getAuthenticationManager(); // Превземи AuthenticationManager
//    }
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(List.of("http://localhost:3000")); // React серверот
//        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
//        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Requested-With"));
//        configuration.setAllowCredentials(true); // Овозможи користење на колачиња
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
//
//}
//
