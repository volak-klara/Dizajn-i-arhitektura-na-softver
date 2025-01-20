//package mk.finki.ukim.StockApp.controller;
//
//import mk.finki.ukim.StockApp.model.User;
//import mk.finki.ukim.StockApp.repository.UserRepository;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/auth")
//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
//public class AuthController {
//
//    private final UserRepository userRepository;
//    private final PasswordEncoder passwordEncoder;
//
//    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
//        this.userRepository = userRepository;
//        this.passwordEncoder = passwordEncoder;
//    }
//
//    @PostMapping("/register")
//    public ResponseEntity<String> registerUser(@RequestBody User user) {
//        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
//            return ResponseEntity.badRequest().body("Username is already taken");
//        }
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        user.setRole("ROLE_USER");
//        userRepository.save(user);
//        return ResponseEntity.ok("User registered successfully");
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<String> loginUser(@RequestBody User user) {
//        var existingUser = userRepository.findByUsername(user.getUsername());
//
//        if (existingUser.isPresent() && passwordEncoder.matches(user.getPassword(), existingUser.get().getPassword())) {
//            // Успешно логирање
//            return ResponseEntity.ok("Login successful");
//        }
//        // Неуспешно логирање
//        return ResponseEntity.status(401).body("Invalid username or password");
//    }
//}
//
